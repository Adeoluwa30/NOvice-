import { createHash, randomBytes } from 'crypto';

export function parseCurrencyToKobo(input: string): number {
  const clean = input.replace(/,/g, '').trim();
  if (!clean) return 0;
  const value = Number.parseFloat(clean);
  if (!Number.isFinite(value) || value < 0) {
    throw new Error('Enter a valid amount.');
  }
  return Math.round(value * 100);
}

export function hashPin(pin: string): string {
  return createHash('sha256').update(pin).digest('hex');
}

export function verifyPin(pin: string, hash: string): boolean {
  return hashPin(pin) === hash;
}

export function generateToken(): string {
  return randomBytes(16).toString('hex');
}
