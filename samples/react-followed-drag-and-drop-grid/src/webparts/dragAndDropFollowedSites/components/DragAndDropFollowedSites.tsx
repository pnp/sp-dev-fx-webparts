import * as React from 'react';
import { MSGraphClient } from '@microsoft/sp-http';
import { IDragAndDropFollowedSitesProps } from './IDragAndDropFollowedSitesProps';

export default class DragAndDropFollowedSites extends React.Component<IDragAndDropFollowedSitesProps, {}> {

  public componentDidMount(): void {
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {

      });
  }

  public render(): React.ReactElement<IDragAndDropFollowedSitesProps> {
    return (
      <div>
        <span>fallowed sites</span>
      </div>
    );
  }
}
