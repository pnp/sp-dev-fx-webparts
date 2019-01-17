import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField,
  IPropertyPaneConditionalGroup,
  DynamicDataSharedDepth,
  IWebPartPropertiesMetadata
} from '@microsoft/sp-webpart-base';
import { DynamicProperty } from '@microsoft/sp-component-base';

import * as strings from 'DynamicDataConsumerWebPartStrings';
import DynamicDataConsumer from './components/DynamicDataConsumer';
import { IDynamicDataConsumerProps } from './components/IDynamicDataConsumerProps';
import { IContributor } from '../../services/GitHubService';

export interface IDynamicDataConsumerWebPartProps {
  contributor: DynamicProperty<IContributor>;
  alias: string;
  repo: string;
  repoOwner: string;
}

export default class DynamicDataConsumerWebPart extends BaseClientSideWebPart<IDynamicDataConsumerWebPartProps> {

  public render(): void {
    const { repo,
      repoOwner,
      alias,
      contributor
    } = this.properties;
    const contributorData: IContributor | undefined = contributor.tryGetValue();

    // we need to configure this if we didn't specify static or dynamic properties
    const needsConfiguration: boolean =
      (!repo // no static repo
        || !repoOwner // no static repo owner
        || !alias) // no static alias
      && (!contributor.tryGetSource()); // no dynamic data and no dynamic data source configured
    const element: React.ReactElement<IDynamicDataConsumerProps> = React.createElement(
      DynamicDataConsumer,
      {
        needsConfiguration: needsConfiguration,
        repo: repo,
        repoOwner: repoOwner,
        alias: alias,
        contributor: contributor,
        httpClient: this.context.httpClient,
        onConfigure: this._onConfigure
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'contributor': {
        dynamicPropertyType: 'object'
      }
    };
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PaneDescription
          },
          groups: [
            // Web part properties group for specifying the information about
            // the contributor
            {
              // Primary group is used to provide GitHub information
              // in a text field in the web part properties
              primaryGroup: {
                groupName: strings.StaticGroupName,
                groupFields: [
                  PropertyPaneTextField('repoOwner', {
                    label: strings.RepoOwnerFieldLabel
                  }),
                  PropertyPaneTextField('repo', {
                    label: strings.RepoFieldLabel
                  }),

                  PropertyPaneTextField('alias', {
                    label: strings.AliasFieldLabel
                  })
                ]
              },
              // Secondary group is used to retrieve the contributor from the
              // connected dynamic data source
              secondaryGroup: {
                groupName: strings.DynamicGroupName,
                groupFields: [
                  PropertyPaneDynamicFieldSet({
                    label: strings.ContributorDynamicFieldLabel,
                    fields: [
                      PropertyPaneDynamicField('contributor', {
                        label: strings.ContributorDynamicFieldLabel,
                        propertyValueDepth: DynamicDataSharedDepth.None
                      })]
                  })
                ]
              },
              // Show the secondary group only if the web part has been
              // connected to a dynamic data source
              showSecondaryGroup: !!this.properties.contributor.tryGetSource()
            } as IPropertyPaneConditionalGroup
          ]
        }
      ]
    };

  }

  protected get disableReactivePropertyChanges(): boolean {
    // set property changes mode to reactive, so that GitHub is not
    // called on each keystroke when typing in the repo, owner, and alias
    // in web part properties. We don't want to exceed GitHub's rate limit.
    return true;
  }

  /**
   * Event handler for clicking the Configure button on the Placeholder
   */
  private _onConfigure = (): void => {
    this.context.propertyPane.open();
  }
}
