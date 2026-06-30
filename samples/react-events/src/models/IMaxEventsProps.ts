import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';

export interface IMaxEventsComponentProps {
  label: string | JSX.Element;
  value: number;
  min: number;
  max: number;
  step: number;
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (value: number) => void;
}

export interface IMaxEventsInternalProps extends IPropertyPaneCustomFieldProps, IMaxEventsComponentProps {}
