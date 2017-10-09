import { ISocialMediaPostsProvider } from "./ISocialMediaPostsProvider";
import { SocialMediaGroup, SocialMediaPost } from "../models/SocialMediaGroup";
import { SPSocialMediaPost, SPSocialMediaGroup } from "../models/SPSocialMediaPost";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import {
  ConsoleListener, Logger, LogLevel, setup, Web, List, ODataEntityArray, PermissionKind, TypedHash, ItemAddResult
} from "sp-pnp-js";

export class SharePointSocialMediaPostsProvider implements ISocialMediaPostsProvider {

  /**Global list constants */
  public static POST_LIST_URL: string = "/Lists/Post";
  public static GROUP_LIST_URL: string = "/Lists/PostGroup";
  public static ORDER_BY_FIELD: string[] = ["PostGroup/Order0", "Order0"];
  public static POST_SELECTED_FIELDS: string[] = ["Id", "Title", "PostGroup", "PostGroup/Id", "PostGroup/Title"];
  public static GROUP_SELECTED_FIELDS: string[] = ["Id", "Title", "Page/Id"];
  public static POST_EXPAND_TO_GROUP: string = "PostGroup";
  public static GROUP_EXPAND_TO_PAGE: string = "Page";
  public static PAGE_LOOKUP_QUERY = "Page/Id eq ";
  public static GROUP_LOOKUP_QUERY_FIELD = "PostGroup/Id";

  private context: IWebPartContext;

  //Create Promises to maintain the permission level and the list titles.
  //These are only executed once, but async so we must keep the promise rather than the result in
  //the object because the constructor those not fulfill them in sync with the other calls.
  private _currentUserGroupEditPermission : Promise<boolean>;
  private _currentUserPostEditPermission: Promise<boolean>;
  private _postListTitle : Promise<string>;
  private _groupListTitle: Promise<string>;
  public currentUserGroupEditPermission() : Promise<boolean> { return this._currentUserGroupEditPermission; }
  public currentUserPostEditPermission() : Promise<boolean> { return this._currentUserPostEditPermission; }

  public constructor(spcontext: IWebPartContext) {
    // Set the SharePoint context
    this.context = spcontext;
    // Setup the PnP JS instance
    const consoleListener = new ConsoleListener();
    Logger.subscribe(consoleListener);

    this._AssignListTitlesAndPermissions();

    // To limit the payload size, we set odata=nometadata
    // We just need to get list items here
    setup({
      headers: {
        Accept: "application/json; odata=verbose",
      },
    });
  }

  public getSocialMediaPostsByGroups(): Promise<SocialMediaGroup[]> {
    const web = new Web(this.context.pageContext.web.absoluteUrl);
    const currentPageID = this.context.pageContext.listItem.id;
    let groupIDsToQuery: string = "";

    /***GETTING THE GROUPS FOR THE CURRENT PAGE***/
    return this._groupListTitle
    .then((groupListTitle : string) => {
      return web.lists.getByTitle(groupListTitle).items
      .select(SharePointSocialMediaPostsProvider.GROUP_SELECTED_FIELDS.toString())
      .filter(SharePointSocialMediaPostsProvider.PAGE_LOOKUP_QUERY + currentPageID)
      .expand(SharePointSocialMediaPostsProvider.GROUP_EXPAND_TO_PAGE)
      .getAs(ODataEntityArray(SPSocialMediaGroup));})
    .then((groups: SPSocialMediaGroup[]) => {
      /***BUILD THE QUERY PARAMETER TO RETRIEVE THE POSTS FOR THE PERTINENT GROUPS ONLY.***/
      groupIDsToQuery = this._buildGroupQueryParam(groups);
      return this._postListTitle;})
    .then((postListTitle : string) => {
      /***GETTING THE POSTS FOR THE PREVIOUSLY SELECTED GROUPS***/
      return web.lists.getByTitle(postListTitle).items
       .select(SharePointSocialMediaPostsProvider.POST_SELECTED_FIELDS.toString())
       .orderBy(SharePointSocialMediaPostsProvider.ORDER_BY_FIELD.toString())
       .filter(groupIDsToQuery)
       .expand(SharePointSocialMediaPostsProvider.POST_EXPAND_TO_GROUP)
       .getAs(ODataEntityArray(SPSocialMediaPost));
      })
    /***REARRANGE THE RETURNED DATA IN THE SOCIALMEDIAGROUP FASHION***/
    .then(this._convertDataToSocialMediaGroup);
  }

  public getSocialMediaGroups(): Promise<SPSocialMediaGroup[]> {
    const web = new Web(this.context.pageContext.web.absoluteUrl);
    const currentPageID = this.context.pageContext.listItem.id;

    return this._groupListTitle
      .then((groupListTitle : string) => {
        return web.lists.getByTitle(groupListTitle).items
          .select(SharePointSocialMediaPostsProvider.GROUP_SELECTED_FIELDS.toString())
          .orderBy("Title")
          .filter(SharePointSocialMediaPostsProvider.PAGE_LOOKUP_QUERY + currentPageID)
          .expand(SharePointSocialMediaPostsProvider.GROUP_EXPAND_TO_PAGE)
          .getAs(ODataEntityArray(SPSocialMediaGroup));});
  }

  // Wrappers of a more generic _addItem method that specifies the list and the proper fields to add
  // This one adds a group to the group list.
  public addGroup(itemToAdd: SPSocialMediaGroup): Promise<ItemAddResult>  {
    const web =  new Web(this.context.pageContext.web.absoluteUrl);
    return this._groupListTitle.then((listTitle:string) => {
      return web.lists.getByTitle(listTitle).items.add({Title: itemToAdd.Title, PageId: itemToAdd.Page.Id.toString()});
    });
  }
  // This one adds a post to the post list.
  public addPost(itemToAdd: SPSocialMediaPost): Promise<ItemAddResult>{
    const web =  new Web(this.context.pageContext.web.absoluteUrl);
    return this._postListTitle.then((listTitle:string) => {
      return web.lists.getByTitle(listTitle).items.add({Title:itemToAdd.Title, PostGroupId: itemToAdd.PostGroup.Id.toString()});
    });
  }

  //Called from the constructor to populate properties to avoid multiple REST calls:
  //get the list titles based on URL to avoid multiple web service calls
  //then check the current user permissions.
  private _AssignListTitlesAndPermissions() : void {

    const web = new Web(this.context.pageContext.web.absoluteUrl);

    //Get the group list title based on URL to avoid multiple web service calls
    this._groupListTitle = this._getListByURL(SharePointSocialMediaPostsProvider.GROUP_LIST_URL)
    .then( (groupList: any) => { return groupList.Title;});

    //Do the exact same with the post list
    this._postListTitle = this._getListByURL(SharePointSocialMediaPostsProvider.POST_LIST_URL)
    .then( (postList: any) => { return postList.Title;});

    //Check the current user permission for the group list using the new list title accessor.
    this._currentUserGroupEditPermission = this._groupListTitle
    .then((listTitle : string) => {return web.lists.getByTitle(listTitle).currentUserHasPermissions(PermissionKind.EditListItems);});

    //Check the current user permission for the group list using the new list title accessor.
    this._currentUserPostEditPermission = this._postListTitle
    .then((listTitle : string) => {return web.lists.getByTitle(listTitle).currentUserHasPermissions(PermissionKind.EditListItems);});
  }

  /**
   * Gets a list by its URL (instead of its title or GUID). The parameter is a partial list URL that should starts
   * with "/Lists/" while a library should simply have the last part (URL must be relative to root web).
   */
  private _getListByURL(partialListURL: string): Promise<List> {
    const p = new Promise<List>((resolve, reject) => {

      const web = new Web(this.context.pageContext.web.absoluteUrl);
      const listUrl = this.context.pageContext.web.serverRelativeUrl + partialListURL;

      // We get the list by its URL to avoid language conflicts *the list title can changem not the URL
      web.getFolderByServerRelativeUrl(listUrl).properties.get().then((folderProperties) => {

        web.lists.getByTitle(folderProperties.vti_x005f_listtitle).get().then(list => {
          resolve(list);
        }).catch((error) => {
          Logger.write("[SharePointDataProvider._getUpdateList()]: Error: " + error, LogLevel.Error);
          reject(error);
        });
      }).catch((error) => {
        Logger.write("[SharePointDataProvider._getUpdateList()]: Error: " + error, LogLevel.Error);
        error.message = "Error: List at URL '" + listUrl + "' not found";
        reject(error);
      });
    });

    return p;
  }

  /*Builds a query filter with the Ids from the social media groups*/
  private _buildGroupQueryParam(groups: SPSocialMediaGroup[]): string {
    let groupIDsToQuery: string = "";
    //Avoid the last one which will be built differently with i < groups.length - 1
    for (let i: number = 0; i < groups.length - 1; i++) {
      groupIDsToQuery = groupIDsToQuery.concat(SharePointSocialMediaPostsProvider.GROUP_LOOKUP_QUERY_FIELD, " eq ", groups[i].Id.toString(), " or ");
    }
    //Add the last parameter without the 'or' at the end (unless the array is empty)
    if (groups.length > 0) {
      groupIDsToQuery = groupIDsToQuery.concat(SharePointSocialMediaPostsProvider.GROUP_LOOKUP_QUERY_FIELD, " eq ", groups[groups.length - 1].Id.toString());
    }
    //If there is no group, return an impossible query to have no result
    else {
      groupIDsToQuery = groupIDsToQuery.concat(SharePointSocialMediaPostsProvider.GROUP_LOOKUP_QUERY_FIELD, " eq -1");
    }

    return groupIDsToQuery;
  }

  private _convertDataToSocialMediaGroup(posts: SPSocialMediaPost[]): SocialMediaGroup[] {
    const smGroups: SocialMediaGroup[] = [];
    let currentGroup: SocialMediaGroup = null;
    posts.forEach((post) => {
      //Create a new group and change the current group if a new group title is found in the current post.
      if (currentGroup == null || post.PostGroup.Title !== currentGroup.Title) {
        currentGroup = new SocialMediaGroup();
        currentGroup.Title = post.PostGroup.Title;
        currentGroup.Id = post.PostGroup.Id;
        currentGroup.Posts = new Array<SocialMediaPost>();
        //Push the new group in the returned array
        smGroups.push(currentGroup);
      }
      //Add the current post in the current group's posts array
      currentGroup.Posts.push(new SocialMediaPost(post.Title, post.Id));

    });
    return smGroups;
  }
}
