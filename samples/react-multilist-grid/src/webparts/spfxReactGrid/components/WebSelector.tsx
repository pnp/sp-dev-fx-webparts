import { Web } from "../model/Site";
import * as _ from "underscore";
import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as utils from "../utils/utils";

import { Web as SPWeb } from "sp-pnp-js";

import { PageContext } from "@microsoft/sp-page-context";

export interface IWebSelectorProps {
  onChange(newValue: any): void;
  PageContext: PageContext;
  selectedWeb: string;
  siteUrl: string;
  headerText: string;
}
export interface IWebSelectorState {
  openPanel: boolean;
  selectedWeb: string;
  options: Array<IDropdownOption>;
}
export default class WebSelector extends React.Component<IWebSelectorProps, IWebSelectorState> {
  constructor(props: IWebSelectorProps) {
    super(props);
    this.onOpenPanel = this.onOpenPanel.bind(this);
    this.onClosePanel = this.onClosePanel.bind(this);
    this.getWebs = this.getWebs.bind(this);
    this.SelectedWebChanged = this.SelectedWebChanged.bind(this);
    this.state = {
      openPanel: false,
      selectedWeb: this.props.selectedWeb,
      options: []
    };
  }
  private getWebs(webUrl: string): any {
    const spWeb: SPWeb = new SPWeb(webUrl);
    const promise = spWeb.webs.orderBy("Title").get()
      .then((response) => {
        const webs = _.map(response, (item: any) => {
          const web: Web = new Web(item.Id, item.Title, item.Url);
          return web;
        });
        console.log(webs);
        return webs;
      })
      .catch((error) => {
        console.log(error);
      });
    return promise;
  }

  private onOpenPanel(element?: any): void {
    this.state.openPanel = true;
    this.setState(this.state);
    this.getWebs(this.props.siteUrl).then(webs => {
      let options: Array<IDropdownOption> = webs.map((web) => {
        return ({
          key: web.url + "#;" + web.title,
          text: web.title
        });
      });
      options.unshift({ key: "", text: "Choose a web to select it" });
      this.state.options = options;
      this.setState(this.state);
    });
  }
  private SelectedWebChanged(option: IDropdownOption, index?: number): void {
    const key: string = option.key as string;
    if (key === "") { return; }
    const webUrl = utils.ParseSPField(key).id;
    this.state.selectedWeb = key;
    this.props.onChange(key);
    this.getWebs(webUrl).then(webs => {
      let options: Array<IDropdownOption> = webs.map((web) => {
        return ({
          key: web.url + "#;" + web.title,
          text: web.title
        });
      });
      options.unshift({ key: "", text: "Select one...", selected: true });
      this.state.options = options;
      this.setState(this.state);
    });
  }
  private onClosePanel(element?: any): void {
    this.state.openPanel = false;
    this.setState(this.state);
  }
  public render(): JSX.Element {

    return (
      <div style={{ marginBottom: '8px' }}>
        {this.state.openPanel === true ?
          <Panel
            isOpen={this.state.openPanel} hasCloseButton={true} onDismiss={this.onClosePanel}
            isLightDismiss={true} type={PanelType.smallFixedFar}
            headerText={this.props.headerText}>
            <div>
              <span> <Label>Site Url</Label> {this.props.siteUrl}</span>
            </div>
            <div>
              <Label>Currently selected Web Url</Label> {utils.ParseSPField(this.state.selectedWeb).id}
            </div>
            <div>
              <Label>Currently selected Web Title</Label> {utils.ParseSPField(this.state.selectedWeb).value}
            </div>

            <Dropdown label="Choose a different Web"
              options={this.state.options}
              onChanged={this.SelectedWebChanged} defaultSelectedKey="">
            </Dropdown>
          </Panel>
          : <div>
            {utils.ParseSPField(this.state.selectedWeb).value}
            <Button buttonType={ButtonType.icon} icon="Search" onClick={this.onOpenPanel}></Button>
          </div>
        }
      </div>
    );
  }
}



