import * as React from 'react';
import styles from './Graphextension.module.scss';
import { IGraphextensionProps } from './IGraphextensionProps';
import { escape, isEmpty } from '@microsoft/sp-lodash-subset';
import { MsGraphService } from '../../../services/MSGraphService';
import { Tab, Header } from 'semantic-ui-react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { IFormSchema } from '../../../models/IFormSchema';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import Constants from './../../../common/constants';
import { ToastContainer, toast } from 'react-toastify';
import { string } from 'prop-types';
require('./ReactToastify.css');
import { stringIsNullOrEmpty } from "@pnp/common";


export interface IGraphextensionState {
  schemaForm?: IFormSchema;
  onSuccess?: Boolean;
  onFail?: Boolean;
  response?: any;
}


export default class Graphextension extends React.Component<IGraphextensionProps, IGraphextensionState> {



  //MS Graph service 
  private graphService: MsGraphService;

  constructor(props: IGraphextensionProps, state: IGraphextensionState) {
    super(props);

    this.state = {
      schemaForm: {} as IFormSchema
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onCreateExtension = this.onCreateExtension.bind(this);
    this.onGetExtension = this.onGetExtension.bind(this);
    this.onPatchExtension = this.onPatchExtension.bind(this);
    this.onDeleteExtension = this.onDeleteExtension.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.graphService = new MsGraphService(this.props.webpartContext);
  }

  public componentDidMount() {

  }

  private onChangeValue(event: any, newValue?: string) {
    this.setState({
      schemaForm: {
        ...this.state.schemaForm,
        [event.target.name]: newValue
      }
    });
  }

  private async onPatchExtension() {


    if (this.state.schemaForm != null && !isEmpty(this.state.schemaForm)) {


      let result = await this.graphService.GetExtension();

      let userSettings = {
        "@odata.type": "microsoft.graph.openTypeExtension",
        "extensionName": Constants.ExtensionName,
        "Theme": !stringIsNullOrEmpty(this.state.schemaForm.Theme) ? this.state.schemaForm.Theme : result.Theme,
        "Tags": !stringIsNullOrEmpty(this.state.schemaForm.Tags) ? this.state.schemaForm.Tags : result.Tags
      };

      //Patch Extesion    
      let response = await this.graphService.PatchExtension(userSettings);
      if (response != null && response.ok) {
        toast.success("Graph Extension Successfully Updated!", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      else {
        toast.error("Error in patching graph extension !", {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    }
  }

  private async onCreateExtension() {


    if (this.state.schemaForm != null && !isEmpty(this.state.schemaForm)) {


      let userSettings = {
        "@odata.type": "microsoft.graph.openTypeExtension",
        "extensionName": Constants.ExtensionName,
        "Theme": this.state.schemaForm.Theme,
        "Tags": this.state.schemaForm.Tags
      };

      //Create Extesion    
      let response = await this.graphService.CreateExtension(userSettings);
      if (response != null) {
        toast.success("Graph Extension created !", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
      else {
        toast.error("Error in creating graph extension !", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    }
  }

  private async onDeleteExtension() {

    //Delete Extesion    
    let response = await this.graphService.DeleteExtension();
    if (response != null && response.ok) {

      toast.success("Graph extension removed !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    else {

      toast.error("Error in removing graph extension !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  }

  private async onGetExtension() {

    //Get Extesion    
    let response = await this.graphService.GetExtension();
    if (response != null) {

      this.setState({
        response
      });
      toast.success("Graph Extension retrieved !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    else {
      this.setState({
        response: null
      });
      toast.error("Error in retrieving graph extension !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  }

  private onTabChange(e: any, data: any): void {
    console.log(data);
    this.setState({
      response: null,
      schemaForm: null
    });
  }


  public render(): React.ReactElement<IGraphextensionProps> {


    const columnProps: Partial<IStackProps> = {
      tokens: { childrenGap: 15 },
      styles: { root: { width: 300 } }
    };
    const panes = [
      {
        menuItem: 'POST', render: () =>
          <Tab.Pane>
            <Header as='h3'>Create open extension</Header>
            <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }}>
              <Stack {...columnProps}>
                <TextField
                  name="Theme"
                  label="Theme"
                  value={this.state.schemaForm ? this.state.schemaForm.Theme : ""}
                  onChange={this.onChangeValue} />
                <TextField
                  name="Tags"
                  label="Tags"
                  value={this.state.schemaForm ? this.state.schemaForm.Tags : ""}
                  onChange={this.onChangeValue} />
              </Stack>
              <Stack {...columnProps}>
                {this.state.schemaForm != null ?
                  <pre>{JSON.stringify(this.state.schemaForm, null, 2)}</pre>
                  : ""}
              </Stack>
            </Stack>
            <PrimaryButton className={styles.button} text="Create Extension" onClick={this.onCreateExtension} allowDisabledFocus />

          </Tab.Pane>
      },
      {
        menuItem: 'GET', render: () =>

          <Tab.Pane>
            <Header as='h3'>Get open extension</Header>
            <PrimaryButton className={styles.button} text="Get Extension" onClick={this.onGetExtension} allowDisabledFocus />

            <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }}>
              <Stack {...columnProps}>
                {this.state.response != null ? <pre>{JSON.stringify(this.state.response, null, 2)}</pre> : ""}
              </Stack>
            </Stack>
          </Tab.Pane>
      },
      {
        menuItem: 'PATCH', render: () =>

          <Tab.Pane>
            <Header as='h3'>Patch Extension</Header>
            <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }}>
              <Stack {...columnProps}>
                <TextField
                  name="Theme"
                  label="Theme"
                  value={this.state.schemaForm ? this.state.schemaForm.Theme : ""}
                  onChange={this.onChangeValue} />
                <TextField
                  name="Tags"
                  label="Tags"
                  value={this.state.schemaForm ? this.state.schemaForm.Tags : ""}
                  onChange={this.onChangeValue} />
              </Stack>
              <Stack {...columnProps}>
                {this.state.schemaForm != null ?
                  <pre>{JSON.stringify(this.state.schemaForm, null, 2)}</pre>
                  : ""}
              </Stack>
            </Stack>
            <PrimaryButton className={styles.button} text="Patch Extension" onClick={this.onPatchExtension} allowDisabledFocus />



          </Tab.Pane>
      },
      {
        menuItem: 'DELETE', render: () => <Tab.Pane>
          <Header as='h3'>Delete Extension</Header>
          <PrimaryButton className={styles.button} text="Delete Extension" onClick={this.onDeleteExtension} allowDisabledFocus />

          <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: 650 } }}>
            <Stack {...columnProps}>
            </Stack>
          </Stack>
        </Tab.Pane>
      }
    ];
    return (
      <div className={styles.graphextension}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column12}>
              <Header as='h1'>Graph Open Extension Demo</Header>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column12}>
              <Tab panes={panes} onTabChange={this.onTabChange}></Tab>
              <ToastContainer></ToastContainer>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
