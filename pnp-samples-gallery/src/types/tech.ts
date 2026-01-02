export type TechIcon =
    | "angularjs"
    | "javascript"
    | "jquery"
    | "knockout"
    | "react"
    | "vuejs"
    | "other";

/**
 * Canonical tech key used for facets + filtering (dedupes spelling/casing).
 */
export type TechKey =
    | "angularjs"
    | "javascript"
    | "jquery"
    | "knockout"
    | "react"
    | "vuejs"
    | "other";
export function techKey(raw?: string): TechKey {
    const v = (raw ?? "").trim();
    if (!v) return "other";

    const lower = v.toLowerCase();

    // Canonicalize known variants
    if (lower === "javascript" || lower === "java script" || lower === "js" || lower === "typescript") return "javascript";
    if (lower === "react" || lower === "reactjs" || lower === "react.js") return "react";
    if (lower === "vue" || lower === "vuejs" || lower === "vue.js") return "vuejs";
    if (lower === "angular" || lower === "angularjs" || lower === "angular.js") return "angularjs";
    if (lower === "jquery" || lower === "jQuery".toLowerCase()) return "jquery";
    if (lower === "knockout" || lower === "knockoutjs" || lower === "knockout.js") return "knockout";

    return "other";
}

export function techLabel(key: TechKey): string {
    switch (key) {
        case "angularjs": return "AngularJS";
        case "javascript": return "JavaScript";
        case "jquery": return "jQuery";
        case "knockout": return "Knockout";
        case "react": return "React";
        case "vuejs": return "Vue.js";
        default: return "Other";
    }
}

export function techToIcon(key: TechKey): TechIcon {
    // identical for now, but keeping separate makes it easy to change later
    return key;
}
