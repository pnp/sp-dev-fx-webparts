import * as React from 'react';
import styles from './RealTimeList.module.scss';
import { IRealTimeListProps } from './IRealTimeListProps';
import { IRealTimeListState } from './IRealTimeListState';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js";
import * as io from 'socket.io-client';
import { createListItems } from '@uifabric/example-app-base';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import {
  DetailsList,
  buildColumns,
  IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';

let _items: any[];

export interface IDetailsListCustomColumnsExampleState {
  sortedItems?: any[];
  columns?: IColumn[];
}

export interface IList {
  Id: number;
  Title: string;
  Description: string;
}

export default class RealTimeList extends React.Component<IRealTimeListProps, IRealTimeListState> {
  public componentDidMount(): void {
    //let web = new Web(this.context.pageContext.web.absoluteUrl);
    // Connect to the server
    const socket = io("https://webhooksbroadcaster.azurewebsites.net");
    // Add the socket io listeners
    socket.on('list:changes', (data) => {
      //this._onItemAdded(data.customProperties.id);
      console.log(JSON.stringify(data));
      alert("Webhooks received: " + JSON.stringify(data));
    });
    this._loadList();
  }

  constructor(props: IRealTimeListProps, state: IRealTimeListState) {
    super(props);

    _items = []; //_items || createListItems(10);

    this.state = {
      sortedItems: _items,
      columns: _buildColumns(),
      loading: true
    };
  }

  public render(): React.ReactElement<IRealTimeListProps> {
    let { sortedItems, columns } = this.state;
    const loading: JSX.Element = (this.state.loading == true) ? <Spinner size={SpinnerSize.large} /> : null;
    const list: JSX.Element = (this.state.loading == false) ?
      <DetailsList
        items={sortedItems as any[]}
        setKey='set'
        columns={columns}
        onRenderItemColumn={_renderItemColumn}
        onColumnHeaderClick={this._onColumnClick}
        onItemInvoked={this._onItemInvoked}
        onColumnHeaderContextMenu={this._onColumnHeaderContextMenu}
      />
      : null;
    return (
      <div className={styles.realTimeList}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-white ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg6 ms-xl6 ms-xlPush5 ms-lgPush5">
              <DefaultButton
                text='Load list'
                onClick={() => this._loadList()}
              />
            </div>
          </div>
          <div className={`ms-Grid-row ms-bgColor-white ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg12 ms-xl12">
              {loading}
            </div>
          </div>
          <div className={`ms-Grid-row ms-bgColor-white ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg12 ms-xl12">
              {list}
            </div>
          </div>
        </div>
      </div>
    );
    // return (
    //   <div className={styles.realTimeList}>
    //     <div className={styles.container}>
    //       <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
    //         <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
    //           <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
    //           <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
    //           <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
    //           <a href="https://aka.ms/spfx" className={styles.button}>
    //             <span className={styles.label}>Learn more</span>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
  private async _loadList(): Promise<void> {
    this.setState({
      loading: true
    });
    let items = await pnp.sp.web.lists.getByTitle("Events").items.select("Id", "Title", "Description", "Attachments").get();
    _items = items.map((item: IList, index: number) => {
      return {
        thumbnail: `https://giuleon.sharepoint.com/sites/demo/SiteAssets/beach-small.jpg`,
        key: item.Id,
        name: item.Title,
        description: item.Description
      }
    });

    this.setState({
      sortedItems: _items,
      columns: _buildColumns(),
      loading: false
    });

    // pnp.sp.web.lists.getByTitle("Events").items.select("Id", "Title", "Description", "Attachments").get().then((items: any[]) => {
    //   console.log(items);
    //   return items.map((item: IList, index: number) => {
    //     return {
    //       key: item.Id,
    //       title: item.Title,
    //       description: item.Description
    //     }
    //   });
    // }).then((list) => {
    //   this.state = {
    //     sortedItems: list,
    //     columns: _buildColumns()
    //   };
    // });
  }
  private _getListItems(count: number, startIndex: number = 0): any {
    // get all the items from a list
    pnp.sp.web.lists.getByTitle("Events").items.get().then((items: any[]) => {
      console.log(items);
    });
  }

  @autobind
  private _onColumnClick(event: React.MouseEvent<HTMLElement>, column: IColumn) {
    let { sortedItems, columns } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    sortedItems = sortedItems!.concat([]).sort((a, b) => {
      let firstValue = a[column.fieldName];
      let secondValue = b[column.fieldName];

      if (isSortedDescending) {
        return firstValue > secondValue ? -1 : 1;
      } else {
        return firstValue > secondValue ? 1 : -1;
      }
    });

    // Reset the items and columns to match the state.
    this.setState({
      sortedItems: sortedItems,
      columns: columns!.map(col => {
        col.isSorted = (col.key === column.key);

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      })
    });
  }

  private _onColumnHeaderContextMenu(column: IColumn | undefined, ev: React.MouseEvent<HTMLElement> | undefined): void {
    console.log(`column ${column!.key} contextmenu opened.`);
  }

  private _onItemInvoked(item: any, index: number | undefined): void {
    alert(`Item ${item.name} at index ${index} has been invoked.`);
  }
}

function _buildColumns() {
  if (_items.length == 0) {
    return [];
  }

  let columns = buildColumns(_items);

  let thumbnailColumn = columns.filter(column => column.name === 'thumbnail')[0];
  // Special case one column's definition.
  thumbnailColumn.name = '';
  thumbnailColumn.maxWidth = 100;

  let keyColumn = columns.filter(column => column.name === 'key')[0];
  keyColumn.maxWidth = 100;

  let nameColumn = columns.filter(column => column.name === 'name')[0];
  nameColumn.maxWidth = 200;

  let descriptionColumn = columns.filter(column => column.name === 'description')[0];
  descriptionColumn.maxWidth = 300;

  return columns;
}

function _renderItemColumn(item: any, index: number, column: IColumn) {
  let fieldContent = item[column.fieldName];

  switch (column.key) {
    case 'thumbnail':
      return <Image src={fieldContent} width={50} height={50} imageFit={ImageFit.cover} />;

    case 'name':
      return <Link href='#'>{fieldContent}</Link>;

    case 'color':
      return <span data-selection-disabled={true} style={{ color: fieldContent }}>{fieldContent}</span>;

    default:
      return <span>{fieldContent}</span>;
  }
}