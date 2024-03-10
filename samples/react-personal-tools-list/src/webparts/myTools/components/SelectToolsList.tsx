/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import {
  Button,
  Checkbox,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ITool } from "../models";
interface ISelectToolList {
  handleSave: any;
  myTools: Array<ITool>;
  selectableTools: Array<ITool>;
}
const SelectToolList: React.FC<ISelectToolList> = (props) => {
  const [checked, setChecked] = React.useState<Array<ITool>>(props.myTools);

  const handleToggle = (tool: ITool) => () => {
    const alreadySelected = checked.some((t) => t.key === tool.key);
    const newChecked = [...checked];

    if (!alreadySelected) {
      newChecked.push(tool);
      setChecked([...newChecked]);
    } else {
      const tmp = checked.filter((t) => t.key !== tool.key);
      setChecked([...tmp]);
    }
  };

  const tools = props.selectableTools.map((tool) => (
    <ListItem style={{ padding: "5px 0" }} key={tool.key} disablePadding>
      <ListItemButton role={undefined} onClick={handleToggle(tool)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.some((t) => t.key === tool.key)}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": tool.toolName }}
          />
        </ListItemIcon>
        <ListItemText id={tool.toolName} primary={tool.toolName} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {tools.length > 0 ? tools : "No tools found. Please contact support."}
      </List>
      {tools.length > 0 && <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            props.handleSave(checked);
          }}
        >
          Save changes
        </Button>
      </DialogActions>}
    </>
  );
};
export default SelectToolList;
