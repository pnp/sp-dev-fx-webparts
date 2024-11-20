import React, { useEffect, useState } from 'react';
import { Card, CardSection } from '@fluentui/react-cards';
import { initializeIcons } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import BlueSkyImageSection from './BlueSkyImageSection';
import BlueSkyContentSection from './BlueSkyContentSection';
import BlueSkyTimestampSection from './BlueSkyTimestampSection';
import useAccessToken from './useAccessToken';
import useBlueSkyPosts from './useBlueSkyPosts';
import useLikePost from './useLikePost';
import usePostMetrics from './usePostMetrics';
import styles from './BlueSky.module.scss';
import { IBlueSkyProps } from './IBlueSkyProps';
import axios from 'axios';

// Initialize Fluent UI icons
initializeIcons();

const pdsUrl = "https://bsky.social";

const BlueSky: React.FC<IBlueSkyProps> = (props) => {
    const { accessToken, error: tokenError } = useAccessToken('<your handle>.bsky.social', 'your app password'); // replace!
    const { posts, loading, error: postsError } = useBlueSkyPosts(accessToken);
    const [did, setDid] = useState<string>('');

    useEffect(() => {
        const fetchDid = async (): Promise<void> => {
            if (accessToken) {
                try {
                    const response = await axios.get(
                        `${pdsUrl}/xrpc/com.atproto.identity.resolveHandle?handle=<your handle>.bsky.social`,
                        { headers: { Authorization: `Bearer ${accessToken}` } }
                    );
                    setDid(response.data.did);
                } catch (error) {
                    console.error('Failed to fetch DID', error);
                }
            }
        };

        fetchDid().catch((error) => console.error('Error fetching DID:', error));
    }, [accessToken]);

    const { likedPosts, handleLikeClick } = useLikePost(accessToken || '', did || '');
    const metrics = usePostMetrics(accessToken || '', posts);

    return (
        <div>
            <h1>{props.description}</h1>
            {loading && <p>Loading posts...</p>}
            {(tokenError || postsError) && <p style={{ color: 'red' }}>Error: {tokenError || postsError}</p>}
            
            <div className={styles.container}>
                {posts.map((post) => {
                    const lastUriSegment = post.uri.split('/').pop();
                    const postUrl = `https://bsky.app/profile/${post.author.handle}/post/${lastUriSegment}`;
                    const profileUrl = `https://bsky.app/profile/${post.author.handle}`;
                    const postMetrics = metrics[post.id] || { likeCount: 0, shareCount: 0, replyCount: 0 };
                    const isLiked = likedPosts.has(post.id);

                    return (
                        <Card key={post.id} className={styles.card}>
                            <CardSection>
                                <div className={styles.cardAuthorContainer} onClick={() => window.open(profileUrl, '_blank')}>
                                    <img src={post.author.avatar || ''} alt={post.author.displayName} className={styles.cardAvatar} />
                                    <span className={styles.cardAuthor}>{post.author.displayName}</span>
                                </div>
                            </CardSection>
                            <CardSection>
                                <div onClick={() => window.open(postUrl, '_blank')}>
                                    <BlueSkyContentSection content={post.content} />
                                </div>
                            </CardSection>
                            <CardSection>
                                <BlueSkyImageSection images={post.images || []} did={post.did} />
                            </CardSection>
                            <CardSection>
                                <BlueSkyTimestampSection timestamp={post.timestamp} />
                            </CardSection>
                            <CardSection>
                                <div className={styles.postStats}>
                                    <div className={`${styles.statItem} ${isLiked ? styles.liked : ''}`} onClick={() => handleLikeClick(post.uri, post.id).catch((error) => console.error('Error liking post:', error))}>
                                        <Icon iconName="Heart" className={styles.statIcon} />
                                        <span className={styles.statText}>{postMetrics.likeCount + (isLiked ? 1 : 0)}</span>
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
                    );
                })}
            </div>
        </div>
    );
};

export default BlueSky;