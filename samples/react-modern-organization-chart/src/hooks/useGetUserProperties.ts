import { sp } from "@pnp/sp";
import "@pnp/sp/profiles";
import { IUserInfo } from "../Entities/IUserInfo";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClient } from "@microsoft/sp-http";
import { IUserPresence } from "../Entities/IUserPresence";
import * as _ from "lodash";
import { PnPClientStorage } from "@pnp/common";
/*************************************************************************************/
// Hook to get user profile information
//*************************************************************************************/

export const useGetUserProperties = async (
  userEmail: string,
  context?: WebPartContext
): Promise<any> => {
  /*************************************************************************************/
  //  vars and const
  //*************************************************************************************/
  const _MSGraphClient: MSGraphClient = await context.msGraphClientFactory.getClient();
  const loginName: string = `i:0#.f|membership|${userEmail}`;

  const storage = new PnPClientStorage();
  let _managersList: IUserInfo[] = [];
  let _reportsList: IUserInfo[] = [];


 /*  sp.setup({
    spfxContext: context
  }); */
  /*************************************************************************************/
  // Functions
  //*************************************************************************************//
  // function Get UserId from UserProfileProperties
  //*************************************************************************************//
  const getUserId = async (userProfileProperties: any[]): Promise<string> => {
    // Get User Properties
    let props = {};
    userProfileProperties.forEach((prop) => {
      props[prop.Key] = prop.Value;
    });
    // Get UserID
    return props["msOnline-ObjectId"];
  };

  //*************************************************************************************//
  // functions  convert image to Base64
  //*************************************************************************************//
  const getImageBase64 = (pictureUrl: string, userId:string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const value = storage.local.get(userId);
      if (value) {
        resolve(value);
      }
      let image = new Image();
      image.addEventListener("load", () => {
        let tempCanvas = document.createElement("canvas");
        (tempCanvas.width = image.width),
          (tempCanvas.height = image.height),
          tempCanvas.getContext("2d").drawImage(image, 0, 0);
        let base64Str;
        try {
          base64Str = tempCanvas.toDataURL("image/png");
        } catch (e) {
          return "";
        }
        storage.local.put(userId, base64Str);
        resolve(base64Str);
      });
      image.src = pictureUrl;
    });
  };
  //*************************************************************************************//
  //  function  Get Users Presence
  //*************************************************************************************//
  const getUserPresence = async (
    userObjIds: string[]
  ): Promise<IUserPresence[]> => {
    // Get presences for Users Ids
    const _presence: any = await _MSGraphClient
      .api(`/communications/getPresencesByUserId`)
      .version("beta")
      .post({ ids: userObjIds });

    return _presence.value;
  };

  //*************************************************************************************//
  // Get User Managers
  //*************************************************************************************//
  const getManagers = async (extendedManagers:string[] ) => {
    let _managersObjIds: string[] = [];
    // Get Managers
    for (const _manager of extendedManagers) {
      // get Profile for Manager
      const _profile: any = await sp.profiles
        .usingCaching()
        .getPropertiesFor(_manager);

      // Get Object Id from userProperties
      const _managerObjId: string = await getUserId(
        _profile.UserProfileProperties
      );
      _managersObjIds.push(_managerObjId);
      // Add manager to list
      _managersList.push({
        displayName: _profile.DisplayName as string,
        email: _profile.Email as string,
        title: _profile.Title as string,
        pictureUrl: await getImageBase64(
          `/_layouts/15/userphoto.aspx?size=M&accountname=${_profile.Email}`,_managerObjId
        ),
        id: _managerObjId,
        // presence: await getUserPresence(_profile.UserProfileProperties),
        userUrl: _profile.UserUrl,
      });
    }
    //*************************************************************************************//
    // Get presence for all managers
    //*************************************************************************************//
    const _managersPresences: IUserPresence[] = await getUserPresence(
      _managersObjIds
    );
    // Update Array of managers with presence
    if (_managersPresences.length > 0) {
      for (const _presence of _managersPresences) {
        const i = _.findIndex(_managersList, (v) => {
          return v.id == _presence.id;
        });
        _managersList[i] = {
          ..._managersList[i],
          presence: {
            activity: _presence.activity,
            availability: _presence.availability,
          },
        };
      }
    }
  };

  //************************************************************************************//
  // Get Direct Reports
  //*************************************************************************************//

  const getDirectReports = async (directReports:string[] ) => {
    let _userReportObjIds: string[] = [];
    for (const _userReport of directReports) {
      const _profile: any = await sp.profiles
        .usingCaching()
        .getPropertiesFor(_userReport);

      const _userReportObjId: string = await getUserId(
        _profile.UserProfileProperties
      );
      _userReportObjIds.push(_userReportObjId);
      // Get Presence to the user
      _reportsList.push({
        displayName: _profile.DisplayName as string,
        email: _profile.Email as string,
        title: _profile.Title as string,
        pictureUrl: await getImageBase64(
          `/_layouts/15/userphoto.aspx?size=M&accountname=${_profile.Email}`, _userReportObjId
        ),
        id: _userReportObjId,
        userUrl: _profile.UserUrl,
      });
    }
    //*************************************************************************************//
    // Get presence for all direct Reports and update list
    //*************************************************************************************//
    const _directReportsPresences: IUserPresence[] = await getUserPresence(
      _userReportObjIds
    );
    // Update Array of direct reports with presence
    if (_directReportsPresences.length > 0) {
      for (const _presence of _directReportsPresences) {
        const i = _.findIndex(_reportsList, (v) => {
          return v.id == _presence.id;
        });
        _reportsList[i] = {
          ..._reportsList[i],
          presence: {
            activity: _presence.activity,
            availability: _presence.availability,
          },
        };
      }
    }
  };

  //*************************************************************************************//
  // End Functions
  //*************************************************************************************//

  //*************************************************************************************//
  //  Get Current User Profile
  //*************************************************************************************//
  const _currentUserProfile: any = await sp.profiles
    .usingCaching()
    .getPropertiesFor(loginName);
  console.log(_currentUserProfile);
  // get Managers and Direct Reports
  const _extendedManagers: string[] = _currentUserProfile.ExtendedManagers;
  const _directReports: string[] = _currentUserProfile.DirectReports;
  // Get userObjId
  const _currentUserObjId: string = await getUserId( _currentUserProfile.UserProfileProperties);
  // Get Current user Picture and User Presence
  _currentUserProfile.PictureUrl = await getImageBase64(
    `/_layouts/15/userphoto.aspx?size=M&accountname=${_currentUserProfile.Email}`, _currentUserObjId);
  // get Current User Presence
  const _currentUserPresence: IUserPresence[] = await getUserPresence([_currentUserObjId]);
  _currentUserProfile.presence = { activity: _currentUserPresence[0].activity, availability: _currentUserPresence[0].availability};
  // Get Manager if exists
  if (_extendedManagers.length > 0) await getManagers(_extendedManagers);
  // Get Direct Reports if exists
  if (_directReports.length > 0) await getDirectReports(_directReports);

  //*************************************************************************************//
  // Return objects
  //  _managersList , _currentUserProfile , DirectReports
  //*************************************************************************************//
  return { _managersList, _currentUserProfile, _reportsList };
};
