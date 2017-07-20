import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ItRequests.module.scss';
import * as strings from 'itRequestsStrings';
import { IItRequestsWebPartProps } from './IItRequestsWebPartProps';

import * as $ from 'jquery';
import 'datatables.net';
import 'moment';
import './moment-plugin';

interface IRequestItem {
  ID: number;
  BusinessUnit: string;
  Category: string;
  Status: string;
  DueDate: string;
  AssignedTo: { Title: string; };
}

export default class ItRequestsWebPart extends BaseClientSideWebPart<IItRequestsWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" />
      <table class="display ${styles.helloWorld}" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>Business unit</th>
                <th>Category</th>
                <th>Status</th>
                <th>Due date</th>
                <th>Assigned to</th>
            </tr>
        </thead>
      </table>`;

    $('table', this.domElement).DataTable({
      'ajax': {
        'url': `../../_api/web/lists/getbytitle('${escape(this.properties.listName)}')/items?$select=ID,BusinessUnit,Category,Status,DueDate,AssignedTo/Title&$expand=AssignedTo/Title`,
        'headers': { 'Accept': 'application/json;odata=nometadata' },
        'dataSrc': (data: { value: IRequestItem[] }): any[][] => {
          return data.value.map((item: IRequestItem): any[] => {
            return [
              item.ID,
              item.BusinessUnit,
              item.Category,
              item.Status,
              new Date(item.DueDate),
              item.AssignedTo.Title
            ];
          });
        }
      },
      columnDefs: [{
        targets: 4,
        render: ($.fn.DataTable as any).render.moment('YYYY/MM/DD')
      }]
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
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
}
