'use strict';

const fs = require('fs');
const path = require('path');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

let copyPackageIcon = build.subTask('copy-package-icon', function (gulp, buildOptions, done) {
  this.log(`Inspecting package-solution.json for icon`);
  //Get the config file path
  let psConfigPath = path.join(process.cwd(), 'config', "package-solution.json");

  //read the config file into a JSON object
  let psConfig = undefined;
  try {
    var content = fs.readFileSync(psConfigPath, 'utf8');
    psConfig = JSON.parse(content);
  }
  catch (e) {
    this.log(e);
  }

  if (psConfig && psConfig.solution && psConfig.solution.iconPath) {
    // Copy to sharepoint folder so it is found by package-solution
    let src = `src/${psConfig.solution.iconPath}`;
    let dest = `sharepoint/${psConfig.solution.iconPath}`;
    this.log(`icon: ${src}`);
    this.log(`dest: ${dest}`);
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(src, dest);

    // Copy to CDN staging
    gulp.src(`src/${psConfig.solution.iconPath}`)
      .pipe(gulp.dest('./temp/deploy'));
  }
  done();
});

build.rig.addPostBundleTask(copyPackageIcon);

build.initialize(require('gulp'));
