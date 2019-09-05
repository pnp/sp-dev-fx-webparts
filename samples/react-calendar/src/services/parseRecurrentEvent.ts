
import * as moment from 'moment';
export default class parseRecurrentEvent {

  private wEvents: any[] = [];
  private full: any[] = [] ;
  public parseEvents(events: any[], start: any, end: any) {

    this.wEvents = events;
    for (let i = 0; i < events.length; i++) {
      end = null;
      if (events[i].RecurrenceData.indexOf('<windowEnd>') != -1) {
        let wDtEnd = events[i].RecurrenceData.substring(events[i].RecurrenceData.indexOf("<windowEnd>") + 11);

        wDtEnd = wDtEnd.substring(0, wDtEnd.indexOf('<'));
        end = moment(wDtEnd).toDate();

      }

      this.full = this.full.concat(this.parseEvent(events[i], start, end));
    }
    // remove deleted recurrences EventType = 3

       this.full = this.full.filter( (el,j)=>{
        if (el.EventType != '3'){
          return el;
        }
       });
    return this.full;
  }


  public RecurrenceExceptionExists(masterSeriesItemId, date) {
    const found = this.wEvents.filter((el,i) => {

      if (moment(el.RecurrenceID).isSame(moment(date)) && el.MasterSeriesItemID == masterSeriesItemId ) {
        return el;
      }
    });
    return found.length > 0 ? true : false;
  }
  //

  public formatString(str: string) {
    let arr = str.split("'");
    str = arr.join('');
    arr = str.split('"');
    str = arr.join('');
    arr = str.split('=');
    str = arr.join(' ');
    str.trim();
    return str.split(' ');
  }


  public parseDate(date: any, allDay: any) {
    if (typeof date == 'string') {
      if (allDay) {
        if (date.lastIndexOf('Z') == date.length - 1) {
          const dt = date.substring(0, date.length - 1);
          return new Date(dt);
        }
      }
      else {
        return new Date(date);
      }
    }
    return date;
  }
  public parseEvent(e: any, start: any, end: any) {
    if (e.fRecurrence == '0' || e.fRecurrence == '4') {
      e.EventDate = new Date(this.parseDate(e.EventDate, e.fAllDayEvent));
      e.EndDate = new Date(this.parseDate(e.EndDate, e.fAllDayEvent));
      return [e];
    }
    else {
      start = start || this.parseDate(e.EventDate, e.fAllDayEvent);
      end = end || this.parseDate(e.EndDate, e.fAllDayEvent);
      const er = [];
      const wd = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
      const wom = ['first', 'second', 'third', 'fourth'];
      let rTotal: any = 0;
      let total: any = 0;
      if (e.RecurrenceData.indexOf('<repeatInstances>') != -1) {
        rTotal = e.RecurrenceData.substring(e.RecurrenceData.indexOf("<repeatInstances>") + 17);
        rTotal = parseInt(rTotal.substring(0, rTotal.indexOf('<')));
      }
      if (e.RecurrenceData.indexOf("<daily ") != -1) {
        let str = e.RecurrenceData.substring(e.RecurrenceData.indexOf("<daily "));
        str = str.substring(7, str.indexOf('/>') - 1);
        const arr = this.formatString(str);
        if (arr.indexOf("dayFrequency") != -1) {
          const frequency = parseInt(arr[arr.indexOf("dayFrequency") + 1]);
          let loop = true;
          const init = this.parseDate(e.EventDate, e.fAllDayEvent);
          while (loop) {
            total++;
            if ((new Date(init)).getTime() >= start.getTime()) {
              const ed = new Date(init);
              ed.setSeconds(ed.getSeconds() + e.Duration);
              const ni = this.cloneObj(e);
              ni.EventDate = new Date(init);
              if (!this.RecurrenceExceptionExists(e.Id, ni.EventDate)) {
                ni.EndDate = ed;
                ni.fRecurrence = false;
                ni.Id = e.Id;
                ni.ID = e.Id;
                er.push(ni);
              }
            }
            init.setDate(init.getDate() + frequency);
            if ((new Date(init) > end) || (rTotal > 0 && rTotal <= total)) loop = false;
          }
        }
        else if (arr.indexOf("weekday") != -1) {
          e.RecurrenceData = e.RecurrenceData + "<weekly mo='TRUE' tu='TRUE' we='TRUE' th='TRUE' fr='TRUE' weekFrequency='1' />";//change from daily on every weekday to weekly on every weekday
        }
      }
      if (e.RecurrenceData.indexOf("<weekly ") != -1) {
        let str = e.RecurrenceData.substring(e.RecurrenceData.indexOf("<weekly "));
        str = str.substring(8, str.indexOf('/>') - 1);
        const arr = this.formatString(str);
        const frequency = parseInt(arr[arr.indexOf("weekFrequency") + 1]);
        let loop = true;
        const init = this.parseDate(e.EventDate, e.fAllDayEvent);
        let initDay = init.getDay();
        while (loop) {
          for (let i = initDay; i < 7; i++) {
            if (arr.indexOf(wd[i]) != -1 && (rTotal > total || rTotal == 0)) {
              total++;
              if ((new Date(init)).getTime() >= start.getTime()) {
                const nd: any = new Date(init);
                nd.setDate(nd.getDate() + (i - initDay));
                const ed = new Date(nd);
                ed.setSeconds(ed.getSeconds() + e.Duration);
                const ni = this.cloneObj(e);
                ni.EventDate = new Date(nd);
                if (!this.RecurrenceExceptionExists(e.Id, ni.EventDate)) {
                  ni.EndDate = ed;
                  ni.fRecurrence = false;
                  ni.Id = e.Id;
                  ni.ID = e.Id;
                  er.push(ni);
                }
              }
            }
          }
          init.setDate(init.getDate() + ((7 * frequency) - initDay));
          initDay = 0;
          if ((new Date(init) > end) || (rTotal > 0 && rTotal <= total)) loop = false;
        }
      }
      if (e.RecurrenceData.indexOf("<monthly ") != -1) {
        let str = e.RecurrenceData.substring(e.RecurrenceData.indexOf("<monthly "));
        str = str.substring(9, str.indexOf('/>') - 1);
        const arr = this.formatString(str);
        const frequency = parseInt(arr[arr.indexOf("monthFrequency") + 1]);
        let loop = true;
        const init = this.parseDate(e.EventDate, e.fAllDayEvent);
        const day = parseInt(arr[arr.indexOf("day") + 1]);
        while (loop) {
          total++;
          if ((new Date(init)).getTime() >= start.getTime()) {
            const nd: any = new Date(init);
            nd.setDate(day);
            if (nd.getMonth() == init.getMonth()) {
              const ed = new Date(nd);
              ed.setSeconds(ed.getSeconds() + e.Duration);
              const ni = this.cloneObj(e);
              ni.EventDate = new Date(nd);
              if (!this.RecurrenceExceptionExists(e.Id, ni.EventDate)) {
                ni.EndDate = ed;
                ni.fRecurrence = false;
                ni.Id = e.Id;
                ni.ID = e.Id;
                er.push(ni);
              }
            }
          }
          init.setMonth(init.getMonth() + frequency);
          if ((new Date(init) > end) || (rTotal > 0 && rTotal <= total)) loop = false;
        }
      }
      if (e.RecurrenceData.indexOf("<monthlyByDay ") != -1) {
        let str = e.RecurrenceData.substring(e.RecurrenceData.indexOf("<monthlyByDay "));
        str = str.substring(14, str.indexOf('/>') - 1);
        const arr = this.formatString(str);
        const frequency = parseInt(arr[arr.indexOf("monthFrequency") + 1]);
        let loop = true;
        const init = this.parseDate(e.EventDate, e.fAllDayEvent);
        const weekdayOfMonth = arr[arr.indexOf("weekdayOfMonth") + 1];
        let temp: any = new Date();
        while (loop) {
          total++;
          if ((new Date(init)).getTime() >= start.getTime()) {
            let nd: any = new Date(init);
            nd.setDate(1); //set to first day of month
            if (arr.indexOf("weekday") != -1) { //find first weekday - if not saturday or sunday, then current date is a weekday
              if (nd.getDay() == 0) nd.setDate(nd.getDate() + 1);// add one day to sunday
              else if (nd.getDay() == 6) nd.setDate(nd.getDate() + 2); //add two days to saturday
              if (weekdayOfMonth == 'last') {
                while (nd.getMonth() == init.getMonth()) {
                  temp = new Date(nd);
                  if (nd.getDay() == 5) nd.setDate(nd.getDate() + 3); //if the current date is friday, add three days to get to monday
                  else nd.setDate(nd.getDate() + 1); //otherwise, just add one day
                }
                nd = new Date(temp);
              }
              else {
                for (let i: any = 0; i < wom.indexOf(weekdayOfMonth); i++) {
                  if (nd.getDay() == 5) nd.setDate(nd.getDate() + 3); //if the current date is friday, add three days to get to monday
                  else nd.setDate(nd.getDate() + 1); //otherwise, just add one day
                }
              }
            }
            else if (arr.indexOf("weekend_day") != -1) { //find first weekend day
              if (nd.getDay() != 0 && nd.getDay() != 6) nd.setDate(nd.getDate() + (6 - nd.getDay())); //if not saturday or sunday, then add days to get to saturday
              if (weekdayOfMonth == 'last') {
                while (nd.getMonth() == init.getMonth()) {
                  temp = new Date(nd);
                  if (nd.getDay() == 0) nd.setDate(nd.getDate() + 6); //if the current date is sunday, add six days to get to saturday
                  else nd.setDate(nd.getDate() + 1); //otherwise, just add one day
                }
                nd = new Date(temp);
              }
              else {
                for (let i: any = 0; i < wom.indexOf(weekdayOfMonth); i++) {
                  if (nd.getDay() == 0) nd.setDate(nd.getDate() + 6); //if the current date is sunday, add six days to get to saturday
                  else nd.setDate(nd.getDate() + 1); //otherwise, just add one day
                }
              }
            }
            else if (arr.indexOf("day") != -1) {//just looking for the Nth day in the month...
              if (weekdayOfMonth == 'last') {
                nd.setMonth(nd.getMonth() + 1);
                nd.setDate(0);
              }
              else nd.setDate(nd.getDate() + (wom.indexOf(weekdayOfMonth))); //now add days to get to the Nth instance of this day
            }
            else {
              for (let i: any = 0; i < wd.length; i++) { //get first instance of the specified day
                if (arr.indexOf(wd[i]) != -1) {
                  if (nd.getDay() > i)  nd.setDate(nd.getDate() + (7 - (nd.getDay() - i)));
                  else nd.setDate(nd.getDate() + (i - nd.getDay() ));

                }
              }

              if (weekdayOfMonth == 'last') {
                while (nd.getMonth() == init.getMonth()) {
                  temp = new Date(nd);
                  nd.setDate(nd.getDate() + 7); //add a week to each instance to get the Nth instance
                }
                nd = new Date(temp);
              }
              else {

                for (let i: any = 0; i < wom.indexOf(weekdayOfMonth); i++) {
                    nd.setDate(nd.getDate() + 7);  //add a week to each instance to get the Nth instance
                    console.log(nd);
                }
              }
            }
            if (nd.getMonth() == init.getMonth()) { //make sure the new date calculated actually falls within the current month (sometimes there may be no 4th instance of a day)
              const ed = new Date(nd);
              ed.setSeconds(ed.getSeconds() + e.Duration);
              const ni = this.cloneObj(e);
              ni.EventDate = new Date(nd);
              if (!this.RecurrenceExceptionExists(e.Id, ni.EventDate)) {
                ni.EndDate = ed;
                ni.fRecurrence = false;
                ni.Id = e.Id;
                ni.ID = e.Id;
                er.push(ni);
              }
            }
          }
          init.setMonth(init.getMonth() + frequency);
          if ((new Date(init) > end) || (rTotal > 0 && rTotal <= total)) loop = false;
        }
      }
      if (e.RecurrenceData.indexOf("<yearly ") != -1) {
        let str = e.RecurrenceData.substring(e.RecurrenceData.indexOf("<yearly "));
        str = str.substring(8, str.indexOf('/>') - 1);
        const arr = this.formatString(str);
        const frequency = parseInt(arr[arr.indexOf("yearFrequency") + 1]);
        let loop = true;
        const init = this.parseDate(e.EventDate, e.fAllDayEvent);
        const month = (parseInt(arr[arr.indexOf("month") + 1]) - 1);
        const day = parseInt(arr[arr.indexOf("day") + 1]);
        while (loop) {
          const nd: any = new Date(init);
          nd.setMonth(month);
          nd.setDate(day);
          if ((new Date(init)).getTime() <= nd.getTime()) {
            total++;
            if ((new Date(init)).getTime() >= start.getTime()) {
              const ed = new Date(nd);
              ed.setSeconds(ed.getSeconds() + e.Duration);
              const ni = this.cloneObj(e);
              ni.EventDate = new Date(nd);
              if (!this.RecurrenceExceptionExists(e.Id, ni.EventDate)) {
                ni.EndDate = ed;
                ni.fRecurrence = false;
                ni.Id = e.Id;
                ni.ID = e.Id;
                er.push(ni);
              }
            }
          }
          init.setFullYear(init.getFullYear() + frequency);
          if ((new Date(init) > end) || (rTotal > 0 && rTotal <= total)) loop = false;
        }
      }
      if (e.RecurrenceData.indexOf("<yearlyByDay ") != -1) {
        let str = e.RecurrenceData.substring(e.RecurrenceData.indexOf("<yearlyByDay "));
        str = str.substring(13, str.indexOf('/>') - 1);
        const arr = this.formatString(str);
        const frequency = parseInt(arr[arr.indexOf("yearFrequency") + 1]);
        let loop = true;
        const init = this.parseDate(e.EventDate, e.fAllDayEvent);
        const month = (parseInt(arr[arr.indexOf("month") + 1]) - 1);
        const weekdayOfMonth = arr[arr.indexOf("weekdayOfMonth") + 1];
        let day = 0;
        for (let i: any = 0; i < wd.length; i++) {
          if (arr.indexOf(wd[i]) != -1) {
            if (arr[arr.indexOf(wd[i]) + 1].toLowerCase() == 'true') day = i;
          }
        }
        while (loop) {
          let nd: any = new Date(init);
          nd.setMonth(month);
          if ((new Date(init)).getTime() <= nd.getTime()) {
            total++;
            if ((new Date(init)).getTime() >= start.getTime()) {
              nd.setDate(1);
              const dayOfMonth = nd.getDay();
              if (day < dayOfMonth) nd.setDate(nd.getDate() + ((7 - dayOfMonth) + day)); //first instance of this day in the selected month
              else nd.setDate(nd.getDate() + (day - dayOfMonth));
              if (weekdayOfMonth == 'last') {
                const temp: any = new Date(nd);
                while (temp.getMonth() == month) {
                  nd = new Date(temp);
                  temp.setDate(temp.getDate() + 7); //loop from first instance of month to last instance of month
                }
              }
              else {
                nd.setDate(nd.getDate() + (7 * (wom.indexOf(weekdayOfMonth))));
              }
              if (nd.getMonth() == month) {
                const ed = new Date(nd);
                ed.setSeconds(ed.getSeconds() + e.Duration);
                const ni = this.cloneObj(e);
                ni.EventDate = new Date(nd);
                if (!this.RecurrenceExceptionExists(e.Id, ni.EventDate)) {
                  ni.EndDate = ed;
                  ni.fRecurrence = false;
                  ni.Id = e.Id;
                  ni.ID = e.Id;
                  er.push(ni);
                }
              }
            }
          }
          init.setFullYear(init.getFullYear() + frequency);
          init.setMonth(month);
          init.setDate(1);
          if ((new Date(init) > end) || (rTotal > 0 && rTotal <= total)) loop = false;
        }
      }
      if (e.fRecurrence === "1" && e.MasterSeriesItemID !== "") {
        const ni = this.cloneObj(e);
        er.push(ni);
      }
      return er;
    } //end recurrence check
  }

  public cloneObj(obj: any): any {
    let copy: any;
    if (null == obj || "object" != typeof obj) return obj;
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.cloneObj(obj[i]);
      }
      return copy;
    }
    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.cloneObj(obj[attr]);
      }
      return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
  }
}


