import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ServiceKey, Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import PageNavigator from './components/PageNavigator';
import { IPageNavigatorProps } from './components/IPageNavigatorProps';
import { INavLink } from '@fluentui/react/lib/Nav';
import { SPService } from '../../Service/SPService';
import { IReadonlyTheme, ThemeChangedEventArgs, ThemeProvider } from '@microsoft/sp-component-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import strings from 'PageNavigatorWebPartStrings';

export interface IPageNavigatorWebPartProps {
  stickyMode: boolean,
  stickyParentDistance: string
}

export default class PageNavigatorWebPart extends BaseClientSideWebPart<IPageNavigatorWebPartProps> {
  private anchorLinks: INavLink[] = [];
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  public async onInit(): Promise<void> {
    await super.onInit();

    this.anchorLinks = await SPService.GetAnchorLinks(this.context);

    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey as ServiceKey<ThemeProvider>);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);    
  }

  public render(): void {
    const element: React.ReactElement<IPageNavigatorProps > = React.createElement(
      PageNavigator,
      {
        anchorLinks: this.anchorLinks,
        themeVariant: this._themeVariant,
        stickyMode: this.properties.stickyMode,
        stickyParentDistance: this.properties.stickyParentDistance,
        webpartId: this.context.instanceId
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private validateDistanceParam(distStr: string): string {

    const regex = /^\d+$/;
    const isNumeric = regex.test(distStr);

    if (!isNumeric) {
      return strings.ErrorNumeric;
    }
    return ""; // No error

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
              groupFields: [
                PropertyPaneToggle('stickyMode', {
                  label: strings.StickyMode
                }),
                PropertyPaneTextField('stickyParentDistance', {
                  label: strings.StickyParentDistance,
                  onGetErrorMessage: this.validateDistanceParam.bind(this)
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
  }
}
