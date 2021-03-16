import { ISPServices } from "./ISPServices";
import * as mockdata from './MockDataSearch.json';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
interface MinimalMockUser {
    FirstName: string;
    LastName: string;
    Department: string;
    BaseOfficeLocation: string;
    Title: string;
    PreferredName: string;
    WorkPhone: string;
}

/*

DisplayName: user.PreferredName,
                Title: user.JobTitle,
                PictureUrl: user.PictureURL,
                Email: user.WorkEmail,
                Department: user.Department,
                WorkPhone: user.WorkPhone,
                Location: user.OfficeNumber
                  ? user.OfficeNumber
                  : user.BaseOfficeLocation
                  */
const sampleUserFirstNameLetter: string[] = [
    "A",
    "C",
    "D",
    "F",
    "H",
    "J",
    "L",
    "N",
    "P",
    "R",
    "T",
    "V",
    "X",
    "Z",
];
const sampleUserLastNameLetter: string[] = [
    "B",
    "E",
    "G",
    "I",
    "K",
    "M",
    "O",
    "Q",
    "S",
    "U",
    "W",
    "Y",
];


export class spMockServices implements ISPServices {
    private sampleData: MinimalMockUser[] = [];
    constructor() {

        sampleUserLastNameLetter.forEach(lastNameL => {
            sampleUserFirstNameLetter.forEach(firstNameL => {
                const usercount = Math.floor(Math.random() * (5)) + 1;
                for (let i = 0; i < usercount; i++) {
                    this.sampleData.push({
                        FirstName: `${firstNameL}FirstName${i}`,
                        LastName: `${lastNameL}LastName${i}`,
                        PreferredName: `${firstNameL}FirstName${i} ${lastNameL}LastName${i}`,
                        Department: i % 2 === 0 ? `${lastNameL}Department` : `${firstNameL}Department`,
                        BaseOfficeLocation: i % 3 === 0 ? `${lastNameL}Location` : `${firstNameL}Location`,
                        Title: i % 2 === 0 ? `${lastNameL}JobTitle` : `${firstNameL}JobTitle`,
                        WorkPhone: '' + Math.floor(Math.random() * 1234) + 54678900
                    });
                }
            });
        });
    }

    public async searchUsers(searchString: string, searchFirstName: boolean) {
        let filtervalue = searchString.trim().toLowerCase();
        if (searchString.length > 0 && filtervalue.lastIndexOf("*") == searchString.length - 1) {
            // remove last '*'
            filtervalue = filtervalue.substring(0, searchString.length - 1);
        }
        if (!filtervalue || filtervalue.length === 0) {
            throw new Error("No valid Input.");
        }


        const searchresult = !!searchFirstName ?
            this.sampleData.filter(p => p.FirstName.toLowerCase().indexOf(filtervalue) === 0) :
            this.sampleData.filter(p => p.LastName.toLowerCase().indexOf(filtervalue) === 0);

        const timeout = Math.floor(Math.random() * (1000)) + 1;
        const resultdata = {
            ElapsedTime: timeout,
            RowCount: searchresult.length,
            TotalRows: searchresult.length,
            PrimarySearchResults: searchresult
        };


        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(resultdata);
            }, timeout);
        });

    }

    public async searchUsersNew(searchString: string, srchQry: string, isInitialSearch: boolean, pageNumber?: number) {
        let filtervalue = searchString.trim().toLowerCase();
        if (searchString.length > 0 && filtervalue.lastIndexOf("*") == searchString.length - 1) {
            // remove last '*'
            filtervalue = filtervalue.substring(0, searchString.length - 1);
        }
        if (!filtervalue || filtervalue.length === 0) {
            throw new Error("No valid Input.");
        }


        const searchresult = !!isInitialSearch ?
            this.sampleData.filter(p => p.FirstName.toLowerCase().indexOf(filtervalue) === 0) :
            this.sampleData.filter(p => p.LastName.toLowerCase().indexOf(filtervalue) === 0);

        const timeout = Math.floor(Math.random() * (1000)) + 1;
        const resultdata = {
            ElapsedTime: timeout,
            RowCount: searchresult.length,
            TotalRows: searchresult.length,
            PrimarySearchResults: searchresult
        };


        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(resultdata);
            }, timeout);
        });
    }

}