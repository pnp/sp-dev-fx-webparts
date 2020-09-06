export interface IOrder {
  Id: number;
  OrderDate: Date;
  Region: string;
  Rep: string;
  Item: string;
  Units: number;
  UnitCost: number;
  Total: number;
}