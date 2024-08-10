import * as React from                                     'react';
import Moment from                                         'react-moment';

import { WebPartTitle } from                               '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from                                '@pnp/spfx-controls-react/lib/Placeholder';
import { List } from                                       '@fluentui/react/lib/List';
import { Link } from                                       '@fluentui/react/lib/Link';
import { Label } from                                      '@fluentui/react/lib/Label';
import { Icon } from                                       '@fluentui/react/lib/Icon';
import { Spinner, SpinnerSize } from                       '@fluentui/react/lib/Spinner';

import * as strings from                                   'RssReaderWebPartStrings';
import styles from                                         './RssReader.module.scss';

import { IRssReaderProps, IRssReaderState } from           './';

import { RssResultsTemplate } from                         '../Layouts';
import { RssReaderService, IRssReaderService } from        '../../../../services/RssReaderService';
import {
  IRssReaderResponse,
  IRssResult,
  IRssItem,
  IRssReaderRequest,
  FeedLayoutOption } from                                  '../../../../models';

import { IReadonlyTheme } from                             '@microsoft/sp-component-base';

export default class RssReader extends React.Component<IRssReaderProps, IRssReaderState> {

  private viewAllLinkLabel: string = strings.DefaultFeedViewAllLinkLabel;
  private feedLoadingLabel: string = strings.DefaultFeedLoadingLabel;
  private themeVariant: IReadonlyTheme;

  constructor(props:IRssReaderProps) {
    super(props);

    //override default label values if needed
    if (this.props.feedViewAllLinkLabel && this.props.feedViewAllLinkLabel.length > 0) {
      this.viewAllLinkLabel = this.props.feedViewAllLinkLabel;
    }
    if (this.props.feedLoadingLabel && this.props.feedLoadingLabel.length > 0) {
      this.feedLoadingLabel = this.props.feedLoadingLabel;
    }

    this.state = {
      rssFeedReady: false,
      rssFeed: {} as IRssReaderResponse,
      rssFeedError: ''
    };

    this.themeVariant = this.props.themeVariant;

    //load the rss feed
    this.loadRssFeed();
  }

  public render(): React.ReactElement<IRssReaderProps> {
    return (
      <div className={ styles.rssReader } style={{backgroundColor: this.themeVariant.semanticColors.bodyBackground}}>
        <div className={styles.rssReaderHeader}>
          <WebPartTitle displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateProperty}
            themeVariant={this.props.themeVariant} 
            moreLink={this.state.rssFeedReady && this.state.rssFeed && this.props.feedViewAllLink && this.props.feedViewAllLink.length > 0 && (
              <Link style={{color: this.themeVariant.semanticColors.link}} href={this.props.feedViewAllLink}>{this.viewAllLinkLabel}</Link>
            )}/>
        </div>

        {!this.props.feedUrl || this.props.feedUrl.length < 1 ? (
          <Placeholder
            iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            onConfigure={this._onConfigure} />
        ) : (
          <div>
            {!this.state.rssFeedReady ? (
              <div>
                {this.state.rssFeedError ? (
                  <div className={styles.messageError}>
                    <Icon
                      iconName={"Warning"}
                      className={styles.messageErrorIcon}
                    />
                    <Label className={styles.messageErrorLabel}>{strings.RssLoadError + ' - ' + this.state.rssFeedError}</Label>
                  </div>
                ) : (
                  <Spinner size={SpinnerSize.large} label={this.feedLoadingLabel} />
                )}
              </div>
            ) : (
              <div>
                {this.state.rssFeed ? (
                  <div>
                    {this.props.selectedLayout === FeedLayoutOption.Default && (
                      <List
                        className={styles.rssReaderList + (this.props.backgroundColor ? " " + styles.rssReaderListPadding : "")}
                        items={this.state.rssFeed.query.results.rss}
                        onRenderCell={this._onRenderListRow}
                        style={this.props.useThemeBackgroundColor ? {backgroundColor: this.themeVariant.semanticColors.bodyBackground} : this.props.backgroundColor ? {backgroundColor: this.props.backgroundColor} : {}}
                      />
                    )}

                    {this.props.selectedLayout === FeedLayoutOption.Custom && (
                      <div>
                        <RssResultsTemplate
                          templateService={this.props.templateService}
                          templateContent={this.props.templateContent}
                          templateContext={
                            {
                                items: this.state.rssFeed.query.results.rss,
                                totalItemCount: this.state.rssFeedReady ? this.state.rssFeed.query.count : 0,
                                returnedItemCount: this.state.rssFeedReady ? this.state.rssFeed.query.results.rss.length : 0,
                                strings: strings,
                            }
                        }
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Spinner size={SpinnerSize.large} label={strings.NoReturnedFeed} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  public componentDidUpdate(prevProps: any): void {
    //if specific resources change, we need to reload feed
    if(this.props.feedUrl !== prevProps.feedUrl ||
      this.props.feedService !== prevProps.feedService ||
      this.props.feedServiceApiKey !== prevProps.feedServiceApiKey ||
      this.props.feedServiceUrl !== prevProps.feedServiceUrl ||

      this.props.useCorsProxy !== prevProps.useCorsProxy ||
      this.props.corsProxyUrl !== prevProps.corsProxyUrl ||
      this.props.disableCorsMode !== prevProps.disableCorsMode ||

      this.props.maxCount !== prevProps.maxCount ||

      this.props.selectedLayout !== prevProps.selectedLayout ||
      this.props.externalTemplateUrl !== prevProps.externalTemplateUrl ||
      this.props.inlineTemplateText !== prevProps.inlineTemplateText ||

      this.props.showDesc !== prevProps.showDesc ||
      this.props.showPubDate !== prevProps.showPubDate ||
      this.props.descCharacterLimit !== prevProps.descCharacterLimit ||
      this.props.titleLinkTarget !== prevProps.titleLinkTarget ||
      this.props.dateFormat !== prevProps.dateFormat ||
      this.props.backgroundColor !== prevProps.backgroundColor ||
      this.props.useThemeBackgroundColor !== prevProps.useThemeBackgroundColor ||
      this.props.useThemeFontColor !== prevProps.useThemeFontColor ||
      this.props.fontColor !== prevProps.fontColor ||
      this.props.themeVariant !== prevProps.themeVariant
      ) {
      this.loadRssFeed();
    }

    if(this.props.feedViewAllLinkLabel !== prevProps.feedViewAllLinkLabel) {
      this.viewAllLinkLabel = this.props.feedViewAllLinkLabel;
    }
    if(this.props.feedLoadingLabel !== prevProps.feedLoadingLabel) {
      this.feedLoadingLabel = this.props.feedLoadingLabel;
    }
  }

  private _onConfigure = (): void => {
    this.props.propertyPane.open();
  }
  
  private decodeHtml = (html: string): string => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  
  /*
    _onReaderListRow used by Default feed Layout
  */
  private _onRenderListRow = (item: IRssResult, index: number | undefined): JSX.Element => {
    const thisItem: IRssItem = item.channel.item;

    //may need to strip html from description
    let displayDesc: string = thisItem.description;
    const div = document.createElement("div");
    div.innerHTML = displayDesc;
    displayDesc = (div.textContent || div.innerText || "").replace(/&nbsp;/ig, "").trim();

    return (
      <div className={styles.rssReaderListItem} data-is-focusable={true}>
        <div className={styles.itemTitle}>
          <Link
            href={thisItem.link}
            target={this.props.titleLinkTarget ? this.props.titleLinkTarget : "_self"}
            style={this.props.useThemeFontColor ? {color: this.themeVariant.semanticColors.link} : this.props.fontColor ? {color: this.props.fontColor} : {}}
          >
            {this.decodeHtml(thisItem.title)}
          </Link>

        </div>

        {this.props.showPubDate && (
          <div className={styles.itemDate} style={{color: this.themeVariant.semanticColors.bodySubtext}}>
            {this.props.dateFormat && this.props.dateFormat.length > 0 ? (
              <Moment
                format={this.props.dateFormat}
                date={thisItem.pubDate}
              />
            ) : (
              <div>{(new Date(thisItem.pubDate)).toLocaleDateString()}</div>
            )}
          </div>
        )}

        {this.props.showDesc && (
          <div className={styles.itemContent} style={{color: this.themeVariant.semanticColors.bodyText}}>
            {this.props.descCharacterLimit && (displayDesc.length > this.props.descCharacterLimit) ? (
              <div>
                {displayDesc.substring(0, this.props.descCharacterLimit) + '...'}
              </div>
            ) :
            (
              <div>
                {displayDesc}
              </div>
            )}
          </div>
        )}

      </div>
    );
  }

  /*
  load a rss feed based on properties
  */
  private loadRssFeed = async (): Promise<void> => {
    //require a feed url
    if (this.props.feedUrl && this.props.feedUrl.length > 0) {

      //always reset set
      this.setState({rssFeedReady: false, rssFeed: null});

      const rssReaderService: IRssReaderService = new RssReaderService();

      //build the query
      const feedRequest: IRssReaderRequest = {} as IRssReaderRequest;
      feedRequest.url = this.props.feedUrl;
      feedRequest.feedService = this.props.feedService;
      feedRequest.feedServiceApiKey = this.props.feedServiceApiKey;
      feedRequest.feedServiceUrl = this.props.feedServiceUrl;

      //cors
      feedRequest.useCorsProxy = this.props.useCorsProxy;
      if (this.props.useCorsProxy) {
        feedRequest.corsProxyUrl = this.props.corsProxyUrl;
      }
      feedRequest.disableCorsMode = this.props.disableCorsMode;

      feedRequest.maxCount = this.props.maxCount;

      //local storage / caching
      feedRequest.useLocalStorage = this.props.cacheResults;
      if (this.props.cacheResults) {
        feedRequest.useLocalStorageTimeout = this.props.cacheResultsMinutes;
        feedRequest.useLocalStorageKeyPrefix = this.props.cacheStorageKeyPrefix;
      }

      try {
        //attempt to get feed
        const rssFeed: IRssReaderResponse = await rssReaderService.getFeed(feedRequest);

        if (rssFeed && rssFeed.query && rssFeed.query.results) {

          this.setState({
            rssFeedReady: true,
            rssFeed: rssFeed,
            rssFeedError: ""
          });

        }
        else {

          this.setState({
            rssFeedReady: true,
            rssFeed: null,
            rssFeedError: strings.ErrorNoResults
          });
        }

      }
      catch (error) {

        this.setState({
          rssFeedReady: false,
          rssFeed: null,
          rssFeedError: error
        });

      }
    }
  }
}
