import * as React from 'react';
import ISectionContentProps from './ISectionContentProps';
import SectionEdit from "./EditMode/SectionEdit";
import SectionView from "./DisplayMode/SectionView";
import { DisplayMode } from '@microsoft/sp-core-library';

export default class SectionContent extends React.Component<ISectionContentProps, null> {

    public render(): React.ReactElement<ISectionContentProps> {

        let renderSectionContent: JSX.Element = null;

        if (this.props.displayMode === DisplayMode.Edit) {
            renderSectionContent = <SectionEdit 
                        section={ this.props.section }
                        onSectionUpdated={ this.props.onSectionUpdated}
                        locale={ this.props.locale }
                        />;

        } else {
            renderSectionContent = <SectionView section={ this.props.section } />;
        }

        return  <div>
                    { renderSectionContent }
                </div>;
    }
}
