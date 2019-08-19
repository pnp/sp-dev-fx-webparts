import { IPerson, IUserProfileService } from '../interfaces';
import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';

export class MockUserProfileService implements IUserProfileService {
  public static readonly serviceKey: ServiceKey<IUserProfileService> = ServiceKey.create<IUserProfileService>('vrd:MockUserProfileService', MockUserProfileService);

  constructor(serviceScope: ServiceScope) {

  }

  public getPropertiesForCurrentUser(): Promise<IPerson> {
    return new Promise<IPerson>((resolve, reject) => {
      const user: IPerson = { Title: "Consultant", DisplayName: "Adam Jones", PictureUrl: "https://raw.githubusercontent.com/OfficeDev/office-ui-fabric-react/master/packages/office-ui-fabric-react/images/persona-male.png" };
      resolve(user);
    });
  }

  public getManagers(userLoginNames: string[]): Promise<IPerson[]> {
    return new Promise<IPerson[]>((resolve, reject) => {
      const users: IPerson[] = [];

      users.push({ Title: "Manager", DisplayName: "Grant Steel", PictureUrl: "https://raw.githubusercontent.com/OfficeDev/office-ui-fabric-react/master/packages/office-ui-fabric-react/images/persona-male.png" });
      users.push({ Title: "Head of Management", DisplayName: "Marcel Grose", PictureUrl: "https://raw.githubusercontent.com/OfficeDev/office-ui-fabric-react/master/packages/office-ui-fabric-react/images/persona-female.png" });

      resolve(users);
    });
  }

  public getReports(userLoginNames: string[]): Promise<IPerson[]> {
    return new Promise<IPerson[]>((resolve, reject) => {
      const users: IPerson[] = [];

      users.push({ Title: "Developer", DisplayName: "Russel Miller", PictureUrl: "https://raw.githubusercontent.com/OfficeDev/office-ui-fabric-react/master/packages/office-ui-fabric-react/images/persona-female.png" });
      users.push({ Title: "IT Admin", DisplayName: "Robert Fischer", PictureUrl: "https://raw.githubusercontent.com/OfficeDev/office-ui-fabric-react/master/packages/office-ui-fabric-react/images/persona-female.png" });

      resolve(users);
    });
  }

  public getProfilePhoto(photoUrl: string) {
    return photoUrl;
  }
}