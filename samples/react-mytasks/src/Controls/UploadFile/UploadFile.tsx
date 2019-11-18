import * as React from 'react';
import styles from './UploadFile.module.scss';

 import {IUploadFileProps} from './IUploadFileProps';
 import {IUploadFileState} from './IUploadFileState';
import { Dialog, Stack, Icon, IconType, Label, ProgressIndicator } from 'office-ui-fabric-react';
import * as tsStyles from './UploadStyles';
import { ChunkedFileUploadProgressData, Web } from '@pnp/sp';
import  *  as strings  from 'MyTasksWebPartStrings';

let file :File = undefined;

export interface IUploadFileState {}

export   class UploadFile extends React.Component<IUploadFileProps, IUploadFileState> {
  private fileInput;

  constructor(props: IUploadFileProps) {
    super(props);

    this.state = {
      isUploading:false,
      percent:0,

    };

    this.fileInput = React.createRef();
  }

  private  _fireUploadFile =   () => {
    // fire click event
    this.fileInput.current.value = '';
    this.fileInput.current.click();

  }


  public async componentDidMount(): Promise<void> {
    this._fireUploadFile();
  }


  public componentDidUpdate(prevProps: IUploadFileProps, prevState: IUploadFileState): void {
    this._fireUploadFile();
  }
  /**
   * Add a new attachment
   */
  private uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();

    const reader = new FileReader();
     file = e.target.files[0];
      console.log("file name",file.name);
      try {
       // this.props.onFileUpload(file);
       const groupUrl = await this.props.spservice.getGrouoUrl(this.props.groupId);
       const groupDefaultLibrary = await this.props.spservice.getGroupDocumentLibraryUrl(this.props.groupId);
       const web = new Web(groupUrl);
       const serverRelativedocumentLibrary = groupDefaultLibrary.replace(location.origin, '');

       const rs = await web.getFolderByServerRelativeUrl(serverRelativedocumentLibrary).files.addChunked(
         file.name,
         file,
         (data: ChunkedFileUploadProgressData) => {

           this.setState({percent: data.currentPointer / data.fileSize, isUploading:true});
           console.log('File Upload chunked %', (data.currentPointer / data.fileSize) );
         },
         true
       );
       this.setState({percent: 1, isUploading:true});
       setTimeout(() => {
        this.setState({isUploading:false});
        this.props.onFileUpload(file, groupDefaultLibrary);
       }, 500);
      } catch (error) {
        console.log('rs-e', error);
      }
    }



  public render(): React.ReactElement<IUploadFileProps> {
    return (
      <div>
      <input id="file-picker"
      style={{ display: 'none' }}
      type="file"
      onChange={(event) => this.uploadFile(event)}

      ref={this.fileInput} />
      {
        this.state.isUploading &&
        <Stack horizontalAlign="start" horizontal gap="10" style={{width:'100%'}}>
        <Icon iconType={IconType.Default} iconName={"CloudUpload"}  className={tsStyles.classNames.iconUploadStyles} />
        <ProgressIndicator className={tsStyles.classNames.progressIndicatorStyles} label={file.name} description={`${strings.Uploading} ${Math.round(this.state.percent * 100)} %`} percentComplete={(this.state.percent)}></ProgressIndicator>
        </Stack>
      }
      </div>
    );
  }
}
