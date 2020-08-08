(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["debugManifests"] = factory();
	else
		root["debugManifests"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Set the webpack public path
/******/ 	(function () {
/******/ 	  var scripts = document.getElementsByTagName('script');
/******/ 	  var regex = new RegExp('manifests\\.js', 'i');
/******/ 	  var publicPath;
/******/
/******/ 	  if (scripts && scripts.length) {
/******/ 	    for (var i = 0; i < scripts.length; i++) {
/******/ 	      if (!scripts[i]) continue;
/******/ 	      var path = scripts[i].getAttribute('src');
/******/ 	      if (path && path.match(regex)) {
/******/ 	        publicPath = path.substring(0, path.lastIndexOf('/') + 1);
/******/ 	        break;
/******/ 	      }
/******/ 	    }
/******/ 	  }
/******/
/******/ 	  if (!publicPath) {
/******/ 	    for (var global in window.__setWebpackPublicPathLoaderSrcRegistry__) {
/******/ 	      if (global && global.match(regex)) {
/******/ 	        publicPath = global.substring(0, global.lastIndexOf('/') + 1);
/******/ 	        break;
/******/ 	      }
/******/ 	    }
/******/ 	  }
/******/ 	  __webpack_require__.p = publicPath;
/******/ 	})();
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManifests", function() { return getManifests; });
var MANIFESTS_ARRAY = [
  {
    "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a",
    "alias": "SPLodashSubset",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-lodash-subset",
      "scriptResources": {
        "sp-lodash-subset": {
          "type": "path",
          "path": "sp-lodash-subset.js"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b",
    "alias": "SPCoreLibrary",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-core-library",
      "scriptResources": {
        "sp-core-library": {
          "type": "localizedPath",
          "defaultPath": "sp-core-library_en-us.js"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "f97266fb-ccb7-430e-9384-4124d05295d3",
    "alias": "Decorators",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "decorators",
      "scriptResources": {
        "decorators": {
          "type": "path",
          "path": "decorators.js"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "17ce0976-e69a-4355-be84-89b69a74717d",
    "alias": "FabricStyling",
    "componentType": "Library",
    "version": "0.1.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "uifabric-styling-bundle",
      "scriptResources": {
        "uifabric-styling-bundle": {
          "type": "path",
          "path": "uifabric-styling-bundle.js"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "02a01e42-69ab-403d-8a16-acd128661f8e",
    "alias": "OfficeUIFabricReact",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "office-ui-fabric-react-bundle",
      "scriptResources": {
        "office-ui-fabric-react-bundle": {
          "type": "path",
          "path": "office-ui-fabric-react-bundle.js"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "react-dom": {
          "type": "component",
          "version": "16.8.5",
          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a"
        },
        "@ms/uifabric-styling-bundle": {
          "type": "component",
          "version": "0.1.0",
          "id": "17ce0976-e69a-4355-be84-89b69a74717d"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8",
    "alias": "SPDiagnostics",
    "componentType": "Library",
    "version": "1.11.0",
    "loaderConfig": {
      "entryModuleId": "sp-diagnostics",
      "scriptResources": {
        "sp-diagnostics": {
          "type": "path",
          "path": "sp-diagnostics.js"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "7c9eec52-5087-48ef-929d-1ce66304c041",
    "alias": "SPTaskLib",
    "componentType": "Library",
    "version": "0.0.4",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-tab-tasklib",
      "scriptResources": {
        "sp-tab-tasklib": {
          "type": "path",
          "path": "sp-tab-tasklib.js"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "e40f8203-b39d-425a-a957-714852e33b79",
    "alias": "SPDynamicData",
    "componentType": "Library",
    "version": "1.11.0",
    "loaderConfig": {
      "entryModuleId": "sp-dynamic-data",
      "scriptResources": {
        "sp-dynamic-data": {
          "type": "localizedPath",
          "defaultPath": "sp-dynamic-data_en-us.js"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "1e384972-6346-49b4-93c7-b2e6763938e6",
    "alias": "sp-polyfills",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-polyfills",
      "scriptResources": {
        "sp-polyfills": {
          "type": "path",
          "path": "sp-polyfills.js"
        }
      }
    }
  },
  {
    "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6",
    "alias": "SPHttp",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "preloadComponents": [],
    "loaderConfig": {
      "entryModuleId": "sp-http",
      "scriptResources": {
        "sp-http": {
          "type": "localizedPath",
          "defaultPath": "sp-http_en-us.js"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8",
    "alias": "SPPageContext",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-page-context",
      "scriptResources": {
        "sp-page-context": {
          "type": "localizedPath",
          "defaultPath": "sp-page-context_en-us.js"
        },
        "@microsoft/sp-dynamic-data": {
          "type": "component",
          "version": "1.11.0",
          "id": "e40f8203-b39d-425a-a957-714852e33b79"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "229b8d08-79f3-438b-8c21-4613fc877abd",
    "alias": "SPLoadThemedStyles",
    "componentType": "Library",
    "version": "0.1.2",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-load-themed-styles",
      "scriptResources": {
        "sp-load-themed-styles": {
          "type": "path",
          "path": "sp-load-themed-styles.js"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff",
    "alias": "OdspUtilitiesBundle",
    "componentType": "Library",
    "version": "5.1.55",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "odsp-utilities-bundle",
      "scriptResources": {
        "odsp-utilities-bundle": {
          "type": "path",
          "path": "odsp-utilities-bundle.js"
        }
      }
    }
  },
  {
    "id": "8217e442-8ed3-41fd-957d-b112e841286a",
    "alias": "SPTelemetry",
    "componentType": "Library",
    "version": "0.8.24",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-telemetry",
      "scriptResources": {
        "sp-telemetry": {
          "type": "path",
          "path": "sp-telemetry.js"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d",
    "alias": "React",
    "componentType": "Library",
    "version": "16.8.5",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "react-16-bundle",
      "scriptResources": {
        "react-16-bundle": {
          "type": "path",
          "path": "react-16-bundle.js"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a",
    "alias": "ReactDOM",
    "componentType": "Library",
    "version": "16.8.5",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "react-dom-16-bundle",
      "scriptResources": {
        "react-dom-16-bundle": {
          "type": "path",
          "path": "react-dom-16-bundle.js"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f",
    "alias": "SPLoader",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-loader",
      "scriptResources": {
        "sp-loader": {
          "type": "localizedPath",
          "defaultPath": "sp-loader_en-us.js"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@microsoft/sp-dynamic-data": {
          "type": "component",
          "version": "1.11.0",
          "id": "e40f8203-b39d-425a-a957-714852e33b79"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-page-context": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@microsoft/sp-http": {
          "type": "component",
          "version": "1.11.0",
          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "componentType": "Library",
    "id": "44bae1a2-d2eb-4e10-8c21-a1dbdce1036f",
    "alias": "sp-loader-assembly",
    "isInternal": true,
    "version": "1.0.0",
    "rootComponentId": "1c6c9123-7aac-41f3-a376-3caea41ed83f",
    "requiresCustomScript": false,
    "loaderConfig": {
      "entryModuleId": "sp-loader-assembly",
      "scriptResources": {
        "sp-loader-assembly": {
          "type": "localizedPath",
          "paths": {
            "default": "sp-loader-assembly_default.js"
          },
          "defaultPath": "sp-loader-assembly_default.js"
        }
      }
    }
  },
  {
    "id": "467dc675-7cc5-4709-8aac-78e3b71bd2f6",
    "alias": "SPComponentBase",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-component-base",
      "scriptResources": {
        "sp-component-base": {
          "type": "localizedPath",
          "defaultPath": "sp-component-base_en-us.js"
        },
        "@microsoft/sp-dynamic-data": {
          "type": "component",
          "version": "1.11.0",
          "id": "e40f8203-b39d-425a-a957-714852e33b79"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-page-context": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@microsoft/sp-http": {
          "type": "component",
          "version": "1.11.0",
          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
        },
        "@microsoft/decorators": {
          "type": "component",
          "version": "1.11.0",
          "id": "f97266fb-ccb7-430e-9384-4124d05295d3"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "f9e737b7-f0df-4597-ba8c-3060f82380db",
    "alias": "SPPropertyPane",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-property-pane",
      "scriptResources": {
        "sp-property-pane": {
          "type": "localizedPath",
          "defaultPath": "sp-property-pane_en-us.js"
        },
        "@microsoft/sp-component-base": {
          "type": "component",
          "version": "1.11.0",
          "id": "467dc675-7cc5-4709-8aac-78e3b71bd2f6"
        },
        "@microsoft/office-ui-fabric-react-bundle": {
          "type": "component",
          "version": "1.11.0",
          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "react-dom": {
          "type": "component",
          "version": "16.8.5",
          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a"
        },
        "@ms/uifabric-styling-bundle": {
          "type": "component",
          "version": "0.1.0",
          "id": "17ce0976-e69a-4355-be84-89b69a74717d"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@microsoft/decorators": {
          "type": "component",
          "version": "1.11.0",
          "id": "f97266fb-ccb7-430e-9384-4124d05295d3"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "974a7777-0990-4136-8fa6-95d80114c2e0",
    "alias": "SPWebPartBase",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "preloadComponents": [
      "f9e737b7-f0df-4597-ba8c-3060f82380db"
    ],
    "loaderConfig": {
      "entryModuleId": "sp-webpart-base",
      "scriptResources": {
        "sp-webpart-base": {
          "type": "localizedPath",
          "defaultPath": "sp-webpart-base_en-us.js"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@ms/sp-load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-component-base": {
          "type": "component",
          "version": "1.11.0",
          "id": "467dc675-7cc5-4709-8aac-78e3b71bd2f6"
        },
        "@microsoft/sp-loader": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-page-context": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@microsoft/sp-http": {
          "type": "component",
          "version": "1.11.0",
          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
        },
        "@microsoft/decorators": {
          "type": "component",
          "version": "1.11.0",
          "id": "f97266fb-ccb7-430e-9384-4124d05295d3"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "0773bd53-a69e-4293-87e6-ba80ea4d614b",
    "alias": "SPExtensionBase",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-extension-base",
      "scriptResources": {
        "sp-extension-base": {
          "type": "localizedPath",
          "defaultPath": "sp-extension-base_en-us.js"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@microsoft/sp-component-base": {
          "type": "component",
          "version": "1.11.0",
          "id": "467dc675-7cc5-4709-8aac-78e3b71bd2f6"
        },
        "@microsoft/sp-loader": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@microsoft/decorators": {
          "type": "component",
          "version": "1.11.0",
          "id": "f97266fb-ccb7-430e-9384-4124d05295d3"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "4958ea79-6ff3-4480-8291-0932dd010869",
    "alias": "SPSearchExtensibility",
    "componentType": "Library",
    "version": "1.11.0",
    "loaderConfig": {
      "entryModuleId": "sp-search-extensibility",
      "scriptResources": {
        "sp-search-extensibility": {
          "type": "path",
          "path": "sp-search-extensibility.js"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-extension-base": {
          "type": "component",
          "version": "1.11.0",
          "id": "0773bd53-a69e-4293-87e6-ba80ea4d614b"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "8502035a-8180-4e8d-9513-07d22f75b15c",
    "alias": "SPSearchCommon",
    "componentType": "Library",
    "version": "0.1.0",
    "loaderConfig": {
      "entryModuleId": "sp-search-common",
      "scriptResources": {
        "sp-search-common": {
          "type": "path",
          "path": "sp-search-common.js"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "f8a8ad94-4cf3-4a19-a76b-1cec9da00219",
    "alias": "SPSuiteNav",
    "componentType": "Library",
    "manifestVersion": 2,
    "version": "0.1.0",
    "loaderConfig": {
      "entryModuleId": "sp-suite-nav",
      "scriptResources": {
        "sp-suite-nav": {
          "type": "path",
          "path": "sp-suite-nav.js"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@microsoft/sp-loader": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-page-context": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@microsoft/sp-http": {
          "type": "component",
          "version": "1.11.0",
          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
        },
        "@microsoft/decorators": {
          "type": "component",
          "version": "1.11.0",
          "id": "f97266fb-ccb7-430e-9384-4124d05295d3"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "4df9bb86-ab0a-4aab-ab5f-48bf167048fb",
    "alias": "SPApplicationBase",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "preloadComponents": [
      "c0c518b8-701b-4f6f-956d-5782772bb731",
      "4958ea79-6ff3-4480-8291-0932dd010869"
    ],
    "loaderConfig": {
      "entryModuleId": "sp-application-base",
      "scriptResources": {
        "sp-application-base": {
          "type": "localizedPath",
          "defaultPath": "sp-application-base_en-us.js"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@ms/sp-load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@ms/sp-suite-nav": {
          "type": "component",
          "version": "0.1.0",
          "id": "f8a8ad94-4cf3-4a19-a76b-1cec9da00219"
        },
        "@microsoft/sp-component-base": {
          "type": "component",
          "version": "1.11.0",
          "id": "467dc675-7cc5-4709-8aac-78e3b71bd2f6"
        },
        "@microsoft/sp-loader": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-page-context": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
        },
        "@microsoft/sp-extension-base": {
          "type": "component",
          "version": "1.11.0",
          "id": "0773bd53-a69e-4293-87e6-ba80ea4d614b"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "react-dom": {
          "type": "component",
          "version": "16.8.5",
          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a"
        },
        "@ms/uifabric-styling-bundle": {
          "type": "component",
          "version": "0.1.0",
          "id": "17ce0976-e69a-4355-be84-89b69a74717d"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@microsoft/sp-http": {
          "type": "component",
          "version": "1.11.0",
          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
        },
        "@microsoft/decorators": {
          "type": "component",
          "version": "1.11.0",
          "id": "f97266fb-ccb7-430e-9384-4124d05295d3"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "c83d5509-ccd5-4c67-919f-2440f237927a",
    "alias": "I18nUtilities",
    "componentType": "Library",
    "version": "0.1.24",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "i18n-utilities-bundle",
      "scriptResources": {
        "i18n-utilities-bundle": {
          "type": "localizedPath",
          "defaultPath": "i18n-utilities-bundle_en-us.js"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "05ed6956-59ad-4aa6-9e4e-b832c96ae87b",
    "alias": "SPA11y",
    "componentType": "Library",
    "version": "0.2.24",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-a11y",
      "scriptResources": {
        "sp-a11y": {
          "type": "path",
          "path": "sp-a11y.js"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "8494e7d7-6b99-47b2-a741-59873e42f16f",
    "alias": "SPComponentUtilities",
    "componentType": "Library",
    "version": "4.0.19",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-component-utilities",
      "scriptResources": {
        "sp-component-utilities": {
          "type": "localizedPath",
          "defaultPath": "sp-component-utilities_en-us.js"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@microsoft/office-ui-fabric-react-bundle": {
          "type": "component",
          "version": "1.11.0",
          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-page-context": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
        },
        "@ms/i18n-utilities": {
          "type": "component",
          "version": "0.1.24",
          "id": "c83d5509-ccd5-4c67-919f-2440f237927a"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "react-dom": {
          "type": "component",
          "version": "16.8.5",
          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a"
        },
        "@ms/uifabric-styling-bundle": {
          "type": "component",
          "version": "0.1.0",
          "id": "17ce0976-e69a-4355-be84-89b69a74717d"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@microsoft/sp-http": {
          "type": "component",
          "version": "1.11.0",
          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        },
        "@ms/sp-a11y": {
          "type": "component",
          "version": "0.2.24",
          "id": "05ed6956-59ad-4aa6-9e4e-b832c96ae87b"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "dd6f4302-b840-4db3-919d-e8bcba06daaa",
    "alias": "ContentHandler",
    "componentType": "Library",
    "version": "0.1.0",
    "loaderConfig": {
      "entryModuleId": "content-handler-library",
      "scriptResources": {
        "content-handler-library": {
          "type": "path",
          "path": "content-handler-library.js"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@ms/sp-component-utilities": {
          "type": "component",
          "version": "4.0.19",
          "id": "8494e7d7-6b99-47b2-a741-59873e42f16f"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "fa4155f6-2498-4a20-8406-5cb3b385b142",
    "alias": "SPDeferredComponent",
    "componentType": "Library",
    "version": "0.3.24",
    "loaderConfig": {
      "entryModuleId": "sp-deferred-component",
      "scriptResources": {
        "sp-deferred-component": {
          "type": "path",
          "path": "sp-deferred-component.js"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "bdb0f5dd-3bb4-4b93-b12a-71aa9e20bb09",
    "alias": "SPAnchor",
    "componentType": "Library",
    "version": "0.3.24",
    "loaderConfig": {
      "entryModuleId": "sp-anchor",
      "scriptResources": {
        "sp-anchor": {
          "type": "path",
          "path": "sp-anchor.js"
        },
        "@microsoft/office-ui-fabric-react-bundle": {
          "type": "component",
          "version": "1.11.0",
          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@ms/sp-deferred-component": {
          "type": "component",
          "version": "0.3.24",
          "id": "fa4155f6-2498-4a20-8406-5cb3b385b142"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        },
        "@ms/sp-a11y": {
          "type": "component",
          "version": "0.2.24",
          "id": "05ed6956-59ad-4aa6-9e4e-b832c96ae87b"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "5388ac31-7915-4ba6-a021-0f8808dd5784",
    "alias": "SPCanvasToolbox",
    "componentType": "Library",
    "version": "0.0.1",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-toolbox",
      "scriptResources": {
        "sp-toolbox": {
          "type": "localizedPath",
          "defaultPath": "sp-toolbox_en-us.js"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@microsoft/office-ui-fabric-react-bundle": {
          "type": "component",
          "version": "1.11.0",
          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "react-dom": {
          "type": "component",
          "version": "16.8.5",
          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "e795d530-8fb6-425c-b864-b86735dbae1d",
    "alias": "SPPagePicker",
    "componentType": "Library",
    "version": "1.3.24",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-pagepicker",
      "scriptResources": {
        "sp-pagepicker": {
          "type": "localizedPath",
          "defaultPath": "sp-pagepicker_en-us.js"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@microsoft/office-ui-fabric-react-bundle": {
          "type": "component",
          "version": "1.11.0",
          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-page-context": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
        },
        "@ms/i18n-utilities": {
          "type": "component",
          "version": "0.1.24",
          "id": "c83d5509-ccd5-4c67-919f-2440f237927a"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "react-dom": {
          "type": "component",
          "version": "16.8.5",
          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a"
        },
        "@ms/uifabric-styling-bundle": {
          "type": "component",
          "version": "0.1.0",
          "id": "17ce0976-e69a-4355-be84-89b69a74717d"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@microsoft/sp-http": {
          "type": "component",
          "version": "1.11.0",
          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "29bd516f-4ece-40b7-8028-597cbc65a223",
    "alias": "SpOfficeUIFabricCore",
    "componentType": "Library",
    "version": "1.11.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "office-ui-fabric-core",
      "scriptResources": {
        "office-ui-fabric-core": {
          "type": "path",
          "path": "office-ui-fabric-core.js"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "6e6e2204-49cb-4172-b923-32eaa7d8fe5b",
    "alias": "SpBaseDataSource",
    "componentType": "Library",
    "version": "0.1.0",
    "loaderConfig": {
      "entryModuleId": "sp-base-data-source",
      "scriptResources": {
        "sp-base-data-source": {
          "type": "localizedPath",
          "defaultPath": "sp-base-data-source_en-us.js"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-http": {
          "type": "component",
          "version": "1.11.0",
          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "3157040b-4feb-40c4-9fe5-ec3b41d679ff",
    "alias": "SpHomeHttpClient",
    "componentType": "Library",
    "version": "0.1.0",
    "loaderConfig": {
      "entryModuleId": "sp-home-http-client",
      "scriptResources": {
        "sp-home-http-client": {
          "type": "path",
          "path": "sp-home-http-client.js"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-page-context": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
        },
        "@ms/sp-component-utilities": {
          "type": "component",
          "version": "4.0.19",
          "id": "8494e7d7-6b99-47b2-a741-59873e42f16f"
        },
        "@microsoft/sp-http": {
          "type": "component",
          "version": "1.11.0",
          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "67c6ff5a-7666-4442-a8e9-55e57867bc44",
    "alias": "SpListDataSource",
    "componentType": "Library",
    "version": "0.1.0",
    "loaderConfig": {
      "entryModuleId": "sp-list-data-source",
      "scriptResources": {
        "sp-list-data-source": {
          "type": "path",
          "path": "sp-list-data-source.js"
        },
        "@ms/sp-base-data-source": {
          "type": "component",
          "version": "0.1.0",
          "id": "6e6e2204-49cb-4172-b923-32eaa7d8fe5b"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "4e1142b8-c6b0-444e-ae43-82ea0aa27f20",
    "alias": "SpListFieldDataSource",
    "componentType": "Library",
    "version": "0.1.0",
    "loaderConfig": {
      "entryModuleId": "sp-list-field-data-source",
      "scriptResources": {
        "sp-list-field-data-source": {
          "type": "path",
          "path": "sp-list-field-data-source.js"
        },
        "@ms/sp-base-data-source": {
          "type": "component",
          "version": "0.1.0",
          "id": "6e6e2204-49cb-4172-b923-32eaa7d8fe5b"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "227e36d9-dfc3-4996-ac15-863575f70f47",
    "alias": "SpListItemDataSource",
    "componentType": "Library",
    "version": "0.1.0",
    "loaderConfig": {
      "entryModuleId": "sp-list-item-data-source",
      "scriptResources": {
        "sp-list-item-data-source": {
          "type": "localizedPath",
          "defaultPath": "sp-list-item-data-source_en-us.js"
        },
        "@ms/sp-base-data-source": {
          "type": "component",
          "version": "0.1.0",
          "id": "6e6e2204-49cb-4172-b923-32eaa7d8fe5b"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "c09fde67-66c6-4eb5-b54e-4b9a4e3c42d0",
    "alias": "SpListViewDataSource",
    "componentType": "Library",
    "version": "0.1.0",
    "loaderConfig": {
      "entryModuleId": "sp-list-view-data-source",
      "scriptResources": {
        "sp-list-view-data-source": {
          "type": "path",
          "path": "sp-list-view-data-source.js"
        },
        "@ms/sp-base-data-source": {
          "type": "component",
          "version": "0.1.0",
          "id": "6e6e2204-49cb-4172-b923-32eaa7d8fe5b"
        },
        "@ms/sp-component-utilities": {
          "type": "component",
          "version": "4.0.19",
          "id": "8494e7d7-6b99-47b2-a741-59873e42f16f"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "1cea229f-b208-4202-8014-22503d92a019",
    "alias": "SPDataProviders",
    "componentType": "Library",
    "version": "0.1.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-dataproviders",
      "scriptResources": {
        "sp-dataproviders": {
          "type": "localizedPath",
          "defaultPath": "sp-dataproviders_en-us.js"
        },
        "@ms/sp-home-http-client": {
          "type": "component",
          "version": "0.1.0",
          "id": "3157040b-4feb-40c4-9fe5-ec3b41d679ff"
        },
        "@ms/sp-list-field-data-source": {
          "type": "component",
          "version": "0.1.0",
          "id": "4e1142b8-c6b0-444e-ae43-82ea0aa27f20"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@ms/sp-base-data-source": {
          "type": "component",
          "version": "0.1.0",
          "id": "6e6e2204-49cb-4172-b923-32eaa7d8fe5b"
        },
        "@microsoft/sp-loader": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
        },
        "@microsoft/office-ui-fabric-react-bundle": {
          "type": "component",
          "version": "1.11.0",
          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
        },
        "@ms/sp-list-data-source": {
          "type": "component",
          "version": "0.1.0",
          "id": "67c6ff5a-7666-4442-a8e9-55e57867bc44"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@ms/sp-list-item-data-source": {
          "type": "component",
          "version": "0.1.0",
          "id": "227e36d9-dfc3-4996-ac15-863575f70f47"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-page-context": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
        },
        "@ms/i18n-utilities": {
          "type": "component",
          "version": "0.1.24",
          "id": "c83d5509-ccd5-4c67-919f-2440f237927a"
        },
        "@ms/sp-list-view-data-source": {
          "type": "component",
          "version": "0.1.0",
          "id": "c09fde67-66c6-4eb5-b54e-4b9a4e3c42d0"
        },
        "@ms/sp-component-utilities": {
          "type": "component",
          "version": "4.0.19",
          "id": "8494e7d7-6b99-47b2-a741-59873e42f16f"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@microsoft/sp-http": {
          "type": "component",
          "version": "1.11.0",
          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "6d3c733c-8cb7-4871-bb22-b5b37c1d518d",
    "alias": "sp-safehtml",
    "componentType": "Library",
    "version": "0.2.43",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-safehtml",
      "scriptResources": {
        "sp-safehtml": {
          "type": "path",
          "path": "sp-safehtml.js"
        }
      }
    },
    "isInternal": true
  },
  {
    "manifestVersion": 2,
    "id": "8404d628-4817-4b3a-883e-1c5a4d07892e",
    "alias": "SPRte",
    "componentType": "Library",
    "version": "1.11.0",
    "loaderConfig": {
      "entryModuleId": "sp-rte",
      "scriptResources": {
        "sp-rte": {
          "type": "localizedPath",
          "defaultPath": "sp-rte_en-us.js"
        },
        "@microsoft/sp-loader": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
        },
        "@microsoft/office-ui-fabric-react-bundle": {
          "type": "component",
          "version": "1.11.0",
          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
        },
        "@ms/sp-safehtml": {
          "type": "component",
          "version": "0.2.43",
          "id": "6d3c733c-8cb7-4871-bb22-b5b37c1d518d"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@ms/sp-dataproviders": {
          "type": "component",
          "version": "0.1.0",
          "id": "1cea229f-b208-4202-8014-22503d92a019"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "react-dom": {
          "type": "component",
          "version": "16.8.5",
          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a"
        },
        "@ms/sp-component-utilities": {
          "type": "component",
          "version": "4.0.19",
          "id": "8494e7d7-6b99-47b2-a741-59873e42f16f"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        },
        "@ms/sp-a11y": {
          "type": "component",
          "version": "0.2.24",
          "id": "05ed6956-59ad-4aa6-9e4e-b832c96ae87b"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "f7fa85fe-da91-45cb-9813-5c31106cba7b",
    "alias": "SPDragZone",
    "componentType": "Library",
    "version": "0.1.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-dragzone",
      "scriptResources": {
        "sp-dragzone": {
          "type": "path",
          "path": "sp-dragzone.js"
        },
        "@microsoft/office-ui-fabric-react-bundle": {
          "type": "component",
          "version": "1.11.0",
          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "@ms/sp-component-utilities": {
          "type": "component",
          "version": "4.0.19",
          "id": "8494e7d7-6b99-47b2-a741-59873e42f16f"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        },
        "@ms/sp-a11y": {
          "type": "component",
          "version": "0.2.24",
          "id": "05ed6956-59ad-4aa6-9e4e-b832c96ae87b"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "85093aa7-8c12-4683-91aa-47cd5e2654db",
    "alias": "SPCanvas",
    "componentType": "Library",
    "version": "2.5.0",
    "manifestVersion": 2,
    "loaderConfig": {
      "entryModuleId": "sp-canvas",
      "scriptResources": {
        "sp-canvas": {
          "type": "localizedPath",
          "defaultPath": "sp-canvas_en-us.js"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@ms/sp-load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@microsoft/sp-component-base": {
          "type": "component",
          "version": "1.11.0",
          "id": "467dc675-7cc5-4709-8aac-78e3b71bd2f6"
        },
        "@microsoft/sp-loader": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
        },
        "@microsoft/office-ui-fabric-react-bundle": {
          "type": "component",
          "version": "1.11.0",
          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
        },
        "@ms/sp-safehtml": {
          "type": "component",
          "version": "0.2.43",
          "id": "6d3c733c-8cb7-4871-bb22-b5b37c1d518d"
        },
        "@microsoft/sp-lodash-subset": {
          "type": "component",
          "version": "1.11.0",
          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-page-context": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
        },
        "@microsoft/sp-webpart-base": {
          "type": "component",
          "version": "1.11.0",
          "id": "974a7777-0990-4136-8fa6-95d80114c2e0"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "@ms/sp-anchor": {
          "type": "component",
          "version": "0.3.24",
          "id": "bdb0f5dd-3bb4-4b93-b12a-71aa9e20bb09"
        },
        "react-dom": {
          "type": "component",
          "version": "16.8.5",
          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a"
        },
        "@ms/uifabric-styling-bundle": {
          "type": "component",
          "version": "0.1.0",
          "id": "17ce0976-e69a-4355-be84-89b69a74717d"
        },
        "@ms/sp-component-utilities": {
          "type": "component",
          "version": "4.0.19",
          "id": "8494e7d7-6b99-47b2-a741-59873e42f16f"
        },
        "@ms/sp-dragzone": {
          "type": "component",
          "version": "0.1.0",
          "id": "f7fa85fe-da91-45cb-9813-5c31106cba7b"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@ms/sp-deferred-component": {
          "type": "component",
          "version": "0.3.24",
          "id": "fa4155f6-2498-4a20-8406-5cb3b385b142"
        },
        "@microsoft/sp-diagnostics": {
          "type": "component",
          "version": "1.11.0",
          "id": "78359e4b-07c2-43c6-8d0b-d060b4d577e8"
        },
        "@microsoft/sp-http": {
          "type": "component",
          "version": "1.11.0",
          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
        },
        "@ms/odsp-utilities-bundle": {
          "type": "component",
          "version": "5.1.55",
          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
        },
        "@ms/sp-a11y": {
          "type": "component",
          "version": "0.2.24",
          "id": "05ed6956-59ad-4aa6-9e4e-b832c96ae87b"
        }
      }
    },
    "isInternal": true
  },
  {
    "id": "8be81a5c-af38-4bb2-af97-afa3b64dfbed",
    "alias": "WebPartWorkbench",
    "componentType": "Application",
    "version": "1.11.0",
    "manifestVersion": 2,
    "title": {
      "default": "WebpartWorkbench"
    },
    "description": {
      "default": "WebpartWorkbench"
    },
    "assemblyId": "5dae53c4-db1e-4d0b-b8b2-88c874dabf83",
    "preloadComponents": [],
    "preloadOptions": {
      "shouldPreloadWeb": true,
      "shouldPreloadUser": true,
      "shouldPreloadList": false,
      "shouldPreloadItem": true,
      "shouldPreloadQuickLaunch": true
    },
    "loaderConfig": {
      "entryModuleId": "sp-webpart-workbench",
      "scriptResources": {
        "sp-webpart-workbench": {
          "type": "localizedPath",
          "defaultPath": "sp-webpart-workbench_en-us.js"
        },
        "@ms/sp-canvas": {
          "type": "component",
          "version": "2.5.0",
          "id": "85093aa7-8c12-4683-91aa-47cd5e2654db"
        },
        "@ms/sp-telemetry": {
          "type": "component",
          "version": "0.8.24",
          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
        },
        "@microsoft/sp-application-base": {
          "type": "component",
          "version": "1.11.0",
          "id": "4df9bb86-ab0a-4aab-ab5f-48bf167048fb"
        },
        "@microsoft/sp-loader": {
          "type": "component",
          "version": "1.11.0",
          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
        },
        "@microsoft/office-ui-fabric-react-bundle": {
          "type": "component",
          "version": "1.11.0",
          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
        },
        "@microsoft/sp-core-library": {
          "type": "component",
          "version": "1.11.0",
          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
        },
        "@microsoft/sp-webpart-base": {
          "type": "component",
          "version": "1.11.0",
          "id": "974a7777-0990-4136-8fa6-95d80114c2e0"
        },
        "react": {
          "type": "component",
          "version": "16.8.5",
          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d"
        },
        "react-dom": {
          "type": "component",
          "version": "16.8.5",
          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a"
        },
        "@microsoft/load-themed-styles": {
          "type": "component",
          "version": "0.1.2",
          "id": "229b8d08-79f3-438b-8c21-4613fc877abd"
        },
        "@ms/sp-a11y": {
          "type": "component",
          "version": "0.2.24",
          "id": "05ed6956-59ad-4aa6-9e4e-b832c96ae87b"
        }
      }
    },
    "isInternal": true
  }
];
/**
 * Get the manifest array.
 */
function getManifests() {
    // Clone manifestsArray
    var manifests = JSON.parse(JSON.stringify(MANIFESTS_ARRAY));
    var manifestsFileUrl = __webpack_require__.p;
    if (manifestsFileUrl && manifestsFileUrl !== '') {
        manifests.forEach(function (manifest) {
            if (!manifest.loaderConfig.internalModuleBaseUrls || manifest.loaderConfig.internalModuleBaseUrls.length === 0) {
                manifest.loaderConfig.internalModuleBaseUrls = [manifestsFileUrl];
            }
        });
    }
    else {
        console.error("Unable to determine " + "manifests.js" + " file URL. Using default base URL. " +
            'This is expected if you are running "gulp serve."');
    }
    return manifests;
}
//# sourceMappingURL=manifestsFile.js.map

/***/ })
/******/ ]);
});