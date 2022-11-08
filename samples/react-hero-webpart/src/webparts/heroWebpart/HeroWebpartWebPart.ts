import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'HeroWebpartWebPartStrings';
import HeroWebpart from './components/HeroWebpart';
import { IHeroWebpartProps } from './components/IHeroWebpartProps';

import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';

import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import { FilePicker } from '@pnp/spfx-controls-react/lib/FilePicker';
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { DisplayMode } from '@microsoft/sp-core-library';  

export interface IHeroWebpartWebPartProps {
  title: string;
  isPaginated: boolean;
  hideFirstPageJump: boolean;
  hideLastPageJump: boolean;
  showAllHero: boolean;
  showCollage: boolean;
  collectionData: any[];
  filePickerResult: IFilePickerResult;
  pageLimit:number;
  displayMode: DisplayMode;
}

export default class HeroWebpartWebPart extends BaseClientSideWebPart<IHeroWebpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHeroWebpartProps> = React.createElement(
      HeroWebpart,
      {
        title: this.properties.title,
        isPaginated:this.properties.isPaginated,
        hideFirstPageJump:this.properties.hideFirstPageJump,
        hideLastPageJump:this.properties.hideLastPageJump,
        spfxContext: this.context,
        showAllHero: this.properties.showAllHero?this.properties.showAllHero:false,
        showCollage: this.properties.showCollage?this.properties.showCollage:false,
        pageLimit:5,
        items:this.properties.collectionData?this.properties.collectionData:[],
        displayMode: this.displayMode,
      }
    );

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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneWebPartInformation({
                  description: `<span>Author: <ul style="list-style-type: none;padding: 0;"><li>Omar El-Anis <a href="https://www.spdeveloper.co.uk" target="_blank"><img width="16px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAABmJLR0QA/wD/AP+gvaeTAAAPDElEQVR4nO2deXBcR53Hv93vzamR5ZE0si7Llizb8ZEsieMYlxUCCS6SJQ4kwakCqqjaOBuDOYorkKJI4draXTCEImQXQg6OYhMIdhEqhBBDCLYr2OAshODYia/IliPLkkbXaM53de8fsrSSZkbz5r2epxn7fVyucb2j++f5zq/717/u1w9wcXFxcXFxmQ+IiEKav/TsSpmQf+IgrX7Zs9gnYykHpyLKvlzQGc6mFOMcOO8llB89t+u2YyLKtSxwyxef21jtlz7PQW6ur/Z6OupD0uK6oFQX9JAFfg8oEfLbuSzg4IhldIwkVd47kjK6hxJGNKbokOlLCUX7Tu83tuy3WnbRKrTe9+sbagLex6v90pI71rV5blwZIVU+2Wr9LnlIqQb2nxzAr149rw4llL6EZvyLFaFNC9y887lgjSH/T8Ar3frpG5d7r10SLrYuF4u8dm4MD+87pSYz+r4xSb+jb+eWlNl7TQnc/oXnl/iC9M9dy+oW3fOuDuqR3O7VaRjj+NHBHvbHEwN9cVXf1Ldryzkz9xUUuO3+33T4JPLax2/oDHV11rsd6zxz6K0h/uiB7mRc1Taf/+Ztfyl0/ZyCLfviMw2SP/Dmx29YFr5uadgVt0x4sz+Ob+09nlQU/cqeB287M9e1+UXbuZNeYWx47QNXt6y9eXWjK26Zcah7CD891BPVNHl5967NsXzX5Q1/l6nXfrItUnXFTSsbiGaw0ljpYpn1S2rx9nC6bv/JwacA3Jrvupye2fHlF2skWe372pa1wXDQUzIjXexhMI6v/vqoMjyuvuf8g1v+nOuanB5Mqfal9e21vpBPguu95c1H17f5fnjwzC+wdXc79txlzD6fLfDW3RII//R7VjRIusEdMdLFOssiITQt8EcyHcY/nwOem30+S+DWZYHrIwt8cpVPhup6b0WwqTPi7x9P3wczAgc88u1XtSz060y89wa9ErwyhUQIdMah6AwZLatVcSmS5Y0hMI71S+97vvHst97fP/1clsCU883NNX6i6WK8N+iVsLq5Bu31QVT7swO2aFxBdzSB4/1xGCX4UV0urGpcIL16buxWAE9MP54lsM54a03QA43ZF/iatjCubgtDpvmH0ZFqHyLVPqxtqcGBU1G8PWI6zeoyjfZIyHN8IH47CglsMO6TCIWmW/cmSghuXtuIjkiV6XuqfDJuWdOEAyejOHo+77jdJQ+RkA/g/JrZx2cKvHW3RAlsD43evbKhKHEnIQR414p6DCUU15OLxO+h0AyEAU4AMuWdMwVeEyFQUtxO89waDuDqtoWW76eE4L2rFuGJP3WDcbdPLgZCAOzcL2En9MljORMddprndW21lu+dZGHQg476EN68MG67rMud3AJb9GCfTNHZELJl0CRXNFXjyPkxIWVdzmQJzDmH1SHS4nAQ0hwRczEsqQ1atuNyhefo0nJ6sNUkh8i1WVU+GYQQNxduk5yKWE1RzjXetYJECZKqK7AdcnuwxUmG8Yxmy5jpcACxtOZmt2ySLTAh3Gqz2B/L2LVnitGk6uapi4WQLG/IDrJgPdHRPZRAPKOj2m+/Lz7aF3P73yLJ1dZlK8HtZbJeOTOMm1Ytsnz/JIdOD7kCF0sOhXO4GodmY6L/mb+fR9fyCHyy9bXTR8/H8I9eNx9dPCaHSXY8Z2A8g+/vO43PbV5h6f7RlIqHXjrpeq8ghEbRkxw4GcWiBX58eENbUQ8/jaZUfOOF4xiKq7bqd/l/cgZZIpbqPHm4BycH4rjn+g60hgNzXss5cOBUFD/8UzeGE664VjEXZAHQBTWPh94awuEzw9jYUYeu5RGsaV6AcNALr0wxltIQjWdw+MwI9p8YxDl3erAk5ImixSUXNINj34ko9p2ICivTJQ/momj7E/4u5UOOPphbzmS5zC8c2dNJeTzYzf9eKrhN9CVOziDLfWSlQjETZIkaB1+KeCSKK1tqcFVrDepCPtSHvAj5ZOiMYzyt4UIsg7dHUjjSG8Pbo84P+8yPg22squxsCOG6pfYW3jEOPP2/hbegcKIuSghuWtWAj21cig3tdaZz7H2xNF54vR+/fLUXx/rmL6+eU2A7q1U3tNfhP2+/0noBmOgifv5KYYHXL6nF1++4yl5dLH9dN17RgK9tWYP2+uLXeDfXBLCtqx3butpx4GQUD/7uBP7R6/wiwore4KpUiz2qvDL+/YNrcee6ViHl3bAigq7Oevzk0Fns2nvc0YUMFb0fUikWxreGg3j2U5uEiTuJRAm2dbXj2U9uQms4KLTsuahogQ3BAjfW+LF7+zuxYlG10HKns6ppAfZs34jFtc6IXNECc4FtdLVfxpPbNjjiXS3hAHZv34hIta/kdVW0wCL74G9vfUdJPXc2LQsDePxj16LUuwZWtMCimugPvqMFN69tFFJWMVzTFsbdm9pLWkdFCywiyKIEeODW1QKsscZnNy9HU42/ZOVXtMAiHJgS4khfmI8qr4zPb14ppCyupoewf+axWQIfgDbcq7F0HJzpKHculeeH77ymFS0L517WlBfOwDIJ6LFB6PGhCN59YMbpHB7MvSw9DmNsAMZ4FExJinGVEiBgG5GyQJYIPlTUuJuDq2kY8SHooxfAUjHAyP3Y0JxNNNdVsOQY9LF+GKkYuO4uiCsVH1q3GIXegsB1FSw9Dn1sAEZiBFxTCpZrLlXJGXgmASOTACgF8fhBPX4Qjx8FrXIxxZK6IFY31cyamODgmgKmpsG1jKUmq/hcNGPgSgqGkpomdgDE47ukxO6PZfDk4R68+MYAzg4lkdYMRKp9aKsN4n1rGnH71S1YtEBs9Hv98noc6xsD15QpYcHs5a3tTTZMFxsAkb1Ij9cglUohEAiAVKDgBuN4+I+n8L19p6HO2mEgGlcQjSv4W88ovvuHU3hgy2p85Lo2W/VxzpFOp5FKpdAZzEAf6bNV3myEziZxXUU6EUNvby8opQgGgwgEAggEAvD5fGUvuG5w7PjZ37D3aH/Ba5Oqjvt/eQRp1cC2ruKSFYqiIJPJTAmr6xMjlvaw15Ldc1Gy6ULGGBKJBBKJBACAEAK/3w+/349AIAC/3w9ZLq/ZygeePWpK3On8x/NvXNzRL/fWUYwxZDKZKUHT6TRYnr60JuBBXciH4UTh4Mksjn3Dk01ROp3G6OjoROWyDK/XC5/PN+PT7Nt+RDYIv3+jH08d7in6Pp1x7Np7HE/f+05omgZFUaAoClRVnfoshvb6qsoUOBe6rkPXdaRSM9cvUSrDSAwDVAahFITKAJVAqARQSbwdjOPfnnuj8IWcgzMDYPrFTwPc0PHy36P47UEfOi3s7jebesFZtfJqIy+iaRq4OrEdRFaKhZAJsQlFclTChQsXIEnS1F9KKQghIISA0olh/uTndCabSc459r7eh57+YXDOAM4mgsfJf3MOzhjAjTmHKS+fjIoROCS2H84tsJ227+KXawdCCtjADHAY0NXMVB9vh9/99QSM5KhJw3Lz155R3F1ksJWLcNDGcNPss0l2Xko6oY0AgU3YIKIuADh2YdxUfXNxdjgpxBa/V7Jty3SEezChNGeTWAycc1M2iKgLAIYSqu2ILakyjKV11FbZa2L9Hllo9Ci+iYYDTbTAugAgrTEhX+pISkNdyF6Q5JWpAwLbaaJF9cFmmmhqvy6DcUwkrOx/qYpmCPi/UyG2TJLHg22USAT0i8ScDUL6YJN1mSGjcwECE5H65trpDpyUgQebssHJukzAISDAvPjHUv0kO46u6D5YWHcgrM8TYQ9xog+2jrg+2NSVDtZlpiwBQZ/gCZk8Hmx96EGI/aEL5dyUDdOzVZbrgrm6TJUlYNhGKRVmD1CKVKWAIMvs7c62FuYKExL0CUR8osPBfpFczDs7UZe5sgT83+FIH1wGQZapVKVzdZkrS1CQVdapSicjW1HdgSgPFpFZcyKKtlW8sLGpmeucq8tsYSI8WGQ3LN6DHRwHU3IJ9sHOjINtVCAsinYmF112fbDI3ClK0geLGgeb8WBR42BBAlP79hDqxGxSua/omI+6zJTlpirNlmHuOmF9sCDEpCrF2DJJCSYbnBu6lNtkQ8UEWZUyXUgEBXTCBiaCgiyRA6USRNHORbbUwbrMlVURmSx7TYSTUbSQugRG0SJmk+xF0dn3VXaqsswmG8Tk4cs8inZ0ulBYokMMQqJowWF0ZacqUWaTDZUSRVdKkCVsPlhYkCXiB+dIqtJ6geL64MLXCYuihXXBghIdAltp4eNgMYGGWRvKa9msqCa69OPgComiqagg67LLRdsU2LnZpPIaB4t4GI6QMn82ydkgy81kFWLmz+3Yai609BJTMYY6B7mo4RQzBd5zl0HKc1tKlwJwzgAQBXvumrFzWvaLsSjS4MxvdXX9X7qHcf8zR6xZOWmDyR/ZK2dHHKvLDD8+eAZ7j12wVYbl9ygbOgghp2cfzhKYgHZzQ19HZGtPqp8eTOD0oP19M8qtLjPsOzE4b3UzPaODGS/MPp7lpgZjLzFdLf/Nol1mwNPJBGHsV7OPZwlMCV6Akow7Y5aLCLiugoMN9/34U6/OPpclcH+s7mVm6NzuLqcuzmFkkgkw46Fc57IjqT13GQB52EjH0yW3zMU23NDA1aSmZoyf5jqfM1RWKB5iakLjhuvF5Y4RH4lzgh0jT31mPNf5nAKPPrY9Rjn/ipEYTpbWPBc7sEyCgRuvDzz+iafzXZN3sNvXOvgI19UjLB3L/bYHl3mFaxlupMaGNEPdOtd1c2b7mu99tJ4z9poUqm0i3mBFv2PpUoLrGvTxwTgD6xp8YsecmZ45Ret7bPsQ19GlJ0ZGDCXljo3LAK5luD4+GGPAnYXEBUzm65u2/fcSTqSXqK+qWapaGHDT/PODkYpljHR8hBN+ixlxgSKUar730aDB+KME5ANSqDZEvX5XZYdgWgYsOTrODeOg18s/eu6RHSb2Pp6gaJEa//V76wHpByB0mRSorqbeIBW57Y/LRTgHU1KcZ+LjjOl9YPwL/T/akZVrLoRlL2y4+wcbCcEOSvgtkGRKJI8E6qkilEpuC24BDnDGDBhaCoamM6YDIC8C/JH+Jz6x32qxQqRYdM9/tYPTtRToNIjUJBGIfz/MJQ7hXOeM9xGCbl2SXh98bPtb822Ti4uLi4uLi3X+D+tOrAMpv7yYAAAAAElFTkSuQmCC"/></a> </ul></span>`,
                  key: 'authors'
                }),
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: "Collection data",
                  panelHeader: "Collection data panel header",
                  manageBtnLabel: "Manage collection data",
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "Title",
                      title: "Item Title",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "Description",
                      title: "Item Description",
                      type: CustomCollectionFieldType.string
                    },
                    {
                      id: "Hyperlink",
                      title: "Link to Open",
                      type: CustomCollectionFieldType.url,
                      required: true
                    },
                    {
                      id: "filePicker",
                      title: "Select File",
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                        return (
                          React.createElement(FilePicker, { 
                            key: itemId,
                            context: this.context,
                            buttonLabel:"Select File",                            
                            onChange: (selectedFile: IFilePickerResult[]) => {
                              onUpdate(field.id, selectedFile);
                              return Event;
                            },
                            onSave: (filePickerResult: IFilePickerResult[]) => {
                            // write code to save file to SharePoint doc library
                            // if you are uploading the file via the upload tab which I've not implemented here
                            onUpdate(field.id, filePickerResult);
                            return Event;
                            },
                            hideLocalUploadTab: true,
                            hideLocalMultipleUploadTab: true,
                            hideLinkUploadTab: true
                          })
                        );
                      },
                      required: true
                     }
                  ],
                  disabled: false
                }),
                PropertyFieldToggleWithCallout('showCollage', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'showCollage',
                  label: 'Show collage of all images?',
                  calloutContent: React.createElement('p', {}, 'Enabling this will show all images in a collage view'),
                  onText: 'ON',
                  offText: 'OFF',
                  checked: this.properties.showCollage,
                }),
                PropertyFieldToggleWithCallout('showAllHero', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'showAllHeroFieldId',
                  label: 'Show all images in Hero view?',
                  calloutContent: React.createElement('p', {}, 'Enabling this will show all images in the Hero view'),
                  onText: 'ON',
                  offText: 'OFF',
                  checked: this.properties.showAllHero,
                }),
                PropertyFieldToggleWithCallout('hideFirstPageJump', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'hideFirstPageJumpdFieldId',
                  label: 'Hide first page jump?',
                  calloutContent: React.createElement('p', {}, 'Hides the << page jump icon in the pagination section'),
                  onText: 'ON',
                  offText: 'OFF',
                  checked: this.properties.hideFirstPageJump,
                  disabled: !this.properties.showAllHero
                }),
                PropertyFieldToggleWithCallout('hideLastPageJump', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'hideLastPageJumpFieldId',
                  label: 'Hide last page jump?',
                  calloutContent: React.createElement('p', {}, 'Hides the >> page jump icon in the pagination section'),
                  onText: 'ON',
                  offText: 'OFF',
                  checked: this.properties.hideLastPageJump,
                  disabled: !this.properties.showAllHero
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
