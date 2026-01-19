import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import type { PnPSample } from "../../types/index";
import { Icon } from "../index";
import { metaFirst, getCategories, techLabel, techKey, techToIcon, prettyCategory, categoryToIcon } from "../../types/index";
import { LikesPanel } from "../LikesPanel";
import styles from "./SamplePanel.module.css";

type AnalyticsEvent = "download_click" | "view_click";

function track(eventName: AnalyticsEvent, params?: Record<string, unknown>) {
    const gtagFn = (window as any).gtag as undefined | ((...args: any[]) => void);
    if (!gtagFn) return;
    try {
        gtagFn("event", eventName, {
            event_category: "engagement",
            ...params,
        });
    } catch {
        // swallow errors from analytics to avoid breaking UX
    }
}

export interface SamplePanelProps {
    sample: PnPSample;
    onClose: () => void;
    baseUrl?: string;
    giscusSettings?: {
        repo?: string;
        repoId?: string;
        category?: string;
        categoryId?: string;
    };

    config?: Record<string, unknown>;
    reactionsSupported?: boolean;
}

export default function SamplePanel({ sample, onClose, baseUrl, giscusSettings, config, reactionsSupported }: SamplePanelProps) {
    // ensure `config` is considered used (may be read by consumers later)
    void config;
    const formatDate = (v: string | undefined | null) => {
        if (!v) return 'Unknown';
        try {
            const d = new Date(String(v));
            if (isNaN(d.getTime())) return String(v);
            return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        } catch {
            return String(v);
        }
    };
    // fetched sample metadata (from ${sample.url}/assets/sample.json)
    const [fetchedMeta, setFetchedMeta] = useState<Record<string, any> | null>(null);

    const download = () => {
        const url = sample.downloadUrl ?? sample.url;
        track("download_click", { item_id: sample.name, method: 'zip' });
        // Open download in new tab
        window.open(url, "_blank", "noopener");
    };

    const openGitHub = () => {
        track("download_click", { item_id: sample.name, method: 'github' });

        // Open the sample URL (usually links to the GitHub sample page)
        const gh = sample.url ?? sample.source ?? sample.downloadUrl;
        if (gh) window.open(gh, "_blank", "noopener");
    };

    const cliCommand = useMemo(() => {
        // Prefer extracting folder after '/samples/' from URL
        const src = (sample.url ?? sample.source ?? "") as string;
        let folder = "";
        try {
            const u = new URL(src);
            const parts = u.pathname.split('/').filter(Boolean);
            const idx = parts.indexOf('samples');
            if (idx >= 0 && parts.length > idx + 1) {
                folder = parts[idx + 1];
            }
        } catch {
            // ignore malformed URL
        }

        // Fallback: if sample.name contains a common prefix, strip it
        if (!folder) {
            const nm = sample.name ?? "";
            folder = nm.replace(/^pnp-sp-dev-spfx-web-parts-/, "");
        }

        let cmd = `npx spfx-sample get ${folder}`;

        // detect specific repo in sample.url or sample.source
        const url = (sample.url ?? sample.source ?? "").toLowerCase();
        if (url.includes("sp-dev-fx-extensions")) {
            cmd += " --repo sp-dev-fx-extensions";
        }

        return cmd;
    }, [sample]);

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Track when this panel is displayed for the current sample
        try {
            track("view_click", { item_id: sample.name ?? sample.title ?? sample.url, view: 'sample_panel' });
        } catch {
            // ignore analytics errors
        }
    }, [sample]);

    // refs for focus management
    const containerRef = useRef<HTMLDivElement | null>(null);
    const previouslyFocusedRef = useRef<Element | null>(null);

    useEffect(() => {
        // fetch sample-specific JSON that may contain more thumbnails and metadata
        const src = (sample.url ?? sample.source ?? "") as string;
        if (!src) return;
        const controller = new AbortController();
        const base = (() => {
            try {
                const u = new URL(src);
                // Ensure we have an origin + path
                return `${u.origin}${u.pathname.replace(/\/$/, '')}`;
            } catch {
                return src.replace(/\/$/, '');
            }
        })();
        // If the base looks like a GitHub tree or blob URL, convert to raw.githubusercontent.com
        let jsonUrl = `${base}/assets/sample.json`;
        try {
            const u = new URL(base);
            const host = u.hostname.toLowerCase();
            if (host === 'github.com') {
                // github.com/<owner>/<repo>/tree/<branch>/samples/<folder>
                const parts = u.pathname.split('/').filter(Boolean);
                // expect at least owner/repo/...; find 'tree' or 'blob' segment
                const treeIdx = parts.indexOf('tree');
                const blobIdx = parts.indexOf('blob');
                const owner = parts[0];
                const repo = parts[1];
                let branch = 'main';
                let pathAfterBranch: string[] = [];
                if (treeIdx >= 0 && parts.length > treeIdx + 1) {
                    branch = parts[treeIdx + 1];
                    pathAfterBranch = parts.slice(treeIdx + 2);
                } else if (blobIdx >= 0 && parts.length > blobIdx + 1) {
                    branch = parts[blobIdx + 1];
                    pathAfterBranch = parts.slice(blobIdx + 2);
                } else {
                    pathAfterBranch = parts.slice(2);
                }

                // Construct raw URL: https://raw.githubusercontent.com/<owner>/<repo>/<branch>/<pathAfterBranch>/assets/sample.json
                const rawPath = ["https://raw.githubusercontent.com", owner, repo, branch, ...pathAfterBranch].join('/');
                jsonUrl = `${rawPath}/assets/sample.json`;
            }
            // If the URL already points to raw.githubusercontent.com host, use it as-is
            if (u.hostname.toLowerCase().includes('raw.githubusercontent.com')) {
                jsonUrl = `${base}/assets/sample.json`;
            }
        } catch {
            // leave jsonUrl as-is
        }

        let mounted = true;
        fetch(jsonUrl, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
                .then((data) => {
                    if (!mounted) return;
                    // some sample.json files return an array with a single entry
                    const meta = Array.isArray(data) && data.length ? data[0] : data;
                    setFetchedMeta(meta);
                })
            .catch((err) => {
                if (controller.signal.aborted) return;
                console.error(`Failed to fetch sample metadata from ${jsonUrl}:`, err);
            });

        return () => {
            mounted = false;
            controller.abort();
        };
    }, [sample]);

    // Carousel state
    const [activeIndex, setActiveIndex] = useState(0);

    // compute a base URL for resolving relative asset URLs (and convert GitHub tree/blob -> raw)
    const sampleBase = useMemo(() => {
        const src = (sample.url ?? sample.source ?? "") as string;
        if (!src) return '';
        try {
            const u = new URL(src);
            const host = u.hostname.toLowerCase();
            // handle github.com tree/blob pages -> raw.githubusercontent
            if (host === 'github.com') {
                const parts = u.pathname.split('/').filter(Boolean);
                const treeIdx = parts.indexOf('tree');
                const blobIdx = parts.indexOf('blob');
                const owner = parts[0];
                const repo = parts[1];
                let branch = 'main';
                let pathAfterBranch: string[] = [];
                if (treeIdx >= 0 && parts.length > treeIdx + 1) {
                    branch = parts[treeIdx + 1];
                    pathAfterBranch = parts.slice(treeIdx + 2);
                } else if (blobIdx >= 0 && parts.length > blobIdx + 1) {
                    branch = parts[blobIdx + 1];
                    pathAfterBranch = parts.slice(blobIdx + 2);
                } else {
                    pathAfterBranch = parts.slice(2);
                }

                return ["https://raw.githubusercontent.com", owner, repo, branch, ...pathAfterBranch].join('/');
            }

            // if already a raw.githubusercontent host, use as-is
            if (host.includes('raw.githubusercontent.com')) return `${u.origin}${u.pathname.replace(/\/$/, '')}`;

            // default: use origin + pathname (without trailing slash)
            return `${u.origin}${u.pathname.replace(/\/$/, '')}`;
        } catch {
            return src.replace(/\/$/, '');
        }
    }, [sample]);

    // compute available thumbnails (prefer fetchedMeta.thumbnails) and resolve relative URLs
    const thumbnails = useMemo<{ url: string; alt: string }[]>(() => {
        const t = (fetchedMeta && Array.isArray(fetchedMeta.thumbnails) && fetchedMeta.thumbnails.length)
            ? fetchedMeta.thumbnails
            : (sample.thumbnails ?? []);

        const resolveUrl = (u: unknown) => {
            try {
                const s = String(u || '');
                if (!s) return '';
                // if absolute (http(s) or data:) return as-is
                if (/^https?:|^data:/.test(s)) return s;
                // otherwise join with sampleBase
                if (sampleBase) return `${sampleBase.replace(/\/$/, '')}/${s.replace(/^\//, '')}`;
                return s;
            } catch {
                return String(u ?? '');
            }
        };

        // type guard for thumbnail objects
        const isThumbObj = (v: unknown): v is { url?: unknown; alt?: unknown } =>
            typeof v === 'object' && v !== null &&
            (Object.prototype.hasOwnProperty.call(v, 'url') || Object.prototype.hasOwnProperty.call(v, 'alt'));

        // normalize to objects with url and alt
        return (t as unknown[]).map((th) => {
            if (typeof th === 'string') {
                return { url: resolveUrl(th), alt: String(sample.title) };
            }
            if (isThumbObj(th)) {
                const url = th.url ?? '';
                const alt = th.alt ?? sample.title;
                return { url: resolveUrl(url), alt: String(alt) };
            }
            return { url: resolveUrl(th), alt: String(sample.title) };
        });
    }, [fetchedMeta, sample, sampleBase]);

    useEffect(() => {
        // reset active index when thumbnails change
        setActiveIndex(0);
    }, [thumbnails.length, sample.name, fetchedMeta]);

    const prev = useCallback(() => setActiveIndex(i => (i - 1 + thumbnails.length) % thumbnails.length), [thumbnails.length]);
    const next = useCallback(() => setActiveIndex(i => (i + 1) % thumbnails.length), [thumbnails.length]);

    // keyboard support for carousel left/right when panel has focus
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            // only handle when dialog is focused / open
            if (!containerRef.current) return;
            const active = document.activeElement;
            if (!containerRef.current.contains(active)) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                next();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [next, prev, thumbnails.length]);

    // swipe support (pointer events) for carousel
    useEffect(() => {
        const vp = containerRef.current?.querySelector(`.${styles.carouselViewport}`) as HTMLElement | null;
        if (!vp) return;

        let startX: number | null = null;
        let dragging = false;

        const onPointerDown = (e: PointerEvent) => {
            // If pointerdown originates from an interactive control (button, link), ignore
            const tgt = e.target as HTMLElement | null;
            if (tgt) {
                const legacySelectors = 'button, a, [role="button"], .pnp-sample-panel__thumb-btn, .pnp-sample-panel__carousel-prev, .pnp-sample-panel__carousel-next';
                const moduleSelectors = `.${styles.thumbBtn}, .${styles.carouselPrev}, .${styles.carouselNext}`;
                const interactive = tgt.closest && (tgt.closest(`${legacySelectors}, ${moduleSelectors}`));
                if (interactive) return;
            }
            // only primary button
            if ((e as PointerEvent).button && (e as PointerEvent).button !== 0) return;

            startX = e.clientX;
            dragging = true;
            vp.setPointerCapture?.(e.pointerId);
        };

        const onPointerMove = () => {
            if (!dragging || startX === null) return;
            // we could implement translate for live dragging, but keep simple
        };

        const onPointerUp = (e: PointerEvent) => {
            if (!dragging || startX === null) return;
            const dx = e.clientX - startX;
            const threshold = 40; // px
            if (dx > threshold) {
                prev();
            } else if (dx < -threshold) {
                next();
            }
            startX = null;
            dragging = false;
            try { vp.releasePointerCapture?.(e.pointerId); } catch { /* ignore */ }
        };

        vp.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        return () => {
            vp.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, [next, prev, thumbnails.length]);

    // resolve author picture URLs relative to sampleBase as well
    const resolvedAuthors = useMemo(() => {
        const authors = sample.authors ?? [];
        // const resolve = (u: unknown) => {
        //     try {
        //         const s = String(u ?? '');
        //         if (!s) return '';
        //         if (/^https?:|^data:/.test(s)) return s;
        //         if (sampleBase) return `${sampleBase.replace(/\/$/, '')}/${s.replace(/^\//, '')}`;
        //         return s;
        //     } catch {
        //         return String(u ?? '');
        //     }
        // };
        // return authors.map(a => ({ 
        //     ...a, 
        //     pictureUrl: a.pictureUrl ? resolve(a.pictureUrl) : a.pictureUrl,
        // }));
        return authors;
    }, [sample.authors]);

    useEffect(() => {
        previouslyFocusedRef.current = document.activeElement;

        // focus first focusable element inside the panel (close button or first control)
        const focusableSelector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
        const el = containerRef.current;
        if (el) {
            const list = Array.from(el.querySelectorAll<HTMLElement>(focusableSelector))
                .filter((f) => !f.hasAttribute('disabled'));
            if (list.length) {
                // focus the first meaningful control (close button is expected first)
                list[0].focus();
            } else {
                // fallback to container itself
                el.focus();
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                // prevent Escape from bubbling to parent/global handlers (e.g. exit full screen)
                try { e.stopImmediatePropagation?.(); } catch { /* ignore */ }
                try { e.stopPropagation(); } catch { /* ignore */ }
                e.preventDefault();
                onClose();
                return;
            }

            if (e.key === 'Tab') {
                const el = containerRef.current;
                if (!el) return;
                const focusable = Array.from(el.querySelectorAll<HTMLElement>(focusableSelector))
                    .filter((f) => !f.hasAttribute('disabled'));
                if (focusable.length === 0) {
                    e.preventDefault();
                    return;
                }
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                const active = document.activeElement as HTMLElement | null;
                if (!e.shiftKey && active === last) {
                    e.preventDefault();
                    first.focus();
                } else if (e.shiftKey && active === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
        };

        // attach as capture so we can intercept Escape before other listeners
        document.addEventListener('keydown', handleKeyDown, true);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
            // restore focus to previously focused element
            const prev = previouslyFocusedRef.current as HTMLElement | null;
            try {
                if (prev && typeof prev.focus === 'function') prev.focus();
            } catch {
                // ignore
            }
        };
    }, [onClose]);

    // prevent body scroll while the sample panel is open
    useEffect(() => {
        const cls = 'pnp-sample-panel-open';
        const body = document.body;
        if (!body) return;

        // compute scrollbar compensation to avoid layout shift
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        const originalPaddingRight = body.style.paddingRight || '';

        body.classList.add(cls);
        if (scrollBarWidth > 0) {
            // add padding to account for removed scrollbar
            body.style.paddingRight = `calc(${originalPaddingRight || '0px'} + ${scrollBarWidth}px)`;
        }

        return () => {
            body.classList.remove(cls);
            body.style.paddingRight = originalPaddingRight;
        };
    }, []);

    const copyCli = async () => {
        // try modern clipboard API first
        try {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                await navigator.clipboard.writeText(cliCommand);
            } else {
                // fallback using textarea + execCommand
                const ta = document.createElement('textarea');
                ta.value = cliCommand;
                // prevent scrolling to bottom
                ta.style.position = 'fixed';
                ta.style.left = '-9999px';
                ta.style.top = '0';
                document.body.appendChild(ta);
                ta.focus();
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }

            setCopied(true);
            // track that user copied the CLI command
            track("download_click", { item_id: sample.name, method: 'cli_copy' });
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // If both methods fail, still provide visual feedback (no throw)
            setCopied(true);
            // track failure as copy attempt
            track("download_click", { item_id: sample.name, method: 'cli_copy_attempt' });
            setTimeout(() => setCopied(false), 2000);
        }
    };

        const downloadUsingCli = () => {
            // track the CLI-initiated download
            track("download_click", { item_id: sample.name ?? sample.title ?? cliCommand, method: 'cli' });
            // Provide a minimal UX: open a new tab with a prefilled search showing the CLI command
            // This avoids executing shell commands from the browser. Users can copy and run locally.
            const url = `https://www.google.com/search?q=${encodeURIComponent(cliCommand)}`;
            window.open(url, "_blank", "noopener");
        };

    // helper to display name and github URL
    type SampleAuthor = {
        name?: string;
        gitHubAccount?: string;
        pictureUrl?: string;
    };
    
    const displayName = (a?: SampleAuthor | null) => {
        const name = a?.name ?? a?.gitHubAccount ?? 'Unknown';
        return String(name).trim();
    };
    
    const githubUrl = (a?: SampleAuthor | null) => a?.gitHubAccount ? `https://github.com/${a.gitHubAccount}` : null;

    const lastModifiedRaw = sample.updateDateTime ?? fetchedMeta?.updateDateTime ?? sample.updateDateTime;

    const spfxVersion = useMemo(() => {
        const v = metaFirst(sample, 'SPFX-VERSION' as any) || metaFirst(sample, 'SPFX_VERSION' as any);
        if (v) return String(v);
        return String(fetchedMeta?.spfxVersion ?? fetchedMeta?.spfx ?? '');
    }, [fetchedMeta, sample]);

    const categoriesList = useMemo(() => {
        const cats = getCategories(sample) ?? [];
        const fromMeta = Array.isArray(fetchedMeta?.categories) ? fetchedMeta.categories : (Array.isArray(fetchedMeta?.tags) ? fetchedMeta.tags : []);
        return Array.from(new Set([...cats, ...fromMeta])).filter(Boolean) as string[];
    }, [sample, fetchedMeta]);

    const techList = useMemo(() => {
        // Prefer explicitly provided arrays/fields in fetched sample metadata
        const t = fetchedMeta?.technologies ?? fetchedMeta?.tech ?? fetchedMeta?.technologiesUsed ?? fetchedMeta?.technology;
        if (Array.isArray(t)) return t.filter(Boolean) as string[];
        if (typeof t === 'string') return t.split(/[,|;]/).map((s: string) => s.trim()).filter(Boolean) as string[];

        // Next, check the sample's metadata entries (including CLIENT-SIDE-DEV used by SampleCard)
        // Sample metadata may have keys like CLIENT-SIDE-DEV or entries with key names containing TECH/TECHNOLOGY
        const metaEntries = fetchedMeta?.metadata ?? sample.metadata ?? [];
        if (Array.isArray(metaEntries) && metaEntries.length) {
            // First, look for CLIENT-SIDE-DEV exact key
            const csDev = (metaEntries as Array<Record<string, any>>).find((m) => String(m.key || '').toUpperCase() === 'CLIENT-SIDE-DEV');
            if (csDev && typeof csDev.value === 'string' && csDev.value.trim()) {
                return csDev.value.split(/[,|;]/).map((s: string) => s.trim()).filter(Boolean) as string[];
            }

            // Fallback: any metadata entry whose key contains TECH or TECHNOLOGY
            const entry = (metaEntries as Array<Record<string, any>>).find((m) => /TECH|TECHNOLOGY/i.test(String(m.key || '')));
            if (entry && typeof entry.value === 'string' && entry.value.trim()) {
                return entry.value.split(/[,|;]/).map((s: string) => s.trim()).filter(Boolean) as string[];
            }
        }

        return [] as string[];
    }, [fetchedMeta, sample.metadata]);

    // Compute visitor stats image src: https://m365-visitor-stats.azurewebsites.net/{repo}/samples/{folder}
    const visitorStatsSrc = useMemo(() => {
        try {
            const src = (sample.url ?? sample.source ?? sample.downloadUrl ?? "") as string;
            let repoName = '';
            let folder = '';
            if (src) {
                try {
                    const u = new URL(src);
                    const parts = u.pathname.split('/').filter(Boolean);
                    // If hosted on GitHub, parts[1] is repo
                    if (u.hostname && u.hostname.toLowerCase().includes('github.com') && parts.length >= 2) {
                        repoName = parts[1];
                        const idx = parts.indexOf('samples');
                        if (idx >= 0 && parts.length > idx + 1) folder = parts[idx + 1];
                    }
                } catch {
                    // ignore
                }
            }

            if (!repoName) {
                // Fallback to using the repository this gallery lives in if sample doesn't include repo info
                repoName = 'sp-dev-fx-webparts';
            }

            if (!folder) {
                // Fallback to derive from sample.name
                folder = String(sample.name ?? '').replace(/^pnp-sp-dev-spfx-web-parts-/, '');
            }

            if (!folder) return '';
            return `https://m365-visitor-stats.azurewebsites.net/${encodeURIComponent(repoName)}/samples/${encodeURIComponent(folder)}`;
        } catch {
            return '';
        }
    }, [sample]);

    return (
        <div ref={containerRef} className={`pnp-sample-panel ${styles.root}`} role="dialog" aria-label={`Sample details: ${sample.title}`} tabIndex={-1}>
            <div className={styles.header}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <h2 id="pnp-sample-panel-title" style={{ margin: 0 }}>{sample.title}</h2>
                    </div>
                <button className="pnp-btn pnp-btn--ghost" onClick={onClose} aria-label="Close">✕</button>
            </div>
            <div className={`pnp-sample-panel__body ${styles.body}`}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 6 }}>
                    <div className={styles.lastModified}>Last modified on {formatDate(lastModifiedRaw)}</div>
                </div>

                {/* Thumbnail carousel */}
                {thumbnails && thumbnails.length ? (
                    <div className={styles.carousel}>
                        <div className={styles.carouselViewport}>
                            {thumbnails.map((t, idx) => (
                                <img
                                    key={t.url + idx}
                                    src={t.url}
                                    alt={t.alt}
                                    className={`${styles.thumb} ${idx === activeIndex ? styles.thumbActive : ''}`}
                                />
                            ))}

                            <button className={`${styles.carouselPrev} pnp-btn pnp-btn--ghost`} onClick={prev} aria-label="Previous image">‹</button>
                            <button className={`${styles.carouselNext} pnp-btn pnp-btn--ghost`} onClick={next} aria-label="Next image">›</button>
                        </div>

                        <div className={styles.carouselIndicators}>
                            {thumbnails.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`${styles.carouselIndicator} ${idx === activeIndex ? styles.carouselIndicatorActive : ''}`}
                                    onClick={() => setActiveIndex(idx)}
                                    aria-label={`Show image ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <div className={styles.thumbStrip}>
                            {thumbnails.map((t, idx) => (
                                <button key={t.url + '-thumb-' + idx} className={`${styles.thumbBtn} ${idx === activeIndex ? styles.isActive : ''}`} onClick={() => setActiveIndex(idx)} aria-label={`Thumbnail ${idx + 1}`}>
                                    <img src={t.url} alt={t.alt} />
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}

                <p className={styles.description}>{sample.shortDescription}</p>

                <div className={styles.actions}>
                    <h3>Actions</h3>
                    <div className={styles.actionRow}>
                        <button className={`${styles.actionsButton} pnp-btn pnp-btn--action`} onClick={openGitHub} title="View on GitHub">
                            <Icon icon="github" basePath={baseUrl ? baseUrl.replace(/\/$/, '') : '.'} size={16} />
                            <span className={styles.actionLabel}>View on GitHub</span>
                        </button>
                    </div>
                    <div className={styles.actionRow}>
                        <button className={`${styles.actionsButton} pnp-btn pnp-btn--action`} onClick={download} title="Download as ZIP">
                            <Icon icon="download" basePath={baseUrl ? baseUrl.replace(/\/$/, '') : '.'} size={16} />
                            <span className={styles.actionLabel}>Download as ZIP</span>
                        </button>
                    </div>
                    <div className={styles.actionRow}>
                        <button className={`${styles.actionsButton} pnp-btn pnp-btn--action`} onClick={downloadUsingCli} title="Download using command-line (experimental)">
                            <Icon icon="cli" basePath={baseUrl ? baseUrl.replace(/\/$/, '') : '.'} size={16} />
                            <span className={styles.actionLabel}>Download using command-line (experimental)</span>
                        </button>
                        <button className={`${styles.actionsButton} pnp-btn pnp-btn--ghost`} onClick={copyCli} aria-label="Copy CLI command">
                            Copy command
                        </button>
                        {copied ? <span style={{ color: 'green4' }}>Copied!</span> : null}
                    </div>
                    <div className={styles.cli}>
                        <code className={styles.cliCode} onClick={copyCli} role="button" tabIndex={0}>{cliCommand}</code>
                        {/* clicking the code block will copy to clipboard */}
                    </div>
                </div>

                <div className={styles.authorsList}>
                    <h3>Contributor{(resolvedAuthors && resolvedAuthors.length > 1) ? 's' : ''}</h3>
                    {(resolvedAuthors ?? []).map((a: SampleAuthor, idx: number) => {
                        const gh = githubUrl(a) ?? undefined;
                        return (
                            <div key={`${a.gitHubAccount ?? a.name ?? 'author'}-${idx}`} className={styles.authorRow}>
                                <div className={styles.authorAvatar}>
                                    {a.pictureUrl ? <img src={a.pictureUrl} alt={displayName(a)} loading="lazy" referrerPolicy="no-referrer" /> : <span className={styles.facepileInitials}>{(displayName(a)[0] || '?').toUpperCase()}</span>}
                                </div>
                                {gh ? (
                                    <a className={styles.authorLink} href={gh} target="_blank" rel="noopener">
                                        <div>
                                            <div className={styles.authorName}>{displayName(a)}</div>
                                        </div>
                                    </a>
                                ) : (
                                    <div>
                                        <div className={styles.authorName}>{displayName(a)}</div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Values (Category, SPFx, Technology) - placed below actions */}
                <div className={styles.values}>
                    <h3>Tags</h3>
                    {/* SPFx Version */}
                    <div className={styles.pillValue}>
                        <strong className={styles.pillLabel}>SPFx version:</strong>
                        <div className={styles.pillValueValue}>
                            <span className="pnp-pill">{spfxVersion || 'Unknown'}</span>
                        </div>
                    </div>

                    {/* Technologies */}
                    {techList && techList.length ? (
                        <div className={styles.pillValue}>
                            <strong className={styles.pillLabel}>Technology:</strong>
                            <div className={styles.pillValueValue}>
                                {techList.map((t: string) => {
                                    const k = techKey(t);
                                    const techIcon = techToIcon(k);
                                    const labelText = k === 'other' ? t : techLabel(k);
                                    return (
                                        <span key={t} className="pnp-pill pnp-pill--icon" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                            {/* prefer techIconBasePath provided via props or baseUrl; default to ./tech-icons */}
                                            <Icon icon={techIcon} basePath={baseUrl ? `${baseUrl.replace(/\/$/, '')}/tech-icons` : './tech-icons'} size={16} />
                                            <span>{labelText}</span>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.pillValue}>
                            <strong className={styles.pillLabel}>Technology:</strong>
                            <div className={styles.pillValueValue}>
                                <span className="pnp-pill">None specified</span>
                            </div>
                        </div>
                    )}

                    {/* Category */}
                    {categoriesList && categoriesList.length ? (() => {
                        const primary = categoriesList[0] ?? 'SPFX-WEB-PART';
                        const catLabel = prettyCategory(primary);
                            return (
                            <div className={styles.pillValue}>
                                <strong className={styles.pillLabel}>Category:</strong>
                                <div className={styles.pillValueValue}>
                                    <span className="pnp-pill pnp-pill--icon" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                        <Icon icon={categoryToIcon(primary)} basePath={baseUrl ?? '.'} size={16} />
                                        <span>{catLabel}</span>
                                    </span>
                                </div>
                            </div>
                        );
                    })() : null}
                </div>

        {reactionsSupported ? (
            <div className={styles.likes}>
                <h3>Reactions</h3>
                <LikesPanel sampleName={sample.name || ''} baseUrl={baseUrl} giscusSettings={giscusSettings} />
            </div>
        ) : null}
                {/* Invisible 1x1 visitor stats image for tracking */}
                {visitorStatsSrc ? (
                    <img src={visitorStatsSrc} width={1} height={1} style={{ width: 1, height: 1, opacity: 0, border: 0 }} alt="" aria-hidden="true" />
                ) : null}
            </div>
        </div>
    );
}
