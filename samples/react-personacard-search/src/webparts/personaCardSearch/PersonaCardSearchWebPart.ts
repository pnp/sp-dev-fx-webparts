import * as React from 'react';
import * as ReactDom from 'react-dom';
import { 
  Version,
  Environment,
  EnvironmentType 
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import { 
  Placeholder,
  IPlaceholderProps 
} from '@pnp/spfx-controls-react/lib/Placeholder';
import * as strings from 'PersonaCardSearchWebPartStrings';
import { IPersonaCardSearchWebPartProps } from './IPersonaCardSearchWebPartProps';
import { 
  IUserProfileService,
  ISearchService,
  IPersonaCardContainerProps,
  IPerson,
  PersonaCardContainer,
  MockPersonaCardContainer,
  SearchService,
  MockSearchService,
  UserProfileService,
  MockUserProfileService 
} from './index';
import * as moment from 'moment';

export default class PersonaCardSearchWebPart extends BaseClientSideWebPart<IPersonaCardSearchWebPartProps> {
  private _serchServiceInstance: ISearchService;  
  private _userProfileServiceInstance: IUserProfileService;
  private _resultSourceId:string;

  protected onInit(): Promise<void> {
    const currentLocale = this.context.pageContext.cultureInfo.currentCultureName;
    moment.locale(currentLocale);

    if (Environment.type === EnvironmentType.Local) {
      this._userProfileServiceInstance = new MockUserProfileService();  
      this._serchServiceInstance = new MockSearchService();
    } else {
      let serviceScope = this.context.serviceScope; 
      this._userProfileServiceInstance = serviceScope.consume(UserProfileService.serviceKey);    
      this._serchServiceInstance = new SearchService(this.context);
    }

    return super.onInit();
  }
  
  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }  

  public render(): void {
    let renderElement = null;
    this._serchServiceInstance.resultsCount = this.properties.maxResultsCount;
    this._serchServiceInstance.resultSourceId = this.properties.resultSourceId;

    const peopleContainer: React.ReactElement<IPersonaCardContainerProps> = React.createElement(
     Environment.type === EnvironmentType.Local ? MockPersonaCardContainer :PersonaCardContainer,
      {
        searchService: this._serchServiceInstance,        
        maxResultsCount: this.properties.maxResultsCount,
        getPropertiesForUsers: this._getUserProfilePropertiesFor.bind(this)      
      }
    );
    
    const placeholder: React.ReactElement<IPlaceholderProps> = React.createElement(
      Placeholder,
      {
        iconName: strings.PlaceHolderEditLabel,
        iconText: strings.PlaceHolderIconText,
        description: strings.PlaceHolderDescription,
        buttonLabel: strings.PlaceHolderConfigureBtnLabel,
        onConfigure: this._setupWebPart.bind(this)
      }
    );

    renderElement = this.properties.resultSourceId ? peopleContainer: placeholder;
    ReactDom.render(renderElement, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
              groupName: strings.SearchSettingsGroupName,
              groupFields: [                
                PropertyPaneTextField('resultSourceId', {
                  label: strings.ResultSourceIdLabel
                }),
                PropertyPaneSlider('maxResultsCount', {
                  label: strings.MaxResultsCount,
                  max: 50,
                  min: 1,
                  showValue: true,
                  step: 1,
                  value: this.properties.maxResultsCount,
                })
              ]
            }
          ]
        }
      ]
    };
  }
  private _setupWebPart() {
    this.context.propertyPane.open();
  }
  private _getUserProfilePropertiesFor(accountNames: string[]): Promise<IPerson[]>{
      return this._userProfileServiceInstance.getPropertiesForUsers(accountNames);
  }
}
