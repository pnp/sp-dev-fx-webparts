import * as React from 'react';

import strings from 'BirthdaysWebPartStrings';
import { useAtom } from 'jotai';
import {
  format,
  IconButton,
  ITooltipHostStyles,
  Stack,
  Text,
  TooltipHost,
} from 'office-ui-fabric-react';

import { useId } from '@fluentui/react-hooks';

import { globalState } from '../../jotai/atoms/birthdays';
import { IGlobalState } from '../../models/birthdays';
import { useBirthdaysStyles } from './useBirthdaysStyles';

export interface IBirthdaysNavigationProps {
  onNextPage: () => void;
  showNextPage: boolean;
}

export const BirthdaysNavigation: React.FunctionComponent<IBirthdaysNavigationProps> = (
  props: React.PropsWithChildren<IBirthdaysNavigationProps>
) => {
  const [appGlobalState] = useAtom(globalState);
  const { users, currentShowingItems } = appGlobalState || ({} as IGlobalState);
  const { onNextPage, showNextPage } = props || ({} as IBirthdaysNavigationProps);
  const { navigationTextStyles } = useBirthdaysStyles();
  const calloutProps = { gapSpace: 0 };
  const tooltipId = useId("tooltip");

  const hostStyles: Partial<ITooltipHostStyles> = { root: { display: "inline-block" } };

  if (!users?.length) {
    return null;
  }
  return (
    <>
      <Stack verticalAlign="center" horizontal horizontalAlign="end" tokens={{ childrenGap: 20, padding:10 }}>
        <Text variant="medium" styles={navigationTextStyles}>
          {format(strings.showingNumberUserMessage,currentShowingItems,users?.length)   }
        </Text>
        {showNextPage ? (
          <TooltipHost content={strings.ShowNextPageToolTipLabel} id={tooltipId} calloutProps={calloutProps} styles={hostStyles}>
            <IconButton iconProps={{ iconName: "ChevronRightSmall" }} onClick={onNextPage} />
          </TooltipHost>
        ) : null}
      </Stack>
    </>
  );
};
