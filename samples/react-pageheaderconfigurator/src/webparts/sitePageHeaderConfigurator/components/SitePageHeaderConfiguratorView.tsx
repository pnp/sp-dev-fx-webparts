import * as React from 'react';
import { ISitePageHeaderConfiguratorProps } from './ISitePageHeaderConfiguratorProps';
import { HeaderSize } from '../HeaderSize';

export default class SitePageHeaderConfiguratorView extends React.Component<ISitePageHeaderConfiguratorProps, void> {
  public render(): React.ReactElement<ISitePageHeaderConfiguratorProps> {
    let gfxOverrideStyle: string = "";
    let headerHeight: number;
    if (this.props.headerSize == HeaderSize.Medium) {
      headerHeight = 114;
    } else if (this.props.headerSize == HeaderSize.Small) {
      headerHeight = 70;
    } else if (this.props.headerSize == HeaderSize.None) {
      headerHeight = 0;
    }

    let headerStyle: string = `
      .pageHeader .headerTitleText {
        color: ${this.props.headerFontColor} !important
      }
      `;
    if (this.props.headerSize != HeaderSize.Large) {
      headerStyle += `
      .pageHeader {
        height: ${headerHeight}px !important;
      }
      `;
    }

    if (this.props.headerSize != HeaderSize.None
      && this.props.headerGfx != null
      && this.props.headerGfx.indexOf('https://') >= 0) {
      gfxOverrideStyle = `
      .pageHeader {
        background-image: url(${this.props.headerGfx}) !important
      }
      .pageHeader:not(.pageHeaderEdit):before {
        background-image: url(${this.props.headerGfx})
      }
`;
    }

    return (
      <style dangerouslySetInnerHTML={{
        __html: headerStyle + gfxOverrideStyle
      }}>{
        }
      </style>
    );
  }
}
