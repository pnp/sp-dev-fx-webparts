export interface IWhoIsInItem {
  ID?: number;
  Id?: number;
  BaseLocation?: string;
  TravellingTo?: string;
  From?: string;
  To?: string;
  // Employee can be either a display string or an object with details from SharePoint
  Employee?: string | {
    JobTitle?: string;
    Title?: string;
    EMail?: string;
    Id?: number;
  };
  // optional photo url stored on the item
  EmployeePhotoUrl?: string;
}

export interface IWhoIsInProps {
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  // items loaded from the WhoIsIn SharePoint list (optional)
  items?: IWhoIsInItem[];
}
