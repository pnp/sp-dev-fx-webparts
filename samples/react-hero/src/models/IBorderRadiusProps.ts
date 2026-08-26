import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';

export interface IBorderRadiusInternalProps extends IPropertyPaneCustomFieldProps {
  label: string | JSX.Element;
  value: string;
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (newValue: string) => void;
}

export interface IBorderRadiusComponentProps {
  label: string | JSX.Element;
  value: string;
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (newValue: string) => void;
}
