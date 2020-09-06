/**
 * @file
 * Service to get list & list items from current SharePoint site
 *
 * Author: Olivier Carpentier
 */
import { ISPLists, ISPListItems, ISPListItem } from './ISPList';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import {SPHttpClient,ISPHttpClientOptions,SPHttpClientResponse } from '@microsoft/sp-http';
import { IPhotopileWebPartProps } from './IPhotopileWebPartProps';
import {  Environment, EnvironmentType } from '@microsoft/sp-core-library';
import MockHttpClient from './MockHttpClient';

/**
 * @interface
 * Service interface definition
 */
export interface ISPPicturesListService {
  /**
   * @function
   * Gets the list of picture libs in the current SharePoint site
   */
  getPictureLibs(): Promise<ISPLists>;
  /**
   * @function
   * Gets the pictures from a SharePoint list
   */
  getPictures(libId: string): Promise<ISPListItems>;
}

/**
 * @class
 * Service implementation to get list & list items from current SharePoint site
 */
export class SPPicturesListService implements ISPPicturesListService {
  private context: IWebPartContext;
  private props: IPhotopileWebPartProps;

  /**
   * @function
   * Service constructor
   */
  constructor(_props: IPhotopileWebPartProps, pageContext: IWebPartContext){
      this.props = _props;
      this.context = pageContext;
  }

  /**
   * @function
   * Gets the list of picture libs in the current SharePoint site
   */
  public getPictureLibs(): Promise<ISPLists> {
    if (Environment.type === EnvironmentType.Local) {
      //If the running environment is local, load the data from the mock
      return this.getPictureLibsFromMock();
    }
    else {
      //If the running environment is SharePoint, request the lists REST service
      //Gets only the list with BaseTemplate = 109 (picture libs)
      return this.context.spHttpClient.get(
      `${this.context.pageContext.web.absoluteUrl}/_api/lists?$select=Title,id,BaseTemplate&$filter=BaseTemplate%20eq%20109`,SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
          return response.json();
      });
    }
  }

  /**
   * @function
   * Returns 3 fake SharePoint lists for the Mock mode
   */
  private getPictureLibsFromMock(): Promise<ISPLists> {
    return MockHttpClient.getLists(this.context.pageContext.web.absoluteUrl).then(() => {
          const listData: ISPLists = {
              value:
              [
                  { Title: 'Mock List One', Id: '1', BaseTemplate: '109' },
                  { Title: 'Mock List Two', Id: '2', BaseTemplate: '109' },
                  { Title: 'Mock List Three', Id: '3', BaseTemplate: '109' }
              ]
          };
          return listData;
      }) as Promise<ISPLists>;
  }


  /**
   * @function
   * Gets the pictures from a SharePoint list
   */
  public getPictures(libId: string): Promise<ISPListItems> {
    if (Environment.type === EnvironmentType.Local) {
      //If the running environment is local, load the data from the mock
      return this.getPicturesFromMock(libId);
    }
    else {
      //If the running environment is SharePoint, request the items REST service
      //Builds the request to get only some fields, order the items & limit the number of items
      //TODO: optimize the request to not include folders and get only items
      var restUrl: string = this.context.pageContext.web.absoluteUrl;
      restUrl += "/_api/Web/Lists(guid'";
      restUrl += this.props.listName;
      restUrl += "')/items?$expand=File&$select=Title,Description,id,File,FileSystemObjectType&$orderby=";
      restUrl += this.props.orderBy;
      restUrl += "%20";
      restUrl += this.props.orderByAsc;
      restUrl += "&$top=";
      restUrl += this.props.count;

      //Request the SharePoint web service
      return this.context.spHttpClient.get(restUrl,SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
          return response.json().then((responseFormated: any) => {
              var formatedResponse: ISPListItems = { value: []};
              //Fetchs the Json response to construct the final items list
              responseFormated.value.map((object: any, i: number) => {
                //Tests if the result is a file and not a folder
                if (object['FileSystemObjectType'] == '0') {
                  var spListItem: ISPListItem = {
                    'ID': object["ID"],
                    'Title': object['Title'],
                    'Description': object['Description'],
                    'File': {
                      'Name': object['File']['Name'],
                      'ServerRelativeUrl': object['File']['ServerRelativeUrl']
                    }
                  };
                  //Creates the thumbnail item url from the Picture path
                  spListItem.File.ThumbnailServerUrl = this.getThumbnailUrl(spListItem.File.ServerRelativeUrl, spListItem.File.Name);
                  formatedResponse.value.push(spListItem);
                }
              });
              return formatedResponse;
          });
      }) as Promise<ISPListItems>;
    }
  }

  /**
   * @function
   * Gets the thumbnail picture url from the Picture name.
   * In SharePoint pictures libs, the thumbnail url is formated as for example '/_t/10_jpg.jpg'
   */
  private getThumbnailUrl(pictureUrl: string, pictureName: string): string {
    if (pictureUrl == null || pictureUrl == '')
      return '';
    var thumbUrl: string = '';
    thumbUrl = pictureUrl.replace(pictureName, '');
    thumbUrl += "_t/";
    thumbUrl += pictureName.replace(".", "_");
    thumbUrl += ".jpg";
    return thumbUrl;
  }

  /**
   * @function
   * Gets the pictures list from the mock. This function will return a
   * different list of pics for the lib 1 & 2, and an empty list for the third.
   */
  private getPicturesFromMock(libId: string): Promise<ISPListItems> {
       return MockHttpClient.getListsItems(this.context.pageContext.web.absoluteUrl).then(() => {
          var listData: ISPListItems = { value: []};
          if (libId == '1') {
            listData = {
                value:
                [
                    {
                      "ID": "1", "Title": "Barton Dam, Ann Arbor, Michigan", "Description": "",
                      "File":
                      {
                        "Name": "01.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/01.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/01.jpg"
                      }
                    },
                    {
                      "ID": "2", "Title": "Building Atlanta, Georgia", "Description": "",
                      "File":
                      {
                        "Name": "02.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/02.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/02.jpg"
                      }
                    },
                    {
                      "ID": "3", "Title": "Nice day for a swim", "Description": "",
                      "File":
                      {
                        "Name": "03.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/03.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/03.jpg"
                      }
                    },
                    {
                      "ID": "4", "Title": "The plants that never die", "Description": "",
                      "File":
                      {
                        "Name": "04.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/04.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/04.jpg"
                      }
                    },
                    {
                      "ID": "5", "Title": "Downtown Atlanta, Georgia", "Description": "",
                      "File":
                      {
                        "Name": "05.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/05.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/05.jpg"
                      }
                    },
                    {
                      "ID": "6", "Title": "Atlanta traffic", "Description": "",
                      "File":
                      {
                        "Name": "06.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/06.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/06.jpg"
                      }
                    },
                    {
                      "ID": "7", "Title": "A pathetic dog", "Description": "",
                      "File":
                      {
                        "Name": "07.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/07.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/07.jpg"
                      }
                    },
                    {
                      "ID": "8", "Title": "Two happy dogs", "Description": "",
                      "File":
                      {
                        "Name": "08.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/08.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/08.jpg"
                      }
                    },
                    {
                      "ID": "9", "Title": "Antigua, Guatemala", "Description": "",
                      "File":
                      {
                        "Name": "09.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/09.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/09.jpg"
                      }
                    },
                    {
                      "ID": "10", "Title": "Iximche, Guatemala", "Description": "",
                      "File":
                      {
                        "Name": "10.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/10.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/10.jpg"
                      }
                    }
                ]
            };
          }
          else if (libId == '2') {
            listData = {
                value:
                [
                    {
                      "ID": "11", "Title": "Barton Dam, Ann Arbor, Michigan", "Description": "",
                      "File":
                      {
                        "Name": "11.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/11.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/11.jpg"
                      }
                    },
                    {
                      "ID": "12", "Title": "Building Atlanta, Georgia", "Description": "",
                      "File":
                      {
                        "Name": "12.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/12.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/12.jpg"
                      }
                    },
                    {
                      "ID": "13", "Title": "Nice day for a swim", "Description": "",
                      "File":
                      {
                        "Name": "13.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/13.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/13.jpg"
                      }
                    },
                    {
                      "ID": "14", "Title": "The plants that never die", "Description": "",
                      "File":
                      {
                        "Name": "14.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/14.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/14.jpg"
                      }
                    },
                    {
                      "ID": "15", "Title": "Downtown Atlanta, Georgia", "Description": "",
                      "File":
                      {
                        "Name": "15.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/15.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/15.jpg"
                      }
                    },
                    {
                      "ID": "16", "Title": "Atlanta traffic", "Description": "",
                      "File":
                      {
                        "Name": "16.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/16.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/16.jpg"
                      }
                    },
                    {
                      "ID": "17", "Title": "A pathetic dog", "Description": "",
                      "File":
                      {
                        "Name": "17.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/17.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/17.jpg"
                      }
                    },
                    {
                      "ID": "18", "Title": "Two happy dogs", "Description": "",
                      "File":
                      {
                        "Name": "18.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/18.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/18.jpg"
                      }
                    },
                    {
                      "ID": "19", "Title": "Antigua, Guatemala", "Description": "",
                      "File":
                      {
                        "Name": "19.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/19.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/19.jpg"
                      }
                    },
                    {
                      "ID": "20", "Title": "Iximche, Guatemala", "Description": "",
                      "File":
                      {
                        "Name": "20.jpg",
                        "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/20.jpg",
                        "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/20.jpg"
                      }
                    }
                ]
            };
          }

          return listData;
      }) as Promise<ISPListItems>;
  }

}
