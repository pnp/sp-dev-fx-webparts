import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { configure } from "mobx";
import * as strings from 'MobxTutorialWebPartStrings';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { RootStore } from '../../stores/RootStore';
import MobxTutorialProvider from './components/MobxTutorialProvider';

configure({ enforceActions: "always" });

export interface IMobxTutorialWebPartProps {
  description: string;
}

export default class MobxTutorialWebPart extends BaseClientSideWebPart<IMobxTutorialWebPartProps> {
  private readonly dependencies = { rootStore: new RootStore() };

  public render(): void {

    const element: React.ReactElement<{}> = React.createElement(
      MobxTutorialProvider,
      {
        stores: { ...this.dependencies.rootStore }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === "Application title") {
      const { configStore } = this.dependencies.rootStore;
      configStore.setApplicationTitle(newValue);
    }
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
                PropertyPaneTextField('Application title', {
                  label: strings.AppTitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
