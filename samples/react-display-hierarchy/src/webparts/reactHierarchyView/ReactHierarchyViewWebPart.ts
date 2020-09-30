import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactHierarchyViewWebPartStrings';
import ReactHierarchyView from './components/ReactHierarchyView';
import { IReactHierarchyViewProps } from './components/IReactHierarchyViewProps';
import {
  Environment,
  EnvironmentType,
  ServiceScope
} from '@microsoft/sp-core-library';

// sp-pnp-js for SPFx context configuration
import * as pnp from "@pnp/sp";

export interface IReactHierarchyViewWebPartProps {
  listName: string;
}

export default class ReactHierarchyViewWebPart extends BaseClientSideWebPart<IReactHierarchyViewWebPartProps> {

  public async onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IReactHierarchyViewProps> = React.createElement(
      ReactHierarchyView,
      {
        serviceScope: this.context.serviceScope,
        listName: this.properties.listName
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
                PropertyPaneTextField('listName', {
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
