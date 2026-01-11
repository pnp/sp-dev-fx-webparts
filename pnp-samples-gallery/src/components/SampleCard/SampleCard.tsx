import React, { useEffect, useState } from "react";
import type { PnPSample } from "../../types/index";
import { bestThumb, categoryToIcon, getCategories, metaFirst, prettyCategory, techKey, techLabel, techToIcon } from "../../types/index";
import { Icon, Facepile } from "../";
import { readOverrideFor, subscribe } from "../../utils/likesOverrides";
import styles from './SampleCard.module.css';

export interface SampleCardProps {
    sample: PnPSample;
    iconBasePath?: string | undefined;
    techIconBasePath?: string | undefined;
    muuriRef?: React.MutableRefObject<any>;
    onOpen?: (sample: PnPSample) => void;
    reactionsSupported?: boolean;
    config?: Record<string, unknown>;
}
export function SampleCard({ sample: s, iconBasePath, techIconBasePath, muuriRef, onOpen, reactionsSupported = true }: SampleCardProps) {
    const thumb = bestThumb(s);
    const spfxBucket = (metaFirst(s, "SPFX-VERSION") as string) ?? "";
    const tech = techKey(metaFirst(s, "CLIENT-SIDE-DEV")) ?? "";
    const cats = getCategories(s);

    const techBase = (techIconBasePath ?? "/sp-dev-fx-webparts").replace(/\/$/, "");
    const techText = techLabel(tech);
    const techSrc = `${techBase}/${techToIcon(tech)}.svg`;

    const primaryCat = cats[0] ?? "SPFX-WEB-PART";
    const catLabel = prettyCategory(primaryCat);

    const isMobile = typeof window !== 'undefined' ? window.matchMedia('(max-width:640px)').matches : false;
    const anchorRef = React.useRef<HTMLElement | null>(null);

    const [displayedCount, setDisplayedCount] = useState<number>(() => {
        if (!reactionsSupported) return 0;
        try {
            const override = readOverrideFor(s.name);
            const sampleTotal = (s as any)?.totalReactions ?? (s as any)?.reactionsTotal;
            const base = (override && typeof override.count === 'number') ? override.count : (typeof sampleTotal === 'number' ? sampleTotal : 0);
            // consider pending like/unlike
            const pending = (override as any)?.pendingLiked;
            if (pending === true) return base + 1;
            if (pending === false) return Math.max(0, base - 1);
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
            return !!((s as any)?.userHasReactions);
        } catch {
            return !!((s as any)?.userHasReactions);
        }
    });

    useEffect(() => {
        if (!reactionsSupported) return;
        const unsub = subscribe((sample) => {
            try {
                if (sample && sample !== s.name) return;
                const override = readOverrideFor(s.name) as any;
                if (override) {
                    const sampleTotal = (s as any)?.totalReactions ?? (s as any)?.reactionsTotal;
                    const base = (typeof override.count === 'number') ? override.count : (typeof sampleTotal === 'number' ? sampleTotal : 0);
                    if (typeof override.pendingLiked === 'boolean') {
                        if (override.pendingLiked === true) setDisplayedCount(base + 1);
                        else setDisplayedCount(Math.max(0, base - 1));
                    } else {
                        if (typeof override.count === 'number') setDisplayedCount(override.count);
                        else setDisplayedCount(typeof sampleTotal === 'number' ? sampleTotal : 0);
                    }

                    if (typeof override.pendingLiked === 'boolean') setIsLiked(override.pendingLiked);
                    else if (typeof override.viewerReacted === 'boolean') setIsLiked(override.viewerReacted);
                } else {
                    const sampleTotal = (s as any)?.totalReactions ?? (s as any)?.reactionsTotal;
                    setDisplayedCount(typeof sampleTotal === 'number' ? sampleTotal : 0);
                    setIsLiked(!!((s as any)?.userHasReactions));
                }
            } catch {
                // ignore
            }
        });
        return unsub;
    }, [s, reactionsSupported]);

    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        const isMouse = 'button' in e;
        const isLeft = isMouse ? (e as React.MouseEvent).button === 0 : false;
        const hasModifier = ('ctrlKey' in e && (e as any).ctrlKey) || ('metaKey' in e && (e as any).metaKey) || ('shiftKey' in e && (e as any).shiftKey) || ('altKey' in e && (e as any).altKey);
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
                                g.refreshItems().layout();
                            }
                        }}
                    />
                </figure>
            ) : (
                <figure className={styles.thumbFigure}>
                    <img
                        className={styles.thumb}
                        src={'/sp-dev-fx-webparts/_nopreview.png'}
                        alt={"No preview available"}
                        loading="lazy"
                        onLoad={() => {
                            const g = muuriRef?.current;
                            if (g) {
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
                        basePath={iconBasePath}
                        size={16}
                        className="pnp-icon"
                    />
                </span>
            </div>

<div className={styles.container}>
            <div className={styles.body}>
                <h2 className={`pnp-card__title ${styles.title}`}>{s.title}</h2>
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

                <div className="pnp-card__footer-right" aria-hidden>
                    {
                        // Accessible label: indicate total reactions and whether the viewer has reacted
                    }
                    {reactionsSupported ? (
                        <span
                            className={`${styles.likes} ${isLiked ? styles.likesActive : ''}`}
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
        >
            <div className="pnp-sample-item-content">
                {isMobile ? (
                    <div ref={(el) => { anchorRef.current = el as HTMLElement | null; }} className="pnp-card" role="link" tabIndex={0} onClick={handleClick} onKeyDown={handleKeyDown}>
                        {cardInner}
                    </div>
                ) : (
                    <a ref={(el) => { anchorRef.current = el as HTMLElement | null; }} className="pnp-card-link" href={s.url} rel="noopener" onClick={handleClick} target={isMobile ? "_blank" : undefined}>
                        {cardInner}
                    </a>
                )}
            </div>
        </div>
    );
}

export default SampleCard;
