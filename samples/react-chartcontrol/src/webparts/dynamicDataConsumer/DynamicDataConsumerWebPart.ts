import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';

// standard web part stuff
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneDynamicFieldSet, PropertyPaneDynamicField, IPropertyPaneConditionalGroup, DynamicDataSharedDepth } from "@microsoft/sp-property-pane";

// dynamic data web parts
import { DynamicProperty } from '@microsoft/sp-component-base';

// localization
import * as strings from 'DynamicDataConsumerWebPartStrings';

// component rendering
import DynamicDataConsumer from './components/DynamicDataConsumer';
import { IDynamicDataConsumerProps } from './components/IDynamicDataConsumerProps';
import { IContributor, IGitHubService, IAuthorCommit } from '../../services/GitHubService';

// Needed to retrieve GitHub data
import GitHubService from '../../services/GitHubService/GitHubService';

// used to group GitHub results by date
import { groupBy, toPairs } from '@microsoft/sp-lodash-subset';
import * as moment from 'moment';

// used to add a chart control
import { PaletteGenerator } from '@pnp/spfx-controls-react/lib/ChartControl';

// Used to render placeholders and error messages
import { Placeholder, IPlaceholderProps } from '@pnp/spfx-controls-react/lib/Placeholder';
import { MessageBar, MessageBarType, IMessageBarProps } from 'office-ui-fabric-react/lib/MessageBar';

//Orange color
const CHARTCOLOR: string = "#ffa500";
const CHARTALPHA: number = 0.2;

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

    // we need to configure this if we didn't specify static or dynamic properties
    const contributorSource = contributor.tryGetSource();
    const needsConfiguration: boolean =
      (!repo // no static repo
        || !repoOwner // no static repo owner
        || !alias) // no static alias
      && (!contributorSource); // no dynamic data and no dynamic data source configured
    if (needsConfiguration) {
      this._renderPlaceholder();
    } else {
      if (contributor.tryGetValue() === undefined) {
        this._renderPrompt();
      } else {
        this._renderChart();
      }
    }
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
   * Renders the chart with contributions
   */
  private _renderChart = (): void => {
    const {
      contributor
    } = this.properties;
    const contributorData: IContributor | undefined = contributor.tryGetValue();

    let repoOwner: string = undefined;
    let repo: string = undefined;
    let alias: string = undefined;
    try {
      repoOwner = contributorData.repoOwner;
      repo = contributorData.repo;
      alias = contributorData.alias;
    } catch (error) {
    }

    if (!repoOwner || !repo || !alias) {
      // this shouldn't happen
      return undefined;
    }

    this._loadAsyncData(contributorData).then((data: Chart.ChartData) => {
      const element: React.ReactElement<IDynamicDataConsumerProps> = React.createElement(
        DynamicDataConsumer,
        {
          data,
          alias
        }
      );

      ReactDom.render(element, this.domElement);
    }, ((error: any) => {
      const element: React.ReactElement<IMessageBarProps> = React.createElement(
        MessageBar,
        {
          messageBarType: MessageBarType.error,
          isMultiline: false,
        }, [
          strings.Error + ":" + error
        ]
      );
      ReactDom.render(element, this.domElement);
    }));
  }

  /**
   * Renders a placeholder prompting users to pick a contributor
   */
  private _renderPrompt = (): void => {
    const element: React.ReactElement<IPlaceholderProps> = React.createElement(
      Placeholder,
      {
        iconName: 'GitGraph',
        iconText: strings.PlaceHolderDynamicDataTitle,
        description: strings.PlaceHolderDynamicDataDescription
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Renders a placeholder prompting users to configure the web part
   */
  private _renderPlaceholder = (): void => {
    const element: React.ReactElement<IPlaceholderProps> = React.createElement(
      Placeholder,
      {
        iconName: 'Edit',
        iconText: strings.PlaceHolderConfigureTitle,
        description: strings.PlaceHolderConfigureDescription,
        buttonLabel: strings.ConfigureButtonLabel,
        onConfigure: () => { this.context.propertyPane.open(); }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Loads data from a service.
   * This is where you would replace for your own code
   */
  private _loadAsyncData = (contributorData: IContributor): Promise<Chart.ChartData> => {
    const {
      repoOwner,
      repo,
      alias
    } = contributorData;

    return new Promise<Chart.ChartData>((resolve, reject) => {
      // Get the GitHub data provider
      const dataProvider: IGitHubService = new GitHubService();

      // Create an async request
      dataProvider.getCommits(this.context.httpClient, repoOwner, repo, alias)
        .then((commits: IAuthorCommit[]) => {

          // Group them by month
          var groupedOccurences: [string, IAuthorCommit[]][] = toPairs(groupBy(commits, (commit) => moment(commit.commit.author.date).startOf('month')));

          // Create time series structures so that Chart.js can display them
          const uniqueDateList: { "t": string, "y": number }[] = [];
          groupedOccurences.forEach(group => {
            uniqueDateList.push({ "t": group[0], "y": group[1].length });
          });

          // sort that list so that we don't get overlapped bars on the chart
          uniqueDateList.sort((leftSide, rightSide): number => {
            // convert to moments so that we can sort them as dates
            const leftMoment = moment(leftSide.t);
            const rightMoment = moment(rightSide.t);
            if (leftMoment.isBefore(rightMoment)) {
              return -1;
            }
            if (leftMoment.isAfter(rightMoment)) {
              return 1;
            }
            return 0;
          });

          // Generate an orange semi transparent color
          const backgroundColor = PaletteGenerator.alpha(CHARTCOLOR, CHARTALPHA);

          const data: Chart.ChartData = {
            datasets: [{
              label: strings.SeriesLabel,
              data: uniqueDateList,
              //backgroundColor: backgroundColor,
              // make lines thicker than usual
              borderWidth: 2,
              borderColor: CHARTCOLOR,
              // make a small empty point
              pointBorderWidth: 2,
              pointBackgroundColor: "#fff",
              // make a big semi-transparent border on hover
              pointHoverBorderWidth: 15,
              pointHoverBackgroundColor: CHARTCOLOR,
              pointHoverBorderColor: backgroundColor,
              pointHitRadius: 30,
              fill: false,
              lineTension: 0.000001 // make lines straight
            }]
          };
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }
}
