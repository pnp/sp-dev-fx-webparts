export interface IQuestionDetails {
	Id: string;
	DisplayName: string;
	Choices?: string;
	MultiChoice?: boolean;
	StartDate: Date;
	EndDate: Date;
	UseDate: boolean;
	SortIdx: number;
}