import { getTheme, FontWeights, AnimationStyles, FontSizes } from '@fluentui/react/lib/Styling';
import { mergeStyleSets } from '@fluentui/merge-styles';
import { NeutralColors, MotionDurations, Depths } from '@fluentui/theme';
import { ISpinnerStyles } from '@fluentui/react/lib/Spinner';

const theme = getTheme();
const ThemeState = (<any>window).__themeState__;
function getThemeColor(slot: string) {
    if (ThemeState && ThemeState.theme && ThemeState.theme[slot]) {
        return ThemeState.theme[slot];
    }
    return theme[slot as keyof typeof theme];
}

export const loadingSpinnerStyles: Partial<ISpinnerStyles> = {
    root: {
        ...AnimationStyles.fadeIn200,
        animationDuration: MotionDurations.duration4
    },
    label: {
        fontSize: "14px", 
        fontWeight: 400,
        color: NeutralColors.white
    }
}

export interface ISummariseStyles {
    mainContainer: string;
    titleContainer: string;
    icon: string;
    title: string;
    description: string;
    descriptionContainer: string;
    language: string;
}

export const summariseStyles: ISummariseStyles = mergeStyleSets({
    mainContainer: {
        ...AnimationStyles.slideRightIn400,
        animationDuration: MotionDurations.duration4,
        backgroundColor: getThemeColor('themePrimary'),
        borderLeft: '5px solid ' + getThemeColor('themeDarker'),
        color: NeutralColors.white,
        padding: '10px',
        borderRadius: '5px',
        boxShadow: Depths.depth16,
        minHeight: '100px'
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        ...AnimationStyles.slideRightIn400,
        fontSize: FontSizes.xLarge,
        fontWeight: FontWeights.regular,
        marginRight: '10px'
    },
    title: {
        ...AnimationStyles.slideRightIn400,
        fontSize: FontSizes.xLarge,
        fontWeight: FontWeights.semibold,
        marginBottom: '6px'
    },
    descriptionContainer: {
        display: 'flex'
    },
    description: {
        ...AnimationStyles.fadeIn500,
        fontSize: FontSizes.mediumPlus,
        fontWeight: FontWeights.regular,
        marginBottom: '10px'
    },
    language: {
        fontWeight: FontWeights.semibold
    }
});
