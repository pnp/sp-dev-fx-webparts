import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'RealDataSampleWebPartStrings';
import RealDataSample from './components/RealDataSample';
import { IRealDataSampleProps } from './components/IRealDataSample.types';
import { IRealDataSampleWebPartProps } from './RealSampleWebPart.types';
import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';

/**
 * The id of the dynamic data property we'll pass around
 */
const contributorProperty = 'contributor';

export default class RealDataSampleWebPart extends BaseClientSideWebPart<IRealDataSampleWebPartProps> implements IDynamicDataCallables {
  /** the last selected contributor */
  private _selectedContributor: string;

  protected onInit(): Promise<void> {
    // register this web part as dynamic data source
    this.context.dynamicDataSourceManager.initializeSource(this);
    return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<IRealDataSampleProps > = React.createElement(
      RealDataSample,
      {
        repoOwner: this.properties.repoOwner,
        repo: this.properties.repo,
        context: this.context,
        onSelectionChange: (alias: string) => {
          this._onContributorSelected(alias);
        },
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
  public getPropertyValue(propertyId: string): string {
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
    // const newContributor: IContributor = {
    //   repoOwner: this.properties.repoOwner,
    //   repo: this.properties.repo,
    //   alias: alias
    // };
    // store the currently selected event in the class variable. Required
    // so that connected component will be able to retrieve its value
    // this._selectedContributor = newContributor;
    this._selectedContributor = alias;
    console.log("Contributor selected", alias);

    // notify subscribers that the selected event has changed
    this.context.dynamicDataSourceManager.notifyPropertyChanged(contributorProperty);
  }
}
