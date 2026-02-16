'use client';

import { FormEvent, ReactNode, useState } from 'react';

export function OwnerGate({
  groupId,
  hasPin,
  children
}: {
  groupId: string;
  hasPin: boolean;
  children: ReactNode;
}) {
  const [ready, setReady] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(`owner:${groupId}`) === '1' || !hasPin;
  });
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (ready || !hasPin) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`owner:${groupId}`, '1');
    }
    return <>{children}</>;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch(`/api/groups/${groupId}/verify-pin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin })
    });

    if (!res.ok) {
      setError('Incorrect PIN. Please try again.');
      return;
    }

    localStorage.setItem(`owner:${groupId}`, '1');
    setReady(true);
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <p className="mb-2 text-sm">This group has a PIN. Enter it to continue.</p>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          required
          value={pin}
          maxLength={4}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
          className="flex-1"
        />
        <button className="rounded-lg bg-amber-500 px-3 text-white">Unlock</button>
      </form>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
    </div>
  );
}
