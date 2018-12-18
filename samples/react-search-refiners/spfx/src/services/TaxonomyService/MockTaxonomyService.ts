
import ITaxonomyService from './ITaxonomyService';
import { ITerm } from '@pnp/sp-taxonomy';

class MockTaxonomyService implements ITaxonomyService {

    public initialize(): Promise<void> {
        const p1 = new Promise<void>((resolve, reject) => {
            resolve();
        });

        return p1;
    }

    public getTermsById(termIds: string[]): Promise<ITerm[]> {
        throw new Error('Method not implemented.');
    }
}

export default MockTaxonomyService;
