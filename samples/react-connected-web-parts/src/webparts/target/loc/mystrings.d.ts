declare interface ITargetWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	FirstName: string;
	LastName: string;
	NotSpecified: string;
	Title: string;
	ComplexGroupName: string;
	Preferences: string;
	Color: string;
	Date: string;
	Like: string;
	Yes: string;
	No: string;
	PageEnvironmentGroupName: string;
	UserName: string;
}

declare module 'TargetWebPartStrings' {
  const strings: ITargetWebPartStrings;
  export = strings;
}
