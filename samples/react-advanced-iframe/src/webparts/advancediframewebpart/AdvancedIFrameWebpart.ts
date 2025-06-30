import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration, PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'AdvancedIFrameWebpartStrings';
import * as Handlebars from 'handlebars';

import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';

import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme,
  ISemanticColors
} from '@microsoft/sp-component-base';
import { IFrameDataModel } from './models/IFrameDataModel';
import { createHTMLDescription } from './helpers/createHTMLDescription';

import "@pnp/sp/sites";
import "@pnp/sp/";
import "@pnp/sp/webs";
import { IScriptSaveDomainService, ScriptSaveDomainService } from './services/ScriptSaveDomainService';

export interface AdvancedIFrameWebpartProps {  
  aspectratio: string;
  url: string;
}



export default class AdvancedIFrameWebpart extends BaseClientSideWebPart<AdvancedIFrameWebpartProps> {

  private _ScriptSaveDomainService: IScriptSaveDomainService;

  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  private _IFramewidth: number = 640;

  /**
   * The onInit method
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
    this._ScriptSaveDomainService = this.context.serviceScope.consume(ScriptSaveDomainService.serviceKey);
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._themeVariant = this._themeProvider.tryGetTheme();
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
  }

  /**
   * The render method
   */
  public render(): void {
    // get variables that can be used 
    const data = this.getVariables()

    if (this.properties.url == null || this.properties.url.length == 0) {
      // no url provided in property pane, so render description
      this.domElement.innerHTML = createHTMLDescription(strings, data);
      return;
    }
    // Compile and render the variables into the url
    const renderHandlebars = Handlebars.compile(this.properties.url);
    const renderedUrl = renderHandlebars(data);

    if (!this._ScriptSaveDomainService.isInSaveDomain(renderedUrl)) {
      // the rendered URL is not a safe url, so show not allowed message
      this.domElement.innerHTML = strings.UrlNotAllowedMessage;
      return;
    }
    const aspectratio = this.properties.aspectratio == "as0916" ? "9 / 16" : "16 / 9";
    this.domElement.innerHTML = `<iframe style="aspect-ratio: ${aspectratio};height: 100%;width: 100%;" src="${renderedUrl}" width="${this._IFramewidth}"  frameborder="0" allow="autoplay; fullscreen; picture-in-picture"></iframe>`;
  }


  /**
      * This Method is called whenever the theme of the site has been changed
      * @param args 
      */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render;
  }


  /**
    * Returns the variables that can be used in the handlebars template
    * @returns 
    */
  private getVariables() {
    // get all current theme colors
    const semanticColors: Partial<ISemanticColors> | undefined = this._themeVariant && this._themeVariant.semanticColors;

    // get all current query string parameters and put them into a "query" object
    const entries = (new URLSearchParams(window.location.search) as any).entries();
    const query: any = {};
    let value = null;
    while (value = entries.next(), !value.done) {
      query[value.value[0]] = value.value[1];
    }

    // initialize the data object that will be passed to handlebars renderer
    const data: IFrameDataModel = {
      query: query,
      culture: {
        currentCultureName: this.context.pageContext.cultureInfo.currentCultureName
      },
      site: {
        id: this.context.pageContext.site.id,
        serverRelativeUrl: this.context.pageContext.site.serverRelativeUrl
      },
      page: {
        pageUrl: this.context.pageContext.site.serverRequestPath
      },
      user: {
        name: this.context.pageContext.user.displayName,
        email: this.context.pageContext.user.email,
        loginName: this.context.pageContext.user.loginName,
      },
      // remove the pound sign from every color... It does not work as a query string parameter
      color: Object.keys(semanticColors).reduce((obj, key) => { obj[key] = semanticColors[key].replace("#", ""); return obj }, {}) || {}
    };

    return data;
  }

  /**
   * This is called whenever the webpart resizes and provides the new width
   * @param newWidth 
   */
  protected onAfterResize(newWidth: number) {
    this._IFramewidth = newWidth;
  }


  /**
   * Returns the dataVersion
   */
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * This configures the property pane
   * @returns 
   */
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
                PropertyPaneChoiceGroup('aspectratio', {
                  label: strings.AspectRatioLabel,
                  options: [
                    { key: 'as1609', text: '16 / 09', checked: true },
                    { key: 'as0916', text: '09 / 16' }
                  ],
                }),
                PropertyFieldCodeEditor('url', {
                  label: strings.UrlFieldLabel,
                  panelTitle: strings.EditUrlLabel,
                  initialValue: this.properties.url,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.Handlebars,
                  options: {
                    wrap: true,
                    fontSize: 20,
                    mode: "text"
                    // more options
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}