import { Moment } from "moment-timezone"

export const getFiscalYear = (date: Moment, fiscalYearSartMonth: number, fiscalYearStartYear:string): string =>{
    if(fiscalYearStartYear === "Next Year")
     return (date.month() >= fiscalYearSartMonth ? date.clone().add(1, 'year') : date).format('YY')
    else{
      return (date.month() >= fiscalYearSartMonth ? date.clone() : date.clone().add(-1, 'year')).format('YY')
    }
}

export const getFiscalQuarter = (date: Moment, fiscalYearSartMonth: number) =>
    Math.floor((date.month() + 12 - fiscalYearSartMonth) % 12 / 3) + 1
