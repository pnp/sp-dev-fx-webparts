import * as React from 'react';
import { ISearchBarProps } from './ISearchBarProps';
import { ISearchBarState } from './ISearchBarState';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {

    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };
    }

    render(): React.ReactElement<ISearchBarProps> {
        {
            return (
                <div className="search-bar">
                    <TextField
                        label='Search a video'
                        iconProps={{ iconName: 'Search' }}
                        value={this.state.term}
                        onChanged={this.onInputChange}
                    />
                </div>
            );
        }
    }

    @autobind
    private onInputChange(term: string) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;