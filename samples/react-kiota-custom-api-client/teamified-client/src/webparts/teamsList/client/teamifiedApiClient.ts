import {PingRequestBuilder} from './ping/pingRequestBuilder';
import {TeamsItemRequestBuilder} from './teams/item/teamsItemRequestBuilder';
import {TeamsRequestBuilder} from './teams/teamsRequestBuilder';
import {enableBackingStoreForSerializationWriterFactory, getPathParameters, ParseNodeFactoryRegistry, registerDefaultDeserializer, registerDefaultSerializer, RequestAdapter, SerializationWriterFactoryRegistry} from '@microsoft/kiota-abstractions';
import {JsonParseNodeFactory, JsonSerializationWriterFactory} from '@microsoft/kiota-serialization-json';
import {TextParseNodeFactory, TextSerializationWriterFactory} from '@microsoft/kiota-serialization-text';

/** The main entry point of the SDK, exposes the configuration and the fluent API. */
export class TeamifiedApiClient {
    /** Path parameters for the request */
    private readonly pathParameters: Record<string, unknown>;
    /** The ping property */
    public get ping(): PingRequestBuilder {
        return new PingRequestBuilder(this.pathParameters, this.requestAdapter);
    }
    /** The request adapter to use to execute the requests. */
    private readonly requestAdapter: RequestAdapter;
    /** The teams property */
    public get teams(): TeamsRequestBuilder {
        return new TeamsRequestBuilder(this.pathParameters, this.requestAdapter);
    }
    /** Url template to use to build the URL for the current request builder */
    private readonly urlTemplate: string;
    /**
     * Instantiates a new TeamifiedApiClient and sets the default values.
     * @param requestAdapter The request adapter to use to execute the requests.
     */
    public constructor(requestAdapter: RequestAdapter) {
        if(!requestAdapter) throw new Error("requestAdapter cannot be undefined");
        this.pathParameters = {};
        this.urlTemplate = "{+baseurl}";
        this.requestAdapter = requestAdapter;
        registerDefaultSerializer(JsonSerializationWriterFactory);
        registerDefaultSerializer(TextSerializationWriterFactory);
        registerDefaultDeserializer(JsonParseNodeFactory);
        registerDefaultDeserializer(TextParseNodeFactory);
        if (requestAdapter.baseUrl === undefined || requestAdapter.baseUrl === "") {
            requestAdapter.baseUrl = "https://localhost:7295";
        }
    };
    /**
     * Gets an item from the Teamified.Sdk.teams.item collection
     * @param id Unique identifier of the item
     * @returns a TeamsItemRequestBuilder
     */
    public teamsById(id: string) : TeamsItemRequestBuilder {
        if(!id) throw new Error("id cannot be undefined");
        const urlTplParams = getPathParameters(this.pathParameters);
        urlTplParams["id"] = id
        return new TeamsItemRequestBuilder(urlTplParams, this.requestAdapter);
    };
}
