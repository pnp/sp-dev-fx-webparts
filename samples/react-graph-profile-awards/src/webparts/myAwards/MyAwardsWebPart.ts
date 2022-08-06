import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  IPropertyPaneField,
  PropertyPaneLabel,
  PropertyPaneDynamicField,
} from "@microsoft/sp-property-pane";
import {
  BaseClientSideWebPart,
  IWebPartPropertiesMetadata,
} from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import {
  PropertyFieldPeoplePicker,
  PrincipalType,
  IPropertyFieldGroupOrPerson,
} from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";

import { DynamicProperty } from "@microsoft/sp-component-base";

import * as strings from "MyAwardsWebPartStrings";
import AwardsContainer from "./components/AwardsContainer";
import { IAwardsContainerProps, LayoutType } from "./components/IAwardsContainerProps";
import { AwardsServiceKey, IAwardsService } from "../../services/AwardsService";

export interface IMyAwardsWebPartProps {
  selectedUserOrigin: string;
  people: IPropertyFieldGroupOrPerson[];
  selectedUserId: string;
  selectedUserInPageEnvironment: DynamicProperty<string>;
  layoutType: LayoutType;
}

export default class MyAwardsWebPart extends BaseClientSideWebPart<IMyAwardsWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _awardsService: IAwardsService;

  public render(): void {
    this._getSelectedUser();

    const element: React.ReactElement<IAwardsContainerProps> = React.createElement(
      AwardsContainer,
      {
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        awardsService: this._awardsService,
        userId: this.properties.selectedUserId,
        layoutType: this.properties.layoutType,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super
      .onInit()
      .then((_) => {
        let webpartScope = this.context.serviceScope.startNewChild();
        webpartScope.finish();
        return webpartScope;
      })
      .then((serviceScope) => {
        this._awardsService = serviceScope.consume(AwardsServiceKey);
      });
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;
    this.domElement.style.setProperty("--bodyText", semanticColors.bodyText);
    this.domElement.style.setProperty("--link", semanticColors.link);
    this.domElement.style.setProperty(
      "--linkHovered",
      semanticColors.linkHovered
    );
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      selectedUserInPageEnvironment: {
        dynamicPropertyType: "string",
      },
    };
  }

  // protected get disableReactivePropertyChanges(): boolean {
  //   return true;
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let field: IPropertyPaneField<any>;
    switch (this.properties.selectedUserOrigin) {
      case "PeoplePicker":
        field = PropertyFieldPeoplePicker("people", {
          label: "Select a user",
          initialData: this.properties.people,
          allowDuplicate: false,
          principalType: [PrincipalType.Users],
          onPropertyChange: this._onPeoplePickerFieldChanged,
          context: this.context as any,
          properties: this.properties,
          onGetErrorMessage: null,
          deferredValidationTime: 0,
          key: "peopleFieldId",
          multiSelect: false,
        });
        break;
      case "DynamicData":
        field = PropertyPaneDynamicField("selectedUserInPageEnvironment", {
          label: "Select user value from page environment",
        });
        break;
      default:
        field = PropertyPaneLabel("me", {
          text: `Your user ${this.context.pageContext.user.displayName} will be used`,
        });
        break;
    }

    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneChoiceGroup("selectedUserOrigin", {
                  label: "Select user from:",
                  options: [
                    {
                      iconProps: {
                        officeFabricIconFontName: "People",
                      },
                      imageSize: {
                        width: 200,
                        height: 100,
                      },
                      key: "PeoplePicker",
                      text: "People picker",
                    },
                    {
                      iconProps: {
                        officeFabricIconFontName: "Link",
                      },
                      imageSize: {
                        width: 200,
                        height: 100,
                      },
                      key: "DynamicData",
                      text: "Dynamic Data",
                    },
                    {
                      iconProps: {
                        officeFabricIconFontName: "NUIFace",
                      },
                      imageSize: {
                        width: 200,
                        height: 100,
                      },
                      key: "CurrentUser",
                      text: "Me",
                    },
                  ],
                }),
                field,
              ],
            },
            {
              groupName: "Layout",
              groupFields: [
                PropertyPaneChoiceGroup("layoutType", {
                  label: "Select a Layout:",
                  options: [
                    {
                      iconProps: {
                        officeFabricIconFontName: "BusinessCard",
                      },
                      imageSize: {
                        width: 200,
                        height: 100,
                      },
                      key: "Card",
                      text: "Card",
                    },
                    {
                      iconProps: {
                        officeFabricIconFontName: "BulletedList",
                      },
                      imageSize: {
                        width: 200,
                        height: 100,
                      },
                      key: "List",
                      text: "List",
                    },
                  ],
                }),
              ],
            },
          ],
        },
      ],
    };
  }

  private _onPeoplePickerFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    this.properties.selectedUserId = newValue[0].login;
  }

  private _getSelectedUser(): void {
    let userId: string = this.context.pageContext.user.loginName;
    switch (this.properties.selectedUserOrigin) {
      case "PeoplePicker":
        if (!this.properties.people) break;
        userId = this.properties.people[0].login;
        break;
      case "DynamicData":
        const userIdInPageContext: string = this.properties.selectedUserInPageEnvironment.tryGetValue();
        if (userIdInPageContext && typeof(userIdInPageContext) === 'string') userId = userIdInPageContext; // For some reason, when you select "Page environment/QueryString" it returns an object here (should be a string) (issues related: https://github.com/SharePoint/sp-dev-docs/issues/5947 and https://github.com/microsoft-search/pnp-modern-search/issues/325)
        break;
    }
    
    this.properties.selectedUserId = userId;
  }
}
