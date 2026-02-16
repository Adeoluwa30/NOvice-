import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createMemberSchema } from '@/lib/validators';

export async function GET(_: NextRequest, { params }: { params: { groupId: string } }) {
  const members = await prisma.member.findMany({
    where: { groupId: params.groupId },
    orderBy: { createdAt: 'asc' }
  });
  return NextResponse.json(members);
}

export async function POST(req: NextRequest, { params }: { params: { groupId: string } }) {
  const body = await req.json();
  const parsed = createMemberSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const member = await prisma.member.create({
    data: {
      groupId: params.groupId,
      name: parsed.data.name,
      phone: parsed.data.phone || null
    }
  });
  return NextResponse.json(member, { status: 201 });
}
