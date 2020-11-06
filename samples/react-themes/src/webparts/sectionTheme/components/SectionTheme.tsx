import * as React from 'react';
import styles from './SectionTheme.module.scss';
import { ISectionThemeProps } from './ISectionThemeProps';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

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
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;
    return (
      // <div className={styles.sectionTheme} style={{ backgroundColor: semanticColors.bodyBackground, color: semanticColors.bodyText }} data-load-themed-styles="true" >
      <div className={styles.sectionTheme} data-load-themed-styles="true" >
        <div className={styles.container} >
          <div className={styles.row}>
            <div className={styles.column}>
              <p className={styles.title}>Custom styling based on section</p>
              <span className={styles.subTitle}>Current theme variant (section values)</span>
              <ul>
                {this.getSemanticValues(this.props.themeVariant.semanticColors).map(element => {
                  return <li style={{ lineHeight: "2em" }}>{element.key}: {element.value} <span style={{ minWidth: "50px", border: "1px solid white", background: element.value, color: element.value }}>______</span></li>
                })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
