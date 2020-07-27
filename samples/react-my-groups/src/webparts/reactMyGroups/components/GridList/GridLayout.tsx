import * as React from 'react';
import styles from './GridLayout.module.scss';

// Used to render list grid
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { IRectangle, ISize } from 'office-ui-fabric-react/lib/Utilities';
import { Spinner } from 'office-ui-fabric-react';

import { IGridLayoutProps, IGridLayoutState } from './GridLayout.types';

const ROWS_PER_PAGE: number = +styles.rowsPerPage;
const MAX_ROW_HEIGHT: number = +styles.maxWidth;
const PADDING: number = +styles.padding;
const MIN_WIDTH: number = +styles.minWidth;
const COMPACT_THRESHOLD: number = +styles.compactThreshold;


export class GridLayout extends React.Component<IGridLayoutProps, IGridLayoutState> {
  constructor(props: IGridLayoutProps) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;
  private _isCompact: boolean;

  public render(): React.ReactElement<IGridLayoutProps> {
    return (
      <div role="group" aria-label={this.props.ariaLabel}>
         <FocusZone>
          <List
            role="presentation"
            className={styles.gridLayout}
            items={this.props.items}
            getItemCountForPage={this._getItemCountForPage}
            getPageHeight={this._getPageHeight}
            onRenderCell={this._onRenderCell}
            {...this.props.listProps}
          />
        </FocusZone>
      </div>
    );
  }

  public componentDidMount = (): void => {
  }

  private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      this._isCompact = surfaceRect.width < COMPACT_THRESHOLD;
      if (this._isCompact) {
        this._columnCount = 1;
        this._columnWidth = surfaceRect.width;
      } else {
        this._columnCount = Math.ceil(surfaceRect.width / (MAX_ROW_HEIGHT));
        this._columnWidth = Math.max(MIN_WIDTH, Math.floor(surfaceRect.width / this._columnCount) + Math.floor(PADDING / this._columnCount));
        this._rowHeight = this._columnWidth;
      }
    }

    return this._columnCount * ROWS_PER_PAGE;
  }

  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  }

  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
    console.log(item.displayName);    
    const isCompact: boolean = this._isCompact;
    const cellPadding: number = index % this._columnCount !== this._columnCount - 1 && !isCompact ? PADDING : 0;
    const finalSize: ISize = { width: this._columnWidth, height: this._rowHeight };
    const cellWidth: number = isCompact ? this._columnWidth + PADDING : this._columnWidth - PADDING;
    return (
      <div
        style={{
          width: `${cellWidth}px`,
          marginRight: `${cellPadding}px`
        }}
      >
          {this.props.onRenderGridItem(item, finalSize, isCompact)}
      </div>
    );
  }
}
