import * as React from "react";
import ITilesListViewProps from "./ITilesListViewProps";
import { List } from 'office-ui-fabric-react/lib/List';
import Tile from "./Tile";
import { IRectangle } from "office-ui-fabric-react/lib/Utilities";
import "../SearchWebPart.scss";

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 300;

export default class TilesList extends React.Component<ITilesListViewProps, null> {

    private _positions: any;
    private _columnCount: number;
    private _columnWidth: number;
    private _rowHeight: number;

    constructor() {
        super();

        this._positions = {};
        this._getItemCountForPage = this._getItemCountForPage.bind(this);
        this._getPageHeight = this._getPageHeight.bind(this);
    }

    public render() {

        const items = this.props.items;

        return (
            <List
                items={items}
                getItemCountForPage={this._getItemCountForPage}
                getPageHeight={this._getPageHeight}
                renderedWindowsAhead={4}
                className="searchWp__list"
                onRenderCell={(item, index) => (
                    <div className="searchWp__tile"
                        style={{
                            width: (100 / this._columnCount) + '%',
                        }}>
                        <Tile key={index} item={item} showFileIcon={this.props.showFileIcon} showCreatedDate={this.props.showCreatedDate} />
                    </div>
                )} />
        );
    }

    private _getItemCountForPage(itemIndex: number, surfaceRect: IRectangle) {
        if (itemIndex === 0) {
            this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
            this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
            this._rowHeight = this._columnWidth;
        }

        return this._columnCount * ROWS_PER_PAGE;
    }

    private _getPageHeight(itemIndex: number, surfaceRect: IRectangle) {
        return this._rowHeight * ROWS_PER_PAGE;
    }
}