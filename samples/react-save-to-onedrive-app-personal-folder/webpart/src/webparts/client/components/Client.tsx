import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { MSGraphClient } from '@microsoft/sp-http';
import * as React from 'react';
import styles from './Client.module.scss';
import { IClientProps } from './IClientProps';
import * as ManageData from 'manage-data';
import { IClientState } from './IClientState';

export default class Client extends React.Component<IClientProps, IClientState> {

  constructor(props) {
    super(props);

    this.state = {
      manageDataLibrary: null,
      savedData: ''
    };
  }

  public componentDidMount(): void {
    this.props.context.msGraphClientFactory
      .getClient()
      .then(async (client: MSGraphClient): Promise<void> => {
        const manageDataLibrary = new ManageData.ManageDataLibrary(client, this.props.context.httpClient);
        const savedData = await manageDataLibrary.getData();
        this.setState({
          manageDataLibrary,
          savedData: savedData.data
        });
      });
  }

  public render(): React.ReactElement<IClientProps> {
    const {
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
    } = this.props;

    const { savedData } = this.state;

    return (
      <section className={`${styles.client} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <div>{environmentMessage}</div>
        </div>
        <div>
          <h3>Manage data in application personal folder in OneDrive</h3>
          <TextField label="Data:" value={savedData} onChange={(e) => this.handleDocumentChange(e)} />
          <ActionButton iconProps={{ iconName: 'Download' }} onClick={() => this.get()}>Get</ActionButton>
          <ActionButton iconProps={{ iconName: 'Save' }} onClick={() => this.save()}>Save</ActionButton>
        </div>
      </section>
    );
  }

  private get(): void {
    this.state.manageDataLibrary.getData().then(result => this.setState({ savedData: result.data }));
  }

  private save(): void {
    const dataToSave = this.state.savedData;
    this.state.manageDataLibrary.saveData({ data: dataToSave }).then(response => {
      this.get();
    });
  }

  private handleDocumentChange(event): void {
    const text: string = event.target.value;
    this.setState({ savedData: text });
  }
}
