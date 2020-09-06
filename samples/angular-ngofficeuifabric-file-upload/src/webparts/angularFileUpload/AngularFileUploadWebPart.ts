import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext
} from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';
import styles from './AngularFileUpload.module.scss';
import * as strings from 'angularFileUploadStrings';
import { IAngularFileUploadWebPartProps } from './IAngularFileUploadWebPartProps';

import * as angular from 'angular';
import 'ng-office-ui-fabric';
import { BaseService } from './app/services/baseSvc';
import { FileUploadService } from './app/services/fileUploadSvc';
import { FileUploadCtrl } from './app/controllers/fileUploadCtrl';
import { CustomFileChange } from './app/directives/customFileChange';
import { IsoToDateString } from './app/filters/isoToDateString';

export default class AngularFileUploadWebPart extends BaseClientSideWebPart<IAngularFileUploadWebPartProps> {
  public context: IWebPartContext;
  private $injector: ng.auto.IInjectorService;
  public constructor(context: IWebPartContext) {
    super();
    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
  }

  public render(): void {

    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `
      <div class="${styles.angularFileUpload}">
        <div class="${styles.container}" data-ng-controller="fileUploadCtrl as vm">
          <div class="ms-Grid ms-fontColor-white ${styles.row} ${styles.headerBackground}">
            <div class="ms-Grid-row">
            <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
               <h1 class="ms-fontSize-su ms-fontColor-white ${styles.textAlignCenter}">Welcome to Angular File Upload!</h1>
            </div>
            </div>
            <div class="ms-Grid-row ${styles.whiteBackground} ${styles.row}">
              <div class="ms-Grid-col ms-u-sm5 ms-u-md7 ms-u-lg7 ms-fontColor-black"><input type="file" value="vm.file.fileName" data-custom-file-change="vm.file" /></div>
              <div class="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2"><uif-spinner data-ng-if="vm.isUploading"></uif-spinner></div>
              <div class="ms-Grid-col ms-u-sm5 ms-u-md3 ms-u-lg3"><uif-button uif-type="primary" data-ng-click="vm.upload()">Upload</uif-button></div>
            </div>

            <div class="ms-Grid-row">
            <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
               <h1 class="ms-fontSize-su ms-fontColor-white ${styles.textAlignCenter}">{{vm.libraryTitle}}: Files uploaded by You</h1>
            </div>
            </div>

            <div class="ms-Grid-row ${styles.whiteBackground} ${styles.row}">
            <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                   <uif-spinner data-ng-if="vm.isRemoving">Removing .....</uif-spinner>
               </div>
            </div>

            <div class="ms-Grid-row ${styles.whiteBackground} ${styles.row}">
               <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                  <uif-table>
                      <uif-table-head>
                          <uif-table-row>
                              <uif-table-header>File Name</uif-table-header>
                              <uif-table-header>Modified</uif-table-header>
                              <uif-table-header>Action</uif-table-header>
                          </uif-table-row>
                      </uif-table-head>
                      <uif-table-body>
                          <uif-table-row data-ng-repeat="fileItem in vm.allFiles">
                              <uif-table-cell>{{fileItem.FileLeafRef}}</uif-table-cell>
                              <uif-table-cell>{{fileItem.Modified | isoToDateString}}</uif-table-cell>
                              <uif-table-cell><i class="ms-Icon ms-Icon--Delete ${styles.cursorPointer}" aria-hidden="true" data-ng-click="vm.deleteFile(fileItem)"></i></uif-table-cell>
                          </uif-table-row>
                      </uif-table-body>
                  </uif-table>
               </div>
            </div>
          </div>
        </div>
      </div>`;
      var context = this.context.pageContext;

      this.initAngularApp(context);
    }
    this.$injector.get('$rootScope').$broadcast('configurationChanged', {
      libraryTitle: this.properties.libraryTitle,
      rowLimit: this.properties.rowLimit
    });
  }

  protected initAngularApp(pageContext: any) {

    const fileUploadApp: ng.IModule = angular.module('fileUploadApp', [
      'officeuifabric.core',
      'officeuifabric.components'
    ]);

    fileUploadApp
      .constant("pageContext", pageContext)
      .service("baseService", BaseService)
      .service("fileUploadService", FileUploadService)
      .controller("fileUploadCtrl", FileUploadCtrl)
      .filter("isoToDateString", IsoToDateString.filter)
      .directive("customFileChange", CustomFileChange.factory());

    this.$injector = angular.bootstrap(this.domElement, ['fileUploadApp']);
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
                PropertyPaneTextField('libraryTitle', {
                  label: strings.LibraryTitleLabel
                }),
                PropertyPaneTextField('rowLimit', {
                  label: strings.RowLimitLabel
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
