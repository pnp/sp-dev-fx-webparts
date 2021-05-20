import * as React from 'react';
import styles from './OneDriveFinder.module.scss';
import { IOneDriveFinderProps } from './IOneDriveFinderProps';
import { IOneDriveFinderState } from './IOneDriveFinderState';
import { FileList } from '@microsoft/mgt-react';
import { DialogFile } from './Dialog/DialogFile';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { AadHttpClient } from "@microsoft/sp-http";
import { ITheme, mergeStyleSets, getTheme } from 'office-ui-fabric-react/lib/Styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { MgtFileList, LocalizationHelper } from '@microsoft/mgt';

const theme: ITheme = getTheme();
const { palette, fonts } = theme;
const iconStyles = { marginRight: '8px' };
const classNames = mergeStyleSets({
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 5,
  },
});
const dropdownStyles = {
  dropdown: { width: 300 },
  root: {
  }
};
const dropdownFilterStyles = {
  dropdown: {
    width: 130
  },
  label: {
  },
  root: {
    paddingLeft: 50
  }
};

const onRenderCaretDown = (): JSX.Element => {
  return <Icon iconName="PageRight" />;
};

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

/**
 * 
 * @param option 
 * Render dropdown list of sites.
 */
const onRenderOption = (option: IDropdownOption): JSX.Element => {
  return (
    <div>
      <div>
        {option.data && option.data.icon && (
          <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
      <div className={classNames.itemIndex}>{option.data.webUrl}</div>

    </div>
  );
};

/**
 * Render Selected dropdown 
 */
const onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
  const option = options[0];

  return (
    <div>
      <div>
        {option.data && option.data.icon && (
          <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
        )}
        <span>{option.text}</span>
      </div>
      <div className={classNames.itemIndex}>{option.data.webUrl}</div>

    </div>
  );
};

const onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
  return (
    <div className="dropdownExample-placeholder">
      <span>{props.placeholder}</span>
    </div>
  );
};

export default class OneDriveFinder extends React.Component<IOneDriveFinderProps, IOneDriveFinderState> {
  public _domain: string;
  public _itemID: string;
  public _siteID: string;
  public _pageSize: number;
  public _breadcrumbItem: IBreadcrumbItem[] = [];
  public _customStyle: string;
  public _fileExtensions: string[] = null;
  public flref = React.createRef<MgtFileList>();

  constructor(props: IOneDriveFinderProps, state: IOneDriveFinderState) {
    super(props);
    // Initialize the state of the component

    this.state = {
      breadcrumbItem: [],
      pageSize: 50,
      siteID: "",
      siteItems: [],
      itemID: "",
      fileExtensions: [],
      customStyle: "",
      searchDrive: "",
      dialogFileStatus: false,
      dialogFile: null,
    };
    this.getDomainData();
  }

  public render(): React.ReactElement<IOneDriveFinderProps> {
    const CheckDrives = (event: React.FormEvent<HTMLDivElement>, selectedOption: IDropdownOption) => {

      if (selectedOption.data.root == undefined) {
        this._siteID = selectedOption.key.toString();
        this.setState({
          siteID: this._siteID,
          itemID: "",
          breadcrumbItem: this._breadcrumbItem
        });
      } else {
        this._siteID = "";
        this.setState({
          siteID: this._siteID,
          itemID: "",
          breadcrumbItem: this._breadcrumbItem
        });
      }
      this.getDrives(selectedOption);
    };

    const CheckPageSize = (event: React.FormEvent<HTMLDivElement>, selectedOption: IDropdownOption) => {
      let fileListpageSize: number;
      fileListpageSize = +selectedOption.key;
      this.setState({
        pageSize: fileListpageSize
      });
    };

    const checkFileExtensions = (event: React.FormEvent<HTMLDivElement>, selectedOption: IDropdownOption) => {
      let fileExtensions: string[] = [];
      if (selectedOption.selected == true) {
        fileExtensions.push(selectedOption.key.toString());
        fileExtensions = [...fileExtensions, ...this.state.fileExtensions];
      } else {
        fileExtensions = this.state.fileExtensions.filter(e => e !== selectedOption.key);
      }
      this.setState({
        fileExtensions: [...fileExtensions]
      });
    };

    const CheckStyles = (event: React.FormEvent<HTMLDivElement>, selectedOption: IDropdownOption) => {
      if (selectedOption.key == 2) {
        this.setState({
          customStyle: styles.mgtfilelist
        });
        LocalizationHelper.strings = {
          _components: {
            'file-list': {
              showMoreSubtitle: 'Take a pause ☕ and show more'
            },
            'file': {
              modifiedSubtitle: 'Once upon a time in this day ',
            }
          }
        };
      } else {
        this.setState({
          customStyle: selectedOption.text
        });
        LocalizationHelper.strings = {
          _components: {
            'file-list': {
              showMoreSubtitle: 'Show more items'
            },
            'file': {
              modifiedSubtitle: 'Modified ',
            }
          }
        };
      }
    };

    const checkSearchDrive = (SearchQuery: string) => {
      if (this.state.siteID != "") {
        this.setState({
          searchDrive: "/sites/" + this.state.siteID + "/drive/root/search(q='" + SearchQuery + "')"
        });
      } else {
        this.setState({
          searchDrive: "/me/drive/root/search(q='" + SearchQuery + "')"
        });
      }
    };
    const checkClear = (ev: any) => {
      this.setState({
        searchDrive: ""
      });
    };
    const selectFile = (selectedFile: any) => {
      console.log(selectedFile.detail);
      this.setState({
        dialogFileStatus: true,
        dialogFile: selectedFile.detail,
      });
    };

    const { siteID, itemID, pageSize, breadcrumbItem, siteItems, fileExtensions, searchDrive, customStyle } = this.state;
    this._itemID = itemID;
    this._siteID = siteID;
    this._breadcrumbItem = breadcrumbItem;
    this._pageSize = pageSize;
    this._customStyle = customStyle;
    if (fileExtensions.length != 0) {
      this._fileExtensions = fileExtensions;
    }
    else {
      this._fileExtensions = null;
    }

    return (
      <div>
        <div className={styles.pageWrapper}>
          <div className={styles.row}>
            <div className={styles.column}>
              <Dropdown
                placeholder="default"
                label="Styles"
                options={[
                  { key: 0, text: 'default' },
                  { key: 1, text: 'mgt-dark' },
                  { key: 2, text: 'Custom-mgt-file-list' },
                ]}
                styles={{ dropdown: { width: 300 } }}
                onChange={CheckStyles}
              />
              <Dropdown
                placeholder="Select an Site"
                label="List of Drives"
                ariaLabel="Custom dropdown example"
                onRenderPlaceholder={onRenderPlaceholder}
                onRenderOption={onRenderOption}
                onRenderTitle={onRenderTitle}
                onRenderCaretDown={onRenderCaretDown}
                styles={dropdownStyles}
                options={siteItems}
                onChange={CheckDrives}
              />
            </div>
            <div className={styles.column}>
              <Dropdown
                placeholder="50 Items"
                label="Filter Items"
                options={[
                  { key: 5, text: '5 Items' },
                  { key: 10, text: '10 Items' },
                  { key: 50, text: '50 Items' },
                  { key: 100, text: '100 Items' },
                  { key: 500, text: '500 Items' },
                  { key: 1000, text: '1000 Items' },
                ]}
                onChange={CheckPageSize}
                styles={dropdownFilterStyles}
              />
              <Dropdown
                placeholder="Select"
                label="Select file extensions"
                multiSelect
                options={[
                  { key: "", text: 'folder' },
                  { key: "docx", text: 'docx' },
                  { key: "xlsx", text: 'xlsx' },
                  { key: "pptx", text: "pptx" },
                  { key: "one", text: "one" },
                  { key: "pdf", text: "pdf" },
                  { key: "txt", text: "txt" },
                  { key: "jpg", text: "jpg" },
                  { key: "gif", text: "gif" },
                  { key: "png", text: "png" },
                ]}
                onChange={checkFileExtensions}
                styles={dropdownFilterStyles}
              />

            </div>
          </div>
        </div>
        <div>
          <IconButton iconProps={{ iconName: 'Refresh' }} text="Refresh cache" onClick={this.refreshMGTControl} allowDisabledFocus disabled={false} checked={false} ></IconButton>
        </div>
        <div>

          <Breadcrumb
            items={this._breadcrumbItem}
            maxDisplayedItems={10}
            ariaLabel="Breadcrumb with items rendered as buttons"
            overflowAriaLabel="More links"
          />
          {(this.state.breadcrumbItem.length > 0) &&
            <Stack tokens={stackTokens}>
              <SearchBox style={{ width: "90%" }} placeholder="Search Drive" onSearch={checkSearchDrive} onClear={checkClear} />
            </Stack>
          }
          {(this.state.itemID != "" && this.state.searchDrive == "") &&
            <FileList
              ref={this.flref}
              className={this._customStyle}
              fileExtensions={this._fileExtensions}
              pageSize={this._pageSize}
              siteId={this._siteID}
              itemId={this._itemID}
              itemClick={this.manageFolder}
            >
            </FileList>
          }
          {(this.state.searchDrive != "") &&
            <FileList

              className={this._customStyle}
              fileExtensions={this._fileExtensions}
              pageSize={this._pageSize}
              fileListQuery={searchDrive}
              itemClick={selectFile}
            >
            </FileList>
          }
          <DialogFile

            className={this._customStyle}
            open={this.state.dialogFileStatus}
            fileItem={this.state.dialogFile}
            onClose={() => {
              this.setState({
                dialogFileStatus: false
              });
            }}
          ></DialogFile>
        </div>
      </div>
    );
  }

  private refreshMGTControl = (): void => {
    this.flref.current.reload(true);
  }

  /**
   * 
   * @param e 
   * Capture file or folder and manages breadcrumb
   */
  private manageFolder = (e: any) => {
    console.log(e.detail);
    if (e.detail.folder != undefined) {
      this._breadcrumbItem.push({
        text: e.detail.name,
        key: e.detail.id,
        onClick: (event, item) => {
          let _cleanBreadcrumbItems: IBreadcrumbItem[] = [];
          var i = 0;
          this._breadcrumbItem.some((value) => {
            if (i == 0) {
              _cleanBreadcrumbItems.push(value);
              if (value.key === item.key) {
                i++;
              }
            }
          });
          this._itemID = e.detail.id;
          this.setState({
            itemID: item.key,
            breadcrumbItem: _cleanBreadcrumbItems
          });
        }
      });

      this.setState({
        itemID: e.detail.id,
        breadcrumbItem: this._breadcrumbItem
      });
    } else {
      this.setState({
        dialogFileStatus: true,
        dialogFile: e.detail,
      });
    }
  }
  private getRootDriveFolderID = async (siteID) => {
    let graphData: any = await this.getGraphContent("https://graph.microsoft.com/v1.0/sites/" + siteID + "/drive/root://:/?$select=id");
    return graphData.id;
  }

  private getOneDriveRootFolderID = async (ItemId) => {
    let graphData: any = await this.getGraphContent("https://graph.microsoft.com/v1.0/me/drive/items/" + ItemId + "?$select=id");
    return graphData.id;
  }

  /**
   * Retrieves Folder item ID from Site or OneDrive
   */
  private getDrives = async (selectedOption: IDropdownOption) => {
    let itemID: any;
    if (selectedOption.data.root != undefined) {
      itemID = await this.getOneDriveRootFolderID(selectedOption.key);
    } else {
      itemID = await this.getRootDriveFolderID(selectedOption.key);
    }

    this._breadcrumbItem = [];
    this._breadcrumbItem.push({
      text: selectedOption.text,
      key: itemID,
      onClick: (e, item) => {
        let _cleanBreadcrumbItems: IBreadcrumbItem[] = [];
        var i = 0;
        this._breadcrumbItem.some((value) => {
          if (i == 0) {
            _cleanBreadcrumbItems.push(value);
            if (value.key === item.key) {
              i++;
            }
          }
        });
        this._itemID = itemID;
        this.setState({
          itemID: itemID,
          breadcrumbItem: _cleanBreadcrumbItems
        });
      }
    });
    this.setState(
      {
        breadcrumbItem: this._breadcrumbItem,
        itemID: itemID
      });
  }
  /**
   * Retrieve domain name
   */
  private getDomainData = async () => {
    let graphData: any = await this.getGraphContent("https://graph.microsoft.com/v1.0/sites/root?$select=siteCollection");
    this.getSiteData(graphData);
  }
  /**
   * 
   * @param DomainData 
   * Retrieves sites from domain
   */
  private getSiteData = async (DomainData) => {

    let MyDriveData: any = await this.getGraphContent("https://graph.microsoft.com/v1.0/me/drive/root/?$Select=id,name,displayName,webUrl");

    let graphData: any = await this.getGraphContent("https://graph.microsoft.com/v1.0/sites?search=" + escape(DomainData.siteCollection.hostname.split(".")[0]) + ".sharepoint&$Select=id,name,displayName,webUrl");
    var sharedSitesOptions: Array<IDropdownOption> = new Array<IDropdownOption>();

    // Map the JSON response to the output array
    graphData.value.map((item: any) => {

      sharedSitesOptions.push({
        key: item.id,
        text: item.displayName,
        data: { icon: 'Globe', webUrl: item.webUrl.split("sharepoint.com")[1] }
      });
    });

    //Sort by Web url 
    sharedSitesOptions = sharedSitesOptions.sort((Option1, Option2) => {
      if (Option1.data.webUrl > Option2.data.webUrl) {
        return 1;
      }

      if (Option1.data.webUrl < Option2.data.webUrl) {
        return -1;
      }

      return 0;
    });

    //OneDrive Folder is added as First on List
    sharedSitesOptions.unshift({
      key: MyDriveData.id,
      text: MyDriveData.name,
      data: { icon: 'OneDriveFolder16', webUrl: MyDriveData.webUrl.split("sharepoint.com")[1], root: true }
    });

    // Update the component state accordingly to the result
    this.setState(
      {
        siteItems: sharedSitesOptions,
      }
    );
  }
  /**
  * Method to Connect Graph 
  */
  private getGraphContent = (graphQuery: string) => {

    // Using Graph here, but any 1st or 3rd party REST API that requires Azure AD auth can be used here.
    return new Promise<any>((resolve, reject) => {
      this.props.context.aadHttpClientFactory
        .getClient("https://graph.microsoft.com")
        .then((client: AadHttpClient) => {
          // Querys to Graph base on url
          return client
            .get(
              `${graphQuery}`,
              AadHttpClient.configurations.v1
            );
        })
        .then(response => {
          return response.json();
        })
        .then(json => {
          resolve(json);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }
}
