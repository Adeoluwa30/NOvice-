import Link from 'next/link';
import { AddMemberForm } from '@/components/add-member-form';
import { OwnerGate } from '@/components/owner-gate';
import { prisma } from '@/lib/prisma';

export default async function GroupPage({ params }: { params: { groupId: string } }) {
  const group = await prisma.group.findUnique({
    where: { id: params.groupId },
    include: {
      members: { orderBy: { createdAt: 'asc' } },
      bills: { orderBy: { createdAt: 'desc' } }
    }
  });

  if (!group) {
    return <p>Group not found.</p>;
  }

  return (
    <OwnerGate groupId={group.id} hasPin={Boolean(group.pinHash)}>
      <div className="space-y-4">
        <Link href="/" className="text-sm text-brand-dark">
          ← Back
        </Link>
        <h1 className="text-xl font-bold">{group.name}</h1>
        <AddMemberForm groupId={group.id} />

        <section className="space-y-2">
          <h2 className="font-semibold">Members</h2>
          {group.members.length === 0 ? (
            <div className="rounded-xl bg-white p-4 text-sm text-slate-500">No members yet. Add your first person.</div>
          ) : (
            group.members.map((member) => (
              <div key={member.id} className="rounded-xl bg-white p-3 text-sm shadow-sm">
                {member.name} {member.phone ? `· ${member.phone}` : ''}
              </div>
            ))
          )}
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Bills</h2>
            <Link href={`/groups/${group.id}/bills/new`} className="rounded-lg bg-brand px-3 py-2 text-sm text-white">
              New bill
            </Link>
          </div>
          {group.bills.length === 0 ? (
            <div className="rounded-xl bg-white p-4 text-sm text-slate-500">No bills yet. Create one to split costs.</div>
          ) : (
            group.bills.map((bill) => (
              <Link
                key={bill.id}
                href={`/groups/${group.id}/bills/${bill.id}`}
                className="block rounded-xl bg-white p-3 shadow-sm"
              >
                <p className="font-medium">{bill.title || 'Untitled bill'}</p>
              </Link>
            ))
          )}
        </section>
      </div>
    </OwnerGate>
  );
}
