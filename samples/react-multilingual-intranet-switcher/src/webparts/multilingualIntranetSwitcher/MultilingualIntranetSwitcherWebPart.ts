import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'MultilingualIntranetSwitcherWebPartStrings';
import MultilingualIntranetSwitcher from './components/MultilingualIntranetSwitcher';

export interface IMultilingualIntranetSwitcherWebPartProps {
  title: string;
  configurationJson: string;
}

export default class MultilingualIntranetSwitcherWebPart extends BaseClientSideWebPart<IMultilingualIntranetSwitcherWebPartProps> {
  public render(): void {
    ReactDom.render(
      React.createElement(MultilingualIntranetSwitcher, {
        context: this.context,
        title: this.properties.title || 'Intranet languages',
        configurationJson: this.properties.configurationJson || ''
      }),
      this.domElement
    );
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
        header: { description: strings.PropertyPaneDescription },
        groups: [{
          groupFields: [
            PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
            PropertyPaneTextField('configurationJson', {
              label: strings.ConfigurationFieldLabel,
              description: strings.ConfigurationFieldDescription,
              multiline: true,
              rows: 12,
              deferredValidationTime: 500
            })
          ]
        }]
      }]
    };
  }
}
