import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClientV3  } from "@microsoft/sp-http";
import * as moment from 'moment';
import { version } from "react";

export class SPService {
  private graphClient: MSGraphClientV3  = null;
  private  birthdayListTitle: string = "Birthdays";
  constructor(private _context: WebPartContext) {

  }
  // Get Profiles
  public async getPBirthdays(upcommingDays: number): Promise<any[]> {
    let _results, _today: string, _month: number, _day: number;
    let _filter: string, _countdays: number, _f:number, _nextYearStart: string;
    let  _FinalDate: string;
    try {
      _results = null;
      _today = '2000-' + moment().format('MM-DD');
      _month = parseInt(moment().format('MM'));
      _day = parseInt(moment().format('DD'));
      _filter = "fields/Birthday ge '" + _today + "'";
      // If we are in December we have to look if there are birthdays in January
      // we have to build a condition to select birthday in January based on number of upcommingDays
      // we can not use the year for test, the year is always 2000.
      console.log(_month);
      _countdays = _day + upcommingDays;
      _f = 0;
      if (_month === 12 && _countdays > 31) {
        _nextYearStart = '2000-01-01';
        _FinalDate = '2000-01-';
        _f = _countdays - 31;
        _FinalDate = _FinalDate + _f;
        _filter = "fields/Birthday ge '" + _today + "' or (fields/Birthday ge '" + _nextYearStart + "' and fields/Birthday le '" + _FinalDate + "')";
      }
      else{
        _FinalDate = '2000-';
        if ((_countdays) > 31) {
          _f = _countdays - 31;
          _month = _month + 1;
          _FinalDate = _FinalDate +_month + '-' + _f;
        }else{
          _FinalDate = _FinalDate +_month + '-' + _countdays;
        }
        _filter = "fields/Birthday ge '" + _today + "' and fields/Birthday le '" + _FinalDate + "'";
      }

      this.graphClient = await this._context.msGraphClientFactory.getClient('3');
      _results = await this.graphClient.api(`sites/root/lists('${this.birthdayListTitle}')/items?orderby=Fields/Birthday`)
        .version('v1.0')
        .expand('fields')
        //.top(upcommingDays)
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
