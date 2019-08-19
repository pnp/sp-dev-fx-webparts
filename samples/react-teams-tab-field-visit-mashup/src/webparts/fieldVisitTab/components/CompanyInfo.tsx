import * as React from 'react';
import styles from './FieldVisits.module.scss';

import { IVisit } from '../model/IVisit';

export interface ICompanyInfoProps {
  visit?: IVisit;
}

export class CompanyInfo extends React.Component<ICompanyInfoProps, {}> {

  public render(): React.ReactElement<ICompanyInfoProps> {

    if (this.props.visit) {
        return (
            <div className={styles.documents}>
                <div className={styles.documentsHeadingRow}>{ this.props.visit.customer.CompanyName }</div>
                <div className={styles.documentsRow}>
                    <div>{ this.props.visit.customer.Address }</div>
                    <div>{ this.props.visit.customer.City },&nbsp; 
                        { this.props.visit.customer.Region }&nbsp;
                        { this.props.visit.customer.PostalCode }</div>
                    <div>{ this.props.visit.customer.Phone }</div>
                    <div>{ this.props.visit.customer.ContactName },&nbsp;
                        { this.props.visit.customer.ContactTitle }</div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }

  }
}