import * as React from "react";
import styles from "./ManageProfileCardProperties.module.scss";
import { IManageProfileCardPropertiesProps } from "./IManageProfileCardPropertiesProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { IManageProfileCardPropertiesState } from "./IManageProfileCardPropertiesState";
import { IListItem } from "../../Entities/IListItem";
import { MSGraphClient } from "@microsoft/sp-http";
import { ListCommandBar } from "../ListCommandBar/ListCommandBar";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import {
  loadTheme,
  mergeStyleSets,
  MessageBarType,
  FontIcon,
  Toggle,
  CustomizerContext,
  Customizer,
  MessageBar,
  Spinner,
  SpinnerSize,
} from "office-ui-fabric-react";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from "office-ui-fabric-react/lib/DetailsList";

import { useProfileCardProperties } from "../../hooks/useProfileCardProperties";
import { IProfileCardProperty } from "../../Entities/IProfileCardProperty";
import { AppContext, IAppContextProps } from "../../Common/AppContextProps";
import { AddProfileCardProperty } from "../AddProfileCardProperty/AddProfileCardProperty";
import { EditProfileCardProperty } from "../EditProfileCardProperty/EditProfileCardProperty";
import { DeleteProfileCardProperty } from "../DeleteProfileCardProperty/DeleteProfileCardProperty";

import strings from "ManageProfileCardPropertiesWebPartStrings";
// Style Component
const classNames = mergeStyleSets({
  commandBar: {
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
  },
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: "16px",
  },
  fileIconCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: ".",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden",
      },
    },
  },
  fileIconImg: {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px",
    height: "16px",
    width: "16px",
    fontSize: "16px",
  },
  fileIconImgHeader: {
    maxHeight: "16px",
    maxWidth: "16px",
    height: "16px",
    width: "16px",
    fontSize: "16px",
  },
  controlWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  centerColumn: { display: "flex", alignItems: "flex-start", height: "100%" },
});

export default class ManageProfileCardProperties extends React.Component<
  IManageProfileCardPropertiesProps,
  IManageProfileCardPropertiesState
> {
  private listFields: IColumn[] = [];
  private organizationId: string = undefined;
  private _selection: Selection;
  private msGrapClient: MSGraphClient;
  private applicationContext: IAppContextProps;

  constructor(props: IManageProfileCardPropertiesProps) {
    super(props);

    this.listFields = [
      {
        name: "",
        fieldName: "icon",
        isResizable: false,
        iconName: "TaskManager",
        isIconOnly: true,
        styles: { iconClassName: classNames.fileIconImgHeader },
        minWidth: 20,
        maxWidth: 20,
        key: "icon",
        onRender: (item: IListItem) => {
          return (
            <>
              <FontIcon
                iconName="TaskManager"
                className={classNames.fileIconImg}
                style={{ color: this.props.themeVariant.palette.themePrimary }}
              />
            </>
          );
        },
      },
      {
        key: "displayAttribute",
        name: "Directory Property Name",
        fieldName: "displayAttribute",
        isResizable: true,
        maxWidth: 210,
        minWidth: 150,
        isSorted: true,
        isSortedDescending: false,
        onColumnClick: this._onColumnClick,
      },
      {
        name: "Display Name",
        fieldName: "displayName",
        isResizable: true,
        maxWidth: 160,
        minWidth: 50,
        key: "displayName",
        onColumnClick: this._onColumnClick,
      },
      {
        name: "Nr Localizations",
        fieldName: "localizations",
        isResizable: true,
        maxWidth: 150,
        minWidth: 50,
        key: "loc",
        onColumnClick: this._onColumnClick,
      },
    ];

    this.state = {
      isLoading: true,
      hasError: false,
      errorMessage: undefined,
      listItems: [],
      listFields: this.listFields,
      selectedItem: undefined,
      displayDeletePanel: false,
      displayEditPanel: false,
      displayNewPanel: false,
    };

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectedItem: this._getSelectedItem(),
        });
      },
    });
  }

  //
  // Get Selected Item
  //
  private _getSelectedItem = (): IListItem => {
    const selectionCount = this._selection.getSelectedCount();
    switch (selectionCount) {
      case 0:
        return null;
      case 1:
        return this._selection.getSelection()[0] as IListItem;
      default:
        return null;
    }
  }

  //
  // Component did mount
  //

  public componentDidMount = async (): Promise<void> => {
    try {
      this.msGrapClient = await this.props.webpartContext.msGraphClientFactory.getClient();
      // const _aadclient  =  await this.props.webpartContext.aadTokenProviderFactory.getTokenProvider();
      this.setState({
        isLoading: true,
      });
      const { checkUserIsGlobalAdmin } = await useProfileCardProperties();
      const _isAdmin: Boolean = await checkUserIsGlobalAdmin(this.msGrapClient);
      if (!_isAdmin) {
        throw new Error(
          "To Manage Profile Card Properties the user must be Tenant Admin"
        );
      }

      this.organizationId = this.props.webpartContext.pageContext.aadInfo.tenantId;
      const _listItems = await this._getProfileCardProperties();
      this.applicationContext = {
        ...this.props,
        listItems: _listItems,
        msGraphClient: this.msGrapClient,
        organizationId: this.organizationId,
      };

      this.setState({
        listItems: _listItems,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        errorMessage: error.message,
        isLoading: false,
      });
      console.log(error);
    }
  }

  // Get Profile Properties
  //
  private _getProfileCardProperties = async (): Promise<IListItem[]> => {
    const _listItems: IListItem[] = [];
    const { getProfileCardProperties } = await useProfileCardProperties();
    const _profileCardProperties: IProfileCardProperty[] = await getProfileCardProperties(
      this.msGrapClient,
      this.organizationId
    );
    if (_profileCardProperties.length > 0) {
      for (const profileCardProperty of _profileCardProperties) {
        _listItems.push({
          key: profileCardProperty.directoryPropertyName,
          displayAttribute: profileCardProperty.directoryPropertyName,
          displayName: profileCardProperty.annotations[0].displayName,
          localizations: profileCardProperty.annotations[0].localizations.length.toString(),
        });
      }
    }
    return _listItems;
  }

  // On Column Click
  private _onColumnClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    const { listFields, listItems } = this.state;
    const newlistFields: IColumn[] = listFields.slice();
    const currColumn: IColumn = newlistFields.filter(
      (currCol) => column.key === currCol.key
    )[0];
    newlistFields.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = this._copyAndSort(
      listItems,
      currColumn.fieldName!,
      currColumn.isSortedDescending
    );
    this.setState({
      listFields: newlistFields,
      listItems: newItems,
    });
  }

  private _copyAndSort<T>(
    items: T[],
    columnKey: string,
    isSortedDescending?: boolean
  ): T[] {
    const key = columnKey as keyof T;
    return items
      .slice(0)
      .sort((a: T, b: T) =>
        (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
      );
  }

  // Callback from ListCommand
  private _onActionSelected = (option: string) => {
    switch (option) {
      case "New":
        this.setState({
          displayNewPanel: true,
        });
        break;
      case "Edit":
        this.setState({
          displayEditPanel: true,
        });
        break;
      case "Delete":
        this.setState({
          displayDeletePanel: true,
        });
        break;
      case "Refresh":
        this._onRefresh();
        break;
      default:
        break;
    }
  }

  // Reset sort Order columns to default
  private _resetSortOrder = () => {
    const { listFields } = this.state;
    let _copyListFields: IColumn[] = [];

    // Reset Sorted Fields
    for (const listField of listFields) {
      if (listField.fieldName == "displayAttribute") {
        _copyListFields.push({
          ...listField,
          isSorted: true,
          isSortedDescending: false,
        });
      } else {
        _copyListFields.push({
          ...listField,
          isSorted: false,
          isSortedDescending: false,
        });
      }
    }
    this.setState({ listFields: _copyListFields });
  }

  // On Refresh List
  private _onRefresh = async () => {
    this._resetSortOrder();
    this._selection.setAllSelected(false);
    this.setState({ isLoading: true, hasError: false, errorMessage: null });
    const _listItems = await this._getProfileCardProperties();
    // update Application context
    this.applicationContext = {
      ...this.applicationContext,
      listItems: _listItems,
    };
    // update State
    this.setState({
      listItems: _listItems,
      selectedItem: undefined,
      isLoading: false,
    });
  }

  // On Dismiss Panel
  private _onPanelDismiss = async (refresh: boolean) => {
    if (refresh) {
      this.setState({
        displayEditPanel: false,
        displayNewPanel: false,
        displayDeletePanel: false,
      });
      // refresh List
      await this._onRefresh();
    } else {
      this.setState({
        displayEditPanel: false,
        displayNewPanel: false,
        displayDeletePanel: false,
      });
    }
  }

  // Search List
  private _onSearch = async (value: string) => {
    const { listItems } = this.applicationContext; // gloabal Items store in Application Context

    let _filteredList: IListItem[] = [];
    // blank value refresh the list
    if (!value) {
      _filteredList = listItems.slice();
    } else {
      // Filter
      _filteredList = listItems.filter((item: IListItem) => {
        if (
          item.displayAttribute
            .toLocaleLowerCase()
            .indexOf(value.toLowerCase()) !== -1
        ) {
          return item;
        } else {
          if (
            item.displayName.toLowerCase().indexOf(value.toLowerCase()) !== -1
          ) {
            return item;
          } else {
            return; // don't exists
          }
        }
      });
    }

    this._resetSortOrder();
    this._selection.setAllSelected(false);
    this.setState({ listItems: _filteredList });
  }

  // Render Component
  public render(): React.ReactElement<IManageProfileCardPropertiesProps> {
    const {
      hasError,
      errorMessage,
      listItems,
      listFields,
      selectedItem,
      displayDeletePanel,
      displayEditPanel,
      displayNewPanel,
      isLoading,
    } = this.state;

    // Has Error
    if (hasError) {
      return (
        <MessageBar messageBarType={MessageBarType.error}>
          {errorMessage}
        </MessageBar>
      );
    }

    // Is loading
    if (isLoading) {
      return (
        <div style={{ paddingTop: 40 }}>
          <Spinner size={SpinnerSize.medium} label={strings.LoadingText} />
        </div>
      );
    }
    // Render
    return (
      <AppContext.Provider value={this.applicationContext}>
        <Customizer settings={{ theme: this.props.themeVariant }}>
          <WebPartTitle
            displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateProperty}
          />
          <ListCommandBar
            onSearch={this._onSearch}
            onActionSelected={this._onActionSelected}
            selectedItem={selectedItem}
          ></ListCommandBar>

          <DetailsList
            items={listItems}
            selection={this._selection}
            columns={listFields}
            selectionMode={SelectionMode.single}
            setKey="prf"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
          />

          {displayNewPanel && (
            <AddProfileCardProperty
              displayPanel={displayNewPanel}
              onDismiss={this._onPanelDismiss}
            ></AddProfileCardProperty>
          )}
          {displayEditPanel && (
            <EditProfileCardProperty
              displayPanel={displayEditPanel}
              directoryPropertyName={selectedItem.key}
              onDismiss={this._onPanelDismiss}
            ></EditProfileCardProperty>
          )}
          {displayDeletePanel && (
            <DeleteProfileCardProperty
              displayPanel={displayDeletePanel}
              directoryPropertyName={selectedItem.key}
              onDismiss={this._onPanelDismiss}
            ></DeleteProfileCardProperty>
          )}
        </Customizer>
      </AppContext.Provider>
    );
  }
}
