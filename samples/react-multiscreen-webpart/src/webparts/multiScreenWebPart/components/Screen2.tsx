import * as React from 'react';
import { Link } from 'react-router-dom';

export class Screen2 extends React.Component<{}, {}> {
  public render(): React.ReactElement<{}> {
    return (
      <div>
        <h2>Screen 2</h2>

        <ul>
          <li><Link to="/products/1">Product 1</Link></li>
          <li><Link to="/products/2">Product 2</Link></li>
        </ul>
      </div>
    );
  }
}
