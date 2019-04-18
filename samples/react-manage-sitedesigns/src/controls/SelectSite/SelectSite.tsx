
// João Mendes
// Mar 2019
//
import * as React from 'react';
import styles from './SelectSite.module.scss';
import { ISelectSiteProps } from './ISelectSiteProps';
import { escape } from '@microsoft/sp-lodash-subset';
import spservice from '../../services/spservices';
import * as strings from 'SiteDesignsWebPartStrings';
import { ISelectSiteState } from './ISelectSiteState';
import {
  ActionButton,
  Icon,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
 SearchBox,
Link
} from 'office-ui-fabric-react';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { IViewSite } from './IViewSite';
import { SearchResults } from '@pnp/sp';


// ListView Columns
const viewFields: IViewField[] = [
  {
    name: 'icon',
    render: ((item: any) => {
      const image = <Icon iconName="FileASPX" />;
      return image;
    }),
    maxWidth: 40,
  },
  {
    name: 'title',
    displayName: strings.WebSiteTitleLabel,
    sorting: true,
    isResizable: true,
    maxWidth: 200
  },
  {
    name: 'url',
    render: ((item: IViewSite) =>{
      const link =  <Link href={item.url} target='blank'>{item.url}</Link>;
      return link;
    }),
    displayName:strings.WebSiteUrl ,
    sorting: true,
    isResizable: true,
    maxWidth: 200
  }
];

export default class SelectSite extends React.Component<ISelectSiteProps, ISelectSiteState> {
  private spService: spservice;
  private items : IViewSite[];

  public constructor(props) {
    super(props);
    // Initialize state
    this.state = ({
      isLoading: false,
      showError: false,
      errorMessage: '',
      selectedItems: [],
      items: [],
      hasError:false,
      showList: false
    });

    // Init class services
    this.spService = new spservice(this.props.context);
    // Register event handlers
    this.onSearch = this.onSearch.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof SelectSite
   */
  private async onClear(ev: React.MouseEvent<HTMLButtonElement>){
    ev.preventDefault();
    this.items=[];
    this.setState({showList:false, items: this.items, hasError: false, errorMessage:''});
  }
  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof SelectSite
   */
  private async onSearch(newValue:string) {
    let results: SearchResults = null;
    this.items=[];
    this.setState({isLoading:true, errorMessage:''});
    try{
      results = await this.spService.getSites(newValue);
      if (results && results.PrimarySearchResults ){
        for ( const result of results.PrimarySearchResults){
          this.items.push({key: result.UniqueId, title: result.Title, url: result.Path, webtemplate: result.WebTemplate});
        }
      }
      this.setState({items: this.items, isLoading:false, errorMessage:'', showList:true});
    }catch(error){
      this.setState({hasError:true,isLoading:false, errorMessage: error.message, showList:false});
    }
  }
  // Component Did Mount
  /**
   *
   * @memberof SelectSite
   */
  public async  componentDidMount() {
    //
  }

  /**
   * On Render
   *
   * @returns {React.ReactElement<ISelectSiteProps>}
   * @memberof SelectSite
   */
  public render(): React.ReactElement<ISelectSiteProps> {

    return (
      <div className={styles.selectSite}>
       <SearchBox
          placeholder={strings.SearchBoxPlaceholderText}
          onClear={this.onClear}
          onSearch={this.onSearch}
        />
        <br/>
        {
            this.state.isLoading ?
              <Spinner size={SpinnerSize.large} label={strings.LoadingLabel} ariaLive="assertive" />
              :
              this.state.hasError ?
                <MessageBar
                  messageBarType={MessageBarType.error}>
                  <span>{this.state.errorMessage}</span>
                </MessageBar>
                :
           this.state.showList &&
            <ListView
              items={this.state.items}
              viewFields={viewFields}
              compact={false}
              selectionMode={SelectionMode.multiple}
              selection={this.props.onSelectItem}
            />
          }
      </div>
    );
  }
}
