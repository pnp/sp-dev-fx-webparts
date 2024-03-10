/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import styles from "../styles/PersonalToolsListWebpart.module.scss";
import type { IMyToolsProps, ITool } from "../models";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SelectToolList from "./SelectToolsList";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { StyledDialog } from "../styles/muiMaterialStyles";
import Dialog from "@mui/material/Dialog";
import { getSelectableTools, getUsersTools, updateUsersTools } from "../data/apiHelper";

const MyTools: React.FC<
  IMyToolsProps
> = (props) => {
  /** === USE STATE HOOKS === */
  const [open, setOpen] = React.useState(false);
  const [myTools, setMyTools] = React.useState<Array<ITool>>([]);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );
  const [selectableTools, setSelectableTools] = React.useState<Array<ITool>>(
    []
  );

  /** === VARIABLES === */
  const errorMsgNotFound = "Could not find any tools saved for your user. Select 'Edit' to add some tools to this list.";
  const errorMsgOnSave = "Something went wrong when saving your tools. Please try again or contact support.";

  /** === USE EFFECT HOOKS === */
  React.useEffect(() => {
    (async () => {
      await initListData();
    })();
  }, [props]);

  React.useEffect(() => {
    if (myTools.length > 0 && errorMessage) {
      setErrorMessage(undefined);
    }
    if (myTools.length === 0) {
      setErrorMessage(
        errorMsgNotFound
      );
    }
  }, [myTools]);

  /** === FUNCTIONS === */
  async function initListData(): Promise<void> {
    if (props.wpLists?.personalToolsList && props.wpSite?.url) {
      const tmpTools = await getUsersTools(props.context, props.userEmail, { list: props.wpLists.personalToolsList, siteUrl: props.wpSite.url });
      if (tmpTools) {
        setMyTools(tmpTools);
      } else {
        setErrorMessage(
          errorMsgNotFound
        );
      }
    }
    if (props.wpLists?.availableToolsList && props.wpSite?.url) {
      const tmpSelectTools = await getSelectableTools(props.context, { list: props.wpLists.availableToolsList, siteUrl: props.wpSite.url });
      if (tmpSelectTools) {
        setSelectableTools(tmpSelectTools);
      }
    }
  }

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleSave = (checked: Array<ITool>): void => {
    setOpen(false);
    (async () => {
      const updateSucess = await updateUsersTools(
        props.context,
        checked,
        props.userEmail,
        { list: props.wpLists?.personalToolsList, siteUrl: props.wpSite?.url }
      );
      if (updateSucess) {
        const userTools = await getUsersTools(props.context, props.userEmail, { list: props.wpLists?.personalToolsList, siteUrl: props.wpSite?.url });
        if (userTools) {
          setMyTools(userTools);
        } else {
          setErrorMessage(
            errorMsgNotFound
          );
        }
      } else {
        setErrorMessage(
          errorMsgOnSave
        );
      }
    })();
  };

  /** === TSX === */
  return (
    <section
      className={`${styles.personalToolsListWebpart} ${props.hasTeamsContext ? styles.teams : ""
        }`}
    >
      <Grid style={{ width: "100%", borderBottom: "1px solid #333" }} container>
        <Grid item xs={12} md={8}>
          <h2 style={{ marginTop: "0" }}>
            {props.wpTitle ? props.wpTitle : "My tools"}
          </h2>
        </Grid>
        <Grid style={{ textAlign: "right" }} item xs={12} md={4}>
          <Button
            style={{ textTransform: "none" }}
            variant="outlined"
            onClick={handleClickOpen}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
      <Dialog
        onClose={handleClose}
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Select tools
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <SelectToolList
            handleSave={handleSave}
            myTools={myTools}
            selectableTools={selectableTools}
          />
        </DialogContent>
      </Dialog>
      {errorMessage ? <div>{errorMessage}</div> : null}
      <Grid container>
        {myTools?.map((t) => {
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={props.twoColumns ? 6 : 12}
              style={{
                padding: "10px 0",
                fontSize: "16px",
                borderBottom: "0.5px solid #D3D3D3",
              }}
              key={t.key}
            >
              <ChevronRightIcon
                style={{ marginLeft: "-8px", marginBottom: "-6px" }}
              />
              <a
                style={{ textDecoration: "none", color: "black" }}
                href={t.toolUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t.toolName}
              </a>
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default MyTools;