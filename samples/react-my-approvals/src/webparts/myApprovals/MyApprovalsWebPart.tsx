import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls';

import * as strings from 'MyApprovalsWebPartStrings';
import MyApprovals from './components/MyApprovals';
import { IMyApprovalsProps } from './components/IMyApprovalsProps';
import HttpClientService from './services/HttpClientService';

export interface IMyApprovalsWebPartProps {
  title: string;
  environments: string[] | null;
}

export default class MyApprovalsWebPart extends BaseClientSideWebPart<IMyApprovalsWebPartProps> {

  private httpService: HttpClientService;
  private environments: string[];

  public render(): void {
    const element: React.ReactElement<IMyApprovalsProps> = React.createElement(
      MyApprovals,
      {
        httpService: this.httpService,
        displayMode: this.displayMode,
        environments: this.properties.environments,
        title: this.properties.title,
        setTitle: (value: string) => {
          this.properties.title = value;
        }
      }
    );
    ReactDom.render(
      <IntlProvider locale={navigator.languages[0].substring(0, 2)}>
        {element}
      </IntlProvider>,
      this.domElement);
  }

  protected async onInit(): Promise<void> {
    this.httpService = await HttpClientService.create(this.context);
    this.environments = await this.httpService
      .getEnvironments()
      .then((values) => values.map((value) => value.name));
    if (!this.properties.environments) {
      this.properties.environments = this.environments;
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.1');
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
              groupFields: [
                PropertyFieldMultiSelect(
                  'environments',
                  {
                    key: 'environments',
                    label: strings.EnvironmentLabel,
                    options: this.environments.map((value) => ({
                      key: value,
                      text: value
                    })),
                    selectedKeys: this.properties.environments
                  }
                )
              ]
            }
          ]
        }
      ]
    };
  }
}
