import * as React from 'react';
import { IHooksProps } from './IHooksProps';
import {LoadListComponent} from './LoadList';
export default class Hooks extends React.Component<IHooksProps, {}> {
  public render(): React.ReactElement<IHooksProps> {
    return (
      <LoadListComponent />
    );
  }
}
