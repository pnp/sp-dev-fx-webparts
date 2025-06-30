declare interface ISourceWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	DescriptionFieldLabel: string;
	FirstName: string;
	LastName: string;
	Preferences: string;
	BadPropertyId: string;
	Title: string;
	Color: string;
	Date: string;
	Like: string;
	Red: string;
	Green: string;
	Blue: string;
}

declare module 'SourceWebPartStrings' {
  const strings: ISourceWebPartStrings;
  export = strings;
}
