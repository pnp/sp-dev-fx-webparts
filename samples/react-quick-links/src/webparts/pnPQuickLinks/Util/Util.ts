import { ILink } from "../models/ILink";

export class Util {
    public static GenerateId(): string {
        const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        return uniqueId;
    }

    public static CalculateNewSortWeight(arr: ILink[], newIndex: number, oldIndex?: number):number {
        const links = [...arr].sort((a, b) => a.SortWeight - b.SortWeight);

        if (newIndex === 0)
            return this.GetAverage(null, links[0]?.SortWeight);
        if (newIndex === links.length)
            return this.GetAverage(links[links.length - 1].SortWeight, null);

        if (newIndex < oldIndex)
            return this.GetAverage(links[newIndex - 1]?.SortWeight, links[newIndex]?.SortWeight)
        return this.GetAverage(links[newIndex]?.SortWeight, links[newIndex + 1]?.SortWeight)
    }

    private static GetAverage(prev: number, next: number):number {
        if (prev === null) prev = 0;
        if (next === null) next = 1;

        return (prev + next) / 2
    }
}