import * as React from "react";
const connect = require("react-redux").connect;
import { addListItem, removeListItem, getListItemsAction } from "../actions/listActions";
import ListItem from "../model/ListItem";
import ColumnDefinition from "../model/Column";
import Container from "../components/container";
interface IListViewPageProps extends React.Props<any> {
  listItems: Array<ListItem>;
  columns: Array<ColumnDefinition>;
  addListItem: (ListItem) => void;
  removeListItem: (ListItem) => void;
  getListItems: () => void;
  updateListItem: (ListItem) => void;
}
function mapStateToProps(state) {
  return {
    listItems: state.items,
    columns: state.columns,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addListItem: (): void => {
      dispatch(addListItem(new ListItem("1", "test Item", "123-123123123-123123-123123")));
    },
    getListItems: (): void => {
      let promise: Promise<any> = getListItemsAction(dispatch);
      dispatch(promise); // need to ewname this one to be digfferent from the omported ome
    },
    removeListItem: (): void => {
      dispatch(removeListItem(new ListItem("1", "test Item", "123-123123123-123123-123123")));
    },
  };
}

class ListItemPage extends React.Component<IListViewPageProps, void> {
  public componentWillMount(){
    this.props.getListItems();
  }

  private handleRowUpdated(e) {
  }
  public render() {
    const { listItems, addListItem, removeListItem, getListItems } = this.props;
    return (
      <Container testid="listitem" size={2} center>
        <div> Working on it</div>
        );
      </Container>
    );
    //   return (
    //   <Container testid="listitem" size={2} center>
    //     <ReactDataGrid

    //       enableCellSelect={true}
    //       columns={this.props.columns}
    //       rowGetter={this.rowGetter.bind(this)}
    //       rowsCount={this.props.listItems.length}
    //       minHeight={500}
    //       onRowUpdated={this.props.updateListItem} />
    //     );
    //   </Container>
    // );
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemPage);
