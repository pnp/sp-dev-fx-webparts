import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneCheckbox,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import DocumentExplorer from './components/DocumentExplorer';
import { IDocumentExplorerProps } from './components/IDocumentExplorerProps';
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/folders";
import "@pnp/sp/files";

export interface IDocumentExplorerWebPartProps {
  description: string;
  selectedLibrary: string;
  manualLibraries: string;
  showFolderTree: boolean;
  showFileList: boolean;
  showFilterPanel: boolean;
  layoutType: string;
}

export default class DocumentExplorerWebPart extends BaseClientSideWebPart<IDocumentExplorerWebPartProps> {
  
  private _availableLibraries: IPropertyPaneDropdownOption[] = [];
  private _sp: SPFI;

  protected async onInit(): Promise<void> {
    await super.onInit();
    
    console.log('Initializing Document Explorer...');
    
    this._sp = spfi().using(SPFx(this.context));

    await this.fetchAvailableLibraries();
    
    console.log('Initialization complete');
  }

  private async fetchAvailableLibraries(): Promise<void> {
    try {
      const currentSiteUrl = this.context.pageContext.web.serverRelativeUrl;
      
      console.log('Current site:', currentSiteUrl);
      console.log('Fetching libraries...');
      
      const lists = await this._sp.web.lists
        .filter("BaseTemplate eq 101 and Hidden eq false")
        .select("Title", "Id", "ItemCount", "RootFolder/ServerRelativeUrl")
        .expand("RootFolder")();
      
      console.log('Found', lists.length, 'libraries');
      
      // Build dropdown options
      this._availableLibraries = lists.map(list => ({
        key: list.RootFolder.ServerRelativeUrl,
        text: `${list.Title} (${list.ItemCount || 0} items)`
      }));

      this._availableLibraries.unshift({
        key: '',
        text: '-- Select libraries --'
      });

      if (!this.properties.selectedLibrary && !this.properties.manualLibraries) {
        const sharedDocsLib = lists.find(list => 
          list.Title === 'Shared Documents' || 
          list.Title === 'Documents'
        );
        
        if (sharedDocsLib) {
          this.properties.selectedLibrary = sharedDocsLib.RootFolder.ServerRelativeUrl;
          console.log('Auto-selected:', sharedDocsLib.Title);
        }
      }
      
    } catch (error) {
      console.error("Error fetching libraries:", error);
      this._availableLibraries = [{
        key: '',
        text: 'Error loading libraries'
      }];
    }
  }

  public render(): void {
    let selectedLibrariesArray: string[] = [];
    
    if (this.properties.selectedLibrary && this.properties.selectedLibrary !== '') {
      selectedLibrariesArray.push(this.properties.selectedLibrary);
    }

    if (this.properties.manualLibraries) {
      const manualUrls = this.properties.manualLibraries
        .split(',')
        .map(url => url.trim())
        .filter(url => url && url !== '');
      selectedLibrariesArray = [...selectedLibrariesArray, ...manualUrls];
    }
    
    // Remove duplicates
    selectedLibrariesArray = [...new Set(selectedLibrariesArray)];

    console.log('Selected libraries for render:', selectedLibrariesArray);

    const element: React.ReactElement<IDocumentExplorerProps> = React.createElement(
      DocumentExplorer,
      {
        description: this.properties.description,
        selectedLibraries: selectedLibrariesArray,
        showFolderTree: this.properties.showFolderTree !== false,
        showFileList: this.properties.showFileList !== false,
        showFilterPanel: this.properties.showFilterPanel !== false,
        layoutType: this.properties.layoutType || 'row',
        context: this.context,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        sp: this._sp
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    console.log('Building property pane...');
    console.log('Available libraries:', this._availableLibraries.length);
    
    return {
      pages: [
        {
          header: {
            description: `Configure Document Explorer for: ${this.context.pageContext.web.title}`
          },
          groups: [
            {
              groupName: "Library Selection",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Description",
                  value: this.properties.description || "Document Explorer"
                }),
                PropertyPaneDropdown('selectedLibrary', {
                  label: "Select a Document Library",
                  options: this._availableLibraries,
                  selectedKey: this.properties.selectedLibrary || ''
                }),
                PropertyPaneTextField('manualLibraries', {
                  label: "Or enter multiple library URLs (comma-separated)",
                  multiline: true,
                  rows: 3,
                  description: "Example: /sites/sai/Documents,/sites/sai/Shared Documents",
                  placeholder: "Enter library server relative URLs separated by commas",
                  value: this.properties.manualLibraries || ''
                })
              ]
            },
            {
              groupName: "Display Options",
              groupFields: [
                PropertyPaneCheckbox('showFolderTree', {
                  text: 'Show Folder Tree',
                  checked: this.properties.showFolderTree !== false
                }),
                PropertyPaneCheckbox('showFileList', {
                  text: 'Show File List',
                  checked: this.properties.showFileList !== false
                }),
                PropertyPaneCheckbox('showFilterPanel', {
                  text: 'Show Filter Panel',
                  checked: this.properties.showFilterPanel !== false
                }),
                PropertyPaneDropdown('layoutType', {
                  label: 'Layout Type',
                  options: [
                    { key: 'row', text: 'Row (3-column)' },
                    { key: 'stacked', text: 'Stacked (Mobile)' }
                  ],
                  selectedKey: this.properties.layoutType || 'row'
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): void {
    console.log('Property changed:', propertyPath, 'from', oldValue, 'to', newValue);
    
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    
    if (propertyPath === 'selectedLibrary' || propertyPath === 'manualLibraries') {
      this.render();
    }
  }

  protected onPropertyPaneConfigurationStart(): void {
    console.log('Property pane opened');

    if (this._availableLibraries.length <= 1) {
      this.fetchAvailableLibraries().then(() => {
        this.context.propertyPane.refresh();
      }).catch(err => {
        console.error('Error refreshing libraries:', err);
      });
    }
  }
}