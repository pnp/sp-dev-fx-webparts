import * as React from 'react';
import ISearchResultProps from './ISearchResultProps';
import styles from './SearchResult.module.scss';
import { PersonaCoin } from 'office-ui-fabric-react/lib/PersonaCoin';
import * as moment from 'moment';

export default class SearchResult extends React.Component<ISearchResultProps, {}> {
    public render() {
        return (
            <div className="template_root">
                <ul className={styles.resultContainer}>
                    {this.props.searchResults.RelevantResults.map(result => {
                        const image = result.SiteLogo ?
                            <div className={styles.imageContainer}><img src={result.SiteLogo}></img></div> :
                            <PersonaCoin className={styles.coin} text={result.Title} />;
                        return (
                            <li className={styles.resultItem}>
                                <a href={result.Path}>
                                    {image}
                                    <article>
                                        <header>
                                            <h3>{result.Title}</h3>
                                            <p>{result[this.props.subheaderFieldName]}</p>
                                            <ul>
                                                <li>Oppdatert for {result.Updated ? this.fmtDateString(result.Updated) : this.fmtDateString(result.Created)}</li>
                                                <li>{result.CreatedBy}</li>
                                            </ul>
                                        </header>
                                    </article>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    private fmtDateString(utcString) {
        return moment(utcString).fromNow();
    }
}