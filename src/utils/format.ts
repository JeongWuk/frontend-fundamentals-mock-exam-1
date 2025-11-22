export function formatNumericValue(value: number): string {
  if (value === 0) return '';
  return value.toLocaleString();
}
