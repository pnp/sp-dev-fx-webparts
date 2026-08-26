import * as React from 'react';
import { Button, Text, tokens } from '@fluentui/react-components';
import { Settings20Regular } from '@fluentui/react-icons';
import { css } from '@emotion/css';
import * as strings from 'GanttWebPartStrings';

const placeholderStyles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    gap: '16px',
    textAlign: 'center',
    minHeight: '280px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
  }),
  icon: css({
    width: '48px',
    height: '48px',
    color: tokens.colorBrandForeground1,
  }),
  title: css({
    fontWeight: tokens.fontWeightSemibold,
  }),
  description: css({
    color: tokens.colorNeutralForeground2,
    maxWidth: '420px',
    paddingTop: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXL,
  }),
};

export interface IGanttPlaceholderProps {
  onConfigure: () => void;
}

export const GanttPlaceholder: React.FC<IGanttPlaceholderProps> = React.memo(({ onConfigure }) => (
  <div className={placeholderStyles.container}>
    <Settings20Regular className={placeholderStyles.icon} />
    <Text size={500} className={placeholderStyles.title}>
      {strings.PlaceholderTitle}
    </Text>
    <Text size={300} className={placeholderStyles.description}>
      {strings.PlaceholderDescription}
    </Text>
    <Button appearance="primary" onClick={onConfigure}>
      {strings.PlaceholderConfigureButton}
    </Button>
  </div>
));


