
import { ListDefinitionContainerNative } from "./ListDefinitionContainer";
import ListDefinition from "../model/ListDefinition";
import ColumnDefinition from "../model/ColumnDefinition";
import { Site, Web, WebList, WebListField } from "../model/Site";
import * as _ from "underscore";
import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as strings from "spfxReactGridStrings";
import * as utils from "../utils/utils";

import { Web as SPWeb } from "sp-pnp-js";
import { Site as SPSite } from "sp-pnp-js";
import { Guid } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";

export interface IWebSelectorProps {
  onChange(newValue: any): void;
  PageContext: PageContext;
  selectedWeb: string;
  siteUrl: string;
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
    this.SelectedWebChanged=this.SelectedWebChanged.bind(this);
    this.state = {
      openPanel: false,
      selectedWeb: this.props.selectedWeb,
      options: []
    };
  }
  private getWebs(siteUrl: string): any {
    debugger;
    const spSite: SPSite = new SPSite(siteUrl);
    const promise = spSite.rootWeb.webs.orderBy("Title").get()
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
      this.state.options = options;
      this.setState(this.state);
    })
  }
  private SelectedWebChanged(option:IDropdownOption,index?:number): void {
    debugger;
    const key:string=option.key as string;
    const webUrl=utils.ParseSPField(key).id;
    const webTitle=utils.ParseSPField(key).value;
    this.props.onChange(new utils.ParsedSPField(webUrl,webTitle));
    this.getWebs(webUrl).then(webs => {
      let options: Array<IDropdownOption> = webs.map((web) => {
        return ({
          key: web.url + "#;" + web.title,
          text: web.title
        });
      });
      this.state.options = options;
      this.setState(this.state);
    })
  }
  private onClosePanel(element?: any): void {
    this.state.openPanel = false;
    this.setState(this.state);
  }
  public render(): JSX.Element {
    //Renders content
    debugger;
    // let webs: Array<Web> = this.getWebs(this.props.siteUrl);

    return (
      <div style={{ marginBottom: '8px' }}>
        {this.state.openPanel === true ?
          <Panel
            isOpen={this.state.openPanel} hasCloseButton={true} onDismiss={this.onClosePanel}
            isLightDismiss={true} type={PanelType.smallFixedFar}
            headerText={strings.ListDefinitionsTitle}>
            <div>
              <span> <Label>Site</Label> {this.props.siteUrl}</span>
            </div>
            <div>
              <Label>Web</Label> {this.state.selectedWeb}
            </div>
            <Dropdown label="Select Web" options={this.state.options} onChanged={this.SelectedWebChanged}>
            </Dropdown>

          </Panel>
          : <div>
            {this.props.selectedWeb}
            <Button buttonType={ButtonType.icon} icon="Add" onClick={this.onOpenPanel}></Button>
          </div>
        }
      </div>
    );
  }
}



