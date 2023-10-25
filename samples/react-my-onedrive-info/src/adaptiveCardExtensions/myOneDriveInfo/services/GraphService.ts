import { AdaptiveCardExtensionContext } from "@microsoft/sp-adaptive-card-extension-base";
import { MSGraphClientV3, GraphRequest } from "@microsoft/sp-http-msgraph";
import { Drive } from "@microsoft/microsoft-graph-types";
export class GraphService {
	private context: AdaptiveCardExtensionContext;

	constructor(context: AdaptiveCardExtensionContext) {
		this.context = context;
	}

	private getClient = async (): Promise<MSGraphClientV3> => {
		return await this.context.msGraphClientFactory.getClient("3");
	};

	public getMyDriveInfo = async (): Promise<Drive> => {
		try {
			const client = await this.getClient();
			const request: GraphRequest = client.api("/me/drive");
			const driveInfo: Drive = await request.get();
			return Promise.resolve(driveInfo);
		} catch (ex) {
			return Promise.reject(ex);
		}
	};
}
