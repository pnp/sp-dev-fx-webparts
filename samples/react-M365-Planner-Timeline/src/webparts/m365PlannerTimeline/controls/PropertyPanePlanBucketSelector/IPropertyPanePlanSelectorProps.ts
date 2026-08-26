import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { MSGraphClientV3 } from '@microsoft/sp-http';

export interface IPlanerIds {
  planId: string;
  bucketId: string;
}

// external props set when using the field control
export interface IPropertyPanePlanSelectorProp {
  // text label shown for the control
  label: string;
  // disable or enable the control
  disabled?: boolean;
  // callback when user selects an astronaut in the selector
  onPropertyChanged: (propertyName: string, ids: IPlanerIds) => void;
  // the currently planId and bucketId
  planId: string;
  bucketId: string;
  // Microsoft Graph client instance
  graphClient: MSGraphClientV3;
  // M365 Group ID
  groupId: string;
}

// internal props used by SPFx for rendering
export interface IPropertyPanePlanSelectorPropsInternal
  extends IPropertyPaneCustomFieldProps, IPropertyPanePlanSelectorProp { }