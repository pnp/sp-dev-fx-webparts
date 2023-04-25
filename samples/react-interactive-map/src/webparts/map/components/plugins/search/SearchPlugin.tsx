import { isFunction, isNullOrEmpty } from '@spfxappdev/utility';
import { Autocomplete } from '@src/components/autocomplete/Autocomplete';
import * as strings from 'MapWebPartStrings';
import { Icon } from 'office-ui-fabric-react';
import * as React from 'react';
import styles from './SearchPlugin.module.scss';

export interface ISearchPluginProps {
    nominatimUrl?: string;
    resultLimit?: number;
    onLocationSelected?(latitude: number, longitude: number): void;
}

interface ISearchResult {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
}

interface ISearchPluginState {
    searchResult: Array<ISearchResult>;
    isSearchBoxVisible: boolean;
}

export default class SearchPlugin extends React.Component<ISearchPluginProps, ISearchPluginState> {

    public state: ISearchPluginState = {
        searchResult: [],
        isSearchBoxVisible: false
    };

    public static defaultProps: ISearchPluginProps = {
        nominatimUrl: "https://nominatim.openstreetmap.org/search",
        resultLimit: 3
    };
    
    
    public render(): React.ReactElement<ISearchPluginProps> {
        return (
        <div className={styles["map-plugin-search"]}>
            {this.state.isSearchBoxVisible &&
                <Autocomplete
                    className={styles['textbox']} 
                    onRenderSuggestions={(searchTerm: string) => {
                        return this.renderSuggesstionsFlyout(searchTerm);
                    }}
                    onChange={async (ev: any, searchTerm: string) => {
                        const result = await this.makeSearchRequest(searchTerm);
                        this.setState({
                            searchResult: result
                        });
                }} />
            }

            <button type="button" onClick={() => {
                const isVisible: boolean = this.state.isSearchBoxVisible ? false : true;

                this.setState({
                    isSearchBoxVisible: isVisible
                });
            }}>
                <Icon iconName="Search" />
            </button>
        </div>);
    }

    private renderSuggesstionsFlyout(searchTerm: string): JSX.Element {
        
        const results = this.state.searchResult;

        if(isNullOrEmpty(results)) {
            return (<>
            {strings.NoSearchResultsLabel}
                </>);
        }

        return (<div className={styles["suggesstion"]}>
        {results.map((location: ISearchResult, index: number): JSX.Element => {
            return (<div 
                key={`Icon_${index}_${location.place_id}`}
                onClick={() => {

                    if(isFunction(this.props.onLocationSelected)) {
                        this.props.onLocationSelected(parseFloat(location.lat), parseFloat(location.lon));
                    }

                    this.setState({
                        isSearchBoxVisible: false
                    });
                }}
                className={styles["suggesstion-item"]}>
                    {location.display_name}
                </div>);
        })}
        </div>);
        
    }

    private async makeSearchRequest(searchTerm: string): Promise<ISearchResult[]> {

        const response = await fetch(`${this.props.nominatimUrl}?format=json&limit=${this.props.resultLimit}&q=${searchTerm}`);
        const responseJson = await response.json();
        return responseJson;
    }
}