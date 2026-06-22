import {
  Dropdown,
  Toolbar,
  ToolbarButton,
  ToolbarToggleButton,
  Option,
  useId,
  Tooltip,
  ToolbarDivider,
} from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import * as React from "react";
import { IconFactory } from "../../../../../../helpers/IconHelper";
import { InsertLinkPopover } from "../popovers/InsertLinkPopover";
import type { RibbonProps } from "../type/RibbonProps";

const useStyles = makeStyles({
  toolbar: {
    padding: "2px 0",
    background: "#faf9f8",
    borderRadius: "0",
  },
  contentHeader: {
    marginTop: "0",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
  buttonContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
});

export const RibbonToolbar: React.FC<RibbonProps> = (props) => {
  const { editor, ribbonItems, size, vertical, uiUtilities, ...toolbarProps } = props;
  const classes = useStyles();
  const dropdownId = useId("font-size-dropdown");

  return (
    <Toolbar className={classes.toolbar} as="div" size={size} vertical={vertical} aria-label="Format Ribbon" {...toolbarProps}>
      {ribbonItems.map((item) => {
        switch (item.type) {
          case "link":
            return <InsertLinkPopover editor={editor} item={item} key={item.key} />;
          case "separator":
            return <ToolbarDivider key={item.key} />;
          case "toggle":
            return (
              <Tooltip content={item.text} relationship="description" withArrow key={item.key}>
                <ToolbarToggleButton
                  appearance="subtle"
                  icon={item.iconName ? IconFactory(item.iconName) : undefined}
                  title={item.text}
                  onClick={(e) => item.onClick?.(editor, item.key)}
                  as="button"
                  name="textOptions"
                  value={item.value}
                  aria-label={item.text}
                />
              </Tooltip>
            );
          case "dropdown":
            return (
              <Dropdown
                id={dropdownId}
                style={item.styles}
                size="medium"
                defaultValue={item.dropdownProps?.defaultSelectedKey}
                placeholder={item.text}
                onOptionSelect={(event: any, data: any) => item.onOptionSelect?.(editor, event, data)}
                key={item.key}
              >
                {item.dropdownProps?.options?.map((option) => (
                  <Option key={option.key} value={option.key}>
                    {option.text}
                  </Option>
                ))}
              </Dropdown>
            );
          default:
            return (
              <ToolbarButton
                key={item.key}
                title={item.text}
                onClick={(e) => item.onClick?.(editor, item.key, uiUtilities, e)}
                appearance="subtle"
                icon={item.iconName ? IconFactory(item.iconName) : undefined}
              />
            );
        }
      })}
    </Toolbar>
  );
};
