/**
 * Interface for Graph API errors
 */
export interface IGraphError extends Error {
  code?: string;
  status?: number;
}
