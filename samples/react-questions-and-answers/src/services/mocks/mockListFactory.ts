import { QuestionsList } from './lists/questionsList';
import { UsersInformationList } from './lists/usersInformationList';
import { LogHelper } from 'utilities';

export class MockListFactory {
    private listMap: BaseList[] = [
        new QuestionsList(),
        new UsersInformationList()
    ];

    public getListItems(listTitle: string): any[] {
        LogHelper.verbose(this.constructor.name, 'getListItems', listTitle);

        let items = this.getItemsForMockList(listTitle);

        let list = this.listMap.filter(l => l.listTitle === listTitle)[0];

        if (list) {
            items = this.getStoredItems(list.listTitle, list.items);
        }
        else {
            LogHelper.error(this.constructor.name, 'getListItems', `List factory not found: [${listTitle}]`);
        }

        if (list && list.lookups !== undefined) {
            for (let lookup of list.lookups) {
                let lookupListItems = this.getItemsForMockList(lookup.lookupListTitle);

                for (let item of items) {
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

    public saveListItems(listTitle: string, items: any[]): void {
        LogHelper.verbose(this.constructor.name, 'saveListItems', listTitle);

        let storageKey = listTitle.split(' ').join('');
        this.storeItems(storageKey, items);
    }

    private getItemsForMockList(listTitle: string): any[] {
        let items: any[] = [];

        let list = this.listMap.filter(l => l.listTitle === listTitle)[0];

        if (list != null) {
            items = this.getStoredItems(list.listTitle, list.items);
        }

        return items;
    }

    private getStoredItems(listTitle: string, defaultItems: any[]): any[] {

        let storageKey = listTitle.split(' ').join('');
        let items: any[] = [];
        let storedData: string | null;
        storedData = localStorage.getItem(storageKey);
        if (storedData !== null) {
            items = JSON.parse(storedData);
        }
        else {
            items = defaultItems;
            this.storeItems(storageKey, items);
        }
        return items;
    }

    private storeItems(storageKey: string, items: any[]): void {
        let storedData = JSON.stringify(items);
        localStorage.setItem(storageKey, storedData);
    }

    private getLookup(item: any, lookupIdProperty: string, lookupListItems: any[]): any {
        if (item[lookupIdProperty] !== undefined) {
            return lookupListItems.filter(i => i.ID === item[lookupIdProperty])[0];
        }
        else {
            return null;
        }
    }

    private getMultiLookup(item: any, lookupIdProperty: string, lookupListItems: any[]): any {
        if (item[lookupIdProperty] !== undefined && item[lookupIdProperty].results !== undefined && item[lookupIdProperty].results instanceof Array) {
            let results: any[] = [];
            for (let id of item[lookupIdProperty].results) {
                let lookupItem = lookupListItems.filter(i => i.ID === id)[0];
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
    items: any[];
    lookups?: Lookup[];
}

export class Lookup {
    public itemKey: string;
    public itemProperty: string;
    public lookupListTitle: string;
    public isMulti?: boolean;
}
