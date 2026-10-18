export interface ILiveDataResult {
  label: string;
  /**
   * null (not undefined) is a contract with the embedded HTML
   * applications: they test `result.content == null` to detect a
   * missing/failed source.
   */
  // eslint-disable-next-line @rushstack/no-new-null
  content: string | null;
  // eslint-disable-next-line @rushstack/no-new-null
  format: 'rows' | 'text' | 'csv' | null;
  metadata?: unknown;
  error?: string;
  errorCode?: string;
}
