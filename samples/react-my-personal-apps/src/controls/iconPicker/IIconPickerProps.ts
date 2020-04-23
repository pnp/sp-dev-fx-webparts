export interface IIconPickerProps {
    /**
     * call-back function when icon selection has been confirmed
     */
    onSave(iconName: string): void;
    /**
     * call-back function when icon has changed
     */
    onChange?(iconName: string): void;
    /**
     * Specifies the label of the icon picker button
     */
    buttonLabel?: string;
    /**
     * Specifies if the picker button is disabled
     */
    disabled?: boolean;
    /**
     * Specifies a custom className for the picker button
     */
    buttonClassName?: string;
    /**
     * Specifies a custom className for the panel element
     */
    panelClassName?: string;
    /**
     * initially selected icon
     */
    currentIcon?: string;
}