import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-client-preview';

import styles from './ChartPart.module.scss';
import * as strings from 'chartPartStrings';
import { IChartPartWebPartProps } from './IChartPartWebPartProps';
import MockHttpClient from './MockHttpClient';
import { EnvironmentType } from '@microsoft/sp-client-base';
import * as chartistLib from 'chartist';
import * as moduleLoader from '@microsoft/sp-module-loader';

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

export interface ISPListData {
  value: Object[];
}

export default class ChartPartWebPart extends BaseClientSideWebPart<IChartPartWebPartProps> {

  private graphAspectRatios: Array<IPropertyPaneDropdownOption> = [
    {key: 'ct-perfect-fourth', text: 'Small'},
    {key: 'ct-golden-section', text: 'Large'},
    {key: 'ct-octave', text: 'Wide'},
    {key: 'ct-double-octave', text: 'Super Wide'}];

  private graphTypeOptions: Array<IPropertyPaneDropdownOption> = [
    {key: 'linegraph', text: 'Line'},
    {key: 'bargraph', text: 'Bar'},
    {key: 'piegraph', text: 'Pie'}
  ];

  private dataTypeOptions: Array<IPropertyPaneDropdownOption> = [
    {key: 'Level', text: 'Session Levels'},
    {key: 'Topic', text: 'Session Topics'},
    {key: 'Breakout_x0020_Session_x0020_Typ', text: 'Breakout Session Type'},
    {key: 'Start', text: 'Start Date'}
  ];

  public siteLists: Array<IPropertyPaneDropdownOption> = [];
  private currentList: Object = null;
  private currentListFields: Object[] = [];
  private currentListItems: ISPListData = {value: []};

  private sessionFieldData: chartistLib.IChartistData = {labels: [], series: []};
  private sessionFieldDataPercentages: chartistLib.IChartistData = {labels: [], series: []};
  private totalSessionsWithTargetField: number = 0;


  public constructor(context: IWebPartContext) {
    super(context);

    moduleLoader.default.loadCss('//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css');
    this._initializeLocalData();
  }

// This gets called after the constructor so we can load the lists from
  // SharePoint and be set up before the property pane can open and before
  // render is called for the first time.
  public onInit<T>(): Promise<T> {
    this._initializeDataAsync();

    return Promise.resolve();
  }

  // Reset all our local storage, we want to do this when we need to re-query
  // the server so we start clean.
  private _initializeLocalData(): void {
    this.currentList = null;
    this.currentListFields = null;
    this.currentListItems.value = [];
    this.sessionFieldData.labels = [];
    this.sessionFieldDataPercentages.labels = [];

    this.sessionFieldData.series = [];
    (this.sessionFieldData.series as number[][]).push([]);

    this.sessionFieldDataPercentages.series = [];

    this.totalSessionsWithTargetField = 0;
  }

  // First initialize the lists and then get the actual list data for the currently selected list.
  private _initializeDataAsync(): void {
    this._initializeListsAsync();
    if (this.siteLists.length > 0)
    {
      this._getListDataAsync(this.properties.selectedlist);
    }
  }

  // If we're in the local Workbench gets mock data, otherwise gets data from SharePoint
  private _initializeListsAsync(): void {
    // Local environment
    if (this.context.environment.type === EnvironmentType.Local)
    {
      this._getMockLists().then((response) => {
        response.value.forEach((item: ISPList) => {
            this.siteLists.push({ key: item.Id, text: item.Title });
          });
      });
    }
    else
    {
      const listPromise: Promise<any> = this._getLists();
      if (listPromise != null)
      {
        listPromise.then((response) => {
          response.value.forEach((item: ISPList) => {
            this.siteLists.push({ key: item.Id, text: item.Title });
          });
        });
      }
    }
  }

  // If we're in the local Workbench gets mock data, otherwise gets data from SharePoint
  private _getListItemDataAsync(whichList: string): void {
    if (this.context.environment.type === EnvironmentType.Local)
    {
      this._getMockListItems(whichList).then((itemsResponse) => {
        for (const item of itemsResponse.value)
        {
            this.currentListItems.value.push(item);
        }
        this._processSessionData();
        this.render();
      });
    }
    else
    {
      this._getListItems(whichList, this.properties.whichdata).then((itemsResponse) => {
        for (const item of itemsResponse.value)
        {
            this.currentListItems.value.push(item);
        }
        this._processSessionData();
        this.render();
      });
    }
  }

  // If we're in the local Workbench gets mock data, otherwise gets data from SharePoint
  private _getListDataAsync(whichList: string): void {
     // Local environment
    if (this.context.environment.type === EnvironmentType.Local) {
      this._getMockListFields().then((fieldResponse) => {
        this.currentListFields = fieldResponse['value'];

            // Check to make sure the current list has the field we want.
            if (this._listHasField(this.currentListFields, 'Breakout Session Type'))
            {
              this._getMockList().then((listResponse) => {
                this.currentList = listResponse;
                this._getListItemDataAsync(whichList);
              });
            }
            else {
              this.render();
            }
      }); }
    else {
      if (whichList != null && whichList != '')
      {
          this._getListFields(whichList).then((fieldResponse) => {
            this.currentListFields = fieldResponse['value'];

            // Check to make sure the current list has the field we want.
            if (this._listHasField(this.currentListFields, 'Breakout Session Type'))
            {
              this._getList(whichList).then((listResponse) => {
                this.currentList = listResponse;
                this._getListItemDataAsync(whichList);
              });
            }
            else {
              this.render();
            }
          });
      }
    }
  }

// Our data access methods, mocks return mock data and not-mocks return live data.
  private _getMockLists(): Promise<ISPLists> {
      return MockHttpClient.get(this.context.pageContext.web.absoluteUrl, 'listoflists').then((data: ISPList[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
  }

  private _getMockList(): Promise<any> {
      return MockHttpClient.get(this.context.pageContext.web.absoluteUrl, 'listdata').then((data: any) => {
        var listData: any = { value: data };
        return listData;
      }) as Promise<any>;
  }

  private _getMockListFields(): Promise<any> {
      return MockHttpClient.get(this.context.pageContext.web.absoluteUrl, 'listfields').then((data: any) => {
        var listFields: any = { value: data.value };
        return listFields;
      }) as Promise<any>;
  }

  private _getMockListItems(whichList: string): Promise<ISPListData> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl, 'listitemdata').then((data: ISPListData) => {
        var listData: ISPListData = { value: data.value };
        return listData;
      }) as Promise<ISPListData>;
  }


// #DEMO1
  private _getLists(): Promise<ISPLists> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`)
      .then((response: Response) => {
      return response.json();
      });
  }

  private _getList(whichList: string): Promise<any> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists(guid'` + whichList + `')`)
      .then((response: Response) => {
      return response.json();
    });
  }

  private _getListFields(whichList: string): Promise<any> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists(guid'` + whichList + `')/fields?$select=Title`)
      .then((response: Response) => {
      return response.json();
    });
  }

  private _getListItems(whichList: string, orderby: string): Promise<ISPListData> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists(guid'` + whichList + `')/items?$orderby=` + orderby + ` asc&$top=2000`)
      .then((response: Response) => {
      return response.json();
    });
  }

  public render(): void {
const chartClass: string = "ct-chart" + this.context.instanceId;

    let selectedDataTypeTitle: string = "";
    let chartHTML: string = "No data to graph, make sure you have a list with the proper schema selected.";

    if (this.currentList != null)
    {
      for (let i: number = 0; i < this.dataTypeOptions.length; i++)
      {
        if (this.dataTypeOptions[i].key == this.properties.whichdata)
        {
          selectedDataTypeTitle = this.dataTypeOptions[i].text;
          break;
        }
      }

      chartHTML = '<div class="' + chartClass + ' ' + this.properties.graphsize + '"></div>';
    }

    this.domElement.innerHTML = `
      <div class="${styles.chartPart}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <p class="ms-font-l ms-fontColor-white">${this.properties.description}</p>
              <p class="ms-font-l ms-fontColor-white">${selectedDataTypeTitle}</p>
            </div>
          </div>
          ${chartHTML}
        </div>
      </div>`;

// #DEMO2
    if (this.currentList != null)
    {
      if (this.properties.graphtype == 'linegraph')
      {
        const lineOptions: any = {
          // Don't draw the line chart points
          showPoint: true,
          // Disable line smoothing
          lineSmooth: false,
          // X-Axis specific configuration
          axisX: {
            // We can disable the grid for this axis
            showGrid: false,
            // and also don't show the label
            showLabel: true
          },
          // Y-Axis specific configuration
          axisY: {
            // Lets offset the chart a bit from the labels
            offset: 60
          }
        };

        let chartistLine: chartistLib.IChartistLineChart;
        chartistLine = new chartistLib.Line('.' + chartClass, this.sessionFieldData, lineOptions);
      }
      else if (this.properties.graphtype == 'bargraph')
      {
        let chartistBar: chartistLib.IChartistBarChart;
        chartistBar = new chartistLib.Bar('.' + chartClass, this.sessionFieldData);
      }
      else if (this.properties.graphtype == 'piegraph')
      {
        let chartistPie: chartistLib.IChartistPieChart;
        chartistPie = new chartistLib.Pie('.' + chartClass, this.sessionFieldDataPercentages);
      }
    }
  }

  // Property panel methods
  protected onPropertyChange(propertyPath: string, newValue: any): void {
    if (propertyPath == 'selectedlist')
    {
      this._initializeLocalData();
      this._getListDataAsync(newValue as string);
    }
    else if (propertyPath == 'whichdata')
    {
      this._initializeLocalData();
      this._getListDataAsync(this.properties.selectedlist);
    }

    super.onPropertyChange(propertyPath, newValue);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
                PropertyPaneDropdown('selectedlist', {
                  label: 'Selected List',
                  options: this.siteLists
                }),
                PropertyPaneDropdown('whichdata', {
                  label: 'What kind of data',
                  options: this.dataTypeOptions
                }),
                PropertyPaneDropdown('graphtype', {
                  label: 'Graph Type',
                  options: this.graphTypeOptions
                }),
                PropertyPaneDropdown('graphsize', {
                  label: 'Graph Aspect Ratio (Height:Width)',
                  options: this.graphAspectRatios
                })
              ]
            }
          ]
        }
      ]
    };
  }

  // Additional business logic methods
  private _getFieldDataFromListItem(listItem: Object, itemField: string): string {
    let listItemFieldValue: string = '';
    if (listItem.hasOwnProperty(itemField) && listItem[itemField] != null)
    {
      listItemFieldValue = listItem[itemField];
    }

    return (listItemFieldValue);
  }

  private _isFieldRecorded(fieldValue: string): number {
    let hasSession: number = -1;

    for (let i: number = 0; i < this.sessionFieldData.labels.length; i++)
    {
      if (this.sessionFieldData.labels[i] == fieldValue)
      {
        hasSession = i;
        break;
      }
    }

    return (hasSession);
  }

  private _processSessionData(): void {
    // Do we have any items?
    if (this.currentListItems.value.length > 0)
    {
      for (const listItem of this.currentListItems.value)
      {
        let currentValue: string = this._getFieldDataFromListItem(listItem, this.properties.whichdata);

        // If we have a DateTime column, convert it to a real datetime object so we can get the right representation.
        if (this.properties.whichdata == 'Start')
        {
          const tempDateTime: Date = new Date(currentValue);

          if (tempDateTime.toDateString() != 'Invalid Date')
          {
            currentValue = tempDateTime.toLocaleDateString();
          }
          else
          {
            currentValue = '';
          }
        }

        let valueIndex: number = this._isFieldRecorded(currentValue);
        if (valueIndex < 0 && currentValue != '')
        {
          (this.sessionFieldData.labels as string[]).push(currentValue);
          (this.sessionFieldData.series[0] as number[]).push(0);

          (this.sessionFieldDataPercentages.labels as string[]).push(currentValue);
          (this.sessionFieldDataPercentages.series as number[]).push(0);

          valueIndex = this.sessionFieldData.labels.length - 1;
        }

        if (valueIndex >= 0)
        {
          this.sessionFieldData.series[0][valueIndex]++;
          (this.sessionFieldDataPercentages.series as number[])[valueIndex]++;
          this.totalSessionsWithTargetField++;
        }
      }
    }
  }

  private _listHasField(fieldArray: Object[], whichField: string): boolean {
    let hasLevel: boolean = false;

    for (let i: number = 0; i < fieldArray.length; i++)
    {
      if (fieldArray[i]['Title'] == whichField)
      {
        hasLevel = true;
        break;
      }
    }

    return (hasLevel);
  }
}
