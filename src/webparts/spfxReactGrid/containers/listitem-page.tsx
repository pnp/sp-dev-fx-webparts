import * as React from 'react';
const connect = require('react-redux').connect;

import { addListItem, removeListItem, getListItemsAction} from '../actions/listActions';
import ListItem from '../model/ListItem';
import Container from '../components/container';
import ListItemView from '../components/listitemview';

interface IListViewPageProps extends React.Props<any> {
  listItems: Array<ListItem>;
  addListItem: () => void;
  removeListItem: () => void;
  getListItems: () => void;
}

function mapStateToProps(state) {
  debugger;
  return {
    listItems: state.listItems,
  };
}

function mapDispatchToProps(dispatch) {
  debugger;
  return {
    addListItem: (): void => {
      dispatch(addListItem(new ListItem('1', 'test Item', '123-123123123-123123-123123')));
    },
    getListItems: (): void => {
      let promise: Promise<any> = getListItemsAction(dispatch);
      dispatch(promise); // need to ewname this one to be digfferent from the omported ome

    },

    removeListItem: (): void => {
      dispatch(removeListItem(new ListItem('1', 'test Item', '123-123123123-123123-123123')));
    },
  };
}

class ListItemPage extends React.Component<IListViewPageProps, void> {
 public render() {
    debugger;
    const { listItems, addListItem, removeListItem, getListItems } = this.props;

    return (
      <Container testid="listitem" size={2} center>
        <h2
          data-testid="counter-heading"
          className="center caps"
          id="qa-counter-heading">
          List ITEMS
        </h2>

        <ListItemView
          listItems={ listItems }
          addListItem={ addListItem }
          getListItems={ getListItems }
          removeListItem={ removeListItem } />
      </Container>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemPage);
