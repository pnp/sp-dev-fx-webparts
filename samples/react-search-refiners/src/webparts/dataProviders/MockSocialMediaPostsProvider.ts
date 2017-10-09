import { ISocialMediaPostsProvider } from "./ISocialMediaPostsProvider";
import { SocialMediaGroup } from "../models/SocialMediaGroup";
import {SPSocialMediaGroup, SPSocialMediaPost} from "../models/SPSocialMediaPost";
import {ItemAddResult} from "sp-pnp-js";

export class MockSocialMediaPostsProvider implements ISocialMediaPostsProvider{

    private _socialMediaPostsByGroups: SocialMediaGroup[];
    private _socialMediaGroups: SPSocialMediaGroup[];
    public constructor() {
      this._socialMediaGroups = [
        {
          Id: 1,
          Title:"Mock-Contribuer tôt à votre RÉER",
          Page: {Id:1},
        },
        {
          Id: 2,
          Title: "Mock-Transférer des placements vers votre RÉER",
          Page: {Id:1},
        },
        {
          Id: 3,
          Title: "Mock-RÉER du conjoint après 71 ans",
          Page: {Id:1},
        }
      ];
      this._socialMediaPostsByGroups = [
        {
          Id: 1,
          Title: "Mock-Contribuer tôt à votre RÉER",
          Posts: [
            {
              Id: 1,
              Title: "Mock-Saviez-vous que , plus tôt vous contribuez à votre REER, plus vous bénéficierez des retombes de taxes à l'abri de l'impôt ? Appelez-moi pour",
            },
            {
              Id: 2,
              Title: "Mock-Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viv",
            }
          ]
        },
        {
          Id: 2,
          Title: "Mock-Transférer des placements vers votre RÉER",
          Posts:[
            {
              Id: 3,
              Title: "Mock-Transférer des placements vers votre REER - 1. Lorem ipsum",
            },
            {
              Id: 4,
              Title: "Mock-Transférer des placements vers votre REER - 2. Lorem ipsum",
            }
          ]
        },
        {
          Id: 3,
          Title: "Mock-RÉER du conjoint après 71 ans",
          Posts:[
            {
              Id: 5,
              Title: "Mock-REER du conjoint après 71 ans - 1. Lorem ipsum dolor est",
            },
            {
              Id: 6,
              Title: "Mock-REER du conjoint après 71 ans - 2. Lorem ipsum dolor est",
            }
          ]
        }
      ];
    }
  public getSocialMediaPostsByGroups(): Promise<SocialMediaGroup[]>{
      const pSMG = new Promise<SocialMediaGroup[]> ((resolve, reject) => {

        // Simulate an async call
        setTimeout(() => {
          resolve(this._socialMediaPostsByGroups);
        }, 500);
      });
      return pSMG;
  }

  public getSocialMediaGroups(): Promise<SPSocialMediaGroup[]> {
    const pSMG = new Promise<SPSocialMediaGroup[]> ((resolve, reject) => {
      // Simulate an async call
      setTimeout(() => {
        resolve(this._socialMediaGroups);
      }, 500);
    });
    return pSMG;
  }

  public addGroup(itemToAdd: SPSocialMediaGroup): Promise<ItemAddResult>  {
    return Promise.resolve({item:null,data:null});
  }
  public addPost(itemToAdd: SPSocialMediaPost): Promise<ItemAddResult>{
    return Promise.resolve({item:null,data:null});
  }

  public currentUserGroupEditPermission(): Promise<boolean> { return Promise.resolve(true);}
  public currentUserPostEditPermission(): Promise<boolean>  { return Promise.resolve(true);}
}
