import * as React from 'react';
import styles from './SectionTheme.module.scss';
import { ISectionThemeProps } from './ISectionThemeProps';
import { ISemanticColors } from '@microsoft/sp-component-base';

export default class SectionTheme extends React.Component<ISectionThemeProps, {}> {
  //private _styles: object[];
  private getSemanticValues(theming: any): { key: string, value: string }[] {
    if (!theming) { return null; }
    let _styles: { key: string, value: string }[] = [];
    let themingKeys = Object.keys(theming);
    if (themingKeys !== null) {
      themingKeys.forEach((item) => {
        _styles.push({ key: item, value: theming[item] });
      });
    }
    return _styles.sort((a, b) => a.key.localeCompare(b.key));
  }

  public render(): React.ReactElement<ISectionThemeProps> {
    const semanticColors : ISemanticColors = this.props.themeVariant.semanticColors;
    return (
      <div className={styles.sectionTheme} data-load-themed-styles="true" >
        <div className={styles.container} >
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.title}>Change site theme and section background color</p>
              <p className={styles.subTitle}>Current theme variant (section values)</p>
              <div className={styles.details}>
                {
                  this.getSemanticValues(semanticColors).map((item) => (
                    <div style={{ lineHeight: "2em" }}>
                      <div className={styles.itemKey} >{item.key}:</div>
                      <div className={styles.itemValue}>
                        <span className={styles.colorBlock} style={{ background: item.value }}>______</span>
                        {item.value}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
