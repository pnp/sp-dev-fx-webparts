export function Pill(props: { label: string; onRemove?: () => void }) {
    const Tag = props.onRemove ? "button" : "span";
    return (
        <Tag
            className="pnp-pill"
            {...(props.onRemove
                ? { type: "button" as const, onClick: props.onRemove }
                : {})}
        >
            {props.label}
            {props.onRemove ? "  ✕" : null}
        </Tag>
    );
}

export default Pill;
