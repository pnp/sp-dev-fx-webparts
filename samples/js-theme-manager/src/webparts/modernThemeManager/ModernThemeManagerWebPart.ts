import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ModernThemeManagerWebPart.module.scss';
import * as strings from 'ModernThemeManagerWebPartStrings';

import { IDigestCache, DigestCache } from '@microsoft/sp-http';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

export interface IModernThemeManagerWebPartProps {
  description: string;
}

export default class ModernThemeManagerWebPart extends BaseClientSideWebPart<IModernThemeManagerWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.jsGenericWebpartThemeGenerator}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">
              <div class="${ styles.title}">Modern Experience SharePoint Theme Manager</div>
              <a class="${ styles.themeGeneratorURL}" href="https://developer.microsoft.com/en-us/fabric#/styles/themegenerator" target="_blank">
                UI Fabric Theme Generator
              </a>

              <div>
                <p class="${ styles.subTitle}">Theme Actions</p> 
                <label class="${ styles.radio}"><input type="radio" name="themeAction" value="create"> Create a theme</label>
                <label class="${ styles.radio}"><input type="radio" name="themeAction" value="update"> Update a theme</label>
                <label class="${ styles.radio}"><input type="radio" name="themeAction" value="delete"> Delete a theme</label>
                <label class="${ styles.radio}"><input type="radio" name="themeAction" value="apply"> Apply a theme</label>
              </div>

              <div class="${ styles.hide} ${styles.genericWrapper}" id="${styles.themeSelectWrapper}">
                <p class="${ styles.subTitle}">Available Themes</p> 
                <select id="${ styles.availableThemesSelect}" name="availableThemes">
                </select>
              </div>

              
              <div class="${ styles.hide} ${styles.genericWrapper}" id="${styles.themeNameWrapper}">
                <p class="${ styles.subTitle}">Theme Name</p>
                <div>
                  <input id="${ styles.input}" class="${styles.input}">
                </div>
              </div>

              <div class="${ styles.hide} ${styles.genericWrapper}" id="${styles.themePaletteWrapper}">
                <p class="${ styles.subTitle}">Theme Palette</p>
                <div>
                  <textarea id="${ styles.textarea}" class="${styles.textarea}"></textarea>
                </div>
              </div>

              <div class="${ styles.hide} ${styles.genericWrapper}"  id="${styles.themeSiteURLWrapper}">
                <p class="${ styles.subTitle}">Relative Site URL (ex: "/sites/SiteCollectionName")</p>
                <div>
                  <input id="${ styles.siteurl}" class="${styles.siteurl}">
                </div>
              </div>

              <div id="createTheme" class="${ styles.button} ${styles.hide}">
                <span class="${ styles.label}">Create Theme</span>
              </div>
              <div id="updateTheme" class="${ styles.button} ${styles.hide}">
                <span class="${ styles.label}">Update Theme</span>
              </div>
              <div id="deleteTheme" class="${ styles.button} ${styles.hide}">
                <span class="${ styles.label}">Delete Theme</span>
              </div>
              <div id="applyTheme" class="${ styles.button} ${styles.hide}">
                <span class="${ styles.label}">Apply Theme</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    this.setupClickEvent();
  }

  /***** ***** 
  Create event listeners for Radio & Buttons
  ***** *****/
 public setupClickEvent(): void {

  let btnCreateTheme = document.getElementById("createTheme");
  btnCreateTheme.addEventListener("click", (e: Event) => this.createTheme());

  let btnUpdateTheme = document.getElementById("updateTheme");
  btnUpdateTheme.addEventListener("click", (e: Event) => this.updateTheme());

  let btnDeleteTheme = document.getElementById("deleteTheme");
  btnDeleteTheme.addEventListener("click", (e: Event) => this.deleteTheme());

  let btnApplyTheme = document.getElementById("applyTheme");
  btnApplyTheme.addEventListener("click", (e: Event) => this.applyThemeNew());

  let radioThemeActions = document.getElementsByName("themeAction");
  let parent = this;
  for (var i = 0, max = radioThemeActions.length; i < max; i++) {
    radioThemeActions[i].onclick = function () {
      let selectedValue = (<HTMLInputElement>this).value;
      if (selectedValue == 'delete') {
        parent.displayDeleteOptions();
      }
      else if (selectedValue == 'create') {
        parent.displayCreateOptions();
      }
      else if (selectedValue == 'update') {
        parent.displayUpdateOptions();
      }
      else if (selectedValue == 'apply') {
        parent.displayApplyOptions();
      }


    };
  };


}

/***** ***** 
Hide All Wrappers:
Generic method for hiding all of the form elements
***** *****/
public hideAllWrappers(): void {

  // Hide any other elements that might have been displayed
  document.getElementById(styles.themeNameWrapper).classList.add(styles.hide);
  document.getElementById(styles.themePaletteWrapper).classList.add(styles.hide);
  let wrappers = document.getElementsByClassName(styles.genericWrapper);
  for (let i = 0; i < wrappers.length; i++) {
    wrappers[i].classList.add(styles.hide);
  }


  let buttons = document.getElementsByClassName(styles.button);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.add(styles.hide);
  }

}

/***** ***** 
Display Update Options:
This method is used to display the form elements for the Theme Update Options.
***** *****/
public displayUpdateOptions(): void {
  // Hide all wrappers
  this.hideAllWrappers();

  this.populateExistingThemes("/_api/thememanager/GetTenantThemingOptions", {}).then((success: boolean) => {
    if (success) {
      // Display the dropdown.
      document.getElementById(styles.themeSelectWrapper).classList.remove(styles.hide);
      document.getElementById(styles.themePaletteWrapper).classList.remove(styles.hide);
      document.getElementById('updateTheme').classList.remove(styles.hide);
    }
  })

};


/***** ***** 
Display Create Options:
This method is used to display the form elements for the Theme Creation Options.
***** *****/
public displayCreateOptions(): void {

  // Hide all wrappers
  this.hideAllWrappers();

  // Display the dropdown.
  document.getElementById(styles.themeNameWrapper).classList.remove(styles.hide);
  document.getElementById(styles.themePaletteWrapper).classList.remove(styles.hide);
  document.getElementById('createTheme').classList.remove(styles.hide);


}

/***** ***** 
Display Delete Options:
This method is used to display the form elements for the Theme Deletion Options.
***** *****/
public displayDeleteOptions(): void {
  // Hide all wrappers
  this.hideAllWrappers();

  this.populateExistingThemes("/_api/thememanager/GetTenantThemingOptions", {}).then((success: boolean) => {
    if (success) {
      // Display the dropdown.
      document.getElementById(styles.themeSelectWrapper).classList.remove(styles.hide);
      document.getElementById('deleteTheme').classList.remove(styles.hide);
    }
  });
}

/***** ***** 
Display Apply Options:
This method is used to display the form elements for the Theme Apply Options.
***** *****/
public displayApplyOptions(): void {
  // Hide all wrappers
  this.hideAllWrappers();

  // Display the dropdown.
  document.getElementById(styles.themeNameWrapper).classList.remove(styles.hide);
  document.getElementById(styles.themePaletteWrapper).classList.remove(styles.hide);
  document.getElementById(styles.themeSiteURLWrapper).classList.remove(styles.hide);
  document.getElementById('applyTheme').classList.remove(styles.hide);
}

/***** ***** 
Populate Existing Themes:
This method retrieves the currently available themes in the tenant and inserts the values into the dropdown.
***** *****/
public populateExistingThemes(url, params): Promise<boolean> {


  return this.context.spHttpClient.get("/_api/thememanager/GetTenantThemingOptions", SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    }).then((themeJSON: any) => {
      // Clear the select
      let themeSelect = <HTMLInputElement>document.getElementById(styles.availableThemesSelect);
      themeSelect.innerHTML = "";

      for (let i = 0, max = themeJSON.themePreviews.length; i < max; i++) {
        let option = document.createElement("option");
        option.text = themeJSON.themePreviews[i].name;
        (<HTMLInputElement>themeSelect).appendChild(option);

      }
      return true;
    });

}

/***** ***** 
Create new theme at tenant level:
Collects the data needed to create a new theme at the tenant level and passes it to the creation execution method.
***** *****/
public createTheme(): void {

  // Gather the theme properties
  let themeTitle: string = (<HTMLInputElement>document.getElementById(styles.input)).value;
  let themePalette: JSON = JSON.parse((<HTMLInputElement>document.getElementById(styles.textarea)).value);
  let themePaletteJSON = {
    "palette": themePalette
  };

  // Pass the theme properties to themeManagerExecution method
  this.themeManagerExecution(this.context.pageContext.site.serverRelativeUrl + "/_api/thememanager/AddTenantTheme", { name: themeTitle, themeJson: JSON.stringify(themePaletteJSON) })
    .then((sucess: boolean) => {
      if (sucess) {
        //it worked
        alert('The theme has been successfully created');
      }
      else {
        //it didn't
        alert('An error has occurred');
      }
    });

}



/***** ***** 
Deletes a theme at tenant level:
Collects the data needed to delete a theme at the tenant level and passes it to the deletion execution method.
***** *****/
public deleteTheme(): void {

  // Gather the theme properties
  let themeTitle: string = (<HTMLInputElement>document.getElementById(styles.availableThemesSelect)).value;

  // Setup the success message
  let successMessage: string = 'The theme has been successfully deleted';

  // Pass the theme properties to themeManagerExecution method
  this.themeManagerExecution(this.context.pageContext.site.serverRelativeUrl + "/_api/thememanager/DeleteTenantTheme", { name: themeTitle })
    .then((sucess: boolean) => {
      if (sucess) {
        //it worked
        alert('The theme has been successfully deleted');
      }
      else {
        //it didn't
        alert('An error has occurred');

      }
    });
}

/***** ***** 
Updates a theme at tenant level:
Collects the data needed to update a theme at the tenant level and passes it to the update execution method.
***** *****/
public updateTheme(): void {

  // Gather the theme properties
  let themeTitle: string = (<HTMLInputElement>document.getElementById(styles.availableThemesSelect)).value;
  let themePalette: JSON = JSON.parse((<HTMLInputElement>document.getElementById(styles.textarea)).value);
  let themePaletteJSON = {
    "palette": themePalette
  }

  // Pass the theme properties to themeManagerExecution method
  this.themeManagerExecution(this.context.pageContext.site.serverRelativeUrl + "/_api/thememanager/UpdateTenantTheme", { name: themeTitle, themeJson: JSON.stringify(themePaletteJSON) })
    .then((sucess: boolean) => {
      if (sucess) {
        //it worked
        alert('The theme has been successfully updated');
      }
      else {
        //it didn't
        alert('An error has occurred');
      }
    });
}


/***** ***** 
Apply a theme to a site collection:
Collects the data needed to apply a theme directly to a site colleciton.
NOTE: This does NOT create a theme choice at the tenant level. It will directly apply the theme to a site collection.
***** *****/
public applyThemeNew(): void {

  // Gather the theme properties
  let themeURL: string = (<HTMLInputElement>document.getElementById(styles.siteurl)).value;
  let themeTitle: string = (<HTMLInputElement>document.getElementById(styles.input)).value;
  let themePalette: JSON = JSON.parse((<HTMLInputElement>document.getElementById(styles.textarea)).value);
  let themePaletteJSON = {
    "palette": themePalette
  }

  const digestCache: IDigestCache = this.context.serviceScope.consume(DigestCache.serviceKey);
  digestCache.fetchDigest(themeURL).then((digest: string): void => {

    // Pass the theme properties to themeManagerExecution method
    this.themeManagerExecution(themeURL + "/_api/thememanager/ApplyTheme", { name: themeTitle, themeJson: JSON.stringify(themePaletteJSON) })
      .then((sucess: boolean) => {
        if (sucess) {
          //it worked
          alert('The theme has been successfully applied');
        }
        else {
          //it didn't
          alert('An error has occurred');
        }
      });

  });

}

/***** ***** 
Generic method for creating, updating, deleting and applying a theme.
***** *****/
public themeManagerExecution(url: string, params: any): Promise<boolean> {

  let options: ISPHttpClientOptions = {
    body: JSON.stringify(params)
  }

  return this.context.spHttpClient.post(url, SPHttpClient.configurations.v1, options)
    .then((response: SPHttpClientResponse) => {
      return response.ok
    });

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
