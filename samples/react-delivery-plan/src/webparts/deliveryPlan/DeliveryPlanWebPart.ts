import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'DeliveryPlanWebPartStrings';
import { DeliveryPlan } from './components/DeliveryPlan';
import { IDeliveryPlanProps, IDeliveryPlanTask } from './components/IDeliveryPlanProps';
import { getSP } from './pnpjsConfig';

export type ThemeMode = 'auto' | 'light' | 'dark';

export interface IDeliveryPlanWebPartProps {
  listName: string;
  title: string;
  subtitle: string;
  themeMode: ThemeMode;
}

export default class DeliveryPlanWebPart extends BaseClientSideWebPart<IDeliveryPlanWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _tasks: IDeliveryPlanTask[] = [];
  private _errorMessage: string = '';

  public async onInit(): Promise<void> {
    await super.onInit();
    getSP(this.context);
    await this._loadTasks();
  }

  private async _loadTasks(): Promise<void> {
    const listName = this.properties.listName || 'DeliveryPlan';
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = await getSP()
        .web.lists.getByTitle(listName)
        .items
        .select('ID', 'Title', 'Phase', 'StartDate', 'EndDate', 'Resource/Title', 'Resource/EMail')
        .expand('Resource')
        .orderBy('StartDate')();

      this._tasks = raw.map(item => {
        const res = item.Resource;
        const startDate = new Date(item.StartDate);
        const endDate = new Date(item.EndDate);
        return {
          id: item.ID as number,
          title: (item.Title as string) || '',
          resource: res?.Title || 'Unknown',
          resourceEmail: res?.EMail || '',
          phase: (item.Phase as string) || '',
          startDate,
          endDate,
          durationDays: Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1
        } as IDeliveryPlanTask;
      });
      this._errorMessage = '';
    } catch (err) {
      this._tasks = [];
      this._errorMessage = `Unable to load list "${listName}". Check the list name and your permissions.`;
    }
  }

  private _resolvedDarkTheme(): boolean {
    const mode = this.properties.themeMode || 'auto';
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return this._isDarkTheme;
  }

  public render(): void {
    const element: React.ReactElement<IDeliveryPlanProps> = React.createElement(DeliveryPlan, {
      tasks: this._tasks,
      title: this.properties.title || 'Delivery Plan',
      subtitle: this.properties.subtitle || '',
      listName: this.properties.listName || 'DeliveryPlan',
      errorMessage: this._errorMessage || undefined,
      isDarkTheme: this._resolvedDarkTheme(),
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      userDisplayName: this.context.pageContext.user.displayName
    });
    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;
    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
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
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', { label: strings.ListNameFieldLabel }),
                PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
                PropertyPaneTextField('subtitle', { label: strings.SubtitleFieldLabel })
              ]
            },
            {
              groupName: strings.ThemeModeGroupName,
              groupFields: [
                PropertyPaneChoiceGroup('themeMode', {
                  label: strings.ThemeModeFieldLabel,
                  options: [
                    {
                      key: 'auto',
                      text: strings.ThemeModeAuto,
                      iconProps: { officeFabricIconFontName: 'Contrast' }
                    },
                    {
                      key: 'light',
                      text: strings.ThemeModeLight,
                      iconProps: { officeFabricIconFontName: 'Sunny' }
                    },
                    {
                      key: 'dark',
                      text: strings.ThemeModeDark,
                      iconProps: { officeFabricIconFontName: 'ClearNight' }
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
