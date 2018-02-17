import ISection from "../../../../../models/ISection";

interface ISectionEditProps {
    section: ISection;
    locale: string; // Locale used for the content editor control only
    onSectionUpdated(section: ISection);
}

export default ISectionEditProps;