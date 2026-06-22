/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useSPFxPnP } from '@apvee/spfx-react-toolkit';
import '@pnp/sp/lists';
import '@pnp/sp/items';

interface SummaryCacheItem {
    Id: number;
    builtinaiPageId: string;
    builtinaiLanguage: string;
    builtinaiSummary: string;
}

export interface UseSummaryCacheReturn {
    /**
     * Retrieves cached summary for a page and language
     * @param pageId The unique identifier of the SharePoint page
     * @param language The language code (e.g., 'en', 'it', 'fr')
     * @returns The cached summary or undefined if not found
     */
    getCachedSummary: (pageId: string, language: string) => Promise<string | undefined>;
    
    /**
     * Saves a new summary to the cache
     * @param pageId The unique identifier of the SharePoint page
     * @param language The language code (e.g., 'en', 'it', 'fr')
     * @param summary The summary text to cache
     */
    saveSummary: (pageId: string, language: string, summary: string) => Promise<void>;
    
    /**
     * Updates an existing summary or creates a new one if not found
     * @param pageId The unique identifier of the SharePoint page
     * @param language The language code (e.g., 'en', 'it', 'fr')
     * @param summary The summary text to cache
     */
    updateSummary: (pageId: string, language: string, summary: string) => Promise<void>;
}

const LIST_TITLE = 'Page Summary Cache';

export const useSummaryCache = (): UseSummaryCacheReturn => {
    const { invoke } = useSPFxPnP();

    const getCachedSummary = useCallback(async (pageId: string, language: string): Promise<string | undefined> => {
        try {
            const items = await invoke(sp => 
                sp.web.lists.getByTitle(LIST_TITLE).items
                    .filter(`builtinaiPageId eq '${pageId}' and builtinaiLanguage eq '${language}'`)
                    .select('Id', 'builtinaiSummary')
                    .top(1)()
            );

            if (items && items.length > 0) {
                return (items[0] as SummaryCacheItem).builtinaiSummary;
            }

            return undefined;
        } catch (error) {
            console.error('Error getting cached summary:', error);
            return undefined;
        }
    }, [invoke]);

    const saveSummary = useCallback(async (pageId: string, language: string, summary: string): Promise<void> => {
        try {
            await invoke(sp => 
                sp.web.lists.getByTitle(LIST_TITLE).items.add({
                    Title: `${pageId}_${language}`,
                    builtinaiPageId: pageId,
                    builtinaiLanguage: language,
                    builtinaiSummary: summary
                })
            );
        } catch (error) {
            console.error('Error saving summary to cache:', error);
            throw error;
        }
    }, [invoke]);

    const updateSummary = useCallback(async (pageId: string, language: string, summary: string): Promise<void> => {
        try {
            // Find the existing item
            const items = await invoke(sp => 
                sp.web.lists.getByTitle(LIST_TITLE).items
                    .filter(`builtinaiPageId eq '${pageId}' and builtinaiLanguage eq '${language}'`)
                    .select('Id')
                    .top(1)()
            );

            if (items && items.length > 0) {
                const itemId = (items[0] as SummaryCacheItem).Id;
                await invoke(sp => 
                    sp.web.lists.getByTitle(LIST_TITLE).items.getById(itemId).update({
                        builtinaiSummary: summary
                    })
                );
            } else {
                // Item doesn't exist, create it
                await saveSummary(pageId, language, summary);
            }
        } catch (error) {
            console.error('Error updating summary in cache:', error);
            throw error;
        }
    }, [invoke, saveSummary]);

    return {
        getCachedSummary,
        saveSummary,
        updateSummary
    };
};
