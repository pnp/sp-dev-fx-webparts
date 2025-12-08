import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import * as remarkGfm from 'remark-gfm';
import styles from './LearnAgent.module.scss';
import { CITATION_CONSTANTS } from '../../../../constants/app.constants';

interface TextWithCitationsProps {
    text: string;
    onCitationClick?: (citationNumber: number) => void;
}

export const TextWithCitations: React.FC<TextWithCitationsProps> = ({
    text,
    onCitationClick
}) => {
    // Custom text renderer to handle citations within markdown
    const textRenderer = ({ children }: { children: React.ReactNode }): JSX.Element => {
        if (typeof children !== 'string') {
            return <>{children}</>;
        }

        const parts = children.split(CITATION_CONSTANTS.CITATION_PATTERN);
        const elements: React.ReactNode[] = [];

        for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
                // Regular text
                if (parts[i]) {
                    elements.push(parts[i]);
                }
            } else {
                // Citation number
                const citationNumber = parseInt(parts[i], 10);
                if (!isNaN(citationNumber) && citationNumber > 0) {
                    elements.push(
                        <button
                            key={`citation-${i}`}
                            className={styles.citationNumber}
                            onClick={() => onCitationClick?.(citationNumber)}
                            title={`View reference ${citationNumber}`}
                            type="button"
                        >
                            {citationNumber}
                        </button>
                    );
                }
            }
        }

        return <>{elements}</>;
    };

    return (
        <div className={styles.messageWithCitations}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Handle text nodes to process citations
                    text: textRenderer,
                    // Ensure proper paragraph rendering
                    p: ({ children }) => <p>{children}</p>,
                }}
            >
                {text}
            </ReactMarkdown>
        </div>
    );
};
