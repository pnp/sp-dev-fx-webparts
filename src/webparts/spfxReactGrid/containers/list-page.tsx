import * as React from 'react';
const connect = require('react-redux').connect;
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
import { addList, removeList, saveList } from '../actions/listActions';
import { getWebsAction } from '../actions/webActions';
import List from '../model/List';
import Web from '../model/Web';
import Container from '../components/container';
import ListView from '../components/Listview';
const booleans = [
  { id: 'yes', value: true, text: 'yes', title: 'yes' },
  { id: 'false', value: false, text: 'no', title: 'no' }

];
interface IListViewPageProps extends React.Props<any> {
  lists: Array<List>;
  webs: Array<Web>;
  addList: () => void;
  removeList: (List) => void;
  saveList: (List) => void;
  getWebs: () => Promise<any>;
};
function mapStateToProps(state) {
  return {
    lists: state.lists,
    webs: state.webs
  };
}
function mapDispatchToProps(dispatch) {

  return {
    addList: (): void => dispatch(addList(new List('daweb', 'xxxx09-2324-234234-23423441', 'test list2', 'http://adadsasd2'))),
    removeList: (): void => dispatch(removeList(new List('web', 'xxxx09-2324-234234-23423441', 'test list2', 'http://adadsasd2'))),
    getWebs: (): Promise<any> => {
      debugger;
     let promis= dispatch(getWebsAction(dispatch));
     debugger;
     return promis;
    },
    saveList: (list): void => dispatch(saveList(list)),

  };
}

class ListPage extends React.Component<IListViewPageProps, void> {
  private kolumns = [];
     private DropDownEditor = ReactDataGridPlugins.Editors.DropDownEditor;
    private WebsEditor = <this.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;
   //  private WebsEditor = <this.DropDownEditor options={booleans} />;


  private convertWebsToDropdown(web) {
    debugger;
    return { id: web.id, value: web.title, text:  web.title,title:  web.title}
  }
  public componentWillMount() {
debugger;
    if (this.props.webs.length == 0) {
      this.props.getWebs().then((x)=>{
        this.WebsEditor = <this.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;
      });
    }
  }
  private rowGetter(rowIdx) {
    return this.props.lists[rowIdx];
  }
  private handleRowUpdated(data) {

    let row = this.props.lists[data.rowIdx];
    let newrow = _.assign(row, data.updated);
    this.props.saveList(newrow);
  }
  private handleRowdeleted(event, data) {

    this.props.removeList(this.props.lists[data.rowIdx]);
  }
  public render() {
    debugger;
     const { lists, addList, removeList } = this.props;
      this.WebsEditor = <this.DropDownEditor options={this.props.webs.map(this.convertWebsToDropdown)} />;
   debugger;

    this.kolumns = [
      {
        key: "Web",
        name: "Web",
        editable: true,
        width: 80,
        editor: this.WebsEditor
      },
      {
        key: "ListID",
        name: "ListId",
        editable: true,
        width: 80
      },
      {
        key: "listName",
        name: "name",
        editable: true
      },
      {
        key: "Url",
        name: "list  Url",
        editable: true,

      },
      {
        key: "editable",
        name: "editable",
        editable: true,

      }];
    let toolbar = React.createElement(ReactDataGridPlugins.Toolbar, { onAddRow: this.props.addList });
    return (
      <Container testid="columns" size={2} center>
        <ReactDataGrid
          toolbar={toolbar}
          enableCellSelect={true}
          columns={this.kolumns}
          rowGetter={this.rowGetter.bind(this)}
          rowsCount={this.props.lists.length}
          minHeight={500}
          onRowUpdated={this.handleRowUpdated.bind(this)} />
        );
      </Container>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage);
