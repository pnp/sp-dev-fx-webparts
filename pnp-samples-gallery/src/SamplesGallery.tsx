import styles from './SamplesGallery.module.css';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from "react-dom";
import Muuri from "muuri";
import type { PnPSample, TechKey } from "./types/index";
import { metaFirst, getCategories, spfxToBucket, spfxBucketSortKeyDesc } from "./types/index";

import { categoryToIcon, prettyCategory } from "./types/index";
import { Icon } from "./components";
import { techKey, techLabel, techToIcon } from "./types/index";
import Pill from "./components/Pill/Pill";
import SampleCard from "./components/SampleCard";
import SkeletonCard from "./components/SkeletonCard/SkeletonCard";
import { FacetGroup } from "./components";
import SamplePanel from "./components/SamplePanel/SamplePanel";

import { LayoutGroup } from "framer-motion";
import type { LikesJson } from "./types/likes";
import { reconcilePendingLikesWithGeneratedAt } from "./types/pendingLikes";
import { setScope as setLikesScope, clearOverridesOlderThan, subscribe as subscribeLikesOverrides } from "./utils/likesOverrides";
import type { OverrideEntry } from "./utils/likesOverrides";



import "./styles.css";

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
        reactionsSupported?: boolean | string;
    };
    reactionsSupported?: boolean;
    config?: Record<string, unknown>;
}

type FacetState = {
    q: string;
    spfx: string | null;
    tech: string | null;
    category: string | null;
};


function norm(s: string): string {
    return s.trim().toLowerCase();
}

function uniqSorted(values: string[]): string[] {
    return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    );
}

function sanitizeScopePath(): string {
    try {
        const path = (typeof window !== 'undefined' && window.location && window.location.pathname) ? window.location.pathname : 'site';
        return String(path).replace(/[^a-z0-9-_]/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
    } catch {
        return 'site';
    }
}

function makeScopedKey(base: string) {
    const scope = sanitizeScopePath();
    return `${base}:${scope}`;
}

export function SamplesGallery(props: SamplesGalleryProps) {
    const [sortModeInternal, setSortModeInternal] = useState<'new' | 'popular'>(() => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                const key = makeScopedKey('pnp.samples.sortMode');
                const v = window.localStorage.getItem(key);
                if (v === 'popular' || v === 'new') return v;
            }
        } catch {
            // ignore
        }
        return 'new';
    });

    const setSortMode = (m: 'new' | 'popular') => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                const key = makeScopedKey('pnp.samples.sortMode');
                window.localStorage.setItem(key, m);
            }
        } catch {
            // ignore storage errors
        }
        setSortModeInternal(m);
    };
    const sortMode = sortModeInternal;
    const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== "undefined" ? window.matchMedia('(max-width:640px)').matches : false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [samples, setSamples] = useState<PnPSample[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [gridReady, setGridReady] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const muuriRef = useRef<Muuri | null>(null);
    const [fullscreen, setFullscreen] = useState<boolean>(() => {
        try {
            if (typeof window !== "undefined" && window.location && window.location.search) {
                const params = new URLSearchParams(window.location.search);
                const qfullscreen = params.get("fullscreen");
                if (qfullscreen === "1" || qfullscreen?.toLowerCase() === "true") {
                    return true;
                }
            }
        } catch {
            // ignore
        }

        return false;
    });

    const [state, setState] = useState<FacetState>(() => {
        // Default values
        let q = props.initialSearch ?? "";
        let spfx: string | null = null;
        let tech: string | null = null;
        let category: string | null = null;

        // If running in browser, parse query params for defaults
        try {
            if (typeof window !== "undefined" && window.location && window.location.search) {
                const params = new URLSearchParams(window.location.search);
                const qp = params.get("q");
                if (qp !== null && qp !== "") q = qp;

                const qspfx = params.get("spfx");
                if (qspfx !== null && qspfx !== "") spfx = qspfx;

                const qtech = params.get("tech");
                if (qtech !== null && qtech !== "") tech = qtech;

                const qcat = params.get("category");
                if (qcat !== null && qcat !== "") category = qcat;
            }
        } catch {
            // ignore - keep defaults
        }

        return { q, spfx, tech, category };
    });


    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia('(max-width:640px)');
        const onChange = () => setIsMobile(mq.matches);
        try {
            mq.addEventListener?.('change', onChange);
        } catch {
            // Safari fallback
            // @ts-ignore
            mq.addListener?.(onChange);
        }

        // initial set handled by state initializer
        return () => {
            try {
                mq.removeEventListener?.('change', onChange);
            } catch {
                // @ts-ignore
                mq.removeListener?.(onChange);
            }
        };
    }, []);

    // Attempt to resolve session alias on load and when the stored hash changes
    useEffect(() => {
        if (typeof window === 'undefined') return;
        let cancelled = false;

        // Reconcile local overrides against the generatedAt timestamp from likes.json
        const reconcile = async () => {
            try {
                const res = await fetch('/sp-dev-fx-webparts/data/likes.json', { cache: 'no-cache' });
                if (!res.ok) return;
                const feed = await res.json() as { generatedAt?: string };
                const gen = feed?.generatedAt;
                if (gen && typeof gen === 'string' && !isNaN(Date.parse(gen))) {
                    clearOverridesOlderThan(new Date(gen).toISOString());
                    try { console.debug('[SamplesGallery] reconciled overrides with likes.json generatedAt', { generatedAt: gen }); } catch { /* ignore */}  
                }
            } catch (err) {
                try { console.debug('[SamplesGallery] failed to fetch likes.json for reconciliation', err); } catch {  /* ignore */}
            }
        };
        void reconcile();

        const runLookup = async () => {
            try {
                const storage = await import('./utils/githubIdStorage');
                const stored = storage.getStoredHash();
                if (!stored) return;
                const res = await fetch('/sp-dev-fx-webparts/data/likes.json', { cache: 'no-cache' });
                if (!res.ok) return;
                const feed = await res.json();
                const alias = await storage.lookupAliasFromDiscussionFeed(feed);
                if (!cancelled) {
                    try { console.debug('[SamplesGallery] lookupAliasFromDiscussionFeed result', { alias }); } catch {
                        /* ignore */
                    }
                }
            } catch (err) {
                try { console.debug('[SamplesGallery] lookupAliasFromDiscussionFeed failed', err); } catch {
                    /* ignore */
                }
            }
        };

        void runLookup();
        const onChanged = () => { void runLookup(); };
        window.addEventListener('pnp:githubLoginChanged', onChanged as EventListener);
        return () => { cancelled = true; window.removeEventListener('pnp:githubLoginChanged', onChanged as EventListener); };
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function load(): Promise<void> {
            setLoading(true);
            setGridReady(false);
            setError(null);

            try {
                const res = await fetch(props.src, { cache: "force-cache" });
                if (!res.ok) throw new Error(`Failed to load samples: ${res.status}`);
                const data = (await res.json()) as unknown;

                if (!Array.isArray(data)) throw new Error("Invalid JSON: expected an array");
                const parsed = data as PnPSample[];

                // Deduplicate by `name` preserving first occurrence
                const seen = new Set<string>();
                const deduped: PnPSample[] = [];
                for (const s of parsed) {
                    if (!s || typeof s.name !== "string") continue;
                    if (seen.has(s.name)) continue;
                    seen.add(s.name);
                    deduped.push(s);
                }

                // Always sort newest-first by updateDateTime before storing
                // Robust sort: newest-first by parsed date, fallback to title/name
                deduped.sort((a, b) => {
                    const da = Date.parse(a.updateDateTime ?? "") || 0;
                    const db = Date.parse(b.updateDateTime ?? "") || 0;
                    if (db !== da) return db - da; // newest first
                    const ta = (a.title ?? a.name ?? "").localeCompare(b.title ?? b.name ?? "");
                    return ta;
                });

                if (!cancelled) setSamples(deduped);
            } catch (e) {
                if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        void load();
        return () => {
            cancelled = true;
        };
    }, [props.src]);

    // Helper to sort a Muuri grid newest-first by `data-date` attribute
    const totalReactionsByIdRef = useRef<Map<string, number>>(new Map());
    
    // Helper to sort a Muuri grid newest-first by `data-date` attribute
    const applyGridSort = useCallback((grid: Muuri) => {
        grid.sort((a, b) => {
            const ea = a.getElement();
            const eb = b.getElement();

            if (sortMode === 'popular') {
                const ida = String(ea?.getAttribute("data-id") ?? "");
                const idb = String(eb?.getAttribute("data-id") ?? "");

                // Use the latest override-aware totals (including pending adjustments if you include them in the map)
                const pa = totalReactionsByIdRef.current.get(ida) ?? 0;
                const pb = totalReactionsByIdRef.current.get(idb) ?? 0;

                if (pb !== pa) return pb - pa; // highest reactions first
            }

            // fallback to date/title ordering for 'new' or ties
            const da = Date.parse(ea?.getAttribute("data-date") ?? "") || 0;
            const db = Date.parse(eb?.getAttribute("data-date") ?? "") || 0;

            if (db !== da) return db - da; // newest first

            const ta = ea?.getAttribute("data-title") ?? "";
            const tb = eb?.getAttribute("data-title") ?? "";
            return ta.localeCompare(tb);
        });
    }, [sortMode]);


    useEffect(() => {
        if (!gridRef.current) return;
        if (loading) return;
        if (samples.length === 0) return;

        // If on mobile, don't initialize Muuri (use CSS grid flow)
        if (isMobile) {
            muuriRef.current?.destroy();
            muuriRef.current = null;
            // Without Muuri, grid is ready instantly
            setGridReady(true);
            // Clear inline styles Muuri may have left on items
            if (gridRef.current) {
                const els = Array.from(gridRef.current.querySelectorAll<HTMLElement>(".pnp-sample-item"));
                for (const el of els) {
                    el.style.position = "";
                    el.style.left = "";
                    el.style.top = "";
                    el.style.transform = "";
                    el.style.width = "";
                    el.style.height = "";
                }
            }
            return;
        }

        // Recreate Muuri so it attaches to the current DOM node (useful when moved into a portal)
        muuriRef.current?.destroy();
        muuriRef.current = new Muuri(gridRef.current, {
            items: ".pnp-sample-item",
            layoutDuration: 400,
            layoutEasing: "ease",
        });

        // mark grid as not-yet-ready while Muuri performs its first layout
        setGridReady(false);

        // initial sort + layout
        applyGridSort(muuriRef.current);
        // When Muuri finishes layout, mark grid as ready so shadows/transitions can be enabled
        const onLayoutEnd = () => setGridReady(true);
        // Muuri emits events; listen for layoutEnd
        muuriRef.current.on?.("layoutEnd", onLayoutEnd);

        // trigger first layout
        muuriRef.current.refreshItems().layout();

        return () => {
            if (muuriRef.current) {
                try {
                    muuriRef.current.off?.("layoutEnd", onLayoutEnd);
                } catch {
                    // ignore
                }
                muuriRef.current.destroy();
                muuriRef.current = null;
            }
        };
    }, [loading, samples.length, fullscreen, isMobile, applyGridSort]);


    const facets = useMemo(() => {
        const spfxBuckets = samples
            .map(s => spfxToBucket(metaFirst(s, "SPFX-VERSION")))
            .filter((v): v is Exclude<typeof v, ""> => v !== "");

        const spfx = Array.from(new Set(spfxBuckets)).sort((a, b) => {
            // Put "< 1.1" last, everything else desc
            if (a === "< 1.1" && b !== "< 1.1") return 1;
            if (b === "< 1.1" && a !== "< 1.1") return -1;

            return spfxBucketSortKeyDesc(b) - spfxBucketSortKeyDesc(a);
        });

        const tech = Array.from(
            new Set(
                samples
                    .map(s => techKey(metaFirst(s, "CLIENT-SIDE-DEV") ?? ""))
                    .filter(Boolean)
            )
        ).sort((a, b) => {
            if (a === "other" && b !== "other") return 1;
            if (b === "other" && a !== "other") return -1;
            return techLabel(a).localeCompare(techLabel(b));
        });


        const categories = uniqSorted(samples.flatMap(s => getCategories(s)));

        return { spfx, tech, categories };
    }, [samples]);

    // Compute disabled options: for each option in a facet, determine if selecting it
    // (in combination with the other currently selected facets) would yield zero results.
    const disabledOptions = useMemo(() => {
        const disabled = {
            spfx: new Set<string>(),
            tech: new Set<string>(),
            category: new Set<string>(),
        };

        // Helper: check if any sample would match when we apply candidate selections
        const anyMatchWhen = (candidate: { spfx?: string | null; tech?: string | null; category?: string | null }) => {
            const q = norm(state.q);
            for (const s of samples) {
                const sspfx = spfxToBucket(metaFirst(s, "SPFX-VERSION"));
                const stech = techKey(metaFirst(s, "CLIENT-SIDE-DEV") ?? "");
                const scats = getCategories(s);

                if (candidate.spfx !== undefined && candidate.spfx !== null && sspfx !== candidate.spfx) continue;
                if (candidate.tech !== undefined && candidate.tech !== null && stech !== candidate.tech) continue;
                if (candidate.category !== undefined && candidate.category !== null && !scats.includes(candidate.category)) continue;

                // apply existing other state filters (but not the facet we're testing)
                if (state.spfx && candidate.spfx === undefined) {
                    if (sspfx !== state.spfx) continue;
                }
                if (state.tech && candidate.tech === undefined) {
                    if (stech !== state.tech) continue;
                }
                if (state.category && candidate.category === undefined) {
                    if (!scats.includes(state.category)) continue;
                }

                // text search
                if (q) {
                    const authorText = (s.authors ?? []).map((a) => {
                        const name = a.name ?? "";
                        const gh = a.gitHubAccount ?? "";
                        const atGh = gh ? (gh.startsWith("@") ? gh : `@${gh}`) : "";
                        return [name, gh, atGh].filter(Boolean).join(" ");
                    }).join(" ");

                    const hay = [
                        s.title,
                        s.shortDescription ?? "",
                        s.name,
                        sspfx,
                        stech,
                        scats.join(" "),
                        authorText,
                    ]
                        .join(" | ")
                        .toLowerCase();

                    if (!hay.includes(q)) continue;
                }

                return true;
            }
            return false;
        };

        // For each spfx option, see if any sample matches when selecting it
        for (const opt of facets.spfx) {
            if (!anyMatchWhen({ spfx: opt })) disabled.spfx.add(opt);
        }

        // For each tech option
        for (const opt of facets.tech) {
            if (!anyMatchWhen({ tech: opt })) disabled.tech.add(opt);
        }

        // For each category option
        for (const opt of facets.categories) {
            if (!anyMatchWhen({ category: opt })) disabled.category.add(opt);
        }

        return disabled;
    }, [samples, facets, state]);

    const byId = useMemo(() => {
        const m = new Map<string, PnPSample>();
        for (const s of samples) m.set(s.name, s); // assumes data-id={s.name}
        return m;
    }, [samples]);

    const matchesSample = useMemo(() => {
        const q = norm(state.q);

        return (s: PnPSample): boolean => {
            const spfx = spfxToBucket(metaFirst(s, "SPFX-VERSION"));
            const tech = techKey(metaFirst(s, "CLIENT-SIDE-DEV") ?? "");
            const cats = getCategories(s);

            // “radio” facets
            if (state.spfx && spfx !== state.spfx) return false;
            if (state.tech && tech !== state.tech) return false;
            if (state.category && !cats.includes(state.category)) return false;

            // text search
            if (!q) return true;

            const authorText = (s.authors ?? []).map((a) => {
                const name = a.name ?? "";
                const gh = a.gitHubAccount ?? "";
                const atGh = gh ? (gh.startsWith("@") ? gh : `@${gh}`) : "";
                return [name, gh, atGh].filter(Boolean).join(" ");
            }).join(" ");

            const hay = [
                s.title,
                s.shortDescription ?? "",
                s.name,
                spfx,
                tech,
                cats.join(" "),
                authorText,
            ]
                .join(" | ")
                .toLowerCase();

            return hay.includes(q);
        };
    }, [state]);

    const matchCount = useMemo(() => {
        let n = 0;
        for (const s of samples) if (matchesSample(s)) n++;
        return n;
    }, [samples, matchesSample]);

    const [likesData, setLikesData] = useState<LikesJson | null>(null);

    const [, setPendingLikesVersion] = useState(0);
    const likesOverridesRaw = useSyncExternalStore(
        (onStoreChange: () => void) => {
            if (typeof window === "undefined") return () => { };
            return subscribeLikesOverrides(() => onStoreChange());
        },
        () => (typeof window === "undefined" ? "" : localStorage.getItem("pnp:likes:overrides") ?? ""),
        () => ""
    );

    const likesOverrides = useMemo<OverrideEntry[]>(() => {
        if (!likesOverridesRaw) return [];
        try {
            const parsed = JSON.parse(likesOverridesRaw) as unknown;
            return Array.isArray(parsed) ? (parsed as OverrideEntry[]) : [];
        } catch {
            return [];
        }
    }, [likesOverridesRaw]);


    // Derive a samples array enriched with totalReactions from the likes feed (if available)
    const samplesWithLikes = useMemo(() => {
        if (!samples || samples.length === 0) return samples;
        if (!likesData || !(likesData as any).discussions) return samples;

        const totals = new Map<string, number>();
        const reactorsMap = new Map<string, string[]>();
        try {
            for (const [k, v] of Object.entries((likesData as any).discussions)) {
                const short = k.replace(/^sample:/, '');
                const total = (v as any)?.totalReactions ?? (Array.isArray((v as any)?.allReactors) ? ((v as any).allReactors.length) : 0);
                totals.set(short, Number(total) || 0);
                const reactors = Array.isArray((v as any)?.allReactors) ? (v as any).allReactors.map((r: any) => String(r).toLowerCase()) : [];
                reactorsMap.set(short, reactors);
            }
        } catch {
            // fall back to no totals
        }

        // Get the session alias (viewer) if available from sessionStorage
        let sessionAlias: string | null = null;
        try {
            sessionAlias = window.sessionStorage.getItem('pnp.github.alias');
        } catch {
            sessionAlias = null;
        }

        const overridesBySample = new Map<string, OverrideEntry>();
        for (const o of likesOverrides) {
            const raw = String(o.sample ?? "");
            const short = raw.replace(/^sample:/, "");
            overridesBySample.set(short, o);
            overridesBySample.set(raw, o);
        }



        return samples.map(s => {
            const key = (s.name ?? (s as PnPSample).name ?? '').toString();
            const shortKey = key.replace(/^sample:/, '');
            const total = totals.get(shortKey) ?? totals.get(key) ?? 0;
            const ov = overridesBySample.get(shortKey) ?? overridesBySample.get(key);
            const mergedTotal = (typeof ov?.count === "number") ? ov.count : total;
            let userHas = false;
            try {
                const reactors = reactorsMap.get(shortKey) ?? reactorsMap.get(key) ?? [];
                if (sessionAlias && reactors.length > 0) userHas = reactors.includes(sessionAlias.toLowerCase());
            } catch {
                userHas = false;
            }

            const mergedUserHas =
                (typeof ov?.viewerReacted === "boolean") ? ov.viewerReacted : userHas;

            return { ...s, totalReactions: mergedTotal, userHasReactions: mergedUserHas } as typeof s & { totalReactions?: number; userHasReactions?: boolean };
        });
    }, [samples, likesData, likesOverrides]);

    const totalReactionsById = useMemo(() => {
        const map = new Map<string, number>();

        // Build an override lookup by short and raw id
        const ovById = new Map<string, OverrideEntry>();
        for (const o of likesOverrides) {
            const raw = String(o.sample ?? "");
            const short = raw.replace(/^sample:/, "");
            ovById.set(raw, o);
            ovById.set(short, o);
        }

        for (const s of samplesWithLikes) {
            const rawId = String((s as any).name ?? "");
            if (!rawId) continue;

            const shortId = rawId.replace(/^sample:/, "");

            // Base total that came from likes.json (already merged with ov.count in your samplesWithLikes)
            let total = Number((s as any).totalReactions ?? 0) || 0;

            // Apply pending delta ONLY if we don't have an authoritative ov.count
            const ov = ovById.get(rawId) ?? ovById.get(shortId);
            const hasAuthoritativeCount = typeof ov?.count === "number";

            if (!hasAuthoritativeCount && typeof ov?.pendingLiked === "boolean") {
                total = ov.pendingLiked ? (total + 1) : Math.max(0, total - 1);
            }

            map.set(rawId, total);
            map.set(shortId, total);
        }

        return map;
    }, [samplesWithLikes, likesOverrides]);

    
    useEffect(() => {
        // keep the ref in sync so applyGridSort can read the latest totals
        totalReactionsByIdRef.current = totalReactionsById;
    }, [totalReactionsById]);


    // Precompute filtered samples for mobile (we re-render the list on mobile)
    const filteredSamples = useMemo(() => {
        const out = samplesWithLikes.filter(s => matchesSample(s));
        if (sortMode === 'popular') {
            return out.slice().sort((a, b) => {
                const ta = (a as any)?.totalReactions ?? (a as any)?.reactionsTotal ?? 0;
                const tb = (b as any)?.totalReactions ?? (b as any)?.reactionsTotal ?? 0;
                if (tb !== ta) return tb - ta;
                const da = Date.parse(a.updateDateTime ?? "") || 0;
                const db = Date.parse(b.updateDateTime ?? "") || 0;
                if (db !== da) return db - da;
                return (a.title ?? a.name ?? "").localeCompare(b.title ?? b.name ?? "");
            });
        }

        return out.slice().sort((a, b) => {
            const da = Date.parse(a.updateDateTime ?? "") || 0;
            const db = Date.parse(b.updateDateTime ?? "") || 0;
            if (db !== da) return db - da;
            return (a.title ?? a.name ?? "").localeCompare(b.title ?? b.name ?? "");
        });
    }, [samplesWithLikes, matchesSample, sortMode]);

    // applyGridSort moved earlier to ensure it's declared before use

    useEffect(() => {
        const grid = muuriRef.current;
        // If we have a Muuri grid, use its filtering (with animation)
        if (grid) {
            // Filter: hide/show items with animation
            grid.filter((item) => {
                const el = item.getElement();
                const id = el?.getAttribute("data-id") ?? "";
                const s = byId.get(id);
                return s ? matchesSample(s) : false;
            });

            // Ensure newest-first sorting after filter
            grid.refreshItems();
            applyGridSort(grid);
            grid.layout();
            return;
        }

        // No Muuri (mobile): mobile re-renders the list via React; nothing to do here
        return;
    }, [state, byId, matchesSample, applyGridSort, totalReactionsById]);


    // Fullscreen: lock body scroll and restore on exit
    useEffect(() => {
        if (!fullscreen) {
            document.body.style.overflow = "";
            return;
        }

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [fullscreen]);

    const [selected, setSelected] = useState<PnPSample | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    // Global key handler: `f` to toggle fullscreen, `Escape` to close panel or fullscreen.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            // ignore if modifiers are held
            if (e.ctrlKey || e.altKey || e.metaKey) return;

            // don't trigger while typing in inputs/textareas or contentEditable
            const active = document.activeElement as HTMLElement | null;
            if (active) {
                const tag = active.tagName;
                const typing = tag === "INPUT" || tag === "TEXTAREA" || active.isContentEditable;
                if (typing) return;
            }

            const k = e.key;
            if (k === "Escape") {
                if (selected) setSelected(null);
                else if (fullscreen) setFullscreen(false);
            } else if (k.toLowerCase() === "f") {
                setFullscreen(f => !f);
            }
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [fullscreen, selected]);

    // Focus management & simple focus-trap for the panel modal
    useEffect(() => {
        const node = panelRef.current;
        if (!selected) {
            // restore focus when panel closes
            try { lastFocusedRef.current?.focus?.(); } catch {  /* ignore */ }
            return;
        }

        // save last focused element
        try { lastFocusedRef.current = document.activeElement as HTMLElement | null; } catch { lastFocusedRef.current = null; }

        // focus panel container when it mounts
        if (node) {
            node.setAttribute('tabindex', '-1');
            try { node.focus(); } catch {  /* ignore */ }
        }

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelected(null);
                e.stopPropagation();
                return;
            }

            if (e.key === 'Tab' && node) {
                const focusable = node.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
                if (!focusable || focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                } else if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
        };

        document.addEventListener('keydown', onKeyDown, true);

        // hide background from AT while panel is open
        try {
            const mainSection = gridRef.current?.closest('section') ?? document.querySelector('section.pnp-samples');
            if (mainSection && selected) mainSection.setAttribute('aria-hidden', 'true');
        } catch { }

        return () => {
            document.removeEventListener('keydown', onKeyDown, true);
            try {
                const mainSection = gridRef.current?.closest('section') ?? document.querySelector('section.pnp-samples');
                if (mainSection) mainSection.removeAttribute('aria-hidden');
            } catch { }
        };
    }, [selected]);

    // Ensure Muuri recalculates after fullscreen toggles (both enter and exit)
    useEffect(() => {
        const id = setTimeout(() => {
            muuriRef.current?.refreshItems().layout();
        }, 80);
        return () => clearTimeout(id);
    }, [fullscreen]);


    const setFacet = (facet: "spfx" | "tech" | "category", value: string | null) =>
        setState(prev => ({ ...prev, [facet]: value }));

    const clearAll = () =>
        setState({ q: "", spfx: null, tech: null, category: null });


    const setQ = (q: string) =>
        setState(prev => ({ ...prev, q }));
    const techBase = (props.techIconBasePath ?? (props.baseUrl ? `${props.baseUrl.replace(/\/$/, '')}/tech-icons` : "/sp-dev-fx-webparts/tech-icons")).replace(/\/$/, "");

    const toggleFullscreen = () => setFullscreen(f => !f);

    

    const reactionsSupported = (() => {
        // Priority: explicit prop -> config.reactionsSupported -> giscusSettings.reactionsSupported -> default true
        if (typeof props.reactionsSupported === 'boolean') return props.reactionsSupported;
        const cfg = (props.config as any) ?? {};
        const cfgReacts = cfg.reactionsSupported;
        if (typeof cfgReacts === 'boolean') return cfgReacts;
        if (typeof cfgReacts === 'string') return (cfgReacts === '1' || cfgReacts.toLowerCase() === 'true');
        const v = (props.giscusSettings as any)?.reactionsSupported;
        if (typeof v === 'boolean') return v;
        if (typeof v === 'string') return (v === '1' || v.toLowerCase() === 'true');
        return true;
    })();

    // Merge giscus settings: config.giscus has priority over props.giscusSettings when present
    const mergedGiscusSettings = useMemo(() => {
        const cfg = (props.config as any) ?? {};
        const cfgG = cfg.giscus ?? {};
        const out: Record<string, any> = {};
        if (props.giscusSettings) Object.assign(out, props.giscusSettings);
        if (cfgG && typeof cfgG === 'object') Object.assign(out, cfgG);
        // normalize repo: if provided repo looks like just a repo name, prefix with default org
        try {
            const raw = out.repo as string | undefined;
            if (raw && typeof raw === 'string') {
                if (!raw.includes('/')) {
                    out.repo = `pnp/${raw}`;
                }
            }
        } catch {
            // ignore
        }
        return out as { repo?: string; repoId?: string; category?: string; categoryId?: string; mapping?: string; reactionsEnabled?: string; emitMetadata?: string; inputPosition?: string; lang?: string };
    }, [props.config, props.giscusSettings]);

    useEffect(() => {
        const onPendingLikes = () => {
            try {
                setPendingLikesVersion(v => v + 1);
            } catch {
                // ignore
            }
        };
        window.addEventListener('pendingLikesChanged', onPendingLikes as EventListener);
        return () => window.removeEventListener('pendingLikesChanged', onPendingLikes as EventListener);
    }, []);

    // Set scoped storage key for likes overrides based on giscus repo setting
    useEffect(() => {
        try {
            setLikesScope(mergedGiscusSettings?.repo as string | undefined);
        } catch {
            // ignore
        }
    }, [mergedGiscusSettings?.repo]);

    // Ensure pendingLikesVersion is read so React includes it in render dependencies
    // (used by SampleCard to recompute pending state)
    useEffect(() => {
        let cancelled = false;
        async function loadLikes() {
            if (!reactionsSupported) return;
            try {
                // Determine likes feed URL from config, then props.baseUrl, then public
                const cfg = (props.config as any) ?? {};
                const likesFeed = cfg.likesFeed as string | undefined;
                const likesUrl = likesFeed ? likesFeed : (props.baseUrl ? `${props.baseUrl.replace(/\/$/, '')}/data/discussion-reactions.json` : 'https://pnp.github.io/sp-dev-fx-webparts/data/discussion-reactions.json');
                const res = await fetch(likesUrl, { cache: 'no-cache' });
                if (!res.ok) return;
                const json = (await res.json()) as LikesJson;
                if (!cancelled) setLikesData(json);
                // reconcile any pending likes timestamps that are older than generatedAt
                try {
                    reconcilePendingLikesWithGeneratedAt(json.generatedAt ?? null);
                } catch {
                    // ignore
                }
            } catch {
                // ignore
            }
        }

        // load once on mount and then periodically every 10 minutes
        void loadLikes();
        const id = setInterval(loadLikes, 10 * 60 * 1000);
        return () => { cancelled = true; clearInterval(id); };
    }, []);

    // Ensure `gridReady` is read (used by the render path). Assigning to a local
    // prevents a TypeScript "declared but its value is never read" error.
    const isLoadingClass = loading || !gridReady;


    const renderContent = () => (
        <section
            className={[styles.root, "pnp-samples", props.className ?? "", isLoadingClass ? "pnp-samples--loading" : ""].join(" ").trim()}
            aria-modal={fullscreen}
            role={fullscreen ? "dialog" : undefined}
            aria-labelledby={fullscreen ? 'pnp-gallery-fullscreen-title' : undefined}
            aria-hidden={ (selected || fullscreen) ? true : undefined }
        >
            {fullscreen ? <h2 id="pnp-gallery-fullscreen-title" className="sr-only">Samples gallery — fullscreen</h2> : null}
            <div className={[styles.layout, "pnp-samples__layout"].join(" ")}
            >
                {/* Dev-only diagnostics removed */}
                {isMobile ? (
                    <div className={[styles.mobileFiltersHeader, "pnp-mobile-filters-header"].join(" ")}>
                        <button
                            type="button"
                            className="pnp-btn"
                            aria-expanded={showFilters}
                            aria-controls="pnp-mobile-filters"
                            onClick={() => setShowFilters(s => !s)}
                        >
                            {showFilters ? "Hide filters" : "Show filters"}
                        </button>


                    </div>
                ) : null}

                <aside id="pnp-mobile-filters" className={[styles.filters, "pnp-filters", (isMobile && !showFilters) ? styles.filtersHidden : "", (isMobile && !showFilters) ? 'pnp-filters--hidden' : ''].join(" ").trim()} aria-label="Sample filters" aria-hidden={isMobile && !showFilters}  hidden={isMobile && !showFilters}>

                    <div className={[styles.filterSort, "pnp-filter__sort"].join(" ")}>
                        <label htmlFor="pnpSort" className="pnp-label">Sort</label>
                        <div>
                            <select id="pnpSort" className="pnp-select" value={sortMode} onChange={(e) => setSortMode(e.currentTarget.value === 'popular' ? 'popular' : 'new')}>
                                <option value="new">New</option>
                                <option value="popular">Popular</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginTop: isMobile ? '' : '1rem' }}>
                        <label className="pnp-label" htmlFor="pnpSearch">Search</label>
                        <div className="pnp-search">
                            <input
                                id="pnpSearch"
                                className="pnp-search__input"
                                type="search"
                                placeholder="Search title, description, authors…"
                                value={state.q}
                                onChange={(e) => setQ(e.currentTarget.value)}
                            />
                            <button
                                type="button"
                                className="pnp-btn pnp-btn--ghost"
                                onClick={() => setQ("")}
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        </div></div>


                    <div className="pnp-filters__actions">
                        <button type="button" className="pnp-btn" onClick={clearAll} aria-label='Clear all filters' title="Clear all filters">
                            Clear all
                        </button>
                    </div>


                    <LayoutGroup id="spfx">
                        <FacetGroup
                            label="SPFx version"
                            value={state.spfx}
                            options={facets.spfx}
                            onChange={(v) => setFacet("spfx", v)}
                            disabledOptions={disabledOptions.spfx}
                            mobile={isMobile}
                        />
                    </LayoutGroup>


                    <LayoutGroup id="tech">
                        <FacetGroup
                            label="Technology"
                            value={state.tech}
                            options={facets.tech}
                            onChange={(v) => setFacet("tech", v)}
                            disabledOptions={disabledOptions.tech}
                            renderLabel={(t) => {
                                const label = techLabel(t as TechKey);
                                const src = `${techBase}/${techToIcon(t as TechKey)}.svg`;
                                return (<><Icon src={src} size={18} />&nbsp;{label}</>);
                            }}
                            mobile={isMobile}
                            labelText={(t) => techLabel(t as TechKey)}
                        />
                    </LayoutGroup>


                    <LayoutGroup id="category">
                        <FacetGroup
                            label="Category"
                            value={state.category}
                            options={facets.categories}
                            onChange={(v) => setFacet("category", v)}
                            disabledOptions={disabledOptions.category}
                            renderLabel={(cat) => (
                                <>
                                    <Icon icon={categoryToIcon(cat)} basePath={props.iconBasePath} size={18} />&nbsp;{prettyCategory(cat)}
                                </>
                            )}
                            mobile={isMobile}
                            labelText={(cat) => prettyCategory(cat)}
                        />
                    </LayoutGroup>


                </aside>

                <main className={[styles.results, "pnp-results"].join(" ")} aria-label="Sample results" aria-busy={loading ? "true" : "false"}>
                    <div className={[styles.resultsMeta, "pnp-results__meta"].join(" ")} role="status" aria-live="polite">
                        <div className={[styles.resultsCount, "pnp-results__count"].join(" ")}>
                            {loading ? null : (
                                matchCount === 1
                                    ? `Showing 1 item`
                                    : `Showing ${matchCount.toLocaleString()} items`
                            )}
                        </div>
                        <div className={[styles.resultsActive, "pnp-results__active"].join(" ")} aria-label="Active filters">
                            {state.q ? <Pill label={`Search: ${state.q}`} onRemove={() => setState(p => ({ ...p, q: "" }))} /> : null}
                            {state.spfx ? <Pill label={`SPFx: ${state.spfx}`} onRemove={() => setFacet("spfx", null)} /> : null}
                            {state.tech ? <Pill label={`Tech: ${state.tech}`} onRemove={() => setFacet("tech", null)} /> : null}
                            {state.category ? <Pill label={`Category: ${prettyCategory(state.category)}`} onRemove={() => setFacet("category", null)} /> : null}
                        </div>

                    </div>

                    {error ? (
                        <div className="pnp-empty">
                            <h3>Failed to load</h3>
                            <p>{error}</p>
                        </div>
                    ) : null}

                    <div className={styles.cardGridWrapper}>
                        {loading ? (
                            <div className={[styles.cardGrid, "pnp-card-grid pnp-skeleton-grid"].join(" ")} aria-label="Sample cards">
                                {Array.from({ length: isMobile ? 3 : 9 }).map((_, i) => (
                                    <SkeletonCard key={`skeleton-${i}`} />
                                ))}
                            </div>
                        ) : (
                            <div ref={gridRef} className={[styles.cardGrid, "pnp-card-grid pnp-muuri-grid"].join(" ")} aria-label="Sample cards">
                                {(isMobile ? filteredSamples : samplesWithLikes).map(s => (
                                    <SampleCard key={s.name} sample={s} iconBasePath={props.iconBasePath} techIconBasePath={props.techIconBasePath} muuriRef={muuriRef} onOpen={(sample) => setSelected(sample)} reactionsSupported={reactionsSupported} config={props.config} />
                                ))}
                            </div>
                        )}

                        {/* Toggle button: becomes Collapse (X) when fullscreen */}
                        {!isMobile ? (
                            <button
                                type="button"
                                title={fullscreen ? "Collapse" : "Full page (F)"}
                                aria-label={fullscreen ? "Collapse" : "Full page (F)"}
                                className="pnp-btn pnp-btn--ghost"
                                onClick={toggleFullscreen}
                                style={{ position: "absolute", top: 8, right: 8, padding: 6, lineHeight: 1 }}
                            >
                                {fullscreen ? "✕" : "⤢"}
                            </button>
                        ) : null}
                    </div>


                    {!loading && !error && matchCount === 0 ? (
                        <div className="pnp-empty">
                            <h3>No results</h3>
                            <p>Try removing a filter or changing your search terms.</p>
                        </div>
                    ) : null}
                </main>
            </div>
        </section>
    );

    // Render the content normally, and render the panel portal on top when selected.
    const content = renderContent();

    const panelPortal = (typeof document !== "undefined" && selected) ? createPortal(
        <div className="pnp-sample-panel-overlay" onClick={() => setSelected(null)}>
            <div className="pnp-sample-panel-container" ref={(el) => { panelRef.current = el; }} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="pnp-sample-panel-title">
                <SamplePanel sample={selected} onClose={() => setSelected(null)} baseUrl={props.baseUrl} giscusSettings={mergedGiscusSettings} reactionsSupported={reactionsSupported} config={props.config} />
            </div>
        </div>,
        document.body
    ) : null;

    // When fullscreen, render the same content into a portal that sits on top
    if (typeof document !== "undefined" && fullscreen) {
        return createPortal(
            <div className="pnp-samples-overlay" onDoubleClick={() => setFullscreen(false)}>
                {content}
                {panelPortal}
            </div>,
            document.body
        );
    }

    return (
        <>
            {content}
            {panelPortal}
        </>
    );
}
