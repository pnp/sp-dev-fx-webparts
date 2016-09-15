import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './PowerBiEmbedded.module.scss';
import * as pbi from 'powerbi-client';
import * as strings from 'powerBiEmbeddedStrings';
import { IPowerBiEmbeddedWebPartProps } from './IPowerBiEmbeddedWebPartProps';

declare var powerbi;
export default class PowerBiEmbeddedWebPart extends BaseClientSideWebPart<IPowerBiEmbeddedWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `<div id="reportContainer" style="height:500px;"></div><a id="fullscreen">FULL SCREEN</a>`;

    // embed configuration.
    // generate the access token with "powerbi create-embed-token -r<report_id>"
    // get the report id via "powerbi get-reports"
    var embedConfiguration = {
      type: 'report',
      accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjIuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlciBCSSBOb2RlIFNESyIsIndjbiI6IlBvd2VyQkktUm9sYW5kIiwid2lkIjoiN2JmNmU0ZDMtNjJkZi00YmY1LWJhZDQtYjA0OTI3OWQ0NmQxIiwicmlkIjoiY2NhMGVjYjQtYjc4Yi00Njk4LWJlYzQtZjc3YmU4OGY0YTFmIiwibmJmIjoxNDczNzI2MTcyLCJleHAiOjE0NzM3Mjk3NzJ9.tI-yc_YGuw0krR0T-FNZ9e1ueyMcdQLlbP5L2o3K2I0',
      id: 'cca0ecb4-b78b-4698-bec4-f77be88f4a1f',
      embedUrl: 'https://embedded.powerbi.com/appTokenReportEmbed'
    };

    // grab a reference to the HTML element containing the report
    var reportContainer = document.getElementById('reportContainer');

    // construct a PBI service; according to the documentation this should be already available as a global variable,
    // but in my case that did not work.
    let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    var report = powerbi.embed(reportContainer, embedConfiguration);

    // attach an event handler for the
    document.getElementById("fullscreen").addEventListener("click", () => {
      var report = powerbi.get(reportContainer);

      report.fullscreen();
    });
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
