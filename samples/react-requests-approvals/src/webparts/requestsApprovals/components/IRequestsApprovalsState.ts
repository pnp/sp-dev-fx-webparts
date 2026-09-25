import type { IRequestItem } from "../models/IRequestItem";

export interface IRequestsApprovalsState {
  requests: IRequestItem[];
  selectedRequest: IRequestItem | undefined;
  isLoading: boolean;
  isSaving: boolean;
  error: string | undefined;
  statusMessage: string;
}
