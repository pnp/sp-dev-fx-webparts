import { IPerson } from '../interfaces/IPerson';
import { ServiceScope } from '@microsoft/sp-client-base';
import { IUserProfileService } from '../interfaces/IUserProfileService';

export class MockUserProfileService implements IUserProfileService {


  constructor(serviceScope: ServiceScope) {

  }

  public getPropertiesForCurrentUser(): Promise<IPerson> {
    return new Promise<IPerson>((resolve, reject) => {
      const user: IPerson = {
        Title: "Consultant",
        DisplayName: "Adam Jones",
        PictureUrl: "http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/persona/Persona.Person2.png",
      };

      resolve(user);
    });
  }

  public getManagers(userLoginNames: string[]): Promise<IPerson[]> {
    return new Promise<IPerson[]>((resolve, reject) => {
      const users: IPerson[] = [];

      users.push({ Title: "Manager", DisplayName: "Grant Steel", PictureUrl: "http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/persona/Persona.Person2.png" });
      users.push({ Title: "Head of Management", DisplayName: "Marcel Grose", PictureUrl: "http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/persona/Persona.Person2.png" });

      resolve(users);
    });
  }

  public getReports(userLoginNames: string[]): Promise<IPerson[]> {
    return new Promise<IPerson[]>((resolve, reject) => {
      const users: IPerson[] = [];

      users.push({ Title: "Developer", DisplayName: "Russel Miller", PictureUrl: "http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/persona/Persona.Person2.png" });
      users.push({ Title: "IT Admin", DisplayName: "Robert Fischer", PictureUrl: "http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/persona/Persona.Person2.png" });

      resolve(users);
    });
  }
}