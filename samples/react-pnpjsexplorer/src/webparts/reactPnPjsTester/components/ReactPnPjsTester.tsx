 import * as React from "react";
import styles from "./ReactPnPjsTester.module.scss";
import { IReactPnPjsTesterProps } from "./IReactPnPjsTesterProps";
import { sp } from "@pnp/sp/presets/all";
import {
  TextField,
  Panel,
  PanelType,
  Checkbox,
  Icon,
  Dropdown,
  TooltipHost,
  DirectionalHint,
  Toggle,
  Stack,
} from "office-ui-fabric-react";
// import AceEditor from "react-ace";
import { DefaultButton, ActionButton, IconButton } from "office-ui-fabric-react/lib/Button";
// import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/theme-github";
import ReactJson from "react-json-view";

const samples:ISamples = require("./Samples.json");

export interface ISamples{
  samples:any[];
}

export interface IReactPnPjsTesterState {
  jsonResponse: any;
  pnpCommand: any;
  displayDataTypes: boolean;
  displayObjectSize: boolean;
  enableClipboard: boolean;
  openPanel: boolean;
  isError: boolean;
  errorMessage: any;
  siteUrl: string;
  isUpdate: boolean;
  showAddUpdateInformation: boolean;
  defaultCollapsed: boolean;
  requestType: string;
  isOtherSite: boolean;
}

var spObj = null;

export default class ReactPnPjsTester extends React.Component<
  IReactPnPjsTesterProps,
  IReactPnPjsTesterState
> {
  private addCommand =
    'sp.web.lists.getByTitle("CustomList").items.add({Title: "PnpJS Explorer"})';
  private exampleJson = samples.samples;

  // constructor to intialize state and pnp sp object.
  constructor(props: IReactPnPjsTesterProps, state: IReactPnPjsTesterState) {
    super(props);
    this.state = {
      requestType: "GET",
      jsonResponse: null,
      pnpCommand: null,
      displayDataTypes: false,
      displayObjectSize: false,
      enableClipboard: false,
      openPanel: false,
      isError: false,
      errorMessage: null,
      siteUrl: "",
      isUpdate: false,
      showAddUpdateInformation: false,
      defaultCollapsed: false,
      isOtherSite: false,
    };
  }

  private _reqBodyChanged = (val: string) => {
    // this.setState({
    //   jsonResponse: val,
    // });
  }

  public render(): React.ReactElement<IReactPnPjsTesterProps> {
    return (
      <div className={styles.reactPnPjsTester}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <TooltipHost
                content="This webpart will allow SPFx developers to test PnPjs Sharepoint methods and it displays response in JSON viewer to identify properties/attributes returned by method"
                id="tooltip"
                directionalHint={DirectionalHint.rightCenter}
                calloutProps={{ gapSpace: 0 }}
                styles={{ root: { display: "inline-block" } }}
              >
                <h2 style={{ cursor: "pointer" }}>PnPjs Tester 
                <IconButton iconProps={{ iconName: 'InfoSolid' }} title="InfoSolid" ariaLabel="InfoSolid" />
                </h2>
                
              </TooltipHost>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col1}>
              <Dropdown
                selectedKey={this.state.requestType}
                onChanged={(val) => {
                  let isUpdate = val.key === "POST" ? true : false;
                  this.setState({ isUpdate: isUpdate, requestType: val.text });
                }}
                className={styles.methodSelector}
                options={[
                  { key: "GET", text: "GET" },
                  { key: "POST", text: "POST" },
                ]}
              />
            </div>
            <div className={styles.col11}>
              <TextField
                value={this.state.pnpCommand}
                placeholder="Enter your query here e.g. sp.web.select('Title')"
                onChange={(e) => this.setCommand(e.target)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <Checkbox
                label="Use for other Site collection or Subsite"
                onChange={(event, checked) => {
                  this.setState({ isOtherSite: checked });
                }}
              />
            </div>
            <div
              className={styles.column}
              style={{
                display: this.state.isOtherSite ? "block" : "none",
                marginTop: 10,
              }}
            >
              <TextField
                placeholder="Enter site collection or subsite url"
                value={this.state.siteUrl}
                onChange={(e) => this.setSiteUrl(e.target)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <Panel
                isLightDismiss
                isOpen={this.state.openPanel}
                headerText="Samples"
                closeButtonAriaLabel="Close"
                type={PanelType.custom}
                customWidth={"600px"}
              >
                <p>{this.getPanelCommands()}</p>
              </Panel>
                 
              <DefaultButton
                onClick={() => this.executeCommand()}
                className={styles.button}
              >
                <Icon className={styles.icon} iconName="LightningBolt" /> Run
                query
              </DefaultButton>
              <DefaultButton
                onClick={() => {
                  this.setState({ openPanel: true });
                }}
                className={styles.button}
              >
                <Icon className={styles.icon} iconName="ReadingMode"></Icon>
                Samples
              </DefaultButton>
              <DefaultButton
                onClick={() => {
                  window.open("https://pnp.github.io/pnpjs/sp/", "__blank");
                }}
                className={styles.button}
              >
                <Icon className={styles.icon} iconName="Info"></Icon>About PnPjs
              </DefaultButton>
              {this.state.jsonResponse && (
                <div>
                  
                  {/* <Checkbox
                    label="Wrap code"
                    className={styles.collapse}
                    onChange={() => this.onCollapseAll()}
                    checked={this.state.defaultCollapsed}
                     
                  /> */}
                  <br></br>
{this.state.jsonResponse &&
        <React.Fragment>
          <Stack horizontal tokens={{ childrenGap: 25 }}>
          <Toggle checked={this.state.displayDataTypes}  label="Show Data Types" inlineLabel onChange={() => { this.setState({ displayDataTypes: !this.state.displayDataTypes }); }} />
          <Toggle checked={this.state.displayObjectSize}  label="Show Count" inlineLabel onChange={() => { this.setState({ displayObjectSize: !this.state.displayObjectSize }); }} />
          <Toggle checked={this.state.enableClipboard}  label="Enable Clipboard" inlineLabel onChange={() => { this.setState({ enableClipboard: !this.state.enableClipboard }); }}/>
          <Toggle checked={this.state.defaultCollapsed}  label="Collapse All" inlineLabel onChange={()=>this.onCollapseAll()}/>
          {/* <Checkbox  className={styles.collapse} label="Collapse All"  /> */}
          </Stack>
          <div className={styles.jsonviewcont}>
           <ReactJson src={this.state.jsonResponse} collapsed={this.state.defaultCollapsed} displayDataTypes={this.state.displayDataTypes} displayObjectSize={this.state.displayObjectSize} enableClipboard={this.state.enableClipboard} />
           </div>
           </React.Fragment>
        }
        {this.state.errorMessage &&
          <div>{JSON.stringify(this.state.errorMessage)} </div>
        }

                  {/* <AceEditor
                    mode="json"
                    theme="github"
                    className={styles.codeZone}
                    value={JSON.stringify(this.state.jsonResponse, null, 2)}
                    onChange={this._reqBodyChanged}
                    highlightActiveLine={true}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                      wrap: this.state.defaultCollapsed,
                      showPrintMargin: false,
                    }}
                    height="500px"
                    width="100%"
                  /> */}
                </div>
              )}
              {this.state.errorMessage && (
                <div>{JSON.stringify(this.state.errorMessage)} </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onCollapseAll = () => {
    this.setState({ defaultCollapsed: !this.state.defaultCollapsed });
  }

  private setCommand = (element) => {
    var val = (element as HTMLInputElement).value;
    this.setState({ pnpCommand: val });
  }

  private setSiteUrl = (element) => {
    var val = (element as HTMLInputElement).value;
    this.setState({ siteUrl: val });
  }

  private setPnP = () => {
    spObj = null;
    if (this.state.siteUrl != "" && this.state.isOtherSite) {
      sp.setup({
        sp: {
          headers: {
            Accept: "application/json;odata=minimalmetadata",
          },
          baseUrl: this.state.siteUrl,
        },
      });
    } else {
      sp.setup({
        spfxContext: this.props.spcontext
      });
    }
    spObj = sp;
  }

  private executeCommand() {
    this.setPnP();
    this.setState({ jsonResponse: null, errorMessage: null,openPanel:false });
    var command = this.state.pnpCommand;
    command = command.replace("sp", "spObj");
    command = command.replace(/"/g, "'");
    command = command.replace(".get()", "");
    command = command.replace(";", "");
    command = command.replace("()", "");

    var evalString = "try{" + command;

    if (!this.state.isUpdate) {
      evalString += "()";
    }

    evalString +=
      ".then(\
                (result) => {\
                  debugger;\
                  console.log(result);\
                  this.setState({jsonResponse:result});\
                }\
              )\
              .catch(\
                (error) => {\
                  debugger;\
                  console.log(error);\
                  this.setState({jsonResponse:{error:error.message}});\
                }\
              );\
              }\
              catch(e){\
                  alert(e);\
              }";
    eval(evalString);
  }

  private getPanelCommands = () => {
    return (
      <React.Fragment>
        {this.exampleJson.map((item: any, index: number) => (
          <div>
            <ActionButton
              onClick={() => {
                this.setState({ pnpCommand: item.command, openPanel: false });
              }}
              iconProps={{ iconName: "Copy" }}
              title="Copy"
              ariaLabel="Copy"
            >
              {item.command}
            </ActionButton>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
