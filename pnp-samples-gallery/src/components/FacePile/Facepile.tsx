import type { SampleAuthor } from "../../types/index";

export type FacepileProps = {
    authors?: SampleAuthor[];
    maxVisible?: number; // e.g. 3 or 4
    size?: number; // px
    linkToGithub?: boolean;
    showNames?: boolean;
};

function initials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "?";
    const first = parts[0]?.[0] ?? "?";
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
    return (first + last).toUpperCase();
}

function displayName(a: SampleAuthor): string {
    return (a.name ?? a.gitHubAccount ?? "Unknown").trim();
}

function githubUrl(a: SampleAuthor): string | null {
    return a.gitHubAccount ? `https://github.com/${a.gitHubAccount}` : null;
}

import styles from './Facepile.module.css';

export function Facepile(props: FacepileProps) {
    const max = props.maxVisible ?? 4;
    const size = props.size ?? 28;
    const authors = (props.authors ?? []).filter(a => (a?.name || a?.gitHubAccount || a?.pictureUrl));

    if (authors.length === 0) return null;

    const visible = authors.slice(0, max);
    const overflow = Math.max(0, authors.length - visible.length);

    return (
        <div
            className={`${styles.root} ${props.showNames ? '' : styles.compact}`}
            role="group"
            aria-label={`Authors: ${authors.map(displayName).join(", ")}`}
            style={{ ["--pnp-face-size" as any]: `${size}px` }}
        >
            {visible.map((a, idx) => {
                const name = displayName(a);
                const social = a.social;
                const url = props.linkToGithub ? githubUrl(a) : null;

                const AvatarTag = url ? "a" : "div";
                const avatarProps = url
                    ? { href: url, target: "_blank", rel: "noopener", "aria-label": name, title: name }
                    : { "aria-label": name, title: name };

                if (!props.showNames) {
                    // Preserve original avatar-only layout exactly when showNames is false
                    return (
                        <AvatarTag
                            key={`${a.gitHubAccount ?? a.name ?? "author"}-${idx}`}
                            className={styles.avatar}
                            {...avatarProps}
                        >
                            {a.pictureUrl ? (
                                <img
                                    src={a.pictureUrl}
                                    alt={name}
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <span className={styles.initials}>{initials(name)}</span>
                            )}
                        </AvatarTag>
                    );
                }

                return (
                    <div
                        key={`${a.gitHubAccount ?? a.name ?? "author"}-${idx}`}
                        className={styles.item}
                    >
                        <AvatarTag
                            className={styles.avatar}
                            {...avatarProps}
                        >
                            {a.pictureUrl ? (
                                <img
                                    src={a.pictureUrl}
                                    alt={name}
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <span className={styles.initials}>{initials(name)}</span>
                            )}
                        </AvatarTag>
                        {props.showNames ? (
                            <>
                                <span className={styles.name} title={name}>{name}</span>
                                <span className={styles.socialDivider}>|</span>
                                <span className={styles.social}>{social}</span>
                            </>
                        ) : null}
                    </div>
                );
            })}

            {overflow > 0 ? (
                <div className={styles.more} title={authors.slice(max).map(displayName).join(", ")}>
                    +{overflow}
                </div>
            ) : null}
        </div>
    );
}

export default Facepile;
