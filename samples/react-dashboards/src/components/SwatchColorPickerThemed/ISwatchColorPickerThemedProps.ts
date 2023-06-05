import { IChoiceGroupOption } from "@fluentui/react";
import { ThemedPalette } from "../../common/ColorsHelper";

export interface ISwatchColorPickerThemedProps {
    configThemePalette: ThemedPalette[];
    themePalette: string
    onChangeColorPalette: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => void;
}
