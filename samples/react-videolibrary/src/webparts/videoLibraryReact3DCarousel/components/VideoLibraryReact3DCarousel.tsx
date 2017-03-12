import * as React from 'react';
import { css } from 'office-ui-fabric-react';
var Carousel = require('react-3d-carousel');
var Ease = require('ease-functions');
import styles from '../VideoLibraryReact3DCarousel.module.scss';
import { IVideoLibraryReact3DCarouselWebPartProps } from '../IVideoLibraryReact3DCarouselWebPartProps';
import { Video, } from "../../O365VUtilities";
export interface IVideoLibraryProps extends IVideoLibraryReact3DCarouselWebPartProps {

}
export interface IVideoLibraryState {
  images: Array<string>;

  ease: string;
  width: number;

  videos: Array<Video>;

}
export default class VideoLibrary extends React.Component<IVideoLibraryProps, IVideoLibraryState> {
  constructor(props: IVideoLibraryProps) {

    super(props);

    this.onEase = this.onEase.bind(this);


    this.state = {
      ease: "linear",
      width: 400,

      images: [],
      videos: []
    };
  }
  public componentWillMount(nextProps) {
    // Load new data when the dataSource property changes.
    this.props.o365Video.Initialize().then((settings) => {
      if (this.props.videoChannel) {
        this.props.o365Video.GetVideos(this.props.videoChannel).then((videos) => {
          this.state.videos = videos;
          this.state.images = videos.map((v, i, a) => {

            return v.ThumbnailUrl;
          });
          this.setState(this.state);
        });
      }
    });

  }



  public onEase(event) {
    this.state.ease = event.target.value;
    this.setState(this.state);
  }

  public render(): JSX.Element {
    const easeList = Object.keys(Ease).map(function (d) {
      return (<option key={d} value={d}>{d}</option>);
    });
    if (this.state.images.length === 0) {
      return (<div />);
    }
    return (
      <div className={styles.videoLibrary}>
        <div className={styles.container} id="content">
          <Carousel width={this.state.width}
            panels={this.props.panels}
            images={this.state.images}
            ease={this.state.ease}
            duration={this.props.duration}
            layout={this.props.layout} />
          <table>
            <tr>
              <td>
                Ease
              </td>
              <td>
                <select onChange={this.onEase} value={this.state.ease}>
                  {easeList}
                </select>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
