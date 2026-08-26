import { TextField } from '@fluentui/react';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import * as React from "react";
import { IRuleEntry } from '../../Common/IRuleEntry';
import { IFieldRulesProps } from "./IFieldRulesProps";

export interface IFieldRulesHostState
{
    fieldRules: {[key: string]: IRuleEntry}; 
    currentEditRule: IRuleEntry;
}

export default class PropertyPaneFieldRuleEditorHost extends React.Component<IFieldRulesProps, IFieldRulesHostState> {
    constructor(props: IFieldRulesProps, state: IFieldRulesHostState) {
        super(props);
        // TODO read existing rules from properties
        this.state= {
            fieldRules: typeof this.props.addionalFieldRules === "undefined" ? {} : this.props.addionalFieldRules,
            currentEditRule: null
        };
    }

    /*public componentDidUpdate(prevProps: IFieldRulesProps, prevState: IFieldRulesHostState): void {
        if (this.props.disabled !== prevProps.disabled ||
          this.props.stateKey !== prevProps.stateKey) {          
        }
      }*/

    public render(): JSX.Element {
        return (
          <div>            
            <Dropdown label={this.props.label}
              disabled={this.props.disabled || this.props.fieldNames===null}
              onChange={this.onChange.bind(this)}
              //selectedKey={this.selectedKey}
              options={this.props.fieldNames===null?[]:this.props.fieldNames} />
            <TextField label='Regex oder Name (email, tel)' 
                       id='Regex'
                       onChange={this.onTextChange.bind(this)}
                       value={this.state.currentEditRule===null?"":this.state.currentEditRule.Regex} 
                       disabled={this.state.currentEditRule===null} />
            <TextField label='Eigene Fehlermeldung' 
                       id='ErrorMsg'
                       onChange={this.onTextChange.bind(this)}
                       value={this.state.currentEditRule===null?"":this.state.currentEditRule.ErrorMsg}
                       disabled={this.state.currentEditRule===null} />   
            <TextField label='Standardwert' 
                       id='DefaultValue'
                       onChange={this.onTextChange.bind(this)}
                       value={this.state.currentEditRule===null?"":this.state.currentEditRule.DefaultValue}
                       disabled={this.state.currentEditRule===null} />                                   
          </div>            
        );
    }

    private onTextChange(source: React.FormEvent<HTMLInputElement>, newValue:string) : void
    {
        const txtField : HTMLInputElement = source.target as HTMLInputElement;
        if (txtField.id==="Regex")
            this.state.currentEditRule.Regex=newValue;
        if (txtField.id==="ErrorMsg")
            this.state.currentEditRule.ErrorMsg=newValue;
        if (txtField.id==="DefaultValue")
            this.state.currentEditRule.DefaultValue=newValue;        
        this.setState(this.state);

        if (this.props.onChange) {
            this.props.onChange(this.state.fieldRules);
        }
    }

    private onChange(source: React.FormEvent<HTMLDivElement>, option: IDropdownOption, index?: number): void {        
        if (typeof this.state.fieldRules[option.key] === "undefined")
            this.state.fieldRules[option.key] = {      
                ErrorMsg:"",
                MaxValue:0,
                MinValue:0,
                Regex:"",
                DefaultValue: ""
            };
        this.setState({
            currentEditRule: this.state.fieldRules[option.key]
        });
    }
}