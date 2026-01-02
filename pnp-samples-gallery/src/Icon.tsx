export function Icon(props: {
    src: string;
    size?: number;
    className?: string;
}) {
    const size = props.size ?? 18;
    return (
        <img
            className={props.className ?? "pnp-icon"}
            src={props.src}
            width={size}
            height={size}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
        />
    );
}
