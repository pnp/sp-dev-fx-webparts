/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import {
  FontSizes,
  FontWeights,
} from 'office-ui-fabric-react';
import { ITextStyles } from 'office-ui-fabric-react/lib/components/Text';
import { IImageStyles } from 'office-ui-fabric-react/lib/Image';
import { useRecoilState } from 'recoil';

import { useUtils } from '../../hooks/useUtils';
import { globalState } from '../../recoil/atoms/globalState';

export const useFlightStatusStyles = () => {
  const [appState, setGlobalState] = useRecoilState(globalState);
  const { currentTheme } = appState;
  const { getFlightStatusColor } = useUtils();
  const imageStyles: Partial<IImageStyles> = {
    root: { border: "1px solid ", borderRadius: "50%", padding: 5 },
  };

  const getFlightStatusStyles = React.useCallback((status:string): ITextStyles => {
    return {
      root: {
        color: getFlightStatusColor(status),
        fontWeight: FontWeights.bold,
        FontSizes: FontSizes.mediumPlus,
      },
    };
  }, [getFlightStatusColor]);

  return { imageStyles,getFlightStatusStyles };
};
