import Giscus from "@giscus/react";
import { useEffect, useState } from "react";
import { getPendingLike, setPendingLike, removePendingLike } from "../types/pendingLikes";
import { useRef } from "react";

type ReactionInfo = { count: number; viewerHasReacted: boolean };

type Discussion = {
    id?: string;
    url?: string;
    locked?: boolean;
    reactions?: {
        THUMBS_UP?: ReactionInfo;
        THUMBS_DOWN?: ReactionInfo;
        LAUGH?: ReactionInfo;
        HOORAY?: ReactionInfo;
        CONFUSED?: ReactionInfo;
        HEART?: ReactionInfo;
        ROCKET?: ReactionInfo;
        EYES?: ReactionInfo;
    };
    repository?: { nameWithOwner?: string };
    reactionCount?: number;
    totalCommentCount?: number;
    totalReplyCount?: number;
};

type GiscusReactionPayload = {
    discussion?: Discussion;
    viewer?: { avatarUrl?: string; login?: string; url?: string };
};

export function LikesPanel({ sampleName, baseUrl, giscusSettings }: { sampleName: string; baseUrl?: string; giscusSettings?: { repo?: string; repoId?: string; category?: string; categoryId?: string; mapping?: string; reactionsEnabled?: string; emitMetadata?: string; inputPosition?: string; lang?: string } }) {
    const term = `sample:${sampleName}`;
    // If running from a local baseUrl (localhost, 127.0.0.1, or file:), prefer the public hosted theme
    const publicTheme = 'https://pnp.github.io/sp-dev-fx-webparts/giscus/likes.css';
    let theme = publicTheme;
    if (baseUrl) {
        try {
            const u = new URL(baseUrl, window.location.href);
            const host = (u.hostname || '').toLowerCase();
            if (host && !/^(localhost|127\.0\.0\.1)$/.test(host) ) {
                theme = `${baseUrl.replace(/\/$/, '')}/giscus/likes.css`;
            } else {
                theme = publicTheme;
            }
        } catch {
            // if baseUrl is not a valid URL, just fallback to public
            theme = publicTheme;
        }
    }
    const [reloadNonce, setReloadNonce] = useState(0);

    // Keep base event info in a ref so it persists across renders without re-triggering effects
    const baseRef = useRef<{ discussionId?: string; reactionsSnapshot?: any; viewerReactedCount?: number } | null>(null);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            const data = event.data as any;
            let giscusData = null as GiscusReactionPayload | null;
            if (data && data.giscus) {
                giscusData = data.giscus;
            }

            if (!giscusData) return;
            console.log("Giscus message received:", event.data);

            // When a discussion is created/found, it will start emitting discussion metadata.
            if (giscusData && giscusData.discussion && giscusData.discussion.id) {
                // One-time "kick" to force reload so reactions reflect immediately.
                setReloadNonce((n) => (n === 0 ? 1 : n));

                // If we have not recorded a base snapshot for this discussion yet,
                // capture the first proper giscus node as the base. The base snapshot
                // records how many reaction entries include viewerHasReacted=true.
                try {
                    const id = String(giscusData.discussion.id);
                    if (!baseRef.current || baseRef.current.discussionId !== id) {
                        // compute viewer-reacted count from possible shapes

                        // discussion.viewerHasReacted boolean indicates whether the viewer
                        // has reacted to this discussion overall. If true, count as 1.
                        

                        baseRef.current = { discussionId: id, reactionsSnapshot: giscusData.discussion.reactions, viewerReactedCount: 0 };
                        console.debug("LikesPanel: captured base event", baseRef.current, { sampleName });

                        // If viewerReactedCount > 0 then ensure a pending like exists with no date
                        
                    }
                    // don't fall through to further processing for this discovery event
                    return;
                } catch {
                    // ignore
                }
            }

            // For subsequent giscus events, compare to the base snapshot and update pending likes
            try {
                if (!baseRef.current || !baseRef.current.discussionId) return;
                // compute current reacted count using similar shape-handling
                let currentReactedCount = 0;
                const computeReacted = (payload: any) => {
                    if (!payload) return 0;
                    if (typeof payload.viewerHasReacted === 'boolean') return payload.viewerHasReacted ? 1 : 0;
                    if (payload.reactions) {
                        const r = payload.reactions;
                        if (Array.isArray(r)) return r.filter((x: any) => x && x.viewerHasReacted).length;
                        if (typeof r === 'object') return Object.keys(r).reduce((acc, k) => acc + ((r[k] && r[k].viewerHasReacted) ? 1 : 0), 0);
                    }
                    if (payload.discussion && payload.discussion.reactions) {
                        const r = payload.discussion.reactions;
                        if (Array.isArray(r)) return r.filter((x: any) => x && x.viewerHasReacted).length;
                        if (typeof r === 'object') return Object.keys(r).reduce((acc, k) => acc + ((r[k] && r[k].viewerHasReacted) ? 1 : 0), 0);
                    }
                    return 0;
                };

                currentReactedCount = computeReacted(giscusData) || computeReacted(giscusData.discussion) || 0;

                const baseCount = baseRef.current.viewerReactedCount ?? 0;
                const key = sampleName;
                const existing = getPendingLike(key);

                if (currentReactedCount > baseCount) {
                    // viewer reacted more times than base -> create/promo pending with timestamp
                    if (!existing) {
                        setPendingLike(key, undefined, true);
                        console.debug("LikesPanel: created timestamped pending like (reaction increased)", { key });
                    } else if (existing && existing.likedAt === null) {
                        // promote
                        setPendingLike(key, undefined, true);
                        console.debug("LikesPanel: promoted base pending like to timestamped (reaction increased)", { key });
                    }
                } else if (currentReactedCount < baseCount) {
                    // viewer reacted less than base -> remove pending like
                    if (existing) {
                        removePendingLike(key);
                        console.debug("LikesPanel: removed pending like (reaction decreased)", { key });
                    }
                } else {
                    // no change relative to base; do nothing
                }
            } catch {
                // ignore
            }
        };

        window.addEventListener("message", onMessage);
        return () => {
            window.removeEventListener("message", onMessage);
        };
    }, [sampleName]);

    const org: string = "pnp";
    const repo: string = giscusSettings?.repo ?? "pnp/sp-dev-fx-webparts";
    return (

        <Giscus
            key={`${term}:${reloadNonce}`}
            repo={`${org}/${repo}`}
            repoId={giscusSettings?.repoId ?? "MDEwOlJlcG9zaXRvcnk2Njk2MjE3OQ=="}
            category={giscusSettings?.category ?? "Likes"}
            categoryId={giscusSettings?.categoryId ?? "DIC_kwDOA_3DA84C0m26"}
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


