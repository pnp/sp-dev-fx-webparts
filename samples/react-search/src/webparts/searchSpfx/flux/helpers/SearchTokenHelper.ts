import { IWebPartContext } from '@microsoft/sp-client-preview';
import { IPageContext } from '../../utils/IPageContext';

import * as moment from 'moment';

declare const _spPageContextInfo: IPageContext;

export default class SearchTokenHelper {
    private regexVal: RegExp = /\{[^\{]*?\}/gi;

    constructor() {}

    public replaceTokens(restUrl: string, context: IWebPartContext): string {
        const tokens = restUrl.match(this.regexVal);

        if (tokens !== null && tokens.length > 0) {
            tokens.forEach((token) => {
                // Check which token has been retrieved
                if (token.toLowerCase().indexOf('today') !== -1) {
                    const dateValue = this.getDateValue(token);
                    restUrl = restUrl.replace(token, dateValue);
                }
                else if (token.toLowerCase().indexOf('user') !== -1) {
                    const userValue = this.getUserValue(token, context);
                    restUrl = restUrl.replace(token, userValue);
                }
                else {
                    switch (token.toLowerCase()) {
                        case "{site}":
                            restUrl = restUrl.replace(/{site}/ig, context.pageContext.web.absoluteUrl);
                            break;
                        case "{sitecollection}":
                            restUrl = restUrl.replace(/{sitecollection}/ig, _spPageContextInfo.siteAbsoluteUrl);
                            break;
                        case "{currentdisplaylanguage}":
                            restUrl = restUrl.replace(/{currentdisplaylanguage}/ig, context.pageContext.cultureInfo.currentCultureName);
                            break;
                    }
                }
            });
        }

		return restUrl;
    }

    private getDateValue(token: string): string {
        let dateValue = moment();
        // Check if we need to add days
        if (token.toLowerCase().indexOf("{today+") !== -1) {
            const daysVal = this.getDaysVal(token);
            dateValue = dateValue.add(daysVal, 'day');
        }
        // Check if we need to subtract days
        if (token.toLowerCase().indexOf("{today-") !== -1) {
            const daysVal = this.getDaysVal(token);
            dateValue = dateValue.subtract(daysVal, 'day');
        }
        return dateValue.format('YYYY-MM-DD');
    }

    private getDaysVal(token: string): number {
        const tmpDays: string = token.substring(7, token.length - 1);
        return parseInt(tmpDays) || 0;
    }

    private getUserValue(token: string, context: IWebPartContext): string {
        let userValue = '"' + context.pageContext.user.displayName + '"';

        if (token.toLowerCase().indexOf("{user.") !== -1) {
            const propVal = token.toLowerCase().substring(6, token.length - 1);
            switch (propVal) {
                case "name":
                    userValue = '"' + context.pageContext.user.displayName + '"';
                    break;
                case "email":
                    userValue = context.pageContext.user.email;
                    break;
            }
        }

        return userValue;
    }
}