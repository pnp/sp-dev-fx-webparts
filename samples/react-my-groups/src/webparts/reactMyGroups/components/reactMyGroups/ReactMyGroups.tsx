import * as React from 'react';
import styles from './ReactMyGroups.module.scss';
import { IReactMyGroupsProps } from './IReactMyGroupsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import GroupService from '../../../../services/GroupService';
import { IReactMyGroupsState } from './IReactMyGroupsState';
import { GroupList } from '../GroupList';
import { IGroup } from '../../../../models';
import { Spinner, DocumentCard, DocumentCardType, DocumentCardDetails, DocumentCardTitle, IDocumentCardPreviewProps, ImageFit, DocumentCardPreview, IconFontSizes, ISize, isVirtualElement, DocumentCardLocation, DocumentCardActivity } from 'office-ui-fabric-react';
import { GridLayout } from '../GridList';

const colors = ['#17717A','#4A69DB','#303952','#A4262C','#3A96DD','#CA5010','#8764B8','#498205','#69797E'];

export class ReactMyGroups extends React.Component<IReactMyGroupsProps, IReactMyGroupsState> {

  constructor(props: IReactMyGroupsProps) {
    super(props);

    this.state = {
      groups: [],
      isLoading: true
    };

  }

  public render(): React.ReactElement<IReactMyGroupsProps> {
    return (
      <div className={ styles.reactMyGroups }>
        <div className={styles.title} role="heading" aria-level={2}>{this.props.title} </div>
          {this.state.isLoading ?
            <Spinner label="Loading sites..." />
                : 
                <div>
                  {this.props.layout == 'Compact' ?
                  <GroupList groups={this.state.groups} onRenderItem={(item: any, index: number) => this._onRenderItem(item, index)}/>
                : <GridLayout items={this.state.groups} onRenderGridItem={(item: any, finalSize: ISize, isCompact: boolean) => this._onRenderGridItem(item, finalSize, isCompact)}/>
                }
                </div>
          }
      </div>
    );
  }

  public componentDidMount (): void {
    this._getGroups();
  }

  public _getGroups = (): void => {
    GroupService.getGroups().then(groups => {
      this.setState({
        groups: groups
      });
      this._getGroupLinks(groups);
    });
  }

  public _getGroupLinks = (groups: any): void => {
    groups.map(groupItem => (
      GroupService.getGroupLinks(groupItem).then(groupurl => {
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
        //set group color:
        const itemColor = colors[Math.floor(Math.random() * colors.length)];
        this.setState(prevState => ({
          groups: prevState.groups.map(group => group.id === groupItem.id ? {...group, thumbnail: grouptb, color: itemColor} : group)
        }));
      })
    ));
    console.log('Set False');
    this.setState({
      isLoading: false
    });
  }

  private _onRenderItem = (item: any, index: number): JSX.Element => {
    return (
      <div className={styles.compactContainer}>
        <a className={styles.compactA} href={item.url}>
          <div className={styles.compactWrapper}>
            <img className={styles.compactBanner} src={item.thumbnail} />
            <div className={styles.compactDetails}>
              <div className={styles.compactTitle}>{item.displayName}</div>
            </div>
          </div>
        </a>
      </div>
    );
  }

  private _onRenderGridItem = (item: any, finalSize: ISize, isCompact: boolean): JSX.Element => {
    return (
        <div className={styles.siteCard}>
            <a href={item.url}>
              <div className={styles.cardBanner}>
                <div className={styles.topBanner} style={{backgroundColor: item.color}}></div>
                <img className={styles.bannerImg} src={item.thumbnail} />
                <div className={styles.cardTitle}>{item.displayName}</div>
              </div>
            </a>
        </div>
    );
  }
  
}
