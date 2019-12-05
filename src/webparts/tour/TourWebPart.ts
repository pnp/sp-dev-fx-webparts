import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TourWebPartStrings';
import Tour from './components/Tour';
import { ITourProps } from './components/ITourProps';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { sp, ClientSidePage, ClientSideWebpart, IClientControlEmphasis } from '@pnp/sp';


export interface ITourWebPartProps {
  actionValue: string;
  description: string;
  collectionData: any[];

}


export default class TourWebPart extends BaseClientSideWebPart<ITourWebPartProps> {

  private loadIndicator: boolean = true;
  private webpartList: any[] = new Array<any[]>();

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }



  public render(): void {
    const element: React.ReactElement<ITourProps> = React.createElement(
      Tour,
      {
        actionValue: this.properties.actionValue,
        description: this.properties.description,
        collectionData: this.properties.collectionData,
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

  public async GetAllWebpart(): Promise<any[]> {
    // page file
    const file = sp.web.getFileByServerRelativePath(this.context.pageContext.site.serverRequestPath);

    const page = await ClientSidePage.fromFile(file);

    const wpData: any[] = [];

    page.sections.forEach(section => {
      section.columns.forEach(column => {
        column.controls.forEach(control => {
          var wpName = {}
          var wp = {};
          if (control.data.webPartData != undefined) {
            wpName = `sec[${section.order}] col[${column.order}] - ${control.data.webPartData.title}`;
            wp = { text: wpName, key: control.data.webPartData.instanceId };
            wpData.push(wp);
          } else {
            wpName = `sec[${section.order}] col[${column.order}] - "Webpart"`;
            wp = { text: wpName, key: control.data.id };
          }
          wpData.push(wp);

        });

      });
    });
    return wpData;
  }

  protected onPropertyPaneConfigurationStart(): void {
    var self = this;
    this.GetAllWebpart().then(res => {
      self.webpartList = res;
      self.loadIndicator = false;
      self.context.propertyPane.refresh();

    });
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
                PropertyPaneTextField('actionValue', {
                  label: strings.ActionValueFieldLabel
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: "Tour steps",
                  panelHeader: "Collection data panel header",
                  manageBtnLabel: "Configure tour steps",
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "WebPart",
                      title: "section[x] column[y] - WebPart Title",
                      type: CustomCollectionFieldType.dropdown,
                      options: this.webpartList,
                      required: true,
                    },
                    {
                      id: "StepDescription",
                      title: "Step Description",
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement("div", null,
                            React.createElement("textarea",
                              {
                                style: { width: "600px", height: "100px" },
                                placeholder: "Step description",
                                key: itemId,
                                value: value,
                                onChange: (event: React.FormEvent<HTMLTextAreaElement>) => {
                                  console.log(event);
                                  onUpdate(field.id, event.currentTarget.value);
                                }
                              })
                          )
                        );
                      }
                    },
                    {
                      id: "Position",
                      title: "Position",
                      type: CustomCollectionFieldType.number,
                      required: true
                    },
                    {
                      id: "Enabled",
                      title: "Enabled",
                      type: CustomCollectionFieldType.boolean,
                      defaultValue: true
                    }
                  ],
                  disabled: false
                })
              ]
            }
          ]
        }
      ],
      loadingIndicatorDelayTime: 5,
      showLoadingIndicator: this.loadIndicator
    };
  }
}
