import * as React from 'react';
import styles from './OneDriveFinder.module.scss';
import { IOneDriveFinderProps } from './IOneDriveFinderProps';
import { IOneDriveFinderState } from './IOneDriveFinderState';
import { FileList } from '@microsoft/mgt-react';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Dropdown, IDropdownOption, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { AadHttpClient } from "@microsoft/sp-http";
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;
const iconStyles = { marginRight: '8px' };
const classNames = mergeStyleSets({
  itemLink: {
    textDecoration: 'none',
  },
  itemIcon: {
    fontSize: 25,
    height: 25,
    width: 25,
    margin: '0 25px',
  },
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      padding: 5,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.medium,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
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
    width: 100
  },
  label: {
  },
  root: {
    paddingLeft: 90
  }
};

const onRenderCaretDown = (): JSX.Element => {
  return <Icon iconName="PageRight" />;
};

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
  constructor(props: IOneDriveFinderProps, state: IOneDriveFinderState) {
    super(props);

    // Initialize the state of the component
    this.state = {
      breadcrumbItem: [],
      pageSize: 50,
      siteID: "",
      siteItems: [],
      itemID: ""
    };
    this.getDomainData();
  }

  public render(): React.ReactElement<IOneDriveFinderProps> {
    const { siteID, itemID, pageSize, breadcrumbItem, siteItems, } = this.state;
    this._itemID = itemID;
    this._siteID = siteID;
    this._breadcrumbItem = breadcrumbItem;
    return (
      <div>
        <div className={styles['some-page-wrapper']}>
          <div className={styles.row}>
            <div className={styles.column}>
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
                onChange={(e, selectedOption) => {
                  if (selectedOption.data.root == undefined) {
                    this._siteID = selectedOption.key.toString();
                    this.setState({
                      siteID: this._siteID,
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
                }}
              />
            </div>
            <div className={styles.column}>
              <Dropdown
                placeholder="50 Items"
                label="Filter Items"
                defaultValue={'50 Items'}
                styles={dropdownFilterStyles}
                options={[
                  { key: 5, text: '5 Items' },
                  { key: 10, text: '10 Items' },
                  { key: 50, text: '50 Items' },
                  { key: 100, text: '100 Items' },
                  { key: 500, text: '500 Items' },
                  { key: 1000, text: '1000 Items' },
                ]}
                onChange={(e, selectedOption) => {
                  let _pageSize: number = +selectedOption.key;
                  this._pageSize = _pageSize;
                  this.setState({
                    pageSize: _pageSize
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <Breadcrumb
            items={this._breadcrumbItem}
            maxDisplayedItems={10}
            ariaLabel="Breadcrumb with items rendered as buttons"
            overflowAriaLabel="More links"
          />
          {(this.state.itemID != "" || this.state.itemID != "") &&
            <FileList
              pageSize={pageSize}
              siteId={this._siteID}
              itemId={this._itemID}
              itemClick={this.manageFolder}
            ></FileList>
          }
        </div>
      </div>
    );
  }
  /**
   * 
   * @param e 
   * Capture file or folder and manages breadcrumb
   */
  private manageFolder = (e: any) => {
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
      window.open(e.detail.webUrl, '_blank');
    }
  }
  private getRootDriveFolderID = async (siteID) => {
    let graphData: any = await this.getGraphContent("https://graph.microsoft.com/v1.0/sites/" + siteID + "/drive/root://:/?$select=id");
    return graphData.id;
  }

  private getOneDriveRootFolderID = async (key) => {
    let graphData: any = await this.getGraphContent("https://graph.microsoft.com/v1.0/me/drive/items/" + key + "?$select=id");
    return graphData.id;
  }

  /**
   * Retrieves Folder item ID from Site or OneDrive
   */
  private getDrives = async (selectedOption: IDropdownOption) => {
    let itemID: any;
    if (selectedOption.data.root != undefined) {
      itemID = await this.getOneDriveRootFolderID(selectedOption.key)
    } else {
      itemID = await this.getRootDriveFolderID(selectedOption.key)
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
