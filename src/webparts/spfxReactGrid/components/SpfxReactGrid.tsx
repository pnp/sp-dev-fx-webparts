import * as React from 'react';
import * as ReactDataGrid from 'react-data-grid';
import * as ReactDataGridPlugins from 'react-data-grid/addons';
import { css } from 'office-ui-fabric-react';

import styles from '../SpfxReactGrid.module.scss';
import { ISpfxReactGridWebPartProps } from '../ISpfxReactGridWebPartProps';

export interface ISpfxReactGridProps extends ISpfxReactGridWebPartProps {
}
export class SpfxReactGridState {
  public rows = [];
};
export default class SpfxReactGrid extends React.Component<ISpfxReactGridProps, SpfxReactGridState> {
  private columns: ReactDataGrid.Column[];
  private priorities = [{ id: 0, title: 'Critical' }, { id: 1, title: 'High' }, { id: 2, title: 'Medium' }, { id: 3, title: 'Low' }]
  private AutoCompleteEditor = ReactDataGridPlugins.Editors.AutoComplete;
  private PrioritiesEditor = <this.AutoCompleteEditor options={this.priorities} />;
  private issueTypes = [
    { id: 'bug', value: 'bug', text: 'Bug', title: 'Bug' },
    { id: 'improvement', value: 'improvement', text: 'Improvement', title: 'Improvement' },
    { id: 'epic', value: 'epic', text: 'Epic', title: 'Epic' },
    { id: 'story', value: 'story', text: 'Story', title: 'Story' }
  ];
  private DropDownEditor = ReactDataGridPlugins.Editors.DropDownEditor;
  private IssueTypesEditor = <this.DropDownEditor options={this.issueTypes} />;


  public constructor() {
    super();
    debugger;
    this.state = new SpfxReactGridState();
    this.state.rows = this.createRows(100);
    this.columns = [
      {
        key: 'id',
        name: 'ID',
        width: 80
      },
      {
        key: 'task',
        name: 'Title',
        editable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        editor: this.PrioritiesEditor
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        editor: this.IssueTypesEditor

      }
    ]

  }
  //helper to generate a random date
  private randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  }

  //helper to create a fixed number of rows
  private createRows(numberOfRows) {
    let _rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      _rows.push({
        id: i,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: this.issueTypes[Math.floor((Math.random() * 3) + 1)].value,
        startDate: this.randomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.randomDate(new Date(), new Date(2016, 0, 1))
      });
    }
    return _rows;
  }


  private rowGetter(rowIdx) {
    return this.state.rows[rowIdx]
  }
  private handleRowUpdated(e) {
    //merge updated row with current row and rerender by setting state
    let rows = this.state.rows;
    _.assign(rows[e.rowIdx], e.updated);
    this.setState({ rows: rows });
  }

  public render(): JSX.Element {
    return (
      <ReactDataGrid
        enableCellSelect={true}
        columns={this.columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500}
        onRowUpdated={this.handleRowUpdated} />
    );
  }
}
