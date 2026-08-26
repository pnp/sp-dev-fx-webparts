import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';

export interface IShowShareComponentProps {
  label: string | JSX.Element;
  value: boolean;
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (newValue: boolean) => void;
}

export interface IShowShareInternalProps
  extends IPropertyPaneCustomFieldProps,
    IShowShareComponentProps {}
