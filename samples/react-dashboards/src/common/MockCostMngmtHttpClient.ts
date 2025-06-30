/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICostMngmtResponseJson } from "./ApiHelper";

export default class MockCostMngmtHttpClient{
    private static jsonCostByServiceResponse: any = {
        "id": "subscriptions/9733fd99-1122-46e0-9482-732c52b24906/providers/Microsoft.CostManagement/query/b5fec646-d757-4038-802e-59409dc845ba",
        "name": "b5fec646-d757-4038-802e-59409dc845ba",
        "type": "Microsoft.CostManagement/query",
        "location": null,
        "sku": null,
        "eTag": null,
        "properties": {
            "nextLink": null,
            "columns": [
                {
                    "name": "Cost",
                    "type": "Number"
                },
                {
                    "name": "BillingMonth",
                    "type": "Datetime"
                },
                {
                    "name": "ServiceName",
                    "type": "String"
                },
                {
                    "name": "Currency",
                    "type": "String"
                }
            ],
            "rows": [
                [
                    0.000092997,
                    "2023-03-01T00:00:00",
                    "API Management",
                    "CHF"
                ],
                [
                    0,
                    "2023-03-01T00:00:00",
                    "Azure App Service",
                    "CHF"
                ],
                [
                    0.087794830785556,
                    "2023-03-01T00:00:00",
                    "Azure Monitor",
                    "CHF"
                ],
                [
                    0.000020633456,
                    "2023-03-01T00:00:00",
                    "Bandwidth",
                    "CHF"
                ],
                [
                    0.005274053900649,
                    "2023-03-01T00:00:00",
                    "Key Vault",
                    "CHF"
                ],
                [
                    0.015254984412827,
                    "2023-03-01T00:00:00",
                    "Log Analytics",
                    "CHF"
                ],
                [
                    0.061422169469731,
                    "2023-03-01T00:00:00",
                    "Logic Apps",
                    "CHF"
                ],
                [
                    0.006661324854989,
                    "2023-03-01T00:00:00",
                    "Service Bus",
                    "CHF"
                ],
                [
                    0.007355223968911,
                    "2023-03-01T00:00:00",
                    "Storage",
                    "CHF"
                ]
            ]
        }
    }
    private static jsonCostByServiceResponse2Months: any = {
        "id": "subscriptions/9733fd99-1122-46e0-9482-732c52b24906/providers/Microsoft.CostManagement/query/c43d6bd5-7820-49d2-95ab-65af865edbe9",
        "name": "c43d6bd5-7820-49d2-95ab-65af865edbe9",
        "type": "Microsoft.CostManagement/query",
        "location": null,
        "sku": null,
        "eTag": null,
        "properties": {
            "nextLink": null,
            "columns": [
                {
                    "name": "Cost",
                    "type": "Number"
                },
                {
                    "name": "BillingMonth",
                    "type": "Datetime"
                },
                {
                    "name": "ServiceName",
                    "type": "String"
                },
                {
                    "name": "Currency",
                    "type": "String"
                }
            ],
            "rows": [
                [
                    0.00144662,
                    "2023-04-01T00:00:00",
                    "API Management",
                    "CHF"
                ],
                [
                    0,
                    "2023-04-01T00:00:00",
                    "Azure App Service",
                    "CHF"
                ],
                [
                    0.189942030499408,
                    "2023-04-01T00:00:00",
                    "Azure Monitor",
                    "CHF"
                ],
                [
                    0.000314895648,
                    "2023-04-01T00:00:00",
                    "Bandwidth",
                    "CHF"
                ],
                [
                    0.00019695375,
                    "2023-04-01T00:00:00",
                    "Functions",
                    "CHF"
                ],
                [
                    0.0571033866,
                    "2023-04-01T00:00:00",
                    "Key Vault",
                    "CHF"
                ],
                [
                    0.207743937182644,
                    "2023-04-01T00:00:00",
                    "Log Analytics",
                    "CHF"
                ],
                [
                    0.132635152278146,
                    "2023-04-01T00:00:00",
                    "Logic Apps",
                    "CHF"
                ],
                [
                    0.02803100599,
                    "2023-04-01T00:00:00",
                    "Service Bus",
                    "CHF"
                ],
                [
                    0.186290417208,
                    "2023-04-01T00:00:00",
                    "Storage",
                    "CHF"
                ],
                [
                    0.000041332000000000003,
                    "2023-05-01T00:00:00",
                    "API Management",
                    "CHF"
                ],
                [
                    0,
                    "2023-05-01T00:00:00",
                    "Azure App Service",
                    "CHF"
                ],
                [
                    0.011375349462366,
                    "2023-05-01T00:00:00",
                    "Azure Monitor",
                    "CHF"
                ],
                [
                    0.0000042808,
                    "2023-05-01T00:00:00",
                    "Bandwidth",
                    "CHF"
                ],
                [
                    0.0006140784,
                    "2023-05-01T00:00:00",
                    "Key Vault",
                    "CHF"
                ],
                [
                    0.02179392561248,
                    "2023-05-01T00:00:00",
                    "Log Analytics",
                    "CHF"
                ],
                [
                    0.008128346841146,
                    "2023-05-01T00:00:00",
                    "Logic Apps",
                    "CHF"
                ],
                [
                    0.00171794337,
                    "2023-05-01T00:00:00",
                    "Service Bus",
                    "CHF"
                ],
                [
                    0.002776281948,
                    "2023-05-01T00:00:00",
                    "Storage",
                    "CHF"
                ]
            ]
        }
    }
    private static jsonCostByServiceResponse3Months: any = {
        "id": "subscriptions/9733fd99-1122-46e0-9482-732c52b24906/providers/Microsoft.CostManagement/query/7df65308-d6bb-417a-a158-e7b290ccab2e",
        "name": "7df65308-d6bb-417a-a158-e7b290ccab2e",
        "type": "Microsoft.CostManagement/query",
        "location": null,
        "sku": null,
        "eTag": null,
        "properties": {
            "nextLink": null,
            "columns": [
                {
                    "name": "Cost",
                    "type": "Number"
                },
                {
                    "name": "BillingMonth",
                    "type": "Datetime"
                },
                {
                    "name": "ServiceName",
                    "type": "String"
                },
                {
                    "name": "Currency",
                    "type": "String"
                }
            ],
            "rows": [
                [
                    0.001022967,
                    "2023-03-01T00:00:00",
                    "API Management",
                    "CHF"
                ],
                [
                    0,
                    "2023-03-01T00:00:00",
                    "Azure App Service",
                    "CHF"
                ],
                [
                    0.19625302311354,
                    "2023-03-01T00:00:00",
                    "Azure Monitor",
                    "CHF"
                ],
                [
                    0.000143663648,
                    "2023-03-01T00:00:00",
                    "Bandwidth",
                    "CHF"
                ],
                [
                    0.00001773,
                    "2023-03-01T00:00:00",
                    "Functions",
                    "CHF"
                ],
                [
                    0.013159858079222,
                    "2023-03-01T00:00:00",
                    "Key Vault",
                    "CHF"
                ],
                [
                    0.048084173706564,
                    "2023-03-01T00:00:00",
                    "Log Analytics",
                    "CHF"
                ],
                [
                    0.1372803378781,
                    "2023-03-01T00:00:00",
                    "Logic Apps",
                    "CHF"
                ],
                [
                    0.014949191881894,
                    "2023-03-01T00:00:00",
                    "Service Bus",
                    "CHF"
                ],
                [
                    0.050661344537648,
                    "2023-03-01T00:00:00",
                    "Storage",
                    "CHF"
                ],
                [
                    0.00144662,
                    "2023-04-01T00:00:00",
                    "API Management",
                    "CHF"
                ],
                [
                    0,
                    "2023-04-01T00:00:00",
                    "Azure App Service",
                    "CHF"
                ],
                [
                    0.189942030499408,
                    "2023-04-01T00:00:00",
                    "Azure Monitor",
                    "CHF"
                ],
                [
                    0.000314895648,
                    "2023-04-01T00:00:00",
                    "Bandwidth",
                    "CHF"
                ],
                [
                    0.00019695375,
                    "2023-04-01T00:00:00",
                    "Functions",
                    "CHF"
                ],
                [
                    0.0571033866,
                    "2023-04-01T00:00:00",
                    "Key Vault",
                    "CHF"
                ],
                [
                    0.207743937182644,
                    "2023-04-01T00:00:00",
                    "Log Analytics",
                    "CHF"
                ],
                [
                    0.132635152278146,
                    "2023-04-01T00:00:00",
                    "Logic Apps",
                    "CHF"
                ],
                [
                    0.028031005990000003,
                    "2023-04-01T00:00:00",
                    "Service Bus",
                    "CHF"
                ],
                [
                    0.186290417208,
                    "2023-04-01T00:00:00",
                    "Storage",
                    "CHF"
                ],
                [
                    0.000041332000000000003,
                    "2023-05-01T00:00:00",
                    "API Management",
                    "CHF"
                ],
                [
                    0,
                    "2023-05-01T00:00:00",
                    "Azure App Service",
                    "CHF"
                ],
                [
                    0.011375349462366,
                    "2023-05-01T00:00:00",
                    "Azure Monitor",
                    "CHF"
                ],
                [
                    0.0000042808,
                    "2023-05-01T00:00:00",
                    "Bandwidth",
                    "CHF"
                ],
                [
                    0.0006140784,
                    "2023-05-01T00:00:00",
                    "Key Vault",
                    "CHF"
                ],
                [
                    0.02179392561248,
                    "2023-05-01T00:00:00",
                    "Log Analytics",
                    "CHF"
                ],
                [
                    0.008128346841146,
                    "2023-05-01T00:00:00",
                    "Logic Apps",
                    "CHF"
                ],
                [
                    0.00171794337,
                    "2023-05-01T00:00:00",
                    "Service Bus",
                    "CHF"
                ],
                [
                    0.002776281948,
                    "2023-05-01T00:00:00",
                    "Storage",
                    "CHF"
                ]
            ]
        }
    }

    private static jsonAzureMonitorCostsResponse3Months: any = {
        "id": "subscriptions/9733fd99-1122-46e0-9482-732c52b24906/providers/Microsoft.CostManagement/query/45562f62-7a1d-47c3-9a31-cc3ffe722524",
        "name": "45562f62-7a1d-47c3-9a31-cc3ffe722524",
        "type": "Microsoft.CostManagement/query",
        "location": null,
        "sku": null,
        "eTag": null,
        "properties": {
            "nextLink": null,
            "columns": [
                {
                    "name": "Cost",
                    "type": "Number"
                },
                {
                    "name": "BillingMonth",
                    "type": "Datetime"
                },
                {
                    "name": "ServiceName",
                    "type": "String"
                },
                {
                    "name": "Currency",
                    "type": "String"
                }
            ],
            "rows": [
                [
                    0.0001394955,
                    "2023-01-01T00:00:00",
                    "API Management",
                    "CHF"
                ],
                [
                    0,
                    "2023-01-01T00:00:00",
                    "Azure App Service",
                    "CHF"
                ],
                [
                    0.0976166599122,
                    "2023-01-01T00:00:00",
                    "Azure Monitor",
                    "CHF"
                ],
                [
                    0.000088698176,
                    "2023-01-01T00:00:00",
                    "Bandwidth",
                    "CHF"
                ],
                [
                    0.00000772875,
                    "2023-01-01T00:00:00",
                    "Functions",
                    "CHF"
                ],
                [
                    0.0087476649,
                    "2023-01-01T00:00:00",
                    "Key Vault",
                    "CHF"
                ],
                [
                    0.058432889294037,
                    "2023-01-01T00:00:00",
                    "Log Analytics",
                    "CHF"
                ],
                [
                    0.068534767511377,
                    "2023-01-01T00:00:00",
                    "Logic Apps",
                    "CHF"
                ],
                [
                    0.01503025771,
                    "2023-01-01T00:00:00",
                    "Service Bus",
                    "CHF"
                ],
                [
                    0.071955170944,
                    "2023-01-01T00:00:00",
                    "Storage",
                    "CHF"
                ],
                [
                    0.0005631485,
                    "2023-02-01T00:00:00",
                    "API Management",
                    "CHF"
                ],
                [
                    0,
                    "2023-02-01T00:00:00",
                    "Azure App Service",
                    "CHF"
                ],
                [
                    0.08017600546442101,
                    "2023-02-01T00:00:00",
                    "Azure Monitor",
                    "CHF"
                ],
                [
                    0.000058047648,
                    "2023-02-01T00:00:00",
                    "Bandwidth",
                    "CHF"
                ],
                [
                    0.00002806875,
                    "2023-02-01T00:00:00",
                    "Functions",
                    "CHF"
                ],
                [
                    0.010254085560388999,
                    "2023-02-01T00:00:00",
                    "Key Vault",
                    "CHF"
                ],
                [
                    0.032445557445422,
                    "2023-02-01T00:00:00",
                    "Log Analytics",
                    "CHF"
                ],
                [
                    0.061779158062478,
                    "2023-02-01T00:00:00",
                    "Logic Apps",
                    "CHF"
                ],
                [
                    0.00840390849843,
                    "2023-02-01T00:00:00",
                    "Service Bus",
                    "CHF"
                ],
                [
                    0.035626819870988,
                    "2023-02-01T00:00:00",
                    "Storage",
                    "CHF"
                ],
                [
                    0.00030999,
                    "2023-03-01T00:00:00",
                    "API Management",
                    "CHF"
                ],
                [
                    0,
                    "2023-03-01T00:00:00",
                    "Azure App Service",
                    "CHF"
                ],
                [
                    0.093761336149811,
                    "2023-03-01T00:00:00",
                    "Azure Monitor",
                    "CHF"
                ],
                [
                    0.000055222319999999996,
                    "2023-03-01T00:00:00",
                    "Bandwidth",
                    "CHF"
                ],
                [
                    0.000008865,
                    "2023-03-01T00:00:00",
                    "Functions",
                    "CHF"
                ],
                [
                    0.006207939239611,
                    "2023-03-01T00:00:00",
                    "Key Vault",
                    "CHF"
                ],
                [
                    0.02013784546086,
                    "2023-03-01T00:00:00",
                    "Log Analytics",
                    "CHF"
                ],
                [
                    0.065684391022086,
                    "2023-03-01T00:00:00",
                    "Logic Apps",
                    "CHF"
                ],
                [
                    0.007143397085947,
                    "2023-03-01T00:00:00",
                    "Service Bus",
                    "CHF"
                ],
                [
                    0.021916624388824,
                    "2023-03-01T00:00:00",
                    "Storage",
                    "CHF"
                ]
            ]
        }
    }
    private static jsonAzureMonitorCostsResponse: any = {
        "id": "subscriptions/9733fd99-1122-46e0-9482-732c52b24906/providers/Microsoft.CostManagement/query/5eb960c9-2fc7-4650-bc09-8e6c4e8eb13f",
        "name": "5eb960c9-2fc7-4650-bc09-8e6c4e8eb13f",
        "type": "Microsoft.CostManagement/query",
        "location": null,
        "sku": null,
        "eTag": null,
        "properties": {
            "nextLink": null,
            "columns": [
                {
                    "name": "PreTaxCost",
                    "type": "Number"
                },
                {
                    "name": "BillingMonth",
                    "type": "Datetime"
                },
                {
                    "name": "ServiceName",
                    "type": "String"
                },
                {
                    "name": "TagKey",
                    "type": "String"
                },
                {
                    "name": "TagValue",
                    "type": "String"
                },
                {
                    "name": "Currency",
                    "type": "String"
                }
            ],
            "rows": [
                [
                    0.164214312108748,
                    "2023-03-01T00:00:00",
                    "Azure Monitor",
                    "environment",
                    "build",
                    "CHF"
                ],
                [
                    0.003019580329528,
                    "2023-03-01T00:00:00",
                    "Log Analytics",
                    "environment",
                    "dev",
                    "CHF"
                ],
                [
                    0.025171445441918,
                    "2023-03-01T00:00:00",
                    "Log Analytics",
                    "environment",
                    "build",
                    "CHF"
                ]
            ]
        }
    }

    public static GetJsonCostByService(): Promise<ICostMngmtResponseJson>{
        return new Promise<ICostMngmtResponseJson>((resolve, reject) => {
            resolve(MockCostMngmtHttpClient.jsonCostByServiceResponse);
        });
    }
    public static GetJsonCostByService2Mo(): Promise<ICostMngmtResponseJson> {
        return new Promise<ICostMngmtResponseJson>((resolve, reject) => {
            resolve(MockCostMngmtHttpClient.jsonCostByServiceResponse2Months);
        });
    }
    public static GetJsonCostByService3Mo(): Promise<ICostMngmtResponseJson> {
        return new Promise<ICostMngmtResponseJson>((resolve, reject) => {
            resolve(MockCostMngmtHttpClient.jsonCostByServiceResponse3Months);
        });
    }
    public static GetJsonAzureMonitorCosts(): Promise<ICostMngmtResponseJson> {
        return new Promise<ICostMngmtResponseJson>((resolve, reject) => {
            resolve(MockCostMngmtHttpClient.jsonAzureMonitorCostsResponse);
        });
    }
    public static GetJsonAzureMonitorCosts3Mo(): Promise<ICostMngmtResponseJson> {
        return new Promise<ICostMngmtResponseJson>((resolve, reject) => {
            resolve(MockCostMngmtHttpClient.jsonAzureMonitorCostsResponse3Months);
        });
    }
}