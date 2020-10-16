import * as React from 'react';
import styles from './Tile.module.scss';
import { ITileProps } from './ITileProps';
import { FieldType } from '../../../../enums/FieldType';
import { Icon } from 'office-ui-fabric-react';

export default class Tile extends React.Component<ITileProps, {}> {
  public render(): React.ReactElement<{}> {

    let fieldTypeStyling = '';
    switch(this.props.tileInfo.fieldType){
      case FieldType.Empty:
        fieldTypeStyling = styles.numberTile;
        break;
      case FieldType.Number:
        fieldTypeStyling = `${styles.numberTile} ${styles[`nr${this.props.tileInfo.closeMines}`]}`;
        break;
      case FieldType.Mine:
        fieldTypeStyling = styles.mineTile;
        break;
      case FieldType.MineExploded:
        fieldTypeStyling = `${styles.mineTile} ${styles.exploded}`;
        break;
      case FieldType.Flag:
        fieldTypeStyling = styles.flagTile;
        break;
      case FieldType.FlagMistake:
        fieldTypeStyling = `${styles.flagTile} ${styles.mistake}`;
    }

    return (
      <div
        className={ styles.basicTile + ' ' + fieldTypeStyling }
        onClick={() => this.props.onClick(this.props.tileInfo.coords)}
        onContextMenu={(e: React.MouseEvent) => this.props.onContextMenu(this.props.tileInfo.coords, e)}
      >
        {this.props.tileInfo.closeMines}{this.renderIcon()}
      </div>
    );
  }

  private renderIcon(){
    let el = null;
    switch(this.props.tileInfo.fieldType){
      case FieldType.Flag:
      case FieldType.FlagMistake:
        el = <Icon iconName={'IconSetsFlag'}/>;
        break;
      case FieldType.Mine:
      case FieldType.MineExploded:
        el = <Icon iconName={'StarBurstSolid'}/>;
    }

    return el;
  }
}
