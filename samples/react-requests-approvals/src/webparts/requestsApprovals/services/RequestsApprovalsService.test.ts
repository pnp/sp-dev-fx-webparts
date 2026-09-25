import type { SPFI } from "@pnp/sp";

import type { IRequestItem, RequestStatus } from "../models/IRequestItem";
import {
  assertValidStatusTransition,
  RequestsApprovalsService
} from "./RequestsApprovalsService";
import type { IRequestFieldNames, IRequestsApprovalsServiceConfig } from "./RequestsApprovalsService";

const fields: IRequestFieldNames = {
  title: "Title",
  status: "ApprovalStatus",
  approver: "AssignedApprover",
  requester: "SubmittedBy",
  submitted: "SubmittedOn",
  decisionDate: "DecisionOn",
  decisionComment: "DecisionNotes",
  requestType: "RequestType",
  amount: "Amount",
  description: "Description"
};

const config: IRequestsApprovalsServiceConfig = {
  listTitle: "Approval Requests",
  fields
};

function createListMock(): {
  query: jest.Mock;
  update: jest.Mock;
  list: {
    items: {
      select: jest.Mock;
      expand: jest.Mock;
      filter: jest.Mock;
      getById: jest.Mock;
    };
  };
  sp: SPFI;
} {
  const query = jest.fn();
  const update = jest.fn();
  const list = {
    items: {
      select: jest.fn().mockReturnThis(),
      expand: jest.fn().mockReturnThis(),
      filter: jest.fn().mockReturnValue(query),
      getById: jest.fn().mockReturnValue({ update })
    }
  };
  const sp = {
    web: {
      currentUser: jest.fn().mockResolvedValue({ Id: 42 }),
      lists: { getByTitle: jest.fn().mockReturnValue(list) }
    }
  } as unknown as SPFI;

  return { query, update, list, sp };
}

function request(status: RequestStatus = "Pending"): IRequestItem {
  return {
    id: 7,
    title: "Laptop",
    status,
    approver: { id: 42 },
    requester: { id: 9 },
    submitted: "2026-08-01T10:00:00Z",
    decisionDate: undefined,
    decisionComment: undefined
  };
}

describe("RequestsApprovalsService", () => {
  it("filters by the current user and maps configured fields", async () => {
    const mock = createListMock();
    mock.query.mockResolvedValue([
      {
        Id: 7,
        Title: "Laptop",
        ApprovalStatus: "Pending",
        AssignedApprover: { Id: 42, Title: "Ava Approver", EMail: "ava@example.com" },
        SubmittedBy: { Id: 9, Title: "Riley Requester", EMail: "riley@example.com" },
        SubmittedOn: "2026-08-01T10:00:00Z",
        DecisionOn: null,
        DecisionNotes: null,
        RequestType: "Hardware",
        Amount: 1250,
        Description: "Developer laptop"
      }
    ]);

    const result = await new RequestsApprovalsService(mock.sp, config).getPendingRequests();
    const items = mock.list.items as typeof mock.list.items & { filter: jest.Mock };

    expect(items.select).toHaveBeenCalledWith(
      "Id",
      "Title",
      "ApprovalStatus",
      "AssignedApprover/Id",
      "AssignedApprover/Title",
      "AssignedApprover/EMail",
      "SubmittedBy/Id",
      "SubmittedBy/Title",
      "SubmittedBy/EMail",
      "SubmittedOn",
      "DecisionOn",
      "DecisionNotes",
      "RequestType",
      "Amount",
      "Description"
    );
    expect(items.expand).toHaveBeenCalledWith("AssignedApprover", "SubmittedBy");
    expect(items.filter).toHaveBeenCalledWith("ApprovalStatus eq 'Pending' and AssignedApproverId eq 42");
    expect(result).toEqual([
      {
        id: 7,
        title: "Laptop",
        status: "Pending",
        approver: { id: 42, title: "Ava Approver", email: "ava@example.com" },
        requester: { id: 9, title: "Riley Requester", email: "riley@example.com" },
        submitted: "2026-08-01T10:00:00Z",
        decisionDate: undefined,
        decisionComment: undefined,
        requestType: "Hardware",
        amount: 1250,
        description: "Developer laptop"
      }
    ]);
  });

  it("rejects whitespace-only comments without updating", async () => {
    const mock = createListMock();
    const service = new RequestsApprovalsService(mock.sp, config);

    await expect(service.rejectRequest(request(), " \n\t ")).rejects.toThrow("A rejection comment is required.");
    expect(mock.update).not.toHaveBeenCalled();
  });

  it("prevents invalid status transitions", async () => {
    expect(() => assertValidStatusTransition("Approved", "Rejected")).toThrow("Invalid request status transition");

    const mock = createListMock();
    await expect(new RequestsApprovalsService(mock.sp, config).approveRequest(request("Rejected"))).rejects.toThrow(
      "Invalid request status transition"
    );
    expect(mock.update).not.toHaveBeenCalled();
  });

  it("awaits and propagates a failed update", async () => {
    const mock = createListMock();
    const error = new Error("SharePoint update failed");
    mock.update.mockRejectedValue(error);

    await expect(new RequestsApprovalsService(mock.sp, config).approveRequest(request())).rejects.toBe(error);
    expect(mock.update).toHaveBeenCalledWith(
      expect.objectContaining({ ApprovalStatus: "Approved" })
    );
  });
});
