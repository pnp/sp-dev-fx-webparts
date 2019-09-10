import * as React from 'react';
import styles from './SpFxWebCam.module.scss';
import { ISpFxWebCamProps } from './ISpFxWebCamProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as Webcam from "react-webcam";
import * as ReactDom from 'react-dom';
import { Button } from 'office-ui-fabric-react/lib/Button';
export default class SpFxWebCam extends React.Component<ISpFxWebCamProps,{imageData: string, image_name:string,webcam:Webcam,stream:any}> {

  private _camContainer: HTMLElement = undefined;
  private _capturedPhoto: HTMLElement = undefined;


public render(): React.ReactElement<ISpFxWebCamProps> {
    return (
      <div>
      <div className={ styles.spFxWebCam }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>SPFx Web/Mobile Camera Demo </span>
              <p className={ styles.subTitle }>This is demo of how to open webcam and take photo from SPFx webpart.
              It will open camera in mobile web browser also</p>
              <a onClick={() => this.opencam()} className={ styles.button }>
                <span className={ styles.label }>Open webcam</span>
              </a>
              <a onClick={() => this.capture()} className={ styles.button }>
                <span className={ styles.label }>Take Photo</span>
              </a>
                <a onClick={() => this.close()} className={ styles.button }>
                <span className={ styles.label }>Close webcam</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="camContainer"   ref={(elm) => { this._camContainer = elm; }}>
        </div>
      <div id="capturedPhoto" ref={(elm) => { this._capturedPhoto = elm; }}> 
        </div>
      </div>
    );
  }

  private setRef = (webcam) => {
    this.setState({webcam:webcam})
  }
  public close(){
    ReactDom.unmountComponentAtNode(this._camContainer);
  }
  private capture(){
    const imageSrc  =  this.state.webcam.getScreenshot();
    const element = React.createElement(
      'img',
      {
        src:imageSrc
      }
    );
    ReactDom.render(element, this._capturedPhoto);
  }
  private opencam () {
      const element2: React.ReactElement<Webcam.WebcamProps > = React.createElement(
      Webcam,
      {
      height:350,
      width:350,
      screenshotFormat:"image/jpeg",
      
      ref:this.setRef,
      
      }
    );
    //const camContainer = document.getElementById("camContainer")
    ReactDom.render(element2, this._camContainer);
}



}
