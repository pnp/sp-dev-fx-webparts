import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';

export interface IHeightComponentProps {
  label: string | JSX.Element;
  value: string;
  theme: Theme;
  hostType: SPFxHostType;
  className?: string;
  onChange: (value: string) => void;
}

export interface IHeightInternalProps extends IPropertyPaneCustomFieldProps, IHeightComponentProps {}
