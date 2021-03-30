import { Version } from '@microsoft/sp-core-library';
import "@pnp/polyfill-ie11";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneLabel,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import styles from './FeedbackWebPart.module.scss';
import * as strings from 'FeedbackWebPartStrings';
import BaseWebPart from '../BaseWebPart';
import {Container} from './components/Container/Container';
import {IContainerProps} from './components/Container/IContainerProps';
import {DropdownOptions} from './DropdownOptions';

export interface IFeedbackWebPartProps {
  buttonLabel: string;
  feedbackCategory: string;
  showCategory: boolean;
}


export default class FeedbackWebPart extends BaseWebPart<IFeedbackWebPartProps> {

  private themeProvider: ThemeProvider;
  private themeVariant: IReadonlyTheme | undefined;

  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this.themeVariant = this.themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this.themeProvider.themeChangedEvent.add(this, this.handleThemeChangedEvent);
    return super.onInit();
  }

  public async render(): Promise<void> {
    var showCategory = escape(this.properties.showCategory.toString()) == "false" ? false : true;
    const element: React.ReactElement<IContainerProps> = React.createElement(
      Container,
      {
        buttonLabel: escape(this.properties.buttonLabel),
        showCategory: showCategory,
        themeVariant: this.themeVariant,
        listitemid: !!this.context.pageContext.listItem ? this.context.pageContext.listItem.id : null,
        selectedCategory: escape(this.properties.feedbackCategory),
        currentUser: this.context.pageContext.user
      }
    );
    ReactDom.render(element, this.domElement);
  }

  private handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this.themeVariant = args.theme;
    this.render();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPane_Description
          },
          groups: [
            {
              groupName: strings.PropertyPane_GroupName_Settings,
              groupFields: [
                PropertyPaneTextField('buttonLabel', {
                  label: strings.PropertyPane_Label_ButtonText
                }),
                PropertyPaneToggle('showCategory', {
                  label: strings.FeedbackCategoryToggle_Label,
                  onText: 'On',
                  offText: 'Off'
                }),
                PropertyPaneDropdown('feedbackCategory', {
                  label: strings.FeedbackCategory_Label,
                  selectedKey: "general",
                  options: DropdownOptions.Options})
              ]
            },
            {
              groupName: strings.PropertyPane_GroupName_About,
              groupFields: [
              PropertyPaneLabel('versionNumber', {
                text: strings.PropertyPane_Label_VersionInfo + this.manifest.version
              })
            ]}
          ]
        }
      ]
    };
  }
}
