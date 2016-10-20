import { IPerson } from '../interfaces/IPerson';
import { ServiceScope } from '@microsoft/sp-client-base';
import { IUserProfileService } from '../interfaces/IUserProfileService';

export class MockUserProfileService implements IUserProfileService {


  constructor(serviceScope: ServiceScope) {

  }

  public getPropertiesForCurrentUser(): Promise<IPerson> {
    return new Promise<IPerson>((resolve, reject) => {
      const user: IPerson = { Title: "Consultant", DisplayName: "Adam Jones", PictureUrl: "https://raw.githubusercontent.com/OfficeDev/office-ui-fabric-react/master/images/persona-male.png" };
      resolve(user);
    });
  }

  public getManagers(userLoginNames: string[]): Promise<IPerson[]> {
    return new Promise<IPerson[]>((resolve, reject) => {
      const users: IPerson[] = [];

      users.push({ Title: "Manager", DisplayName: "Grant Steel", PictureUrl: "https://raw.githubusercontent.com/OfficeDev/office-ui-fabric-react/master/images/persona-male.png" });
      users.push({ Title: "Head of Management", DisplayName: "Marcel Grose", PictureUrl: "https://raw.githubusercontent.com/OfficeDev/office-ui-fabric-react/master/images/persona-female.png" });

      resolve(users);
    });
  }

  public getReports(userLoginNames: string[]): Promise<IPerson[]> {
    return new Promise<IPerson[]>((resolve, reject) => {
      const users: IPerson[] = [];

      users.push({ Title: "Developer", DisplayName: "Russel Miller", PictureUrl: "https://raw.githubusercontent.com/OfficeDev/office-ui-fabric-react/master/images/persona-female.png" });
      users.push({ Title: "IT Admin", DisplayName: "Robert Fischer", PictureUrl: "https://raw.githubusercontent.com/OfficeDev/office-ui-fabric-react/master/images/persona-male.png" });

      resolve(users);
    });
  }

  public getProfilePhoto(photoUrl: string){
    return photoUrl;
  }
}