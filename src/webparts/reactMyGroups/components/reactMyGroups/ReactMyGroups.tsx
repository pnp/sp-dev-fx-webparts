import * as React from 'react';
import styles from './ReactMyGroups.module.scss';
import { IReactMyGroupsProps } from './IReactMyGroupsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import GroupService from '../../../../services/GroupService';
import { IReactMyGroupsState } from './IReactMyGroupsState';
import { GroupList } from '../GroupList';
import { IGroup } from '../../../../models';
import { DocumentCard, DocumentCardType, DocumentCardDetails, DocumentCardTitle, IDocumentCardPreviewProps, ImageFit, DocumentCardPreview } from 'office-ui-fabric-react';

export class ReactMyGroups extends React.Component<IReactMyGroupsProps, IReactMyGroupsState> {

  constructor(props: IReactMyGroupsProps) {
    super(props);

    this.state = {
      groups: []
    };

  }

  public render(): React.ReactElement<IReactMyGroupsProps> {
    return (
      <div className={ styles.reactMyGroups }>
        <h1>My Office 365 Groups</h1>
          <GroupList groups={this.state.groups} onRenderItem={(item: any, index: number) => this._onRenderItem(item, index)}/>
      </div>
    );
  }

  public componentDidMount (): void {
    this._getGroups();
  }

  public _getGroups = (): void => {
    GroupService.getGroups().then(groups => {
      // console.log(groups);
      this.setState({
        groups: groups
      });
      this._getGroupLinks(groups);
    });
  }

  public _getGroupLinks = (groups: any): void => {
    groups.map(groupItem => (
      GroupService.getGroupLinks(groupItem).then(groupurl => {
        // console.log(groupurl.value);
        this.setState(prevState => ({
          groups: prevState.groups.map(group => group.id === groupItem.id ? {...group, url: groupurl.value} : group)
        }));
      })
    ));
    this._getGroupThumbnails(groups);
  }

  public _getGroupThumbnails = (groups: any): void => {
    groups.map(groupItem => (
      GroupService.getGroupThumbnails(groupItem).then(grouptb => {
        console.log(grouptb);
        this.setState(prevState => ({
          groups: prevState.groups.map(group => group.id === groupItem.id ? {...group, thumbnail: grouptb} : group)
        }));
      })
    ));
  }

  private _onRenderItem = (item: any, index: number): JSX.Element => {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: item.thumbnail,
          imageFit: ImageFit.center,
          height: 48,
          width: 48
        }
      ]
    };
    return (
      <div>
        <DocumentCard
          type={DocumentCardType.compact}
        >
          <DocumentCardPreview {...previewProps} />
          <DocumentCardDetails>
            <a href={item.url}>
              <DocumentCardTitle 
                title={item.displayName}
              />
            </a>
          </DocumentCardDetails>
        </DocumentCard>
      </div>
    );
  }

}
