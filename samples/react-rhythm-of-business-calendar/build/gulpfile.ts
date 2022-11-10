import * as path from 'path';
import * as gulp from 'gulp';
import * as build from '@microsoft/sp-build-web';
import { IBuildConfig } from '@microsoft/gulp-core-build';
import { IPackageSolutionConfig } from "@microsoft/spfx-heft-plugins/lib/plugins/packageSolutionPlugin/SolutionPackager";
import IFeature from "@microsoft/spfx-heft-plugins/lib/plugins/packageSolutionPlugin/packageSolution/models/packageDefinition/IFeature";
import { obj as through2obj } from 'through2';
const AliasPlugin = require('enhanced-resolve/lib/AliasPlugin');
const JSON5 = require('json5');
const zip = require('gulp-zip');
const StatefulProcessCommandProxy = require('stateful-process-command-proxy');

const environmentArgName = "env";
const defaultEnvironment = "local";

interface IEnvironment {
    deploySiteUrl: string;
    deployScope: "Tenant" | "Site";
    skipFeatureDeployment: boolean;
    environmentSymbol: string;
    package: {
        name: string;
        id: string;
        filename: string;
        features: {
            matchLocalId: string,
            title: string,
            id: string,
            elementManifests: string[]
        }[];
    };
    webparts: {
        manifest: string;
        id: string;
        alias: string;
        title: string;
    }[];
    extensions: {
        manifest: string;
        id: string;
        alias: string;
    }[];
    libraries: {
        manifest: string;
        id: string;
        alias: string;
    }[];
}

interface IEnvironmentConfiguration {
    dependencies: {
        spfxLibraries: string[];
        nodePackages: string[];
    };
    environments: {
        [name: string]: IEnvironment;
    };
}

const environmentConfigurations = require('./environments.json') as IEnvironmentConfiguration;
const { spfxLibraries, nodePackages } = environmentConfigurations.dependencies;

const getEnvironmentConfig = (buildOptions: IBuildConfig): IEnvironment => {
    return (environmentConfigurations.environments[buildOptions.args[environmentArgName] as string || defaultEnvironment]);
};

const createPowershellProxy = () => new StatefulProcessCommandProxy({
    name: 'PowerShell proxy',
    min: 1,
    max: 1,
    processCommand: 'powershell.exe',
    processArgs: ['-Command', '-'],
    processInvalidateOnRegex:
    {
        'any': [{ regex: '.*error.*', flags: 'ig' }],
        'stdout': [{ regex: '.*error.*', flags: 'ig' }],
        'stderr': [{ regex: '.*error.*', flags: 'ig' }]
    },
    logFunction: () => { }
});
const logResult = (result: any) => {
    if (result.stdout) build.log(result.stdout);
    if (result.stderr) build.error(result.stderr);
};

const modifyFile = (fn: (contents: string, path: string, file: any) => string) => {
    return through2obj((file, enc, cb) => {
        const contents = fn(String(file.contents), file.path, file) || file.contents;

        if (file.isBuffer() === true) {
            file.contents = Buffer.from(contents);
        }

        cb(null, file);
    });
};

build.configureWebpack.mergeConfig({
    additionalConfiguration: (generatedConfiguration) => {
        const solutionFolders = ['apps', 'assets', 'common', 'components', 'domain', 'model', 'schema', 'services'];

        const createPaths = (importPath: string) => {
            const paths = [path.resolve(__dirname, 'lib', importPath)];

            if (nodePackages) {
                for (const dependency of nodePackages) {
                    paths.push(path.resolve(__dirname, dependency, 'lib', importPath));
                }
            }

            return paths;
        };

        const resolveAliasPlugin = new AliasPlugin('described-resolve',
            solutionFolders.map(folder => {
                return {
                    name: folder,
                    alias: createPaths(folder)
                };
            }), 'resolve');

        generatedConfiguration.resolve ||= {};
        generatedConfiguration.resolve.plugins ||= [];
        generatedConfiguration.resolve.plugins.unshift(resolveAliasPlugin);

        return generatedConfiguration;
    }
});


if (nodePackages) {
    for (const dependency of nodePackages) {
        build.serveWatchFilter.push(`${dependency}/src/**/*.{ts,tsx,scss,resx,js,json,html}`);
        build.serveWatchFilter.push(`!${dependency}/src/**/*.{scss.ts,resx.ts}`);
    }
}

if (spfxLibraries) {
    for (const dependency of spfxLibraries) {
        build.serveWatchFilter.push(`${dependency}/dist/*.{json}`);
    }
}

const buildDependency_NodePackages_Subtask = build.subTask('build-dependency-nodepackages-subtask', async (_gulp, buildOptions) => {
    if (nodePackages) {
        for (const nodePackage of nodePackages) {
            const powershellProxy = createPowershellProxy();
            const gulpCommand = `cmd.exe /c "cd ${nodePackage} && gulp build ${buildOptions.production ? '--production' : ''}"`;
            build.log("Executing ", gulpCommand);
            await powershellProxy.executeCommand(gulpCommand).then(logResult);
            await powershellProxy.shutdown();
        }
    }

    return {};
});
build.task('build-dependency-nodepackages', buildDependency_NodePackages_Subtask);

const modifyPackageSolutionJsonSubtask = build.subTask('modify-package-solution-json-subtask', (_gulp, buildOptions, done) => {
    const config = getEnvironmentConfig(buildOptions);

    if (config) {
        return gulp.src('config/package-solution.json', { base: '.' })
            .pipe(gulp.dest(buildOptions.tempFolder + '/perEnvConfig'))
            .pipe(modifyFile((content: string) => {
                build.log("Modifying package-solution.json");
                const json = JSON5.parse(content) as IPackageSolutionConfig;
                json.solution!.id = config.package.id;
                json.solution!.name = config.package.name;
                json.solution!.features = json.solution!.features && json.solution!.features.map(originalFeature => {
                    const configFeature = (config.package.features || []).filter(f => f.matchLocalId == originalFeature.id)[0];
                    if (configFeature) {
                        const modifiedFeature: IFeature = Object.assign({}, originalFeature);
                        modifiedFeature.id = configFeature.id;
                        modifiedFeature.title = configFeature.title;
                        modifiedFeature.assets!.elementManifests = configFeature.elementManifests;
                        return modifiedFeature;
                    } else {
                        return originalFeature;
                    }
                });
                json.paths!.zippedPackage = `solution/${config.package.filename}`;
                return JSON.stringify(json, undefined, 4);
            }))
            .pipe(gulp.dest('.'));
    }
    else {
        done!();
    }
});

const modifyWebPartManifestsSubtask = build.subTask('modify-webpart-manifests-subtask', (_gulp, buildOptions, done) => {
    const config = getEnvironmentConfig(buildOptions);

    if (config) {
        return gulp.src('src/webparts/*/*WebPart.manifest.json', { base: '.' })
            .pipe(gulp.dest(buildOptions.tempFolder + '/perEnvConfig'))
            .pipe(modifyFile((content: string, filePath: string) => {
                const filename = filePath.split('\\').pop()?.split('/').pop()!;
                const webpartConfig = config.webparts.filter(wp => wp.manifest == filename)[0];
                build.log("Examining ", filename);
                if (webpartConfig) {
                    build.log("Modifying ", filename);
                    const json = JSON5.parse(content);
                    json.id = webpartConfig.id;
                    json.alias = webpartConfig.alias;
                    json.preconfiguredEntries[0].title.default = webpartConfig.title;
                    return JSON.stringify(json, undefined, 4);
                } else {
                    build.log("No modifications specified ", filename);
                    return content;
                }
            }))
            .pipe(gulp.dest('.'));
    } else {
        done!();
    }
});

const modifyExtensionManifestsSubtask = build.subTask('modify-extension-manifests-subtask', (_gulp, buildOptions, done) => {
    const config = getEnvironmentConfig(buildOptions);

    if (config && config.extensions) {
        return gulp.src('src/extensions/*/*ApplicationCustomizer.manifest.json', { base: '.' })
            .pipe(gulp.dest(buildOptions.tempFolder + '/perEnvConfig'))
            .pipe(modifyFile((content: string, filePath: string) => {
                const filename = filePath.split('\\').pop()?.split('/').pop()!;
                const extensionConfig = config.extensions.filter(ext => ext.manifest == filename)[0];
                build.log("Examining ", filename);
                if (extensionConfig) {
                    build.log("Modifying ", filename);
                    const json = JSON5.parse(content);
                    json.id = extensionConfig.id;
                    json.alias = extensionConfig.alias;
                    return JSON.stringify(json, undefined, 4);
                } else {
                    build.log("No modifications specified ", filename);
                    return content;
                }
            }))
            .pipe(gulp.dest('.'));
    } else {
        done!();
    }
});

const modifyLibraryManifestsSubtask = build.subTask('modify-library-manifests-subtask', (_gulp, buildOptions, done) => {
    const config = getEnvironmentConfig(buildOptions);

    if (config) {
        return gulp.src('src/**/*Library.manifest.json', { base: '.' })
            .pipe(gulp.dest(buildOptions.tempFolder + '/perEnvConfig'))
            .pipe(modifyFile((content: string, filePath: string) => {
                const filename = filePath.split('\\').pop()?.split('/').pop()!;
                const libraryConfig = config.libraries.filter(wp => wp.manifest == filename)[0];
                build.log("Examining ", filename);
                if (libraryConfig) {
                    build.log("Modifying ", filename);
                    const json = JSON5.parse(content);
                    json.id = libraryConfig.id;
                    json.alias = libraryConfig.alias;
                    return JSON.stringify(json, undefined, 4);
                } else {
                    build.log("No modifications specified ", filename);
                    return content;
                }
            }))
            .pipe(gulp.dest('.'));
    } else {
        done!();
    }
});

const modifySchemaDefaultsSubtask = build.subTask('modify-schema-defaults-subtask', (_gulp, buildOptions, done) => {
    const config = getEnvironmentConfig(buildOptions);

    if (config) {
        return gulp.src('src/**{,/*/**}/Defaults.ts', { base: '.' })
            .pipe(gulp.dest(buildOptions.tempFolder + '/perEnvConfig'))
            .pipe(modifyFile((content: string, filePath: string) => {
                build.log("Modifying ", filePath.split('\\src\\').pop()!);
                const lines = content.split('\n');
                return lines.map(line => {
                    if (line.startsWith("const Environment ="))
                        return `const Environment = ${config.environmentSymbol};`;
                    else
                        return line;
                }).join('\n');
            }))
            .pipe(gulp.dest('.'));
    } else {
        done!();
    }
});

const modifySchemaDefaults_NodePackages_Subtask = build.subTask('modify-schema-defaults-nodepackages-subtask', (_gulp, buildOptions, done) => {
    const config = getEnvironmentConfig(buildOptions);

    if (config && nodePackages) {
        return Promise.all(nodePackages.map(nodePackage => {
            return new Promise<void>((resolve, reject) => {
                gulp.src(`${nodePackage}/src/**{,/*/**}/Defaults.ts`, { base: `./${nodePackage}` })
                    .pipe(gulp.dest(`${nodePackage}/temp/perEnvConfig`))
                    .on('error', reject)
                    .pipe(modifyFile((content: string, filePath: string) => {
                        build.log("Modifying ", nodePackage, ' ', filePath.split('\\src\\').pop()!);
                        const lines = content.split('\n');
                        return lines.map(line => {
                            if (line.startsWith("const Environment ="))
                                return `const Environment = ${config.environmentSymbol};`;
                            else
                                return line;
                        }).join('\n');
                    }))
                    .pipe(gulp.dest(`./${nodePackage}`))
                    .on('end', resolve);
            });
        }));
    } else {
        done!();
    }
});

const modifyConfig_SPFxLibraries_Subtask = build.subTask('modify-config-spfxlibs-subtask', async (_gulp, buildOptions) => {
    if (spfxLibraries) {
        for (const spfxLibrary of spfxLibraries) {
            const powershellProxy = createPowershellProxy();
            const gulpCommand = `cmd.exe /c "cd ${spfxLibrary} && gulp modify-env-config --env ${buildOptions.args[environmentArgName]}"`;
            build.log("Executing ", gulpCommand);
            await powershellProxy.executeCommand(gulpCommand).then(logResult);
            await powershellProxy.shutdown();
        }
    }

    return {};
});


const restoreConfig_Subtask = build.subTask('restore-config-subtask', (_gulp, buildOptions) => {
    return gulp
        .src(buildOptions.tempFolder + '/perEnvConfig/**/*')
        .pipe(gulp.dest('.'));
});

const restoreDependencyConfig_NodePackages_Subtask = build.subTask('restore-dependency-config-nodepackages-subtask', (_gulp, _buildOptions, done) => {
    if (nodePackages) {
        return Promise.all(nodePackages.map(nodePackage => {
            return new Promise<void>((resolve, reject) => {
                return gulp
                    .src(`${nodePackage}/temp/perEnvConfig/**/*`)
                    .on('error', reject)
                    .pipe(gulp.dest(`./${nodePackage}`))
                    .on('end', resolve);
            });
        }));
    } else {
        done!();
    }
});

const restoreDependencyConfig_SPFxLibraries_Subtask = build.subTask('restore-dependency-config-spfxlibs-subtask', async (_gulp, _buildOptions) => {
    if (spfxLibraries) {
        for (const spfxLibrary of spfxLibraries) {
            const powershellProxy = createPowershellProxy();
            const gulpCommand = `cmd.exe /c "cd ${spfxLibrary} && gulp restore-original-config"`;
            build.log("Executing ", gulpCommand);
            await powershellProxy.executeCommand(gulpCommand).then(logResult);
            await powershellProxy.shutdown();
        }
    }

    return {};
});

const zipSourceCodeSubtask = build.subTask('zip-sourcecode-subtask', (_gulp, buildOptions, done) => {
    const config = getEnvironmentConfig(buildOptions);

    if (config) {
        return gulp.src(['*.*', 'build/**/*.*', 'config/**/*.*', 'mock_modules/**/*.*', 'release/assets/**/*.*', 'src/**{,/*/**}/*.*'], { base: '.' })
            .pipe(zip(`${config.package.filename.replace('.sppkg', '')}-src.zip`))
            .pipe(gulp.dest('sharepoint/solution'));
    } else {
        done!();
    }
});
build.task('zip-sourcecode', zipSourceCodeSubtask);

const publishSolutionSubtask = build.subTask('publish-solution-subtask', async (_gulp, buildOptions) => {
    const config = getEnvironmentConfig(buildOptions);

    if (config && config.deploySiteUrl) {
        const powershellProxy = createPowershellProxy();

        const scope = config.deployScope || "Site";
        const connectCommand = `Connect-PnPOnline -Interactive -Url ${config.deploySiteUrl}`;
        const addPackageCommand = `Add-PnPApp -Path .\\sharepoint\\solution\\${config.package.filename} -Scope ${scope} -Publish -Overwrite ${config.skipFeatureDeployment ? '-SkipFeatureDeployment' : ''}`;

        build.log("Executing ", connectCommand);
        await powershellProxy.executeCommand(connectCommand).then(logResult);

        build.log("Executing ", addPackageCommand);
        await powershellProxy.executeCommand(addPackageCommand).then(logResult);

        await powershellProxy.shutdown();
    }

    return {};
});
build.task('publish', publishSolutionSubtask);


const modifyEnvConfigTask = build.task('modify-env-config',
    build.parallel(
        modifyConfig_SPFxLibraries_Subtask,
        modifyPackageSolutionJsonSubtask,
        modifySchemaDefaults_NodePackages_Subtask,
        modifySchemaDefaultsSubtask,
        modifyWebPartManifestsSubtask,
        modifyExtensionManifestsSubtask,
        modifyLibraryManifestsSubtask
    )
);

const restoreOriginalConfigTask = build.task('restore-original-config',
    build.parallel(
        restoreDependencyConfig_SPFxLibraries_Subtask,
        restoreDependencyConfig_NodePackages_Subtask,
        restoreConfig_Subtask
    )
);

build.rig.addPreBuildTask(buildDependency_NodePackages_Subtask);

const buildTask = build.serial(
    build.preCopy,
    buildDependency_NodePackages_Subtask,
    build.parallel(build.sass, build.copyStaticAssets),
    build.parallel(build.lintCmd, build.tscCmd),
    build.postCopy
);

const bundleTask = build.serial(
    buildTask,
    build.configureWebpack,
    build.webpack
);

const packageTask = build.task('package',
    build.serial(
        build.clean,
        modifyEnvConfigTask,
        bundleTask,
        zipSourceCodeSubtask,
        build.packageSolution,
        restoreOriginalConfigTask
    )
);

build.task('deploy',
    build.serial(
        packageTask,
        publishSolutionSubtask
    )
);

build.task('serve',
    build.serial(
        build.serve,
        build.watch(build.serveWatchFilter,
            build.serial(
                bundleTask,
                build.reload
            )
        )
    )
);

build.addSuppression(/^Warning - \[sass\].*$/);
build.initialize(gulp);