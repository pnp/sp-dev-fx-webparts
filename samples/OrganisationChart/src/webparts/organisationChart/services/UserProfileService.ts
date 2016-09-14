import { IPerson } from '../interfaces/IPerson';
import { ServiceScope, HttpClient, IODataBatchOptions, ODataBatch, httpClientServiceKey } from '@microsoft/sp-client-base';
import { IUserProfileService } from '../interfaces/IUserProfileService';

export class UserProfileService implements IUserProfileService {

  private httpClient: HttpClient;
  private serviceScope: ServiceScope;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {

      this.httpClient = serviceScope.consume(httpClientServiceKey);
      this.serviceScope = serviceScope;

    });
  }

  public getPropertiesForCurrentUser(): Promise<IPerson> {
    return this.httpClient.get(
      `/_api/SP.UserProfiles.PeopleManager/GetMyProperties?$select=DisplayName,Title,PersonalUrl,PictureUrl,DirectReports,ExtendedManagers`)
      .then((response: Response) => {
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

      const arrayOfPersons: IPerson[] = [];

      const batchOpts: IODataBatchOptions = {};

      const odataBatch: ODataBatch = new ODataBatch(this.serviceScope, batchOpts);

      const userResponses: Promise<Response>[] = [];

      for (const userLoginName of userLoginNames) {
        const getUserProps: Promise<Response> = odataBatch.get(`/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='${encodeURIComponent(userLoginName)}'
        &$select=DisplayName,Title,PersonalUrl,PictureUrl,DirectReports,ExtendedManagers`);
        userResponses.push(getUserProps);
      }

      // Make the batch request
      odataBatch.execute().then(() => {

        userResponses.forEach((item, index) => {
          item.then((response: Response) => {

            response.json().then((responseJSON: IPerson) => {

              arrayOfPersons.push(responseJSON);

              if (index == (userResponses.length) - 1) {
                resolve(arrayOfPersons);
              }
            });
          });
        });
      });
    });
  }
}