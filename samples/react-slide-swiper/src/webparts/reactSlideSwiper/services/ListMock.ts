import { ListItem } from "./ListItem";
import { IListService } from "./IListService";

export class ListMock implements IListService {

    public getAll(): Promise<Array<ListItem>> {
      return new Promise<Array<ListItem>>((resolve:any) => {

        const fakeData: Array<ListItem> = [

            {
                Title: 'A convergent value empowers the standard-setters',
                Description: 'The General Head of IT Strategy benchmarks business-for-business agilities',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/OFFICE365.png'
            },
            {
                Title: 'The Digital Marketers empower a digitized correlation',
                Description: 'Whereas synchronized brand values promote strategy formulations',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/POWERSHELL.png'
            },
            {
                Title: 'The market thinker strategically standardizes a competitive success',
                Description: 'The thinkers/planners benchmark a disciplined growth momentum',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/PYTHON.png'
            },
            {
                Title: 'We are going to secure our cross-pollinations',
                Description: 'We are working hard to reintermediate a competitive advantage, while the gatekeeper straightforwardly identifies barriers to success',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/SP.png'
            },
            {
                Title: 'A convergent value empowers the standard-setters',
                Description: 'The General Head of IT Strategy benchmarks business-for-business agilities',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/JAVASCRIPT.png'
            },
            {
                Title: 'The Digital Marketers empower a digitized correlation',
                Description: 'Whereas synchronized brand values promote strategy formulations',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/POWERSHELL.png'
            },
            {
                Title: 'The market thinker strategically standardizes a competitive success',
                Description: 'The thinkers/planners benchmark a disciplined growth momentum',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/PYTHON.png'
            },
            {
                Title: 'We are going to secure our cross-pollinations',
                Description: 'We are working hard to reintermediate a competitive advantage, while the gatekeeper straightforwardly identifies barriers to success',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/SP.png'
            },
            {
                Title: 'A convergent value empowers the standard-setters',
                Description: 'The General Head of IT Strategy benchmarks business-for-business agilities',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/OFFICE365.png'
            },
            {
                Title: 'The Digital Marketers empower a digitized correlation',
                Description: 'Whereas synchronized brand values promote strategy formulations',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/JAVASCRIPT.png'
            },
            {
                Title: 'The market thinker strategically standardizes a competitive success',
                Description: 'The thinkers/planners benchmark a disciplined growth momentum',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/PYTHON.png'
            },
            {
                Title: 'We are going to secure our cross-pollinations',
                Description: 'We are working hard to reintermediate a competitive advantage, while the gatekeeper straightforwardly identifies barriers to success',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/SP.png'
            },
            {
                Title: 'A convergent value empowers the standard-setters',
                Description: 'The General Head of IT Strategy benchmarks business-for-business agilities',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/OFFICE365.png'
            },
            {
                Title: 'The Digital Marketers empower a digitized correlation',
                Description: 'Whereas synchronized brand values promote strategy formulations',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/POWERSHELL.png'
            },
            {
                Title: 'The market thinker strategically standardizes a competitive success',
                Description: 'The thinkers/planners benchmark a disciplined growth momentum',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/JAVASCRIPT.png'
            },
            {
                Title: 'We are going to secure our cross-pollinations',
                Description: 'We are working hard to reintermediate a competitive advantage, while the gatekeeper straightforwardly identifies barriers to success',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/SP.png'
            },
            {
                Title: 'A convergent value empowers the standard-setters',
                Description: 'The General Head of IT Strategy benchmarks business-for-business agilities',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/OFFICE365.png'
            },
            {
                Title: 'The Digital Marketers empower a digitized correlation',
                Description: 'Whereas synchronized brand values promote strategy formulations',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/POWERSHELL.png'
            },
            {
                Title: 'The market thinker strategically standardizes a competitive success',
                Description: 'The thinkers/planners benchmark a disciplined growth momentum',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/PYTHON.png'
            },
            {
                Title: 'We are going to secure our cross-pollinations',
                Description: 'We are working hard to reintermediate a competitive advantage, while the gatekeeper straightforwardly identifies barriers to success',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/JAVASCRIPT.png'
            },
            {
                Title: 'A convergent value empowers the standard-setters',
                Description: 'The General Head of IT Strategy benchmarks business-for-business agilities',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/OFFICE365.png'
            },
            {
                Title: 'The Digital Marketers empower a digitized correlation',
                Description: 'Whereas synchronized brand values promote strategy formulations',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/POWERSHELL.png'
            },
            {
                Title: 'The market thinker strategically standardizes a competitive success',
                Description: 'The thinkers/planners benchmark a disciplined growth momentum',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/PYTHON.png'
            },
            {
                Title: 'We are going to secure our cross-pollinations',
                Description: 'We are working hard to reintermediate a competitive advantage, while the gatekeeper straightforwardly identifies barriers to success',
                ImageUrl: 'https://blog.velingeorgiev.com/static/images/SP.png'
            }
        ];

        resolve(fakeData);
      });
    }
}
  