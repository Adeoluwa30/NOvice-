import Link from 'next/link';
import { CreateBillFlow } from '@/components/create-bill-flow';
import { prisma } from '@/lib/prisma';

export default async function NewBillPage({ params }: { params: { groupId: string } }) {
  const group = await prisma.group.findUnique({
    where: { id: params.groupId },
    include: { members: { orderBy: { createdAt: 'asc' } } }
  });

  if (!group) return <p>Group not found.</p>;

  return (
    <div className="space-y-4">
      <Link href={`/groups/${group.id}`} className="text-sm text-brand-dark">
        ← Back to group
      </Link>
      <h1 className="text-xl font-bold">New bill</h1>
      <CreateBillFlow groupId={group.id} members={group.members.map((m) => ({ id: m.id, name: m.name }))} />
    </div>
  );
}
