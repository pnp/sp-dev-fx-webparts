import * as React from 'react';
import { IClassicReactWebPartProps } from './IClassicReactWebPartProps';
import { LoadListComponent } from '../../hooks/components/LoadList';

export default class ClassicReactWebPart extends React.Component<IClassicReactWebPartProps, {}> {
 
  public render(): React.ReactElement<IClassicReactWebPartProps> {   
    return (
      <LoadListComponent />
    );
  }
}
