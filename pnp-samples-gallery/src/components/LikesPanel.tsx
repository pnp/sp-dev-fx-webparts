import Giscus from "@giscus/react";

export function LikesPanel({ sampleName }: { sampleName: string }) {
    const term = `sample:${sampleName}`;
    const themeUrl = "https://pnp.github.io/sp-dev-fx-webparts/giscus/likes.css?v=1";


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
            theme={themeUrl}
            lang="en"
        />
        </div>
    );
}
