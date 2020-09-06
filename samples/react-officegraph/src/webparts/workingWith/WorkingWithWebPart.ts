import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext,
  PropertyPaneSlider

} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'workingWithStrings';
import WorkingWith, { IWorkingWithProps } from './components/WorkingWith';
import { IWorkingWithWebPartProps } from './IWorkingWithWebPartProps';


export default class WorkingWithWebPart extends BaseClientSideWebPart<IWorkingWithWebPartProps> {

  public constructor(context: IWebPartContext) {
    super();
  }

  public render(): void {
    const element: React.ReactElement<IWorkingWithProps> = React.createElement(WorkingWith, {
      numberOfPeople: this.properties.numberOfPeople,
      title: this.properties.title,
      httpClient: this.context.spHttpClient,
      siteUrl: this.context.pageContext.web.absoluteUrl
    });

    ReactDom.render(element, this.domElement);
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
