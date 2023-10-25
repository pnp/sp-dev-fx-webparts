/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as react from 'react';

import { IStackStyles } from 'office-ui-fabric-react/lib/Stack';

export const useFlightSelectorStyles =  () => {
    const stackContainer : IStackStyles = react.useMemo(()=> {
        return {
            root: {
                paddingTop: 10,
            },
        }
    },[]);

    return {stackContainer}
};
