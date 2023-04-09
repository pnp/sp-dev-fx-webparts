//Create response. Names must match the List Internal Names
export interface IListModelResponse {
    Id: number;
    Title: string;
    MyCardTitle: string;
    MyAreas: string;
    MyShortText: string;
    MyHyperlink: IUrlLink;
    MyIcon: string;
    MyIconRgb: string;
}

//Create the Url from the Hyperlink Field
export interface IUrlLink {
    Url: string;
}

//Create the Timeline Model
export interface IListModel {
    Id: number;
    TimelineNodeTitle: string;
    CardTitle: string;
    ChoiceArea: string;
    ShortText: string;
    Link: string
    ChoiceIcon: string;
    RgbColor: string;
}