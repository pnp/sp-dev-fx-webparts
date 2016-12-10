import * as React from "react";
const { IndexRoute, Route } = require("react-router");
import App from "../containers/app";
import ListPage from "../containers/ListItemContainer";
import ColumnsPage from "../containers/ColumnDefinitionContainer";
import ListItemPage from "../containers/ListItemContainer";
export default (
  <Route path="/" component={App}>
    <IndexRoute component={ListItemPage} />
    <Route path="/lists" component={ListPage}>
    </Route>
    <Route path="/columns" component={ColumnsPage}>
    </Route>
  </Route>
);
