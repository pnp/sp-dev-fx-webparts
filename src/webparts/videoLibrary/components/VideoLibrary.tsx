import * as React from 'react';
import { css } from 'office-ui-fabric-react';

var Slick = require('react-slick');
import { IVideoLibraryWebPartProps } from '../IVideoLibraryWebPartProps';
import { Video, O365Video } from "../../O365VUtilities";
export interface IVideoLibraryProps extends IVideoLibraryWebPartProps {

}
export interface IVideoLibraryState {
  images: Array<string>;

  ease: string;
  width: number;

  videos: Array<Video>;

}
// class ViedeoCarousel extends Carousel{
//   constructor(){
//     super();
//   }
// }

export default class VideoLibrary extends React.Component<IVideoLibraryProps, IVideoLibraryState> {

  private renderVc() { }
  constructor(props: IVideoLibraryProps) {
    super(props);
    this.state = {
      ease: "linear",
      width: 400,

      images: [],
      videos: []
    }
  }

  public componentWillMount(nextProps) {
    // Load new data when the dataSource property changes.
    this.props.o365Video.Initialize().then((settings) => {
      if (this.props.videoChannel) {
        this.props.o365Video.GetVideos(this.props.videoChannel).then((videos) => {
          this.state.videos = videos;
          this.state.images = videos.map((v, i, a) => {

            return v.ThumbnailUrl
          });
          this.setState(this.state);
        })
      }
    });

  }

  public render(): JSX.Element {
    debugger;
   // const Slider = Slick();
    if (this.state.images.length === 0) {
      return (<div />);
    }
    return (
      <div>
        <div >
          <Slick >
            {this.state.videos.map((v, i, a) => { 
              return (<img src={v.ThumbnailUrl} />

              )
            })}
          </Slick>
        </div>
      </div>
    );
  }
}
