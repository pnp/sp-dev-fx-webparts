import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart,  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import * as strings from 'AccessibleTableWebPartStrings';
import AccessibleTable from './components/AccessibleTable';
import { IAccessibleTableProps } from './components/IAccessibleTable.types';

import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldTextWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldTextWithCallout';

export interface IAccessibleTableWebPartProps {
  summary: string;
  caption: string;
  title: string;
  datasetlabel: string;
}

export default class AccessibleTableWebPart extends BaseClientSideWebPart<IAccessibleTableWebPartProps> {
   public render(): void {
    const element: React.ReactElement<IAccessibleTableProps> = React.createElement(
      AccessibleTable,
      {
        summary: this.properties.summary,
        caption: this.properties.caption,
        title: this.properties.title,
        datasetlabel: this.properties.datasetlabel
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
              groupName: strings.ChartSettingsGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('datasetlabel', {
                  label: strings.DatasetFieldLabel
                })
              ]
            },
            {
              groupName: strings.AccessibilitySettingsGroupName,
              groupFields: [
                PropertyFieldTextWithCallout('caption', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'captionFieldId',
                  label: strings.CaptionFieldLabel,
                  calloutContent: React.createElement('span', {}, strings.CaptionFieldDescription),
                  calloutWidth: 150,
                  value: this.properties.caption
                }),
                PropertyFieldTextWithCallout('summary', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'summaryFieldId',
                  label: strings.SummaryFieldLabel,
                  calloutContent: React.createElement('span', {}, strings.SummaryFieldDescription),
                  calloutWidth: 150,
                  value: this.properties.summary
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
