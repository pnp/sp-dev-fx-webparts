export function runOnce<T>(pending: { current: boolean }, action: () => Promise<T>): Promise<T | undefined> {
  if (pending.current) return Promise.resolve(undefined);
  pending.current = true;
  try {
    return action().then(result => {
      pending.current = false;
      return result;
    }, error => {
      pending.current = false;
      throw error;
    });
  } catch (error) {
    pending.current = false;
    return Promise.reject(error);
  }
}
