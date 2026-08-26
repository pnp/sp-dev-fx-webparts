import { css } from '@emotion/css';
import { tokens } from '@fluentui/react-components';

/**
 * Maps Fluent UI 9 design tokens to SVAR Gantt CSS custom properties.
 * Returns an @emotion/css class name for the wrapper div.
 */
export function useGanttFluentThemeClass(isDark: boolean): string {
  return css`
    /* ---------- SVAR Core variables ---------- */
    --wx-font-family: ${tokens.fontFamilyBase};
    --wx-font-size: ${tokens.fontSizeBase300};
    --wx-font-size-sm: ${tokens.fontSizeBase200};
    --wx-font-weight: ${tokens.fontWeightRegular};
    --wx-font-weight-md: ${tokens.fontWeightSemibold};
    --wx-color-font: ${tokens.colorNeutralForeground1};
    --wx-color-secondary-font: ${tokens.colorNeutralForeground2};
    --wx-background: ${tokens.colorNeutralBackground1};
    --wx-background-alt: ${tokens.colorNeutralBackground2};
    --wx-border: 1px solid ${tokens.colorNeutralStroke1};

    /* ---------- Gantt borders ---------- */
    --wx-gantt-border: 1px solid ${tokens.colorNeutralStroke1};
    --wx-gantt-form-header-border: none;
    --wx-gantt-icon-color: ${tokens.colorNeutralForeground3};

    /* ---------- Bars ---------- */
    --wx-gantt-bar-font: ${tokens.fontWeightRegular} ${tokens.fontSizeBase300}
      ${tokens.fontFamilyBase};
    --wx-gantt-bar-border-radius: ${tokens.borderRadiusMedium};
    --wx-gantt-milestone-border-radius: ${tokens.borderRadiusMedium};

    /* Task bar (mapped from Fluent brand tokens) */
    --wx-gantt-task-color: ${tokens.colorBrandBackground};
    --wx-gantt-task-font-color: ${tokens.colorNeutralForegroundOnBrand};
    --wx-gantt-task-fill-color: ${tokens.colorBrandBackground};
    --wx-gantt-task-border-color: ${tokens.colorBrandBackground};
    --wx-gantt-task-border: 1px solid transparent;

    /* Summary / Project bar (green palette) */
    --wx-gantt-project-color: ${tokens.colorPaletteGreenBackground3};
    --wx-gantt-project-font-color: ${tokens.colorNeutralForegroundOnBrand};
    --wx-gantt-project-fill-color: ${tokens.colorPaletteGreenForeground1};
    --wx-gantt-project-border-color: ${tokens.colorPaletteGreenForeground1};
    --wx-gantt-project-border: 1px solid transparent;

    /* Milestone (berry / purple palette) */
    --wx-gantt-milestone-color: ${tokens.colorPaletteBerryForeground1};

    /* Selection / link */
    --wx-gantt-select-color: ${tokens.colorNeutralBackground1Hover};
    --wx-gantt-link-color: ${tokens.colorNeutralForeground3};
    --wx-gantt-link-marker-background: ${tokens.colorNeutralBackground1Hover};
    --wx-gantt-link-marker-color: ${tokens.colorNeutralForeground3};

    /* Bar shadow */
    --wx-gantt-bar-shadow: ${tokens.shadow4};

    /* Progress */
    --wx-gantt-progress-marker-height: 26px;
    --wx-gantt-progress-border-color: ${tokens.colorNeutralStroke1};

    /* Baseline */
    --wx-gantt-baseline-border-radius: ${tokens.borderRadiusSmall};

    /* ---------- Grid ---------- */
    --wx-grid-header-font: ${tokens.fontWeightSemibold} ${tokens.fontSizeBase300}
      ${tokens.fontFamilyBase};
    --wx-grid-header-font-color: ${tokens.colorNeutralForeground1};
    --wx-grid-header-text-transform: capitalize;
    --wx-grid-header-shadow: none;

    --wx-grid-body-font: ${tokens.fontWeightRegular} ${tokens.fontSizeBase300}
      ${tokens.fontFamilyBase};
    --wx-grid-body-font-color: ${tokens.colorNeutralForeground1};
    --wx-grid-body-row-border: 1px solid ${tokens.colorNeutralStroke1};
    --wx-grid-body-cell-border: 1px solid transparent;

    /* ---------- Time-scale ---------- */
    --wx-timescale-font: ${tokens.fontWeightSemibold} ${tokens.fontSizeBase200}
      ${tokens.fontFamilyBase};
    --wx-timescale-font-color: ${tokens.colorNeutralForeground1};
    --wx-timescale-text-transform: uppercase;
    --wx-timescale-shadow: none;
    --wx-timescale-border: 1px solid ${tokens.colorNeutralStroke1};

    /* ---------- Holidays ---------- */
    --wx-gantt-holiday-background: ${tokens.colorNeutralBackground3};
    --wx-gantt-holiday-color: ${tokens.colorNeutralForeground3};

    /* ---------- Markers ---------- */
    --wx-gantt-marker-font: ${tokens.fontWeightSemibold} ${tokens.fontSizeBase200}
      ${tokens.fontFamilyBase};
    --wx-gantt-marker-font-color: ${tokens.colorNeutralForegroundInverted};
    --wx-gantt-marker-color: ${tokens.colorBrandForegroundLink};

    /* ---------- Tooltips ---------- */
    --wx-tooltip-font: ${tokens.fontWeightRegular} ${tokens.fontSizeBase300}
      ${tokens.fontFamilyBase};
    --wx-tooltip-font-color: ${tokens.colorNeutralForegroundInverted};
    --wx-tooltip-background: ${tokens.colorNeutralBackgroundInverted};

    /* ---------- Sidebar ---------- */
    --wx-sidebar-close-icon: ${tokens.colorNeutralStroke1};

    /* ---------- Layout ---------- */
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: ${tokens.colorNeutralForeground1};
    background: ${tokens.colorNeutralBackground1};
    font-family: ${tokens.fontFamilyBase};
    ${isDark ? 'color-scheme: dark;' : ''}

    /* Stretch every intermediate wrapper so the Gantt fills the Card */
    & > *:not(link) {
      flex: 1 1 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    .wx-gantt {
      flex: 1 1 0;
      min-height: 0;
      height: 100%;
    }

    /* ---------- Scrollbar ---------- */
    * {
      scrollbar-width: thin;
      scrollbar-color: ${tokens.colorBrandBackground} transparent;
    }
    *::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    *::-webkit-scrollbar-thumb {
      background: ${tokens.colorBrandBackground};
      border-radius: ${tokens.borderRadiusMedium};
    }
    *::-webkit-scrollbar-thumb:hover {
      background: ${tokens.colorBrandBackgroundHover};
    }
    *::-webkit-scrollbar-track {
      background: transparent;
    }
  `;
}
