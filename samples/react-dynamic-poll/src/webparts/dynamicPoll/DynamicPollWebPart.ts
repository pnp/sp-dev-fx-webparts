import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import DynamicPoll from './components/DynamicPoll';

export interface IDynamicPollWebPartProps {
  description: string;
}

export default class DynamicPollWebPart extends BaseClientSideWebPart<IDynamicPollWebPartProps> {
  public render(): void {
    const element: React.ReactElement = React.createElement(
      DynamicPoll,
      {
      }
    );

    ReactDom.render(element, this.domElement);
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
          groups: [
            {
              groupFields: [

              ]
            }
          ]
        }
      ]
    };
  }
}
