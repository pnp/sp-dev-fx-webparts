class ConfigurationManager {
    private static instance: ConfigurationManager;
  
    private constructor() {
        // do something construct...
    }
  
    public static getInstance(): ConfigurationManager {
        if (!ConfigurationManager.instance) {
            ConfigurationManager.instance = new ConfigurationManager();
            // ... any one time initialization goes here ...
        }
        return ConfigurationManager.instance;
    }

    // excercise for the reader to get data from an external data source.
    public numberOfItemsPerPage(): number {
        return 10;
    }

    public maxNumberOfConnections(): number {
        return 10;
    }

    public restTimeout(): number {
        return 1000;
    }
}

export default ConfigurationManager;
