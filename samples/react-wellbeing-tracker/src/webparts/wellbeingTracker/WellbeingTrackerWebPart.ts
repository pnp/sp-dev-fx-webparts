import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import WellbeingTracker from './components/WellbeingTracker';
import { IWellbeingTrackerProps } from './components/IWellbeingTrackerProps';
import { getSP } from './pnpjsConfig';

export interface IWellbeingTrackerWebPartProps {
  title: string;
  activitiesListName: string;
  completionsListName: string;
}

export default class WellbeingTrackerWebPart extends BaseClientSideWebPart<IWellbeingTrackerWebPartProps> {

  public async onInit(): Promise<void> {
    await super.onInit();
    getSP(this.context); // Bootstrap PnP JS with the SP context before any component mounts.
  }

  public render(): void {
    const element: React.ReactElement<IWellbeingTrackerProps> = React.createElement(
      WellbeingTracker,
      {
        title: this.properties.title || 'Wellbeing & Engagement Tracker',
        activitiesListName: this.properties.activitiesListName || 'WellbeingActivities',
        completionsListName: this.properties.completionsListName || 'WellbeingCompletions',
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
          header: { description: 'Configure the Wellbeing & Engagement Tracker' },
          groups: [
            {
              groupName: 'Display',
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Web Part Title',
                  placeholder: 'Wellbeing & Engagement Tracker',
                }),
              ],
            },
            {
              groupName: 'SharePoint Lists',
              groupFields: [
                PropertyPaneTextField('activitiesListName', {
                  label: 'Activities List Name',
                  placeholder: 'WellbeingActivities',
                  description: 'Columns: Title (text), Category (choice: Health, Mindfulness, Social)',
                }),
                PropertyPaneTextField('completionsListName', {
                  label: 'Completions List Name',
                  placeholder: 'WellbeingCompletions',
                  description: 'Columns: Title (text), Activity (lookup → WellbeingActivities), CompletionDate (date)',
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
