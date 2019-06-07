import * as React from 'react';
import styles from './DocumentTile.module.scss';
import { IOneDriveFile } from '../OneDriveTab.types';
import { css, IRenderFunction, IRectangle } from 'office-ui-fabric-react/lib/Utilities';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import * as strings from 'PropertyPaneFilePickerStrings';
import { Check } from 'office-ui-fabric-react/lib/Check';
import { ScreenWidthMinLarge } from 'office-ui-fabric-react/lib/Styling';
import { IDimensions } from '../../../../services/OneDriveServices';

const MAX_ASPECT_RATIO = 3;

/**
 *
 */
export interface IDocumentTileProps {
  item: IOneDriveFile;
  index: number;
  isSelected: boolean;
  pageWidth: number;
  tileDimensions: IDimensions;
  onItemInvoked: (item: IOneDriveFile) => void;
}

export interface IDocumentTileState { }

export class DocumentTile extends React.Component<IDocumentTileProps, IDocumentTileState> {
  public render(): React.ReactElement<IDocumentTileProps> {
    const { isSelected, index, item, pageWidth, tileDimensions } = this.props;
    const isLarge: boolean = pageWidth >= ScreenWidthMinLarge;

    // Find the dimensions that are biggest
    let thumbnailWidth: number = tileDimensions.width;
    let thumbnailHeight: number = tileDimensions.height;


    if (item.dimensions) {
      const contentAspectRatio = item.dimensions.width / item.dimensions.height;
      const boundsAspectRatio = tileDimensions.width / tileDimensions.height;

      let scale: number;

      if (contentAspectRatio > boundsAspectRatio) {
        scale = tileDimensions.width / item.dimensions.width;
      } else {
        scale = tileDimensions.height / item.dimensions.height;
      }

      const finalScale = Math.min(MAX_ASPECT_RATIO, scale);

      thumbnailWidth = item.dimensions.width * finalScale;
      thumbnailHeight = item.dimensions.height * finalScale;
    }

    const thumbnail: string = item.thumbnail + `&width=${thumbnailWidth}&height=${thumbnailHeight}`;
    const ariaLabel: string = strings.ImageAriaLabelTemplate.replace('{0}', item.fileIcon);
    const itemLabel: string = strings.DocumentLabelTemplate
      .replace('{0}', item.name)
      .replace('{1}', item.modified)
      .replace('{2}', item.modifiedBy);

    return (
      <div
        aria-selected={isSelected}
        data-is-draggable={false}
        role="listitem"
        aria-labelledby={`Tile-label${index}`}
        aria-describedby={`Tile-activity${index}`}
        className={css(styles.tile, isLarge ? styles.isLarge : styles.isSmall, styles.invokable, styles.selectable, isSelected ? styles.selected : undefined)}
        data-is-focusable={true}
        data-is-sub-focuszone={true}
        data-disable-click-on-enter={true}
        data-selection-index={index}
        //data-selection-invoke={true}
        onClick={(_event)=>this.props.onItemInvoked(item)}
      >
        <div
          className={styles.link}
          role="link"
          //onClick={(_event) => this.props.onItemInvoked(item)}
          //data-selection-invoke={true}
        >
          <span
            id={`Tile-label${index}`}
            className={styles.label}>{itemLabel}</span>
          <span role="presentation" className={styles.aboveNameplate}>
            <span role="presentation" className={styles.content}>
              <span role="presentation" className={styles.foreground}>
                <span className={styles.odItemTile2Image}>
                  <span className={styles.odImageFrame2} style={{ width: thumbnailWidth, height: thumbnailHeight }}>
                    <span className={styles.odImageFrame2Image}>
                      <span className={styles.odImageFrame}>
                        <span className={styles.odImageStack}>
                          <span className={styles.odImageStackTile}>
                            <span className={styles.odImageTile}>
                              <span className={styles.odImageTileBackground}>
                                <Image
                                  src={thumbnail}
                                  width={thumbnailWidth}
                                  height={thumbnailHeight}
                                  imageFit={ImageFit.contain}
                                />
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
              <span className={styles.odItemTile2SmallIcon} >
                <div className={styles.fileTypeIcon}
                  aria-label={ariaLabel}
                  title={ariaLabel}>
                  <img className={styles.fileTypeIconIcon} src={strings.ODPhotoIconUrl} style={{ width: 16, height: 16 }} />
                </div>
              </span>
            </span>
          </span>
          <span className={styles.namePlate}>
            <span className={styles.name}>
              <span className={css(styles.signalField, styles.compact)}>
                <span className={styles.signalFieldValue}>{item.name}</span>
              </span>
            </span>
            <span className={styles.activity} id={`Tile-activity${index}`}>
              <span className={css(styles.signalField, styles.compact)}>
                <span className={styles.signalFieldValue}>{item.modified}</span>
              </span>
            </span>
          </span>
        </div>
        <span role="checkbox" className={styles.check} data-selection-toggle={true} aria-checked={isSelected}>
          <Check checked={isSelected} />
        </span>
      </div>
    );
  }
}
