// For use with this API:
// https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/api/channel_post_chatthreads
// TODO: Replace with something more official

export const enum ContentType {
    text = 0,
    html = 1
}

export interface IChatMessage {
    body: {
        content: string;
        contentType: string;
    };
}
