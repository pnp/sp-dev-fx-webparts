import {  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";

// Orig
//import { IPropertyPaneCustomFieldProps }    from '@microsoft/sp-webpart-base';
import { IPropertyPaneAsyncChecklistProps } from './IPropertyPaneAsyncChecklistProps';

export interface IPropertyPaneAsyncChecklistInternalProps extends IPropertyPaneAsyncChecklistProps, IPropertyPaneCustomFieldProps {

}