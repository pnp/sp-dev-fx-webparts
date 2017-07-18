import * as React from 'react';
import styles from './TaxonomyPickerSample.module.scss';
import { ITaxonomyPickerSampleProps } from './ITaxonomyPickerSampleProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class TaxonomyPickerSample extends React.Component<ITaxonomyPickerSampleProps, void> {

  public render(): React.ReactElement<ITaxonomyPickerSampleProps> {
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to Taxonomy Picker demo webpart!</span>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
              <p className="ms-font-l ms-fontColor-white">
                <strong>Selected Languages: {this.props.pickerValue || 'none selected'}</strong>
              </p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
