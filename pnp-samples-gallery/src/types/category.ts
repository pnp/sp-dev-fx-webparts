export function prettyCategory(cat: string): string {
    switch (cat) {
        case "SPFX-APPLICATION-EXTENSION":
            return "Application customizer";
        case "SPFX-FIELD-CUSTOMIZER":
        case "SPFX-FIELD-EXTENSION":
            return "Field customizer";
        case "SPFX-FORM-CUSTOMIZER":
        case "SPFX-FORM-EXTENSION":
            return "Form customizer";
        case "SPFX-SEARCH-EXTENSION":
            return "Search query extension";
        case "SPFX-COMMAND-EXTENSION":
        case "SPFX-LISTVIEW-COMMAND-SET":
            return "ListView command set";
        case "SPFX-WEB-PART":
        default:
            return "Web part";
    }
}

export type CategoryIcon =
    | "application"
    | "field"
    | "form"
    | "search"
    | "toolbar"
    | "webpart";

export function categoryToIcon(category: string): CategoryIcon {
    // Adjust these mappings if your taxonomy differs
    switch (category) {
        case "SPFX-APPLICATION-EXTENSION":
            return "application";
        case "SPFX-FIELD-CUSTOMIZER":
            return "field";
        case "SPFX-FORM-CUSTOMIZER":
            return "form";
        case "SPFX-SEARCH-EXTENSION":
            return "search";
        case "SPFX-COMMAND-EXTENSION":
        case "SPFX-LISTVIEW-COMMAND-SET":
            return "toolbar";
        case "SPFX-WEB-PART":
        default:
            return "webpart";
    }
}
