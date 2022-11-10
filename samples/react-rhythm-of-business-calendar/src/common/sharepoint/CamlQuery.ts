export class CamlQuery {
    constructor(
        public readonly caml: string
    ) {
    }

    public static readonly none: CamlQuery = null;

    public static id(id: number) {
        return new CamlQuery(`<Where><Eq><FieldRef Name='ID' /><Value Type='Integer'>${id}</Value></Eq></Where>`);
    }

    public static lookup(column: string, id: number) {
        return new CamlQuery(`<Where><Eq><FieldRef Name='${column}' LookupId='TRUE' /><Value Type='Lookup'>${id}</Value></Eq></Where>`);
    }

    public static and(q1: string, q2: string): string {
        return `<And>${q1}${q2}</And>`;
    }

    public static isnull(column: string): string {
        return `<IsNull><FieldRef Name='${column}' /></IsNull>`;
    }

    public static or(q1: string, q2: string): string {
        return `<Or>${q1}${q2}</Or>`;
    }

    public static where(q: string): string {
        return `<Where>${q}</Where>`;
    }

    public static eq(column: string, val: string, type: string) {
        return `<Eq><FieldRef Name='${column}' /><Value Type='${type}'>${val}</Value></Eq>`;
    }

    public static neq(column: string, val: string, type: string) {
        return `<Neq><FieldRef Name='${column}' /><Value Type='${type}'>${val}</Value></Neq>`;
    }

    public static geq(column: string, val: number, type: string) {
        return `<Geq><FieldRef Name='${column}' /><Value Type='${type}'>${val}</Value></Geq>`;
    }

    public static orderBy(column: string, dir: 'ascending' | 'descending' = 'ascending') {
        return `<OrderBy><FieldRef Name='${column}' Ascending='${dir === 'ascending' ? 'TRUE' : 'FALSE'}' /></OrderBy>`;
    }

    public static leq(column: string, val: number, type: string) {
        return `<Leq><FieldRef Name='${column}' /><Value Type='${type}'>${val}</Value></Leq>`;
    }
}