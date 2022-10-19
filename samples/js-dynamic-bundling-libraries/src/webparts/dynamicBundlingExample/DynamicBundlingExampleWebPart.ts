import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './DynamicBundlingExampleWebPart.module.scss';
import * as strings from 'DynamicBundlingExampleWebPartStrings';

export interface IDynamicBundlingExampleWebPartProps {
  description: string;
}

export default class DynamicBundlingExampleWebPart extends BaseClientSideWebPart<IDynamicBundlingExampleWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.dynamicBundlingExample }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Dynamic Bundling & Loading of SPFx Packages</span>
              <p class="${ styles.subTitle }">When the buttons below are clicked, the associated ".ts" file and it's functionality will be loaded.</p>
              <a id="ImportButton" href="#" class="${ styles.button }">
                <span class="${ styles.label }">Dynamically Import Functionality</span>
              </a>

              <a id="ImportButtonJQuery" href="#" class="${ styles.button }">
                <span class="${ styles.label }">Dynamically Import Functionality w/ jQuery</span>
              </a>
            </div>
            <div class="insertHTML"></div>
          </div>
        </div>
      </div>`;
      this.setupClickEvent();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // Create a click event listener for the ImportButton Anchor element
  public setupClickEvent(): void {
    let btn = document.getElementById("ImportButton");
    btn.addEventListener("click", (e:Event) => this.dynamicallyImportFunctions());

    let btnjQuery = document.getElementById("ImportButtonJQuery");
    btnjQuery.addEventListener("click", (e:Event) => this.dynamicallyImportFunctionsJQuery());
  }

  // This will setup the 'DynamicImportedFunctions.ts' to be bundled into a separate .js file.
  protected async dynamicallyImportFunctions() {
    const importedTS = await import(
      './DynamicImportedFunctions'
    );
    importedTS.default.executeDynamicLoad();
  }

  //This will setup the 'DynamicImportedFunctionsJQuery.ts' to be bundled into a separate .js file.
  protected async dynamicallyImportFunctionsJQuery() {
    const importedJQueryTS = await import(
      './DynamicImportedFunctionsJQuery'
    );
    importedJQueryTS.default.executeDynamicLoadJQuery();
    importedJQueryTS.default.addToDOM(this.domElement);
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
