import * as React from 'react';
import JSONEditor from "jsoneditor";
var schema = require("./../json-editor-wrapper/site-design-script-actions.schema.json");


import "jsoneditor/dist/jsoneditor.css";

export interface JsonEditorProps {
  onChange: (json: any) => void;
  onDirty: () => void;
  value: object;
  options: any;
  width: string;
  height: string;
  className?: string;
  config?: object;
  onValidate?: (error:boolean) => void;
}

export default class JsonEditorReact extends React.PureComponent<JsonEditorProps,
  any> {
  private timeout: any = undefined;
  private editor: JSONEditor;
  private div: any;
  public static defaultProps: Partial<JsonEditorProps> = {
    config: {},
    onDirty: () => { }
  };
  constructor(props: JsonEditorProps) {
    super(props);
    this.state = {
      currentValue: props.value,
      dirty: false
    };
   this.onValidate = this.onValidate.bind(this);
  }

  private handleChange = () => {

    this.setState({
      currentValue: this
        .editor
        .get(),
      dirty: true
    });
  }

  private  onValidate(json) {
    const vl = this.props.options.ajv.compile(schema);

    if (vl(json) && json.actions && json.actions.length > 0 && json['$schema'] && json.bindata && json.version){
      this.props.onValidate(true);
    }else{
      this.props.onValidate(false);
    }
  }

  private handleFocus = () => {
    this.setState({ controllingFocus: true });
  }

 private  handleBlur = () => {
    this.setState({ controllingFocus: false });
  }

 public  componentDidMount() {
    const { value, options } = this.props;

    const mergedOptions = {
      ...options,
      onChange: this.handleChange,
      onValidate: this.onValidate,

    };

    this.editor = new JSONEditor(this.div, mergedOptions);
    this
      .editor
      .set(value);
  }

  public componentDidUpdate(prevProps: JsonEditorProps, prevState: JsonEditorProps) {
    const { onChange, onDirty } = this.props;

    if (this.state.dirty === true && this.state.controllingFocus) {
      onDirty();
    }

    //if (this.state.dirty === true && !this.state.controllingFocus) {
    if (this.state.dirty === true) {
      this.timeout = setTimeout(() => {
        onChange(this.state.currentValue);
        this.setState({ dirty: false });
      }, 200);
    }

    //if (this.state.controllingFocus) {
    //    clearTimeout(this.timeout);
    //}

    if (prevProps.value !== this.props.value && !this.state.controllingFocus) {

      this
        .editor
        .set(this.props.value);
      this.setState({ currentValue: this.props.value, dirty: false });
    }
  }

  public componentWillUnmount() {
    this
      .editor
      .destroy();
    delete this.editor;
    clearTimeout(this.timeout);
  }

  public render() {
    const { className } = this.props;

    return (<div
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
      className={className}
      style={{ height: this.props.height , width: this.props.width}}
      ref={div => {
        this.div = div;
      }} />);
  }
}




