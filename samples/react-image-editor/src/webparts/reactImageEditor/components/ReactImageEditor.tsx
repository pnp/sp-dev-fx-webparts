import * as React from 'react';
import styles from './ReactImageEditor.module.scss';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { DisplayMode, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
import { ImageManipulation, IImageManipulationSettings } from '../../../components/ImageManipulation';

export interface IReactImageEditorBaseProps {
  showTitle: boolean;
  title: string;
  url?: string;
  settings?: IImageManipulationSettings[];

}

export interface IReactImageEditorProps extends IReactImageEditorBaseProps {
  displayMode: DisplayMode;
  context: WebPartContext;
  updateTitleProperty: (value: string) => void;
  updateUrlProperty: (value: string) => void;
  updateManipulationSettingsProperty: (value: IImageManipulationSettings[]) => void;
}

export interface IReactImageEditorState {
  isFilePickerOpen: boolean;
  statekey: string;
}

export default class ReactImageEditor extends React.Component<IReactImageEditorProps, IReactImageEditorState> {
  constructor(props: IReactImageEditorProps) {
    super(props);
    this.state = {
      isFilePickerOpen: false,
      statekey: 'init'
    };
    this._onConfigure = this._onConfigure.bind(this);
    this._onUrlChanged = this._onUrlChanged.bind(this);
    this._onSettingsChanged = this._onSettingsChanged.bind(this);
  }
  public render(): React.ReactElement<IReactImageEditorProps> {
    const { url, settings } = this.props;
    const { isFilePickerOpen } = this.state;
    const isConfigured: boolean = !!url && url.length > 0;
    return (

      <div className={styles.reactImageEditor}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateTitleProperty} />
        {(isFilePickerOpen || isConfigured) && Environment.type !== EnvironmentType.Local &&
          <FilePicker
            isPanelOpen={isFilePickerOpen}
            accepts={['.gif', '.jpg', '.jpeg', '.png']}
            buttonIcon='FileImage'
            onSave={(filePickerResult: IFilePickerResult) => {
              this.setState({ isFilePickerOpen: false }, () => this._onUrlChanged(filePickerResult.fileAbsoluteUrl));
            }}
            onCancel={() => {
              this.setState({ isFilePickerOpen: false });
            }}
            onChanged={(filePickerResult: IFilePickerResult) => {
              this.setState({ isFilePickerOpen: false }, () => this._onUrlChanged(filePickerResult.fileAbsoluteUrl));

            }}
            context={this.props.context}
          />}

        {!isConfigured ? (<Placeholder iconName='Edit'
          iconText='Configure your web part'
          description='Please configure the web part.'
          buttonLabel='Configure'
          onConfigure={this._onConfigure} />) :
          (
          <ImageManipulation
            settings={this.props.settings}
            configSettings={{
              rotateButtons: [-90, -45, -30, 0, 30, 45, 90]
            }
            }
            displayMode={this.props.displayMode}
            settingsChanged={this._onSettingsChanged}
            src={this.props.url}
          />
          )}

      </div >
    );
  }

  private _onConfigure = () => {
    if (Environment.type === EnvironmentType.Local) {
      this.setState({ isFilePickerOpen: false }, () => {
        this._onUrlChanged(
          'https://media.gettyimages.com/photos/'
          + 'whitewater-paddlers-descend-vertical-waterfall-in-kayak-picture-id1256321293?s=2048x2048'
          );
      });
    } else {
      this.setState({ isFilePickerOpen: true });
    }
  }
  private _onUrlChanged = (url: string) => {
    this.props.updateUrlProperty(url);
  }
  private _onSettingsChanged = (settings: IImageManipulationSettings[]) => {
    this.props.updateManipulationSettingsProperty(settings);
  }
}
