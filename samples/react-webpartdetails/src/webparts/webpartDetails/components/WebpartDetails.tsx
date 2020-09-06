import * as React from 'react';
import styles from './WebpartDetails.module.scss';
import { IWebpartDetailsProps } from './IWebpartDetailsProps';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import { IFile } from '@pnp/sp/files/types';
import { ClientsidePageFromFile, IClientsidePage } from "@pnp/sp/clientside-pages";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IWebpartDetailState } from './IWebpartDetailState';

export default class WebpartDetails extends React.Component<IWebpartDetailsProps, IWebpartDetailState> {
  constructor(props: IWebpartDetailsProps, state: any) {
    super(props);
    this.state = {
      webpartData: [],
      selectedWebpart: null,
      selectedKeys: []
    };
  }
  public componentWillMount() {
    this.getallwebpart();
  }
  public async getallwebpart() {
    let webpartdata = [];
    let file: IFile = sp.web.getFileByServerRelativePath(this.props.context.pageContext.site.serverRequestPath);
    let page: IClientsidePage = await ClientsidePageFromFile(file);
    page.sections.forEach(section => {
      //loop through each section
      section.columns.forEach(column => {
        //loop through each column and control in the selected section
        column.controls.forEach(control => {
          //exclude the current webpart
          if (this.props.context.instanceId !== control.data.id) {
            let webpart = {
              key: control.data.id,
              text: (control.data.webPartData && control.data.webPartData.title) || this.htmlToText(control.data.innerHTML)
            };
            webpartdata.push(webpart);
          }
        });
      });
    });
    this.setState({
      webpartData: webpartdata
    });
  }
  public htmlToText(html: string) {
    //create a temporary div and get the text of the div and remove the div from DOM
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    let displayTitle = tempDiv.textContent.substring(0, tempDiv.textContent.length > 20 ? 20 : tempDiv.textContent.length) + '...';
    tempDiv.remove();
    return displayTitle;
  }
  public onDropdownChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    if (item) {
      let selectedNode = document.querySelectorAll('[data-sp-feature-instance-id="' + item.key + '"]');
      let parentNode: HTMLElement = selectedNode[0].parentNode as HTMLElement;
      if (item.selected) {
        //hide the webpart
        parentNode.style.display = "none";
      } else {
        //unhide the webpart
        parentNode.style.display = "flex";
      }
      this.setState({
        selectedKeys: item.selected ? [...this.state.selectedKeys, item.key as string] : this.state.selectedKeys.filter(key => key !== item.key),
      });
    }
  }
  public render(): React.ReactElement<IWebpartDetailsProps> {
    return (
      <span>
        <Dropdown
          label="Select the webpart to hide"
          selectedKeys={this.state.selectedKeys}
          onChange={this.onDropdownChange}
          multiSelect
          placeholder="Select webparts"
          options={this.state.webpartData}
        />
      </span>
    );
  }
}
