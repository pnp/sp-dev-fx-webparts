import * as React from 'react';
import styles from './Sitecontents.module.scss';
import { ISitecontentsProps } from './ISitecontentsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISitecontentsState } from './ISitecontentsState';
import { HttpService } from './../common/services/HttpService';
import { ISiteContent } from './ISiteContent';
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  ColumnActionsMode, DetailsRow
} from "office-ui-fabric-react/lib/DetailsList";

import { Link } from "office-ui-fabric-react/lib/Link";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: "16px",
  },
  fileIconCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: ".",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden",
      },
    },
  },
  fileIconImg: {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px",
  },
  controlWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  exampleToggle: {
    display: "inline-block",
    marginBottom: "10px",
    marginRight: "30px",
  },
  selectionDetails: {
    marginBottom: "20px",
  },
});
const controlStyles = {
  root: {
    margin: "0 30px 20px 0",
    maxWidth: "300px",
  },
};


export default class Sitecontents extends React.Component<ISitecontentsProps, ISitecontentsState> {

  private spService: HttpService;
  private  columns: IColumn[] =[]
  constructor(props) {
    super(props);

     this.columns= [
      {
        key: "ListType",
        name: "File Type",
        className: classNames.fileIconCell,
        iconClassName: classNames.fileIconHeaderIcon,
        iconName: "Page",
        isIconOnly: true,
        fieldName: "name",
        minWidth: 16,
        maxWidth: 16,
        onColumnClick: this._onColumnClick,
        onRender: (item: ISiteContent) => {
          return <img src={item.imageUrl}></img>;
        },
      },
      {
        key: "Column2",
        name: "Title",
        fieldName: "title",
        minWidth: 100,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        data: "string",
        isPadded: true,
        onColumnClick: this._onColumnClick,
        onRender: (item: ISiteContent) => {
          return (
            <Link href={item.url} target="_blank">
              {item.title}
            </Link>
          );
        },
      },
      {
        key: "Column3",
        name: "Created",
        fieldName: "createdDate",
        minWidth: 100,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        data: "string",
        isPadded: true,
        onColumnClick: this._onColumnClick,
      },
      {
        key: "Column4",
        name: "Modified",
        fieldName: "lastModifiedDate",
        minWidth: 100,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        data: "string",
        isPadded: true,
        onColumnClick: this._onColumnClick,
      },
      {
        key: "Column5",
        name: "Items",
        fieldName: "itemCount",
        minWidth: 100,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        data: "number",
        isPadded: true,
        onColumnClick: this._onColumnClick,
      },
    ];

    this.state= {
      items:[],
      columns: this.columns
    }

    this.spService= new HttpService(this.props.context.pageContext.web.absoluteUrl,this.props.context.httpClient);

  }

  private getFormattedDate= (inputDate:string) : string => {
    let formattedDate = "";
    if(inputDate!="") {
      const date= new Date(inputDate);
      formattedDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    }
    return formattedDate;
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.filterSiteContentBy != this.props.filterSiteContentBy) {
     this.fetchData();
    }
    if(prevProps.orderBy != this.props.orderBy) {
      this.updateState(this.state.items);
    }

    if(prevProps.showModifiedDate!= this.props.showModifiedDate) {
      this.updateState(this.state.items);
    }
    if(prevProps.showCreatedDate!= this.props.showCreatedDate){
      this.updateState(this.state.items);
    }
    if(prevProps.showItemsCount!= this.props.showItemsCount) {
      this.updateState(this.state.items)
    }

  }

  private fetchData ()  {
    const responseArray : ISiteContent[] = [];
    this.spService.GetSiteContent(this.props.filterSiteContentBy).then((response)=> {
      if(response.value!=undefined) {
        response.value.forEach((element)=> {
          responseArray.push({
            id: element.Id,
            title: element.Title,
            url: element.RootFolder.ServerRelativeUrl,
            itemCount: element.ItemCount,
            lastModifiedDate: this.getFormattedDate(element.LastItemModifiedDate),
            createdDate: this.getFormattedDate(element.Created),
            imageUrl: this.props.context.pageContext.web.absoluteUrl+"/" + element.ImageUrl,
            entityTypeName: element.EntityTypeName
          });
        });
        this.updateState(responseArray);
      }
    });
  }


  private updateState= (responseArray : ISiteContent[]): void => {
    let columnName: string;
    let isSortDesc: boolean = false;

    let _columns : IColumn[] = [...this.columns];

    if(!this.props.showModifiedDate){
      //const columns : IColumn[] = [..._columns];
      let newColumns= [..._columns];

      const filteredColumns : IColumn[] = newColumns.filter(function(col) {
        return col.fieldName!="lastModifiedDate"
      })
      _columns = filteredColumns;
    }
    if(!this.props.showCreatedDate){
      //const columns : IColumn[] = _columns;
      let newColumns= [..._columns];

      const filteredColumns : IColumn[] = newColumns.filter(function(col) {
        return col.fieldName!="createdDate"
      })
      _columns = filteredColumns;
    }
    if(!this.props.showItemsCount){
      //const columns : IColumn[] = _columns;
      let newColumns= [..._columns];

      const filteredColumns : IColumn[] = newColumns.filter(function(col) {
        return col.fieldName!="itemCount"
      })
      _columns = filteredColumns;
    }

    if(this.props.orderBy == undefined || this.props.orderBy=="") {
      columnName = "Created";
      isSortDesc = true;
    }
    else if(this.props.orderBy != "") {
      if(this.props.orderBy.toLowerCase() == "modifieddesc") {
        columnName = "Modified";
        isSortDesc = true;
      }
      else if (this.props.orderBy.toLowerCase() == "modifiedasc") {
        columnName = "Modified";
        isSortDesc = false;
      }
      else if (this.props.orderBy.toLowerCase() == "createddesc") {
        columnName = "Created";
        isSortDesc = true;
      }
      else if (this.props.orderBy.toLowerCase() == "createdasc") {
        columnName = "Created";
        isSortDesc = false;
      }
      else if (this.props.orderBy.toLowerCase() == "titledesc") {
        columnName = "Title";
        isSortDesc = true;
      }
      else if (this.props.orderBy.toLowerCase() == "titleasc") {
        columnName = "Title";
        isSortDesc = false;
      }
      else if (this.props.orderBy.toLowerCase() == "itemscountdesc") {
        columnName = "Items";
        isSortDesc = true;
      }
      else if (this.props.orderBy.toLowerCase() == "itemscountasc") {
        columnName = "Items";
        isSortDesc = false;
      }
    }

    //const newColumns : IColumn[] = this.state.columns.slice();
    const _newColumns: IColumn[]= _columns;
    const currColumn: IColumn = _newColumns.filter((currCol)=>currCol.name === columnName )[0];
    _newColumns.forEach((newCol: IColumn) => {
      if(newCol === currColumn) {
        currColumn.isSortedDescending = isSortDesc;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });

    const newItems = this._copyAndSort(responseArray, currColumn?currColumn.fieldName! : 'Title', currColumn?currColumn.isSortedDescending :false);

    this.setState((prevState : ISitecontentsState, props: ISitecontentsProps):ISitecontentsState=>{
      prevState.columns = _newColumns;
      prevState.items = newItems;
      return prevState;
    });


  }

  private _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean):T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a:T,b:T) => (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1);
  }

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, items } = this.state;
    const newColums: IColumn[] = columns.slice();
    const currColumn: IColumn = newColums.filter((currCol) => column.key === currCol.key)[0];
    newColums.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = this._copyAndSort(items,currColumn.fieldName!,currColumn.isSortedDescending);
    this.setState({
      columns: newColums,
      items: newItems,
    });
  };

  private _onItemInvoked = (item:ISiteContent):void => {
    if(item.url !=undefined && item.url != "") {
      window.open(item.url,"_blank");
    }
  }
  public render(): React.ReactElement<ISitecontentsProps> {
    const { columns, items} = this.state;
    return (
      <Fabric>
        <DetailsList
          items={items}
          compact={false}
          columns={columns}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          selectionPreservedOnEmptyClick={true}
          onItemInvoked={this._onItemInvoked}  />

      </Fabric>
    )
  }
}
