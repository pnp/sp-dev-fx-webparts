/* eslint-disable @typescript-eslint/no-explicit-any */
interface colInfo {
    name: string;
    type: string;
}
interface responseBody {
    columns: colInfo[];
    rows: any[];
}
interface IApiResponseError {
    code: string;
    message?: string;
    innererror?: {
        code: string;
        message: string;
        innererror: {
            line: number;
            message: string;
            pos: number;
            token: string;
        }
    }
}
export interface IResponseJson {
    error?: IApiResponseError
    tables: any[],
    columns: Map<string, string>
}
export interface ICostMngmtResponseJson {
    properties?: {
        columns: [],
        rows: [],
        // nextLink: string
    }
    error?: {
        code: string;
        message: string;
    }
}
export interface IAppInsightsResponseJson {
    tables: {
        columns: [],
        rows: [],
        // nextLink: string
    }[],
    error?: IApiResponseError
}

export default class ApiHelper {
    private static parseColumns = (responseColumns: any, colRenames?: Map<string, string>): string[] => {
        const columns = responseColumns.reduce((acc: any, currVal: colInfo) => {
            if (colRenames?.has(currVal.name)) {
                acc.push(colRenames.get(currVal.name));
            }
            else {
                acc.push(currVal.name);
            }
            return acc;
        }, []);
        return columns;
    }
    //suport for data types returned Application Insights API and Cost Management API
    public static get NumericTypes(): string[] {
        return ['int', 'long', 'real', 'decimal', 'Number'];
    }
    public static get StringTypes(): string[] {
        return ['string', 'String'];
    }
    public static get DateTimeTypes(): string[] {
        return ['datetime'];
    }
    public static IsNumericalType = (type: string): boolean => {
        return ApiHelper.NumericTypes.includes(type);
    }
    public static IsStringType = (type: string): boolean => {
        return ApiHelper.StringTypes.includes(type);
    }
    public static IsDateTimeType = (type: string): boolean => {
        return ApiHelper.DateTimeTypes.includes(type);
    }
    public static GetParsedResponse = <T>(response: { body: responseBody, error: any }, colRenames?: Map<string, string>): IResponseJson => {
        if (response.error) {
            return {
                error: response.error,
                tables: [],
                columns: new Map()
            }
        }
        else if (response.body) {
            return ApiHelper.ParseResponse<T>(response.body, colRenames);
        }
    }
    public static ParseResponse = <T>(responseBody: responseBody, colRenames?: Map<string, string>): IResponseJson => {
        const response: IResponseJson = {
            tables: [],
            columns: new Map()
        }

        const columns = ApiHelper.parseColumns(responseBody.columns, colRenames)

        response.tables = responseBody.rows.reduce((acc: any[], currRow: []) => {
            const v: Map<string, any> = new Map();
            for (let i = 0; i < columns.length; ++i) {
                v.set(columns[i], currRow[i]);
            }
            acc.push(Object.fromEntries<T>(v));
            return acc;
        }, []);

        response.columns = responseBody.columns.reduce((acc: any, currVal: colInfo) => {
            if (colRenames?.has(currVal.name)) {
                acc.set(colRenames.get(currVal.name), currVal.type);
            }
            else {
                acc.set(currVal.name, currVal.type);
            }
            return acc;
        }, new Map<string, string>());

        return response;
    }
    public static GetColByType = (colInfo: Map<string, string>, type: string): string[] => {
        return [...colInfo.entries()]
            .filter(({ 1: v }) => { return (v === type); })
            .map(([k]) => k);
    }
    public static GetColByTypes = (colInfo: Map<string, string>, type: string[]): string[] => {
        return [...colInfo.entries()]
            .filter(({ 1: v }) => { return (type.includes(v)); })
            .map(([k]) => k);
    }
}
