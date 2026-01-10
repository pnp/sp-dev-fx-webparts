import styles from './Pill.module.css';

export function Pill(props: { label: string; onRemove?: () => void; className?: string }) {
    const Tag = props.onRemove ? "button" : "span";
    const classes = [styles.root];
    if (props.className) classes.push(props.className);
    return (
        <Tag
            className={classes.join(' ')}
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
