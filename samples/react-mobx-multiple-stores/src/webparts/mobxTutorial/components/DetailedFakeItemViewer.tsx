import { toJS } from 'mobx';
import { DetailsList, DetailsListLayoutMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import { IFakeItem } from '../../../stores/AppStore';

type DetailedFakeItemViewerProps = {
    items: IFakeItem[];
};

export class DetailedFakeItemViewer extends React.Component<DetailedFakeItemViewerProps, {}> {
    private _columns: IColumn[];
    public state = {
        items: []
    };

    constructor(props: DetailedFakeItemViewerProps) {
        super(props);

        this._columns = [
            { key: 'Title', name: 'Title', fieldName: 'title', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'Important', name: 'Important', fieldName: 'important', minWidth: 100, maxWidth: 150, isResizable: true, onRender: (item: IFakeItem) => { return item.important ? "Yes" : "No"; } }
        ];
    }

    public render(): React.ReactElement<DetailedFakeItemViewerProps> {
        const { items } = this.props;
        return (
            <div>
                <DetailsList
                    compact={true}
                    items={toJS<IFakeItem[]>(items)}
                    columns={this._columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    selectionPreservedOnEmptyClick={true}
                />
            </div>
        );
    }
}
