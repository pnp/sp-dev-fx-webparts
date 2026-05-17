import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { Theme } from '@fluentui/react-components';
import { SPFxHostType } from './SPFxHostType';
import { DataSourceMode, INewsFeedWebPartProps } from './INewsFeedWebPartProps';
import { ISelectedSite } from './ISelectedSite';
import { BaseComponentContext } from '@microsoft/sp-component-base';

export interface IDataSourceChangePayload {
  dataSourceMode: DataSourceMode;
  selectedSites: ISelectedSite[];
}

export interface IDataSourceComponentProps {
  spfxContext: BaseComponentContext;
  dataSourceMode: DataSourceMode;
  selectedSites: ISelectedSite[];
  theme: Theme;
  hostType: SPFxHostType;
  onChange: (payload: IDataSourceChangePayload) => void;
}

export interface IDataSourceInternalProps
  extends IPropertyPaneCustomFieldProps,
    IDataSourceComponentProps {
  onRender: (domElement: HTMLElement) => void;
  onDispose: (domElement: HTMLElement) => void;
}

export type IDataSourceFieldProps = Omit<
  IDataSourceInternalProps,
  'onRender' | 'onDispose' | 'key'
> & { spfxContext: INewsFeedWebPartProps['dataSourceMode'] extends unknown ? BaseComponentContext : BaseComponentContext };
