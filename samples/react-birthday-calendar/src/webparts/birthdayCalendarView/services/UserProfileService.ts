import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IUserProfile } from '../models/IUserProfile';

interface IUserProfileProperty {
  Key: string;
  Value: string;
}

interface IPersonPropertiesResponse {
  DisplayName?: string;
  Email?: string;
  PictureUrl?: string;
  Title?: string;
  UserProfileProperties?: IUserProfileProperty[];
}

/**
 * Reads department / job title / office from the SharePoint user profile store.
 * Uses the SP.UserProfiles.PeopleManager endpoint, which the current user can call
 * with the site's own credentials -- no Graph API permission grant is required.
 */
export class UserProfileService {
  private static _cache: Map<string, Promise<IUserProfile>> = new Map();

  public static getProfile(
    spHttpClient: SPHttpClient,
    siteUrl: string,
    loginName: string
  ): Promise<IUserProfile> {
    const cached: Promise<IUserProfile> | undefined = UserProfileService._cache.get(loginName);
    if (cached) {
      return cached;
    }

    const request: Promise<IUserProfile> = UserProfileService._fetchProfile(spHttpClient, siteUrl, loginName)
      .catch((err: Error) => {
        // Do not cache failures -- a transient error should not poison later opens.
        UserProfileService._cache.delete(loginName);
        throw err;
      });

    UserProfileService._cache.set(loginName, request);
    return request;
  }

  private static async _fetchProfile(
    spHttpClient: SPHttpClient,
    siteUrl: string,
    loginName: string
  ): Promise<IUserProfile> {
    const baseUrl: string = siteUrl.replace(/\/$/, '');
    const accountName: string = encodeURIComponent(loginName.replace(/'/g, "''"));
    const requestUrl: string =
      `${baseUrl}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)` +
      `?@v='${accountName}'` +
      `&$select=DisplayName,Email,PictureUrl,Title,UserProfileProperties`;

    const response: SPHttpClientResponse = await spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);

    if (!response.ok) {
      throw new Error(`Could not load the profile for ${loginName} (${response.status}).`);
    }

    const data: IPersonPropertiesResponse = await response.json();

    const properties: Map<string, string> = new Map();
    for (const property of data.UserProfileProperties || []) {
      if (property.Value) {
        properties.set(property.Key, property.Value);
      }
    }

    const email: string | undefined = data.Email || properties.get('WorkEmail');

    return {
      displayName: data.DisplayName,
      jobTitle: data.Title || properties.get('SPS-JobTitle'),
      department: properties.get('Department') || properties.get('SPS-Department'),
      office: properties.get('Office') || properties.get('SPS-Location'),
      workPhone: properties.get('WorkPhone'),
      email: email,
      pictureUrl: UserProfileService.getPhotoUrl(baseUrl, email) || data.PictureUrl
    };
  }

  /**
   * The photo endpoint the SharePoint UI itself uses. Preferred over the profile store's
   * PictureUrl, which points at the My Site host and is empty whenever that is not
   * provisioned -- the common case for a profile that has never been edited.
   */
  public static getPhotoUrl(siteUrl: string, email: string | undefined): string | undefined {
    if (!email) {
      return undefined;
    }
    const baseUrl: string = siteUrl.replace(/\/$/, '');
    return `${baseUrl}/_layouts/15/userphoto.aspx?size=L&username=${encodeURIComponent(email)}`;
  }
}
