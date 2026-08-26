import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ProjectEditorWebPartStrings';
import ProjectEditor from './components/ProjectEditor';
import { IProjectEditorProps } from './components/IProjectEditorProps';

import { spfi, SPFx, SPFI } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';

export interface IProjectEditorWebPartProps {
  selectedListId: string;
  selectedListTitle: string;
  layoutMode: 'card' | 'accordion';
}

export default class ProjectEditorWebPart extends BaseClientSideWebPart<IProjectEditorWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _sp: SPFI;
  private _lists: Array<{ key: string; text: string }> = [];

  protected async onInit(): Promise<void> {
    await super.onInit();

    // Initialize PnPjs with SPFx context
    this._sp = spfi().using(SPFx(this.context));

    // Load available lists
    await this._loadLists();
  }

  private async _loadLists(): Promise<void> {
    try {
      const lists = await this._sp.web.lists
        .filter("Hidden eq false and BaseTemplate eq 100")
        .select("Id", "Title")();

      this._lists = lists.map(list => ({
        key: list.Id,
        text: list.Title
      }));
    } catch (error) {
      console.error("Error loading SharePoint lists:", error);
    }
  }

  public render(): void {
    const element: React.ReactElement<IProjectEditorProps> = React.createElement(ProjectEditor, {
      context: this.context,
      displayMode: this.displayMode,
      description: this.properties.selectedListTitle || '',
      selectedListId: this.properties.selectedListId,
      selectedListTitle: this.properties.selectedListTitle || '',
      layoutMode: this.properties.layoutMode || 'card',
      isDarkTheme: this._isDarkTheme,
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      spContext: this._sp,
      updateProperty: (value) => {
        this.properties.selectedListId = value.selectedListId;
        this.properties.selectedListTitle = value.selectedListTitle;
        this.properties.layoutMode = value.layoutMode as 'card' | 'accordion';
        this.render(); // re-render after update
      }
    });

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    if (this._lists.length === 0) {
      await this._loadLists();
      this.context.propertyPane.refresh();
    }
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
                PropertyPaneDropdown('selectedListId', {
                  label: 'Select SharePoint List',
                  options: this._lists,
                  selectedKey: this.properties.selectedListId
                }),
                PropertyPaneDropdown('layoutMode', {
                  label: 'Layout Mode',
                  options: [
                    { key: 'card', text: 'Card Layout' },
                    { key: 'accordion', text: 'Accordion Layout' }
                  ],
                  selectedKey: this.properties.layoutMode || 'card'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}