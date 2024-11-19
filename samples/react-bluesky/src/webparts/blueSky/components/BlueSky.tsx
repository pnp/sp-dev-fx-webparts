import React, { useEffect, useState } from 'react';
import { Card, CardSection } from '@fluentui/react-cards';
import { initializeIcons } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import BlueSkyImageSection from './BlueSkyImageSection';
import BlueSkyAuthorSection from './BlueSkyAuthorSection';
import BlueSkyContentSection from './BlueSkyContentSection';
import BlueSkyTimestampSection from './BlueSkyTimestampSection';
import useAccessToken from './useAccessToken';
import useBlueSkyPosts from './useBlueSkyPosts';
import styles from './BlueSky.module.scss';
import { IBlueSkyProps } from './IBlueSkyProps';
import axios from 'axios';

// Initialize Fluent UI icons
initializeIcons();

const pdsUrl = "https://bsky.social";
const getPostThreadEndpoint = `${pdsUrl}/xrpc/app.bsky.feed.getPostThread`;

const getPostMetrics = async (accessToken: string, postUri: string): Promise<{ likeCount: number; shareCount: number; replyCount: number }> => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const params = { uri: postUri };

    try {
        const response = await axios.get(getPostThreadEndpoint, { headers, params });
        const data = response.data;

        console.log('API Response:', data); // Log the full API response

        const thread = data.thread || {};
        const post = thread.post || {};

        console.log('Post Data:', post); // Log the post data

        const likeCount = post.likeCount || 0;
        const shareCount = post.reshareCount || 0;
        const replyCount = post.replyCount || 0;

        return { likeCount, shareCount, replyCount };
    } catch (error) {
        console.error(`Failed to fetch metrics for post ${postUri}`, error);
        throw error;
    }
};

const BlueSky: React.FC<IBlueSkyProps> = (props) => {
    const { accessToken, error: tokenError } = useAccessToken('luisefreese.bsky.social', 'txmo-2fvo-vwb3-3vwa');
    const { posts, loading, error: postsError } = useBlueSkyPosts(accessToken);

    const [metrics, setMetrics] = useState<{ [key: string]: { likeCount: number, shareCount: number, replyCount: number } }>({});

    useEffect(() => {
        const fetchMetrics = async (): Promise<void> => {
            if (accessToken) {
                const newMetrics: { [key: string]: { likeCount: number, shareCount: number, replyCount: number } } = {};
                for (const post of posts) {
                    const postUri = post.uri.startsWith('at://') ? post.uri : `at://${post.uri}`;
                    try {
                        const postMetrics = await getPostMetrics(accessToken, postUri);
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

    return (
        <div>
            <h1>{props.description}</h1>
            {loading && <p>Loading posts...</p>}
            {(tokenError || postsError) && <p style={{ color: 'red' }}>Error: {tokenError || postsError}</p>}
            
            <div className={styles.container}>
                {posts.map((post) => {
                    const lastUriSegment = post.uri.split('/').pop();
                    const postUrl = `https://bsky.app/profile/${post.author.handle}/post/${lastUriSegment}`;
                    const postMetrics = metrics[post.id] || { likeCount: 0, shareCount: 0, replyCount: 0 };

                    return (
                        <a key={post.id} href={postUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                            <Card className={styles.card}>
                                <CardSection>
                                    <BlueSkyAuthorSection avatar={post.author.avatar || ''} author={post.author.displayName} />
                                </CardSection>
                                <CardSection>
                                    <BlueSkyContentSection content={post.content} />
                                </CardSection>
                                <CardSection>
                                    <BlueSkyImageSection images={post.images || []} did={post.did} />
                                </CardSection>
                                <CardSection>
                                    <BlueSkyTimestampSection timestamp={post.timestamp} />
                                </CardSection>
                                <CardSection>
                                    <div className={styles.postStats}>
                                        <div className={styles.statItem}>
                                            <Icon iconName="Heart" className={styles.statIcon} />
                                            <span className={styles.statText}>{postMetrics.likeCount}</span>
                                        </div>
                                        <div className={styles.statItem}>
                                            <Icon iconName="Share" className={styles.statIcon} />
                                            <span className={styles.statText}>{postMetrics.shareCount}</span>
                                        </div>
                                        <div className={styles.statItem}>
                                            <Icon iconName="Comment" className={styles.statIcon} />
                                            <span className={styles.statText}>{postMetrics.replyCount}</span>
                                        </div>
                                    </div>
                                </CardSection>
                            </Card>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default BlueSky;