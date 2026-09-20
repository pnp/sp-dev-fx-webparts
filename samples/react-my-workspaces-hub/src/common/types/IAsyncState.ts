/** Render state for a single async load: the data plus loading/error flags. */
export interface IAsyncState<T> {
  data: T;
  isLoading: boolean;
  error?: string;
}
