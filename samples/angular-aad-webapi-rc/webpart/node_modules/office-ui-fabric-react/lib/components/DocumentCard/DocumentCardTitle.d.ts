import { IDocumentCardTitleProps } from './DocumentCard.Props';
import { BaseComponent } from '../../common/BaseComponent';
import './DocumentCardTitle.scss';
export interface IDocumentCardTitleState {
    truncatedTitleFirstPiece?: string;
    truncatedTitleSecondPiece?: string;
}
export declare class DocumentCardTitle extends BaseComponent<IDocumentCardTitleProps, IDocumentCardTitleState> {
    private _titleElement;
    private _scrollTimerId;
    private _truncatedTitleAtWidth;
    private _isTruncated;
    constructor(props: IDocumentCardTitleProps);
    componentDidMount(): void;
    componentWillReceiveProps(newProps: IDocumentCardTitleProps): void;
    componentDidUpdate(): void;
    render(): any;
    private _startTruncation(props);
    private _shrinkTitle();
    private _doesTitleOverflow();
    private _updateTruncation();
}
