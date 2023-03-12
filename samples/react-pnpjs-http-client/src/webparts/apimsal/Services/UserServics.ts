// Import the reference interface for the service
import { IUserService } from "./IUserService";

// Import types for ServiceScope logic
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import {  HttpClient } from '@microsoft/sp-http';

export class UserServics implements IUserService {
     // This private instance will be initialized via the ServiceScope
     private _httpClient: HttpClient;

     // ServiceKey for our custom service
     public static readonly serviceKey: ServiceKey<IUserService> = 
         ServiceKey.create<IUserService>('Git:UserService', UserServics);
 
     /**
      * Constructs a new instance of the UserService
      * @param {ServiceScope} serviceScope - The ServiceScope instance 
      */
     public constructor(serviceScope: ServiceScope) {
        
         // Initialized the PnPjs framework for SPFx
         serviceScope.whenFinished(() => {
             this._httpClient = serviceScope.consume(HttpClient.serviceKey);
         });
     }
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     public async getUserDetails(upn: string,url:string): Promise<any> {
        const _client: HttpClient = await this._httpClient;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const httpClientOptions:any = {
            headers: { "Content-Type": "application/json"  },
            method:"GET"
            
          };
          let userDets= null;
       await  _client.fetch("https://api.github.com/users/divya-akula",HttpClient.configurations.v1,httpClientOptions).
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        then((res:any): Promise<any>=>{
          userDets=  res.json();
          return userDets;
        }).
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch((err:any)=>{
          console.warn(err);
        });
        return userDets;
     }
}