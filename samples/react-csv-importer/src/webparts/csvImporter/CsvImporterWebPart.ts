import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { ConsoleListener, Logger, LogLevel } from '@pnp/logging';

import * as strings from 'CsvImporterWebPartStrings';
import { CsvImporter, ICsvImporterProps } from '../../components';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { getSp } from '../../utils';

export interface ICsvImporterWebPartProps {
  title: string;
  listId: string;
  showListTitle: boolean;
}

export default class CsvImporterWebPart extends BaseClientSideWebPart<ICsvImporterWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<ICsvImporterProps> = React.createElement(
      CsvImporter,
      {
        title: this.properties.title,
        listId: this.properties.listId,
        showListTitle: this.properties.showListTitle,
        displayMode: this.displayMode,
        updateProperty: (value: string) => { this.properties.title = value; },
        onConfigure: () => this.context.propertyPane.open(),
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();
    Logger.subscribe(ConsoleListener());
    Logger.activeLogLevel = LogLevel.Verbose;
    getSp(this.context);
    await super.onInit();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
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
          groups: [
            {
              isGroupNameHidden: true,
              groupFields: [
                PropertyFieldListPicker('listId', {
                  label: strings.PropertyFieldListPickerLabel,
                  selectedList: this.properties.listId,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  baseTemplate: 100,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  context: this.context as any,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyPaneToggle('showListTitle', {
                  label: null,
                  onText: strings.PropertyPaneToggleShowListText,
                  offText: strings.PropertyPaneToggleHideListText
                }),
                PropertyPaneTextField('title', {
                  label: strings.PropertyPaneTextFieldTitleLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
