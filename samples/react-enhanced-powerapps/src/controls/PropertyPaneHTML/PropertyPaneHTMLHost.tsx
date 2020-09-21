import * as React from 'react';
import { IPropertyPaneHTMLHostProps } from './IPropertyPaneHTMLHostProps';

export default class PropertyPaneHTMLHost extends React.Component<IPropertyPaneHTMLHostProps> {

  public render(): JSX.Element {
    return (
          <div dangerouslySetInnerHTML={{ __html: this.props.html }}></div>
    );
  }
}
