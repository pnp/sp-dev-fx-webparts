import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { IDigestCache, DigestCache } from '@microsoft/sp-http';
import * as strings from 'FileUploadWebPartStrings';
import FileUpload from './components/FileUpload';
import { IFileUploadProps } from './components/IFileUploadProps';
import * as loader from '@microsoft/sp-loader';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '../../PropertyFieldListPicker';
import { PropertyPaneDropdown } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneDropdown/PropertyPaneDropdown';
export interface IFileUploadWebPartProps {
  listName:string;
  fileTypes:string;
  queryString:string;
  uploadFilesTo:string;
}
require("./filepicker.css");
require("./dropzone.css");
export default class FileUploadWebPart extends BaseClientSideWebPart<IFileUploadWebPartProps> {
  public digest:string="";
  public constructor(context:IWebPartContext){
    super();    
    loader.SPComponentLoader.loadCss('https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
  }
  protected onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      const digestCache: IDigestCache = this.context.serviceScope.consume(DigestCache.serviceKey);
      digestCache.fetchDigest(this.context.pageContext.web.serverRelativeUrl).then((digest: string): void => {
        // use the digest here
        this.digest=digest;
        resolve();
      });
    });
  }
  public render(): void {
    const element: React.ReactElement<IFileUploadProps > = React.createElement(
      FileUpload,
      {
        digest:this.digest,
        context:this.context,
        listName:this.properties.listName,
        fileTypes:this.properties.fileTypes,
        queryString:this.properties.queryString,
        uploadFilesTo:this.properties.uploadFilesTo
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneDropdown('uploadFilesTo',{
                  label:'Upload files to',
                  options:[{key:'DocumentLibrary',text:'Document Library'},
                           {key:'List',text:'As item attachments'} ]
                }),
                PropertyFieldListPicker('listName', {
                  label: 'Select a list or library',
                  selectedList: this.properties.listName,
                  includeHidden: false,
                  //baseTemplate: 109,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  // multiSelect: false,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,                  
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyPaneTextField('fileTypes',{
                  label:'File Types (use , as seperator)',                  
                }),
                PropertyPaneTextField('queryString',{
                  label:'Query String parameter',
                  description:'If you want to attach files to a list item you need to define the ID of the item in a query string parameter, example: ID=1'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
