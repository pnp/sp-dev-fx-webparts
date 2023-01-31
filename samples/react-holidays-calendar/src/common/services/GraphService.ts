/* eslint-disable */

import { Event as IEventType, User } from "@microsoft/microsoft-graph-types";

import { MSGraphClientV3, GraphRequest } from "@microsoft/sp-http-msgraph";

export class GraphService {
	private context: any;

	constructor(context: any) {
		this.context = context;
	}

	private getClient = async (): Promise<MSGraphClientV3> => {
		return await this.context.msGraphClientFactory.getClient("3");
	};
	public getMyInformation = async () => {
		const client = await this.getClient();
		const request: GraphRequest = client.api("/me");
		const employeeInfo: User = await request.get();
		return Promise.resolve(employeeInfo);
	};
	public getMyTimeZone = async (): Promise<string> => {
		const client = await this.getClient();
		const request: GraphRequest = client.api("/me/mailboxSettings");
		const response = await request.get();
		return Promise.resolve(response.timeZone);
	};

	public createEvent = async (detail: IEventType): Promise<any> => {
		const client = await this.getClient();
		const request: GraphRequest = client.api("/me/events");

		const response = await request.post(detail);

		return Promise.resolve(response);
	};
}
