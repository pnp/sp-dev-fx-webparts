import * as React from "react";
import { css } from "office-ui-fabric-react";
var Coverflow = require('reactjs-coverflow');
import { IVideoLibraryCoverFlowWebPartProps } from "../IVideoLibraryCoverFlowWebPartProps";
import { Video } from "../../O365VUtilities";
export interface IVideoLibraryCoverFlowProps extends IVideoLibraryCoverFlowWebPartProps {

}
export interface IVideoLibraryState {
  ease: string;
  width: number;
  playerUrlTemplate: string;
  videos: Array<Video>;
  selectedVideo: number;

}

export default class VideoLibrary extends React.Component<IVideoLibraryCoverFlowProps, IVideoLibraryState> {

  constructor(props: IVideoLibraryCoverFlowProps) {
    super(props);
    this.afterChange = this.afterChange.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.state = {
      ease: "linear",
      width: 400,
      playerUrlTemplate: null,
      videos: [],
      selectedVideo: -1,
    };
  }
  public componentWillMount(nextProps) {
    // Load new data when the dataSource property changes.
    this.props.o365Video.Initialize().then((settings) => {
      debugger;
      //      this.state.playerUrlTemplate = settings.PlayerUrlTemplate; // this url does not work. You neeed the channel
      this.state.playerUrlTemplate = settings.VideoPortalLayoutsUrl + "/VideoEmbedHost.aspx?chId={0}&vId={1}&width={2}&height={3}&autoPlay=true&showInfo=true";
      if (this.props.videoChannel) {
        this.props.o365Video.GetVideos(this.props.videoChannel).then((videos) => {
          this.state.videos = videos;
          this.setState(this.state);
        });
      }
    });

  }
  public componentWillReceiveProps(nextProps: IVideoLibraryCoverFlowProps) {
    if (nextProps.videoChannel) {
      this.props.o365Video.GetVideos(nextProps.videoChannel).then((videos) => {
        this.state.videos = videos;
        this.setState(this.state);
      });
    }


  }
  public afterChange(slideNumber: number) {
    this.state.selectedVideo = -1;
    this.setState(this.state);
  }
  public playVideo(event) {
    debugger;
    this.state.selectedVideo = parseInt(event.target.dataset.videonumber);
    this.setState(this.state);
  }
  public previous(e) {
    e.preventDefault();
    const cf = this.refs["coverflow"] as any;
    cf.previous();

  }
  public next(e) {
    e.preventDefault();
    const cf = this.refs["coverflow"] as any;
    cf.next();
  }
  public render(): JSX.Element {
    debugger;
    if (this.state.videos.length === 0) {
      return (<div />);
    }
    // TODO: stop using the Iframe, use a <video> tah instead
    return (
      <div>
        <div >
          <Coverflow style={{ width: this.props.coverflowWidth + "px", height: this.props.coverflowHeight + "px" }} ref="coverflow"
            margin={this.props.coverflowMargin + "px"}
            startPosition={this.props.coverflowStartPosition}
            enableScroll={this.props.coverflowEnableScroll}
            animationSpeed={this.props.coverflowAnimationSpeed}>

            {this.state.videos.map((v, i, a) => {

              if (i === this.state.selectedVideo) {
                const src = this.state.playerUrlTemplate
                  .replace("{1}", v.ID)
                  .replace("{0}", v.ChannelID)
                  .replace("{2}", this.props.playerWidth.toString())
                  .replace("{3}", this.props.playerHeight.toString());
                return (<iframe src={src} style={{ height: this.props.iframeHeight + "px", width: this.props.iframeWidth + "px" }} />);
              }
              else {
                return (
                  <figure title={v.Title}>
                    <img
                      className="reactjs-coverflow_cover"
                      src={v.ThumbnailUrl}
                      data-videonumber={i}
                      style={{ height: this.props.imgHeight + "px", width: this.props.imgWidth + "px" }}
                      onClick={this.playVideo} />
                    <figcaption>
                      {v.Description}</figcaption>
                  </figure>
                );
              }
            })}
          </Coverflow>
          <div className="reactjs-coverflow_actions" data-radium="true" >
            <button type="button" className="reactjs-coverflow_button" onClick={this.previous}>Previous</button>
            <button type="button" className="reactjs-coverflow_button" onClick={this.next}>Next</button></div>
        </div>
      </div>
    );
  }
}
