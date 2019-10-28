import * as React from 'react';
import styles from './ReactTeamsTabsPnpjs.module.scss';
import { IReactTeamsTabsPnpjsProps } from './IReactTeamsTabsPnpjsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, IPivotProps, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';


export interface IReactTeamsTabsPnpjsState {
  pivotArray: any[];
}
export default class ReactTeamsTabsPnpjs extends React.Component<IReactTeamsTabsPnpjsProps, IReactTeamsTabsPnpjsState> {

  constructor(props: IReactTeamsTabsPnpjsProps) {
    super(props);
    this.state = {
      pivotArray: []
    };


    // sp.web.lists.getByTitle("Site Pages").items.filter("Is_x0020_Model eq 1").select("Title,FileRef").getAll().then((items: any[]) => {
    //   var tmpItems: any[] = new Array();
    //
    //   //DropDown initialization
    //   items.forEach(element => {
    //     var item = { key: element["FileRef"], text: element["Title"] };
    //     tmpItems.push(item);
    //   });
    //
    //   this.setState({ allItems: tmpItems });
    // });

    this._onRenderTabItem = this._onRenderTabItem.bind(this);

  }

  public render() {
    return (
      <div className={styles.reactTeamsTabsPnpjs}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div>
                <Pivot linkSize={PivotLinkSize.large} linkFormat={PivotLinkFormat.tabs}>{this.state.pivotArray}</Pivot>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  public componentDidMount() {
    var activeTasks: any[] = [];
    var tmPpivotArray: any[] = [];


    activeTasks.push({ name: 'a name', description: 'a desc' });
    activeTasks.push({ name: 'b name', description: 'b desc' });
    activeTasks.push({ name: 'c name', description: 'c desc' });

    tmPpivotArray.push(this._renderPivotItemList(activeTasks, "test1"));
    tmPpivotArray.push(this._renderPivotItemList(activeTasks, "test2"));
    tmPpivotArray.push(this._renderPivotItemList(activeTasks, "test3"));


    this.setState({ pivotArray: tmPpivotArray });
  }

  private _renderPivotItemList(channels: any[], tabName: string){
    return (
      <PivotItem headerText={`${tabName} (${channels.length})`}>
        <FocusZone direction={FocusZoneDirection.vertical} >
          <List items={channels} onRenderCell={this._onRenderTabItem} />
        </FocusZone>
      </PivotItem>
    );
  }

  private _onRenderTabItem(item: any, index: number | undefined) {
    return (
      <div className={styles.itemCell} data-is-focusable={true}>
        <div className={styles.itemContent}>
          <div className={styles.itemName}>{item.name}</div>
          <Link className={styles.tablink} href="http://dev.office.com/fabric/components/link" target="_blank">it renders as an anchor tag.</Link>
          <div className={styles.subTitle}>{item.description}</div>
        </div>
      </div>
    );
  }
}
