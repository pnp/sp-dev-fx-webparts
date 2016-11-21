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
// const store = configureStore();
export interface ISpfxReactGridProps extends ISpfxReactGridWebPartProps {
    columns: ReactDataGrid.Column[]
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


    }
    public render(): JSX.Element {
        Log.verbose("SpfxReactGridContainer", "In render of SpfxReactGridContainer");

        debugger;
        let stuff = this._store.getState();
        return (<div />);
        // return (
        //     <ReactDataGrid
        //         enableCellSelect={true}
        //         columns={this.props.columns}
        //         rowGetter={this.rowGetter.bind(this)}
        //         rowsCount={this.state.rows.length}
        //         minHeight={500}
        //         onRowUpdated={this.handleRowUpdated.bind(this)} />
        // );
    }
}
