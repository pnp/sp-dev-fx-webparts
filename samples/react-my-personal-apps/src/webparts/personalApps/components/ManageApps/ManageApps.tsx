import * as React from "react";
import { useState, useEffect } from "react";
import { IManageAppsProps } from "../ManageApps/IManageAppsProps";
import { IManageAppsState } from "../ManageApps/IManageAppsState";
import MaterialTable, { Icons, MTableHeader } from "material-table";
import dataservices from "../../../../services/dataservices";
import * as strings from "PersonalAppsWebPartStrings";
import { IconPicker } from "../../../../controls/iconPicker";
import {
  FontIcon,
  TextField,
  Spinner,
  SpinnerSize,
  SpinnerType,
  Panel,
  PanelType,
  Text,
  Label,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react";

import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { IListItem } from "./IListItem";
import { Paper, CircularProgress } from "@material-ui/core";
import styles from "./ManageApps.module.scss";

initializeIcons();

const tableIcons: Icons = {
  Add: React.forwardRef((props, ref) => (
    <FontIcon iconName="AppIconDefaultAdd" style={{ fontWeight: 700 }} />
  )),
  Check: React.forwardRef((props, ref) => <Check />),
  Clear: React.forwardRef((props, ref) => <Clear />),
  Delete: React.forwardRef((props, ref) =>  <FontIcon iconName="Delete" style={{fontSize: 20}}  />),
  DetailPanel: React.forwardRef((props, ref) => <ChevronRight />),
  Edit: React.forwardRef((props, ref) => <FontIcon iconName="Edit"  style={{fontSize: 20}} />),
  Export: React.forwardRef((props, ref) => <SaveAlt />),
  Filter: React.forwardRef((props, ref) => <FilterList />),
  FirstPage: React.forwardRef((props, ref) => <FirstPage />),
  LastPage: React.forwardRef((props, ref) => <LastPage />),
  NextPage: React.forwardRef((props, ref) => <ChevronRight />),
  PreviousPage: React.forwardRef((props, ref) => <ChevronLeft />),

  ResetSearch: React.forwardRef((props, ref) => <Clear />),
  Search: React.forwardRef((props, ref) => <Search />),
  SortArrow: React.forwardRef((props, ref) => (
    <FontIcon iconName="Sort" style={{ marginLeft: 5 }} />
  )),
  ThirdStateCheck: React.forwardRef((props, ref) => <Remove />),
  ViewColumn: React.forwardRef((props, ref) => <ViewColumn />)
};

export function ManageApps(appProps: IManageAppsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [changeData, setChangeData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPanel, setShowPanel] = useState(appProps.showPanel);
  const [isSaving, setIsSaving] = useState(false);

  const [state, setState] = useState({
    columns: [
      {
        title: "Name ",
        field: "name",
        editComponent: props => (
          <TextField
            underlined
            required
            placeholder="Enter name here"
            onGetErrorMessage={(newValue: string) => {
              return newValue.trim().length > 0 ? "" : "Please enter name";
            }}
            validateOnFocusOut
            validateOnLoad={false}
            value={props.value}
            onChange={(event: React.FormEvent<HTMLInputElement>, newValue) => {
              props.onChange(newValue);
            }}
          />
        )
      },
      {
        title: "Derscription",
        field: "description",
        editComponent: props => (
          <TextField
            underlined
            required
            placeholder="Enter description here"
            validateOnFocusOut
            validateOnLoad={false}
            onGetErrorMessage={(newValue: string) => {
              return newValue.trim().length > 0
                ? ""
                : "Please enter Description";
            }}
            value={props.value}
            onChange={(event: React.FormEvent<HTMLInputElement>, newValue) => {
              props.onChange(newValue);
            }}
          />
        )
      },
      {
        title: "Url",
        field: "url",
        editComponent: props => (
          <TextField
            underlined
            required
            placeholder="Enter URL here"
            onGetErrorMessage={(newValue: string) => {
              try {
                const _URL = new URL(newValue);
                return "";
              } catch (error) {
                return "Please enter valid Url";
              }
            }}
            validateOnFocusOut
            validateOnLoad={false}
            value={props.value}
            onChange={(event: React.FormEvent<HTMLInputElement>, newValue) => {
              props.onChange(newValue);
            }}
          />
        )
      },
      {
        title: "Icon",
        field: "iconName",
        render: rowData => (
          <FontIcon
            iconName={rowData.iconName}
            style={{ width: 24, height: 24, fontSize: 24 }}
          />
        ),
        editComponent: props => (
          <div style={{ display: "Flex", flexDirection: "row" }}>
            {" "}
            <FontIcon
              iconName={props.value}
              style={{ width: 24, height: 24, fontSize: 24, marginRight: 7 }}
            />
            <IconPicker
              buttonLabel={" Select icon"}
              currentIcon={props.value}
              onSave={(iconName: string) => {
                props.onChange(iconName);
              }}
            />
          </div>
        )
      }
    ],
    data: appProps.Apps
  });

  // Load Schema Extension Data

  useEffect(() => {
    (async () => {
      // Get Tenant Property with id of Extension Id  to check if exists or needs to create
    })();
  });

  // Cancel command
  const _onDismiss = async () => {
    appProps.onDismiss(state.data, false);
  };

  // Save command
  const _onSave = async () => {
    try {
      setIsSaving(true);
      const _result: microsoftgraph.OpenTypeExtension = await dataservices.createOrUpdateUserApps(
        state.data
      );
      console.log("extention created or updated", _result);
      appProps.onDismiss(state.data, true);
    } catch (error) {
      setHasError(true);
      setErrorMessage(error.message);
    }
  };

  // Render Panel commands
  const _onRenderFooterContent = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        marginBottom: 35
      }}
    >
      <PrimaryButton
        onClick={_onSave}
        disabled={isSaving}

        style={{ marginRight: 7, width: 100 }}
      >
        {isSaving ? (
          <Spinner size={SpinnerSize.xSmall}></Spinner>
        ) : (
          strings.SaveLabelButtom
        )}
      </PrimaryButton>
      <DefaultButton style={{ width: 100 }} onClick={_onDismiss}>
        {strings.CancelLabelButton}
      </DefaultButton>
    </div>
  );

  return (
    <Panel
      isOpen={showPanel}
      onDismiss={_onDismiss}
      type={PanelType.custom}
      customWidth="888px"
      closeButtonAriaLabel="Close"
      headerText="My Apps"
      onRenderFooterContent={_onRenderFooterContent}
      isFooterAtBottom={true}
    >
      <div style={{ marginTop: 20, marginBottom: 25 }}>
        <Text variant="large" block>
          Please add links for your favorite apps
        </Text>
      </div>
      {hasError && (
        <MessageBar messageBarType={MessageBarType.error}>
          {errorMessage}
        </MessageBar>
      )}
      {isLoading ? (
        <Spinner size={SpinnerSize.medium} />
      ) : (
        <div style={{ height: "100%" }}>
          <MaterialTable
            title="My Apps"
            isLoading={false}
            columns={state.columns}
            components={{
              OverlayLoading: props => (
              <div className={styles.overlay}><CircularProgress  /></div>
              ),
              Container: props => (
                <Paper
                  {...props}
                  elevation={0}
                  classes={{ root: styles.MuiPaperRoot }}
                />
              )
            }}

            data={state.data}
            icons={tableIcons}
            options={{
              paging: true,
              showTitle:false,
              searchFieldAlignment:'left',
              pageSize: 7,
             pageSizeOptions: [],
              search: true,
              minBodyHeight: "100%"
            }}
            editable={{
              onRowAdd: (newData: IListItem) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    setChangeData(true);
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setChangeData(true);
                      setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;

                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    setChangeData(true);
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                })
            }}
          />
        </div>
      )}
    </Panel>
  );
}
