import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/folders/web";
import "@pnp/sp/files/folder";
import "@pnp/sp/items/list";
import "@pnp/sp/fields/list";
import "@pnp/sp/views/list";
import "@pnp/sp/site-users/web";
import { IList } from "@pnp/sp/lists";
import * as _ from "lodash";

export default class SPHelper {
    private lst_pageComments: string = '';
    private lst_pageDocuments: string = '';
    private lst_docListName: string = '';
    private _list: IList = null;
    private _doclist: IList = null;
    private cqPostDocs: string = `<View>
                                    <Query>
                                        <Where>
                                            <And>
                                                <Eq>
                                                    <FieldRef Name='FSObjType' />
                                                    <Value Type='Text'>1</Value>
                                                </Eq>
                                                <Eq>
                                                    <FieldRef Name='FileRef' />
                                                    <Value Type='Text'>{{FilePath}}</Value>
                                                </Eq>
                                            </And>
                                        </Where>
                                        <ViewFields><FieldRef Name="ID" /></ViewFields>           
                                    </Query>            
                                </View>`;

    public constructor(lstDocLib?: string) {
        this.lst_pageComments = "Page Comments";
        this._list = sp.web.lists.getByTitle(this.lst_pageComments);
        if (lstDocLib) {
            this.lst_pageDocuments = lstDocLib;
        }
    }

    public getDocLibInfo = async () => {
        this._doclist = sp.web.lists.getById(this.lst_pageDocuments);
        let listInfo: any = await this._doclist.select('Title').get();
        this.lst_docListName = listInfo.Title;
    }

    public queryList = async (query, $list: IList) => {
        return await $list.getItemsByCAMLQuery(query);
    }

    public getCurrentUserInfo = async () => {
        let currentUserInfo = await sp.web.currentUser.get();
        return ({
            ID: currentUserInfo.Id,
            Email: currentUserInfo.Email,
            LoginName: currentUserInfo.LoginName,
            DisplayName: currentUserInfo.Title,
            Picture: '/_layouts/15/userphoto.aspx?size=S&username=' + currentUserInfo.UserPrincipalName,
        });
    }

    public getSiteUsers = async (currentUserId: number) => {
        let resusers = await sp.web.siteUsers.filter('IsHiddenInUI eq false and PrincipalType eq 1').get();
        _.remove(resusers, (o) => { return o.Id == currentUserId || o.Email == ""; });
        let userResults = [];
        resusers.map((user) => {
            userResults.push({
                id: user.Id,
                fullname: user.Title,
                email: user.Email,
                profile_picture_url: '/_layouts/15/userphoto.aspx?size=S&username=' + user.UserPrincipalName
            });
        });
        return userResults;
    }

    public getPostAttachmentFilePath = async (pageUrl) => {
        let pageName = pageUrl.split('/')[pageUrl.split('/').length - 1].split('.').slice(0, -1).join('.');
        let res = await sp.web.select('ServerRelativeUrl').get();
        let doclistName = (this.lst_docListName.toLowerCase() === 'documents') ? "Shared Documents" : this.lst_docListName;
        return res.ServerRelativeUrl + "/" + doclistName + "/" + pageName;
    }

    public checkForPageFolder = async (postAttachmentPath) => {
        let xml = this.cqPostDocs.replace('{{FilePath}}', postAttachmentPath);
        let q = {
            ViewXml: xml
        };
        let res = await this.queryList(q, this._doclist);
        if (res.length > 0) return true; else return false;
    }

    public getPostComments = async (pageurl, currentUserInfo) => {
        let pagecomments = await this._list.items.select('Comments', 'Likes', 'FieldValuesAsText/Comments', 'FieldValuesAsText/Likes')
            .filter(`PageURL eq '${pageurl}'`).expand('FieldValuesAsText').get();
        if (pagecomments.length > 0) {
            var tempComments = pagecomments[0].FieldValuesAsText.Comments;
            var tempLikes = pagecomments[0].FieldValuesAsText.Likes;
            if (tempLikes != undefined && tempLikes != null && tempLikes !== "") tempLikes = JSON.parse(tempLikes);
            else tempLikes = [];
            if (tempComments != undefined && tempComments != null && tempComments !== "") {
                var jsonComments = JSON.parse(tempComments);
                if (tempLikes.length > 0) {
                    tempLikes.map((liked) => {
                        var fil = _.find(jsonComments, (o) => { return o.id == liked.commentID; });
                        if (fil !== undefined && fil !== null) {
                            fil.upvote_count = liked.userVote.length;
                            var cufil = _.find(liked.userVote, (o) => { return o.userid == currentUserInfo.ID; });
                            if (cufil !== undefined && cufil !== null) fil.user_has_upvoted = true;
                        }
                    });
                }
                return jsonComments;
            } else return [];
        } else return [];
    }

    public getComment = async (pageurl) => {
        let pagecomments = await this._list.items.select('Comments', 'FieldValuesAsText/Comments')
            .filter(`PageURL eq '${pageurl}'`).expand('FieldValuesAsText').get();
        if (pagecomments.length > 0) return pagecomments[0].FieldValuesAsText.Comments;
        else return null;
    }

    public addComment = async (pageUrl, comments) => {
        let pageName = pageUrl.split('/')[pageUrl.split('/').length - 1];
        let commentsToAdd = await sp.web.lists.getByTitle(this.lst_pageComments).items.add({
            Title: pageName,
            PageURL: pageUrl,
            Comments: JSON.stringify(comments)
        });
        return commentsToAdd;
    }

    public updateComment = async (pageurl, comments) => {
        let pageComment = await this._list.items.select('ID', 'PageURL').filter(`PageURL eq '${pageurl}'`).get();
        if (comments.length > 0) {
            if (pageComment.length > 0) {
                let pageCommentsToUpdate = await this._list.items.getById(pageComment[0].ID).update({
                    Comments: JSON.stringify(comments)
                });
                return pageCommentsToUpdate;
            }
        } else {
            return await this._list.items.getById(pageComment[0].ID).delete();
        }

    }

    public postComment = async (pageurl, commentJson, currentUserInfo) => {
        commentJson.created_by_current_user = false;
        let comments = await this.getPostComments(pageurl, currentUserInfo);
        if (comments.length > 0) {
            comments.push(commentJson);
            let updateComments = await this.updateComment(pageurl, comments);
            return updateComments;
        } else {
            comments.push(commentJson);
            let addComments = await this.addComment(pageurl, comments);
            return addComments;
        }
    }

    public addVoteForComment = async (pageurl, commentJson, currentUserInfo) => {
        var tempLikes = [];
        tempLikes.push({
            commentID: commentJson.id,
            userVote: [{ userid: currentUserInfo.ID, name: currentUserInfo.DisplayName }]
        });
        let pageComment = await this._list.items.select('ID').filter(`PageURL eq '${pageurl}'`).get();
        if (pageComment.length > 0) {
            return await this._list.items.getById(pageComment[0].ID).update({ Likes: JSON.stringify(tempLikes) });
        }
    }

    public updateVoteForComment = async (pageurl, jsonLikes) => {
        let pageComment = await this._list.items.select('ID').filter(`PageURL eq '${pageurl}'`).get();
        if (pageComment.length > 0) {
            return await this._list.items.getById(pageComment[0].ID).update({ Likes: JSON.stringify(jsonLikes) });
        }
    }

    public voteComment = async (pageurl, commentJson, currentUserInfo) => {
        let res = await this._list.items.select('Likes', 'FieldValuesAsText/Likes').filter(`PageURL eq '${pageurl}'`).expand('FieldValuesAsText').get();
        if (res.length > 0) {
            var tempLikes = res[0].FieldValuesAsText.Likes;
            if (tempLikes != undefined && tempLikes != null && tempLikes !== "") {
                // Likes already exits so update the item
                var jsonLikes = JSON.parse(tempLikes);
                var userAlreadyVoted = _.find(jsonLikes, (o) => { return o.commentID == commentJson.id && _.find(o.userVote, (oo) => { return oo.userid == currentUserInfo.ID; }); });
                var userPresent = (userAlreadyVoted === undefined || userAlreadyVoted == null) ? false : true;
                var fil = _.find(jsonLikes, (o) => { return o.commentID == commentJson.id; });
                if (fil !== undefined && fil !== null) {
                    // Found likes for the comment id
                    if (commentJson.user_has_upvoted) {
                        if (!userPresent) fil.userVote = _.concat(fil.userVote, { userid: currentUserInfo.ID, name: currentUserInfo.DisplayName });
                    } else {
                        if (userPresent) {
                            if (fil !== undefined && fil !== null) _.remove(fil.userVote, (o) => { return o['userid'] == currentUserInfo.ID; });
                        }
                    }
                } else {
                    // No likes found for the comment id
                    jsonLikes.push({ commentID: commentJson.id, userVote: [{ userid: currentUserInfo.ID, name: currentUserInfo.DisplayName }] });
                }
                return await this.updateVoteForComment(pageurl, jsonLikes);
            } else {
                // Likes doesn't exists so add new
                if (commentJson.user_has_upvoted) return await this.addVoteForComment(pageurl, commentJson, currentUserInfo);
            }
        } else {
            return commentJson;
        }
    }

    public deleteComment = async (pageurl, commentJson) => {
        let comments = await this.getComment(pageurl);
        if (comments !== undefined && comments !== null) {
            var jsonComments = JSON.parse(comments);
            _.remove(jsonComments, (o) => { return o['id'] == commentJson.id; });
            return await this.updateComment(pageurl, jsonComments);
        }
    }

    public editComments = async (pageurl, commentJson) => {
        let comment = await this.getComment(pageurl);
        if (comment !== undefined && comment !== null) {
            var jsonComments = JSON.parse(comment);
            var match = _.find(jsonComments, (o) => { return o.id == commentJson.id; });
            if (match) _.merge(match, { pings: commentJson.pings, content: commentJson.content, modified: commentJson.modified });
            return await this.updateComment(pageurl, jsonComments);
        }
    }

    public createFolder = async (folderPath) => {
        return await sp.web.folders.add(folderPath);
    }

    public uploadFileToFolder = async (folderpath, fileinfo) => {
        return await sp.web.getFolderByServerRelativeUrl(folderpath).files.add(fileinfo.name, fileinfo.content, true);
    }

    public postAttachments = async (commentArray: any[], pageFolderExists, postAttachmentPath): Promise<any> => {
        var self = this;
        return new Promise(async (resolve, reject) => {
            if (!pageFolderExists) await this.createFolder(postAttachmentPath);
            var reader = new FileReader();
            reader.onload = async () => {
                var contentBuffer = reader.result;
                let uploadedFile = await self.uploadFileToFolder(postAttachmentPath, { name: commentArray[0].file.name, content: contentBuffer });
                _.set(commentArray[0], 'file_id', uploadedFile.data.UniqueId);
                _.set(commentArray[0], 'file_url', postAttachmentPath + "/" + commentArray[0].file.name);
                resolve(commentArray);
            };
            await reader.readAsArrayBuffer(commentArray[0].file);
        });
    }

    public checkListExists = async (): Promise<boolean> => {
        return new Promise<boolean>(async (res, rej) => {
            sp.web.lists.getByTitle(this.lst_pageComments).get().then((listExists) => {
                res(true);
            }).catch(async err => {
                let listExists = await (await sp.web.lists.ensure(this.lst_pageComments)).list;
                await listExists.fields.addText('PageURL', 255, { Required: true, Description: '' });
                await listExists.fields.addMultilineText('Comments', 6, false, false, false, false, { Required: true, Description: '' });
                await listExists.fields.addMultilineText('Likes', 6, false, false, false, false, { Required: false, Description: '' });
                let allItemsView = await listExists.views.getByTitle('All Items');
                await allItemsView.fields.add('PageURL');
                await allItemsView.fields.add('Comments');
                await allItemsView.fields.add('Likes');
                res(true);
            });        
        });
    }

}