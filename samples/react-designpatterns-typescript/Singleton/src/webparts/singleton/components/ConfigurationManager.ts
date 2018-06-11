class ConfigurationManager {
    private static instance: ConfigurationManager;
    public constructor() {
        // do something construct...
    }
    static getInstance(): ConfigurationManager {
        if (!ConfigurationManager.instance) {
            ConfigurationManager.instance = new ConfigurationManager();
            // ... any one time initialization goes here ...
        }
        return ConfigurationManager.instance;
    }

    // excercise for the reader to get data from an external data source.
    numberOfItemsPerPage(): number {
        return 10;
    }

    maxNumberOfConnections(): number {
        return 10;
    }

    restTimeout(): number {
        return 1000;
    }
}

export default ConfigurationManager;