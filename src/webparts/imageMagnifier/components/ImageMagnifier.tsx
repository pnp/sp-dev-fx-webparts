import * as React from 'react';
import styles from './ImageMagnifier.module.scss';
import { IImageMagnifierProps } from './IImageMagnifierProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ImageMagnifierLens } from './ImageMagnifierLens/ImageMagnifierLens';

export default class ImageMagnifier extends React.Component<IImageMagnifierProps, {}> {
  public render(): React.ReactElement<IImageMagnifierProps> {
    return (
      <div className={styles.imageMagnifier}>
        <div className={styles.container}>
          <ImageMagnifierLens
              image={{
                  src: "https://raw.githubusercontent.com/giuleon/react-image-magnifier/HEAD/src/img/world-map-small.jpg",
                  width: 400,
                  height: 300
              }}
              zoomImage={{
                  src: this.props.description,
                  width: 1600,
                  height: 1200
              }}
              cursorOffset={{ x: 80, y: -80 }}
              size={ 200 }
          />
          {/* <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}
