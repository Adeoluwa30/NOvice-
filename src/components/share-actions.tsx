'use client';

import { useRouter } from 'next/navigation';
import { koboToNaira, normalizePhone } from '@/lib/format';

type ShareItem = {
  id: string;
  token: string;
  amountKobo: number;
  status: 'PAID' | 'UNPAID';
  member: { name: string; phone: string | null };
};

export function ShareActions({ shares, billTitle, groupName }: { shares: ShareItem[]; billTitle: string; groupName: string }) {
  const router = useRouter();
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  function messageFor(share: ShareItem) {
    const link = `${origin}/s/${share.token}`;
    return `Hey ${share.member.name}, for *${groupName}* you owe *${koboToNaira(share.amountKobo)}* for *${billTitle}*. Mark as paid: ${link} 🙏`;
  }

  async function toggle(token: string) {
    await fetch(`/api/shares/${token}/mark-paid`, { method: 'POST' });
    router.refresh();
  }

  async function shareOne(share: ShareItem) {
    const text = messageFor(share);
    const phone = share.member.phone ? normalizePhone(share.member.phone) : '';
    if (phone) {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
      return;
    }

    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('Message copied.');
    }
  }

  async function shareAll() {
    for (const share of shares) {
      await shareOne(share);
    }
  }

  return (
    <div className="space-y-3">
      <button onClick={shareAll} className="w-full rounded-lg bg-green-600 py-2 text-white">
        Share all on WhatsApp
      </button>
      <div className="space-y-2">
        {shares.map((share) => (
          <div key={share.id} className="rounded-xl bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium">{share.member.name}</p>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  share.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {share.status}
              </span>
            </div>
            <p className="text-sm">{koboToNaira(share.amountKobo)}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => shareOne(share)} className="flex-1 rounded-lg bg-green-100 py-2 text-sm text-green-700">
                Share on WhatsApp
              </button>
              <button onClick={() => toggle(share.token)} className="flex-1 rounded-lg bg-slate-100 py-2 text-sm text-slate-700">
                Toggle Paid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
