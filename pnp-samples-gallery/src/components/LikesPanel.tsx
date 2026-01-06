import Giscus from "@giscus/react";

export function LikesPanel({ sampleName }: { sampleName: string }) {
    const term = `sample:${sampleName}`;

    const css = `
:root {
  /* Core colors */
  --gcs-bg: #ffffff; /* page / widget background */
  --gcs-text: #24292f; /* primary text */
  --gcs-muted: #6a737d; /* secondary text */
  --gcs-border: #e1e4e8; /* borders and separators */
  --gcs-accent: #0969da; /* primary accent (links, actions) */
  --gcs-accent-strong: #0550ae; /* stronger accent */
  --font-family-sans:Parker, "Segoe UI", "Segoe Sans", sans-serif;
  --color-canvas-subtle: #f6f8fa;
  --color-border-default: rgb(208, 215, 222);
  --color-canvas-default: #fff;
    --color-canvas-overlay: #fff;
    --color-canvas-inset: #f6f8fa;
    --color-canvas-subtle: #f6f8fa;
    --color-btn-text: #24292f;
    --color-btn-bg: #f6f8fa;
    --color-btn-border: #1f232826;
    --color-btn-shadow: 0 1px 0 #1f23280a;
    --color-btn-inset-shadow: inset 0 1px 0 #ffffff40;
    --color-btn-hover-bg: #f3f4f6;
    --color-btn-hover-border: #1f232826;
    --color-btn-active-bg: #ebecf0;
    --color-btn-active-border: #1f232826;
    --color-btn-selected-bg: #eeeff2;
    --color-btn-primary-text: #fff;
    --color-btn-primary-bg: #1f883d;
    --color-btn-primary-border: #1f232826;
    --color-btn-primary-shadow: 0 1px 0 #1f23281a;
    --color-btn-primary-inset-shadow: inset 0 1px 0 #ffffff08;
    --color-btn-primary-hover-bg: #1a7f37;
    --color-btn-primary-hover-border: #1f232826;
    --color-btn-primary-selected-bg: #187733;
    --color-btn-primary-selected-shadow: inset 0 1px 0 #002d1133;
    --color-btn-primary-disabled-text: #fffc;
    --color-btn-primary-disabled-bg: #94d3a2;
    --color-btn-primary-disabled-border: #1f232826;
    --color-action-list-item-default-hover-bg: #d0d7de52;
}

.gsc-loading-image {
    background-image: url(https://pnp.github.io/sp-dev-fx-webparts/parker-spfx.svg);
}

.gsc-reactions {
    align-self: flex-start;
}
`;
    const theme = 'data:text/css;charset=utf-8,' + encodeURIComponent(css);

    return (
        <div className="pnp-sample-panel__likes">
        <Giscus
            key={term}
            repo="pnp/sp-dev-fx-webparts"
            repoId="MDEwOlJlcG9zaXRvcnk2Njk2MjE3OQ=="
            category="Likes"
            categoryId="DIC_kwDOA_3DA84C0m26"
            mapping="specific"
            term={`sample:${sampleName}`} 
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={theme}
            lang="en"
        />
        </div>
    );
}
