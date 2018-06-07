
import ITaxonomyDataProvider from "./ITaxonomyDataProvider";

class MockTaxonomyDataProvider implements ITaxonomyDataProvider {

    public initialize(): Promise<void> {
        const p1 = new Promise<void>((resolve, reject) => {
            resolve();
        });

        return p1;
    }

    public getTermsById(termIds: string[]): Promise<SP.Taxonomy.TermCollection> {
        throw new Error("Method not implemented.");
    }
}

export default MockTaxonomyDataProvider;
