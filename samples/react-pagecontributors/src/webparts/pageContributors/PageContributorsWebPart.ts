import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'pageContributorsStrings';
import PageContributors from './components/PageContributors';
import { IPageContributorsWebPartProps } from './IPageContributorsWebPartProps';
import { PersonaSize } from "office-ui-fabric-react/lib/index";
import { sp } from "@pnp/sp/presets/all";

export default class PagecontributionWebPart extends BaseClientSideWebPart<IPageContributorsWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  public render(): void {
    ReactDom.render(
      React.createElement(PageContributors, {
        personaSize: this.properties.personaSize,
        numberOfFaces: this.properties.numberOfFaces,
        pageUrl: this.properties.pageUrl || this.getCurrentPageRelativeUrl()
      })
      , this.domElement);
  }

  private getCurrentPageRelativeUrl(): string {
    return this.context.pageContext.legacyPageContext.serverRequestPath;
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
              groupName: strings.PropertyPaneBasicGroupName,
              groupFields: [
                PropertyPaneSlider('numberOfFaces', {
                  label: strings.PropertyPaneNbPersonasText,
                  min: 1,
                  max: 20
                }),
                PropertyPaneDropdown('personaSize', {
                  label: strings.PropertyPanePersonaSizeText,
                  options: [
                    { key: PersonaSize.size8, text: strings.PropertyPaneIconsSizeTiny },
                    { key: PersonaSize.size24, text: strings.PropertyPaneIconsSizeEES },
                    { key: PersonaSize.size32, text: strings.PropertyPaneIconsSizeES },
                    { key: PersonaSize.size40, text: strings.PropertyPaneIconsSizeS },
                    { key: PersonaSize.size48, text: strings.PropertyPaneIconsSizeR },
                    { key: PersonaSize.size72, text: strings.PropertyPaneIconsSizeL },
                    { key: PersonaSize.size100, text: strings.PropertyPaneIconsSizeEL },
                  ],
                  selectedKey: this.properties.personaSize
                }),
                PropertyPaneTextField('pageUrl',{
                  label: strings.PropertyPanePageUrlText
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
