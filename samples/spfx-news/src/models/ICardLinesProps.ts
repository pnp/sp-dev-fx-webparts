import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';

export interface ICardLinesComponentProps {
  headlineLinesLabel: string | JSX.Element;
  bodyLinesLabel: string | JSX.Element;
  headlineLines: number;
  bodyLines: number;
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (headlineLines: number, bodyLines: number) => void;
}

export interface ICardLinesInternalProps
  extends IPropertyPaneCustomFieldProps,
    ICardLinesComponentProps {}
