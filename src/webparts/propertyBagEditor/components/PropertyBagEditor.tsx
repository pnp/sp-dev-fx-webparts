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
    this.state = { properties: [] };
  }
  public componentWillMount() {
    pnp.sp.web.select("Title", "AllProperties").expand("AllProperties").get().then(r => {
      debugger;
      this.state.properties=r.AllProperties;
      this.setState(this.state);
      for (const prop in r.AllProperties){

      }
      console.log(r);
    });
  }
  public render(): React.ReactElement<IPropertyBagEditorProps> {
    return (
      <DetailsList items={this.state.properties}>
      </DetailsList>
    );
  }
}
