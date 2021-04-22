import "@pnp/sp/profiles";
import { MSGraphClient } from "@microsoft/sp-http";
import "@pnp/graph/users";
import { IUserExtended } from "../entites/IUserExtended";
import { IUser } from "../entites/IUser";
import { IUserPresence } from "../entites/IUserPresence";
import { IUserBio } from "../entites/IUserBio";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { findIndex, join, values } from "lodash";
import { DetailsRow } from "office-ui-fabric-react";

/*************************************************************************************/
// Hook to  search users
//*************************************************************************************/
const DEFAULT_PERSONA_IMG_HASH = "7ad602295f8386b7615b582d87bcc294";
const DEFAULT_IMAGE_PLACEHOLDER_HASH = "4a48f26592f4e1498d7a478a4c48609c";
const MD5_MODULE_ID = "8494e7d7-6b99-47b2-a741-59873e42f16f";
const PROFILE_IMAGE_URL = "/_layouts/15/userphoto.aspx?size=M&accountname=";

// Search Users
export const useSearchUsers = async (
  searchString: string,
  _MSGraphClient: MSGraphClient,
  pageSize?: number
): Promise<{ usersExtended: IUserExtended[]; nextPage: string }> => {
  pageSize = pageSize ? pageSize : 5;

  const _searchResults: any = await _MSGraphClient
    .api('/users?$search="' + searchString + '"')
    .version("beta")
    .header("ConsistencyLevel", "eventual")
    .select(
      "id,displayName,jobTitle,mail,mobilePhone,department,businessPhones,userPrincipalName,city,companyName,country,employeeId,imAddresses,officeLocation,postalCode,userType"
    )
    .top(pageSize)
    .orderby("displayName")
    .count(true)
    .get();

  const _users: IUser[] = _searchResults.value;
  let _usersExtended: IUserExtended[] = [];

  for (const _user of _users) {
    const _userPresence = await getUserPresence(_user.id, _MSGraphClient);
    const _pictureBase64: string = await getUserPhoto(_user.mail);
    const _userBio = await getUserBio(_user.id, _MSGraphClient);

    _usersExtended.push({
      ..._user,
      ..._userBio,
      ..._userPresence,
      pictureBase64: _pictureBase64,
      count: 0,
    });
  }
  let _nextPage: string = undefined;
  if (_searchResults["@odata.nextLink"]) {
    _nextPage = _searchResults["@odata.nextLink"];
  }
  return { usersExtended: _usersExtended, nextPage: _nextPage };
};

// Get Users by department
export const useGetUsersByDepartment = async (
  filter: string,
  _MSGraphClient: MSGraphClient,
  pageSize?: number
): Promise<{ usersExtended: IUserExtended[]; nextPage: string }> => {
  pageSize = pageSize ? pageSize : 5;
  const _filter: string =
    filter && filter.trim().length > 0
      ? `?$filter=department eq '${encodeURIComponent(filter)}'`
      : ""; // if department is blanks get first 1000 users
  const _searchResults: any = await _MSGraphClient
    .api(`/users${_filter}`)
    .version("beta")
    .header("ConsistencyLevel", "eventual")
    .select(
      "id,displayName,jobTitle,mail,mobilePhone,department,businessPhones,userPrincipalName,city,companyName,country,employeeId,imAddresses,officeLocation,postalCode,userType"
    )
    .top(pageSize)
    .orderby("displayName")
    .count(true)
    .get();


  const _users: IUser[] = _searchResults.value;
  let _usersExtended: IUserExtended[] = [];

  for (const _user of _users) {
    const _userPresence = await getUserPresence(_user.id, _MSGraphClient);
    const _pictureBase64: string = await getUserPhoto(_user.mail);
    const _userBio = await getUserBio(_user.id, _MSGraphClient);

    _usersExtended.push({
      ..._user,
      ..._userBio,
      ..._userPresence,
      pictureBase64: _pictureBase64,
      count: 0,
    });
  }
  let _nextPage: string = undefined;
  if (_searchResults["@odata.nextLink"]) {
    _nextPage = _searchResults["@odata.nextLink"];
  }
  return { usersExtended: _usersExtended, nextPage: _nextPage };
};

// Get Users Next Page
export const useGetUsersNextPage = async (
  nextPageLink: string,
  _MSGraphClient: MSGraphClient
): Promise<{ usersExtended: IUserExtended[]; nextPage: string }> => {
  const _searchResults: any = await _MSGraphClient
    .api(`${nextPageLink}`)
    .version("beta")
    .header("ConsistencyLevel", "eventual")
    .select(
      "id,displayName,jobTitle,mail,mobilePhone,department,businessPhones,userPrincipalName,city,companyName,country,employeeId,imAddresses,officeLocation,postalCode,userType"
    )
    .orderby("displayName")
    .count(true)
    .get();

  const _users: IUser[] = _searchResults.value;
  let _usersExtended: IUserExtended[] = [];

  for (const _user of _users) {
    const _userPresence = await getUserPresence(_user.id, _MSGraphClient);
    const _pictureBase64: string = await getUserPhoto(_user.mail);
    const _userBio = await getUserBio(_user.id, _MSGraphClient);
    _usersExtended.push({
      ..._user,
      ..._userBio,
      ..._userPresence,
      pictureBase64: _pictureBase64,
      count: 0,
    });
  }
  let _nextPage: string = undefined;
  if (_searchResults["@odata.nextLink"]) {
    _nextPage = _searchResults["@odata.nextLink"];
  }
  return { usersExtended: _usersExtended, nextPage: _nextPage };
};

//*************************************************************************************//
//  function  Get Users Presence
//*************************************************************************************//
export const useGetUsersPresence = async (
  users: IUserExtended[],
  _MSGraphClient: MSGraphClient
): Promise<IUserExtended[]> => {
  let userObjsIds: string[] = [];

  //   debugger;

  for (const _user of users) {
    userObjsIds.push(_user.id);
  }

  if (userObjsIds.length > 0) {
    const _presences: any = await _MSGraphClient
      .api(`/communications/getPresencesByUserId`)
      .version("beta")
      .post({ ids: userObjsIds });

    // update presence
    for (const _presence of _presences.value) {
      const i = findIndex(users, (v) => {
        return v.id == _presence.id;
      });
      users[i] = {
        ...users[i],
        ..._presence,
      };
    }
  }

  return users;
};

//*************************************************************************************//
//  function  Get Users Presence
//*************************************************************************************//

const getUserPresence = async (
  userObjId,
  _MSGraphClient
): Promise<IUserPresence> => {
  let _presence: IUserPresence = await _MSGraphClient
    .api("/users/" + userObjId + "/presence")
    .version("beta")
    .get();

  return _presence;
};

//*************************************************************************************//
//  function  Get Users About Me and skillz
//*************************************************************************************//

const getUserBio = async (
  userObjId,
  _MSGraphClient
): Promise<IUserBio> => {
  let _bio : IUserBio = await _MSGraphClient
    .api("/users/{" + userObjId + "}?$select=aboutMe,skills")
    .version("beta")
    .get();
  return _bio;
};

/**
 * Gets user photo
 * @param userId
 * @returns user photo
 */
const getUserPhoto = async (userId: string): Promise<string> => {
  const personaImgUrl = PROFILE_IMAGE_URL + userId;
  const url: string = await getImageBase64(personaImgUrl);
  const newHash = await getMd5HashForUrl(url);

  if (
    newHash !== DEFAULT_PERSONA_IMG_HASH &&
    newHash !== DEFAULT_IMAGE_PLACEHOLDER_HASH
  ) {
    return "data:image/png;base64," + url;
  } else {
    return "undefined";
  }
};

/**
 * Get MD5Hash for the image url to verify if user has default image or custom image
 * @param url
 */
const getMd5HashForUrl = (url: string) => {
  return new Promise(async (resolve, reject) => {
    const library: any = await loadSPComponentById(MD5_MODULE_ID);
    try {
      const md5Hash = library.Md5Hash;
      if (md5Hash) {
        const convertedHash = md5Hash(url);
        resolve(convertedHash);
      }
    } catch (error) {
      resolve(url);
    }
  });
};

/**
 * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
 * @param componentId - componentId, guid of the component library
 */
const loadSPComponentById = (componentId: string) => {
  return new Promise((resolve, reject) => {
    SPComponentLoader.loadComponentById(componentId)
      .then((component: any) => {
        resolve(component);
      })
      .catch((error) => {});
  });
};

/**
 * Gets image base64
 * @param pictureUrl
 * @returns image base64
 */
const getImageBase64 = async (pictureUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
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
      base64Str = base64Str.replace(/^data:image\/png;base64,/, "");
      resolve(base64Str);
    });
    image.src = pictureUrl;
  });
};

export const useGetUserId = async (user, _MSGraphClient): Promise<IUser> => {
  const _usersResults: IUser = await _MSGraphClient
    .api("/users/" + user)
    .version("beta")
    .header("ConsistencyLevel", "eventual")
    .select(
      "id,displayName,jobTitle,mail,mobilePhone,department,businessPhones,userPrincipalName,city,companyName,country,employeeId,imAddresses,officeLocation,postalCode,userType"
    )
    .orderby("displayName")
    .count(true)
    .get();

  // Get UserID
  return _usersResults;
};
