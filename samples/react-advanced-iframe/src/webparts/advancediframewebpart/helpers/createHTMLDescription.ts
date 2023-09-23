import { IFrameDataModel } from "../models/IFrameDataModel";
import { HTMLDescriptionBuilder } from "./HTMLDescriptionBuilder";

/**
 * Creates the Description for this webpart
 * @param strings 
 * @param data 
 * @returns 
 */
export const createHTMLDescription = (strings: IAdvancedIFrameWebpartStrings, data: IFrameDataModel) => {


    return new HTMLDescriptionBuilder()
        .addHeadline2(strings.WebpartTitle)
        .addParagraph(strings.DescriptionGeneral1)
        .addParagraph(strings.DescriptionGeneral2)
        .addHeadline3(strings.DescriptionHeaderQuery)
        .addParagraph(strings.DescriptionDetailsQuery)
        .addPropertyTable(data.query, "query.")
        .addHeadline3(strings.DescriptionHeaderUser)
        .addPropertyTable(data.user, "user.")
        .addHeadline3(strings.DescriptionHeaderSite)
        .addPropertyTable(data.site, "site.")
        .addHeadline3(strings.DescriptionHeaderColors)
        .addPropertyTable(data.color, "color.")
        .addHeadline3(strings.DescriptionHeaderCulture)
        .addPropertyTable(data.culture, "culture.")
        .toString();

};