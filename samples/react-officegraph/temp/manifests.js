(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["debugManifests"] = factory();
	else
		root["debugManifests"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @copyright Microsoft Corporation. All rights reserved.
	 *
	 * @file manifestsFile.ts
	 */
	"use strict";
	var url = __webpack_require__(1);
	var manifestsArray = __webpack_require__(7);
	/**
	 * Get the manifest array with each of the base URLs rewritten to point to the local
	 *  page's protocol, hostname, and port. This function is useful for automated tests
	 *  that run locally and use an unpredictable port.
	 */
	function getLocalPageManifests() {
	    // Clone manifestsArray
	    var manifests = JSON.parse(JSON.stringify(manifestsArray));
	    manifests.forEach(function (manifest) {
	        var baseUrls = manifest.loaderConfig.internalModuleBaseUrls;
	        var baseUrl = url.parse(baseUrls[0]);
	        var pageUrl = url.parse(window.location.toString());
	        baseUrl.protocol = pageUrl.protocol;
	        baseUrl.host = pageUrl.host;
	        baseUrls[0] = url.format(baseUrl);
	    });
	    return manifests;
	}
	exports.getLocalPageManifests = getLocalPageManifests;
	/**
	 * Get the manifest array.
	 */
	function getManifests() {
	    return manifestsArray;
	}
	exports.getManifests = getManifests;

	//# sourceMappingURL=manifestsFile.js.map


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var punycode = __webpack_require__(2);

	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;

	exports.Url = Url;

	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,

	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(4);

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;

	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }

	  var rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;

	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost();

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }

	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {

	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }


	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }

	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};

	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}

	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';

	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }

	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }

	  var search = this.search || (query && ('?' + query)) || '';

	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;

	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);

	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });

	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }

	    result.href = result.format();
	    return result;
	  }

	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];

	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }

	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }

	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');

	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');

	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }

	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }

	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};

	function isString(arg) {
	  return typeof arg === "string";
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module), (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(5);
	exports.encode = exports.stringify = __webpack_require__(6);


/***/ },
/* 5 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = [
	  {
	    "id": "af59c2b3-2da7-41fd-8b72-3939817960af",
	    "alias": "SPClientBase",
	    "componentType": "Library",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "sp-client-base",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/sp-client-base/"
	      ],
	      "scriptResources": {
	        "sp-client-base": {
	          "type": "path",
	          "path": "dist/sp-client-base.js"
	        }
	      }
	    }
	  },
	  {
	    "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a",
	    "alias": "SPLodashSubset",
	    "componentType": "Library",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "sp-lodash-subset",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/sp-lodash-subset/"
	      ],
	      "scriptResources": {
	        "sp-lodash-subset": {
	          "type": "path",
	          "path": "dist/sp-lodash-subset.js"
	        }
	      }
	    }
	  },
	  {
	    "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b",
	    "alias": "SPCoreLibrary",
	    "componentType": "Library",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "sp-core-library",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/sp-core-library/"
	      ],
	      "scriptResources": {
	        "sp-core-library": {
	          "type": "path",
	          "path": "dist/sp-core-library.js"
	        },
	        "@microsoft/sp-lodash-subset": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
	        }
	      }
	    }
	  },
	  {
	    "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f",
	    "alias": "SPLoader",
	    "componentType": "Library",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "sp-loader",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/sp-loader/"
	      ],
	      "scriptResources": {
	        "sp-loader": {
	          "type": "localizedPath",
	          "paths": {},
	          "defaultPath": "dist/sp-loader_en-us.js"
	        }
	      }
	    }
	  },
	  {
	    "id": "f97266fb-ccb7-430e-9384-4124d05295d3",
	    "alias": "Decorators",
	    "componentType": "Library",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "decorators",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/decorators/"
	      ],
	      "scriptResources": {
	        "decorators": {
	          "type": "path",
	          "path": "dist/decorators.js"
	        }
	      }
	    }
	  },
	  {
	    "id": "02a01e42-69ab-403d-8a16-acd128661f8e",
	    "alias": "OfficeUIFabricReact",
	    "componentType": "Library",
	    "version": "1.0.1",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "office-ui-fabric-react.bundle",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/office-ui-fabric-react-bundle/"
	      ],
	      "scriptResources": {
	        "office-ui-fabric-react.bundle": {
	          "type": "path",
	          "path": "dist/office-ui-fabric-react.bundle.js"
	        },
	        "react": {
	          "type": "component",
	          "version": "15.4.2",
	          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d",
	          "failoverPath": "node_modules/react/dist/react.js"
	        },
	        "react-dom": {
	          "type": "component",
	          "version": "15.4.2",
	          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a",
	          "failoverPath": "node_modules/react-dom/dist/react-dom.js"
	        }
	      }
	    }
	  },
	  {
	    "id": "467dc675-7cc5-4709-8aac-78e3b71bd2f6",
	    "alias": "SPComponentBase",
	    "componentType": "Library",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "sp-component-base",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/sp-component-base/"
	      ],
	      "scriptResources": {
	        "sp-component-base": {
	          "type": "path",
	          "path": "dist/sp-component-base.js"
	        },
	        "@microsoft/decorators": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "f97266fb-ccb7-430e-9384-4124d05295d3"
	        },
	        "@microsoft/sp-core-library": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
	        }
	      }
	    }
	  },
	  {
	    "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6",
	    "alias": "SPHttp",
	    "componentType": "Library",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "sp-http",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/sp-http/"
	      ],
	      "scriptResources": {
	        "sp-http": {
	          "type": "path",
	          "path": "dist/sp-http.js"
	        },
	        "@microsoft/sp-core-library": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
	        },
	        "@microsoft/decorators": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "f97266fb-ccb7-430e-9384-4124d05295d3"
	        },
	        "@microsoft/sp-lodash-subset": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
	        },
	        "@ms/sp-telemetry": {
	          "type": "component",
	          "version": "0.2.1",
	          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
	        }
	      }
	    }
	  },
	  {
	    "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8",
	    "alias": "SPPageContext",
	    "componentType": "Library",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "sp-page-context",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/sp-page-context/"
	      ],
	      "scriptResources": {
	        "sp-page-context": {
	          "type": "path",
	          "path": "dist/sp-page-context.js"
	        },
	        "@ms/sp-telemetry": {
	          "type": "component",
	          "version": "0.2.1",
	          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
	        },
	        "@microsoft/sp-core-library": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
	        },
	        "@microsoft/sp-http": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
	        }
	      }
	    }
	  },
	  {
	    "id": "974a7777-0990-4136-8fa6-95d80114c2e0",
	    "alias": "SPWebPartBase",
	    "componentType": "Library",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "sp-webpart-base",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/sp-webpart-base/"
	      ],
	      "scriptResources": {
	        "sp-webpart-base": {
	          "type": "localizedPath",
	          "paths": {},
	          "defaultPath": "dist/sp-webpart-base_en-us.js"
	        },
	        "@microsoft/decorators": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "f97266fb-ccb7-430e-9384-4124d05295d3"
	        },
	        "@microsoft/sp-lodash-subset": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
	        },
	        "@ms/sp-telemetry": {
	          "type": "component",
	          "version": "0.2.1",
	          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
	        },
	        "@microsoft/sp-core-library": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
	        },
	        "@microsoft/sp-loader": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
	        },
	        "@microsoft/sp-http": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
	        },
	        "@microsoft/sp-page-context": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
	        },
	        "react-dom": {
	          "type": "component",
	          "version": "15.4.2",
	          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a",
	          "failoverPath": "node_modules/react-dom/dist/react-dom.js"
	        },
	        "react": {
	          "type": "component",
	          "version": "15.4.2",
	          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d",
	          "failoverPath": "node_modules/react/dist/react.js"
	        },
	        "office-ui-fabric-react": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
	        },
	        "@microsoft/sp-client-base": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "af59c2b3-2da7-41fd-8b72-3939817960af"
	        },
	        "@microsoft/sp-component-base": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "467dc675-7cc5-4709-8aac-78e3b71bd2f6"
	        }
	      }
	    }
	  },
	  {
	    "id": "4d5eb168-6729-49a8-aec7-0e397f486b6e",
	    "alias": "SPClientPreview",
	    "componentType": "Library",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "sp-client-preview",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/sp-client-preview/"
	      ],
	      "scriptResources": {
	        "sp-client-preview": {
	          "type": "localizedPath",
	          "paths": {},
	          "defaultPath": "dist/sp-client-preview_en-us.js"
	        },
	        "@ms/sp-telemetry": {
	          "type": "component",
	          "version": "0.2.1",
	          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
	        },
	        "@microsoft/sp-core-library": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
	        },
	        "@microsoft/sp-page-context": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
	        },
	        "react": {
	          "type": "component",
	          "version": "15.4.2",
	          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d",
	          "failoverPath": "node_modules/react/dist/react.js"
	        },
	        "react-dom": {
	          "type": "component",
	          "version": "15.4.2",
	          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a",
	          "failoverPath": "node_modules/react-dom/dist/react-dom.js"
	        },
	        "office-ui-fabric-react": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
	        },
	        "@microsoft/sp-webpart-base": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "974a7777-0990-4136-8fa6-95d80114c2e0"
	        },
	        "@microsoft/sp-lodash-subset": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "73e1dc6c-8441-42cc-ad47-4bd3659f8a3a"
	        },
	        "@microsoft/sp-client-base": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "af59c2b3-2da7-41fd-8b72-3939817960af"
	        },
	        "@microsoft/sp-http": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
	        },
	        "@microsoft/sp-loader": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
	        }
	      }
	    }
	  },
	  {
	    "id": "4df9bb86-ab0a-4aab-ab5f-48bf167048fb",
	    "alias": "SPApplicationBase",
	    "componentType": "Library",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "loaderConfig": {
	      "entryModuleId": "sp-application-base",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/sp-application-base/"
	      ],
	      "scriptResources": {
	        "sp-application-base": {
	          "type": "path",
	          "path": "dist/sp-application-base.js"
	        },
	        "@ms/sp-telemetry": {
	          "type": "component",
	          "version": "0.2.1",
	          "id": "8217e442-8ed3-41fd-957d-b112e841286a"
	        },
	        "@microsoft/sp-core-library": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
	        },
	        "@microsoft/sp-page-context": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "1c4541f7-5c31-41aa-9fa8-fbc9dc14c0a8"
	        },
	        "@microsoft/sp-http": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
	        },
	        "@microsoft/sp-loader": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
	        },
	        "@ms/odsp-utilities-bundle": {
	          "type": "component",
	          "version": "1.0.2",
	          "id": "cc2cc925-b5be-41bb-880a-f0f8030c6aff"
	        },
	        "@microsoft/sp-client-preview": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "4d5eb168-6729-49a8-aec7-0e397f486b6e"
	        }
	      }
	    }
	  },
	  {
	    "id": "8be81a5c-af38-4bb2-af97-afa3b64dfbed",
	    "alias": "WebPartWorkbench",
	    "componentType": "Application",
	    "version": "1.0.0",
	    "manifestVersion": 2,
	    "title": {
	      "default": "WebpartWorkbench"
	    },
	    "description": {
	      "default": "WebpartWorkbench"
	    },
	    "preloadComponents": [
	      "8217e442-8ed3-41fd-957d-b112e841286a",
	      "4df9bb86-ab0a-4aab-ab5f-48bf167048fb"
	    ],
	    "preloadOptions": {
	      "shouldPreloadWeb": true,
	      "shouldPreloadUser": true,
	      "shouldPreloadList": false,
	      "shouldPreloadItem": true,
	      "shouldPreloadQuickLaunch": true
	    },
	    "loaderConfig": {
	      "entryModuleId": "sp-webpart-workbench",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/node_modules/@microsoft/sp-webpart-workbench/"
	      ],
	      "scriptResources": {
	        "sp-webpart-workbench": {
	          "type": "localizedPath",
	          "paths": {},
	          "defaultPath": "dist/sp-webpart-workbench_en-us.js"
	        },
	        "react": {
	          "type": "component",
	          "version": "15.4.2",
	          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d",
	          "failoverPath": "node_modules/react/dist/react.js"
	        },
	        "react-dom": {
	          "type": "component",
	          "version": "15.4.2",
	          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a",
	          "failoverPath": "node_modules/react-dom/dist/react-dom.js"
	        },
	        "@microsoft/sp-application-base": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "4df9bb86-ab0a-4aab-ab5f-48bf167048fb"
	        },
	        "@microsoft/sp-loader": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "1c6c9123-7aac-41f3-a376-3caea41ed83f"
	        },
	        "office-ui-fabric-react": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "02a01e42-69ab-403d-8a16-acd128661f8e"
	        },
	        "@microsoft/sp-core-library": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
	        },
	        "@microsoft/sp-client-preview": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "4d5eb168-6729-49a8-aec7-0e397f486b6e"
	        }
	      }
	    }
	  },
	  {
	    "id": "65f773e5-a708-4b28-ac1f-0fb74e9f85da",
	    "alias": "TrendingInThisSiteWebPart",
	    "componentType": "WebPart",
	    "version": "0.0.1",
	    "manifestVersion": 2,
	    "preconfiguredEntries": [
	      {
	        "groupId": "65f773e5-a708-4b28-ac1f-0fb74e9f85da",
	        "group": {
	          "default": "Content rollup"
	        },
	        "title": {
	          "default": "Trending in this site"
	        },
	        "description": {
	          "default": "Shows documents trending in this site"
	        },
	        "officeFabricIconFontName": "Page",
	        "properties": {
	          "numberOfDocuments": 5
	        }
	      }
	    ],
	    "loaderConfig": {
	      "entryModuleId": "trending-in-this-site.bundle",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/"
	      ],
	      "scriptResources": {
	        "trending-in-this-site.bundle": {
	          "type": "path",
	          "path": "dist/trending-in-this-site.bundle.js"
	        },
	        "trendingInThisSiteStrings": {
	          "defaultPath": "lib/webparts/trendingInThisSite/loc/en-us.js",
	          "type": "localizedPath",
	          "paths": {}
	        },
	        "@microsoft/sp-core-library": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
	        },
	        "react": {
	          "type": "component",
	          "version": "15.5.4",
	          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d",
	          "failoverPath": "node_modules/react/dist/react.js"
	        },
	        "react-dom": {
	          "type": "component",
	          "version": "15.5.4",
	          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a",
	          "failoverPath": "node_modules/react-dom/dist/react-dom.js"
	        },
	        "@microsoft/sp-webpart-base": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "974a7777-0990-4136-8fa6-95d80114c2e0"
	        }
	      }
	    }
	  },
	  {
	    "id": "7dd7cf1a-0201-4ecb-87d1-df26ee53ba5f",
	    "alias": "TrendingInTheSitesIFollowWebPart",
	    "componentType": "WebPart",
	    "version": "0.0.1",
	    "manifestVersion": 2,
	    "preconfiguredEntries": [
	      {
	        "groupId": "7dd7cf1a-0201-4ecb-87d1-df26ee53ba5f",
	        "group": {
	          "default": "Content rollup"
	        },
	        "title": {
	          "default": "Trending in the sites I follow"
	        },
	        "description": {
	          "default": "Shows documents trending in the sites followed by the current user"
	        },
	        "officeFabricIconFontName": "Chart",
	        "properties": {
	          "title": "Trending in the sites I follow",
	          "numberOfDocuments": 5
	        }
	      }
	    ],
	    "loaderConfig": {
	      "entryModuleId": "trending-in-the-sites-i-follow.bundle",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/"
	      ],
	      "scriptResources": {
	        "trending-in-the-sites-i-follow.bundle": {
	          "type": "path",
	          "path": "dist/trending-in-the-sites-i-follow.bundle.js"
	        },
	        "trendingInTheSitesIFollowStrings": {
	          "defaultPath": "lib/webparts/trendingInTheSitesIFollow/loc/en-us.js",
	          "type": "localizedPath",
	          "paths": {}
	        },
	        "@microsoft/sp-core-library": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
	        },
	        "react": {
	          "type": "component",
	          "version": "15.5.4",
	          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d",
	          "failoverPath": "node_modules/react/dist/react.js"
	        },
	        "react-dom": {
	          "type": "component",
	          "version": "15.5.4",
	          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a",
	          "failoverPath": "node_modules/react-dom/dist/react-dom.js"
	        },
	        "@microsoft/sp-webpart-base": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "974a7777-0990-4136-8fa6-95d80114c2e0"
	        },
	        "@microsoft/sp-http": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
	        }
	      }
	    }
	  },
	  {
	    "id": "a5a289e6-4d54-4ffa-a1d6-3c5fa9dff088",
	    "alias": "MyRecentDocumentsWebPart",
	    "componentType": "WebPart",
	    "version": "0.0.1",
	    "manifestVersion": 2,
	    "preconfiguredEntries": [
	      {
	        "groupId": "a5a289e6-4d54-4ffa-a1d6-3c5fa9dff088",
	        "group": {
	          "default": "Content rollup"
	        },
	        "title": {
	          "default": "My recent documents"
	        },
	        "description": {
	          "default": "Shows documents recently viewed or modified by the current user"
	        },
	        "officeFabricIconFontName": "Recent",
	        "properties": {
	          "title": "My recent documents",
	          "numberOfDocuments": 5
	        }
	      }
	    ],
	    "loaderConfig": {
	      "entryModuleId": "my-recent-documents.bundle",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/"
	      ],
	      "scriptResources": {
	        "my-recent-documents.bundle": {
	          "type": "path",
	          "path": "dist/my-recent-documents.bundle.js"
	        },
	        "myRecentDocumentsStrings": {
	          "defaultPath": "lib/webparts/myRecentDocuments/loc/en-us.js",
	          "type": "localizedPath",
	          "paths": {}
	        },
	        "@microsoft/sp-core-library": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
	        },
	        "react": {
	          "type": "component",
	          "version": "15.5.4",
	          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d",
	          "failoverPath": "node_modules/react/dist/react.js"
	        },
	        "react-dom": {
	          "type": "component",
	          "version": "15.5.4",
	          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a",
	          "failoverPath": "node_modules/react-dom/dist/react-dom.js"
	        },
	        "@microsoft/sp-webpart-base": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "974a7777-0990-4136-8fa6-95d80114c2e0"
	        },
	        "@microsoft/sp-http": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
	        }
	      }
	    }
	  },
	  {
	    "id": "e23c0bf2-75eb-48f6-9f55-bafc043aab86",
	    "alias": "WorkingWithWebPart",
	    "componentType": "WebPart",
	    "version": "0.0.1",
	    "manifestVersion": 2,
	    "preconfiguredEntries": [
	      {
	        "groupId": "e23c0bf2-75eb-48f6-9f55-bafc043aab86",
	        "group": {
	          "default": "Productivity"
	        },
	        "title": {
	          "default": "Working with"
	        },
	        "description": {
	          "default": "Shows people with whom you communicate frequently"
	        },
	        "officeFabricIconFontName": "Group",
	        "properties": {
	          "title": "Recent contacts",
	          "numberOfPeople": 5
	        }
	      }
	    ],
	    "loaderConfig": {
	      "entryModuleId": "working-with.bundle",
	      "internalModuleBaseUrls": [
	        "https://localhost:4321/"
	      ],
	      "scriptResources": {
	        "working-with.bundle": {
	          "type": "path",
	          "path": "dist/working-with.bundle.js"
	        },
	        "workingWithStrings": {
	          "defaultPath": "lib/webparts/workingWith/loc/en-us.js",
	          "type": "localizedPath",
	          "paths": {}
	        },
	        "@microsoft/sp-core-library": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "7263c7d0-1d6a-45ec-8d85-d4d1d234171b"
	        },
	        "react": {
	          "type": "component",
	          "version": "15.5.4",
	          "id": "0d910c1c-13b9-4e1c-9aa4-b008c5e42d7d",
	          "failoverPath": "node_modules/react/dist/react.js"
	        },
	        "react-dom": {
	          "type": "component",
	          "version": "15.5.4",
	          "id": "aa0a46ec-1505-43cd-a44a-93f3a5aa460a",
	          "failoverPath": "node_modules/react-dom/dist/react-dom.js"
	        },
	        "@microsoft/sp-webpart-base": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "974a7777-0990-4136-8fa6-95d80114c2e0"
	        },
	        "@microsoft/sp-http": {
	          "type": "component",
	          "version": "1.0.0",
	          "id": "c07208f0-ea3b-4c1a-9965-ac1b825211a6"
	        }
	      }
	    }
	  }
	];

/***/ }
/******/ ])
});
;