import { WebPartContext } from "@microsoft/sp-webpart-base";
import {IDropdownOption} from '@fluentui/react';
import { DisplayMode } from '@microsoft/sp-core-library';
import {MessageBarType} from 'office-ui-fabric-react';

export interface IManageHublevelSubscriptionsProps {
  _context: WebPartContext;
  displayMode: DisplayMode;
  webpartTitle: string;
  setWebPartTitle: (value: string) => void;
}

export interface SubscriptionModel{
  id:string;
  clientState:string;
  expirationDateTime:string;
  notificationUrl:string;
  resource:string;
}

export interface IManageHublevelSubscriptionsState{
  dropDownSiteOptions?: IDropdownOption[];
  dropDownListOptions?: IDropdownOption[];
  selectedSite ?: IDropdownOption;
  selectedList?: IDropdownOption;
  isListsToBeLoaded?:boolean;
  showTable?:boolean;
  subscriptions ? : SubscriptionModel[];
  callBackFromDashboard?:any;
  showMessage?:boolean;
  Message ? : string;
  MessageBarType? : MessageBarType;
  showRenewedMessage ? : boolean;
}
