import { DisplayMode } from "@microsoft/sp-core-library";
import ISection from "../../../../models/ISection";

interface ISectionContentProps {
    section: ISection;
    locale: string;
    displayMode: DisplayMode;
    onSectionUpdated(section: ISection);
}

export default ISectionContentProps;

   


