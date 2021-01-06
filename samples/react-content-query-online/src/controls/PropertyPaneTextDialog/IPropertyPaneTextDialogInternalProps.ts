import {  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";

// Original
//import { IPropertyPaneCustomFieldProps }    from '@microsoft/sp-webpart-base';
import { IPropertyPaneTextDialogProps } 	from './IPropertyPaneTextDialogProps';

export interface IPropertyPaneTextDialogInternalProps extends IPropertyPaneTextDialogProps, IPropertyPaneCustomFieldProps {

}