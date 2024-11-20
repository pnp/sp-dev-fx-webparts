import { useState, useEffect } from 'react';
import axios from 'axios';

const pdsUrl = "https://bsky.social";
const getPostThreadEndpoint = `${pdsUrl}/xrpc/app.bsky.feed.getPostThread`;

const fetchPostMetrics = async (accessToken: string, postUri: string): Promise<{ likeCount: number; shareCount: number; replyCount: number; cid: string }> => {
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

const usePostMetrics = (accessToken: string, posts: { uri: string; id: string }[]): { [key: string]: { likeCount: number; shareCount: number; replyCount: number } } => {
    const [metrics, setMetrics] = useState<{ [key: string]: { likeCount: number; shareCount: number; replyCount: number } }>({});

    useEffect(() => {
        const fetchMetrics = async (): Promise<void> => {
            if (accessToken) {
                const newMetrics: { [key: string]: { likeCount: number, shareCount: number, replyCount: number } } = {};
                for (const post of posts) {
                    const postUri = post.uri.startsWith('at://') ? post.uri : `at://${post.uri}`;
                    try {
                        const postMetrics = await fetchPostMetrics(accessToken, postUri);
                        newMetrics[post.id] = postMetrics;
                    } catch (error) {
                        console.error(`Failed to fetch metrics for post ${post.id}`, error);
                    }
                }
                setMetrics(newMetrics);
            }
        };

        fetchMetrics()
            .then(() => console.log("Metrics fetched successfully"))
            .catch((error) => console.error("Error fetching metrics:", error));
    }, [accessToken, posts]);

    return metrics;
};

export default usePostMetrics;