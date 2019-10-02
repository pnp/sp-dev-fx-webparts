import * as React from 'react';
import styles from './CheckListFlows.module.scss';
import { ICheckListFlowsProps } from './ICheckListFlowsProps';
import { SPHttpClient } from '@microsoft/sp-http';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { DetailsList, DetailsListLayoutMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { unescape } from '@microsoft/sp-lodash-subset';
import { Shimmer, ShimmerElementType } from 'office-ui-fabric-react/lib/Shimmer';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { ICheckListFlowsState } from './ICheckListFlowsState';
import { IFlowDetails } from './IFlowDetails';

export default class CheckListFlows extends React.Component<ICheckListFlowsProps, ICheckListFlowsState> {
  constructor(props: ICheckListFlowsProps) {
    super(props);

    const columns: IColumn[] = [
      {
        key: 'flowName',
        name: 'Flow Name',
        isRowHeader: true,
        ariaLabel: 'Flow name',
        fieldName: 'flowName',
        onColumnClick: this._onColumnClick,
        isResizable: true,
        minWidth: 180,
        maxWidth: 250
      },
      {
        key: 'flowTrigger',
        name: 'Flow Trigger',
        ariaLabel: 'Flow trigger',
        fieldName: 'flowTrigger',
        onColumnClick: this._onColumnClick,
        isResizable: true,
        minWidth: 180,
        maxWidth: 230
      },
      {
        key: 'flowSharedType',
        name: 'Flow Shared Type',
        ariaLabel: 'Flow Shared Type',
        fieldName: 'flowSharedType',
        onColumnClick: this._onColumnClick,
        isResizable: true,
        minWidth: 150,
        maxWidth: 200
      },
      {
        key: 'flowUrl',
        name: 'Flow URL',
        ariaLabel: 'Flow URL',
        fieldName: 'flowUrl',
        onColumnClick: this._onColumnClick,
        isResizable: true,
        minWidth: 150,
        maxWidth: 200,
        onRender: (item) => {
          return <Link href={item.flowUrl} target='_blank'>Go To Flow</Link>;
        }
      }
    ];

    this.state = {
      flowItems: [],
      columns: columns,
      dataLoaded: true
    };

    this._getListFlows = this._getListFlows.bind(this);
    this._listSelected = this._listSelected.bind(this);
    this._onColumnClick = this._onColumnClick.bind(this);
    this._copyAndSort = this._copyAndSort.bind(this);
    this._getCustomElements = this._getCustomElements.bind(this);
  }

  /** Sort items on column click */
  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, flowItems } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = this._copyAndSort(flowItems, currColumn.fieldName!, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      flowItems: newItems
    });
  }

  private _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  }

  /** Custom Shimmer elements */
  private _getCustomElements = (): JSX.Element => {
    return (
      <div>
        <Shimmer
          shimmerElements={[
            { type: ShimmerElementType.circle, height: 24 },
            { type: ShimmerElementType.gap, width: '2%' },
            { type: ShimmerElementType.line, height: 16, width: '20%' },
            { type: ShimmerElementType.gap, width: '5%' },
            { type: ShimmerElementType.line, height: 16, width: '20%' },
            { type: ShimmerElementType.gap, width: '5%' },
            { type: ShimmerElementType.line, height: 16, width: '20%' },
            { type: ShimmerElementType.gap, width: '5%' },
            { type: ShimmerElementType.line, height: 16, width: '20%' }
          ]}
        />
        <Shimmer
          shimmerElements={[
            { type: ShimmerElementType.circle, height: 24 },
            { type: ShimmerElementType.gap, width: '2%' },
            { type: ShimmerElementType.line, height: 16, width: '20%' },
            { type: ShimmerElementType.gap, width: '5%' },
            { type: ShimmerElementType.line, height: 16, width: '20%' },
            { type: ShimmerElementType.gap, width: '5%' },
            { type: ShimmerElementType.line, height: 16, width: '20%' },
            { type: ShimmerElementType.gap, width: '5%' },
            { type: ShimmerElementType.line, height: 16, width: '20%' }
          ]}
        />
      </div>
    );
  }

  /** Selected list updated */
  private _listSelected(event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) {
    this.setState({ dataLoaded: false });

    let listEntityName: string = option.key.toString();
    listEntityName = unescape(listEntityName.replace("_x", "%u").replace("_", ""));
    let listUrl: string;

    if (listEntityName.substr(listEntityName.length - 4, 4) === 'List') {
      listEntityName = listEntityName.substring(0, listEntityName.length - 4);
      listUrl = `${this.props.context.pageContext.web.serverRelativeUrl}/Lists/${listEntityName}`;
    } else {
      listUrl = `${this.props.context.pageContext.web.serverRelativeUrl}/${listEntityName}`;
    }

    this._getListFlows(listUrl);
  }

  /**
   * Retrieve the flow instances running on the selected list
   * @param listUrl The List URL for which the flow instances would be retrieved
   */
  private _getListFlows(listUrl: string) {
    this.props.context.spHttpClient.post(`${this.props.context.pageContext.web.absoluteUrl}/_api/web/GetList(@url)/SyncFlowInstances?@url='${listUrl}'`, SPHttpClient.configurations.v1, {})
      .then((response) => {
        response.json().then((val) => {
          let flowItems: IFlowDetails[] = [];
          JSON.parse(val.SynchronizationData).value.map((flow) => {
            flowItems.push({
              flowName: flow.properties.displayName,
              flowTrigger: flow.properties.definitionSummary.triggers[0].swaggerOperationId,
              flowUrl: `https://flow.microsoft.com/manage/${flow.id.substring(flow.id.indexOf('environments'))}/details`,
              flowSharedType: (flow.properties.sharingType && (flow.properties.sharingType === 'Coauthor')) ? 'Team Flow' : 'My Flow'
            });
          });
          this.setState({ flowItems, dataLoaded: true });
        });
      }).catch((error) => {
        console.log("Some error occurred: ", error);
      });
  }

  public render(): React.ReactElement<ICheckListFlowsProps> {
    return (
      <div className={styles.checkListFlows}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <WebPartTitle displayMode={this.props.displayMode}
                title={this.props.title}
                updateProperty={this.props.updateProperty}
              />
              <p className={styles.description}>Select List</p>
              <Dropdown placeHolder='Select List'
                options={this.props.listOptions}
                onChange={this._listSelected}
              />
              <br />
              <Shimmer customElementsGroup={this._getCustomElements()} isDataLoaded={this.state.dataLoaded}>
                {this.state.dataLoaded && this.state.flowItems.length === 0 &&
                  <p className={styles.description}>There are no flows associated with this list</p>
                }
                {this.state.dataLoaded && this.state.flowItems.length > 0 &&
                  <DetailsList
                    items={this.state.flowItems}
                    columns={this.state.columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    selectionPreservedOnEmptyClick={true}
                    enterModalSelectionOnTouch={true}
                    ariaLabelForSelectionColumn="Toggle selection"
                    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                    checkButtonAriaLabel="Row checkbox"
                  />
                }
              </Shimmer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
