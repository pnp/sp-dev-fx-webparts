import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneLabel,
  PropertyPaneHorizontalRule,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, PropertyPaneToggle, PropertyPaneCheckbox } from '@microsoft/sp-webpart-base';

import * as strings from 'MySitesWebPartStrings';
import { MySites } from './components/MySites/MySites';
import { IMySitesProps } from './components/MySites/IMySitesProps';
import { loadTheme } from "office-ui-fabric-react";
import { DisplayMode } from '@microsoft/sp-core-library';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import { sp } from "@pnp/sp";
import { PropertyFieldSitePicker } from '@pnp/spfx-property-controls/lib/PropertyFieldSitePicker';
import { IPropertyFieldSite } from "@pnp/spfx-property-controls/lib/PropertyFieldSitePicker";
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
import {  useUserSites } from '../../Hooks/useUserSites';
 
export interface IPropertyControlsTestWebPartProps {
  sites: IPropertyFieldSite[];
}
import { graph } from "@pnp/graph";
import { ITeam } from '../../Entities/ITeam';

const teamsDefaultTheme = require("../../common/TeamsDefaultTheme.json");
const teamsDarkTheme = require("../../common/TeamsDarkTheme.json");
const teamsContrastTheme = require("../../common/TeamsContrastTheme.json");


export interface IMySitesWebPartProps {
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  itemsPerPage: number;
  defaultSitesToFilter: IPropertyFieldSite[];
  enableFilterSharepointSites:boolean;
  enableFilterO365groups: boolean;
  enableFilterSitesWithSubWebs: boolean;
  DefaultTeamsToFilter: string[];
}

export default class MySitesWebPart extends BaseClientSideWebPart<IMySitesWebPartProps> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  private _userTeamsOptions:IPropertyPaneDropdownOption[] = [];
 
  protected async onInit(): Promise<void> {

    sp.setup({
      spfxContext: this.context
    });

    graph.setup({
      spfxContext: this.context
    });

    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();
    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const context = this.context.sdks.microsoftTeams!.context;

      
      this._applyTheme(context.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler(
        this._applyTheme
      );
    }

   

    return Promise.resolve();
  }

  /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
     
    this.render();
  }

// Apply btheme id in Teams
  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);

    if (theme == "dark") {
      loadTheme({
        palette: teamsDarkTheme
      });
    }

   if (theme == "default") {
      loadTheme({
        palette: teamsDefaultTheme
      });
    }

    if (theme == "contrast") {
      loadTheme({
        palette: teamsContrastTheme
      });
    }
  }






  public render(): void {
    const element: React.ReactElement<IMySitesProps> = React.createElement(
      MySites,
      {
        title: this.properties.title,
        context: this.context,
        themeVariant: this._themeVariant,
        displayMode: this.displayMode,
        itemsPerPage: this.properties.itemsPerPage,
        updateProperty: (value: string) => {
          this.properties.title = value;
      },
      defaultSitesToFilter: this.properties.defaultSitesToFilter,
      enableFilterSharepointSites: this.properties.enableFilterSharepointSites,
      enableFilterO365groups: this.properties.enableFilterO365groups,
      enableFilterSitesWithSubWebs: this.properties.enableFilterSitesWithSubWebs
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

  protected get disableReactivePropertyChanges():boolean {
    return true;
  }


protected async  onPropertyPaneConfigurationStart() {
  const { getUserTeams } =  useUserSites();
  const _msGraphClient =  await this.context.msGraphClientFactory.getClient(); 
  const _userTeams:ITeam[] = await getUserTeams(this.context.pageContext.user.loginName, _msGraphClient);
 
  for (const _team of _userTeams) {
      this._userTeamsOptions.push({key: _team.id, text: _team.displayName  });
  }
    this.context.propertyPane.refresh();
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
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel,
                  value: this.properties.title
                }),
                
                PropertyPaneLabel('',{
                  text: ''
                }),
                PropertyPaneSlider('itemsPerPage', {
                  min: 1,
                  max: 100,
                  value: this.properties.itemsPerPage,
                  step: 1,
                  label: strings.ItemsPerPageLabel,
                }),

                PropertyPaneLabel('',{
                  text: 'Filter scopes'
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneCheckbox('enableFilterSharepointSites',{
                  checked: this.properties.enableFilterSharepointSites,
                  text: 'Filter SharePoint Sites',         
                }),
                PropertyPaneCheckbox('enableFilterO365groups',{
                  checked: this.properties.enableFilterO365groups,
                  text: 'Filter Office 365 Groups'
                }),
                PropertyPaneCheckbox('enableFilterSitesWithSubWebs',{
                  checked: this.properties.enableFilterSitesWithSubWebs,
                  text: 'Filter sites with sub sites'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
