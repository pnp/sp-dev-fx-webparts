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
    images?: BlueSkyImage[];
    did: string;
    uri: string;
    replyCount: number;
    reshareCount: number;
    likeCount: number;
    parent?: string; // Add parent property to identify replies
}

interface BlueSkyImage {
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
}

interface BlueSkyPostItem {
    post: {
        cid: string;
        record: {
            text: string;
            createdAt: string;
            parent?: string;
            embed?: {
                images?: BlueSkyImage[];
            };
        };
        author: {
            displayName: string;
            avatar?: string;
            did: string;
            handle: string;
        };
        uri: string;
        replyCount: number;
        reshareCount: number;
        likeCount: number;
    };
}

interface BlueSkyApiResponse {
    feed: BlueSkyPostItem[];
    cursor?: string;
}

const useBlueSkyPosts = (accessToken: string | undefined): { posts: BlueSkyPost[], loading: boolean, error: string | undefined } => {
    const [posts, setPosts] = useState<BlueSkyPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!accessToken) return;

        const fetchBlueSkyPosts = async (): Promise<void> => {
            setLoading(true);
            setError(undefined);

            try {
                let allPosts: BlueSkyPost[] = [];
                let cursor: string | undefined = undefined;
                const postIds = new Set<string>(); // Track unique post IDs
                const hashtags = ["#SharePoint", "#Microsoft365", "#Microsoft365Dev", "Microsoft", "#MicrosoftTeams", "#SPFx", "#SharingIsCaring", "#MsIgnite", "PowerPlatform", "Azure"];
                const desiredPostCount = 10; // Set the desired number of posts to fetch

                while (allPosts.length < desiredPostCount) {
                    const response = await fetch(`https://bsky.social/xrpc/app.bsky.feed.getTimeline${cursor ? `?cursor=${cursor}` : ''}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    const data: BlueSkyApiResponse = await response.json();

                    const newPosts: BlueSkyPost[] = data.feed
                        .filter((item: BlueSkyPostItem) => {
                            return !item.post.record.parent && hashtags.some(tag => item.post.record.text.includes(tag));
                        })
                        .map((item: BlueSkyPostItem) => ({
                            id: item.post.cid,
                            content: item.post.record.text,
                            timestamp: item.post.record.createdAt,
                            author: {
                                displayName: item.post.author.displayName,
                                avatar: item.post.author.avatar || '',
                                did: item.post.author.did,
                                handle: item.post.author.handle,
                            },
                            images: item.post.record.embed?.images || [],
                            did: item.post.author.did,
                            uri: item.post.uri,
                            replyCount: item.post.replyCount,
                            reshareCount: item.post.reshareCount,
                            likeCount: item.post.likeCount,
                        }))
                        .filter(post => {
                            const isDuplicate = postIds.has(post.id);
                            console.log(`Post ID: ${post.id}, Is Duplicate: ${isDuplicate}`);
                            return !isDuplicate;
                        });

                    newPosts.forEach(post => {
                        console.log(`Adding Post ID: ${post.id} to Set`);
                        postIds.add(post.id);
                    });

                    allPosts = [...allPosts, ...newPosts];
                    cursor = data.cursor;

                    if (!cursor) break; // Exit loop if no more posts are available
                }

                console.log('Filtered Posts:', allPosts.map(post => post.id)); // Log the filtered post IDs

                setPosts(allPosts.slice(0, desiredPostCount)); // Limit to the desired number of posts
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBlueSkyPosts().catch((err) => console.error("Failed to fetch posts:", err));

        const intervalId = setInterval(fetchBlueSkyPosts, 30000); // Reload every 30 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [accessToken]);

    return { posts, loading, error };
};

export default useBlueSkyPosts;