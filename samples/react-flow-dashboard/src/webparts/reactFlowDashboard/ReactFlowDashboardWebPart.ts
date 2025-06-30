import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ReactFlowDashboardWebPartStrings';
import ReactFlowDashboard from '../reactFlowDashboard/components/Dashboard/ReactFlowDashboard';
import { IReactFlowDashboardProps } from './components/Dashboard/IReactFlowDashboardProps';
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls';
import FlowService from './services/FlowService';
import GraphService from './services/GraphService';
import { AadTokenProvider } from '@microsoft/sp-http';

export interface IReactFlowDashboardWebPartProps {
  WebpartTitle: string;
  environments: string[];
}

export default class ReactFlowDashboardWebPart extends BaseClientSideWebPart<IReactFlowDashboardWebPartProps> {

  private flowService: FlowService;
  private graphService: GraphService;
  private environments: string[];
  private provider : AadTokenProvider;

  public render(): void {
    const element: React.ReactElement<IReactFlowDashboardProps> = React.createElement(
      ReactFlowDashboard,
      {
        displayMode: this.displayMode,
        flowService : this.flowService,
        graphService : this.graphService,
        provider : this.provider,
        context : this.context,
        webpartTitle: this.properties.WebpartTitle,
        environments: this.properties.environments,
        setWebPartTitle : (value: string) => {
          this.properties.WebpartTitle = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this.flowService = await FlowService.create(this.context);
    this.graphService = await GraphService.create(this.context);
    this.environments = await this.flowService.getEnvironments().then((values) => values.map((value) => value.name));
    this.provider = await this.context.aadTokenProviderFactory.getTokenProvider();
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
              groupName: strings.Groupdescription,
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
