import * as moment                                              from 'moment';
import { Text }                                                 from '@microsoft/sp-core-library';
import { isEmpty }                                              from '@microsoft/sp-lodash-subset';
import { IPersonaProps, ITag }                                  from 'office-ui-fabric-react';
import { IQuerySettings }                                       from '../../webparts/contentQuery/components/IQuerySettings';
import { IQueryFilter }                                         from '../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/IQueryFilter';
import { QueryFilterOperator }                                  from '../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/QueryFilterOperator';
import { QueryFilterJoin }                                      from '../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/QueryFilterJoin';
import { QueryFilterFieldType }                                 from '../../controls/PropertyPaneQueryFilterPanel/components/QueryFilter/QueryFilterFieldType';

export class CamlQueryHelper {

    /*************************************************************************************************
     * Generates a full CAML query based on the provided IQuerySettings
     * @param querySettings : A IQuerySettings object required for generating the CAML query
     *************************************************************************************************/
    public static generateCamlQuery(querySettings:IQuerySettings): string {
        let query = '';

        // Generates the <Where /> part
        if(querySettings.filters && !isEmpty(querySettings.filters)) {
            let sortedFilters = querySettings.filters.sort((a, b) => { return a.index - b.index; });
            query += Text.format('<Where>{0}</Where>', this.generateFilters(sortedFilters));
        }

        // Generates the <OrderBy /> part
        if(querySettings.orderBy && !isEmpty(querySettings.orderBy)) {
            let isAscending = querySettings.orderByDirection == 'desc' ? 'FALSE' : 'TRUE';
            query += Text.format("<OrderBy><FieldRef Name='{0}' Ascending='{1}' /></OrderBy>", querySettings.orderBy, isAscending);
        }

        // Wraps the <Where /> and <OrderBy /> into a <Query /> tag
        query = Text.format('<Query>{0}</Query>', query);

        // Generates the <RowLimit /> part
        if(querySettings.limitEnabled) {
            query += Text.format('<RowLimit>{0}</RowLimit>', querySettings.itemLimit);
        }

        // Generates the <ViewFields /> part
        if(querySettings.viewFields && !isEmpty(querySettings.viewFields)) {
            query += Text.format('<ViewFields>{0}</ViewFields>', querySettings.viewFields.map(field => Text.format("<FieldRef Name='{0}' />", field)).join(''));
        }

        // Wraps the everything into a final <View /> tag
        if(querySettings.recursiveEnabled) {
            query = Text.format('<View Scope="RecursiveAll">{0}</View>', query);
        }
        else {
            query = Text.format('<View>{0}</View>', query);
        }

        return query;
    }


    /*************************************************************************************************
     * Generates the CAML filters based on the specified array of IQueryFilter objects
     * @param filters : The filters that needs to be converted to a CAML string
     *************************************************************************************************/
    private static generateFilters(filters:IQueryFilter[]): string {

        // Store the generic filter format for later use
        let query = '';
        let filterXml = '';

        // Appends a CAML node for each filter
        let itemCount = 0;

        for(let filter of filters.reverse()) {
            filterXml = '<{0}><FieldRef Name="{1}" /><Value {2} Type="{3}">{4}</Value></{0}>';
            itemCount++;
            let specialAttribute = '';

            // Sets the special attribute if needed
            if(filter.field.type == QueryFilterFieldType.Datetime) {
                specialAttribute = 'IncludeTimeValue="' + filter.includeTime + '"';
            }

            // If it's a <IsNull /> or <IsNotNull> filter
            if(filter.operator == QueryFilterOperator.IsNull || filter.operator == QueryFilterOperator.IsNotNull) {
                filterXml = '<{0}><FieldRef Name="{1}" /></{0}>';
                query += Text.format(filterXml, QueryFilterOperator[filter.operator], filter.field.internalName);
            }

            // If it's a taxonomy filter
            else if (filter.field.type == QueryFilterFieldType.Taxonomy) {
                query += this.generateTaxonomyFilter(filter);
            }

            // If it's a user filter
            else if (filter.field.type == QueryFilterFieldType.User) {
                query += this.generateUserFilter(filter);
            }

            // If it's any other kind of filter (Text, DateTime, Lookup, Number etc...)
            else {
                let valueType = (filter.field.type == QueryFilterFieldType.Lookup ? QueryFilterFieldType[QueryFilterFieldType.Text] : QueryFilterFieldType[filter.field.type]);
                query += Text.format(filterXml, QueryFilterOperator[filter.operator], filter.field.internalName, specialAttribute, valueType, this.formatFilterValue(filter));
            }

            // Appends the Join tags if needed
            if (itemCount >= 2) {
                let logicalJoin = QueryFilterJoin[filter.join];
                query = Text.format("<{0}>", logicalJoin) + query;
                query += Text.format("</{0}>", logicalJoin);
            }
        }

        return query;
    }


    /*************************************************************************************************
	 * Generates a valid CAML filter string based on the specified taxonomy filter
	 * @param filter : The taxonomy filter that needs to be formatted into a CAML filter string
	 *************************************************************************************************/
    private static generateTaxonomyFilter(filter:IQueryFilter): string
    {
        let filterOutput = '';
        let filterTerms = filter.value as ITag[];

        if(isEmpty(filter.value)) {
            return '';
        }
        else if (filter.operator == QueryFilterOperator.ContainsAny || filterTerms == null) {
            let values = filterTerms != null ? filterTerms.map(x => Text.format("<Value Type='Integer'>{0}</Value>", x.key)).join('') : '';
            filterOutput = Text.format("<In><FieldRef Name='{0}' LookupId='TRUE' /><Values>{1}</Values></In>", filter.field.internalName, values);
        }
        else if (filter.operator == QueryFilterOperator.ContainsAll) {
            let taxFilters: IQueryFilter[] = [];

            for(let term of filterTerms) {
                let termValue:ITag[] = [ term ];

                let taxFilter:IQueryFilter = {
                    index: null,
                    field: filter.field,
                    value: termValue,
                    join: QueryFilterJoin.And,
                    operator: QueryFilterOperator.ContainsAny
                };
                taxFilters.push(taxFilter);
            }

            filterOutput = this.generateFilters(taxFilters);
        }

        return filterOutput;
    }


    /*************************************************************************************************
	 * Generates a valid CAML filter string based on the specified user filter
	 * @param filter : The user filter that needs to be formatted into a CAML filter string
	 *************************************************************************************************/
    private static generateUserFilter(filter:IQueryFilter): string
    {
        let filterOutput = '';
        let filterUsers = filter.value as IPersonaProps[];

        if(filter.me) {
            filterOutput = Text.format("<Eq><FieldRef Name='{0}' /><Value Type='Integer'><UserID /></Value></Eq>", filter.field.internalName);
        }
        else if(isEmpty(filter.value)) {
            return '';
        }
        else if (filter.operator == QueryFilterOperator.ContainsAny || filterUsers == null)
        {
            let values = filterUsers != null ? filterUsers.map(x => Text.format("<Value Type='Integer'>{0}</Value>", x.optionalText)).join('') : '';
            filterOutput = Text.format("<In><FieldRef Name='{0}' LookupId='TRUE' /><Values>{1}</Values></In>", filter.field.internalName, values);
        }
        else if (filter.operator == QueryFilterOperator.ContainsAll)
        {
            let userFilters: IQueryFilter[] = [];

            for(let user of filterUsers) {
                let userValue:IPersonaProps[] = [ user ];

                let userFilter:IQueryFilter = {
                    index: null,
                    field: filter.field,
                    value: userValue,
                    join: QueryFilterJoin.And,
                    operator: QueryFilterOperator.ContainsAny
                };
                userFilters.push(userFilter);
            }

            filterOutput = this.generateFilters(userFilters);
        }

        return filterOutput;
    }


	/*************************************************************************************************
	 * Returns the value of the specified filter correctly formatted based on its type of value
	 * @param filter : The filter that needs its value to be formatted
	 *************************************************************************************************/
    private static formatFilterValue(filter:IQueryFilter): string
    {
        let filterValue = "";

        if(filter.field.type == QueryFilterFieldType.Datetime) {
            if(filter.expression != null && !isEmpty(filter.expression)) {
                filterValue = this.formatDateExpressionFilterValue(filter.expression);
            }
            else {
                filterValue = this.formatDateFilterValue(filter.value as string);
            }
        }
        else {
            filterValue = this.formatTextFilterValue(filter.value as string);
        }

        return filterValue;
    }


    /*************************************************************************************************
     * Converts the specified serialized ISO date into the required string format
     * @param dateValue : A valid ISO 8601 date string
     *************************************************************************************************/
    private static formatDateFilterValue(dateValue:string): string {
        let date = moment(dateValue, moment.ISO_8601, true);

        if(date.isValid()) {
            dateValue = date.format("YYYY-MM-DDTHH:mm:ss\\Z");
        }
        return dateValue || '';
    }


    /*************************************************************************************************
     * Replaces any "[Today]" or "[Today] +/- [digit]" expression by it's actual value
     * @param filterValue : The filter value
     *************************************************************************************************/
    private static formatDateExpressionFilterValue(filterValue: string): string {

		// Replaces any "[Today] +/- [digit]" expression
        let regex = new RegExp("\\[Today\\]\\s*[\\+-]\\s*\\[{0,1}\\d{1,}\\]{0,1}");
		let results = regex.exec(filterValue);

        if(results != null) {
            for(let result of results) {
                let operator = result.indexOf('+') > 0 ? '+' : '-';
                let addOrRemove = operator == '+' ? 1 : -1;
                let operatorSplit = result.split(operator);
                let digit = parseInt(operatorSplit[operatorSplit.length - 1].replace("[", "").replace("]", "").trim()) * addOrRemove;
                let dt = new Date();
                dt.setDate(dt.getDate() + digit);
                let formatDate = moment(dt).format("YYYY-MM-DDTHH:mm:ss\\Z");
                filterValue = filterValue.replace(result, formatDate);
            }
        }

		// Replaces any "[Today]" expression by it's actual value
        let formattedDate = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss\\Z");
        filterValue = filterValue.replace("[Today]", formattedDate);

        return filterValue;
    }


    /*************************************************************************************************
     * Formats the specified text filter value
     * @param textValue : The text filter value which needs to be formatted
     *************************************************************************************************/
    private static formatTextFilterValue(textValue:string): string {
        let regex = new RegExp("\\[PageQueryString:[A-Za-z0-9_-]*\\]");
        let results = regex.exec(textValue);

        if(results != null) {
            for(let result of results) {
                let parameter = result.substring(17, result.length - 1);
                textValue = textValue.replace(result, this.getUrlParameter(parameter));
            }
        }

        return textValue != null ? textValue : '';
    }


    /*************************************************************************************************
     * Returns the value of the query string parameter with the specified name
     * @param name : The name of the query string parameter
     * @param url : Optionnaly, the specific url to use instead of the current url
     *************************************************************************************************/
    private static getUrlParameter(name: string, url?: string): string {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

}
