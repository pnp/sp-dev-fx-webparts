import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';

export interface ICardLinesComponentProps {
  headlineLinesLabel: string | JSX.Element;
  descriptionLinesLabel: string | JSX.Element;
  headlineLines: number;
  descriptionLines: number;
  showDescriptionLines?: boolean;
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (headlineLines: number, descriptionLines: number) => void;
}

export interface ICardLinesInternalProps extends IPropertyPaneCustomFieldProps, ICardLinesComponentProps {}
