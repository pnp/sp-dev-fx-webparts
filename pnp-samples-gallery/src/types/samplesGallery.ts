export interface SamplesGalleryProps {
    src: string; // JSON URL
    initialSearch?: string;
    className?: string;
    baseUrl?: string;
    admin?: boolean;
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
