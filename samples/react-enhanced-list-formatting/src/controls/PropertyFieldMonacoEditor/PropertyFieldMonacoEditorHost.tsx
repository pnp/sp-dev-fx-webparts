import * as strings from 'MonacoControlsLibraryStrings';
import * as React from 'react';

// Custom props and state
import { IPropertyFieldMonacoEditorHostProps, IPropertyFieldMonacoEditorHostState } from './IPropertyFieldMonacoEditorHost';

// Office Fabric
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

// Custom styles
import styles from './PropertyFieldMonacoEditor.module.scss';

// Custom code editor panel
import { EditorPanel } from './EditorPanel';
import { MonacoEditor } from '../MonacoEditor';

export default class PropertyFieldNumberHost extends React.Component<IPropertyFieldMonacoEditorHostProps, IPropertyFieldMonacoEditorHostState> {
  constructor(props: IPropertyFieldMonacoEditorHostProps) {
    super(props);

    this.state = {
      value: this.props.value,
      fullScreen: false,
    };
  }

  /**
   * Render field
   */
  public render(): JSX.Element {

    return (
      <div>
        <Label>{this.props.label}</Label>
        <MonacoEditor
          value={this.props.defaultValue}
          theme={this.props.theme}
          readOnly={this.props.disabled}
          language={this.props.language}
          onDidBlurEditorText={(editorString: string)=> {
            this._handleOnChanged(editorString);
          }}
          showLineNumbers={this.props.showLineNumbers || false}
          showMiniMap={this.props.showMiniMap || false}
          showIndentGuides={this.props.showIndentGuides || false}
          folding={this.props.folding || false}
          className={styles.embeddedMonaco}
        />
        { this.props.showFullScreen !== false && <IconButton
          title={strings.ExpandButtonLabel}
          className={styles.fullScreenButton}
          iconProps={{ iconName: 'MiniExpand' }}
          onClick={() => this._handleOpenFullScreen()}
        />}

        {this.state.fullScreen &&
          <EditorPanel
            label={this.props.label}
            language={this.props.language}
            theme={this.props.theme}
            onSave={(value: string) => this._handleSaveFullScreen(value)}
            onClose={() => this._handleCloseFullScreen()}
            value={this.state.value}
            disabled={this.props.disabled}
            targetProperty={this.props.targetProperty}
            showMiniMap={true}
            showLineNumbers={true}
          />
        }
      </div>
    );
  }


  /**
   * On field change event handler
   */
  private _handleOnChanged = (value: string): void => {
    // Update state
    this.setState({
      value
    });


    this.props.onPropertyChange(this.props.targetProperty, this.props.initialValue, value);
    if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
      this.props.onChange(value);
    }
  }

  /**
   * Called when user clicks on the expand button
   */
  private _handleOpenFullScreen = () => {
    this.setState({
      fullScreen: true
    });
  }

  /**
   * Gets called by the editor pane when it is time to save
   */
  private _handleSaveFullScreen = (newValue: string) => {
    this.setState({ fullScreen: false });
    this._handleOnChanged(newValue);
  }

  /**
   * ets called by the editor pane when it is closed
   */
  private _handleCloseFullScreen = () => {
    this.setState({ fullScreen: false });
  }
}
