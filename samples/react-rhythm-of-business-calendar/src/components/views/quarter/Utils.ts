import { Moment } from "moment-timezone"

export const getFiscalYear = (date: Moment, fiscalYearSartMonth: number): string =>
    (date.month() >= fiscalYearSartMonth ? date.clone().add(1, 'year') : date).format('YY')

export const getFiscalQuarter = (date: Moment, fiscalYearSartMonth: number) =>
    Math.floor((date.month() + 12 - fiscalYearSartMonth) % 12 / 3) + 1
