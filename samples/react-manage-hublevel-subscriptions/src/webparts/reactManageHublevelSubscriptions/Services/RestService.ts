import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class RestService{
    public async GetMethod(context:WebPartContext, endPoint:string, headers:Headers){
        try{
            const response = await context.spHttpClient.get(endPoint, SPHttpClient.configurations.v1,{
                headers: headers
            });
            if (!response || !response.ok) {
                throw new Error(`Something went wrong when executing GetMethod at Rest Service. Status='${response.status}'`);
            }
            if(response.ok){
                const results = await response.json();
                return results;
            }else {
                throw new Error(response.statusText);
            }
        }catch (error) {
          console.error("[Rest Service - GetMethod()]", error, "React Manage Hublevel subscriptions");
          throw error;
        }
    }

    //Update-Patch Method Implementation
    public async PatchMethod(context:WebPartContext, endPoint:string, headers:Headers, body:any){
        try{
            const response = await context.spHttpClient.fetch(endPoint, SPHttpClient.configurations.v1,{
                method: "PATCH",
                body:JSON.stringify(body),
                headers: headers
            });
            if (!response || !response.ok) {
                throw new Error(`Something went wrong when executing PatchMethod at Rest Service. Status='${response.status}'`);
            }
            if(response.ok){
                //If the subscription is found and successfully updated, a 204 No Content response is returned.
                return response.status;
            }else {
                throw new Error(response.statusText);
            }
        }
        catch (error) {
            console.error("[Error at Patch Method-RestService]", error, "React Manage Hublevel subscriptions");
            throw error;
        }
    }
}