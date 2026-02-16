import { PrismaClient, SplitType } from '@prisma/client';
import { calculateSplit } from '../src/lib/split';
import { generateToken } from '../src/lib/utils';

const prisma = new PrismaClient();

async function main() {
  await prisma.share.deleteMany();
  await prisma.bill.deleteMany();
  await prisma.member.deleteMany();
  await prisma.group.deleteMany();

  const group = await prisma.group.create({ data: { name: 'Abuja Dinner Crew' } });
  const members = await Promise.all(
    ['Ada', 'Tunde', 'Musa'].map((name, idx) =>
      prisma.member.create({ data: { groupId: group.id, name, phone: idx === 0 ? '08031234567' : null } })
    )
  );

  const bill = await prisma.bill.create({
    data: { groupId: group.id, title: 'Suya + Drinks', totalKobo: 25500, splitType: SplitType.EQUAL }
  });

  const allocations = calculateSplit(
    bill.totalKobo,
    'EQUAL',
    members.map((m) => ({ memberId: m.id }))
  );

  await Promise.all(
    allocations.map((a) =>
      prisma.share.create({
        data: {
          billId: bill.id,
          memberId: a.memberId,
          amountKobo: a.amountKobo,
          token: generateToken()
        }
      })
    )
  );

  console.log('Seed complete');
}

main().finally(async () => prisma.$disconnect());
