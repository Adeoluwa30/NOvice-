import { NextRequest, NextResponse } from 'next/server';
import { ShareStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { calculateSplit } from '@/lib/split';
import { createSharesSchema } from '@/lib/validators';
import { generateToken } from '@/lib/utils';

export async function GET(_: NextRequest, { params }: { params: { billId: string } }) {
  const shares = await prisma.share.findMany({
    where: { billId: params.billId },
    include: { member: true, bill: { include: { group: true } } },
    orderBy: { member: { createdAt: 'asc' } }
  });

  return NextResponse.json(shares);
}

export async function POST(req: NextRequest, { params }: { params: { billId: string } }) {
  const body = await req.json();
  const parsed = createSharesSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const bill = await prisma.bill.findUnique({
    where: { id: params.billId },
    include: { group: { include: { members: true } } }
  });

  if (!bill) {
    return NextResponse.json({ error: 'Bill not found' }, { status: 404 });
  }

  const splits = calculateSplit(
    bill.totalKobo,
    parsed.data.splitType,
    parsed.data.allocations.map((item) => ({ memberId: item.memberId, value: item.value }))
  );

  const shares = await prisma.$transaction(async (tx) => {
    await tx.share.deleteMany({ where: { billId: params.billId } });

    const created: Array<{ id: string }> = [];
    for (const split of splits) {
      const share = await tx.share.create({
        data: {
          billId: params.billId,
          memberId: split.memberId,
          amountKobo: split.amountKobo,
          token: generateToken(),
          status: ShareStatus.UNPAID
        }
      });
      created.push({ id: share.id });
    }

    return tx.share.findMany({
      where: { id: { in: created.map((item) => item.id) } },
      include: { member: true }
    });
  });

  return NextResponse.json(shares, { status: 201 });
}
