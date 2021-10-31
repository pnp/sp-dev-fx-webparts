import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ODataVersion, ISPHttpClientConfiguration } from '@microsoft/sp-http';

import * as strings from 'NewsGlanceWebPartStrings';
import NewsGlanceLarge from './components/NewsGlanceLarge';
import { IArticle, INewsGlanceLargeProps, INewsGlanceSmallProps } from '../../interfaces';
import { getSP } from '../../pnpjs';
import NewsGlanceSmall from './components/NewsGlanceSmall';

export interface INewsGlanceWebPartProps {
  showImage: boolean;
  numberOfSentences: number;
  showStaticContent: boolean;
  firstContent: string;
  secondContent: string;
  thirdContent: string;
}

export default class NewsGlanceWebPart extends BaseClientSideWebPart<INewsGlanceWebPartProps> {

  private imageUrl: string = "";
  private sentences: string[] = [];
  
  private async loadDetails(): Promise<void> {

    const spHttpClient: SPHttpClient = this.context.spHttpClient;
    const currentWebUrl: string = this.context.pageContext.web.absoluteUrl;

    const response = await spHttpClient.get(
      `${currentWebUrl}/_api/web/lists/getbytitle('Site Pages')/items(${this.context.pageContext.listItem.id})?$select=Title,BannerImageUrl,FileRef,CanvasContent1`,
      SPHttpClient.configurations.v1);

    const currentPageDetails = await response.json();

    const article: IArticle = {
      content: currentPageDetails.CanvasContent1,
      imageUrl: currentPageDetails.BannerImageUrl.Url,
      link: currentPageDetails.FileRef,
      title: currentPageDetails.Title
    };

    this.imageUrl = article.imageUrl;

    if(this.properties.showStaticContent) {

      this.sentences = [
        this.properties.firstContent,
        this.properties.secondContent,
        this.properties.thirdContent
      ];

      return;
    }

    //remove html tags
    let articleContent = article.content.replace(/(<([^>]+)>)/gi, "");

    //remove any GUIDs
    articleContent = articleContent.replace(/(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/g, "");

    let articleContentSentences: string[] = articleContent.match(/([^ \r\n][^!?\.\r\n]+[\w!?\.]+)/g);
    this.sentences = articleContentSentences?.slice(0, this.properties.numberOfSentences);
  }
  

  public async render(): Promise<void> {
    await this.loadDetails();
    
    let element: any;

    if (this.width < 400) {
      this.sentences = this.sentences.map(sentence => {
        return sentence.length > 100 ? `${sentence.slice(0, 100)}...` : sentence;
      });

      element = React.createElement(
        NewsGlanceSmall,
        {
          showImage: this.properties.showImage,
          imageUrl: this.imageUrl,
          sentences: this.sentences
        }
      );
    } else {
      element = React.createElement(
        NewsGlanceLarge,
        {
          showImage: this.properties.showImage,
          imageUrl: this.imageUrl,
          sentences: this.sentences
        }
      );
    }

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Properties"
          },
          groups: [
            {
              groupName: "Settings",
              groupFields: [
                PropertyPaneToggle('showImage', {
                  label: "Show image"
                }),
                PropertyPaneTextField('numberOfSentences', {
                  label: "Number of sentences to get",
                  disabled: this.properties.showStaticContent
                }),
                PropertyPaneToggle('showStaticContent', {
                  label: "Show static content"
                }),
                PropertyPaneTextField('firstContent', {
                  label: "First summary sentence",
                  multiline: true,
                  disabled: !this.properties.showStaticContent
                }),
                PropertyPaneTextField('secondContent', {
                  label: "Second summary sentence",
                  multiline: true,
                  disabled: !this.properties.showStaticContent
                }),
                PropertyPaneTextField('thirdContent', {
                  label: "Third summary sentence",
                  multiline: true,
                  disabled: !this.properties.showStaticContent
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
