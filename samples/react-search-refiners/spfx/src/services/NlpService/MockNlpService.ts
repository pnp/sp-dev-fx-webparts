import INlpService from "./INlpService";
import { INlpResponse } from "../../models/INlpResponse";

class MockNlpService implements INlpService {

    private _enhancedQueryData: INlpResponse;

    constructor() {
        // Define mock data
        this._enhancedQueryData = {
            alteredQuery: null,
            detectedLanguage: 'fr',
            topScoringIntent: {
                confidence: 0.8,
                detectedIntent: "Test"
            },
            entities: [
                {
                    entity: "assurance maladie",
                    resolution: {
                        values: [
                            "b261b287-750e-4699-8472-4ab04ab7601e"
                        ]
                    },
                    type:"BNCSearch.NormalizedSubject"
                },
                {
                    entity: "maladie",
                    resolution: {
                        values: [
                            "d003c2ff-0352-41d8-8890-b7825352fd83"
                        ]
                    },
                    type: "BNCSearch.NormalizedSubject"
                }
            ],
            enhancedQuery: `((assurance maladie maladie) OR ("b261b287-750e-4699-8472-4ab04ab7601e" OR "d003c2ff-0352-41d8-8890-b7825352fd83") XRANK(cb=500) (owstaxIdBNCSubject:L0|#b261b287-750e-4699-8472-4ab04ab7601e OR owstaxIdBNCSubject:L0|#d003c2ff-0352-41d8-8890-b7825352fd83)) XRANK(cb=400) (owstaxIdBNCSubject:GPP|#b261b287-750e-4699-8472-4ab04ab7601e OR owstaxIdBNCSubject:GPP|#d003c2ff-0352-41d8-8890-b7825352fd83)`
        };
    }

    /**
     * Interprets the user search query intents and return the optimized SharePoint query counterpart
     * @param rawQuery the user raw query input
     */
    public async enhanceSearchQuery(rawQuery: string): Promise<INlpResponse> {
        return this._enhancedQueryData;
    }
}

export default MockNlpService;