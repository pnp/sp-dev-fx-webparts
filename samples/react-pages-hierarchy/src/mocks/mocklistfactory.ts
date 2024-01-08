import { PagesList, UsersInformationList } from './lists';
import { LogHelper } from '@src/utilities';

export class MockListFactory {
    private listMap: BaseList[] = [
        new PagesList(),
        new UsersInformationList()
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getListItems(listTitle: string): any[] {
        listTitle = decodeURI(listTitle);
        LogHelper.verbose(this.constructor.name, 'getListItems', listTitle);

        let items = this.getItemsForMockList(listTitle);

        const list = this.listMap.filter(l => l.listTitle === listTitle)[0];

        if (list) {
            items = this.getStoredItems(list.listTitle, list.items);
        }
        else {
            LogHelper.error(this.constructor.name, 'getListItems', `List factory not found: [${listTitle}]`);
        }

        if (list && list.lookups !== undefined) {
            for (const lookup of list.lookups) {
                const lookupListItems = this.getItemsForMockList(lookup.lookupListTitle);

                for (const item of items) {
                    if (lookup.isMulti !== true) {
                        item[lookup.itemProperty] = this.getLookup(item, lookup.itemKey, lookupListItems);
                    }
                    else {
                        item[lookup.itemProperty] = this.getMultiLookup(item, lookup.itemKey, lookupListItems);
                    }
                }
            }
        }

        return items;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public saveListItems(listTitle: string, items: any[]): void {
        LogHelper.verbose(this.constructor.name, 'saveListItems', listTitle);

        const storageKey = listTitle.split(' ').join('');
        this.storeItems(storageKey, items);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getItemsForMockList(listTitle: string): any[] {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let items: any[] = [];

        const list = this.listMap.filter(l => l.listTitle === listTitle)[0];

        if (list !== null) {
            items = this.getStoredItems(list.listTitle, list.items);
        }

        return items;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getStoredItems(listTitle: string, defaultItems: any[]): any[] {

        const storageKey = listTitle.split(' ').join('');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let items: any[] = [];
        const storedData: string | null = localStorage.getItem(storageKey);
        if (storedData !== null) {
            items = JSON.parse(storedData);
        }
        else {
            items = defaultItems;
            this.storeItems(storageKey, items);
        }
        return items;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private storeItems(storageKey: string, items: any[]): void {
        const storedData = JSON.stringify(items);
        localStorage.setItem(storageKey, storedData);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getLookup(item: any, lookupIdProperty: string, lookupListItems: any[]): any {
        if (item[lookupIdProperty] !== undefined) {
            return lookupListItems.filter(i => i.ID === item[lookupIdProperty])[0];
        }
        else {
            return null;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getMultiLookup(item: any, lookupIdProperty: string, lookupListItems: any[]): any {
        if (item[lookupIdProperty] !== undefined && item[lookupIdProperty].results !== undefined && item[lookupIdProperty].results instanceof Array) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const results: any[] = [];
            for (const id of item[lookupIdProperty].results) {
                const lookupItem = lookupListItems.filter(i => i.ID === id)[0];
                if (lookupItem) {
                    results.push(lookupItem);
                }
            }
            return { results: results };
        }
        else {
            return { results: [] };
        }
    }
}

export interface BaseList {
    listTitle: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[];
    lookups?: Lookup[];
}

export class Lookup {
    public itemKey: string;
    public itemProperty: string;
    public lookupListTitle: string;
    public isMulti?: boolean;
}
