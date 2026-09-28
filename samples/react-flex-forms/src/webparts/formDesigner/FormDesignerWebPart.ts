import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { parseFormId } from '../../shared/models/formId';
import { getSP } from '../../shared/services/PnPService';
import { FlexFormsThemeProvider } from '../../shared/theme/FlexFormsThemeProvider';
import FormDesigner from './components/FormDesigner';

export interface IFormDesignerWebPartProps {
  selectedFormId?: number;
}

export default class FormDesignerWebPart extends BaseClientSideWebPart<IFormDesignerWebPartProps> {
  private isDarkTheme = false;

  public render(): void {
    const content = React.createElement(FormDesigner, {
      sp: getSP(),
      selectedFormId: parseFormId(this.properties.selectedFormId)
    });
    ReactDom.render(
      React.createElement(FlexFormsThemeProvider, { isDarkTheme: this.isDarkTheme }, content),
      this.domElement
    );
  }

  protected onInit(): Promise<void> {
    getSP(this.context);
    return Promise.resolve();
  }

  protected onThemeChanged(theme: IReadonlyTheme | undefined): void {
    this.isDarkTheme = !!theme?.isInverted;
    this.render();
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
        header: { description: 'Choose an existing form ID to edit, or leave blank for a new form.' },
        groups: [{
          groupName: 'Form',
          groupFields: [PropertyPaneTextField('selectedFormId', { label: 'Form ID' })]
        }]
      }]
    };
  }
}
