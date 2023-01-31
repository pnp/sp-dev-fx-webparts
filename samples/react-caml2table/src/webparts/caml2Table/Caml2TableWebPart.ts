import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { BaseComponentContext } from '@microsoft/sp-component-base'
import Caml2Table, { ICaml2TableProps } from './components/Caml2Table';
import { spfi, SPFI, SPFx } from '@pnp/sp/presets/all';

export interface ICaml2TableWebPartProps { }

export interface ICaml2TableContext {
  SPFxContext: BaseComponentContext;
  spfi: SPFI;
}
export const Caml2TableContext = React.createContext<ICaml2TableContext>(null);

export default class Caml2TableWebPart extends BaseClientSideWebPart<ICaml2TableWebPartProps> {
  public render(): void {
    const PnpJS = spfi().using(SPFx(this.context));
    const component: React.ReactElement<ICaml2TableProps> = React.createElement(Caml2Table, {});
    const wrapper = React.createElement(
      Caml2TableContext.Provider,
      {
        value: {
          SPFxContext: this.context,
          spfi: PnpJS
        } as ICaml2TableContext
      }, component);


    ReactDom.render(wrapper, this.domElement);
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
