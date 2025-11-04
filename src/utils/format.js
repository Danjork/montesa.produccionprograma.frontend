export function fmtNumber(n, digits = 0) {
  const num = Number(n);
  if (!isFinite(num)) return '—';
  return num.toLocaleString('es-CL', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
