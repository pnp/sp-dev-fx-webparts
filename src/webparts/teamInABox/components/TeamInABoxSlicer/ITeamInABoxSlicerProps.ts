import { ITeamInABoxContainerProps } from "../TeamInABoxContainer/index";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { MatterCallback } from "../../../../models/index";

export interface ITeamInABoxSlicerProps {
    context: IWebPartContext;
    onMatterSelect: MatterCallback;
}
