
import { SocialMediaGroup } from "../models/SocialMediaGroup";
import { SPSocialMediaPost, SPSocialMediaGroup } from "../models/SPSocialMediaPost";
import {ItemAddResult} from "sp-pnp-js";

export interface ISocialMediaPostsProvider {
  /**
   * Gets all the posts and parent groups pointing to the current page
   */
  getSocialMediaPostsByGroups(): Promise<SocialMediaGroup[]>;
  /**
   * Check if the current user has the effective permissions to edit the two lists (properties)
   */
  currentUserGroupEditPermission(): Promise<boolean>;
  currentUserPostEditPermission(): Promise<boolean>;

  getSocialMediaGroups(): Promise<SPSocialMediaGroup[]>;

  addPost(itemToAdd: SPSocialMediaPost): Promise<ItemAddResult>;
  addGroup(itemToAdd: SPSocialMediaGroup): Promise<ItemAddResult>;

}
