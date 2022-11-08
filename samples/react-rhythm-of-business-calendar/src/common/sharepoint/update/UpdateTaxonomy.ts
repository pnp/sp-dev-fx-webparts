export class UpdateTaxonomy {
    public readonly __metadata = { "type": "SP.Taxonomy.TaxonomyFieldValue" };
    public readonly WssId = -1;

    constructor(
        public readonly Label: string,
        public readonly TermGuid: string
    ) {
    }
}