import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';

import Loader from './components/Loader';
import { ILoaderProps } from './components/ILoaderProps';

export interface ILoaderWebPartProps {
}

export default class LoaderWebPart extends BaseClientSideWebPart<ILoaderWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ILoaderProps > = React.createElement(
      Loader
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
