/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef } from 'react';

interface UseTranslatorReturn {
    isSupported: boolean;
    translate: (text: string, sourceLanguage: string, targetLanguage: string) => Promise<string | undefined>;
    translateStreaming: (text: string, sourceLanguage: string, targetLanguage: string, onChunk?: (chunk: string) => void) => Promise<string | undefined>;
    error: string;
}

export const useTranslator = (): UseTranslatorReturn => {
    const [isSupported, setIsSupported] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const translatorsRef = useRef<Map<string, any>>(new Map());

    const checkSupport = useCallback((): boolean => {
        if (!('Translator' in window)) {
            setIsSupported(false);
            setError('The Translator API is not supported in your browser. Please use Chrome 138 or later.');
            return false;
        }
        return true;
    }, []);

    const getTranslatorKey = useCallback((sourceLanguage: string, targetLanguage: string): string => {
        return `${sourceLanguage}-${targetLanguage}`;
    }, []);

    const getOrCreateTranslator = useCallback(async (sourceLanguage: string, targetLanguage: string): Promise<any> => {
        const key = getTranslatorKey(sourceLanguage, targetLanguage);

        // Return existing translator if available
        if (translatorsRef.current.has(key)) {
            return translatorsRef.current.get(key);
        }

        // Check availability
        const availability = await (window as any).Translator.availability({
            sourceLanguage,
            targetLanguage
        });

        if (availability === 'unavailable') {
            throw new Error(`Translation from ${sourceLanguage} to ${targetLanguage} is not available.`);
        }

        // Create new translator
        const translator = await (window as any).Translator.create({
            sourceLanguage,
            targetLanguage
        });

        translatorsRef.current.set(key, translator);
        return translator;
    }, [getTranslatorKey]);

    const translate = useCallback(async (
        text: string,
        sourceLanguage: string,
        targetLanguage: string
    ): Promise<string | undefined> => {
        if (!checkSupport()) {
            return undefined;
        }

        try {
            setError('');
            const translator = await getOrCreateTranslator(sourceLanguage, targetLanguage);
            const result = await translator.translate(text);
            return result;
        } catch (err) {
            console.error('Error translating text:', err);
            setError(err.message || 'An error occurred while translating.');
            return undefined;
        }
    }, [checkSupport, getOrCreateTranslator]);

    const translateStreaming = useCallback(async (
        text: string,
        sourceLanguage: string,
        targetLanguage: string,
        onChunk?: (chunk: string) => void
    ): Promise<string | undefined> => {
        if (!checkSupport()) {
            return undefined;
        }

        try {
            setError('');
            const translator = await getOrCreateTranslator(sourceLanguage, targetLanguage);
            const stream = translator.translateStreaming(text);
            
            let accumulatedText = '';
            for await (const chunk of stream) {
                accumulatedText += chunk;
                if (onChunk) {
                    onChunk(accumulatedText);
                }
            }

            return accumulatedText;
        } catch (err) {
            console.error('Error translating text (streaming):', err);
            setError(err.message || 'An error occurred while translating.');
            return undefined;
        }
    }, [checkSupport, getOrCreateTranslator]);

    return {
        isSupported,
        translate,
        translateStreaming,
        error
    };
};
