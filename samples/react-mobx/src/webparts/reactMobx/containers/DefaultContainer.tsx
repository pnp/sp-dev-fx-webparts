import * as React from 'react';
import { whyRun } from 'mobx';
import { observer, inject } from 'mobx-react';

import { Greeter, ReactiveInfo } from '../components';
import { WebpartStore } from '../store';

interface IDefaultContainerProps {
  webpart: WebpartStore;
}

const DefaultContainer = ({ webpart }: IDefaultContainerProps) => (
  <div>
    { console.log(whyRun()) }
    <Greeter name={webpart.properties.get('name')} />
    <ReactiveInfo reactive={!webpart.properties.get('disableReactive')} />
  </div>
);

export default inject(store => ({
  webpart: store.webpart as WebpartStore
}))(observer(DefaultContainer));
