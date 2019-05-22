import * as React from 'react';
import { IFakeItem } from '../../../stores/AppStore';


export type DetailedFakeItemViewerProps = {
    items: IFakeItem[];
};

export class DetailedFakeItemViewer extends React.Component<DetailedFakeItemViewerProps, {}> {
    public state = {
        items: []
    };

    public render(): React.ReactElement<DetailedFakeItemViewerProps> {
        const { items } = this.props;
        return (
            <div>
                <ul>{items.map(x => <li>{x.title} {x.important ? '!IMPORTANT' : null}</li>)}</ul>
            </div>
        );
    }
}
