import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'QuestionnaireMeetingAppWebPartStrings';
import QuestionnaireMeetingApp from './components/QuestionnaireMeetingApp';
import { IQuestionnaireMeetingAppProps } from './components/IQuestionnaireMeetingAppProps';
import { sp } from '@pnp/sp/presets/all';

export interface IQuestionnaireMeetingAppWebPartProps {
  siteUrl: string;
  listName: string;
}

export default class QuestionnaireMeetingAppWebPart extends BaseClientSideWebPart<IQuestionnaireMeetingAppWebPartProps> {

  public async onInit(): Promise<void> {
    return super.onInit().then(_ => {
      if (this.context.sdks.microsoftTeams) {
        // checking that we're in Teams
        const context = this.context.sdks.microsoftTeams!.context;
        this._applyTheme(context.theme || 'default');
        this.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler(this._applyTheme);

        // Setup context to PnPjs
        sp.setup({
          spfxContext: this.context,
          sp: {
            baseUrl: `https://${this.context.sdks.microsoftTeams.context.teamSiteDomain}${this.properties.siteUrl}`
          }
        });
      }
    });
  }

  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }

  public render(): void {
    const element: React.ReactElement<IQuestionnaireMeetingAppProps> = React.createElement(
      QuestionnaireMeetingApp,
      {
        siteUrl: this.properties.siteUrl,
        listName: this.properties.listName,
        context: this.context
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('siteUrl', {
                  label: strings.SiteURLFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
