import * as React from 'react';
export interface IMobilePreviewURLEntryProps {
    onChangeURL: (value: string) => void;
    onClickURLSubmit: () => void;
}
export default class MobilePreviewURLEntry extends React.Component<IMobilePreviewURLEntryProps, {}> {
    render(): React.ReactElement<{}>;
    /**
     * If the URL is not valid, an error page displays as it would in the browser. As such, no additional validation is
     * conducted here aside from not allowing a blank entry.
     */
    private _validateAndCompleteURL;
}
//# sourceMappingURL=MobilePreviewURLEntry.d.ts.map