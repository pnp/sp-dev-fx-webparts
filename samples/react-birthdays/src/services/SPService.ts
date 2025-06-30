import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import * as moment from 'moment';

export class SPService {
  private graphClient: MSGraphClientV3;
  // private birthdayListTitle: string = "Birthdays";

  constructor(private _context: WebPartContext) {}

  // Get Birthdays ignoring the year
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getPBirthdays(upcomingDays: number): Promise<any[]> {
    try {
      const today = moment();
      const todayMMDD = today.format('MM-DD'); // Get today's date as MM-DD
      const futureMMDD = today.add(upcomingDays, 'days').format('MM-DD'); // Calculate future date

      this.graphClient = await this._context.msGraphClientFactory.getClient('3');

      // Fetch all birthdays without filtering
      const response = await this.graphClient
        .api(`sites/root/lists('Birthdays')/items?orderby=fields/Birthday`)
        .version('v1.0')
        .expand('fields')
        .get();

      // Filter results locally
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filteredItems = response.value.filter((item: any) => {
        const birthday = item.fields.Birthday;
        if (!birthday) return false; // Skip if Birthday is missing

        const birthdayMMDD = moment(birthday).format('MM-DD'); // Extract MM-DD
        if (todayMMDD > futureMMDD) {
          // Handle year transition (December to January)
          return (
            birthdayMMDD >= todayMMDD || // Later in the current year
            birthdayMMDD <= futureMMDD   // Earlier in the next year
          );
        } else {
          // Normal case (same year)
          return birthdayMMDD >= todayMMDD && birthdayMMDD <= futureMMDD;
        }
      });

      return filteredItems;
    } catch (error) {
      console.error("Error fetching birthdays:", error);
      return Promise.reject(error);
    }
  }

}

export default SPService;
