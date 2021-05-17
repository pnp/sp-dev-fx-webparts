import { sp, IEmailProperties } from '@pnp/sp/presets/all';
import { BaseService } from './base.service';
import { LogHelper } from 'utilities';

export class NotificationService extends BaseService {

    public async sendEmail(emailProps: IEmailProperties) {
        LogHelper.verbose(this.constructor.name, 'sendQuestionNotification', '');

        if (emailProps.Subject.length > 255) {
            emailProps.Subject = emailProps.Subject.substring(0, 252).concat('...');
        }

        //emailProps.Body = await this.processImages(emailProps.Body);

        if (emailProps.To && emailProps.To.length > 0) {
            await sp.utility.sendEmail(emailProps)
                .catch(e => {
                    super.handleHttpError('sendEmail', e);
                    throw e;
                });
            LogHelper.verbose(this.constructor.name, 'sendEmail', 'Email sent');
        }
        else {
            LogHelper.verbose(this.constructor.name, 'sendEmail', 'Email not sent - No to recipient');
        }
    }

    /*
    private async processImages(body: string): Promise<string> {
        let imgRegex = new RegExp('<img[^>]+src="([^">]+)"', "gi");
        let webUrl = await sp.web.get()
            .catch(e => {
                super.handleHttpError('processImages', e);
            });

        if (webUrl && webUrl.Url) {
            let imageUrlsToReplace: string[] = [];
            let result;
            while ((result = imgRegex.exec(body)) !== null) {
                let imageUrl = result[1] as string;
                if (imageUrl && imageUrl.toLowerCase().startsWith(webUrl.Url.toLowerCase()) && imageUrlsToReplace.indexOf(imageUrl) === -1) {
                    imageUrlsToReplace.push(imageUrl);
                }
            }

            for (let imageUrlToReplace of imageUrlsToReplace) {
                var blob = await sp.web.getFileByUrl(imageUrlToReplace)
                    .getBlob()
                    .catch(e => {
                        super.handleHttpError('processImages', e);
                    });
                if (blob) {
                    let imageAsData = await this.blobToData(blob)
                        .catch(e => {
                            super.handleHttpError('processImages', e);
                        });

                    let imageParts = imageUrlToReplace.split(".");
                    let extension = imageParts[imageParts.length - 1];
                    imageAsData = imageAsData.replace("data:application/octet-stream;", `data:image/${extension};`);
                    body = body.replace(imageUrlToReplace, imageAsData);
                }
            }
        }
        return body;
    }

    private blobToData(blob: Blob) {
        return new Promise<any>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }
    */
}
