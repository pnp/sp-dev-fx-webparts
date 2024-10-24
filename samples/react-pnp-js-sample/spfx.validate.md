# Validate project spfx-pnp-js-example-client-side-solution

Date: 10/25/2024

## Findings

Following is the list of issues found in your project. [Summary](#Summary) of the recommended fixes is included at the end of the report.

### FN002013 @types/webpack-env | Required

Install supported version of the @types/webpack-env package

Execute the following command:

```sh
npm i -DE @types/webpack-env@~1.15.2
```

File: [./package.json:39:9](./package.json)

### FN017001 Run npm dedupe | Optional

If, after upgrading npm packages, when building the project you have errors similar to: "error TS2345: Argument of type 'SPHttpClientConfiguration' is not assignable to parameter of type 'SPHttpClientConfiguration'", try running 'npm dedupe' to cleanup npm packages.

Execute the following command:

```sh
npm dedupe
```

File: [./package.json](./package.json)

## Summary

### Execute script

```sh
npm i -DE @types/webpack-env@~1.15.2
npm dedupe
```