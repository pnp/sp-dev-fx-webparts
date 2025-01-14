import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import * as moment from 'moment';

export class SPService {
  private graphClient: MSGraphClientV3;
  private birthdayListTitle: string = "Birthdays";

  constructor(private _context: WebPartContext) {}

  // Get Profiles
  public async getPBirthdays(upcomingDays: number): Promise<any[]> {
    let _results: any[] = [];
    try {
      const currentYear = new Date().getFullYear();
      const today = moment().format(`${currentYear}-MM-DD`);
      const futureDate = moment().add(upcomingDays, 'days').format(`${currentYear}-MM-DD`);

      // Construct the filter to find birthdays in the current year
      const _filter = `fields/Birthday ge '${today}' and fields/Birthday le '${futureDate}'`;

      this.graphClient = await this._context.msGraphClientFactory.getClient('3');

      // Fetch birthdays from the Graph API
      const response = await this.graphClient
        .api(`sites/root/lists('${this.birthdayListTitle}')/items?orderby=Fields/Birthday`)
        .version('v1.0')
        .expand('fields')
        .filter(_filter)
        .get();

      _results = response.value;

      return _results;
    } catch (error) {
      console.error("Error fetching birthdays:", error);
      return Promise.reject(error);
    }
  }
}

export default SPService;
