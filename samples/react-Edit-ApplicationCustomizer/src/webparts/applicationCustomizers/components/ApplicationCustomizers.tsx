import * as React from 'react';
import styles from './ApplicationCustomizers.module.scss';
import { IApplicationCustomizersProps } from './IApplicationCustomizersProps';
import { assign } from '@microsoft/sp-lodash-subset';
import ApplicationCustomizersService from "../service/ApplicationCustomizersService";
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { withStyles } from '@material-ui/core/styles';
import { DefaultButton, TextField, thProperties, Dialog, DialogFooter, DialogType, List, mergeStyleSets, getFocusStyle, ITheme, getTheme, IconButton, Panel, PanelType } from 'office-ui-fabric-react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((themes) => ({
  root: {
    padding: themes.spacing(2),
    display: 'block'
  },
}))(MuiAccordionDetails);
const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;
const classNames = mergeStyleSets({
  container: {
    overflow: 'auto',
    maxHeight: 500,
  },
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
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
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'black'
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    marginBottom: 10,
    color: 'black'
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0,
  },
});

const applicationCustomizersService = new ApplicationCustomizersService();

export interface IApplicationCustomizersState {
  selectedItem: IDropdownOption;
  dropdownSites: IDropdownOption[];
  expanded: string | false;
  allCustomizers: any;
  previousEditIndex?: number;
  editJSON?: { Title: string; Description: string; ClientSideComponentProperties: any };
  hideDialog: boolean;
  dialogContentProps?: any;
  isPanelOpen: boolean;
  itemInEdit?: number;
  isViewPanelOpen: boolean;
  viewJSON?: {
    Title: string; Description: string; ClientSideComponentId: any;
    ClientSideComponentProperties: any; Id: any;
  };
}

export default class ApplicationCustomizers extends React.Component<IApplicationCustomizersProps, IApplicationCustomizersState> {

  constructor(props: IApplicationCustomizersProps) {
    super(props);
    this.state = {
      selectedItem: undefined,
      dropdownSites: undefined,
      expanded: 'panel1',
      allCustomizers: [],
      previousEditIndex: undefined,
      hideDialog: true,
      isPanelOpen: false,
      isViewPanelOpen: false
    };
  }


  public componentDidMount() {
    applicationCustomizersService.fetchAllApplictionCustomizers(this.props.context.pageContext.web.absoluteUrl)
      .then((allCustomizers) => {
        allCustomizers = allCustomizers.map((cus) => { return assign(cus, { inEdit: false }); });
        this.setState({ allCustomizers: allCustomizers });
      }).catch((err) => {
        console.log(err);
      });
    applicationCustomizersService.getAllSiteCollection()
      .then((allSites) => {
        let dropdownSites = allSites.PrimarySearchResults.map((val) => {
          val['key'] = val['SPSiteUrl'];
          val['text'] = `${val['Title']} - ${val['SPSiteUrl']}`;
          return val;
        });
        this.setState({ dropdownSites: dropdownSites });
      });
  }

  private onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    this.setState({ selectedItem: item });
    applicationCustomizersService.fetchAllApplictionCustomizers(item.key as string)
      .then((allCustomizers) => {
        allCustomizers = allCustomizers.map((cus) => { return assign(cus, { inEdit: false }); });
        this.setState({ allCustomizers: allCustomizers });
      }).catch((err) => {
        console.log(err);
      });
  }

  public handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    this.setState({ expanded: newExpanded ? panel : false });
  }

  public editCustomApplication = (index: number, inEdit: boolean) => {
    let allCustomizers = this.state.allCustomizers;
    allCustomizers[index].inEdit = inEdit;
    if (this.state.previousEditIndex !== undefined && inEdit) {
      allCustomizers[this.state.previousEditIndex].inEdit = false;
    }
    if (inEdit) {
      this.setState({
        isPanelOpen: this.props.designType === "List" ? true : false,
        itemInEdit: index,
        editJSON: {
          Title: allCustomizers[index].Title,
          Description: allCustomizers[index].Description,
          ClientSideComponentProperties: allCustomizers[index].ClientSideComponentProperties
        }
      });
    }
    if (!inEdit) {
      this.setState({ isPanelOpen: false });
    }
    this.setState({ allCustomizers: allCustomizers, previousEditIndex: index });
  }

  public onChangeJSON = (obj: string, newValue: string) => {
    let { editJSON } = this.state;
    editJSON[obj] = newValue;
    this.setState({ editJSON });
  }

  public updateCustomizer = (index: number) => {
    let webURL = this.state.selectedItem ? this.state.selectedItem.key : this.props.context.pageContext.web.absoluteUrl;
    let { allCustomizers } = this.state;
    applicationCustomizersService.updateApplicationCustomizer(webURL, this.state.allCustomizers[index].Id, this.state.editJSON)
      .then(() => {
        allCustomizers[index].inEdit = false;
        this.setState({
          allCustomizers: allCustomizers,
          hideDialog: false,
          isPanelOpen: false,
          dialogContentProps: {
            type: DialogType.normal,
            title: 'Updated Successfully',
            closeButtonAriaLabel: 'Close',
            subText: 'Your Customizer is updated. Please refresh the page to look at the changes?'
          }
        });
      }).catch((err) => {
        this.setState({
          hideDialog: false,
          dialogContentProps: {
            type: DialogType.normal,
            title: 'Updat Error',
            closeButtonAriaLabel: 'Close',
            subText: 'There was some error while updating you customizer. Please try again'
          }
        });
      });
  }

  private toggleHideDialog = () => {
    applicationCustomizersService.fetchAllApplictionCustomizers(this.state.selectedItem ?
      this.state.selectedItem.key as string : this.props.context.pageContext.web.absoluteUrl)
      .then((allCustomizers) => {
        allCustomizers = allCustomizers.map((cus) => { return assign(cus, { inEdit: false }); });
        this.setState({ allCustomizers: allCustomizers, hideDialog: true });
      }).catch((err) => {
        console.log(err);
      });
  }

  private viewCustomApplication = (index: number) => {
    let { allCustomizers } = this.state;
    this.setState({
      isViewPanelOpen: true,
      viewJSON: {
        Title: allCustomizers[index].Title,
        ClientSideComponentId: allCustomizers[index].ClientSideComponentId,
        ClientSideComponentProperties: allCustomizers[index].ClientSideComponentProperties,
        Description: allCustomizers[index].Description,
        Id: allCustomizers[index].Id
      }
    });

  }

  private onRenderCell = (item: any, index: number, isScrolling: boolean): JSX.Element => {
    return (
      <div className={classNames.itemCell} data-is-focusable={true}>
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>{item.Title}</div>
          <div className={classNames.itemIndex}>{item.Description}</div>
        </div>
        <IconButton iconProps={{ iconName: 'View' }} onClick={() => { this.viewCustomApplication(index); }} title="View" ariaLabel="View"></IconButton>
        <IconButton iconProps={{ iconName: 'Edit' }} onClick={() => { this.editCustomApplication(index, true); }} title="Edit" ariaLabel="Edit"></IconButton>
      </div>
    );
  }


  public render(): React.ReactElement<IApplicationCustomizersProps> {
    return (
      <div className={styles.applicationCustomizers}>
        <div className={styles.container}>
          <div className={styles.row}>
            <h1>{this.props.description}</h1>
          </div>
          <div className={styles.row}>
            <Dropdown
              label="Select Web"
              selectedKey={this.state.selectedItem ? this.state.selectedItem.key : undefined}
              onChange={this.onChange}
              placeholder="Select an option"
              options={this.state.dropdownSites}
            />
          </div>
          {this.props.designType === "Accordion" && this.state.allCustomizers.length !== 0 &&
            <div className={styles.row}>
              {this.state.allCustomizers.map((customizer, index) => {
                return (
                  <Accordion square expanded={this.state.expanded === `panel${index + 1}`} onChange={this.handleChange(`panel${index + 1}`)}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                      <div>{customizer.Title}{customizer.Description && ` - ${customizer.Description}`}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {!customizer.inEdit ?
                        <div>
                          <div className={styles.column2}>Component ID</div>
                          <div className={styles.column}>{customizer.ClientSideComponentId}</div>
                          <div className={styles.column2}>ID</div>
                          <div className={styles.column}>{customizer.Id}</div>
                          <div className={styles.column2}>Properties</div>
                          <div className={styles.column}>{customizer.ClientSideComponentProperties}</div>
                        </div> :
                        <div>
                          <div className={styles.column2}>Title</div>
                          <div className={styles.column}><TextField value={this.state.editJSON.Title}
                            onChange={(ev, newVal) => {
                              this.onChangeJSON("Title", newVal);
                            }} />
                          </div>
                          <div className={styles.column2}>Description</div>
                          <div className={styles.column}><TextField value={this.state.editJSON.Description} multiline rows={3}
                            onChange={(ev, newVal) => {
                              this.onChangeJSON("Description", newVal);
                            }} /></div>
                          <div className={styles.column2}>Properties</div>

                          <div className={styles.column}>
                            <AceEditor
                              placeholder="Placeholder Text"
                              mode="json"
                              theme="github"
                              onChange={(val) => { this.onChangeJSON("ClientSideComponentProperties", val); }}
                              fontSize={14}
                              style={{ height: 200, width: 790 }}
                              showPrintMargin={true}
                              showGutter={true}
                              highlightActiveLine={false}
                              value={this.state.editJSON.ClientSideComponentProperties}
                              setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                              }} />
                          </div>
                        </div>
                      }
                      {!customizer.inEdit ?
                        <DefaultButton className={styles.button} text="Edit" onClick={() => { this.editCustomApplication(index, true); }} /> :
                        [<DefaultButton className={styles.button} text="Update" onClick={() => { this.updateCustomizer(index); }} />,
                        <DefaultButton style={{ marginLeft: 10, marginTop: 10 }} text="Cancel" onClick={() => { this.editCustomApplication(index, false); }} />]
                      }
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          }
          {this.props.designType === "List" && this.state.allCustomizers.length !== 0 &&
            <div className={styles.row}>
              <List items={this.state.allCustomizers} onRenderCell={this.onRenderCell} />
            </div>
          }
          {this.state.allCustomizers.length === 0 &&
            <div className={styles.row}>We did not find any Application Customizers for the selected web</div>
          }
          <Dialog
            hidden={this.state.hideDialog}
            onDismiss={() => this.toggleHideDialog()}
            dialogContentProps={this.state.dialogContentProps}
          >
            <DialogFooter>
              <DefaultButton onClick={() => this.toggleHideDialog()} text="Cancel" />
            </DialogFooter>
          </Dialog>
          <Panel
            headerText="Edit Application Customizer"
            isOpen={this.state.isPanelOpen}
            onDismiss={() => this.setState({ isPanelOpen: false })}
            closeButtonAriaLabel="Close"
            type={PanelType.large}
          >
            {this.state.editJSON &&
              <div className={styles.applicationCustomizers}>
                <div className={styles.column2}>Title</div>
                <div className={styles.column}><TextField value={this.state.editJSON.Title}
                  onChange={(ev, newVal) => {
                    this.onChangeJSON("Title", newVal);
                  }} />
                </div>
                <div className={styles.column2}>Description</div>
                <div className={styles.column}><TextField value={this.state.editJSON.Description} multiline rows={3}
                  onChange={(ev, newVal) => {
                    this.onChangeJSON("Description", newVal);
                  }} /></div>
                <div className={styles.column2}>Properties</div>

                <div className={styles.column}>
                  <AceEditor
                    placeholder="Placeholder Text"
                    mode="json"
                    theme="github"
                    onChange={(val) => { this.onChangeJSON("ClientSideComponentProperties", val); }}
                    fontSize={14}
                    style={{ height: 200, width: 800 }}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={false}
                    value={this.state.editJSON.ClientSideComponentProperties}
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2,
                    }} />
                </div>
                <DefaultButton style={{ marginLeft: 10, marginTop: 10 }} className={styles.button} text="Update" onClick={() => { this.updateCustomizer(this.state.itemInEdit); }} />
                <DefaultButton style={{ marginLeft: 10, marginTop: 10 }} text="Cancel" onClick={() => { this.editCustomApplication(this.state.itemInEdit, false); }} />
              </div>}
          </Panel>
          <Panel
            headerText="View Application Customizer"
            isOpen={this.state.isViewPanelOpen}
            onDismiss={() => this.setState({ isViewPanelOpen: false })}
            closeButtonAriaLabel="Close"
            type={PanelType.medium}
          >{this.state.viewJSON &&
            <div className={styles.applicationCustomizers}>
              <div className={styles.column2}>Title</div>
              <div className={styles.column}>{this.state.viewJSON.Title}</div>
              <div className={styles.column2}>Description</div>
              <div className={styles.column}>{this.state.viewJSON.Description ? this.state.viewJSON.Description : 'null'}</div>
              <div className={styles.column2}>ComponentID</div>
              <div className={styles.column}>{this.state.viewJSON.ClientSideComponentId}</div>
              <div className={styles.column2}>ID</div>
              <div className={styles.column}>{this.state.viewJSON.Id}</div>
              <div className={styles.column2}>Properties</div>
              <div className={styles.column}>{this.state.viewJSON.ClientSideComponentProperties}</div>
            </div>}</Panel>
        </div>
      </div>
    );
  }
}
