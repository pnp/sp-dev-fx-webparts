import pnp, { 
    ConsoleListener,
    Logger,
    LogLevel,
    SearchQuery,
    SearchQueryBuilder,
    SearchResults,
    setup,
    Web,
    Sort,
    SortDirection 
} from 'sp-pnp-js';
import * as React from 'react';
import { 
    Spinner, 
    SpinnerSize,
    SearchBox, 
    FocusZone 
} from 'office-ui-fabric-react';
import { 
    IPersonaCardContainerState,
    IPersonaCardContainerProps, 
    ISearchResults,
    Paging,
    IPerson,
    PersonaCardList
} from '../../index';
import styles from './PersonaCardContainer.module.scss';
import * as strings from 'PersonaCardSearchWebPartStrings';

export class PersonaCardContainer extends React.Component<IPersonaCardContainerProps, IPersonaCardContainerState>{
    private _query:string ='';
    public constructor(props) {

        super(props);

        // Set the initial state
        this.state = {
            results: {  
                        RelevantResults: [] 
                     },         
            currentPage: 1,
            areResultsLoading: true,
            errorMessage: '',          
            hasError: false,
            users:[],          
            maxResultsCount: this.props.maxResultsCount ? this.props.maxResultsCount : 6,
            query:'(PreferredName:*)'           
        };
        this._onSearchBoxChange = this._onSearchBoxChange.bind(this);       
        this._onPageUpdate = this._onPageUpdate.bind(this);
    }

    public render(): React.ReactElement<IPersonaCardContainerProps> {

        const areResultsLoading = this.state.areResultsLoading;
        const items = this.state.results;
        const users = this.state.users;
        const hasError = this.state.hasError;
        const errorMessage = this.state.errorMessage;        
        const maxResultsCount = this.state.maxResultsCount;
        const currentPage = this.state.currentPage;
        let wpContent: JSX.Element = null;

        if (areResultsLoading) {
            wpContent =  <div style={ {                
                                paddingTop:20,
                                paddingBottom:20                
                            }}>
                            <Spinner size={ SpinnerSize.large } label={ strings.LoadingMessage } />
                        </div>; 
        } else { 
            if (users.length === 0 || hasError) {

                wpContent = <div></div>;

            } else {   
                wpContent =                    
                    <div className={styles.personaCardContainer}>                                                                       
                            <PersonaCardList items={users} 
                                getPropertiesForUsers={this.props.getPropertiesForUsers} />
                            <Paging 
                                totalItems={ items.TotalRows }
                                itemsCountPerPage={ maxResultsCount } 
                                onPageUpdate={ this._onPageUpdate } 
                                currentPage={ currentPage }
                                pageRangeDisplayed={10}
                            />  
                    </div>;  
            }                     
        }

        return (
            <div className='personaCardSearch' style={{clear:'both'}}> 
                <FocusZone>     
                    <SearchBox
                        onEscape={ (ev) => {console.log('Custom onEscape Called');} }
                        onClear={ (ev) => {console.log('Custom onClear Called');} }                       
                        onSearch={ (newValue) => this._onSearchBoxChange(newValue) }
                        onChange={ (newValue) => this._onSearchBoxChange(newValue) }
                        onFocus={ () => console.log('onFocus called') }
                        onBlur={ () => console.log('onBlur called') }
                        underlined={ true } 
                    />                          
                    { wpContent } 
                </FocusZone> 
            </div>
        );
    }

    public componentDidMount() {        // Async calls
        this._getSearchResults(this.state.query, this.state.currentPage);
    }

    public componentWillReceiveProps(nextProps: IPersonaCardContainerProps): void {

        // Intermediate state to display the spinner before an async query
        this.setState({
            areResultsLoading: true, 
            maxResultsCount: nextProps.maxResultsCount,             
        });

        // We reset the page number and refinement filters
        this._getSearchResults(this.state.query, 1);
    }
    private _onSearchBoxChange(sbQuery:string) :void{  
        let query = `(PreferredName:*${sbQuery}*)`;   
        this.setState({
            query: query
        });       
        this._getSearchResults(query, 1);
    }
    private _getSearchResults(searchQuery:string, pageNumber?: number) { 
        this.props.searchService.people(searchQuery, pageNumber).then((searchResults: ISearchResults) => {
            
            this.setState({
                results: searchResults,
                areResultsLoading: false,
            });
            if(searchResults.RelevantResults.length > 0){
                this.setState({                   
                    areResultsLoading: true,
                });
                let accountNames = searchResults.RelevantResults.map((result) =>{
                    return result.AccountName;
                });
                this.props.getPropertiesForUsers(accountNames).then((users:IPerson[]) => {
                    this.setState({
                        users: users,
                        areResultsLoading: false,
                    });
                });
            }            

        }).catch((error) => {
            Logger.write('[PersonaCardContainer._getSearchResults()]: Error: ' + error, LogLevel.Error);

            this.setState({
                areResultsLoading: false,
                results: { RelevantResults: [] },
                hasError: true,
                errorMessage: error.message,
            });
        });
    }

    
    private _onPageUpdate(pageNumber: number) { 
        this._getSearchResults(this.state.query, pageNumber);  
        
        this.setState({
            currentPage: pageNumber,
        });
    }
}