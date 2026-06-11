import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';

export interface IShowMetaComponentProps {
  label: string | JSX.Element;
  value: boolean;
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (value: boolean) => void;
}

export interface IShowMetaInternalProps extends IPropertyPaneCustomFieldProps, IShowMetaComponentProps {}
