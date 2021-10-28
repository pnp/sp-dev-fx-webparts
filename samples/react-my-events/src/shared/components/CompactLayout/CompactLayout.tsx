import * as React from 'react';
import styles from './CompactLayout.module.scss';
import { FocusZone, FocusZoneDirection, List, css } from "office-ui-fabric-react";
import { ICompactLayoutProps, ICompactLayoutState } from './CompactLayout.types';
import { IRectangle } from 'office-ui-fabric-react/lib/Utilities';

const ROWS_PER_PAGE: number = +styles.rowsPerPage;
const MAX_ROW_HEIGHT: number = +styles.maxWidth;
const PADDING: number = +styles.padding;
const MIN_WIDTH: number = +styles.minWidth;


export default class CompactLayout extends React.Component<ICompactLayoutProps, ICompactLayoutState> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;

  constructor(props: ICompactLayoutProps) {
    super(props);

    this.state = {
      events: [],
      currentPage: 1
    };
  }

  public render(): React.ReactElement<ICompactLayoutProps> {

    const { items, listProps, ariaLabel } = this.props;

    let pagedItems: any[] = items;

    return (
      <div role="group" aria-label={ariaLabel}>
        <FocusZone
          direction={FocusZoneDirection.vertical}
          isCircularNavigation={false}
          aria-label={ariaLabel}
        >
          <List
            className={styles.compactLayout}
            items={pagedItems}
            getItemCountForPage={this._getItemCountForPage}
            getPageHeight={this._getPageHeight}
            onRenderCell={this._onRenderCell}
            {...listProps}

          />
        </FocusZone>
      </div>
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
    const cellPadding: number = index % this._columnCount !== this._columnCount - 1 && PADDING;
    const cellWidth: number = this._columnWidth - PADDING;
    return (
      <div
        style={{
          width: `${cellWidth}px`,
          marginRight: `${cellPadding}px`
        }}
      >
        {this.props.onRenderGridItem(item, index)}
      </div>
    );
  }
}

