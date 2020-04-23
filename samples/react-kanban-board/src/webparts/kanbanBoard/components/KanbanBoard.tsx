import * as React from 'react';
import styles from './KanbanBoard.module.scss';
import { IKanbanBoardProps } from './IKanbanBoardProps';
import {sp} from '@pnp/sp';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IStackStyles, Stack } from 'office-ui-fabric-react/lib/Stack';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.metro.css';
import JqxKanban, { IKanbanProps, jqx, IKanbanSource } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxkanban';

const rowStyle1: IStackStyles = {
  root:{
    flexBasis:"30%"
  }
};
const rowStyle2: IStackStyles = {
  root:{
    flexBasis:"70%"
  }
};

export interface ICustomKanbanProps extends IKanbanProps{
  listTitle: string;
  showBoard: boolean;
  noItems: boolean;
  taskDetails: IKanbanSource;
  hideDialog: boolean;
}

export default class KanbanBoard extends React.Component<IKanbanBoardProps, ICustomKanbanProps, {}> {

  private sourceFields: any[] = [
    { name: 'id', map:'Id', type: 'string' },
    { name: 'status', map: 'Status', type: 'string' },
    { name: 'text', map: 'Title', type: 'string' },
    { name: 'tags',map:'Priority', type: 'string' },
    { name: 'color',map:'PercentComplete', type: 'string' },
    { name: 'resourceId', map: 'AssignedToId', type: 'number' },
    { name: 'content', map:'Body', type: 'string'},
    { name: 'percent', map:'PercentComplete', type: 'number'},
    { name: 'priority', map:'Priority', type: 'string'}
  ];

  private resourceFields : any[] = [
    { name: 'id', map:'Id', type: 'number' },
    { name: 'name', map:'Title', type: 'string' },
    { name: 'image', type: 'string' },
    { name: 'common', type: 'boolean' },
    { name: 'email', type: 'string', map: 'Email' }
  ];

  constructor(props: IKanbanBoardProps) {
    super(props);

    const template: string =
    '<div class="jqx-kanban-item" id="" style="border-radius:0px;">'
    + '<div class="jqx-kanban-item-color-status"></div>'
    + '<div class="jqx-kanban-item-avatar"></div>'
    + '<div class="jqx-kanban-item-text"></div>'
    + '<div class="jqx-kanban-item-footer">'
    + '<div style="float:right;"><div class="jqx-kanban-item-template-content"><i data-icon-name="More" role="presentation" aria-hidden="true" class="ms-Icon root-48" style="font-family: &quot;FabricMDL2Icons&quot;;font-size: 1.25em;color: gray;"></i></div></div>'
    + '</div></div>';
    const itemRenderer = (element: any, item: any, resource: any): void => {
      let precentComplete = item.color as Number;
      let style = "";
      if(precentComplete <= .3)
      {
        style = "background-color:red";
      }
      else if(precentComplete <= .7)
      {
        style = "background-color:orange";
      }
      element[0].getElementsByClassName('jqx-kanban-item-color-status')[0].style = style;
      if(!resource.common)
        element[0].getElementsByClassName('jqx-kanban-item-avatar-image')[0].src = this.props.webUrl + "/_layouts/15/userphoto.aspx?size=M&username=" + resource.email;
    };

    this.state = {
      template: template,
      itemRenderer,
      width: "100%",
      listTitle: this.props.listTitle,
      showBoard: false,
      noItems: true,
      taskDetails: {},
      hideDialog:true
    };
  }

  public render(): React.ReactElement<IKanbanBoardProps> {
    const el = this.state.showBoard ?
    !this.state.noItems ? <JqxKanban
    width={this.state.width}
    height={"100%"}
    source={this.state.source}
    columns={this.state.columns}
    resources={this.state.resources}
    onItemMoved={this._updateTask}
    itemRenderer={this.state.itemRenderer}
    template={this.state.template}
    onItemAttrClicked={this._showTask}
    />: <div>No tasks found!</div> : <Spinner label="Loading tasks..." ariaLive="assertive" labelPosition="top" />;
    const selectlist = !(this.state.listTitle && this.state.listTitle.length > 0) ? <div>Please choose a list</div> : null;
    return (<>
      {selectlist}
      {el}

      <Dialog
          minWidth="600"
          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: this.state.taskDetails.text,
            subText: ''
          }}
          modalProps={{
            isBlocking: false,
            styles: { main: { minWidth:600 } }
          }}
        >
          <Stack>
            <Stack horizontal horizontalAlign="stretch">
              <Stack.Item align="auto" styles={rowStyle1}>
                <span>% Complete</span>
              </Stack.Item>
              <Stack.Item align="stretch" styles={rowStyle2}>
              <span>{ parseFloat(this.state.taskDetails.color) * 100 }</span>
              </Stack.Item>
            </Stack>
            <Stack horizontal horizontalAlign="stretch">
              <Stack.Item align="auto" styles={rowStyle1}>
              <span>Description</span>
              </Stack.Item>
              <Stack.Item align="stretch" styles={rowStyle2}>
              <span>{ ReactHtmlParser(this.state.taskDetails.content) }</span>
              </Stack.Item>
            </Stack>

            <Stack horizontal>
              <Stack.Item align="auto" styles={rowStyle1}>
              <span>Priority</span>
              </Stack.Item>
              <Stack.Item align="stretch" styles={rowStyle2}>
              <span>{ this.state.taskDetails.tags }</span>
              </Stack.Item>
            </Stack>

            <Stack horizontal>
              <Stack.Item align="auto" styles={rowStyle1}>
              <span>Task Status</span>
              </Stack.Item>
              <Stack.Item align="stretch" styles={rowStyle2}>
              <span>{ this.state.taskDetails.status }</span>
              </Stack.Item>
            </Stack>
          </Stack>
          <DialogFooter>
            <DefaultButton onClick={this._closeDialog} text="Close" />
          </DialogFooter>
        </Dialog>

      </>);
  }

  public static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.listTitle!==prevState.listTitle){
      return { listTitle: nextProps.listTitle};
   }
   else return null;
  }

  public componentDidUpdate(prevProps, prevState) {
    if (prevState.listTitle !== this.state.listTitle) {
      this.setState({ listTitle: this.props.listTitle,showBoard:false });
      this._getData(this.props.listTitle);
    }
  }

  public componentDidMount(){
    this._getData(this.props.listTitle);
  }

  private _getData = (listTitle) => {
    if(listTitle && listTitle.length > 0)
    {
      sp.web.lists.getByTitle(listTitle).fields.getByInternalNameOrTitle("Status").get()
      .then(status => {

        const cols = status.Choices.map((val,index) => {
          return { text: val, dataField: val };
        });

        sp.web.lists.getByTitle(listTitle).items.getAll().then(res => {

          const source = {
            dataFields: this.sourceFields,
            dataType: 'array',
            localData: [ ...res ]
          };

          sp.web.siteUsers.get().then(users => {
            const resourcesAdapterFunc = (): any => {
              const resourcesSource = {
                  dataFields: this.resourceFields,
                  dataType: 'array',
                  localData: [...users]
              };
              const resourcesDataAdapter = new jqx.dataAdapter(resourcesSource);
              return resourcesDataAdapter;
              };

              this.setState({
                width: "100%",
                columns: cols,
                resources: resourcesAdapterFunc(),
                source: new jqx.dataAdapter(source),
                showBoard: true,
                noItems: source.localData.length <= 0
              });
          });
        });
      });
    } else {
      this.setState({
        showBoard:true
      });
    }
  }

  private _updateTask = (event: any): void => {
    let args = event.args;
    // let itemId = args.itemId;
    // let oldParentId = args.oldParentId;
    // let newParentId = args.newParentId;
    // let itemData = args.itemData;
    // let oldColumn = args.oldColumn;
    // let newColumn = args.newColumn;
    sp.web.lists.getByTitle(this.props.listTitle).items.getById(args.itemId).update({
      Status: args.newColumn.dataField
    }).then(res => {
      console.log("Task updated");
    });
  }

  private _showTask = (event:any): void => {
    if(event.args.attribute === "template")
    {
      this.setState({
        taskDetails : {
          ...event.args.item
        },
        hideDialog: false
      });
    }
  }

  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  }
}
