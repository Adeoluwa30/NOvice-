import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPin } from '@/lib/utils';

export async function POST(req: NextRequest, { params }: { params: { groupId: string } }) {
  const { pin } = await req.json();
  const group = await prisma.group.findUnique({ where: { id: params.groupId } });
  if (!group) {
    return NextResponse.json({ error: 'Group not found' }, { status: 404 });
  }

  if (!group.pinHash) {
    return NextResponse.json({ ok: true });
  }

  if (!pin || !verifyPin(pin, group.pinHash)) {
    return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
