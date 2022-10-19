import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls';

import * as strings from 'FlowButtonWebPartStrings';
import FlowButton from './components/FlowButton';
import { IFlowButtonProps } from './components/IFlowButtonProps';
import FlowClientService from './services/FlowClientService';
import GraphClientService from './services/GraphClientService';

export interface IFlowButtonWebPartProps {
  title: string;
  environments: string[] | null;
}

export default class FlowButtonWebPart extends BaseClientSideWebPart<IFlowButtonWebPartProps> {

  private flowService: FlowClientService;
  private graphService: GraphClientService;
  private environments: string[];

  public render(): void {
    const element: React.ReactElement<IFlowButtonProps> = React.createElement(
      FlowButton,
      {
        flowService: this.flowService,
        graphService: this.graphService,
        displayMode: this.displayMode,
        environments: this.properties.environments,
        title: this.properties.title,
        setTitle: (value: string) => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this.flowService = await FlowClientService.create(this.context);
    this.graphService = await GraphClientService.create(this.context);
    this.environments = await this.flowService
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
