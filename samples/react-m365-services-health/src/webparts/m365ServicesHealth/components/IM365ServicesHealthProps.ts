import { WebPartContext } from "@microsoft/sp-webpart-base";
import { GraphService } from "../../../common/services/GraphService";
export interface IM365ServicesHealthProps {
	title: string;
	context: WebPartContext;
	graphService: GraphService;
}
