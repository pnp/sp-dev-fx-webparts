import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup

} from "@microsoft/sp-property-pane";


import * as strings from 'BirthdaysWebPartStrings';
import Birthdays from './components/Birthdays';
import { IBirthdaysProps } from './components/IBirthdaysProps';
import { Version } from '@microsoft/sp-core-library';

export interface IBirthdaysWebPartProps {
  title: string;
  numberUpcomingDays: number;
  template: any;
}


const imageTemplate: { imageUrl: string }[] = [{
  imageUrl: require('.../../../assets/cof.svg')
},
{
  imageUrl: require('.../../../assets/cof5.svg')
},
{
  imageUrl: require('.../../../assets/cof1.svg')
},
{
  imageUrl: require('.../../../assets/cof3.svg')
},
{
  imageUrl: require('.../../../assets/cof8.svg')
},
{
  imageUrl: require('.../../../assets/ballons.svg')
},
{
  imageUrl: require('.../../../assets/cof2.svg')
},
{
  imageUrl: require('.../../../assets/cof10.svg')
},
{
  imageUrl: require('.../../../assets/cof11.svg')
},
{
  imageUrl: require('.../../../assets/cof12.svg')
},
{
  imageUrl: require('.../../../assets/cof14.svg')
},
{
  imageUrl: require('.../../../assets/cof14_1.svg')
},
{
  imageUrl: require('.../../../assets/cof18.svg')
},
{
  imageUrl: require('.../../../assets/cof17.svg')
},
{
  imageUrl: require('.../../../assets/cof19.svg')
},
{
  imageUrl: require('.../../../assets/cof20.svg')
},
{
  imageUrl: require('.../../../assets/cof22.svg')
},
{
  imageUrl: require('.../../../assets/cof24.svg')
},
{
  imageUrl: require('.../../../assets/cof28.svg')
},
{
  imageUrl: require('.../../../assets/cof29.svg')
},
{
  imageUrl: require('.../../../assets/cof30.svg')
},
];

export default class BirthdaysWebPart extends BaseClientSideWebPart<IBirthdaysWebPartProps> {


  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
      // other init code may be present
    });
  }

  public render(): void {
    const element: React.ReactElement<IBirthdaysProps> = React.createElement(
      Birthdays,
      {
        title: this.properties.title,
        numberUpcomingDays: this.properties.numberUpcomingDays,
        context: this.context,
        displayMode: this.displayMode,
        imageTemplate: this.properties.template,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneTextField('title', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldNumber("numberUpcomingDays", {
                  key: "numberUpcomingDays",
                  label: strings.NumberUpComingDaysLabel,
                  description: strings.NumberUpComingDaysLabel,
                  value: this.properties.numberUpcomingDays,
                  maxValue: 10,
                  minValue: 1,
                  disabled: false
                }),
                PropertyPaneChoiceGroup('template', {
                  label: 'Background Image',
                  options: imageTemplate.map((image, i) => {
                    return (
                      {
                        text: `Image ${i}`, key: i,
                        imageSrc: image.imageUrl,
                        imageSize: { width: 80, height: 80 },
                        selectedImageSrc: image.imageUrl
                      }
                    );
                  })
                }
                )
              ]
            }
          ]
        }
      ]
    };
  }
}
