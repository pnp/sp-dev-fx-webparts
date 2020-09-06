import * as React from "react";
import styles from "./PersonalApps.module.scss";
import { IPersonalAppsProps } from "./IPersonalAppsProps";
import { IPersonalAppsState } from "./IPersonalAppsState";
import { escape } from "@microsoft/sp-lodash-subset";
import { AppItem } from "../components/AppItem/AppItem";
import { AppTile } from "../components/AppTile/AppTile";
import { FontIcon, Label } from "office-ui-fabric-react";
import { ManageApps } from "../components/ManageApps/ManageApps";
import { IListItem } from "./ManageApps/IListItem";
import dataservices from "../../../services/dataservices";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from "@microsoft/sp-core-library";
import { Customizer } from '@uifabric/utilities/lib/';
import {
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import { FormHelperText } from "@material-ui/core";
import strings from "PersonalAppsWebPartStrings";

export default class PersonalApps extends React.Component<
  IPersonalAppsProps,
  IPersonalAppsState
> {
  constructor(props: IPersonalAppsProps) {
    super(props);
    this.state = {
      showPanel: false,
      apps: [],
      isLoading: false,
      hasError: false,
      errorMessage: ""
    };
  }

  public async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true });
    try {
      const _listApps = await dataservices.getUserApps();
      this.setState({
        apps: _listApps,
        isLoading: false,
        hasError: false,
        errorMessage: ""
      });
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    }
  }

  private _onPanelDismiss = (apps: IListItem[], changed: boolean) => {
    if (changed) {
      this.setState({
        apps: apps,
        showPanel: false
      });
    } else {
      this.setState({
        showPanel: false
      });
    }
  }

  public render(): React.ReactElement<IPersonalAppsProps> {
    const { apps, isLoading, hasError, errorMessage } = this.state;
    const { view } = this.props;

    return (
      <>
       <Customizer settings={{ theme: this.props.themeVariant }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between"
          }}
        >
          <Label className={styles.title}>{this.props.title}</Label>
          <FontIcon
            iconName="PlayerSettings"
            title={"My Apps Settings"}
            className={styles.imageSetting}
            onClick={event => {
              event.preventDefault();
              this.setState({ showPanel: true });
            }}
          />
        </div>
        <div className={styles.personalApps}>
          {apps && apps.length == 0 && !isLoading && (
            <Placeholder
              iconName="AppIconDefaultList"
              iconText={strings.PlaceholderIconText}
              description={strings.PlaceHolderDescription}
              buttonLabel={strings.PlaceHolderButtonLabel}
              onConfigure={() => {
                this.setState({ showPanel: true });
              }}
            />
          )}
         
            {isLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%"
                }}
              >
                <Spinner size={SpinnerSize.medium} />
              </div>
            )}
            {hasError && (
              <MessageBar messageBarType={MessageBarType.error}>
                {errorMessage}
              </MessageBar>
            )}
            <div className={view == 'Tiles' ? styles.containerTiles : styles.containerItems }>
            {apps &&
              apps.length > 0 &&
              apps.map(item => {
                return (
                  <>
                    {view == "Tiles" ? (
                      <AppTile
                        title={item.name}
                        description={item.description}
                        iconName={item.iconName}
                        url={item.url}
                      />
                    ) : (
                      <AppItem
                        title={item.name}
                        description={item.description}
                        iconName={item.iconName}
                        url={item.url}
                      />
                    )}
                  </>
                );
              })}
            {this.state.showPanel && (
              <ManageApps
                onDismiss={this._onPanelDismiss}
                showPanel={this.state.showPanel}
                Apps={this.state.apps}
              />
            )}
          </div>
        </div>
        </Customizer>
      </>
    );
  }
}
