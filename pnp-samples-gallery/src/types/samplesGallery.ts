export interface SamplesGalleryProps {
    src: string; // JSON URL
    initialSearch?: string;
    className?: string;
    iconBasePath?: string;
    techIconBasePath?: string;
    baseUrl?: string;
    giscusSettings?: {
        repo?: string;
        repoId?: string;
        category?: string;
        categoryId?: string;
    };
    reactionsSupported?: boolean;
    config?: Record<string, unknown>;
}

export type FacetState = {
    q: string;
    spfx: string | null;
    tech: string | null;
    category: string | null;
};
