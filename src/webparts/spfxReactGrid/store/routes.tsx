import * as React from "react";
const { IndexRoute, Route } = require("react-router");
import App from "../containers/app";
import ListPage from "../containers/list-page";
import ColumnsPage from "../containers/columns-page";
import ListItemPage from "../containers/listitem-page";
export default (
  <Route path="/" component={App}>
    <IndexRoute component={ListItemPage} />

    <Route path="/lists" component={ListPage}>
    </Route>
    <Route path="/columns" component={ColumnsPage}>
    </Route>

  </Route>
);
