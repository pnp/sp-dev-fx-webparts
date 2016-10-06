import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-client-preview';

import * as strings from 'workingWithStrings';
import WorkingWith, { IWorkingWithProps } from './components/WorkingWith';
import { IWorkingWithWebPartProps } from './IWorkingWithWebPartProps';

export default class WorkingWithWebPart extends BaseClientSideWebPart<IWorkingWithWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IWorkingWithProps> = React.createElement(WorkingWith, {
      numberOfPeople: this.properties.numberOfPeople,
      title: this.properties.title,
      httpClient: this.context.httpClient,
      siteUrl: this.context.pageContext.web.absoluteUrl
    });

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneSlider('numberOfPeople', {
                  label: strings.NumberOfPeopleFieldLabel,
                  min: 1,
                  max: 10,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
