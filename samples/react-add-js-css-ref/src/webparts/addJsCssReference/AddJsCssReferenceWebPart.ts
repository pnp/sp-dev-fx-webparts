import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import AddJsCssReference, { IAddJsCssReferenceProps } from './components/AddJsCssReference';
import { getSP } from './pnpjsConfig';

export interface IAddJsCssReferenceWebPartProps {
}

export default class AddJsCssReferenceWebPart extends BaseClientSideWebPart<IAddJsCssReferenceWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAddJsCssReferenceProps> = React.createElement(
      AddJsCssReference,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    getSP(this.context);
    return super.onInit();
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
          groups: [
            {
              groupName: "No properties available",
              groupFields: []
            }
          ]
        }
      ]
    };
  }
}
