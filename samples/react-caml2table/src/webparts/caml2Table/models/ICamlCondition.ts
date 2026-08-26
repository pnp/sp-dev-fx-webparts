/**
 * Interface representing a single CAML query condition
 */
export interface ICamlCondition {
  id: string;
  fieldName: string;
  operator: string;
  value: string;
  valueType: string;
  lookupId?: boolean;
  isRaw?: boolean; // For Today and other dynamic values
}