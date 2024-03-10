/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { sp, SPBatch } from "@pnp/sp/";
import { IUserInfo } from "../models/IUserInfo";
import * as React from "react";
import { get, set } from "idb-keyval";
import { sortBy, filter } from "lodash";
import { IPersonProperties } from "../models/IPersonProperties";

/*************************************************************************************/
// Hook to get user profile information
// *************************************************************************************/

type getUserProfileFunc = (
  currentUser: string,
  startUser?: string,
  showAllManagers?: boolean,
  showGuestUsers?: boolean
) => Promise<ProfileDataResponse>;

type ProfileDataResponse = Maybe<{
  managersList: IUserInfo[];
  reportsLists: IUserInfo[];
  currentUserProfile: IPersonProperties;
}>;

export const useGetUserProperties = (): {
  getUserProfile: getUserProfileFunc;
} => {
  const getUserProfile = React.useCallback(
    async (
      currentUser: string,
      startUser?: string,
      showAllManagers: boolean = false,
      showGuestUsers: boolean = false
    ): Promise<ProfileDataResponse> => {
      if (!currentUser) return;
      const loginName = currentUser;
      const loginNameStartUser: Maybe<string> = startUser && startUser;
      const cacheCurrentUser: Maybe<IPersonProperties> = await get(
        `${loginName}__orgchart__`
      );
      let currentUserProfile: IPersonProperties;
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

      const wDirectReports: Maybe<string[]> =
        currentUserProfile && currentUserProfile.DirectReports;
      const wExtendedManagers: Maybe<string[]> =
        currentUserProfile && currentUserProfile.ExtendedManagers;

      // Get Direct Reports if exists
      if (wDirectReports && wDirectReports.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        reportsLists = await getDirectReports(wDirectReports, showGuestUsers);
      }
      // Get Managers if exists
      if (startUser && wExtendedManagers && wExtendedManagers.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        managersList = await getExtendedManagers(
          wExtendedManagers,
          loginNameStartUser!,
          showAllManagers,
          showGuestUsers
        );
      }

      return { managersList, reportsLists, currentUserProfile };
    },
    []
  );

  return { getUserProfile };
};

const getDirectReports = async (
  directReports: string[],
  showGuestUsers: boolean
): Promise<IUserInfo[]> => {
  const _reportsList: IUserInfo[] = [];
  const batch: SPBatch = sp.createBatch();
  for (const userReport of directReports) {
    const cacheDirectReport: Maybe<IPersonProperties> = await get(
      `${userReport}__orgchart__`
    );
    if (!cacheDirectReport) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      sp.profiles
        .inBatch(batch)
        .getPropertiesFor(userReport)
        .then(async (directReport: IPersonProperties) => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          const userInfo = await manpingUserProperties(directReport);
          if (!showGuestUsers && userInfo.userType === "Guest") return;

          _reportsList.push(userInfo);
          await set(`${userReport}__orgchart__`, directReport);
        });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const userInfo = await manpingUserProperties(cacheDirectReport);
      if (!showGuestUsers && userInfo.userType === "Guest") continue;

      _reportsList.push(userInfo);
    }
  }
  await batch.execute();
  return sortBy(_reportsList, ["displayName"]);
};

const getExtendedManagers = async (
  extendedManagers: string[],
  startUser: string,
  showAllManagers: boolean,
  showGuestUsers: boolean
): Promise<IUserInfo[]> => {
  const wManagers: IUserInfo[] = [];
  const batch: SPBatch = sp.createBatch();

  for (const manager of extendedManagers) {
    if (!showAllManagers && manager !== startUser) {
      continue;
    }
    const cacheManager: Maybe<IPersonProperties> = await get(
      `${manager}__orgchart__`
    );
    if (!cacheManager) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      sp.profiles
        .inBatch(batch)
        .getPropertiesFor(manager)
        .then(async (_profile: IPersonProperties) => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          const userInfo = await manpingUserProperties(_profile);
          if (!showGuestUsers && userInfo.userType === "Guest") return;

          wManagers.push(userInfo);
          await set(`${manager}__orgchart__`, _profile);
        });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const userInfo = await manpingUserProperties(cacheManager);
      if (!showGuestUsers && userInfo.userType === "Guest") continue;

      wManagers.push(userInfo);
    }
  }
  await batch.execute();
  return wManagers;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function userTypeMapper(userType: string) {
  switch (userType) {
    case "0":
      return "Employee";
    case "1":
      return "Guest";
    default:
      return "Unknown";
  }
}

export const manpingUserProperties = async (
  userProperties: IPersonProperties
): Promise<IUserInfo> => {
  console.log(userProperties);

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
    department:
      filter(userProperties?.UserProfileProperties, { Key: "Department" })[0]
        .Value ?? "",
    workPhone:
      filter(userProperties?.UserProfileProperties, { Key: "WorkPhone" })[0]
        .Value ?? "",
    cellPhone:
      filter(userProperties?.UserProfileProperties, { Key: "CellPhone" })[0]
        .Value ?? "",
    location:
      filter(userProperties?.UserProfileProperties, { Key: "SPS-Location" })[0]
        .Value ?? "",
    office:
      filter(userProperties?.UserProfileProperties, { Key: "Office" })[0]
        .Value ?? "",
    manager:
      filter(userProperties?.UserProfileProperties, { Key: "Manager" })[0]
        .Value ?? "",
    userType: userTypeMapper(
      filter(userProperties?.UserProfileProperties, { Key: "SPS-UserType" })[0]
        .Value
    ),
    loginName: userProperties.loginName,
  };
};
