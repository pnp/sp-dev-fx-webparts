export interface IOrder {
    id: number;
    orderDate: Date;
    region: Region;
    rep: string;
    item: string;
    units: number;
    unitCost: number;
    total: number;
}

export type Region = "east" | "central" | "west";