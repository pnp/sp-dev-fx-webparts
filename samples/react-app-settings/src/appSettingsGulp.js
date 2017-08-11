'use strict';
var fs = require('fs'),
    build = require('@microsoft/sp-build-web');

/**
 * Verifies if the appSettings.json and appSettings.d.ts are have the same appSetting keys.
 */
var verifyAppSettings = build.subTask('verify-app-settings', function(gulp, buildConfig, done) {

    // will hold the keys from the appSettings.json file.
    var appSettingsJsKeys = [];

    // will hold the keys from the appSettings.d.ts file.
    var appSettingsTsKeys = [];

    /**
     * Get all appSettings keys from the appSettings.d.ts text in javascript/nodejs array.
     * Pure string operations.
     */
    var getappSettingsTsKeys = function(appSettingsTsSettingsAsText, appSettingsTsKeysArray) {
        
        var keyEndPos = appSettingsTsSettingsAsText.indexOf(":");

        // end the recursion if no more `:`.
        if(keyEndPos === -1) return appSettingsTsKeysArray; 

        // substring the appSetting key from the text.
        var key = appSettingsTsSettingsAsText.substring(0, keyEndPos);

        // add the appSetting key to the result array.
        appSettingsTsKeysArray.push(key);

        // exclude the key for the next call.
        appSettingsTsSettingsAsText = appSettingsTsSettingsAsText.substring(appSettingsTsSettingsAsText.indexOf(";") + 1); 

        // call again for the next key.
        getappSettingsTsKeys(appSettingsTsSettingsAsText, appSettingsTsKeysArray);
    }

    return new Promise(function(resolve, reject) {

        /**
         * Opens the appSettings.json file and pulls the appSetting keys in javascript array.
         * Then calls operations on appSettings.d.ts.
         */
        fs.readFile('./src/appSettings.json', 'utf8', function (err,data) {
            if (err) { return reject(err); }
            
            // remove some strings so we can parse to JSON, prue string manipulation.
            var jsonAsString = data.replace(/(?:\r\n|\r|\n)/g, "").trim();

            // appSettings.json keys to array.
            appSettingsJsKeys = Object.keys(JSON.parse(jsonAsString));

            /**
             * Opens the appSettings.d.ts file and pulls the appSetting keys in javascript array.
             * Then compares the appSettings.d.ts and the appSettings.json keys.
             */
            return fs.readFile('./src/appSettings.d.ts', 'utf8', function (err,data) {
                    if (err) { return reject(err); }

                    // remove some strings, prue string manipulation.
                    var text = data.substring(data.indexOf("{") + 1, data.indexOf("}")).replace(/ /g,"").replace(/(?:\r\n|\r|\n)/g, "").trim();
                    
                    // fill the appSettingsTsKeys array with the appSettings.d.ts keys.
                    getappSettingsTsKeys(text, appSettingsTsKeys);

                    // now we have two arrays with keys to compare.
                    
                    // checks the appSettings.json for missing keys.
                    var l = appSettingsTsKeys.length;
                    while(l--) {

                        if(appSettingsJsKeys.indexOf(appSettingsTsKeys[l]) === -1) 
                        {
                            build.error(`Key \"${appSettingsTsKeys[l]}\" not found in appSettings.json, but exists in appSettings.d.ts. Please fix your appSettings.`);
                            return reject();
                        }
                    }

                    // checks the appSettings.d.ts for missing keys.
                    l = appSettingsJsKeys.length;
                    while(l--) {

                        if(appSettingsTsKeys.indexOf(appSettingsJsKeys[l]) === -1) 
                        {
                            build.error(`Key \"${appSettingsJsKeys[l]}\" not found in appSettings.d.ts, but exists in appSettings.json. Please fix your appSettings.`);
                            return reject();
                        }
                    }

                    return resolve();
            });
        });
    });
});

exports.default = verifyAppSettings; 