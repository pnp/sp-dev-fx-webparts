import * as React from 'react';
import { Badge } from '@fluentui/react-components';
import { CheckmarkCircleFilled, DismissCircleFilled } from '@fluentui/react-icons';
import { DEFAULT_LIST_VIEW_STRINGS } from '../constants';
import { useBooleanCellStyles } from './BooleanCell.styles';
import type { IBooleanCellProps } from './BooleanCell.types';

/** Renders a boolean value as a badge, icon, or plain text. */
export const BooleanCell: React.FC<IBooleanCellProps> = ({
  value,
  format,
  defaultTrueLabel = DEFAULT_LIST_VIEW_STRINGS.booleanTrueLabel,
  defaultFalseLabel = DEFAULT_LIST_VIEW_STRINGS.booleanFalseLabel
}) => {
  const styles = useBooleanCellStyles();
  const trueLabel = format?.trueLabel ?? defaultTrueLabel;
  const falseLabel = format?.falseLabel ?? defaultFalseLabel;
  const appearance = format?.appearance ?? 'badge';

  if (appearance === 'icon') {
    return value
      ? <span className={styles.truthy} title={trueLabel}><CheckmarkCircleFilled /></span>
      : <span className={styles.falsy} title={falseLabel}><DismissCircleFilled /></span>;
  }
  if (appearance === 'text') {
    return <span>{value ? trueLabel : falseLabel}</span>;
  }
  return (
    <Badge appearance="filled" color={value ? 'success' : 'danger'}>
      {value ? trueLabel : falseLabel}
    </Badge>
  );
};

export type { IBooleanCellProps } from './BooleanCell.types';

