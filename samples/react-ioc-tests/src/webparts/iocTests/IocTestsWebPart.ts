import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';

import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import * as strings from 'IocTestsWebPartStrings';
import ListOfLists, { IListOfListsProps } from './components/ListOfLists';
import IoCTestsWebPartPropsDependencyResolver from './IoCTestsWebPartPropsDependencyResolver';
import DependencyResolver from '../../common/providers/DependencyResolver/DependencyResolver';

export interface IIocTestsWebPartProps {
  description: string;
}

export default class IocTestsWebPart extends BaseClientSideWebPart<IIocTestsWebPartProps> {

  public render(): void {
    const resolver = new IoCTestsWebPartPropsDependencyResolver(new DependencyResolver());
    const props = resolver.resolve(this.properties);
    const element: React.ReactElement<IListOfListsProps> = React.createElement(
      ListOfLists,
      props
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
