import { IDocument } from "../common/IObjects";
import IDataProvider from './IDataProvider';
import { Utils } from '../common/Utils';

import { IWebPartContext } from '@microsoft/sp-webpart-base';


export default class MockupDataProvider implements IDataProvider {

    private _libraryAbsoluteUrl: string;

    constructor(libraryUrl: string) {
        if (libraryUrl) {
            this._libraryAbsoluteUrl = libraryUrl;
        }
    }

    public validateSettings(): boolean {

        if (!this._libraryAbsoluteUrl) {
            return false;
        }
        return true;
    }

    /**
     * Returns sample data
     */
    public readDocumentsFromSearch(): Promise<IDocument[]> {
        let utility = new Utils();
        let today: Date = new Date();
        let date2: Date = new Date();
        date2.setDate(today.getDate() - 5);

        let _items: IDocument[] = [
            {
                Id: 1,
                Name: "Test File.pdf",
                FileRef: "/somesite/library/Test File.pdf",
                Modified: utility.GetFormatedDate(today),
                ModifiedBy: "Dimcho Tsanov",
                ContentType: "Document",
                FileIcon: utility.GetImgUrl("Test File.pdf"),
                VersionString: "1.2",
            },
            {
                Id: 2,
                Name: "Report 2017-09.xlsx",
                FileRef: "/somesite/library/Report 2017-09.xlsx",
                Modified: utility.GetFormatedDate(today),
                ModifiedBy: "Dimcho Tsanov",
                ContentType: "Document",
                FileIcon: utility.GetImgUrl("Report 2017-09.xlsx"),
                VersionString: "1.0",
            },
            {
                Id: 3,
                Name: "Report 2017-10.xlsx",
                FileRef: "/somesite/library/Report 2017-10.xlsx",
                Modified: utility.GetFormatedDate(date2),
                ModifiedBy: "Velin Georgiev",
                ContentType: "Report",
                FileIcon: utility.GetImgUrl("Report 2017-10.xlsx"),
                VersionString: "11.0",
            },
            {
                Id: 4,
                Name: "Report 2016-11.xlsx",
                FileRef: "/somesite/library/Report 2016-11.xlsx",
                Modified: utility.GetFormatedDate(date2),
                ModifiedBy: "Velin Georgiev",
                ContentType: "Meeting Minutes",
                FileIcon: utility.GetImgUrl("Report 2016-11.xlsx"),
                VersionString: "1.2",
            },
            {
                Id: 5,
                Name: "Test File_final.pdf",
                FileRef: "/somesite/library/Test File_final.pdf",
                Modified: utility.GetFormatedDate(date2),
                ModifiedBy: "Yana Tsanova",
                ContentType: "Meeting Minutes",
                FileIcon: utility.GetImgUrl("Test File_final.pdf"),
                VersionString: "1.2",
            },
        ];

        return new Promise<IDocument[]>((resolve) => {
            setTimeout(() => {
                resolve(_items);
            }, 2000);
        });
    }
    /**
     * Returns sample data
     */
    public readDocumentsFromLibrary(): Promise<IDocument[]> {
        let utility = new Utils();
        let today: Date = new Date();
        let date2: Date = new Date();
        date2.setDate(today.getDate() - 5);

        let _items: IDocument[] = [
            {
                Id: 1,
                Name: "Test File.pdf",
                FileRef: "/somesite/library/Test File.pdf",
                Modified: utility.GetFormatedDate(today),
                ModifiedBy: "Dimcho Tsanov",
                ContentType: "Document",
                FileIcon: utility.GetImgUrl("Test File.pdf"),
                VersionString: "1.2",
            },
            {
                Id: 2,
                Name: "Report 2017-09.xlsx",
                FileRef: "/somesite/library/Report 2017-09.xlsx",
                Modified: utility.GetFormatedDate(today),
                ModifiedBy: "Dimcho Tsanov",
                ContentType: "Document",
                FileIcon: utility.GetImgUrl("Report 2017-09.xlsx"),
                VersionString: "1.0",
            },
            {
                Id: 3,
                Name: "Report 2017-10.xlsx",
                FileRef: "/somesite/library/Report 2017-10.xlsx",
                Modified: utility.GetFormatedDate(date2),
                ModifiedBy: "Velin Georgiev",
                ContentType: "Report",
                FileIcon: utility.GetImgUrl("Report 2017-10.xlsx"),
                VersionString: "11.0",
            },
            {
                Id: 4,
                Name: "Report 2016-11.xlsx",
                FileRef: "/somesite/library/Report 2016-11.xlsx",
                Modified: utility.GetFormatedDate(date2),
                ModifiedBy: "Velin Georgiev",
                ContentType: "Meeting Minutes",
                FileIcon: utility.GetImgUrl("Report 2016-11.xlsx"),
                VersionString: "1.2",
            },
            {
                Id: 5,
                Name: "Test File_final.pdf",
                FileRef: "/somesite/library/Test File_final.pdf",
                Modified: utility.GetFormatedDate(date2),
                ModifiedBy: "Yana Tsanova",
                ContentType: "Meeting Minutes",
                FileIcon: utility.GetImgUrl("Test File_final.pdf"),
                VersionString: "1.2",
            },
        ];
        return new Promise<IDocument[]>((resolve) => {
            setTimeout(() => {
                resolve(_items);
            }, 2000);
        });
    }
}