import ISection from "../../../../models/ISection";
import { DisplayMode } from "@microsoft/sp-core-library";

interface ICollapsibleSectionsProps {
    displayMode: DisplayMode;
    locale: string;
    sections: ISection[];
    onAddSection: (section: ISection, index: number) => void;
    onRemoveSection: (section: ISection, index: number) => void;
    onSectionUpdated: (section: ISection, index: number) => void;
}

export default ICollapsibleSectionsProps;

