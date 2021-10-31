import * as React from 'react';
import styles from './Tile.module.scss';
import { ITileProps } from '.';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { tilesDataLabel } from 'TilesWebPartStrings';

export class Tile extends React.Component<ITileProps, {}> {
  public render(): React.ReactElement<ITileProps> {
    //const { semanticColors }: IReadonlyTheme = this.props.themeVariant;
    const { palette }: IReadonlyTheme = this.props.themeVariant;
    const tileStyle: React.CSSProperties = {};
    const icoStyle: React.CSSProperties = {};
    const tileFontSize: React.CSSProperties = {};
    const tileInnerStyle: React.CSSProperties = {};
    const fontInnerStyle: React.CSSProperties = {};

    if (this.props.staticWidth) {
      tileStyle.flexBasis = `${this.props.tileWidth}px`;
      tileStyle.minWidth = `${this.props.tileWidth}px`;
      tileStyle.flexGrow = 0;
    } else {
      tileStyle.flexBasis = '120px';
      tileStyle.minWidth = '120px';
      tileStyle.flexGrow = 1;
    }
    if (this.props.tileHeight) {
      tileStyle.height = `${this.props.tileHeight}px`;
      icoStyle.fontSize = `${Math.round(this.props.tileHeight / 2 - 18)}px`;
      tileFontSize.fontSize = `${Math.round(this.props.tileHeight / 6 - 6)}px`;
    }
    if (this.props.colourMode === '1' || this.props.colourMode === undefined) {
      tileInnerStyle.backgroundColor = palette.themePrimary;
      fontInnerStyle.color = palette.white;
    } else if (this.props.colourMode === '2') {
      if (this.props.tileColour) {
        tileInnerStyle.backgroundColor = `${this.props.tileColour}`;
        fontInnerStyle.color = `${this.props.tileFont}`;
      }
    } else {
      tileInnerStyle.backgroundColor = `${this.props.item.background}`;
      fontInnerStyle.color = `${this.props.item.foreground}`;
    }
    return (
      <div className={styles.tile} style={tileStyle}>
        <a href={this.props.item.url}
          target={this.props.item.target}
          title={this.props.item.title} style={tileInnerStyle}>
          <div className={styles.tileIcon}>
            <Icon iconName={this.props.item.icon} style={{ ...fontInnerStyle, ...icoStyle }} />
          </div>
          <div className={styles.tileTitle} style={{ ...fontInnerStyle, ...tileFontSize }}>
            {this.props.item.title}
          </div>
          <div className={styles.overflow}>
            {this.props.item.description}
          </div>
        </a>
      </div>
    );
  }
}
