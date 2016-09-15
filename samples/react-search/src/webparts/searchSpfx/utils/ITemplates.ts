export interface ITemplates {
	key: string;
	text: string;
	mappings: string;
	scripts?: IScripts[];
	styles?: IStyles[];
}

export interface IExternalTemplate {
	properties: ITemplates;
	component: Function;
}

export interface IScripts {
	url: string;
	funcName: string;
}

export interface IStyles {
	url: string;
}