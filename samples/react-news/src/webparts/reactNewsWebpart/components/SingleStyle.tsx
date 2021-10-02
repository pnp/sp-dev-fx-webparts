import * as React from 'react';
import { StylingState, StylingProps } from './StylingPropsState';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import styles from './ReactNewsWebpart.module.scss';
export const iconClass = mergeStyles({
  fontSize: 15,
  height: 15,
  width: 15
});

export default class StackStyle extends React.Component<StylingProps, StylingState> {

  constructor(props: StylingProps) {
    super(props);
    this.state = {
      News: [],
      RenderedNews: [],
      UpdateCount: 0,
      Next: 3,
      Count: 1,
      Reload: true
    };
  }
  public Next(News) {
    var array = [];
    var count = 0;
    var min = this.state.Next;
    var max = min + 4;
    News.map(Post => {
      count = count + 1;
      if (count > min && count < max) {
        array.push(Post);
      }
    });
    var newVal = this.state.Next + 3;
    this.setState({ RenderedNews: array, Next: newVal, Count: this.state.Count + 1 });
  }

  public Back(News) {
    var array = [];
    var max, min;
    min = this.state.Next - 6;
    max = this.state.Next - 2;
    var count = 0;
    News.map((Post) => {
      count = count + 1;
      if (count > min && count < max) {
        array.push(Post);
      }
    });
    var newVal = this.state.Next - 3;
    this.setState({ RenderedNews: array, Next: newVal, Count: this.state.Count - 1 });
  }
  
  public componentDidMount() {
    var array = [];
    var count = 0;
    var min = 0;
    var max = min + 4;
    this.props.News.map(Post => {
      count = count + 1;
      if (count > min && count < max) {
        array.push(Post);
      }
    });
    this.setState({ RenderedNews: array, Next: 3, Count: 1, UpdateCount: 0 });
  }
  public componentDidUpdate(prevProps: StylingProps) {
    var array = [];
    var count = 0;
    var min = 0;
    var max = min + 4;
    if (prevProps.News !== this.props.News) {

      this.props.News.map(Post => {
        count = count + 1;
        if (count > min && count < max) {
          array.push(Post);
        }
      });
      this.setState({ RenderedNews: array, Next: 3, Count: 1, UpdateCount: 0 });
      return true;
    }
    else if (this.props.News.length > 0 && this.props.News.length > this.state.RenderedNews.length && this.state.UpdateCount < 4) {
      this.props.News.map(Post => {
        count = count + 1;
        if (count > min && count < max) {
          array.push(Post);
        }
      });
      this.setState({ RenderedNews: array, Next: 3, Count: 1, UpdateCount: this.state.UpdateCount + 1 });
      return true;
    }
  }
  public render(): React.ReactElement<StylingProps> {
    var i = 0;
    var Height: any;
    switch (this.state.RenderedNews.length) {
      case 1:
        Height = '246px';
        break;
      case 2:
        Height = '435px';
        break;
      case 3:
        Height = '624px';
        break;
    }
    return (<div className={styles.SingleStyle}>
      <div className={styles.SingleStyleContainer} style={{ height: Height }}>
        <div>{this.state.RenderedNews.map(Post => {
          return <div className={styles.NewsContainer} style={{ boxShadow: 'rgb(0 0 0 / 16%) 0px 1px 4px, rgb(0 0 0 / 10%) 0px 0px 1px' }}>
            <div className={styles.ImgContainer}>
              <img src={Post.Thumbnail} className={styles.Image}></img></div>
            <div className={styles.NewsBody}>
              <div className={styles.TitleContainer}>
                <a className={styles.TitleStyling} href={Post.Url}>{Post.Title}</a>
              </div>
              <div className={styles.DescriptionContainer}>{Post.Description}</div>
              <div className={styles.IconContainer}>
                <Icon className={iconClass} iconName="Like"></Icon>
                <label className={styles.IconLabelStyling}>
                  {Post.Likes}
                </label>
                <Icon style={{ marginLeft: "10px" }} className={iconClass} iconName="Comment"></Icon>
                <label className={styles.IconLabelStyling}>
                  {Post.Comments}
                </label>
              </div>
              <div className={styles.AuthorContainer}>
                {this.props.AuthorToggle ? <></> : Post.Author} Created {Post.Created}
              </div>
            </div>
          </div>;
        })}</div>
        <div className={styles.NavigationContainer} >
          <button
            disabled={this.state.Next === 3}
            style={{ boxShadow: '0 1px 4px rgb(0 0 0 / 30%), 0 0 40px rgb(0 0 0 / 10%)' }}
            className={styles.NavigationLeftButtonStyling}
            onClick={() => this.Back(this.props.News)}>Back</button>
          <button
            disabled={this.state.Next >= this.props.News.length}
            style={{ boxShadow: '0 1px 4px rgb(0 0 0 / 30%), 0 0 40px rgb(0 0 0 / 10%)' }}
            className={styles.NavigationRightButtonStyling}
            onClick={() => this.Next(this.props.News)}>Next</button>
          <div className={styles.NavigationPageNumStyling}>{this.state.Count} out of {Math.ceil(this.props.News.length / 3)}</div>
        </div>
      </div>
    </div>
    );
  }
}