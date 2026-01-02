import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import type { PnPSample } from "../types/index";
import { Facepile, Icon } from "./index";

export interface SamplePanelProps {
    sample: PnPSample;
    onClose: () => void;
}

export default function SamplePanel({ sample, onClose }: SamplePanelProps) {
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
    const [fetchedMeta, setFetchedMeta] = useState<any | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const download = () => {
        const url = sample.downloadUrl ?? sample.url;
        // Open download in new tab
        window.open(url, "_blank", "noopener");
    };

    const openGitHub = () => {
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
                setFetchError(String(err));
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
        const vp = containerRef.current?.querySelector('.pnp-sample-panel__carousel-viewport') as HTMLElement | null;
        if (!vp) return;

        let startX: number | null = null;
        let dragging = false;

        const onPointerDown = (e: PointerEvent) => {
            // If pointerdown originates from an interactive control (button, link), ignore
            const tgt = e.target as HTMLElement | null;
            if (tgt) {
                const interactive = tgt.closest && (tgt.closest('button, a, [role="button"], .pnp-sample-panel__thumb-btn, .pnp-sample-panel__carousel-prev, .pnp-sample-panel__carousel-next'));
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
    }, [thumbnails.length]);

    // resolve author picture URLs relative to sampleBase as well
    const resolvedAuthors = useMemo(() => {
        const authors = sample.authors ?? [];
        const resolve = (u: unknown) => {
            try {
                const s = String(u ?? '');
                if (!s) return '';
                if (/^https?:|^data:/.test(s)) return s;
                if (sampleBase) return `${sampleBase.replace(/\/$/, '')}/${s.replace(/^\//, '')}`;
                return s;
            } catch {
                return String(u ?? '');
            }
        };
        return authors.map(a => ({ ...a, pictureUrl: a.pictureUrl ? resolve(a.pictureUrl) : a.pictureUrl }));
    }, [sample.authors, sampleBase]);

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
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // If both methods fail, still provide visual feedback (no throw)
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div ref={containerRef} className="pnp-sample-panel" role="dialog" aria-label={`Sample details: ${sample.title}`} tabIndex={-1}>
            <div className="pnp-sample-panel__header">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <h2 style={{ margin: 0 }}>{sample.title}</h2>
                    <Facepile authors={resolvedAuthors} maxVisible={5} size={32} linkToGithub={true} />
                </div>
                <button className="pnp-btn pnp-btn--ghost" onClick={onClose} aria-label="Close">✕</button>
            </div>
            <div className="pnp-sample-panel__body">
                {/* Thumbnail carousel */}
                {thumbnails && thumbnails.length ? (
                    <div className="pnp-sample-panel__carousel">
                        <div className="pnp-sample-panel__carousel-viewport">
                            {thumbnails.map((t, idx) => (
                                <img
                                    key={t.url + idx}
                                    src={t.url}
                                    alt={t.alt}
                                    className={`pnp-sample-panel__thumb ${idx === activeIndex ? 'is-active' : ''}`}
                                />
                            ))}

                            <button className="pnp-sample-panel__carousel-prev pnp-btn pnp-btn--ghost" onClick={prev} aria-label="Previous image">‹</button>
                            <button className="pnp-sample-panel__carousel-next pnp-btn pnp-btn--ghost" onClick={next} aria-label="Next image">›</button>
                        </div>

                        <div className="pnp-sample-panel__carousel-indicators">
                            {thumbnails.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`pnp-sample-panel__carousel-indicator ${idx === activeIndex ? 'is-active' : ''}`}
                                    onClick={() => setActiveIndex(idx)}
                                    aria-label={`Show image ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* thumbnail strip below full preview */}
                        <div className="pnp-sample-panel__thumb-strip">
                            {thumbnails.map((t, idx) => (
                                <button key={t.url + '-thumb-' + idx} className={`pnp-sample-panel__thumb-btn ${idx === activeIndex ? 'is-active' : ''}`} onClick={() => setActiveIndex(idx)} aria-label={`Thumbnail ${idx + 1}`}>
                                    <img src={t.url} alt={t.alt} />
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}

                <p className="pnp-sample-panel__desc">{sample.shortDescription}</p>

                <div className="pnp-sample-panel__meta">
                    {(() => {
                        const createdRaw = fetchedMeta?.creationDate ?? fetchedMeta?.created ?? fetchedMeta?.creationDateTime ?? (sample as any).creationDateTime ?? null;
                        return createdRaw ? (
                            <div>
                                <strong>Created:</strong> {formatDate(createdRaw)}
                            </div>
                        ) : null;
                    })()}
                    <div>
                        <strong>Updated:</strong> {formatDate(sample.updateDateTime ?? fetchedMeta?.updateDateTime)}
                    </div>
                    
                    {fetchError ? (
                        <div style={{ color: 'var(--ms-color-red-6)', marginTop: 8 }}>
                            Failed to load sample metadata
                        </div>
                    ) : null}
                </div>

                <div className="pnp-sample-panel__actions">
                    <div>
                        <button className="pnp-btn pnp-btn--action" onClick={openGitHub} title="View on GitHub">
                            <Icon icon="github" size={16} />
                            <span className="pnp-sample-panel__action-label">View on GitHub</span>
                        </button>
                    </div>
                    <div>
                        <button className="pnp-btn pnp-btn--action" onClick={download} title="Download as ZIP">
                            <Icon icon="download" size={16} />
                            <span className="pnp-sample-panel__action-label">Download as ZIP</span>
                        </button>
                    </div>
                    <div role="button" tabIndex={0} className="pnp-sample-panel__cli-heading" onClick={copyCli} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copyCli(); } }}>
                        <Icon icon="cli" size={18} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div>Download using command-line</div>
                            {copied ? <span style={{ color: 'green4' }}>Copied!</span> : null}
                        </div>
                    </div>
                    <div className="pnp-sample-panel__cli" onClick={copyCli} role="button" tabIndex={0}>
                        <code className="pnp-sample-panel__cli-code">{cliCommand}</code>
                        {/* clicking the block will copy to clipboard */}
                    </div>
                </div>
            </div>
        </div>
    );
}
