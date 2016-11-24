import * as React from "react";
const connect = require("react-redux").connect;

import { addColumn, removeColumn, saveColumn } from "../actions/columnActions";
import ListItem from "../model/ListItem";
import Column from "../model/Column";
import Container from "../components/container";
import ListItemView from "../components/listitemview";
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";

interface IColumnsPageProps extends React.Props<any> {
  columns: Array<Column>;
  addColumn: () => void;

  removeColumn: () => void;
  saveColumn: (Column) => void;
}

function mapStateToProps(state) {
  debugger;
  debugger;
  return {
    columns: state.columns,
  };
}

function mapDispatchToProps(dispatch) {

  return {
    addColumn: (): void => {
      debugger;
      dispatch(addColumn(new Column("new", "bew", "new")));
    },
    saveColumn: (updatedRowData): void => {
      debugger;
      let {   rowIdx, updated, cellKey, keyCode} = updatedRowData;
      let row=this.rowGetter(rowIdx);
      if (keyCode === "Enter") {
        dispatch(saveColumn(updatedRowData));
      }
    },


    removeColumn: (column): void => {
      debugger;
      dispatch(removeColumn(column));
    },

  };
}

class CplumnsPage extends React.Component<IColumnsPageProps, void> {
  private rowGetter(rowIdx) {
    return this.props.columns[rowIdx];
  }
  private handleRowUpdated(e) {
    //merge updated row with current row and rerender by setting state
    // let rows = this.props.listItems;
    // _.assign(rows[e.rowIdx], e.updated);
    // this.setState({ rows: rows });
  }

  public render() {
    debugger;
    const { columns, addColumn, removeColumn } = this.props;
    const kolumns = [{
      key: "key",
      name: "key",
      editable: true,
      width: 80
    },
    {
      key: "name",
      name: "name",
      editable: true
    },
    {
      key: "type",
      name: "type",
      editable: true
    },
    {
      key: "editable",
      name: "editable",
      editable: true
    },]
      ;
    let toolbar = React.createElement(ReactDataGridPlugins.Toolbar, { onAddRow: this.props.addColumn });
    return (
      <Container testid="columns" size={2} center>
        <ReactDataGrid
          toolbar={toolbar}
          enableCellSelect={true}
          columns={kolumns}
          rowGetter={this.rowGetter.bind(this)}
          rowsCount={this.props.columns.length}
          minHeight={500}
          onRowUpdated={this.props.saveColumn} />
        );
      </Container>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CplumnsPage);
