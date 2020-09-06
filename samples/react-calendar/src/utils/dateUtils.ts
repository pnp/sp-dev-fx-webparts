import * as moment from 'moment';

export function toLocaleLongDateString(date: Date) {
    return moment(date).format('LL');
}

export function toLocaleShortDateString(date: Date) {
    return moment(date).format('ll');
}
