import * as React from 'react';
import styles from './SectionTheme.module.scss';
import { ISectionThemeProps } from './ISectionThemeProps';
<<<<<<< HEAD
import { ISemanticColors } from '@microsoft/sp-component-base';

export default class SectionTheme extends React.Component<ISectionThemeProps, {}> {

  // Build array of semantic colors values to display in webparts.
=======
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export default class SectionTheme extends React.Component<ISectionThemeProps, {}> {
  //private _styles: object[];
>>>>>>> new react-SectionTheme webpart
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
<<<<<<< HEAD
    const semanticColors : ISemanticColors = this.props.themeVariant.semanticColors;
    return (
=======
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;
    return (
      // <div className={styles.sectionTheme} style={{ backgroundColor: semanticColors.bodyBackground, color: semanticColors.bodyText }} data-load-themed-styles="true" >
>>>>>>> new react-SectionTheme webpart
      <div className={styles.sectionTheme} data-load-themed-styles="true" >
        <div className={styles.container} >
          <div className={styles.row}>
            <div className={styles.column}>
<<<<<<< HEAD
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
=======
              <p className={styles.title}>Custom styling based on section</p>
              <span className={styles.subTitle}>Current theme variant (section values)</span>
              <ul>
                {this.getSemanticValues(this.props.themeVariant.semanticColors).map(element => {
                  return <li style={{ lineHeight: "2em" }}>{element.key}: {element.value} <span style={{ minWidth: "50px", border: "1px solid white", background: element.value, color: element.value }}>______</span></li>
                })
                }
              </ul>
>>>>>>> new react-SectionTheme webpart
            </div>
          </div>
        </div>
      </div>
    );
  }
<<<<<<< HEAD

=======
>>>>>>> new react-SectionTheme webpart
}
