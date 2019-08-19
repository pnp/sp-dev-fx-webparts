import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IWebPartContext
} from '@microsoft/sp-client-preview';

import CreateTask, { ICreateTaskProps } from './components/CreateTask';
import { ICreateTaskWebPartProps } from './ICreateTaskWebPartProps';

export default class CreateTaskWebPart extends BaseClientSideWebPart<ICreateTaskWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<ICreateTaskProps> = React.createElement(CreateTask, {});

    ReactDom.render(element, this.domElement);
  }
}
