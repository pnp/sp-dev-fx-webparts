import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { parseFormId } from '../../shared/models/formId';
import { getSP } from '../../shared/services/PnPService';
import { FlexFormsThemeProvider } from '../../shared/theme/FlexFormsThemeProvider';
import FormRenderer from './components/FormRenderer';

export interface IFormRendererWebPartProps {
  selectedFormId: number;
}

export default class FormRendererWebPart extends BaseClientSideWebPart<IFormRendererWebPartProps> {
  private isDarkTheme = false;

  public render(): void {
    const content = React.createElement(FormRenderer, {
      sp: getSP(),
      formId: parseFormId(this.properties.selectedFormId)
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
        header: { description: 'Choose the published form to display.' },
        groups: [{
          groupName: 'Form',
          groupFields: [PropertyPaneTextField('selectedFormId', { label: 'Published form ID' })]
        }]
      }]
    };
  }
}
