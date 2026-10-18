export enum GlossaryStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}

export interface ISPHyperlinkField {
  Description: string | null;
  Url: string | null;
}

export interface IGlossaryListItem {
  Id: number;
  Title: string;
  Description: string | null;
  ApplicationUrl: ISPHyperlinkField | null;
  DetailsUrl: ISPHyperlinkField | null;
  Status: string;
  AlphabetLetter: string; 
  Modified?: string;
}

export interface IGlossaryItem {
  id: number;
  title: string;
  description: string;
  applicationUrl: string | null;
  applicationUrlLabel: string | null;
  detailsUrl: string | null;
  detailsUrlLabel: string | null;
  alphabetLetter: string;
  status: GlossaryStatus;
}

export interface IGlossaryGroup {
  letter: string;
  items: IGlossaryItem[];
}
