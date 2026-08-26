import * as React from 'react';
import { css } from '@emotion/css';
import { Button, Card, tokens } from '@fluentui/react-components';
import { Icon } from '@iconify/react';
import { StackV2, TypographyControl } from '@spteck/react-controls-v2';
import { IPlaceHolderProps } from './IPlaceHolderProps';
import { usePlaceHolderStyles } from './usePlaceHolderStyles';


export const PlaceHolder: React.FC<IPlaceHolderProps> = ({
  title,
  description,
  buttonLabel,
  onConfigure,
  height = 480,
}) => {
  const styles = usePlaceHolderStyles();
  const heightClass = css({ minHeight: height });

  return (
    <Card className={styles.card}>
      <StackV2
        direction="vertical"
        alignItems="center"
        justifyContent="center"
        gap="l"
        className={heightClass}
      >
        <Icon icon="material-symbols-light:gallery-thumbnail-outline" width={98} height={98} color={tokens.colorNeutralForeground2}/>
        <StackV2 direction="vertical" alignItems="center" gap="xs">
          <TypographyControl fontSize="l" fontWeight="semibold">
            {title}
          </TypographyControl>
          <TypographyControl fontSize="s" color={tokens.colorNeutralForeground2}>
            {description}
          </TypographyControl>
        </StackV2>
        <Button
          appearance="primary"
          icon={<Icon icon="fluent:settings-20-regular" width={16} height={16} />}
          onClick={onConfigure}
        >
          {buttonLabel}
        </Button>
      </StackV2>
    </Card>
  );
};

