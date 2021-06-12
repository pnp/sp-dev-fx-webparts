import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'RemoteEventReceiverManagerWebPartStrings';
import RemoteEventReceiverManager from './components/RemoteEventReceiverManager';
import { IRemoteEventReceiverManagerProps } from './components/RemoteEventReceiverManager';
import { setup as pnpSetup } from "@pnp/common";

export interface IRemoteEventReceiverManagerWebPartProps {
}

export default class RemoteEventReceiverManagerWebPart extends BaseClientSideWebPart<IRemoteEventReceiverManagerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRemoteEventReceiverManagerProps> = React.createElement(
      RemoteEventReceiverManager,
      { context: this.context }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {

    return super.onInit().then(_ => {
      pnpSetup({
        spfxContext: this.context
      });
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: ""
          },
          groups: []
        }
      ]
    };
  }
}
