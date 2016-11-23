import * as React from 'react';
const connect = require('react-redux').connect;

import { addList, removeList } from '../actions/listActions';
import List from '../model/List';
import Container from '../components/container';
import ListView from '../components/Listview';

interface IListViewPageProps extends React.Props<any> {
  lists: Array<List>;
  addList: () => void;
  removeList: () => void;
};

function mapStateToProps(state) {
  debugger;
  return {
    lists: state.lists,
  };
}

function mapDispatchToProps(dispatch) {
  debugger;
  return {
    addList: (): void => dispatch(addList(new List('xxxx09-2324-234234-23423441', 'test list2', 'http://adadsasd2'))),
    removeList: (): void  => dispatch(removeList(new List('xxxx09-2324-234234-23423441', 'test list2', 'http://adadsasd2'))),
  };
}

class ListPage extends React.Component<IListViewPageProps, void> {
  render() {
    debugger;
    const { lists, addList, removeList } = this.props;
 
    return (
      <Container testid="list" size={2} center>
      <h2
        data-testid="counter-heading"
        className="center caps"
        id="qa-counter-heading">
        Lists
      </h2>

      <ListView
        lists={ lists }
        addList={ addList }
        removeList={ removeList } />
    </Container>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage);
