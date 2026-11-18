import * as React from 'react';
import {
  Caption1,
  ProgressBar,
  Text,
  createFocusOutlineStyle,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens
} from '@fluentui/react-components';
import { CheckmarkFilled, Warning16Filled } from '@fluentui/react-icons';
import * as strings from 'UpcStrings';
import { formatString } from '../Shared/format';

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
    '@container (max-width: 560px)': {
      width: '100%'
    }
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    width: '208px',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    '@container (max-width: 560px)': {
      display: 'none'
    }
  },

  compact: {
    display: 'none',
    '@container (max-width: 560px)': {
      display: 'flex',
      flexDirection: 'column',
      rowGap: tokens.spacingVerticalXS
    }
  },
  item: {
    display: 'grid',
    gridTemplateColumns: '24px 1fr',
    columnGap: tokens.spacingHorizontalS,
    alignItems: 'center',
    width: '100%',
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    ...shorthands.borderStyle('none'),
    textAlign: 'left',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    cursor: 'default',
    position: 'relative',
    ...createFocusOutlineStyle()
  },
  itemClickable: {
    cursor: 'pointer',
    ':hover': {
      color: tokens.colorBrandForeground1,
      textDecorationLine: 'underline'
    }
  },
  indicator: {
    width: '24px',
    height: '24px',
    boxSizing: 'border-box',
    borderRadius: tokens.borderRadiusCircular,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStrokeAccessible),
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackground1
  },
  indicatorCurrent: {
    ...shorthands.borderColor(tokens.colorBrandBackground),
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand
  },
  indicatorDone: {
    ...shorthands.borderColor(tokens.colorBrandBackground),
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand
  },
  indicatorError: {
    ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1
  },
  labelCurrent: {
    fontWeight: tokens.fontWeightSemibold
  },
  labelUpcoming: {
    color: tokens.colorNeutralForeground3
  },
  connector: {
    width: tokens.strokeWidthThin,
    height: '16px',
    backgroundColor: tokens.colorNeutralStroke1,
    marginLeft: '11px'
  }
});

export interface IWizardStepperProps {
  labels: string[];
  current: number;
  onStepClick: (step: number) => void;
  errorSteps?: ReadonlySet<number>;
}

export const WizardStepper: React.FC<IWizardStepperProps> = React.memo(function WizardStepper({
  labels,
  current,
  onStepClick,
  errorSteps
}) {
  const styles = useStyles();
  return (
    <nav aria-label={strings.WizardStepsAriaLabel} className={styles.root}>
      <div className={styles.compact}>
        <Caption1>
          {formatString(strings.WizardStepOfLabel, String(current + 1), String(labels.length))}
        </Caption1>
        <Text weight="semibold">{labels[current]}</Text>
        <ProgressBar
          value={(current + 1) / labels.length}
          aria-label={strings.WizardStepsAriaLabel}
        />
      </div>
      <ol className={styles.list}>
        {labels.map((label, index) => {
          const done: boolean = index < current;
          const isCurrent: boolean = index === current;
          const hasError: boolean = done && (errorSteps?.has(index) ?? false);
          const stepAriaLabel: string = hasError
            ? `${label} (${strings.WizardStepHasErrorsAria})`
            : done
              ? `${label} (${strings.WizardStepCompletedAria})`
              : label;
          return (

            <li key={index}>
              {index > 0 ? <div className={styles.connector} aria-hidden="true" /> : undefined}
              <button
                type="button"
                className={mergeClasses(styles.item, done && styles.itemClickable)}
                disabled={!done}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={stepAriaLabel}
                onClick={done ? () => onStepClick(index) : undefined}
              >
                <span
                  className={mergeClasses(
                    styles.indicator,
                    isCurrent && styles.indicatorCurrent,
                    done && !hasError && styles.indicatorDone,
                    hasError && styles.indicatorError
                  )}
                  aria-hidden="true"
                >
                  {hasError ? <Warning16Filled fontSize={12} /> : done ? <CheckmarkFilled fontSize={12} /> : index + 1}
                </span>
                <span
                  className={mergeClasses(
                    isCurrent && styles.labelCurrent,
                    !done && !isCurrent && styles.labelUpcoming
                  )}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
