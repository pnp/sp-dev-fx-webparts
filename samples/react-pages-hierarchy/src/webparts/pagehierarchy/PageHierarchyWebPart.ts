import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, IPropertyPaneGroup, PropertyPaneChoiceGroup, PropertyPaneLabel } from '@microsoft/sp-property-pane';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import BaseWebPart from '@src/webparts/BaseWebPart';
import { Parameters, PagesToDisplay, LogHelper } from '@src/utilities';
import IPageHierarchyWebPartProps from './IPageHierarchyWebPartProps';
import * as strings from 'PageHierarchyWebPartStrings';
import { Container, IContainerProps } from './components/Container';

export default class PageHierarchyWebPart extends BaseWebPart<IPageHierarchyWebPartProps> {

  private themeProvider: ThemeProvider;
  private themeVariant: IReadonlyTheme | undefined;

  // since this web part reacts to page changes that need to be saved before we redraw using this boolean to know that
  private pageEditFinished: boolean = false;

  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this.themeVariant = this.themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this.themeProvider.themeChangedEvent.add(this, this.handleThemeChangedEvent);

    return super.onInit();
  }

  /*
    we force the user to make a decision about what to display (ancestors vs children) in the Configuration Control
    Once we know that we can render the container whose only job is to play traffic cop for the controls.  Eventually
    there may be many different rendering controls for children
  */
  public render(): void {

    LogHelper.verbose('PageHierarchyWebPart', 'render', JSON.stringify(this.domElement.getBoundingClientRect()));

    const element: React.ReactElement<IContainerProps> = React.createElement(
      Container,
      {
        currentPageId: this.context.pageContext.listItem ? this.context.pageContext.listItem.id : this.getDebugPageId(),
        pagesToDisplay: this.properties.pagesToDisplay,
        themeVariant: this.themeVariant,
        domElement: this.domElement,
        showTitle: true,
        title: this.properties.title,
        displayMode: this.displayMode,
        updateTitle: (t) => { this.properties.title = t; this.render(); },
        onConfigure: () => { this.onConfigure(); },
        pageEditFinished: this.pageEditFinished,
        context: this.context
      }
    );
    ReactDom.render(element, this.domElement, () => {
      // ensure flag is reset to false after render is finished
      this.pageEditFinished = false;
    });

  }

  private handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this.themeVariant = args.theme;
    this.render();
  }

  private onConfigure = (): void => {
    this.context.propertyPane.open();
  }

  /*
  Really only used for workbench mode when we cannot get a page id for the current page.
  We'll allow user to test with a property and also using mock data allow them to navigate when on local host with a querystring
  */
  private getDebugPageId() : number {
    let queryParms = new UrlQueryParameterCollection(window.location.href);
    let debugPageId = this.properties.debugPageId;
    if(queryParms.getValue(Parameters.DEBUGPAGEID)) { debugPageId = Number(queryParms.getValue(Parameters.DEBUGPAGEID)); }

    return debugPageId;
  }
  /*
   when page edit goes from edit to read we start a timer so that we can wait for the save to occur
   Things like the page title and page parent page property changing affect us
  */
  protected onDisplayModeChanged(oldDisplayMode: DisplayMode) {
    if (oldDisplayMode === DisplayMode.Edit) {
      setTimeout(() => {
        this.pageEditFinished = true;
        this.render();
      }, 500);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    let propertyPaneGroups: IPropertyPaneGroup[] = [];

    // If this webpart isn't on a page, we don't have a list item so let us provide our own to debug
    if (this.context.pageContext.listItem === undefined) {
      propertyPaneGroups.push({
        groupName: strings.PropertyPane_GroupName_Debug,
        isCollapsed: false,
        groupFields: [
          PropertyFieldNumber('debugPageId', {
            key: 'debugPageId',
            value: this.properties.debugPageId,
            label: strings.PropertyPane_Label_DebugPageId,
            description: strings.PropertyPane_Description_DebugPageId,
            minValue: 1,
            disabled: false
          })
        ]
      });
    }

    // add group for choosing display mode
    propertyPaneGroups.push({
      groupName: strings.PropertyPane_GroupName_PagesToDisplay,
      isCollapsed: false,
      groupFields: [
        PropertyPaneChoiceGroup('pagesToDisplay', {
          label: strings.PropertyPane_Label_PagesToDisplay,
          options: [
            {
              key: PagesToDisplay.Ancestors,
              text: strings.PropertyPane_PagesToDisplay_OptionText_Ancestors,
              checked: this.properties.pagesToDisplay === PagesToDisplay.Ancestors,
              iconProps: { officeFabricIconFontName: 'ChevronRightMed' }
            },
            {
              key: PagesToDisplay.Children,
              text: strings.PropertyPane_PagesToDisplay_OptionText_Children,
              checked: this.properties.pagesToDisplay === PagesToDisplay.Children,
              iconProps: { officeFabricIconFontName: 'DistributeDown' }
            }
          ]
        })
      ]
    });

    propertyPaneGroups.push({
      groupName: strings.PropertyPane_GroupName_About,
      isCollapsed: false,
      groupFields: [
        PropertyPaneLabel('versionNumber', {
          text: strings.PropertyPane_Label_VersionInfo + this.manifest.version
        })
      ]
    });


    return {
      pages: [
        {
          header: {
            description: strings.PropertyPane_Description
          },
          displayGroupsAsAccordion: true,
          groups: propertyPaneGroups
        }
      ]
    };
  }
}
