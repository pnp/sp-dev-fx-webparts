import * as React from 'react';
import { connect } from 'react-redux';

import { IState } from '../store';
import { Greeter, ReactiveInfo } from '../components';

const mapStateToProps = (state: IState) => ({
  name: state.webpart.properties.name,
  reactive: !state.webpart.properties.disableReactive
});

const DefaultContainer = ({ name, reactive }) => (
  <div>
    <Greeter name={name} />
    <ReactiveInfo reactive={reactive} />
  </div>
);

export default connect(mapStateToProps)(DefaultContainer);
