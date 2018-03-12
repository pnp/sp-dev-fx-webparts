import { IQueryFilter } from '../../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/IQueryFilter';

export interface IQuerySettings {
	webUrl: string;
	listId: string;
	limitEnabled: boolean;
	itemLimit: number;
	orderBy: string;
	orderByDirection: string;
	filters: IQueryFilter[];
	viewFields: string[];
}