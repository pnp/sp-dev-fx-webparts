import { useState } from 'react';
import axios from 'axios';

const pdsUrl = "https://bsky.social";
const likePostEndpoint = `${pdsUrl}/xrpc/com.atproto.repo.createRecord`;
const getPostThreadEndpoint = `${pdsUrl}/xrpc/app.bsky.feed.getPostThread`;

const getPostMetrics = async (accessToken: string, postUri: string): Promise<{ likeCount: number; shareCount: number; replyCount: number; cid: string }> => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const params = { uri: postUri };

    try {
        const response = await axios.get(getPostThreadEndpoint, { headers, params });
        const data = response.data;

        const thread = data.thread || {};
        const post = thread.post || {};

        const likeCount = post.likeCount || 0;
        const shareCount = post.reshareCount || 0;
        const replyCount = post.replyCount || 0;
        const cid = post.cid || '';

        return { likeCount, shareCount, replyCount, cid };
    } catch (error) {
        console.error(`Failed to fetch metrics for post ${postUri}`, error);
        throw error;
    }
};

const likePost = async (accessToken: string, postUri: string, cid: string, did: string): Promise<void> => {
    const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };
    const data = {
        repo: did,
        collection: 'app.bsky.feed.like',
        record: {
            $type: 'app.bsky.feed.like',
            subject: {
                uri: postUri,
                cid,
            },
            createdAt: new Date().toISOString(),
        },
    };

    try {
        const response = await axios.post(likePostEndpoint, data, { headers });
        console.log(`Post ${postUri} liked successfully with uri: ${response.data.uri}`);
    } catch (error) {
        console.error(`Failed to like post ${postUri}`, error);
        throw error;
    }
};

const useLikePost = (accessToken: string, did: string): { likedPosts: Set<string>; handleLikeClick: (postUri: string, postId: string) => Promise<void> } => {
    const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

    const handleLikeClick = async (postUri: string, postId: string): Promise<void> => {
        if (accessToken && did) {
            try {
                const postMetrics = await getPostMetrics(accessToken, postUri);
                await likePost(accessToken, postUri, postMetrics.cid, did);
                console.log(`Post ${postUri} liked`);
                setLikedPosts(prevLikedPosts => {
                    const newLikedPosts = new Set(prevLikedPosts);
                    newLikedPosts.add(postId);
                    return newLikedPosts;
                });
            } catch (error) {
                console.error(`Failed to like post ${postUri}`, error);
            }
        }
    };

    return { likedPosts, handleLikeClick };
};

export default useLikePost;