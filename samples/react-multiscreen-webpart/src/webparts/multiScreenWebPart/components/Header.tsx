import * as React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component<{}, {}> {
  public render(): React.ReactElement<{}> {
    return (
      <div>
        <Link to="/" >Home</Link> |
        <Link to="/screen1" > Go to screen 1</Link> |
        <Link to="/screen2" > Go to screen 2</Link>
      </div>
    );
  }
}
