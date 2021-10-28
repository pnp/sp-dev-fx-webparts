/* tslint:disable */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISelectedProperties } from "../../entities/ISeletedProperties";

export interface IBannerProps {
   selectedProperties:ISelectedProperties;
   webpartContext:  WebPartContext;
}
