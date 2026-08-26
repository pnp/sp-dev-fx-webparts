import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';

export interface IMarqueeDirectionComponentProps {
  label: string | JSX.Element;
  value: 'vertical' | 'horizontal';
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (value: 'vertical' | 'horizontal') => void;
}

export interface IMarqueeDirectionInternalProps extends IPropertyPaneCustomFieldProps, IMarqueeDirectionComponentProps {}
