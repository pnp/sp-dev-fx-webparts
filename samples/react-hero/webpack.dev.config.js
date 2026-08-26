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
    default: function() {
        return generateConfig;
    },
    getDevServerConfig: function() {
        return getDevServerConfig;
    }
});
const cors = require('cors');
const express = require('express');
const path = require('node:path');
const { Terminal, ConsoleTerminalProvider } = require('@rushstack/terminal');
const { SPFxDebugPageUrl, ServeInfoPlugin, DEFAULT_TEMP_FOLDER } = require('@microsoft/spfx-heft-plugins');
const baseConfig = require('./webpack.config');
const SERVE_INITIAL_PAGE = "https://{tenantDomain}/_layouts/workbench.aspx";
const WEBPACK_DEV_SERVER_PORT = 4321;
function _getDependencyServeMap(referencedProjects, terminal) {
    const dependencyServeMap = new Map();
    for (const versionMap of Object.values(referencedProjects)){
        for (const referencedProject of Object.values(versionMap)){
            if (referencedProject.packageName) {
                const projectOutputPath = path.dirname(referencedProject.manifestPath);
                if (referencedProject.manifestPath) {
                    dependencyServeMap.set(projectOutputPath, '/');
                } else {
                    terminal.writeWarning(referencedProject.packageName + ' not found.');
                }
            }
        }
    }
    return dependencyServeMap;
}
/**
 * Configures webpack dev server for SharePoint Framework development with CORS support and dependency serving.
 *
 * This function sets up a development server that serves both the current project's build output
 * and any referenced SPFx projects' outputs. It configures CORS headers to allow cross-origin
 * requests from SharePoint workbench, sets up static file serving for dependencies, and includes
 * hot module replacement for faster development iterations.
 *
 * Key features:
 * - Serves project build output from /dist with hot reload support
 * - Automatically discovers and serves linked SPFx project dependencies
 * - Enables CORS for SharePoint workbench integration
 * - Configures middleware for static file serving
 * - Sets up ServeInfoPlugin for development server information
 * - Supports cross-network access for testing on different devices
 *
 * @param terminal - Terminal instance for logging server information and warnings
 * @param referencedProjects - Map of discovered SPFx projects and their manifest data for dependency serving
 * @returns An object containing:
 * - `devServer`: Complete webpack dev server configuration with middleware and CORS
 * - `devServerPlugins`: Array of webpack plugins specific to development server functionality
 *
 * @example
 * ```typescript
 * const { devServer, devServerPlugins } = getDevServer(terminal, referencedProjects);
 * // devServer: { port: 4321, hot: true, static: false, setupMiddlewares: ... }
 * // devServerPlugins: [ServeInfoPlugin]
 * ```
 */ function getDevServer(terminal, referencedProjects) {
    const BUILD_FOLDER_PATH = `${__dirname}/dist`;
    const TEMP_FOLDER_PATH = `${__dirname}/temp`;
    const CONTENT_BASE_PUBLIC_PATH = '/';
    // Project serve paths
    const projectServeMap = new Map();
    projectServeMap.set(BUILD_FOLDER_PATH, CONTENT_BASE_PUBLIC_PATH);
    projectServeMap.set(TEMP_FOLDER_PATH, `/${DEFAULT_TEMP_FOLDER}`);
    // Additional serve paths
    const dependencyServeMap = _getDependencyServeMap(referencedProjects, terminal);
    const serveMap = new Map([
        ...projectServeMap,
        ...dependencyServeMap
    ]);
    const devServer = {
        static: false,
        devMiddleware: {
            publicPath: '/dist',
            stats: {
                assets: false,
                chunks: false,
                modules: false,
                warningsFilter: [
                    /export .* was not found in/
                ]
            },
            writeToDisk: true
        },
        host: '127.0.0.1',
        port: WEBPACK_DEV_SERVER_PORT,
        hot: true,
        historyApiFallback: false,
        compress: true,
        allowedHosts: 'all',
        setupMiddlewares: (middlewares, server)=>{
            const { app } = server;
            if (!app) {
                throw new Error(`express is not initialized!`);
            }
            app.use((req, res, next)=>{
                // Need to support CORS because we access this from a different origin
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, OPTIONS');
                res.setHeader('Access-Control-Allow-Private-Network', 'true'); // Allow access from other devices on the same network
                next();
            });
            app.options('*', cors({
            }));
            // Add middleware here, e.g.:
            // middlewares.unshift(serve.logRequestsMiddleware());
            for (const [contentPath, route] of serveMap){
                middlewares.push({
                    name: 'express-static',
                    path: route,
                    middleware: express.static(contentPath, {
                        index: false
                    })
                });
            }
            return middlewares;
        },
        open: SERVE_INITIAL_PAGE
    };
    return {
        devServer
    };
}
function getDevServerConfig(terminal) {
    const { referencedProjects } = baseConfig.getLinkedSPFxExternals(terminal, __dirname);
    const debugPageUrl = new SPFxDebugPageUrl();
    debugPageUrl.addDebugManifestsFileParameter(`/${DEFAULT_TEMP_FOLDER}/manifests.js`);
    // Webpack Dev Server plugins
    const devServerPlugins = [
        new ServeInfoPlugin({
            terminal,
            debugPageUrl
        })
    ];
    const { devServer } = getDevServer(terminal, referencedProjects);
    return {
        devServerPlugins,
        devServer
    };
}
function generateConfig(env) {
    const terminal = new Terminal(new ConsoleTerminalProvider());
    const config = baseConfig.default(env);
    const { devServerPlugins, devServer } = getDevServerConfig(terminal);
    config.plugins = config.plugins ?? [];
    config.plugins.push(...devServerPlugins);
    config.devServer = devServer;
    return config;
}

//# sourceMappingURL=./webpack.dev.config.js.map