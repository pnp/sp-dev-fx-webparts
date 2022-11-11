export class SortOption<T> {
    constructor(
        public readonly key: string,
        public readonly title: string,
        public readonly sortAscFn: (a: T, b: T) => number,
        public readonly sortDescFn: (a: T, b: T) => number
    ) { }
}