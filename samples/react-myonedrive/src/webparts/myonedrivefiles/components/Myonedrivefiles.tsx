import * as React from 'react';
import { IMyonedrivefilesProps } from './IMyonedrivefilesProps';
import { IMyonedrivefilesState } from './IMyonedrivefilesState';
import OneDriveTable from '../../../common/onedrivetable/OneDriveTable';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { MessageBar, MessageBarType, } from '@fluentui/react';
import * as strings from 'MyonedrivefilesWebPartStrings';
import Link from '@material-ui/core/Link';
import styles from './MyOnedrivefiles.module.scss';
export default class Myonedrivefiles extends React.Component<IMyonedrivefilesProps, IMyonedrivefilesState> {

  public constructor(props: IMyonedrivefilesProps, state: IMyonedrivefilesState) {
    super(props);

    this.state = {
      drives: [],
      root: undefined,
      list: [],
      onedriveFiles: [],
      onedriveRootUrl: '',
      errorMessage: undefined,
      loading: false,
      activeFolder: ''
    };
    this.getDriveRootUrl = this.getDriveRootUrl.bind(this);
    this.getmyDriveFiles = this.getmyDriveFiles.bind(this);
  }

  public async componentDidMount() {
    this.getDriveRootUrl();
    this.getmyDriveFiles();
  }

  public getDriveRootUrl() {
    let apiUrl = `/me/drive/`;
    this.props.graphClient
      .api(apiUrl)
      .version("v1.0")
      .get((err: any, res: any): void => {
        if (err) {
          this.setState({
            errorMessage: strings.ErrorMessage + err.message,
          });
        }
        if (res) {
          this.setState({
            onedriveRootUrl: res.webUrl,
          });
        }
      });
  }

  public getmyDriveFiles(folderPath = '') {

    this.setState({
      errorMessage: null,
      loading: true,
    });

    let apiUrl = `/me/drive/root${folderPath ? `:/${folderPath}:` : ''}/children`;

    this.props.graphClient
      .api(apiUrl)
      .version("v1.0")
      .get((err: any, res: any): void => {
        if (err) {
          this.setState({
            errorMessage: strings.ErrorMessage + err.message,
            loading: false
          });
        }
        if (res && res.value && res.value.length) {
          this.setState({
            onedriveFiles: res.value,
            activeFolder: folderPath,
            loading: false
          });
        }
        else {
          this.setState({
            loading: false
          });
        }
      });
  }

  public render(): React.ReactElement<IMyonedrivefilesProps> {

    console.log("Parent Render =>", this.props);

    let { loading, errorMessage, onedriveFiles, activeFolder, onedriveRootUrl } = this.state;
    let { title, fields, displayMode, titleLink } = this.props;

    return (
      <>
        {titleLink ?
          <Link  className={styles.titleArea} href={onedriveRootUrl}
            target="_blank">
            <WebPartTitle
              displayMode={displayMode}
              title={title}
              updateProperty={() => { }} /></Link>
          : <WebPartTitle
            displayMode={displayMode}
            title={title}
            updateProperty={() => { }} />
        }
        {
          this.state.loading &&
          <Spinner label={strings.LoadingMessage} size={SpinnerSize.large} />
        }
        {
          fields && fields.length ?
            (onedriveFiles.length > 0) ?
              (<OneDriveTable
                data={onedriveFiles}
                selectedFields={this.props.fields}
                activeFolder={activeFolder}
                getMyDriveFiles={this.getmyDriveFiles}
                defaultSortKey={'name'}></OneDriveTable>)
              : (
                !loading && (
                  errorMessage ?
                    <MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar> :
                    <MessageBar messageBarType={MessageBarType.warning}>{strings.NoFilesLabel}</MessageBar>
                )
              )
            :
            <MessageBar
              messageBarType={MessageBarType.warning}>
              {strings.NoFieldsLabel}</MessageBar>
        }
      </>);
  }
}
