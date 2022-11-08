import * as React from "react";
import styles from "./SharePointStories.module.scss";
import { ISharePointStoriesProps } from "./ISharePointStoriesProps";
import { ISharePointStoriesState } from "./ISharePointStoriesState";
import Stories from "react-insta-stories";
import { SPHttpClient} from '@microsoft/sp-http';
import { Renderer, Story } from "react-insta-stories/dist/interfaces";
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { PersonViewType } from '@microsoft/mgt-spfx';
import { WithSeeMore } from 'react-insta-stories';

export default class SharePointStories extends React.Component<ISharePointStoriesProps, ISharePointStoriesState> {

  private _spHttpClient: SPHttpClient;

  constructor(props: ISharePointStoriesProps) {
    super(props);

    this._spHttpClient = this.props.webpartContext.spHttpClient;

    this.state = {
      stories: []
    };
  }

  public componentDidMount(): void {
    const endpoint: string =
      `${this.props.webpartContext.pageContext.site.absoluteUrl}/_api/web/lists/GetByTitle('Stories')/RenderListDataAsStream`;

      this._spHttpClient.post(endpoint, SPHttpClient.configurations.v1, { })
      .then((response) => {
        response.json()
        .then(data => {
          var listItems = data.Row;
          var stories = listItems.map(item => {
            return this._getStoryFromListItem(item);
          });

          this.setState({
            stories: stories
          });
        });
      });
  }

  public render(): React.ReactElement<ISharePointStoriesProps> {
    if (!this.state.stories.length) return <div>Loading stories...</div>;

    return <div>
      <Stories
        stories={this.state.stories}
        loop
        keyboardNavigation />
    </div>;
  }

  private _getStoryFromListItem(item: any): Story {

    const contentStyle = {
      width: '100%',
      height: '100%',
      padding: 0
    };

    var storyRenderer: Renderer = ({ action, isPaused, story: thisStory, config}) => {
      return <WithSeeMore story={thisStory} action={action}>
        <div style={{ ...contentStyle, backgroundImage: `url("${thisStory.url}")`, backgroundRepeat: 'no-repeat', paddingTop: '50px' }}>
        <div>
          <Person userId={authorId} avatarSize={'large'} view={PersonViewType.twolines} />
        </div>
      </div></WithSeeMore>;
    };

    var image = item.Image;
    var fullImageUrl = `${image.serverUrl}${image.serverRelativeUrl}`;
    var authorId: string = item.Author0[0].sip;
    var content: string = item.Content;

    var story: Story = {
      url: fullImageUrl,
      duration: 4000,
      content: storyRenderer
    };

    if (content) {
      story.seeMore = ({ close }) => {
        return <div style={{backgroundColor: 'white'}} onClick={close}>{content}</div>;
      };
    }

    return story;
  }
}
