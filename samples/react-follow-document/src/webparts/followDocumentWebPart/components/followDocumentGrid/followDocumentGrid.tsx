import * as React from 'react';
import styles from './followDocumentGrid.module.scss';

// Used to render list grid
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { IRectangle, ISize } from 'office-ui-fabric-react/lib/Utilities';

import { IfollowDocumentGridProps, IfollowDocumentGridState } from './followDocumentGrid.types';

const ROWS_PER_PAGE: number = +styles.rowsPerPage;

export class FollowDocumentGrid extends React.Component<IfollowDocumentGridProps, IfollowDocumentGridState> {
  private _columnWidth: number;
  private _rowHeight: number;
  private _isCompact: boolean;

  public render(): React.ReactElement<IfollowDocumentGridProps> {
    return (
      <div role="group" aria-label={this.props.ariaLabel}>
      <FocusZone>
        <List
          role="presentation"
          className={styles.followDocumentGrid}
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

  private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
   
    return ROWS_PER_PAGE;
  }

  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  }

  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
    const isCompact: boolean = this._isCompact;
    const finalSize: ISize = { width: this._columnWidth, height: this._rowHeight };
    return (
      <div
        style={{
          width: "200px",
          marginRight: "20px"
        }}
      >
          {this.props.onRenderGridItem(item, finalSize, isCompact)}
      </div>
    );
  }
}