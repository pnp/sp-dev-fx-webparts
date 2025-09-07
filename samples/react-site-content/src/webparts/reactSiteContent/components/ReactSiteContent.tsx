import * as React from "react";

import type { IReactSiteContentProps } from "./IReactSiteContentProps";
import { IListViewItem } from "../models/IListViewItem";
import { filterItems, generateListViewItems } from "../services/HelperService";
import { SiteContentListView } from "./SiteContentListView/SiteContentListView";

interface IReactSiteContentState {
  items: IListViewItem[];
  filteredItems: IListViewItem[];
}

const ReactSiteContent = (props: IReactSiteContentProps): JSX.Element => {
  const { spService } = props;
  const [state, setState] = React.useState<IReactSiteContentState>({
    items: [],
    filteredItems: [],
  });

  React.useEffect(() => {
    if (spService) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        const appTiles = await spService.getAppTiles();
        const listViewItems = generateListViewItems(appTiles);
        setState((prevState) => ({ ...prevState, items: listViewItems, filteredItems: listViewItems }));
      })();
    }
  }, []);

  const handleFilter = (searchValue: string | undefined | null): void => {
    const items = filterItems(state.items, searchValue);
    setState((prevState) => ({ ...prevState, filteredItems: items }));
  };

  return <SiteContentListView items={state.filteredItems} onFilter={handleFilter} />;
};

export default ReactSiteContent;
