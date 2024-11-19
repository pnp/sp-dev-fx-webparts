import { useState, useEffect } from 'react';

interface BlueSkyPost {
    id: string;
    content: string;
    timestamp: string;
    author: {
        displayName: string;
        avatar?: string;
        did: string;
        handle: string;
    };
    images?: {
        alt: string;
        aspectRatio: {
            height: number;
            width: number;
        };
        image: {
            $type: string;
            mimeType: string;
            ref: {
                $link: string;
            };
            size: number;
        };
    }[]; // Include the images property
    did: string;
    uri: string;
    replyCount: number;
    reshareCount: number;
    likeCount: number;
}

interface BlueSkyApiResponse {
    feed: { post: BlueSkyPostItem }[];
    cursor?: string;
}

interface BlueSkyPostItem {
    cid: string;
    uri: string;
    record: {
        text: string;
        createdAt: string;
        embed?: {
            images?: {
                alt: string;
                aspectRatio: {
                    height: number;
                    width: number;
                };
                image: {
                    $type: string;
                    mimeType: string;
                    ref: {
                        $link: string;
                    };
                    size: number;
                };
            }[];
        };
    };
    author: {
        displayName: string;
        avatar?: string;
        did: string;
        handle: string;
    };
    replyCount: number;
    reshareCount: number;
    likeCount: number;
}

const fetchWithRateLimitRetry = async (url: string, options: RequestInit, retries = 3, delay = 2000): Promise<unknown> => {
    try {
        const response = await fetch(url, options);
        if (response.status === 429) throw new Error("Rate Limit Exceeded");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const jsonData = await response.json();
        return jsonData;
    } catch (error: unknown) {
        if (retries > 0 && error instanceof Error && error.message === "Rate Limit Exceeded") {
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchWithRateLimitRetry(url, options, retries - 1, delay * 2);
        } else {
            throw error;
        }
    }
};

const useBlueSkyPosts = (accessToken: string | undefined): { posts: BlueSkyPost[], loading: boolean, error: string | undefined } => {
    const [posts, setPosts] = useState<BlueSkyPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!accessToken) return;

        const fetchBlueSkyPosts = async (): Promise<void> => {
            setLoading(true);
            setError(undefined);

            const cacheKey = 'blueSkyPosts';
            const cacheExpiryKey = 'blueSkyPostsExpiry';
            const cacheExpiryTime = 60 * 60 * 1000; // 1 hour

            const cachedPosts = localStorage.getItem(cacheKey);
            const cachedExpiry = localStorage.getItem(cacheExpiryKey);

            if (cachedPosts && cachedExpiry && Date.now() < parseInt(cachedExpiry, 10)) {
                setPosts(JSON.parse(cachedPosts));
                setLoading(false);
                return;
            }

            const hashtags = ["#Microsoft365", "#SPFx", "#SharePoint", "#MSIgnite", "PowerPlatform", "Microsoft365Dev", "#SharingIsCaring"]; // Add the #SharingIsCaring hashtag
            const filteredPosts: BlueSkyPost[] = [];
            let cursor: string | undefined = undefined;

            try {
                while (filteredPosts.length < 10) {  // Limit to 10 posts
                    const url: string = `https://bsky.social/xrpc/app.bsky.feed.getTimeline${cursor ? `?cursor=${cursor}` : ''}`;
                    const data = await fetchWithRateLimitRetry(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }) as BlueSkyApiResponse;

                    const feed = data.feed;

                    // Filter posts that contain specified hashtags
                    const matchingPosts = feed
                        .filter(item => hashtags.some(tag => item.post.record.text.includes(tag)))
                        .map(item => ({
                            id: item.post.cid,
                            content: item.post.record.text,
                            timestamp: item.post.record.createdAt,
                            author: {
                                displayName: item.post.author.displayName,
                                avatar: item.post.author.avatar || '',
                                did: item.post.author.did,
                                handle: item.post.author.handle,
                            },
                            images: item.post.record.embed?.images || [], // Map images
                            did: item.post.author.did,
                            uri: item.post.uri,
                            replyCount: item.post.replyCount,
                            reshareCount: item.post.reshareCount,
                            likeCount: item.post.likeCount,
                        }));

                    filteredPosts.push(...matchingPosts);

                    if (filteredPosts.length >= 10) break;
                    cursor = data.cursor;
                    if (!cursor) break;
                }

                setPosts(filteredPosts.slice(0, 10));
                localStorage.setItem(cacheKey, JSON.stringify(filteredPosts.slice(0, 10)));
                localStorage.setItem(cacheExpiryKey, (Date.now() + cacheExpiryTime).toString());
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBlueSkyPosts().catch((err) => console.error("Failed to fetch posts:", err));
    }, [accessToken]);

    return { posts, loading, error };
};

export default useBlueSkyPosts;
