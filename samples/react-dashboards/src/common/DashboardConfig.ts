/* eslint-disable @typescript-eslint/no-var-requires */
import { IChoiceGroupOption } from "@fluentui/react"
import { ChartPalette } from "@pnp/spfx-controls-react"
import stringsCommon from "CommonDasboardWebPartStrings"
import { ChartStyles, LayoutStyles, ListStyles } from "./DashboardHelper"

//https://developer.microsoft.com/en-us/fluentui#/styles/web/icons#fabric-react


const imageSize = {
    width: 100,
    height: 15
}

export const configLayoutStyles: IChoiceGroupOption[] = [
    {
        text: '100%',
        key: LayoutStyles.SingleColumn.toString(),
        iconProps: {
            iconName: 'SingleColumn'
        },
    },
    {
        text: '1:1',
        key: LayoutStyles.DoubleColumn.toString(),
        iconProps: {
            iconName: 'DoubleColumn'
        },
    },
    {
        text: '1:2',
        key: LayoutStyles.ColumnRightTwoThirds.toString(),
        iconProps: {
            iconName: 'ColumnRightTwoThirds'
        },
    },
    {
        text: '2:1',
        key: LayoutStyles.ColumnLeftTwoThirds.toString(),
        iconProps: {
            iconName: 'ColumnLeftTwoThirds'
        }
    },
]
export const configListStyles: IChoiceGroupOption[] = [
    {
        text: stringsCommon.LookListList,
        key: ListStyles.list.toString(),
        iconProps: {
            iconName: 'ShowResults'
        }
    },
    {
        text: stringsCommon.LookListHeatmap,
        key: ListStyles.heatmap.toString(),
        iconProps: {
            iconName: 'Waffle'
        }
    }
]
export const configChartStyles: IChoiceGroupOption[] = [
    {
        text: stringsCommon.lookChartLine,
        key: ChartStyles.linechart.toString(),
        iconProps: {
            iconName: 'LineChart'
        }
    },
    {
        text: stringsCommon.lookChartArea,
        key: ChartStyles.areachart.toString(),
        iconProps: {
            iconName: 'AreaChart'
        }
    },
    {
        text: stringsCommon.lookChartBar,
        key: ChartStyles.barchart.toString(),
        iconProps: {
            iconName: 'BarChartHorizontal'
        }
    },
    {
        text: stringsCommon.lookChartColumn,
        key: ChartStyles.columnchart.toString(),
        iconProps: {
            iconName: 'BarChartVertical'
        }
    },
    {
        text: stringsCommon.lookChartPie,
        key: ChartStyles.piechart.toString(),
        iconProps: {
            iconName: 'PieDouble'
        }
    }
]
export const configChartPalette: IChoiceGroupOption[] = [
    {
        key: ChartPalette.OfficeColorful1.toString(),
        text: stringsCommon.paletteCol1,
        imageSrc: String(require('./../assets/OfficeColorful1.png')),
        selectedImageSrc: String(require('./../assets/OfficeColorful1.png')),
        imageSize: imageSize
    },
    {
        key: ChartPalette.OfficeColorful2.toString(),
        text: stringsCommon.paletteCol2,
        imageSrc: String(require('./../assets/OfficeColorful2.png')),
        selectedImageSrc: String(require('./../assets/OfficeColorful2.png')),
        imageSize: imageSize
    },
    {
        key: ChartPalette.OfficeColorful3.toString(),
        text: stringsCommon.paletteCol3,
        imageSrc: String(require('./../assets/OfficeColorful3.png')),
        selectedImageSrc: String(require('./../assets/OfficeColorful3.png')),
        imageSize: imageSize
    },
    {
        key: ChartPalette.OfficeColorful4.toString(),
        text: stringsCommon.paletteCol4,
        imageSrc: String(require('./../assets/OfficeColorful4.png')),
        selectedImageSrc: String(require('./../assets/OfficeColorful4.png')),
        imageSize: imageSize
    },
    {
        key: ChartPalette.OfficeMonochromatic1.toString(),
        text: stringsCommon.paletteMono1,
        imageSrc: String(require('./../assets/OfficeMono1.png')),
        selectedImageSrc: String(require('./../assets/OfficeMono1.png')),
        imageSize: imageSize
    },
    {
        key: ChartPalette.OfficeMonochromatic2.toString(),
        text: stringsCommon.paletteMono2,
        imageSrc: String(require('./../assets/OfficeMono2.png')),
        selectedImageSrc: String(require('./../assets/OfficeMono2.png')),
        imageSize: imageSize
    },
    {
        key: ChartPalette.OfficeMonochromatic3.toString(),
        text: stringsCommon.paletteMono3,
        imageSrc: String(require('./../assets/OfficeMono3.png')),
        selectedImageSrc: String(require('./../assets/OfficeMono3.png')),
        imageSize: imageSize
    },
    {
        key: ChartPalette.OfficeMonochromatic4.toString(),
        text: stringsCommon.paletteMono4,
        imageSrc: String(require('./../assets/OfficeMono4.png')),
        selectedImageSrc: String(require('./../assets/OfficeMono4.png')),
        imageSize: imageSize
    },
    {
        key: ChartPalette.OfficeMonochromatic5.toString(),
        text: stringsCommon.paletteMono5,
        imageSrc: String(require('./../assets/OfficeMono5.png')),
        selectedImageSrc: String(require('./../assets/OfficeMono5.png')),
        imageSize: imageSize
    },
    {
        key: ChartPalette.OfficeMonochromatic6.toString(),
        text: stringsCommon.paletteMono6,
        imageSrc: String(require('./../assets/OfficeMono6.png')),
        selectedImageSrc: String(require('./../assets/OfficeMono6.png')),
        imageSize: imageSize
    },
    {
        key: ChartPalette.OfficeMonochromatic7.toString(),
        text: stringsCommon.paletteMono7,
        imageSrc: String(require('./../assets/OfficeMono7.png')),
        selectedImageSrc: String(require('./../assets/OfficeMono7.png')),
        imageSize: imageSize
    }
]