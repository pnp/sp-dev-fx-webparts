import * as React from 'react';
import { FC, createRef, useCallback, useRef } from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn, mergeStyleSets, Icon  } from '@fluentui/react';
import { EventOccurrence, ViewKeys } from 'model';
import { IViewDescriptor } from '../IViewDescriptor';
import { IViewProps } from '../IViewProps';
import { ViewNames} from 'ComponentStrings';
import { useTimeZoneService } from 'services';
import moment from "moment";
import {humanizeRecurrencePattern } from 'model';
import { Humanize as _strings } from "ComponentStrings";
import ExportToExcel from './ExportToExcel';
import { renderSanitizedHTML } from "common/components/LiveUtils";

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '10px',
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
        visibility: 'hidden',
      },
    },
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px',
  },
  controlWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  exampleToggle: {
    display: 'inline-block',
    marginBottom: '10px',
    marginRight: '30px',
  },
  selectionDetails: {
    marginBottom: '20px',
  },
});

export interface IDetailsListState {
  columns: IColumn[];
  items: any[];
  //selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
  announcedMessage?: string;
  defaultcolumns?: IColumn[];
}


export class ListView extends React.Component<IViewProps, IDetailsListState> {
  // private _selection: Selection;
  private _allItems: any[];
  private sortedEventOccurrences = [...this.props.cccurrences].sort(EventOccurrence.StartAscComparer);
  constructor(props:any) {
    super(props);

    // this._selection = new Selection({
    //   onSelectionChanged: () => {
    //     this.setState({
    //       selectionDetails: this._getSelectionDetails(),
    //     });
    //   },
    //   getKey: this._getKey,
    // });
    //const sortedEventOccurrences = [...this.props.cccurrences].sort(EventOccurrence.StartAscComparer);
    const defaultcolumns: IColumn[] = [
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'displayName',
        minWidth: 200,
        maxWidth: 240,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
    ];

    this.state = {
      items: [],
      columns:defaultcolumns,
      // selectionDetails: this._getSelectionDetails(),
      isModalSelection: false,
      isCompactMode: false,
      announcedMessage: undefined,
      defaultcolumns:defaultcolumns
    };     
  }

  private handleTestButton = () =>{
    console.log(this.state.items)
  }
  
  public render() {
    const sortedEventOccurrences = [...this.props.cccurrences].sort(EventOccurrence.StartAscComparer);
    const { columns, isCompactMode, items, isModalSelection, announcedMessage } = this.state;
    // const newColumns = [...this.state.defaultcolumns];
    // this.addColumnInList(newColumns);
  
  //   const [
  //     viewCommand,
  //     addToOutlookCommand,
  //     getLinkCommand
  // ] = useEventCommandActionButtons(this.props.eventCommands, this.state.items);
    // const detailsCallout = useRef<IEventDetailsCallout>();

    // const onActivate = useCallback((cccurrence: EventOccurrence, target: HTMLElement) => {
    //     detailsCallout.current?.open(cccurrence, target);
    // }, []);

    const data = this.state.items.map(item => ({
      title: item.title
    }));

    return (
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'-11px' }}>
          <div>
            <ExportToExcel items={this.state.items} _refiners={this.props.refiners}/>
          </div>
          <div style={{margin: '10px 0', fontWeight:'640' }}> Count: {this.state.items.length} </div>
        </div>
          
        {items.length > 0 ? (
          <div style={{marginTop:'-12px'}}>
            <DetailsList
            items={this.state.items}
            compact={isCompactMode}
            columns={columns}
            selectionMode={SelectionMode.none}
            getKey={this._getKey}
            setKey="none"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            isHeaderVisible={true}
            onItemInvoked={this._onItemInvoked}
          />
          </div>
          ) : (
            <p>No items found</p>
          )}
      </div>
    );
  }
  public componentDidMount(): void {
    const newColumns = [...this.state.defaultcolumns];
    this.addColumnInList(newColumns);
    this.setState({items:this.sortedEventOccurrences});
  }

  public componentDidUpdate(previousProps: any, previousState: IDetailsListState) {
    if (previousProps.cccurrences !== this.props.cccurrences) {
      const sortedEventOccurrences = [...this.props.cccurrences].sort(EventOccurrence.StartAscComparer);
      this.setState({
        items: sortedEventOccurrences
      })
    }
    if (previousProps.selectedKeys !== this.props.selectedKeys) {
      const sortedEventOccurrences = [...this.props.cccurrences].sort(EventOccurrence.StartAscComparer);
      const newColumns = [...this.state.defaultcolumns];
      this.addColumnInList(newColumns);
    }
  }

  public addColumnInList(newColumns:IColumn[]){
    const dataProperties = ['eventStartDate','eventEndTime', 'description','isRecurring', 'isAllDay', 'refinerValues', 'location', 'tag', 'isRejected','contacts', 'isConfidential', 'isApproved', 'title', 'recurrence', 'created', 'createdBy', 'modified', 'modifiedBy'];
    dataProperties.forEach(property => {
      if (this.props.selectedKeys.includes(property)) 
      {
        switch (property) {
          case 'eventStartDate':
            newColumns.push({
            key: 'column2',
            name: 'Start Time',
            fieldName: 'eventStartDate',
            minWidth: 80,
            maxWidth: 110,
            isResizable: true,
            isCollapsible: true,
            data: 'string',
            //onColumnClick: this._onColumnClick,
            onRender: (item: any) => {
              return <span>{item.start.format('M/D/YYYY h:mm A')}</span>;
            },
          });
          this.setState({ columns: newColumns });
          break;
          case 'eventEndTime':
            newColumns.push({
            key: 'column3',
            name: 'End Time',
            fieldName: 'eventEndTime',
            minWidth: 80,
            maxWidth: 110,
            isResizable: true,
            isCollapsible: true,
            data: 'string',
            onRender: (item: any) => {
              return <span>{item.end.format('M/D/YYYY h:mm A')}</span>;
            },
          });
          this.setState({ columns: newColumns });
          break;
          case 'description':
            newColumns.push({
            key: 'column4',
            name: 'Description',
            fieldName: 'description',
            minWidth: 310,
            maxWidth: 330,
            isResizable: true,
            data: 'string',
            onRender: (item: any) => {
              return (
                  <div 
                      dangerouslySetInnerHTML={{ 
                          __html: renderSanitizedHTML(item.description) 
                      }} 
                  />
              );
          },
            isPadded: true,
          });
          this.setState({ columns: newColumns });
          break;
          case 'isRecurring':
            newColumns.push({
              key: 'column5',
              name: ' Is Recurring',
              fieldName: 'isRecurring',
              iconName: 'SyncOccurence',
              iconClassName: classNames.fileIconHeaderIcon,
              minWidth: 60,
              maxWidth: 90,
              isResizable: true,
              isCollapsible: true,
              data: 'string',
              //onColumnClick: this._onColumnClick,
              onRender: (item: any) => {
                return   <div>
                {/* <Icon iconName={item.isRecurring ? (item.recurrenceExceptionInstanceDate? 'UnsyncOccurence' :'SyncOccurence') : null}  /> */}
                <Icon iconName={item.isRecurring ? (item.recurrenceExceptionInstanceDate? 'UnsyncOccurence' :'SyncOccurence') : null} style={{ marginRight:5, fontSize:10}}/>
                {/* <span style={{ marginLeft: item.isRecurring ? 0 : '10px' }}>{item.isRecurring.toString()}</span> */}
                {/* <span style={{ marginLeft: item.isRecurring ? 0 : '10px' }}>{item.isRecurring ? 'Yes' : 'No'}</span> */}
              </div>
              },
            });
            this.setState({ columns: newColumns });
            break;
          case 'isAllDay':
              newColumns.push({
                key: 'column6',
                name: 'All Day Event',
                fieldName: 'isAllDay',
                minWidth: 60,
                maxWidth: 90,
                isResizable: true,
                //onColumnClick: this._onColumnClick,
                data: 'string',
                onRender: (item: any) => {
                  return <span>{item.isAllDay ? 'Yes' : 'No'}</span>;
                  
                },
                isPadded: true,
              });
              this.setState({ columns: newColumns });
            break;  
          case 'refinerValues':
            this.props.refiners.forEach((refiner:any, index) => {
              const refinerColumn = {
                  key: `column${index +22}`,
                  name: refiner.displayName, // You can adjust the name as needed
                  fieldName: refiner.displayName, // You can adjust the fieldName as needed
                  minWidth: 100,
                  maxWidth: 200,
                  isResizable: true,
                  data: 'string',
                  onRender: (item: any) => { 
                      const matchingDisplayName = item.refinerValues.state
                          .filter((refinerItem: any) => 
                              refiner.values.state.some((valueItem: any) => valueItem.id === refinerItem.id)
                          )
                          .map((matchingItem: any) => matchingItem.displayName)
                          .join('; '); // Join matching displayNames with ';' separator
          
                      return <span>{matchingDisplayName}</span>;
                  },
                  isPadded: true,
              };          
              newColumns.push(refinerColumn); // Add the new column to newColumns array
          });
          
          this.setState({ columns: newColumns });
            // newColumns.push({
            //   key: 'column7',
            //   name: 'Refiner Values',
            //   fieldName: 'refinerValues',
            //   minWidth: 100,
            //   maxWidth: 200,
            //   isResizable: true,
            //   data: 'string',
            //   onRender: (item: any) => { 
            //     const arrayElements = item.refinerValues.state;
            //     const joinedValues = arrayElements.map((element: any, index: number) => {
            //       return index === arrayElements.length - 1 ? element.displayName : `${element.displayName}; `;
            //   }).join('');
            //     return <span>{joinedValues}</span>;
            //   },
            //   isPadded: true,
            // });
            break;
          case 'location':
            newColumns.push({
              key: 'column8',
              name: 'Location',
              fieldName: 'location',
              minWidth: 60,
              maxWidth: 80,
              isResizable: true,
              data: 'string',
              onRender: (item: any) => {
                return <span>{item.location}</span>;
              },
              isPadded: true,
            });
            this.setState({ columns: newColumns });
            break;
          case 'tag':
              newColumns.push({
                key: 'column9',
                name: 'Tag',
                fieldName: 'tag',
                minWidth: 60,
                maxWidth: 80,
                isResizable: true,
                data: 'string',
                onRender: (item: any) => {
                  return <span>{item.tag}</span>;
                },
                isPadded: true,
              });
              this.setState({ columns: newColumns });
              break;  
          case 'isRejected':
            newColumns.push({
              key: 'colum10',
              name: 'Is Rejected',
              fieldName: 'isRejected',
              minWidth: 60,
              maxWidth: 80,
              isResizable: true,
              data: 'string',
              onRender: (item: any) => {
                return <span>{item.isRejected ? 'Yes' : 'No'}</span>;
              },
              isPadded: true,
            });
            this.setState({ columns: newColumns });
            break;
          case 'contacts':
            newColumns.push({
              key: 'column11',
              name: 'Event Contacts',
              fieldName: 'contacts',
              minWidth: 160,
              maxWidth: 180,
              isResizable: true,
              data: 'string',
              onRender: (item: any) => {
                let renderedContacts = "";
                item.contacts.forEach((contact: any, index: number) => {
                    if (contact.title) {
                        renderedContacts += contact.title;
                    } else {
                        renderedContacts += contact.email;
                    }
                    // Add semicolon separator if there are more items and the current item has a title
                    if (index < item.contacts.length - 1 && (contact.title || contact.email)) {
                        renderedContacts += "; ";
                    }
                });
                return <span>{renderedContacts}</span>;
              },
              isPadded: true,
            });
            this.setState({ columns: newColumns });
            break;  
          case 'isConfidential':
            newColumns.push({
              key: 'column12',
              name: 'Is Confidential',
              fieldName: 'isConfidential',
              minWidth: 60,
              maxWidth: 80,
              isResizable: true,
              //onColumnClick: this._onColumnClick,
              data: 'string',
              onRender: (item: any) => {
                return <span>{item.isConfidential ? 'Yes' : 'No'}</span>;
              },
              isPadded: true,
            });
            this.setState({ columns: newColumns });
            break; 
          case 'isApproved':
            newColumns.push({
              key: 'colum13',
              name: 'Is Approved',
              fieldName: 'isApproved',
              minWidth: 60,
              maxWidth: 80,
              isResizable: true,
             //onColumnClick: this._onColumnClick,
              data: 'string',
              onRender: (item: any) => {
                return <span>{item.isApproved ? 'Yes' : 'No'}</span>;
              },
              isPadded: true,
            });
            this.setState({ columns: newColumns });
            break; 
          case 'title':
            newColumns.push({
              key: 'column14',
              name: 'Title',
              fieldName: 'title',
              minWidth: 200,
              maxWidth: 240,
              isRowHeader: true,
              isResizable: true,
              isSorted: true,
              isSortedDescending: false,
              sortAscendingAriaLabel: 'Sorted A to Z',
              sortDescendingAriaLabel: 'Sorted Z to A',
              onColumnClick: this._onColumnClick,
              data: 'string',
              isPadded: true,
            }); 
            this.setState({ columns: newColumns });
            break;
          case 'recurrence':
              newColumns.push({
                key: 'column15',
                name: 'Recurrence',
                fieldName: 'getSeriesMaster',
                minWidth: 200,
                maxWidth: 240,
                isResizable: true,
                //onColumnClick: this._onColumnClick,
                data: 'string',
                onRender: (item: any) => {
                  return <span>{item.isRecurring?(item.isAllDay ? `${_strings.AllDay}, ${humanizeRecurrencePattern(item.getSeriesMaster().start, item.recurrence)}` : `${item.getSeriesMaster().start.format('LT')} - ${item.getSeriesMaster().end.format('LT')}, ${humanizeRecurrencePattern(item.getSeriesMaster().start, item.recurrence)}`):null}</span>;
                },
                isPadded: true,
              }); 
              this.setState({ columns: newColumns });
              break;
          case 'created':
            newColumns.push({
              key: 'column16',
              name: 'Created',
              fieldName: 'created',
              minWidth: 80,
              maxWidth: 110,
              isResizable: true,
              isCollapsible: true,
              data: 'string',
              onRender: (item: any) => {
                return <span>{item.created.format('MMM D, YYYY')}</span>;
              },
            });
            this.setState({ columns: newColumns });
          break; 
          case 'createdBy':
              newColumns.push({
              key: 'column17',
              name: 'Created By',
              fieldName: 'createdBy',
              minWidth: 80,
              maxWidth: 110,
              isResizable: true,
              isCollapsible: true,
              data: 'string',
              onRender: (item: any) => {
                return <span>{item.createdBy ? (item.createdBy.title ? item.createdBy.title : (item.createdBy.email ? item.createdBy.email : "")) : ""}</span>;
              },
            });
            this.setState({ columns: newColumns });
          break; 
          case 'modified':
            newColumns.push({
              key: 'column18',
              name: 'Modified',
              fieldName: 'modified',
              minWidth: 80,
              maxWidth: 110,
              isResizable: true,
              isCollapsible: true,
              data: 'string',
              onRender: (item: any) => {
                return <span>{item.modified.format('MMM D, YYYY')}</span>;
              },
            });
            this.setState({ columns: newColumns });
          break; 
          case 'modifiedBy':
              newColumns.push({
              key: 'column19',
              name: 'Modified By',
              fieldName: 'modifiedBy',
              minWidth: 80,
              maxWidth: 110,
              isResizable: true,
              isCollapsible: true,
              data: 'string',
              onRender: (item: any) => {
                return <span>{item.modifiedBy ? (item.modifiedBy.title ? item.modifiedBy.title : (item.modifiedBy.email ? item.modifiedBy.email : "")) : ""}</span>;
              },
            });
            this.setState({ columns: newColumns });
          break; 
          default:
            this.setState({ columns: newColumns });
            break;
        }
      }
      else
      {
        this.setState({ columns: newColumns });
        
      }

    });
  }
  private _getKey(item: any, index?: number): string {
    return item.key;
  }

  private _onChangeCompactMode = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isCompactMode: checked });
  };

  private _onChangeModalSelection = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isModalSelection: checked });
  };

  private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1) : this._allItems,
    });
  };

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  // private _getSelectionDetails(): string {
  //   const selectionCount = this._selection.getSelectedCount();

  //   switch (selectionCount) {
  //     case 0:
  //       return 'No items selected';
  //     case 1:
  //       return '1 item selected: ' + (this._selection.getSelection()[0] as IDocument).name;
  //     default:
  //       return `${selectionCount} items selected`;
  //   }
  // }

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, items } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        this.setState({
          announcedMessage: `${currColumn.name} is sorted ${
            currColumn.isSortedDescending ? 'descending' : 'ascending'
          }`,
        });
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(this.state.items, currColumn.fieldName!, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      items: newItems,
    });
  };
}

// function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
//   const key = columnKey as keyof T;
//   return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
// }

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => {
    const aValue = String(a[key]).toLowerCase(); // Convert to lowercase
    const bValue = String(b[key]).toLowerCase(); // Convert to lowercase

    if (isSortedDescending) {
      if (aValue < bValue) return 1;
      if (aValue > bValue) return -1;
    } else {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
    }
    return 0;
  });
}


export const ListViewDescriptor: IViewDescriptor = {
  id: ViewKeys.list,
  title: ViewNames.List,
  renderer: ListView,
  dateRotatorController: {
      previousIconProps: { iconName: 'ChevronLeft' },
      nextIconProps: { iconName: 'ChevronRight' },
      previousDate: date => date.clone().subtract(1, 'day'),
      nextDate: date => date.clone().add(1, 'day'),
      dateString: date => date.format('dddd, MMMM DD, YYYY')
  },
  dateRange: (date) => {
    return {
      start: date.clone().startOf('day'),
      end: date.clone().endOf('day')
    };
}
};
