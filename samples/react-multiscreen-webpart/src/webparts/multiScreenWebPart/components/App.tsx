import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Screen1 } from './Screen1';
import { Screen2 } from './Screen2';
import { Header } from './Header';
import { Product } from './Product';

export class App extends React.Component<{}, {}> {
  public render(): React.ReactElement<{}> {
    return (
      <Router>
        <div>
          <h2>App</h2>

          <Header />

          {/* The different screens will be re-rendered here */}

          <Route path="/screen1" component={Screen1} />
          <Route path="/screen2" component={Screen2} />
          <Route path="/products/:id" component={Product} />

          <div>Footer</div>
        </div>
      </Router>
    );
  }
}
