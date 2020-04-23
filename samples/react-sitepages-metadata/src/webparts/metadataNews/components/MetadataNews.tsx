import * as React from 'react';
import styles from './MetadataNews.module.scss';
import { IMetadataNewsProps, IMetadataNewsState, IMetadataRefinerInfo, IMetadataNewsItem, ILookupInfo, ILoadNewsResult, 
        IMetadataNewsPageCollectionInfo, unescapeHTML, IMetadataContextualMenuItemResult } from '../../../interfaces';
import MetadataNewsRefiners from './MetadataNewsRefiners';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp, PagedItemCollection } from '@pnp/sp';
import { IContextualMenuItem, ActionButton, Label, Spinner, SpinnerSize, 
        Dialog, DialogType, DialogFooter, PrimaryButton, Image, ImageFit } from 
        '@microsoft/office-ui-fabric-react-bundle';
        //'office-ui-fabric-react/lib';
import { DocumentCard, DocumentCardActivity, DocumentCardPreview, DocumentCardTitle, DocumentCardType } from 
        '@microsoft/office-ui-fabric-react-bundle';
        //'office-ui-fabric-react/lib/DocumentCard';

import Truncate from 'react-truncate';

// array.from shim for some versions of IE
let from = require('array.from');
if (Array['from'] === undefined) {
  Array['from'] = from.shim();
}

// Plugin used for neatly arranging news items in the multiple column mode
import { CSSGrid, measureItems, layout } from 'react-stonecutter';
// measureItems is a higher order function that wraps CSSGrid component and returns another component (also grid, but that takes into account actual item image heights)
const Grid = measureItems(CSSGrid, { measureImages: true });

// A simple wrapper used in the MetadataNews component - conditionally injects Grid if multi column mode is enabled
class Wrapper extends React.Component<any,any> {
  constructor(props: any, state: any) {
    super(props);
  }

  public render() {
    return this.props.multiColumn ?
      <div style={{display: this.props.itemCount > 0 ? "block" : "none", margin: "0 auto"}}>
        <Grid component="div" columns={this.props.columns} gutterWidth={10} gutterHeight={10} columnWidth={this.props.columnWidth} layout={layout.pinterest} >
          {this.props.children}
        </Grid>
      </div> :
      <div style={{display: this.props.itemCount > 0 ? "block" : "none", margin: "0 auto"}}>
        {this.props.children}
      </div>;
  }
}

// Main component
export default class MetadataNews extends React.Component<IMetadataNewsProps, IMetadataNewsState> {
  private containerElement: HTMLElement = null;
  private themeBackgroundColor: string = null;
  private wrapper: React.ClassicComponentClass<{}>;

  constructor(props: IMetadataNewsProps, state: IMetadataNewsState) {
    super(props);

    this.state = {
        currentNewsItems: [],
        currentRefiners: [],
        pagedCollectionInfos: null,
        currentPage: 1,
        loading: false,
        dialogItem: null,
        containerWidth: 0,
        containerHeight: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    sp.setup({
      sp: {
        headers: {
          Accept: 'application/json;odata=verbose'
        },
        baseUrl: this.props.webUrl
      }
    });
  }

  public shouldComponentUpdate(nextProps: IMetadataNewsProps, nextState: IMetadataNewsState) {
    return JSON.stringify(this.props) != JSON.stringify(nextProps) ||
           JSON.stringify(this.state) != JSON.stringify(nextState);
  }

  // To make component render quickly the actual data retrieval starts after initial render in componentDidMount event
  public componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    // Waiting for __themeState__ variable to become available to correctly read the theme configuration (if present) and then loading the data
    let reTryCount = 10;
    let intervalId = setInterval(() => {
      if ((window["__themeState__"] !== null && window["__themeState__"].theme !== null) || reTryCount < 1) {
        this.themeBackgroundColor = window["__themeState__"].theme ?
          window["__themeState__"].theme.accent : 
          "#0078d7";

        clearInterval(intervalId);
        this.loadNews();
      }
      reTryCount--;
    }, 200);
  }

  // Removing event handler
  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  // Rendering logic
  public render(): React.ReactElement<IMetadataNewsProps> {
    let startItemsPosition = (this.state.currentPage - 1) * this.props.ItemLimit;
    let endItemsPosition = startItemsPosition + parseInt(this.props.ItemLimit as any);
    let docType = DocumentCardType.compact;

    if (this.state.containerWidth < 600) {
      docType = DocumentCardType.normal;
    }

    let itemMaxWidthNumber = parseInt(this.props.ItemHeight) * 1.7;
    let itemMaxWidth = `inherit`;
    let columnCount = 1; 

    if (this.props.multiColumn) {
      columnCount = Math.floor(this.state.containerWidth / itemMaxWidthNumber);
      docType = DocumentCardType.normal;
      itemMaxWidth = `${itemMaxWidthNumber}px`;
    }

    return (
        <div className={styles.metadataNews}>
          <div className={styles.container} id={styles.newsContainer} style={{maxWidth: `${this.props.containerWidth}px`}}>          
            <MetadataNewsRefiners {...this.props} themeBackgroundColor={this.themeBackgroundColor} onContextualItemClick={(filterNodes) => this.handleRefinerChange(filterNodes)} />
              
            <div className={styles.row}>
              <div className={styles.column}>
              
              {/* Paging */}
              <div style={{margin: "0 auto", textAlign: "center"}}>
                { 
                  this.state.currentPage > 1 ?
                  <ActionButton data-automation-id='pagePrev' iconProps={{iconName: 'PageLeft'}} 
                    onClick={() => {
                      if (this.state.currentPage == 2) {
                        this.setState({pagedCollectionInfos: null, currentPage: 1, currentNewsItems: []}, () => {
                          this.loadNews();
                        });
                      } else {
                        this.changePage(false);
                      }
                    }}></ActionButton>
                  : null
                }
                <Label style={{display: "inline-block", lineHeight: "40px", padding: 0, color: "#908989"}}>Page {this.state.currentPage}</Label>
                { 
                  this.state.pagedCollectionInfos != null && this.state.pagedCollectionInfos.length > 0 && this.state.pagedCollectionInfos[0].collection.hasNext ?
                  <ActionButton data-automation-id='pageNext' iconProps={{iconName: 'PageRight'}} onClick={() => this.changePage(true)}></ActionButton> 
                  : null
                }
              </div>
              
              {/* Shows the dialog component if user clicked on an item */}
              {this.state.dialogItem == null ? null : 
                <Dialog
                  isOpen={true}
                  hidden={false}
                  onDismiss={() => this.setState({dialogItem: null})}
                  dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: this.state.dialogItem.title,
                    responsiveMode: 5, //or ResponsiveMode.xxxLarge,
                    showCloseButton: true,
                    className: styles.dialogMainOverride
                  }}
                  modalProps={{
                    isBlocking: false,
                    responsiveMode: 5, //or ResponsiveMode.xxxLarge,
                    containerClassName: styles.dialogMainOverride,
                    firstFocusableSelector: styles.dialogMainOverride
                  }}
                >
                  {this.state.dialogItem.bannerImg != null ? 
                    <Image alt="" src={this.state.dialogItem.bannerImg} style={{maxWidth: "100%", margin: "0 auto"}}/> 
                  : null}
                  <div className={styles.dialogMainOverride} dangerouslySetInnerHTML={{__html: this.state.dialogItem.content}}></div>
                  <DialogFooter><PrimaryButton onClick={() => this.setState({dialogItem: null})} text='Close' /></DialogFooter>
                </Dialog>
              }

              {this.state.loading ? 
                  <Spinner size={SpinnerSize.large} label='Loading...' ariaLive='assertive' /> 
                :
                  <Wrapper itemCount={this.state.currentNewsItems.length} columns={columnCount} multiColumn={this.props.multiColumn} columnWidth={itemMaxWidthNumber}>
                    {
                        this.state.currentNewsItems.map((n: IMetadataNewsItem, i) => {
                            if (i < startItemsPosition || i >= endItemsPosition) {
                              return null;
                            }

                            return (
                              /* Below is the template for each rendered news item */
                              <div style={{margin: "10px", minHeight: `${this.props.ItemHeight}px`, maxWidth: itemMaxWidth}} className={styles.docCards} >
                                {/* Reusing... or rather brutally abusing the DocumentCard and related components to instead display news item content in them */}
                                <DocumentCard type={docType}
                                  onClick={() => { this.onItemClick(n); }} >
                                  
                                  {/* Image rendering code */}
                                  {n.bannerImg == null || n.bannerImg == "" ? null : 
                                    <div style={{maxWidth: `${parseInt(this.props.ItemHeight) * 1.7}px`}}>
                                      <DocumentCardPreview previewImages={[{
                                        url: n.bannerImg,
                                        name: "...",
                                        previewImageSrc: n.bannerImg,
                                        height: parseInt(this.props.ItemHeight),
                                        
                                        imageFit: ImageFit.cover,
                                        errorImageSrc: "/_layouts/images/prvnews.gif"
                                      }]} />
                                    </div>
                                  }

                                  {/* Title and news item body rendering code */}
                                  <div style={{width: `calc(100% - ${n.bannerImg == null || n.bannerImg == ""  || docType == DocumentCardType.normal ? 0 : parseInt(this.props.ItemHeight) * 1.7}px)`}}>
                                    <DocumentCardTitle
                                      title={n.title}
                                      shouldTruncate={true} 
                                    />
                                    <div className={styles.docCardActivity}>
                                      <div className="docCardContents">
                                        <Truncate lines={4} ellipsis={<span>...</span>}>
                                          <p dangerouslySetInnerHTML={{__html: this.extractContents(n.content)}}></p>
                                        </Truncate>
                                      </div>
                                      <DocumentCardActivity
                                        activity={n.lookupMetadata != null ? unescapeHTML(this.combinePostMetadata(n.lookupMetadata)) : ''}
                                        people={[{name: n.created.toString(), profileImageSrc: null}]}
                                      />
                                    </div>
                                  </div>
                                </DocumentCard>
                              </div>
                            );
                        })
                    }
                  </Wrapper>
                }
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Join the titles of lookup field values from multiple lookup fields for a single item
  private combinePostMetadata(lookupInfos: ILookupInfo[]): string {
    let toReturn = '';
    let combined = lookupInfos.map(ni => {
      let vals = ni.lookupValues.map(v => v.lookupValue);
      let res = [];
      for (let v of vals) {
        if (v != null) {
          res.push(v);  
        }
        return res.length == 0 ? null : res.join('; ');
      }
    });

    combined = combined.filter((n) => n != undefined );
    toReturn = combined.join('; ');
    return toReturn;
  }

  // Make main container dimensions-aware
  private updateWindowDimensions() {
    this.containerElement = window.document.getElementById(styles.newsContainer);
    if (this.containerElement != null) {
      this.setState({ 
        containerWidth: this.containerElement.offsetWidth, 
        containerHeight: this.containerElement.offsetHeight
      });
    }
  }

  private onItemClick(item: IMetadataNewsItem) {   
    this.setState({dialogItem: item});
  }

  // Paging logic - change page number and call the loadNews method when going forward
  private changePage(toNextPage: boolean) {
    if (toNextPage && this.state.currentNewsItems.length >= this.props.ItemLimit) {
      this.setState({currentPage: this.state.currentPage + 1}, () => {
        let itemsLimit = this.state.currentPage * this.props.ItemLimit;
        if (this.state.currentNewsItems.length < itemsLimit) {
          this.loadNews();
        }
      });
    } else if (this.state.currentPage > 1) {
      this.setState({currentPage: this.state.currentPage - 1});      
    }
  }

  // Compose SharePoint REST API filter string
  private getRestFilter() {
    let filter = "ContentType eq 'Site Page' and PromotedState eq 2";
    filter += this.props.AdditionalFilter != null && this.props.AdditionalFilter.length > 0 ? ` and ${this.props.AdditionalFilter}` : "";

    // sort the filters into { internalName, [values] } objects
    let sortedRefiners = [];
    for (let item of this.state.currentRefiners) {
      if (!sortedRefiners.some(val => val.internalName == item.data)) {
        sortedRefiners.push({ internalName: item.data, values: [item.name]});
      } else {
        let info = sortedRefiners.filter(it => it.internalName == item.data);
        if (info != null && info.length > 0) {
          let itemInfo = info[0];
          itemInfo.values.push(item.name);
        }
      }
    }

    for (let itemInfo of sortedRefiners) {
      for (let i = 0; i < itemInfo.values.length; i++) {
        let currentFilterPart = `${itemInfo.internalName}/Title eq '${encodeURIComponent(itemInfo.values[i]).replace("'",'%27%27')}'`;
        if (filter.length == 0) {
          filter = currentFilterPart;
        } else {
          filter += ` and ${currentFilterPart}`;
        }
      }
    }
    
    //console.log(`filter: ${filter}`);
    //filter = encodeURI(filter);
    //console.log(`filter encoded: ${filter}`);
    return filter;
  }

  // Build the pnp news request and return Promise object
  private constructNewsRequest(ris: IMetadataRefinerInfo[]) {
    let listName = "Site Pages";
    let toSelect: string[] = ["ID", "CanvasContent1", "BannerImageUrl", "Created", "Title", "FileRef", "FileLeafRef", 
                              "Author/Name", "Editor/Name", "Author/Title", "Editor/Title"];
    let toExpand: string[] = ["Author", "Editor"];
    ris.forEach(ri => {
      toSelect.push(`${ri.InternalName}/Title`);
      toSelect.push(`${ri.InternalName}/Id`);
      toExpand.push(ri.InternalName);
    });

    let promise: Promise<PagedItemCollection<any>> = sp.web.lists.getByTitle(listName).items.filter(this.getRestFilter())
      .select(...toSelect).expand(...toExpand).orderBy("Created", false).top(this.props.ItemLimit).getPaged();

    return promise;
  }

  // Main news getting request logic
  private processNewsRequest(promise: Promise<PagedItemCollection<any>>, ris: IMetadataRefinerInfo[], allNewsItems: IMetadataNewsItem[]) {
    let infosPromise: Promise<ILoadNewsResult> = new Promise<ILoadNewsResult>((resolve, reject) => {
      let toResolve: ILoadNewsResult = {
        infos: [],
        pagedItems: null
      };

      promise.then((val: PagedItemCollection<any>) => {
        for (let item of val.results) {
          let newsItem = null;

          for (let ni of allNewsItems) {
            if (ni.id == item.ID) {
              newsItem = ni;
              break;
            }
          }

          // Build a JSON object holding relevant list item data
          if (newsItem == null) {
            newsItem = {
              id: item.ID,
              bannerImg: item.BannerImageUrl != null ? item.BannerImageUrl.Url : "",
              title: item.Title,
              url: item.FileRef,
              content: item.CanvasContent1.replace("data-sp-componentid", "style=\"display: none;\" data-sp-componentid"),
              created: item.Created.split('T')[0]
            } as IMetadataNewsItem;
            toResolve.infos.push(newsItem);
          }
          
          // Supplement 
          ris.forEach(ri => {
            if (item[ri.InternalName] != null && ri.InternalName != this.props.HideRefinerFromItemCard) {
              if (newsItem.lookupMetadata == null) {
                newsItem.lookupMetadata = [];
              }
  
              let lookupMetadataItem: ILookupInfo;
              if (newsItem.lookupMetadata.some(lm => lm.lookupFieldInternalName == ri.InternalName)) {
                lookupMetadataItem = newsItem.lookupMetadata.filter(lm => lm.lookupFieldInternalName == ri.InternalName)[0];
              } else {
                lookupMetadataItem = {
                  lookupFieldInternalName: ri.InternalName,
                  lookupFieldDisplayName: ri.DisplayName,
                  lookupFieldIsMultiValue: ri.IsMultiValue,
                  lookupFieldLookupList: null,
                  lookupValues: []
                };
                newsItem.lookupMetadata.push(lookupMetadataItem);
              }
  
              lookupMetadataItem.lookupValues.push({
                lookupId: item[ri.InternalName].Id,
                lookupValue: item[ri.InternalName].Title
              });
            }
          });
        }
        toResolve.pagedItems = val;

        resolve(toResolve);
      }).catch(err => {
        console.error(err);
        resolve(toResolve);
      });
    });
    return infosPromise;
  }

  // This method gets called when actual requests are needed
  private loadNews() {
    this.setState({loading: true});
  
    let allItemInfos: IMetadataNewsItem[] = [];
    let pagedItemCollections: IMetadataNewsPageCollectionInfo[] = [];
    let loadPromises: Promise<PagedItemCollection<any>>[] = [];

    // This branch handles subsequent requests
    if (this.state.pagedCollectionInfos != null) {
      for (let pagePartInfo of this.state.pagedCollectionInfos) {
        let promise = pagePartInfo.collection.getNext();
        loadPromises.push(promise);
        this.processNewsRequest(promise, pagePartInfo.relatedRefiners, allItemInfos).then(res => {
          allItemInfos.push(...res.infos);
          if (res.pagedItems != null) {
            pagedItemCollections.push({
              collection: res.pagedItems,
              relatedRefiners: pagePartInfo.relatedRefiners
            });
          }
        });
      }
    } 
    // Ths branch handles initial news item get request
    // In the event of lookup column count exceeding the throttling limit we need to make several requests to get all of lookup values
    else {
      const noOfLookupsBeforeThrottle = 6;
      let noOfRequests = Math.floor(this.props.RefinerInfos.length / noOfLookupsBeforeThrottle) + 1;

      for (let i = 0; i < noOfRequests; i++) {
        let numerOfRefinersToGet = noOfLookupsBeforeThrottle;
        if (numerOfRefinersToGet + i * noOfLookupsBeforeThrottle > this.props.RefinerInfos.length) {
          numerOfRefinersToGet = this.props.RefinerInfos.length % noOfLookupsBeforeThrottle;
        }

        let getFrom = 0;
        let getTo = (i + 1) * numerOfRefinersToGet;
        if (i > 0) {
          getFrom = i * noOfLookupsBeforeThrottle - 1;
        }

        let currentRefiners = this.props.RefinerInfos.slice(getFrom, getTo);
        let promise = this.constructNewsRequest(currentRefiners);
        loadPromises.push(promise);
        this.processNewsRequest(promise, currentRefiners, allItemInfos).then(res => {
          allItemInfos.push(...res.infos);
          if (res.pagedItems != null) {
            pagedItemCollections.push({
              collection: res.pagedItems,
              relatedRefiners: currentRefiners
            });
          }
        });
      }
    }
    
    // When all requests are complete - set the state, making sure currentNewsItems are extended by newly received data
    Promise.all(loadPromises).then(() => {
      this.setState({
        currentNewsItems: [...this.state.currentNewsItems, ...allItemInfos], 
        loading: false, 
        pagedCollectionInfos: pagedItemCollections.length > 0 ? pagedItemCollections : null
      });
    });
  }

  // React to refiner change in the MetadataNewsRefiners component
  private handleRefinerChange(incomingRefiners: IContextualMenuItem[]) {
    this.setState({
      currentRefiners: incomingRefiners,
      currentPage: 1,
      pagedCollectionInfos: null,
      currentNewsItems: []
    }, () => {
      this.loadNews();
    });
  }

  // Helper method that trims any unwanted information from body of the news item
  private extractContents(s: string | Element) {
    let el: Element = null;
    if (s instanceof Element) {
      el = s;
    } else { 
      el = document.createElement('span');
      el.innerHTML = s;
    }

    let res = null;
    if (el.hasAttribute('data-sp-rte')) {
      res = el.textContent || el.innerHTML;
    } else {
      for (let i = 0; i < el.children.length; i++) {
        let child = el.children.item(i);
        res = this.extractContents(child);
        if (res != null) {
          break;
        }
      }
    }

    return res;
  }
}
