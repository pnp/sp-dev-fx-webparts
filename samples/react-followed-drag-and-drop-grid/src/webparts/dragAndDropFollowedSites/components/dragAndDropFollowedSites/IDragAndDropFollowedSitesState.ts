import IFollowedSite from "../../../model/IFollowedSite";
import FollowedSitesService from "../../services/FollowedSites/FollowedSitesService";
import MyDataService from "../../services/MyData/MyDataService";

export interface IDragAndDropFollowedSitesState {
    followedSitesService: FollowedSitesService;
    myDataService: MyDataService;
    isError: boolean;
    isLoading: boolean;
    sortingIsActive: boolean;
    urls: IFollowedSite[];
}