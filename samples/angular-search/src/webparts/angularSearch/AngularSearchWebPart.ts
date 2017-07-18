import {
  Version,
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { SPHttpClient } from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AngularSearch.module.scss';
import * as strings from 'angularSearchStrings';
import { IAngularSearchWebPartProps } from './IAngularSearchWebPartProps';

import * as angular from 'angular';
import MockHttpClient from './MockHttpClient';
import './app/app.module';
import 'ng-office-ui-fabric';

export interface ISPCTypeLists {
  value: ISPCType[];
}

export interface ISPCType {
  Name: string;
  Description: string;
  Id: ISPStrVal;
}

export interface ISPStrVal {
  StringValue: string;
}

export default class AngularSearchWebPart extends BaseClientSideWebPart<IAngularSearchWebPartProps> {
  private $injector: angular.auto.IInjectorService;
  private _CTypesInThisSite: IPropertyPaneDropdownOption[] = [];


  public constructor(context: IWebPartContext) {
    super();

    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    //SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
  }

  public onInit<T>(): Promise<T> {
    //Determine if we are in a local environment
    if (Environment.type == EnvironmentType.Local) {
      this._getMockOptions().then((data) => {
        this._CTypesInThisSite = data;
      });
    }
    else {
      this._getOptions().then((data) => {
        this._CTypesInThisSite = data;
      });
    }

    return Promise.resolve();
  }

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `<angularsearch web="${this.context.pageContext.web.absoluteUrl}" style='${angular.toJson(styles)}' contentType='${this.properties.contentTypes}'></angularsearch>`;
      this.$injector = angular.bootstrap(this.domElement, ['angularsearchapp']);
    }

    this.$injector.get('$rootScope').$broadcast('configurationChanged', {
      contentType: this.properties.contentTypes
    });
  }

  private _getCTypes(url: string): Promise<ISPCTypeLists> {
    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1).then((response: Response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        console.log("error: " + response.statusText);
        return null;
      }
    });
  }

  private _getMockOptions(): Promise<IPropertyPaneDropdownOption[]> {
    return this._getMockCTypes()
      .then((data: ISPCTypeLists) => {
        var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
        var cTypes: ISPCType[] = data.value;
        cTypes.forEach((cType: ISPCType) => {
          console.log("Found Content Type(s)");
          options.push({ key: cType.Id.StringValue, text: cType.Name });
        });

        return options;
      });
  }

  private _getMockCTypes(): Promise<ISPCTypeLists> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl)
      .then((data: ISPCType[]) => {
        let cTypeData: ISPCTypeLists = { value: data };
        return cTypeData;
      }) as Promise<ISPCTypeLists>;
  }

  private _getOptions(): Promise<IPropertyPaneDropdownOption[]> {
    var url = this.context.pageContext.web.absoluteUrl + '/_api/web/AvailableContentTypes?$filter=Group eq \'Page Layout Content Types\'';

    return this._getCTypes(url).then((response) => {
      var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
      var lists: ISPCType[] = response.value;
      lists.forEach((list: ISPCType) => {
        console.log("Found Content Type(s)");
        options.push({ key: list.Name, text: list.Name });
      });

      return options;
    });
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('contentTypes', {
                  label: 'Available Content Types',
                  options: this._CTypesInThisSite,
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
