import * as React from 'react';
import styles from './ReactImageEditor.module.scss';

import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { DisplayMode } from '@microsoft/sp-core-library';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';

import { ImageManipulation, IImageManipulationSettings } from 'react-image-manipulation-spfx'


export interface IReactImageEditorProps extends IReactImageEditorBaseProps {
  displayMode: DisplayMode;
  context: WebPartContext;

  updateTitleProperty: (value: string) => void;
  updateUrlProperty: (value: string) => void;
  updateManipulationSettingsProperty: (value: IImageManipulationSettings[]) => void;
}
export interface IReactImageEditorBaseProps {
  showTitle: boolean;
  title: string;
  url?: string
  settings?: IImageManipulationSettings[];

}
export interface IReactImageEditorState {
  filepickerOpen: boolean
}

export default class ReactImageEditor extends React.Component<IReactImageEditorProps, IReactImageEditorState> {
  constructor(props: IReactImageEditorProps) {
    super(props);
    this.state = {
      filepickerOpen: true
    }
  }
  public render(): React.ReactElement<IReactImageEditorProps> {
    const { url, settings } = this.props;
    const isConfigured = url && url.length > 0;
    const isFilePickerOpen = this.state.filepickerOpen
    return (

      <div className={styles.reactImageEditor}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateTitleProperty} />
        {isConfigured ? (<Placeholder iconName='Edit'
          iconText='Configure your web part'
          description='Please configure the web part.'
          buttonLabel='Configure'
          onConfigure={this._onConfigure} />) :
          (<ImageManipulation
            settings={settings}
            configsettings={{
              rotateButtons: [-90, -45, -30, 0, 30, 45, 90]
            }
            }
            displyMode={DisplayMode.Edit}
            settingschanged={this.props.updateManipulationSettingsProperty}
            src={url}
          />)}
        {isFilePickerOpen}
        <FilePicker
          accepts={[".gif", ".jpg", ".jpeg", ".png"]}
          buttonIcon="FileImage"
          onSave={(filePickerResult: IFilePickerResult) => { this.props.updateUrlProperty(filePickerResult.fileAbsoluteUrl) }}
          onCancel={() => { this.props.updateUrlProperty('') }}
          onChanged={(filePickerResult: IFilePickerResult) => { this.props.updateUrlProperty(filePickerResult.fileAbsoluteUrl) }}
          context={this.props.context}
        />
      </div >
    );
  }

  private _onConfigure = () => {
    // Context of the web part
    this.props.context.propertyPane.open();
  }
}
