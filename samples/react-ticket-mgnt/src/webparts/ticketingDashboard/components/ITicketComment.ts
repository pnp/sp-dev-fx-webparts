export interface ITicketCommentAuthor {
    id: number;
    loginName: string;
    name: string;
    email: string;
    profileImageUrl: string | undefined;
}

export interface ITicketComment {
    id: string;
    text: string;
    createdDate: string;
    isEdited: boolean;
    likeCount: number;
    isLikedByUser: boolean;
    author: ITicketCommentAuthor;
}
