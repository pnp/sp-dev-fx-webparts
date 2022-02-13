import * as React from "react";
import { PrimaryButton, DefaultButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { isEqual } from "lodash";
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { Box, Collapse, IconButton, Link, TableCell, TableRow } from "@material-ui/core";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

export interface IRowProps {
  columns: any[];
  row: any;
}

export interface IRowState {
  open: boolean;
}
export class Row extends React.Component<IRowProps, IRowState> {
  constructor(props: Readonly<IRowProps>) {
    super(props);
    this.state = {
      open: false
    };
  }

  public render(): React.ReactElement<IRowProps> {
    let { columns, row } = this.props;

    return (
      <>
        <TableRow>
          {
            columns.map(column => {
              return column.key == "Email" ?
                <TableCell align="left"><Link href={"mailto:" + row[column.key]}>{row[column.key]}</Link></TableCell>
                : column.key == "AllApplications" ?
                  <TableCell align="left">{
                   row[column.key].split(',').map((item,index) => {
                      return <>{index?", ":""}<Link style={{cursor:"pointer"}} onClick={()=>window.open("./Refer.aspx?itemid="+item)}>{item}</Link></>;
                    })}</TableCell> : <TableCell align="left">{row[column.key]}</TableCell>;
            })
          }
          <TableCell>
            <IconButton
              aria-label="expand row"
              onClick={() => { this.setState({ open: !this.state.open }); }}
            >
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={99}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {
                  <div style={{ width: "86%", float: "left" }}>{row['AttachmentFiles'].map(att => {
                    return <ActionButton iconProps={{ iconName: att.FileName.endsWith(".docx") ? "WordDocument" : "PDF" }} onClick={() => { window.open(att.ServerRelativeUrl + "?web=1"); }} allowDisabledFocus>
                      {att.FileName}
                    </ActionButton>;
                  })}</div>
                }
                <ActionButton onClick={()=>{window.open('./Refer.aspx?CId='+row.id);}} iconProps={{ iconName: "addFriend" }}>
                  Add To Application
                </ActionButton>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

}
