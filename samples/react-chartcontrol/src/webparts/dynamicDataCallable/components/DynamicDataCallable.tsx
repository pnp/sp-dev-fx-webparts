import * as React from 'react';
import styles from './DynamicDataCallable.module.scss';
import { IDynamicDataCallableProps } from './IDynamicDataCallableProps';
import * as strings from 'DynamicDataCallableWebPartStrings';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';

// used to add a chart control
import { ChartControl, ChartType, PaletteGenerator } from '@pnp/spfx-controls-react/lib/ChartControl';
import { ChartData } from 'chart.js';

// used to call GitHub
import { GitHubService } from '../../../services/GitHubService/GitHubService';
import { IGitHubService, IGitHubContributor } from '../../../services/GitHubService';

export class DynamicDataCallable extends React.Component<IDynamicDataCallableProps, {}> {
  /**
* The chart element
*/
private _chartElem: ChartControl = undefined;
private _tooltipElem: HTMLElement = undefined;
private _tooltipImg: HTMLImageElement = undefined;
private _avatarTitleElem: HTMLElement = undefined;
private _contributionsElem: HTMLElement = undefined;
private _contributionsLegendElem: HTMLElement = undefined;

  public render(): React.ReactElement<IDynamicDataCallableProps> {
    const {
      repoOwner,
      repo,
      onConfigure
    } = this.props;
    // if we're not configured, show the placeholder
    if (!repoOwner || !repo) {
      return <Placeholder
        iconName='GitGraph'
        iconText={strings.PlaceholderTitle}
        description={strings.PlaceholderDescription}
        buttonLabel={strings.ConfigureButton}
        onConfigure={onConfigure} />;
    }


    return (
      <div className={styles.dynamicDataCallable}>
        <ChartControl
          type={ChartType.Doughnut}
          ref={this._linkElement}
          datapromise={this._loadAsyncData()}
          loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.Loading} ariaLive="assertive" />}
          rejectedtemplate={(error: string) => <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
            {strings.Error}: {error}
          </MessageBar>}
          options={
            {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: strings.ChartTitle
              },
              tooltips: {
                enabled: false,
                custom: (tooltip => {
                  // get the custom tooltip element
                  const elem = this._tooltipElem;

                  // if chart.js wants to hide the tooltip, don't bother showing it
                  // who are we to argume
                  if (tooltip!.opacity === 0) {
                    elem.style.opacity = '0';
                    return;
                  }

                  // if there are no data points, don't do anything
                  if (tooltip!.dataPoints!.length < 1) {
                    return;
                  }

                  // get the data from the chart
                  const data = this._chartElem!.getChart()!.data as any;
                  const avatars = data!.avatars;
                  const dataPoint = tooltip!.dataPoints![0];
                  const alias = data!.labels[dataPoint!.index];
                  const contributions = data!.datasets[0].data[dataPoint!.index];
                  const avatarUrl = avatars[dataPoint!.index];
                  if (avatarUrl) {
                    // set the tooltip position and size
                    const positionX = this._chartElem.getCanvas().offsetLeft;
                    const positionY = this._chartElem.getCanvas().offsetTop;
                    elem.style.opacity = '1';
                    elem.style.left = positionX + tooltip.caretX + 'px';
                    elem.style.top = positionY + tooltip.caretY + 'px';
                    elem.style.fontFamily = tooltip._bodyFontFamily;
                    elem.style.fontSize = tooltip.bodyFontSize;
                    elem.style.fontStyle = tooltip._bodyFontStyle;
                    elem.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
                    elem.style.backgroundColor = tooltip.backgroundColor;
                    elem.style.borderRadius = tooltip.cornerRadius;
                    elem.style.width = tooltip.width + 64 + 'px';
                    elem.style.borderColor = tooltip.borderColor;
                    elem.style.borderWidth = tooltip.borderwidth;

                    // set the avatar img
                    this._tooltipImg.src = avatarUrl;
                    this._tooltipImg.alt = alias;
                    this._tooltipImg.style.borderColor = tooltip.titleFontColor;
                    this._tooltipImg.style.borderWidth = '1px';

                    // set the alias
                    this._avatarTitleElem.innerText = alias;
                    this._avatarTitleElem.style.color = tooltip.titleFontColor;
                    this._avatarTitleElem.style.fontSize = tooltip.titleFontSize;
                    this._avatarTitleElem.style.fontFamily = tooltip._titleFontFamily;
                    this._avatarTitleElem.style.fontWeight = tooltip._titleFontStyle;
                    this._avatarTitleElem.style.marginBottom = tooltip.titleMarginBottom + 'px';

                    // set the number of contributions
                    this._contributionsElem.innerText = contributions.toString();
                    this._contributionsElem.style.color = tooltip.bodyFontColor;
                    this._contributionsElem.style.fontSize = tooltip.bodyFontSize;
                    this._contributionsElem.style.fontFamily = tooltip._bodyFontFamily;
                    this._contributionsElem.style.fontWeight = tooltip._bodyFontStyle;
                    this._contributionsElem.style.paddingLeft = tooltip.bodySpacing + 'px';

                    // set the contribution legend
                    this._contributionsLegendElem.style.backgroundColor = tooltip.labelColors[0].backgroundColor;
                    this._contributionsLegendElem.style.borderColor = tooltip.labelColors[0].borderColor;
                  }
                })
              }
            }
          }
          onClick={(_ignored?: MouseEvent, activeElements?: Array<{}>) => {
            try {
              const clickedElement = activeElements![0];
              const clickedIndex: number = clickedElement!['_index'];
              const clickedContributor: string = clickedElement!['_chart'].chart.data.labels[clickedIndex];
              console.log('Data Callable Contributor', clickedContributor);
              this.props.onSelectionChange(clickedContributor);
            } catch (error) {

            }

            return {};
          }}
        />
        <div ref={this._linkTooltip} className={styles.tooltip}>
          <div className={styles.tooltipThumb}>
            <img ref={this._linkImg} className={styles.avatarImg} />
          </div>
          <div className={styles.tooltipContent}>
            <div ref={this._linkAvatarTitle} className={styles.tooltipTitle}></div>
            <div ref={this._linkContributionLegend} className={styles.tooltipLegend}></div>
            <div ref={this._linkContributions} className={styles.tooltipValue}></div>
          </div>
        </div>
      </div>
    );
  }

  /**
  * Links a reference to the chart so that we can
  * refer to it later and change its data
  */
  private _linkElement = (e: any) => {
    this._chartElem = e;
  }

  private _linkTooltip = (e: any) => {
    this._tooltipElem = e;
  }

  private _linkImg = (e: any) => {
    this._tooltipImg = e;
  }

  private _linkAvatarTitle = (e: any) => {
    this._avatarTitleElem = e;
  }

  private _linkContributions = (e: any) => {
    this._contributionsElem = e;
  }

  private _linkContributionLegend = (e: any) => {
    this._contributionsLegendElem = e;
  }

  /**
   * Loads data from a service.
   * This is where you would replace for your own code
   */
  private _loadAsyncData(): Promise<ChartData> {
    return new Promise<ChartData>((resolve, reject) => {
      const { httpClient,
        repoOwner,
        repo } = this.props;

      // Get the GitHub data provider
      const dataProvider: IGitHubService = new GitHubService();

      // Create an async request
      dataProvider.getContributors(httpClient, repoOwner, repo)
        .then((contributors: IGitHubContributor[]) => {
          const authors: string[] = contributors.map((contributor) => {
            return contributor.login;
          });

          const totalContributions: number[] = contributors.map((contributor) => {
            return contributor.contributions;
          });

          // We're storing custom data in the chart's data for later retrieval
          const avatars: string[] = contributors.map((contributor: IGitHubContributor) => {
            return contributor.avatar_url;
          });

          // Generate a cool gradient with as many steps as there are data elements
          const backgroundColor = PaletteGenerator.generateNonRepeatingGradient(
            [styles.vesaChromaticStart, styles.vesaChromaticEnd],
            totalContributions.length);

          const data = {
            labels: authors,
            avatars: avatars,
            datasets: [{
              label: strings.DatasetLabel,
              data: totalContributions,
              backgroundColor: backgroundColor,
              borderWidth: 1,
              borderColor: styles.borderColor
            }]
          };
          resolve(data);
        }, (error) => { reject(error); });
    });
  }
}
