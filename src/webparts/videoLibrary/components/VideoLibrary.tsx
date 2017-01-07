import * as React from 'react';
import { css } from 'office-ui-fabric-react';
var Carousel = require('react-3d-carousel');
var Ease = require('ease-functions');
import styles from '../VideoLibrary.module.scss';
import { IVideoLibraryWebPartProps } from '../IVideoLibraryWebPartProps';
import { Video, O365Video } from "../../O365VUtilities";
export interface IVideoLibraryProps extends IVideoLibraryWebPartProps {

}
export interface IVideoLibraryState {
  images: Array<string>;
  duration: string;
  ease: string;
  width: number;
  sides: number;
  videos: Array<Video>;

}
export default class VideoLibrary extends React.Component<IVideoLibraryProps, IVideoLibraryState> {
  constructor(props: IVideoLibraryProps) {

    super(props);
    this.onSides = this.onSides.bind(this);
    this.onDuration = this.onDuration.bind(this);
    this.onEase = this.onEase.bind(this);


    this.state = {
      duration: "400",
      ease: "linear",
      width: 400,
      sides: 3,
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
  public componentWillReceiveProps(nextProps) {
    // Load new data when the dataSource property changes.
   // this.state.images = nextProps.videos.map((v, i, a) => { return v.ThumbnailUrl });
  }
  public onSides(event) {
    this.state.images = this.state.images.slice(0, event.target.value);
    this.setState(this.state);
  }

  public onDuration(event) {
    this.state.duration = event.target.value;
    this.setState(this.state);
  }
  public onEase(event) {
    this.state.ease = event.target.value;
    this.setState(this.state);
  }

  public render(): JSX.Element {
    var easeList = Object.keys(Ease).map(function (d) {
      return (<option key={d} value={d}>{d}</option>)
    });
    if (this.state.images.length===0){
      return (<div/>);
    }
    return (
      <div className={styles.videoLibrary}>
        <div className={styles.container} id="content">
          <Carousel width={this.state.width}
          sides="5"
            images={this.state.images}
            ease={this.state.ease}
            duration="10000"
            layout={this.props.layout} />
          <table>
            <tr>
              <td>
                <label htmlFor="panel-count">Panels</label>
              </td>
              <td>
                <input type="range" id="panel-count"
                  value={this.state.images.length.toString()} min="3" max="20"
                  onChange={this.onSides} />
              </td>
              <td><span>{this.state.sides}</span></td>
            </tr>
       
            <tr>
              <td>
                <label htmlFor="duration">Duration</label>
              </td>
              <td>
                <input type="range" id="duration"
                  value={this.state.duration} min="0" step="250" max="1500"
                  onChange={this.onDuration} />
              </td>
              <td>
                <span>{this.state.duration}</span>
              </td>
            </tr>
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
