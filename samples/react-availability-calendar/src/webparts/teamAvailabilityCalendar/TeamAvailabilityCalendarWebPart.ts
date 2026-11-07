import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneChoiceGroup,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'TeamAvailabilityCalendarWebPartStrings';
import TeamAvailabilityCalendar from './components/TeamAvailabilityCalendar';
import { ITeamAvailabilityCalendarProps, CalendarViewMode } from './components/ITeamAvailabilityCalendarProps';

export interface ITeamAvailabilityCalendarWebPartProps {
  listName: string;
  employeeFieldName: string;
  typeFieldName: string;
  startDateFieldName: string;
  endDateFieldName: string;
  notesFieldName: string;
  viewMode: CalendarViewMode;
  startWeekOnMonday: boolean;
  showWeekends: boolean;
  maxLanesPerDay: number;
  showOutThisWeek: boolean;
  capacityWarningThreshold: number;
  useMockData: boolean;
}

const DEFAULTS: ITeamAvailabilityCalendarWebPartProps = {
  listName: 'Team Absences',
  employeeFieldName: 'Employee',
  typeFieldName: 'AbsenceType',
  startDateFieldName: 'StartDate',
  endDateFieldName: 'EndDate',
  notesFieldName: 'Notes',
  viewMode: 'month',
  startWeekOnMonday: true,
  showWeekends: false,
  maxLanesPerDay: 3,
  showOutThisWeek: true,
  capacityWarningThreshold: 3,
  useMockData: false
};

export default class TeamAvailabilityCalendarWebPart extends BaseClientSideWebPart<ITeamAvailabilityCalendarWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const p: ITeamAvailabilityCalendarWebPartProps = this.properties;

    const element: React.ReactElement<ITeamAvailabilityCalendarProps> = React.createElement(
      TeamAvailabilityCalendar,
      {
        context: this.context,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        listName: p.listName || DEFAULTS.listName,
        fieldMap: {
          employee: p.employeeFieldName || DEFAULTS.employeeFieldName,
          type: p.typeFieldName || DEFAULTS.typeFieldName,
          start: p.startDateFieldName || DEFAULTS.startDateFieldName,
          end: p.endDateFieldName || DEFAULTS.endDateFieldName,
          notes: p.notesFieldName || DEFAULTS.notesFieldName
        },
        viewMode: p.viewMode === 'week' ? 'week' : 'month',
        startWeekOnMonday: !!p.startWeekOnMonday,
        showWeekends: !!p.showWeekends,
        maxLanesPerDay: p.maxLanesPerDay || DEFAULTS.maxLanesPerDay,
        showOutThisWeek: !!p.showOutThisWeek,
        capacityWarningThreshold:
          typeof p.capacityWarningThreshold === 'number'
            ? p.capacityWarningThreshold
            : DEFAULTS.capacityWarningThreshold,
        useMockData: !!p.useMockData,
        isDarkTheme: this._isDarkTheme
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    // Fill any property left unset by the manifest so toggles and sliders render.
    const p: Record<string, unknown> = this.properties as unknown as Record<string, unknown>;
    Object.keys(DEFAULTS).forEach((key) => {
      if (p[key] === undefined) {
        p[key] = (DEFAULTS as unknown as Record<string, unknown>)[key];
      }
    });
    return Promise.resolve();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;
    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

    if (this.renderedOnce) {
      this.render();
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
              groupName: strings.ListGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneTextField('employeeFieldName', {
                  label: strings.EmployeeFieldLabel
                }),
                PropertyPaneTextField('typeFieldName', {
                  label: strings.TypeFieldLabel
                }),
                PropertyPaneTextField('startDateFieldName', {
                  label: strings.StartDateFieldLabel
                }),
                PropertyPaneTextField('endDateFieldName', {
                  label: strings.EndDateFieldLabel
                }),
                PropertyPaneTextField('notesFieldName', {
                  label: strings.NotesFieldLabel
                }),
                PropertyPaneToggle('useMockData', {
                  label: strings.UseMockDataFieldLabel,
                  onText: strings.OnText,
                  offText: strings.OffText
                }),
                PropertyPaneLabel('mockDataHint', {
                  text: strings.UseMockDataFieldDescription
                })
              ]
            },
            {
              groupName: strings.DisplayGroupName,
              groupFields: [
                PropertyPaneChoiceGroup('viewMode', {
                  label: strings.ViewModeFieldLabel,
                  options: [
                    { key: 'month', text: strings.ViewModeMonthText },
                    { key: 'week', text: strings.ViewModeWeekText }
                  ]
                }),
                PropertyPaneToggle('startWeekOnMonday', {
                  label: strings.StartWeekOnMondayFieldLabel,
                  onText: strings.MondayFirstText,
                  offText: strings.SundayFirstText
                }),
                PropertyPaneToggle('showWeekends', {
                  label: strings.ShowWeekendsFieldLabel,
                  onText: strings.OnText,
                  offText: strings.OffText
                }),
                PropertyPaneSlider('maxLanesPerDay', {
                  label: strings.MaxLanesFieldLabel,
                  min: 1,
                  max: 6,
                  step: 1
                }),
                PropertyPaneToggle('showOutThisWeek', {
                  label: strings.ShowOutThisWeekFieldLabel,
                  onText: strings.OnText,
                  offText: strings.OffText
                }),
                PropertyPaneSlider('capacityWarningThreshold', {
                  label: strings.CapacityThresholdFieldLabel,
                  min: 0,
                  max: 10,
                  step: 1
                }),
                PropertyPaneLabel('capacityHint', {
                  text: strings.CapacityThresholdFieldDescription
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
