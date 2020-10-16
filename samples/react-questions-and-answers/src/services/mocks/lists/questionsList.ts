import { ListTitles, StandardFields, ReplyFields } from 'utilities';
import { BaseList } from 'services/mocks/mockListFactory';

export class QuestionsList implements BaseList {
    public listTitle = ListTitles.QUESTIONS;
    public lookups = [
        { itemProperty: ReplyFields.QUESTIONLOOKUP, itemKey: 'QuestionLookupId', lookupListTitle: ListTitles.QUESTIONS },
        { itemProperty: ReplyFields.REPLYLOOKUP, itemKey: 'ReplyLookupId', lookupListTitle: ListTitles.QUESTIONS },
        { itemProperty: StandardFields.AUTHOR, itemKey: 'AuthorId', lookupListTitle: ListTitles.USERS_INFORMATION },
        { itemProperty: StandardFields.EDITOR, itemKey: 'EditorId', lookupListTitle: ListTitles.USERS_INFORMATION }
    ];
    public items: any[] = [
        {
            ID: 1,
            Title: 'How old is Alex Trebek?',
            
            TW_Details: '<p>I have always wondered.</p>',
            TW_IsAnswered: true,

            ContentType: 'Question',
            Created: new Date(),
            Modified: new Date(),
            AuthorId: 1,
            EditorId: 1
        },
        {
            ID: 2,
            Title: 'Who is the best baseball player ever?',
            
            TW_Details: '<p>I think it is Ozzie Smith.</p>',
            TW_IsAnswered: false,

            ContentType: 'Question',
            Created: new Date(),
            Modified: new Date(),
            AuthorId: 1,
            EditorId: 1
        },
        {
            ID: 3,
            Title: 'I think he is',
            
            TW_Details: '<p>He is 75</p>',
            TW_IsAnswer: true,
            TW_QuestionLookupId: 1,

            ContentType: 'Reply',
            Created: new Date(),
            Modified: new Date(),
            AuthorId: 1,
            EditorId: 1
        },
        {
            ID: 4,
            Title: 'I am pretty sure he is',
            
            TW_Details: '<p>I am pretty sure he is 79</p>',
            TW_IsAnswer: true,
            TW_QuestionLookupId: 1,
            TW_ReplyLookupId: 3,

            ContentType: 'Reply',
            Created: new Date(),
            Modified: new Date(),
            AuthorId: 1,
            EditorId: 1
        }
    ];
}
