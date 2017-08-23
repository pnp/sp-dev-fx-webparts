'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

const logging = require('@microsoft/gulp-core-build');
const fs = require('fs');

// path to editions config file
const buildConfigFilePath = './config/build-config.json';
// path to deploy-azure-storage.json
const azureConfigFilePath = './config/deploy-azure-storage.json';
// path to package-solution.json
const solutionConfigFilePath = './config/package-solution.json';
// path to write-manifests.json
const manifestFilePath = './config/write-manifests.json';
// path to custom-config.json that contains edition name to use in code
const customConfigFilePath = './src/webparts/helloWorld/custom-config.json';

// adding custom task. Can be executed with gulp change-build-edition --edition lite
build.task('change-build-edition', {
    execute: (config) => {
        return new Promise((resolve, reject) => {
            try {
                // getting edition parameter
                const edition = config.args['edition'] || 'full';

                // getting package-solution.json content
                const solutionJSON = JSON.parse(fs.readFileSync(solutionConfigFilePath));
                // getting deploy-azure-storage.json content
                const azureJSON = JSON.parse(fs.readFileSync(azureConfigFilePath));
                // getting write-manifests.json content
                const manifestJSON = JSON.parse(fs.readFileSync(manifestFilePath));
                // getting custom-config.json content
                const customConfigJSON = JSON.parse(fs.readFileSync(customConfigFilePath));
                // getting editions configurations
                const buildJSON = JSON.parse(fs.readFileSync(buildConfigFilePath));

                // getting edition settings by edition name
                const editionInfo = getEditionInfo(buildJSON, edition);

                if (!editionInfo) {
                    resolve();
                    return;
                }

                logging.log(`Configuring settings for edition: ${edition}`);

                //
                // updating custom-config.json file
                //
                customConfigJSON.edition = edition;
                logging.log('Updating custom config for the web part...');
                fs.writeFileSync(customConfigFilePath, JSON.stringify(customConfigJSON));

                //
                // updating package-solution.json
                //
                const revNumberStartIndex = solutionJSON.solution.version.lastIndexOf('.');
                // new version
                solutionJSON.solution.version = solutionJSON.solution.version.substring(0, revNumberStartIndex + 1) + editionInfo.revision;
                logging.log(`Checking if sppkg directory '${editionInfo.pkgPath}' exists and creating if not...`);
                // creating subfolder if doesn't exist
                ensurePath(editionInfo.pkgPath);
                // updating zippedPackage path
                solutionJSON.paths.zippedPackage = editionInfo.pkgPath;
                logging.log('Updating package-solution.json...');
                fs.writeFileSync(solutionConfigFilePath, JSON.stringify(solutionJSON));

                //
                // updating deploy-azure-storage.json
                //
                azureJSON.container = editionInfo.azureContainer;
                logging.log('Updating deploy-azure-storage.json...');
                fs.writeFileSync(azureConfigFilePath, JSON.stringify(azureJSON));

                //
                // updating write-manifests.json
                //
                manifestJSON.cdnBasePath = editionInfo.cdnPath;
                logging.log('Updating write-manifests.json...');
                fs.writeFileSync(manifestFilePath, JSON.stringify(manifestJSON));

                resolve();
            }
            catch (ex) {
                logging.log(ex);
                reject();
            }
        });
    }
});

/**
 * Gets edition settings by name
 * @param {any} buildJSON editions settings
 * @param {string} edition edition name
 */
function getEditionInfo(buildJSON, edition) {
    edition = edition || 'full';
    let result = null;

    if (buildJSON && buildJSON.editions && buildJSON.editions.length) {
        for (let i = 0, len = buildJSON.editions.length; i < len; i++) {
            const ver = buildJSON.editions[i];
            if (ver.edition === edition) {
                result = ver;
                break;
            }
        }
    }

    if (!result) {
        result = {
            'edition': 'full',
            'azureContainer': 'js-solution-editions-full',
            'cdnPath': '<!-- PATH TO CDN FULL -->',
            'revision': '2',
            'pkgPath': 'solution/full/js-solution-editions.sppkg'
        };
    }

    return result;
}

/**
 * Ensures that the subfolders from the path exist
 * @param {string} path relative path to sppkg file (relative to ./sharepoint folder)
 */
function ensurePath(path) {
    if (!path) {
        return;
    }

    let pathArray = path.split('/');
    if (!pathArray.length) {
        return;
    }


    //
    // removing filename from the path
    //
    if (pathArray[pathArray.length - 1].indexOf('.') !== -1) {
        pathArray.pop();
    }

    //
    // adding sharepoint as a root folder
    //
    if (pathArray[0] !== 'sharepoint') {
        pathArray.unshift('sharepoint');
    }

    //
    // creating all subfolders if needed
    //
    let currPath = '.';

    for (let i = 0, length = pathArray.length; i < length; i++) {
        const pathPart = pathArray[i];
        currPath += `/${pathPart}`;

        if (!fs.existsSync(currPath)) {
            fs.mkdir(currPath);
        }
    }
}

build.initialize(gulp);
