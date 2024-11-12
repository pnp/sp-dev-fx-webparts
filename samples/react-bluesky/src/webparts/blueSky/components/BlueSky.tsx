import React from 'react';
import { Card, CardSection } from '@fluentui/react-cards';
import { initializeIcons } from '@fluentui/react';
import BlueSkyImageSection from './BlueSkyImageSection';
import BlueSkyAuthorSection from './BlueSkyAuthorSection';
import BlueSkyContentSection from './BlueSkyContentSection';
import BlueSkyTimestampSection from './BlueSkyTimestampSection';
import useAccessToken from './useAccessToken';
import useBlueSkyPosts from './useBlueSkyPosts';
import styles from './BlueSky.module.scss';
import { IBlueSkyProps } from './IBlueSkyProps';

// Initialize Fluent UI icons
initializeIcons();

const BlueSky: React.FC<IBlueSkyProps> = (props) => {
    const { accessToken, error: tokenError } = useAccessToken('your handle goes here', 'your app password goes here');
    const { posts, loading, error: postsError } = useBlueSkyPosts(accessToken);

    return (
        <div>
            <h1>{props.description}</h1>
            {loading && <p>Loading posts...</p>}
            {(tokenError || postsError) && <p style={{ color: 'red' }}>Error: {tokenError || postsError}</p>}
            
            <div className={styles.container}>
                {posts.map((post) => {
                    const lastUriSegment = post.uri.split('/').pop();
                    const postUrl = `https://bsky.app/profile/${post.author.handle}/post/${lastUriSegment}`;
                    return (
                        <a key={post.id} href={postUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                            <Card className={styles.card}>
                                <CardSection>
                                    <BlueSkyAuthorSection avatar={post.avatar} author={post.author.displayName} />
                                </CardSection>
                                <CardSection>
                                    <BlueSkyContentSection content={post.content} />
                                </CardSection>
                                <CardSection>
                                    <BlueSkyImageSection images={post.embed?.images} external={post.embed?.external} did={post.did} />
                                </CardSection>
                                <CardSection>
                                    <BlueSkyTimestampSection timestamp={post.timestamp} />
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