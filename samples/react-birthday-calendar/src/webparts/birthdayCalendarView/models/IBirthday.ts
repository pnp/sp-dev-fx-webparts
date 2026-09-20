export interface IBirthday {
  id: number;
  name: string;
  month: number; // 0-11
  day: number;   // 1-31
  /** Claims login name of the linked person, e.g. i:0#.f|membership|alex@contoso.com */
  loginName?: string;
  email?: string;
}
