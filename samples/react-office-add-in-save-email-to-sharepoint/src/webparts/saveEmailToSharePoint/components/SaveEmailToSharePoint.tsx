import * as React from 'react';
import styles from './SaveEmailToSharePoint.module.scss';
import { ISaveEmailToSharePointProps } from './ISaveEmailToSharePointProps';
import { SearchResults } from "@pnp/sp/search";
import { Icon, Dropdown, IDropdownOption, IDropdownStyles, PrimaryButton, Label, IDropdownProps, Link, MessageBar, MessageBarType, MessageBarButton } from 'office-ui-fabric-react';
import Services from './Services/Services';
import * as strings from 'SaveEmailToSharePointWebPartStrings';


const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
interface SaveEmailToSharePointState {
  allSites: any;
  selectedSite: any;
  allLibraries: any;
  selectedLibrary: any;
  savedLink: string;
  rootURL: string;
  errMsg: string;
}
export default class SaveEmailToSharePoint extends React.Component<ISaveEmailToSharePointProps, SaveEmailToSharePointState> {
  private services = new Services();
  constructor(props: ISaveEmailToSharePointProps, state: SaveEmailToSharePointState) {
    super(props);
    this.state = {
      allSites: null,
      selectedSite: null,
      allLibraries: null,
      selectedLibrary: null,
      savedLink: '',
      rootURL: '',
      errMsg: ''
    };
  }
  public componentWillMount() {
    this.getAllSites();
    this.getRootURL();
  }

  public getRootURL = () => {
    this.services.getRootSiteURL().then((rootURL) => {
      this.setState({
        rootURL: rootURL
      });
    });
  }
  private saveToLibrary = (file) => {
    let filename = Office.context.mailbox.item.subject + ".eml";
    this.services.saveFileToSP(this.state.selectedSite.key, this.state.selectedLibrary.key, filename, file).then((result) => {
      console.log(result.data.ServerRelativeUrl);
      this.setState({
        savedLink: this.state.rootURL + result.data.ServerRelativeUrl + "?web=1",
        errMsg:''
      });
    }).catch((err) => {
      this.setState({
        errMsg: this.parseErr(err.message),
        savedLink:''
      });
    });
  }
  public getAllSites = () => {
    this.services.getSiteNames().then((allSiteResults: SearchResults) => {
      console.log(allSiteResults.PrimarySearchResults);
      let allsite = [];
      allSiteResults.PrimarySearchResults.forEach(element => {
        let siteValue = { key: element.Path, text: element.Title };
        allsite.push(siteValue);
      });
      this.setState({
        allSites: allsite
      });
    });
  }
  public getCurrentEmailContent = () => {
    let id = Office.context.mailbox.item.itemId;
    this.services.getEmailContent(this.props.context, id).then((response: any) => {
      this.saveToLibrary(response);
    }).catch((err) => {
      this.setState({
        errMsg: "Graph API error: " + this.parseErr(err.message),
        savedLink:''
      });
    });
  }
  public parseErr(msg:string){
    return JSON.parse(msg.substring(msg.indexOf('"message"')+10,msg.length-2)).value;
  }
  public OnSelectSite = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
    this.services.getAllDocumentLibary(item.key.toString()).then((libraries) => {
      if (libraries.length) {
        let allLib = [];
        libraries.forEach(element => {
          let library = { key: element.ServerRelativeUrl, text: element.Title };
          allLib.push(library);
        });
        this.setState({
          selectedSite: item,
          allLibraries: allLib
        });
      } else {
        this.setState({
          selectedSite: item,
          savedLink: '',
          errMsg: ''
        });
      }
    });

  }
  public OnSelectLibrary = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
    this.setState({
      selectedLibrary: item,
      savedLink: ''
    });
  }
  public render(): React.ReactElement<ISaveEmailToSharePointProps> {
    return (
      <div className={styles.saveEmailToSharePoint} >
        <div className={styles.row}>
          {this.state.allSites ? <Dropdown
            label={strings.SiteLabel}
            selectedKey={this.state.selectedSite ? this.state.selectedSite.key : undefined}
            onChange={this.OnSelectSite}
            placeholder={strings.SitePlaceHolder}
            options={this.state.allSites}
            styles={dropdownStyles}
            className={styles.column}
            onRenderPlaceholder={this.onRenderforSite}
          /> : null}
        </div>
        <div className={styles.row}>
          {this.state.allLibraries ? <Dropdown
            label={strings.LibraryLabel}
            selectedKey={this.state.selectedLibrary ? this.state.selectedLibrary.key : undefined}
            onChange={this.OnSelectLibrary}
            placeholder={strings.LibraryPlaceHolder}
            options={this.state.allLibraries}
            styles={dropdownStyles}
            className={styles.column + " ms-fadeIn200"}
            onRenderPlaceholder={this.onRenderforLib}
          /> : null}
        </div>
        <div className={styles.row}>
          <PrimaryButton
            text={strings.Save}
            disabled={this.state.selectedLibrary ? false : true}
            className={styles.column + " btnSave"}
            onClick={this.getCurrentEmailContent} />

          <PrimaryButton
            text={strings.Cancel}
            className={styles.column + " btnCancel"}
            onClick={() => { Office.context.ui.closeContainer(); }} />
        </div>
        <div className={styles.row}>
          {this.state.savedLink.length ?
            <MessageBar
              messageBarType={MessageBarType.success}
              isMultiline={true}
              onDismiss={null}
              className={styles.successMsg}
              dismissButtonAriaLabel="Close"
              actions={
                <div>
                  <MessageBarButton onClick={()=>window.open(this.state.savedLink,'_blank')}>OK</MessageBarButton>
                </div>
              }>
                {strings.PreviewMessage.replace("{libName}", this.state.selectedLibrary.text)}
            </MessageBar>
            : null}
          {this.state.errMsg.length ? <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={true}
            onDismiss={null}
            className={styles.errMsg}
            dismissButtonAriaLabel="Close">
            {this.state.errMsg}
          </MessageBar>
            : null}
        </div>
      </div>
    );
  }
  public onRenderforLib = (props: IDropdownProps): JSX.Element => {
    return (
      <React.Fragment>
        <Icon iconName="DocLibrary" className={styles.iconStyle} />
        <span >{props.label}</span>
      </React.Fragment>
    );
  }
  public onRenderforSite = (props: IDropdownProps): JSX.Element => {
    return (
      <React.Fragment>
        <Icon iconName="Website" className={styles.iconStyle} />
        <span >{props.label}</span>
      </React.Fragment>
    );
  }
}
