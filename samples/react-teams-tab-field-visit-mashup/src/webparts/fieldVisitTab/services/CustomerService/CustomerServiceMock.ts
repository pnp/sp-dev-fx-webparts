import { ICustomerService } from './ICustomerService';
import { ICustomer } from '../../model/ICustomer';

export default class CustomerServiceMock implements ICustomerService {

    // US customers from Northwind database
    private mockItems: ICustomer[] =
    [
        {
        "CustomerID": "GREAL",
        "CompanyName": "Great Lakes Food Market",
        "ContactName": "Howard Snyder",
        "ContactTitle": "Marketing Manager",
        "Address": "2732 Baker Blvd.",
        "City": "Eugene",
        "Region": "OR",
        "PostalCode": "97403",
        "Country": "USA",
        "Phone": "(503) 555-7555",
        "Fax": ""
        },
        {
        "CustomerID": "HUNGC",
        "CompanyName": "Hungry Coyote Import Store",
        "ContactName": "Yoshi Latimer",
        "ContactTitle": "Sales Representative",
        "Address": "City Center Plaza 516 Main St.",
        "City": "Elgin",
        "Region": "OR",
        "PostalCode": "97827",
        "Country": "USA",
        "Phone": "(503) 555-6874",
        "Fax": "(503) 555-2376"
        },
        {
        "CustomerID": "LAZYK",
        "CompanyName": "Lazy K Kountry Store",
        "ContactName": "John Steel",
        "ContactTitle": "Marketing Manager",
        "Address": "12 Orchestra Terrace",
        "City": "Walla Walla",
        "Region": "WA",
        "PostalCode": "99362",
        "Country": "USA",
        "Phone": "(509) 555-7969",
        "Fax": "(509) 555-6221"
        },
        {
        "CustomerID": "LETSS",
        "CompanyName": "Let's Stop N Shop",
        "ContactName": "Jaime Yorres",
        "ContactTitle": "Owner",
        "Address": "87 Polk St. Suite 5",
        "City": "San Francisco",
        "Region": "CA",
        "PostalCode": "94117",
        "Country": "USA",
        "Phone": "(415) 555-5938",
        "Fax": ""
        },
        {
        "CustomerID": "LONEP",
        "CompanyName": "Lonesome Pine Restaurant",
        "ContactName": "Fran Wilson",
        "ContactTitle": "Sales Manager",
        "Address": "89 Chiaroscuro Rd.",
        "City": "Portland",
        "Region": "OR",
        "PostalCode": "97219",
        "Country": "USA",
        "Phone": "(503) 555-9573",
        "Fax": "(503) 555-9646"
        },
        {
        "CustomerID": "OLDWO",
        "CompanyName": "Old World Delicatessen",
        "ContactName": "Rene Phillips",
        "ContactTitle": "Sales Representative",
        "Address": "2743 Bering St.",
        "City": "Anchorage",
        "Region": "AK",
        "PostalCode": "99508",
        "Country": "USA",
        "Phone": "(907) 555-7584",
        "Fax": "(907) 555-2880"
        },
        {
        "CustomerID": "RATTC",
        "CompanyName": "Rattlesnake Canyon Grocery",
        "ContactName": "Paula Wilson",
        "ContactTitle": "Assistant Sales Representative",
        "Address": "2817 Milton Dr.",
        "City": "Albuquerque",
        "Region": "NM",
        "PostalCode": "87110",
        "Country": "USA",
        "Phone": "(505) 555-5939",
        "Fax": "(505) 555-3620"
        },
        {
        "CustomerID": "SAVEA",
        "CompanyName": "Save-a-lot Markets",
        "ContactName": "Jose Pavarotti",
        "ContactTitle": "Sales Representative",
        "Address": "187 Suffolk Ln.",
        "City": "Boise",
        "Region": "ID",
        "PostalCode": "83720",
        "Country": "USA",
        "Phone": "(208) 555-8097",
        "Fax": ""
        },
        {
        "CustomerID": "SPLIR",
        "CompanyName": "Split Rail Beer & Ale",
        "ContactName": "Art Braunschweiger",
        "ContactTitle": "Sales Manager",
        "Address": "P.O. Box 555",
        "City": "Lander",
        "Region": "WY",
        "PostalCode": "82520",
        "Country": "USA",
        "Phone": "(307) 555-4680",
        "Fax": "(307) 555-6525"
        },
        {
        "CustomerID": "THEBI",
        "CompanyName": "The Big Cheese",
        "ContactName": "Liz Nixon",
        "ContactTitle": "Marketing Manager",
        "Address": "89 Jefferson Way Suite 2",
        "City": "Portland",
        "Region": "OR",
        "PostalCode": "97201",
        "Country": "USA",
        "Phone": "(503) 555-3612",
        "Fax": ""
        },
        {
        "CustomerID": "THECR",
        "CompanyName": "The Cracker Box",
        "ContactName": "Liu Wong",
        "ContactTitle": "Marketing Assistant",
        "Address": "55 Grizzly Peak Rd.",
        "City": "Butte",
        "Region": "MT",
        "PostalCode": "59801",
        "Country": "USA",
        "Phone": "(406) 555-5834",
        "Fax": "(406) 555-8083"
        },
        {
        "CustomerID": "TRAIH",
        "CompanyName": "Trail's Head Gourmet Provisioners",
        "ContactName": "Helvetius Nagy",
        "ContactTitle": "Sales Associate",
        "Address": "722 DaVinci Blvd.",
        "City": "Kirkland",
        "Region": "WA",
        "PostalCode": "98034",
        "Country": "USA",
        "Phone": "(206) 555-8257",
        "Fax": "(206) 555-2174"
        },
        {
        "CustomerID": "WHITC",
        "CompanyName": "White Clover Markets",
        "ContactName": "Karl Jablonski",
        "ContactTitle": "Owner",
        "Address": "305 - 14th Ave. S. Suite 3B",
        "City": "Seattle",
        "Region": "WA",
        "PostalCode": "98128",
        "Country": "USA",
        "Phone": "(206) 555-4112",
        "Fax": "(206) 555-4115"
        }
    ];

    public getCustomer(customerID: string):Promise<ICustomer> {
        var result: ICustomer;

        result = this.mockItems.filter(c => c.CustomerID == customerID)[0];

        return new Promise<ICustomer>((resolve) => {
            resolve(result);
        });
    }
}
