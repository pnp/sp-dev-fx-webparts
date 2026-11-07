export interface IOrgNode {
  name: string;
  title?: string;
  email?: string;
  account?: string;   // the profile login name (AccountName), used to re-root the chart on this person
}
