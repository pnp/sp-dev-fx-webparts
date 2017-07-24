import * as React                                                                   from 'react';
import * as moment                                                                  from 'moment';
import { cloneDeep, isEmpty }                                                       from '@microsoft/sp-lodash-subset';
import { Text }                                                                     from '@microsoft/sp-core-library';
import { Dropdown, IDropdownOption, TextField, ChoiceGroup, IChoiceGroupOption }    from 'office-ui-fabric-react';
import { NormalPeoplePicker, IPersonaProps, IBasePickerSuggestionsProps, Label }    from 'office-ui-fabric-react';
import { TagPicker, ITag }                                                          from 'office-ui-fabric-react';
import { DatePicker, Checkbox }                                                     from 'office-ui-fabric-react';
import { IQueryFilter }                                                             from './IQueryFilter';
import { QueryFilterOperator }                                                      from './QueryFilterOperator';
import { QueryFilterJoin }                                                          from './QueryFilterJoin';
import { QueryFilterFieldType }                                                     from './QueryFilterFieldType';
import { IQueryFilterProps }                                                        from './IQueryFilterProps';
import { IQueryFilterState }                                                        from './IQueryFilterState';
import styles                                                                       from './QueryFilter.module.scss';

export class QueryFilter extends React.Component<IQueryFilterProps, IQueryFilterState> {

    /*************************************************************************************
     * Stores the IQueryFilter config of the current filter 
     *************************************************************************************/
    private filter:IQueryFilter;


    /*************************************************************************************
     * Component's constructor
     * @param props 
     * @param state 
     *************************************************************************************/
    constructor(props: IQueryFilterProps, state: IQueryFilterState) {
        super(props);

        moment.locale(this.props.strings.datePickerLocale);

        this.state = { 
            filter: (this.props.filter ? cloneDeep(this.props.filter) : { index: 0, field: null, operator: QueryFilterOperator.Eq, value: '', join: QueryFilterJoin.Or }),
            pickersKey: Math.random()
        };
        
        this.onAnyChange = this.onAnyChange.bind(this);
    }


    /*************************************************************************************
     * When the field Dropdown changes
     *************************************************************************************/
    private onFieldDropdownChange(option: IDropdownOption, index?: number) {
         let field = this.props.fields.filter((f) => { return f.internalName == option.key; });
         this.state.filter.field = field != null && field.length > 0 ? field[0] : null;
         this.state.filter.operator = (this.state.filter.field && (this.state.filter.field.type == QueryFilterFieldType.User || this.state.filter.field.type == QueryFilterFieldType.Taxonomy) ? QueryFilterOperator.ContainsAny : QueryFilterOperator.Eq);
         this.state.filter.value = null;
         this.state.filter.me = false;
         this.state.filter.includeTime = false;
         this.state.filter.expression = null;
         this.setState({ filter: this.state.filter, pickersKey: Math.random() });
         this.onAnyChange();
    }


    /*************************************************************************************
     * When the operator Dropdown changes
     *************************************************************************************/
    private onOperatorDropdownChange(option: IDropdownOption, index?: number) {
        this.state.filter.operator = QueryFilterOperator[option.key];
        this.setState({ filter: this.state.filter, pickersKey: this.state.pickersKey });
        this.onAnyChange();
    }


    /*************************************************************************************
     * When the TextField value changes
     *************************************************************************************/
    private onValueTextFieldChange(newValue: string): string {
        if(this.state.filter.value != newValue) {
            this.state.filter.value = newValue;
            this.onAnyChange();
        }
        return '';
    }


    /*************************************************************************************
     * When the people picker value changes
     *************************************************************************************/
    private onPeoplePickerResolve(items: IPersonaProps[]) {
        this.state.filter.value = items;
        this.onAnyChange();
    }


    /*************************************************************************************
     * When the "Me" checkbox changes
     * @param ev : The React.FormEvent object which contains the element that has changed
     * @param checked : Whether the checkbox is not checked or not
     *************************************************************************************/
    private onPeoplePickerCheckboxChange(ev?: React.FormEvent<HTMLInputElement>, checked?: boolean) {
        this.state.filter.me = checked;
        this.setState({ filter: this.state.filter, pickersKey: this.state.pickersKey });
        this.onAnyChange();
    }


    /*************************************************************************************
     * When the NormalPeoplePicker value changes
     *************************************************************************************/
    private onTaxonomyPickerResolve(items: ITag[]) {
        this.state.filter.value = items;
        this.onAnyChange();
    }


    /*************************************************************************************
     * When the date picker value changes
     *************************************************************************************/
    private onDatePickerChange(date: Date) {
        this.state.filter.value = date;
        this.state.filter.expression = '';
        this.setState({ filter: this.state.filter, pickersKey: this.state.pickersKey });
        this.onAnyChange();
    }
    

    /*************************************************************************************
     * When the date expression text field value changes
     *************************************************************************************/
    private onDateExpressionChange(newValue: string): string {

        // Validates the picker
        let regex = new RegExp(/^\[Today\](\s{0,}[\+-]\s{0,}\[{0,1}\d{1,4}\]{0,1}){0,1}$/);
        let isValid = regex.test(newValue) || isEmpty(newValue);
        let errorMsg = isValid ? '' : this.props.strings.datePickerExpressionError;
        
        if(isValid) {
            // If the change is NOT triggered by the date picker change
            if(!(isEmpty(newValue) && this.state.filter.value != null)) {
                this.state.filter.value = null;
                this.state.filter.expression = newValue;
                this.setState({ filter: this.state.filter, pickersKey: this.state.pickersKey });
                this.onAnyChange();
            }
        }

        return errorMsg;
    }


    /*************************************************************************************
     * When the include time checkbox changes
     * @param ev : The React.FormEvent object which contains the element that has changed
     * @param checked : Whether the checkbox is not checked or not
     *************************************************************************************/
    private onDateIncludeTimeChange(ev?: React.FormEvent<HTMLInputElement>, checked?: boolean) {
        this.state.filter.includeTime = checked;
        this.onAnyChange();
    }


    /*************************************************************************************
     * When the join ChoiceGroup changes
     *************************************************************************************/
    private onJoinChoiceChange(ev?: React.FormEvent<HTMLInputElement>, option?: IChoiceGroupOption) {
        if(option) {
            this.state.filter.join = QueryFilterJoin[option.key];
            this.onAnyChange();
        }
    }


    /*************************************************************************************
     * Call the parent onChanged with the updated IQueryFilter object
     *************************************************************************************/
    private onAnyChange() {
        if(this.props.onChanged) {
            this.props.onChanged(this.state.filter);
        }
    }


    /*************************************************************************************
     * Returns the options for the field Dropdown component
     *************************************************************************************/
    private getFieldDropdownOptions(): IDropdownOption[] {
        let options:IDropdownOption[] = [
            { key: "", text: this.props.strings.fieldSelectLabel }
        ];

        for(let field of this.props.fields) {
            let option:IDropdownOption = { key: field.internalName, text: Text.format("{0} \{\{{1}\}\}", field.displayName, field.internalName) };
            options.push(option);
        }

        return options;
    }


    /*************************************************************************************
     * Returns the options for the operator Dropdown component
     *************************************************************************************/
    private getOperatorDropdownOptions(): IDropdownOption[] {
        let fieldType = this.state.filter.field ? this.state.filter.field.type : QueryFilterFieldType.Text;
        let options:IDropdownOption[];

        // Operators for User and Taxonomy field types
        if(fieldType == QueryFilterFieldType.User || fieldType == QueryFilterFieldType.Taxonomy) {
            options = [
                { key: QueryFilterOperator[QueryFilterOperator.ContainsAny], text: this.props.strings.operatorContainsAnyLabel },
                { key: QueryFilterOperator[QueryFilterOperator.ContainsAll], text: this.props.strings.operatorContainsAllLabel },
                { key: QueryFilterOperator[QueryFilterOperator.IsNull], text: this.props.strings.operatorIsNullLabel },
                { key: QueryFilterOperator[QueryFilterOperator.IsNotNull], text: this.props.strings.operatorIsNotNullLabel }
            ];
        }

        // Operators for Text, Number, Datetime and Lookup field types
        else {
            options = [
                { key: QueryFilterOperator[QueryFilterOperator.Eq], text: this.props.strings.operatorEqualLabel },
                { key: QueryFilterOperator[QueryFilterOperator.Neq], text: this.props.strings.operatorNotEqualLabel },
                { key: QueryFilterOperator[QueryFilterOperator.Gt], text: this.props.strings.operatorGreaterLabel },
                { key: QueryFilterOperator[QueryFilterOperator.Lt], text: this.props.strings.operatorLessLabel },
                { key: QueryFilterOperator[QueryFilterOperator.Geq], text: this.props.strings.operatorGreaterEqualLabel },
                { key: QueryFilterOperator[QueryFilterOperator.Leq], text: this.props.strings.operatorLessEqualLabel },
                { key: QueryFilterOperator[QueryFilterOperator.IsNull], text: this.props.strings.operatorIsNullLabel },
                { key: QueryFilterOperator[QueryFilterOperator.IsNotNull], text: this.props.strings.operatorIsNotNullLabel }
            ];

            // Specific operators for text field type
            if(fieldType == QueryFilterFieldType.Text) {
                options = options.concat([
                    { key: QueryFilterOperator[QueryFilterOperator.BeginsWith], text: this.props.strings.operatorBeginsWithLabel },
                    { key: QueryFilterOperator[QueryFilterOperator.Contains], text: this.props.strings.operatorContainsLabel }
                ]);
            }
        }

        return options;
    }


    /*************************************************************************************
     * Returns the options for the operator Dropdown component
     *************************************************************************************/
    private getJoinGroupOptions(): IChoiceGroupOption[] {
        let options:IChoiceGroupOption[] = [
            { key: QueryFilterJoin[QueryFilterJoin.And], text: this.props.strings.andLabel, checked: (this.state.filter.join == QueryFilterJoin.And) },
            { key: QueryFilterJoin[QueryFilterJoin.Or], text: this.props.strings.orLabel, checked: (this.state.filter.join == QueryFilterJoin.Or) }
        ];
        return options;
    }


    /*************************************************************************************
     * Returns the user suggestions based on the specified user-entered filter
     *************************************************************************************/
    private onLoadPeoplePickerSuggestions(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
        if(isEmpty(filterText)) {
            return [];
        }
        return this.props.onLoadPeoplePickerSuggestions(filterText, currentPersonas, limitResults);
    }


    /*************************************************************************************
     * Returns the tag suggestions based on the specified user-entered filter
     *************************************************************************************/
    private onLoadTagPickerSuggestions(filterText: string, currentTerms: ITag[]) {
        if(isEmpty(filterText)) {
            return [];
        }
        return this.props.onLoadTaxonomyPickerSuggestions(this.state.filter.field, filterText, currentTerms);
    }


    /*************************************************************************************
     * Converts the specified filter value into a Date object if valid, otherwise null
     * @param dateValue : The filter value that must be transformed into a Date object
     *************************************************************************************/
    private getDatePickerValue(dateValue: string | Date | IPersonaProps[] | ITag[]): Date {
        if(dateValue instanceof Date) {
            return dateValue;
        }
        else if(typeof(dateValue) === 'string') {
            let date = moment(dateValue, moment.ISO_8601, true);

            if(date.isValid()) {
                return date.toDate();
            }
        }
        return null;
    }


    /*************************************************************************************
     * Converts the date resolved by the DatePicker into a formatted string
     * @param date : The date resolved by the DatePicker
     *************************************************************************************/
    private onDatePickerFormat(date: Date): string {
        return moment(date).format(this.props.strings.datePickerFormat);
    }


    /*************************************************************************************
     * Converts the string manually entered by the user in the people picker to a Date
     * @param dateStr : The string that must be parsed to a Date object
     *************************************************************************************/
    private onDatePickerParse(dateStr: string) : Date {
        let date = moment(dateStr, this.props.strings.datePickerFormat, true);
        return date.toDate();
    }


    /*************************************************************************************
     * Renders the the QueryFilter component
     *************************************************************************************/
    public render() {
        const filterFieldKey = this.state.filter.field != null ? this.state.filter.field.internalName : "";
        const datePickerValue = this.getDatePickerValue(this.state.filter.value);
        const hideValueSection = this.state.filter.operator == QueryFilterOperator.IsNull || this.state.filter.operator == QueryFilterOperator.IsNotNull;

        const showTextField = (!this.state.filter.field || (this.state.filter.field.type == QueryFilterFieldType.Text || this.state.filter.field.type == QueryFilterFieldType.Number  || this.state.filter.field.type == QueryFilterFieldType.Lookup)) && !hideValueSection;
        const showPeoplePicker = this.state.filter.field && this.state.filter.field.type == QueryFilterFieldType.User && !hideValueSection;
        const showTaxonomyPicker = this.state.filter.field && this.state.filter.field.type == QueryFilterFieldType.Taxonomy && !hideValueSection;
        const showDatePicker = this.state.filter.field && this.state.filter.field.type == QueryFilterFieldType.Datetime && !hideValueSection;

        const taxonomyPickerSuggestionProps: IBasePickerSuggestionsProps = {
            suggestionsHeaderText: this.props.strings.taxonomyPickerSuggestionHeader,
            noResultsFoundText: this.props.strings.taxonomyPickerNoResults,
            loadingText: this.props.strings.taxonomyPickerLoading
        };

        const peoplePickerSuggestionProps: IBasePickerSuggestionsProps = {
            suggestionsHeaderText: this.props.strings.peoplePickerSuggestionHeader,
            noResultsFoundText: this.props.strings.peoplePickerNoResults,
            loadingText: this.props.strings.peoplePickerLoading
        };

        return (
            <div className={styles.queryFilter + ' ' + (this.props.disabled ? styles.disabled : '')}>
                <div className={styles.paddingContainer}>
                    <Dropdown label={this.props.strings.fieldLabel}
                            disabled={this.props.disabled}
                            onChanged={this.onFieldDropdownChange.bind(this)}
                            selectedKey={filterFieldKey}
                            options={this.getFieldDropdownOptions()} />

                    <Dropdown label={this.props.strings.operatorLabel}
                            disabled={this.props.disabled}
                            onChanged={this.onOperatorDropdownChange.bind(this)}
                            selectedKey={QueryFilterOperator[this.state.filter.operator]}
                            options={this.getOperatorDropdownOptions()} />

                    { showTextField &&
                        <TextField label={this.props.strings.valueLabel}
                            disabled={this.props.disabled}
                            onGetErrorMessage={ this.onValueTextFieldChange.bind(this) }
                            deferredValidationTime={500}
                            value={ this.state.filter.value != null ? this.state.filter.value as string : '' } />
                    }

                    {  showPeoplePicker &&
                        <div>
                            <Label>{ this.props.strings.valueLabel }</Label>
                            <NormalPeoplePicker
                                onResolveSuggestions={ this.onLoadPeoplePickerSuggestions.bind(this) }
                                onChange={ this.onPeoplePickerResolve.bind(this) }
                                defaultSelectedItems= { this.state.filter.value as IPersonaProps[] }
                                getTextFromItem={ (user: IPersonaProps) => user.primaryText }
                                pickerSuggestionsProps={ peoplePickerSuggestionProps }
                                className={  styles.peoplePicker + (this.state.filter.me ? ' ' + styles.disabled : '') }
                                inputProps={{ disabled: this.state.filter.me }}
                                key={ "peoplePicker" + this.state.pickersKey } />
                            <Checkbox
                                label={ this.props.strings.peoplePickerMe }
                                onChange={ this.onPeoplePickerCheckboxChange.bind(this) }
                                checked={ this.state.filter.me } />
                        </div>
                    }

                    {  showTaxonomyPicker &&
                        <div>
                            <Label>{ this.props.strings.valueLabel }</Label>
                            <TagPicker
                                onResolveSuggestions={ this.onLoadTagPickerSuggestions.bind(this) }
                                onChange={ this.onTaxonomyPickerResolve.bind(this) }
                                defaultSelectedItems= { this.state.filter.value as ITag[] }
                                getTextFromItem={ (term: ITag) => term.name }
                                pickerSuggestionsProps={ taxonomyPickerSuggestionProps }
                                key={ "taxonomyPicker" + this.state.pickersKey } />
                        </div>
                    }

                    {  showDatePicker &&
                        <div>
                            <DatePicker 
                                label={ this.props.strings.valueLabel }
                                placeholder={ this.props.strings.datePickerDatePlaceholder }
                                allowTextInput={ true }
                                value={ datePickerValue }
                                formatDate={ this.onDatePickerFormat.bind(this) }
                                parseDateFromString={ this.onDatePickerParse.bind(this) }
                                onSelectDate={ this.onDatePickerChange.bind(this) }
                                strings={ this.props.strings.datePickerStrings } />
                            <TextField 
                                placeholder={ this.props.strings.datePickerExpressionPlaceholder }
                                onGetErrorMessage={ this.onDateExpressionChange.bind(this) }
                                deferredValidationTime={ 500 }
                                value={ this.state.filter.expression || '' } />
                            <Checkbox
                                label={ this.props.strings.datePickerIncludeTime }
                                onChange={ this.onDateIncludeTimeChange.bind(this) }
                                checked={ this.state.filter.includeTime } />
                        </div>
                    }

                    <ChoiceGroup options={this.getJoinGroupOptions()} 
                                 onChange={this.onJoinChoiceChange.bind(this)}
                                 disabled={this.props.disabled} />
                </div>
            </div>
        );
    }
}
