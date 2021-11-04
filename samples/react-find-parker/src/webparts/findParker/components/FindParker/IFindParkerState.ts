import IParker from "../../model/IParker";

export interface IFindParkerState {
    numberOfFoundElements: number;
    listOfParkers: Array<IParker>;
    elements: Array<React.ReactElement>;
    gameStarted: boolean;
    gameFinsihed: boolean;
    foundPlaceForParkers: boolean;
}
