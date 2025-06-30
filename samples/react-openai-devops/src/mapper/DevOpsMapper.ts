import { AppConstants } from "../constants/AppConstants";
import { getRelativeTime } from "../helpers/UtilityHelper";
import {
  ICommitDetail,
  IWorkItemBug,
  IWorkItemDetails,
} from "../interfaces/webpart.types";

export default class DevOpsMapper {
  public static mapDevOpsCommits(commit: ICommitDetail): ICommitDetail {
    return {
      commitId: commit.commitId,
      author: {
        name: commit.author.name ?? "",
        email: commit.author.email ?? "",
        date: getRelativeTime(commit.author.date) ?? "",
      },
      committer: {
        name: commit.committer.name ?? "",
        email: commit.committer.email ?? "",
        date: getRelativeTime(commit.committer.date) ?? "",
      },
      comment: commit.comment ?? "",
      changeCounts: {
        Add: commit.changeCounts.Add,
        Edit: commit.changeCounts.Edit,
        Delete: commit.changeCounts.Delete,
      },
      url: commit.url,
      remoteUrl: commit.remoteUrl ?? "",
    };
  }
}

export const mapDevOpsTasks = (item: any) => {
  const workItemDetails: IWorkItemDetails = {
    url: `https://dev.azure.com/${AppConstants.getDevOpsOrganization()}/${
      item.fields["System.TeamProject"]
    }/_workitems/edit/${item.id}/`,
    title: item.fields["System.Title"] ?? "",
    description: item.fields["System.Description"] ?? "",
    teamProject: item.fields["System.TeamProject"] ?? "",
    orgName: AppConstants.getDevOpsOrganization(),
    createdDate: item.fields["System.CreatedDate"] ?? "",
    assignedTo: {
      displayName: item.fields["System.AssignedTo"]?.displayName ?? "",
      id: item.fields["System.AssignedTo"]?.id ?? "",
      uniqueName: item.fields["System.AssignedTo"]?.uniqueName ?? "",
      imageUrl: item.fields["System.AssignedTo"]?.imageUrl ?? "",
    },
  };
  return workItemDetails;
};

export const mapDevOpsBugs = (item: any) => {
  const workItemDetails: IWorkItemBug = {
    url: `https://dev.azure.com/${AppConstants.getDevOpsOrganization()}/${
      item.fields["System.TeamProject"]
    }/_workitems/edit/${item.id}/`,
    title: item.fields["System.Title"] ?? "",
    description: item.fields["System.Description"] ?? "",
    teamProject: item.fields["System.TeamProject"] ?? "",
    orgName: AppConstants.getDevOpsOrganization(),
    createdDate: item.fields["System.CreatedDate"] ?? "",
    assignedTo: {
      displayName: item.fields["System.AssignedTo"]?.displayName ?? "",
      id: item.fields["System.AssignedTo"]?.id ?? "",
      uniqueName: item.fields["System.AssignedTo"]?.uniqueName ?? "",
      imageUrl: item.fields["System.AssignedTo"]?.imageUrl ?? "",
    },
    priority: item.fields["Microsoft.VSTS.Common.Priority"] ?? undefined,
    severity: item.fields["Microsoft.VSTS.Common.Severity"] ?? "",
  };
  return workItemDetails;
};

// export const mapDevOpsCommits = (
//   item: ICommitDetail,
//   repositoryName: string
// ) => {
//   const commitItem: ICommitDetail = {
//     commitId: item.commitId,
//     author: {
//       name: item.author.name ?? "",
//       email: item.author.email ?? "",
//       date: getRelativeTime(item.author.date) ?? "",
//     },
//     committer: {
//       name: item.committer.name ?? "",
//       email: item.committer.email ?? "",
//       date: getRelativeTime(item.committer.date) ?? "",
//     },
//     comment: item.comment ?? "",
//     changeCounts: {
//       Add: item.changeCounts.Add,
//       Edit: item.changeCounts.Edit,
//       Delete: item.changeCounts.Delete,
//     },
//     url: item.url,
//     remoteUrl: item.remoteUrl ?? "",
//   };
//   return commitItem;
// };
