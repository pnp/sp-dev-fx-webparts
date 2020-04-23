import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'OrgChartWebPartStrings';

// Importing Vue.js
import Vue from 'vue';
// Improting Vue.js SFC
import OrgChartComponent from './components/OrgChart.vue';

import OfficeUIFabricVue from 'office-ui-fabric-vue';

  // import css style
  import 'office-ui-fabric-vue/dist/index.css';
  import OrgChartService from './services/OrgChartService';
  import { setup as pnpSetup } from "@pnp/common";

export interface IOrgChartWebPartProps {
  description: string;
}

export default class OrgChartWebPart extends BaseClientSideWebPart<IOrgChartWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
      pnpSetup({spfxContext: this.context});
    });
  }
  
  public render(): void {
    const id: string = `wp-${this.instanceId}`;
    this.domElement.innerHTML = `<div id="${id}"></div>`;

    Vue.use(OfficeUIFabricVue);

    let el = new Vue({
      el: `#${id}`,
      render: h => h(OrgChartComponent, {
        props: {
          spService: OrgChartService
        }
      })
    });
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
}
