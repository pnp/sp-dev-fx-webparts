/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { cloneDeep } from '@microsoft/sp-lodash-subset';

//import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls';

import * as strings from 'KanbanBoardWebPartStrings';
import { spfi, SPFx } from "@pnp/sp";

import PropertyPaneBucketConfigComponent from './components/PropertyPaneBucketConfig';
import KanbanBoardV2, { IKanbanBoardV2Props } from './components/KanbanBoardV2';

import { bucketOrder } from './components/bucketOrder';
import { PropertyFieldOrder } from './components/PropertyOrderField/PropertyFieldOrder';


import { mergeBucketsWithChoices } from './components/helper';

import { IKanbanBucket } from '../../kanban';

import { ISPKanbanService } from './services/ISPKanbanService';
import SPKanbanService from './services/SPKanbanService';
import MockKanbanService from './services/MockKanbanService';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from './components/PropertyListPicker';

export interface IKanbanBoardWebPartProps {
  hideWPTitle: boolean;
  title: string;
  buckets: IKanbanBucket[];
  listId: string;
  listTitle: string; //was the name if upgrade support than (remap title to id)
  loaded: boolean;
}

export default class KanbanBoardWebPart extends BaseClientSideWebPart<IKanbanBoardWebPartProps> {
  //private kanbanComponent = null;
  private dataService: ISPKanbanService;
  private statekey: string = Date.now().toString();
  public onInit(): Promise<void> {

    return super.onInit().then(_ => {

      const sp = spfi().using(SPFx(this.context));
      //.using(PnPLogging(LogLevel.Warning));
      if (Environment.type === EnvironmentType.Test) {
        this.dataService = new MockKanbanService();
      } else {
        this.dataService = new SPKanbanService(sp);
      }

    });
  }

  public render(): void {
    const element: React.ReactElement<IKanbanBoardV2Props> = React.createElement(
      KanbanBoardV2,
      {
        hideWPTitle: this.properties.hideWPTitle,
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        statekey: this.statekey,
        context: this.context,
        listId: this.properties.listId,
        configuredBuckets: this.properties.buckets,
        dataService: this.dataService
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
    const propertypages = [];

    const generalgroups = [];
    generalgroups.push(
      {
        groupName: strings.BasicGroupName,
        groupFields: [
          PropertyPaneToggle('hideWPTitle', {
            label: strings.propertyPaneHideWPHeadline,
            checked: this.properties.hideWPTitle,
            onText: strings.propertyPaneHideWPHeadlineHide,
            offText: strings.propertyPaneHideWPHeadlineShow
          }),
          PropertyFieldListPicker('listId', {
            label: strings.propertyPaneSelectList,
            selectedList: this.properties.listId,
            includeHidden: false,
            orderBy: PropertyFieldListPickerOrderBy.Title,
            disabled: false,
            onPropertyChange: this.listConfigurationChanged.bind(this),
            properties: this.properties,
            context: (this.context as any),
            onGetErrorMessage: () => '', //TODO
            deferredValidationTime: 0,
            key: 'listPickerFieldId',
            onListsRetrieved: (lists) => {
              //TODO Check from TS Definition it should be a string but i get a number
              // with Typesafe equal it fails
              if (Environment.type === EnvironmentType.Test) {
                return lists;
              } else {
                const alists = lists.filter((l: any) => {
                  return (l.BaseTemplate === 171 || l.BaseTemplate === 107);
                });
                return alists;
              }


            }
          })
        ]
      });
    if (this.properties.listId && this.properties.buckets && this.properties.buckets.length > 1) {
      generalgroups.push(
        {
          groupName: strings.propertyPaneLabelOrderBuckets,
          groupFields: [
           PropertyFieldOrder("buckets", {
              key: "orderedItems",
              label: strings.propertyPaneLabelOrderBuckets,
              items: this.properties.buckets,
              properties: this.properties,
              onPropertyChange: this.onPropertyPaneFieldChanged,
              onRenderItem: bucketOrder,
            }) 
          ]
        }
      );
    }
    propertypages.push({
      groups: generalgroups
    });

    if (this.properties.buckets && this.properties.buckets.length > 0) {
      this.properties.buckets.forEach((b, i) => {
        propertypages.push({
          key: { i },
          header: {
            description: strings.propertyPaneBucketConfiguration
          },
          groups: [{
            groupName: b.bucketheadline ? b.bucketheadline : b.bucket,
            groupFields: [
              PropertyPaneBucketConfigComponent('bucket_' + i, {
                key: 'bucket_' + i,
                properties: cloneDeep(b),
                onPropertyChange: this.bucketConfigurationChanged.bind(this)
              })
            ]
          }
          ]
        });
      });
    }
    return {
      pages: propertypages
    };
  }

  public listConfigurationChanged(propertyPath: string, oldValue: any, newValue: any): void {
    console.log('listConfigurationChanged');
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    
    this.refreshBucket();

  }
  private bucketConfigurationChanged(propertyPath: string, oldValue: any, newValue: any): void {
    //its an array part !!!!!
    if (propertyPath.indexOf('bucket_') !== -1) {
      const oribuckets: IKanbanBucket[] = cloneDeep(this.properties.buckets);
      const newbuckets: IKanbanBucket[] = cloneDeep(this.properties.buckets);
      const bucketindex: number = +propertyPath.split('_')[1];
      newbuckets[bucketindex] = newValue;
      //maybe better to make a array control (Update)

      this.onPropertyPaneFieldChanged("buckets", oribuckets, newbuckets);
      this.properties.buckets = newbuckets;
      this.context.propertyPane.refresh();
      this.render();
    } else {
      throw new Error("propertypath is not a bucket");
    }
  }

  private refreshBucket(): void {
    const listId = this.properties.listId;
    if (!listId || listId.length === 0) { return; }
    this.dataService.getBuckets(listId).then((x) => {
      const currentbuckets: IKanbanBucket[] = mergeBucketsWithChoices(this.properties.buckets, x);
      if (!currentbuckets) {
        return;
      }
      this.properties.buckets = currentbuckets;
      this.context.propertyPane.refresh();
    }
    )
      .catch(error => { throw new Error('Error loading Buckets by refreshBucket') });
  }

}
