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
import * as ActionAddListItem from "./actions/actionAddListItem";
import ListItem from "./Model/ListItem";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// const store = configureStore();
export interface ISpfxReactGridProps extends ISpfxReactGridWebPartProps {
    columns: ReactDataGrid.Column[]
}
const mapStateToProps = (state) => {
    debugger;
    return {
        items: state.itemslistItem.massagedFoo,
        message: state.myAction.message
    };
}

const mapDispatchToProps = (dispatch) => {
    debugger;
    return bindActionCreators(ActionAddListItem.doActionAddListIten, dispatch)
}
export default class SpfxReactGridContainer extends React.Component<ISpfxReactGridProps, {}> {
    private _store = configureStore();
    private unsubscribe;


    public componentWillMount(): void {
        Log.verbose("SpfxReactGridContainer", "In componentWillMount of SpfxReactGridContainer");
        this.unsubscribe = this._store.subscribe(this.render.bind(this));
    }
    public componentWillUnmount(): void {
        Log.verbose("SpfxReactGridContainer", "In componentWillUnmount of SpfxReactGridContainer");
        this.unsubscribe();
    }
    public componentDidMount(): void {
        Log.verbose("SpfxReactGridContainer", "In componentDidMount of SpfxReactGridContainer");
        this._store.dispatch({ type: "INIT" });
        let listItem: ListItem = new ListItem();
        listItem.title = "Item1";
        listItem.id = 1;
        this._store.dispatch(ActionAddListItem.doActionAddListIten(listItem));
        listItem.title = "Item2";
        listItem.id = 2;

        this._store.dispatch(ActionAddListItem.doActionAddListIten(listItem));
        listItem.title = "Item3";
        listItem.id = 3;

        this._store.dispatch(ActionAddListItem.doActionAddListIten(listItem));


    }
    public rowGetter(id: number): any {
        let currentState = this._store.getState();
        let item = currentState.items[id];
        return item;
    }
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
        return (
            <table>
                <thead>
                <tr>
                    <th> id </th>
                    <th> titke </th>
                </tr>
                </thead>
                <tbody>
                    {
                        currentState.items.map( (item)=> { return SpfxReactGridContainer.rowHtml(item) })
                    }
                </tbody>
            </table>
        );



    }
}
