/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';

import { useAtom } from 'jotai';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';

import { useBirthdays } from '../../hooks/useBirthdays';
import { globalState } from '../../jotai/atoms/birthdaysTimeline/globalState';
import { IUser } from '../../models/birthdays';
import { ILoadResults } from '../../models/ILoadResults';
import { IBirthdaysTimelineProps } from './IBirthdaysTimelineProps';
import { RenderTimeline } from './RenderTimeLine';

export const BirthdaysTimelineControl: React.FunctionComponent<IBirthdaysTimelineProps> = (props: React.PropsWithChildren<IBirthdaysTimelineProps>) => {
  const { displayMode, title, updateProperty, context, numberDays, pageSize, theme} = props;
  const { getBirthDays } = useBirthdays(context, numberDays, pageSize);
  const [appGlobalState, setAppGlobalState] =useAtom(globalState)

  const loadUsers = React.useCallback(async (): Promise<ILoadResults> => {
    const mapdata: IUser[] = [];
    try {
      const users = (await getBirthDays()) || [];
      for (const user of users) {
        mapdata.push({
          email: user.fields.email,
          name: user.fields.Title,
          birthday: new Date(user.fields.Birthday),
          image: `/_layouts/15/userphoto.aspx?size=L&username=${user.fields.email}`,
          jobTitle: user.fields.JobTitle,
        });
      }
      return { mapdata, isloading: false, error: undefined };
    } catch (error) {
      return { mapdata: [], isloading: false, error: error };
    }
  }, [getBirthDays]);


  React.useEffect(() => {
    (async () => {
      setAppGlobalState({
        ...appGlobalState,
        ...props,
        theme: theme,
        users: [],
        isLoading: true,
        error: undefined,
      });
      const results: ILoadResults = await loadUsers();
      const { mapdata, isloading, error } = results;
      setAppGlobalState((prev) => ({
        ...prev,
        users: mapdata,
        isLoading: isloading,
        error: error,
        hasError: error !== undefined,
      }));
    })();
  }, [props]);

  return (
    <>
    <Stack horizontalAlign="start"  >
        <WebPartTitle displayMode={displayMode} title={title} updateProperty={updateProperty} />
        <RenderTimeline data-testid="birthdayTimeline-card"/>
    </Stack>
    </>
  );
};
