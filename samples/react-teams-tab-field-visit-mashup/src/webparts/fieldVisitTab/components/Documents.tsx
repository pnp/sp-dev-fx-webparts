import * as React from 'react';
import styles from './FieldVisits.module.scss';

import { IDocumentService } from '../services/DocumentService/IDocumentService';
import { IDocument } from '../model/IDocument';

export interface IDocumentProps {
    service: IDocumentService;
    customerId: string;
}

export interface IDocumentState {
    documents: IDocument[] | null;
    currentCustomerId: string | null;
}

export class Documents extends React.Component<IDocumentProps, IDocumentState> {

    constructor(props: IDocumentProps) {
        super(props);
        this.state = {
            documents: null,
            currentCustomerId: null
        };
    }

    public render(): React.ReactElement<IDocumentProps> {

        if (this.props.customerId) {

            if (this.state.currentCustomerId == this.props.customerId) {

                if (this.state.documents && this.state.documents.length > 0) {
                    return (
                        <div className={styles.documents}>
        
                            <div className={styles.documentsHeadingRow}>
                                <div className={styles.documentsNameColumn}>
                                    Document
                                </div>
                                <div className={styles.documentsAuthorColumn}>
                                    Author
                                </div>
                                <div className={styles.documentsDateColumn}>
                                    Modified date
                                </div>
                            </div>
        
                            {this.state.documents.map(doc => (
                            <div className={styles.documentsRow}>
                                <div className={styles.documentsNameColumn}>
                                    <a href={`${doc.url}?web=1`} target='blank'>{doc.name}</a>
                                </div>
                                <div className={styles.documentsAuthorColumn}>
                                    {doc.author}
                                </div>
                                <div className={styles.documentsDateColumn}>
                                    {doc.date.toDateString()}&nbsp;
                                    {doc.date.getHours() % 12}:
                                    {doc.date.getMinutes()<10 ? "0" : ""}
                                    {doc.date.getMinutes()}&nbsp;
                                    {doc.date.getHours() < 12 ? 'am' : 'pm'}
                                </div>
                            </div>
        
                            ))}
                        </div>);
        
                } else {
                    return (<div>No documents found</div>);
                }
                
            } else {
                this.props.service.getDocuments(this.props.customerId)
                    .then((docs: IDocument[]) => {
                        this.setState({
                            documents: docs,
                            currentCustomerId: this.props.customerId
                        });
                    });

                return (<div>Loading</div>);
            }
        } else {
            return (
                <div></div>
            );
        }
    }
}