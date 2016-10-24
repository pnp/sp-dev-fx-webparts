import { INewsItem } from './RealTimeNewsFeedWebPart';

export default class MockHttpClient {

    private static _items: INewsItem[] = [
      { Title: 'News Item 1',
        Id: 1,
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        PreviewImageUrl: { Url:'http://placehold.it/50x50', Description: "Dummy placeholder" }
      },
      { Title: 'News Item 2',
        Id: 1,
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        PreviewImageUrl: { Url:'http://placehold.it/50x50', Description: "Dummy placeholder" }
      },
      { Title: 'News Item 2',
        Id: 1,
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        PreviewImageUrl: { Url:'http://placehold.it/50x50', Description: "Dummy placeholder" }
      }
    ];

    public static get(restUrl: string): Promise<INewsItem[]> {
      return new Promise<INewsItem[]>((resolve) => {
          setTimeout(()=> {
            resolve(MockHttpClient._items);
          }, 3000);
      });
    }
}