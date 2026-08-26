import { IPlanerIds } from ".";
import { MSGraphClientV3 } from '@microsoft/sp-http';

// external props set when using the field control
export interface IPlanBucketSelectorProps {
  // text label shown for the control
  label: string;
  // disable or enable the control
  disabled?: boolean;
  // callback when user selects an astronaut in the selector
  onChanged: (ids: IPlanerIds) => void;
  // the currently planId and bucketId
  planId: string;
  bucketId: string;
  // Microsoft Graph client instance
  graphClient: MSGraphClientV3;
  // M365 Group ID
  groupId: string;
}
