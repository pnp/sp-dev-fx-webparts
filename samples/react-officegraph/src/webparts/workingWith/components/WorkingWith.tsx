import * as React from 'react';

import styles from '../WorkingWith.module.scss';
import { IWorkingWithWebPartProps } from '../IWorkingWithWebPartProps';
import { SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ODataVersion, ISPHttpClientConfiguration } from '@microsoft/sp-http';
import { SearchUtils, ISearchQueryResponse, IRow } from '../../SearchUtils';
import { Utils } from '../../Utils';
import {
  css,
  Persona,
  PersonaSize,
  PersonaPresence,
  Spinner
} from 'office-ui-fabric-react';

export interface IWorkingWithProps extends IWorkingWithWebPartProps {
  httpClient: SPHttpClient;
  siteUrl: string;
}

export interface IPerson {
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  photoUrl: string;
  profileUrl: string;
}

export interface IWorkingWithState {
  loading: boolean;
  people: IPerson[];
  error: string;
}

export default class WorkingWith extends React.Component<IWorkingWithProps, IWorkingWithState> {
  constructor(props: IWorkingWithProps, state: IWorkingWithState) {
    super(props);

    this.state = {
      people: [],
      loading: true,
      error: null
    };
  }

  public componentDidMount(): void {
    this.loadPeople(this.props.siteUrl, this.props.numberOfPeople);
  }

  public componentDidUpdate(prevProps: IWorkingWithProps, prevState: IWorkingWithState, prevContext: any): void {
    if (this.props.numberOfPeople !== prevProps.numberOfPeople ||
      this.props.siteUrl !== prevProps.siteUrl && (
        this.props.numberOfPeople && this.props.siteUrl
      )) {
      this.loadPeople(this.props.siteUrl, this.props.numberOfPeople);
    }
  }

  public render(): JSX.Element {
    const loading: JSX.Element = this.state.loading ? <div style={{ margin: '0 auto' }}><Spinner label={'Loading...'} /></div> : <div/>;
    const error: JSX.Element = this.state.error ? <div><strong>Error: </strong> {this.state.error}</div> : <div/>;
    const people: JSX.Element[] = this.state.people.map((person: IPerson, i: number) => {
      return (
        <Persona
          primaryText={person.name}
          secondaryText={person.jobTitle}
          tertiaryText={person.department}
          imageUrl={person.photoUrl}
          size={PersonaSize.large}
          presence={PersonaPresence.none}
          onClick={() => { this.navigateTo(person.profileUrl); } }
          key={person.email} />
      );
    });

    return (
      <div className={styles.workingWith}>
        <div className={css('ms-font-xl', styles.webPartTitle)}>{this.props.title}</div>
        {loading}
        {error}
        {people}
      </div>
    );
  }

  private navigateTo(url: string): void {
    window.open(url, '_blank');
  }

  private loadPeople(siteUrl: string, numberOfPeople: number): void {
    this.props.httpClient.get(`${siteUrl}/_api/search/query?querytext='*'&properties='GraphQuery:actor(me\\,action\\:1019)'&selectproperties='Title,WorkEmail,JobTitle,Department,Path'&rowlimit=${numberOfPeople}`, SPHttpClient.configurations.v1 , {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      }
    })
      .then((response: SPHttpClientResponse): Promise<ISearchQueryResponse> => {
        return response.json();
      })
      .then((response: ISearchQueryResponse): void => {
        if (!response ||
          !response.PrimaryQueryResult ||
          !response.PrimaryQueryResult.RelevantResults ||
          response.PrimaryQueryResult.RelevantResults.RowCount === 0) {
          this.setState({
            loading: false,
            error: null,
            people: []
          });
          return;
        }

        const people: IPerson[] = [];
        for (let i: number = 0; i < response.PrimaryQueryResult.RelevantResults.Table.Rows.length; i++) {
          const personRow: IRow = response.PrimaryQueryResult.RelevantResults.Table.Rows[i];
          const email: string = SearchUtils.getValueFromResults('WorkEmail', personRow.Cells);
          people.push({
            name: SearchUtils.getValueFromResults('Title', personRow.Cells),
            email: email,
            jobTitle: SearchUtils.getValueFromResults('JobTitle', personRow.Cells),
            department: SearchUtils.getValueFromResults('Department', personRow.Cells),
            photoUrl: Utils.getUserPhotoUrl(email, siteUrl, 'L'),
            profileUrl: SearchUtils.getValueFromResults('Path', personRow.Cells)
          });
        }

        this.setState({
          loading: false,
          error: null,
          people: people
        });
      }, (error: any): void => {
        this.setState({
          loading: false,
          error: error,
          people: []
        });
      });
  }
}
