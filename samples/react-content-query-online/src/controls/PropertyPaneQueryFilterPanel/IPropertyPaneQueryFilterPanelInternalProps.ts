import {  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";

// Original
//import { IPropertyPaneCustomFieldProps }    from '@microsoft/sp-webpart-base';
import { IPropertyPaneQueryFilterPanelProps } from './IPropertyPaneQueryFilterPanelProps';


export interface IPropertyPaneQueryFilterPanelInternalProps extends IPropertyPaneQueryFilterPanelProps, IPropertyPaneCustomFieldProps {

}