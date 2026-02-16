import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createGroupSchema } from '@/lib/validators';
import { hashPin } from '@/lib/utils';

export async function GET() {
  const groups = await prisma.group.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { members: true, bills: true } }
    }
  });

  return NextResponse.json(groups);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createGroupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const group = await prisma.group.create({
    data: {
      name: parsed.data.name,
      pinHash: parsed.data.pin ? hashPin(parsed.data.pin) : null
    }
  });

  return NextResponse.json(group, { status: 201 });
}
