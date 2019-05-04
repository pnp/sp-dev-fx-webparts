import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { HttpClient, SPHttpClient, HttpClientConfiguration, HttpClientResponse, ODataVersion, IHttpClientConfiguration, IHttpClientOptions, ISPHttpClientOptions } from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './GitHubBadgeWebPart.module.scss';
import * as strings from 'GitHubBadgeWebPartStrings';

export interface IGitHubBadgeWebPartProps {
  description: string;
  gitHubUserName: string;
}

export interface IGitHubBadgeUserProfileProps {
  login: string;
  id: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  public_repos: string;
  public_gists: string;
  followers: string;
  following: string;
  created_at: string;
  updated_at: string;
}

export default class GitHubBadgeWebPart extends BaseClientSideWebPart<IGitHubBadgeWebPartProps> {

  protected getGitHubData(): void {
    let gitHubUrl: string = "https://api.github.com/users/"+this.properties.gitHubUserName;
    let responseText: string = "";
    let notfound: HTMLElement = document.getElementById("notfound");
    let gitHubUserProfilePic: HTMLElement = document.getElementById("gitHubUserProfilePic");
    let login: HTMLElement = document.getElementById("login");
    let id: HTMLElement = document.getElementById("id");
    let node_id: HTMLElement = document.getElementById("node_id");
    let avatar_url: HTMLElement = document.getElementById("avatar_url");
    let gravatar_id: HTMLElement = document.getElementById("gravatar_id");
    let url: HTMLElement = document.getElementById("url");
    let html_url: HTMLElement = document.getElementById("html_url");
    let followers_url: HTMLElement = document.getElementById("followers_url");
    let following_url: HTMLElement = document.getElementById("following_url");
    let gists_url: HTMLElement = document.getElementById("gists_url");
    let starred_url: HTMLElement = document.getElementById("starred_url");
    let subscriptions_url: HTMLElement = document.getElementById("subscriptions_url");
    let organizations_url: HTMLElement = document.getElementById("organizations_url");
    let repos_url: HTMLElement = document.getElementById("repos_url");
    let events_url: HTMLElement = document.getElementById("events_url");
    let received_events_url: HTMLElement = document.getElementById("received_events_url");
    let type: HTMLElement = document.getElementById("type");
    let site_admin: HTMLElement = document.getElementById("site_admin");
    let name: HTMLElement = document.getElementById("name");
    let company: HTMLElement = document.getElementById("company");
    let blog: HTMLElement = document.getElementById("blog");
    let location: HTMLElement = document.getElementById("location");
    let email: HTMLElement = document.getElementById("email");
    let hireable: HTMLElement = document.getElementById("hireable");
    let bio: HTMLElement = document.getElementById("bio");
    let public_repos: HTMLElement = document.getElementById("public_repos");
    let public_gists: HTMLElement = document.getElementById("public_gists");
    let followers: HTMLElement = document.getElementById("followers");
    let following: HTMLElement = document.getElementById("following");
    let created_at: HTMLElement = document.getElementById("created_at");
    let updated_at: HTMLElement = document.getElementById("updated_at");
    let responseJSONparsed: IGitHubBadgeUserProfileProps;
    this.context.httpClient.get(gitHubUrl, HttpClient.configurations.v1).then((response: HttpClientResponse) => {
      response.json().then((responseJSON: JSON) => {
        responseText = JSON.stringify(responseJSON);
        responseJSONparsed = JSON.parse(responseText);
        gitHubUserProfilePic.innerHTML= `<img src="${responseJSONparsed.avatar_url}" alt="GitHub User Profile Picture"></img>`;
        login.innerText = responseJSONparsed.login;
        id.innerText = responseJSONparsed.id;
        node_id.innerText = responseJSONparsed.node_id;
        avatar_url.innerText = responseJSONparsed.avatar_url;
        gravatar_id.innerText = responseJSONparsed.gravatar_id;
        url.innerText = responseJSONparsed.url;
        html_url.innerText = responseJSONparsed.html_url;
        followers_url.innerText = responseJSONparsed.followers_url;
        following_url.innerText = responseJSONparsed.following_url;
        gists_url.innerText = responseJSONparsed.gists_url;
        starred_url.innerText = responseJSONparsed.starred_url;
        subscriptions_url.innerText = responseJSONparsed.subscriptions_url;
        organizations_url.innerText = responseJSONparsed.organizations_url;
        repos_url.innerText = responseJSONparsed.repos_url;
        events_url.innerText = responseJSONparsed.events_url;
        received_events_url.innerText = responseJSONparsed.received_events_url;
        type.innerText = responseJSONparsed.type;
        site_admin.innerText = responseJSONparsed.site_admin;
        name.innerText = responseJSONparsed.name;
        company.innerText = responseJSONparsed.company;
        blog.innerText = responseJSONparsed.blog;
        location.innerText = responseJSONparsed.location;
        email.innerText = responseJSONparsed.email;
        hireable.innerText = responseJSONparsed.hireable;
        bio.innerText = responseJSONparsed.bio;
        public_repos.innerText = responseJSONparsed.public_repos;
        public_gists.innerText = responseJSONparsed.public_gists;
        followers.innerText = responseJSONparsed.followers;
        following.innerText = responseJSONparsed.following;
        created_at.innerText = responseJSONparsed.created_at;
        updated_at.innerText = responseJSONparsed.updated_at;
      })
      .catch ((response: any) => {
        let errMsg: string = `WARNING - error when calling URL ${gitHubUrl}. Error = ${response.message}`;
        notfound.style.color = "red";
        console.log(errMsg);
        notfound.innerText = errMsg;
      });
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.gitHubBadge }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <div id="gitHubUserProfilePic"></div>
              <div id="gitHubUserName" class="${ styles.title }">${this.properties.gitHubUserName}</div>
              <div id="login" class="${ styles.label }"></div>
              <div id="id" class="${ styles.label }"></div>
              <div id="node_id" class="${ styles.label }"></div>
              <div id="avatar_url" class="${ styles.label }"></div>
              <div id="gravatar_id" class="${ styles.label }"></div>
              <div id="url" class="${ styles.label }"></div>
              <div id="html_url" class="${ styles.label }"></div>
              <div id="followers_url" class="${ styles.label }"></div>
              <div id="following_url" class="${ styles.label }"></div>
              <div id="gists_url" class="${ styles.label }"></div>
              <div id="starred_url" class="${ styles.label }"></div>
              <div id="subscriptions_url" class="${ styles.label }"></div>
              <div id="organizations_url" class="${ styles.label }"></div>
              <div id="repos_url" class="${ styles.label }"></div>
              <div id="events_url" class="${ styles.label }"></div>
              <div id="received_events_url" class="${ styles.label }"></div>
              <div id="type" class="${ styles.label }"></div>
              <div id="site_admin" class="${ styles.label }"></div>
              <div id="name" class="${ styles.label }"></div>
              <div id="company" class="${ styles.label }"></div>
              <div id="blog" class="${ styles.label }"></div>
              <div id="location" class="${ styles.label }"></div>
              <div id="email" class="${ styles.label }"></div>
              <div id="hireable" class="${ styles.label }"></div>
              <div id="bio" class="${ styles.label }"></div>
              <div id="public_repos" class="${ styles.label }"></div>
              <div id="public_gists" class="${ styles.label }"></div>
              <div id="followers" class="${ styles.label }"></div>
              <div id="following" class="${ styles.label }"></div>
              <div id="created_at" class="${ styles.label }"></div>
              <div id="updated_at" class="${ styles.label }"></div>
              <div id="notfound" class="${styles.label}"></div>
            </div>
          </div>
        </div>
      </div>`;
      this.getGitHubData();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('gitHubUserName', {
                  label: strings.GitHubUserNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
