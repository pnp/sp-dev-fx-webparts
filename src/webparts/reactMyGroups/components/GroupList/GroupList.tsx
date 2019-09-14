import * as React from 'react';
import { IGroupListProps } from './IGroupListProps';
import { List, FocusZone, FocusZoneDirection } from 'office-ui-fabric-react';
import { IRectangle } from 'office-ui-fabric-react/lib/Utilities';
import styles from './GroupList.module.scss';

const ROWS_PER_PAGE: number = +styles.rowsPerPage;
const MAX_ROW_HEIGHT: number = +styles.maxWidth;
const PADDING: number = +styles.padding;
const MIN_WIDTH: number = +styles.minWidth;

export class GroupList extends React.Component<IGroupListProps, {}> {

  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;

  public render(): React.ReactElement<IGroupListProps> {


    return (
      <div role="group">
        <FocusZone
          direction={FocusZoneDirection.horizontal}
          isCircularNavigation={false}
        >
          <List
            className={styles.compactLayout}
            items={this.props.groups}
            getItemCountForPage={this._getItemCountForPage}
            getPageHeight={this._getPageHeight}
            onRenderCell={this._onRenderCell}
          />
        </FocusZone>
      </div>
      // <div>
      //   <ul>
      //     {this.props.groups.map(group => (
      //       <li><a href={group.url}>{group.displayName}</a></li>
      //     ))}
      //   </ul>
      // </div>
    );
  }

  private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / (MAX_ROW_HEIGHT));
      this._columnWidth = Math.max(MIN_WIDTH, Math.floor(surfaceRect.width / this._columnCount) + Math.floor(PADDING / this._columnCount));
      this._rowHeight = this._columnWidth;
    }

    return this._columnCount * ROWS_PER_PAGE;
  }

  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  }

  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
    const cellPadding: number = index % this._columnCount !== this._columnCount - 1 &&  PADDING;
    const cellWidth: number = this._columnWidth - PADDING;
    return (
      <div
        style={{
          width: `${cellWidth}px`,
          marginRight: `${cellPadding}px`
        }}
      >
        {this.props.onRenderItem(item, index)}
      </div>
    );
  }

}
