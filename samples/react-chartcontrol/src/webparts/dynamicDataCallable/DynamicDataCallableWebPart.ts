import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import * as strings from 'DynamicDataCallableWebPartStrings';
import DynamicDataCallable from './components/DynamicDataCallable';
import { IDynamicDataCallableProps } from './components/IDynamicDataCallableProps';
import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';
import { IContributor } from '../../services/GitHubService';

/**
 * The id of the dynamic data property we'll pass around
 */
const contributorProperty = 'contributor';

export interface IDynamicDataCallableWebPartProps {
  repoOwner: string;
  repo: string;
}

export default class DynamicDataCallableWebPart extends BaseClientSideWebPart<IDynamicDataCallableWebPartProps>  implements IDynamicDataCallables {
  /** the last selected contributor */
  private _selectedContributor: IContributor;

  protected onInit(): Promise<void> {
    // register this web part as dynamic data source
    this.context.dynamicDataSourceManager.initializeSource(this);
    return Promise.resolve();
  }


  public render(): void {
    const element: React.ReactElement<IDynamicDataCallableProps > = React.createElement(
      DynamicDataCallable,
      {
        repoOwner: this.properties.repoOwner,
        repo: this.properties.repo,
        httpClient: this.context.httpClient,
        onSelectionChange: (alias: string) => {
          this._onContributorSelected(alias);
        },
        onConfigure: this._onConfigure,
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

  /**
   * We're disabling reactive property panes here because we don't want the web part to try to fetch
   * statistics until both the repo owner and repo name have been filled it
   */
  protected get disableReactivePropertyChanges(): boolean {
    // require an apply button on the property pane
    return true;
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
                PropertyPaneTextField('repoOwner', {
                  label: strings.RepoOwnerFieldLabel,
                  description: strings.RepoOwnerFieldDescription
                }),
                PropertyPaneTextField('repo', {
                  label: strings.RepoFieldLabel,
                  description: strings.RepoFieldDescription
                })
              ]
            }
          ]
        }
      ]
    };
  }

  /**
   * Return list of dynamic data properties that this dynamic data source
   * returns
   */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: contributorProperty,
        title: strings.ContributorProperty
      }
    ];
  }

  /**
   * Return the current value of the specified dynamic data set
   * @param propertyId ID of the dynamic data set to retrieve the value for
   */
  public getPropertyValue(propertyId: string): IContributor {
    switch (propertyId) {
      case contributorProperty:
        return this._selectedContributor;
    }

    throw new Error(strings.BadPropertyIdErrorMessage);
  }

  /**
   * Event handler for selecting a contributor from a donut
   */
  private _onContributorSelected = (alias: string): void => {
    const contributor: IContributor = {
      alias: alias,
      repo: this.properties.repo,
      repoOwner: this.properties.repoOwner
    };
    this._selectedContributor = contributor;
    console.log('Data Callable Contributor selected', JSON.stringify(contributor));

    // notify subscribers that the selected event has changed
    this.context.dynamicDataSourceManager.notifyPropertyChanged(contributorProperty);
  }

  private _onConfigure = (): void => {
    this.context.propertyPane.open();
  }
}

