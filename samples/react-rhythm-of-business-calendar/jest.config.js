const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    "rootDir": ".",
    "collectCoverage": true,
    "coverageDirectory": "temp/test",
    "coverageReporters": [
        "json",
        "lcov",
        "text-summary"
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "json"
    ],
    "moduleNameMapper": {
        "\\.(css|scss)$": "identity-obj-proxy",
        "^@microsoft/sp-core-library": "identity-obj-proxy",
        "^resx-strings/en-us.json": "@microsoft/sp-core-library/lib/resx-strings/en-us.json"
    },
    "moduleDirectories": [
        "mock_modules",
        "mock_loc_modules",
        "src",
        "node_modules"
    ],
    "setupFiles": [
        "raf/polyfill"
    ],
    "globalSetup": "./jest.setup.localization-mocks.ts",
    "snapshotSerializers": [],
    "testMatch": [
        "**/src/**/*.(spec|test).+(ts|js)?(x)"
    ],
    "testURL": "http://localhost",
    "transform": {
        ...tsjPreset.transform,
    }
};