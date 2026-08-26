/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef } from 'react';

interface DetectionResult {
    detectedLanguage: string;
    confidence: number;
}

interface UseLanguageDetectorReturn {
    isSupported: boolean;
    detectLanguage: (text: string) => Promise<DetectionResult | undefined>;
    error: string;
}

export const useLanguageDetector = (): UseLanguageDetectorReturn => {
    const [isSupported, setIsSupported] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const detectorRef = useRef<any>(null);

    const checkSupport = useCallback((): boolean => {
        if (!('LanguageDetector' in window)) {
            setIsSupported(false);
            setError('The Language Detector API is not supported in your browser. Please use Chrome 138 or later.');
            return false;
        }
        return true;
    }, []);

    const detectLanguage = useCallback(async (text: string): Promise<DetectionResult | undefined> => {
        if (!checkSupport()) {
            return undefined;
        }

        try {
            setError('');

            // Check availability
            const availability = await (window as any).LanguageDetector.availability();

            if (availability === 'unavailable') {
                throw new Error('The Language Detector API is not available on this device.');
            }

            // Create detector if not already created
            if (!detectorRef.current) {
                // eslint-disable-next-line require-atomic-updates
                detectorRef.current = await (window as any).LanguageDetector.create();
            }

            // Detect language
            const results = await detectorRef.current.detect(text);

            if (results && results.length > 0) {
                // Return the top result (highest confidence)
                return {
                    detectedLanguage: results[0].detectedLanguage,
                    confidence: results[0].confidence
                };
            }

            return undefined;
        } catch (err) {
            console.error('Error detecting language:', err);
            setError(err.message || 'An error occurred while detecting language.');
            return undefined;
        }
    }, [checkSupport]);

    return {
        isSupported,
        detectLanguage,
        error
    };
};
