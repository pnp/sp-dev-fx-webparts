export enum MessageScope {
	Success,
	Failure,
	Warning,
	Info,
	Blocked,
	SevereWarning
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
export interface IUserPickerInfo {
    Title: string;
    LoginName: string;    
    PhotoUrl: string;
    AADPhotoUrl?: string;
}
export interface IAzFuncValues {
    userid: string;
    picturename: string;
}
export enum SyncType {
	Manual = "Manual",
	Bulk = "Bulk",
}
export enum JobStatus {
	Submitted = "Submitted",
	InProgress = "In-Progress",
	Completed = "Completed",
	CompletedWithError = "Completed With Error",
	Error = "Error"
}