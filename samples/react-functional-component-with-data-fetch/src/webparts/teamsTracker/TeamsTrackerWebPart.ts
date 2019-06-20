import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-property-pane';
import TeamsTracker from './components/TeamsTracker';
import { graph } from '@pnp/graph';

// tidy up props and property pane
export interface ITeamsTrackerWebPartProps {
  title: string;
  description: string;
  showChannels: boolean;
}

export default class TeamsTrackerWebPart extends BaseClientSideWebPart<ITeamsTrackerWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(() => {
      graph.setup({ spfxContext: this.context });
    });
  }

  public render(): void {
    ReactDom.render(React.createElement(TeamsTracker, this.properties), this.domElement);
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
            description: "Properties"
          },
          groups: [
            {
              groupName: "General",
              groupFields: [
                PropertyPaneTextField('title', { label: "Web part title" }),
                PropertyPaneTextField('description', { label: "Description Text" }),
                PropertyPaneToggle('showChannels', { label: "Show channels" })
              ]
            }
          ]
        }
      ]
    };
  }
}
