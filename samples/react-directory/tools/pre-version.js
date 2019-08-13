/**
 * This script updates the package-solution version analogue to the
 * the package.json file.
 */

if (process.env.npm_package_version === undefined) {

    throw 'Package version cannot be evaluated';

}

// define path to package-solution file
const solution = './config/package-solution.json',
    teams = './teams/manifest.json';

// require filesystem instance
const fs = require('fs');

// get next automated package version from process variable
const nextPkgVersion = process.env.npm_package_version;

// make sure next build version match
const nextVersion = nextPkgVersion.indexOf('-') === -1 ?
    nextPkgVersion : nextPkgVersion.split('-')[0];

// Update version in SPFx package-solution if exists
if (fs.existsSync(solution)) {

    // read package-solution file
    const solutionFileContent = fs.readFileSync(solution, 'UTF-8');
    // parse file as json
    const solutionContents = JSON.parse(solutionFileContent);

    // set property of version to next version
    solutionContents.solution.version = nextVersion + '.0';

    // save file
    fs.writeFileSync(
        solution,
        // convert file back to proper json
        JSON.stringify(solutionContents, null, 2),
        'UTF-8');

}

// Update version in teams manifest if exists
if (fs.existsSync(teams)) {

    // read package-solution file
    const teamsManifestContent = fs.readFileSync(teams, 'UTF-8');
    // parse file as json
    const teamsContent = JSON.parse(teamsManifestContent);

    // set property of version to next version
    teamsContent.version = nextVersion;

    // save file
    fs.writeFileSync(
        teams,
        // convert file back to proper json
        JSON.stringify(teamsContent, null, 2),
        'UTF-8');

}
