import React, { useEffect, useState } from "react";
import type { PnPSample } from "../../types/index";
import { bestThumb, categoryToIcon, getCategories, metaFirst, prettyCategory, techKey, techLabel, techToIcon } from "../../types/index";
import { Icon, Facepile } from "../";
import { readOverrideFor, subscribe } from "../../utils/likesOverrides";
import styles from './SampleCard.module.css';

export interface SampleCardProps {
    sample: PnPSample;
    basePath?: string;
    muuriRef?: React.MutableRefObject<any>;
    onOpen?: (sample: PnPSample) => void;
    reactionsSupported?: boolean;
    config?: Record<string, unknown>;
}
export function SampleCard({ sample: s, basePath, muuriRef, onOpen, reactionsSupported = true }: SampleCardProps) {
    const thumb = bestThumb(s);
    const spfxBucket = (metaFirst(s, "SPFX-VERSION") as string) ?? "";
    const tech = techKey(metaFirst(s, "CLIENT-SIDE-DEV")) ?? "";
    const cats = getCategories(s);

    const techText = techLabel(tech);
    const resolvedBase = (basePath ?? '/').replace(/\/$/, '');
    const techSrc = `${resolvedBase}/${techToIcon(tech)}.svg`;

    const primaryCat = cats[0] ?? "SPFX-WEB-PART";
    const catLabel = prettyCategory(primaryCat);

    const isMobile = typeof window !== 'undefined' ? window.matchMedia('(max-width:640px)').matches : false;
    const anchorRef = React.useRef<HTMLElement | null>(null);
    const titleId = `pnp-card-title-${String(s.name ?? '').replace(/[^a-z0-9-_]/gi, '-')}`;

    const [displayedCount, setDisplayedCount] = useState<number>(() => {
        if (!reactionsSupported) return 0;
        try {
            const override = readOverrideFor(s.name);
            const sampleTotal = s.totalReactions;
            const hasOverrideCount = override && typeof override.count === "number";
            const base = hasOverrideCount
                ? (override!.count as number)
                : (typeof sampleTotal === "number" ? sampleTotal : 0);

            // Only apply the pending delta when we DON'T yet have an authoritative override.count.
            // If override.count exists, it already reflects live giscus totals.
            if (!hasOverrideCount) {
                const pending = (override as any)?.pendingLiked;
                if (pending === true) return base + 1;
                if (pending === false) return Math.max(0, base - 1);
            }

            return base;

        } catch {
            return 0;
        }
    });

    // Visual liked indicator should reflect whether the current session user has reacted.
    // Prefer overrides when present.
    const [isLiked, setIsLiked] = useState<boolean>(() => {
        try {
            const override = readOverrideFor(s.name) as any;
            if (override) {
                if (typeof override.pendingLiked === 'boolean') return override.pendingLiked;
                if (typeof override.viewerReacted === 'boolean') return override.viewerReacted;
            }
            return !!(s.userHasReactions);
        } catch {
            return !!(s.userHasReactions);
        }
    });

    useEffect(() => {
        if (!reactionsSupported) return;
        const unsub = subscribe((sample) => {
            try {
                if (sample && sample !== s.name) return;
                const override = readOverrideFor(s.name) as any;
                if (override) {
                    const sampleTotal = s.totalReactions;
                    const hasOverrideCount = typeof override.count === "number";
                    const base = hasOverrideCount
                        ? (override.count as number)
                        : (typeof sampleTotal === "number" ? sampleTotal : 0);

                    // Only apply pending delta when override.count is NOT available yet.
                    if (!hasOverrideCount && typeof override.pendingLiked === "boolean") {
                        if (override.pendingLiked === true) setDisplayedCount(base + 1);
                        else setDisplayedCount(Math.max(0, base - 1));
                    } else {
                        setDisplayedCount(base);
                    }


                    if (typeof override.pendingLiked === 'boolean') setIsLiked(override.pendingLiked);
                    else if (typeof override.viewerReacted === 'boolean') setIsLiked(override.viewerReacted);
                } else {
                    const sampleTotal = s.totalReactions;
                    setDisplayedCount(typeof sampleTotal === 'number' ? sampleTotal : 0);
                    setIsLiked(!!(s.userHasReactions));
                }
            } catch {
                // ignore
            }
        });
        return unsub;
    }, [s, reactionsSupported]);

    // Ensure component state resyncs when props change (e.g., after reconcile or feed refresh)
    useEffect(() => {
        try {
            const override = readOverrideFor(s.name);
            if (override) {
                const sampleTotal = s.totalReactions;
                const hasOverrideCount = typeof override.count === 'number';
                const base = hasOverrideCount ? (override.count as number) : (typeof sampleTotal === 'number' ? sampleTotal : 0);

                if (!hasOverrideCount && typeof override.pendingLiked === 'boolean') {
                    setDisplayedCount(override.pendingLiked ? base + 1 : Math.max(0, base - 1));
                } else {
                    setDisplayedCount(base);
                }

                if (typeof override.pendingLiked === 'boolean') setIsLiked(override.pendingLiked);
                else if (typeof override.viewerReacted === 'boolean') setIsLiked(override.viewerReacted);
            } else {
                const sampleTotal = s.totalReactions;
                setDisplayedCount(typeof sampleTotal === 'number' ? sampleTotal : 0);
                setIsLiked(!!s.userHasReactions);
            }
        } catch {
            // ignore
        }
    }, [s.name, s.totalReactions, s.userHasReactions]);

    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        const isMouse = 'button' in e;
        const isLeft = isMouse ? (e as React.MouseEvent).button === 0 : false;
        const hasModifier = ('ctrlKey' in e && (e as any).ctrlKey) || ('metaKey' in e && (e as any).metaKey) || ('shiftKey' in e && (e as any).shiftKey) || ('altKey' in e && (e as any).altKey);

        // Modifier-click behavior: if the user ctrl/cmd/shift/alt clicks and the
        // sample has a URL, open it in a new tab instead of opening the panel.
        if (hasModifier) {
            try {
                const el = (e.currentTarget as HTMLElement | null);
                const tag = el?.tagName?.toLowerCase() ?? '';

                // If the clickable element is an anchor, allow the browser to handle
                // the modifier-click (it will open in a new tab). For non-anchor
                // elements (buttons), explicitly open the link in a new tab.
                if (s.url) {
                    if (tag === 'a') {
                        // Do nothing — let the default anchor behavior occur
                        return;
                    }

                    try {
                        window.open(s.url, '_blank', 'noopener,noreferrer');
                    } catch {
                        window.location.href = s.url;
                    }
                    return;
                }
            } catch {
                // ignore and continue
            }
        }

        if (isLeft && !hasModifier) {
            if (isMobile) {
                e.preventDefault();
                e.stopPropagation();

                if (onOpen) {
                    try {
                        onOpen(s);
                    } catch (err) {
                        console.error('[SampleCard] onOpen failed', err);
                        if (s.url) window.location.href = s.url;
                    }
                    return;
                }

                if (s.url) {
                    try {
                        const winName = `_pnp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
                        window.open(s.url, winName, "noopener,noreferrer");
                    } catch {
                        window.location.href = s.url;
                    }
                }
                return;
            }

            if (!onOpen) return;
            e.preventDefault();
            onOpen(s);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (isMobile && (e.key === 'Enter' || e.key === ' ')) {
            handleClick(e as unknown as React.MouseEvent);
        }
    };

    const cardInner = (
        <article className={styles.root} aria-label={s.title}>
            {thumb ? (
                <figure className={styles.thumbFigure}>
                    <img
                        className={styles.thumb}
                        src={thumb.url}
                        alt={thumb.alt ?? "Sample thumbnail"}
                        loading="lazy"
                        onLoad={() => {
                            const g = muuriRef?.current;
                            if (g) {
                                    // console.debug('[SampleCard] image onLoad -> refreshItems().layout()', { id: s.name });
                                    g.refreshItems().layout();
                                }
                        }}
                    />
                </figure>
            ) : (
                <figure className={styles.thumbFigure}>
                    <img
                        className={styles.thumb}
                            src={`${basePath}/spfx-samples-black.svg`}
                        alt={"No preview available"}
                        loading="lazy"
                        onLoad={() => {
                            const g = muuriRef?.current;
                            if (g) {
                                    // console.debug('[SampleCard] fallback image onLoad -> refreshItems().layout()', { id: s.name });
                                    g.refreshItems().layout();
                                }
                        }}
                    />
                </figure>
            )}

            <div className={styles.meta}>
                {metaFirst(s, "SPFX-VERSION") ? <span className="pnp-pill" title={`SPFx ${metaFirst(s, "SPFX-VERSION")}`}>{metaFirst(s, "SPFX-VERSION")}</span> : null}
                <span className="pnp-pill pnp-pill--icon" title={techText} aria-label={techText}>
                    <Icon src={techSrc} size={16} />
                </span>
                <span
                    className="pnp-pill pnp-pill--icon"
                    title={catLabel}
                    aria-label={catLabel}
                >
                    <Icon
                        icon={categoryToIcon(primaryCat)}
                        basePath={basePath}
                        size={16}
                        className="pnp-icon"
                    />
                </span>
            </div>

<div className={styles.container}>
            <div className={styles.body}>
                <h2 id={titleId} className={`pnp-card__title ${styles.title}`}>{s.title}</h2>
                <Facepile authors={s.authors} maxVisible={4} size={28} linkToGithub={false} />

            </div>
            <div className={styles.footer}>
                <div className={`${styles.footerLeft} ${styles.date}`}>
                    {(() => {
                        const raw = s.updateDateTime ?? "";
                        if (!raw) return null;
                        const d = new Date(raw);
                        if (isNaN(d.getTime())) return null;
                        return (
                            <time dateTime={d.toISOString()} title={d.toUTCString()}>
                                {d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                            </time>
                        );
                    })()}
                </div>

                <div className={styles.footerRight} aria-hidden>
                    {
                        // Accessible label: indicate total reactions and whether the viewer has reacted
                    }
                    {reactionsSupported ? (
                        <span
                            className={`${styles.likes} ${isLiked ? styles.likesActive : ''}`.trim()}
                            title={isLiked ? `${displayedCount} total reaction${displayedCount === 1 ? '' : 's'} — you reacted` : `${displayedCount} total reaction${displayedCount === 1 ? '' : 's'}`}
                            aria-label={isLiked ? `You reacted. ${displayedCount} total reaction${displayedCount === 1 ? '' : 's'}` : `${displayedCount} total reaction${displayedCount === 1 ? '' : 's'}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" className={styles.likesIcon} role="img" aria-hidden="true">
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
                            </svg>
                            <span className={styles.likesCount}>{displayedCount > 0 ? displayedCount.toLocaleString() : null}</span>
                        </span>
                    ) : null}
                </div>
            </div>
            </div>
        </article>
    );

    return (
        <div
            key={s.name}
            className="pnp-sample-item"
            data-id={s.name}
            data-title={s.title}
            data-spfx={spfxBucket}
            data-tech={tech}
            data-categories={cats.join("|")}
            data-date={(s.updateDateTime ?? "")}
            data-total-reactions={(displayedCount ?? 0)}
        >
            <div className="pnp-sample-item-content">
                {isMobile ? (
                    <button ref={(el) => { anchorRef.current = el as HTMLElement | null; }} className="pnp-card" type="button" aria-labelledby={titleId} onClick={handleClick} onKeyDown={handleKeyDown}>
                        {cardInner}
                    </button>
                ) : (
                    // Desktop: prefer to open the panel via onOpen (button) when provided; otherwise fall back to link
                    onOpen ? (
                        <button ref={(el) => { anchorRef.current = el as HTMLElement | null; }} className="pnp-card" type="button" aria-labelledby={titleId} onClick={handleClick} onKeyDown={handleKeyDown}>
                            {cardInner}
                        </button>
                    ) : (
                        <a ref={(el) => { anchorRef.current = el as HTMLElement | null; }} className="pnp-card-link" href={s.url} rel="noopener" onClick={handleClick} target={isMobile ? "_blank" : undefined}>
                            {cardInner}
                        </a>
                    )
                )}
            </div>
        </div>
    );
}

export default SampleCard;
