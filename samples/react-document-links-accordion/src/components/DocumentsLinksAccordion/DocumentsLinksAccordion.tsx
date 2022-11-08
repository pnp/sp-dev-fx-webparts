import * as React from "react";
import * as strings from "DocumentsLinksAccordionWebPartStrings";
import { filter, findIndex, uniqBy } from "lodash";
import {
  Customizer,
  INavLink,
  INavLinkGroup,
  Label,
  Link,
  mergeStyleSets,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  Stack,
  FontIcon,
  Text,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  IDetailsListProps,
  IStackStyles,
  IStyle,
  IDetailsListStyles,
} from "office-ui-fabric-react";

import { getFileTypeIconProps } from "@uifabric/file-type-icons";
import { useList } from "../../hooks/useList";
import { IDocumentsLinksAccordionState } from "./IDocumentsLinksAccordionState";
import { IDocumentsLinksAccordionProps } from "./IDocumentsLinksAccordionProps";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "@pnp/spfx-controls-react/lib/AccessibleAccordion";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

const { getGroupItems, getGroupHeaders, getField } = useList();
export const DocumentsLinksAccordion: React.FunctionComponent<IDocumentsLinksAccordionProps> = (
  props: IDocumentsLinksAccordionProps
) => {
  const [state, setState] = React.useState<IDocumentsLinksAccordionState>({
    navLinkGroups: [],
    isLoading: false,
    hasError: false,
    errorMessage: "",
    listName: "",
  });

  const stackItemStyles: Partial<IStackStyles> = React.useMemo(() => {
    return {
      root: {
        padding: 7,
      } as IStyle,
    };
  }, []);

  const listViewStyles: Partial<IDetailsListStyles> = React.useMemo(() => {
    return {
      focusZone: {
        width: "auto",
        maxHeight: 450,
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: props.themeVariant?.palette?.neutralLighter,
        },
        "&::-webkit-scrollbar": {
          width: "7.5px",
        },
        "scrollbar-color": props.themeVariant?.palette?.neutralLighter,
        "scrollbar-width": "thin",
      },
      root: {
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: props.themeVariant?.palette?.neutralLighter,
        },
        "&::-webkit-scrollbar": {
          height: "7.5px",
        },
        "scrollbar-color": props.themeVariant?.palette?.neutralLighter,
        "scrollbar-width": "thin",
      },
    };
  }, []);

  const classComponent = React.useMemo(() => {
    return mergeStyleSets({
      webPartTitle: {
        fontWeight: 600,
        overflowX: "hidden",
        textOverflow: "Ellipsis",
        fontSize: props.themeVariant.fonts.large.fontSize,
        marginBottom: 10,
      },
    });
  }, [props.themeVariant]);

  const stateRef = React.useRef(state); // Use to access state on eventListenners

  const columns: IColumn[] = React.useMemo(() => {
    return [
      {
        key: "documentRenderLink",
        name: "Document",
        fieldName: "name",
        minWidth: 400,
        maxWidth: 800,
        isResizable: false,
        data: "string",
      },
    ];
  }, []);

  const onRenderRow: IDetailsListProps["onRenderRow"] = (propsItem) => {
    if (propsItem.item) {
      const item = propsItem.item as INavLink;
      return (
        <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }} styles={stackItemStyles}>
          <FontIcon iconName={item.iconProps.iconName} />
          <Link href={item.url} target="_blank">
            <Text variant={"medium"}>{item.name}</Text>
          </Link>
        </Stack>
      );
    }
    return null;
  };
  React.useEffect(() => {
    (async () => {
      if (!props.listId || !props.fieldName) {
        return;
      }
      try {
        let _navLinksGroups: INavLinkGroup[] = [];
        stateRef.current = {
          ...stateRef.current,
          isLoading: true,
          navLinkGroups: _navLinksGroups,
        };
        setState(stateRef.current);
        const _groupHeaders = await getGroupHeaders(props.listId, props.fieldName, props.listBaseTemplate);
        const { fieldName } = props;
        const _field: any = await getField(props.listId, props.fieldName);

        for (const groupHeader of _groupHeaders) {
          let _name: any;
          switch (_field.fieldType) {
            case "TaxonomyFieldType":
              _name = groupHeader[fieldName]?.Label ?? "Unassigned";
              break;
            case "TaxonomyFieldTypeMulti":
              _name = groupHeader[fieldName][0]?.Label ?? "Unassigned";
              break;
            case "User":
              if (_name != "Unassigned") {
                _name = groupHeader[fieldName][0]?.title;
              }
              break;
            case "Lookup":
              _name =
                groupHeader[props.fieldName] !== "" &&
                groupHeader[props.fieldName] !== undefined &&
                groupHeader[props.fieldName][0].lookupValue !== ""
                  ? groupHeader[props.fieldName][0]?.lookupValue
                  : "Unassigned";
              break;
            default:
              _name =
                groupHeader[props.fieldName] !== "" && groupHeader[props.fieldName] !== undefined
                  ? groupHeader[props.fieldName]
                  : "Unassigned";
              break;
          }
          _navLinksGroups.push({
            name: _name,
            groupData: _name,
            collapseByDefault: true,
            links: [],
          });
          // Ensure the groups name are unique!
          _navLinksGroups = uniqBy(_navLinksGroups, "name");
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
  }, [props.listId, props.fieldName]);

  // On Header click get Items for the header
  const onGroupHeaderClick = React.useCallback(
    async (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
      try {
        const _groupName = ev.currentTarget.innerText;
        const { navLinkGroups } = stateRef.current;

        setState(stateRef.current);
        const _navGroup = filter(navLinkGroups, { name: _groupName });
        if (_navGroup?.length && _navGroup[0]?.links?.length === 0) {
          const _navlinks: INavLink[] = [];
          const _groupHeaderItems: any[] = await getGroupItems(
            props.listId,
            props.fieldName,
            _groupName,
            props.listBaseTemplate
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
                _navlinks.push({
                  name: _groupHeaderItem.FileLeafRef,
                  url: _groupHeaderItem.FileRef,
                  iconProps: {
                    ...getFileTypeIconProps({
                      extension: _groupHeaderItem.DocIcon,
                      size: 16,
                      imageFileType: "svg",
                    }),
                  },
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

        stateRef.current = { ...stateRef.current, navLinkGroups: navLinkGroups };
        setState(stateRef.current);
      } catch (error) {}
    },
    [props]
  );

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
  if (!props.listId || !props.fieldName) {
    return (
      <Placeholder
        iconName="Edit"
        iconText={strings.PlaceHolderIconText}
        description={strings.PlaceHolderDescription}
        buttonLabel={strings.PlaceHolderButtonLable}
        onConfigure={props.onConfigure}
      />
    );
  }

  return (
    <>
      <Customizer settings={{ theme: props.themeVariant }}>
        {state.isLoading ? (
          <Stack horizontal horizontalAlign="center">
            <Spinner size={SpinnerSize.medium}></Spinner>
          </Stack>
        ) : (
          <>
            <Stack horizontalAlign="space-between" horizontal tokens={{ childrenGap: 10 }} style={{ width: "100%" }}>
              <div className={classComponent.webPartTitle}>{props.title}</div>
              <Link href={state.listName}>{strings.ViewAllLabel}</Link>
            </Stack>
            {state.navLinkGroups?.length === 0 ? (
              <Label
                style={{
                  fontWeight: 400,
                  fontSize: props.themeVariant.fonts.small.fontSize,
                }}
              >
                {strings.NodocumentsLabel}
              </Label>
            ) : (
              <Accordion allowZeroExpanded allowMultipleExpanded>
                {state.navLinkGroups.map((item, i) => {
                  return (
                    <AccordionItem>
                      <AccordionItemHeading
                        onClick={async (ev) => {
                          await onGroupHeaderClick(ev);
                        }}
                      >
                        <AccordionItemButton>{item.name}</AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <Stack>
                          <DetailsList
                            items={item.links}
                            columns={columns}
                            styles={listViewStyles}
                            compact={true}
                            selectionMode={SelectionMode.none}
                            setKey="none"
                            layoutMode={DetailsListLayoutMode.justified}
                            isHeaderVisible={false}
                            onRenderRow={onRenderRow}
                          />
                        </Stack>
                      </AccordionItemPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </>
        )}
      </Customizer>
    </>
  );
};
