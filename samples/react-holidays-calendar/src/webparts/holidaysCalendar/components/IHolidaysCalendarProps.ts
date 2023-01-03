import { GraphService } from "./../../../common/services/GraphService";
import { SPService } from "../../../common/services/SPService";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHolidaysCalendarProps {
	isDarkTheme: boolean;
	environmentMessage: string;
	hasTeamsContext: boolean;
	userDisplayName: string;
	spService: SPService;
	graphService: GraphService;
	context: WebPartContext;
	showDownload: boolean;
	showFixedOptional: boolean;
	title: string;
}
