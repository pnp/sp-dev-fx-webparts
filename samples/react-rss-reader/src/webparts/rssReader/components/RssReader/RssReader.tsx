import * as React from                                     'react';
import Moment from                                         'react-moment';

import { WebPartTitle } from                               '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from                                '@pnp/spfx-controls-react/lib/Placeholder';
import { List } from                                       'office-ui-fabric-react/lib/List';
import { Link } from                                       'office-ui-fabric-react/lib/Link';
import { Label } from                                      'office-ui-fabric-react/lib/Label';
import { Icon } from                                       'office-ui-fabric-react/lib/Icon';
import { Spinner, SpinnerSize } from                       'office-ui-fabric-react/lib/Spinner';
import { autobind } from                                   'office-ui-fabric-react/lib/Utilities';

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

export default class RssReader extends React.Component<IRssReaderProps, IRssReaderState> {

  private viewAllLinkLabel: string = strings.DefaultFeedViewAllLinkLabel;
  private feedLoadingLabel: string = strings.DefaultFeedLoadingLabel;

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

    //load the rss feed
    this.loadRssFeed();
  }

  public render(): React.ReactElement<IRssReaderProps> {
    return (
      <div className={ styles.rssReader }>
        <div className={styles.rssReaderHeader}>
          <WebPartTitle displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateProperty} />

          {this.state.rssFeedReady && this.state.rssFeed && this.props.feedViewAllLink && this.props.feedViewAllLink.length > 0 && (
            <div className={styles.rssReaderListViewAll}>
              <a href={this.props.feedViewAllLink}>{this.viewAllLinkLabel}</a>
            </div>
          )}
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
                    {this.props.selectedLayout == FeedLayoutOption.Default && (
                      <List
                        className={styles.rssReaderList + (this.props.backgroundColor ? " " + styles.rssReaderListPadding : "")}
                        items={this.state.rssFeed.query.results.rss}
                        onRenderCell={this._onRenderListRow}
                        style={this.props.backgroundColor ? {backgroundColor: this.props.backgroundColor} : {}}
                      />
                    )}

                    {this.props.selectedLayout == FeedLayoutOption.Custom && (
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

  public componentDidUpdate(nextProps): void {
    //if specific resources change, we need to reload feed
    if(this.props.feedUrl != nextProps.feedUrl ||
      this.props.feedService != nextProps.feedService ||
      this.props.feedServiceApiKey != nextProps.feedServiceApiKey ||
      this.props.feedServiceUrl != nextProps.feedServiceUrl ||

      this.props.useCorsProxy != nextProps.useCorsProxy ||
      this.props.corsProxyUrl != nextProps.corsProxyUrl ||
      this.props.disableCorsMode != nextProps.disableCorsMode ||

      this.props.maxCount != nextProps.maxCount ||

      this.props.selectedLayout != nextProps.selectedLayout ||
      this.props.externalTemplateUrl != nextProps.externalTemplateUrl ||
      this.props.inlineTemplateText != nextProps.inlineTemplateText ||

      this.props.showDesc != nextProps.showDesc ||
      this.props.showPubDate != nextProps.showPubDate ||
      this.props.descCharacterLimit != nextProps.descCharacterLimit ||
      this.props.titleLinkTarget != nextProps.titleLinkTarget ||
      this.props.dateFormat != nextProps.dateFormat ||
      this.props.backgroundColor != nextProps.backgroundColor ||
      this.props.fontColor != nextProps.fontColor
      ) {
      this.loadRssFeed();
    }

    if(this.props.feedViewAllLinkLabel != nextProps.feedViewAllLinkLabel) {
      this.viewAllLinkLabel = this.props.feedViewAllLinkLabel;
    }
    if(this.props.feedLoadingLabel != nextProps.feedLoadingLabel) {
      this.feedLoadingLabel = this.props.feedLoadingLabel;
    }
  }

  @autobind
  private _onConfigure() {
    this.props.propertyPane.open();
  }
  
  private decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  
  /*
    _onReaderListRow used by Default feed Layout
  */
  @autobind
  private _onRenderListRow(item: IRssResult, index: number | undefined): JSX.Element {
    let thisItem: IRssItem = item.channel.item;

    //may need to strip html from description
    let displayDesc: string = thisItem.description;
    let div = document.createElement("div");
    div.innerHTML = displayDesc;
    displayDesc = (div.textContent || div.innerText || "").replace(/\&nbsp;/ig, "").trim();

    return (
      <div className={styles.rssReaderListItem} data-is-focusable={true}>
        <div className={styles.itemTitle}>
          <Link
            href={thisItem.link}
            target={this.props.titleLinkTarget ? this.props.titleLinkTarget : "_self"}
            style={this.props.fontColor ? {color: this.props.fontColor} : {}}
          >
            {this.decodeHtml(thisItem.title)}
          </Link>

        </div>

        {this.props.showPubDate && (
          <div className={styles.itemDate}>
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
          <div className={styles.itemContent}>
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
  private async loadRssFeed(): Promise<void> {

    //require a feed url
    if (this.props.feedUrl && this.props.feedUrl.length > 0) {

      //always reset set
      this.setState({rssFeedReady: false, rssFeed: null});

      let rssReaderService: IRssReaderService = new RssReaderService();

      //build the query
      let feedRequest: IRssReaderRequest = {} as IRssReaderRequest;
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
        var rssFeed: IRssReaderResponse = await rssReaderService.getFeed(feedRequest);

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
