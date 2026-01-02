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

    const handleClick = (e: React.MouseEvent) => {
        if (!onOpen) return;

        // Only intercept plain left-clicks without modifier keys
        // let other clicks (middle, ctrl/cmd, shift) behave normally
        const isLeft = (e.button === 0);
        const hasModifier = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;
        if (isLeft && !hasModifier) {
            e.preventDefault();
            onOpen(s);
        }
    };

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
                    <a className="pnp-card" href={s.url} rel="noopener" onClick={handleClick}>
                    {thumb ? (
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
                    ) : (
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

                    <h3 className="pnp-card__title">{s.title}</h3>
                    {/* <div className="pnp-card__desc">{s.shortDescription}</div> */}

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

                </a>
            </div>
        </div>
    );
}

export default SampleCard;
