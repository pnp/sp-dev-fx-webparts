/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef } from 'react';
import { useSPFxMSGraphClient, useSPFxPageContext, useSPFxLocaleInfo } from '@apvee/spfx-react-toolkit';
import { useLanguageDetector } from './useLanguageDetector';
import { useTranslator } from './useTranslator';
import { useSummaryCache } from './useSummaryCache';

interface UseSummarizerReturn {
    isLoading: boolean;
    summary: string;
    error: string;
    isSupported: boolean;
    downloadProgress: number | undefined;
    statusMessage: string;
    summarizePage: (forceRegenerate?: boolean) => Promise<void>;
    stopSummarizing: () => void;
    clearSummary: () => void;
}

export const useSummarizer = (
    useStreaming: boolean = true,
    summarizerType: string = 'key-points',
    summarizerFormat: string = 'markdown',
    summarizerLength: string = 'medium',
    sharedContext: string = 'This is a SharePoint page with business content.',
    context: string = 'This is SharePoint page content that needs to be summarized for business users.',
    statusMessages: {
        initializing: string;
        checkingCache: string;
        preparingTranslation: string;
        downloadingModel: string;
        initializingModel: string;
        fetchingContent: string;
        generatingSummary: string;
    } = {
        initializing: 'Initializing...',
        checkingCache: 'Checking cache...',
        preparingTranslation: 'Preparing translation...',
        downloadingModel: 'Downloading model...',
        initializingModel: 'Initializing AI model...',
        fetchingContent: 'Fetching page content...',
        generatingSummary: 'Generating summary...'
    }
): UseSummarizerReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [summary, setSummary] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [downloadProgress, setDownloadProgress] = useState<number | undefined>(undefined);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [isSupported, setIsSupported] = useState<boolean>(true);
    const abortRef = useRef<boolean>(false);
    const summarizerRef = useRef<any>(null);

    const pageContext = useSPFxPageContext();
    const { invoke } = useSPFxMSGraphClient();
    const { locale } = useSPFxLocaleInfo();
    const { detectLanguage } = useLanguageDetector();
    const { translate, translateStreaming } = useTranslator();
    const { getCachedSummary, saveSummary, updateSummary } = useSummaryCache();

    // Summarizer API only supports these languages
    const SUPPORTED_SUMMARIZER_LANGUAGES = ['en', 'ja', 'es'];
    
    // Extract language code from locale
    const languageCode = locale.split('-')[0];
    const isLanguageSupported = SUPPORTED_SUMMARIZER_LANGUAGES.indexOf(languageCode) !== -1;
    
    // Override sharedContext and context for unsupported languages
    const effectiveSharedContext = isLanguageSupported 
        ? sharedContext 
        : 'This is a SharePoint page with business content.';
    
    const effectiveContext = isLanguageSupported
        ? context
        : 'This is SharePoint page content that needs to be summarized for business users.';

    const stopSummarizing = useCallback((): void => {
        abortRef.current = true;

        // Destroy the summarizer to actually stop the operation
        if (summarizerRef.current) {
            try {
                summarizerRef.current.destroy();
                summarizerRef.current = null;
            } catch (err) {
                console.error('Error destroying summarizer:', err);
            }
        }

        setIsLoading(false);
        setDownloadProgress(undefined);
    }, []);

    const clearSummary = useCallback((): void => {
        setSummary('');
        setError('');
    }, []);

    const checkSupport = useCallback((): boolean => {
        // Check if the Summarizer API is supported
        if (!('Summarizer' in window)) {
            setIsSupported(false);
            setError('The Summarizer API is not supported in your browser. Please use Chrome 138 or later.');
            return false;
        }
        return true;
    }, []);

    const cleanPageContent = useCallback((pageContent: string): string => {
        // Remove html tags from the content
        pageContent = pageContent.replace(/<[^>]*>?/gm, '');

        // Replace " with '
        pageContent = pageContent.replace(/"/g, "'");

        // Remove multiple spaces
        pageContent = pageContent.replace(/\s+/g, ' ');

        return pageContent.trim();
    }, []);

    const translateMarkdown = useCallback(async (
        markdownText: string,
        sourceLanguage: string,
        targetLanguage: string,
        useStreaming: boolean
    ): Promise<string> => {
        // Split markdown into lines and preserve structure
        const lines = markdownText.split('\n');
        const translatedLines: string[] = [];
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            
            // Check for bullet point patterns (*, -, •)
            const bulletMatch = trimmedLine.match(/^([*\-•]\s+)(.+)$/);
            
            if (bulletMatch) {
                // Preserve bullet marker, translate only the text
                const marker = bulletMatch[1];
                const text = bulletMatch[2];
                const translatedText = await translate(text, sourceLanguage, targetLanguage);
                translatedLines.push(`${marker}${translatedText || text}`);
            } else if (trimmedLine) {
                // Translate regular text
                const translatedText = await translate(trimmedLine, sourceLanguage, targetLanguage);
                translatedLines.push(translatedText || trimmedLine);
            } else {
                // Preserve empty lines
                translatedLines.push('');
            }
        }
        
        return translatedLines.join('\n');
    }, [translate]);

    const getPageContentUsingGraphAPI = useCallback(async (): Promise<string> => {
        try {
            const pageId = (pageContext.listItem as any)?.uniqueId;
            const siteId = pageContext.site.id.toString();

            if (!pageId) {
                throw new Error('Unable to get page ID. Please ensure this web part is added to a SharePoint page.');
            }

            // Get the page content from the Microsoft Graph API using siteId and pageId
            const response = await invoke(async (client) => {
                return await client
                    .api(`/sites/${siteId}/pages/${pageId}/microsoft.graph.sitePage/webParts`)
                    .version('v1.0')
                    .filter("(isof('microsoft.graph.textWebPart'))")
                    .get();
            });

            const content = response?.value?.map((webPart: any) => webPart.innerHtml)?.join(' ') || '';

            if (!content || content.trim().length === 0) {
                throw new Error('No content found on the page to summarize.');
            }

            return content;
        } catch (err) {
            console.error('Error getting page content:', err);
            throw new Error(`Failed to get page content: ${err.message}`);
        }
    }, [pageContext, invoke]);

    const summarizePage = useCallback(async (forceRegenerate: boolean = false) => {
        if (!checkSupport()) {
            return;
        }

        abortRef.current = false;
        const startTime = performance.now();

        try {
            setIsLoading(true);
            setError('');
            setSummary('');
            setDownloadProgress(undefined);
            setStatusMessage(statusMessages.initializing);

            // Get page ID for caching
            const pageId = (pageContext.listItem as any)?.uniqueId;
            
            if (!pageId) {
                throw new Error('Unable to get page ID. Please ensure this web part is added to a SharePoint page.');
            }

            // Check cache first (unless forceRegenerate is true)
            if (!forceRegenerate) {
                setStatusMessage(statusMessages.checkingCache);
                const cachedSummary = await getCachedSummary(pageId, languageCode);
                if (cachedSummary) {
                    setSummary(cachedSummary);
                    setIsLoading(false);
                    setStatusMessage('');
                    return;
                }
            }

            // Pre-create translators if language is not supported (requires user gesture)
            if (!isLanguageSupported) {
                setStatusMessage(statusMessages.preparingTranslation);
                try {
                    await translate('test', languageCode, 'en');
                    await translate('test', 'en', languageCode);
                } catch (err) {
                    console.warn('Failed to pre-create translators:', err);
                }
            }

            // Check availability
            const availability = await (window as unknown as Window).Summarizer.availability();

            if (abortRef.current) {
                return;
            }

            if (availability === 'unavailable') {
                throw new Error('The Summarizer API is not available on this device. Please check the hardware requirements.');
            }

            const summarizerLanguage = isLanguageSupported ? languageCode : 'en';

            const summarizerOptions: any = {
                type: summarizerType,
                format: summarizerFormat,
                length: summarizerLength,
                sharedContext: effectiveSharedContext,
                expectedInputLanguages: [summarizerLanguage],
                outputLanguage: summarizerLanguage,
                expectedContextLanguages: [summarizerLanguage]
            };

            // Only add monitor if model needs to be downloaded
            if (availability === 'downloadable') {
                setStatusMessage(statusMessages.downloadingModel);
                summarizerOptions.monitor = (m: any) => {
                    m.addEventListener('downloadprogress', (e: any) => {
                        setDownloadProgress(e.loaded * 100);
                    });
                };
            } else {
                setStatusMessage(statusMessages.initializingModel);
            }

            const summarizer = await (window as unknown as Window).Summarizer.create(summarizerOptions);
            summarizerRef.current = summarizer;
            
            // Clear download progress and update status
            setDownloadProgress(undefined);
            setStatusMessage(statusMessages.fetchingContent);

            if (abortRef.current) {
                summarizer.destroy();
                summarizerRef.current = null;
                return;
            }

            // Get page content and clean it
            const pageContent = await getPageContentUsingGraphAPI();

            if (abortRef.current) {
                summarizer.destroy();
                summarizerRef.current = null;
                return;
            }

            const cleanedContent = cleanPageContent(pageContent);

            if (!cleanedContent || cleanedContent.length === 0) {
                throw new Error('No content found on the page to summarize.');
            }
            
            setStatusMessage(statusMessages.generatingSummary);

            if (abortRef.current) {
                summarizer.destroy();
                summarizerRef.current = null;
                return;
            }

            // Path 1: Supported languages (en, ja, es) - Direct summarization
            let finalSummary = '';
            if (isLanguageSupported) {
                if (useStreaming) {
                    const stream = summarizer.summarizeStreaming(cleanedContent, {
                        context: effectiveContext
                    });

                    const reader = stream.getReader();
                    let accumulatedText = '';

                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                        if (abortRef.current) {
                            await reader.cancel();
                            summarizer.destroy();
                            summarizerRef.current = null;
                            return;
                        }

                        const { done, value } = await reader.read();
                        if (done) break;

                        if (value) {
                            accumulatedText += value;
                            setSummary(accumulatedText);
                        }
                    }
                    finalSummary = accumulatedText;
                } else {
                    const result = await summarizer.summarize(cleanedContent, {
                        context: effectiveContext
                    });

                    if (abortRef.current) {
                        summarizer.destroy();
                        summarizerRef.current = null;
                        return;
                    }

                    setSummary(result);
                    finalSummary = result;
                }

            } else {
                // Path 2: Unsupported languages - Translate → Summarize → Translate

                // Detect language
                const detection = await detectLanguage(cleanedContent.substring(0, 1000));
                const detectedLanguage = detection && detection.confidence > 0.5 
                    ? detection.detectedLanguage 
                    : languageCode;

                // Translate content to English if needed
                const contentInEnglish = detectedLanguage !== 'en'
                    ? await translate(cleanedContent, detectedLanguage, 'en') || cleanedContent
                    : cleanedContent;
                if (abortRef.current) {
                    summarizer.destroy();
                    summarizerRef.current = null;
                    return;
                }

                // Summarize in English
                const englishSummary = await summarizer.summarize(contentInEnglish, {
                    context: 'This is SharePoint page content that needs to be summarized for business users.'
                });

                if (abortRef.current) {
                    summarizer.destroy();
                    summarizerRef.current = null;
                    return;
                }

                // Translate summary back to user's language
                if (englishSummary && languageCode !== 'en') {
                    if (useStreaming) {
                        // For streaming, translate line by line while preserving markdown
                        const lines = englishSummary.split('\n');
                        let currentOutput = '';
                        
                        for (const line of lines) {
                            const trimmedLine = line.trim();
                            const bulletMatch = trimmedLine.match(/^([*\-•]\s+)(.+)$/);
                            
                            if (bulletMatch) {
                                const marker = bulletMatch[1];
                                const text = bulletMatch[2];
                                await translateStreaming(text, 'en', languageCode, (chunk) => {
                                    const lineWithMarker = `${marker}${chunk}`;
                                    setSummary(currentOutput + lineWithMarker);
                                });
                                const translatedText = await translate(text, 'en', languageCode);
                                currentOutput += `${marker}${translatedText || text}\n`;
                            } else if (trimmedLine) {
                                await translateStreaming(trimmedLine, 'en', languageCode, (chunk) => {
                                    setSummary(currentOutput + chunk);
                                });
                                const translatedText = await translate(trimmedLine, 'en', languageCode);
                                currentOutput += `${translatedText || trimmedLine}\n`;
                            } else {
                                currentOutput += '\n';
                            }
                        }
                        finalSummary = currentOutput.trim();
                        setSummary(finalSummary);
                    } else {
                        const translatedSummary = await translateMarkdown(englishSummary, 'en', languageCode, false);
                        finalSummary = translatedSummary || englishSummary;
                        setSummary(finalSummary);
                    }
                } else {
                    finalSummary = englishSummary;
                    setSummary(englishSummary);
                }
            }

            // Save or update summary in cache
            if (finalSummary && pageId) {
                try {
                    if (forceRegenerate) {
                        await updateSummary(pageId, languageCode, finalSummary);
                    } else {
                        await saveSummary(pageId, languageCode, finalSummary);
                    }
                } catch (cacheErr) {
                    console.warn('Failed to cache summary:', cacheErr);
                    // Continue without caching - not critical
                }
            }

            // Clean up
            summarizer.destroy();
            summarizerRef.current = null;
            
            const timeTaken = ((performance.now() - startTime) / 1000).toFixed(2);
            console.log(`Summary completed in ${timeTaken}s`);

        } catch (err) {
            // Don't show error if user aborted
            if (!abortRef.current) {
                console.error('Error summarizing page:', err);
                setError(err.message || 'An error occurred while summarizing the page.');
            }
        } finally {
            setIsLoading(false);
            setDownloadProgress(undefined);
            setStatusMessage('');
        }
    }, [checkSupport, pageContext, languageCode, getCachedSummary, isLanguageSupported, translate, getPageContentUsingGraphAPI, cleanPageContent, useStreaming, summarizerType, summarizerFormat, summarizerLength, effectiveSharedContext, effectiveContext, detectLanguage, translateStreaming, translateMarkdown, saveSummary, updateSummary]);

    return {
        isLoading,
        summary,
        error,
        isSupported,
        downloadProgress,
        statusMessage,
        summarizePage,
        stopSummarizing,
        clearSummary
    };
};
