import * as React from 'react';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IHelloWorldProps } from './IHelloWorldProps';
import AppContext from '../common/AppContext';
import HelloUser from "./HelloUser";

const HelloWorld: React.FunctionComponent<IHelloWorldProps> = (props: { serviceScope: ServiceScope; }) =>

  /* Context is designed to share data that can be considered “global” for a tree of React components. 
  Set the AppContext value to pass in the serviceScope property which can be consumed by child components */
  <AppContext.Provider value={{ serviceScope: props.serviceScope }}>

    <h1>Consuming SPFX Service Scopes using React Hooks</h1>
    <div>
      <HelloUser />
    </div>

  </AppContext.Provider>;

export default HelloWorld;