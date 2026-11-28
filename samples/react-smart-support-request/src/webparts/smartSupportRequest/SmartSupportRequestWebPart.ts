import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { type IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'SmartSupportRequestWebPartStrings';
import SmartSupportRequest from './components/SmartSupportRequest';

export interface ISmartSupportRequestWebPartProps {
  description: string;
}

export default class SmartSupportRequestWebPart extends BaseClientSideWebPart<ISmartSupportRequestWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _root: Root | undefined;

  public render(): void {
    if (!this._root) this._root = createRoot(this.domElement);
    this._root.render(React.createElement(SmartSupportRequest, {
      description: this.properties.description,
      isDarkTheme: this._isDarkTheme,
      instanceId: this.instanceId
    }));
  }

  protected onThemeChanged(theme: IReadonlyTheme | undefined): void {
    if (!theme) return;
    this._isDarkTheme = !!theme.isInverted;
    if (theme.semanticColors) {
      this.domElement.style.setProperty('--support-text', theme.semanticColors.bodyText || '');
      this.domElement.style.setProperty('--support-background', theme.semanticColors.bodyBackground || '');
    }
    if (this._root) this.render();
  }

  protected onDispose(): void {
    this._root?.unmount();
    this._root = undefined;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
        header: { description: strings.PropertyPaneDescription },
        groups: [{
          groupName: strings.BasicGroupName,
          groupFields: [PropertyPaneTextField('description', { label: strings.DescriptionFieldLabel })]
        }]
      }]
    };
  }
}
