import Giscus from "@giscus/react";
import { useEffect, useState } from "react";
import { setPendingLike } from "../../types/pendingLikes";
import { readOverrideFor, upsertOverride } from '../../utils/likesOverrides';
import { useRef } from "react";
import styles from './LikesPanel.module.css';


import { type GiscusReactionPayload } from './types/GiscusReactionPayload';
import { type ReactionInfo } from './types/ReactionInfo';

type ReactionsPayload = ReactionInfo[] | Record<string, ReactionInfo> | undefined;

// use shared helpers in src/utils/likesOverrides

export function LikesPanel({ sampleName, baseUrl, giscusSettings }: { sampleName: string; baseUrl?: string; giscusSettings?: { repo?: string; repoId?: string; category?: string; categoryId?: string; mapping?: string; reactionsEnabled?: string; emitMetadata?: string; inputPosition?: string; lang?: string } }) {
    const term = `sample:${sampleName}`;
    const publicTheme = 'https://pnp.github.io/sp-dev-fx-webparts/giscus/likes.css';
    let theme = publicTheme;
    if (baseUrl) {
        try {
            const u = new URL(baseUrl, window.location.href);
            const host = (u.hostname || '').toLowerCase();
            if (host && !/^(localhost|127\.0\.0\.1)$/.test(host)) {
                theme = `${baseUrl.replace(/\/$/, '')}/giscus/likes.css`;
            } else {
                theme = publicTheme;
            }
        } catch {
            theme = publicTheme;
        }
    }
    const [reloadNonce, setReloadNonce] = useState(0);
    const baseRef = useRef<{ discussionId?: string; reactionsSnapshot?: ReactionsPayload | null; viewerReactedCount?: number } | null>(null);

    useEffect(() => {
        const onMessage = async (event: MessageEvent) => {

            const raw = event.data;
            const data = (raw && typeof raw === 'object') ? (raw as Record<string, unknown>) : null;
            // console.debug('[LikesPanel] message event received', { origin: event.origin, data });
            let giscusData: GiscusReactionPayload | null = null;
            if (data && 'giscus' in data) {
                const gd = (data as Record<string, unknown>)['giscus'];
                if (gd && typeof gd === 'object') {
                    giscusData = gd as GiscusReactionPayload;
                }
            }

            if (!giscusData) {
                return;
            }

            // Capture viewer login (first occurrence) and sync a hashed ID with localStorage
            try {
                const viewerLogin = giscusData.viewer && giscusData.viewer.login ? String(giscusData.viewer.login) : undefined;
                if (viewerLogin) {
                    try {
                        const storage = await import('../../utils/githubIdStorage');
                        // Compute the new hash and compare to stored hash first to avoid unnecessary writes/events
                        const existing = storage.getStoredHash ? storage.getStoredHash() : null;
                        const newHash = await storage.computeHashForUsername ? await storage.computeHashForUsername(viewerLogin) : null;
                        if (!newHash) {
                            // couldn't compute hash -- skip
                           
                        } else if (!existing || existing !== newHash) {
                            const res = await storage.storeHashForUsername(viewerLogin);
                            if (res) {
                                // console.debug('[LikesPanel] viewer.login hashed and stored', { oldId: res.oldId, newId: res.newId });
                                try {
                                    const storage2 = await import('../../utils/githubIdStorage');
                                    try { console.debug('[LikesPanel] session alias after store', { alias: storage2.getSessionAlias() }); } catch { }
                                } catch { /* ignore */ }
                                try {
                                    const ev = new CustomEvent('pnp:githubLoginChanged', { detail: { oldId: res.oldId, newId: res.newId } });
                                    window.dispatchEvent(ev);
                                    // console.info('[LikesPanel] dispatched pnp:githubLoginChanged (hashed)', { oldId: res.oldId, newId: res.newId });
                                } catch (err) {
                                    console.warn('[LikesPanel] failed to dispatch pnp:githubLoginChanged (hashed)', err);
                                }
                            }
                        } else {
                            // console.debug('[LikesPanel] stored viewer hash matches computed hash — no action');
                        }
                    } catch (err) {
                        console.warn('[LikesPanel] error hashing/storing login', err);
                    }
                } else {
                    // console.debug('[LikesPanel] no viewer.login present in payload');
                }
            } catch (err) {
                console.warn('[LikesPanel] error handling viewer login', err);
            }

            // helper to compute how many reaction entries indicate the viewer has reacted
            const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

            const getReactionsFrom = (payload: unknown): ReactionsPayload => {
                if (!isObject(payload)) return undefined;
                // payload.discussion?.reactions
                if ('discussion' in payload && isObject((payload as Record<string, unknown>)['discussion'])) {
                    const disc = (payload as Record<string, unknown>)['discussion'] as Record<string, unknown>;
                    const r = disc['reactions'];
                    if (Array.isArray(r)) return r as ReactionInfo[];
                    if (isObject(r)) return r as Record<string, ReactionInfo>;
                }
                // top-level reactions
                if ('reactions' in payload) {
                    const r = (payload as Record<string, unknown>)['reactions'];
                    if (Array.isArray(r)) return r as ReactionInfo[];
                    if (isObject(r)) return r as Record<string, ReactionInfo>;
                }
                return undefined;
            };

            const computeReactedBase = (payload: unknown): number => {
                if (!payload) return 0;
                if (isObject(payload) && 'viewerHasReacted' in payload && typeof (payload as Record<string, unknown>).viewerHasReacted === 'boolean') {
                    return ((payload as Record<string, unknown>).viewerHasReacted ? 1 : 0);
                }

                const reactions = getReactionsFrom(payload);
                if (!reactions) return 0;
                if (Array.isArray(reactions)) {
                    return reactions.filter((x) => x && Boolean(x.viewerHasReacted)).length;
                }
                return Object.keys(reactions).reduce((acc, k) => acc + (reactions[k] && reactions[k].viewerHasReacted ? 1 : 0), 0);
            };

            // Capture baseline on first full giscus event (even if discussion.id is absent)
            if (giscusData && (!baseRef.current || !baseRef.current.discussionId)) {
                try {
                    const baseCountAuto = computeReactedBase(giscusData) || computeReactedBase(giscusData.discussion) || 0;
                    const id = giscusData.discussion && giscusData.discussion.id ? String(giscusData.discussion.id) : undefined;
                    const reactionsSnapshot = getReactionsFrom(giscusData) ?? null;
                    baseRef.current = { discussionId: id, reactionsSnapshot, viewerReactedCount: baseCountAuto };
                    // console.debug('📌[LikesPanel] captured baseline event (auto)', baseRef.current, { sampleName });

                    // Persist authoritative giscus totals/viewer state on first full event.
                    try {
                        const key = sampleName;
                        // Determine reported total (sum of reaction counts) if available
                        let reportedTotal: number | null = null;
                        const reactions = getReactionsFrom(giscusData);
                        if (reactions) {
                            if (Array.isArray(reactions)) reportedTotal = reactions.length;
                            else reportedTotal = Object.keys(reactions).reduce((acc, k) => acc + (reactions[k]?.count ?? 0), 0);
                        }

                        if (reportedTotal !== null) {
                            upsertOverride(key, { count: reportedTotal, updatedAt: new Date().toISOString() });
                            // console.debug('[LikesPanel] wrote initial override count from giscus', { key, reportedTotal });
                        }

                        // If viewerHasReacted is available at top-level or per-reaction, compute boolean
                        const viewerReacted = computeReactedBase(giscusData) > 0 || computeReactedBase(giscusData.discussion) > 0;
                        upsertOverride(key, { viewerReacted, updatedAt: new Date().toISOString() });
                        // console.debug('[LikesPanel] wrote initial viewer reacted override from giscus', { key, viewerReacted });
                    } catch (err) {
                        console.warn('[LikesPanel] failed persisting initial giscus overrides', err);
                    }
                } catch (err) {
                    console.warn('[LikesPanel] failed to capture baseline (auto)', err);
                }
            }

            if (giscusData && giscusData.discussion && giscusData.discussion.id) {
                // One-time "kick" to force reload so reactions reflect immediately.
                setReloadNonce((n) => (n === 0 ? 1 : n));
                try {
                    const id = String(giscusData.discussion.id);
                    if (!baseRef.current || baseRef.current.discussionId !== id) {
                        // If we didn't already capture baseline above, capture with id-specific snapshot
                        const baseCount = computeReactedBase(giscusData) || computeReactedBase(giscusData.discussion) || 0;
                        const reactionsSnapshot = (giscusData.discussion?.reactions ?? null) as ReactionsPayload | null;
                        baseRef.current = { discussionId: id, reactionsSnapshot, viewerReactedCount: baseCount };
                        // console.debug("LikesPanel: captured base event (with id)", baseRef.current, { sampleName });

                        // Persist updated totals/viewer state if giscus differs from local overrides
                        try {
                            const key = sampleName;
                            let reportedTotal: number | null = null;
                            const reactions = getReactionsFrom(giscusData);
                            if (reactions) {
                                if (Array.isArray(reactions)) reportedTotal = reactions.length;
                                else reportedTotal = Object.keys(reactions).reduce((acc, k) => acc + (reactions[k]?.count ?? 0), 0);
                            }

                            if (reportedTotal !== null) {
                                upsertOverride(key, { count: reportedTotal, updatedAt: new Date().toISOString() });
                                // console.debug('[LikesPanel] wrote id-specific override count from giscus', { key, reportedTotal });
                            }

                            const viewerReacted = computeReactedBase(giscusData) > 0 || computeReactedBase(giscusData.discussion) > 0;
                            upsertOverride(key, { viewerReacted, updatedAt: new Date().toISOString() });
                            // console.debug('[LikesPanel] wrote id-specific viewer override from giscus', { key, viewerReacted });
                        } catch (err) {
                            console.warn('[LikesPanel] failed persisting id-specific giscus overrides', err);
                        }
                    }
                    // continue processing below so updates to reactions (likes/unlikes)
                    // are handled even when discussion id matches the baseline.
                } catch {
                    // ignore
                }
            }

            try {
                if (!baseRef.current || !baseRef.current.discussionId) return;
                let currentReactedCount = 0;
                const computeReacted = (payload: unknown): number => {
                    return computeReactedBase(payload);
                };

                currentReactedCount = computeReacted(giscusData) || computeReacted(giscusData.discussion) || 0;
                const baseCount = baseRef.current.viewerReactedCount ?? 0;
                const key = sampleName;
                // Determine total reactions reported in payload (if available)
                let reportedTotal: number | null = null;
                try {
                    const reactions = getReactionsFrom(giscusData);
                    if (reactions) {
                        if (Array.isArray(reactions)) reportedTotal = reactions.length;
                        else reportedTotal = Object.keys(reactions).reduce((acc, k) => acc + (reactions[k]?.count ?? 0), 0);
                    }
                } catch {
                    reportedTotal = null;
                }
                

                // If giscus reports a viewer-reacted delta vs baseline, set pending like/unlike as before
                if (currentReactedCount > baseCount) {
                    setPendingLike(key, undefined, true);
                } else if (currentReactedCount < baseCount) {
                    setPendingLike(key, undefined, false);
                }

                // If giscus provided an overall reported total and it differs from local override, persist override with timestamp
                try {
                    if (reportedTotal !== null) {
                        const local = readOverrideFor(key);
                        const now = new Date().toISOString();
                        if (!local || local.count !== reportedTotal) {
                            upsertOverride(key, { count: reportedTotal, updatedAt: now });
                            // console.debug('[LikesPanel] updated local override count from giscus', { key, reportedTotal });
                        }
                    }
                } catch {
                    // ignore storage errors
                }

                // Persist viewer reacted flag if it differs from stored value
                try {
                    const viewerReacted = currentReactedCount > 0;
                    const localViewer = readOverrideFor(key);
                    const now = new Date().toISOString();
                    if (!localViewer || localViewer.viewerReacted !== viewerReacted) {
                        upsertOverride(key, { viewerReacted, updatedAt: now });
                        // console.debug('[LikesPanel] updated local viewer reacted from giscus', { key, viewerReacted });
                    }
                } catch {
                    // ignore
                }
            } catch {
                // ignore
            }
        };

        window.addEventListener("message", onMessage);
        // subscribe to pendingLikesChanged to update debug view
        const onPending = () => {
            // console.debug('[LikesPanel] pendingLikesChanged event received', { sampleName, pending });
        }
            
        window.addEventListener('pendingLikesChanged', onPending as EventListener);
        // populate initial
        onPending();
        return () => {
            window.removeEventListener("message", onMessage);
            window.removeEventListener('pendingLikesChanged', onPending as EventListener);
        };
    }, [sampleName]);

    // Ensure org and repoName are separated. giscusSettings.repo may be either
    // 'owner/repo' or just 'repo'. We must guarantee `repoName` never includes
    // the org and pass the combined value to the giscus component.
    const DEFAULT_OWNER = 'pnp';
    const rawRepo = (giscusSettings?.repo ?? 'sp-dev-fx-webparts') as string;
    let owner = DEFAULT_OWNER;
    let repoName = 'sp-dev-fx-webparts';
    try {
        if (rawRepo && rawRepo.includes('/')) {
            const parts = rawRepo.split('/').filter(Boolean);
            if (parts.length >= 2) {
                owner = parts[0];
                repoName = parts.slice(1).join('/');
            } else {
                repoName = rawRepo;
            }
        } else if (rawRepo) {
            repoName = rawRepo;
        }
    } catch {
        owner = DEFAULT_OWNER;
        repoName = 'sp-dev-fx-webparts';
    }
    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <Giscus
                    key={`${term}:${reloadNonce}`}
                    repo={`${owner}/${repoName}`}
                    repoId={giscusSettings?.repoId ?? ""}
                    category={giscusSettings?.category ?? "Likes"}
                    categoryId={giscusSettings?.categoryId ?? ""}
                    mapping="specific"
                    term={`sample:${sampleName}`}
                    reactionsEnabled="1"
                    emitMetadata="1"
                    inputPosition="top"
                    theme={theme}
                    loading="eager"
                    lang="en"
                />
            </div>
        </div>
    );
}

export default LikesPanel;
