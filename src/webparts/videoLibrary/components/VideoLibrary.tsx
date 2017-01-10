import * as React from "react";
import { css } from "office-ui-fabric-react";

var Slick = require("react-slick");
import { IVideoLibraryWebPartProps } from "../IVideoLibraryWebPartProps";
import { Video, O365Video } from "../../O365VUtilities";
export interface IVideoLibraryProps extends IVideoLibraryWebPartProps {

}
export interface IVideoLibraryState {
  ease: string;
  width: number;
  playerUrlTemplate: string;
  videos: Array<Video>;
  selectedVideo: number;

}
export default class VideoLibrary extends React.Component<IVideoLibraryProps, IVideoLibraryState> {
  private renderVc() { }
  constructor(props: IVideoLibraryProps) {
    super(props);
    this.afterChange = this.afterChange.bind(this);
    this.state = {
      ease: "linear",
      width: 400,
      playerUrlTemplate: null,
      videos: [],
      selectedVideo: 0,
    };
  }
  public componentWillMount(nextProps) {
    // Load new data when the dataSource property changes.
    this.props.o365Video.Initialize().then((settings) => {

      this.state.playerUrlTemplate = settings.PlayerUrlTemplate;
      this.state.playerUrlTemplate = "https://rgove3.sharepoint.com/portals/hub/_layouts/15/VideoEmbedHost.aspx?chId={0}&vId={1}&width=640&height=360&autoPlay=false&showInfo=true";
      if (this.props.videoChannel) {
        this.props.o365Video.GetVideos(this.props.videoChannel).then((videos) => {
          this.state.videos = videos;
          this.setState(this.state);
        })
      }
    });

  }
  public afterChange(slideNumber: number) {

  }
  public render(): JSX.Element {
    debugger;
    // const Slider = Slick();
    if (this.state.videos.length === 0) {
      return (<div />);
    }
    return (
      <div>
        <div >
          <Slick arrows={true} afterChange={this.afterChange}  >
            {this.state.videos.map((v, i, a) => {
              
              
              // return (<video controls={true} poster={v.ThumbnailUrl} preload="none">
              //   <source src={v.VideoDownloadUrl} />
              // </video>
              // )
              const src = this.state.playerUrlTemplate.replace("{1}", v.ID).replace("{0}", v.ChannelID);
              return (<iframe src={src} />);
            })}
          </Slick>
        </div>
      </div>
    );
  }
}
