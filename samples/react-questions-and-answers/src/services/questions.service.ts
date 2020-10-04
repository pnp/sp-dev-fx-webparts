import '@pnp/polyfill-ie11';
import { sp, PagedItemCollection, SPBatch } from '@pnp/sp/presets/all';
import { BaseService } from './base.service';
import { LogHelper, ContentTypes, ListTitles, StandardFields, PostFields, ReplyFields, QuestionFields, ShowQuestionsOption } from 'utilities';
import { IQuestionItem, IPostItem, IReplyItem, ICurrentUser, IQuestionsFilter, IPagedItems } from 'models';

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
        PostFields.LIKE_COUNT,
        PostFields.LIKE_IDS,
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

    public async getPagedQuestions(currentUser: ICurrentUser, filter: IQuestionsFilter, previousPagedItems: IPagedItems<IQuestionItem>): Promise<IPagedItems<IQuestionItem>> {
        LogHelper.verbose(this.constructor.name, 'getPagedQuestions', `[filter=${JSON.stringify(filter)}]`);

        let pagedItems: IPagedItems<IQuestionItem> = {
            items: [],
            pagedItemCollection: undefined
        };

        if (previousPagedItems !== null && previousPagedItems.pagedItemCollection && previousPagedItems.pagedItemCollection.hasNext) {
            pagedItems.pagedItemCollection = await previousPagedItems.pagedItemCollection.getNext();
        }
        else {
            let filterText = this.getQuestionFilterText(filter);
            let top = filter.pageSize ? filter.pageSize : 20;

            pagedItems.pagedItemCollection = <PagedItemCollection<any>>await sp.web.lists.getByTitle(this.listTitle).items
                .select(this.questionSelectColumns.join(','))
                .expand(this.questionExpandColumns.join(','))
                .filter(filterText)
                .top(top)
                .orderBy(filter.orderByColumnName, filter.orderByAscending)
                .getPaged()
                .catch(e => {
                    super.handleHttpError('getPagedQuestions', e);
                    throw e;
                });
        }

        if (pagedItems.pagedItemCollection) {
            for (let questionItem of pagedItems.pagedItemCollection.results) {
                let question = this.mapQuestion(questionItem, currentUser);

                let currentUserCreatedQuestion: boolean = false;
                if (currentUser.loginName.toLowerCase() === question.author!.id!.toLowerCase()) {
                    currentUserCreatedQuestion = true;
                }

                this.updateUserPermissions(currentUser, question, currentUserCreatedQuestion);
                pagedItems.items.push(question);
            }
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
        this.deletePostById(question.id!).then(() => {
            this.deleteReplies(question);
        });
    }

    public async deleteReply(reply: IReplyItem): Promise<void> {
        this.deletePostById(reply.id!).then(() => {
            this.deleteReplies(reply);
        });
    }

    private deleteReplies(item: IReplyItem | IQuestionItem, batch?: SPBatch) {
        if (!batch) { batch = sp.createBatch(); }

        for (let reply of item.replies) {
            sp.web.lists.getByTitle(this.listTitle).items
                .getById(reply.id!)
                .inBatch(batch)
                .delete();

            this.deleteReplies(reply);
        }

        batch.execute()
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

        let contentType = await sp.web.lists.getByTitle(this.listTitle).contentTypes
            .filter(`Name eq '${ContentTypes.QUESTION}'`)
            .get()
            .catch(e => {
                super.handleHttpError('saveQuestion', e);
                throw e;
            });

        item[StandardFields.CONTENTTYPEID] = contentType[0].StringId;

        if (question.id != null && question.id !== 0) {
            LogHelper.verbose(this.constructor.name, 'saveQuestion', `update [id:${question.id}]`);

            let result: any = await sp.web.lists.getByTitle(this.listTitle).items
                .getById(question.id)
                .update(item)
                .catch(e => {
                    super.handleHttpError('saveQuestion', e);
                    throw e;
                });

            if (!result) {
                return null;
            }

            itemId = question.id;
        }
        else {
            LogHelper.verbose(this.constructor.name, 'saveQuestion', `add`);

            item[QuestionFields.FOLLOW_EMAILS] = question.followEmails.join(';');

            let result: any = await sp.web.lists.getByTitle(this.listTitle).items
                .add(item)
                .catch(e => {
                    super.handleHttpError('saveQuestion', e);
                    throw e;
                });

            if (!result) {
                return null;
            }

            itemId = result.data.Id;
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

        return itemId;
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

    private getQuestionFilterText(filter: IQuestionsFilter): string {
        let filterText = '';

        filterText = `${StandardFields.CONTENTTYPE} eq '${ContentTypes.QUESTION}'`;
        // from the search box
        if (filter.searchText && filter.searchText.length > 0) {
            let encodedSearchText = encodeURIComponent(filter.searchText.replace(`'`, `''`));

            filterText += ` and substringof('${encodedSearchText}',${StandardFields.TITLE})`;
            // only questions and not replies

        }

        switch (filter.selectedShowQuestionsOption) {
            case ShowQuestionsOption.Answered:
                filterText += `and ${QuestionFields.ISANSWERED} eq 1`;
                break;
            case ShowQuestionsOption.Open:
                    filterText += `and ${QuestionFields.ISANSWERED} eq 0`;
                break;
        }

        return filterText;
    }

    private mapQuestion(item: any, currentUser: ICurrentUser): IQuestionItem {
        // Map Base Properties (id, created/modified info)
        let base = super.mapBaseItemProperties(item);

        let question: IQuestionItem = {
            ...base,
            details: item[PostFields.DETAILS],
            detailsText: item[PostFields.DETAILSTEXT],
            isAnswered: item[QuestionFields.ISANSWERED],
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
            replies: []
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
            replies: []
        };

        this.mapLikeInfo(item[PostFields.LIKE_IDS], reply, currentUser);
        this.mapHelpfulInfo(item[ReplyFields.HELPFULIDS], reply, currentUser);
        return reply;
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
