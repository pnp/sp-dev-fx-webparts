import { IPropertyPaneDropdownOption } from "@microsoft/sp-property-pane";
import { IRuleEntry } from "../../Common/IRuleEntry";

export interface IPropertyPaneFieldRulesProps {
    label: string;      
    disabled: boolean;
    stateKey: string;
    fieldNames: IPropertyPaneDropdownOption[];
    addionalFieldRules: {[key: string]: IRuleEntry};
    onPropertyChange: (fieldRules: {[key: string]: IRuleEntry}) => void;
  }