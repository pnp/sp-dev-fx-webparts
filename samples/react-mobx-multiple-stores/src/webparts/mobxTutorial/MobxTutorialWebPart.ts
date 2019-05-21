import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { configure } from "mobx";
import * as strings from 'MobxTutorialWebPartStrings';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IMobxTutorialProps } from './components/IMobxTutorialProps';
import MobxTutorialProvider from './components/MobxTutorialProvider';

configure({ enforceActions: "always" });

export interface IMobxTutorialWebPartProps {
  description: string;
}

export default class MobxTutorialWebPart extends BaseClientSideWebPart<IMobxTutorialWebPartProps> {
  public render(): void {
    const element: React.ReactElement<{}> = React.createElement(
      MobxTutorialProvider,
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
