import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/comments";
import { ITicketComment } from "../components/ITicketComment";

export class CommentService {
    private listTitle: string;

    constructor(listName: string = "Tickets") {
        this.listTitle = listName;
    }

    public async getComments(itemId: number, sp: SPFI): Promise<ITicketComment[]> {
        try {
            const comments = await sp.web.lists.getByTitle(this.listTitle).items.getById(itemId).comments();
            return comments as unknown as ITicketComment[];
        } catch (error) {
            console.error("Error fetching comments:", error);
            throw error;
        }
    }

    public async addComment(itemId: number, text: string, sp: SPFI): Promise<ITicketComment> {
        try {
            const comment = await sp.web.lists.getByTitle(this.listTitle).items.getById(itemId).comments.add(text);
            return comment as unknown as ITicketComment;
        } catch (error) {
            console.error("Error adding comment:", error);
            throw error;
        }
    }

    public async deleteComment(itemId: number, commentId: string, sp: SPFI): Promise<void> {
        try {
            await sp.web.lists.getByTitle(this.listTitle).items.getById(itemId).comments.getById(parseInt(commentId, 10)).delete();
        } catch (error) {
            console.error("Error deleting comment:", error);
            throw error;
        }
    }

    public async likeComment(itemId: number, commentId: string, sp: SPFI): Promise<void> {
        try {
            await sp.web.lists.getByTitle(this.listTitle).items.getById(itemId).comments.getById(parseInt(commentId, 10)).like();
        } catch (error) {
            console.error("Error liking comment:", error);
            throw error;
        }
    }

    public async unlikeComment(itemId: number, commentId: string, sp: SPFI): Promise<void> {
        try {
            await sp.web.lists.getByTitle(this.listTitle).items.getById(itemId).comments.getById(parseInt(commentId, 10)).unlike();
        } catch (error) {
            console.error("Error unliking comment:", error);
            throw error;
        }
    }
}
