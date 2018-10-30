interface IDynamicDataSourceConnection {

    /**
     * The source unique identifier
     */
    sourceId: string;

    /**
     * The proeprty id (i.e. "searchResultsCount")
     */
    propertyId: string;

    /**
     * The instance id
     */
    instanceId: string;

    /**
     * The component id
     */
    componentId: string;
}

export default IDynamicDataSourceConnection;