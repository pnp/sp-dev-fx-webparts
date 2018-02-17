import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartPropertiesMetadata
} from '@microsoft/sp-webpart-base';

import * as strings from 'TextboxioEditorWebPartStrings';
import TextboxioEditor from './components/TextboxioEditor';
import ITextboxioEditorProps from './components/ITextboxioEditorProps';
import UrlQueryParameterCollection from '@microsoft/sp-core-library/lib/url/UrlQueryParameterCollection';

export interface ITextboxioEditorWebPartProps {
  content: string;
}

export default class TextboxioEditorWebPart extends BaseClientSideWebPart<ITextboxioEditorWebPartProps> {

  private _currentLocale: string;

  public constructor() {
    super();
    
    this._onContentChanged = this._onContentChanged.bind(this);
  }

  /**
   * Override the base onInit() implementation to get the persisted properties to initialize data provider.
   */
  protected onInit(): Promise<void> {
    
      let configLanguage;
  
      // Determines the language to used in the config file 
      switch (this.context.pageContext.web.language) {
        
        case 1036: 
          configLanguage = "fr";
          break;
  
        case 1033:
          configLanguage = "en";
          break;
  
        default:
          configLanguage = "en";
          break;
      }
    
      this._currentLocale = configLanguage;
      
      return super.onInit();
  }

  private _onContentChanged(content: string) {
    
    // Persist sections into Web Part properties
    this.properties.content = content;
  }
    
  public render(): void {
    
        // Need to fix the display mode because there is a bug when a page indeit mode is refresh via F5, the first passed props is "Read" instead of "Edit"
        // causing issue if you have code depending on this value.
        var queryParameters = new UrlQueryParameterCollection(window.location.href);
        let fixedDisplayMode = this.displayMode;
        
        if (fixedDisplayMode === DisplayMode.Read) {
          if (queryParameters.getValue("Mode") === "Edit") {
              fixedDisplayMode = DisplayMode.Edit;
          }
        }
    
        const element: React.ReactElement<ITextboxioEditorProps> = React.createElement(
          TextboxioEditor,
          {
            content: this.properties.content,
            locale: this._currentLocale,
            displayMode: fixedDisplayMode,            
            onContentChanged: this._onContentChanged
          }
        );
    
        ReactDom.render(element, this.domElement);
      }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
    'content' : {isHtmlString: true}
    };
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
