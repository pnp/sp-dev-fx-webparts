import type { SPFI } from "@pnp/sp";

import type { IRequestItem, IRequestPerson, RequestStatus } from "../models/IRequestItem";

export interface IRequestFieldNames {
  title: string;
  status: string;
  approver: string;
  requester: string;
  submitted: string;
  decisionDate: string;
  decisionComment: string;
  requestType?: string;
  amount?: string;
  description?: string;
}

export interface IRequestsApprovalsServiceConfig {
  listTitle: string;
  fields: IRequestFieldNames;
}

const APPROVED: RequestStatus = "Approved";
const REJECTED: RequestStatus = "Rejected";

export function canTransition(from: string, to: RequestStatus): boolean {
  return from === "Pending" && (to === APPROVED || to === REJECTED);
}

export function assertValidStatusTransition(from: string, to: RequestStatus): void {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid request status transition: ${from} -> ${to}`);
  }
}

export function validateRejectionComment(comment: string): void {
  if (typeof comment !== "string" || comment.trim().length === 0) {
    throw new Error("A rejection comment is required.");
  }
}

function mapPerson(value: unknown): IRequestPerson | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const person = value as { Id?: number; Title?: string; EMail?: string; Email?: string };
  if (typeof person.Id !== "number") {
    return undefined;
  }

  return {
    id: person.Id,
    title: person.Title,
    email: person.EMail || person.Email
  };
}

function mapDate(value: unknown): string | undefined {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value === null || value === undefined ? undefined : String(value);
}

export function mapRequestItem(raw: Record<string, unknown>, fields: IRequestFieldNames): IRequestItem {
  const item: IRequestItem = {
    id: Number(raw.Id),
    title: String(raw[fields.title] || ""),
    status: String(raw[fields.status] || "") as RequestStatus,
    approver: mapPerson(raw[fields.approver]),
    requester: mapPerson(raw[fields.requester]),
    submitted: mapDate(raw[fields.submitted]),
    decisionDate: mapDate(raw[fields.decisionDate]),
    decisionComment:
      raw[fields.decisionComment] === null || raw[fields.decisionComment] === undefined
        ? undefined
        : String(raw[fields.decisionComment])
  };

  if (fields.requestType) {
    item.requestType =
      raw[fields.requestType] === null || raw[fields.requestType] === undefined
        ? undefined
        : String(raw[fields.requestType]);
  }
  if (fields.amount) {
    const amount = raw[fields.amount];
    item.amount = amount === null || amount === undefined ? undefined : Number(amount);
  }
  if (fields.description) {
    item.description =
      raw[fields.description] === null || raw[fields.description] === undefined
        ? undefined
        : String(raw[fields.description]);
  }

  return item;
}

export class RequestsApprovalsService {
  public constructor(
    private readonly sp: SPFI,
    private readonly config: IRequestsApprovalsServiceConfig
  ) {}

  public async getPendingRequests(): Promise<IRequestItem[]> {
    const { fields } = this.config;
    const currentUser = await this.sp.web.currentUser();
    const selectFields = [
      "Id",
      fields.title,
      fields.status,
      `${fields.approver}/Id`,
      `${fields.approver}/Title`,
      `${fields.approver}/EMail`,
      `${fields.requester}/Id`,
      `${fields.requester}/Title`,
      `${fields.requester}/EMail`,
      fields.submitted,
      fields.decisionDate,
      fields.decisionComment,
      fields.requestType,
      fields.amount,
      fields.description
    ].filter((field): field is string => Boolean(field));

    const rawItems = await this.sp.web.lists
      .getByTitle(this.config.listTitle)
      .items
      .select(...selectFields)
      .expand(fields.approver, fields.requester)
      .filter(`${fields.status} eq 'Pending' and ${fields.approver}Id eq ${currentUser.Id}`)();

    return rawItems.map((item: Record<string, unknown>) => mapRequestItem(item, fields));
  }

  public async approveRequest(item: IRequestItem): Promise<void> {
    await this.updateRequest(item, APPROVED);
  }

  public async rejectRequest(item: IRequestItem, comment: string): Promise<void> {
    validateRejectionComment(comment);
    await this.updateRequest(item, REJECTED, comment);
  }

  private async updateRequest(item: IRequestItem, status: RequestStatus, comment?: string): Promise<void> {
    assertValidStatusTransition(item.status, status);

    const values: Record<string, string> = {
      [this.config.fields.status]: status,
      [this.config.fields.decisionDate]: new Date().toISOString()
    };
    if (status === REJECTED) {
      values[this.config.fields.decisionComment] = comment as string;
    }

    await this.sp.web.lists
      .getByTitle(this.config.listTitle)
      .items
      .getById(item.id)
      .update(values);
  }
}
