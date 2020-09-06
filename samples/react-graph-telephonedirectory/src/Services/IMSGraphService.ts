import { MSGraphClient } from "@microsoft/sp-http";
import { IUserProperties } from "./IUserProperties";
/**
 * Service to declare the methods
 */
export interface IMSGraphService{
    getUserProperties(email:string,context:MSGraphClient):Promise<IUserProperties[]>;
    getUserPropertiesBySearch(searchFor:string,client:MSGraphClient):Promise<IUserProperties[]>;
    getUserPropertiesByFirstName(searchFor:string,client:MSGraphClient):Promise<IUserProperties[]>;
    getUserPropertiesByLastName(searchFor:string,client:MSGraphClient):Promise<IUserProperties[]>;
}