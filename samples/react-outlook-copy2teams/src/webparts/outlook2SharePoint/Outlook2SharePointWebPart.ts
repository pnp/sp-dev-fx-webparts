import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'Outlook2SharePointWebPartStrings';
import { IMail } from '../../model/IMail';
import Outlook2SharePoint from './components/Outlook2SharePoint';
import { IOutlook2SharePointProps } from './components/IOutlook2SharePointProps';

export interface IOutlook2SharePointWebPartProps {
  
}

export default class Outlook2SharePointWebPart extends BaseClientSideWebPart <IOutlook2SharePointWebPartProps> {  
  public render(): void {
    let mail: IMail = null;    
    if (this.context.sdks.office) {
      const item = this.context.sdks.office.context.mailbox.item;  
      const itemId = this.context.sdks.office.context.mailbox.convertToRestId(item.itemId, 'v2.0');   
      if (item !== null) {
        mail = { id: itemId, subject: item.subject };       
      }      
    }
    
    const element: React.ReactElement<IOutlook2SharePointProps> = React.createElement(
      Outlook2SharePoint,
      {        
        msGraphClientFactory: this.context.msGraphClientFactory,
        mail: mail
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('saveMetadata', {
                  label: strings.SaveMetadataFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
