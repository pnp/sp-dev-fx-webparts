import { Moment } from "moment-timezone";
import { MomentRange } from "common";
import { IViewProps } from "./IViewProps";
import { IDateRotatorController } from "./DateRotatorController";
import { ViewKeys } from "model";
import { Configuration } from "schema";

export interface IViewDescriptor {
    id: ViewKeys;
    title: string;
    dateRotatorController: IDateRotatorController;
    dateRange: (anchorDate: Moment, config: Configuration) => MomentRange;
    renderer: (props: IViewProps) => JSX.Element;
}