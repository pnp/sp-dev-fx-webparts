export enum FileContentType {
	Blob,
	Text,
	ArrayBuffer,
	JSON
}

export enum MessageScope {
	Success,
	Failure,
	Warning,
	Info,
	Blocked,
	SevereWarning
}

export enum SyncType {
	Manual = "Manual",
	Azure = "Azure",
	Template = "Template"
}

export enum JobStatus {
	Submitted = "Submitted",
	InProgress = "In-Progress",
	Completed = "Completed",
	CompletedWithError = "Completed With Error",
	Error = "Error"
}

export interface IUserInfo {
	ID: number;
	Email: string;
	LoginName: string;
	DisplayName: string;
	Picture: string;
	IsSiteAdmin: boolean;
	Groups: string[];
}

export interface IPropertyMappings {
	ID: number;
	Title: string;
	AzProperty: string;
	SPProperty: string;
	IsActive: boolean;
	AutoSync: boolean;
	IsIncluded?: boolean;
}

export interface IPropertyPair {
	name: string;
	value: string;
}

export interface IUserPropertyMapping {
	UserID: string;
	Properties: IPropertyPair[];
}

export interface IJsonMapping {
	targetSiteUrl?: string;
	targetAdminUrl?: string;
	values?: IUserPropertyMapping[];
}

