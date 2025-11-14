export interface IRuleEntry {
  Regex: string,
  MinValue: number|Date,
  MaxValue: number|Date,  
  ErrorMsg: string,
  DefaultValue:string
}