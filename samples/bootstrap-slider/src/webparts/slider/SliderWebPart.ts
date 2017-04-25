import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './Slider.module.scss';
import * as strings from 'sliderStrings';
import { ISliderWebPartProps } from './ISliderWebPartProps';

import 'jquery';
import 'bootstrap';

export interface ISlides{
  value: ISlide[];
}

export interface ISlide {
  ID: number;
  Title: string;
}

export interface ISlideItem {
  SPFxSliderImage: string;
}

export interface IItemGuid {
  value: string;
}

export interface slides {
  Title: string;
  Url: string;
}

export default class SliderWebPart extends BaseClientSideWebPart<ISliderWebPartProps> {
  private _slides: slides[] = [];

  public constructor(context: IWebPartContext) {
    super();

    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
  }

  public render(): void {

 /*
    this.domElement.innerHTML = `
      <div class="${styles.helloWorld}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;*/
      this._getSlides()
      .then((response: ISlides): void => {
        // get slider images
        response.value.forEach((slide: ISlide): void => {
          this._getImage(slide.ID)
          .then((data: ISlideItem): void => {
            // get the image out of the FieldValuesAsHtml
            let div = document.createElement('div');
            div.innerHTML = data.SPFxSliderImage;
            let img: HTMLImageElement = div.firstChild as HTMLImageElement;
            
            // need to do string split inorder to make the url relative
            const imgUrl: string = img.src.split(this.context.pageContext.web.serverRelativeUrl)[1];
            const item: slides = {
              Title: slide.Title,
              Url: `${this.context.pageContext.web.absoluteUrl}/_layouts/15/getpreview.ashx?resolution=2&path=${this.context.pageContext.web.serverRelativeUrl}${imgUrl}&clientType=modernWebPart`
            };
            this._slides.push(item);
          })
          .then((): void => {
            this.domElement.innerHTML = `
            <div class="container">
              <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <ol class="carousel-indicators"></ol>
                <!-- Wrapper For Slides -->
                <div class="carousel-inner" role="listbox"></div>
                <!-- Side Controls -->
                <a class="carousel-control left" href="#myCarousel" data-slide="prev"></a>
                <a class="carousel-control right" href="#myCarousel" data-slide="next"></a>
              </div>
            </div>`;

            // add carousel items to domElement
            if (this._slides.length > 0){
              this._slides.forEach((item: slides, index: number): void =>{
                jQuery('.carousel-indicators', this.domElement).append(this._itemCarouselIndicators(index));
                jQuery('.carousel-inner', this.domElement).append(this._itemSlideWrapper(item, index));
              });
            }

            // initialize the slider
            jQuery('#myCarousel').carousel({
              interval: 7000
            });
          });
        //console.log(img.src);
        });
      });
  }

  public onInit<T>(): Promise<T> {
    // get slider items
    /*this._getSlides()
      .then((response: ISlides): void => {
        // get slider images
        response.value.forEach((slide: ISlide): void => {
          this._getImage(slide.ID)
          .then((data: ISlideItem): void => {
            // get the image out of the FieldValuesAsHtml
            let div = document.createElement('div');
            div.innerHTML = data.SPFxSliderImage;
            let img: HTMLImageElement = div.firstChild as HTMLImageElement;
            
            // need to do string split inorder to make the url relative
            this._getImageUrl(img.src.split(this.context.pageContext.web.serverRelativeUrl)[1])
              .then((imgGuid: string) => {
                const item: slides = {
                  Title: slide.Title,
                  Url: `${this.context.pageContext.web.absoluteUrl}/_layouts/15/getpreview.ashx?
                  resolution=4&guidSite=${this.context.pageContext.site.id}
                  &guidWeb=${this.context.pageContext.web.id}
                  &guidFile=${imgGuid}
                  &clientType=modernWebPart`
                };

                this._slides.push(item);
              });
            //console.log(img.src);
          });
        });
      });*/
    return Promise.resolve();
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
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _getSlides(): Promise<ISlides> {
    return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('SPFx List')/items?$orderBy=SPFxOrder asc`,
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getImage(id: number): Promise<ISlideItem>{
    return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('SPFx List')/items('${id}')/FieldValuesAsHtml`,
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getImageUrl(url: string): Promise<string> {
   return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/GetFileByServerRelativeUrl('${this.context.pageContext.web.serverRelativeUrl}${url}')/ListItemAllFields/ServerRelatveUrl`,
    SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((item: IItemGuid) => {
        return item.value;
      });
  }

  private _itemCarouselIndicators(index: number): string {
    if (index == 0){
      return `<li data-target="#myCarousel" data-slide-to="${index}" class="active"></li>`;
    }
    else {
      return `<li data-target="#myCarousel" data-slide-to="${index}" class=""></li>`;
    }
  }

  private _itemSlideWrapper(item: slides, index: number): string {
    if (index == 0){
      return `
      <div class="item active">
        <img src="${item.Url}" class="img-responsive">
      </div>`;
    }
    else {
      return `
      <div class="item">
        <img src="${item.Url}" class="img-responsive">
      </div>`;
    }
  }
}
