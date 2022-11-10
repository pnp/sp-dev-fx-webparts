export type imageGenerationAllowedSizes = "256x256" | "512x512" | "1024x1024";

export interface IGeneratedImagesRequest {
    readonly prompt: string;
    readonly n: number;
    readonly size: imageGenerationAllowedSizes;

    toJson(): string;
}

export default class GeneratedImagesRequest implements IGeneratedImagesRequest {
    readonly prompt: string;
    readonly n: number;
    readonly size: imageGenerationAllowedSizes;
    readonly response_format: string;

    constructor(
        imageDescription: string, 
        numberOfImagesToGenerate: number, 
        imageSize: imageGenerationAllowedSizes) {                

        if (numberOfImagesToGenerate > 10) throw Error("Cannot generate more than 10 images per request");

        this.prompt = imageDescription;
        this.n = numberOfImagesToGenerate;
        this.size = imageSize;
        this.response_format = 'b64_json';
    }

    public toJson(): string {
        return JSON.stringify(this);
    }
}