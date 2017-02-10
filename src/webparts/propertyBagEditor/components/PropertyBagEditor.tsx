import * as React from 'react';
import { css } from 'office-ui-fabric-react';
//import styles from './PropertyBagEditor.module.scss';
import { IPropertyBagEditorProps } from './IPropertyBagEditorProps';
import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js";
import * as _ from "lodash";
require('sp-init');
require('microsoft-ajax');
require('sp-runtime');
require('sharepoint');
import { DetailsList, DetailsRow } from "office-ui-fabric-react/lib/DetailsList";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';

export interface IPropertyBagEditorState {
  displayProps: Array<{ name: string, value: string }>;
  selectedIndex: number;
}
export default class PropertyBagEditor extends React.Component<IPropertyBagEditorProps, IPropertyBagEditorState> {
  detailsList: Element;
  public constructor(props: IPropertyBagEditorProps) {
    debugger;
    super(props);
    this.state = { displayProps: [], selectedIndex: -1 };
  }
  private setSPProperty(name: string, value: string) {
    var objCtx = new SP.ClientContext(this.props.siteUrl);
    var objWeb = objCtx.get_web();
    var objAllProps = objWeb.get_allProperties();
    objAllProps.set_item(name, value);
    objWeb.update();
    objCtx.load(objWeb);
    objCtx.executeQueryAsync(
      function (a,n) {
        console.log("done");
      },
      function (sender, args) {
        console.log("error");
      });
  }
  public componentWillMount() {
    debugger;
    const editableProps: Array<string> = this.props.propertiesToEdit.split("\r\n");

    for (const editableProp of editableProps) {
      this.state.displayProps.push({ name: editableProp, value: "" });
    }
    const web = new Web(this.props.siteUrl);
    web.select("Title", "AllProperties").expand("AllProperties").get().then(r => {
      debugger;
      for (const prop in r.AllProperties) {
        const displayProp = _.find(this.state.displayProps, p => { return p.name === prop; });
        if (displayProp) {
          displayProp.value = r.AllProperties[prop];
        }
      }
      this.setState(this.state);
    });
  }
  public onActiveItemChanged(item?: any, index?: number) {
    debugger;
    this.state.selectedIndex = index;
    this.setState(this.state);
  }
  public propertyChanged(event,domnode) {
    debugger;
    const propname = this.state.displayProps[this.state.selectedIndex].name;
    const newValue = event.target.value;
    this.setSPProperty(propname, newValue)
    this.state.displayProps[this.state.selectedIndex].value = newValue;
    this.setState(this.state);
  }
  public render(): React.ReactElement<IPropertyBagEditorProps> {
    const stuff = this.state.displayProps;
    return (
      <div>
        <DetailsList
          items={this.state.displayProps} onActiveItemChanged={this.onActiveItemChanged.bind(this)}
        >
        </DetailsList>
        <Panel
          isOpen={this.state.selectedIndex !== -1} hasCloseButton={true}
          isLightDismiss={true} type={PanelType.smallFixedFar}
        >
          <div>
            <span> <Label>Site Url</Label> {this.props.siteUrl}</span>
          </div>
          <div>
            <Label>Property Name</Label>
            {(this.state.selectedIndex === -1) ? "" : this.state.displayProps[this.state.selectedIndex].name}
          </div>
          <div>
            <Label>Property Value</Label>
            <TextField
              value={(this.state.selectedIndex === -1) ? "" : this.state.displayProps[this.state.selectedIndex].value}
              onBlur={this.propertyChanged.bind(this)} 

            />
          </div>


        </Panel>
      </div>
    );
  }
}
