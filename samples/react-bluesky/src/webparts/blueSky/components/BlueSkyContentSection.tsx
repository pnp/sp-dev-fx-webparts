import React from 'react';
import styles from './BlueSky.module.scss';

interface BlueSkyContentSectionProps {
    content: string;
}

const HASHTAG_PATTERN = /#\w+/g;
const URL_PATTERN = /[^\s]+\.[^\s]+/g; // Match any text containing a dot (.) until a space is found
const COMBINED_PATTERN = /(#\w+)|([^\s]+\.[^\s]+)/g;

const BlueSkyContentSection: React.FC<BlueSkyContentSectionProps> = ({ content }) => {
    const renderContentWithHashtagsAndLinks = (text: string): React.ReactNode[] => {
        const parts = text.split(COMBINED_PATTERN).filter(Boolean);
        return parts.map((part, index) => {
            if (HASHTAG_PATTERN.test(part)) {
                return (
                    <span key={`hashtag-${index}`} className={styles.hashtag}>
                        {part}
                    </span>
                );
            } else if (URL_PATTERN.test(part)) {
                const url = part.startsWith('http') || part.startsWith('www') ? part : `http://${part}`;
                return (
                    <a key={`url-${index}`} href={url} target="_blank" rel="noopener noreferrer" className={styles.hashtag}>
                        {part}
                    </a>
                );
            } else {
                return <span key={`part-${index}`}>{part}</span>;
            }
        });
    };

    return <div className={styles.cardContent}>{renderContentWithHashtagsAndLinks(content)}</div>;
};

export default BlueSkyContentSection;