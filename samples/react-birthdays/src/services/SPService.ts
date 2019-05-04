
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { SPHttpClient, SPHttpClientResponse, MSGraphClient } from "@microsoft/sp-http";
import * as moment from 'moment';

export class SPService {
  private graphClient: MSGraphClient = null;
  private  birthdayListTitle: string = "Birthdays";
  constructor(private _context: WebPartContext | ApplicationCustomizerContext) {

  }
  // Get Profiles
  public async getPBirthdays(upcommingDays: number): Promise<any[]> {
    let _results, _today: string, _month: string, _day: number;
    let _filter: string, _countdays: number, _f:number, _nextYearStart: string;
    let  _FinalDate: string;
    try {
      _results = null;
      _today = '2000-' + moment().format('MM-DD');
      _month = moment().format('MM');
      _day = parseInt(moment().format('DD'));
      _filter = "fields/Birthday ge '" + _today + "'";
      // If we are in Dezember we have to look if there are birthday in January
      // we have to build a condition to select birthday in January based on number of upcommingDays
      // we can not use the year for teste , the year is always 2000.
      console.log(_month);
      if (_month === '12') {
        _countdays = _day + upcommingDays;
        _f = 0;
        _nextYearStart = '2000-01-01';
        _FinalDate = '2000-01-';
        if ((_countdays) > 31) {
          _f = _countdays - 31;
          _FinalDate = _FinalDate + _f;
          _filter = "fields/Birthday ge '" + _today + "' or (fields/Birthday ge '" + _nextYearStart + "' and fields/Birthday le '" + _FinalDate + "')";
        }
      }
      this.graphClient = await this._context.msGraphClientFactory.getClient();
      _results = await this.graphClient.api(`sites/root/lists('${this.birthdayListTitle}')/items?orderby=Fields/Birthday`)
        .version('v1.0')
        .expand('fields')
        .top(upcommingDays)
        .filter(_filter)
        .get();

        return _results.value;

    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }
}
export default SPService;
