import * as React from 'react';

import { Stack } from 'office-ui-fabric-react';

import { Loader } from '@mantine/core';

export interface ILoadingProps {
  isLoading: boolean;
}

export const Loading: React.FunctionComponent<ILoadingProps> = (props: React.PropsWithChildren<ILoadingProps>) => {
  const { isLoading } = props;
  if (!isLoading) return null;
  return (
    <>
    <Stack  tokens={{padding: 5}} horizontalAlign={"start"}>
      <Loader variant="dots" />
    </Stack>
    </>
  );
};
