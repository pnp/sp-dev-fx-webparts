export function buildGroups(names: string[], groupSize: number): string[][] {
  const safeSize = Math.max(2, groupSize);
  const filtered = names.filter(n => n.trim() !== '');

  if (filtered.length <= 1) return [];

  const shuffled = [...filtered];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const n = shuffled.length;
  if (safeSize >= n) return [shuffled];

  const groups: string[][] = [];
  for (let i = 0; i < n; i += safeSize) {
    groups.push(shuffled.slice(i, i + safeSize));
  }
  return groups;
}
