import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';

export interface IHeightInternalProps extends IPropertyPaneCustomFieldProps {
  label: string | JSX.Element;
  value: number;
  min: number;
  max: number;
  step: number;
  theme: Theme;
  hostType: SPFxHostType;
  className?: string;
  onChange: (newValue: number) => void;
}

export interface IHeightComponentProps {
  label: string | JSX.Element;
  value: number;
  min: number;
  max: number;
  step: number;
  theme: Theme;
  hostType: SPFxHostType;
  className?: string;
  onChange: (newValue: number) => void;
}
