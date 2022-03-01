import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'MapWebPartStrings';
import Map from './components/Map';
import { IMapProps, IMarker, IMarkerCategory } from './components/IMapProps';


export interface IMapWebPartProps {
  markerItems: IMarker[];
  markerCategories: IMarkerCategory[];
}

export default class MapWebPart extends BaseClientSideWebPart<IMapWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  public render(): void {

    const dummyData: IMarker = {
      id: "5828b794-0c76-4962-9faa-95e89aea6c37",
      latitude: 49.318121,
      longitude: 10.624094,
      type: "Panel",
      categoryId: "00000000-0000-0000-0000-000000000000",
      markerClickProps: {
        headerText: "",
        content: ""
      },
      iconProperties: {
        markerColor: "red",
        iconName: "PageLink",
        iconColor: "#000"
      },
      popuptext: "Hello"
    }

    const dummyData2: IMarker = {
      id: "5828b794-0c76-4962-9faa-95e89aea6c37",
      latitude: 49.508121,
      longitude: 10.824094,
      type: "None",
      categoryId: "5828b794-0c76-4962-9faa-95e89aea6123"
    }

    const dummyCategory: IMarkerCategory = {
      id: "5828b794-0c76-4962-9faa-95e89aea6123",
      name: "teeeeest",
      iconProperties: {
        markerColor: "#000",
        iconName: "Installation",
        iconColor: "#fff"
      },
    }

    const element: React.ReactElement<IMapProps> = React.createElement(
      Map,
      {
        markerItems: this.properties.markerItems||[dummyData, dummyData2],
        markerCategories: this.properties.markerCategories||[dummyCategory],
        isEditMode: this.displayMode == DisplayMode.Edit
      }
    );

    ReactDom.render(element, this.domElement);
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
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
