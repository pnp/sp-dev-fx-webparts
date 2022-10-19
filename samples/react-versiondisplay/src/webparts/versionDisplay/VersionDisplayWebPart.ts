import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'VersionDisplayWebPartStrings';
import VersionDisplay from './components/VersionDisplay';
import { IVersionDisplayProps } from './components/IVersionDisplayProps';

// Used to display version information
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';

// Import package version
const requirePackage: any = require("../../../config/package-solution.json");

// Static import
const packageSolution: any = require("../../../config/package-solution.json");
export interface IVersionDisplayWebPartProps {
}

export default class VersionDisplayWebPart extends BaseClientSideWebPart<IVersionDisplayWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IVersionDisplayProps> = React.createElement(
      VersionDisplay,
      {
        requireVersion: requirePackage.solution.version,
        staticImportVersion: (<any>packageSolution).solution.version,
        manifestVersion: this.context.manifest.version
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
              groupName: strings.AboutGroupName,
              groupFields: [
                // Using a the web part's manifest
                PropertyPaneWebPartInformation({
                  description: `${strings.ManifestVersionLabel} ${this.context.manifest.version}.0`,
                  key: 'webPartInfoStaticId'
                }),
                // Using a require statement
                PropertyPaneWebPartInformation({
                  description: `${strings.RequireVersionLabel} ${requirePackage.solution.version}`,
                  key: 'webPartInfoId'
                }),
                // Using a static import
                PropertyPaneWebPartInformation({
                  description: `${strings.StaticImportVersionLabel} ${(<any>packageSolution).solution.version}`,
                  key: 'webPartInfoStaticId',
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
