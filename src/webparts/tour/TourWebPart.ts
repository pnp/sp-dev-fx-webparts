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
import { PageContext } from '@microsoft/sp-page-context'; // load page context declaration


export interface ITourWebPartProps {
  description: string;
  actionValue: string;
  collectionData: any[];

}


export default class TourWebPart extends BaseClientSideWebPart<ITourWebPartProps> {

  private loadIndicator: boolean = true;
  private webpartList: any[] = new Array<any[]>();
  private updateConfig: () => void = () => { };

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
    description: this.properties.description,
    actionValue: this.properties.actionValue,
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
          var wp = { text: control.data.webPartData.title, key: control.data.webPartData.instanceId };
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

  protected onPropertyPaneConfigurationComplete() {
    //this.element.props.collectionData=this.properties.collectionData;
    //this.render();
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
                }),
                PropertyPaneTextField('actionValue', {
                  label: strings.ActionValueFieldLabel
                }),
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: "Collection data",
                  panelHeader: "Collection data panel header",
                  manageBtnLabel: "Manage collection data",
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "WebPart",
                      title: "WebPart",
                      type: CustomCollectionFieldType.dropdown,
                      options: this.webpartList,
                      required: true
                    },
                    {
                      id: "StepDescription",
                      title: "Step Description",
                      type: CustomCollectionFieldType.string,
                      required: true
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
