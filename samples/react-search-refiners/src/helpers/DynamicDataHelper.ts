import { IDynamicDataSource } from "@microsoft/sp-dynamic-data";
import { DynamicDataProvider } from "@microsoft/sp-component-base";
import IDynamicDataSourceConnection from "../models/IDynamicDataSourceConnection";

class DynamicDataHelper {

    private _dynamicDataProvider: DynamicDataProvider;
    private _instanceId: string;
    private _componentId: string;

    constructor(instanceId: string, componentId: string, dynamicDataProvider: DynamicDataProvider) {
        this._instanceId = instanceId;
        this._componentId = componentId;
        this._dynamicDataProvider = dynamicDataProvider;
    }

    /**
     * Gets a data source from its instance id or component id
     * @param dataSourceInstanceId the data source instance id
     */
    public _tryGetSourceByInstanceOrComponentId(dataSourceConnection: IDynamicDataSourceConnection): IDynamicDataSource {
        
        // Try get source by instance id
        const availableSources = this._dynamicDataProvider.getAvailableSources();

        let sources: IDynamicDataSource[] = availableSources.filter((item) => { 
          if (item.metadata.instanceId) {
            // Instance id is always unique and doesn't change for Web Parts when refreshing the page
            // This is not the case for extensions
            if (item.metadata.instanceId.localeCompare(dataSourceConnection.instanceId) === 0 
              && this._instanceId !== item.metadata.instanceId) {
                return true;
            }
          }
        });

        if (sources.length === 0 ) {

          // Try get source by component id instead (SPFx extension)
          sources = availableSources.filter((item) => { 
            if (item.metadata.instanceId) {

              if (item.metadata.componentId.localeCompare(dataSourceConnection.componentId) === 0 
                && this._componentId !== item.metadata.componentId) {
                  return true;
              }
            }
          });
        }

        if (sources.length > 0 ) {
          return sources[0];
        } else {
          return undefined;      
        }
    }

    /**
     * Ensure a data source connection object is initialized with all needed properties
     * @param dataSourceConnection the data source connection
     */
    public isDataSourceInstanceInitialized(dataSourceConnection: IDynamicDataSourceConnection): boolean {
      return dataSourceConnection.instanceId && dataSourceConnection.sourceId && dataSourceConnection.propertyId && dataSourceConnection.componentId ? true : false;
    }
}

export default DynamicDataHelper;