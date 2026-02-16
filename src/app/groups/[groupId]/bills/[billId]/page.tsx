import Link from 'next/link';
import { ShareActions } from '@/components/share-actions';
import { prisma } from '@/lib/prisma';
import { koboToNaira } from '@/lib/format';

export default async function BillPage({ params }: { params: { groupId: string; billId: string } }) {
  const bill = await prisma.bill.findUnique({
    where: { id: params.billId },
    include: {
      group: true,
      shares: {
        include: { member: true },
        orderBy: { member: { createdAt: 'asc' } }
      }
    }
  });

  if (!bill) return <p>Bill not found.</p>;

  return (
    <div className="space-y-4">
      <Link href={`/groups/${params.groupId}`} className="text-sm text-brand-dark">
        ← Back to group
      </Link>
      <h1 className="text-xl font-bold">{bill.title || 'Untitled bill'}</h1>
      <p className="text-sm text-slate-600">Total: {koboToNaira(bill.totalKobo)}</p>
      {bill.shares.length === 0 ? (
        <p className="rounded-xl bg-white p-4 text-sm text-slate-500">No split yet. Please recreate this bill split.</p>
      ) : (
        <ShareActions shares={bill.shares} billTitle={bill.title || 'this bill'} groupName={bill.group.name} />
      )}
    </div>
  );
}
