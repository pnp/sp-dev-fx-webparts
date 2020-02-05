import * as React from 'react';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldSliderWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldSliderWithCallout';
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import * as _ from "lodash";
import * as moment from 'moment';

import styles from './PageCommentsWebPart.module.scss';
import * as strings from 'PageCommentsWebPartStrings';

import * as $ from 'jquery';
require('textcomplete');
import { sp } from '@pnp/sp';
import SPHelper from './SPHelper';
require('./css/jquery-comments.css');

export interface IPageCommentsWebPartProps {
  enableNavigation: boolean;
  enableReplying: boolean;
  enableAttachments: boolean;
  enableEditing: boolean;
  enableUpvoting: boolean;
  enableDeleting: boolean;
  enableDeletingCommentWithReplies: boolean;
  enableHashtags: boolean;
  enablePinging: boolean;
  enableDocumentPreview: boolean;
  roundProfilePictures: boolean;
  datetimeFormat: string;
  attachmentFileFormats: string;
  attachmentFileSize: number;
  docLib: string;
}

export default class PageCommentsWebPart extends BaseClientSideWebPart<IPageCommentsWebPartProps> {

  private helper: SPHelper = null;
  private currentUserInfo: any = null;
  private siteUsers: any[] = [];
  private pageurl: string = '';
  private postAttachmentPath: string = '';
  private pageFolderExists: boolean = false;

  protected async onInit(): Promise<void> {
    await super.onInit();
    sp.setup(this.context);
  }

  public constructor() {
    super();
    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css");
  }

  public render(): void {
    if (this.properties.enableAttachments && (this.properties.docLib === null || undefined === this.properties.docLib ||
      this.properties.docLib.toLocaleUpperCase() === "NO_LIST_SELECTED")) {
      this.domElement.innerHTML = `
          <div class="${styles.errorMessage}"><i class="fa fa-times-circle" aria-hidden="true"></i>&nbsp;${strings.NoAttachmentRepoMsg}</div>
        `;
    } else {
      this.context.statusRenderer.displayLoadingIndicator(this.domElement, strings.LoadingMsg, 0);
      this.checkAndCreateList();
    }
  }

  private async checkAndCreateList() {
    if (this.properties.enableAttachments) {
      this.helper = new SPHelper(this.properties.docLib);
    } else {
      this.helper = new SPHelper();
    }
    await this.helper.checkListExists();
    this.initializeComments();
  }

  private initializeComments = async () => {
    this.context.statusRenderer.clearLoadingIndicator(this.domElement);
    this.domElement.innerHTML = `
      <div class="${ styles.pageComments}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div id="page-comments"></div>                        
          </div>
        </div>
      </div>`;
    var self = this;
    if (this.properties.enableAttachments) {
      await this.helper.getDocLibInfo();
      this.postAttachmentPath = await this.helper.getPostAttachmentFilePath(this.pageurl);
      this.pageFolderExists = await this.helper.checkForPageFolder(this.postAttachmentPath);
    }
    this.pageurl = this.context.pageContext.legacyPageContext.serverRequestPath;
    this.currentUserInfo = await this.helper.getCurrentUserInfo();
    this.siteUsers = await this.helper.getSiteUsers(self.currentUserInfo.ID);
    require(['jquery', './js/jquery-comments.min'], (jQuery, comments) => {
      jQuery('#page-comments').comments({
        profilePictureURL: self.currentUserInfo.Picture,
        currentUserId: self.currentUserInfo.ID,
        maxRepliesVisible: 3,
        textareaRows: 1,
        textareaRowsOnFocus: 2,
        textareaMaxRows: 5,
        highlightColor: '#b5121b',
        attachmentFileFormats: self.properties.attachmentFileFormats !== undefined ? self.properties.attachmentFileFormats : 'audio/*,image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
        attachmentFileSize: self.properties.attachmentFileSize !== undefined ? self.properties.attachmentFileSize : 5,
        siteURL: self.context.pageContext.legacyPageContext.webServerRelativeUrl,
        enableNavigation: self.properties.enableNavigation !== undefined ? self.properties.enableNavigation : true,
        enableReplying: self.properties.enableReplying !== undefined ? self.properties.enableReplying : true,
        enableEditing: self.properties.enableEditing !== undefined ? self.properties.enableEditing : false,
        enableUpvoting: self.properties.enableUpvoting !== undefined ? self.properties.enableUpvoting : true,
        enableDeleting: self.properties.enableDeleting !== undefined ? self.properties.enableDeleting : false,
        enableAttachments: self.properties.enableAttachments !== undefined ? self.properties.enableAttachments : false,
        enableHashtags: self.properties.enableHashtags !== undefined ? self.properties.enableHashtags : false,
        enablePinging: self.properties.enablePinging !== undefined ? self.properties.enablePinging : false,
        enableDocumentPreview: self.properties.enableDocumentPreview !== undefined ? self.properties.enableDocumentPreview : false,
        roundProfilePictures: self.properties.roundProfilePictures !== undefined ? self.properties.roundProfilePictures : true,
        timeFormatter: (time) => {
          try {
            if (self.properties.datetimeFormat) {
              return moment(time).format(self.properties.datetimeFormat);
            } else return moment(time).format(self.properties.datetimeFormat);
          } catch (err) {
            return moment(time).format("DD/MM/YYYY  hh:mm:ss A");
          }
        },
        getComments: async (success, error) => {
          let commentsArray = await self.helper.getPostComments(self.pageurl, self.currentUserInfo);
          if (commentsArray.length > 0) {
            var fil = _.filter(commentsArray, (o) => { return moment(o.created).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY"); });
            fil.map((comment) => {
              _.set(comment, 'is_new', true);
            });
            fil = _.filter(commentsArray, (o) => { return o.userid == self.currentUserInfo.ID; });
            fil.map((comment) => {
              _.set(comment, 'created_by_current_user', true);
            });
          }
          success(commentsArray);
        },
        postComment: async (commentJson, success, error) => {
          commentJson.fullname = self.currentUserInfo.DisplayName;
          commentJson.userid = self.currentUserInfo.ID;
          commentJson = self.saveComment(commentJson);
          await self.helper.postComment(self.pageurl, commentJson, self.currentUserInfo);
          if (moment(commentJson.created).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")) _.set(commentJson, 'is_new', true);
          _.set(commentJson, 'created_by_current_user', true);
          success(commentJson);
        },
        searchUsers: async (term, success, error) => {
          let res = [];
          if (self.siteUsers.length <= 0) self.siteUsers = await self.helper.getSiteUsers(self.currentUserInfo.ID);
          res = _.chain(self.siteUsers).filter((o) => { return o.fullname.toLowerCase().indexOf(term) >= 0 || o.email.toLowerCase().indexOf(term) >= 0; }).take(10).value();
          success(res);
        },
        upvoteComment: async (commentJSON, success, error) => {
          await self.helper.voteComment(self.pageurl, commentJSON, self.currentUserInfo);
          success(commentJSON);
        },
        deleteComment: async (commentJSON, success, error) => {
          await self.helper.deleteComment(self.pageurl, commentJSON);
          success();
        },
        putComment: async (commentJSON, success, error) => {
          commentJSON = self.saveComment(commentJSON);
          await self.helper.editComments(self.pageurl, commentJSON);
          success(commentJSON);
        },
        uploadAttachments: async (commentArray, success, error) => {
          let res = await self.helper.postAttachments(commentArray, self.pageFolderExists, self.postAttachmentPath);
          _.merge(res[0], { userid: self.currentUserInfo.ID, fullname: self.currentUserInfo.DisplayName });
          await self.helper.postComment(self.pageurl, res[0], self.currentUserInfo);
          if (moment(res[0].created).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")) _.set(res[0], 'is_new', true);
          _.set(res[0], 'created_by_current_user', true);
          success(res);
        }
      });
    });
  }

  private saveComment = (data) => {
    // Convert pings to human readable format
    $(Object.keys(data.pings)).each((index, userId) => {
      var fullname = data.pings[`${userId}`];
      var pingText = '@' + fullname;
      data.content = data.content.replace(new RegExp('@' + userId, 'g'), pingText);
    });
    return data;
  }

  private checkForDocumentLibrary = (value: string): string => {
    if (value === null || value.trim().length === 0 || value.toLocaleUpperCase() === "NO_LIST_SELECTED") {
      return strings.AttachmentRepoPropValMsg;
    }
    return '';
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('datetimeFormat', {
                  label: strings.DateTimeFormatLabel,
                  description: strings.DateTimeFormatDescription,
                  multiline: false,
                  resizable: false,
                  value: this.properties.datetimeFormat
                }),
                PropertyFieldToggleWithCallout('roundProfilePictures', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'roundProfilePicturesFieldId',
                  label: strings.RoundProfilePicLabel,
                  calloutContent: React.createElement('p', {}, strings.RoundProfilePicDescription),
                  onText: 'Enable',
                  offText: 'Disable',
                  checked: this.properties.roundProfilePictures !== undefined ? this.properties.roundProfilePictures : true
                }),
                PropertyFieldToggleWithCallout('enableNavigation', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'enableNavigationFieldId',
                  label: strings.NavigationLabel,
                  calloutContent: React.createElement('p', {}, strings.NavigationDescription),
                  onText: 'Enable',
                  offText: 'Disable',
                  checked: this.properties.enableNavigation !== undefined ? this.properties.enableNavigation : true
                }),
                PropertyFieldToggleWithCallout('enableAttachments', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'enableAttachmentsFieldId',
                  label: strings.AttachmentLabel,
                  calloutContent: React.createElement('p', {}, strings.AttachmentDescription),
                  onText: 'Enable',
                  offText: 'Disable',
                  checked: this.properties.enableAttachments !== undefined ? this.properties.enableAttachments : false
                }),
                PropertyFieldListPicker('docLib', {
                  label: strings.AttachmentRepoLabel,
                  selectedList: this.properties.docLib,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: this.checkForDocumentLibrary.bind(this),
                  deferredValidationTime: 0,
                  key: 'docLibFieldId',
                  baseTemplate: 101,
                  disabled: !this.properties.enableAttachments
                }),
                PropertyPaneTextField('attachmentFileFormats', {
                  label: strings.AttachmentFileFormatLabel,
                  description: strings.AttachmentFileFormatDescription,
                  multiline: false,
                  resizable: false,
                  value: this.properties.attachmentFileFormats,
                  disabled: !this.properties.enableAttachments
                }),
                PropertyFieldSliderWithCallout('attachmentFileSize', {
                  calloutContent: React.createElement('div', {}, strings.AttachmentFileSizeDescription),
                  calloutTrigger: CalloutTriggers.Hover,
                  calloutWidth: 200,
                  key: 'attachmentFileSizeFieldId',
                  label: strings.AttachmentFileSizeLabel,
                  max: 10,
                  min: 1,
                  step: 1,
                  showValue: true,
                  value: this.properties.attachmentFileSize,
                  disabled: !this.properties.enableAttachments
                }),
                PropertyFieldToggleWithCallout('enablePinging', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'enablePingingFieldId',
                  label: strings.PingLabel,
                  calloutContent: React.createElement('p', {}, strings.PingDescription),
                  onText: 'Enable',
                  offText: 'Disable',
                  checked: this.properties.enablePinging !== undefined ? this.properties.enablePinging : false
                }),
                PropertyFieldToggleWithCallout('enableEditing', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'enableEditingFieldId',
                  label: strings.EditingLabel,
                  calloutContent: React.createElement('p', {}, strings.EditingDescription),
                  onText: 'Enable',
                  offText: 'Disable',
                  checked: this.properties.enableEditing !== undefined ? this.properties.enableEditing : false
                }),
                PropertyFieldToggleWithCallout('enableDeleting', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'enableDeletingFieldId',
                  label: strings.DeleteLabel,
                  calloutContent: React.createElement('p', {}, strings.DeleteDescription),
                  onText: 'Enable',
                  offText: 'Disable',
                  checked: this.properties.enableDeleting !== undefined ? this.properties.enableDeleting : false,
                  disabled: !this.properties.enableEditing
                }),
                // PropertyFieldToggleWithCallout('enableDeletingCommentWithReplies', {
                //   calloutTrigger: CalloutTriggers.Hover,
                //   key: 'enableDeletingCommentWithRepliesFieldId',
                //   label: strings.DeleteRepliesLabel,
                //   calloutContent: React.createElement('p', {}, strings.DeleteRepliesDescription),
                //   onText: 'Enable',
                //   offText: 'Disable',
                //   checked: this.properties.enableDeletingCommentWithReplies,
                //   disabled: !this.properties.enableEditing
                // }),
                PropertyFieldToggleWithCallout('enableUpvoting', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'enableUpvotingFieldId',
                  label: strings.UpVotingLabel,
                  calloutContent: React.createElement('p', {}, strings.UpVotingDescription),
                  onText: 'Enable',
                  offText: 'Disable',
                  checked: this.properties.enableUpvoting !== undefined ? this.properties.enableUpvoting : true
                }),
                PropertyFieldToggleWithCallout('enableReplying', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'enableReplyingFieldId',
                  label: strings.ReplyLabel,
                  calloutContent: React.createElement('p', {}, strings.ReplyDescription),
                  onText: 'Enable',
                  offText: 'Disable',
                  checked: this.properties.enableReplying !== undefined ? this.properties.enableReplying : true
                }),
                PropertyFieldToggleWithCallout('enableHashtags', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'enableHashtagsFieldId',
                  label: strings.HashtagsLabel,
                  calloutContent: React.createElement('p', {}, strings.HashtagsDescription),
                  onText: 'Enable',
                  offText: 'Disable',
                  checked: this.properties.enableHashtags !== undefined ? this.properties.enableHashtags : false
                }),
                PropertyFieldToggleWithCallout('enableDocumentPreview', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'enableDocumentPreviewFieldId',
                  label: strings.DocumentPreviewLabel,
                  calloutContent: React.createElement('p', {}, strings.DocumentPreviewDescription),
                  onText: 'Enable',
                  offText: 'Disable',
                  checked: this.properties.enableDocumentPreview !== undefined ? this.properties.enableDocumentPreview : false
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
