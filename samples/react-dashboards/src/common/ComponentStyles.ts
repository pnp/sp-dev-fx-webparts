import { createTheme, getColorFromString, getTheme, IButtonStyles, IChoiceGroupStyles, IColor, IIconProps, ILinkStyles, IPivotStyles, IShimmerStyles, IStackItemStyles, IStackStyles, IStackTokens, ISwatchColorPickerStyles, ITextStyles } from "@fluentui/react";

const theme = (process.env.NODE_ENV !== 'production')
    ? createTheme({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        palette: (window as any).__themeState__.theme
    })
    : getTheme();

const spacing4px = theme.spacing.s2;
const spacing8px = theme.spacing.s1;
const spacing16px = theme.spacing.m;
const spacing20px = theme.spacing.l1;
// const spacing32px = theme.spacing.l2;

const fontSmall = theme.fonts.small.fontSize;
const minWidth=280;

const getColorRGB = (color: string): string => {
    const col: IColor = getColorFromString(color);
    return `${col.r},${col.g},${col.b}`;
}
const getColorRGBA = (color: string, opacity: string | number): string => {
    const col: IColor = getColorFromString(color);
    return `rgba(${col.r},${col.g},${col.b},${opacity})`;
}

const teamsPadding = `0px ${spacing16px} 0px ${spacing20px}`

const stackTokens: IStackTokens = { childrenGap: `${spacing8px} ${spacing8px}` }; //rowGap columnGap 8px 4px
const stackStylesMain: Partial<IStackStyles> = {
    root: {
        backgroundColor: 'inherit'
    }
}

const stackStylesDatePicker: Partial<IStackStyles> = {
    root: {
        display: 'flex',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.neutralTertiaryAlt,
        borderRadius: theme.effects.roundedCorner6,
        alignItems: 'center',
        width: 'fit-content',
        backgroundColor: theme.palette.neutralQuaternary,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: spacing8px,
        paddingRight: spacing8px
    },
}

const stackItemStyles: Partial<IStackItemStyles> = {
    root: {
        alignItems: 'center',
        display: 'block',
        justifyContent: 'center',
        fontSize: fontSmall,
        minWidth: minWidth
    },
};

const stackItemStyles100: Partial<IStackItemStyles> = {
    root: {
        width: '100%'
    }
}
const stackItemStyles50: Partial<IStackItemStyles> = {
    root: {
        width: `calc(50% - ${spacing8px})`,
    }
}
const stackItemStyles66: Partial<IStackItemStyles> = {
    root: {
        width: `calc(60% - ${spacing4px})`,
    }
}
const stackItemStyles33: Partial<IStackItemStyles> = {
    root: {
        width: `calc(30% - ${spacing4px})`,
    }
}

const headerStyles: Partial<ITextStyles> = {
    root: {
        fontWeight: theme.fonts.medium.fontWeight
    }
}
const applyBtnStyles: Partial<IButtonStyles> = {
    root: {
        width: 100,
        alignSelf: 'end'
    }
}
const pivotStylesDashboard: Partial<IPivotStyles> = {
    root: {
        backgroundColor: theme.palette.neutralTertiary,
        color: theme.palette.neutralDark,
        display: 'flex',
        flexFlow:'wrap'
    },
    itemContainer: {
        padding: spacing8px,
        paddingTop:0,
        backgroundColor: theme.palette.neutralTertiaryAlt
    }
}

const linkStyles: Partial<ILinkStyles> = {
    root: {
        alignSelf: 'end',
        fontSize: fontSmall,
        maxWidth:'100%',
        textAlign:'end'
    }
}
const helpIcon: IIconProps = { iconName: 'Info' };

const shimmerStyleChart: Partial<IShimmerStyles> = {
    root: {
        minHeight: '200px'
    },
    shimmerWrapper: {
        height: '100%'
    }
}

const chartTheme = createTheme({
    semanticColors: {
        bodyBackground: getColorRGBA(theme.semanticColors.bodyBackground, 0.85),
    },
    fonts:{
        medium: {
            fontSize: theme.fonts.small.fontSize,
            fontWeight: theme.fonts.medium.fontWeight
        },
        small: {
            fontSize: theme.fonts.small.fontSize,
            fontWeight: theme.fonts.small.fontWeight
        },
    }
})
// transparent theme
const transparentTheme = createTheme({
    semanticColors: {
        bodyBackground: getColorRGBA(theme.semanticColors.bodyBackground, 0.5),
    },
    palette: {
        white: getColorRGBA(theme.semanticColors.bodyBackground, 0.7),
    }
});

const heatmapStyles = {
    minWidth:minWidth
}
const datePickerStyles: { stack: Partial<IStackStyles>, text: Partial<ITextStyles> } ={
    stack: stackStylesDatePicker,
    text: headerStyles
}
const dashboardStyles: { applyBtn: Partial<IButtonStyles>, link: Partial<ILinkStyles>, pivot: Partial<IPivotStyles>, helpIcon: IIconProps }={
    applyBtn:applyBtnStyles,
    link:linkStyles,
    pivot:pivotStylesDashboard,
    helpIcon:helpIcon
}
const stackStyles:{item:Partial<IStackItemStyles>,item100:Partial<IStackItemStyles>,item33:Partial<IStackItemStyles>,item50:Partial<IStackItemStyles>,item66:Partial<IStackItemStyles>}={
    item:stackItemStyles,
    item100:stackItemStyles100,
    item33:stackItemStyles33,
    item50:stackItemStyles50,
    item66:stackItemStyles66
}
const disabledPickerStyle: Partial<ISwatchColorPickerStyles> = {
    tableCell: {
        'button': {
            border: 'none',
            padding: '0px',
        },
        'button:hover': {
            padding: '0px',
            border: 'none',
            cursor: 'auto',
        }
    }
}
const colorPickerStyles: Partial<IChoiceGroupStyles> = {
    flexContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
    label: { display: 'flex', flexDirection: 'column' }
}

export {
    chartTheme, colorPickerStyles, dashboardStyles, datePickerStyles, disabledPickerStyle, getColorRGB,
    getColorRGBA, heatmapStyles, linkStyles, shimmerStyleChart, stackStyles,
    stackStylesMain, stackTokens, teamsPadding, theme, transparentTheme
};

