import Link from 'next/link';
import { CreateGroupForm } from '@/components/create-group-form';
import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const groups = await prisma.group.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { members: true, bills: true } } }
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">PayLater</h1>
        <p className="text-sm text-slate-600">We don’t collect money here — we only help you track.</p>
      </div>
      <CreateGroupForm />
      <section className="space-y-2">
        <h2 className="font-semibold">Your groups</h2>
        {groups.length === 0 ? (
          <div className="rounded-xl bg-white p-4 text-sm text-slate-500">No groups yet. Create one to get started.</div>
        ) : (
          groups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`} className="block rounded-xl bg-white p-4 shadow-sm">
              <p className="font-medium">{group.name}</p>
              <p className="text-xs text-slate-500">
                {group._count.members} members · {group._count.bills} bills
              </p>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}
