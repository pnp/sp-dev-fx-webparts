import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
export interface IOptionsContainerProps {
  disabled: boolean;
  selectedKey?: () => string;
  options: string;
  label?: string;
  multiSelect: boolean;
  onChange?: (ev: any, option: any, isMultiSel: boolean) => void;
}