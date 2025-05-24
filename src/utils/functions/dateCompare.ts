export function isDdayReached(dateStr: string): boolean {
  const target = new Date(dateStr);
  const now = new Date();

  return target.toDateString() <= now.toDateString();
}
