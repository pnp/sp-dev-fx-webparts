import React, { useMemo } from "react";
import type { PnPSample } from "../types/index";
import { bestThumb, categoryToIcon, getCategories, metaFirst, prettyCategory, techKey, techLabel, techToIcon } from "../types/index";
import { Icon, Facepile } from "../components";
import { getPendingLike } from "../types/pendingLikes";
import type { LikesJson } from "../types/likes";

export interface SampleCardProps {
    sample: PnPSample;
    iconBasePath?: string | undefined;
    techIconBasePath?: string | undefined;
    muuriRef?: React.MutableRefObject<any>;
    onOpen?: (sample: PnPSample) => void;
    likesData?: LikesJson | null;
    pendingLikesVersion?: number;
    reactionsSupported?: boolean;
    config?: Record<string, unknown>;
}

export function SampleCard({ sample: s, iconBasePath, techIconBasePath, muuriRef, onOpen, likesData, pendingLikesVersion, reactionsSupported = true }: SampleCardProps) {
    const thumb = bestThumb(s);
    const spfxBucket = (metaFirst(s, "SPFX-VERSION") as string) ?? "";
    const tech = techKey(metaFirst(s, "CLIENT-SIDE-DEV")) ?? "";
    const cats = getCategories(s);

    const techBase = (techIconBasePath ?? "/sp-dev-fx-webparts/tech-icons").replace(/\/$/, "");
    const techText = techLabel(tech);
    const techSrc = `${techBase}/${techToIcon(tech)}.svg`;

    const primaryCat = cats[0] ?? "SPFX-WEB-PART";
    const catLabel = prettyCategory(primaryCat);

    const isMobile = typeof window !== 'undefined' ? window.matchMedia('(max-width:640px)').matches : false;
    const anchorRef = React.useRef<HTMLElement | null>(null);

    const pending = useMemo(() => reactionsSupported ? getPendingLike(s.name) : null, [s.name, pendingLikesVersion, reactionsSupported]);

    const baseCount = useMemo(() => {
        if (!reactionsSupported) return 0;
        try {
            return (likesData?.likes?.[s.name]?.count) ?? 0;
        } catch {
            return 0;
        }
    }, [likesData, s.name, reactionsSupported]);

    const generatedAt = likesData?.generatedAt ? new Date(likesData.generatedAt) : null;

    const displayedCount = useMemo(() => {
        if (pending && pending.likedAt) {
            const likedAt = new Date(pending.likedAt);
            if (!generatedAt || likedAt > generatedAt) return baseCount + 1;
        }
        return baseCount;
    }, [pending, generatedAt, baseCount]);

    const isLiked = !!pending;

    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        const isMouse = 'button' in e;
        const isLeft = isMouse ? (e as React.MouseEvent).button === 0 : false;
        const hasModifier = ('ctrlKey' in e && e.ctrlKey) || ('metaKey' in e && e.metaKey) || ('shiftKey' in e && e.shiftKey) || ('altKey' in e && e.altKey);
        if (isLeft && !hasModifier) {
            if (isMobile) {
                e.preventDefault();
                e.stopPropagation();

                // Prefer in-app panel when possible
                if (onOpen) {
                    try {
                        onOpen(s);
                    } catch (err) {
                        console.error('[SampleCard] onOpen failed', err);
                        if (s.url) window.location.href = s.url;
                    }
                    return;
                }

                // Fallback: open URL in new tab/window
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
        <article className="pnp-card" aria-label={s.title}>
            {thumb ? (
                <figure className="pnp-card__thumb-figure">
                    <img
                        className="pnp-card__thumb"
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
                <figure className="pnp-card__thumb-figure">
                    <img
                        className="pnp-card__thumb"
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

            <div className="pnp-card__meta">
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

            <div className="pnp-card__body">
                <h2 className="pnp-card__title">{s.title}</h2>
                <Facepile authors={s.authors} maxVisible={4} size={28} linkToGithub={false} />

            </div>
            <div className="pnp-card__footer">
                <div className="pnp-card__footer-left">
                    <div className="pnp-card__date">
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

                </div>

                <div className="pnp-card__footer-right" aria-hidden>
                    {
                        // Accessible label: indicate total reactions and whether the viewer has reacted
                    }
                    {reactionsSupported ? (
                        <span
                            className={`pnp-card__likes ${isLiked ? 'pnp-card__likes--active' : ''}`}
                            title={isLiked ? `${displayedCount} total reaction${displayedCount === 1 ? '' : 's'} — you reacted` : `${displayedCount} total reaction${displayedCount === 1 ? '' : 's'}`}
                            aria-label={isLiked ? `You reacted. ${displayedCount} total reaction${displayedCount === 1 ? '' : 's'}` : `${displayedCount} total reaction${displayedCount === 1 ? '' : 's'}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" className="pnp-card__likes-icon" role="img" aria-hidden="true">
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
                            </svg>
                            <span className="pnp-card__likes-count">{displayedCount > 0 ? displayedCount.toLocaleString() : null}</span>
                        </span>
                    ) : null}
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
