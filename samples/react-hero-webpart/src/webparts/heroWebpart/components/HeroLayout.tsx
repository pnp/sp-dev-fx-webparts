import * as React from "react";
import { IHeroLayoutProps } from "./IHeroLayoutProps";
import styles from './HeroWebpart.module.scss';

// Used to render list grid
import { List } from 'office-ui-fabric-react/lib/List';
import { IRectangle, ISize } from 'office-ui-fabric-react/lib/Utilities';


export default class Hero extends React.Component<IHeroLayoutProps> {
    

    public render(): React.ReactElement<IHeroLayoutProps> {
      const items = this.props.items; 
      var arr = [];
      arr.push(items);

      return (
        <div role="group">
          <List
            role="presentation"
            className={styles.heroItem}
            items={arr}
            getItemCountForPage={this._getItemCountForPage}
            onRenderCell={this._onRenderHeroItem}
            {...this.props.listProps}
          />
        </div>
      );
    }

    private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
      return 1;
    }
    
    private _onRenderHeroItem =  (items: any, index: number | undefined): JSX.Element => {
      const thumbRend = "https://media.akamai.odsp.cdn.office.net/uksouth1-mediap.svc.ms/transform/thumbnail?provider=url&inputFormat=jpg&docid=";
      const secondItems = items.slice(1,5);
      const firstItem = items.slice(0,1)[0];
      var firstItemUrl = firstItem.filePicker[0].Hyperlink ? firstItem.filePicker[0].Hyperlink : "#";
      var smalltemUrl;
      return(
        <div className={styles.heroItem}>
          <div className={styles["flexcontainer"]}>
            <div className={styles.focusItem}>
               <div className={styles["flexitems"]}>                    
                  <a href={firstItemUrl}>
                  <img src={firstItem.filePicker[0].fileNameWithoutExtension=='blankEntry154873'?firstItem.filePicker[0].fileAbsoluteUrl:thumbRend+firstItem.filePicker[0].fileAbsoluteUrl+"&w=960"}/>
                  <div className={styles.description}><div className={styles.heroTitle}>{firstItem.Title}</div>{firstItem.Description ? firstItem.Description.length>150 ? firstItem.Description.substring(0, 150)+".." : firstItem.Description : "Description coming soon"}</div>
                  </a>
              </div>
            </div>
          </div>
          <div className={styles["flexcontainer"]}>
                {secondItems.map((item) => (
                  smalltemUrl= item.filePicker[0].Hyperlink ? item.filePicker[0].Hyperlink : "#",
                  <div className={styles["flexitems"]}>
                        <a href={smalltemUrl}>
                        <img src={item.filePicker[0].fileNameWithoutExtension=='blankEntry154873'?item.filePicker[0].fileAbsoluteUrl:thumbRend+item.filePicker[0].fileAbsoluteUrl+"&w=960"}/>
                        <div className={styles.description}><div className={styles.heroTitle}>{item.Title}</div>{item.Description ? item.Description.length>150 ? item.Description.substring(0, 150)+".." : item.Description : "Description coming soon"}</div>
                        </a>
                  </div>
                ))}
          </div>
        </div>
      );
    }
}