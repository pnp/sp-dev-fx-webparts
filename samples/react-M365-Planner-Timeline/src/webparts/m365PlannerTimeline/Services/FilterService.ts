import { 
  IFilterSettings,
  IFilterService 
 } from '..';

// FilterService class implements IFilterService interface
export class FilterService implements IFilterService {
  // private variable to store filter settings
  private _filterSettings: IFilterSettings;  

  // constructor to initialize filter settings
  constructor(filterSettings: IFilterSettings) {
    // set filter settings
    this._filterSettings = filterSettings;    
  }

  // save filter settings in session storage
  public saveFilterSettings(cacheId: string, filterSettings: IFilterSettings): void {
     // save filter settings in session storage    
    this._filterSettings = filterSettings;

    // save filter settings in session storage
    sessionStorage.setItem( "_" + cacheId + "TimeLineFilterData", JSON.stringify(this._filterSettings));
    // save filter settings time in session storage
    sessionStorage.setItem("_pms" + cacheId + "FilterTime", JSON.stringify(new Date()));  
  }

  // get filter settings from session storage
  public getFilterSettings(cacheId: string): IFilterSettings {
    // get filter settings from session storage
    const filterData = sessionStorage.getItem("_" + cacheId + "TimeLineFilterData");

    // check if filter settings are available
    if (filterData) {
      // parse filter settings
      const filterDataString = sessionStorage.getItem("_pms" + cacheId + "FilterTime");      

      // check if filter settings time is available
      if (filterDataString) {
        const filter = JSON.parse(filterData);
        // parse filter settings time
        const dataTime: Date = new Date(filterDataString.replace(/"/g, ""));
        // get current time
        const nowTime: Date = new Date();
        // calculate delay
        const delay: number =
          (nowTime.getTime() - dataTime.getTime()) / (1000 * 60);

        // check if delay is less than 30 minutes
        if (delay < 30) {
          // create filter settings object
          const filterSet: IFilterSettings = {
            bucketId: filter.bucketId,
            showActiveTasks: filter.showActiveTasks === true,
            refreshData: filter.refreshData === true,
          };

          // return filter settings
          this._filterSettings = filterSet;
        }
      }
    }    

    return this._filterSettings;
  }

  // remove filter settings from session storage
  public removeFilterSettings(cacheId: string): void {
    // remove filter settings from session storage
    sessionStorage.removeItem("_" + cacheId + "TimeLineFilterData");
    // remove filter settings time from session storage
    sessionStorage.removeItem("_pms" + cacheId + "FilterTime");
  }
}