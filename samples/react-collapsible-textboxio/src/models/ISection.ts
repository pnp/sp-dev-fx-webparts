import IBaseSectionControl from "./IBaseSectionControl";

interface ISection {

    /**
     * Unique id of the section (Guid)
     */
    id: string;

    /**
     * Title of the section
     */
    title: string;

    /**
     * Controls to include in the section content zone
     */
    controls: IBaseSectionControl[];
}

export default ISection;