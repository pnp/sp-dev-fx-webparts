import ISection from "../../../../models/ISection";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IWebPartContext } from "@microsoft/sp-webpart-base";

interface IPageSectionContainerProps {

    /**
     * The current locale
     */
    locale: string;

    /**
     * The current display mode of the WebPart (Display/Edit)
     */
    displayMode: DisplayMode;

    /**
     * The current context of the WebPart
     */
    context: IWebPartContext;

    /**
     * Persisted sections in the property bag of the Web Part
     */
    persistedSections: ISection[];

    /**
     * Callback when a section is updated (triggered by controls inside the section content or by the title of the section)
     * Used to persist sections into the Web Part itself as JSON
     */
    onSectionsUpdated: (sections: ISection[]) => void;
}

export default IPageSectionContainerProps;