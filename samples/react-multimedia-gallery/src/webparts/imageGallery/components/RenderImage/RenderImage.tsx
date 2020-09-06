import * as React from 'react';
import { IImageProps } from './IRenderImageProps';
import { IImageState } from './IRenderImageState';

import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Label,
  Icon,
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  ImageFit,
  Image

} from 'office-ui-fabric-react';
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import 'video-react/dist/video-react.css'; // import css
import { Player, BigPlayButton } from 'video-react';

export default class RenderImage extends React.Component<IImageProps, IImageState> {

  constructor(props: IImageProps) {
    super(props);
    this.state = { onHover: false };

  }

  public render(): React.ReactElement<IImageProps> {
    return (
      <div

      >
        <div
          onMouseOver={(ev) => {
            ev.preventDefault();
            this.setState({ onHover: !this.state.onHover });
          }}
          onMouseOut={(ev) => {
            ev.preventDefault();
            this.setState({ onHover: !this.state.onHover });
          }}
        >
          <Image imageFit={ImageFit.centerCover} src={this.props.image.thumbnail}
            width={230}
            height={180}
          />
          {
            this.props.image.mediaType == 'video' && (
              <Icon iconName='MSNVideosSolid'
                style={{ pointerEvents: "none", display: 'block'   , fontSize: FontSizes.size42, textAlign: 'center', width: '50px', height: '50px', position: 'absolute', top: '40%', left: '40%' }}
              />
            )
          }

        </div>
        {
          this.state.onHover &&
          <div>
            <Label
              style={{ pointerEvents: "none", display: 'block', zIndex: 1000, fontSize: FontSizes.size18, bottom: 0, textAlign: 'center', width: '100%', position: 'absolute', background: 'rgba(0, 0, 0, 0.5)', color: '#f1f1f1', padding: '10px' }}
            >
              {this.props.image.caption}
            </Label>
          </div>
        }
      </div>
    );
  }


}
