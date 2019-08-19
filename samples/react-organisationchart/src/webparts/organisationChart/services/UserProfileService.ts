import { IPerson, IUserProfileService } from '../interfaces';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';
import { SPHttpClient, ISPHttpClientBatchCreationOptions, SPHttpClientResponse, SPHttpClientBatch } from '@microsoft/sp-http';

export class UserProfileService implements IUserProfileService {

  public static readonly serviceKey: ServiceKey<IUserProfileService> = ServiceKey.create<IUserProfileService>('vrd:UserProfileService', UserProfileService);

  private _spHttpClient: SPHttpClient;
  private _pageContext: PageContext;
  private _currentWebUrl: string;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      this._pageContext = serviceScope.consume(PageContext.serviceKey);
      this._currentWebUrl = this._pageContext.web.absoluteUrl;
    });
  }

  public getPropertiesForCurrentUser(): Promise<IPerson> {
    return this._spHttpClient.get(`${this._currentWebUrl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties?$select=DisplayName,Title,UserUrl,PictureUrl,DirectReports,ExtendedManagers`,
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  public getManagers(userLoginNames: string[]): Promise<IPerson[]> {
    return this.getPropertiesForUsers(userLoginNames);
  }

  public getReports(userLoginNames: string[]): Promise<IPerson[]> {
    return this.getPropertiesForUsers(userLoginNames);
  }

  private getPropertiesForUsers(userLoginNames: string[]): Promise<IPerson[]> {


    return new Promise<IPerson[]>((resolve, reject) => {
      //at least 1 login name should be supplied
      if (userLoginNames.length > 0) {
        const arrayOfPersons: IPerson[] = [];

        const spBatchCreationOpts: ISPHttpClientBatchCreationOptions = { webUrl: this._currentWebUrl };

        const spBatch: SPHttpClientBatch = this._spHttpClient.beginBatch(spBatchCreationOpts);

        const userResponses: Promise<SPHttpClientResponse>[] = [];

        for (const userLoginName of userLoginNames) {
          const getUserProps: Promise<SPHttpClientResponse> = spBatch.get(`${this._currentWebUrl}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='${encodeURIComponent(userLoginName)}'
        &$select=DisplayName,Title,UserUrl,PictureUrl,DirectReports,ExtendedManagers`,
            SPHttpClientBatch.configurations.v1);
          userResponses.push(getUserProps);
        }

        // Make the batch request
        spBatch.execute().then(() => {
          userResponses.forEach((item, index) => {
            item.then((response: SPHttpClientResponse) => {
              response.json().then((responseJSON: IPerson) => {
                arrayOfPersons.push(responseJSON);
                if (index == (userResponses.length) - 1) {
                  resolve(arrayOfPersons);
                }
              });
            });
          });
        });
      }
    });
  }

  //SharePoint does not return the userphoto if the current user has not currently signed in to their MySite (ODfB site)
  //This method of getting the user photo works in all scenarios.
  public getProfilePhoto(photoUrl: string) {
    return `/_layouts/15/userphoto.aspx?size=M&url=${photoUrl}`;
  }
}
