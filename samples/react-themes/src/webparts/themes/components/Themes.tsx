import * as React from 'react';
import styles from './Themes.module.scss';
import { IThemesProps } from './IThemesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react';

interface Window {
  __themeState__: any;
}

declare var window: Window;

export default class Themes extends React.Component<IThemesProps> {

  public render(): React.ReactElement<IThemesProps> {
    let _columns = [
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: 'column2',
        name: 'Value',
        fieldName: 'value',
        minWidth: 100,
        maxWidth: 400,
        isResizable: true
      },
    ];

    const items = this.getThemeVariablesItems();

    return (
      <div className={styles.main}>
        <p>{'This web part shows usage of SharePoint Themes.'}</p>
        <p>{'Background color of paragraphs is set to "primaryBackgroud", variables list background color is set to "themePrimary", font color is set to "primaryText"'}</p>
        <p>{'Full list of available theme variables is available in windows.__themeState__.theme property and listed below'}</p>
        <p>{'You can use theme variables in your .scss files like $yourVariable:"[theme:primaryBackground, default:#0273eb]"'}</p>
        <p>{'Change the theme (Site Settings -> Change the look) and see what\'s happenning'}</p>
        <DetailsList
          className={styles.themePrimary}
          items={items}
          columns={_columns}
          layoutMode={DetailsListLayoutMode.justified}
          viewport={{
            width: 750,
            height: 500
          }}
        />
      </div>
    );
  }

  private getThemeVariablesItems(): Array<any> {
    const variables: any = window.__themeState__.theme;
    const items = [];

    for (let varName in variables) {
      if (!variables.hasOwnProperty(varName))
        continue;

      items.push({
        key: varName,
        name: varName,
        value: variables[varName]
      });
    }

    return items;
  }
}
