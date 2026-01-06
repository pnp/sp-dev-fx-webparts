import React from "react";
import Chip from "./Chip";

type FacetGroupProps<T extends string> = {
    id?: string;
    label: string;
    value: T | null;
    options: T[];
    disabledOptions?: Set<T>;
    renderLabel?: (opt: T) => React.ReactNode;
    mobile?: boolean;
    labelText?: (opt: T) => string;
    onChange: (value: T | null) => void;
};

export function FacetGroup<T extends string>({ label, value, options, renderLabel, onChange, mobile, labelText, disabledOptions }: FacetGroupProps<T>) {
    if (mobile) {
        return (
            <div className="pnp-filter-group">
                <label className="pnp-filter-group__title" htmlFor={`facet-${label}`}>{label}</label>
                <div>
                    <select
                        id={`facet-${label}`}
                        className="pnp-filter-select"
                        value={value ?? "__all__"}
                        onChange={(e) => {
                            const v = e.currentTarget.value;
                            onChange(v === "__all__" ? null : (v as T));
                        }}
                    >
                        <option value="__all__">All</option>
                        {options.map(opt => (
                            <option key={opt} value={opt} disabled={disabledOptions?.has(opt)} title={disabledOptions?.has(opt) ? "Disabled: selecting this option would yield no results with the current filters" : undefined}>{labelText ? labelText(opt) : (typeof renderLabel === 'function' ? (typeof renderLabel(opt) === 'string' ? renderLabel(opt) : String(opt)) : opt)}</option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }

    return (
        <div className="pnp-filter-group">
            <h3 className="pnp-filter-group__title">{label}</h3>
            <div className="pnp-chipset" aria-label={`Filter by ${label}`}>
                <Chip label={"All"} selected={value === null} onClick={() => onChange(null)} />

                {options.map(opt => (
                    <Chip
                        key={opt}
                        label={renderLabel ? renderLabel(opt) : opt}
                        selected={value === opt}
                        onClick={() => onChange(opt)}
                        disabled={disabledOptions?.has(opt)}
                        // title is provided already by Chip when disabled, but pass it explicitly for non-button label nodes
                    />
                ))}
            </div>
        </div>
    );
}

export default FacetGroup;
