/**
 * Interface for CAML query results
 * Uses index signature for dynamic properties returned from SharePoint items
 */
export interface IQueryResult {
  [key: string]: unknown;
}