import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';

export interface IShowCommentsComponentProps {
  label: string | JSX.Element;
  value: boolean;
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (newValue: boolean) => void;
}

export interface IShowCommentsInternalProps
  extends IPropertyPaneCustomFieldProps,
    IShowCommentsComponentProps {}
