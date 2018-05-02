import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import {
  autobind, PrimaryButton, Button,
  DialogFooter, DialogContent,
  Spinner, SpinnerSize,
  TagPicker, ITag, Label, Callout
} from '@microsoft/office-ui-fabric-react-bundle'; // 'office-ui-fabric-react';
import * as pnp from '@pnp/sp';
import { 
  IFillMetadataDialogContentProps, IFillMetadataDialogContentState, IMetadataNewsItem, 
  IMetadataRefinerInfo, ILookupInfo, ILookupFieldValue, unescapeHTML 
} from '../../interfaces';
import styles from './FillMetadataDialog.module.scss';

class FillMetadataDialogContent extends React.Component<IFillMetadataDialogContentProps, IFillMetadataDialogContentState> {
  private saveButtonElement: HTMLElement | null;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      submitting: false,
      error: null,
      hasError: false,
      loadedItem: null
    };

    pnp.sp.setup({
      sp: {
        headers: {
          Accept: 'application/json;odata=verbose'
        },
        baseUrl: this.props.webUrl
      }
    });
  }

  // To make component render quickly the actual data retrieval starts after initial render in componentDidMount event
  public componentDidMount() {
    this.loadItem();
  }

  // Rendering logic
  public render(): JSX.Element {
    return (
      this.state.loading ? 
      (
        <Spinner size={SpinnerSize.large} label='Loading...' ariaLive='assertive' />
      ) :
      (<DialogContent
        title={this.state.loadedItem.title}
        onDismiss={this.props.close}
        showCloseButton={true}
      >
        {this.state.hasError ? 
          <Callout
            className={styles.errorCallout}
            role={'alertdialog'}
            gapSpace={0}
            target={this.saveButtonElement}
            onDismiss={() => this.setState({hasError: false})}
            setInitialFocus={true}
          >
            <div>
              <p className={styles.header}>
                An error has occurred
              </p>
            </div>
            <div className={styles.content}>
              <p>
                {this.state.error}
              </p>
            </div>
          </Callout> : 
          null}

          {/* For each lookup field in loaded item create a TagPicker component */}
        {this.state.loadedItem.lookupMetadata.map((lm, i) => {
            let selected = [];
            if (lm.lookupValues != null && lm.lookupValues.length > 0) {
              for (let val of lm.lookupValues) {
                const filterResult = lm.allLookupValues.filter(v => v.lookupId == val.lookupId);
                if (filterResult != null && filterResult.length > 0) {
                  selected.push({ key: filterResult[0].lookupId.toString(), name: unescapeHTML(filterResult[0].lookupValue)});
                }
              }
            } 

            return (
              <div style={{padding: "10px", minWidth: "400px", color: "white"}}>
                <Label>{lm.lookupFieldDisplayName}</Label>
                <TagPicker className={styles.tagPicker}
                itemLimit={lm.lookupFieldIsMultiValue ? 100 : 1}
                pickerSuggestionsProps={{
                  suggestionsHeaderText: 'Suggested items',
                  noResultsFoundText: 'No matches found',
                }}
                onResolveSuggestions={(filter, selectedItems) => this.resolveTagSuggestions(filter, selectedItems, lm.allLookupValues)}
                defaultSelectedItems={selected}
                onChange={(items?: ITag[]) => this.processTagItemsChange(items == null ? [] : items, lm.lookupFieldInternalName)}
                
              />
            </div>);
        })}
        <DialogFooter>
          <Button text='Cancel' title='Cancel' onClick={this.props.close} disabled={this.state.submitting} />
          <span ref={(btn) => this.saveButtonElement = btn}>
            <PrimaryButton 
              text='Save' title='Save' disabled={this.state.submitting} 
              onClick={() => this.submit(this.state.loadedItem)} />
          </span>
        </DialogFooter>
      </DialogContent>)
    );
  }

  // Update the state information to reflect the UI change in tag picker
  @autobind
  private processTagItemsChange(items: ITag[], fieldInternalName: string) {
    for (let lm of this.state.loadedItem.lookupMetadata) {
      if (lm.lookupFieldInternalName == fieldInternalName) {
        lm.lookupValues = items.map(item => {
          return {
            lookupId: parseInt(item.key),
            lookupValue: item.name
          } as ILookupFieldValue;
        });
        break;
      }
    }
    this.setState({ loadedItem: {...this.state.loadedItem}}, () => console.log(this.state.loadedItem));
  }

  // Return suggestons for a picker
  @autobind
  private resolveTagSuggestions(filterText: string, selectedItems: ITag[], allItems: ILookupFieldValue[]): ITag[] {
    let results = [];
    if (filterText) {
      results = allItems
        .filter(item => item.lookupValue != null && item.lookupValue.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
        .filter(item => !this.listContainsDocument({ key: item.lookupId.toString(), name: item.lookupValue }, selectedItems))
        .map(r => { 
          return {
            key: r.lookupId.toString(), 
            name: unescapeHTML(r.lookupValue)
          } as ITag;
        });
    }
    return results;
  }

  private listContainsDocument(tag: ITag, tagList: ITag[]) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }

  // Load current site pages item 
  // As well as load all items from all lookup lists
  // Takes longer to load, but faster to fill once loaded
  private loadItem() {
    this.setState({loading: true});
    const sitePagesName = 'Site Pages';
    let refinerFieldInfos: IMetadataRefinerInfo[] = [];

    // Load fields information from SitePages list
    pnp.sp.web.lists.getByTitle(sitePagesName).fields.filter("ReadOnlyField eq false and Hidden eq false and substringof('Lookup',TypeAsString)")
      .select("Title", "InternalName", "LookupList", "TypeAsString")
      .get().then((res: any[]) => {
      for (let f of res) {
        if (!refinerFieldInfos.some(ri => ri.InternalName == f.InternalName)) {
          refinerFieldInfos.push({
            IsSelected: false,
            DisplayName: f.Title,
            InternalName: f.InternalName,
            IsMultiValue: f.TypeAsString == 'Lookup' ? false : true,
            List: f.LookupList
          });
        }
      }
      
      // Load all items from lookup lists
      this.loadItemInternal(refinerFieldInfos).then(loadedItem => {
        let allDataRetrievalPromises: Promise<any[]>[] = [];
        for (let refinerInfo of refinerFieldInfos) {
          let lookupMetadataItem = loadedItem.lookupMetadata.filter(lm => lm.lookupFieldInternalName == refinerInfo.InternalName)[0];
          if (lookupMetadataItem != null) {
            let promise = pnp.sp.web.lists.getById(lookupMetadataItem.lookupFieldLookupList).items.getAll();
            allDataRetrievalPromises.push(promise);
            promise.then(results => {
              lookupMetadataItem.allLookupValues = results.map(result => {
                return {
                  lookupId: result.ID,
                  lookupValue: result.Title
                } as ILookupFieldValue;
              });
            });
          }
        }  

        Promise.all(allDataRetrievalPromises).then((promiseResults: any[][]) => {
          this.setState({
            loading: false,
            loadedItem
          });
        }).catch(this.handleError);
      });
    }).catch(this.handleError);
  }

  // Load all items from lookup lists
  private loadItemInternal(refinerFieldInfos: IMetadataRefinerInfo[]) {
    let promise = new Promise<IMetadataNewsItem>((resolve, reject) => {
      const noOfLookupsBeforeThrottle = 6;
      let noOfRequests = Math.floor(refinerFieldInfos.length / noOfLookupsBeforeThrottle) + 1;
      let loadPromises: Promise<any>[] = [];
      let loadedItem = {
        id: this.props.itemId,
        content: null,
        lookupMetadata: []
      } as IMetadataNewsItem;
      
      for (let i = 0; i < noOfRequests; i++) {
        let numerOfRefinersToGet = noOfLookupsBeforeThrottle;
        if (numerOfRefinersToGet + i * noOfLookupsBeforeThrottle > refinerFieldInfos.length) {
          numerOfRefinersToGet = refinerFieldInfos.length % noOfLookupsBeforeThrottle;
        }

        let getFrom = 0;
        let getTo = (i + 1) * numerOfRefinersToGet;
        if (i > 0) {
          getFrom = i * noOfLookupsBeforeThrottle - 1;
        }

        // Load the target item from SitePages list
        let currentRefiners = refinerFieldInfos.slice(getFrom, getTo);
        let p = this.constructNewsItemRequest(currentRefiners);
        loadPromises.push(p);
        p.then(item => {
          loadedItem.title = item.Title;

          for (let refinerInfo of currentRefiners) {
            let lookupMetadataItem: ILookupInfo = null;
            if (loadedItem.lookupMetadata.some(lm => lm.lookupFieldInternalName == refinerInfo.InternalName)) {
              lookupMetadataItem = loadedItem.lookupMetadata.filter(lm => lm.lookupFieldInternalName == refinerInfo.InternalName)[0];
            } else {
              lookupMetadataItem = {
                lookupFieldInternalName: refinerInfo.InternalName,
                lookupFieldDisplayName: refinerInfo.DisplayName,
                lookupFieldIsMultiValue: refinerInfo.IsMultiValue,
                lookupFieldLookupList: refinerInfo.List,
                lookupValues: [],
                allLookupValues: []
              };

              loadedItem.lookupMetadata.push(lookupMetadataItem);
            }

            // TODO: ensure multilookup works as well
            if (item[refinerInfo.InternalName] != null) {
              lookupMetadataItem.lookupValues.push({
                lookupId: item[refinerInfo.InternalName].Id,
                lookupValue: item[refinerInfo.InternalName].Value
              });
            }
          }
        });
      }
      
      Promise.all(loadPromises).then(() => {
        resolve(loadedItem);  
      });
    });
    return promise;
  }

  // Load target item from SitePages, return Promise object
  private constructNewsItemRequest(ris: IMetadataRefinerInfo[]) {
    const sitePagesName = 'Site Pages';
      let toSelect: string[] = ["Title", "Author/Name", "Editor/Name", "Author/Title", "Editor/Title"];
      let toExpand: string[] = ["Author", "Editor"];
      ris.forEach(ri => {
        toSelect.push(`${ri.InternalName}/Title`);
        toSelect.push(`${ri.InternalName}/Id`);
        toExpand.push(ri.InternalName);
      });

    let promise = pnp.sp.web.lists.getByTitle(sitePagesName).items.getById(this.props.itemId).select(...toSelect).expand(...toExpand).get();
    return promise;
  }

  // Save state information to a list item
  @autobind
  private submit(itemInfo: IMetadataNewsItem): void {
    this.setState({submitting: true});

    let updateInfo = {};
    for (let lm of itemInfo.lookupMetadata) {
      if (lm.lookupValues == null || lm.lookupValues.length < 1) {
        updateInfo[`${lm.lookupFieldInternalName}Id`] = null;
      } else {
        let values = lm.lookupValues.map(v => v.lookupId);
        if (lm.lookupFieldIsMultiValue) {
          updateInfo[`${lm.lookupFieldInternalName}Id`] = {results:  values};
        } else {
          updateInfo[`${lm.lookupFieldInternalName}Id`] = values[0];
        }
      }
    }

    pnp.sp.web.lists.getByTitle('Site Pages').items.getById(itemInfo.id).update(updateInfo).then((res: pnp.ItemUpdateResult) => {
      this.props.close();
    }).catch(error => {
      this.setState({
        error: `There was a problem updating metadata.
Inner error: ${error.data.responseBody["odata.error"].message.value}`,
        hasError: true,
        submitting: false
      });
    });
  }

  private handleError(error: any) {
    console.log(error);
    this.setState({loading: false});
  }
}

// Container component for dialog content
export default class FillMetadataDialog extends BaseDialog {
  public itemId: number;
  public webUrl: string;

  public render(): void {
    ReactDOM.render(<FillMetadataDialogContent
      webUrl={this.webUrl}
      close={this.close}
      itemId={this.itemId}
      submit={this.submit}
      />, this.domElement);
  }
    
  public getConfig(): IDialogConfiguration {
    return {
      isBlocking: false
    };
  }
  
  @autobind
  private submit(): void {
    this.close();
  }
}