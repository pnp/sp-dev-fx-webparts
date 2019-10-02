import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import 'officejs';
import * as strings from 'VisioSampleWebPartStrings';
import { VisioSample, IVisioSampleProps } from './components/visioSample';
import { VisioService } from "../../shared/services";

export interface IVisioSampleWebPartProps {
  documentUrl: string;
}

export default class VisioSampleWebPart extends BaseClientSideWebPart<IVisioSampleWebPartProps> {

  private _visioService: VisioService;

  public onInit(): Promise<void> {
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      console.log("Mock data service not implemented yet");
    } else {
      this._visioService = new VisioService(this.context);
    }

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IVisioSampleProps> = React.createElement(
      VisioSample,
      {
        visioService: this._visioService,
        documentUrl: this.properties.documentUrl
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
                PropertyPaneTextField('documentUrl', {
                  label: strings.DocumentUrlLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
