import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

import * as strings from 'pollStrings';
import { Main, IMainProps } from './components/Main';
import { IPollWebPartProps } from './IPollWebPartProps';
import { IPollService, PollService, MockPollService } from './services';

export default class PollWebPart extends BaseClientSideWebPart<IPollWebPartProps> {
  private pollService: IPollService;

  protected onInit(): Promise<void> {
    this.configureWebPart = this.configureWebPart.bind(this);

    if (DEBUG && Environment.type === EnvironmentType.Local) {
      this.pollService = new MockPollService();
    } else {
      this.pollService = new PollService(this.context);
    }

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IMainProps> = React.createElement(Main, {
      listName: this.properties.listName,
      pollTitle: this.properties.pollTitle,
      pollDescription: this.properties.pollDescription,
      needsConfiguration: this.needsConfiguration(),
      displayMode: this.displayMode,
      configureWebPart: this.configureWebPart,
      pollService: this.pollService
    });

    ReactDom.render(element, this.domElement);
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
              groupName: strings.ViewGroupName,
              groupFields: [
                PropertyPaneTextField('pollTitle', {
                  label: strings.PollTitleFieldLabel,
                  onGetErrorMessage: this.validatePollTitle
                }),
                PropertyPaneTextField('pollDescription', {
                  label: strings.PollDescriptionFieldLabel
                })
              ]
            },
            {
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel,
                  onGetErrorMessage: this.validateListName
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private validatePollTitle(pollTitle: string): string {
    if (pollTitle.trim().length === 0) {
      return 'Please enter title of this poll';
    }
    else {
      return '';
    }
  }

  private validateListName(listName: string): string {
    if (listName.trim().length === 0) {
      return 'Please enter the name of the list';
    }
    else {
      return '';
    }
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  private needsConfiguration(): boolean {
    return this.properties.listName === null ||
      this.properties.listName.trim().length === 0 ||
      this.properties.pollTitle === null ||
      this.properties.pollTitle.trim().length === 0;
  }

  private configureWebPart(): void {
    this.context.propertyPane.open();
  }
}