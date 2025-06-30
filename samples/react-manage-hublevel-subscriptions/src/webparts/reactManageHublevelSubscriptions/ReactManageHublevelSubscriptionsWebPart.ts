import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {  getSP } from '../../Config/pnpConfig';
import * as strings from 'ReactManageHublevelSubscriptionsWebPartStrings';
import ReactManageHublevelSubscriptions from './components/ParentComponent/ManageHublevelSubscriptions';
import { IManageHublevelSubscriptionsProps } from './components/ParentComponent/IManageHublevelSubscriptions';

export interface IManageHublevelSubscriptionsWebPartProps {
  WebpartTitle: string;
}

export default class ReactManageHublevelSubscriptionsWebPart extends BaseClientSideWebPart<IManageHublevelSubscriptionsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IManageHublevelSubscriptionsProps> = React.createElement(
      ReactManageHublevelSubscriptions,
      {
        _context : this.context,
        setWebPartTitle : (value: string) => {
          this.properties.WebpartTitle = value;
        },
        displayMode: this.displayMode,
        webpartTitle: this.properties.WebpartTitle
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    super.onInit();
    getSP(this.context);
    return Promise.resolve();
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
