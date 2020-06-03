import { MSGraphClient } from "@microsoft/sp-http";
import IPersona from "./../models/IPersona";
import Constants from '../common/constants';

export class MsGraphService {

    private context = null;

    /**
     *
     */
    constructor(context: any) {
        this.context = context;
    }

    public async PatchExtension(userSettings: any): Promise<any> {

        try {

            let result = await this.PATCH(`/me/extensions/${Constants.ExtensionName}`, JSON.stringify(userSettings));

            return result;

        }
        catch (error) {
            console.log("Error in PatchExtension:", error);
            return null;
        }

    }

    public async CreateExtension(userSettings: any): Promise<any> {

        try {

            let result = await this.POST(`/me/extensions`, JSON.stringify(userSettings));

            return result;

        }
        catch (error) {
            console.log("Error in CreateExtension:", error);
            return null;
        }

    }

    public async GetExtension(): Promise<any> {

        try {

            let result = await this.GET(`/me/extensions/${Constants.ExtensionName}`);

            return result;

        }
        catch (error) {
            console.log("Error in GetExtension:", error);
            return null;
        }

    }
    public async DeleteExtension(): Promise<any> {

        try {

            let result = await this.DELETE(`/me/extensions/${Constants.ExtensionName}`);
            return result;

        }
        catch (error) {
            console.log("Error in DeleteExtension:", error);
            return null;
        }

    }

    public async GetUserProfile(): Promise<any> {

        try {

            let userResponse: any = await this.GET("/me");
            let photoResponse: any = await this.GET("/me/photo/$value", "blob");

            let user = {
                name: userResponse.displayName,
                email: userResponse.mail,
                phone: userResponse.businessPhones[0],
                photo: window.URL.createObjectURL(photoResponse)
            } as IPersona;

            return user;

        }
        catch (error) {
            console.log("Error in GetUserProfile:", error);
            return null;
        }


    }




    private GET(query: string, responseType?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
                client.api(query).responseType(responseType)
                    .get((error, response) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(response);
                    });
            });
        });
    }

    private POST(query: string, content: string) {
        return new Promise<any>((resolve, reject) => {
            this.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
                client.api(query)
                    .post(content, (error, response) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(response);
                    });
            });
        });
    }
    private PATCH(query: string, content: string) {
        return new Promise<any>((resolve, reject) => {
            this.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
                client.api(query)
                    .patch(content, (error, response, rawResponse) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(rawResponse);
                    });
            });
        });
    }
    private DELETE(query: string) {
        return new Promise<any>((resolve, reject) => {
            this.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
                client.api(query)
                    .delete((error, response, rawResponse) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(rawResponse);
                    });
            });
        });
    }




}