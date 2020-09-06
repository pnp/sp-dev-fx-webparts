import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, PropertyPaneCheckbox } from '@microsoft/sp-webpart-base';
import { configure } from "mobx";
import * as strings from 'MobxTutorialWebPartStrings';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { RootStore } from '../../stores/RootStore';
import MobxTutorialProvider from './components/MobxTutorialProvider';

// State modification should always happen through actions
configure({ enforceActions: "always" });

export interface IMobxTutorialWebPartProps {
  ApplicationTitle: string;
  AllowImportantItems: boolean;
}

export default class MobxTutorialWebPart extends BaseClientSideWebPart<IMobxTutorialWebPartProps> {
  private readonly dependencies = { rootStore: new RootStore() };

  protected onInit() {
    return new Promise<void>((resolve, reject) => {
      const { configStore } = this.dependencies.rootStore;
      configStore.setAllowImportantItems(this.properties.AllowImportantItems);
      configStore.setApplicationTitle(this.properties.ApplicationTitle);
      resolve();
    });

  }
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
    const { configStore } = this.dependencies.rootStore;

    if (propertyPath === "ApplicationTitle") {
      configStore.setApplicationTitle(newValue);
    }
    else if (propertyPath === "AllowImportantItems") {
      configStore.setAllowImportantItems(newValue);
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
                PropertyPaneTextField('ApplicationTitle', {
                  label: strings.AppTitleFieldLabel,
                }),
                PropertyPaneCheckbox('AllowImportantItems', {
                  text: strings.AllowImportantItemsLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
