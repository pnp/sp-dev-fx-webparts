import * as $ from 'jquery';
import * as moment from 'moment';

/* tslint:disable:no-function-expression */
($.fn.dataTable.render as any).moment = function (from: string, to: string, locale: string): (d: any, type: string, row: any) => string {
/* tslint:enable */
  // Argument shifting
  if (arguments.length === 1) {
    locale = 'en';
    to = from;
    from = 'YYYY-MM-DD';
  } else if (arguments.length === 2) {
    locale = 'en';
  }

  return (d: any, type: string, row: any): string => {
    let m: moment.Moment = moment(d, from, locale, true);

    // Order and type get a number value from Moment, everything else
    // sees the rendered value
    return m.format(type === 'sort' || type === 'type' ? 'x' : to);
  };
};
