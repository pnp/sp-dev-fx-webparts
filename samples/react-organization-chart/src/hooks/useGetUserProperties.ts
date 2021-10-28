
import { sp, SPBatch} from "@pnp/sp/";
import { IUserInfo } from "../models/IUserInfo";
import * as React from "react";
import { get, set } from "idb-keyval";
import { sortBy, filter } from "lodash";
import { IPersonProperties } from "../models/IPersonProperties";

/*************************************************************************************/
// Hook to get user profile information
// *************************************************************************************/

type getUserProfileFunc = ( currentUser: string,
  startUser?: string,
  showAllManagers?: boolean) => Promise<returnProfileData>;

type returnProfileData =  { managersList:IUserInfo[], reportsLists:IUserInfo[], currentUserProfile :IPersonProperties} ;

export const useGetUserProperties  =  ():  { getUserProfile:getUserProfileFunc }  => {

  const getUserProfile = React.useCallback(
    async (
      currentUser: string,
      startUser?: string,
      showAllManagers?: boolean
    ): Promise<returnProfileData> => {
      if (!currentUser) return;
      const loginName = currentUser;
      const loginNameStartUser: string = startUser && startUser;
      const cacheCurrentUser:IPersonProperties = await get(`${loginName}__orgchart__`);
      let currentUserProfile:IPersonProperties   = undefined;
      if (!cacheCurrentUser) {
        currentUserProfile = await sp.profiles.getPropertiesFor(loginName);
       // console.log(currentUserProfile);
        await set(`${loginName}__orgchart__`, currentUserProfile);
      } else {
        currentUserProfile = cacheCurrentUser;
      }
      // get Managers and Direct Reports
      let reportsLists: IUserInfo[] = [];
      let managersList: IUserInfo[] = [];

      const wDirectReports: string[] =
        currentUserProfile && currentUserProfile.DirectReports;
      const wExtendedManagers: string[] =
        currentUserProfile && currentUserProfile.ExtendedManagers;

      // Get Direct Reports if exists
      if (wDirectReports && wDirectReports.length > 0) {
        reportsLists = await getDirectReports(wDirectReports);
      }
      // Get Managers if exists
      if (startUser && wExtendedManagers && wExtendedManagers.length > 0) {
        managersList = await getExtendedManagers(
          wExtendedManagers,
          loginNameStartUser,
          showAllManagers
        );
      }

      return   { managersList, reportsLists, currentUserProfile } ;
    },
    []
  );

  return   { getUserProfile }  ;
};

const getDirectReports = async (
  directReports: string[]
): Promise<IUserInfo[]> => {
  const _reportsList: IUserInfo[] = [];
  const batch: SPBatch = sp.createBatch();
  for (const userReport of directReports) {
    const cacheDirectReport: IPersonProperties = await get(`${userReport}__orgchart__`);
    if (!cacheDirectReport) {
      sp.profiles
        .inBatch(batch)
        .getPropertiesFor(userReport)
        .then(async (directReport: IPersonProperties) => {
          _reportsList.push(await manpingUserProperties(directReport));
          await set(`${userReport}__orgchart__`, directReport);
        });
    } else {
      _reportsList.push(await manpingUserProperties(cacheDirectReport));
    }
  }
  await batch.execute();
  return sortBy(_reportsList, ["displayName"]);
};

const getExtendedManagers = async (
  extendedManagers: string[],
  startUser: string,
  showAllManagers: boolean
): Promise<IUserInfo[]> => {
  const wManagers: IUserInfo[] = [];
  const batch: SPBatch = sp.createBatch();

  for (const manager of extendedManagers) {
    if (!showAllManagers && manager !== startUser) {
      continue;
    }
    const cacheManager: IPersonProperties = await get(`${manager}__orgchart__`);
    if (!cacheManager) {
      sp.profiles
        .inBatch(batch)
        .getPropertiesFor(manager)
        .then(async (_profile: IPersonProperties) => {
          wManagers.push(await manpingUserProperties(_profile));
          await set(`${manager}__orgchart__`, _profile);
        });
    } else {
      wManagers.push(await manpingUserProperties(cacheManager));
    }
  }
  await batch.execute();
  return wManagers;
};

export const manpingUserProperties = async (
  userProperties: IPersonProperties
): Promise<IUserInfo> => {

  return {
    displayName: userProperties.DisplayName as string,
    email: userProperties.Email as string,
    title: userProperties.Title as string,
    pictureUrl: userProperties.PictureUrl,
    id: userProperties.AccountName,
    userUrl: userProperties.UserUrl,
    numberDirectReports: userProperties.DirectReports.length,
    hasDirectReports: userProperties.DirectReports.length > 0 ? true : false,
    hasPeers: userProperties.Peers.length > 0 ? true : false,
    numberPeers: userProperties.Peers.length,
    department: filter(userProperties?.UserProfileProperties,{"Key": "Department"})[0].Value ?? '',
    workPhone: filter(userProperties?.UserProfileProperties,{"Key": "WorkPhone"})[0].Value ?? '',
    cellPhone: filter(userProperties?.UserProfileProperties,{"Key": "CellPhone"})[0].Value ?? '',
    location: filter(userProperties?.UserProfileProperties,{"Key": "SPS-Location"})[0].Value ?? '',
    office: filter(userProperties?.UserProfileProperties,{"Key": "Office"})[0].Value ?? '',
    manager: filter(userProperties?.UserProfileProperties,{"Key": "Manager"})[0].Value ?? '',
    loginName: userProperties.loginName
  };
};
