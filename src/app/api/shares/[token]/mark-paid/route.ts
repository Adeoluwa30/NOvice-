import { NextRequest, NextResponse } from 'next/server';
import { ShareStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function POST(_: NextRequest, { params }: { params: { token: string } }) {
  const existing = await prisma.share.findUnique({ where: { token: params.token } });

  if (!existing) {
    return NextResponse.json({ error: 'Share not found' }, { status: 404 });
  }

  const share = await prisma.share.update({
    where: { token: params.token },
    data: {
      status: existing.status === ShareStatus.PAID ? ShareStatus.UNPAID : ShareStatus.PAID,
      paidAt: existing.status === ShareStatus.PAID ? null : new Date()
    }
  });

  return NextResponse.json(share);
}
