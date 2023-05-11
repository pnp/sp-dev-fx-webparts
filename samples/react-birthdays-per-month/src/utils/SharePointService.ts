import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { BirthdaysInMonth } from "../models/BirthdaysInMonth";
import { User } from "../models/User";
import { sortBy } from "@microsoft/sp-lodash-subset";

export class SharePointService {
  private readonly _spfi: SPFI;

  constructor(spfi: SPFI) {
    this._spfi = spfi;
  }

  public async GetBirthdays(): Promise<Array<BirthdaysInMonth>> {
    const items: Array<any> = await this._spfi.web.lists
      .getByTitle("Birthdays")
      .items.expand("Employee")
      .select("ID,Month,Date,Employee/Title,Employee/UserName")();

    return this.ProcessData(items);
  }

  private GenerateMonths(): Array<BirthdaysInMonth> {
    const months: Array<BirthdaysInMonth> = [];
    for (let i = 0; i < 12; i++) {
      const today = new Date();
      today.setMonth(today.getMonth() + i);
      months.push({
        title: today.toLocaleString("en-AU", { month: "long" }),
        users: [],
      });
    }

    return months;
  }

  private GetMonthIndex(month: string): number {
    switch (month) {
      case "January":
        return 0;
      case "February":
        return 1;
      case "March":
        return 2;
      case "April":
        return 3;
      case "May":
        return 4;
      case "June":
        return 5;
      case "July":
        return 6;
      case "August":
        return 7;
      case "September":
        return 8;
      case "October":
        return 9;
      case "November":
        return 10;
      case "December":
        return 11;
    }
  }

  private ProcessData(items: any): Array<BirthdaysInMonth> {
    const months = this.GenerateMonths();
    for (let i = 0; i < months.length; i++) {
      const month = months[i];
      month.users = sortBy(
        items
          .filter((item: any) => item.Month === month.title)
          .map(
            (item: any): User => ({
              id: item.ID,
              name: item.Employee.Title,
              email: item.Employee.UserName,
              date: item.Date,
              month: item.Month,
              monthIndex: this.GetMonthIndex(item.Month),
            })
          ),
        "date"
      );
    }
    return months;
  }
}
