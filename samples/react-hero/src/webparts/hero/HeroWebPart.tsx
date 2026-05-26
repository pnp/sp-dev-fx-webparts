import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  type IPropertyPaneField,
  PropertyPaneChoiceGroup,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import {
  type Theme,
  teamsDarkTheme,
  teamsLightTheme,
  teamsHighContrastTheme,
} from "@fluentui/react-components";
import { createV9Theme } from "@fluentui/react-migration-v8-v9";
import type { Theme as V8Theme } from "@fluentui/react";
import { SPFxContextAdapter } from "@spteck/react-controls-v2-spfx-adapter";
import {
  TypographyControl,
  type IApplicationContext,
  type IHeroItem,
} from "@spteck/react-controls-v2";

import strings from 'HeroWebPartStrings';
import { LAYOUT_OPTIONS } from "../../constants/constants";
import { IHeroWebPartProps } from "../../models/IHeroWebPartProps";
import { HeroWebPartRoot } from "../../components/HeroWebPartRoot";
import { type IHeroWebPartRootProps } from "../../models/IHeroWebPartRootProps";
import { PropertyPaneHeroItemsManager } from "../../PropertyFields/HeroItemsManager/HeroItemsManagerField";
import { PropertyPaneRotation } from "../../PropertyFields/Rotation/RotationField";
import { PropertyPaneBorderRadius } from "../../PropertyFields/BorderRadius/BorderRadiusField";
import { PropertyPaneHeight } from "../../PropertyFields/Height/HeightField";
import { PropertyPaneMosaicOverflow } from "../../PropertyFields/MosaicOverflow/MosaicOverflowField";
import { css } from "@emotion/css";
import { SPFxHostType } from "../../models/SPFxHostType";
import { resolveSharePointUrl } from "../../utils/useUtils";

export default class HeroWebPart extends BaseClientSideWebPart<IHeroWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _theme: IReadonlyTheme | undefined;
  private _themeString: string = "";
  private _isTeamsContext: boolean = false;
  private _hostType: SPFxHostType = "sharepoint";
  private _universalContext: IApplicationContext | undefined;

  private _resolveSharePointUrl = (url: string): Promise<string> =>
    resolveSharePointUrl(url, (apiUrl) =>
      this.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1, {
        headers: { accept: "application/json;odata=nometadata" },
      }),
    );

  private _applyTheme = (theme: string): void => {
    this.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    this._themeString = theme;
    this.render();
  };

  public render(): void {
    if (!this._universalContext) return;

    ReactDom.render(
      React.createElement<IHeroWebPartRootProps>(HeroWebPartRoot, {
        context: this._universalContext,
        theme: this._resolveFluentV9Theme(),
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: this._isTeamsContext,
        layout: this.properties.layout ?? "fullscreen",
        height: this.properties.height ?? 480,
        borderRadius: this.properties.borderRadius ?? "4px",
        mosaicOverflowMode: this.properties.mosaicOverflowMode ?? "marquee",
        rotationEnabled: this.properties.rotationEnabled ?? false,
        rotationMode: this.properties.rotationMode ?? "interval",
        rotationIntervalMs: this.properties.rotationIntervalMs ?? 5000,
        items: (this.properties.items ?? []).filter((i) => !!i.src?.trim()),
        onConfigure: () => this.context.propertyPane.open(),
      }),
      this.domElement,
    );
  }

  protected async onInit(): Promise<void> {
    // Initialize default property values so the property pane shows pre-selected items
    this.properties.layout = this.properties.layout ?? "fullscreen";
    this.properties.height = this.properties.height ?? 480;
    this.properties.borderRadius = this.properties.borderRadius ?? "4px";
    this.properties.mosaicOverflowMode =
      this.properties.mosaicOverflowMode ?? "marquee";
    this.properties.rotationEnabled = this.properties.rotationEnabled ?? false;
    this.properties.rotationMode = this.properties.rotationMode ?? "interval";
    this.properties.rotationIntervalMs =
      this.properties.rotationIntervalMs ?? 5000;
    this.properties.items = this.properties.items ?? [];

    this._universalContext = SPFxContextAdapter.adapt(
      this.context as never,
      "HeroWebPart",
    );

    if (this.context.sdks.microsoftTeams) {
      this._isTeamsContext = true;
      const teamsCtx =
        await this.context.sdks.microsoftTeams.teamsJs.app.getContext();
      const hostName = teamsCtx.app?.host?.name?.toLowerCase() ?? "";
      this._hostType = hostName === "outlook" ? "outlook" : "teams";
      this._applyTheme(teamsCtx.app.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.app.registerOnThemeChangeHandler(
        this._applyTheme,
      );
    }
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
    this._theme = currentTheme;
    this.render();
  }

  private _resolveFluentV9Theme(): Theme {
    if (this._isTeamsContext) {
      switch (this._themeString) {
        case "dark":
          return teamsDarkTheme;
        case "contrast":
          return teamsHighContrastTheme;
        default:
          return teamsLightTheme;
      }
    }
    if (this._theme) {
      return createV9Theme(this._theme as unknown as V8Theme);
    }
    return teamsLightTheme;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const theme = this._resolveFluentV9Theme();
    const hostType = this._hostType;
    const layout = this.properties.layout ?? "fullscreen";
    const isMosaic = layout === "mosaic";
    const supportsRotation =
      layout === "fullscreen" || layout === "split" || layout === "featured";

    const layoutFields: IPropertyPaneField<unknown>[] = [
      PropertyPaneChoiceGroup("layout", {
        label: strings.LayoutLabel,
        options: LAYOUT_OPTIONS,
      }),
      PropertyPaneHeight({
        label: (
          <TypographyControl fontWeight="semibold">
            {strings.HeightLabel}
          </TypographyControl>
        ),
        value: this.properties.height,
        min: 200,
        max: 900,
        step: 10,
        theme,
        hostType,
        onChange: (newValue: number) => {
          this.properties.height = newValue;
          this.render();
        },
        className: css({ paddingTop: "30px" }), // Extra spacing and background color to visually separate this from the layout choice above
      }),
      PropertyPaneBorderRadius({
        label: (
          <TypographyControl fontWeight="semibold">
            {strings.BorderRadiusLabel}
          </TypographyControl>
        ),
        value: this.properties.borderRadius ?? "4px",
        theme,
        hostType,
        onChange: (newValue: string) => {
          this.properties.borderRadius = newValue;
          this.render();
        },
      }),
    ];

    if (isMosaic) {
      layoutFields.push(
        PropertyPaneMosaicOverflow({
          label: (
            <TypographyControl fontWeight="semibold">
              {strings.MosaicOverflowLabel}
            </TypographyControl>
          ),
          value: this.properties.mosaicOverflowMode ?? "marquee",
          theme,
          hostType,
          onChange: (newValue) => {
            this.properties.mosaicOverflowMode = newValue;
            this.render();
          },
        }),
      );
    }

    if (supportsRotation) {
      layoutFields.push(
        PropertyPaneRotation({
          enabledLabel: strings.RotationEnabledLabel,
          modeLabel: strings.RotationModeLabel,
          intervalLabel: strings.RotationIntervalLabel,
          enabled: this.properties.rotationEnabled ?? false,
          mode: this.properties.rotationMode ?? "interval",
          intervalMs: this.properties.rotationIntervalMs ?? 5000,
          theme,
          hostType,
          onEnabledChange: (newValue: boolean) => {
            this.properties.rotationEnabled = newValue;
            this.context.propertyPane.refresh();
            this.render();
          },
          onModeChange: (newValue: "interval" | "refresh") => {
            this.properties.rotationMode = newValue;
            this.render();
          },
          onIntervalChange: (newValue: number) => {
            this.properties.rotationIntervalMs = newValue;
            this.render();
          },
        }),
      );
    }

    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.LayoutGroupName,
              isCollapsed: false,
              groupFields: layoutFields,
            },
            {
              groupName: strings.TilesGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneHeroItemsManager("items", {
                  items: this.properties.items ?? [],
                  theme,
                  hostType,
                  resolveUrl: this._resolveSharePointUrl,
                  onStructuralChange: (
                    _propertyPath: string,
                    newItems: IHeroItem[],
                  ) => {
                    this.properties.items = newItems;
                    this.context.propertyPane.refresh();
                    this.render();
                  },
                  onDetailChange: (
                    _propertyPath: string,
                    newItems: IHeroItem[],
                  ) => {
                    this.properties.items = newItems;
                    this.render();
                  },
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
