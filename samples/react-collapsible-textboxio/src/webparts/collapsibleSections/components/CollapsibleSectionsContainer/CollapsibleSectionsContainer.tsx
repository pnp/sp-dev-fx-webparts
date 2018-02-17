import * as React from "react";
import ICollapsibleSectionsContainerProps from "./ICollapsibleSectionsContainerProps";
import ICollapsibleSectionsContainerState from "./ICollapsibleSectionsContainerState";
import ISection from "../../../../models/ISection";
import { Text } from "@microsoft/sp-core-library";
import CollapsibleSections from "../CollapsibleSections/CollapsibleSections";
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Overlay } from 'office-ui-fabric-react/lib/Overlay';
import * as strings from "CollapsibleSectionsWebPartStrings";
import * as update from 'immutability-helper';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { SPComponentLoader } from "@microsoft/sp-loader";
import groupBy from "lodash-es/groupBy";
import { ConsoleListener, Logger, LogLevel } from "sp-pnp-js";

export default class CollapsibleSectionsContainer extends React.Component<ICollapsibleSectionsContainerProps, ICollapsibleSectionsContainerState> {


    public constructor(props: ICollapsibleSectionsContainerProps) {
        super(props);

        this.state = {
            sections: [],
        };
        
        const consoleListener = new ConsoleListener();
        Logger.subscribe(consoleListener);

        // Bind callbacks
        this._onSectionAdded = this._onSectionAdded.bind(this);
        this._onSectionRemoved = this._onSectionRemoved.bind(this);
        this._onSectionUpdated = this._onSectionUpdated.bind(this);
    }

    public render() {

        return (
            <div className="collapsible-sections">
                <div className="collapsible-sections__content">                   
                    <CollapsibleSections sections={this.state.sections}
                        locale={this.props.locale}
                        onAddSection={this._onSectionAdded}
                        onRemoveSection={this._onSectionRemoved}
                        onSectionUpdated={this._onSectionUpdated}
                        displayMode={this.props.displayMode} />
                </div>
            </div>
        );
    }

    public async componentDidMount() {
        this.setState({
            sections: this.props.persistedSections,
        });
    }

    public async componentWillReceiveProps(nextProps: ICollapsibleSectionsContainerProps) {
        this.setState({
            sections: nextProps.persistedSections,
        });
    }

    /**
     * Callback when a section is added in the component
     */
    private _onSectionAdded(newSection: ISection, index: number) {

        const updatedSections = update(this.state.sections, { $splice: [[index, 0, newSection]] });

        // Add the section into the state
        this.setState({
            sections: updatedSections,
        });

        // Persist values in the Web Parts
        this.props.onSectionsUpdated(updatedSections);
    }

    /**
     * Callback when a section is removed from the component
     */
    private _onSectionRemoved(removedSection: ISection, index: number) {

        // Remove the section
        const updatedSections = this.state.sections.filter((e) => { return e.id !== removedSection.id; });       

        // Add the section into the state
        this.setState({
            sections: updatedSections,
        });

        // Persist values in the Web Parts
        this.props.onSectionsUpdated(updatedSections);
    }

    /**
     * Callback when a section is removed in the component
     */
    private _onSectionUpdated(updatedSection: ISection, index: number) {

        const updatedSections = update(this.state.sections, { [index]: { $merge: updatedSection } });

        this.setState({
            sections: updatedSections,
        });

        this.props.onSectionsUpdated(updatedSections);
    }
}