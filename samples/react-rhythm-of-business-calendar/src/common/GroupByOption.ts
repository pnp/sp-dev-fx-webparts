export class GroupByOption<T> {
    constructor(
        public readonly key: string,
        public readonly title: string,
        public readonly groupByKey: (item: T) => any
    ) { }
}