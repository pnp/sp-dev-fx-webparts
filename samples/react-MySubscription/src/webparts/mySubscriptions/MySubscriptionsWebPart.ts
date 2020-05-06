import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import MySubscriptions from './components/MySubscriptions';
import { IMySubscriptionsProps } from './components/IMySubscriptionsProps';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import { getLanguage } from './services/Local';


export interface IMySubscriptionsWebPartProps {
  siteurl: string;
  listname:string;

}

export default class MySubscriptionsWebPart extends BaseClientSideWebPart <IMySubscriptionsWebPartProps> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  public strings;
  public render(): void {
    const element: React.ReactElement<IMySubscriptionsProps> = React.createElement(
      MySubscriptions,
      {
        siteurl: this.properties.siteurl,
        context: this.context,
        themeVariant: this._themeVariant,
        listname:this.properties.listname,
        displayMode: this.displayMode, 
        strings:this.strings 



      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
  protected async onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
    this.strings = await getLanguage.getUserBrowserLanguage();

    return super.onInit();
}
/**
 * Update the current theme variant reference and re-render.
 *
 * @param args The new theme
 */
private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
  this._themeVariant = args.theme;
  this.render();
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
            description: "We now have audiences in modern sharepoint. The most benefit from this feature is that we can target News/ Article to different users groups. So the idea was to use the concept of audiences and build something called as subscription, when the user subscribes he/she becomes member of that group i.e office 365 groups Thus giving end users the opportunity on what kind of news/article they would be intrested in."
          },
          groups: [
            {
              groupName: "List Audience Configurations",
              groupFields: [
                PropertyPaneTextField('siteurl', {
                  label:"Site URL",
                  description:"For eg : https://demo.sharepoint.com/sites/common",
                  
                }),
                PropertyPaneTextField('listname', {
                  label:"List Name",
                  description:"For eg: Audiences",
                  
                }),
                

              ]
            }
          ]
        }
      ]
    };
  }
}
