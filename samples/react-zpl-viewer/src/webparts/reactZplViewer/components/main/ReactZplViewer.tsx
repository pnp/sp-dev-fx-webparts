import * as React from 'react';
import styles from './ReactZplViewer.module.scss';
import { IReactZplViewerProps } from './IReactZplViewerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
import { IReactZplViewerState } from './IReactZplViewerState';
import { TextField, Text, PrimaryButton, Label, Dropdown, Slider } from 'office-ui-fabric-react';
import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";

const baseUrl: string = 'http://api.labelary.com/v1/printers/8dpmm/labels/';

export class ReactZplViewer extends React.Component<IReactZplViewerProps, IReactZplViewerState> {


  constructor(props: IReactZplViewerProps) {
    super(props);

    this.state = {
      selectedFile: null,
      showSelectedFile: false,
      zpl: "",
      labelImage: {
        url: null,
        height: null,
        width: null
      }
    };
  }

  public render(): React.ReactElement<IReactZplViewerProps> {
    return (
      <div className={ styles.reactZplViewer }>
        <h1>ZPL Viewer</h1>
        <div className={"ms-Grid"}>
          <div className={"ms-Grid-row"}>
            <div className={"ms-Grid-col"}>
              {this.state.showSelectedFile == true ?
              <Text>{this.state.selectedFile.fileName}</Text>
              : <div>No File Selected</div>
            }
            </div>
            <div className={"ms-Grid-col"}>
              <FilePicker
                accepts={[".txt"]}
                onSave={this._getFile}
                onChanged={this._getFile}
                context={this.props.context}
                buttonLabel="Select File"
                hideLinkUploadTab={true}
                hideLocalUploadTab={true}
                hideOneDriveTab={true}
                hideOrganisationalAssetTab={true}
                hideRecentTab={true}
              />
            </div>
          </div>
          <div className={"ms-Grid-row"}>
            <Label>Label Size:</Label>
            <Slider
              label="Width:"
              min={1}
              max={10}
              showValue={true}
              onChange={(value: number) => this.setState({width: value})}
            />
            <Slider
              label="Height:"
              min={1}
              max={10}
              showValue={true}
              onChange={(value: number) => this.setState({height: value})}
            />
          </div>
          <div className={"ms-Grid-row"}>
            <PrimaryButton
                text="Show Label"
                onClick={this._showLabel}
                disabled={!this.state.showSelectedFile}
            />

          </div>
          <div className={"ms-Grid-row"}>
          {this.state.labelImage.url !== null ?
          <div className={styles.imgBackground} >
            <img width={this.state.labelImage.width+'00px'} height={this.state.labelImage.height+'00px'} className={styles.imgLabel} src={this.state.labelImage.url} alt="ZPL Label" />
          </div>
          : <div></div>
          }
        </div>
        </div>
      </div>
    );
  }

  private _getFile = (filePickerResult: IFilePickerResult): void => {
    this.setState({
      selectedFile: filePickerResult,
      showSelectedFile: true
    }, () => {
      this._getZpl();
    });
  }

  private  _getZpl = (): void => {
    const relativeURL: string = this.state.selectedFile.fileAbsoluteUrl.split("com").pop();
    sp.web.getFileByServerRelativeUrl(relativeURL).getText().then(zpl => {
      this.setState({
        zpl: zpl
      });
    });
  }

  private _showLabel = (): void => {
    const imageUrl: string = baseUrl + `${this.state.width}x${this.state.height}/0/${this.state.zpl}`;
    const imageWidth: string = this.state.width.toString();
    const imageHeight: string = this.state.height.toString();
    this.setState({
      labelImage: {
        url: imageUrl,
        width: imageWidth,
        height: imageHeight
      },
    });
  }

}
