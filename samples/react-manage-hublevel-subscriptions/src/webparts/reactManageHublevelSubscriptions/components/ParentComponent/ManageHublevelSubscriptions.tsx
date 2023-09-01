import * as React from 'react';
import styles from './ManageHublevelSubscriptions.module.scss';
import {Dropdown, IDropdownOption} from '@fluentui/react';
import { IManageHublevelSubscriptionsProps, 
        IManageHublevelSubscriptionsState, 
        SubscriptionModel } 
from './IManageHublevelSubscriptions';
import {
Spinner
} from 'office-ui-fabric-react';
import { SearchService } from '../../Services/SearchService';
import { RestService } from '../../Services/RestService';
import HubSiteMapper from '../../Mapper/HubSiteMapper';
import SubscriptionDashboard from '../DashboardComponent/SubscriptionDashboard';
import { WebPartTitle } from '@pnp/spfx-controls-react';
import {MessageBar, MessageBarType} from 'office-ui-fabric-react';

export default class ReactManageHublevelSubscriptions 
  extends React.Component<IManageHublevelSubscriptionsProps, IManageHublevelSubscriptionsState> {

  public sites : IDropdownOption[];
  public lists : IDropdownOption[];
  public subscriptions : SubscriptionModel[];
  public selectedSite: IDropdownOption;
  public selectedList: IDropdownOption;
  public hubSiteID: string = "";
  private searchService: SearchService;
  private restService : RestService;
  private sitesAssociated: HubSiteMapper[];

  constructor(props:any) {
    super(props);
    this.hubSiteID = this.props._context.pageContext.legacyPageContext.departmentId;
    this.searchService = new SearchService();
    this.restService = new RestService();
    this.sites = [];
    this.lists = [];
    this.subscriptions = [];
    this.state={
      isListsToBeLoaded : true,
      dropDownListOptions : [],
      dropDownSiteOptions: [],
      showTable: false,
      showMessage:false
    }
  }

  public async componentDidMount() {
    this.sites = await this.getAssociatedHubSites(this.hubSiteID);
    if(this.sites.length === 0){
      this.setState({
        showMessage:true,
        MessageBarType:MessageBarType.severeWarning, 
        Message:"This site is not associated to any hubsite, or is not a hubsite. Please configure this webpart in a site which is associated to hubsite or a Hubsite itself."
      });
    } else{
      this.setState({
        dropDownSiteOptions : this.sites
      });
    }

  }

  public async componentDidUpdate(prevProps: Readonly<IManageHublevelSubscriptionsProps>, prevState: IManageHublevelSubscriptionsState, snapshot?: any){ 
    const { isListsToBeLoaded, showTable} = this.state;
    if(prevState.isListsToBeLoaded !== isListsToBeLoaded){
      this.lists = await this.populateListDropDown(this.selectedSite.key);
      this.setState({dropDownListOptions:this.lists});
    }

    if(prevState.showTable !== showTable){
      this.subscriptions = await this.getSubscriptions(this.selectedSite.key, this.selectedList.key);
      this.setState({showTable:false, subscriptions:this.subscriptions});
    }
  }

  public render() {
    const { dropDownListOptions, dropDownSiteOptions, selectedList, selectedSite, showTable, showMessage, Message, MessageBarType } = this.state;
    const {displayMode, webpartTitle, setWebPartTitle} = this.props;
    return (
      <React.Fragment>
        <div className={styles.reactManageHublevelSubscriptions}>
          {showMessage ?
              <MessageBar messageBarType={MessageBarType}>
                {Message}
              </MessageBar>
            :
            <div className={styles.container}>
              <div className={styles.webpartTitle}>
                <WebPartTitle
                  displayMode={displayMode}
                  title={webpartTitle}
                  updateProperty={setWebPartTitle} 
                />
              </div>
              <section className={styles.sectionContainer}>
                  {!showMessage && 
                    <Dropdown
                      className={styles.dropdownSites}
                      placeholder="Select sites from associated hub..."
                      selectedKey={selectedSite? selectedSite.key  : undefined}
                      label="Select sites"
                      options={dropDownSiteOptions? dropDownSiteOptions : []}
                      onChange={this.onChange}
                    />
                  }
                  {this.lists.length > 0 && 
                    <Dropdown
                      className={styles.dropdownLists}
                      placeholder="Select list..."
                      selectedKey={selectedList? selectedList.key : undefined}
                      label={`Select list from ${selectedSite ? selectedSite.text : ''}`}
                      options={dropDownListOptions ? dropDownListOptions : []}
                      onChange={this.onChangeList}
                    />
                  }
              </section>
              {showTable ? (<Spinner label="Loading subcriptions..." ariaLive="assertive" labelPosition="bottom" />) : 
                <div>
                  {this.subscriptions?.length > 0 &&
                    <SubscriptionDashboard
                      subscriptions= {this.state.subscriptions?this.state.subscriptions:[]}
                      selectedListID={ selectedList ? selectedList.key : ""}
                      _context={this.props._context}
                      selectedSite={selectedSite? selectedSite.key  : ""}
                      restService={this.restService}
                      parentCallBack={this.callbackFunctionNewForm}
                    />
                  }
                </div>
              }
            </div>
          }
        </div>
      </React.Fragment>

    );
  }

  public callbackFunctionNewForm = (childData:any) => {
    this.setState({ showTable:true });
  }

  public onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    this.selectedSite = item;
    this.setState({isListsToBeLoaded:false, selectedSite : this.selectedSite});
  };

  public onChangeList = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    this.selectedList = item;
    this.setState({isListsToBeLoaded:true, showTable:true, selectedList: this.selectedList});
  }

  public async getAssociatedHubSites(hubsiteID : string):Promise<any>{
    const dropdownSites :IDropdownOption[]= [];
    let query = {};
    //Query to get sites associated to Hubsite
    const queryTemplate: string = `{searchTerms}contentclass:STS_Site AND NOT WebTemplate:SPSPERS AND NOT SiteId:{${hubsiteID}} AND (DepartmentId:{${hubsiteID}} OR DepartmentId:${hubsiteID})`;
    if(hubsiteID !== undefined){
      query = 
      {
        QueryTemplate: queryTemplate,
        RowLimit: 20,
        SelectProperties: ['Title','Url','OriginalPath','Author','Path','SiteName','contentclass'], //Will only use Title & Url for Dropdown
        TrimDuplicates: false
      };
    }
    const results = await this.searchService.getCachedSearchResults(this.props._context, query);

    //This mapping is unnecessary for now, but may be useful later
    this.sitesAssociated = results.relevantResults.map((i: any) => new HubSiteMapper(i));
    this.sitesAssociated.forEach((site) => {
      dropdownSites.push({key: site.Url, text : site.Title});
    });

    return dropdownSites;
  }

  public async populateListDropDown(selectedSite : string| number):Promise<any>{
    const dropdownLists :IDropdownOption[]= [];
    //Will fetch both lists and libraries apart from site collection app catalog
    const listEndpoint = selectedSite+'/_api/web/lists?$filter=Hidden eq false and BaseTemplate ne 336'; // and BaseType ne 1

    const listRequestHeaders: Headers = new Headers();
    listRequestHeaders.append('accept', 'application/json;odata=verbose');
    listRequestHeaders.append('content-type', 'application/json;odata=verbose');
    listRequestHeaders.append('odata-version', '3.0');

    const listResults = await this.restService.GetMethod(this.props._context, listEndpoint, listRequestHeaders);
    listResults.d.results.forEach((list:any) => {
      dropdownLists.push({key:list.Id, text:list.Title});
    });
    return dropdownLists;

  }

  public async getSubscriptions(selectedSite : string| number, selectedListID: string| number):Promise<SubscriptionModel[]>{
    const subscriptions : SubscriptionModel[] = [];
    const subscriptionEndpoint = selectedSite+`/_api/web/lists('${selectedListID}')/subscriptions`; 
    
    const subscriptionRequestHeaders: Headers = new Headers();
    subscriptionRequestHeaders.append('accept', 'application/json;odata=verbose');
    subscriptionRequestHeaders.append('content-type', 'application/json;odata=verbose');
    subscriptionRequestHeaders.append('odata-version', '3.0');

    const subcriptionResults = await this.restService.GetMethod(this.props._context, subscriptionEndpoint, subscriptionRequestHeaders);
    subcriptionResults.d.results.forEach((subscription:any) =>{
      subscriptions.push({
        clientState:subscription.clientState,
        expirationDateTime:subscription.expirationDateTime,
        notificationUrl:subscription.notificationUrl,
        id:subscription.id,
        resource:subscription.resource
      });
    });
    return subscriptions;
  }
}
