export const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2
});

export function koboToNaira(kobo: number): string {
  return nairaFormatter.format(kobo / 100);
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}
