import * as React from 'react';

import strings from 'BirthdaysWebPartStrings';
import { Provider } from 'jotai';
import { ThemeProvider } from 'office-ui-fabric-react';

import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';

import { BirthdaysControl } from './BirthdaysControl';
import { IBirthdaysProps } from './IBirthdaysProps';

export const Birthdays: React.FunctionComponent<IBirthdaysProps> = (
  props: React.PropsWithChildren<IBirthdaysProps>
) => {

  const { onConfigure , theme}  = props || ({} as IBirthdaysProps);
  const { pageSize, gridHeight , numberDays } = props || ({} as IBirthdaysProps);

  if (!pageSize || !gridHeight || !numberDays) {
    return (
      <Placeholder
        iconName="Edit"
        iconText={strings.PlaceHolderIconText}
        description={strings.PlaceHolderDescription}
        buttonLabel={strings.PlaceHolderButtonLabel}
        onConfigure={onConfigure}
      />
    );
  }

  return (
    <>
      <ThemeProvider  theme={theme}>
      <Provider>
        <BirthdaysControl {...props} />
      </Provider>
      </ThemeProvider>
    </>
  );
};
