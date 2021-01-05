import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { List } from 'office-ui-fabric-react/lib/List';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IOptionsContainerProps } from './IOptionsContainerProps';
import * as _ from 'lodash';

export interface IOptionsContainerState {
    selChoices?: string[];
}

export default class OptionsContainer extends React.Component<IOptionsContainerProps, IOptionsContainerState> {
    constructor(props: IOptionsContainerProps) {
        super(props);
        this.state = {
            selChoices: []
        };
    }

    public render(): JSX.Element {
        const { disabled, selectedKey, label, options, onChange, multiSelect } = this.props;
        return (
            <div>
                {multiSelect ? (
                    <div style={{ paddingTop: "15px" }}>
                        <List items={this.getOptions()} onRenderCell={this._onRenderCell} />
                    </div>
                ) : (
                        <ChoiceGroup disabled={disabled}
                            selectedKey={this._getSelectedKey()}
                            options={this.onRenderChoiceOptions()} required={true} label=""
                            onChange={this._onChange}
                        />
                    )
                }
            </div>
        );
    }

    private getOptions = (): string[] => {
        let tempChoices: string[] = [];
        if (this.props.options.indexOf(',') >= 0) {
            let tmpChoices = this.props.options.split(',');
            tmpChoices.map(choice => {
                if (choice && choice.trim().length > 0) tempChoices.push(choice);
            });
        } else tempChoices.push(this.props.options);
        return tempChoices;
    }

    private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
        if (item && item.length > 0) {
            return (
                <div style={{ marginBottom: "15px" }}>
                    <Checkbox label={item} onChange={this._makeChangeHandler(item)} />
                </div>
            );
        }
    }

    private onRenderChoiceOptions(): IChoiceGroupOption[] {
        let choices: IChoiceGroupOption[] = [];
        let tempChoices: string[] = this.getOptions();
        if (tempChoices.length > 0) {
            tempChoices.map((choice: string) => {
                choices.push({
                    key: choice.trim(),
                    text: choice.trim()
                });
            });
        } else {
            choices.push({
                key: '0',
                text: "Sorry, no choices found",
                disabled: true,
            });
        }
        return choices;
    }

    private _getSelectedKey = (): string => {
        return this.props.selectedKey();
    }

    private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
        this.props.onChange(ev, option, false);
    }

    private _makeChangeHandler = (item: string) => {
        return (ev: any, checked: boolean) => this._onCheckboxChange(ev, checked, item);
    }

    private _onCheckboxChange = (ev: any, isChecked: boolean, item: string) => {
        let finalSel: string[] = this.state.selChoices;
        if (finalSel.length > 0) {
            if (isChecked) {
                finalSel.push(item);
            } else finalSel = _.filter(finalSel, (o) => { return o !== item; });
        } else {
            if (isChecked) finalSel.push(item);
        }
        this.setState({ selChoices: finalSel });
        this.props.onChange(ev, { key: finalSel }, true);
    }

}