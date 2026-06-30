import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

import * as strings from 'ModernLinkPresenterWebPartStrings';
import ModernLinkPresenter from './components/ModernLinkPresenter';
import { IModernLinkPresenterProps } from './components/IModernLinkPresenterProps';
import { IconPicker } from './components/IconPicker';
import { PropertyPaneLogo } from '../../Core/PropertyPaneLogo';

export interface IModernLinkPresenterWebPartProps {
  description: string;
  links: any[]; // Will define a better type in the props file
  outputFormat: 'links' | 'linksWithIcon' | 'linkDescriptionIcon' | 'tile';
  tileWidth?: number;
  tileHeight?: number;
  tileHoverEffect?: 'none' | 'lift' | 'shadow' | 'scale';
  direction?: 'vertical' | 'horizontal';
  tileButtonText?: string;
  showTileButton?: boolean;
  showSearchField?: boolean;
}

export default class ModernLinkPresenterWebPart extends BaseClientSideWebPart<IModernLinkPresenterWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IModernLinkPresenterProps> = React.createElement(
      ModernLinkPresenter,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        links: this.properties.links || [],
        outputFormat: this.properties.outputFormat || 'links',
        displayMode: this.displayMode,
        onTitleUpdate: (value: string) => { this.properties.description = value; },
        tileWidth: this.properties.tileWidth || 220,
        tileHeight: this.properties.tileHeight || 320,
        tileHoverEffect: this.properties.tileHoverEffect || 'none',
        direction: this.properties.direction || 'vertical',
        tileButtonText: this.properties.tileButtonText || strings.BTNTileLink,
        showTileButton: this.properties.showTileButton !== false,
        showSearchField: this.properties.showSearchField !== false,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
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

    this._isDarkTheme = !!currentTheme.isInverted;
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
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneChoiceGroup('outputFormat', {
                  label: strings.LinksOutputFormatLabel,
                  options: [
                    { key: 'links', text: strings.LinksOutputFormatLinks },
                    { key: 'linksWithIcon', text: strings.LinksOutputFormatLinksWithIcon },
                    { key: 'linkDescriptionIcon', text: strings.LinksOutputFormatLinkDescriptionIcon },
                    { key: 'tile', text: strings.LinksOutputFormatTile }
                  ]
                }),
                PropertyFieldCollectionData('links', {
                  key: 'links',
                  label: 'Links',
                  panelHeader: 'Manage Links',
                  manageBtnLabel: 'Manage Links',
                  value: this.properties.links,
                  fields: [
                    {
                      id: 'title',
                      title: strings.FieldTitle,
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: 'url',
                      title: strings.FieldUrl,
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: 'icon',
                      title: strings.FieldIcon,
                      type: CustomCollectionFieldType.custom,
                      required: false,
                      onCustomRender: (field, value, onUpdate, item, rowUniqueId, onCustomFieldValidation) => {
                        return React.createElement(IconPicker, {
                          value: value,
                          onChange: (iconName: string) => onUpdate(field.id, iconName)
                        });
                      }
                    },
                    {
                      id: 'summary',
                      title: strings.FieldSummary,
                      type: CustomCollectionFieldType.string,
                      required: false
                    },
                    {
                      id: 'description',
                      title: strings.FieldDescription,
                      type: CustomCollectionFieldType.string,
                      required: false
                    },
                    {
                      id: 'target',
                      title: strings.FieldTarget,
                      type: CustomCollectionFieldType.dropdown,
                      required: true,
                      options: [
                        { key: '_blank', text: '_blank (New Tab)' },
                        { key: '_self', text: '_self (Same Tab)' },
                        { key: 'dialog', text: strings.FieldTargetDialog }
                      ]
                    },
                    {
                      id: 'color',
                      title: strings.FieldColor,
                      type: CustomCollectionFieldType.color,
                      required: false
                    },
                    {
                      id: 'displayFormat',
                      title: strings.FieldDisplayFormat,
                      type: CustomCollectionFieldType.dropdown,
                      required: true,
                      options: [
                        { key: 'button', text: 'Button' },
                        { key: 'link', text: 'Plain Link' }
                      ]
                    }
                  ],
                  disabled: false
                }),
                // Direction property for Only Links and Links with Icon
                ...(['links', 'linksWithIcon'].includes(this.properties.outputFormat) ? [
                  PropertyPaneChoiceGroup('direction', {
                    label: strings.DirectionLabel,
                    options: [
                      { key: 'vertical', text: strings.DirectionVertical },
                      { key: 'horizontal', text: strings.DirectionHorizontal }
                    ]
                  })
                ] : []),
                // Show search field property
                PropertyPaneToggle('showSearchField', {
                  label: strings.ShowSearchFieldLabel,
                  onText: strings.ShowSearchFieldOn,
                  offText: strings.ShowSearchFieldOff,
                  checked: this.properties.showSearchField !== false
                }),
                new PropertyPaneLogo()
              ]
            },
            // Tile layout group
            ...(this.properties.outputFormat === 'tile' ? [{
              groupName: strings.TileLayoutGroupName,
              isCollapsed: false,
              groupFields: [
                PropertyPaneTextField('tileWidth', {
                  label: strings.TileWidthLabel,
                  description: strings.TileWidthDesc,
                }),
                PropertyPaneTextField('tileHeight', {
                  label: strings.TileHeightLabel,
                  description: strings.TileHeightDesc,
                }),
                PropertyPaneChoiceGroup('tileHoverEffect', {
                  label: strings.TileHoverEffectLabel,
                  options: [
                    { key: 'none', text: strings.TileHoverEffectNone },
                    { key: 'lift', text: strings.TileHoverEffectLift },
                    { key: 'shadow', text: strings.TileHoverEffectShadow },
                    { key: 'scale', text: strings.TileHoverEffectScale }
                  ]
                }),
                PropertyPaneTextField('tileButtonText', {
                  label: strings.TileButtonTextLabel,
                  description: strings.TileButtonTextDesc,
                }),
                PropertyPaneToggle('showTileButton', {
                  label: strings.ShowTileButtonLabel,
                  onText: strings.ShowTileButtonOn,
                  offText: strings.ShowTileButtonOff,
                  checked: this.properties.showTileButton !== false
                })
              ]
            }] : [])
          ]
        }
      ]
    };
  }
}
