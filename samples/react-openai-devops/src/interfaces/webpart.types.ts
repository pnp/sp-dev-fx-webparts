export interface IProfile {
  displayName?: string;
  publicAlias?: string;
  emailAddress?: string;
  coreRevision?: number;
  timeStamp?: string;
  id: string;
  revisionrevision?: number;
}

export interface IWorkItemReference {
  id?: string;
  url?: string;
}
export interface IWorkItem {
  id?: number;
  url?: string;
  rev?: number;
  fields?: {};
  WorkItemRelation?: any;
}
export interface IWorkItemDetails {
  url: string;
  title: string;
  description: string;
  teamProject: string;
  orgName: string;
  createdDate: string;
  assignedTo: {
    displayName: string;
    id: string;
    uniqueName: string;
    imageUrl: string;
  };
}
export interface IWorkItemBug {
  url: string;
  title: string;
  description: string;
  teamProject: string;
  orgName: string;
  createdDate: string;
  assignedTo: {
    displayName: string;
    id: string;
    uniqueName: string;
    imageUrl: string;
  };
  priority: number;
  severity: string;
}
export interface ICommitDetail {
  commitId: string;
  author: Author;
  committer: Author;
  comment: string;
  changeCounts: ChangeCounts;
  url: string;
  remoteUrl: string;
}

interface ChangeCounts {
  Add: number;
  Edit: number;
  Delete: number;
}

interface Author {
  name: string;
  email: string;
  date: string;
}

export interface IAccount {
  accountId: string;
  accountUri?: string;
  accountName: string;
  properties?: unknown;
}

export interface IChatMessage {
  position: string;
  type: string;
  title: string;
  text: string | JSX.Element | JSX.Element[];
  date: Date;
  focus?: boolean;
  status?: "waiting" | "sent" | "received" | "read";
  className?: string;
}
