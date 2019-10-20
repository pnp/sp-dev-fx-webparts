import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GraphextensionWebPartStrings';
import Graphextension from './components/Graphextension';
import { IGraphextensionProps } from './components/IGraphextensionProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { ToastContainer, toast } from 'react-toastify';

export interface IGraphextensionWebPartProps {
  description: string;
}

export default class GraphextensionWebPart extends BaseClientSideWebPart<IGraphextensionWebPartProps> {

  protected onInit(): Promise<void> {

    //toast.configure()
    SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css");
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IGraphextensionProps > = React.createElement(
      Graphextension,
      {
        webpartContext: this.context
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
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
