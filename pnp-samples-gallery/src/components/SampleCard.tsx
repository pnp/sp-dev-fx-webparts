import React from "react";
import type { PnPSample } from "../types/index";
import { bestThumb, categoryToIcon, getCategories, metaFirst, prettyCategory, techKey, techLabel, techToIcon } from "../types/index";
import { Icon, Facepile } from "../components";

export interface SampleCardProps {
    sample: PnPSample;
    iconBasePath?: string | undefined;
    techIconBasePath?: string | undefined;
    muuriRef?: React.MutableRefObject<any>;
    onOpen?: (sample: PnPSample) => void;
}

export function SampleCard({ sample: s, iconBasePath, techIconBasePath, muuriRef, onOpen }: SampleCardProps) {
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

    React.useEffect(() => {
        try {
            const el = anchorRef.current;
            if (el) {
                console.debug('[SampleCard] mounted', { name: s.name, href: el.getAttribute('href'), dataset: { id: el.closest('.pnp-sample-item')?.getAttribute('data-id') } });
            }
        } catch {
            // ignore
        }
    }, [s.name]);
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
                        // Fall back to opening the URL
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
        // Treat Enter and Space as activation for non-anchor mobile element
        if (isMobile && (e.key === 'Enter' || e.key === ' ')) {
            // synthesize a click-like event
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

            <div className="pnp-card__footer">
                <Facepile authors={s.authors} maxVisible={4} size={28} linkToGithub={false} />

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
