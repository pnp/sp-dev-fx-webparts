import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export function LikesPanel({ sampleName }: { sampleName: string }) {
    const term = `sample:${sampleName}`;
    const theme = 'https://pnp.github.io/sp-dev-fx-webparts/giscus/likes.css';
    const [reloadNonce, setReloadNonce] = useState(0);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            console.log("Giscus message received:", event.data);
            const data = event.data as any;
            const giscusData = data?.giscus;

            // When a discussion is created/found, it will start emitting discussion metadata.
            if (giscusData?.discussion?.id) {
                // One-time "kick" to force reload so reactions reflect immediately.
                setReloadNonce((n) => (n === 0 ? 1 : n));
            }
        };

        window.addEventListener("message", onMessage);
        return () => {
            window.removeEventListener("message", onMessage);
        };
    }, []);

    return (

        <Giscus
            key={`${term}:${reloadNonce}`}
            repo="pnp/sp-dev-fx-webparts"
            repoId="MDEwOlJlcG9zaXRvcnk2Njk2MjE3OQ=="
            category="Likes"
            categoryId="DIC_kwDOA_3DA84C0m26"
            mapping="specific"
            term={`sample:${sampleName}`} 
            reactionsEnabled="1"
            emitMetadata="1"
            inputPosition="top"
            theme={theme}
            loading="eager"
            lang="en"
        />

    );
}


