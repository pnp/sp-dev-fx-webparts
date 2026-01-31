import styles from './SamplesGallery.module.css';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from "react-dom";
import Muuri from "muuri";
import type { PnPSample, TechKey, SampleAuthor } from "./types/index";
import type { SamplesGalleryProps, FacetState } from "./types/samplesGallery";
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
import { setScope as setLikesScope, subscribe as subscribeLikesOverrides } from "./utils/likesOverrides";
import type { OverrideEntry } from "./utils/likesOverrides";
import { captureFullDocument } from "./utils/captureDocumentImage";



import "./styles.css";




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
    const initialMuuriSortDoneRef = useRef<boolean>(false);
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

    useEffect(() => {
        try {
            console.log('[SamplesGallery] admin:', !!props.admin);
        } catch {
            // ignore logging failures
        }
    }, [props.admin]);

    // Note: reactions are now embedded on each sample; we no longer fetch likes.json separately.

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

                if (props.admin) {
                    console.log('[SamplesGallery][admin] Admin mode enabled: fetching merged PRs from GitHub...');
                    // Fetch merged PRs in a short window and extract sample tags from PR bodies
                    try {
                        const params = (typeof window !== 'undefined' && window.location && window.location.search)
                            ? new URLSearchParams(window.location.search)
                            : null;

                        let numDays = 14;
                        try {
                            const q = params?.get('numdays');
                            if (q && q !== '') {
                                const parsed = Number.parseInt(q, 10);
                                if (!Number.isNaN(parsed) && parsed > 0) numDays = parsed;
                                else console.warn('[SamplesGallery][admin] invalid numdays query param, using default 14', q);
                            }
                        } catch { /* ignore */ }

                        const windowDate = new Date();
                        windowDate.setDate(windowDate.getDate() - numDays);
                        const sinceIso = windowDate.toISOString();
                        const datePart = sinceIso.split('T')[0];

                        // GitHub Search API can return 422 when combining multiple `repo:` qualifiers
                        // in a single query for some tokens/accounts. To avoid that, query each
                        // repository separately and merge the results client-side.
                        const repos = ['pnp/sp-dev-fx-webparts', 'pnp/sp-dev-fx-extensions'];
                        console.log("Repos", repos);

                        const perRepoItems = await Promise.all(repos.map(async (r) => {
                            const qStr = `repo:${r} is:pr is:merged -author:dependabot[bot] merged:>${datePart}`;
                            const url = `https://api.github.com/search/issues?q=${encodeURIComponent(qStr)}&sort=updated&order=desc&per_page=100`;
                            console.log('[SamplesGallery][admin] Fetching merged PRs from GitHub Search API', url);

                            try {
                                const rres = await fetch(url, { headers: { Accept: 'application/vnd.github.v3+json' } });
                                if (!rres.ok) {
                                    console.warn('[SamplesGallery][admin] Failed to fetch PRs for', r, rres.status, rres.statusText);
                                    return [] as unknown[];
                                }
                                const body = await rres.json();
                                return Array.isArray(body.items) ? body.items : [];
                            } catch (e) {
                                console.warn('[SamplesGallery][admin] Error fetching PRs for', r, e);
                                return [] as unknown[];
                            }
                        }));

                        if (cancelled) return;

                        // Flatten results from all repos into a single items array
                        const items = perRepoItems.flat();
                        console.log(`[SamplesGallery][admin] Fetched ${items.length} merged PRs since ${datePart} across ${repos.length} repos`);

                            // Helper to canonicalize a sample name to a predictable slug
                            const canonicalize = (raw: string) => {
                                if (!raw) return '';
                                let s = String(raw).trim().toLowerCase();
                                s = s.replace(/^sample:\s*/i, '');
                                s = s.replace(/[^a-z0-9]+/g, '-');
                                s = s.replace(/-+/g, '-');
                                s = s.replace(/^-+|-+$/g, '');
                                return s;
                            };

                            // Collect one entry per PR occurrence so a single sample may
                            // appear multiple times if touched by multiple PRs.
                            const prSampleEntries: Array<{ canonical: string; cleaned: string; isNew: boolean; created: string | null; author?: SampleAuthor; prNumber?: number }> = [];
                            const tagRegex = /<!--\s*sample:\s*(?:\{([^}]+)\}|([^<\n\r]+?))\s*-->/i;

                            for (const it of items) {
                                try {
                                    const bodyText = String(it.body ?? '');
                                    if (!bodyText || bodyText.trim().length === 0) continue;

                                    const m = bodyText.match(tagRegex);
                                    const raw = m ? (m[1] ?? m[2]) : null;
                                    if (raw) {
                                        const cleaned = String(raw).trim();
                                        if (cleaned) {
                                            const canonical = canonicalize(cleaned);
                                            console.log(`[SamplesGallery][admin] item #${it.number} sample tag: '${cleaned}' (canonical: '${canonical}')`);


                                            const newMatch = (/\[x\]\s*New\s+sample/i.test(bodyText)
                                                || /\|\s*New\s+sample\?\s*\|\s*yes\b/i.test(bodyText));
                                            const created = String(it.created_at ?? it.closed_at ?? '') || null;

                                            // Try to fetch the PR author's GitHub profile to build a SampleAuthor
                                            let author: SampleAuthor | undefined = undefined;
                                            try {
                                                const userUrl = (it.user && (it.user as any).url) ? String((it.user as any).url) : null;
                                                if (userUrl) {
                                                    const ures = await fetch(userUrl, { headers: { Accept: 'application/vnd.github.v3+json' } });
                                                    if (ures.ok) {
                                                        const profile = await ures.json();
                                                        const login = String(profile.login ?? (it.user && it.user.login) ?? '').trim();
                                                        const name = (profile.name ?? login) || undefined;
                                                        const twitter = profile.twitter_username ? String(profile.twitter_username).replace(/^@/, '') : null;
                                                        const avatar = profile.avatar_url ?? profile.avatar_url ?? undefined;

                                                        const social = twitter ? `@${twitter}` : (login || undefined);

                                                        author = {
                                                            gitHubAccount: login || undefined,
                                                            name: name || undefined,
                                                            pictureUrl: avatar || undefined,
                                                            social: social || undefined,
                                                        };
                                                    }
                                                }
                                            } catch {
                                                // ignore profile fetch failures
                                            }

                                            prSampleEntries.push({ canonical, cleaned, isNew: Boolean(newMatch), created, author, prNumber: (typeof it.number === 'number' ? it.number : (it.number ? Number(it.number) : undefined)) });
                                        }
                                    }
                                } catch { /* ignore per-item failures */ }
                            }

                            if (prSampleEntries.length > 0) {
                                // Build lookup from canonical -> sample for quick resolution
                                const sampleByCanonical = new Map<string, PnPSample>();
                                for (const s of deduped) {
                                    const rawName = String(s.name ?? '').trim();
                                    const short = rawName.replace(/^sample:\s*/i, '').trim();
                                    const c1 = canonicalize(rawName);
                                    const c2 = canonicalize(short);
                                    if (!sampleByCanonical.has(c1)) sampleByCanonical.set(c1, s);
                                    if (!sampleByCanonical.has(c2)) sampleByCanonical.set(c2, s);
                                }

                                const filtered: PnPSample[] = [];
                                for (const entry of prSampleEntries) {
                                    const s = sampleByCanonical.get(entry.canonical);
                                    if (s) {
                                        const authors = entry.author ? [entry.author] : s.authors;
                                        // Create a unique instance name per PR so duplicates don't collide
                                        const instanceName = entry.prNumber ? `${s.name}::pr:${entry.prNumber}` : `${s.name}::pr:${entry.created ?? Date.now()}`;
                                        filtered.push({ ...s, name: instanceName, isNew: entry.isNew, updateDateTime: entry.created ?? s.updateDateTime, authors });
                                    }
                                }

                                console.log('[SamplesGallery][admin] kept', filtered.length, 'samples (including duplicates) of', deduped.length);
                                if (!cancelled) setSamples(filtered);
                            } else {
                                console.info('[SamplesGallery][admin] no sample tags found in merged PRs; clearing samples');
                                if (!cancelled) setSamples([]);
                            }
                    } catch (e) {
                        console.warn('[SamplesGallery][admin] admin PR processing failed', e);
                        if (!cancelled) setSamples(deduped);
                    }

                    // skip the default setSamples(deduped) below since we've already set samples
                    if (!cancelled) {
                        setLoading(false);
                        setGridReady(false);
                    }

                    // early return to avoid calling setSamples(deduped) again
                    return;
                }

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

    // Animated display count: smoothly transition numeric changes
    const [displayCount, setDisplayCount] = useState<number>(matchCount);
    const countAnimationRef = useRef<number | null>(null);
    const countStartRef = useRef<number>(matchCount);
    const countStartTimeRef = useRef<number>(0);

    useEffect(() => {
        // Cancel any existing animation
        if (countAnimationRef.current) cancelAnimationFrame(countAnimationRef.current);

        const duration = 350; // ms
        const from = displayCount;
        const to = matchCount;
        if (from === to) return;

        countStartRef.current = from;
        countStartTimeRef.current = performance.now();

        const step = (ts: number) => {
            const elapsed = ts - countStartTimeRef.current;
            const t = Math.min(1, elapsed / duration);
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad-ish
            const current = Math.round(countStartRef.current + (to - countStartRef.current) * eased);
            setDisplayCount(current);
            if (t < 1) {
                countAnimationRef.current = requestAnimationFrame(step);
            } else {
                countAnimationRef.current = null;
                setDisplayCount(to);
            }
        };

        countAnimationRef.current = requestAnimationFrame(step);

        // trigger a brief pulse class on change
        setCountPulse(true);
        const pulseTimer = setTimeout(() => setCountPulse(false), 420);

        return () => {
            if (countAnimationRef.current) cancelAnimationFrame(countAnimationRef.current);
            countAnimationRef.current = null;
            clearTimeout(pulseTimer);
        };
    }, [matchCount]);

    const [countPulse, setCountPulse] = useState<boolean>(false);

    // Compute disabled options: for each option in a facet, determine if selecting it
    // (in combination with the other currently selected facets) would yield zero results.
    const disabledOptions = useMemo(() => {
        const disabled = {
            spfx: new Set<string>(),
            tech: new Set<string>(),
            category: new Set<string>(),
        };

        const anyMatchWhen = (candidate: { spfx?: string | null; tech?: string | null; category?: string | null }) => {
            const q = norm(candidate?.spfx ? state.q : state.q);

            for (const s of samples) {
                const sspfx = spfxToBucket(metaFirst(s, "SPFX-VERSION"));
                const stech = techKey(metaFirst(s, "CLIENT-SIDE-DEV") ?? "");
                const scats = getCategories(s);

                if (candidate.spfx && sspfx !== candidate.spfx) continue;
                if (candidate.tech && stech !== candidate.tech) continue;
                if (candidate.category && !scats.includes(candidate.category)) continue;

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
                    ].join(" | ").toLowerCase();

                    if (!hay.includes(q)) continue;
                }

                return true;
            }

            return false;
        };

        for (const opt of facets.spfx) {
            if (!anyMatchWhen({ spfx: opt, tech: state.tech, category: state.category })) disabled.spfx.add(opt);
        }

        for (const opt of facets.tech) {
            if (!anyMatchWhen({ spfx: state.spfx, tech: opt, category: state.category })) disabled.tech.add(opt);
        }

        for (const opt of facets.categories) {
            if (!anyMatchWhen({ spfx: state.spfx, tech: state.tech, category: opt })) disabled.category.add(opt);
        }

        return disabled;
    }, [samples, facets, state.q, state.spfx, state.tech, state.category]);

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


    // Derive a samples array enriched with totalReactions from each sample's embedded `reactions` field
    const samplesWithLikes = useMemo(() => {
        if (!samples || samples.length === 0) return samples;

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
            const key = (s.name ?? '').toString();
            const shortKey = key.replace(/^sample:/, '');

            // Base totals come from the sample's `reactions.totalReactions` when present
            const totalFromSample = (s as any)?.reactions && typeof (s as any).reactions.totalReactions === 'number' ? (s as any).reactions.totalReactions : 0;

            const ov = overridesBySample.get(shortKey) ?? overridesBySample.get(key);
            const mergedTotal = (typeof ov?.count === "number") ? ov.count : totalFromSample;

            let userHas = false;
            try {
                const reactorsRaw = (s as any)?.reactions?.allReactors;
                const reactors = Array.isArray(reactorsRaw) ? reactorsRaw.map((r: string) => String(r).toLowerCase()) : [];
                if (sessionAlias && reactors.length > 0) userHas = reactors.includes(sessionAlias.toLowerCase());
            } catch {
                userHas = false;
            }

            const mergedUserHas = (typeof ov?.viewerReacted === "boolean") ? ov.viewerReacted : userHas;

            return { ...s, totalReactions: mergedTotal, userHasReactions: mergedUserHas } as PnPSample;
        });
    }, [samples, likesOverrides]);

    // If a stored hashed id exists but no session alias is set, try to
    // resolve the alias from the loaded samples' `reactions.allReactors`.
    // The helper `lookupAliasFromDiscussionFeed` will set
    // `sessionStorage['pnp.github.alias']` when it finds a match. When
    // resolved we increment a small state (`setPendingLikesVersion`) so
    // that the memoized `samplesWithLikes` recomputes and picks up the
    // newly-set session alias.
    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const sessionAlias = window.sessionStorage.getItem('pnp.github.alias');
            const storedHash = window.localStorage.getItem('pnp:github.id');
            if (sessionAlias || !storedHash) return; // nothing to do
            if (!samples || samples.length === 0) return;

            (async () => {
                try {
                    const storage = await import('./utils/githubIdStorage');

                    const feed = samples.map(s => ({
                        sampleId: String(s.name ?? '').replace(/^sample:/, ''),
                        allReactors: ((s as any)?.reactions?.allReactors ?? []) as string[]
                    }));

                    const found = storage.lookupAliasFromDiscussionFeed ? await storage.lookupAliasFromDiscussionFeed(feed) : null;
                    if (found) {
                        setPendingLikesVersion(v => v + 1);
                    }
                } catch {
                    // ignore
                }
            })();
        } catch {
            // ignore
        }
    }, [samples]);

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
            const rawId = String(s.name ?? "");
            if (!rawId) continue;

            const shortId = rawId.replace(/^sample:/, "");

            // Base total that came from likes.json (already merged with ov.count in samplesWithLikes)
            let total = Number(s.totalReactions ?? 0) || 0;

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

    // Initialize Muuri only after samples and likes totals have been computed.
    useEffect(() => {
        if (!gridRef.current) return;
        if (loading) return;
        if (samples.length === 0) return;

        // If totals not ready yet, wait (this prevents binding Muuri
        // before likes overrides are applied)
        if (!totalReactionsById || totalReactionsById.size === 0) {

            return;
        }

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
            layoutOnInit: false,
        });

        // mark grid as not-yet-ready while Muuri performs its first layout
        setGridReady(false);

        // When Muuri finishes layout, mark grid as ready so transitions can be enabled
        const onLayoutEnd = () => {
            initialMuuriSortDoneRef.current = true;
            setGridReady(true);
        };
        muuriRef.current.on?.("layoutEnd", onLayoutEnd);

        // Programmatic initial sort: refresh items, apply sort, then layout.
        // This ensures we only sort once and that the visible layout is already sorted.
        try {
            muuriRef.current.refreshItems();
            applyGridSort(muuriRef.current);
            muuriRef.current.layout();
        } catch (e) {
            // ignore - fallback behavior will let subsequent effects handle sorting
            console.warn('[SamplesGallery] initial muuri sort failed', e);
        }

        return () => {
            if (muuriRef.current) {
                try { muuriRef.current.off?.("layoutEnd", onLayoutEnd); } catch { /* ignore */ }
                muuriRef.current.destroy();
                muuriRef.current = null;
            }
        };
    }, [loading, samples.length, fullscreen, isMobile, applyGridSort, totalReactionsById]);


    // Precompute filtered samples for mobile (we re-render the list on mobile)
    const filteredSamples = useMemo(() => {
        const out = samplesWithLikes.filter(s => matchesSample(s));
        if (sortMode === 'popular') {
            return out.slice().sort((a, b) => {
                const ta = a.totalReactions ?? 0;
                const tb = b.totalReactions ?? 0;
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
            if (initialMuuriSortDoneRef.current) {
                applyGridSort(grid);
            }
            grid.layout();
            return;
        }

        // No Muuri (mobile): mobile re-renders the list via React; nothing to do here
        return;
    }, [state, byId, matchesSample, applyGridSort, totalReactionsById]);

    // When sort mode changes, prefer Muuri's sorting on desktop rather than
    // re-rendering/re-ordering DOM via React. This keeps items in the DOM and
    // lets Muuri animate the sort smoothly.
    useEffect(() => {
        if (isMobile) return; // mobile uses React-sorted list
        const grid = muuriRef.current;
        if (!grid) return;

        try {
            if (!initialMuuriSortDoneRef.current) return; // wait for initial programmatic sort
            grid.refreshItems();
            applyGridSort(grid);
            grid.layout();
        } catch (e) {
            // swallow errors — fallback to React re-render ordering
            console.warn('[SamplesGallery] Muuri sort failed, falling back', e);
        }
    }, [sortMode, isMobile, applyGridSort]);


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


    useEffect(() => {
        if (!props.admin) return;

        const onKey = async (e: KeyboardEvent) => {
            const isCtrlAltS =
                e.ctrlKey && e.altKey && !e.shiftKey && !e.metaKey && e.key.toLowerCase() === "s";

            if (!isCtrlAltS) return;

            // Avoid triggering while typing
            const el = document.activeElement as HTMLElement | null;
            if (el) {
                const tag = el.tagName;
                if (tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable) return;
            }

            e.preventDefault();

            await captureFullDocument({
                format: "png",
                filenameBase: "slide-1920x1080",
                pixelRatio: 1,
                tileHeightPx: 1080,
                backgroundColor: "#ffffff",
            });

        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [props.admin]);


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
        } catch { /* ignore */ }

        return () => {
            document.removeEventListener('keydown', onKeyDown, true);
            try {
                const mainSection = gridRef.current?.closest('section') ?? document.querySelector('section.pnp-samples');
                if (mainSection) mainSection.removeAttribute('aria-hidden');
            } catch { /* ignore */ }
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
    const toggleFullscreen = () => setFullscreen(f => !f);



    const reactionsSupported = (() => {
        if (props.admin === true) return false; // disable reactions in admin mode
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

    // Ensure `gridReady` is read (used by the render path). Assigning to a local
    // prevents a TypeScript "declared but its value is never read" error.
    const isLoadingClass = loading || !gridReady;


    const renderContent = () => (
        <section
            className={[styles.root, "pnp-samples", props.className ?? "", isLoadingClass ? "pnp-samples--loading" : ""].join(" ").trim()}
            aria-modal={fullscreen}
            role={fullscreen ? "dialog" : undefined}
            aria-labelledby={fullscreen ? 'pnp-gallery-fullscreen-title' : undefined}
            aria-hidden={(selected || fullscreen) ? true : undefined}
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
                            aria-label={showFilters ? "Hide filters" : "Show filters"}
                        >
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg className={[styles.filterIcon, showFilters ? styles['filterIcon--open'] : ''].join(' ').trim()} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" role="img" aria-hidden="true" focusable="false">
                                    <path d="M12.25 13.5C12.6642 13.5 13 13.8358 13 14.25C13 14.6642 12.6642 15 12.25 15H7.75C7.33579 15 7 14.6642 7 14.25C7 13.8358 7.33579 13.5 7.75 13.5H12.25ZM14.25 9.25C14.6642 9.25 15 9.58579 15 10C15 10.4142 14.6642 10.75 14.25 10.75H5.75C5.33579 10.75 5 10.4142 5 10C5 9.58579 5.33579 9.25 5.75 9.25H14.25ZM16.25 5C16.6642 5 17 5.33579 17 5.75C17 6.16421 16.6642 6.5 16.25 6.5H3.75C3.33579 6.5 3 6.16421 3 5.75C3 5.33579 3.33579 5 3.75 5H16.25Z" fill="currentColor"></path>
                                </svg>
                                <span>Filters</span>
                            </span>
                        </button>
                    </div>
                ) : null}

                { props.admin ? null : <aside id="pnp-mobile-filters" className={[styles.filters, "pnp-filters", (isMobile && !showFilters) ? styles.filtersHidden : "", (isMobile && !showFilters) ? 'pnp-filters--hidden' : ''].join(" ").trim()} aria-label="Sample filters" aria-hidden={isMobile && !showFilters}>

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
                        <label className={styles.label} htmlFor="pnpSearch">Search</label>
                        <div className={styles.search}>
                            <input
                                id="pnpSearch"
                                className={styles.searchInput}
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


                    <div className={styles.filterActions}>
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
                                const src = `${props.baseUrl}/${techToIcon(t as TechKey)}.svg`;
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
                                    <Icon icon={categoryToIcon(cat)} basePath={props.baseUrl} size={18} />&nbsp;{prettyCategory(cat)}
                                </>
                            )}
                            mobile={isMobile}
                            labelText={(cat) => prettyCategory(cat)}
                        />
                    </LayoutGroup>


                </aside>}

                <main className={styles.results} aria-label="Sample results" aria-busy={loading ? "true" : "false"}>
                    {props.admin ? null :<div className={styles.resultsMeta} role="status" aria-live="polite">
                        <div className={[styles.resultsCount, countPulse ? styles.countPulse : ''].filter(Boolean).join(" ")}>
                            {loading ? null : (
                                displayCount === 1
                                    ? `Showing 1 item`
                                    : `Showing ${displayCount.toLocaleString()} items`
                            )}
                        </div>
                        <div className={styles.resultsActive} aria-label="Active filters">
                            {state.q ? <Pill label={`Search: ${state.q}`} onRemove={() => setState(p => ({ ...p, q: "" }))} /> : null}
                            {state.spfx ? <Pill label={`SPFx: ${state.spfx}`} onRemove={() => setFacet("spfx", null)} /> : null}
                            {state.tech ? <Pill label={`Tech: ${state.tech}`} onRemove={() => setFacet("tech", null)} /> : null}
                            {state.category ? <Pill label={`Category: ${prettyCategory(state.category)}`} onRemove={() => setFacet("category", null)} /> : null}
                        </div>

                    </div>}

                    {error ? (
                        <div className="pnp-empty">
                            <h3>Failed to load</h3>
                            <p>{error}</p>
                        </div>
                    ) : null}

                    <div className={styles.cardGridWrapper}>
                        {/* Always render the real grid (Muuri needs the DOM). Hide visually until Muuri is ready. */}
                        <div ref={gridRef} className={[styles.cardGrid, gridReady ? styles.cardGridFadeIn : styles.cardGridFadeOut, !gridReady ? styles.cardGridHidden : "", "pnp-card-grid pnp-muuri-grid"].filter(Boolean).join(" ")} aria-label="Sample cards">
                            {(isMobile ? filteredSamples : samplesWithLikes).map(s => (
                                <SampleCard key={s.name} sample={s} basePath={props.baseUrl} muuriRef={muuriRef} onOpen={(sample) => setSelected(sample)} reactionsSupported={reactionsSupported} config={props.config}  admin={props.admin} />
                            ))}
                        </div>

                        {/* Skeleton overlay sits above the real grid until Muuri completes layout. */}
                        <div className={[styles.cardGrid, styles.cardGridOverlay, gridReady ? styles.cardGridOverlayHidden : styles.cardGridOverlayVisible, "pnp-card-grid pnp-skeleton-grid"].filter(Boolean).join(" ")} aria-hidden={!loading ? "false" : "true"}>
                            {Array.from({ length: isMobile ? 3 : 9 }).map((_, i) => (
                                <SkeletonCard key={`skeleton-${i}`} />
                            ))}
                        </div>

                        {/* Toggle button: becomes Collapse (X) when fullscreen */}
                        {(isMobile || props.admin) ? (null) : (
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
                        )}
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
