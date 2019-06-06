import * as React from 'react';
import styles from './GitHubBadgeV2.module.scss';
import { IGitHubBadgeV2Props, IGitHubBadgeV2State } from './IGitHubBadgeV2.types';
import { IGitHubService, IGitHubUserProfile, MockGitHubService, GitHubService } from '../../../services/GitHubServices';
import { IPersonaProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType } from 'office-ui-fabric-react/lib/Shimmer';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from '@microsoft/sp-core-library';
import * as strings from 'GitHubBadgeV2WebPartStrings';

/**
 * This sample demonstrates how easy it is to change how a web part is rendered
 * using a Fabric UI Persona component.
 *
 * In a real-world situation, we wouldn't have two web parts (GitHubBadge and GitHubBadgeV2);
 * We wanted to demonstrate how the changes to the web part are limited to the component
 */
export default class GitHubBadgeV2 extends React.Component<IGitHubBadgeV2Props, IGitHubBadgeV2State> {
  constructor(props: IGitHubBadgeV2Props) {
    super(props);

    this.state = {
      isLoading: this.props.gitHubUserName !== ""
    };
  }

  /**
   * When the component mounts, get data
   */
  public componentDidMount(): void {
    this.getGitHubData();
  }

  /**
   * If the username changes, reload the data
   */
  public componentDidUpdate(prevProps: IGitHubBadgeV2Props, prevState: IGitHubBadgeV2State): void {
    if (prevProps.gitHubUserName !== this.props.gitHubUserName) {
      this.getGitHubData();
    }
  }

  /**
   * Render a shimmer when loading,
   * a persona when data is loaded,
   * and an error message if anything goes wrong
   */
  public render(): React.ReactElement<IGitHubBadgeV2Props> {
    const { userProfile, isLoading, errorMessage } = this.state;

    return (
      <div className={styles.gitHubBadgeV2}>
        {/* Show a shimmer when loading */}
        {isLoading &&
          <Shimmer customElementsGroup={this.getCustomElements()} isDataLoaded={false}>
            <Persona size={PersonaSize.size100} presence={PersonaPresence.none} />
          </Shimmer>
        }
        {/* If no username was specified, show a placeholder */}
        {!isLoading && this.props.gitHubUserName === "" &&
          <Placeholder iconName={strings.PlaceholderIconName}
            iconText={strings.PlaceholderIconText}
            description={strings.PlaceholderDescription}
            buttonLabel={strings.PlaceholderButtonLabel}
            onConfigure={this.props.onConfigure}
            hideButton={this.props.displayMode === DisplayMode.Read}
          />
        }
        {/* If we're done loading and have a user id, show the profile */}
        {!isLoading && this.props.gitHubUserName !== "" && userProfile && userProfile.id !== undefined &&
          <Persona
            imageUrl={userProfile.avatar_url}
            imageAlt={userProfile.name}
            text={userProfile.name}
            secondaryText={userProfile.bio}
            tertiaryText={userProfile.company}
            optionalText={userProfile.location}
            size={PersonaSize.size100}
            presence={PersonaPresence.none}
            hidePersonaDetails={false}
            onRenderOptionalText={this.onRenderOptionalText}
            onRenderTertiaryText={this.onRenderTertiaryText}
          />
        }
        {/* If we're done loading and don't have a user id, user does not exist. Show an unknown user */}
        {!isLoading && this.props.gitHubUserName !== "" && userProfile && userProfile.id === undefined &&
          <Persona
          showUnknownPersonaCoin={true}
          text={strings.PersonaUserNotFound}
          size={PersonaSize.size100}
        />
        }
        {/* If something went wrong, show an error message */}
        {!isLoading && errorMessage &&
          <MessageBar messageBarType={MessageBarType.error} isMultiline={true} dismissButtonAriaLabel={strings.MessageBarDismissLabel}>
            {errorMessage}
          </MessageBar>
        }
      </div>
    );
  }

  /**
   * Retrive data from GitHub
   */
  private getGitHubData() {
    // Don't retrieve anything if there isn't a username
    if (this.props.gitHubUserName === "") {
      return;
    }

    // Create an instance of the GitHub service
    //const service: IGitHubService = new MockGitHubService();
    const service: IGitHubService = new GitHubService(this.props.httpClient);

    // Call the GitHub service
    service.getUserProfile(this.props.gitHubUserName).then((results: IGitHubUserProfile) => {
      // Set the userProfile with the results we got and isLoading to false, because we're done
      // loading. It'll make things redraw magically.
      this.setState({
        userProfile: results,
        isLoading: false
      });
    }, (error:any)=>{
      // Oops, we got an error.
      // Save the error message so we can display it.
      this.setState({
        errorMessage: error,
        isLoading: false
      });
    });
  }

  /**
   * Renders the persona's tertiary text with a people icon to mimic the GitHub profile
   */
  private onRenderTertiaryText = (props: IPersonaProps): JSX.Element => {
    return (
      <div>
        <Icon iconName={'People'} className={styles.personaIcon} />
        {props.tertiaryText}
      </div>
    );
  }

  /**
   * Renders the persona's optional text with a point of
   * interest icon to mimic GitHub's profile
   */
  private onRenderOptionalText = (props: IPersonaProps): JSX.Element => {
    return (
      <div>
        <Icon iconName={'POI'} className={styles.personaIcon} />
        {props.optionalText}
      </div>
    );
  }

  /**
   * Renders a custom shimmer that looks like a persona
   */
  private getCustomElements = (): JSX.Element => {
    return (
      <div style={{ display: 'flex' }}>
        <ShimmerElementsGroup
          shimmerElements={[{ type: ShimmerElementType.circle, height: 100 }, { type: ShimmerElementType.gap, width: 16, height: 40 }]}
        />
        <ShimmerElementsGroup
          flexWrap={true}
          width="100%"
          shimmerElements={[
            { type: ShimmerElementType.line, width: '100%', height: 10, verticalAlign: 'bottom' },
            { type: ShimmerElementType.line, width: '90%', height: 8 },
            { type: ShimmerElementType.gap, width: '10%', height: 20 }
          ]}
        />
      </div>
    );
  }
}
