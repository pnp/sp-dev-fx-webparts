import * as React from 'react';
import styles from './MetadataNews.module.scss';
import { IMetadataNewsProps, IMetadataRefinerInfo, IRefinersState, IMetadataContextualMenuItemResult, unescapeHTML } from '../../../interfaces';
import { IContextualMenuItem, CommandBar } from 
  //'@microsoft/office-ui-fabric-react-bundle'; 
  'office-ui-fabric-react/lib';
import { sp } from '@pnp/sp';
import { cloneDeep } from '@microsoft/sp-lodash-subset';

export interface IMetadataNewsRefinerProps extends IMetadataNewsProps {
  onContextualItemClick(currentRefiners: IContextualMenuItem[]);
  themeBackgroundColor: string;
}

export default class MetadataNewsRefiners extends React.Component<IMetadataNewsRefinerProps, IRefinersState> {
  constructor(props: IMetadataNewsRefinerProps, state: IRefinersState) {
    super(props);
    
    this.state = {
      nodes: null,
      loading: true,
      error: null,
      enabledFilterNodes: []
    };

    sp.setup({
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
    if (this.state.nodes == null) {
      this.loadData();
    }
  }
  
  // Rendering logic
  public render(): React.ReactElement<IMetadataNewsProps> {
    let currentItems: IContextualMenuItem[] = null;
    if (this.state.loading) {
      currentItems = [{
        key: "loading",
        name: "Loading...",
        isDisabled: false,
        itemType: 0 // ContextualMenuItemType.Normal
      }];
    } else {
      currentItems = this.state.nodes;
    }
    
    const needToShowFilter = this.state.enabledFilterNodes.length > 0;
    
    return (
      this.state.nodes != null && this.state.nodes.length > 0 ? 
        <div className={styles.row}>
          <div className={styles.column}>
            <div>
              <CommandBar style={{backgroundColor: this.props.themeBackgroundColor}} isSearchBoxVisible={false}
                items={currentItems}
                farItems={[
                  {
                    className: "ms-bgColor-neutral",
                    key: "clear",
                    name: "Clear",
                    iconProps: {
                      iconName: 'RemoveFilter'
                    },
                    onClick: () => this.removeFilter()
                  }
                ]}
              />
              <div style={{display: needToShowFilter ? "block" : "none", color: "#908989"}}>
                <span>Filters: </span>
                {
                  this.state.enabledFilterNodes.map((n, i) => {
                    return (<span style={{fontStyle: "italic"}} >{(i == 0 ? "" : ", ") + n.name}</span>);
                  })
                }
              </div>
            </div>
          </div>
        </div>
      : null
    );
  }
    
  // This method gets called when actual requests are needed
  private loadData() {
    this.setState({ loading: true }); 
    
    // Construct refiner / filter data requests
    let promises: Promise<IMetadataContextualMenuItemResult>[] = [];
    if (this.props.RefinerInfos != null) {
      for (let info of this.props.RefinerInfos) {
        if (info.IsSelected) {
          promises.push(this.tryLoadRefiner(info));
        }
      }
    }
    
    // Build items from SharePoint lookup lists data
    Promise.all(promises).then((results: IMetadataContextualMenuItemResult[]) => {
      let items: IContextualMenuItem[] = [];
      results.forEach((res, i) => {
        if (res != null && res.items != null && res.items.length > 0) {
          let topItem: IContextualMenuItem = {
            key: i.toString(),
            name: res.refinerName,
            data: res.refinerFieldInternalName,
            items: res.items
          };
          items.push(topItem);
        }
      });        
      this.setState({ loading: false, nodes: items }); 
    });
  }
  
  // Load refiner items for a particular field in Site Pages
  // If semicolon-delimited list of values is specified in the WebPart properties - use it
  // Otherwise make a REST call to SharePoint to get all items in needed list
  private tryLoadRefiner(refinerInfo: IMetadataRefinerInfo): Promise<IMetadataContextualMenuItemResult> {
    let deferred = new Promise<IMetadataContextualMenuItemResult>((resolve, reject) => {
      let toResolve: IMetadataContextualMenuItemResult = {
        refinerName: refinerInfo.DisplayName,
        refinerFieldInternalName: refinerInfo.InternalName,
        items: null
      };
      
      // This branch gets called when WebPart has semicolon-delimited values for this field
      if (refinerInfo.DisplayName != null && refinerInfo.IsSelected) {
        if (refinerInfo.DefaultValues != null && refinerInfo.DefaultValues.length > 0) {
          let refiners = refinerInfo.DefaultValues.split(';');
          toResolve.items = refiners.map((r) => { 
            return {             
              items: null,
              itemType: 0, // or ContextualMenuItemType.Normal,
              data: refinerInfo.InternalName,
              checked: false,
              isChecked: false,
              canCheck: true,
              key: r,
              name: r,
              onClick: (a, b) => this.localHandleItemClick(a, b)
            } as IContextualMenuItem;
          });
          resolve(toResolve);
        } 
        // This branch gets called when we need to request data from lookup list
        else {
          let promise = null;
          if (refinerInfo.List === undefined) {
            const webSiteRelativeUrl = this.props.webUrl.replace(window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : ''), "");
            const listRelativeUrl = `${webSiteRelativeUrl}/${refinerInfo.InternalName}`;
            promise = sp.web.getList(listRelativeUrl).items.orderBy('Title', true).usingCaching().getAll();
          } else {
            promise = sp.web.lists.getById(refinerInfo.List).items.orderBy('Title', true).usingCaching().getAll();
          }

          promise.then(items => {
            toResolve.items = items.map((i) => { 
              const title = unescapeHTML(i.Title);
              return {
                items: null,
                itemType: 0, // or ContextualMenuItemType.Normal,
                data: refinerInfo.InternalName,
                checked: false,
                isChecked: false,
                canCheck: true,
                key: title,
                name: title,
                onClick: (a, b) => this.localHandleItemClick(a, b)
              } as IContextualMenuItem;
            });
            resolve(toResolve);
          }).catch(e => {
            console.error(e);
            resolve(toResolve);
          });
        }
      }
    });
    return deferred;
  }
  
  // Called when user clicks on one of refiners and triggers filtering
  // enabledFilterNodes is an array of selected filter values with strict AND relationship (filter on Value1 AND Value2 AND ... etc)
  private localHandleItemClick(ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) {
    let cloned = cloneDeep<IContextualMenuItem[]>(this.state.enabledFilterNodes);
    if (item.isChecked) {
      item.isChecked = false;
      let index = 0;
      for (let i = 0; i < cloned.length; i++) {
        if (cloned[i].key == item.key) {
          index = i;
          break;
        }
      }
      cloned.splice(index, 1);
    } else {
      item.isChecked = true;
      cloned.push(item);
    }
    
    this.setState({ enabledFilterNodes: cloned });
    this.forceUpdate();
    
    this.props.onContextualItemClick(cloned);
  }
  
  // Called from "Clear" command button
  private removeFilter() {
    this.removeFilterRecursive(this.state.nodes);
    this.setState({ enabledFilterNodes: []});
    this.props.onContextualItemClick([]);
    this.forceUpdate();
  }
  
  private removeFilterRecursive(nodes: IContextualMenuItem[]) {
    if (nodes != null) {
      for (let n of nodes) {
        n.checked = n.isChecked = false;
        this.removeFilterRecursive(n.items);
      }
    }
  }
  
  private getItemByKey(nodes: IContextualMenuItem[], key: string): IContextualMenuItem {
    let item = null;
    if (nodes != null) {
      for (let n of nodes) {
        if (n.key == key) {
          item = n;
        } else {
          item = this.getItemByKey(n.items, key);
        }
        if (item != null) {
          break;
        }
      }
    }
    return item;
  }
}