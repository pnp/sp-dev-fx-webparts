import { IGreeting } from "./IGreeting";
//import * as angular from 'angular';
import * as $pnp from "sp-pnp-js";

export class GreetingService {
  constructor() {}

  public getCurrentUserInformation = (): Promise<IGreeting> => {
    let promise = new Promise<IGreeting>((resolve, reject) => {
      let ig: IGreeting = {
        userImageUrl: "",
        userJobTitle: "",
        userName: "",
        webSiteTitle: ""
      };

      $pnp.sp.profiles.myProperties.get().then(
        data => {
          data.UserProfileProperties.forEach(property => {
            if (property.Key == "Title") {
                ig.userJobTitle = property.Value;
            }

            if (property.Key == "PictureURL") {
              if(property.Value !==''){
                ig.userImageUrl = property.Value;}
              else{
                ig.userImageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
              }
              ig.userImageUrl = ig.userImageUrl.replace("MThumb", "LThumb");
            }
          });
          resolve(ig);
        },
        error => {
          reject(error);
        }
      );
    });
    return promise;
  }
}
