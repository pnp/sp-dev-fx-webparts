/* eslint-disable @rushstack/no-new-null -- these types mirror the literal JSON shape returned by the Graph approvalItems API, which uses null */

export interface IApprovalUser {
  id: string;
  displayName: string | null;
}

export interface IApprovalGroup {
  id: string;
  displayName: string | null;
}

export interface IApprovalAssignee {
  user: IApprovalUser | null;
  group: IApprovalGroup | null;
}

export interface IApprovalViewPoint {
  roles: string[];
}

export type ApprovalState = 'created' | 'pending' | 'completed' | 'canceled' | string;
export type ApprovalResult = 'Approve' | 'Reject' | string | null;
export type ApprovalResponseType = 'Approve' | 'Reject';

export interface IApprovalItem {
  id: string;
  displayName: string;
  approvalType: string;
  createdDateTime: string;
  completedDateTime: string | null;
  allowCancel: boolean;
  allowEmailNotification: boolean | null;
  description: string | null;
  responsePrompts: string[];
  state: ApprovalState;
  result: ApprovalResult;
  approvers: IApprovalAssignee[];
  viewPoint: IApprovalViewPoint;
  owner: IApprovalAssignee;
}

export interface IApprovalItemsResponse {
  value: IApprovalItem[];
  '@odata.nextLink'?: string;
  '@odata.count'?: number;
}

export interface IApprovalResponseItem {
  id: string;
  createdDateTime: string;
  response: ApprovalResponseType | string;
  comments: string | null;
  createdBy: IApprovalAssignee;
}

export interface IApprovalResponsesResult {
  value: IApprovalResponseItem[];
}

export interface IApprovalItemRequest {
  id: string;
  createdDateTime: string;
  isReassigned: boolean;
  approver: IApprovalAssignee;
  reassignedFrom: IApprovalAssignee | null;
}

export interface IApprovalItemRequestsResult {
  value: IApprovalItemRequest[];
}
