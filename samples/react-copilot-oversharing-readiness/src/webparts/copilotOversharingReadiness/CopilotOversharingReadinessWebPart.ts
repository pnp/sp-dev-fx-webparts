import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { spfi, SPFx as spSPFx, type SPFI } from '@pnp/sp';
import { graphfi, SPFx as graphSPFx, type GraphFI } from '@pnp/graph';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/graph/sites';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'CopilotOversharingReadinessWebPartStrings';
import CopilotOversharingReadiness from './components/CopilotOversharingReadiness';
import { ICopilotOversharingReadinessProps } from './components/ICopilotOversharingReadinessProps';
import { mergeRiskSettings, type IRiskSettings } from './services/riskSettings';

export type ICopilotOversharingReadinessWebPartProps = {
  description: string;
  dataSource: string;
} & Partial<IRiskSettings>;

export default class CopilotOversharingReadinessWebPart extends BaseClientSideWebPart<ICopilotOversharingReadinessWebPartProps> {

  private _environmentMessage: string = '';
  private _root: Root | undefined;
  private _sp: SPFI | undefined;
  private _graph: GraphFI | undefined;

  public render(): void {
    const element: React.ReactElement<ICopilotOversharingReadinessProps> = React.createElement(
      CopilotOversharingReadiness,
      {
        description: this.properties.description,
        environmentMessage: this._environmentMessage,
        userDisplayName: this.context.pageContext.user.displayName,
        dataSource: this.properties.dataSource || 'mock',
        settings: mergeRiskSettings(this.properties),
        strings: strings,
        sp: this._sp,
        graph: this._graph,
        hostWebUrl: this.context.pageContext.web.absoluteUrl
      }
    );

    if (!this._root) {
      this._root = createRoot(this.domElement);
    }

    this._root.render(element);
  }

  protected onInit(): Promise<void> {
    this._sp = spfi().using(spSPFx(this.context));
    this._graph = graphfi().using(graphSPFx(this.context));
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams':
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    this._root?.unmount();
    this._root = undefined;
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('dataSource', {
                  label: strings.PaneDataSourceLabel,
                  options: [
                    { key: 'mock', text: strings.PaneDataSourceMock },
                    { key: 'live', text: strings.PaneDataSourceLive }
                  ]
                })
              ]
            },
            {
              groupName: strings.PaneGroupRiskModel,
              groupFields: [
                PropertyPaneSlider('weightEveryone', { label: strings.PaneWeightEveryone, min: 0, max: 100, step: 1 }),
                PropertyPaneToggle('scoreEveryone', { label: strings.PaneScoreEveryone, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff }),
                PropertyPaneSlider('weightEveryoneExceptExternal', { label: strings.PaneWeightEveryoneExceptExternal, min: 0, max: 100, step: 1 }),
                PropertyPaneToggle('scoreEveryoneExceptExternal', { label: strings.PaneScoreEveryoneExceptExternal, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff }),
                PropertyPaneSlider('weightAnyoneBase', { label: strings.PaneWeightAnyoneBase, min: 0, max: 100, step: 1 }),
                PropertyPaneSlider('weightAnyonePerLink', { label: strings.PaneWeightAnyonePerLink, min: 0, max: 10, step: 1 }),
                PropertyPaneSlider('anyoneLinkCap', { label: strings.PaneAnyoneLinkCap, min: 0, max: 20, step: 1 }),
                PropertyPaneToggle('scoreAnyoneLinks', { label: strings.PaneScoreAnyoneLinks, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff }),
                PropertyPaneSlider('sharingLinkThreshold', { label: strings.PaneSharingLinkThreshold, min: 0, max: 1000, step: 1 }),
                PropertyPaneSlider('weightSharingThreshold', { label: strings.PaneWeightSharingThreshold, min: 0, max: 100, step: 1 }),
                PropertyPaneToggle('scoreSharingLinks', { label: strings.PaneScoreSharingLinks, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff }),
                PropertyPaneSlider('weightBrokenInheritance', { label: strings.PaneWeightBrokenInheritance, min: 0, max: 100, step: 1 }),
                PropertyPaneToggle('scoreBrokenInheritance', { label: strings.PaneScoreBrokenInheritance, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff }),
                PropertyPaneSlider('inactivityDays', { label: strings.PaneInactivityDays, min: 30, max: 365, step: 1 }),
                PropertyPaneSlider('weightInactivity', { label: strings.PaneWeightInactivity, min: 0, max: 100, step: 1 }),
                PropertyPaneToggle('scoreInactivity', { label: strings.PaneScoreInactivity, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff }),
                PropertyPaneToggle('scoreSensitivityLabelAbsent', { label: strings.PaneScoreSensitivityLabelAbsent, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff }),
                PropertyPaneSlider('weightNoLabel', { label: strings.PaneWeightNoLabel, min: 0, max: 100, step: 1 }),
                PropertyPaneSlider('highCutoff', { label: strings.PaneHighCutoff, min: 1, max: 100, step: 1 }),
                PropertyPaneSlider('mediumCutoff', { label: strings.PaneMediumCutoff, min: 0, max: 99, step: 1 })
              ]
            },
            {
              groupName: strings.PaneGroupOwnershipUnknown,
              groupFields: [
                PropertyPaneSlider('minimumOwners', { label: strings.PaneMinimumOwners, min: 1, max: 2, step: 1 }),
                PropertyPaneToggle('scoreOwnerless', { label: strings.PaneScoreOwnerless, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff }),
                PropertyPaneSlider('weightOwnerless', { label: strings.PaneWeightOwnerless, min: 0, max: 100, step: 1 }),
                PropertyPaneToggle('scoreSingleOwner', { label: strings.PaneScoreSingleOwner, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff }),
                PropertyPaneSlider('weightSingleOwner', { label: strings.PaneWeightSingleOwner, min: 0, max: 100, step: 1 }),
                PropertyPaneDropdown('unknownVerdict', {
                  label: strings.PaneUnknownVerdictLabel,
                  options: [
                    { key: 'unknown', text: strings.PaneUnknownVerdictUnknown },
                    { key: 'lowWithWarning', text: strings.PaneUnknownVerdictLowWithWarning }
                  ]
                }),
                PropertyPaneToggle('showUnknownColumn', { label: strings.PaneShowUnknownColumn, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff })
              ]
            },
            {
              groupName: strings.PaneGroupDisplayExport,
              groupFields: [
                PropertyPaneDropdown('displayMode', {
                  label: strings.PaneDisplayModeLabel,
                  options: [
                    { key: 'microsoftPriority', text: strings.PaneDisplayModeMicrosoftPriority },
                    { key: 'numericScore', text: strings.PaneDisplayModeNumericScore }
                  ]
                }),
                PropertyPaneDropdown('sortBy', {
                  label: strings.PaneSortByLabel,
                  options: [
                    { key: 'priority', text: strings.PaneSortByPriority },
                    { key: 'score', text: strings.PaneSortByScore },
                    { key: 'title', text: strings.PaneSortByTitle }
                  ]
                }),
                PropertyPaneSlider('maxSites', { label: strings.PaneMaximumSites, min: 10, max: 100, step: 1 }),
                PropertyPaneToggle('csvIncludeUnknown', { label: strings.PaneCsvIncludeUnknown, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff }),
                PropertyPaneToggle('csvIncludeReasons', { label: strings.PaneCsvIncludeReasons, onText: strings.PaneToggleOn, offText: strings.PaneToggleOff }),
                PropertyPaneTextField('csvFileName', {
                  label: strings.PaneCsvFileName
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
