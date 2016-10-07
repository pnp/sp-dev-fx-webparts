import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-client-preview';

import ModuleLoader from '@microsoft/sp-module-loader';
import { EnvironmentType } from '@microsoft/sp-client-base';

import styles from './AngularSearch.module.scss';
import * as strings from 'angularSearchStrings';
import { IAngularSearchWebPartProps } from './IAngularSearchWebPartProps';

import * as angular from 'angular';
import HomeController from './app/HomeController';
import MockHttpClient from './MockHttpClient';
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
  private $injector: ng.auto.IInjectorService;
  private _listsInThisSite: IPropertyPaneDropdownOption[] = [];

  get baseUrl(): string { return '$BASEURL$'; }

  public constructor(context: IWebPartContext) {
    super(context);

    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
  }

  public onInit<T>(): Promise<T> {
    //Determine if we are in a local environment
    if (this.context.environment.type == EnvironmentType.Local) {
      this._getMockOptions().then((data) => {
        this._listsInThisSite = data;
      });
    }
    else {
      this._getOptions().then((data) => {
        this._listsInThisSite = data;
      });
    }

    return Promise.resolve();
  }

  public render(): void {
    if (this.renderedOnce === false) {
      const wp: AngularSearchWebPart = this;

      this.domElement.innerHTML = `<angularsearch web="${this.context.pageContext.web.absoluteUrl}" hello="${wp.title}" style='${angular.toJson(styles)}'></angularsearch>`;
      let sce: ng.ISCEDelegateService;

      angular.module('angularsearchapp', [
        'officeuifabric.core',
        'officeuifabric.components'])
        .component('angularsearch', {
          controller: ('HomeController', HomeController),
          controllerAs: 'vm',
          bindings: {
            web: '@',
            hello: '@',
            style: '<'
          },
          templateUrl: `${this.baseUrl}home-template.html`
        })
        .config(function ($sceDelegateProvider: ng.ISCEDelegateProvider): void {
          $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain. Notice the diference between * and **
            'https://15767-e7440:4321/dist/**'
          ]);
        });

      this.$injector = angular.bootstrap(this.domElement, ['angularsearchapp']);
    }
  }

  private _getCTypes(url: string): Promise<ISPCTypeLists> {
    return this.context.httpClient.get(url).then((response: Response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        console.log("error: " + response.error().text);
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
    var url = this.context.pageContext.web.absoluteUrl + '/_api/web/AvailableContentTypes?&filter=Group eq \'Document Content Types\'';

    return this._getCTypes(url).then((response) => {
      var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
      var lists: ISPCType[] = response.value;
      lists.forEach((list: ISPCType) => {
        console.log("Found Content Type(s)");
        options.push({ key: list.Id.StringValue, text: list.Name });
      });

      return options;
    });
  }



  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
                PropertyPaneDropdown('test', {
                  label: 'Dropdown',
                  options: this._listsInThisSite
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
