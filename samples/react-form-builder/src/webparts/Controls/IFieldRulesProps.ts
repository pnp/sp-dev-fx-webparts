import { IPropertyPaneDropdownOption } from "@microsoft/sp-property-pane";
import { IRuleEntry } from "../../Common/IRuleEntry";

export interface IFieldRulesProps {
  label: string;      
  disabled: boolean;
  stateKey: string;
  fieldNames: IPropertyPaneDropdownOption[];
  addionalFieldRules: {[key: string]: IRuleEntry};
  onChange: (fieldRules: {[key: string]: IRuleEntry}) => void;
}