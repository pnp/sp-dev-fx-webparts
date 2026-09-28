import type { IRequestItem } from "../models/IRequestItem";
import type { RequestsApprovalsService } from "../services/RequestsApprovalsService";

export type IRequestsApprovalsService = Pick<
  RequestsApprovalsService,
  "getPendingRequests" | "approveRequest" | "rejectRequest"
>;

export interface IRequestsApprovalsProps {
  service: IRequestsApprovalsService;
  title: string;
}

export interface IRequestDetailsProps {
  request: IRequestItem | undefined;
  isSaving: boolean;
  onApprove: () => Promise<void>;
  onReject: (comment: string) => Promise<void>;
}
