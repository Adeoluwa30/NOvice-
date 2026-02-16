import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest, { params }: { params: { token: string } }) {
  const share = await prisma.share.findUnique({
    where: { token: params.token },
    include: { member: true, bill: { include: { group: true } } }
  });

  if (!share) {
    return NextResponse.json({ error: 'Share not found' }, { status: 404 });
  }

  return NextResponse.json(share);
}
