import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import{ v4 as uuidV4 } from 'uuid';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,  
  PropertyPaneCheckbox,
  IPropertyPaneCheckboxProps,
  PropertyPaneToggle,
  IPropertyPaneToggleProps,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'M365PlannerTimelineWebPartStrings';
import { 
  M365PlannerTimeline,
  IM365PlannerTimelineProps  
} from './components';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import {
  PropertyPanePlanBucketSelector,
  IPropertyPanePlanSelectorProp,  
  IPlanerIds
} from './controls/PropertyPanePlanBucketSelector';

export interface IM365PlannerTimelineWebPartProps {
  groupId: string;
  timeLinePlan: { planId: string, bucketId: string };  
  cacheId: string;
  webPartTitle: string;  
  showTitle: boolean;
  showActiveTasks: boolean;
}
export default class M365PlannerTimelineWebPart extends BaseClientSideWebPart<IM365PlannerTimelineWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _graphClient: MSGraphClientV3;  
  private _noM365Group: boolean = false;
      
  protected async onInit(): Promise<void> {
    // Initialize MSGraphClient
    this._graphClient = await this.context.msGraphClientFactory.getClient('3');

    try {
      this.properties.groupId = this.context.pageContext.site.group.id.toString();
      
      if (this.properties.cacheId === '') {
        const fullUuid: string = uuidV4();
        // Take the first 14 characters of the UUID    
        this.properties.cacheId = fullUuid.replace(/-/g, '').substring(0, 14);
      }
    
    } catch (error) {
      this._noM365Group = true;
      console.error(error);
    }

    return Promise.resolve();    
  }

  public render(): void {
    const element: React.ReactElement<IM365PlannerTimelineProps> = React.createElement(
      M365PlannerTimeline,
      {
        context: this.context,
        cacheId: this.properties.cacheId,
        groupId: this.properties.groupId,
        noM365Group: this._noM365Group,
        timeLinePlan: this.properties.timeLinePlan,
        showActiveTasks: this.properties.showActiveTasks,
        webPartTitle:this.properties.webPartTitle,
        isDarkTheme: this._isDarkTheme,
        showTitle: this.properties.showTitle,
        displayMode: this.displayMode,        
        onConfigure: () => {
          this.context.propertyPane.open();
        },
        updateTitle: (value: string) => { 
          this.properties.webPartTitle = value; 
        }
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
              groupName: strings.TitleGroupName,
              groupFields: [
                PropertyPaneCheckbox( 'showTitle', <IPropertyPaneCheckboxProps> {
                  text: strings.ShowTitleLabel,
                  checked: this.properties.showTitle
                }),
                PropertyPaneTextField('webPartTitle', {
                  label: "Web Part Title",
                  value: this.properties.webPartTitle,                  
                })                
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPanePlanBucketSelector('timeLinePlan', {
                  label: strings.TimeLinePlanLabel,
                  onPropertyChanged: this._onPlanChanged,
                  disabled: this._noM365Group,
                  planId: this.properties.timeLinePlan.planId,
                  bucketId: this.properties.timeLinePlan.bucketId,                  
                  graphClient: this._graphClient,
                  groupId: this.properties.groupId
                } as IPropertyPanePlanSelectorProp ),                
                PropertyPaneToggle( 'showActiveTasks', <IPropertyPaneToggleProps> {
                  label: strings.ActiveTaskLabel,
                  onText: strings.TaskToggleOn,
                  offText: strings.TaskToggleOff,
                  checked: this.properties.showActiveTasks
                })
              ]
            }
          ]
        }
      ]
    };
  }

  // Event handler for custom field to update web part property when changed.
  private _onPlanChanged = (propertyPath: string, ids: IPlanerIds): void => {
    if (propertyPath === 'timeLinePlan') {
      this.properties.timeLinePlan = ids;      
    }
  }
}
