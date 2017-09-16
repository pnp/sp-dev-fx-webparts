import * as React from 'react';
import styles from './ImageMagnifier.module.scss';
import { IImageMagnifierProps } from './IImageMagnifierProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ImageMagnifierLens } from './ImageMagnifierLens/ImageMagnifierLens';

export default class ImageMagnifier extends React.Component<IImageMagnifierProps, {}> {
  public render(): React.ReactElement<IImageMagnifierProps> {
    let displayState = null;
    debugger;
    if (
      this.props.smallImgUrl != "" &&
      this.props.smallImgWidth.toString() != "" &&
      this.props.smallImgHeight.toString() != "" &&
      this.props.largeImgUrl != "" &&
      this.props.largeImgWidth.toString() != "" &&
      this.props.largeImgHeight.toString() != "" &&
      this.props.cursorOffsetX.toString() != "" &&
      this.props.cursorOffsetY.toString() != "" &&
      this.props.size.toString() != "") {
      displayState = 1;
    } else {
      displayState = 0;
    }

    if(displayState === 1) {
      return (
        <div className={styles.imageMagnifier}>
          <div className={styles.container}>
            <ImageMagnifierLens
                image={{
                    src: this.props.smallImgUrl,
                    width: Number(this.props.smallImgWidth),
                    height: Number(this.props.smallImgHeight)
                }}
                zoomImage={{
                    src: this.props.largeImgUrl,
                    width: Number(this.props.largeImgWidth),
                    height: Number(this.props.largeImgHeight)
                }}
                cursorOffset={{ x: Number(this.props.cursorOffsetX), y: Number(this.props.cursorOffsetY) }}
                size={ this.props.size }
            />
          </div>
        </div>
      );
    }
    else {
      return (
        <div className={styles.imageMagnifier}>
          <div className={styles.container}>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
              <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
                <span className="ms-font-xl ms-fontColor-white">Image Magnifier Web Part</span>
                <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
