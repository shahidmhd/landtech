export function formatPrice(value: number, currency = 'AED', locale = 'en-AE') {
  if (value == null || Number.isNaN(value)) return '—';
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString()}`;
  }
}

export function formatNumber(value?: number) {
  if (value == null) return '—';
  return value.toLocaleString();
}

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}
