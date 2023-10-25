import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { TenantWideExtensionManager, ITenantWideExtensionManagerProps } from './components/TenantWideExtensionManager';
import { ApplicationContext, IApplicationContext } from '../../Contexsts/ApplicationContext';
import { SPFI, SPFx, spfi } from '@pnp/sp/presets/all';
import { AppCatalogProvider } from '../../Providers/AppCatalogProvider';

export interface ITenantWideExtensionManagerWebPartProps {
}

export default class TenantWideExtensionManagerWebPart extends BaseClientSideWebPart<ITenantWideExtensionManagerWebPartProps> {
  public render(): void {
    const sp: SPFI = spfi().using(SPFx(this.context))
    const element: React.ReactElement<ITenantWideExtensionManagerProps> = React.createElement(TenantWideExtensionManager, {});
    const context = React.createElement(ApplicationContext.Provider, {
      value: {
        context: this.context,
        PnPjs: sp,
        Provider: new AppCatalogProvider(sp)
      } as IApplicationContext
    }, element)

    ReactDom.render(context, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
