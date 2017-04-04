import * as React from 'react';
import { IStoreKey } from './storeKey';
export declare function connect<ORIGINAL_PROPS, NEW_PROPS>(component: React.ComponentClass<ORIGINAL_PROPS> | React.StatelessComponent<ORIGINAL_PROPS>, storesToSubscribe: IStoreKey<any>[], getProps: (props: ORIGINAL_PROPS, ...stores) => NEW_PROPS): React.StatelessComponent<NEW_PROPS>;
