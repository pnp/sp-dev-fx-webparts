import * as React from 'react';
import styles from './SitePageHeaderConfigurator.module.scss';
import { ISitePageHeaderConfiguratorProps } from './ISitePageHeaderConfiguratorProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { HeaderSize } from '../HeaderSize';
import SitePageHeaderConfiguratorView from './SitePageHeaderConfiguratorView';

export default class SitePageHeaderConfiguratorEdit extends React.Component<ISitePageHeaderConfiguratorProps, void> {
  public render(): React.ReactElement<ISitePageHeaderConfiguratorProps> {
    let gfxSetting = <span />;

    if (this.props.headerFontColor == null || this.props.headerFontColor == '') {
      this.props.headerFontColor = "#333333";
    }

    const viewElement: React.ReactElement<ISitePageHeaderConfiguratorProps> = React.createElement(
      SitePageHeaderConfiguratorView,
      {
        headerSize: this.props.headerSize,
        headerGfx: this.props.headerGfx,
        headerFontColor: this.props.headerFontColor
      }
    );

    const headlineColorStyle = {
      backgroundColor: this.props.headerFontColor,
      height: '15px',
      width: '15px',
      display: 'inline-block',
      margin: '0px 10px',
      position: 'absolute',
      border: 'solid 1px white'
    };

    if (this.props.headerGfx != null && this.props.headerGfx.indexOf('https://') >= 0) {
      gfxSetting = <p className="ms-fontColor-white">
        <div className="ms-font-l ms-fontWeight-semibold">Header background graphics</div>
        <div className="ms-font-mPlus">{escape(this.props.headerGfx)}</div>
      </p>;
    }

    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Page header settings</span>
              <p className="ms-fontColor-white">
                <div className="ms-font-l ms-fontWeight-semibold">Header size</div>
                <div className="ms-font-mPlus">{HeaderSize[this.props.headerSize]}</div>
              </p>
              <p className="ms-fontColor-white">
                <div className="ms-font-l ms-fontWeight-semibold">Headline color</div>
                <div className="ms-font-mPlus">{this.props.headerFontColor}
                  <div style={headlineColorStyle}></div>
                </div>
              </p>
              {gfxSetting}
            </div>
          </div>
        </div>
        {viewElement}
      </div>
    );
  }
}
