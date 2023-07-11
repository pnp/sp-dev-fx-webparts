export type WebPart = {
    siteId: string;
    pageTitle: string;
    id: string;
    title: string;
}

export type GraphWebPart = {
    data?: GraphWebPartData;
    id: string;
    webPartType: string;
    innerHtml?: string;
}

export type GraphWebPartCollection = {
    value: GraphWebPart[];
}

export type GraphWebPartData = {
    audiences: string[];
    dataVersion: string[];
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    properties: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    serverProcessedContent: any;
    title: string;
}

export type AggredatedWebParts = {
    WPTitles: string[];
    WPCount: number[];
}

export type GraphSitePageCollection = {
    value: GraphSitePage[];
}

export type GraphSitePage = {
    id: string;
    title: string;
}

export type ChartDataCustom = {
    labels: string[];
    datasets: DataSet[];
}

export type DataSet = {
    label: string;
    data: number[];
    //backgroundColor: string[];
}