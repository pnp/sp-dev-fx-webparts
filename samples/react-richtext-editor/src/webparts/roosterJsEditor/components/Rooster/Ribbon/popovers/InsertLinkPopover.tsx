import { Popover, PopoverSurface, PopoverTrigger, Input, Label, Button, ToolbarButton } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";
import * as React from "react";
import { insertLink } from "roosterjs-content-model-api";
import { IconFactory } from "../../../../../../helpers/IconHelper";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
    minWidth: "500px",
  },
  buttonContainer: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
    justifyContent: "end",
  },
});

interface InsertLinkPopoverProps {
  editor: any;
  item: any;
}

export const InsertLinkPopover: React.FC<InsertLinkPopoverProps> = ({ editor, item }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [displayText, setDisplayText] = React.useState("");

  const handleSubmit = (ev: React.FormEvent) => {
    insertLink(editor, url, url, displayText, "_blank");
    editor.focus();
    setOpen(false);
  };

  return (
    <Popover {...item.popoverProps} open={open} withArrow key={item.key}>
      <PopoverTrigger>
        <ToolbarButton
          title={item.text}
          onClick={() => setOpen(!open)}
          appearance="subtle"
          icon={item.iconName ? IconFactory(item.iconName) : undefined}
        />
      </PopoverTrigger>
      <PopoverSurface tabIndex={-1}>
        <form onSubmit={handleSubmit}>
          <div className={classes.content}>
            <Label required htmlFor="url-input">
              URL
            </Label>
            <Input required type="url" id="url-input" value={url} onChange={(e) => setUrl(e.target.value)} />
            <Label required htmlFor="display-text-input">
              Display Text
            </Label>
            <Input
              required
              type="text"
              id="display-text-input"
              value={displayText}
              onChange={(e) => setDisplayText(e.target.value)}
            />
          </div>
          <div className={classes.buttonContainer}>
            <Button type="submit" appearance="primary">
              Insert
            </Button>
            <Button appearance="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </PopoverSurface>
    </Popover>
  );
};
