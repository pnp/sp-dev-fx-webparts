// Type definitions for the WhoIsIn component
// - IWhoIsInItem describes the shape of a record from the WhoIsIn SharePoint list.
// - IWhoIsInProps lists props passed into the WhoIsIn React component.
export interface IWhoIsInItem {
  ID?: number;
  Id?: number;
  BaseLocation?: string;
  TravellingTo?: string;
  From?: string;
  To?: string;
  Employee?: string | {
    JobTitle?: string;
    Title?: string;
    EMail?: string;
    Id?: number;
  };
  EmployeePhotoUrl?: string;
}

export interface IWhoIsInProps {
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  items?: IWhoIsInItem[];
}
