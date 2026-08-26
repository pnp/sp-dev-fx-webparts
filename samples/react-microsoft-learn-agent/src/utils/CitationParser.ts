export interface Citation {
    number: number;
    url?: string;
    title?: string;
    description?: string;
}

export interface ParsedResponse {
    text: string;
    citations: Citation[];
}

import { CITATION_CONSTANTS } from '../constants/app.constants';

export class CitationParser {
    /**
     * Parse response text to extract citations and references
     */
    public static parseResponse(text: string): ParsedResponse {
        const citations: Citation[] = [];
        let processedText = text;

        // Extract URLs and create citations
        const urls = text.match(CITATION_CONSTANTS.LINK_PATTERN) || [];
        urls.forEach((url, index) => {
            const citationNumber = index + 1;
            citations.push({
                number: citationNumber,
                url,
                title: this.extractTitleFromUrl(url),
                description: url
            });

            // Replace URL with citation number in the text
            processedText = processedText.replace(url, `[${citationNumber}]`);
        });

        // Also handle existing citation patterns [1], [2], etc.
        const existingCitations = text.match(CITATION_CONSTANTS.CITATION_PATTERN) || [];
        existingCitations.forEach((match) => {
            const number = parseInt(match.replace(/[[\]]/g, ''), 10);
            if (!citations.find(c => c.number === number)) {
                citations.push({
                    number,
                    title: `Reference ${number}`,
                    description: `Source reference ${number}`
                });
            }
        });

        return {
            text: processedText,
            citations: citations.sort((a, b) => a.number - b.number)
        };
    }

    /**
     * Extract a readable title from URL
     */
    private static extractTitleFromUrl(url: string): string {
        try {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.replace('www.', '');

            if (hostname.includes('microsoft')) {
                return 'Microsoft Documentation';
            }
            if (hostname.includes('docs.microsoft.com')) {
                return 'Microsoft Docs';
            }
            if (hostname.includes('learn.microsoft.com')) {
                return 'Microsoft Learn';
            }
            if (hostname.includes('github.com')) {
                return 'GitHub Repository';
            }

            // Fallback to hostname
            return hostname.charAt(0).toUpperCase() + hostname.slice(1);
        } catch {
            return 'Reference Link';
        }
    }
}
