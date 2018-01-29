import { IUserProfileService } from './IUserProfileService';
import { 
  ServiceKey, 
  ServiceScope 
} from '@microsoft/sp-core-library';
import { 
  SPHttpClient, 
  SPHttpClientResponse, 
  ISPHttpClientBatchCreationOptions, 
  SPHttpClientBatch 
} from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';
import { 
  IPerson, 
  IUserProfileProperty
} from '../../index';

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
  
    public getPropertiesForUsers(userLoginNames: string[]): Promise<IPerson[]> {
  
      return new Promise<IPerson[]>((resolve, reject) => {
        //at least 1 login name should be supplied
        if (userLoginNames.length > 0) {
          const arrayOfPersons: IPerson[] = [];
  
          const spBatchCreationOpts: ISPHttpClientBatchCreationOptions = { webUrl: this._currentWebUrl };
  
          const spBatch: SPHttpClientBatch = this._spHttpClient.beginBatch(spBatchCreationOpts);
  
          const userResponses: Promise<SPHttpClientResponse>[] = [];
          
          for (const userLoginName of userLoginNames) {
            const getUserProps: Promise<SPHttpClientResponse> = spBatch.get(`${this._currentWebUrl}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='${encodeURIComponent(userLoginName)}'
          &$select=AccountName,Email,DisplayName,Title,UserUrl,PictureUrl,DirectReports,ExtendedManagers,UserProfileProperties`,
              SPHttpClientBatch.configurations.v1);
            userResponses.push(getUserProps);
          }
  
          // Make the batch request
          spBatch.execute().then(() => {
            userResponses.forEach((item, index) => {
              item.then((response: SPHttpClientResponse) => {
                response.json().then((responseJSON: IPerson) => {
                  let result: IUserProfileProperty = {};
                  let userProperties =[];
                  responseJSON.UserProfileProperties.map((property) =>{
                     result[property.Key] = property.Value;                  
                  });
  
                  responseJSON.Properties = result;
                  
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
  }
  