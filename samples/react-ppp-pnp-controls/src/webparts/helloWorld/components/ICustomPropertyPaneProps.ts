import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IHelloWorldWebPartProps } from "../HelloWorldWebPart";

export interface ICustomPropertyPaneProps {
    context: WebPartContext;
    properties: IHelloWorldWebPartProps;
    updateWebPartProperty: Function;
}