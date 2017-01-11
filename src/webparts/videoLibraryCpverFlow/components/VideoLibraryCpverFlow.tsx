import * as React from "react";
import { css } from "office-ui-fabric-react";
var Coverflow = require('reactjs-coverflow');
import { IVideoLibraryCpverFlowWebPartProps } from "../IVideoLibraryCpverFlowWebPartProps";
import { Video, O365Video } from "../../O365VUtilities";
export interface IVideoLibraryCpverFlowProps extends IVideoLibraryCpverFlowWebPartProps {

}
export interface IVideoLibraryState {
  ease: string;
  width: number;
  playerUrlTemplate: string;
  videos: Array<Video>;
  selectedVideo: number;

}
class PrevArrow extends React.Component<any, any> {
  render() {
    debugger;
    return (<button>Next</button>);
  }
}
export default class VideoLibrary extends React.Component<IVideoLibraryCpverFlowProps, IVideoLibraryState> {
  constructor(props: IVideoLibraryCpverFlowProps) {
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
        })
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
          <Coverflow width={960}
            height={480}
            displayQuantityOfSide={2}
            navigation={true}
            enableHeading={true}
             media={{
      '@media (max-width: 900px)': {
        width: '600px',
        height: '300px'
      },
      '@media (min-width: 900px)': {
        width: '960px',
        height: '600px'
      }
    }}>
            {this.state.videos.map((v, i, a) => {

              if (i === this.state.selectedVideo) {
                const src = this.state.playerUrlTemplate.replace("{1}", v.ID).replace("{0}", v.ChannelID);
                return (<iframe src={src} style={{ height: "540px", width: "200px" }} />);
              }
              else {
                return (<img className="reactjs-coverflow_cover" src={v.ThumbnailUrl} data-videonumber={i} style={{ height: "540px", width: "200px" }} onClick={this.playVideo} />);
              }
            })}
          </Coverflow>
          <div class="reactjs-coverflow_actions" data-radium="true">
              <button type="button" class="reactjs-coverflow_button">Previous</button>
              <button type="button" class="reactjs-coverflow_button">Next</button></div>
        </div>
      </div>
    );
  }
}
