import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Muuri from "muuri";
import type { PnPSample, TechKey } from "./types/index";
import { metaFirst, getCategories, spfxToBucket, spfxBucketSortKeyDesc } from "./types/index";

import { categoryToIcon, prettyCategory } from "./types/index";
import { Icon } from "./components";
import { techKey, techLabel, techToIcon } from "./types/index";
import Pill from "./components/Pill";
import SampleCard from "./components/SampleCard";
import { FacetGroup } from "./components";

import { LayoutGroup } from "framer-motion";


import "./styles.css";

export interface SamplesGalleryProps {
    src: string; // JSON URL
    initialSearch?: string;
    className?: string;
    iconBasePath?: string;
    techIconBasePath?: string;
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

export function SamplesGallery(props: SamplesGalleryProps) {
    const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== "undefined" ? window.matchMedia('(max-width:640px)').matches : false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [samples, setSamples] = useState<PnPSample[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
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
        } catch  {
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
        } catch  {
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

    useEffect(() => {
        let cancelled = false;

        async function load(): Promise<void> {
            setLoading(true);
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

    useEffect(() => {
        if (!gridRef.current) return;
        if (loading) return;
        if (samples.length === 0) return;

        // If on mobile, don't initialize Muuri (use CSS grid flow)
        if (isMobile) {
            muuriRef.current?.destroy();
            muuriRef.current = null;
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

        // initial sort + layout
        applyGridSort(muuriRef.current);
        muuriRef.current.refreshItems().layout();

        return () => {
            muuriRef.current?.destroy();
            muuriRef.current = null;
        };
    }, [loading, samples.length, fullscreen, isMobile]);


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

            const hay = [
                s.title,
                s.shortDescription ?? "",
                s.name,
                spfx,
                tech,
                cats.join(" "),
                (s.authors ?? []).map((a) => a.name ?? a.gitHubAccount ?? "").join(" "),
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

    // Precompute filtered samples for mobile (we re-render the list on mobile)
    const filteredSamples = useMemo(() => {
        const out = samples.filter(s => matchesSample(s));
        return out;
    }, [samples, matchesSample]);

    // Helper to sort a Muuri grid newest-first by `data-date` attribute
    const applyGridSort = (grid: Muuri) => {
        grid.sort((a, b) => {
            const ea = a.getElement();
            const eb = b.getElement();

            const da = Date.parse(ea?.getAttribute("data-date") ?? "") || 0;
            const db = Date.parse(eb?.getAttribute("data-date") ?? "") || 0;

            if (db !== da) return db - da; // newest first

            const ta = ea?.getAttribute("data-title") ?? "";
            const tb = eb?.getAttribute("data-title") ?? "";
            return ta.localeCompare(tb);
        });
    };

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
            applyGridSort(grid);

            // Re-measure + layout (good when item heights differ)
            grid.refreshItems().layout();
            return;
        }

        // No Muuri (mobile): mobile re-renders the list via React; nothing to do here
        return;
    }, [state, byId, matchesSample]);

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

    // Global key handler: `e` to toggle fullscreen, `Escape` to close.
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
                if (fullscreen) setFullscreen(false);
            } else if (k.toLowerCase() === "e") {
                setFullscreen(f => !f);
            }
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [fullscreen]);

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
    const techBase = (props.techIconBasePath ?? "/sp-dev-fx-webparts/tech-icons").replace(/\/$/, "");

    const toggleFullscreen = () => setFullscreen(f => !f);

    const renderContent = () => (
        <section className={`pnp-samples ${props.className ?? ""}`.trim()} aria-modal={fullscreen} role={fullscreen ? "dialog" : undefined}>
             <div className="pnp-samples__layout">
                {isMobile ? (
                    <div className="pnp-mobile-filters-header">
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

                <aside id="pnp-mobile-filters" className={`pnp-filters ${isMobile && !showFilters ? 'pnp-filters--hidden' : ''}`.trim()} aria-label="Sample filters">
                    
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
                    </div>

                    <div className="pnp-filters__actions">
                        <button type="button" className="pnp-btn" onClick={clearAll}>
                            Clear all
                        </button>
                    </div>

                    <LayoutGroup id="spfx">
                        <FacetGroup
                            label="SPFx version"
                            value={state.spfx}
                            options={facets.spfx}
                            onChange={(v) => setFacet("spfx", v)}
                            mobile={isMobile}
                        />
                    </LayoutGroup>


                    <LayoutGroup id="tech">
                        <FacetGroup
                            label="Technology"
                            value={state.tech}
                            options={facets.tech}
                            onChange={(v) => setFacet("tech", v)}
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

                <main className="pnp-results" aria-label="Sample results">
                    <div className="pnp-results__meta" role="status" aria-live="polite">
                        <div className="pnp-results__count">
                            {loading ? "Loading…" : (
                                matchCount === 1
                                    ? `Showing 1 item`
                                    : `Showing ${matchCount.toLocaleString()} items`
                            )}
                        </div>
                        <div className="pnp-results__active" aria-label="Active filters">
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

                    <div style={{ position: "relative" }}>
                        <div ref={gridRef} className="pnp-card-grid pnp-muuri-grid" aria-label="Sample cards">
                            {!loading && (isMobile ? filteredSamples : samples).map(s => (
                                <SampleCard key={s.name} sample={s} iconBasePath={props.iconBasePath} techIconBasePath={props.techIconBasePath} muuriRef={muuriRef} />
                            ))}
                        </div>

                        {/* Toggle button: becomes Collapse (X) when fullscreen */}
                        {!isMobile ? (
                            <button
                                type="button"
                                title={fullscreen ? "Collapse" : "Expand (E)"}
                                aria-label={fullscreen ? "Collapse" : "Expand (E)"}
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

    // When fullscreen, render the same content into a portal that sits on top
    if (typeof document !== "undefined" && fullscreen) {
        return createPortal(
            <div className="pnp-samples-overlay" onDoubleClick={() => setFullscreen(false)}>
                {renderContent()}
            </div>,
            document.body
        );
    }

    return renderContent();
}
