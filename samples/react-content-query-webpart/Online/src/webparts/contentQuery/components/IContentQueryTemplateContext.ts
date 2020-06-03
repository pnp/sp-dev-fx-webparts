import { PageContext } from '@microsoft/sp-page-context';

export interface IContentQueryTemplateContext {
	pageContext: PageContext;
	webUrl: string;
	listId: string;
	items: any[];
	accessDenied: boolean;
	webNotFound: boolean;
	callTimeStamp: number;
}