import { ListTitles } from 'utilities';
import { BaseList } from 'services/mocks/mockListFactory';

/*The first user in this will be used as the 'current user'
    Notes about the data
    Only the first item has a Title property as it only seems that Pnps wrapper on /_api/web/currentuser sends this back
    The call to /_api/sp.utilities.utility.searchprincipalsusingcontextweb returns a PrincipalInfo object (PnP object) which has DisplayName rather than Title
*/
export class UsersInformationList implements BaseList {
    public listTitle = ListTitles.USERS_INFORMATION;
    public items: any[] = [
        {
            ID: 1,
            DisplayName: 'Demo Designer',
            Title: 'Demo Designer',
            LoginName: 'i:0#.w|domain\\designer',
            Key: 'i:0#.w|domain\\designer',
            Name: 'i:0#.w|domain\\designer',
            JobTitle: 'Demo Designer Title',
            Email: 'designer@demo.com',
            Mobile: '404-555-1211',
            IsSiteAdmin: false,
            Groups: {
                results: [
                ]
            }
        },
        {
            ID: 2,
            DisplayName: 'Demo User',
            Title: 'Demo User',
            LoginName: 'i:0#.w|domain\\user',
            Key: 'i:0#.w|domain\\user',
            Name: 'i:0#.w|domain\\user',
            JobTitle: 'Demo User Title',
            Email: 'user@demo.com',
            Mobile: '404-555-1212'
        },
        {
            ID: 3,
            DisplayName: 'Demo External User',
            Title: 'Demo External User',
            LoginName: 'i:0#.w|domain\\externaluser',
            Key: 'i:0#.w|domain\\externaluser',
            Name: 'i:0#.w|domain\\externaluser',
            JobTitle: 'Demo External User Title',
            Email: 'externaluser@demo.com',
            Mobile: '404-555-1213'
        },
        {
            ID: 4,
            DisplayName: 'Demo No Email',
            Title: 'Demo No Email',
            LoginName: 'i:0#.w|domain\\demo01',
            Key: 'i:0#.w|domain\\demo01',
            Name: 'i:0#.w|domain\\demo01',
            JobTitle: 'Demo No Email Title',
            Mobile: '404-555-1215'
        }
    ];
}
