import * as React from "react";
import { css } from "office-ui-fabric-react";
var Slick = require("react-slick");
import { IVideoLibraryWebPartProps } from "../IVideoLibraryWebPartProps";
import { Video} from "../../O365VUtilities";
export interface IVideoLibraryProps extends IVideoLibraryWebPartProps {

}
export interface IVideoLibraryState {
  ease: string;
  width: number;
  playerUrlTemplate: string;
  videos: Array<Video>;
  selectedVideo: number;

}
class PrevArrow extends React.Component<any, any> {
 public render() {
    debugger;
    return (<button>Next</button>);
  }
}
export default class VideoLibrary extends React.Component<IVideoLibraryProps, IVideoLibraryState> {
  constructor(props: IVideoLibraryProps) {
    super(props);
    this.afterChange = this.afterChange.bind(this);
    this.playVideo = this.playVideo.bind(this);
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
      this.state.playerUrlTemplate = settings.VideoPortalLayoutsUrl + "/VideoEmbedHost.aspx?chId={0}&vId={1}&width=640&height=360&autoPlay=true&showInfo=true";
      if (this.props.videoChannel) {
        this.props.o365Video.GetVideos(this.props.videoChannel).then((videos) => {
          this.state.videos = videos;
          this.setState(this.state);
        });
      }
    });

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

  public render(): JSX.Element {
    if (this.state.videos.length === 0) {
      return (<div />);
    }
    return (
      <div>
        <div >
          <Slick arrows={true} afterChange={this.afterChange} width="80%" dots={true} >
            {this.state.videos.map((v, i, a) => {

              if (i === this.state.selectedVideo) {
                const src = this.state.playerUrlTemplate.replace("{1}", v.ID).replace("{0}", v.ChannelID);
                return (<iframe src={src} style={{ height: "540px", width: "200px" }} />);
              }
              else {
                return (<img src={v.ThumbnailUrl} data-videonumber={i} style={{ height: "540px", width: "200px" }} onClick={this.playVideo} />);
              }
            })}
          </Slick>
        </div>
      </div>
    );
  }
}
