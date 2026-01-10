import type { CategoryIcon } from "../../types/index";

type IconPropsBase = {
    size?: number;
    className?: string;
};

type IconSrcProps = IconPropsBase & {
    src: string;
    alt?: string;
};

type IconNamedProps = IconPropsBase & {
    icon: CategoryIcon | string; // svg filename (without .svg)
    basePath?: string;
};

import styles from './Icon.module.css';

export function Icon(props: IconSrcProps | IconNamedProps) {
    const size = props.size ?? 18;

    let src: string;
    if ("src" in props) {
        src = props.src;
    } else {
        const base = (props.basePath ?? "/sp-dev-fx-webparts").replace(/\/$/, "");
        src = `${base}/${props.icon}.svg`;
    }

    return (
        <img
            className={props.className ?? styles.root}
            src={src}
            width={size}
            height={size}
            alt={"src" in props ? (props.alt ?? "") : ""}
            aria-hidden={"src" in props ? false : true}
            loading="lazy"
            decoding="async"
        />
    );
}

export default Icon;
