export interface IBulkUserInput {
  email: string;
  displayName: string;
  role?: string;
}

export interface IBulkOperationError {
  row: number;
  email: string;
  error: string;
}

export interface IBulkAddUsersResult {
  total: number;
  processed: number;
  added: number;
  failed: number;
  errors: IBulkOperationError[];
}