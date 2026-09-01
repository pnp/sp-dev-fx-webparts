export interface IRequestPerson {
  id: number;
  title?: string;
  email?: string;
}

export type RequestStatus = "Pending" | "Approved" | "Rejected";

export interface IRequestItem {
  id: number;
  title: string;
  status: RequestStatus;
  approver: IRequestPerson | undefined;
  requester: IRequestPerson | undefined;
  submitted: string | undefined;
  decisionDate: string | undefined;
  decisionComment: string | undefined;
  requestType?: string;
  amount?: number;
  description?: string;
}
