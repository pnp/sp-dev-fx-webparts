import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneHorizontalRule,
  PropertyPaneLabel,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'HelloWorldWebPartStrings';
import HelloWorld from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';
import { PropertyPaneWrap } from 'property-pane-wrap';
import { update } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import { MoonIcon, SunIcon } from './components/SVGIcons';

export interface IHelloWorldWebPartProps {
  description: string;
  fieldsetColorInput: string;
  fieldsetDatesInput: string[];
  fieldsetRangeInput: string;
  fieldsetURLInput: string;
  fieldsetCheckboxDarkLight: boolean;
  fieldsetCheckbox: boolean;
  fieldsetCascadingSelect: string[];
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IHelloWorldProps> = React.createElement(
      HelloWorld,
      {
        properties: this.properties,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  public updateWebPartProperty(property, value, refreshWebPart = true, refreshPropertyPane = true) {

    update(this.properties, property, () => value);
    if (refreshWebPart) this.render();
    if (refreshPropertyPane) this.context.propertyPane.refresh();

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
              groupName: "HTML Controls",
              groupFields: [
                PropertyPaneHorizontalRule(),
                PropertyPaneLabel('fieldsetColorInput', { text: 'Color Input' }),
                PropertyPaneWrap('fieldsetColorInput', {
                  component: () =>
                    <fieldset className={`${styles.fieldset} ${styles.fieldsetColorInput}`}>
                      <input
                        type="color"
                        defaultValue={this.properties["fieldsetColorInput"]}
                        onChange={(e: any) => this.updateWebPartProperty("fieldsetColorInput", e.target.value, true, false)}
                      ></input>
                    </fieldset>
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneLabel('fieldsetDatesInput', { text: 'Date Input (Start, End)' }),
                PropertyPaneWrap('fieldsetDatesInput', {
                  component: () =>
                    <fieldset className={`${styles.fieldset} ${styles.fieldsetDatesInput}`}>
                      <input
                        type="date"
                        defaultValue={this.properties["fieldsetDatesInput"][0]}
                        max={this.properties["fieldsetDatesInput"][1]}
                        onChange={(e: any) => e.target.checkValidity() && this.updateWebPartProperty("fieldsetDatesInput", [e.target.value, this.properties["fieldsetDatesInput"][1]], true)}
                      ></input>
                      <input
                        type="date"
                        defaultValue={this.properties["fieldsetDatesInput"][1]}
                        min={this.properties["fieldsetDatesInput"][0]}
                        onChange={(e: any) => e.target.checkValidity() && this.updateWebPartProperty("fieldsetDatesInput", [this.properties["fieldsetDatesInput"][0], e.target.value], true)}
                      ></input>
                    </fieldset>
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneLabel('fieldsetRangeInput', { text: 'Range Input' }),
                PropertyPaneWrap('fieldsetRangeInput', {
                  component: () =>
                    <fieldset className={`${styles.fieldset}`}>
                      <input
                        type="range"
                        list={`tickmarks-fieldsetRangeInput-${this.instanceId}`}
                        defaultValue={this.properties["fieldsetRangeInput"]}
                        onChange={(e: any) => this.updateWebPartProperty("fieldsetRangeInput", e.target.value)}
                      ></input>
                      <datalist id={`tickmarks-fieldsetRangeInput-${this.instanceId}`}>
                        <option value="0" label="0"></option>
                        <option value="25" label="25"></option>
                        <option value="50" label="50"></option>
                        <option value="75" label="75"></option>
                        <option value="100" label="100"></option>
                      </datalist>
                    </fieldset>
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneLabel('fieldsetURLInput', { text: 'SharePoint Online Site URL' }),
                PropertyPaneWrap('fieldsetURLInput', {
                  component: (props) => <input {...props} />,
                  props: {
                    className: styles.urlInput,
                    type: "url",
                    defaultValue: this.properties["fieldsetURLInput"],
                    placeholder: "https://tenant.sharepoint.com/sites/name",
                    pattern: "https://.*\.sharepoint.com/sites/.+",
                    onChange: (e: any) => {
                      e.target.checkValidity() && this.updateWebPartProperty("fieldsetURLInput", e.target.value, true, false);
                    }
                  }
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneLabel('fieldsetCheckboxDarkLight', { text: 'Checkbox as Toggle Button' }),
                PropertyPaneWrap('fieldsetCheckboxDarkLight', {
                  component: () =>
                    <label className={`${styles.fieldset} ${styles.fieldsetCheckboxDarkLight}`}>
                      <input
                        type="checkbox"
                        defaultChecked={this.properties["fieldsetCheckboxDarkLight"]}
                        onChange={(e: any) => this.updateWebPartProperty("fieldsetCheckboxDarkLight", e.target.checked, true, false)}
                      ></input>
                      <div>
                        <span>
                        </span>
                        <div>
                          <SunIcon />
                          <MoonIcon />
                        </div>
                      </div>
                    </label>
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneLabel('fieldsetCheckbox', { text: 'Checkbox' }),
                PropertyPaneWrap('fieldsetCheckbox', {
                  component: (props) =>
                    <div className={styles.fieldsetCheckbox}>
                      <input
                        type="checkbox"
                        checked={this.properties["fieldsetCheckbox"]}
                        onChange={(e: any) => this.updateWebPartProperty("fieldsetCheckbox", e.target.checked)}
                      ></input>
                      <span>
                        &ensp;{(this.properties["fieldsetCheckbox"]) ? "Checked" : "Unchecked"}
                      </span>
                    </div>
                }),
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneHorizontalRule(),
                PropertyPaneTextField('description', {
                  label: strings.PropertyPaneTextFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}



// <fieldset data-property="fieldsetCascadingSelect" >
// <label>Cascading Select</label>
// <div className="flexControl">
//   <select
//     className='select-css'
//     value={this.properties["fieldsetCascadingSelect"][0]}
//     onChange={(e: any) => {
//       this.updateWebPartProperty("fieldsetCascadingSelect", [e.target.value, ""]);
//     }
//     }
//   >
//     <option value="">Select Family...</option>
//     {familiesList
//       .map(item => <option value={item.value}>{item.name}</option>)}
//   </select>
//   <select
//     className='select-css'
//     value={this.properties["fieldsetCascadingSelect"][1]}
//     onChange={(e: any) => this.updateWebPartProperty("fieldsetCascadingSelect", [this.properties["fieldsetCascadingSelect"][0], e.target.value])}
//   >
//     <option value="">Select App...</option>
//     {(this.properties["fieldsetCascadingSelect"]) && appsList
//       .filter(i => i.parent == this.properties["fieldsetCascadingSelect"][0])
//       .map(item => <option value={item.value}>{item.name}</option>)}
//   </select>
// </div>
// </fieldset>