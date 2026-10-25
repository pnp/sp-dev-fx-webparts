export const pageOwnerField: string = "PageOwner";
export const lastConfirmedField: string = "LastConfirmed";
export const reviewListTitle: string = "Page Review Requests";
export const pageTitleField: string = "PageTitle";
export const pageLinkField: string = "PageLink";
/** Indexed single line of text. Server-relative page path, used because PageLink is a Note and cannot be $filter'd. */
export const pageKeyField: string = "PageKey";
export const pageKeyMaxLength: number = 255;
export const flaggedByField: string = "FlaggedBy";
export const noteField: string = "Note";
export const statusField: string = "Status";
export const statusNew: string = "New";
export const pageLibraryTemplate: number = 119;
export const noteMaxLength: number = 2000;

export const pageOwnerSchemaXml: string =
  '<Field Type="User" DisplayName="Page Owner" Name="PageOwner" StaticName="PageOwner" Group="Page Trust" List="UserInfo" UserSelectionMode="PeopleOnly" UserSelectionScope="0" ShowField="ImnName" />';

export const lastConfirmedSchemaXml: string =
  '<Field Type="DateTime" DisplayName="Last Confirmed" Name="LastConfirmed" StaticName="LastConfirmed" Group="Page Trust" Format="DateOnly" FriendlyDisplayFormat="Disabled" />';

export const pageTitleSchemaXml: string =
  '<Field Type="Text" DisplayName="Page title" Name="PageTitle" StaticName="PageTitle" Group="Page Trust" MaxLength="255" />';

export const pageLinkSchemaXml: string =
  '<Field Type="Note" DisplayName="Page link" Name="PageLink" StaticName="PageLink" Group="Page Trust" NumLines="3" RichText="FALSE" AppendOnly="FALSE" Description="Absolute URL of the page." />';

export const pageKeySchemaXml: string =
  '<Field Type="Text" DisplayName="Page key" Name="PageKey" StaticName="PageKey" Group="Page Trust" MaxLength="255" Description="Server-relative URL of the page. Used to count open review requests." />';

export const flaggedBySchemaXml: string =
  '<Field Type="User" DisplayName="Flagged by" Name="FlaggedBy" StaticName="FlaggedBy" Group="Page Trust" UserSelectionMode="PeopleOnly" />';

export const noteSchemaXml: string =
  '<Field Type="Note" DisplayName="Note" Name="Note" StaticName="Note" Group="Page Trust" NumLines="6" RichText="FALSE" AppendOnly="FALSE" />';

export const statusSchemaXml: string =
  '<Field Type="Choice" DisplayName="Status" Name="Status" StaticName="Status" Group="Page Trust" Format="Dropdown">' +
  "<Default>New</Default>" +
  "<CHOICES><CHOICE>New</CHOICE><CHOICE>In review</CHOICE><CHOICE>Resolved</CHOICE></CHOICES>" +
  "</Field>";
