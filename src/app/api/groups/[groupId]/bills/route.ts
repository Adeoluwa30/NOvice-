import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createBillSchema } from '@/lib/validators';
import { parseCurrencyToKobo } from '@/lib/utils';

export async function GET(_: NextRequest, { params }: { params: { groupId: string } }) {
  const bills = await prisma.bill.findMany({
    where: { groupId: params.groupId },
    include: { shares: true },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(bills);
}

export async function POST(req: NextRequest, { params }: { params: { groupId: string } }) {
  const body = await req.json();
  const parsed = createBillSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const totalKobo = parseCurrencyToKobo(parsed.data.total);

  const bill = await prisma.bill.create({
    data: {
      groupId: params.groupId,
      title: parsed.data.title || null,
      splitType: parsed.data.splitType,
      totalKobo
    }
  });

  return NextResponse.json(bill, { status: 201 });
}
