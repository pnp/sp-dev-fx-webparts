export interface IFlightInfo {
  id: string;
  label: string;
  detail: Detail;
  type: string;
  match: string;
  name?: string;

}
interface Detail {
  iata?: string;
  logo: string;
  callsign?: string;
  flight?: string;
  operator?: string;
}
