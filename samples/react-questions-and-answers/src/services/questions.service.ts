import '@pnp/polyfill-ie11';
import { sp, SPBatch, IAttachmentFileInfo, IRenderListDataParameters } from '@pnp/sp/presets/all';
import { BaseService } from './base.service';
import { LogHelper, ContentTypes, ListTitles, StandardFields, PostFields, ReplyFields, QuestionFields, ShowQuestionsOption, DiscussionType } from 'utilities';
import { IQuestionItem, IPostItem, IReplyItem, ICurrentUser, IQuestionsFilter, IPagedItems, IFileAttachment, IItemInfo, ICategoryLabelItem } from 'models';
import * as strings from 'QuestionsWebPartStrings';

export class QuestionService extends BaseService {

    // private currentUser: ICurrentUser;
    private listTitle = ListTitles.QUESTIONS;
    private questionSelectColumns: string[] = [
        StandardFields.ID,
        StandardFields.TITLE,
        PostFields.DETAILS,
        PostFields.DETAILSTEXT,
        QuestionFields.ISANSWERED,
        QuestionFields.FOLLOW_EMAILS,
        PostFields.PAGE,
        PostFields.LIKE_COUNT,
        PostFields.LIKE_IDS,
        // Category and Type
        PostFields.CATEGORY,
        PostFields.TYPE,
        // Standard Created/Modified Columns
        StandardFields.CREATED,
        StandardFields.MODIFIED,
        StandardFields.AUTHOR_ID,
        StandardFields.AUTHOR_NAME,
        StandardFields.AUTHOR_TITLE,
        StandardFields.EDITOR_ID,
        StandardFields.EDITOR_NAME,
        StandardFields.EDITOR_TITLE
    ];

    private replySelectColumns: string[] = [
        StandardFields.ID,
        StandardFields.TITLE,
        PostFields.DETAILS,
        PostFields.DETAILSTEXT,
        ReplyFields.ISANSWER,
        PostFields.LIKE_COUNT,
        PostFields.LIKE_IDS,
        ReplyFields.HELPFULCOUNT,
        ReplyFields.HELPFULIDS,
        // question this item is related to
        ReplyFields.QUESTIONLOOKUP_ID,
        ReplyFields.QUESTIONLOOKUP_TITLE,
        // parent of this item
        ReplyFields.REPLYLOOKUP_ID,
        ReplyFields.REPLYLOOKUP_TITLE,
        // Standard Created/Modified Columns
        StandardFields.CREATED,
        StandardFields.MODIFIED,
        StandardFields.AUTHOR_ID,
        StandardFields.AUTHOR_NAME,
        StandardFields.AUTHOR_TITLE,
        StandardFields.EDITOR_ID,
        StandardFields.EDITOR_NAME,
        StandardFields.EDITOR_TITLE
    ];

    private itemSelectColumns: string[] = [
      StandardFields.ID,
      StandardFields.TITLE,
      PostFields.TYPE,
      // question this item is related to
      ReplyFields.QUESTIONLOOKUP_ID,
      ReplyFields.QUESTIONLOOKUP_TITLE,
      // parent of this item
      ReplyFields.REPLYLOOKUP_ID,
      ReplyFields.REPLYLOOKUP_TITLE,
    ];

    private questionExpandColumns: string[] = [
        StandardFields.CONTENTTYPE,
        StandardFields.AUTHOR,
        StandardFields.EDITOR
    ];

    private replyExpandColumns: string[] = [
        ReplyFields.QUESTIONLOOKUP,
        ReplyFields.REPLYLOOKUP,
        StandardFields.CONTENTTYPE,
        StandardFields.AUTHOR,
        StandardFields.EDITOR
    ];

    private itemExpandColumns: string[] = [
      ReplyFields.QUESTIONLOOKUP,
      ReplyFields.REPLYLOOKUP
  ];

    public async getPagedQuestions(currentUser: ICurrentUser, filter: IQuestionsFilter, previousPagedItems: IPagedItems<IQuestionItem>): Promise<IPagedItems<IQuestionItem>> {
      LogHelper.verbose(this.constructor.name, 'getPagedQuestions2', `[filter=${JSON.stringify(filter)}]`);

      let pagedItems: IPagedItems<IQuestionItem> = {
        items: [],
        nextHref: undefined
      };

      let parameters = this.getQuestionFilterParameters(filter);

      if (previousPagedItems !== null && previousPagedItems.nextHref) {
        parameters.Paging = previousPagedItems.nextHref.split('?')[1];
      }

      let data = await sp.web.lists.getByTitle(this.listTitle).renderListDataAsStream(parameters);

      pagedItems.nextHref = data.NextHref;

      for (let questionItem of data.Row) {
          let question = this.mapQuestion(questionItem, currentUser, true);

          let currentUserCreatedQuestion: boolean = false;
          if (currentUser.loginName.toLowerCase() === question.author!.id!.toLowerCase()) {
              currentUserCreatedQuestion = true;
          }

          this.updateUserPermissions(currentUser, question, currentUserCreatedQuestion);
          pagedItems.items.push(question);
      }

      return pagedItems;
    }

    public async getQuestionById(currentUser: ICurrentUser, id: number, skipReplies: boolean = false): Promise<IQuestionItem | null> {
        LogHelper.verbose(this.constructor.name, 'getQuestionById', `[id:${id}]`);

        let questionItem = await sp.web.lists.getByTitle(this.listTitle).items
            .getById(id)
            .select(this.questionSelectColumns.join(','))
            .expand(this.questionExpandColumns.join(','))
            .get()
            .catch(e => {
                super.handleHttpError('getQuestionById', e);
                throw e;
            });

        if (questionItem !== null) {
            let question: IQuestionItem = this.mapQuestion(questionItem, currentUser);
            if (skipReplies === false) {
                let flatReplies = await this.getFlatRepliesByQuestionId(currentUser, id);
                question.replies = this.buildReplyTree(flatReplies, [], null, true);

                question.totalReplyCount = flatReplies.length;
                if (question.isAnswered === true) {
                    question.answerReply = flatReplies.find(r => r.isAnswer === true);
                }

                if(question.id) {
                  question.attachments = await this.getAttachmentsForItem(question.id);
                }
            }

            let currentUserCreatedQuestion: boolean = false;
            if (currentUser.loginName.toLowerCase() === question.author!.id!.toLowerCase()) {
                currentUserCreatedQuestion = true;
            }

            this.updateUserPermissions(currentUser, question, currentUserCreatedQuestion);

            return question;
        }
        else {
            return null;
        }

    }

    public async getAllCategories(): Promise<ICategoryLabelItem[] | null> {
      LogHelper.verbose(this.constructor.name, 'getAllCategories', "");

      let all = await sp.web.lists.getByTitle(ListTitles.CATEGORY_LABELING).items
        .orderBy("Title", true)
        .get()
        .catch(e => {
          super.handleHttpError('getAllCategories', e);
          throw e;
        });

      return all.map((item: any) => {
        return this.mapCategoryLabel(item);
      });
    }

    public async addCategory(category: string): Promise<void> {
      LogHelper.verbose(this.constructor.name, 'addCategory', "");

      await sp.web.lists.getByTitle(ListTitles.CATEGORY_LABELING).items
        .add({ Title: category })
        .then((iar: any) => {
          LogHelper.verbose(this.constructor.name, 'addCategory', iar);
        })
        .catch(e => {
          super.handleHttpError('addCategory', e);
          throw e;
        });
    }

    public async getItemInfoById(id: number): Promise<IItemInfo | null> {
      LogHelper.verbose(this.constructor.name, 'getItemInfoById', `[id:${id}]`);

      let item = await sp.web.lists.getByTitle(this.listTitle).items
          .getById(id)
          .select(this.itemSelectColumns.join(','))
          .expand(this.itemExpandColumns.join(','))
          .get()
          .catch(e => {
              super.handleHttpError('getItemInfoById', e);
              throw e;
          });

      if (item !== null) {
          return this.mapItemInfo(item);
      }
      else {
          return null;
      }

  }

    public async isDuplicateQuestion(question: IQuestionItem): Promise<boolean> {
        LogHelper.verbose(this.constructor.name, 'isDuplicate', `[title:${question.title}]`);

        let isDuplicate: boolean = false;
        let cleanedTitle = question.title!.replace(/'/g, "''"); // the ' isn't encoded
        let encodedTitle = encodeURIComponent(cleanedTitle); // encode all other characters
        let filterText = `${StandardFields.TITLE} eq '${encodedTitle}'`;

        let items = await sp.web.lists.getByTitle(this.listTitle).items
            .select(StandardFields.ID)
            .filter(filterText)
            .get()
            .catch(e => {
                super.handleHttpError('isDuplicate', e);
                throw e;
            });

        if (items !== null) {
            for (let item of items) {
                if (question.id != null && question.id !== 0) {
                    if (question.id !== item[StandardFields.ID]) {
                        // this is an update but matches an existing item
                        isDuplicate = true;
                        break;
                    }
                }
                else {
                    // this must be new but matches an existing item
                    isDuplicate = true;
                    break;
                }
            }
        }

        return isDuplicate;
    }

    public async deleteQuestion(question: IQuestionItem): Promise<void> {
        await this.deletePostById(question.id!);
        await this.deleteReplies(question);
    }

    public async deleteReply(reply: IReplyItem): Promise<void> {
        await this.deletePostById(reply.id!);
        await this.deleteReplies(reply);
    }

    private async deleteReplies(item: IReplyItem | IQuestionItem, batch?: SPBatch) {
        if (!batch) { batch = sp.createBatch(); }

        for (let reply of item.replies) {
            sp.web.lists.getByTitle(this.listTitle).items
                .getById(reply.id!)
                .inBatch(batch)
                .delete();

            await this.deleteReplies(reply);
        }

        await batch.execute()
            .catch(e => {
                super.handleHttpError('deleteReplies', e);
                throw e;
            });
    }

    private async deletePostById(id: number): Promise<void> {
        LogHelper.verbose(this.constructor.name, 'deletePostById', `id:[${id}]`);

        if (id != null && id !== 0) {
            await sp.web.lists.getByTitle(this.listTitle).items
                .getById(id)
                .delete()
                .catch(e => {
                    super.handleHttpError('deletePostById', e);
                    throw e;
                });
        }
    }

    public async saveQuestion(question: IQuestionItem): Promise<number | null> {
        let itemId = 0;
        let item = {};
        item[StandardFields.TITLE] = question.title;
        item[PostFields.DETAILS] = question.details;
        item[PostFields.DETAILSTEXT] = question.detailsText;
        item[PostFields.CATEGORY] = question.category;

        let contentType = await sp.web.lists.getByTitle(this.listTitle).contentTypes
            .filter(`Name eq '${ContentTypes.QUESTION}'`)
            .get()
            .catch(e => {
                super.handleHttpError('saveQuestion', e);
                throw e;
            });

        item[StandardFields.CONTENTTYPEID] = contentType[0].StringId;

        //Decision for UPDATE or ADD
        if (question.id != null && question.id !== 0) {
            //UPDATE
            LogHelper.verbose(this.constructor.name, 'saveQuestion', `update [id:${question.id}]`);

            let result: any = await sp.web.lists.getByTitle(this.listTitle).items
                .getById(question.id)
                .update(item)
                .catch(e => {
                    super.handleHttpError('saveQuestion', e);
                    throw new Error(question.discussionType === DiscussionType.Question ? strings.ErrorMessage_QuestionUpdate : strings.ErrorMessage_ConversationUpdate);
                });

            if (!result) {
                return null;
            }

            itemId = question.id;
        }
        else {
            //ADD
            LogHelper.verbose(this.constructor.name, 'saveQuestion', `add`);

            item[PostFields.PAGE] = { Url: question.page };
            item[QuestionFields.FOLLOW_EMAILS] = question.followEmails.join(';');
            item[PostFields.TYPE] = question.discussionType;

            let result: any = await sp.web.lists.getByTitle(this.listTitle).items
                .add(item)
                .catch(e => {
                    super.handleHttpError('saveQuestion', e);
                    throw new Error(question.discussionType === DiscussionType.Question ? strings.ErrorMessage_QuestionAdd : strings.ErrorMessage_ConversationAdd);
                });

            if (!result) {
                return null;
            }

            itemId = result.data.Id;
        }

        if(question.removedAttachments && question.removedAttachments.length > 0) {
          await this.deleteAttachmentsFromItem(itemId, question.removedAttachments);
        }

        if(question.newAttachments && question.newAttachments.length > 0) {
          await this.addAttachmentsToItem(itemId, question.newAttachments);
        }

        return itemId;
    }

    public async getReplyById(currentUser: ICurrentUser, id: number, skipReplies: boolean = false): Promise<IReplyItem | null> {
        LogHelper.verbose(this.constructor.name, 'getReplyById', `[id:${id}]`);

        let replyItem = await sp.web.lists.getByTitle(this.listTitle).items
            .getById(id)
            .select(this.replySelectColumns.join(','))
            .expand(this.replyExpandColumns.join(','))
            .get()
            .catch(e => {
                super.handleHttpError('getReplyById', e);
                throw e;
            });

        if (replyItem !== null) {
            let reply: IReplyItem = this.mapReply(replyItem, currentUser);
            if (skipReplies === false) {
                let flatReplies = await this.getFlatRepliesByQuestionId(currentUser, reply.parentQuestionId!);
                reply.replies = this.buildReplyTree(flatReplies, [], reply, true);
            }

            if(reply.id) {
              reply.attachments = await this.getAttachmentsForItem(reply.id);
            }

            let currentUserCreatedQuestion: boolean = false;
            if (reply.parentQuestionId) {
                let question = await this.getQuestionById(currentUser, reply.parentQuestionId!, true);
                if (question && currentUser.loginName.toLowerCase() === question.author!.id!.toLowerCase()) {
                    currentUserCreatedQuestion = true;
                }
            }

            this.updateUserPermissions(currentUser, reply, currentUserCreatedQuestion);
            return reply;
        }
        else {
            return null;
        }

    }

    public async saveReply(reply: IReplyItem): Promise<number | null> {
        let itemId = 0;
        let item = {};
        item[StandardFields.TITLE] = reply.title;
        item[PostFields.DETAILS] = reply.details;
        item[PostFields.DETAILSTEXT] = reply.detailsText;
        item[ReplyFields.ISANSWER] = reply.isAnswer ? reply.isAnswer : false;
        item[ReplyFields.QUESTIONLOOKUPID] = reply.parentQuestionId;
        item[ReplyFields.REPLYLOOKUPID] = reply.parentReplyId;

        let contentType = await sp.web.lists.getByTitle(this.listTitle).contentTypes
            .filter(`Name eq '${ContentTypes.REPLY}'`)
            .get()
            .catch(e => {
                super.handleHttpError('saveReply', e);
                throw e;
            });

        item[StandardFields.CONTENTTYPEID] = contentType[0].StringId;

        if (reply.id != null && reply.id !== 0) {
            LogHelper.verbose(this.constructor.name, 'saveReply', `update [id:${reply.id}]`);

            let result: any = await sp.web.lists.getByTitle(this.listTitle).items
                .getById(reply.id)
                .update(item)
                .catch(e => {
                    super.handleHttpError('saveReply', e);
                    throw e;
                });

            if (!result) {
                return null;
            }

            itemId = reply.id;
        }
        else {
            LogHelper.verbose(this.constructor.name, 'saveReply', `add`);

            let result: any = await sp.web.lists.getByTitle(this.listTitle).items
                .add(item)
                .catch(e => {
                    super.handleHttpError('saveReply', e);
                    throw e;
                });

            if (!result) {
                return null;
            }

            itemId = result.data.Id;
        }

        if(reply.removedAttachments && reply.removedAttachments.length > 0) {
          await this.deleteAttachmentsFromItem(itemId, reply.removedAttachments);
        }

        if(reply.newAttachments && reply.newAttachments.length > 0) {
          await this.addAttachmentsToItem(itemId, reply.newAttachments);
        }

        return itemId;
    }

    public async getAttachmentsForItem(id: number): Promise<IFileAttachment[]> {
      LogHelper.verbose(this.constructor.name, 'getAttachmentsForItem', `[id:${id}]`);

      let attachments = await sp.web.lists.getByTitle(this.listTitle).items
          .getById(id)
          .attachmentFiles()
          .catch(e => {
              super.handleHttpError('getAttachmentsForItem', e);
              throw e;
          });

        let fileAttachments: IFileAttachment[] = [];
        for(let attachment of attachments) {
          fileAttachments.push( {
            fileName: attachment.FileName,
            serverRelativeUrl: attachment.ServerRelativeUrl,
            isAttached: true
          });
        }
        return fileAttachments;
    }

    public async addAttachmentsToItem(id: number, attachments: File[]): Promise<void> {
        LogHelper.verbose(this.constructor.name, 'addAttachmentsToItem', `[id:${id},attachmentsCount:${attachments.length}]`);

        if(attachments && attachments.length > 0) {
          let fileInfos: IAttachmentFileInfo[] = [];

          attachments.map(attachment => {
            fileInfos.push({
              name: encodeURIComponent(attachment.name),
              content: attachment
            });
          });

          await sp.web.lists.getByTitle(this.listTitle).items
            .getById(id)
            .attachmentFiles
            .addMultiple(fileInfos)
            .catch(e => {
                super.handleHttpError('addAttachmentsToItem', e);
                throw new Error(strings.ErrorMessage_AttachmentsAdd);
            });
        }
    }

    public async deleteAttachmentsFromItem(id: number, attachmentNames: string[]): Promise<void> {
      LogHelper.verbose(this.constructor.name, 'deleteAttachmentsFromItem', `[id:${id},attachmentNames:${attachmentNames.join(",")}]`);

      if(attachmentNames && attachmentNames.length > 0) {
        attachmentNames = attachmentNames.map(a => encodeURIComponent(a));

        await sp.web.lists.getByTitle(this.listTitle).items
            .getById(id)
            .attachmentFiles
            .deleteMultiple(...attachmentNames)
            .catch(e => {
                super.handleHttpError('deleteAttachmentsFromItem', e);
                throw new Error(strings.ErrorMessage_AttachmentsRemove);
            });
      }
    }

    public async markAnswer(reply: IReplyItem): Promise<void> {
        if (reply !== null && reply.id != null && reply.id !== 0) {
            LogHelper.verbose(this.constructor.name, 'markAnswer', `update [id:${reply.id}]`);

            let replyItem = {};
            replyItem[ReplyFields.ISANSWER] = reply.isAnswer;

            await sp.web.lists.getByTitle(this.listTitle).items
                .getById(reply.id)
                .update(replyItem, '*')
                .catch(e => {
                    super.handleHttpError('markAnswer', e);
                    throw e;
                });

            let questionItem = {};
            questionItem[QuestionFields.ISANSWERED] = reply.isAnswer;
            await sp.web.lists.getByTitle(this.listTitle).items
                .getById(reply.parentQuestionId!)
                .update(questionItem, '*')
                .catch(e => {
                    super.handleHttpError('markAnswer', e);
                    throw e;
                });
        }
    }

    public async updateLiked(post: IPostItem): Promise<void> {
        let item = {};
        if (post.id != null && post.id !== 0) {
            item[PostFields.LIKE_IDS] = post.likeIds.join(';');
            item[PostFields.LIKE_COUNT] = post.likeIds.length;

            LogHelper.verbose(this.constructor.name, 'updateLiked', `update [id:${post.id}]`);

            await sp.web.lists.getByTitle(this.listTitle).items
                .getById(post.id)
                .update(item)
                .catch(e => {
                    super.handleHttpError('updateLiked', e);
                    throw e;
                });
        }
    }

    public async updateFollowed(question: IQuestionItem): Promise<void> {
        let item = {};
        if (question.id != null && question.id !== 0) {
            item[QuestionFields.FOLLOW_EMAILS] = question.followEmails.join(';');

            LogHelper.verbose(this.constructor.name, 'updateFollowed', `update [id:${question.id}]`);

            await sp.web.lists.getByTitle(this.listTitle).items
                .getById(question.id)
                .update(item)
                .catch(e => {
                    super.handleHttpError('updateFollowed', e);
                    throw e;
                });
        }
    }

    public async updateDiscussionType(question: IQuestionItem): Promise<void> {
      let item = {};
      if (question.id != null && question.id !== 0) {
          item[QuestionFields.DISCUSSION_TYPE] = question.discussionType;

          LogHelper.verbose(this.constructor.name, 'updateDiscussionType', `update [id:${question.id}]`);

          await sp.web.lists.getByTitle(this.listTitle).items
              .getById(question.id)
              .update(item)
              .catch(e => {
                  super.handleHttpError('updateDiscussionType', e);
                  throw e;
              });
      }
  }

    public async updateHelpful(updateItem: IReplyItem): Promise<void> {
        let item = {};
        if (updateItem.id != null && updateItem.id !== 0) {
            item[ReplyFields.HELPFULIDS] = updateItem.helpfulIds.join(';');
            item[ReplyFields.HELPFULCOUNT] = updateItem.helpfulIds.length;

            LogHelper.verbose(this.constructor.name, 'updateHelpful', `update [id:${updateItem.id}]`);

            await sp.web.lists.getByTitle(this.listTitle).items
                .getById(updateItem.id)
                .update(item)
                .catch(e => {
                    super.handleHttpError('updateHelpful', e);
                    throw e;
                });
        }
    }

    private async getFlatRepliesByQuestionId(currentUser: ICurrentUser, id: number): Promise<IReplyItem[]> {
        LogHelper.verbose(this.constructor.name, 'getRepliesByQuestionId', `[id:${id}]`);
        let replies: IReplyItem[] = [];

        let filterText = `${StandardFields.CONTENTTYPE} eq '${ContentTypes.REPLY}'`;
        filterText += `and ${ReplyFields.QUESTIONLOOKUP_ID} eq ${id}`;

        let replyItems = await sp.web.lists.getByTitle(this.listTitle).items
            .select(this.replySelectColumns.join(','))
            .expand(this.replyExpandColumns.join(','))
            .filter(filterText)
            .top(5000)
            .orderBy(StandardFields.ID, true)
            .get()
            .catch(e => {
                super.handleHttpError('getRepliesByQuestionId', e);
                throw e;
            });

        for (let replyItem of replyItems) {
            let reply = this.mapReply(replyItem, currentUser);

            if(reply.id) {
              reply.attachments = await this.getAttachmentsForItem(reply.id);
            }

            replies.push(reply);
        }

        return replies;
    }

    private buildReplyTree(flatReplies: IReplyItem[], replyTree: IReplyItem[], parentReply: IReplyItem | null, isRoot: boolean) {

        let matchingReplies = flatReplies.filter(f => f.parentReplyId === (parentReply !== null ? parentReply.id : null));

        for (let reply of matchingReplies) {
            this.buildReplyTree(flatReplies, replyTree, reply, false);
            if (isRoot === true) {
                replyTree.push(reply);
            }
            else {
                parentReply!.replies.push(reply);
            }
        }

        return replyTree;
    }

    private getQuestionFilterParameters(filter: IQuestionsFilter): IRenderListDataParameters {

      const rowLimit = `<RowLimit Paged="TRUE">${filter.pageSize}</RowLimit>`;
      const orderBy = `<OrderBy><FieldRef Name='${filter.orderByColumnName}' Ascending='${filter.orderByAscending === true ? "TRUE" : "FALSE"}' /></OrderBy>`;
      // filter.orderByColumnName, filter.orderByAscending
      let whereClause = "";

      if (filter.searchText && filter.searchText.length > 0) {
        let encodedSearchText = filter.searchText.trim();
        const titleFilter = `<Contains><FieldRef Name='${StandardFields.TITLE}' /><Value Type="Text"><![CDATA[${encodedSearchText}]]></Value></Contains>`;
        const detailsFilter = `<Contains><FieldRef Name='${PostFields.DETAILSTEXT}' /><Value Type="Note"><![CDATA[${encodedSearchText}]]></Value></Contains>`;
        whereClause = `<Or>${titleFilter}${detailsFilter}</Or>`;
      }

      // filter to only question content type
      if(whereClause.length > 0) {
        whereClause = `<And>${whereClause}<Eq><FieldRef Name='${StandardFields.CONTENTTYPE}' /><Value Type='Computed'>${ContentTypes.QUESTION}</Value></Eq></And>`;
      }
      else {
        whereClause = `<Eq><FieldRef Name='${StandardFields.CONTENTTYPE}' /><Value Type='Computed'>${ContentTypes.QUESTION}</Value></Eq>`;
      }

      // filter opened vs answered
      switch (filter.selectedShowQuestionsOption) {
          case ShowQuestionsOption.Answered:
            whereClause = `<And>${whereClause}<Eq><FieldRef Name='${QuestionFields.ISANSWERED}' /><Value Type='Boolean'>1</Value></Eq></And>`;
              break;
          case ShowQuestionsOption.Open:
            whereClause = `<And>${whereClause}<Eq><FieldRef Name='${QuestionFields.ISANSWERED}' /><Value Type='Boolean'>0</Value></Eq></And>`;
              break;
      }

      // filter on category
      if (!(filter.category === null || filter.category === undefined || filter.category === '')) {
          whereClause = `<And>${whereClause}<Eq><FieldRef Name='${PostFields.CATEGORY}' /><Value Type='Text'><![CDATA[${filter.category}]]></Value></Eq></And>`;
      }

      // filter to only conversations or questions
      if(filter.discussionType) {
        whereClause = `<And>${whereClause}<Eq><FieldRef Name='${QuestionFields.DISCUSSION_TYPE}' /><Value Type='Text'>${filter.discussionType}</Value></Eq></And>`;
      }

      let camlQuery: IRenderListDataParameters = {
        RenderOptions: 2,
        ViewXml: `
        <View>
          <ViewFields>
            <FieldRef Name='${StandardFields.ID}' />
            <FieldRef Name='${StandardFields.TITLE}' />
            <FieldRef Name='${PostFields.DETAILS}' />
            <FieldRef Name='${PostFields.DETAILSTEXT}' />
            <FieldRef Name='${QuestionFields.ISANSWERED}' />
            <FieldRef Name='${QuestionFields.FOLLOW_EMAILS}' />
            <FieldRef Name='${PostFields.LIKE_COUNT}' />
            <FieldRef Name='${PostFields.LIKE_IDS}' />
            <FieldRef Name='${PostFields.CATEGORY}' />
            <FieldRef Name='${PostFields.TYPE}' />
            <FieldRef Name='${StandardFields.CREATED}' />
            <FieldRef Name='${StandardFields.MODIFIED}' />
            <FieldRef Name='${StandardFields.AUTHOR}' />
            <FieldRef Name='${StandardFields.EDITOR}' />
          </ViewFields>
          <Query>
            <Where>
              ${whereClause}
            </Where>
            ${orderBy}
          </Query>
          ${rowLimit}
        </View>`
      };

      return camlQuery;
    }

    private mapQuestion(item: any, currentUser: ICurrentUser, mapFromStream: boolean = false): IQuestionItem {
        // Map Base Properties (id, created/modified info)
        let base = super.mapBaseItemProperties(item, mapFromStream);

        let isAnswered = item[QuestionFields.ISANSWERED];
        // deal with Yes/No in RenderListDataAsStream
        if(typeof(item[QuestionFields.ISANSWERED]) === "string") {
          isAnswered = (item[QuestionFields.ISANSWERED] as string).toLowerCase() === 'yes' ? true : false;
        }

        let question: IQuestionItem = {
            ...base,
            details: item[PostFields.DETAILS],
            detailsText: item[PostFields.DETAILSTEXT],
            isAnswered: isAnswered,
            totalReplyCount: 0,
            likeCount: 0,
            likeIds: [],
            likedByCurrentUser: false,
            followEmails: [],
            followedByCurrentUser: false,
            canDelete: false,
            canEdit: false,
            canReact: false,
            canReply: false,
            replies: [],
            category: item[PostFields.CATEGORY],
            discussionType: item[PostFields.TYPE],
            page: item[PostFields.PAGE],
            attachments: [],
            newAttachments: [],
            removedAttachments: []
        };

        this.mapLikeInfo(item[PostFields.LIKE_IDS], question, currentUser);
        this.mapFollowInfo(item[QuestionFields.FOLLOW_EMAILS], question, currentUser);
        return question;
    }

    private mapReply(item: any, currentUser: ICurrentUser): IReplyItem {
        // Map Base Properties (id, created/modified info)
        let base = super.mapBaseItemProperties(item);

        let reply: IReplyItem = {
            ...base,
            details: item[PostFields.DETAILS],
            detailsText: item[PostFields.DETAILSTEXT],
            isAnswer: item[ReplyFields.ISANSWER],
            parentQuestionId: super.getLookupId(item[ReplyFields.QUESTIONLOOKUP]),
            parentQuestion: super.getLookup(item[ReplyFields.QUESTIONLOOKUP]),
            parentReplyId: super.getLookupId(item[ReplyFields.REPLYLOOKUP]),
            parentReply: super.getLookup(item[ReplyFields.REPLYLOOKUP]),
            likeCount: 0,
            likeIds: [],
            likedByCurrentUser: false,
            helpfulCount: 0,
            helpfulIds: [],
            helpfulByCurrentUser: false,
            canDelete: false,
            canEdit: false,
            canMarkAsAnswer: false,
            canReact: false,
            canReply: false,
            replies: [],
            attachments: [],
            newAttachments: [],
            removedAttachments: []
        };

        this.mapLikeInfo(item[PostFields.LIKE_IDS], reply, currentUser);
        this.mapHelpfulInfo(item[ReplyFields.HELPFULIDS], reply, currentUser);
        return reply;
    }

    private mapCategoryLabel(item: any): ICategoryLabelItem {
      let base = super.mapBaseItemProperties(item);
      let cat: ICategoryLabelItem = {
        ...base
      };
      return cat;
    }

    private mapItemInfo(item: any): IItemInfo {
      let itemInfo: IItemInfo = {
        id: item.ID,
        title: item.Title,
        parentQuestionId: super.getLookupId(item[ReplyFields.QUESTIONLOOKUP]),
        parentReplyId: super.getLookupId(item[ReplyFields.REPLYLOOKUP]),
        discussionType: item[PostFields.TYPE]
      };

      return itemInfo;
    }

    private mapFollowInfo(ids: string, updateItem: IQuestionItem, currentUser: ICurrentUser) {
        let currentUserMatch: boolean = false;

        if (ids) {
            updateItem.followEmails = ids.split(';');
            currentUserMatch = updateItem.followEmails.indexOf(currentUser.email) != -1;
        }
        else {
            updateItem.followEmails = [];
        }
        updateItem.followedByCurrentUser = currentUserMatch;
    }

    private mapLikeInfo(ids: string, updateItem: IQuestionItem | IReplyItem, currentUser: ICurrentUser) {
        let currentUserMatch: boolean = false;

        if (ids) {
            updateItem.likeIds = ids.split(';');
            updateItem.likeCount = updateItem.likeIds.length;
            currentUserMatch = updateItem.likeIds.indexOf(`${currentUser.id}`) != -1;
        }
        else {
            updateItem.likeIds = [];
            updateItem.likeCount = 0;
        }
        updateItem.likedByCurrentUser = currentUserMatch;
    }

    private mapHelpfulInfo(ids: string, updateItem: IReplyItem, currentUser: ICurrentUser) {
        let currentUserMatch: boolean = false;
        if (ids) {
            updateItem.helpfulIds = ids.split(';');
            updateItem.helpfulCount = updateItem.helpfulIds.length;
            currentUserMatch = updateItem.helpfulIds.indexOf(`${currentUser.id}`) != -1;
        }
        else {
            updateItem.helpfulIds = [];
            updateItem.helpfulCount = 0;
        }
        updateItem.helpfulByCurrentUser = currentUserMatch;
    }

    // business logic needs to move
    private updateUserPermissions(currentUser: ICurrentUser, post: IQuestionItem | IReplyItem, currentUserCreatedQuestion: boolean) {
        post.canEdit = false;
        post.canDelete = false;
        post.canReact = false;
        post.canReply = false;

        // current user can add
        if (currentUser.canAddItems) {
            post.canReply = true;
        }

        // current user can edit
        if (currentUser.canEditItems) {
            post.canReact = true;

            // AND they created the question or reply
            if (currentUser.loginName.toLowerCase() === post.author!.id!.toLowerCase()) {
                post.canEdit = true;
            }
        }

        // current user can delete
        if (currentUser.canDeleteItems) {
            // AND they created the question or reply
            if (currentUser.loginName.toLowerCase() === post.author!.id!.toLowerCase()) {
                // AND there are no replies
                if (post.replies.length === 0) {
                    post.canDelete = true;
                }
            }
            // OR they are a moderator
            if (currentUser.canModerateItems) {
                post.canDelete = true;
            }
        }

        // find out if this is a question and the current user created the question
        if (this.isReply(post)) {
            post.canMarkAsAnswer = false;
            // current user can mark as answer based on list permissions
            if (currentUser.canModerateItems) {
                post.canMarkAsAnswer = true;
            }
            // they mark as answer because created the question
            if (currentUserCreatedQuestion === true && currentUser.canEditItems) {
                post.canMarkAsAnswer = true;
            }
        }

        if (post.replies.length > 0) {
            for (let reply of post.replies) {
                this.updateUserPermissions(currentUser, reply, currentUserCreatedQuestion);
            }
        }
    }

    private isReply(arg: any): arg is IReplyItem {
        return arg.canMarkAsAnswer !== undefined;
    }
}
