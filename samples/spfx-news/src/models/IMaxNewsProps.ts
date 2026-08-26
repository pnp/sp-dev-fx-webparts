import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';

export interface IMaxNewsComponentProps {
  label: string | JSX.Element;
  value: number;
  min: number;
  max: number;
  step: number;
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (newValue: number) => void;
}

export interface IMaxNewsInternalProps
  extends IPropertyPaneCustomFieldProps,
    IMaxNewsComponentProps {}
