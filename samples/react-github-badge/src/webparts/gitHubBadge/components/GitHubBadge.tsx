import * as React from 'react';
import styles from './GitHubBadge.module.scss';
import { IGitHubBadgeProps, IGitHubBadgeState } from './GitHubBadge.types';
import { IGitHubService, IGitHubUserProfile, MockGitHubService, GitHubService } from '../../../services/GitHubServices';

export default class GitHubBadge extends React.Component<IGitHubBadgeProps, IGitHubBadgeState> {
  /**
   *
   */
  constructor(props:IGitHubBadgeProps) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  public componentDidMount(): void {
    this.getGitHubData();
  }

  public componentDidUpdate(prevProps: IGitHubBadgeProps, prevState: IGitHubBadgeState): void {
    if (prevProps.gitHubUserName !== this.props.gitHubUserName) {
      this.getGitHubData();
    }
  }

  public render(): React.ReactElement<IGitHubBadgeProps> {
    const { userProfile, isLoading, errorMessage } = this.state;

    return (
      <div className={ styles.gitHubBadge }>
        <div className={ styles.container }>
          <div className={ styles.row }>
          { isLoading &&
            <div className={ styles.column }>
              <div>Loading...</div>
            </div>
          }
          { !isLoading && userProfile &&
            <div className={ styles.column }>
              <div><img src={userProfile.avatar_url} alt="GitHub User Profile Picture" /></div>
              <div className={ styles.title }>{this.props.gitHubUserName}</div>
              <div className={ styles.label }>{userProfile.login}</div>
              <div className={ styles.label }>{userProfile.id}</div>
              <div className={ styles.label }>{userProfile.node_id}</div>
              <div className={ styles.label }>{userProfile.avatar_url}</div>
              <div className={ styles.label }>{userProfile.gravatar_id}</div>
              <div className={ styles.label }>{userProfile.url}</div>
              <div className={ styles.label }>{userProfile.html_url}</div>
              <div className={ styles.label }>{userProfile.followers_url}</div>
              <div className={ styles.label }>{userProfile.following_url}</div>
              <div className={ styles.label }>{userProfile.gists_url}</div>
              <div className={ styles.label }>{userProfile.starred_url}</div>
              <div className={ styles.label }>{userProfile.subscriptions_url}</div>
              <div className={ styles.label }>{userProfile.organizations_url}</div>
              <div className={ styles.label }>{userProfile.repos_url}</div>
              <div className={ styles.label }>{userProfile.events_url}</div>
              <div className={ styles.label }>{userProfile.received_events_url}</div>
              <div className={ styles.label }>{userProfile.type}</div>
              <div className={ styles.label }>{userProfile.site_admin}</div>
              <div className={ styles.label }>{userProfile.name}</div>
              <div className={ styles.label }>{userProfile.name}</div>
              <div className={ styles.label }>{userProfile.company}</div>
              <div className={ styles.label }>{userProfile.location}</div>
              <div className={ styles.label }>{userProfile.email}</div>
              <div className={ styles.label }>{userProfile.hireable}</div>
              <div className={ styles.label }>{userProfile.bio}</div>
              <div className={ styles.label }>{userProfile.public_repos}</div>
              <div className={ styles.label }>{userProfile.public_gists}</div>
              <div className={ styles.label }>{userProfile.followers}</div>
              <div className={ styles.label }>{userProfile.following}</div>
              <div className={ styles.label }>{userProfile.created_at}</div>
              <div className={ styles.label }>{userProfile.updated_at}</div>
            </div>
          }
          { !isLoading && errorMessage &&
            <div className={ styles.column }>
              <div className={styles.label}>WARNING - error when calling URL https://api.github.com/users/{this.props.gitHubUserName}. Error = {errorMessage}</div>
            </div>
          }
          </div>
        </div>
      </div>
    );
  }

  private getGitHubData()  {
    // Create an instance of the GitHub service
    //const service: IGitHubService = new MockGitHubService();
    const service: IGitHubService = new GitHubService(this.props.httpClient);

    // Call the GitHub service
    // In real-life, we would only call it when we're sure that there is a username
    service.getUserProfile(this.props.gitHubUserName).then((results: IGitHubUserProfile)=>{
      // Set the userProfile with the results we got and isLoading to false, because we're done
      // loading. It'll make things redraw magically.
      this.setState({
        userProfile: results,
        isLoading: false
      });
    });
  }
}
