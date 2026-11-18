export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index: number = 0;

  async function worker(): Promise<void> {
    while (index < items.length) {
      const i: number = index++;
      results[i] = await mapper(items[i], i);
    }
  }

  const workers: Promise<void>[] = [];
  for (let i: number = 0; i < Math.min(limit, items.length); i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  return results;
}
