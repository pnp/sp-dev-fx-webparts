import * as React from 'react';
import { IReactNewsWebpartProps } from './IReactNewsWebpartProps';
import { IReactNewsWebpartState } from './IReactNewsWebpartState';
import SingleStyle from './SingleStyle';
import StackStyle from './StackStyle';
import spservices from './Service/SPServices';

export default class ReactNewsWebpart extends React.Component<IReactNewsWebpartProps, IReactNewsWebpartState> {
  private _spservices: spservices;
  constructor(props: IReactNewsWebpartProps, state: IReactNewsWebpartState) {
    super(props);
    this.state = {
      SPGuid: '',
      News: [],
      Reload: false
    };
    this._spservices = new spservices(this.props.context);
  }

  public async componentDidMount() {
    this.Get('Default');
  }

  public componentDidUpdate(prevProps: IReactNewsWebpartProps) {
    if (prevProps.Site !== this.props.Site) {
      this.props.onChangeProperty("Sites");
      if (this.props.Site.length > 0) {
        this.Get('Update');
      }
      else {
        this.Get('Default');
      }
      
      this.setState({Reload: !this.state.Reload});
    }
  }


  public async Get(Choice) {
    var e: any[] = [];
    var URL: any;
    if (this.props.Site === undefined || this.props.Site.length < 1 || (Choice === 'Default' && this.props.Site.length < 1)) {
      URL = this.props.context.pageContext.web.absoluteUrl;
      const Posts = await this._spservices.getInfo(URL);
      Posts.map(async Post => {
        const Comments = await this._spservices.getComments(URL, Post.Id);
        const Likes = await this._spservices.getLikes(URL, Post.Id);
        e.push({
          Author: Post.Author,
          Title: Post.Title,
          Description: Post.Description,
          Id: Post.Id,
          Created: Post.Created,
          Thumbnail: Post.BannerImageUrl,
          Url: Post.Url,
          Comments: Comments,
          Likes: Likes
        });
        if (this.state.Reload === true) {
          this.setState({ News: e, Reload: false });
        }
        else {this.setState({ News: e });}
        
      });
    }
    else {
      this.props.Site.map(async site => {
        URL = site.url;
        const Info = await this._spservices.getInfo(URL);
        Info.map(async Post => {
          const Comments = await this._spservices.getComments(site.url, Post.Id);
          const Likes = await this._spservices.getLikes(site.url, Post.Id);
          e.push({
            Author: Post.Author,
            Title: Post.Title,
            Description: Post.Description,
            Id: Post.Id,
            Created: Post.Created,
            Thumbnail: Post.BannerImageUrl,
            Url: Post.Url,
            Comments: Comments,
            Likes: Likes
          });
          if (this.state.Reload === true) {
            this.setState({ News: e, Reload: false });
          }
         else {this.setState({ News: e });}
        });
      });
    }
    this.setState({ News: e });
  }
/*
  public Click() {
    
    this.setState({Reload: true})
  }*/
  public render(): React.ReactElement<IReactNewsWebpartProps> {
      return <div style={{ height: '100%', width: '100%' }}>
      {/*<button style={{boxShadow: 'rgb(0 0 0 / 16%) 0px 1px 4px, rgb(0 0 0 / 10%) 0px 0px 40px', border: 'none', marginBottom: '7px', padding: '4px 14px'}} onClick={() => this.Click()}>Reload</button>*/}
      {this.props.StyleToggle ?
      <StackStyle News={this.state.News} AuthorToggle={this.props.AuthorToggle} Reload={this.state.Reload}></StackStyle> :
      <SingleStyle News={this.state.News} AuthorToggle={this.props.AuthorToggle} Reload={this.state.Reload}></SingleStyle>}
    </div>;
  }
}