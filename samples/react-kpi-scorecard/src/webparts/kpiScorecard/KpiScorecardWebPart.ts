import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'KpiScorecardWebPartStrings';
import KpiScorecard from './components/KpiScorecard';
import {
  KpiScorecardService,
  validateRootPath,
  type IKpiScorecardConfig
} from './services/KpiScorecardService';

export interface IKpiScorecardWebPartProps extends IKpiScorecardConfig {
}

const defaultProperties: IKpiScorecardWebPartProps = {
  listTitle: 'KPI Observations',
  rootPath: '',
  titleField: 'Title',
  valueField: 'Value',
  targetField: 'Target',
  statusField: 'Status',
  dateField: 'Date',
  dateFilter: ''
};

export default class KpiScorecardWebPart extends BaseClientSideWebPart<IKpiScorecardWebPartProps> {
  private service: KpiScorecardService | undefined;
  private serviceRootPath = '';

  public render(): void {
    const config: IKpiScorecardConfig = {
      ...defaultProperties,
      ...this.properties
    };
    const rootPath = config.rootPath || '';
    const safeRootPath = validateRootPath(rootPath) ? rootPath : '';
    let service = this.service;

    if (!service || this.serviceRootPath !== safeRootPath) {
      service = new KpiScorecardService(this.context, safeRootPath);
      this.service = service;
      this.serviceRootPath = safeRootPath;
    }

    const element: React.ReactElement = React.createElement(KpiScorecard, {
      config,
      service,
      cardsTitle: ''
    });

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
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listTitle', { label: strings.ListTitleFieldLabel }),
                PropertyPaneTextField('rootPath', { label: strings.RootPathFieldLabel }),
                PropertyPaneTextField('titleField', { label: strings.TitleFieldLabel }),
                PropertyPaneTextField('valueField', { label: strings.ValueFieldLabel }),
                PropertyPaneTextField('targetField', { label: strings.TargetFieldLabel }),
                PropertyPaneTextField('statusField', { label: strings.StatusFieldLabel }),
                PropertyPaneTextField('dateField', { label: strings.DateFieldLabel }),
                PropertyPaneTextField('dateFilter', { label: strings.DateFilterFieldLabel })
              ]
            }
          ]
        }
      ]
    };
  }
}
