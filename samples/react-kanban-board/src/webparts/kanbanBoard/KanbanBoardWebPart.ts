import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Guid } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneDropdown } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { PropertyFieldOrder } from '@pnp/spfx-property-controls/lib/PropertyFieldOrder';

import * as strings from 'KanbanBoardWebPartStrings';
import KanbanBucketConfigurator, { IKanbanBucketConfiguratorProps } from '../../kanban/KanbanBucketConfigurator';
import PropertyPaneBucketConfigComponent from './components/PropertyPaneBucketConfig';
import KanbanBoardV2, { IKanbanBoardV2Props } from './components/KanbanBoardV2';
import { bucketOrder } from './components/bucketOrder';
import "@pnp/polyfill-ie11";
import { sp } from '@pnp/sp';

import { IKanbanBucket } from '../../kanban/IKanbanBucket';
import { mergeBucketsWithChoices } from './components/helper';
import { PropertyFieldMessage } from '@pnp/spfx-property-controls/lib/PropertyFieldMessage';
import { MessageBarType } from 'office-ui-fabric-react';
import { cloneDeep } from '@microsoft/sp-lodash-subset';

export interface IKanbanBoardWebPartProps {
  hideWPTitle: boolean;
  title: string;
  buckets: IKanbanBucket[];
  listId: string;
  listTitle: string; //was the name if upgrade support than (remap title to id)
  loaded: boolean;
}

export default class KanbanBoardWebPart extends BaseClientSideWebPart<IKanbanBoardWebPartProps> {
  private kanbanComponent = null;
  public onInit(): Promise < void> {

  return super.onInit().then(_ => {

    sp.setup({
      spfxContext: this.context
    });

  });
}

  public render(): void {


  /*
    const element: React.ReactElement<IKanbanBoardProps > = React.createElement(
      KanbanBoard,
      {
        listTitle: this.properties.listTitle,
        webUrl: this.context.pageContext.web.absoluteUrl
      }
    );
    */
  /*
   const element: React.ReactElement<IMockKanbanProps > = React.createElement(
    MockKanban,
    {
     
    }
  );
*/
  const element: React.ReactElement < IKanbanBoardV2Props > = React.createElement(
    KanbanBoardV2,
    {
      hideWPTitle: this.properties.hideWPTitle,
      title: this.properties.title,
      displayMode: this.displayMode,
      updateProperty: (value: string) => {
        this.properties.title = value;
      },
      context: this.context,
      listId: this.properties.listId,
      configuredBuckets: this.properties.buckets
    }
  );
  

  this.kanbanComponent = ReactDom.render(element, this.domElement);

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
          label: 'Hide WP Title',
          checked: this.properties.hideWPTitle
        }),
        PropertyFieldListPicker('listId', {
          label: 'Select a list',
          selectedList: this.properties.listId,
          includeHidden: false,
          orderBy: PropertyFieldListPickerOrderBy.Title,
          disabled: false,
          onPropertyChange: this.listConfigurationChanged.bind(this),
          properties: this.properties,
          context: this.context,
          onGetErrorMessage: null,
          deferredValidationTime: 0,
          key: 'listPickerFieldId',
          onListsRetrieved: (lists) => {
            //TODO Check from TS Definition it should be a string but i get a number
            // with Typesafe equal it fails
            const alists = lists.filter((l: any) => {
              return (l.BaseTemplate === 171 || l.BaseTemplate === 107);
            }
            );
            return alists;
          }
        })
      ]
    });

  if (this.properties.listId && this.properties.buckets && this.properties.buckets.length > 1) {
    generalgroups.push(
      {
        groupName: "Order Buckets",
        groupFields: [
          PropertyFieldOrder("orderedItems", {
            key: "orderedItems",
            label: "Ordered Items",
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
          description: "Bucket Configuration"
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

  private listConfigurationChanged(propertyPath: string, oldValue: any, newValue: any) {
  this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  this.refreshBucket();

}
  private bucketConfigurationChanged(propertyPath: string, oldValue: any, newValue: any) {
  //its an array part !!!!!
  if (propertyPath.indexOf('bucket_') !== -1) {
    const newbuckets: IKanbanBucket[] = cloneDeep(this.properties.buckets);
    const bucketindex: number = +propertyPath.split('_')[1];
    newbuckets[bucketindex] = newValue;
    //merge and every else is good
   // 
    console.log('buckes updated old saved');
    console.log(oldValue);
    // this.onPropertyPaneFieldChanged('buckets', this.properties.buckets, newbuckets);
     this.properties.buckets = cloneDeep(newbuckets);
    // array child Properties change dows not trigger rerender
    // i think this is better as an Property With da DateTimeValue to force Rerender
    console.log('old');
    console.log(this.properties.buckets);
    console.log('new');
    console.log(newbuckets);
    this.kanbanComponent.forceUpdate();
  } else {
    throw "propertypath is not a bucket";

  }



}

  private refreshBucket(): void {
  const listId = this.properties.listId;
  if(!listId || listId.length === 0) { return; }

sp.web.lists.getById(listId).fields.getByInternalNameOrTitle("Status").get()
  .then(status => {

    const cols: string[] = status.Choices.map((val, index) => {
      return val;
    });
    //matching with existing configured buckets
    const currentbuckets: IKanbanBucket[] = mergeBucketsWithChoices(this.properties.buckets, cols);
    if (!currentbuckets) {
      return;
    }
    this.properties.buckets = currentbuckets;
    this.context.propertyPane.refresh();
  });

  }

  protected onPropertyPaneConfigurationStart() {
  // Use the list template ID to locate both the old style task lists (107) and newer task lists (171) 
  /*
   sp.web.lists.filter("BaseTemplate eq 171 or BaseTemplate eq 107").select("Title").get().then(res => {
     this.properties.lists = res.map((val, index) => {
       return {
         key: val.Title,
         text: val.Title
       };
     });
     this.context.propertyPane.refresh();
   });
   */
}
}
