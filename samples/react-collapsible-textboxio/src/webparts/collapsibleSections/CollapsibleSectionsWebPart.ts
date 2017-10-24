import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
import "office-ui-fabric-react/dist/css/fabric.min.css";
import IPageSectionContainerProps from "./components/CollapsibleSectionsContainer/ICollapsibleSectionsContainerProps";
import PageSectionContainer from "./components/CollapsibleSectionsContainer/CollapsibleSectionsContainer";
import ISection from "../../models/ISection";
import isEmpty from "lodash-es/isEmpty";
import { UrlQueryParameterCollection, DisplayMode } from '@microsoft/sp-core-library';
import * as strings from 'CollapsibleSectionsWebPartStrings';
import "./CollapsibleSections.scss";

export interface ICollapsibleSectionsWebPartProps {
  sections: ISection[];
}

export default class CollapsibleSectionsWebPart extends BaseClientSideWebPart<ICollapsibleSectionsWebPartProps> {

  private _currentLocale: string;

  public constructor() {
    super();
    
    this._onSectionsUpdated = this._onSectionsUpdated.bind(this);
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

  private _onSectionsUpdated(updatedSections: ISection[]) {
    
    // Persist sections into Web Part properties
    this.properties.sections = updatedSections;
  }
    
  protected onAfterDeserialize(deserializedObject: any, dataVersion: Version)  {

    if (!deserializedObject.sections) {
      deserializedObject.sections = [];
    } else {
      if (deserializedObject.sections.length === 1 && isEmpty(deserializedObject.sections[0]) ) {
        deserializedObject.sections = [];
      }
    }

    return super.onAfterDeserialize(deserializedObject, dataVersion);
  }   
  
  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'sections[*].controls[*].content' : { isHtmlString: true },
      'sections[*].title': { isSearchablePlainText: true }
    };
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

    const element: React.ReactElement<IPageSectionContainerProps> = React.createElement(
      PageSectionContainer,
      {
        locale: this._currentLocale,
        displayMode: fixedDisplayMode,
        context: this.context,
        persistedSections: this.properties.sections,
        onSectionsUpdated: this._onSectionsUpdated
      }
    );

    ReactDom.render(element, this.domElement);
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
