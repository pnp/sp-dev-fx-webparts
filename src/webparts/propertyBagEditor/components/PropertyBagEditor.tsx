import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import styles from './PropertyBagEditor.module.scss';
import { IPropertyBagEditorProps } from './IPropertyBagEditorProps';
import pnp from "sp-pnp-js";
import { DetailsList, DetailsRow } from "office-ui-fabric-react/lib/DetailsList";
export interface IPropertyBagEditorState {
  properties: Array<any>;
}
export default class PropertyBagEditor extends React.Component<IPropertyBagEditorProps, IPropertyBagEditorState> {
  public constructor() {
    debugger;
    super();

  }
  public render(): React.ReactElement<IPropertyBagEditorProps> {
    return (
      <DetailsList items={this.props.properties}>
      </DetailsList>
    );
  }
}
