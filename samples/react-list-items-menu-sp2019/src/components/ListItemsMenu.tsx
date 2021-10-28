/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as strings from "ListItemsMenuWebPartStrings";
import { filter, findIndex } from "lodash";
import {
  INavLink,
  INavLinkGroup,
  INavStyles,
  Label,
  Link,
  mergeStyleSets,
  MessageBar,
  MessageBarType,
  Nav,
  Spinner,
  SpinnerSize,
  Stack,
} from "office-ui-fabric-react";

import {
  getFileTypeIconProps,
  initializeFileTypeIcons,
} from "@uifabric/file-type-icons";
import { useList } from "../hooks/useList";
import { IListItemsMenuState } from "./IListItemMenuState";
import { IListItemsMenuProps } from "./IListItemsMenuProps";
initializeFileTypeIcons();

export const ListItemsMenu: React.FunctionComponent<IListItemsMenuProps> = (
  props: IListItemsMenuProps
) => {
  const { getGroupItems, getGroupHeaders, getField } = useList();
  const [state, setState] = React.useState<IListItemsMenuState>({
    navLinkGroups: [],
    isLoading: false,
    hasError: false,
    errorMessage: "",
    listName: "",
  });

  const navStyles: Partial<INavStyles> = React.useMemo(() => {
    return {
      group: {
        fontWeight: 700,
      },
      groupContent: {
        maxHeight: 450,
        overflow: "auto",
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: props.themeVariant?.neutralLighter,
        },
        "&::-webkit-scrollbar": {
          width: 10,
        },
      },
    };
  }, [props.themeVariant]);

  const classComponent = React.useMemo(() => {
    return mergeStyleSets({
      webPartTitle: {
        fontWeight: 500,
        overflowX: "hidden",
        textOverflow: "Ellipsis",
        fontSize: props.themeVariant?.["ms-font-large-fontSize"],
        marginBottom: 10,
      },
    });
  }, [props.themeVariant]);

  // On Header click get Items for the header
  const _onGroupHeaderClick = React.useCallback(
    async (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
      try {
        const _groupName = ev.currentTarget.innerText.split("\n")[1]; // the first Line has icon , text is on 2 line
        console.log(_groupName);
        const { navLinkGroups } = stateRef.current;

        const _navGroup = filter(navLinkGroups, { name: _groupName });
        if (_navGroup?.length && _navGroup[0]?.links?.length === 0) {
          const _navlinks: INavLink[] = [];
          const _groupHeaderItems: any[] = await getGroupItems(
            props.listId,
            props.fieldName,
            _groupName
          );
          if (_groupHeaderItems?.length) {
            for (const _groupHeaderItem of _groupHeaderItems) {
              if (props.listBaseTemplate === 0) {
                // List
                _navlinks.push({
                  name: _groupHeaderItem.Title,
                  url: `${_groupHeaderItem.FileDirRef}/dispform.aspx?ID=${_groupHeaderItem.Id}`,
                  iconProps: {
                    iconName: "TaskManager",
                  },
                  key: _groupHeaderItem.Id,
                  target: "_blank",
                  isExpanded: false,
                });
              }
              if (props.listBaseTemplate === 1) {
                // Document Library
                const _icon: { iconName: string } = getFileTypeIconProps({
                  extension: _groupHeaderItem.DocIcon,
                  size: 16,
                  imageFileType: "png",
                });

                _navlinks.push({
                  name: _groupHeaderItem.FileLeafRef,
                  url: _groupHeaderItem.FileRef,
                  icon: _icon.iconName,
                  key: _groupHeaderItem.title,
                  target: "_blank",
                  isExpanded: false,
                });
              }
            }
          }
          // Update Navigation with Items of Group
          _navGroup[0].links = _navlinks;
        }

        const _index = findIndex(navLinkGroups, { name: _groupName });
        _navGroup[0].collapseByDefault = true;
        navLinkGroups[_index] = _navGroup[0];
        stateRef.current = {
          ...stateRef.current,
          navLinkGroups: navLinkGroups,
        };
        setState(stateRef.current);
      } catch (error) {
        console.log(error);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.fieldName, props.listBaseTemplate, props.listId]
  );
  const stateRef = React.useRef(state); // Use to access state on eventListenners
  // On component did mount only if listId or Field Change
  React.useEffect(() => {
    (async () => {
      if (!props.listId || !props.fieldName) {
        return;
      }
      try {
        const _navLinksGroups: INavLinkGroup[] = [];
        stateRef.current = {
          ...stateRef.current,
          isLoading: true,
          navLinkGroups: _navLinksGroups,
        };
        setState(stateRef.current);

        const _groupHeaders = await getGroupHeaders(
          props.listId,
          props.fieldName
        );
        const _field: any = await getField(props.listId, props.fieldName);
        for (const groupHeader of _groupHeaders) {
          let _name: any;
          if (_field.fieldType === "TaxonomyFieldType") {
            _name = groupHeader.Metadata.Label ?? "Unassigned";
          }
          if (_field.fieldType === "TaxonomyFieldTypeMulti") {
            _name = groupHeader.Metadata[0]?.Label ?? "Unassigned";
          } else {
            _name = groupHeader[props.fieldName] ?? "Unassigned";

            if (_name != "Unassigned" && _field.fieldType === "User") {
              _name = _name[0]?.title;
            }
            if (_name != "Unassigned" && _field.fieldType === "Lookup") {
              _name = _name[0]?.lookupValue;
            }
          }
          _navLinksGroups.push({
            name: _name,
            collapseByDefault: true,
            onHeaderClick: _onGroupHeaderClick,
            links: [],
          });
        }
        stateRef.current = {
          ...stateRef.current,
          hasError: false,
          errorMessage: "",
          isLoading: false,
          listName: _field.fieldScope,
          navLinkGroups: _navLinksGroups,
        };
        setState(stateRef.current);
      } catch (error) {
        stateRef.current = {
          ...stateRef.current,
          hasError: true,
          errorMessage: error.message,
        };
        setState(stateRef.current);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.listId, props.fieldName, props.listBaseTemplate]);

  // Show Error if Exists
  if (state.hasError) {
    return (
      <>
        <MessageBar messageBarType={MessageBarType.error} isMultiline>
          {state.errorMessage}
        </MessageBar>
      </>
    );
  }
  // render component
  return (
    <>
      {state.isLoading ? (
        <Stack horizontal horizontalAlign="center">
          <Spinner size={SpinnerSize.medium}></Spinner>
        </Stack>
      ) : (
        <>
          <Stack
            horizontalAlign="space-between"
            horizontal
            tokens={{ childrenGap: 10 }}
            style={{ width: "100%" }}
          >
            <div className={classComponent.webPartTitle}>{props.title}</div>
            <Link href={state.listName}>View All</Link>
          </Stack>
          {state.navLinkGroups?.length === 0 ? (
            <Label
              style={{
                fontWeight: 400,
                fontSize: props.themeVariant?.["ms-font-small-fontSize"],
              }}
            >
              {strings.NodocumentsLabel}
            </Label>
          ) : (
            <Nav styles={navStyles} groups={state.navLinkGroups}></Nav>
          )}
        </>
      )}
    </>
  );
};
