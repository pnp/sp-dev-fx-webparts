import { MSGraphClientV3 } from '@microsoft/sp-http';
import { IDropdownOption } from "@fluentui/react";

export interface IPlanBucketSelectorState {
  // flag indicating if component it loading options & busy
  isLoading: boolean;

  selectedPlanKey: string | number;
  
  planOptions: IDropdownOption[];

  bucketOptions: IDropdownOption[];

  planId?: string;
  bucketId?: string;
  newPlannerName: string;
  newBucketName: string;
  showAddNewPlan: boolean;
  disableAdd: boolean;
  // Microsoft Graph client instance
  graphClient: MSGraphClientV3;
  // M365 Group ID
  groupId: string;
}