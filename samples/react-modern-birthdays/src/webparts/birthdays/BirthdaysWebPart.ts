/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as strings from 'BirthdaysWebPartStrings';
import { loadTheme } from 'office-ui-fabric-react';

import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { isEqual } from '@microsoft/sp-lodash-subset';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneGroup,
  PropertyPaneLabel,
  PropertyPaneSlider,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IFilePickerResult,
  PropertyFieldFilePicker,
} from '@pnp/spfx-property-controls/lib/PropertyFieldFilePicker';
import {
  PropertyFieldSwatchColorPicker,
} from '@pnp/spfx-property-controls/lib/PropertyFieldSwatchColorPicker';

import {
  Birthdays,
  IBirthdaysProps,
} from '../../components';
import { FileInfo } from '../../models/FileInfo';
import { FilesService } from '../../services/FilesService';
import { getMessageColors } from '../../utils/getMessageColors';
import { registerSVGIcons } from '../../utils/registrySVGIcons';
import { UrlUtilities } from '../../utils/UrlUtilities';

export interface IBirthdaysWebPartProps {
  title: string;
  numberDays: number;
  upcomingBirthdaysBackgroundImage?: string;
  filePickerResultUpCommingImage: IFilePickerResult;
  todayBirthdaysBackgroundImage?: string;
  filePickerResultTodayImage: IFilePickerResult;

  upcomingBirthdaysMessage?: string;
  upcomingBirthdaysMessageColor?: string;
  todayBirthdaysMessage?: string;
  todayBirthdaysMessageColor?: string;
  noBirthdaysMessage?: string;
  pageSize?: number;
  gridHeight?: number;
}

const teamsDefaultTheme = require("../../teamsThemes/TeamsDefaultTheme.json");
const teamsDarkTheme = require("../../teamsThemes/TeamsDarkTheme.json");
const teamsContrastTheme = require("../../teamsThemes/TeamsContrastTheme.json");
export default class BirthdaysWebPart extends BaseClientSideWebPart<IBirthdaysWebPartProps> {
  private _isDarkTheme: boolean = false;
  private containerWidth: number = 0;
  private _currentTheme: IReadonlyTheme | undefined;
  private filesService: FilesService;
  private messageColor: any = undefined;
  // Apply Teams Context
  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);

    if (theme === "dark") {
      loadTheme({
        palette: teamsDarkTheme,
      });
    }

    if (theme === "default") {
      loadTheme({
        palette: teamsDefaultTheme,
      });
    }

    if (theme === "contrast") {
      loadTheme({
        palette: teamsContrastTheme,
      });
    }
  };

  public render(): void {
    const element: React.ReactElement<IBirthdaysProps> = React.createElement(Birthdays, {
      title: this.properties.title,
      numberDays: this.properties.numberDays,
      upcomingBirthdaysBackgroundImage: this.properties.upcomingBirthdaysBackgroundImage,
      todayBirthdaysBackgroundImage: this.properties.todayBirthdaysBackgroundImage,
      upcomingBirthdaysMessage: this.properties.upcomingBirthdaysMessage,
      todayBirthdaysMessage: this.properties.todayBirthdaysMessage,
      pageSize: this.properties.pageSize,
      isDarkTheme: this._isDarkTheme,
      theme: this._currentTheme,
      hasTeamsContext: this.context.sdks.microsoftTeams ? true : false,
      containerWidth: this.containerWidth,
      displayMode: this.displayMode,
      updateProperty: (value: string) => {
        this.properties.title = value;
      },
      context: this.context,
      onConfigure: () => this.context.propertyPane.open(),
      todayBirthdaysMessageColor: this.properties.todayBirthdaysMessageColor,
      upcomingBirthdaysMessageColor: this.properties.upcomingBirthdaysMessageColor,
      noBirthdaysMessage: this.properties.noBirthdaysMessage,
      gridHeight: this.properties.gridHeight,
    });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    registerSVGIcons(this._currentTheme);
    SPComponentLoader.loadCss("https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap");
    this.filesService = new FilesService(this.context.serviceScope);
    this.messageColor = getMessageColors(this._currentTheme);
    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const teamsContext = await this.context.sdks.microsoftTeams?.teamsJs.app.getContext();
      this._applyTheme(teamsContext.app.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.app.registerOnThemeChangeHandler(this._applyTheme);
    }
    this.containerWidth = this.domElement.clientWidth;
    return super.onInit();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }
    this._isDarkTheme = !!currentTheme.isInverted;
    this._currentTheme = currentTheme;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  private async processSPImage(siteUrl: string, folderName: string, fileResult: IFilePickerResult):Promise<FileInfo> {
    const { removeEndSlash } = UrlUtilities();
    const image = await fileResult.downloadFileContent();
    const filexExtension = fileResult.fileName.replace(fileResult.fileNameWithoutExtension, "");
    const dstImgName = `${new Date().getTime()}${filexExtension}`;
    const folderAbsoluteUrl = folderName
      ? `${siteUrl}/SiteAssets/SitePages/${folderName}`
      : `${siteUrl}/SiteAssets/SitePages`;
    siteUrl = removeEndSlash(siteUrl);
    const fileInfo: FileInfo = await this.filesService.ensureSiteAssetsFile(
      siteUrl,
      image,
      folderAbsoluteUrl,
      dstImgName
    );
    return fileInfo;
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onFilePickerPaneFieldChanged = async (
    oldFileResult: IFilePickerResult,
    newfileResult: IFilePickerResult,
    propertyPath: string
  ):Promise<void> => {
    const filepickerResult =
      propertyPath === "filePicker1"
        ? this.properties.filePickerResultUpCommingImage
        : this.properties.filePickerResultTodayImage;

    if (!newfileResult.fileAbsoluteUrl) {
      filepickerResult.fileAbsoluteUrl = oldFileResult?.fileAbsoluteUrl ?? null;
      const siteUrl = this.context.pageContext.web.absoluteUrl;
      const folderName = this.context.manifest.alias;
      const fileInfo = await this.processSPImage(siteUrl, folderName, newfileResult);
      filepickerResult.fileAbsoluteUrl = fileInfo?.AbsoluteFileUrl;
    }
    if (propertyPath === "filePicker1") {
      this.properties.upcomingBirthdaysBackgroundImage = filepickerResult?.fileAbsoluteUrl;
    } else {
      this.properties.todayBirthdaysBackgroundImage = filepickerResult?.fileAbsoluteUrl;
    }

    this.context.propertyPane.refresh();
  };

  protected onPropertyPaneFieldChanged = async (propertyPath: string, oldValue: any, newValue: any):Promise<void> => {
    if ((propertyPath === "filePicker1" || propertyPath === "filePicker2") && !isEqual(oldValue, newValue)) {
      await this.onFilePickerPaneFieldChanged(oldValue, newValue, propertyPath);
    }

    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  };

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const groupGridProperties: IPropertyPaneGroup = {
      groupName: strings.GroupGridProperties,
      isCollapsed: true,
      groupFields: [
        PropertyPaneLabel("separator", {
          text: "",
        }),
        PropertyPaneTextField("title", {
          label: strings.DescriptionFieldLabel,
          value: this.properties.title ?? strings.DescriptionFieldLabel,
        }),
        PropertyPaneLabel("separator", {
          text: "",
        }),
        PropertyPaneSlider("numberDays", {
          label: strings.UpComingDaysPropertyLabel,
          min: 1,
          max: 60,
          value: this.properties.numberDays ?? 30,
        }),
        PropertyPaneLabel("separator", {
          text: "",
        }),
        PropertyPaneSlider("pageSize", {
          label: strings.PageSizePropertyLabel,
          min: 6,
          max: 12,
          value: this.properties.pageSize ?? 6,
        }),
        PropertyPaneLabel("separator", {
          text: "",
        }),
        PropertyPaneSlider("gridHeight", {
          label: strings.GridHeightPropertyLabel,
          min: 400,
          max: 800,
          value: this.properties.gridHeight ?? 600,
        }),
        PropertyPaneLabel("separator", {
          text: "",
        }),
      ],
    };

    const upCommingBrithdaysProperties: IPropertyPaneGroup = {
      groupName: strings.upComingBirthdays,
      isCollapsed: true,
      groupFields: [
        PropertyPaneTextField("upcomingBirthdaysMessage", {
          label: strings.UpComingBirthdaysMessageLabel,
          value: this.properties.upcomingBirthdaysMessage,
        }),
        PropertyPaneLabel("separator", {
          text: "",
        }),
        PropertyPaneLabel("filePicker1", {
          text: strings.UpComingBirthdayBackGroundImagePropertyLabel,
        }),
        PropertyFieldFilePicker("filePicker1", {
          context: this.context as any,
          filePickerResult: this.properties.filePickerResultUpCommingImage,
          onPropertyChange: this.onPropertyPaneFieldChanged,
          properties: this.properties,
          onSave: (e: IFilePickerResult) => {
            this.properties.filePickerResultUpCommingImage = e;
          },
          onChanged: (e: IFilePickerResult) => {
            this.properties.filePickerResultUpCommingImage = e;
          },
          key: "filePickerId1",
          buttonLabel: strings.SelectImagePropertyLabel,
          accepts: [".gif", ".jpg", ".jpeg", ".png", ".svg"],
          buttonIcon: "",
        }),
        PropertyPaneLabel("separator", {
          text: "",
        }),
        PropertyFieldSwatchColorPicker("upcomingBirthdaysMessageColor", {
          label: strings.MessageColorPropertyLabel,
          selectedColor: this.properties.upcomingBirthdaysMessageColor,
          colors: this.messageColor,
          onPropertyChange: this.onPropertyPaneFieldChanged,
          properties: this.properties,
          key: "colorFieldId",
          showAsCircles: true,
          columnCount: 8,
        }),
      ],
    };

    const todayBrithdaysProperties: IPropertyPaneGroup = {
      groupName: strings.todayBirthdays,
      isCollapsed: true,
      groupFields: [
        PropertyPaneLabel("separator", {
          text: "",
        }),
        PropertyPaneTextField("todayBirthdaysMessage", {
          label: strings.TodayBirthdayMessagePropertyLabel,
          value: this.properties.todayBirthdaysMessage,
        }),
        PropertyPaneLabel("separator", {
          text: "",
        }),
        PropertyPaneLabel("filePicker1", {
          text: strings.TodayBackgroundPropertyImageLabel,
        }),
        PropertyFieldFilePicker("filePicker2", {
          context: this.context as any,
          filePickerResult: this.properties.filePickerResultTodayImage,
          onPropertyChange: this.onPropertyPaneFieldChanged,
          properties: this.properties,
          onSave: (e: IFilePickerResult) => {
            this.properties.filePickerResultTodayImage = e;
          },
          onChanged: (e: IFilePickerResult) => {
            this.properties.filePickerResultTodayImage = e;
          },
          key: "filePickerId2",
          buttonLabel: strings.SelectImagePropertyLabel ,
          accepts: [".gif", ".jpg", ".jpeg", ".png", ".svg"],
        }),
        PropertyFieldSwatchColorPicker("todayBirthdaysMessageColor", {
          label: strings.MessageColorPropertyLabel,
          selectedColor: this.properties.todayBirthdaysMessageColor,
          colors: this.messageColor,
          onPropertyChange: this.onPropertyPaneFieldChanged,
          properties: this.properties,
          key: "colorFieldId",
          showAsCircles: true,
          columnCount: 8,
        }),
      ],
    };

    const noBrithdaysProperties: IPropertyPaneGroup = {
      groupName: strings.noBirthdays,
      isCollapsed: true,
      groupFields: [
        PropertyPaneLabel("separator", {
          text: "",
        }),
        PropertyPaneTextField("noBirthdaysMessage", {
          label: strings.NoUpcomingBirthdayMessageLabel,
          value: this.properties.noBirthdaysMessage,
        }),
        PropertyPaneLabel("separator", {
          text: "",
        }),
      ],
    };

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          displayGroupsAsAccordion: true,
          groups: [groupGridProperties, upCommingBrithdaysProperties, todayBrithdaysProperties, noBrithdaysProperties],
        },
      ],
    };
  }
}
