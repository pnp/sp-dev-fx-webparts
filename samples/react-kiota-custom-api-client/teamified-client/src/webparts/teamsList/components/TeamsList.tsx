import * as React from 'react';
import styles from './TeamsList.module.scss';
import { ITeamsListProps } from './ITeamsListProps';
import { ITeamsListState } from "./ITeamsListState";
import { escape } from '@microsoft/sp-lodash-subset';
import { AadTokenProvider } from '@microsoft/sp-http';
import { FetchRequestAdapter } from '@microsoft/kiota-http-fetchlibrary';
import { TeamifiedApiClient } from '../client/teamifiedApiClient';
import { AzureAdSpfxAuthenticationProvider } from '@microsoft/kiota-authentication-spfx';

import {
  ImageFit,
  MessageBar, PersonaSize
} from '@fluentui/react';
import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardType,
} from '@fluentui/react/lib/DocumentCard';
import { Facepile, IFacepilePersona } from '@fluentui/react/lib/Facepile';

export default class TeamsList extends React.Component<ITeamsListProps, ITeamsListState> {

  // #region ******************** UPDATE WITH YOUR TENANT DATA ********************
  private readonly azureAdApplicationIdUri: string = "api://{AZURE_AD_CLIENT_ID}";
  private readonly apiHost: string = "{YOUR_API}.azurewebsites.net";
  // #endregion

  constructor(props: ITeamsListProps) {
    super(props);    
    this.state = {
      teams: []
    };
  }

  public componentDidMount(): void {
    this.props.aadTokenProviderFactory.getTokenProvider()
      .then((tokenProvider: AadTokenProvider): void => {

        const authProvider =
          new AzureAdSpfxAuthenticationProvider(
            tokenProvider, 
            this.azureAdApplicationIdUri,
            new Set<string>([
              this.apiHost
            ]));
        
        const adapter = new FetchRequestAdapter(authProvider);
        adapter.baseUrl = `https://${this.apiHost}`;
        
        const teamifiedClient = new TeamifiedApiClient(adapter);

        teamifiedClient.teams.get().then(teams => {
          console.log(teams);
          this.setState({
            teams: teams
          });
        })
        .catch(e => {console.log(e)});
      })
      .catch(e => {console.log(e)});
  }

  public render(): React.ReactElement<ITeamsListProps> {
    const {
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    const teams = this.state.teams.length > 0 ? 
      <div className={styles.wrapper}>{this.state.teams.map((t, i) => {
        const imageIndex = 100 + i;
        const previewProps: IDocumentCardPreviewProps = {
          previewImages: [
            {
              previewImageSrc: `https://picsum.photos/id/${imageIndex}/318/150`,
              imageFit: ImageFit.cover,
              width: 318,
              height: 150,
            },
          ],
        };

        const personas: IFacepilePersona[] = t.members.map(m => {
          const nameSplit: string[] = m.displayName.split(' ');
          const firstNameInitial: string = nameSplit[0].substring(0, 1).toUpperCase();
          const lastNameInitial: string = nameSplit[1] ? nameSplit[1].substring(0, 1).toUpperCase() : '';
          const persona: IFacepilePersona = {
            personaName: m.displayName, 
            imageInitials: `${firstNameInitial} ${lastNameInitial}`
          }
          return persona;
        }); 

        return (
            <DocumentCard key={t.id} type={DocumentCardType.normal}>
              <DocumentCardDetails>
                <DocumentCardPreview {...previewProps} />
                <DocumentCardTitle title={t.displayName} />
                <DocumentCardTitle title={t.description} showAsSecondaryTitle shouldTruncate />
                <Facepile personas={personas} personaSize={PersonaSize.size24} className={styles.facepile} />
              </DocumentCardDetails>
            </DocumentCard>);
      })}        
      </div> : <div>Loading data...</div>

    return (
      <section className={`${styles.teamsList} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <MessageBar>Welcome, {escape(userDisplayName)}. {environmentMessage}</MessageBar>
        </div>
        <div>
          {teams}
        </div>
      </section>
    );
  }
}
