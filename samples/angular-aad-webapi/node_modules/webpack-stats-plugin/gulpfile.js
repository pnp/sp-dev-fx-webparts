/**
 * Gulpfile
 */
var gulp = require("gulp");
var eslint = require("gulp-eslint");
var jscs = require("gulp-jscs");
var mdox = require("gulp-mdox");

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------
var JS_FILES = [
  "lib/**/*.js",
  "demo/*.js",
  "*.js"
];

// ----------------------------------------------------------------------------
// EsLint
// ----------------------------------------------------------------------------
gulp.task("eslint", function () {
  return gulp
    .src(JS_FILES)
    .pipe(eslint())
    .pipe(eslint.formatEach("stylish", process.stderr))
    .pipe(eslint.failOnError());
});

// ----------------------------------------------------------------------------
// JsCs
// ----------------------------------------------------------------------------
gulp.task("jscs", function () {
  return gulp
    .src(JS_FILES)
    .pipe(jscs());
});

// ----------------------------------------------------------------------------
// Quality
// ----------------------------------------------------------------------------
gulp.task("check", ["jscs", "eslint"]);
gulp.task("check:ci", ["jscs", "eslint"]);
gulp.task("check:all", ["jscs", "eslint"]);

// ----------------------------------------------------------------------------
// Docs
// ----------------------------------------------------------------------------
gulp.task("docs", function () {
  return gulp
    .src([
      "lib/**/*.js"
    ])
    .pipe(mdox({
      src: "./README.md",
      name: "README.md",
      start: "## Plugins",
      end: "## Contributions"
    }))
    .pipe(gulp.dest("./"));
});

// ----------------------------------------------------------------------------
// Aggregations
// ----------------------------------------------------------------------------
gulp.task("default", ["check"]);
