import React from 'react';
import { Text } from '@fluentui/react';
import styles from './BlueSky.module.scss';

interface BlueSkyAuthorSectionProps {
    avatar: string;
    author: string;
}

const BlueSkyAuthorSection: React.FC<BlueSkyAuthorSectionProps> = ({ avatar, author }) => {
    console.log('Author:', author); // Log the author prop to the console

    return (
        <div className={styles.cardAuthorContainer}>
            <img src={avatar} alt={`${author}'s avatar`} className={styles.cardAvatar} />
            <Text className={styles.cardAuthor}>{author}</Text>
        </div>
    );
};

export default BlueSkyAuthorSection;