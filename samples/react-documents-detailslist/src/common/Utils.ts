import { IDocument } from './IObjects';
import { IContextualMenuItem, IColumn } from 'office-ui-fabric-react';


export class Utils {

    /**
     * Returns the site relative url from an absolute url
     */
    public GetRelativePathFromAbsolute(absoluteUrl) {

        var serverRelativeUrl =
            absoluteUrl.toLowerCase().replace(window.location.protocol.toLowerCase() + "//" + window.location.host.toLowerCase(), "");
        return serverRelativeUrl;
    }
    /**
     * Returns the site relative url from an absolute url
     */
    public GetFilterValues(column: IColumn, arrayObjects: any[], onFilterClickCallback: (ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) => void): IContextualMenuItem[] {

        let filters: IContextualMenuItem[] = [];
        for (let i = 0; i < arrayObjects.length; i++) {
            let item = arrayObjects[i];
            let value: string = item[column.key];
            if (item[column.key]) {
                //in case we have specific column, we can add more complex logic
                if (column.data == "Taxonomy") {
                    let columnValue: string = item[column.key];
                    let valuesAsStrings: string[] = columnValue.split(";");
                    valuesAsStrings.map((termValue) => {
                        termValue = termValue.trim();
                        if (termValue && !this._IsValuePresented(filters, termValue)) {
                            filters.push(
                                {
                                    key: termValue,
                                    name: termValue,
                                    data: column.key,
                                    onClick: onFilterClickCallback,
                                    isChecked: i == 0 ? true : false
                                });
                        }
                    });
                }
                else {
                    if (!this._IsValuePresented(filters, value)) {
                        filters.push(
                            {
                                key: value,
                                name: value,
                                data: column.key,
                                onClick: onFilterClickCallback,
                                isChecked: i == 0 ? true : false
                            });
                    }
                }
            }
        }
        return filters;
    }
    /**
     * Returns sorting menu
     */
    public GetSortingMenuItems(column: IColumn, onSortColumn: (column: IColumn, isSortedDescending: boolean) => void): IContextualMenuItem[] {
        let menuItems = [];
        if (column.data == Number) {
            menuItems.push(
                {
                    key: 'smallToLarger',
                    name: 'Smaller to larger',
                    canCheck: true,
                    checked: column.isSorted && !column.isSortedDescending,
                    onClick: () => onSortColumn(column, false)
                },
                {
                    key: 'largerToSmall',
                    name: 'Larger to smaller',
                    canCheck: true,
                    checked: column.isSorted && column.isSortedDescending,
                    onClick: () => onSortColumn(column, true)
                }
            );
        }
        else if (column.data == Date) {
            menuItems.push(
                {
                    key: 'oldToNew',
                    name: 'Older to newer',
                    canCheck: true,
                    checked: column.isSorted && !column.isSortedDescending,
                    onClick: () => onSortColumn(column, false)
                },
                {
                    key: 'newToOld',
                    name: 'Newer to Older',
                    canCheck: true,
                    checked: column.isSorted && column.isSortedDescending,
                    onClick: () => onSortColumn(column, true)
                }
            );
        }
        else
        //(column.data == String) 
        // NOTE: in case of 'complex columns like Taxonomy, you need to add more logic'
        {
            menuItems.push(
                {
                    key: 'aToZ',
                    name: 'A to Z',
                    canCheck: true,
                    checked: column.isSorted && !column.isSortedDescending,
                    onClick: () => onSortColumn(column, false)
                },
                {
                    key: 'zToA',
                    name: 'Z to A',
                    canCheck: true,
                    checked: column.isSorted && column.isSortedDescending,
                    onClick: () => onSortColumn(column, true)
                }
            );
        }
        return menuItems;
    }
    /**
     * Returns image url for the given filename.
     * The urls points to https://spoprod-a.akamaihd.net..... !!!
     */
    public GetImgUrl(fileName: string): string {

        let fileNameItems = fileName.split('.');
        let fileExtenstion = fileNameItems[fileNameItems.length - 1];

        return this.GetImgUrlByFileExtension(fileExtenstion);
    }
    /**
     * Returns image url for the given extension.
     * The urls points to https://spoprod-a.akamaihd.net..... !!!
     */
    public GetImgUrlByFileExtension(extension: string): string {
        // cuurently in SPFx with React I didn't find different way of getting the image
        // feel free to improve this
        let imgRoot: string = "https://spoprod-a.akamaihd.net/files/odsp-next-prod_ship-2017-04-21-sts_20170503.001/odsp-media/images/filetypes/16/";
        let imgType = "genericfile.png";
        imgType = extension + ".png";

        switch (extension) {
            case "jpg":
            case "jpeg":
            case "jfif":
            case "gif":
            case "png":
                imgType = "photo.png";
                break;
            case "folder":
                imgType = "folder.svg";
                break;

        }
        return imgRoot + imgType;
    }
    /**
     * Returns formated date string
     */
    public GetFormatedDate(dateValue: Date): string {
        if (dateValue) {
            let date: string = dateValue.toLocaleString();
            if (date.indexOf(',') > -1) {
                date = date.split(',')[0];
            }
            return date;
        }
        return "";
    }
    /**
     * Returns formated date string
     */
    public GetFormatedDateString(dateString: string): string {
        if (dateString) {
            let convertedDate: Date = new Date(dateString);
            let date: string = convertedDate.toLocaleString();
            if (date.indexOf(',') > -1) {
                date = date.split(',')[0];
            }
            return date;
        }
        return "";
    }
    /**
     * Returns formated date string
     */
    public GetDateOnly(dateString: string): string {
        let shortDate = "";
        if (dateString) {
            let dateItems = dateString.split(" ");
            if (dateItems.length > 1) {
                shortDate = dateItems[0];
            }
        }
        let convertedDate: Date = new Date(dateString);
        return shortDate;
    }
    /**
     * Returns the file name by spliting the file url
     */
    public GetFileName(fileAbsoluteUrl: string): string {
        if (fileAbsoluteUrl) {
            let items = fileAbsoluteUrl.split('/');
            return items[items.length - 1];
        }
        return "";
    }

    /**
     * Gets the FileRef value from the absolute url
     */
    public GetFileRef(fileAbsoluteUrl: string): string {
        if (fileAbsoluteUrl) {
            return fileAbsoluteUrl.replace(window.location.origin, "");
        }
        return "";
    }
    /**
     * Gets the Content Type value from the value of the search manged property ContentType
     */
    public GetContentType(searchValue: string) {
        //the string value is in the format:
        //  "application/vnd.openxmlformats-officedocument.wordprocessingml.document 
        //   <line break>
        //    Document"
        debugger;
        searchValue = searchValue.replace(/\r?\n|\r/g, "#");
        let result: string = "";
        if (searchValue) {
            if (searchValue.indexOf("#") > 0) {
                result = searchValue.split("#")[searchValue.split("#").length - 1];
            }
        }
        return result;
    }

    /**
     * Opens the document in a new tab. The code use window.open
     */
    public OpenDocument(docItem: IDocument, thisContext: any, openPDFInClient: boolean): void {

        let newTabObject: any = null;
        try {
            let documentWebUrl: string = "";
            if (docItem.FileRef.toLowerCase().indexOf(".pdf") > 0) {
                documentWebUrl = window.location.origin + docItem.FileRef + "?web=1";
            }
            else {

                documentWebUrl = docItem.ParentWebUrl + "/_layouts/WopiFrame.aspx"
                    + "?sourcedoc=" + encodeURIComponent("{" + docItem.UniqueId + "}") + "&action=default";
            }

            newTabObject = window.open(documentWebUrl);
        }
        catch (ex) {
            //optionaly, we can notify the user;
            // cuurently - do nothing
        }
    }
    /**
     * Helper method that check if a value is in the IContextualMenuItem[]
     */
    private _IsValuePresented(currentValues: IContextualMenuItem[], newValue: string): boolean {

        for (let i = 0; i < currentValues.length; i++) {
            if (currentValues[i].key == newValue) {
                return true;
            }
        }
        return false;
    }
}