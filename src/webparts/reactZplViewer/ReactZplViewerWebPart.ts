import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  WebPartContext
} from '@microsoft/sp-webpart-base';
import * as strings from 'ReactZplViewerWebPartStrings';
import { ReactZplViewer, IReactZplViewerProps } from './components/main';
import { sp } from '@pnp/sp';

export interface IReactZplViewerWebPartProps {
  description: string;
  title: string;
  context: WebPartContext;
}

export default class ReactZplViewerWebPart extends BaseClientSideWebPart<IReactZplViewerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactZplViewerProps > = React.createElement(
      ReactZplViewer,
      {
        description: this.properties.description,
        title: this.properties.title,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Title',
                  value: 'ZPL Viewer'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
