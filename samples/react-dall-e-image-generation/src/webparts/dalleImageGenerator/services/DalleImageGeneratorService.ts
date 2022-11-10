import GeneratedImagesRequest, { IGeneratedImagesRequest, imageGenerationAllowedSizes } from "../models/IGeneratedImagesRequest";
import { IGeneratedImagesResponse } from "../models/IGeneratedImagesResponse";
import Constants from '../Constants';

import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { HttpClient, IHttpClientOptions, HttpClientResponse } from "@microsoft/sp-http";

import { getSP } from "../pnpjsConfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/lists";
import "@pnp/sp/folders/list";
import "@pnp/sp/files/folder";

export interface IDalleImageGeneratorService {
    generateImages(
        imageDescription: string, 
        numberOfImagesToGenerate: number, 
        imageSize: imageGenerationAllowedSizes): Promise<IGeneratedImagesResponse>;

    saveImageToSiteAssetsLibrary(imageName: string, image: Blob): Promise<string>;
}

export default class DalleImageGeneratorService implements IDalleImageGeneratorService {

    private _httpClient: HttpClient;
    private _sp: SPFI;

    constructor(serviceScope:ServiceScope) { 
        serviceScope.whenFinished(async () => { 
            this._httpClient = serviceScope.consume(HttpClient.serviceKey);
        });
        this._sp = getSP();
    }

    public async saveImageToSiteAssetsLibrary(imageName: string, image: Blob): Promise<string> {
        const imageFileToSharePoint = await this._sp.web.lists.getByTitle("Documents").rootFolder.files.addChunked(imageName, image, undefined, true);
        const item = await imageFileToSharePoint.file.getItem<{ Id: number, Title: string, FileRef: string }>("Id", "Title", "FileRef");
        return item.FileRef;
    }

    public async generateImages(
        imageDescription: string, 
        numberOfImagesToGenerate: number, 
        imageSize: imageGenerationAllowedSizes): Promise<IGeneratedImagesResponse> {
        
        const generateImagesRequest: IGeneratedImagesRequest = 
            new GeneratedImagesRequest(imageDescription, numberOfImagesToGenerate, imageSize);

        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append('Authorization', `Bearer ${Constants.DalleApiKey}`);

        const httpClientOptions: IHttpClientOptions = {
            body: generateImagesRequest.toJson(),
            headers: requestHeaders
        };
        
        const response: HttpClientResponse =
            await this._httpClient.post(
                "https://api.openai.com/v1/images/generations", 
                HttpClient.configurations.v1,
                httpClientOptions);

        const generateImagesResponse: IGeneratedImagesResponse = await response.json();        

        return generateImagesResponse;
    }
}

export const DalleImageGeneratorServiceKey = ServiceKey.create<IDalleImageGeneratorService>("pnp:dalleImageGeneratorService", DalleImageGeneratorService);