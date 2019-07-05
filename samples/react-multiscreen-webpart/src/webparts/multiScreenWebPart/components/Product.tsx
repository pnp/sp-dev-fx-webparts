import * as React from 'react';

export class Product extends React.Component<{match: any}, {}> {
  public render(): React.ReactElement<{}> {
    return (
      <div>
        <h2>Product with ID: {this.props.match.params.id}</h2>
      </div>
    );
  }
}
