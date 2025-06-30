import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupOptionProps, IColorCellProps, SwatchColorPicker } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import React from "react";
import ColorsHelper, { ThemedPalette } from "../../common/ColorsHelper";
import { colorPickerStyles, disabledPickerStyle } from "../../common/ComponentStyles";
import { ISwatchColorPickerThemedProps } from "./ISwatchColorPickerThemedProps";


const SwatchColorPickerThemed: React.FunctionComponent<ISwatchColorPickerThemedProps> = (props) => {
    const baseId = useId('colorpicker');
    const [colorOptions, setColorOptions] = React.useState<IChoiceGroupOption[]>([]);
    const [selectedColor, setSelectedColor] = React.useState<string>();

    const getColorCells = (themeColors: string[]): IColorCellProps[] => {
        return themeColors.map((color, index) => {
            return {
                id: `${index}`,
                label: color,
                color: color,
                styles: disabledPickerStyle,
            };
        });
    }
    const _onRenderField = (props: IChoiceGroupOption & IChoiceGroupOptionProps, render: (props?: IChoiceGroupOption & IChoiceGroupOptionProps) => JSX.Element, colorCells: IColorCellProps[]): JSX.Element => {
        return (<>
            {render(props)}
            <SwatchColorPicker
                columnCount={5}
                cellHeight={15}
                cellWidth={15}
                cellMargin={2}
                cellShape={'square'}
                colorCells={colorCells}
                aria-labelledby={`${baseId}-circle`}
                styles={disabledPickerStyle}
            />
        </>);
    }

    React.useEffect(() => {

        if (props.configThemePalette) {
            const len = 5;
            const colorOptions: IChoiceGroupOption[] = props.configThemePalette.map((theme) => {
                const colorInfo = ColorsHelper.GetThemeMonochromaticColors(theme as ThemedPalette, len);
                return {
                    key: colorInfo.Id,
                    text: colorInfo.Name,
                    onRenderField: (props, render) => {
                        return _onRenderField(props, render, getColorCells(colorInfo.Colors));
                    },
                }
            });

            setColorOptions(colorOptions);
        }
    }, [props.configThemePalette]);

    React.useEffect(() => {
        if (props.themePalette) {
            setSelectedColor(props.themePalette);
        }
    }, [props.themePalette]);

    return <ChoiceGroup
        options={colorOptions}
        styles={colorPickerStyles}
        selectedKey={selectedColor}
        onChange={props.onChangeColorPalette}
        defaultSelectedKey={props.themePalette}
    />
}
export default SwatchColorPickerThemed;