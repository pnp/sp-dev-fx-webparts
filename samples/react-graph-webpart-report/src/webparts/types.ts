export type WebPart = {
    siteId: string;
    pageTitle: string;
    id: string;
    title: string;
}

export type AggredatedWebParts = {
    titles: string[];
    count: number[];
}

export type SitePage = {
    id: string;
    title: string;
}

export type ChartDataCustom = {
    labels: string[];
    datasets: DataSet[];
}

export type DataSet = {
    label: string;
    data: number [];
    //backgroundColor: string[];
}