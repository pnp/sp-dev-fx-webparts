import { getTheme } from '@fluentui/react';
import { IReadonlyTheme, ThemeChangedEventArgs, ThemeProvider } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import { isEqual } from '@microsoft/sp-lodash-subset';
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as htm from 'htm';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'ReactHtmWebPartStrings';
import ShowError, { IShowErrorProps } from './components/showError';
import ShowPlaceholder, { IShowPlaceholderProps } from './components/showPlaceholder';

export interface IReactHtmWebPartProps {
  template: string;
  loadFluentUI: boolean;
  loadFluentUISampleData: boolean;
}

export default class ReactHtmWebPart extends BaseClientSideWebPart<IReactHtmWebPartProps> {

  protected themeProvider: ThemeProvider;
  protected themeVariant: IReadonlyTheme;

  protected propertyFieldCodeEditor;
  protected propertyFieldCodeEditorLanguages;
  protected propertyPaneWebPartInformation;

  protected fluentUIReact;
  protected fluentUIHooks;
  protected fluentUISampleData;

  protected get isRenderAsync(): boolean {
    return true;
  }

  protected async onInit(): Promise<void> {
    this.initThemeVariant();

    return super.onInit();
  }

  public async render(): Promise<void> {
    this.showLoadingIndicator();

    if (this.properties.loadFluentUI) {
      this.fluentUIReact = await import(
        /* webpackChunkName: 'react-htm-fluentui-react' */
        '@fluentui/react'
      );

      this.fluentUIHooks = await import(
        /* webpackChunkName: 'react-htm-fluentui-hooks' */
        '@fluentui/react-hooks'
      );
    }

    if (this.properties.loadFluentUISampleData) {
      this.fluentUISampleData = await import(
        /* webpackChunkName: 'react-htm-fluentui-example-data' */
        '@fluentui/example-data'
      );
    }

    this.renderCompleted();
  }

  protected renderCompleted(): void {

    if (this.properties.template) {
      const html = htm.default.bind(React.createElement);

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function
      // https://remarkablemark.org/blog/2018/05/15/javascript-eval-vs-function/
      // https://docs.microsoft.com/en-us/javascript/api/sp-loader/spcomponentloader
      const evalFunction = new Function(this.properties.template);
      const evalFunctionContext = {
        html: html,
        react: React,
        theme: getTheme(),
        themeVariant: this.themeVariant,
        fui: (this.properties.loadFluentUI) ? this.fluentUIReact : undefined,
        fuiHooks: (this.properties.loadFluentUI) ? this.fluentUIHooks : undefined,
        fuiSampleData: (this.properties.loadFluentUISampleData) ? this.fluentUISampleData : undefined
      };

      const executeEvalFunction = () => {
        return evalFunction.call(evalFunctionContext);
      };

      let evalError = null;

      try {
        let renderComponent = html`<${executeEvalFunction} />`;

        this.hideLoadingIndicator();

        //@ts-ignore
        ReactDom.render(renderComponent, this.domElement);
      } catch (error) {
        evalError = error.toString();
      }

      if (evalError) {
        this.hideLoadingIndicator();
        const element: React.ReactElement<IShowErrorProps> = React.createElement(
          ShowError,
          {
            message: evalError,
            themeVariant: this.themeVariant
          }
        );
        ReactDom.render(element, this.domElement);
      }
    }
    else {
      this.hideLoadingIndicator();
      const element: React.ReactElement<IShowPlaceholderProps> = React.createElement(
        ShowPlaceholder,
        {
          context: this.context,
          themeVariant: this.themeVariant
        }
      );
      ReactDom.render(element, this.domElement);
    }

    super.renderCompleted();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected async loadPropertyPaneResources(): Promise<void> {
    const { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } = await import(
      /* webpackChunkName: 'pnp-controls-property-field-code-editor' */
      '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor'
    );
    this.propertyFieldCodeEditor = PropertyFieldCodeEditor;
    this.propertyFieldCodeEditorLanguages = PropertyFieldCodeEditorLanguages;

    const { PropertyPaneWebPartInformation } = await import(
      /* webpackChunkName: 'pnp-controls-property-field-information' */
      '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation'
    );
    this.propertyPaneWebPartInformation = PropertyPaneWebPartInformation;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let htmlDescription = `
    <p>The <a href="https://github.com/developit/htm" target="_blank">HTM (Hyperscript Tagged Markup)</a> is used as the template language and the following objects are made available inside your js script:</p>
    <ul>
      <li><b>this.html</b>: Reference to the HTM engine</li>
      <li><b>this.react</b>: Reference to React</li>
      <li><b>this.theme</b>: Reference to the 'Theme' object of SharePoint Page</li>
      <li><b>this.themeVariant</b>: Reference to the Theme Variant object</li>
      <li><b>this.fui</b>: Reference to the 'Fluent UI' namespace</li>
      <li><b>this.fuiHooks</b>: Reference to the 'Fluent UI Hooks' namespace</li>
      <li><b>this.fuiSampleData</b>: Reference to the 'Fluent UI Sample Data' namespace</li>
    </ul>
    <p>Author: <a href="https://twitter.com/franzinifabio" target="_blank">Fabio Franzini</a><p>
    `;

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
                this.propertyFieldCodeEditor('template', {
                  label: strings.TemplateFieldLabel,
                  panelTitle: strings.TemplateFieldLabel,
                  initialValue: this.properties.template,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',
                  language: this.propertyFieldCodeEditorLanguages.JavaScript
                }),
                PropertyPaneToggle('loadFluentUI', {
                  label: strings.LoadFluentUIFieldLabel,
                  onText: strings.FieldLabelOn,
                  offText: strings.FieldLabelOff
                }),
                PropertyPaneToggle('loadFluentUISampleData', {
                  label: strings.LoadFluentUISampleDataFieldLabel,
                  onText: strings.FieldLabelOn,
                  offText: strings.FieldLabelOff
                }),
                this.propertyPaneWebPartInformation({
                  description: htmlDescription,
                  key: 'webPartInfoId'
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected showLoadingIndicator(): void {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "");
  }

  protected hideLoadingIndicator(): void {
    this.context.statusRenderer.clearLoadingIndicator(this.domElement);
  }

  private initThemeVariant(): void {
    this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this.themeVariant = this.themeProvider.tryGetTheme();
    this.themeProvider.themeChangedEvent.add(this, (args: ThemeChangedEventArgs): void => {
      if (!isEqual(this.themeVariant, args.theme)) {
        this.themeVariant = args.theme;
        this.render();
      }
    });
  }
}
