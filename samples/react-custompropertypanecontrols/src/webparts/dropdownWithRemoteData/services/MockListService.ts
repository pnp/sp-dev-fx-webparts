import { IListService, IList, IListItem } from '../services';

export class MockListService implements IListService {
  private lists: IList[];
  private items: any;

  constructor() {
    this.lists = [
      {
        Id: "sharedDocuments",
        Title: 'Shared Documents'
      },
      {
        Id: "myDocuments",
        Title: 'My Documents'
      }
    ];

    this.items = {
        sharedDocuments: [
          {
            Id: 'spfx_presentation.pptx',
            Title: 'SPFx for the masses'
          },
          {
            Id: 'hello-world.spapp',
            Title: 'hello-world.spapp'
          }
        ],
        myDocuments: [
          {
            Id: 'clippy_cv.docx',
            Title: 'Clippy CV'
          },
          {
            Id: 'clippy_expenses.xlsx',
            Title: 'Clippy Expenses'
          }
        ]
      };
  }

  public getLists(): Promise<IList[]> {
    
    return new Promise<IList[]>(resolve => {
      setTimeout(() => {
        resolve(this.lists);
      }, 1000);
    });
  }

  public getList(listName: string): Promise<IListItem[]> {
    
    return new Promise<IListItem[]>(resolve => {
      setTimeout(() => {
        resolve(this.items[listName]);
      }, 1000);
    });
  }
}