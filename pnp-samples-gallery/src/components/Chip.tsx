// Chip.tsx
import { motion } from "framer-motion";
import React from "react";

export function Chip(props: { label: React.ReactNode; selected: boolean; onClick: () => void; className?: string }) {
    const { label, selected, onClick, className } = props;
    const classes = ["pnp-chip", "pnp-chip--animated"];
    if (className) classes.push(className);

    return (
        <button
            type="button"
            className={classes.join(" ")}
            aria-pressed={selected}
            onClick={onClick}
        >
            {selected ? (
                <motion.span
                    layoutId="active-pill"                 // <-- shared within a group
                    className="pnp-chip__active"
                    transition={{ type: "spring", stiffness: 600, damping: 40, mass: 0.35 }}
                />
            ) : null}

            <span className="pnp-chip__content">{label}</span>
        </button>
    );
}

export default Chip;
