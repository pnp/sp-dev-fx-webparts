/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import react, * as React from 'react';

import { useAtom } from 'jotai';
import {
  MessageBarType,
  SpinnerSize,
} from 'office-ui-fabric-react';

import { Stack } from '@fluentui/react';

import { DEFAULT_PAGE_SIZE } from '../../constants';
import { globalState } from '../../jotai/atoms/birthdays';
import { IGlobalState } from '../../models/birthdays';
import { ShowMessage } from '../ShowMessage';
import { ShowSpinner } from '../ShowSpinner';
import { BirthdayCard } from './BirthdayCard';
import { BirthdaysNavigation } from './BirthdaysNavigation';
import { NoBirthdayCard } from './NoBirthdaysCard';
import { useBirthdaysStyles } from './useBirthdaysStyles';

export interface IListBirthdaysProps {}

const getPageIndex = (page: number, numberItemsPerPage: number): number => {
  return page * numberItemsPerPage;
};
export const ListBirthdays: React.FunctionComponent<IListBirthdaysProps> = (
  props: React.PropsWithChildren<IListBirthdaysProps>
) => {
  const [appGlobalState, setAppGlobalState] = useAtom(globalState);
  const { users, pageSize, isLoading, hasError, error, noBirthdaysMessage } = appGlobalState || ({} as IGlobalState);
  const { controlStyles } = useBirthdaysStyles();
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const pageIndex = React.useRef<number>(0);
  const [userBirthdaysToRender, setUserBirthdaysToRender] = React.useState<JSX.Element[]>([]);

  const loadUsers = React.useCallback(
    async (pageIndex: number): Promise<JSX.Element[]> => {
      if (!users?.length) {
        return [];
      }
      const pageToRender: JSX.Element[] = [];
      const numberItemsToLoad = pageSize ?? DEFAULT_PAGE_SIZE;
      const index = getPageIndex(pageIndex, numberItemsToLoad);
      const usersToLoad = users?.slice(index, index + numberItemsToLoad);
      for (let i = 0; i < usersToLoad.length; i++) {
        const user = usersToLoad[i];
        if (user) {
          pageToRender.push(<BirthdayCard key={`${user.email}_${i}`} user={user} />);
        }
      }
      return pageToRender;
    },
    [pageIndex, users, pageSize, setHasMore]
  );

  react.useEffect(() => {
    (async () => {
      if (isLoading) return;
      pageIndex.current = 0;
      const usersToRender = await loadUsers(pageIndex.current);
      setUserBirthdaysToRender([]);
      setAppGlobalState((prev) => ({ ...prev, currentShowingItems: usersToRender?.length }));
      setUserBirthdaysToRender(usersToRender?.length ? usersToRender : [<NoBirthdayCard key="nobirthday"  noBirthdaysMessage={noBirthdaysMessage}/>]);
      setHasMore((prevHasMore) => (usersToRender?.length < users?.length ? true : false));
    })();
  }, [isLoading, loadUsers, setUserBirthdaysToRender]);

  const onNextPage = React.useCallback(() => {
    (async () => {
      pageIndex.current = pageIndex.current + 1;
      const usersToRender = await loadUsers(pageIndex.current);
      const newBirtdaysToRender = [...userBirthdaysToRender, ...usersToRender];
      setAppGlobalState((prev) => ({ ...prev, currentShowingItems: newBirtdaysToRender.length }));
      setUserBirthdaysToRender((prevUsers) => newBirtdaysToRender);
      setHasMore((prevHasMore) => (newBirtdaysToRender?.length < users?.length ? true : false));
    })();
  }, [setUserBirthdaysToRender, loadUsers, userBirthdaysToRender, setHasMore, setAppGlobalState]);

  return (
    <>
      <Stack tokens={{ childrenGap: 10 }}>
        <ShowSpinner size={SpinnerSize.large} isShow={isLoading} />
        <ShowMessage messageBarType={MessageBarType.error} isShow={hasError}>
          {error?.message}
        </ShowMessage>
        {!isLoading && !hasError && (
          <>
            <BirthdaysNavigation onNextPage={onNextPage} showNextPage={hasMore} />
            <div className={controlStyles.scrollableContainerStyles}>
              <div className={controlStyles.ContainerGrid}>{userBirthdaysToRender}</div>
            </div>
          </>
        )}
      </Stack>
    </>
  );
};
