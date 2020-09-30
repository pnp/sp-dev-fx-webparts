import * as React from 'react';
import styles from './Attachments.module.scss';
import * as tsStyles from './AttachmentsStyles';
import { ITaskExternalReference } from '../../../../services/ITaskExternalReference';
import {
  DefaultPalette,
  Icon,
  DefaultButton,
  IContextualMenuProps,
  IContextualMenuItem,
  IconType,
  Link,
  IColumn,
  DetailsList,
  DetailsListLayoutMode,
  getTheme,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  LinkBase,
  Stack,

} from 'office-ui-fabric-react';
import { IAttachmentsProps } from './IAttachmentsProps';
import { IAttachmentsState } from './IAttachmentsState';
import { SelectionMode } from '@pnp/spfx-controls-react';
import { UploadFromSharePoint } from '../../../../Controls/UploadFromSharePoint';
import { AddLink } from './../../../../Controls/AddLink';
import { UploadFile } from './../../../../Controls/UploadFile';
import { IListViewItems } from './IListViewItems';
import { utilities } from '../../../../utilities';
import { IFile } from './IFile';
import { ITaskDetails } from '../../../../services/ITaskDetails';
import { EditLink } from '../../../../Controls/EditLink';
import  * as strings from 'MyTasksWebPartStrings';

export class Attachments extends React.Component<IAttachmentsProps, IAttachmentsState> {
  private _listViewItems: IListViewItems[] = [];
  private _util = new utilities();
  private _selectedItem: IListViewItems = {} as IListViewItems;

  private _theme = getTheme();
  constructor(props: IAttachmentsProps) {
    super(props);

    const listAttachmentsItemMenuProps: IContextualMenuProps = {
      items: [
        {
          key: '0',
          text: strings.EditLabel,
          iconProps: { iconName: 'Edit' },
          onClick: this._editAttachment.bind(this)

          // onClick: this.onClickFilterAllTasks.bind(this)
        },
        {
          key: '1',
          text: strings.RemoveLabel,
          iconProps: { iconName: 'Delete' },
          onClick: this._removeAttachment.bind(this)
          // onClick: this.onClickFilterNotStartedTasks.bind(this)
        }
      ]
    };
    const columns: IColumn[] = [
      {
        key: 'column1',
        name: 'File_x0020_Type',
        className: tsStyles.classNames.fileIconCell,
        iconClassName: tsStyles.classNames.fileIconHeaderIcon,
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'name',
        minWidth: 28,
        maxWidth: 28,
        onRender: (item: IListViewItems) => {
          return (
            <div className={tsStyles.classNames.centerColumn}>
              <Icon iconType={IconType.Image} imageProps={{ src: item.fileTypeImageUrl, height: 26, width: 26 }} />
            </div>
          );
        }
      },
      {
        name: 'Name',
        key: 'column2',
        fieldName: 'FileName',
        minWidth: 430,
        maxWidth: 430,
        isResizable: false,
        data: 'string',
        isPadded: true,
        onRender: (item: IListViewItems) => {
          return (
            <div className={tsStyles.classNames.centerColumn}>
              <Stack horizontal horizontalAlign='start' gap='10'>
                <Link
                  onClick={(event: React.MouseEvent<HTMLAnchorElement | HTMLElement | HTMLButtonElement | LinkBase, MouseEvent>) => {
                    event.preventDefault();
                    window.open(decodeURIComponent(item.fileUrl));
                  }}>
                  {item.fileName}
                </Link>
              </Stack>
            </div>
          );
        }
      },
      {
        name: 'more',
        key: 'column3',
        fieldName: 'FileName',
        minWidth: 20,
        maxWidth: 20,
        isResizable: true,
        data: 'string',
        isPadded: true,
        onRender: (item: IListViewItems) => {
          return (
            <div className={tsStyles.classNames.centerColumn}>
              <DefaultButton
                style={{ backgroundColor: '#1fe0' }}
                iconProps={{ iconName: 'More' }}
                text={''}
                menuIconProps={{ iconName: '' }}
                menuProps={listAttachmentsItemMenuProps}
                disabled={false}
                id={item.fileUrl}
                checked={true}
              />
            </div>
          );
        }
      }
    ];

    this.state = {
      value: '',
      displayUploadFromSharePoint: false,
      displayLinkAttachment: false,
      editLinkAttachment: false,
      uploadFile: false,
      renderReferences: [],
      columns: columns,
      listViewItems: [],
      taskDetails: this.props.taskDetails,
      hasError: false,
      errorMessage: '',
      isLoading: false,
      percent: 0,
      showDefaultLinkImage: false
    };
  }

  public componentDidUpdate(prevProps: IAttachmentsProps, prevState: IAttachmentsState): void {}

  private _loadReferences = async () => {
    const referenceKeys = Object.keys(this.state.taskDetails.references);
    this._listViewItems = [];
    for (const key of referenceKeys) {
      const reference = this.state.taskDetails.references[key];
      if (reference) {
        const fileImageUrl = await this._util.GetFileImageUrl(decodeURIComponent(key));
        //		reference.type !== 'Other' ? await this._util.GetFileImageUrl(decodeURIComponent(key)) : `${decodeURIComponent(key)}/favicon.ico`;
        this._listViewItems.push({
          fileName: reference.alias,
          fileUrl: decodeURIComponent(key),
          fileTypeImageUrl: fileImageUrl,
          isUploading: false,
          fileUploadPercent: 0
        });
      }
    }
    this.setState({ listViewItems: this._listViewItems, isLoading: false });
  };

  /**
   * Components did mount
   * @returns did mount
   */
  public async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true });
    await this._loadReferences();
  }

  /**
   * Determines whether dismiss upload from share point on
   */
  private _onDismissUploadFromSharePoint = () => {
    this.setState({ displayUploadFromSharePoint: false });
  };

  /**
   * Upload from share point of attachments
   */
  private _uploadFromSharePoint = (
    ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ) => {
    this.setState({ displayUploadFromSharePoint: true });
  };
  /**
   * Link attachment of attachments
   */

  private _onActiveItemChanged = (item: IListViewItems, index: number, ev: React.FocusEvent<HTMLElement>) => {
    ev.preventDefault();
    this._selectedItem = item;
  };

  /**
   * Link attachment of attachments
   */
  private _LinkAttachment = (
    ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ) => {
    this.setState({ displayLinkAttachment: true });
  };

  /**
   * Edit attachment of attachments
   */
  private _editAttachment = async (
    event?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ): Promise<void> => {
    event.preventDefault();

    this.setState({ editLinkAttachment: true });
  };

  /**
   * Remove attachment of attachments
   */
  private _removeAttachment = async (
    ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ) => {
    try {
      let newReferences: ITaskExternalReference = this.state.taskDetails.references;
      const fileFullUrl: string = `${this._selectedItem.fileUrl}`.replace(/\./g, '%2E').replace(/\:/g, '%3A');

      for (const referenceKey of Object.keys(this.state.taskDetails.references)) {
        const originalReference = this.state.taskDetails.references[referenceKey];
        if (fileFullUrl == referenceKey) {
          newReferences[referenceKey] = null;
        } else {
          newReferences[referenceKey] = {
            alias: originalReference.alias,
            '@odata.type': '#microsoft.graph.plannerExternalReference',
            type: originalReference.type,
            previewPriority: ' !'
          };
        }
      }

      const updatedTaskDetails  = await this.props.spservice.updateTaskDetailsProperty(
        this.state.taskDetails.id,
        'References',
        newReferences,
        this.state.taskDetails['@odata.etag']
      );
      delete newReferences[fileFullUrl];
      this.setState({
        hasError: false,
        errorMessage: '',
        taskDetails: updatedTaskDetails
      });
      await this._loadReferences();
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    }
  };

  /**
   * Determines whether dismiss link attachment on
   */
  private _onDismissLinkAttachment = (updTaskDetails: ITaskDetails) => {
    this.setState({ displayLinkAttachment: false, taskDetails: updTaskDetails });
    this._loadReferences();
    // tslint:disable-next-line: semicolon
  };

  /**
   * Determines whether dismiss edit link attachment on
   */
  private _onDismissEditLinkAttachment = (updTaskDetails: ITaskDetails) => {
    this.setState({ editLinkAttachment: false, taskDetails: updTaskDetails });
    this._loadReferences();
    // tslint:disable-next-line: semicolon
  };
  /**
   * Upload file of attachments
   */
  private _uploadFile = () => {
    this.setState({ uploadFile: true });
  };

  /**
   * Determines whether file upload on
   */
  private _onFileUpload = async (file: File, groupDefaultLibrary: string) => {
    const fileUrl = `${decodeURIComponent(groupDefaultLibrary)}/${file.name}`;
    const fileType = await this._util.getFileType(file.name);
    let newReferences: ITaskExternalReference = {} as ITaskExternalReference;
    const fileFullUrl: string = `${fileUrl}`.replace(/\./g, '%2E').replace(/\:/g, '%3A');
    newReferences[fileFullUrl] = {
      alias: file.name,
      '@odata.type': '#microsoft.graph.plannerExternalReference',
      type: fileType,
      previewPriority: ' !'
    };

    for (const referenceKey of Object.keys(this.state.taskDetails.references)) {
      const originalReference = this.state.taskDetails.references[referenceKey];
      newReferences[referenceKey] = {
        alias: originalReference.alias,
        '@odata.type': '#microsoft.graph.plannerExternalReference',
        type: originalReference.type,
        previewPriority: ' !'
      };
    }

    this.setState({
      hasError: false,
      errorMessage: '',
      taskDetails: { ...this.state.taskDetails, references: newReferences }
    });
    await this._loadReferences();

    try {
      const updatedTaskDetails = await this.props.spservice.updateTaskDetailsProperty(
        this.state.taskDetails.id,
        'References',
        newReferences,
        this.state.taskDetails['@odata.etag']
      );

      this.setState({
        taskDetails: updatedTaskDetails ,
        uploadFile: false
      });
      // const rs:FileAddResult = await web.getFolderByServerRelativeUrl(documentLibrary).files.add(fileName,fileB64,true);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Determines whether select file on
   */
  private _onSelectFile = async (file: IFile) => {
    try {
      const fileType = await this._util.getFileType(file.FileLeafRef);
      let newReferences: ITaskExternalReference = {} as ITaskExternalReference;
      const fileFullUrl: string = `${location.origin}${file.fileUrl}`.replace(/\./g, '%2E').replace(/\:/g, '%3A');
      newReferences[fileFullUrl] = {
        alias: file.FileLeafRef,
        '@odata.type': '#microsoft.graph.plannerExternalReference',
        type: fileType,
        previewPriority: ' !'
      };

      for (const referenceKey of Object.keys(this.state.taskDetails.references)) {
        const originalReference = this.state.taskDetails.references[referenceKey];
        newReferences[referenceKey] = {
          alias: originalReference.alias,
          '@odata.type': '#microsoft.graph.plannerExternalReference',
          type: originalReference.type,
          previewPriority: ' !'
        };
      }

      const updatedTaskDetails = await this.props.spservice.updateTaskDetailsProperty(
        this.state.taskDetails.id,
        'References',
        newReferences,
        this.state.taskDetails['@odata.etag']
      );

      this.setState({
        displayUploadFromSharePoint: false,
        hasError: false,
        errorMessage: '',
        taskDetails: updatedTaskDetails
      });
      await this._loadReferences();
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    }
  };
  /**
   * Renders attachments
   * @returns render
   */
  public render(): React.ReactElement<IAttachmentsProps> {
    const addAttachmentMenuProps: IContextualMenuProps = {
      items: [
        {
          key: '0',
          text: strings.FileLabel,
          iconProps: { iconName: 'Upload' },
          onClick: this._uploadFile
          // onClick: this.onClickFilterAllTasks.bind(this)
        },
        {
          key: '1',
          text: strings.LinkLabel,
          iconProps: { iconName: 'Link' },
          onClick: this._LinkAttachment
          // onClick: this.onClickFilterNotStartedTasks.bind(this)
        },
        {
          key: '2',
          text: strings.SharePointLabel,
          iconProps: { iconName: 'SharepointLogo', style: { color: this._theme.palette.themePrimary } },
          onClick: this._uploadFromSharePoint

          // onClick: this.onClickFilterStartedTasks.bind(this)
        }
      ]
    };

    return (
      <div>
        <DefaultButton
          style={{ backgroundColor: this._theme.palette.neutralLighter }}
          iconProps={{ iconName: 'Add' }}
          text={strings.AddAttachmentLabel}
          menuIconProps={{ iconName: '' }}
          menuProps={addAttachmentMenuProps}
          disabled={false}
          checked={true}
        />
        {this.state.uploadFile && (
          <UploadFile spservice={this.props.spservice} groupId={this.props.groupId} onFileUpload={this._onFileUpload} />
        )}
        <div style={{ width: '100%', marginTop: 15 }} />
        {this.state.hasError && <MessageBar messageBarType={MessageBarType.error}>{this.state.errorMessage}</MessageBar>}
        {this.state.isLoading && <Spinner size={SpinnerSize.medium} />}
        <div style={{ marginBottom: 40 }}>
          <DetailsList
            items={this.state.listViewItems}
            compact={false}
            columns={this.state.columns}
            selectionMode={SelectionMode.none}
            setKey='none'
            onActiveItemChanged={this._onActiveItemChanged}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={false}
          />
        </div>
        {this.state.displayUploadFromSharePoint && (
          <UploadFromSharePoint
            groupId={this.props.groupId}
            spservice={this.props.spservice}
            displayDialog={this.state.displayUploadFromSharePoint}
            onDismiss={this._onDismissUploadFromSharePoint}
            onSelectedFile={this._onSelectFile}
            currentReferences={this.state.taskDetails.references}
          />
        )}
        {this.state.displayLinkAttachment && (
          <AddLink
            spservice={this.props.spservice}
            displayDialog={true}
            onDismiss={this._onDismissLinkAttachment}
            taskDetails={this.state.taskDetails}
          />
        )}
        {this.state.editLinkAttachment && (
          <EditLink
            spservice={this.props.spservice}
            displayDialog={true}
            onDismiss={this._onDismissEditLinkAttachment}
            taskDetails={this.state.taskDetails}
            link={this._selectedItem.fileUrl}
          />
        )}
      </div>
    );
  }
}
