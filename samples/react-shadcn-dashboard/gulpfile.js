"use strict"

const build = require("@microsoft/sp-build-web")
const path = require("path")

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
)

var getTasks = build.rig.getTasks
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig)

  result.set("serve", result.get("serve-deprecated"))

  return result
}

// add task to build tailwind css
const postcss = require("gulp-postcss")
const atimport = require("postcss-import")
const tailwind = require("tailwindcss")

const tailwindcss = build.subTask(
  "tailwindcss",
  function (gulp, buildOptions, done) {
    gulp
      .src("assets/tailwind.css")
      .pipe(postcss([atimport(), tailwind("./tailwind.config.js")]))
      .pipe(gulp.dest("assets/dist"))
    done()
  }
)
build.rig.addPreBuildTask(tailwindcss)

build.initialize(require("gulp"))
