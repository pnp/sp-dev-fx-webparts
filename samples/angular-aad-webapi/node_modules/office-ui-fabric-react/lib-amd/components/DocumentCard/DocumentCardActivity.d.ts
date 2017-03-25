import * as React from 'react';
import { IDocumentCardActivityProps } from './DocumentCard.Props';
import './DocumentCardActivity.scss';
export declare class DocumentCardActivity extends React.Component<IDocumentCardActivityProps, any> {
    render(): JSX.Element;
    private _renderAvatars(people);
    private _renderAvatar(person);
    private _getNameString(people);
}
