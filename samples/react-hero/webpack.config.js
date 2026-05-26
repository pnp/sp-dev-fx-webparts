"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * Generates a SharePoint Framework (SPFx) webpack configuration for building web parts and extensions.
 *
 * This function creates a specialized webpack configuration tailored for SPFx development that:
 * - Configures AMD module output format required by SharePoint's module loader
 * - Integrates SPFx-specific plugins for manifest generation and localization
 * - Sets up TypeScript compilation with transpile-only mode for faster builds
 * - Handles localization (.resjson) files for internationalization support
 * - Configures SCSS/CSS processing with Sass support and node_modules resolution
 * - Sets up asset handling for images, fonts, and media files
 * - Manages external dependencies and linked SPFx projects
 * - Configures webpack resolve aliases for localization strings
 *
 * The configuration differs from standard React/web apps by:
 * - Using AMD instead of CommonJS/ESM module format
 * - Including SharePoint manifest generation
 * - Supporting SPFx localization patterns
 * - Handling linked SPFx project externals
 * - Using SPFx-specific file naming conventions with locale and content hash
 *
 * @param env - Webpack configuration environment containing production flag and other build settings
 * @returns Complete webpack configuration object ready for SPFx component building
 *
 * @example
 * ```typescript
 * // Used by webpack to build SPFx components
 * const config = generateConfig({ production: true });
 * // Results in AMD modules loadable by SharePoint with proper manifests
 * ```
 */ default: function() {
        return generateConfig;
    },
    getLinkedSPFxExternals: function() {
        return getLinkedSPFxExternals;
    },
    getSPFxWebpackConfig: function() {
        return getSPFxWebpackConfig;
    }
});
const _setwebpackpublicpathplugin = require("@rushstack/set-webpack-public-path-plugin");
const glob = require('glob');
const path = require('node:path');
const { ManifestPlugin, CumulativeManifestProcessor, DependencyDiscoveryMode } = require('@microsoft/spfx-heft-plugins');
const { JsonFile } = require('@rushstack/node-core-library');
const { Terminal, ConsoleTerminalProvider } = require('@rushstack/terminal');
const { LocalizationPlugin } = require('@rushstack/webpack5-localization-plugin');
// Configuration constants
const DEFAULT_LOCALE = 'en-us';
const TEMP_FOLDER_NAME = 'temp';
const DIST_FOLDER_NAME = 'dist';
const RELEASE_MANIFESTS_FOLDER = `release/manifests`;
const INTERNAL_MODULE_BASE_URL = 'http://these-webparts-dont-get-deployed';
const bundles = [
  {
    "bundleName": "hero-web-part",
    "components": [
      {
        "entrypoint": "./src/webparts/hero/HeroWebPart.tsx",
        "manifest": "./src/webparts/hero/HeroWebPart.manifest.json"
      }
    ]
  }
];
const localization = {
  "HeroWebPartStrings": "src/webparts/hero/loc/{locale}.resjson"
};
/**
 * Generates the webpack entry configuration and bundle entries from the provided bundle configuration.
 *
 * This function processes the bundle configuration to create both the webpack entry points and
 * the structured bundle entries used by the ManifestPlugin. Each bundle is transformed into
 * webpack entry configuration while also collecting component manifest data.
 *
 * @returns An object containing:
 * - `entry`: Webpack configuration entry points mapping bundle names to their entry files
 * - `bundleEntries`: Array of structured bundle entry objects containing component manifest data
 *
 * @example
 * ```typescript
 * const { entry, bundleEntries } = getBundleConfig();
 * // entry: { 'my-bundle': './src/index.ts' }
 * // bundleEntries: [{ bundleName: 'my-bundle', components: { ... } }]
 * ```
 */ function getBundleConfig() {
    const entry = {};
    const bundleEntries = [];
    for (const bundle of bundles){
        entry[bundle.bundleName] = bundle.components[0].entrypoint;
        const bundleEntry = {
            bundleName: bundle.bundleName,
            components: {}
        };
        for (const component of bundle.components){
            const manifestData = JsonFile.load(component.manifest);
            bundleEntry.components[manifestData.id] = {
                manifestData,
                manifestPath: `${__dirname}/${component.manifest}`,
                exportName: undefined,
                entrypoint: `${__dirname}/${component.entrypoint}`,
                manifest: component.manifest
            };
        }
        bundleEntries.push(bundleEntry);
    }
    return {
        entry,
        bundleEntries
    };
}
/**
 * Configures localization settings for webpack including translated strings and aliases.
 *
 * This function processes the global localization configuration to generate webpack resolve aliases
 * for the default locale and builds a mapping of translated strings for other locales. It scans
 * for localized files using glob patterns and creates the appropriate webpack configuration.
 *
 * @returns An object containing:
 * - `translatedStrings`: Mapping of locale codes to their translated string file paths
 * - `alias`: Webpack resolve aliases for localization modules
 *
 * @example
 * ```typescript
 * const { translatedStrings, alias } = getLocalizationConfig();
 * // translatedStrings: { 'fr-fr': { './strings/en-us.resjson': './strings/fr-fr.resjson' } }
 * // alias: { 'MyStrings': '/path/to/strings/en-us.resjson' }
 * ```
 */ function getLocalizationConfig() {
    const translatedStrings = {};
    const alias = {};
    for (const [resourceKey, resourcePattern] of Object.entries(localization)){
        const defaultLocalePath = resourcePattern.replace('{locale}', DEFAULT_LOCALE);
        alias[resourceKey] = path.resolve(__dirname, defaultLocalePath);
        const localizedFiles = glob.sync(resourcePattern.replace('{locale}', '*'), {
            cwd: __dirname
        });
        for (const localizedFile of localizedFiles){
            const locale = path.basename(localizedFile, path.extname(localizedFile));
            if (locale === DEFAULT_LOCALE) {
                continue;
            }
            translatedStrings[locale] = translatedStrings[locale] || {};
            translatedStrings[locale][defaultLocalePath] = `./${localizedFile}`;
        }
    }
    return {
        translatedStrings,
        alias
    };
}
function getLinkedSPFxExternals(terminal, rootPath) {
    const cumulativeManifestProcessor = new CumulativeManifestProcessor({
        terminal,
        rootPath,
        tempFolderName: TEMP_FOLDER_NAME,
        distFolderName: DIST_FOLDER_NAME
    });
    const referencedProjects = cumulativeManifestProcessor.discoverManifests(rootPath, DependencyDiscoveryMode.deepSparseIgnoreFirstProject);
    const linkedExternals = new Map(Object.entries(referencedProjects).flatMap(([manifestId, versionMap])=>Object.values(versionMap).filter(({ packageName, isAssembly })=>packageName && !isAssembly).map(({ packageName, manifestData: { version } })=>[
                packageName,
                {
                    id: manifestId,
                    name: packageName,
                    version
                }
            ])));
    const externals = [
        ...new Set(linkedExternals.keys())
    ];
    return {
        referencedProjects,
        cumulativeManifestProcessor,
        linkedExternals,
        externals
    };
}
function getSPFxWebpackConfig({ production }) {
    const terminal = new Terminal(new ConsoleTerminalProvider());
    const { referencedProjects, cumulativeManifestProcessor, linkedExternals, externals } = getLinkedSPFxExternals(terminal, __dirname);
    const { translatedStrings, alias } = getLocalizationConfig();
    const { entry, bundleEntries } = getBundleConfig();
    const plugins = [
        // LocalizationPlugin: Handles internationalization (i18n)
        // - Processes .resjson files and creates localized bundles
        // - Enables dynamic locale switching at runtime
        // - Creates webpack resolve aliases for default locale strings
        new LocalizationPlugin({
            localizedData: {
                defaultLocale: {
                    localeName: DEFAULT_LOCALE
                },
                translatedStrings
            },
            realContentHash: true
        }),
        // ManifestPlugin: Generates SPFx component manifests required by SharePoint
        // - Creates .json manifest files that describe your components to SharePoint
        // - Handles component registration, dependencies, and metadata
        // - Manages external dependencies and linked SPFx projects
        // - Processes component assets and integrity hashes for security
        new ManifestPlugin({
            terminal,
            bundleEntries,
            // Base URL for internal modules (not actually deployed, used for manifest generation)
            internalModuleBaseUrls: [
                INTERNAL_MODULE_BASE_URL
            ],
            debugInternalModuleBaseUrls: [],
            linkedExternals,
            referencedProjects,
            cumulativeManifestProcessor,
            sourceLocaleName: DEFAULT_LOCALE,
            // Localized manifest strings (currently disabled)
            tryGetLocFileTranslations: (absoluteFilePath)=>{
                return undefined;
            },
            selectedLocales: undefined,
            production
        }),
        new _setwebpackpublicpathplugin.SetPublicPathCurrentScriptPlugin()
    ];
    return {
        plugins,
        entry,
        alias,
        externals,
        terminal
    };
}
function generateConfig(env) {
    const { entry, alias, externals, plugins } = getSPFxWebpackConfig(env);
    // Use different output folders for production vs development to maintain compatibility with non-ejected mode
    // Production: Manifests in release/manifests (webpack output.path), JS bundles in ../assets via filename path
    // Development: Both manifests and JS in dist
    const outputFolder = env.production ? RELEASE_MANIFESTS_FOLDER : DIST_FOLDER_NAME;
    const jsFilenamePrefix = env.production ? '../assets/' : '';
    const config = {
        mode: env.production ? 'production' : 'development',
        entry,
        output: {
            filename: `${jsFilenamePrefix}[name]_[locale]_[contenthash].js`,
            path: `${__dirname}/${outputFolder}`,
            // SPFx requires AMD module format for SharePoint's module loader
            libraryTarget: 'amd'
        },
        module: {
            rules: [
                {
                    test: /\.resjson$/,
                    use: {
                        // All loaders are available in `@rushstack/webpack5-localization-plugin/lib/loaders/`
                        // Loaders for specific formats: `resjson-loader`, `locjson-loader`, `resx-loader`
                        // Loader that switches on file extension: `loc-loader`
                        // Loader that switches on file extension and skips localization: `default-locale-loader`
                        loader: require.resolve('@rushstack/webpack5-localization-plugin/lib/loaders/resjson-loader')
                    },
                    // Can be one of `javascript/esm`, `javascript/dynamic`, or `json`
                    // `javascript/esm` will produce the smallest bundle sizes, while `json` will produce faster code for large string tables
                    type: 'javascript/esm',
                    sideEffects: false
                },
                {
                    // Allow importing JS files that don't have explicit extensions
                    test: /\.js$/,
                    resolve: {
                        fullySpecified: false
                    }
                },
                {
                    // Load .ts/.tsx files
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        configFile: `${__dirname}/tsconfig.json`
                    },
                    resolve: {
                        fullySpecified: false
                    }
                },
                // Asset files (images, fonts, media)
                {
                    test: /\.(png|mp4|mp3|svg|jpg|aac|woff2|woff)$/i,
                    type: 'asset/resource'
                },
                // Styles (CSS/SCSS)
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass'),
                                sassOptions: {
                                    includePaths: [
                                        `${__dirname}/node_modules`
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [
                '.js',
                '.jsx',
                '.ts',
                '.tsx'
            ],
            alias
        },
        externals,
        performance: {
            hints: false
        },
        plugins
    };
    return config;
}

//# sourceMappingURL=./webpack.config.js.map