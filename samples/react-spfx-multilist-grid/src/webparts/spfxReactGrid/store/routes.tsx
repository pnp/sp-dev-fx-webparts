import * as React from "react";
const { IndexRoute, Route } = require("react-router");
import App from "../containers/app";
import ListDefinitionContainer from "../containers/ListDefinitionContainer";
import ColumnDefinitionContainer from "../containers/ColumnDefinitionContainer";
import ListItemContainer from "../containers/ListItemContainer";
export default (
  <Route path="/" component={App}>
    <IndexRoute component={ListItemContainer} />
    <Route path="/lists" component={ListDefinitionContainer}>
    </Route>
    <Route path="/columns" component={ColumnDefinitionContainer}>
    </Route>

  </Route>
);
