import { SearchQuery, SearchResults, SortDirection, sp } from "@pnp/sp/";
import { setup as pnpSetup } from "@pnp/common";
import * as React from "react";
import { get, set } from "idb-keyval";
import { filter } from "lodash";
import { IPersonProperties } from "../entites/IPersonProperties";
import { IUserExtended } from "../entites/IUserExtended";
import { WebPartContext } from "@microsoft/sp-webpart-base";

/*************************************************************************************/
// Hook to get user profile information
// *************************************************************************************/

type getUserProfileFunc = (
  currentUser: string,
  startUser?: string,
  showAllManagers?: boolean
) => Promise<returnProfileData>;

type getUsersFunc = (
  department: string,
  pagesize?: number
) => Promise<SearchResults>;

type returnProfileData = { currentUserProfile: IPersonProperties };

export const useGetUserProperties = (
  context: WebPartContext
): { getUserProfile: getUserProfileFunc; getUsers: getUsersFunc } => {
  pnpSetup({
    spfxContext: context,
  });
  const getUserProfile = React.useCallback(async (currentUser: string): Promise<
    returnProfileData
  > => {
    if (!currentUser) return;
    const loginName = currentUser;
    const cacheCurrentUser: IPersonProperties = await get(
      `${loginName}__staffDirectory__`
    );
    let currentUserProfile: IPersonProperties = undefined;
    if (!cacheCurrentUser) {
      currentUserProfile = await sp.profiles.getPropertiesFor(loginName);
      // console.log(currentUserProfile);
      await set(`${loginName}__staffDirectory__`, currentUserProfile);
      const _department =
        filter(currentUserProfile?.UserProfileProperties, {
          Key: "Department",
        })[0].Value ?? "";

      const r = await getUsers(
        _department ? `Department: ${_department}` : "*"
      );
      console.log(r);
    } else {
      currentUserProfile = cacheCurrentUser;
    }
    return { currentUserProfile };
  }, []);

  const getUsers = async (
    search: string,
    pageSize?: number
  ): Promise<SearchResults> => {
    const spResults: SearchResults = await sp.search(<SearchQuery>{
      TrimDuplicates: false,
      SourceId: "b09a7990-05ea-4af9-81ef-edfab16c4e31",
      Querytext: search,
      EnableInterleaving: true,
      SelectProperties: [
        "Path",
        "FirstName",
        "LastName",
        "BaseOfficeLocation",
        "PreferredName",
        "WorkEmail",
        "PictureURL",
        "WorkPhone",
        "MobilePhone",
        "JobTitle",
        "Department",
        "AccountName",
        "SPS-HideFromAddressLists",
        "PastProjects",
        "UserProfile_GUID",
        "OrgNames",
        "SipAddress",
      ],
      RowLimit: pageSize ?? 5,
      Refiners: "Department,BaseOfficeLocation",
      SortList: [
        {
          Property: "FirstName",
          Direction: SortDirection.Ascending,
        },
      ],
    });
    return spResults;
  };
  return { getUserProfile, getUsers };
};

export const manpingUserProperties = async (
  spResults: SearchResults
): Promise<IUserExtended[]> => {
  const wPrimarySearchResults = spResults?.PrimarySearchResults ?? [];
  const wUsers: IUserExtended[] = [];
  for (const r of wPrimarySearchResults) {
    wUsers.push({
      displayName: r["PreferredName"],
      jobTitle: r["JobTitle"],
      officeLocation: r["BaseOfficeLocation"],
      mail: r["WorkEmail"],
      firstName: r["FirstName"],
      lastName: r["LastName"],
      businessPhones: [r["WorkPhone"]],
      mobilePhone: r["MobilePhone"],
      department: r["Department"],
      count: spResults.TotalRows,
      pictureBase64: r["PictureURL"]
        ? `/_layouts/15/userphoto.aspx?size=M&accountname=${r["WorkEmail"]}`
        : undefined,
      accuntName: r["AccountName"],
      companyName: r["OrgNames"],
      employeeId: r["UserProfile_GUID"],
      imAddresses: [r["SipAddress"]],
    });
  }
  return wUsers;
};
