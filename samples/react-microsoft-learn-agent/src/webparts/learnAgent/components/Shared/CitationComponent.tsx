import * as React from 'react';
import styles from './LearnAgent.module.scss';
import { Citation } from '../../../../utils/CitationParser';
import { ExternalLink } from 'lucide-react';
import { CITATION_CONSTANTS } from '../../../../constants/app.constants';

interface CitationComponentProps {
    citations: Citation[];
    onCitationClick?: (citation: Citation) => void;
}

export const CitationComponent: React.FC<CitationComponentProps> = ({
    citations,
    onCitationClick
}) => {
    const handleCitationClick = (citation: Citation): void => {
        if (citation.url) {
            window.open(citation.url, '_blank', 'noopener,noreferrer');
        }
        onCitationClick?.(citation);
    };

    if (citations.length === 0) {
        return null;
    }

    return (
        <div className={styles.citationsContainer}>
            <h4 className={styles.citationsTitle}>
                {CITATION_CONSTANTS.REFERENCES_TITLE}
            </h4>
            <div className={styles.citationsList}>
                {citations.map((citation) => (
                    <div
                        key={citation.number}
                        className={styles.citationItem}
                    >
                        <div className={styles.citationNumber}>
                            {citation.number}
                        </div>
                        <div className={styles.citationContent}>
                            {citation.url ? (
                                <a
                                    href={citation.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.citationTitle}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCitationClick(citation);
                                    }}
                                >
                                    <span>{citation.title}</span>
                                    <ExternalLink size={12} style={{ marginLeft: '4px', display: 'inline' }} />
                                </a>
                            ) : (
                                <div className={styles.citationTitle}>
                                    {citation.title}
                                </div>
                            )}
                            {citation.url && (
                                <div className={styles.citationUrl}>
                                    <a
                                        href={citation.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.citationLink}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleCitationClick(citation);
                                        }}
                                    >
                                        {citation.url}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
