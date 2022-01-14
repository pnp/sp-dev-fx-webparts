import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownProps,
  IPropertyPaneField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MyApprovalsWebPartStrings';
import MyApprovals from './components/MyApprovals';
import { IMyApprovalsProps } from './components/IMyApprovalsProps';
import HttpClientService from './services/HttpClientService';

export interface IMyApprovalsWebPartProps {
  title: string;
  environment: string;
}

export default class MyApprovalsWebPart extends BaseClientSideWebPart<IMyApprovalsWebPartProps> {

  private httpService: HttpClientService;
  private environmentPanelField: IPropertyPaneField<IPropertyPaneDropdownProps>;

  public render(): void {
    const element: React.ReactElement<IMyApprovalsProps> = React.createElement(
      MyApprovals,
      {
        httpService: this.httpService,
        displayMode: this.displayMode,
        environment: this.properties.environment,
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

  private setTitle(value: string): void {
    this.properties.title = value;
  }

  protected async onInit(): Promise<void> {
    this.httpService = await HttpClientService.create(this.context);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    const environments = await this.httpService.getEnvironments();
    this.environmentPanelField = PropertyPaneDropdown(
      'environment',
      {
        label: strings.EnvironmentLabel,
        options: environments.map((value) => ({
          key: value.name,
          text: value.name
        })),
      }
    );
    this.context.propertyPane.refresh();
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
              groupFields: [
                this.environmentPanelField
              ]
            }
          ]
        }
      ]
    };
  }
}
