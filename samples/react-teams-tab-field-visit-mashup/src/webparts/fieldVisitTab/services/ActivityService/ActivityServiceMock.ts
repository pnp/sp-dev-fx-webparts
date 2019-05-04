import { IActivity } from '../../model/IActivity';
import { IActivityService } from './IActivityService';

export default class ActivityServiceMock implements IActivityService {

    // US customers from Northwind database
    private mockItems: IActivity[] = [
        {
            customerId: 'THEBI',
            date: new Date(2018, 6, 21),
            name: 'Payment',
            description: 'Paid in full',
            amount: 3253.22
        },
        {
            customerId: 'GREAL',
            date: new Date(2018, 6, 17),
            name: 'Payment',
            description: 'Paid in full',
            amount: 244.62
        },
        {
            customerId: 'HUNGC',
            date: new Date(2018, 6, 30),
            name: 'Payment',
            description: 'Paid in full',
            amount: 1644.00
        },
        {
            customerId: 'LAZYK',
            date: new Date(2018, 6, 15),
            name: 'Payment',
            description: 'Paid in full',
            amount: 4033.75
        },
        {
            customerId: 'LETSS',
            date: new Date(2018, 6, 8),
            name: 'Payment',
            description: 'Paid in full',
            amount: 516.70
        },
        {
            customerId: 'LONEP',
            date: new Date(2018, 6, 25),
            name: 'Payment',
            description: 'Paid in full',
            amount: 2050.39
        },
        {
            customerId: 'OLDWO',
            date: new Date(2018, 6, 11),
            name: 'Payment',
            description: 'Paid in full',
            amount: 1677.06
        },
        {
            customerId: 'RATTC',
            date: new Date(2018, 6, 20),
            name: 'Payment',
            description: 'Partial payment',
            amount: 1400.00
        },
        {
            customerId: 'SAVEA',
            date: new Date(2018, 6, 27),
            name: 'Payment',
            description: 'Paid in full',
            amount: 2555.51
        },
        {
            customerId: 'SPLIR',
            date: new Date(2018, 6, 29),
            name: 'Payment',
            description: 'Paid in full',
            amount: 877.11
        },
        {
            customerId: 'THECR',
            date: new Date(2018, 6, 21),
            name: 'Payment',
            description: 'Paid in full',
            amount: 1205.63
        },
        {
            customerId: 'TRAIH',
            date: new Date(2018, 6, 18),
            name: 'Payment',
            description: 'Paid in full',
            amount: 4020.55
        },
        {
            customerId: 'WHITC',
            date: new Date(2018, 6, 24),
            name: 'Payment',
            description: 'Paid in full',
            amount: 309.22
        },

        {
            customerId: 'THEBI',
            date: new Date(2018, 7, 21),
            name: 'Payment',
            description: 'Paid in full',
            amount: 3253.22
        },
        {
            customerId: 'GREAL',
            date: new Date(2018, 7, 17),
            name: 'Payment',
            description: 'Paid in full',
            amount: 244.62
        },
        {
            customerId: 'HUNGC',
            date: new Date(2018, 7, 30),
            name: 'Payment',
            description: 'Paid in full',
            amount: 1644.00
        },
        {
            customerId: 'LAZYK',
            date: new Date(2018, 7, 15),
            name: 'Payment',
            description: 'Paid in full',
            amount: 4033.75
        },
        {
            customerId: 'LETSS',
            date: new Date(2018, 7, 8),
            name: 'Payment',
            description: 'Paid in full',
            amount: 516.70
        },
        {
            customerId: 'LONEP',
            date: new Date(2018, 7, 25),
            name: 'Payment',
            description: 'Paid in full',
            amount: 2050.39
        },
        {
            customerId: 'OLDWO',
            date: new Date(2018, 7, 11),
            name: 'Payment',
            description: 'Paid in full',
            amount: 1677.06
        },
        {
            customerId: 'RATTC',
            date: new Date(2018, 7, 20),
            name: 'Payment',
            description: 'Partial payment',
            amount: 1400.00
        },
        {
            customerId: 'SAVEA',
            date: new Date(2018, 7, 27),
            name: 'Payment',
            description: 'Paid in full',
            amount: 2555.51
        },
        {
            customerId: 'SPLIR',
            date: new Date(2018, 7, 29),
            name: 'Payment',
            description: 'Paid in full',
            amount: 877.11
        },
        {
            customerId: 'THECR',
            date: new Date(2018, 7, 21),
            name: 'Payment',
            description: 'Paid in full',
            amount: 1205.63
        },
        {
            customerId: 'TRAIH',
            date: new Date(2018, 7, 18),
            name: 'Payment',
            description: 'Paid in full',
            amount: 4020.55
        },
        {
            customerId: 'WHITC',
            date: new Date(2018, 7, 24),
            name: 'Payment',
            description: 'Paid in full',
            amount: 309.22
        },

        {
            customerId: 'LAZYK',
            date: new Date(2018, 7, 29),
            name: 'Claim',
            description: 'Fire damage',
            amount: 30000
        },
        {
            customerId: 'THEBI',
            date: new Date(2018, 8, 1),
            name: 'Policy expiration',
            description: 'First warning',
            amount: 0
        }
    ];

    public getDocuments (customerId: string):
        Promise<IActivity[]> {

        var result: IActivity[] = [];
        result = this.mockItems.filter(a => a.customerId == customerId);

        return new Promise<IActivity[]>((resolve) => {
            resolve(result);
        });
    }
}
