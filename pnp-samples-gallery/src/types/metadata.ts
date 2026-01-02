import type { PnPSample, SampleMetadataKey, SampleThumbnail } from "./models";

export function metaValues(sample: PnPSample, key: SampleMetadataKey): string[] {
    return (sample.metadata ?? [])
        .filter(m => m.key === key)
        .map(m => m.value)
        .filter(Boolean);
}

export function metaFirst(sample: PnPSample, key: SampleMetadataKey): string | undefined {
    return metaValues(sample, key)[0];
}

export function bestThumb(sample: PnPSample): SampleThumbnail | undefined {
    const thumbs = (sample.thumbnails ?? []);
    if (!thumbs.length) return undefined;

    // Return the first thumbnail in the filtered array
    return thumbs[0];
}

export function getCategories(sample: PnPSample): string[] {
    const cats = (sample.categories ?? []).filter(Boolean);
    // Your rule: empty => Web Part
    if (cats.length > 0) return cats;
    return ["SPFX-WEB-PART"];
}
