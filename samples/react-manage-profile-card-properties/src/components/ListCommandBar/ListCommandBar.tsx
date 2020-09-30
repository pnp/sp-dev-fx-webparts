import * as React from "react";
import {
  CommandBar,
  ICommandBarItemProps,
} from "office-ui-fabric-react/lib/CommandBar";
import { IButtonProps } from "office-ui-fabric-react/lib/Button";
import { IListCommandBarProps } from "./IListCommandBarProps";
import { AppContext } from "../../Common/AppContextProps";
import { useState, useEffect } from "react";
import { SearchBox, ISearchBoxStyles, Label } from "office-ui-fabric-react";

const searchtyles: ISearchBoxStyles = {
  root: { width: 320, marginRight: 15, marginTop: 5, marginBottom: 5 },
};

export const ListCommandBar: React.FunctionComponent<IListCommandBarProps> = (
  props: IListCommandBarProps
) => {

  const _applicationContext = React.useContext(AppContext);
  const {} = _applicationContext;
  const { selectedItem } = props;

  let _disableNew: boolean = false;
  let _disableEdit: boolean = true;
  let _disableDelete: boolean = true;
  let _disableView: boolean = true;


  if (selectedItem) {
    _disableEdit = false;
    _disableDelete = false;
    _disableView = false;
  }

  //
  useEffect(() => {});

  // On clear Search
  const _onClear = () => {
    let _searchCondition: string = "";
    props.onSearch(_searchCondition);
  };

  const _onSearch = (value: string) => {
    props.onSearch(value);
  };

  // CommandBar Options
  const _items: ICommandBarItemProps[] = [
    {
      key: "newItem",
      text: "New",
      cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
      iconProps: { iconName: "Add" },
      disabled: _disableNew,
      onClick: () => props.onActionSelected("New"),
    },
    {
      key: "edit",
      text: "Edit",
      iconProps: { iconName: "Edit" },
      disabled: _disableEdit,
      onClick: () => props.onActionSelected("Edit"),
    },
    /* {
      key: "view",
      text: "View",
      iconProps: { iconName: "View" },
      disabled: _disableView,
      onClick: () => props.onActionSelected("View"),
    }, */
    {
      key: "delete",
      text: "Delete",
      disabled: _disableDelete,
      iconProps: { iconName: "Delete" },
      onClick: () => props.onActionSelected("Delete"),
    },
  ];
// FarItems
  const _farItems: ICommandBarItemProps[] = [
    {
      key: "search",
      text: "",
      onRender: () => {
        return (
          <SearchBox
            styles={searchtyles}
            onSearch={_onSearch}
            onClear={_onClear}
            underlined={true}
            placeholder="Search Properties"
          />
        );
      },
    },

    {
      key: "refresh",
      text: "refresh",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "refresh list",
      iconOnly: true,
      iconProps: { iconName: "Refresh" },
      onClick: () => props.onActionSelected("Refresh"),
    },
  ];

  return (
    <div>
      <CommandBar items={_items} farItems={_farItems} />
    </div>
  );
};
