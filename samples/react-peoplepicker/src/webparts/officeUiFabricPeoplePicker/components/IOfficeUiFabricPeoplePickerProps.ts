import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IOfficeUiFabricPeoplePickerProps {
  description: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  typePicker: string;
  principalTypeUser: boolean;
  principalTypeSharePointGroup: boolean;
  principalTypeSecurityGroup: boolean;
  principalTypeDistributionList: boolean;
  numberOfItems: number;
}
