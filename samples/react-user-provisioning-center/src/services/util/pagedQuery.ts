export interface IPagedResult<T> {
  items: T[];
  truncated: boolean;
  next?: () => Promise<IPagedResult<T>>;
}

export async function fetchPaged<T>(
  query: AsyncIterable<T[]>,
  pageSize: number,
  retry?: <R>(action: () => Promise<R>) => Promise<R>
): Promise<IPagedResult<T>> {
  if (pageSize <= 0) {
    throw new Error('pageSize must be greater than 0');
  }

  const iterator = query[Symbol.asyncIterator]();

  async function fetchNextPage(): Promise<IPagedResult<T>> {
    const { value, done } = retry
      ? await retry(() => iterator.next())
      : await iterator.next();

    if (done || value === undefined) {
      return { items: [], truncated: false };
    }

    const items = value ?? [];
    const truncated = items.length === pageSize;

    return {
      items,
      truncated,
      next: truncated ? fetchNextPage : undefined
    };
  }

  return fetchNextPage();
}
