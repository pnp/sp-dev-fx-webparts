import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';
import ModuleLoader from '@microsoft/sp-module-loader';
import * as angular from 'angular';
import './app/file-upload-module';
import styles from './AngularFileUpload.module.scss';
import * as strings from 'angularFileUploadStrings';
import { IAngularFileUploadWebPartProps } from './IAngularFileUploadWebPartProps';

export default class AngularFileUploadWebPart extends BaseClientSideWebPart<IAngularFileUploadWebPartProps> {
  private $injector: ng.auto.IInjectorService;
  public constructor(context: IWebPartContext) {
    super(context);
    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.angularFileUpload}">
        <div class="${styles.container}" data-ng-controller="FileUploadCtrl as vm">
          <div class="ms-Grid ms-fontColor-white ${styles.row} ${styles.headerBackground}">
            <div class="ms-Grid-row">
            <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
               <h1 class="ms-fontSize-su ms-fontColor-white ${styles.textAlignCenter}">Welcome to Angular File Upload!</h1>
            </div>
            </div>
            <div class="ms-Grid-row ${styles.whiteBackground} ${styles.row}">
              <div class="ms-Grid-col ms-u-sm5 ms-u-md7 ms-u-lg7 ms-fontColor-black"><input type="file" data-custom-file-change="vm.file" /></div>
              <div class="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2"><uif-spinner data-ng-if="vm.isUploading"></uif-spinner></div>
              <div class="ms-Grid-col ms-u-sm5 ms-u-md3 ms-u-lg3"><uif-button uif-type="primary" data-ng-click="vm.upload()">Upload</uif-button></div>
            </div>

            <div class="ms-Grid-row">
            <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
               <h1 class="ms-fontSize-su ms-fontColor-white ${styles.textAlignCenter}">${this.properties.libraryTitle}: Files uploaded by You</h1>
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

    this.$injector = angular.bootstrap(this.domElement, ['fileUploadApp']);
    this.$injector.get('$rootScope').$broadcast('configurationChanged', {
      libraryTitle: this.properties.libraryTitle,
      rowLimit: this.properties.rowLimit
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
}
