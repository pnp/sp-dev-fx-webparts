import * as React from 'react';

import { Greeter, ReactiveInfo } from '../components';

const DefaultContainer = ({ name, reactive }) => (
  <div>
    <Greeter name={name} />
    <ReactiveInfo reactive={reactive} />
  </div>
);

export default DefaultContainer;
