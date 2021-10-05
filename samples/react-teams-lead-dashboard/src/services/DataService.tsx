import * as strings from "LeadAssistDashboardWebPartStrings";
import { Providers } from "@microsoft/mgt-spfx";
import { IList, sp } from "@pnp/sp/presets/all";
import { IListField } from "./IListField";
import { IValueListItem } from "./IValueListItem";
import { ISaleListItem } from "./ISaleListItem";

export default class DataService {
    // Lists names
    public static ActivityCallsListName: string = strings.ActivityCallsListName;
    public static ActivityEmailsListName: string = strings.ActivityEmailsListName;
    public static ActivityTextsListName: string = strings.ActivityTextsListName;
    public static ProgressListName: string = strings.ProgressListName;
    public static RecentlyDoneSalesContractsListName: string = strings.RecentlyDoneSalesContractsListName;
    // Fields titles
    public static FieldTitleName: string = "Title";
    public static FieldValueName: string = "DemoValue";
    public static FieldDescriptionName: string = "DemoDescription";
    public static FieldMonthName: string = "DemoMonth";
    public static FieldGroupName: string = "Demo Group";
    // Fields types
    public static FieldTypeText: string = "SP.FieldText";
    public static FieldTypeTextKindId: number = 2;
    public static FieldTypeNumber: string = "SP.FieldNumber";
    public static FieldTypeNumberKindId: number = 9;

    public static MonthNames: string[] = [ strings.January, strings.February, strings.March, strings.April, strings.May, strings.June, strings.July ];

    // Value field definition
    private static ValueField: IListField = {
        fieldName: DataService.FieldValueName,
        fieldType: DataService.FieldTypeNumber,
        fieldTypeKindId: DataService.FieldTypeNumberKindId
    };

    // Description field definition
    private static DescriptionField: IListField = {
        fieldName: DataService.FieldDescriptionName,
        fieldType: DataService.FieldTypeText,
        fieldTypeKindId: DataService.FieldTypeTextKindId
    };

    // Month field definition
    private static MonthField: IListField = {
        fieldName: DataService.FieldMonthName,
        fieldType: DataService.FieldTypeText,
        fieldTypeKindId: DataService.FieldTypeTextKindId
    };

    /**
     * Format the specific date in a short locale string
     * @param date The date to be formatted
     * @returns The formatted date in string format
     */
    public static getTime(date: Date): string {
        const timeOptions = {
            timeStyle: 'short',
            hour12: true
        };

        return date.toLocaleTimeString([], timeOptions);
    }

    /**
     * Format the specific date in a short locale string
     * @param date The date to be formatted
     * @returns The formatted date in string format
     */
    public static getDate(date: Date): string {
        return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    }

    /**
     * Generate an array of number for demo data
     * @param length Length of the numeric array
     * @returns Numeric array of demo data
     */
    public static generateNumericDemoData(length: number): number[] {
        let demoData = [...Array(length)].map(() => {
            let n = Math.floor(Math.random() * 9);

            return n;
        });
        
        return demoData;
    }
    
    /**
     * Generate the demo fields and lists
     */
    public static async generateDemoLists(): Promise<void> {        
        if (confirm(strings.ConfirmCreateDemoLists) == true) {
            // Ensure fields
            await this.ensureWebField(DataService.FieldValueName, DataService.FieldTypeNumber, DataService.FieldTypeNumberKindId);
            await this.ensureWebField(DataService.FieldDescriptionName, DataService.FieldTypeText, DataService.FieldTypeTextKindId);
            await this.ensureWebField(DataService.FieldMonthName, DataService.FieldTypeText, DataService.FieldTypeTextKindId);

            // Ensure lists
            await this.ensureList(DataService.ActivityCallsListName, [this.ValueField]);
            await this.ensureList(DataService.ActivityEmailsListName, [this.ValueField]);
            await this.ensureList(DataService.ActivityTextsListName, [this.ValueField]);
            await this.ensureList(DataService.ProgressListName, [this.ValueField]);
            await this.ensureList(DataService.RecentlyDoneSalesContractsListName, [this.DescriptionField]);
            
            alert(strings.DemoListsCreated);
        }
    }

    /**
     * Generate the demo data for the SharePoint lists
     */
    public static async generateListsDemoData(): Promise<void> {
        if (confirm(strings.ConfirmAddDemoData) == true) {
            // Get all the lists references
            const activityCallsList = await sp.web.lists.getByTitle(DataService.ActivityCallsListName);
            const activityEmailsList = await sp.web.lists.getByTitle(DataService.ActivityEmailsListName);
            const activityTextsList = await sp.web.lists.getByTitle(DataService.ActivityTextsListName);
            const progressList = await sp.web.lists.getByTitle(DataService.ProgressListName);
            const recentContractsList = await sp.web.lists.getByTitle(DataService.RecentlyDoneSalesContractsListName);

            // Generate sales products list demo data
            DataService.generateNumericDemoData(7).forEach((p, i) => {
                activityCallsList.items.add({
                    Title: strings.DemoActivityCallTitle + " " + i,
                    DemoValue: p * 10
                });
            });

            // Generate sales services list demo data
            DataService.generateNumericDemoData(7).forEach((p, i) => {
                activityEmailsList.items.add({
                    Title: strings.DemoActivityEmailTitle + " " + i,
                    DemoValue: p * 10
                });
            });

            // Generate activity text list demo data
            DataService.generateNumericDemoData(7).forEach((p, i) => {
                activityTextsList.items.add({
                    Title: strings.DemoActivityTextTitle + " " + i,
                    DemoValue: p * 10
                });
            });

            // Generate progress list demo data
            DataService.generateNumericDemoData(9).forEach(p => {
                progressList.items.add({
                    Title: p.toString(),
                    DemoValue: p
                });
            });

            // Generate recently list demo data
            [...Array(5)].map((v, i) => {
                return {
                    title: strings.DemoDocumentTitle + " " + i,
                    description: strings.DemoDocumentDescription + " " + i
                };
            }).forEach(r => {
                recentContractsList.items.add({
                    Title: r.title,
                    DemoDescription: r.description
                });
            });

            alert(strings.DemoDataGenerated);
        }
    }

    /**
     * Generate demo data using Graph
     */
    public static async generateGraphDemoData(): Promise<void> {
        if (confirm(strings.ConfirmAddGraphDemoData) == true) {
            let provider = Providers.globalProvider;
            if (provider) {
                // Get the Graph client
                let graphClient = provider.graph.client;

                // Add new task
                let taskLists = await graphClient.api("me/todo/lists").get();

                // Simple task
                await graphClient.api(`me/todo/lists/${taskLists.value[0].id}/tasks`).create({
                    "title": strings.DemoEventTitle,
                    "linkedResources": [
                    {
                        "webUrl": "https://aka.ms/m365pnp",
                        "applicationName": strings.DemoApplicationName,
                        "displayName": strings.DemoDisplayName
                    }
                    ]
                });

                // Task with due date
                let taskDate = new Date();
                taskDate.setDate(taskDate.getDate() + 1);
                await graphClient.api(`me/todo/lists/${taskLists.value[0].id}/tasks`).create({
                    "title": strings.DemoTaskWithDateTitle,
                    "dueDateTime": {
                        "dateTime": taskDate.toISOString(),
                        "timeZone": "UTC"
                    },
                    "linkedResources":[
                    {
                        "webUrl": "https://aka.ms/m365pnp",
                        "applicationName": strings.DemoApplicationName,
                        "displayName": strings.DemoDisplayName
                    }
                    ]
                });

                // Start and end date for events
                let startDate = new Date();
                let endDate = new Date();

                // Set the start and end date to tomorrow
                startDate.setDate(startDate.getDate() + 1);
                endDate.setDate(endDate.getDate() + 1);
                // Add one hour to the end date        
                endDate.setHours(endDate.getHours() + 1);

                // Event with location
                await graphClient.api("me/events").create({
                    "subject": strings.DemoEventTitle,
                    "body": {
                        "contentType": "HTML",
                        "content": strings.DemoEventContent
                    },
                    "start": {
                        "dateTime": startDate.toISOString(),
                        "timeZone": "UTC"
                    },
                    "end": {
                        "dateTime": endDate.toISOString(),
                        "timeZone": "UTC"
                    },
                    "location":{
                        "displayName": strings.DemoEventLocation
                    }
                });

                // Change date for the next event
                startDate.setDate(startDate.getDate() + 1);
                endDate.setDate(endDate.getDate() + 1);

                // Online event
                await graphClient.api("me/events").create({
                    "subject": strings.DemoEventOnlineTitle,
                    "body": {
                        "contentType": "HTML",
                        "content": strings.DemoEventOnlineContent
                    },
                    "start": {
                        "dateTime": startDate.toISOString(),
                        "timeZone": "Pacific Standard Time"
                    },
                    "end": {
                        "dateTime": endDate.toISOString(),
                        "timeZone": "Pacific Standard Time"
                    },
                    "isOnlineMeeting": "true"
                });
            }

            alert(strings.GraphDemoDataGenerated);
        }
    }

    /**
     * Delete the SharePoint lists
     */
    public static async deleteSharePointDemoLists(): Promise<void> {  
        if (confirm(strings.ConfirmDeleteSharePointDemoLists) == true) {
            // Get all the lists references
            const activityCallsList = await sp.web.lists.getByTitle(DataService.ActivityCallsListName);
            const activityEmailsList = await sp.web.lists.getByTitle(DataService.ActivityEmailsListName);
            const activityTextsList = await sp.web.lists.getByTitle(DataService.ActivityTextsListName);
            const progressList = await sp.web.lists.getByTitle(DataService.ProgressListName);
            const recentContractsList = await sp.web.lists.getByTitle(DataService.RecentlyDoneSalesContractsListName);
        
            // Delete the lists
            await activityCallsList.delete();
            await activityEmailsList.delete();
            await activityTextsList.delete();
            await progressList.delete();
            await recentContractsList.delete();
        
            alert(strings.SharePointDemoListsDeleted);
        }
    }

    /**
     * Get items with values from a specific SharePoint list
     * @param listTitle Title of the list
     * @param mappingFunction Function to map every items of the list
     * @returns An array of the mapped items
     */
    public static async getItemsWithValueFromList(listTitle: string, mappingFunction: (value: any, index: number) => IValueListItem): Promise<IValueListItem[]> {
        return await this.getItemsFromList(listTitle, mappingFunction);
    }

    /**
     * Get sales items from a specific SharePoint list
     * @param listTitle Title of the list
     * @param mappingFunction Function to map every items of the list
     * @returns An array of the mapped items
     */
    public static async getSalesItemsFromList(listTitle: string, mappingFunction: (value: any, index: number) => ISaleListItem): Promise<ISaleListItem[]> {
        return await this.getItemsFromList(listTitle, mappingFunction);
    }

    /**
     * Get items from a specific SharePoint list
     * @param listTitle Title of the list
     * @param mappingFunction Function to map every items of the list
     * @returns An array of the mapped items
     */
    private static async getItemsFromList<T>(listTitle: string, mappingFunction: (value: T, index: number) => T): Promise<T[]> {
        // Get the items from the list
        const items = await sp.web.lists.getByTitle(listTitle).items.getAll();
        // Map the items with the specified function
        const mappedItems = items.map((v, i) => mappingFunction(v, i));
        return mappedItems;
    }
    
    /**
     * Ensure that a field on a SharePoint site exists, otherwise create it
     * @param fieldName Name of the field
     * @param fieldType Type of the field
     * @param typeKindId Type kind id of the field
     */
    private static async ensureWebField(fieldName: string, fieldType: string, typeKindId: number) {
        var existingField = (await sp.web.fields.get()).filter(f => f.StaticName == fieldName);
        
        // If the field has not been added yet create it
        if (existingField && existingField.length == 0) {
            await sp.web.fields.add(fieldName, fieldType, { FieldTypeKind: typeKindId, Group: DataService.FieldGroupName }); 
        }
    }

    /**
     * Add a specific field to the target SharePoint list
     * @param targetList Name of the target SharePoint list
     * @param fieldName Name of the field
     * @param fieldType Type of the field
     * @param typeKindId Type kind id of the field
     */
    private static async addFieldToList(targetList: IList, fieldName: string, fieldType: string, fieldTypeKindId: number) {
        await targetList.fields.add(fieldName, fieldType, { FieldTypeKind: fieldTypeKindId, Group: DataService.FieldGroupName });
    }

    /**
     * Ensure that a SharePoint list exists, otherwise create it
     * @param listName Name of the SharePoint list
     * @param fieldsToAdd Fields to add to the SharePoint list
     */
    private static async ensureList(listName: string, fieldsToAdd: IListField[]) {
        // Ensure the existence of the demo list
        const listExists = await sp.web.lists.ensure(listName);

        // If the list exists and there are fields specified
        if (listExists.created == true && fieldsToAdd != undefined) {
            // Cycle through fields to add
            for (let i = 0; i < fieldsToAdd.length; i++) {
                await this.addFieldToList(listExists.list, fieldsToAdd[i].fieldName, fieldsToAdd[i].fieldType, fieldsToAdd[i].fieldTypeKindId);
            }
        }
    }
}