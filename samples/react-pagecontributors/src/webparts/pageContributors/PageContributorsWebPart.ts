import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'pageContributorsStrings';
import PageContributors from './components/PageContributors';
import { IPageContributorsWebPartProps } from './IPageContributorsWebPartProps';
import { PersonaSize } from "office-ui-fabric-react/lib/index";
import pnp from 'sp-pnp-js';

export default class PagecontributionWebPart extends BaseClientSideWebPart<IPageContributorsWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });
    });
  }
  public render(): void {
    ReactDom.render(
      React.createElement(PageContributors, {
        personaSize: this.properties.personaSize,
        numberOfFaces: this.properties.numberOfFaces,
        pageUrl: this.properties.pageUrl
      })
      , this.domElement);
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
                    { key: PersonaSize.tiny, text: strings.PropertyPaneIconsSizeTiny },
                    { key: PersonaSize.extraExtraSmall, text: strings.PropertyPaneIconsSizeEES },
                    { key: PersonaSize.extraSmall, text: strings.PropertyPaneIconsSizeES },
                    { key: PersonaSize.small, text: strings.PropertyPaneIconsSizeS },
                    { key: PersonaSize.regular, text: strings.PropertyPaneIconsSizeR },
                    { key: PersonaSize.large, text: strings.PropertyPaneIconsSizeL },
                    { key: PersonaSize.extraLarge, text: strings.PropertyPaneIconsSizeEL },
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
