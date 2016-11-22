import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import * as ReactDataGrid from "react-data-grid";
import * as ReactDataGridPlugins from "react-data-grid/addons";
import { ISpfxReactGridWebPartProps } from "./ISpfxReactGridWebPartProps";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "./store/configure-store";
import { Log } from "@microsoft/sp-client-base";
import Container from './components/container';
import ListItemView from './components/listitemview';
import { addListItem, removeListItem, getListItemsAction} from './actions/listActions';
import ListItem from "./Model/ListItem";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// const store = configureStore();
export interface ISpfxReactGridProps extends ISpfxReactGridWebPartProps {
      listItems: Array<ListItem>;
  addListItem: () => void;
  removeListItem: () => void;
  getListItems: () => void;

}
const mapStateToProps = (state) => {
    debugger;
    return {
        items: state.items,

    };
}

const mapDispatchToProps = (dispatch) => {
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
    }
}
 connect(mapStateToProps,mapDispatchToProps);
export  class SpfxReactGridContainer extends React.Component<ISpfxReactGridProps, void> {
    private _store = configureStore({});
    private unsubscribe;


    public static rowHtml(row): JSX.Element {
        debugger;
        let content: JSX.Element =
            <tr key={row.id}>
                <td>
                    {row.id}
                </td>
                <td>
                    {row.title}
                </td>
            </tr>
            ;
        return content;
    }
    public render(): JSX.Element {
        Log.verbose("SpfxReactGridContainer", "In render of SpfxReactGridContainer");

        debugger;
        let currentState = this._store.getState();
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



    }

}
export default  connect(mapStateToProps,mapDispatchToProps)(SpfxReactGridContainer);