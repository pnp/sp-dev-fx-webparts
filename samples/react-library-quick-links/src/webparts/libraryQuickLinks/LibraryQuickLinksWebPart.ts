import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { type IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-property-pane';

import * as strings from 'LibraryQuickLinksWebPartStrings';
import LibraryQuickLinks from './components/LibraryQuickLinks';
import { defaultHiddenLibraries } from './components/documentLibraries';
import { type ILibraryQuickLinksProps, type LibraryView, type LibrarySort } from './components/ILibraryQuickLinksProps';

export interface ILibraryQuickLinksWebPartProps {
  description: string;
  hiddenLibraries?: string;
  viewedAs?: LibraryView;
  sortBy?: LibrarySort;
  showMetadata?: boolean;
  showHeader?: boolean;
}

export default class LibraryQuickLinksWebPart extends BaseClientSideWebPart<ILibraryQuickLinksWebPartProps> {

  private _root: Root | undefined;

  public render(): void {
    const element: React.ReactElement<ILibraryQuickLinksProps> = React.createElement(
      LibraryQuickLinks,
      {
        webUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient: this.context.spHttpClient,
        hiddenLibraries: this.properties.hiddenLibraries ?? defaultHiddenLibraries,
        viewedAs: this.properties.viewedAs ?? 'tiles',
        sortBy: this.properties.sortBy ?? 'nameAsc',
        showMetadata: this.properties.showMetadata ?? false,
        showHeader: this.properties.showHeader ?? false,
        locale: this.context.pageContext.cultureInfo.currentUICultureName
      }
    );

    if (!this._root) {
      this._root = createRoot(this.domElement);
    }

    this._root.render(element);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
      this.domElement.style.setProperty('--cardBackground', semanticColors.bodyBackground || null);
      this.domElement.style.setProperty('--cardBorder', semanticColors.variantBorder || null);
      this.domElement.style.setProperty('--metadataText', semanticColors.bodySubtext || null);
    }

    this.domElement.style.setProperty('--accentBackground', currentTheme.palette?.themeLighterAlt || null);
    this.domElement.style.setProperty('--cardShadow', currentTheme.effects?.elevation4 || null);

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
          groupFields: [
            PropertyPaneDropdown('viewedAs', {
              label: strings.ViewedAsLabel,
              selectedKey: this.properties.viewedAs ?? 'tiles',
              options: [
                { key: 'tiles', text: strings.TilesViewLabel },
                { key: 'list', text: strings.ListViewLabel }
              ]
            }),
            PropertyPaneDropdown('sortBy', {
              label: strings.SortByLabel,
              selectedKey: this.properties.sortBy ?? 'nameAsc',
              options: [
                { key: 'nameAsc', text: strings.NameAscendingLabel },
                { key: 'nameDesc', text: strings.NameDescendingLabel },
                { key: 'modifiedAsc', text: strings.ModifiedAscendingLabel },
                { key: 'modifiedDesc', text: strings.ModifiedDescendingLabel }
              ]
            }),
            PropertyPaneToggle('showMetadata', {
              label: strings.ShowMetadataLabel,
              checked: this.properties.showMetadata ?? false
            }),
            PropertyPaneToggle('showHeader', {
              label: strings.ShowHeaderLabel,
              checked: this.properties.showHeader ?? false
            }),
            PropertyPaneTextField('hiddenLibraries', {
              label: strings.HiddenLibrariesLabel,
              description: strings.HiddenLibrariesDescription,
              value: this.properties.hiddenLibraries ?? defaultHiddenLibraries,
              multiline: true,
              rows: 6
            })
          ]
        }]
      }]
    };
  }

}
