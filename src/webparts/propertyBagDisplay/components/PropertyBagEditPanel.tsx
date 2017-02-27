import * as React from "react";
import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js";
import * as _ from "lodash";
import utils from "../../shared/utils";
import DisplayProp from "../../shared/DisplayProp";
import { SearchQuery, SearchResults, SearchResult } from "sp-pnp-js";
import { css } from "office-ui-fabric-react";
import styles from "./PropertyBagDisplay.module.scss";
import { IPropertyBagDisplayProps } from "./IPropertyBagDisplayProps";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { Button, ButtonType } from "office-ui-fabric-react/lib/Button";

import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as md from "../../shared/MessageDisplay";
import MessageDisplay from "../../shared/MessageDisplay";
import {
    DetailsList, DetailsListLayoutMode, IColumn, IGroupedList, SelectionMode, CheckboxVisibility, IGroup
} from "office-ui-fabric-react/lib/DetailsList";
import {
    GroupedList
} from "office-ui-fabric-react/lib/GroupedList";
import {
    IViewport
} from "office-ui-fabric-react/lib/utilities/decorators/withViewport";

import {
    Panel, PanelType
} from "office-ui-fabric-react/lib/Panel";
import { IContextualMenuItem, } from "office-ui-fabric-react/lib/ContextualMenu";

// export class ManagedToCrawledMappingEntry {
//     constructor(
//         public crawledPropertyName: string,
//         public managedPropertyName: string,
//     ) { }
// }
export class IPropertyBagEditPanelProps {
    public isVisible: boolean;
    public Title: string;
    public Url: string;
    public SiteTemplate: string;
    public errorMessages: Array<md.Message>;

    public DisplayProps?: Array<DisplayProp>;
    public searchableProps?: Array<string>;
    public forceCrawl?: boolean;
    public stopEditing: () => void;



}
export class IPropertyBagEditPanelState {

    public errorMessages: Array<md.Message>;
    public DisplayProps: Array<DisplayProp>;
    public forceCrawl: boolean;
    public searchableProps: Array<string>;



}
export default class PropertyBagEditPanel extends React.Component<IPropertyBagEditPanelProps, IPropertyBagEditPanelState> {
    public constructor(props) {
        super(props);
        this.state = {
            errorMessages: new Array<md.Message>(),
            DisplayProps: this.state.DisplayProps,
            forceCrawl: false,
            searchableProps: this.state.searchableProps
        };
    }
    /**Accessors */

    /** react lifecycle */
    public componentWillMount() {

    }

    public changeSearchable(siteUrl: string, propname: string, newValue: boolean): Promise<any> {
        if (newValue) {//make prop searchable
            if (_.indexOf(this.state.searchableProps, propname) === -1) {// wasa not searchable, mpw it is
                console.log(propname + "was not searchable, now it is ");
                this.state.searchableProps.push(propname);
                return utils.saveSearchablePropertiesToSharePoint(siteUrl, this.state.searchableProps);
            }
            else {
                console.log(propname + "was not searchable, still is not ");
                return Promise.resolve();
            }
        }
        else { // make prop not searchablke
            if (_.indexOf(this.state.searchableProps, propname) !== -1) {// wasa not searchable, mpw it is
                console.log(propname + "was searchable, now it is  not");
                _.remove(this.state.searchableProps, p => { return p === propname; });
                return utils.saveSearchablePropertiesToSharePoint(siteUrl, this.state.searchableProps);
            }
            else {
                console.log(propname + "was searchable, still  it is");
                return Promise.resolve();
            }
        }
    }
    public onSave(e?: MouseEvent): void {
        let promises: Array<Promise<any>> = [];
        for (const prop of this.state.DisplayProps) {
            let proomise = utils.setSPProperty(prop.crawledPropertyName, prop.value, this.props.Url)
                .then(value => {
                    this.changeSearchable(this.props.Url, prop.crawledPropertyName, prop.searchable);
                });
            promises.push(proomise);
        }
        Promise.all(promises)
            .then((results: Array<any>) => {
                if (this.state.forceCrawl) {
                    utils.forceCrawl(this.props.Url);
                }
                this.close();
            }).catch((err) => {
                debugger;
                this.state.errorMessages.push(new md.Message(err));
                this.setState(this.state);
                console.log(err);
            });
    }
    public close(e?: MouseEvent): void {
        this.props.stopEditing();
    }
    public onForceCrawlChange(newValue: boolean) {
        this.state.forceCrawl = newValue;
        this.setState(this.state);
    }
    public onPropertyValueChanged(event: React.FormEvent<HTMLInputElement>) {
        const selectedProperty = event.currentTarget.attributes["data-crawledpropertyname"].value;
        let dp: DisplayProp = _.find(this.state.DisplayProps, p => { return p.crawledPropertyName === selectedProperty; });
        dp.value = event.currentTarget.value;
        this.setState(this.state);
    }
    public createSearcheableOnChangedHandler = (managedPropertyName) => (value) => {
        let dp: DisplayProp = _.find(this.state.DisplayProps, p => { return p.crawledPropertyName === managedPropertyName; });
        dp.searchable = value;
        this.setState(this.state);
    }

    // public onEditItemClicked(e?: MouseEvent): void {
    //     console.log("in onEditItemClicked");
    //     const selectedSite = this.state.sites[this.state.selectedIndex];
    //     const web = new Web(selectedSite.Url);
    //     web.select("Title", "AllProperties").expand("AllProperties").get().then(r => {
    //         const crawledProps: Array<string> = this.props.propertiesToDisplay.split("\n").map(item => {
    //             return item.split("|")[0];
    //         });
    //         this.state.workingStorage = _.clone(this.state.sites[this.state.selectedIndex]);
    //         this.state.workingStorage.searchableProps = utils.decodeSearchableProps(r.AllProperties["vti_x005f_indexedpropertykeys"]);
    //         this.state.workingStorage.DisplayProps = utils.SelectProperties(r.AllProperties, crawledProps, this.state.workingStorage.searchableProps);
    //         this.state.workingStorage.errorMessages = new Array<md.Message>();
    //         // now add in the managed Prop
    //         for (let dp of this.state.workingStorage.DisplayProps) {
    //             dp.managedPropertyName =
    //                 _.find(this.state.managedToCrawedMapping, mtc => { return mtc.crawledPropertyName === dp.crawledPropertyName; }).managedPropertyName;
    //         }
    //         this.state.isediting = true;
    //         this.setState(this.state);
    //     });
    //     console.log("out onEditItemClicked");
    // }

    public removeMessage(messageList: Array<md.Message>, messageId: string) {
        _.remove(messageList, {
            Id: messageId
        });
        this.setState(this.state);
    }
    public removePanelMessage(messageId: string) {
        this.removeMessage(this.state.errorMessages, messageId);
    }
    public render(): React.ReactElement<IPropertyBagDisplayProps> {
        debugger;

        if (!this.props.isVisible) {
            return (<div />);
        }
        else {
            return (
                <Panel
                    type={PanelType.medium}
                    onDismiss={this.close.bind(this)}
                >
                    <MessageDisplay messages={this.state.errorMessages}
                        hideMessage={this.removePanelMessage.bind(this)} />

                    <div> <Label >Site Title</Label> {this.props.Title}</div>
                    <span> <Label label="" >Site Url</Label> {this.props.Url}</span>
                    <table>
                        <thead>
                            <tr>
                                <td>Managed Property Name</td>
                                <td>Value in Search Index</td>
                                <td>Crawled Property Name</td>
                                <td>Web Property Value</td>
                                <td>Searchable</td>
                            </tr>
                        </thead>

                        <tbody>
                            {this.props.DisplayProps.map((dp, i) => {
                                return (<tr>
                                    <td>{dp.managedPropertyName}</td>
                                    <td>{this.props[dp.managedPropertyName]}</td>
                                    <td>{dp.crawledPropertyName}</td>
                                    <td>
                                        <TextField
                                            data-crawledPropertyName={dp.crawledPropertyName}
                                            value={dp.value}
                                            onBlur={this.onPropertyValueChanged.bind(this)}
                                        />
                                    </td>
                                    <td>
                                        <Toggle label=""
                                            checked={dp.searchable}
                                            onChanged={this.createSearcheableOnChangedHandler(dp.crawledPropertyName)}
                                        />
                                    </td>
                                </tr>);
                            })}
                        </tbody>
                    </table>
                    <Toggle label="Force Crawl"
                        checked={this.state.forceCrawl}
                        onChanged={this.onForceCrawlChange.bind(this)}
                    />
                    <Button default={true} icon="Save" buttonType={ButtonType.hero} value="Save" onClick={this.onSave.bind(this)} >Save</Button>
                    <Button icon="Cancel" buttonType={ButtonType.normal} value="Cancel" onClick={this.close.bind(this)} >Cancel</Button>
                </Panel>
            );
        }
    }
}
