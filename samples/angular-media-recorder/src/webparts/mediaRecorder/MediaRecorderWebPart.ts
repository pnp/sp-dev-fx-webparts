import { Version } from '@microsoft/sp-core-library';
import {
  IWebPartContext,
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import * as strings from 'mediaRecorderStrings';
import { IMediaRecorderWebPartProps } from './IMediaRecorderWebPartProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as angular from 'angular';
import './app/app-module';
import Home from './app/Home';

export default class MediaRecorderWebPart extends BaseClientSideWebPart<IMediaRecorderWebPartProps> {

  private $injector: ng.auto.IInjectorService;

  public constructor(context: IWebPartContext) {
    super();
  }

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = Home.templateHtml;
      this.componentDidMount();
    }

    this.sendWebPartProperties();
  }

  private componentDidMount(): void {
    try {
      
      if (!window["SP"]) {
        SPComponentLoader.loadScript('/_layouts/15/init.js', {
          globalExportsName: '$_global_init'
        })
          .then((): Promise<{}> => {
            return SPComponentLoader.loadScript('/_layouts/15/MicrosoftAjax.js', {
              globalExportsName: 'Sys'
            });
          })
          .then((): Promise<{}> => {
            return SPComponentLoader.loadScript('/_layouts/15/SP.Core.js', {
              globalExportsName: 'SP'
            });
          })
          .then((): Promise<{}> => {
            return SPComponentLoader.loadScript('/_layouts/15/SP.Runtime.js', {
              globalExportsName: 'SP'
            });
          })
          .then((): Promise<{}> => {
            return SPComponentLoader.loadScript('/_layouts/15/SP.js', {
              globalExportsName: 'SP'
            });
          })
          .then((): void => {
            this.$injector = angular.bootstrap(this.domElement, ['mediarecorderapp']);
            this.sendWebPartProperties();
          });
      }
      else {
        this.$injector = angular.bootstrap(this.domElement, ['mediarecorderapp']);
        this.sendWebPartProperties();
      }
    }
    catch (error) {
      console.info("Error in componentDidMount():" + error);
    }
  }

  private sendWebPartProperties(): void {
    if (this.$injector) {
      this.$injector.get('$rootScope').$broadcast('configurationChanged', {
        listName: this.properties.listName,
        httpClient: this.context.spHttpClient,
        webUrl: this.context.pageContext.web.absoluteUrl
      });
    }
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
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

}
