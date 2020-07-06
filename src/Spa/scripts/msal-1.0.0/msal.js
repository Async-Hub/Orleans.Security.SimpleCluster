/*! msal v1.0.0 2019-05-04 */
'use strict';
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Msal", [], factory);
	else if(typeof exports === 'object')
		exports["Msal"] = factory();
	else
		root["Msal"] = factory();
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var Constants_1 = __webpack_require__(2);
var ClientAuthError_1 = __webpack_require__(4);
var Constants_2 = __webpack_require__(2);
/**
 * @hidden
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    //#region General Util
    /**
     * Utils function to compare two Account objects - used to check if the same user account is logged in
     *
     * @param a1: Account object
     * @param a2: Account object
     */
    Utils.compareAccounts = function (a1, a2) {
        if (!a1 || !a2) {
            return false;
        }
        if (a1.homeAccountIdentifier && a2.homeAccountIdentifier) {
            if (a1.homeAccountIdentifier === a2.homeAccountIdentifier) {
                return true;
            }
        }
        return false;
    };
    /**
     * Decimal to Hex
     *
     * @param num
     */
    Utils.decimalToHex = function (num) {
        var hex = num.toString(16);
        while (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };
    /**
     * MSAL JS Library Version
     */
    Utils.getLibraryVersion = function () {
        return Constants_2.Library.version;
    };
    /**
     * Creates a new random GUID - used to populate state?
     * @returns string (GUID)
     */
    Utils.createNewGuid = function () {
        // RFC4122: The version 4 UUID is meant for generating UUIDs from truly-random or
        // pseudo-random numbers.
        // The algorithm is as follows:
        //     Set the two most significant bits (bits 6 and 7) of the
        //        clock_seq_hi_and_reserved to zero and one, respectively.
        //     Set the four most significant bits (bits 12 through 15) of the
        //        time_hi_and_version field to the 4-bit version number from
        //        Section 4.1.3. Version4
        //     Set all the other bits to randomly (or pseudo-randomly) chosen
        //     values.
        // UUID                   = time-low "-" time-mid "-"time-high-and-version "-"clock-seq-reserved and low(2hexOctet)"-" node
        // time-low               = 4hexOctet
        // time-mid               = 2hexOctet
        // time-high-and-version  = 2hexOctet
        // clock-seq-and-reserved = hexOctet:
        // clock-seq-low          = hexOctet
        // node                   = 6hexOctet
        // Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        // y could be 1000, 1001, 1010, 1011 since most significant two bits needs to be 10
        // y values are 8, 9, A, B
        var cryptoObj = window.crypto; // for IE 11
        if (cryptoObj && cryptoObj.getRandomValues) {
            var buffer = new Uint8Array(16);
            cryptoObj.getRandomValues(buffer);
            //buffer[6] and buffer[7] represents the time_hi_and_version field. We will set the four most significant bits (4 through 7) of buffer[6] to represent decimal number 4 (UUID version number).
            buffer[6] |= 0x40; //buffer[6] | 01000000 will set the 6 bit to 1.
            buffer[6] &= 0x4f; //buffer[6] & 01001111 will set the 4, 5, and 7 bit to 0 such that bits 4-7 == 0100 = "4".
            //buffer[8] represents the clock_seq_hi_and_reserved field. We will set the two most significant bits (6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively.
            buffer[8] |= 0x80; //buffer[8] | 10000000 will set the 7 bit to 1.
            buffer[8] &= 0xbf; //buffer[8] & 10111111 will set the 6 bit to 0.
            return Utils.decimalToHex(buffer[0]) + Utils.decimalToHex(buffer[1])
                + Utils.decimalToHex(buffer[2]) + Utils.decimalToHex(buffer[3])
                + "-" + Utils.decimalToHex(buffer[4]) + Utils.decimalToHex(buffer[5])
                + "-" + Utils.decimalToHex(buffer[6]) + Utils.decimalToHex(buffer[7])
                + "-" + Utils.decimalToHex(buffer[8]) + Utils.decimalToHex(buffer[9])
                + "-" + Utils.decimalToHex(buffer[10]) + Utils.decimalToHex(buffer[11])
                + Utils.decimalToHex(buffer[12]) + Utils.decimalToHex(buffer[13])
                + Utils.decimalToHex(buffer[14]) + Utils.decimalToHex(buffer[15]);
        }
        else {
            var guidHolder = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
            var hex = "0123456789abcdef";
            var r = 0;
            var guidResponse = "";
            for (var i = 0; i < 36; i++) {
                if (guidHolder[i] !== "-" && guidHolder[i] !== "4") {
                    // each x and y needs to be random
                    r = Math.random() * 16 | 0;
                }
                if (guidHolder[i] === "x") {
                    guidResponse += hex[r];
                }
                else if (guidHolder[i] === "y") {
                    // clock-seq-and-reserved first hex is filtered and remaining hex values are random
                    r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
                    r |= 0x8; // set pos 3 to 1 as 1???
                    guidResponse += hex[r];
                }
                else {
                    guidResponse += guidHolder[i];
                }
            }
            return guidResponse;
        }
    };
    //#endregion
    //#region Time
    /**
     * Returns time in seconds for expiration based on string value passed in.
     *
     * @param expires
     */
    Utils.expiresIn = function (expires) {
        // if AAD did not send "expires_in" property, use default expiration of 3599 seconds, for some reason AAD sends 3599 as "expires_in" value instead of 3600
        if (!expires) {
            expires = "3599";
        }
        return this.now() + parseInt(expires, 10);
    };
    /**
     * return the current time in Unix time. Date.getTime() returns in milliseconds.
     */
    Utils.now = function () {
        return Math.round(new Date().getTime() / 1000.0);
    };
    //#endregion
    //#region String Ops
    /**
     * Check if a string is empty
     *
     * @param str
     */
    Utils.isEmpty = function (str) {
        return (typeof str === "undefined" || !str || 0 === str.length);
    };
    //#endregion
    //#region Token Processing (Extract to TokenProcessing.ts)
    /**
     * decode a JWT
     *
     * @param jwtToken
     */
    Utils.decodeJwt = function (jwtToken) {
        if (this.isEmpty(jwtToken)) {
            return null;
        }
        var idTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
        var matches = idTokenPartsRegex.exec(jwtToken);
        if (!matches || matches.length < 4) {
            //this._requestContext.logger.warn("The returned id_token is not parseable.");
            return null;
        }
        var crackedToken = {
            header: matches[1],
            JWSPayload: matches[2],
            JWSSig: matches[3]
        };
        return crackedToken;
    };
    /**
     * Extract IdToken by decoding the RAWIdToken
     *
     * @param encodedIdToken
     */
    Utils.extractIdToken = function (encodedIdToken) {
        // id token will be decoded to get the username
        var decodedToken = this.decodeJwt(encodedIdToken);
        if (!decodedToken) {
            return null;
        }
        try {
            var base64IdToken = decodedToken.JWSPayload;
            var base64Decoded = this.base64DecodeStringUrlSafe(base64IdToken);
            if (!base64Decoded) {
                //this._requestContext.logger.info("The returned id_token could not be base64 url safe decoded.");
                return null;
            }
            // ECMA script has JSON built-in support
            return JSON.parse(base64Decoded);
        }
        catch (err) {
            //this._requestContext.logger.error("The returned id_token could not be decoded" + err);
        }
        return null;
    };
    //#endregion
    //#region Encode and Decode
    /**
     * encoding string to base64 - platform specific check
     *
     * @param input
     */
    Utils.base64EncodeStringUrlSafe = function (input) {
        // html5 should support atob function for decoding
        if (window.btoa) {
            return window.btoa(input);
        }
        else {
            return this.encode(input);
        }
    };
    /**
     * decoding base64 token - platform specific check
     *
     * @param base64IdToken
     */
    Utils.base64DecodeStringUrlSafe = function (base64IdToken) {
        // html5 should support atob function for decoding
        base64IdToken = base64IdToken.replace(/-/g, "+").replace(/_/g, "/");
        if (window.atob) {
            return decodeURIComponent(encodeURIComponent(window.atob(base64IdToken))); // jshint ignore:line
        }
        else {
            return decodeURIComponent(encodeURIComponent(this.decode(base64IdToken)));
        }
    };
    /**
     * base64 encode a string
     *
     * @param input
     */
    // TODO: Rename to specify type of encoding
    Utils.encode = function (input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this.utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    };
    /**
     * utf8 encode a string
     *
     * @param input
     */
    Utils.utf8Encode = function (input) {
        input = input.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < input.length; n++) {
            var c = input.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    /**
     * decode a base64 token string
     *
     * @param base64IdToken
     */
    // TODO: Rename to specify type of encoding
    Utils.decode = function (base64IdToken) {
        var codes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        base64IdToken = String(base64IdToken).replace(/=+$/, "");
        var length = base64IdToken.length;
        if (length % 4 === 1) {
            throw ClientAuthError_1.ClientAuthError.createTokenEncodingError(base64IdToken);
        }
        var h1, h2, h3, h4, bits, c1, c2, c3, decoded = "";
        for (var i = 0; i < length; i += 4) {
            //Every 4 base64 encoded character will be converted to 3 byte string, which is 24 bits
            // then 6 bits per base64 encoded character
            h1 = codes.indexOf(base64IdToken.charAt(i));
            h2 = codes.indexOf(base64IdToken.charAt(i + 1));
            h3 = codes.indexOf(base64IdToken.charAt(i + 2));
            h4 = codes.indexOf(base64IdToken.charAt(i + 3));
            // For padding, if last two are "="
            if (i + 2 === length - 1) {
                bits = h1 << 18 | h2 << 12 | h3 << 6;
                c1 = bits >> 16 & 255;
                c2 = bits >> 8 & 255;
                decoded += String.fromCharCode(c1, c2);
                break;
            }
            // if last one is "="
            else if (i + 1 === length - 1) {
                bits = h1 << 18 | h2 << 12;
                c1 = bits >> 16 & 255;
                decoded += String.fromCharCode(c1);
                break;
            }
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            // then convert to 3 byte chars
            c1 = bits >> 16 & 255;
            c2 = bits >> 8 & 255;
            c3 = bits & 255;
            decoded += String.fromCharCode(c1, c2, c3);
        }
        return decoded;
    };
    /**
     * deserialize a string
     *
     * @param query
     */
    Utils.deserialize = function (query) {
        var match; // Regex for replacing addition symbol with a space
        var pl = /\+/g;
        var search = /([^&=]+)=([^&]*)/g;
        var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
        var obj = {};
        match = search.exec(query);
        while (match) {
            obj[decode(match[1])] = decode(match[2]);
            match = search.exec(query);
        }
        return obj;
    };
    //#endregion
    //#region Scopes (extract to Scopes.ts)
    /**
     * Check if there are dup scopes in a given request
     *
     * @param cachedScopes
     * @param scopes
     */
    // TODO: Rename this, intersecting scopes isn't a great name for duplicate checker
    Utils.isIntersectingScopes = function (cachedScopes, scopes) {
        cachedScopes = this.convertToLowerCase(cachedScopes);
        for (var i = 0; i < scopes.length; i++) {
            if (cachedScopes.indexOf(scopes[i].toLowerCase()) > -1) {
                return true;
            }
        }
        return false;
    };
    /**
     * Check if a given scope is present in the request
     *
     * @param cachedScopes
     * @param scopes
     */
    Utils.containsScope = function (cachedScopes, scopes) {
        cachedScopes = this.convertToLowerCase(cachedScopes);
        return scopes.every(function (value) { return cachedScopes.indexOf(value.toString().toLowerCase()) >= 0; });
    };
    /**
     * toLower
     *
     * @param scopes
     */
    // TODO: Rename this, too generic name for a function that only deals with scopes
    Utils.convertToLowerCase = function (scopes) {
        return scopes.map(function (scope) { return scope.toLowerCase(); });
    };
    /**
     * remove one element from a scope array
     *
     * @param scopes
     * @param scope
     */
    // TODO: Rename this, too generic name for a function that only deals with scopes
    Utils.removeElement = function (scopes, scope) {
        return scopes.filter(function (value) { return value !== scope; });
    };
    //#endregion
    //#region URL Processing (Extract to UrlProcessing.ts?)
    Utils.getDefaultRedirectUri = function () {
        return window.location.href.split("?")[0].split("#")[0];
    };
    /**
     * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
     * @param href The url
     * @param tenantId The tenant id to replace
     */
    Utils.replaceTenantPath = function (url, tenantId) {
        url = url.toLowerCase();
        var urlObject = this.GetUrlComponents(url);
        var pathArray = urlObject.PathSegments;
        if (tenantId && (pathArray.length !== 0 && (pathArray[0] === Constants_1.Constants.common || pathArray[0] === Constants_1.SSOTypes.ORGANIZATIONS))) {
            pathArray[0] = tenantId;
        }
        return this.constructAuthorityUriFromObject(urlObject, pathArray);
    };
    Utils.constructAuthorityUriFromObject = function (urlObject, pathArray) {
        return this.CanonicalizeUri(urlObject.Protocol + "//" + urlObject.HostNameAndPort + "/" + pathArray.join("/"));
    };
    /**
     * Parses out the components from a url string.
     * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
     */
    Utils.GetUrlComponents = function (url) {
        if (!url) {
            throw "Url required";
        }
        // https://gist.github.com/curtisz/11139b2cfcaef4a261e0
        var regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
        var match = url.match(regEx);
        if (!match || match.length < 6) {
            throw "Valid url required";
        }
        var urlComponents = {
            Protocol: match[1],
            HostNameAndPort: match[4],
            AbsolutePath: match[5]
        };
        var pathSegments = urlComponents.AbsolutePath.split("/");
        pathSegments = pathSegments.filter(function (val) { return val && val.length > 0; }); // remove empty elements
        urlComponents.PathSegments = pathSegments;
        return urlComponents;
    };
    /**
     * Given a url or path, append a trailing slash if one doesnt exist
     *
     * @param url
     */
    Utils.CanonicalizeUri = function (url) {
        if (url) {
            url = url.toLowerCase();
        }
        if (url && !Utils.endsWith(url, "/")) {
            url += "/";
        }
        return url;
    };
    /**
     * Checks to see if the url ends with the suffix
     * Required because we are compiling for es5 instead of es6
     * @param url
     * @param str
     */
    // TODO: Rename this, not clear what it is supposed to do
    Utils.endsWith = function (url, suffix) {
        if (!url || !suffix) {
            return false;
        }
        return url.indexOf(suffix, url.length - suffix.length) !== -1;
    };
    /**
     * Utils function to remove the login_hint and domain_hint from the i/p extraQueryParameters
     * @param url
     * @param name
     */
    Utils.urlRemoveQueryStringParameter = function (url, name) {
        if (this.isEmpty(url)) {
            return url;
        }
        var regex = new RegExp("(\\&" + name + "=)[^\&]+");
        url = url.replace(regex, "");
        // name=value&
        regex = new RegExp("(" + name + "=)[^\&]+&");
        url = url.replace(regex, "");
        // name=value
        regex = new RegExp("(" + name + "=)[^\&]+");
        url = url.replace(regex, "");
        return url;
    };
    //#endregion
    //#region ExtraQueryParameters Processing (Extract?)
    /**
     * Constructs extraQueryParameters to be sent to the server for the AuthenticationParameters set by the developer
     * in any login() or acquireToken() calls
     * @param idTokenObject
     * @param extraQueryParameters
     * @param sid
     * @param loginHint
     */
    //TODO: check how this behaves when domain_hint only is sent in extraparameters and idToken has no upn.
    Utils.constructUnifiedCacheQueryParameter = function (request, idTokenObject) {
        // preference order: account > sid > login_hint
        var ssoType;
        var ssoData;
        var serverReqParam = {};
        // if account info is passed, account.sid > account.login_hint
        if (request) {
            if (request.account) {
                var account = request.account;
                if (account.sid) {
                    ssoType = Constants_1.SSOTypes.SID;
                    ssoData = account.sid;
                }
                else if (account.userName) {
                    ssoType = Constants_1.SSOTypes.LOGIN_HINT;
                    ssoData = account.userName;
                }
            }
            // sid from request
            else if (request.sid) {
                ssoType = Constants_1.SSOTypes.SID;
                ssoData = request.sid;
            }
            // loginHint from request
            else if (request.loginHint) {
                ssoType = Constants_1.SSOTypes.LOGIN_HINT;
                ssoData = request.loginHint;
            }
        }
        // adalIdToken retrieved from cache
        else if (idTokenObject) {
            if (idTokenObject.hasOwnProperty(Constants_1.Constants.upn)) {
                ssoType = Constants_1.SSOTypes.ID_TOKEN;
                ssoData = idTokenObject.upn;
            }
            else {
                ssoType = Constants_1.SSOTypes.ORGANIZATIONS;
                ssoData = null;
            }
        }
        serverReqParam = this.addSSOParameter(ssoType, ssoData);
        // add the HomeAccountIdentifier info/ domain_hint
        if (request && request.account && request.account.homeAccountIdentifier) {
            serverReqParam = this.addSSOParameter(Constants_1.SSOTypes.HOMEACCOUNT_ID, request.account.homeAccountIdentifier, serverReqParam);
        }
        return serverReqParam;
    };
    /**
     * Add SID to extraQueryParameters
     * @param sid
     */
    Utils.addSSOParameter = function (ssoType, ssoData, ssoParam) {
        if (!ssoParam) {
            ssoParam = {};
        }
        if (!ssoData) {
            return ssoParam;
        }
        switch (ssoType) {
            case Constants_1.SSOTypes.SID: {
                ssoParam[Constants_1.SSOTypes.SID] = ssoData;
                break;
            }
            case Constants_1.SSOTypes.ID_TOKEN: {
                ssoParam[Constants_1.SSOTypes.LOGIN_HINT] = ssoData;
                ssoParam[Constants_1.SSOTypes.DOMAIN_HINT] = Constants_1.SSOTypes.ORGANIZATIONS;
                break;
            }
            case Constants_1.SSOTypes.LOGIN_HINT: {
                ssoParam[Constants_1.SSOTypes.LOGIN_HINT] = ssoData;
                break;
            }
            case Constants_1.SSOTypes.ORGANIZATIONS: {
                ssoParam[Constants_1.SSOTypes.DOMAIN_HINT] = Constants_1.SSOTypes.ORGANIZATIONS;
                break;
            }
            case Constants_1.SSOTypes.CONSUMERS: {
                ssoParam[Constants_1.SSOTypes.DOMAIN_HINT] = Constants_1.SSOTypes.CONSUMERS;
                break;
            }
            case Constants_1.SSOTypes.HOMEACCOUNT_ID: {
                var homeAccountId = ssoData.split(".");
                var uid = Utils.base64DecodeStringUrlSafe(homeAccountId[0]);
                var utid = Utils.base64DecodeStringUrlSafe(homeAccountId[1]);
                // TODO: domain_req and login_req are not needed according to eSTS team
                ssoParam[Constants_1.SSOTypes.LOGIN_REQ] = uid;
                ssoParam[Constants_1.SSOTypes.DOMAIN_REQ] = utid;
                if (utid === Constants_1.Constants.consumersUtid) {
                    ssoParam[Constants_1.SSOTypes.DOMAIN_HINT] = Constants_1.SSOTypes.CONSUMERS;
                }
                else {
                    ssoParam[Constants_1.SSOTypes.DOMAIN_HINT] = Constants_1.SSOTypes.ORGANIZATIONS;
                }
                break;
            }
            case Constants_1.SSOTypes.LOGIN_REQ: {
                ssoParam[Constants_1.SSOTypes.LOGIN_REQ] = ssoData;
                break;
            }
            case Constants_1.SSOTypes.DOMAIN_REQ: {
                ssoParam[Constants_1.SSOTypes.DOMAIN_REQ] = ssoData;
                break;
            }
        }
        return ssoParam;
    };
    /**
     * Utility to generate a QueryParameterString from a Key-Value mapping of extraQueryParameters passed
     * @param extraQueryParameters
     */
    Utils.generateQueryParametersString = function (queryParameters) {
        var paramsString = null;
        if (queryParameters) {
            Object.keys(queryParameters).forEach(function (key) {
                if (paramsString == null) {
                    paramsString = key + "=" + encodeURIComponent(queryParameters[key]);
                }
                else {
                    paramsString += "&" + key + "=" + encodeURIComponent(queryParameters[key]);
                }
            });
        }
        return paramsString;
    };
    /**
     * Check to see if there are SSO params set in the Request
     * @param request
     */
    Utils.isSSOParam = function (request) {
        return request && (request.account || request.sid || request.loginHint);
    };
    //#endregion
    //#region Response Helpers
    Utils.setResponseIdToken = function (originalResponse, idToken) {
        var response = tslib_1.__assign({}, originalResponse);
        response.idToken = idToken;
        if (response.idToken.objectId) {
            response.uniqueId = response.idToken.objectId;
        }
        else {
            response.uniqueId = response.idToken.subject;
        }
        response.tenantId = response.idToken.tenantId;
        return response;
    };
    return Utils;
}());
exports.Utils = Utils;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */
Object.defineProperty(exports, "__esModule", { value: true });
var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
exports.__extends = __extends;
exports.__assign = function () {
    exports.__assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return exports.__assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
            if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
    return t;
}
exports.__rest = __rest;
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
exports.__decorate = __decorate;
function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
}
exports.__param = __param;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(metadataKey, metadataValue);
}
exports.__metadata = __metadata;
function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
exports.__awaiter = __awaiter;
function __generator(thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
}
exports.__generator = __generator;
function __exportStar(m, exports) {
    for (var p in m)
        if (!exports.hasOwnProperty(p))
            exports[p] = m[p];
}
exports.__exportStar = __exportStar;
function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m)
        return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length)
                o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}
exports.__values = __values;
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
}
exports.__read = __read;
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}
exports.__spread = __spread;
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
exports.__await = __await;
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n])
        i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try {
        step(g[n](v));
    }
    catch (e) {
        settle(q[0][3], e);
    } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length)
        resume(q[0][0], q[0][1]); }
}
exports.__asyncGenerator = __asyncGenerator;
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}
exports.__asyncDelegator = __asyncDelegator;
function __asyncValues(o) {
    if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
}
exports.__asyncValues = __asyncValues;
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
}
exports.__makeTemplateObject = __makeTemplateObject;
;
function __importStar(mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
                result[k] = mod[k];
    result.default = mod;
    return result;
}
exports.__importStar = __importStar;
function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}
exports.__importDefault = __importDefault;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/**
 * @hidden
 */
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Object.defineProperty(Constants, "errorDescription", {
        get: function () { return "error_description"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "error", {
        get: function () { return "error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "scope", {
        get: function () { return "scope"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "clientInfo", {
        get: function () { return "client_info"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "clientId", {
        get: function () { return "clientId"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "idToken", {
        get: function () { return "id_token"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "adalIdToken", {
        get: function () { return "adal.idtoken"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "accessToken", {
        get: function () { return "access_token"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "expiresIn", {
        get: function () { return "expires_in"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "sessionState", {
        get: function () { return "session_state"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "claims", {
        get: function () { return "claims"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "msalClientInfo", {
        get: function () { return "msal.client.info"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "msalError", {
        get: function () { return "msal.error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "msalErrorDescription", {
        get: function () { return "msal.error.description"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "msalSessionState", {
        get: function () { return "msal.session.state"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "tokenKeys", {
        get: function () { return "msal.token.keys"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "accessTokenKey", {
        get: function () { return "msal.access.token.key"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "expirationKey", {
        get: function () { return "msal.expiration.key"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "stateLogin", {
        get: function () { return "msal.state.login"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "stateAcquireToken", {
        get: function () { return "msal.state.acquireToken"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "stateRenew", {
        get: function () { return "msal.state.renew"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "nonceIdToken", {
        get: function () { return "msal.nonce.idtoken"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "userName", {
        get: function () { return "msal.username"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "idTokenKey", {
        get: function () { return "msal.idtoken"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "loginRequest", {
        get: function () { return "msal.login.request"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "loginError", {
        get: function () { return "msal.login.error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "renewStatus", {
        get: function () { return "msal.token.renew.status"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "urlHash", {
        get: function () { return "msal.urlHash"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "angularLoginRequest", {
        get: function () { return "msal.angular.login.request"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "msal", {
        get: function () { return "msal"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "no_account", {
        get: function () { return "NO_ACCOUNT"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "consumersUtid", {
        get: function () { return "9188040d-6c67-4c5b-b112-36a304b66dad"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "upn", {
        get: function () { return "upn"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "prompt_select_account", {
        get: function () { return "&prompt=select_account"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "prompt_none", {
        get: function () { return "&prompt=none"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "prompt", {
        get: function () { return "prompt"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "response_mode_fragment", {
        get: function () { return "&response_mode=fragment"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "resourceDelimiter", {
        get: function () { return "|"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "tokenRenewStatusCancelled", {
        get: function () { return "Canceled"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "tokenRenewStatusCompleted", {
        get: function () { return "Completed"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "tokenRenewStatusInProgress", {
        get: function () { return "In Progress"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "popUpWidth", {
        get: function () { return this._popUpWidth; },
        set: function (width) {
            this._popUpWidth = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "popUpHeight", {
        get: function () { return this._popUpHeight; },
        set: function (height) {
            this._popUpHeight = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "login", {
        get: function () { return "LOGIN"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "renewToken", {
        get: function () { return "RENEW_TOKEN"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "unknown", {
        get: function () { return "UNKNOWN"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "homeAccountIdentifier", {
        get: function () { return "homeAccountIdentifier"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "common", {
        get: function () { return "common"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "openidScope", {
        get: function () { return "openid"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "profileScope", {
        get: function () { return "profile"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "cacheLocationLocal", {
        get: function () { return "localStorage"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "cacheLocationSession", {
        get: function () { return "sessionStorage"; },
        enumerable: true,
        configurable: true
    });
    Constants._popUpWidth = 483;
    Constants._popUpHeight = 600;
    return Constants;
}());
exports.Constants = Constants;
/**
 * @hidden
 */
exports.CacheKeys = {
    AUTHORITY: "msal.authority",
    ACQUIRE_TOKEN_ACCOUNT: "msal.acquireTokenAccount"
};
/**
 * @hidden
 */
exports.SSOTypes = {
    ACCOUNT: "account",
    SID: "sid",
    LOGIN_HINT: "login_hint",
    ID_TOKEN: "id_token",
    DOMAIN_HINT: "domain_hint",
    ORGANIZATIONS: "organizations",
    CONSUMERS: "consumers",
    ACCOUNT_ID: "accountIdentifier",
    HOMEACCOUNT_ID: "homeAccountIdentifier",
    LOGIN_REQ: "login_req",
    DOMAIN_REQ: "domain_req"
};
/**
 * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
 * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
 * internal partners too, hence the choice of generic "string" type instead of the "enum"
 * @hidden
 */
exports.PromptState = {
    LOGIN: "login",
    SELECT_ACCOUNT: "select_account",
    CONSENT: "consent",
    NONE: "none",
};
exports.Library = {
    version: "1.0.0"
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var Constants_1 = __webpack_require__(2);
var ClientAuthError_1 = __webpack_require__(4);
exports.ClientConfigurationErrorMessage = {
    configurationNotSet: {
        code: "no_config_set",
        desc: "Configuration has not been set. Please call the UserAgentApplication constructor with a valid Configuration object."
    },
    invalidCacheLocation: {
        code: "invalid_cache_location",
        desc: "The cache location provided is not valid."
    },
    noStorageSupported: {
        code: "browser_storage_not_supported",
        desc: "localStorage and sessionStorage are not supported."
    },
    noRedirectCallbacksSet: {
        code: "no_redirect_callbacks",
        desc: "No redirect callbacks have been set. Please call setRedirectCallbacks() with the appropriate function arguments before continuing. " +
            "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/-basics."
    },
    invalidCallbackObject: {
        code: "invalid_callback_object",
        desc: "The object passed for the callback was invalid. " +
            "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/-basics."
    },
    scopesRequired: {
        code: "scopes_required",
        desc: "Scopes are required to obtain an access token."
    },
    emptyScopes: {
        code: "empty_input_scopes_error",
        desc: "Scopes cannot be passed as empty array."
    },
    nonArrayScopes: {
        code: "nonarray_input_scopes_error",
        desc: "Scopes cannot be passed as non-array."
    },
    clientScope: {
        code: "clientid_input_scopes_error",
        desc: "Client ID can only be provided as a single scope."
    },
    invalidPrompt: {
        code: "invalid_prompt_value",
        desc: "Supported prompt values are 'login', 'select_account', 'consent' and 'none'",
    },
    invalidAuthorityType: {
        code: "invalid_authority_type",
        desc: "The given authority is not a valid type of authority supported by MSAL. Please see here for valid authorities: <insert URL here>."
    },
    authorityUriInsecure: {
        code: "authority_uri_insecure",
        desc: "Authority URIs must use https."
    },
    authorityUriInvalidPath: {
        code: "authority_uri_invalid_path",
        desc: "Given authority URI is invalid."
    },
    unsupportedAuthorityValidation: {
        code: "unsupported_authority_validation",
        desc: "The authority validation is not supported for this authority type."
    },
    b2cAuthorityUriInvalidPath: {
        code: "b2c_authority_uri_invalid_path",
        desc: "The given URI for the B2C authority is invalid."
    },
    claimsRequestParsingError: {
        code: "claims_request_parsing_error",
        desc: "Could not parse the given claims request object."
    }
};
/**
 * Error thrown when there is an error in configuration of the .js library.
 */
var ClientConfigurationError = /** @class */ (function (_super) {
    tslib_1.__extends(ClientConfigurationError, _super);
    function ClientConfigurationError(errorCode, errorMessage) {
        var _this = _super.call(this, errorCode, errorMessage) || this;
        _this.name = "ClientConfigurationError";
        Object.setPrototypeOf(_this, ClientConfigurationError.prototype);
        return _this;
    }
    ClientConfigurationError.createNoSetConfigurationError = function () {
        return new ClientConfigurationError(exports.ClientConfigurationErrorMessage.configurationNotSet.code, "" + exports.ClientConfigurationErrorMessage.configurationNotSet.desc);
    };
    ClientConfigurationError.createInvalidCacheLocationConfigError = function (givenCacheLocation) {
        return new ClientConfigurationError(exports.ClientConfigurationErrorMessage.invalidCacheLocation.code, exports.ClientConfigurationErrorMessage.invalidCacheLocation.desc + " Provided value: " + givenCacheLocation + ". Possible values are: " + Constants_1.Constants.cacheLocationLocal + ", " + Constants_1.Constants.cacheLocationSession + ".");
    };
    ClientConfigurationError.createNoStorageSupportedError = function () {
        return new ClientConfigurationError(exports.ClientConfigurationErrorMessage.noStorageSupported.code, exports.ClientConfigurationErrorMessage.noStorageSupported.desc);
    };
    ClientConfigurationError.createRedirectCallbacksNotSetError = function () {
        return new ClientConfigurationError(exports.ClientConfigurationErrorMessage.noRedirectCallbacksSet.code, exports.ClientConfigurationErrorMessage.noRedirectCallbacksSet.desc);
    };
    ClientConfigurationError.createInvalidCallbackObjectError = function (callbackObject) {
        return new ClientConfigurationError(exports.ClientConfigurationErrorMessage.invalidCallbackObject.code, exports.ClientConfigurationErrorMessage.invalidCallbackObject.desc + " Given value for callback function: " + callbackObject);
    };
    ClientConfigurationError.createEmptyScopesArrayError = function (scopesValue) {
        return new ClientConfigurationError(exports.ClientConfigurationErrorMessage.emptyScopes.code, exports.ClientConfigurationErrorMessage.emptyScopes.desc + " Given value: " + scopesValue + ".");
    };
    ClientConfigurationError.createScopesNonArrayError = function (scopesValue) {
        return new ClientConfigurationError(exports.ClientConfigurationErrorMessage.nonArrayScopes.code, exports.ClientConfigurationErrorMessage.nonArrayScopes.desc + " Given value: " + scopesValue + ".");
    };
    ClientConfigurationError.createClientIdSingleScopeError = function (scopesValue) {
        return new ClientConfigurationError(exports.ClientConfigurationErrorMessage.clientScope.code, exports.ClientConfigurationErrorMessage.clientScope.desc + " Given value: " + scopesValue + ".");
    };
    ClientConfigurationError.createScopesRequiredError = function (scopesValue) {
        return new ClientConfigurationError(exports.ClientConfigurationErrorMessage.scopesRequired.code, exports.ClientConfigurationErrorMessage.scopesRequired.desc + " Given value: " + scopesValue);
    };
    ClientConfigurationError.createInvalidPromptError = function (promptValue) {
        return new ClientConfigurationError(exports.ClientConfigurationErrorMessage.invalidPrompt.code, exports.ClientConfigurationErrorMessage.invalidPrompt.desc + " Given value: " + promptValue);
    };
    ClientConfigurationError.createClaimsRequestParsingError = function (claimsRequestParseError) {
        return new ClientConfigurationError(exports.ClientConfigurationErrorMessage.claimsRequestParsingError.code, exports.ClientConfigurationErrorMessage.claimsRequestParsingError.desc + " Given value: " + claimsRequestParseError);
    };
    return ClientConfigurationError;
}(ClientAuthError_1.ClientAuthError));
exports.ClientConfigurationError = ClientConfigurationError;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var AuthError_1 = __webpack_require__(5);
var Utils_1 = __webpack_require__(0);
exports.ClientAuthErrorMessage = {
    multipleMatchingTokens: {
        code: "multiple_matching_tokens",
        desc: "The cache contains multiple tokens satisfying the requirements. " +
            "Call AcquireToken again providing more requirements like authority."
    },
    multipleCacheAuthorities: {
        code: "multiple_authorities",
        desc: "Multiple authorities found in the cache. Pass authority in the API overload."
    },
    endpointResolutionError: {
        code: "endpoints_resolution_error",
        desc: "Error: could not resolve endpoints. Please check network and try again."
    },
    popUpWindowError: {
        code: "popup_window_error",
        desc: "Error opening popup window. This can happen if you are using IE or if popups are blocked in the browser."
    },
    tokenRenewalError: {
        code: "token_renewal_error",
        desc: "Token renewal operation failed due to timeout."
    },
    invalidIdToken: {
        code: "invalid_id_token",
        desc: "Invalid ID token format."
    },
    invalidStateError: {
        code: "invalid_state_error",
        desc: "Invalid state."
    },
    nonceMismatchError: {
        code: "nonce_mismatch_error",
        desc: "Nonce is not matching, Nonce received: "
    },
    loginProgressError: {
        code: "login_progress_error",
        desc: "Login_In_Progress: Error during login call - login is already in progress."
    },
    acquireTokenProgressError: {
        code: "acquiretoken_progress_error",
        desc: "AcquireToken_In_Progress: Error during login call - login is already in progress."
    },
    userCancelledError: {
        code: "user_cancelled",
        desc: "User cancelled the flow."
    },
    callbackError: {
        code: "callback_error",
        desc: "Error occurred in token received callback function."
    },
    userLoginRequiredError: {
        code: "user_login_error",
        desc: "User login is required."
    },
    userDoesNotExistError: {
        code: "user_non_existent",
        desc: "User object does not exist. Please call a login API."
    },
    clientInfoDecodingError: {
        code: "client_info_decoding_error",
        desc: "The client info could not be parsed/decoded correctly. Please review the trace to determine the root cause."
    },
    clientInfoNotPopulatedError: {
        code: "client_info_not_populated_error",
        desc: "The service did not populate client_info in the response, Please verify with the service team"
    },
    nullOrEmptyIdToken: {
        code: "null_or_empty_id_token",
        desc: "The idToken is null or empty. Please review the trace to determine the root cause."
    },
    idTokenNotParsed: {
        code: "id_token_parsing_error",
        desc: "ID token cannot be parsed. Please review stack trace to determine root cause."
    },
    tokenEncodingError: {
        code: "token_encoding_error",
        desc: "The token to be decoded is not encoded correctly."
    }
};
/**
 * Error thrown when there is an error in the client code running on the browser.
 */
var ClientAuthError = /** @class */ (function (_super) {
    tslib_1.__extends(ClientAuthError, _super);
    function ClientAuthError(errorCode, errorMessage) {
        var _this = _super.call(this, errorCode, errorMessage) || this;
        _this.name = "ClientAuthError";
        Object.setPrototypeOf(_this, ClientAuthError.prototype);
        return _this;
    }
    ClientAuthError.createEndpointResolutionError = function (errDetail) {
        var errorMessage = exports.ClientAuthErrorMessage.endpointResolutionError.desc;
        if (errDetail && !Utils_1.Utils.isEmpty(errDetail)) {
            errorMessage += " Details: " + errDetail;
        }
        return new ClientAuthError(exports.ClientAuthErrorMessage.endpointResolutionError.code, errorMessage);
    };
    ClientAuthError.createMultipleMatchingTokensInCacheError = function (scope) {
        return new ClientAuthError(exports.ClientAuthErrorMessage.multipleMatchingTokens.code, "Cache error for scope " + scope + ": " + exports.ClientAuthErrorMessage.multipleMatchingTokens.desc + ".");
    };
    ClientAuthError.createMultipleAuthoritiesInCacheError = function (scope) {
        return new ClientAuthError(exports.ClientAuthErrorMessage.multipleCacheAuthorities.code, "Cache error for scope " + scope + ": " + exports.ClientAuthErrorMessage.multipleCacheAuthorities.desc + ".");
    };
    ClientAuthError.createPopupWindowError = function (errDetail) {
        var errorMessage = exports.ClientAuthErrorMessage.popUpWindowError.desc;
        if (errDetail && !Utils_1.Utils.isEmpty(errDetail)) {
            errorMessage += " Details: " + errDetail;
        }
        return new ClientAuthError(exports.ClientAuthErrorMessage.popUpWindowError.code, errorMessage);
    };
    ClientAuthError.createTokenRenewalTimeoutError = function () {
        return new ClientAuthError(exports.ClientAuthErrorMessage.tokenRenewalError.code, exports.ClientAuthErrorMessage.tokenRenewalError.desc);
    };
    ClientAuthError.createInvalidIdTokenError = function (idToken) {
        return new ClientAuthError(exports.ClientAuthErrorMessage.invalidIdToken.code, exports.ClientAuthErrorMessage.invalidIdToken.desc + " Given token: " + idToken);
    };
    //TODO: Is this not a security flaw to send the user the state expected??
    ClientAuthError.createInvalidStateError = function (invalidState, actualState) {
        return new ClientAuthError(exports.ClientAuthErrorMessage.invalidStateError.code, exports.ClientAuthErrorMessage.invalidStateError.desc + " " + invalidState + ", state expected : " + actualState + ".");
    };
    //TODO: Is this not a security flaw to send the user the Nonce expected??
    ClientAuthError.createNonceMismatchError = function (invalidNonce, actualNonce) {
        return new ClientAuthError(exports.ClientAuthErrorMessage.nonceMismatchError.code, exports.ClientAuthErrorMessage.nonceMismatchError.desc + " " + invalidNonce + ", nonce expected : " + actualNonce + ".");
    };
    ClientAuthError.createLoginInProgressError = function () {
        return new ClientAuthError(exports.ClientAuthErrorMessage.loginProgressError.code, exports.ClientAuthErrorMessage.loginProgressError.desc);
    };
    ClientAuthError.createAcquireTokenInProgressError = function () {
        return new ClientAuthError(exports.ClientAuthErrorMessage.acquireTokenProgressError.code, exports.ClientAuthErrorMessage.acquireTokenProgressError.desc);
    };
    ClientAuthError.createUserCancelledError = function () {
        return new ClientAuthError(exports.ClientAuthErrorMessage.userCancelledError.code, exports.ClientAuthErrorMessage.userCancelledError.desc);
    };
    ClientAuthError.createErrorInCallbackFunction = function (errorDesc) {
        return new ClientAuthError(exports.ClientAuthErrorMessage.callbackError.code, exports.ClientAuthErrorMessage.callbackError.desc + " " + errorDesc + ".");
    };
    ClientAuthError.createUserLoginRequiredError = function () {
        return new ClientAuthError(exports.ClientAuthErrorMessage.userLoginRequiredError.code, exports.ClientAuthErrorMessage.userLoginRequiredError.desc);
    };
    ClientAuthError.createUserDoesNotExistError = function () {
        return new ClientAuthError(exports.ClientAuthErrorMessage.userDoesNotExistError.code, exports.ClientAuthErrorMessage.userDoesNotExistError.desc);
    };
    ClientAuthError.createClientInfoDecodingError = function (caughtError) {
        return new ClientAuthError(exports.ClientAuthErrorMessage.clientInfoDecodingError.code, exports.ClientAuthErrorMessage.clientInfoDecodingError.desc + " Failed with error: " + caughtError);
    };
    ClientAuthError.createClientInfoNotPopulatedError = function (caughtError) {
        return new ClientAuthError(exports.ClientAuthErrorMessage.clientInfoNotPopulatedError.code, exports.ClientAuthErrorMessage.clientInfoNotPopulatedError.desc + " Failed with error: " + caughtError);
    };
    ClientAuthError.createIdTokenNullOrEmptyError = function (invalidRawTokenString) {
        return new ClientAuthError(exports.ClientAuthErrorMessage.nullOrEmptyIdToken.code, exports.ClientAuthErrorMessage.nullOrEmptyIdToken.desc + " Raw ID Token Value: " + invalidRawTokenString);
    };
    ClientAuthError.createIdTokenParsingError = function (caughtParsingError) {
        return new ClientAuthError(exports.ClientAuthErrorMessage.idTokenNotParsed.code, exports.ClientAuthErrorMessage.idTokenNotParsed.desc + " Failed with error: " + caughtParsingError);
    };
    ClientAuthError.createTokenEncodingError = function (incorrectlyEncodedToken) {
        return new ClientAuthError(exports.ClientAuthErrorMessage.tokenEncodingError.code, exports.ClientAuthErrorMessage.tokenEncodingError.desc + " Attempted to decode: " + incorrectlyEncodedToken);
    };
    return ClientAuthError;
}(AuthError_1.AuthError));
exports.ClientAuthError = ClientAuthError;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
exports.AuthErrorMessage = {
    unexpectedError: {
        code: "unexpected_error",
        desc: "Unexpected error in authentication."
    }
};
/**
* General error class thrown by the MSAL.js library.
*/
var AuthError = /** @class */ (function (_super) {
    tslib_1.__extends(AuthError, _super);
    function AuthError(errorCode, errorMessage) {
        var _this = _super.call(this, errorMessage) || this;
        Object.setPrototypeOf(_this, AuthError.prototype);
        _this.errorCode = errorCode;
        _this.errorMessage = errorMessage;
        _this.name = "AuthError";
        return _this;
    }
    AuthError.createUnexpectedError = function (errDesc) {
        return new AuthError(exports.AuthErrorMessage.unexpectedError.code, exports.AuthErrorMessage.unexpectedError.desc + ": " + errDesc);
    };
    return AuthError;
}(Error));
exports.AuthError = AuthError;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
var ClientConfigurationError_1 = __webpack_require__(3);
var XHRClient_1 = __webpack_require__(12);
/**
 * @hidden
 */
var AuthorityType;
(function (AuthorityType) {
    AuthorityType[AuthorityType["Aad"] = 0] = "Aad";
    AuthorityType[AuthorityType["Adfs"] = 1] = "Adfs";
    AuthorityType[AuthorityType["B2C"] = 2] = "B2C";
})(AuthorityType = exports.AuthorityType || (exports.AuthorityType = {}));
/**
 * @hidden
 */
var Authority = /** @class */ (function () {
    function Authority(authority, validateAuthority) {
        this.IsValidationEnabled = validateAuthority;
        this.CanonicalAuthority = authority;
        this.validateAsUri();
    }
    Object.defineProperty(Authority.prototype, "Tenant", {
        get: function () {
            return this.CanonicalAuthorityUrlComponents.PathSegments[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "AuthorizationEndpoint", {
        get: function () {
            this.validateResolved();
            return this.tenantDiscoveryResponse.AuthorizationEndpoint.replace("{tenant}", this.Tenant);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "EndSessionEndpoint", {
        get: function () {
            this.validateResolved();
            return this.tenantDiscoveryResponse.EndSessionEndpoint.replace("{tenant}", this.Tenant);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "SelfSignedJwtAudience", {
        get: function () {
            this.validateResolved();
            return this.tenantDiscoveryResponse.Issuer.replace("{tenant}", this.Tenant);
        },
        enumerable: true,
        configurable: true
    });
    Authority.prototype.validateResolved = function () {
        if (!this.tenantDiscoveryResponse) {
            throw "Please call ResolveEndpointsAsync first";
        }
    };
    Object.defineProperty(Authority.prototype, "CanonicalAuthority", {
        /**
         * A URL that is the authority set by the developer
         */
        get: function () {
            return this.canonicalAuthority;
        },
        set: function (url) {
            this.canonicalAuthority = Utils_1.Utils.CanonicalizeUri(url);
            this.canonicalAuthorityUrlComponents = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "CanonicalAuthorityUrlComponents", {
        get: function () {
            if (!this.canonicalAuthorityUrlComponents) {
                this.canonicalAuthorityUrlComponents = Utils_1.Utils.GetUrlComponents(this.CanonicalAuthority);
            }
            return this.canonicalAuthorityUrlComponents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "DefaultOpenIdConfigurationEndpoint", {
        /**
         * // http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
         */
        get: function () {
            return this.CanonicalAuthority + "v2.0/.well-known/openid-configuration";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Given a string, validate that it is of the form https://domain/path
     */
    Authority.prototype.validateAsUri = function () {
        var components;
        try {
            components = this.CanonicalAuthorityUrlComponents;
        }
        catch (e) {
            throw ClientConfigurationError_1.ClientConfigurationErrorMessage.invalidAuthorityType;
        }
        if (!components.Protocol || components.Protocol.toLowerCase() !== "https:") {
            throw ClientConfigurationError_1.ClientConfigurationErrorMessage.authorityUriInsecure;
        }
        if (!components.PathSegments || components.PathSegments.length < 1) {
            throw ClientConfigurationError_1.ClientConfigurationErrorMessage.authorityUriInvalidPath;
        }
    };
    /**
     * Calls the OIDC endpoint and returns the response
     */
    Authority.prototype.DiscoverEndpoints = function (openIdConfigurationEndpoint) {
        var client = new XHRClient_1.XhrClient();
        return client.sendRequestAsync(openIdConfigurationEndpoint, "GET", /*enableCaching: */ true)
            .then(function (response) {
            return {
                AuthorizationEndpoint: response.authorization_endpoint,
                EndSessionEndpoint: response.end_session_endpoint,
                Issuer: response.issuer
            };
        });
    };
    /**
     * Returns a promise.
     * Checks to see if the authority is in the cache
     * Discover endpoints via openid-configuration
     * If successful, caches the endpoint for later use in OIDC
     */
    Authority.prototype.resolveEndpointsAsync = function () {
        var _this = this;
        var openIdConfigurationEndpoint = "";
        return this.GetOpenIdConfigurationEndpointAsync().then(function (openIdConfigurationEndpointResponse) {
            openIdConfigurationEndpoint = openIdConfigurationEndpointResponse;
            return _this.DiscoverEndpoints(openIdConfigurationEndpoint);
        }).then(function (tenantDiscoveryResponse) {
            _this.tenantDiscoveryResponse = tenantDiscoveryResponse;
            return _this;
        });
    };
    return Authority;
}());
exports.Authority = Authority;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 0] = "Error";
    LogLevel[LogLevel["Warning"] = 1] = "Warning";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Logger = /** @class */ (function () {
    function Logger(localCallback, options) {
        if (options === void 0) { options = {}; }
        /**
         * @hidden
         */
        this.level = LogLevel.Info;
        var _a = options.correlationId, correlationId = _a === void 0 ? "" : _a, _b = options.level, level = _b === void 0 ? LogLevel.Info : _b, _c = options.piiLoggingEnabled, piiLoggingEnabled = _c === void 0 ? false : _c;
        this.localCallback = localCallback;
        this.correlationId = correlationId;
        this.level = level;
        this.piiLoggingEnabled = piiLoggingEnabled;
    }
    /**
     * @hidden
     */
    Logger.prototype.logMessage = function (logLevel, logMessage, containsPii) {
        if ((logLevel > this.level) || (!this.piiLoggingEnabled && containsPii)) {
            return;
        }
        var timestamp = new Date().toUTCString();
        var log;
        if (!Utils_1.Utils.isEmpty(this.correlationId)) {
            log = timestamp + ":" + this.correlationId + "-" + Utils_1.Utils.getLibraryVersion() + "-" + LogLevel[logLevel] + " " + logMessage;
        }
        else {
            log = timestamp + ":" + Utils_1.Utils.getLibraryVersion() + "-" + LogLevel[logLevel] + " " + logMessage;
        }
        this.executeCallback(logLevel, log, containsPii);
    };
    /**
     * @hidden
     */
    Logger.prototype.executeCallback = function (level, message, containsPii) {
        if (this.localCallback) {
            this.localCallback(level, message, containsPii);
        }
    };
    /**
     * @hidden
     */
    Logger.prototype.error = function (message) {
        this.logMessage(LogLevel.Error, message, false);
    };
    /**
     * @hidden
     */
    Logger.prototype.errorPii = function (message) {
        this.logMessage(LogLevel.Error, message, true);
    };
    /**
     * @hidden
     */
    Logger.prototype.warning = function (message) {
        this.logMessage(LogLevel.Warning, message, false);
    };
    /**
     * @hidden
     */
    Logger.prototype.warningPii = function (message) {
        this.logMessage(LogLevel.Warning, message, true);
    };
    /**
     * @hidden
     */
    Logger.prototype.info = function (message) {
        this.logMessage(LogLevel.Info, message, false);
    };
    /**
     * @hidden
     */
    Logger.prototype.infoPii = function (message) {
        this.logMessage(LogLevel.Info, message, true);
    };
    /**
     * @hidden
     */
    Logger.prototype.verbose = function (message) {
        this.logMessage(LogLevel.Verbose, message, false);
    };
    /**
     * @hidden
     */
    Logger.prototype.verbosePii = function (message) {
        this.logMessage(LogLevel.Verbose, message, true);
    };
    return Logger;
}());
exports.Logger = Logger;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var AuthError_1 = __webpack_require__(5);
exports.ServerErrorMessage = {
    serverUnavailable: {
        code: "server_unavailable",
        desc: "Server is temporarily unavailable."
    },
    unknownServerError: {
        code: "unknown_server_error"
    },
};
/**
 * Error thrown when there is an error with the server code, for example, unavailability.
 */
var ServerError = /** @class */ (function (_super) {
    tslib_1.__extends(ServerError, _super);
    function ServerError(errorCode, errorMessage) {
        var _this = _super.call(this, errorCode, errorMessage) || this;
        _this.name = "ServerError";
        Object.setPrototypeOf(_this, ServerError.prototype);
        return _this;
    }
    ServerError.createServerUnavailableError = function () {
        return new ServerError(exports.ServerErrorMessage.serverUnavailable.code, exports.ServerErrorMessage.serverUnavailable.desc);
    };
    ServerError.createUnknownServerError = function (errorDesc) {
        return new ServerError(exports.ServerErrorMessage.unknownServerError.code, errorDesc);
    };
    return ServerError;
}(AuthError_1.AuthError));
exports.ServerError = ServerError;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var AccessTokenKey_1 = __webpack_require__(19);
var AccessTokenValue_1 = __webpack_require__(20);
var ServerRequestParameters_1 = __webpack_require__(21);
var ClientInfo_1 = __webpack_require__(22);
var Constants_1 = __webpack_require__(2);
var IdToken_1 = __webpack_require__(23);
var Storage_1 = __webpack_require__(24);
var Account_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);
var AuthorityFactory_1 = __webpack_require__(26);
var Configuration_1 = __webpack_require__(13);
var AuthenticationParameters_1 = __webpack_require__(14);
var ClientConfigurationError_1 = __webpack_require__(3);
var AuthError_1 = __webpack_require__(5);
var ClientAuthError_1 = __webpack_require__(4);
var ServerError_1 = __webpack_require__(8);
var InteractionRequiredAuthError_1 = __webpack_require__(15);
var AuthResponse_1 = __webpack_require__(16);
// default authority
var DEFAULT_AUTHORITY = "https://login.microsoftonline.com/common";
/**
 * @hidden
 * response_type from OpenIDConnect
 * References: https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html & https://tools.ietf.org/html/rfc6749#section-4.2.1
 * Since we support only implicit flow in this library, we restrict the response_type support to only 'token' and 'id_token'
 *
 */
var ResponseTypes = {
    id_token: "id_token",
    token: "token",
    id_token_token: "id_token token"
};
/**
 * @hidden
 * A wrapper to handle the token response/error within the iFrame always
 *
 * @param target
 * @param propertyKey
 * @param descriptor
 */
var resolveTokenOnlyIfOutOfIframe = function (target, propertyKey, descriptor) {
    var tokenAcquisitionMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.isInIframe()
            ? new Promise(function () {
                return;
            })
            : tokenAcquisitionMethod.apply(this, args);
    };
    return descriptor;
};
/**
 * UserAgentApplication class : {@link UserAgentApplication}
 * Object Instance that the developer can use to make loginXX OR acquireTokenXX functions
 */
var UserAgentApplication = /** @class */ (function () {
    /**
     * Constructor for the {@link UserAgentApplication} object
     * This is to be able to instantiate the {@link UserAgentApplication} object
     * @constructor
     *
     * Important attributes to configure are:
     * - clientID: the application ID of your application. You get obtain one by registering your application with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview
     * - authority: the authority URL for your application
     * @param {@link Configuration} configuration object for the MSAL UserAgentApplication instance
     */
    function UserAgentApplication(configuration) {
        // callbacks for token/error
        this.authResponseCallback = null;
        this.tokenReceivedCallback = null;
        this.errorReceivedCallback = null;
        // Set the Configuration
        this.config = Configuration_1.buildConfiguration(configuration);
        // Set the callback boolean
        this.redirectCallbacksSet = false;
        this.logger = this.config.system.logger;
        this.clientId = this.config.auth.clientId;
        this.inCookie = this.config.cache.storeAuthStateInCookie;
        // if no authority is passed, set the default: "https://login.microsoftonline.com/common"
        this.authority = this.config.auth.authority || DEFAULT_AUTHORITY;
        // track login and acquireToken in progress
        this.loginInProgress = false;
        this.acquireTokenInProgress = false;
        // cache keys msal - typescript throws an error if any value other than "localStorage" or "sessionStorage" is passed
        try {
            this.cacheStorage = new Storage_1.Storage(this.config.cache.cacheLocation);
        }
        catch (e) {
            throw ClientConfigurationError_1.ClientConfigurationError.createInvalidCacheLocationConfigError(this.config.cache.cacheLocation);
        }
        // Initialize window handling code
        window.openedWindows = [];
        window.activeRenewals = {};
        window.renewStates = [];
        window.callbackMappedToRenewStates = {};
        window.promiseMappedToRenewStates = {};
        window.msal = this;
        var urlHash = window.location.hash;
        var isCallback = this.isCallback(urlHash);
        // On the server 302 - Redirect, handle this
        if (!this.config.framework.isAngular) {
            if (isCallback) {
                this.handleAuthenticationResponse(urlHash);
            }
        }
    }
    Object.defineProperty(UserAgentApplication.prototype, "authority", {
        /**
         * returns the authority, where authority is a URL indicating the directory that MSAL can use to obtain tokens
         * - In Azure AD, this attribute is a URL indicating the Azure active directory that MSAL uses to obtain tokens
         * It is of the form https://login.microsoftonline.com/&lt;Enter_the_Tenant_Info_Here&gt;
         * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com)
         * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations
         * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
         * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
         * - In Azure B2C, it is of the form https://&lt;instance&gt;/tfp/&lt;tenant&gt;/<policyName>/
         *
         * @returns {string} authority
         */
        get: function () {
            return this.authorityInstance.CanonicalAuthority;
        },
        /**
         * setter for the authority URL
         * @param {string} authority
         */
        // If the developer passes an authority, create an instance
        set: function (val) {
            this.authorityInstance = AuthorityFactory_1.AuthorityFactory.CreateInstance(val, this.config.auth.validateAuthority);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * returns the authority instance
     * @returns authority {@link Authority}
     */
    UserAgentApplication.prototype.getAuthorityInstance = function () {
        return this.authorityInstance;
    };
    UserAgentApplication.prototype.handleRedirectCallback = function (authOrTokenCallback, errorReceivedCallback) {
        if (!authOrTokenCallback) {
            this.redirectCallbacksSet = false;
            throw ClientConfigurationError_1.ClientConfigurationError.createInvalidCallbackObjectError(authOrTokenCallback);
        }
        // Set callbacks
        if (errorReceivedCallback) {
            this.tokenReceivedCallback = authOrTokenCallback;
            this.errorReceivedCallback = errorReceivedCallback;
            this.logger.warning("This overload for callback is deprecated - please change the format of the callbacks to a single callback as shown: (err: AuthError, response: AuthResponse).");
        }
        else {
            this.authResponseCallback = authOrTokenCallback;
        }
        this.redirectCallbacksSet = true;
        // On the server 302 - Redirect, handle this
        if (!this.config.framework.isAngular) {
            var cachedHash = this.cacheStorage.getItem(Constants_1.Constants.urlHash);
            if (cachedHash) {
                this.processCallBack(cachedHash, null);
            }
        }
    };
    UserAgentApplication.prototype.redirectSuccessHandler = function (response) {
        if (this.errorReceivedCallback) {
            this.tokenReceivedCallback(response);
        }
        else if (this.authResponseCallback) {
            this.authResponseCallback(null, response);
        }
    };
    UserAgentApplication.prototype.redirectErrorHandler = function (authErr, response) {
        if (this.errorReceivedCallback) {
            this.errorReceivedCallback(authErr, response.accountState);
        }
        else {
            this.authResponseCallback(authErr, response);
        }
    };
    //#endregion
    //#region Redirect Flow
    /**
     * Use when initiating the login process by redirecting the user's browser to the authorization endpoint.
     * @param {@link AuthenticationParameters}
     */
    UserAgentApplication.prototype.loginRedirect = function (request) {
        var _this = this;
        // Throw error if callbacks are not set before redirect
        if (!this.redirectCallbacksSet) {
            throw ClientConfigurationError_1.ClientConfigurationError.createRedirectCallbacksNotSetError();
        }
        // Creates navigate url; saves value in cache; redirect user to AAD
        if (this.loginInProgress) {
            var reqState = void 0;
            if (request) {
                reqState = request.state;
            }
            this.redirectErrorHandler(ClientAuthError_1.ClientAuthError.createLoginInProgressError(), AuthResponse_1.buildResponseStateOnly(reqState));
            return;
        }
        // if extraScopesToConsent is passed, append them to the login request
        var scopes = this.appendScopes(request);
        // Validate and filter scopes (the validate function will throw if validation fails)
        this.validateInputScope(scopes, false);
        var account = this.getAccount();
        // defer queryParameters generation to Helper if developer passes account/sid/login_hint
        if (Utils_1.Utils.isSSOParam(request)) {
            // if account is not provided, we pass null
            this.loginRedirectHelper(account, request, scopes);
        }
        // else handle the library data
        else {
            // extract ADAL id_token if exists
            var adalIdToken = this.extractADALIdToken();
            // silent login if ADAL id_token is retrieved successfully - SSO
            if (adalIdToken && !scopes) {
                this.logger.info("ADAL's idToken exists. Extracting login information from ADAL's idToken ");
                var tokenRequest = this.buildIDTokenRequest(request);
                this.silentLogin = true;
                this.acquireTokenSilent(tokenRequest).then(function (response) {
                    _this.silentLogin = false;
                    _this.logger.info("Unified cache call is successful");
                    if (_this.redirectCallbacksSet) {
                        _this.redirectSuccessHandler(response);
                    }
                    return;
                }, function (error) {
                    _this.silentLogin = false;
                    _this.logger.error("Error occurred during unified cache ATS");
                    // call the loginRedirectHelper later with no user account context
                    _this.loginRedirectHelper(null, request, scopes);
                });
            }
            // else proceed to login
            else {
                // call the loginRedirectHelper later with no user account context
                this.loginRedirectHelper(null, request, scopes);
            }
        }
    };
    /**
     * @hidden
     * Helper function to loginRedirect
     *
     * @param account
     * @param AuthenticationParameters
     * @param scopes
     */
    UserAgentApplication.prototype.loginRedirectHelper = function (account, request, scopes) {
        var _this = this;
        // Track login in progress
        this.loginInProgress = true;
        this.authorityInstance.resolveEndpointsAsync().then(function () {
            // create the Request to be sent to the Server
            var serverAuthenticationRequest = new ServerRequestParameters_1.ServerRequestParameters(_this.authorityInstance, _this.clientId, scopes, ResponseTypes.id_token, _this.getRedirectUri(), request.state);
            // populate QueryParameters (sid/login_hint/domain_hint) and any other extraQueryParameters set by the developer
            serverAuthenticationRequest = _this.populateQueryParams(account, request, serverAuthenticationRequest);
            // if the user sets the login start page - angular only??
            var loginStartPage = _this.cacheStorage.getItem(Constants_1.Constants.angularLoginRequest);
            if (!loginStartPage || loginStartPage === "") {
                loginStartPage = window.location.href;
            }
            else {
                _this.cacheStorage.setItem(Constants_1.Constants.angularLoginRequest, "");
            }
            _this.updateCacheEntries(serverAuthenticationRequest, account, loginStartPage);
            // build URL to navigate to proceed with the login
            var urlNavigate = serverAuthenticationRequest.createNavigateUrl(scopes) + Constants_1.Constants.response_mode_fragment;
            // Redirect user to login URL
            _this.promptUser(urlNavigate);
        }).catch(function (err) {
            _this.logger.warning("could not resolve endpoints");
            var reqState;
            if (request) {
                reqState = request.state;
            }
            _this.redirectErrorHandler(ClientAuthError_1.ClientAuthError.createEndpointResolutionError(err.toString), AuthResponse_1.buildResponseStateOnly(reqState));
        });
    };
    /**
     * Used when you want to obtain an access_token for your API by redirecting the user to the authorization endpoint.
     * @param {@link AuthenticationParameters}
     *
     * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
     */
    UserAgentApplication.prototype.acquireTokenRedirect = function (request) {
        var _this = this;
        // Throw error if callbacks are not set before redirect
        if (!this.redirectCallbacksSet) {
            throw ClientConfigurationError_1.ClientConfigurationError.createRedirectCallbacksNotSetError();
        }
        // Validate and filter scopes (the validate function will throw if validation fails)
        this.validateInputScope(request.scopes, true);
        // Get the account object if a session exists
        var account = request.account || this.getAccount();
        // If already in progress, do not proceed
        if (this.acquireTokenInProgress) {
            var reqState = void 0;
            if (request) {
                reqState = request.state;
            }
            this.redirectErrorHandler(ClientAuthError_1.ClientAuthError.createAcquireTokenInProgressError(), AuthResponse_1.buildResponseStateOnly(this.getAccountState(reqState)));
            return;
        }
        // If no session exists, prompt the user to login.
        if (!account && !(request.sid || request.loginHint)) {
            this.logger.info("User login is required");
            throw ClientAuthError_1.ClientAuthError.createUserLoginRequiredError();
        }
        var serverAuthenticationRequest;
        var acquireTokenAuthority = request.authority ? AuthorityFactory_1.AuthorityFactory.CreateInstance(request.authority, this.config.auth.validateAuthority) : this.authorityInstance;
        // Track the acquireToken progress
        this.acquireTokenInProgress = true;
        acquireTokenAuthority.resolveEndpointsAsync().then(function () {
            // On Fulfillment
            var responseType = _this.getTokenType(account, request.scopes, false);
            serverAuthenticationRequest = new ServerRequestParameters_1.ServerRequestParameters(acquireTokenAuthority, _this.clientId, request.scopes, responseType, _this.getRedirectUri(), request.state);
            _this.updateCacheEntries(serverAuthenticationRequest, account);
            // populate QueryParameters (sid/login_hint/domain_hint) and any other extraQueryParameters set by the developer
            serverAuthenticationRequest = _this.populateQueryParams(account, request, serverAuthenticationRequest);
            // Construct urlNavigate
            var urlNavigate = serverAuthenticationRequest.createNavigateUrl(request.scopes) + Constants_1.Constants.response_mode_fragment;
            // set state in cache and redirect to urlNavigate
            if (urlNavigate) {
                _this.cacheStorage.setItem(Constants_1.Constants.stateAcquireToken, serverAuthenticationRequest.state, _this.inCookie);
                window.location.replace(urlNavigate);
            }
        }).catch(function (err) {
            _this.logger.warning("could not resolve endpoints");
            var reqState;
            if (request) {
                reqState = request.state;
            }
            _this.redirectErrorHandler(ClientAuthError_1.ClientAuthError.createEndpointResolutionError(err.toString), AuthResponse_1.buildResponseStateOnly(reqState));
        });
    };
    /**
     * @hidden
     * Checks if the redirect response is received from the STS. In case of redirect, the url fragment has either id_token, access_token or error.
     * @param {string} hash - Hash passed from redirect page.
     * @returns {Boolean} - true if response contains id_token, access_token or error, false otherwise.
     */
    // TODO - rename this, the name is confusing
    UserAgentApplication.prototype.isCallback = function (hash) {
        hash = this.getHash(hash);
        var parameters = Utils_1.Utils.deserialize(hash);
        return (parameters.hasOwnProperty(Constants_1.Constants.errorDescription) ||
            parameters.hasOwnProperty(Constants_1.Constants.error) ||
            parameters.hasOwnProperty(Constants_1.Constants.accessToken) ||
            parameters.hasOwnProperty(Constants_1.Constants.idToken));
    };
    //#endregion
    //#region Popup Flow
    /**
     * Use when initiating the login process via opening a popup window in the user's browser
     *
     * @param {@link AuthenticationParameters}
     *
     * @returns {Promise.<AuthResponse>} - A Promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
     */
    UserAgentApplication.prototype.loginPopup = function (request) {
        var _this = this;
        // Creates navigate url; saves value in cache; redirect user to AAD
        return new Promise(function (resolve, reject) {
            // Fail if login is already in progress
            if (_this.loginInProgress) {
                return reject(ClientAuthError_1.ClientAuthError.createLoginInProgressError());
            }
            // if extraScopesToConsent is passed, append them to the login request
            var scopes = _this.appendScopes(request);
            // Validate and filter scopes (the validate function will throw if validation fails)
            _this.validateInputScope(scopes, false);
            var account = _this.getAccount();
            // add the prompt parameter to the 'extraQueryParameters' if passed
            if (Utils_1.Utils.isSSOParam(request)) {
                // if account is not provided, we pass null
                _this.loginPopupHelper(account, request, resolve, reject, scopes);
            }
            // else handle the library data
            else {
                // Extract ADAL id_token if it exists
                var adalIdToken = _this.extractADALIdToken();
                // silent login if ADAL id_token is retrieved successfully - SSO
                if (adalIdToken && !scopes) {
                    _this.logger.info("ADAL's idToken exists. Extracting login information from ADAL's idToken ");
                    var tokenRequest = _this.buildIDTokenRequest(request);
                    _this.silentLogin = true;
                    _this.acquireTokenSilent(tokenRequest)
                        .then(function (response) {
                        _this.silentLogin = false;
                        _this.logger.info("Unified cache call is successful");
                        resolve(response);
                    }, function (error) {
                        _this.silentLogin = false;
                        _this.logger.error("Error occurred during unified cache ATS");
                        _this.loginPopupHelper(null, request, resolve, reject, scopes);
                    });
                }
                // else proceed with login
                else {
                    _this.loginPopupHelper(null, request, resolve, reject, scopes);
                }
            }
        });
    };
    /**
     * @hidden
     * Helper function to loginPopup
     *
     * @param account
     * @param request
     * @param resolve
     * @param reject
     * @param scopes
     */
    UserAgentApplication.prototype.loginPopupHelper = function (account, request, resolve, reject, scopes) {
        var _this = this;
        if (!scopes) {
            scopes = [this.clientId];
        }
        var scope = scopes.join(" ").toLowerCase();
        // Generate a popup window
        var popUpWindow = this.openWindow("about:blank", "_blank", 1, this, resolve, reject);
        if (!popUpWindow) {
            // We pass reject in openWindow, we reject there during an error
            return;
        }
        // Track login progress
        this.loginInProgress = true;
        // Resolve endpoint
        this.authorityInstance.resolveEndpointsAsync().then(function () {
            var serverAuthenticationRequest = new ServerRequestParameters_1.ServerRequestParameters(_this.authorityInstance, _this.clientId, scopes, ResponseTypes.id_token, _this.getRedirectUri(), request.state);
            // populate QueryParameters (sid/login_hint/domain_hint) and any other extraQueryParameters set by the developer;
            serverAuthenticationRequest = _this.populateQueryParams(account, request, serverAuthenticationRequest);
            _this.updateCacheEntries(serverAuthenticationRequest, account, window.location.href);
            // Cache the state, nonce, and login request data
            _this.cacheStorage.setItem(Constants_1.Constants.loginRequest, window.location.href, _this.inCookie);
            _this.cacheStorage.setItem(Constants_1.Constants.loginError, "");
            _this.cacheStorage.setItem(Constants_1.Constants.nonceIdToken, serverAuthenticationRequest.nonce, _this.inCookie);
            _this.cacheStorage.setItem(Constants_1.Constants.msalError, "");
            _this.cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, "");
            // cache authorityKey
            _this.setAuthorityCache(serverAuthenticationRequest.state, _this.authority);
            // Build the URL to navigate to in the popup window
            var urlNavigate = serverAuthenticationRequest.createNavigateUrl(scopes) + Constants_1.Constants.response_mode_fragment;
            window.renewStates.push(serverAuthenticationRequest.state);
            window.requestType = Constants_1.Constants.login;
            // Register callback to capture results from server
            _this.registerCallback(serverAuthenticationRequest.state, scope, resolve, reject);
            // Navigate url in popupWindow
            if (popUpWindow) {
                _this.logger.infoPii("Navigated Popup window to:" + urlNavigate);
                popUpWindow.location.href = urlNavigate;
            }
        }, function () {
            // Endpoint resolution failure error
            _this.logger.info(ClientAuthError_1.ClientAuthErrorMessage.endpointResolutionError.code + ":" + ClientAuthError_1.ClientAuthErrorMessage.endpointResolutionError.desc);
            _this.cacheStorage.setItem(Constants_1.Constants.msalError, ClientAuthError_1.ClientAuthErrorMessage.endpointResolutionError.code);
            _this.cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, ClientAuthError_1.ClientAuthErrorMessage.endpointResolutionError.desc);
            // What is this? Is this the reject that is passed in?? -- REDO this in the subsequent refactor, passing reject is confusing
            if (reject) {
                reject(ClientAuthError_1.ClientAuthError.createEndpointResolutionError());
            }
            // Close the popup window
            if (popUpWindow) {
                popUpWindow.close();
            }
        }).catch(function (err) {
            _this.logger.warning("could not resolve endpoints");
            reject(ClientAuthError_1.ClientAuthError.createEndpointResolutionError(err.toString));
        });
    };
    /**
     * Use when you want to obtain an access_token for your API via opening a popup window in the user's browser
     * @param {@link AuthenticationParameters}
     *
     * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
     * @returns {Promise.<AuthResponse>} - A Promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
     */
    UserAgentApplication.prototype.acquireTokenPopup = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Validate and filter scopes (the validate function will throw if validation fails)
            _this.validateInputScope(request.scopes, true);
            var scope = request.scopes.join(" ").toLowerCase();
            // Get the account object if a session exists
            var account = request.account || _this.getAccount();
            // If already in progress, throw an error and reject the request
            if (_this.acquireTokenInProgress) {
                return reject(ClientAuthError_1.ClientAuthError.createAcquireTokenInProgressError());
            }
            // If no session exists, prompt the user to login.
            if (!account && !!(request.sid || request.loginHint)) {
                _this.logger.info("User login is required");
                return reject(ClientAuthError_1.ClientAuthError.createUserLoginRequiredError());
            }
            // track the acquireToken progress
            _this.acquireTokenInProgress = true;
            var serverAuthenticationRequest;
            var acquireTokenAuthority = request.authority ? AuthorityFactory_1.AuthorityFactory.CreateInstance(request.authority, _this.config.auth.validateAuthority) : _this.authorityInstance;
            // Open the popup window
            var popUpWindow = _this.openWindow("about:blank", "_blank", 1, _this, resolve, reject);
            if (!popUpWindow) {
                // We pass reject to openWindow, so we are rejecting there.
                return;
            }
            acquireTokenAuthority.resolveEndpointsAsync().then(function () {
                // On fullfillment
                var responseType = _this.getTokenType(account, request.scopes, false);
                serverAuthenticationRequest = new ServerRequestParameters_1.ServerRequestParameters(acquireTokenAuthority, _this.clientId, request.scopes, responseType, _this.getRedirectUri(), request.state);
                // populate QueryParameters (sid/login_hint/domain_hint) and any other extraQueryParameters set by the developer
                serverAuthenticationRequest = _this.populateQueryParams(account, request, serverAuthenticationRequest);
                _this.updateCacheEntries(serverAuthenticationRequest, account);
                // Construct the urlNavigate
                var urlNavigate = serverAuthenticationRequest.createNavigateUrl(request.scopes) + Constants_1.Constants.response_mode_fragment;
                window.renewStates.push(serverAuthenticationRequest.state);
                window.requestType = Constants_1.Constants.renewToken;
                _this.registerCallback(serverAuthenticationRequest.state, scope, resolve, reject);
                // open popup window to urlNavigate
                if (popUpWindow) {
                    popUpWindow.location.href = urlNavigate;
                }
            }, function () {
                // On rejection
                _this.logger.info(ClientAuthError_1.ClientAuthErrorMessage.endpointResolutionError.code + ":" + ClientAuthError_1.ClientAuthErrorMessage.endpointResolutionError.desc);
                _this.cacheStorage.setItem(Constants_1.Constants.msalError, ClientAuthError_1.ClientAuthErrorMessage.endpointResolutionError.code);
                _this.cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, ClientAuthError_1.ClientAuthErrorMessage.endpointResolutionError.desc);
                if (reject) {
                    reject(ClientAuthError_1.ClientAuthError.createEndpointResolutionError());
                }
                if (popUpWindow) {
                    popUpWindow.close();
                }
            }).catch(function (err) {
                _this.logger.warning("could not resolve endpoints");
                reject(ClientAuthError_1.ClientAuthError.createEndpointResolutionError(err.toString()));
            });
        });
    };
    /**
     * @hidden
     *
     * Used to send the user to the redirect_uri after authentication is complete. The user's bearer token is attached to the URI fragment as an id_token/access_token field.
     * This function also closes the popup window after redirection.
     *
     * @param urlNavigate
     * @param title
     * @param interval
     * @param instance
     * @param resolve
     * @param reject
     * @ignore
     */
    UserAgentApplication.prototype.openWindow = function (urlNavigate, title, interval, instance, resolve, reject) {
        var _this = this;
        // Generate a popup window
        var popupWindow;
        try {
            popupWindow = this.openPopup(urlNavigate, title, Constants_1.Constants.popUpWidth, Constants_1.Constants.popUpHeight);
        }
        catch (e) {
            instance.loginInProgress = false;
            instance.acquireTokenInProgress = false;
            this.logger.info(ClientAuthError_1.ClientAuthErrorMessage.popUpWindowError.code + ":" + ClientAuthError_1.ClientAuthErrorMessage.popUpWindowError.desc);
            this.cacheStorage.setItem(Constants_1.Constants.msalError, ClientAuthError_1.ClientAuthErrorMessage.popUpWindowError.code);
            this.cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, ClientAuthError_1.ClientAuthErrorMessage.popUpWindowError.desc);
            if (reject) {
                reject(ClientAuthError_1.ClientAuthError.createPopupWindowError());
            }
            return null;
        }
        // Push popup window handle onto stack for tracking
        window.openedWindows.push(popupWindow);
        var pollTimer = window.setInterval(function () {
            // If popup closed or login in progress, cancel login
            if (popupWindow && popupWindow.closed && instance.loginInProgress) {
                if (reject) {
                    reject(ClientAuthError_1.ClientAuthError.createUserCancelledError());
                }
                window.clearInterval(pollTimer);
                if (_this.config.framework.isAngular) {
                    _this.broadcast("msal:popUpClosed", ClientAuthError_1.ClientAuthErrorMessage.userCancelledError.code + Constants_1.Constants.resourceDelimiter + ClientAuthError_1.ClientAuthErrorMessage.userCancelledError.desc);
                    return;
                }
                instance.loginInProgress = false;
                instance.acquireTokenInProgress = false;
            }
            try {
                var popUpWindowLocation = popupWindow.location;
                // If the popup hash changes, close the popup window
                if (popUpWindowLocation.href.indexOf(_this.getRedirectUri()) !== -1) {
                    window.clearInterval(pollTimer);
                    instance.loginInProgress = false;
                    instance.acquireTokenInProgress = false;
                    _this.logger.info("Closing popup window");
                    // TODO: Check how this can be extracted for any framework specific code?
                    if (_this.config.framework.isAngular) {
                        _this.broadcast("msal:popUpHashChanged", popUpWindowLocation.hash);
                        for (var i = 0; i < window.openedWindows.length; i++) {
                            window.openedWindows[i].close();
                        }
                    }
                }
            }
            catch (e) {
                // Cross Domain url check error.
                // Will be thrown until AAD redirects the user back to the app"s root page with the token.
                // No need to log or throw this error as it will create unnecessary traffic.
            }
        }, interval);
        return popupWindow;
    };
    /**
     * @hidden
     *
     * Configures popup window for login.
     *
     * @param urlNavigate
     * @param title
     * @param popUpWidth
     * @param popUpHeight
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.openPopup = function (urlNavigate, title, popUpWidth, popUpHeight) {
        try {
            /**
             * adding winLeft and winTop to account for dual monitor
             * using screenLeft and screenTop for IE8 and earlier
             */
            var winLeft = window.screenLeft ? window.screenLeft : window.screenX;
            var winTop = window.screenTop ? window.screenTop : window.screenY;
            /**
             * window.innerWidth displays browser window"s height and width excluding toolbars
             * using document.documentElement.clientWidth for IE8 and earlier
             */
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var left = ((width / 2) - (popUpWidth / 2)) + winLeft;
            var top = ((height / 2) - (popUpHeight / 2)) + winTop;
            // open the window
            var popupWindow = window.open(urlNavigate, title, "width=" + popUpWidth + ", height=" + popUpHeight + ", top=" + top + ", left=" + left);
            if (!popupWindow) {
                throw ClientAuthError_1.ClientAuthError.createPopupWindowError();
            }
            if (popupWindow.focus) {
                popupWindow.focus();
            }
            return popupWindow;
        }
        catch (e) {
            this.logger.error("error opening popup " + e.message);
            this.loginInProgress = false;
            this.acquireTokenInProgress = false;
            throw ClientAuthError_1.ClientAuthError.createPopupWindowError(e.toString());
        }
    };
    //#endregion
    //#region Silent Flow
    /**
     * Use this function to obtain a token before every call to the API / resource provider
     *
     * MSAL return's a cached token when available
     * Or it send's a request to the STS to obtain a new token using a hidden iframe.
     *
     * @param {@link AuthenticationParameters}
     *
     * To renew idToken, please pass clientId as the only scope in the Authentication Parameters
     * @returns {Promise.<AuthResponse>} - A Promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
     *
     */
    UserAgentApplication.prototype.acquireTokenSilent = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Validate and filter scopes (the validate function will throw if validation fails)
            _this.validateInputScope(request.scopes, true);
            var scope = request.scopes.join(" ").toLowerCase();
            // if the developer passes an account give him the priority
            var account = request.account || _this.getAccount();
            // extract if there is an adalIdToken stashed in the cache
            var adalIdToken = _this.cacheStorage.getItem(Constants_1.Constants.adalIdToken);
            //if there is no account logged in and no login_hint/sid is passed in the request
            if (!account && !!(request.sid || request.loginHint) && Utils_1.Utils.isEmpty(adalIdToken)) {
                _this.logger.info("User login is required");
                return reject(ClientAuthError_1.ClientAuthError.createUserLoginRequiredError());
            }
            var responseType = _this.getTokenType(account, request.scopes, true);
            var serverAuthenticationRequest = new ServerRequestParameters_1.ServerRequestParameters(AuthorityFactory_1.AuthorityFactory.CreateInstance(request.authority, _this.config.auth.validateAuthority), _this.clientId, request.scopes, responseType, _this.getRedirectUri(), request.state);
            // populate QueryParameters (sid/login_hint/domain_hint) and any other extraQueryParameters set by the developer
            if (Utils_1.Utils.isSSOParam(request) || account) {
                serverAuthenticationRequest = _this.populateQueryParams(account, request, serverAuthenticationRequest);
            }
            //if user didn't pass login_hint/sid and adal's idtoken is present, extract the login_hint from the adalIdToken
            else if (!account && !Utils_1.Utils.isEmpty(adalIdToken)) {
                // if adalIdToken exists, extract the SSO info from the same
                var adalIdTokenObject = Utils_1.Utils.extractIdToken(adalIdToken);
                _this.logger.verbose("ADAL's idToken exists. Extracting login information from ADAL's idToken ");
                serverAuthenticationRequest = _this.populateQueryParams(account, null, serverAuthenticationRequest, adalIdTokenObject);
            }
            var userContainedClaims = request.claimsRequest || serverAuthenticationRequest.claimsValue;
            var authErr;
            var cacheResultResponse;
            if (!userContainedClaims) {
                try {
                    cacheResultResponse = _this.getCachedToken(serverAuthenticationRequest, account);
                }
                catch (e) {
                    authErr = e;
                }
            }
            // resolve/reject based on cacheResult
            if (cacheResultResponse) {
                _this.logger.info("Token is already in cache for scope:" + scope);
                resolve(cacheResultResponse);
                return null;
            }
            else if (authErr) {
                _this.logger.infoPii(authErr.errorCode + ":" + authErr.errorMessage);
                reject(authErr);
                return null;
            }
            // else proceed with login
            else {
                if (userContainedClaims) {
                    _this.logger.verbose("Skipped cache lookup since claims were given.");
                }
                else {
                    _this.logger.verbose("Token is not in cache for scope:" + scope);
                }
                // Cache result can return null if cache is empty. In that case, set authority to default value if no authority is passed to the api.
                if (!serverAuthenticationRequest.authorityInstance) {
                    serverAuthenticationRequest.authorityInstance = request.authority ? AuthorityFactory_1.AuthorityFactory.CreateInstance(request.authority, _this.config.auth.validateAuthority) : _this.authorityInstance;
                }
                // cache miss
                return serverAuthenticationRequest.authorityInstance.resolveEndpointsAsync()
                    .then(function () {
                    // refresh attempt with iframe
                    // Already renewing for this scope, callback when we get the token.
                    if (window.activeRenewals[scope]) {
                        _this.logger.verbose("Renew token for scope: " + scope + " is in progress. Registering callback");
                        // Active renewals contains the state for each renewal.
                        _this.registerCallback(window.activeRenewals[scope], scope, resolve, reject);
                    }
                    else {
                        if (request.scopes && request.scopes.indexOf(_this.clientId) > -1 && request.scopes.length === 1) {
                            // App uses idToken to send to api endpoints
                            // Default scope is tracked as clientId to store this token
                            _this.logger.verbose("renewing idToken");
                            _this.renewIdToken(request.scopes, resolve, reject, account, serverAuthenticationRequest);
                        }
                        else {
                            // renew access token
                            _this.logger.verbose("renewing accesstoken");
                            _this.renewToken(request.scopes, resolve, reject, account, serverAuthenticationRequest);
                        }
                    }
                }).catch(function (err) {
                    _this.logger.warning("could not resolve endpoints");
                    reject(ClientAuthError_1.ClientAuthError.createEndpointResolutionError(err.toString()));
                    return null;
                });
            }
        });
    };
    /**
     * @hidden
     * Returns whether current window is in ifram for token renewal
     * @ignore
     */
    UserAgentApplication.prototype.isInIframe = function () {
        return window.parent !== window;
    };
    /**
     * @hidden
     * Returns whether parent window exists and has msal
     */
    UserAgentApplication.prototype.parentIsMsal = function () {
        return window.parent !== window && window.parent.msal;
    };
    /**
     * @hidden
     */
    UserAgentApplication.prototype.isInteractionRequired = function (errorString) {
        if (errorString.indexOf("interaction_required") !== -1 ||
            errorString.indexOf("consent_required") !== -1 ||
            errorString.indexOf("login_required") !== -1) {
            return true;
        }
        return false;
    };
    /**
     * @hidden
     * Calling _loadFrame but with a timeout to signal failure in loadframeStatus. Callbacks are left.
     * registered when network errors occur and subsequent token requests for same resource are registered to the pending request.
     * @ignore
     */
    UserAgentApplication.prototype.loadIframeTimeout = function (urlNavigate, frameName, scope) {
        var _this = this;
        //set iframe session to pending
        var expectedState = window.activeRenewals[scope];
        this.logger.verbose("Set loading state to pending for: " + scope + ":" + expectedState);
        this.cacheStorage.setItem(Constants_1.Constants.renewStatus + expectedState, Constants_1.Constants.tokenRenewStatusInProgress);
        this.loadFrame(urlNavigate, frameName);
        setTimeout(function () {
            if (_this.cacheStorage.getItem(Constants_1.Constants.renewStatus + expectedState) === Constants_1.Constants.tokenRenewStatusInProgress) {
                // fail the iframe session if it"s in pending state
                _this.logger.verbose("Loading frame has timed out after: " + (_this.config.system.loadFrameTimeout / 1000) + " seconds for scope " + scope + ":" + expectedState);
                // Error after timeout
                if (expectedState && window.callbackMappedToRenewStates[expectedState]) {
                    window.callbackMappedToRenewStates[expectedState](null, ClientAuthError_1.ClientAuthError.createTokenRenewalTimeoutError());
                }
                _this.cacheStorage.setItem(Constants_1.Constants.renewStatus + expectedState, Constants_1.Constants.tokenRenewStatusCancelled);
            }
        }, this.config.system.loadFrameTimeout);
    };
    /**
     * @hidden
     * Loads iframe with authorization endpoint URL
     * @ignore
     */
    UserAgentApplication.prototype.loadFrame = function (urlNavigate, frameName) {
        var _this = this;
        // This trick overcomes iframe navigation in IE
        // IE does not load the page consistently in iframe
        this.logger.info("LoadFrame: " + frameName);
        var frameCheck = frameName;
        setTimeout(function () {
            var frameHandle = _this.addHiddenIFrame(frameCheck);
            if (frameHandle.src === "" || frameHandle.src === "about:blank") {
                frameHandle.src = urlNavigate;
                _this.logger.infoPii("Frame Name : " + frameName + " Navigated to: " + urlNavigate);
            }
        }, this.config.system.navigateFrameWait);
    };
    /**
     * @hidden
     * Adds the hidden iframe for silent token renewal.
     * @ignore
     */
    UserAgentApplication.prototype.addHiddenIFrame = function (iframeId) {
        if (typeof iframeId === "undefined") {
            return null;
        }
        this.logger.info("Add msal frame to document:" + iframeId);
        var adalFrame = document.getElementById(iframeId);
        if (!adalFrame) {
            if (document.createElement &&
                document.documentElement &&
                (window.navigator.userAgent.indexOf("MSIE 5.0") === -1)) {
                var ifr = document.createElement("iframe");
                ifr.setAttribute("id", iframeId);
                ifr.style.visibility = "hidden";
                ifr.style.position = "absolute";
                ifr.style.width = ifr.style.height = "0";
                ifr.style.border = "0";
                adalFrame = document.getElementsByTagName("body")[0].appendChild(ifr);
            }
            else if (document.body && document.body.insertAdjacentHTML) {
                document.body.insertAdjacentHTML("beforeend", "<iframe name='" + iframeId + "' id='" + iframeId + "' style='display:none'></iframe>");
            }
            if (window.frames && window.frames[iframeId]) {
                adalFrame = window.frames[iframeId];
            }
        }
        return adalFrame;
    };
    //#endregion
    //#region General Helpers
    /**
     * @hidden
     *
     * Adds login_hint to authorization URL which is used to pre-fill the username field of sign in page for the user if known ahead of time
     * domain_hint can be one of users/organizations which when added skips the email based discovery process of the user
     * domain_req utid received as part of the clientInfo
     * login_req uid received as part of clientInfo
     * Also does a sanity check for extraQueryParameters passed by the user to ensure no repeat queryParameters
     *
     * @param {@link Account} account - Account for which the token is requested
     * @param queryparams
     * @param {@link ServerRequestParameters}
     * @ignore
     */
    UserAgentApplication.prototype.addHintParameters = function (accountObj, qParams, serverReqParams) {
        var account = accountObj || this.getAccount();
        // This is a final check for all queryParams added so far; preference order: sid > login_hint
        // sid cannot be passed along with login_hint, hence we check both are not populated yet in queryParameters so far
        if (account) {
            // sid
            if (account.sid && serverReqParams.promptValue === Constants_1.PromptState.NONE) {
                if (!qParams[Constants_1.SSOTypes.SID] && !qParams[Constants_1.SSOTypes.LOGIN_HINT]) {
                    qParams = Utils_1.Utils.addSSOParameter(Constants_1.SSOTypes.SID, account.sid, qParams);
                }
            }
            // login_hint
            else {
                // login_hint is account.userName
                if (!qParams[Constants_1.SSOTypes.LOGIN_HINT] && account.userName && !Utils_1.Utils.isEmpty(account.userName)) {
                    qParams = Utils_1.Utils.addSSOParameter(Constants_1.SSOTypes.LOGIN_HINT, account.userName, qParams);
                }
            }
            if (!qParams[Constants_1.SSOTypes.DOMAIN_REQ] && !qParams[Constants_1.SSOTypes.LOGIN_REQ]) {
                qParams = Utils_1.Utils.addSSOParameter(Constants_1.SSOTypes.HOMEACCOUNT_ID, account.homeAccountIdentifier, qParams);
            }
        }
        return qParams;
    };
    /**
     * @hidden
     * Used to redirect the browser to the STS authorization endpoint
     * @param {string} urlNavigate - URL of the authorization endpoint
     */
    UserAgentApplication.prototype.promptUser = function (urlNavigate) {
        // Navigate if valid URL
        if (urlNavigate && !Utils_1.Utils.isEmpty(urlNavigate)) {
            this.logger.infoPii("Navigate to:" + urlNavigate);
            window.location.replace(urlNavigate);
        }
        else {
            this.logger.info("Navigate url is empty");
            throw AuthError_1.AuthError.createUnexpectedError("Navigate url is empty");
        }
    };
    /**
     * @hidden
     * Used to add the developer requested callback to the array of callbacks for the specified scopes. The updated array is stored on the window object
     * @param {string} expectedState - Unique state identifier (guid).
     * @param {string} scope - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @param {Function} resolve - The resolve function of the promise object.
     * @param {Function} reject - The reject function of the promise object.
     * @ignore
     */
    UserAgentApplication.prototype.registerCallback = function (expectedState, scope, resolve, reject) {
        var _this = this;
        // track active renewals
        window.activeRenewals[scope] = expectedState;
        // initialize callbacks mapped array
        if (!window.promiseMappedToRenewStates[expectedState]) {
            window.promiseMappedToRenewStates[expectedState] = [];
        }
        // indexing on the current state, push the callback params to callbacks mapped
        window.promiseMappedToRenewStates[expectedState].push({ resolve: resolve, reject: reject });
        // Store the server esponse in the current window??
        if (!window.callbackMappedToRenewStates[expectedState]) {
            window.callbackMappedToRenewStates[expectedState] =
                function (response, error) {
                    // reset active renewals
                    window.activeRenewals[scope] = null;
                    // for all promiseMappedtoRenewStates for a given 'state' - call the reject/resolve with error/token respectively
                    for (var i = 0; i < window.promiseMappedToRenewStates[expectedState].length; ++i) {
                        try {
                            if (error) {
                                window.promiseMappedToRenewStates[expectedState][i].reject(error);
                            }
                            else if (response) {
                                window.promiseMappedToRenewStates[expectedState][i].resolve(response);
                            }
                            else {
                                throw AuthError_1.AuthError.createUnexpectedError("Error and response are both null");
                            }
                        }
                        catch (e) {
                            _this.logger.warning(e);
                        }
                    }
                    // reset
                    window.promiseMappedToRenewStates[expectedState] = null;
                    window.callbackMappedToRenewStates[expectedState] = null;
                };
        }
    };
    //#endregion
    //#region Logout
    /**
     * Used to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Defaults behaviour is to redirect the user to `window.location.href`.
     */
    UserAgentApplication.prototype.logout = function () {
        this.clearCache();
        this.account = null;
        var logout = "";
        if (this.getPostLogoutRedirectUri()) {
            logout = "post_logout_redirect_uri=" + encodeURIComponent(this.getPostLogoutRedirectUri());
        }
        var urlNavigate = this.authority + "oauth2/v2.0/logout?" + logout;
        this.promptUser(urlNavigate);
    };
    /**
     * @hidden
     * Clear all access tokens in the cache.
     * @ignore
     */
    UserAgentApplication.prototype.clearCache = function () {
        window.renewStates = [];
        var accessTokenItems = this.cacheStorage.getAllAccessTokens(Constants_1.Constants.clientId, Constants_1.Constants.homeAccountIdentifier);
        for (var i = 0; i < accessTokenItems.length; i++) {
            this.cacheStorage.removeItem(JSON.stringify(accessTokenItems[i].key));
        }
        this.cacheStorage.resetCacheItems();
        this.cacheStorage.clearCookie();
    };
    /**
     * @hidden
     * Clear a given access token from the cache.
     *
     * @param accessToken
     */
    UserAgentApplication.prototype.clearCacheForScope = function (accessToken) {
        var accessTokenItems = this.cacheStorage.getAllAccessTokens(Constants_1.Constants.clientId, Constants_1.Constants.homeAccountIdentifier);
        for (var i = 0; i < accessTokenItems.length; i++) {
            var token = accessTokenItems[i];
            if (token.value.accessToken === accessToken) {
                this.cacheStorage.removeItem(JSON.stringify(token.key));
            }
        }
    };
    //#endregion
    //#region Response
    /**
     * @hidden
     * Used to call the constructor callback with the token/error
     * @param {string} [hash=window.location.hash] - Hash fragment of Url.
     */
    UserAgentApplication.prototype.processCallBack = function (hash, stateInfo, parentCallback) {
        this.logger.info("Processing the callback from redirect response");
        // get the state info from the hash
        if (!stateInfo) {
            stateInfo = this.getResponseState(hash);
        }
        var response;
        var authErr;
        // Save the token info from the hash
        try {
            response = this.saveTokenFromHash(hash, stateInfo);
        }
        catch (err) {
            authErr = err;
        }
        // remove hash from the cache
        this.cacheStorage.removeItem(Constants_1.Constants.urlHash);
        try {
            // Clear the cookie in the hash
            this.cacheStorage.clearCookie();
            var accountState = this.getAccountState(stateInfo.state);
            if (response) {
                if ((stateInfo.requestType === Constants_1.Constants.renewToken) || response.accessToken) {
                    if (window.parent !== window) {
                        this.logger.verbose("Window is in iframe, acquiring token silently");
                    }
                    else {
                        this.logger.verbose("acquiring token interactive in progress");
                    }
                    response.tokenType = Constants_1.Constants.accessToken;
                }
                else if (stateInfo.requestType === Constants_1.Constants.login) {
                    response.tokenType = Constants_1.Constants.idToken;
                }
                if (!parentCallback) {
                    this.redirectSuccessHandler(response);
                    return;
                }
            }
            else if (!parentCallback) {
                this.redirectErrorHandler(authErr, AuthResponse_1.buildResponseStateOnly(accountState));
                return;
            }
            parentCallback(response, authErr);
        }
        catch (err) {
            this.logger.error("Error occurred in token received callback function: " + err);
            throw ClientAuthError_1.ClientAuthError.createErrorInCallbackFunction(err.toString());
        }
    };
    /**
     * @hidden
     * This method must be called for processing the response received from the STS. It extracts the hash, processes the token or error information and saves it in the cache. It then
     * calls the registered callbacks in case of redirect or resolves the promises with the result.
     * @param {string} [hash=window.location.hash] - Hash fragment of Url.
     */
    UserAgentApplication.prototype.handleAuthenticationResponse = function (hash) {
        // retrieve the hash
        if (hash == null) {
            hash = window.location.hash;
        }
        var self = null;
        var isPopup = false;
        var isWindowOpenerMsal = false;
        // Check if the current window opened the iFrame/popup
        try {
            isWindowOpenerMsal = window.opener && window.opener.msal && window.opener.msal !== window.msal;
        }
        catch (err) {
            // err = SecurityError: Blocked a frame with origin "[url]" from accessing a cross-origin frame.
            isWindowOpenerMsal = false;
        }
        // Set the self to the window that created the popup/iframe
        if (isWindowOpenerMsal) {
            self = window.opener.msal;
            isPopup = true;
        }
        else if (window.parent && window.parent.msal) {
            self = window.parent.msal;
        }
        // if (window.parent !== window), by using self, window.parent becomes equal to window in getResponseState method specifically
        var stateInfo = self.getResponseState(hash);
        var tokenResponseCallback = null;
        self.logger.info("Returned from redirect url");
        // If parent window is the msal instance which opened the current window (iframe)
        if (this.parentIsMsal()) {
            tokenResponseCallback = window.parent.callbackMappedToRenewStates[stateInfo.state];
        }
        // Current window is window opener (popup)
        else if (isWindowOpenerMsal) {
            tokenResponseCallback = window.opener.callbackMappedToRenewStates[stateInfo.state];
        }
        // Redirect cases
        else {
            tokenResponseCallback = null;
            // if set to navigate to loginRequest page post login
            if (self.config.auth.navigateToLoginRequestUrl) {
                self.cacheStorage.setItem(Constants_1.Constants.urlHash, hash);
                if (window.parent === window && !isPopup) {
                    window.location.href = self.cacheStorage.getItem(Constants_1.Constants.loginRequest, self.inCookie);
                }
                return;
            }
            else {
                window.location.hash = "";
            }
            if (!this.redirectCallbacksSet) {
                // We reached this point too early, return and come back later
                return;
            }
        }
        self.processCallBack(hash, stateInfo, tokenResponseCallback);
        // If current window is opener, close all windows
        if (isWindowOpenerMsal) {
            for (var i = 0; i < window.opener.openedWindows.length; i++) {
                window.opener.openedWindows[i].close();
            }
        }
    };
    /**
     * @hidden
     * Returns deserialized portion of URL hash
     * @param hash
     */
    UserAgentApplication.prototype.deserializeHash = function (hash) {
        hash = this.getHash(hash);
        return Utils_1.Utils.deserialize(hash);
    };
    /**
     * @hidden
     * Creates a stateInfo object from the URL fragment and returns it.
     * @param {string} hash  -  Hash passed from redirect page
     * @returns {TokenResponse} an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
     * @ignore
     */
    UserAgentApplication.prototype.getResponseState = function (hash) {
        var parameters = this.deserializeHash(hash);
        var stateResponse;
        if (!parameters) {
            throw AuthError_1.AuthError.createUnexpectedError("Hash was not parsed correctly.");
        }
        if (parameters.hasOwnProperty("state")) {
            stateResponse = {
                requestType: Constants_1.Constants.unknown,
                state: parameters.state,
                stateMatch: false
            };
        }
        else {
            throw AuthError_1.AuthError.createUnexpectedError("Hash does not contain state.");
        }
        // async calls can fire iframe and login request at the same time if developer does not use the API as expected
        // incoming callback needs to be looked up to find the request type
        // loginRedirect
        if (stateResponse.state === this.cacheStorage.getItem(Constants_1.Constants.stateLogin, this.inCookie) || stateResponse.state === this.silentAuthenticationState) { // loginRedirect
            stateResponse.requestType = Constants_1.Constants.login;
            stateResponse.stateMatch = true;
            return stateResponse;
        }
        // acquireTokenRedirect
        else if (stateResponse.state === this.cacheStorage.getItem(Constants_1.Constants.stateAcquireToken, this.inCookie)) { //acquireTokenRedirect
            stateResponse.requestType = Constants_1.Constants.renewToken;
            stateResponse.stateMatch = true;
            return stateResponse;
        }
        // external api requests may have many renewtoken requests for different resource
        if (!stateResponse.stateMatch) {
            stateResponse.requestType = window.requestType;
            var statesInParentContext = window.renewStates;
            for (var i = 0; i < statesInParentContext.length; i++) {
                if (statesInParentContext[i] === stateResponse.state) {
                    stateResponse.stateMatch = true;
                    break;
                }
            }
        }
        return stateResponse;
    };
    //#endregion
    //#region Token Processing (Extract to TokenProcessing.ts)
    /**
     * @hidden
     * Used to get token for the specified set of scopes from the cache
     * @param {@link ServerRequestParameters} - Request sent to the STS to obtain an id_token/access_token
     * @param {Account} account - Account for which the scopes were requested
     */
    UserAgentApplication.prototype.getCachedToken = function (serverAuthenticationRequest, account) {
        var accessTokenCacheItem = null;
        var scopes = serverAuthenticationRequest.scopes;
        // filter by clientId and account
        var tokenCacheItems = this.cacheStorage.getAllAccessTokens(this.clientId, account ? account.homeAccountIdentifier : null);
        // No match found after initial filtering
        if (tokenCacheItems.length === 0) {
            return null;
        }
        var filteredItems = [];
        // if no authority passed
        if (!serverAuthenticationRequest.authority) {
            // filter by scope
            for (var i = 0; i < tokenCacheItems.length; i++) {
                var cacheItem = tokenCacheItems[i];
                var cachedScopes = cacheItem.key.scopes.split(" ");
                if (Utils_1.Utils.containsScope(cachedScopes, scopes)) {
                    filteredItems.push(cacheItem);
                }
            }
            // if only one cached token found
            if (filteredItems.length === 1) {
                accessTokenCacheItem = filteredItems[0];
                serverAuthenticationRequest.authorityInstance = AuthorityFactory_1.AuthorityFactory.CreateInstance(accessTokenCacheItem.key.authority, this.config.auth.validateAuthority);
            }
            // if more than one cached token is found
            else if (filteredItems.length > 1) {
                throw ClientAuthError_1.ClientAuthError.createMultipleMatchingTokensInCacheError(scopes.toString());
            }
            // if no match found, check if there was a single authority used
            else {
                var authorityList = this.getUniqueAuthority(tokenCacheItems, "authority");
                if (authorityList.length > 1) {
                    throw ClientAuthError_1.ClientAuthError.createMultipleAuthoritiesInCacheError(scopes.toString());
                }
                serverAuthenticationRequest.authorityInstance = AuthorityFactory_1.AuthorityFactory.CreateInstance(authorityList[0], this.config.auth.validateAuthority);
            }
        }
        // if an authority is passed in the API
        else {
            // filter by authority and scope
            for (var i = 0; i < tokenCacheItems.length; i++) {
                var cacheItem = tokenCacheItems[i];
                var cachedScopes = cacheItem.key.scopes.split(" ");
                if (Utils_1.Utils.containsScope(cachedScopes, scopes) && Utils_1.Utils.CanonicalizeUri(cacheItem.key.authority) === serverAuthenticationRequest.authority) {
                    filteredItems.push(cacheItem);
                }
            }
            // no match
            if (filteredItems.length === 0) {
                return null;
            }
            // if only one cachedToken Found
            else if (filteredItems.length === 1) {
                accessTokenCacheItem = filteredItems[0];
            }
            else {
                // if more than cached token is found
                throw ClientAuthError_1.ClientAuthError.createMultipleMatchingTokensInCacheError(scopes.toString());
            }
        }
        if (accessTokenCacheItem != null) {
            var expired = Number(accessTokenCacheItem.value.expiresIn);
            // If expiration is within offset, it will force renew
            var offset = this.config.system.tokenRenewalOffsetSeconds || 300;
            if (expired && (expired > Utils_1.Utils.now() + offset)) {
                var idToken = new IdToken_1.IdToken(accessTokenCacheItem.value.idToken);
                if (!account) {
                    account = this.getAccount();
                    if (!account) {
                        throw AuthError_1.AuthError.createUnexpectedError("Account should not be null here.");
                    }
                }
                var aState = this.getAccountState(serverAuthenticationRequest.state);
                var response = {
                    uniqueId: "",
                    tenantId: "",
                    tokenType: (accessTokenCacheItem.value.idToken === accessTokenCacheItem.value.accessToken) ? Constants_1.Constants.idToken : Constants_1.Constants.accessToken,
                    idToken: idToken,
                    accessToken: accessTokenCacheItem.value.accessToken,
                    scopes: accessTokenCacheItem.key.scopes.split(" "),
                    expiresOn: new Date(expired * 1000),
                    account: account,
                    accountState: aState,
                };
                Utils_1.Utils.setResponseIdToken(response, idToken);
                return response;
            }
            else {
                this.cacheStorage.removeItem(JSON.stringify(filteredItems[0].key));
                return null;
            }
        }
        else {
            return null;
        }
    };
    /**
     * @hidden
     * Used to get a unique list of authoritues from the cache
     * @param {Array<AccessTokenCacheItem>}  accessTokenCacheItems - accessTokenCacheItems saved in the cache
     * @ignore
     */
    UserAgentApplication.prototype.getUniqueAuthority = function (accessTokenCacheItems, property) {
        var authorityList = [];
        var flags = [];
        accessTokenCacheItems.forEach(function (element) {
            if (element.key.hasOwnProperty(property) && (flags.indexOf(element.key[property]) === -1)) {
                flags.push(element.key[property]);
                authorityList.push(element.key[property]);
            }
        });
        return authorityList;
    };
    /**
     * @hidden
     * Check if ADAL id_token exists and return if exists.
     *
     */
    UserAgentApplication.prototype.extractADALIdToken = function () {
        var adalIdToken = this.cacheStorage.getItem(Constants_1.Constants.adalIdToken);
        if (!Utils_1.Utils.isEmpty(adalIdToken)) {
            return Utils_1.Utils.extractIdToken(adalIdToken);
        }
        return null;
    };
    /**
     * @hidden
     * Acquires access token using a hidden iframe.
     * @ignore
     */
    UserAgentApplication.prototype.renewToken = function (scopes, resolve, reject, account, serverAuthenticationRequest) {
        var scope = scopes.join(" ").toLowerCase();
        this.logger.verbose("renewToken is called for scope:" + scope);
        var frameHandle = this.addHiddenIFrame("msalRenewFrame" + scope);
        this.updateCacheEntries(serverAuthenticationRequest, account);
        this.logger.verbose("Renew token Expected state: " + serverAuthenticationRequest.state);
        // Build urlNavigate with "prompt=none" and navigate to URL in hidden iFrame
        var urlNavigate = Utils_1.Utils.urlRemoveQueryStringParameter(serverAuthenticationRequest.createNavigateUrl(scopes), Constants_1.Constants.prompt) + Constants_1.Constants.prompt_none;
        window.renewStates.push(serverAuthenticationRequest.state);
        window.requestType = Constants_1.Constants.renewToken;
        this.registerCallback(serverAuthenticationRequest.state, scope, resolve, reject);
        this.logger.infoPii("Navigate to:" + urlNavigate);
        frameHandle.src = "about:blank";
        this.loadIframeTimeout(urlNavigate, "msalRenewFrame" + scope, scope);
    };
    /**
     * @hidden
     * Renews idtoken for app"s own backend when clientId is passed as a single scope in the scopes array.
     * @ignore
     */
    UserAgentApplication.prototype.renewIdToken = function (scopes, resolve, reject, account, serverAuthenticationRequest) {
        this.logger.info("renewidToken is called");
        var frameHandle = this.addHiddenIFrame("msalIdTokenFrame");
        this.updateCacheEntries(serverAuthenticationRequest, account);
        this.logger.verbose("Renew Idtoken Expected state: " + serverAuthenticationRequest.state);
        // Build urlNavigate with "prompt=none" and navigate to URL in hidden iFrame
        var urlNavigate = Utils_1.Utils.urlRemoveQueryStringParameter(serverAuthenticationRequest.createNavigateUrl(scopes), Constants_1.Constants.prompt) + Constants_1.Constants.prompt_none;
        if (this.silentLogin) {
            window.requestType = Constants_1.Constants.login;
            this.silentAuthenticationState = serverAuthenticationRequest.state;
        }
        else {
            window.requestType = Constants_1.Constants.renewToken;
            window.renewStates.push(serverAuthenticationRequest.state);
        }
        // note: scope here is clientId
        this.registerCallback(serverAuthenticationRequest.state, this.clientId, resolve, reject);
        this.logger.infoPii("Navigate to:" + urlNavigate);
        frameHandle.src = "about:blank";
        this.loadIframeTimeout(urlNavigate, "msalIdTokenFrame", this.clientId);
    };
    /**
     * @hidden
     *
     * This method must be called for processing the response received from AAD. It extracts the hash, processes the token or error, saves it in the cache and calls the registered callbacks with the result.
     * @param {string} authority authority received in the redirect response from AAD.
     * @param {TokenResponse} requestInfo an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
     * @param {Account} account account object for which scopes are consented for. The default account is the logged in account.
     * @param {ClientInfo} clientInfo clientInfo received as part of the response comprising of fields uid and utid.
     * @param {IdToken} idToken idToken received as part of the response.
     * @ignore
     * @private
     */
    /* tslint:disable:no-string-literal */
    UserAgentApplication.prototype.saveAccessToken = function (response, authority, parameters, clientInfo) {
        var scope;
        var accessTokenResponse = tslib_1.__assign({}, response);
        var clientObj = new ClientInfo_1.ClientInfo(clientInfo);
        // if the response contains "scope"
        if (parameters.hasOwnProperty("scope")) {
            // read the scopes
            scope = parameters["scope"];
            var consentedScopes = scope.split(" ");
            // retrieve all access tokens from the cache, remove the dup scores
            var accessTokenCacheItems = this.cacheStorage.getAllAccessTokens(this.clientId, authority);
            for (var i = 0; i < accessTokenCacheItems.length; i++) {
                var accessTokenCacheItem = accessTokenCacheItems[i];
                if (accessTokenCacheItem.key.homeAccountIdentifier === response.account.homeAccountIdentifier) {
                    var cachedScopes = accessTokenCacheItem.key.scopes.split(" ");
                    if (Utils_1.Utils.isIntersectingScopes(cachedScopes, consentedScopes)) {
                        this.cacheStorage.removeItem(JSON.stringify(accessTokenCacheItem.key));
                    }
                }
            }
            // Generate and cache accessTokenKey and accessTokenValue
            var expiresIn = Utils_1.Utils.expiresIn(parameters[Constants_1.Constants.expiresIn]).toString();
            var accessTokenKey = new AccessTokenKey_1.AccessTokenKey(authority, this.clientId, scope, clientObj.uid, clientObj.utid);
            var accessTokenValue = new AccessTokenValue_1.AccessTokenValue(parameters[Constants_1.Constants.accessToken], response.idToken.rawIdToken, expiresIn, clientInfo);
            this.cacheStorage.setItem(JSON.stringify(accessTokenKey), JSON.stringify(accessTokenValue));
            accessTokenResponse.accessToken = parameters[Constants_1.Constants.accessToken];
            accessTokenResponse.scopes = consentedScopes;
            var exp = Number(expiresIn);
            if (exp) {
                accessTokenResponse.expiresOn = new Date((Utils_1.Utils.now() + exp) * 1000);
            }
            else {
                this.logger.error("Could not parse expiresIn parameter. Given value: " + expiresIn);
            }
        }
        // if the response does not contain "scope" - scope is usually client_id and the token will be id_token
        else {
            scope = this.clientId;
            // Generate and cache accessTokenKey and accessTokenValue
            var accessTokenKey = new AccessTokenKey_1.AccessTokenKey(authority, this.clientId, scope, clientObj.uid, clientObj.utid);
            var accessTokenValue = new AccessTokenValue_1.AccessTokenValue(parameters[Constants_1.Constants.idToken], parameters[Constants_1.Constants.idToken], response.idToken.expiration, clientInfo);
            this.cacheStorage.setItem(JSON.stringify(accessTokenKey), JSON.stringify(accessTokenValue));
            accessTokenResponse.scopes = [scope];
            accessTokenResponse.accessToken = parameters[Constants_1.Constants.idToken];
            var exp = Number(response.idToken.expiration);
            if (exp) {
                accessTokenResponse.expiresOn = new Date(exp * 1000);
            }
            else {
                this.logger.error("Could not parse expiresIn parameter");
            }
        }
        return accessTokenResponse;
    };
    /**
     * @hidden
     * Saves token or error received in the response from AAD in the cache. In case of id_token, it also creates the account object.
     * @ignore
     */
    UserAgentApplication.prototype.saveTokenFromHash = function (hash, stateInfo) {
        this.logger.info("State status:" + stateInfo.stateMatch + "; Request type:" + stateInfo.requestType);
        this.cacheStorage.setItem(Constants_1.Constants.msalError, "");
        this.cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, "");
        var response = {
            uniqueId: "",
            tenantId: "",
            tokenType: "",
            idToken: null,
            accessToken: null,
            scopes: [],
            expiresOn: null,
            account: null,
            accountState: "",
        };
        var error;
        var hashParams = this.deserializeHash(hash);
        var authorityKey = "";
        var acquireTokenAccountKey = "";
        // If server returns an error
        if (hashParams.hasOwnProperty(Constants_1.Constants.errorDescription) || hashParams.hasOwnProperty(Constants_1.Constants.error)) {
            this.logger.infoPii("Error :" + hashParams[Constants_1.Constants.error] + "; Error description:" + hashParams[Constants_1.Constants.errorDescription]);
            this.cacheStorage.setItem(Constants_1.Constants.msalError, hashParams[Constants_1.Constants.error]);
            this.cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, hashParams[Constants_1.Constants.errorDescription]);
            // login
            if (stateInfo.requestType === Constants_1.Constants.login) {
                this.loginInProgress = false;
                this.cacheStorage.setItem(Constants_1.Constants.loginError, hashParams[Constants_1.Constants.errorDescription] + ":" + hashParams[Constants_1.Constants.error]);
                authorityKey = Storage_1.Storage.generateAuthorityKey(stateInfo.state);
            }
            // acquireToken
            if (stateInfo.requestType === Constants_1.Constants.renewToken) {
                this.acquireTokenInProgress = false;
                authorityKey = Storage_1.Storage.generateAuthorityKey(stateInfo.state);
                var account = this.getAccount();
                var accountId = void 0;
                if (account && !Utils_1.Utils.isEmpty(account.homeAccountIdentifier)) {
                    accountId = account.homeAccountIdentifier;
                }
                else {
                    accountId = Constants_1.Constants.no_account;
                }
                acquireTokenAccountKey = Storage_1.Storage.generateAcquireTokenAccountKey(accountId, stateInfo.state);
            }
            if (this.isInteractionRequired(hashParams[Constants_1.Constants.errorDescription])) {
                error = new InteractionRequiredAuthError_1.InteractionRequiredAuthError(hashParams[Constants_1.Constants.error], hashParams[Constants_1.Constants.errorDescription]);
            }
            else {
                error = new ServerError_1.ServerError(hashParams[Constants_1.Constants.error], hashParams[Constants_1.Constants.errorDescription]);
            }
        }
        // If the server returns "Success"
        else {
            // Verify the state from redirect and record tokens to storage if exists
            if (stateInfo.stateMatch) {
                this.logger.info("State is right");
                if (hashParams.hasOwnProperty(Constants_1.Constants.sessionState)) {
                    this.cacheStorage.setItem(Constants_1.Constants.msalSessionState, hashParams[Constants_1.Constants.sessionState]);
                }
                response.accountState = this.getAccountState(stateInfo.state);
                var clientInfo = "";
                // Process access_token
                if (hashParams.hasOwnProperty(Constants_1.Constants.accessToken)) {
                    this.logger.info("Fragment has access token");
                    this.acquireTokenInProgress = false;
                    // retrieve the id_token from response if present :
                    if (hashParams.hasOwnProperty(Constants_1.Constants.idToken)) {
                        response.idToken = new IdToken_1.IdToken(hashParams[Constants_1.Constants.idToken]);
                    }
                    else {
                        response = Utils_1.Utils.setResponseIdToken(response, new IdToken_1.IdToken(this.cacheStorage.getItem(Constants_1.Constants.idTokenKey)));
                    }
                    // retrieve the authority from cache and replace with tenantID
                    var authorityKey_1 = Storage_1.Storage.generateAuthorityKey(stateInfo.state);
                    var authority = this.cacheStorage.getItem(authorityKey_1, this.inCookie);
                    if (!Utils_1.Utils.isEmpty(authority)) {
                        authority = Utils_1.Utils.replaceTenantPath(authority, response.tenantId);
                    }
                    // retrieve client_info - if it is not found, generate the uid and utid from idToken
                    if (hashParams.hasOwnProperty(Constants_1.Constants.clientInfo)) {
                        clientInfo = hashParams[Constants_1.Constants.clientInfo];
                    }
                    else {
                        this.logger.warning("ClientInfo not received in the response from AAD");
                        throw ClientAuthError_1.ClientAuthError.createClientInfoNotPopulatedError("ClientInfo not received in the response from the server");
                    }
                    response.account = Account_1.Account.createAccount(response.idToken, new ClientInfo_1.ClientInfo(clientInfo));
                    var accountKey = void 0;
                    if (response.account && !Utils_1.Utils.isEmpty(response.account.homeAccountIdentifier)) {
                        accountKey = response.account.homeAccountIdentifier;
                    }
                    else {
                        accountKey = Constants_1.Constants.no_account;
                    }
                    acquireTokenAccountKey = Storage_1.Storage.generateAcquireTokenAccountKey(accountKey, stateInfo.state);
                    var acquireTokenAccountKey_noaccount = Storage_1.Storage.generateAcquireTokenAccountKey(Constants_1.Constants.no_account, stateInfo.state);
                    var cachedAccount = this.cacheStorage.getItem(acquireTokenAccountKey);
                    var acquireTokenAccount = void 0;
                    // Check with the account in the Cache
                    if (!Utils_1.Utils.isEmpty(cachedAccount)) {
                        acquireTokenAccount = JSON.parse(cachedAccount);
                        if (response.account && acquireTokenAccount && Utils_1.Utils.compareAccounts(response.account, acquireTokenAccount)) {
                            response = this.saveAccessToken(response, authority, hashParams, clientInfo);
                            this.logger.info("The user object received in the response is the same as the one passed in the acquireToken request");
                        }
                        else {
                            this.logger.warning("The account object created from the response is not the same as the one passed in the acquireToken request");
                        }
                    }
                    else if (!Utils_1.Utils.isEmpty(this.cacheStorage.getItem(acquireTokenAccountKey_noaccount))) {
                        response = this.saveAccessToken(response, authority, hashParams, clientInfo);
                    }
                }
                // Process id_token
                if (hashParams.hasOwnProperty(Constants_1.Constants.idToken)) {
                    this.logger.info("Fragment has id token");
                    // login no longer in progress
                    this.loginInProgress = false;
                    response = Utils_1.Utils.setResponseIdToken(response, new IdToken_1.IdToken(hashParams[Constants_1.Constants.idToken]));
                    if (hashParams.hasOwnProperty(Constants_1.Constants.clientInfo)) {
                        clientInfo = hashParams[Constants_1.Constants.clientInfo];
                    }
                    else {
                        this.logger.warning("ClientInfo not received in the response from AAD");
                    }
                    authorityKey = Storage_1.Storage.generateAuthorityKey(stateInfo.state);
                    var authority = this.cacheStorage.getItem(authorityKey, this.inCookie);
                    if (!Utils_1.Utils.isEmpty(authority)) {
                        authority = Utils_1.Utils.replaceTenantPath(authority, response.idToken.tenantId);
                    }
                    this.account = Account_1.Account.createAccount(response.idToken, new ClientInfo_1.ClientInfo(clientInfo));
                    response.account = this.account;
                    if (response.idToken && response.idToken.nonce) {
                        // check nonce integrity if idToken has nonce - throw an error if not matched
                        if (response.idToken.nonce !== this.cacheStorage.getItem(Constants_1.Constants.nonceIdToken, this.inCookie)) {
                            this.account = null;
                            this.cacheStorage.setItem(Constants_1.Constants.loginError, "Nonce Mismatch. Expected Nonce: " + this.cacheStorage.getItem(Constants_1.Constants.nonceIdToken, this.inCookie) + "," + "Actual Nonce: " + response.idToken.nonce);
                            this.logger.error("Nonce Mismatch.Expected Nonce: " + this.cacheStorage.getItem(Constants_1.Constants.nonceIdToken, this.inCookie) + "," + "Actual Nonce: " + response.idToken.nonce);
                            error = ClientAuthError_1.ClientAuthError.createNonceMismatchError(this.cacheStorage.getItem(Constants_1.Constants.nonceIdToken, this.inCookie), response.idToken.nonce);
                        }
                        // Save the token
                        else {
                            this.cacheStorage.setItem(Constants_1.Constants.idTokenKey, hashParams[Constants_1.Constants.idToken]);
                            this.cacheStorage.setItem(Constants_1.Constants.msalClientInfo, clientInfo);
                            // Save idToken as access token for app itself
                            this.saveAccessToken(response, authority, hashParams, clientInfo);
                        }
                    }
                    else {
                        authorityKey = stateInfo.state;
                        acquireTokenAccountKey = stateInfo.state;
                        this.logger.error("Invalid id_token received in the response");
                        error = ClientAuthError_1.ClientAuthError.createInvalidIdTokenError(response.idToken);
                        this.cacheStorage.setItem(Constants_1.Constants.msalError, error.errorCode);
                        this.cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, error.errorMessage);
                    }
                }
            }
            // State mismatch - unexpected/invalid state
            else {
                authorityKey = stateInfo.state;
                acquireTokenAccountKey = stateInfo.state;
                var expectedState = this.cacheStorage.getItem(Constants_1.Constants.stateLogin, this.inCookie);
                this.logger.error("State Mismatch.Expected State: " + expectedState + "," + "Actual State: " + stateInfo.state);
                error = ClientAuthError_1.ClientAuthError.createInvalidStateError(stateInfo.state, expectedState);
                this.cacheStorage.setItem(Constants_1.Constants.msalError, error.errorCode);
                this.cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, error.errorMessage);
            }
        }
        this.cacheStorage.setItem(Constants_1.Constants.renewStatus + stateInfo.state, Constants_1.Constants.tokenRenewStatusCompleted);
        this.cacheStorage.removeAcquireTokenEntries();
        // this is required if navigateToLoginRequestUrl=false
        if (this.inCookie) {
            this.cacheStorage.setItemCookie(authorityKey, "", -1);
            this.cacheStorage.clearCookie();
        }
        if (error) {
            throw error;
        }
        if (!response) {
            throw AuthError_1.AuthError.createUnexpectedError("Response is null");
        }
        return response;
    };
    /* tslint:enable:no-string-literal */
    //#endregion
    //#region Account
    /**
     * Returns the signed in account (received from an account object created at the time of login) or null when no state is found
     * @returns {@link Account} account object stored in MSAL
     */
    UserAgentApplication.prototype.getAccount = function () {
        // if a session already exists, get the account from the session
        if (this.account) {
            return this.account;
        }
        // frame is used to get idToken and populate the account for the given session
        var rawIdToken = this.cacheStorage.getItem(Constants_1.Constants.idTokenKey);
        var rawClientInfo = this.cacheStorage.getItem(Constants_1.Constants.msalClientInfo);
        if (!Utils_1.Utils.isEmpty(rawIdToken) && !Utils_1.Utils.isEmpty(rawClientInfo)) {
            var idToken = new IdToken_1.IdToken(rawIdToken);
            var clientInfo = new ClientInfo_1.ClientInfo(rawClientInfo);
            this.account = Account_1.Account.createAccount(idToken, clientInfo);
            return this.account;
        }
        // if login not yet done, return null
        return null;
    };
    /**
     * @hidden
     *
     * Extracts state value from the accountState sent with the authentication request.
     * @returns {string} scope.
     * @ignore
     */
    UserAgentApplication.prototype.getAccountState = function (state) {
        if (state) {
            var splitIndex = state.indexOf("|");
            if (splitIndex > -1 && splitIndex + 1 < state.length) {
                return state.substring(splitIndex + 1);
            }
        }
        return state;
    };
    /**
     * Used to filter all cached items and return a list of unique accounts based on homeAccountIdentifier.
     *
     * @param {@link Array<Account>} Accounts - accounts saved in the cache.
     */
    UserAgentApplication.prototype.getAllAccounts = function () {
        var accounts = [];
        var accessTokenCacheItems = this.cacheStorage.getAllAccessTokens(Constants_1.Constants.clientId, Constants_1.Constants.homeAccountIdentifier);
        for (var i = 0; i < accessTokenCacheItems.length; i++) {
            var idToken = new IdToken_1.IdToken(accessTokenCacheItems[i].value.idToken);
            var clientInfo = new ClientInfo_1.ClientInfo(accessTokenCacheItems[i].value.homeAccountIdentifier);
            var account = Account_1.Account.createAccount(idToken, clientInfo);
            accounts.push(account);
        }
        return this.getUniqueAccounts(accounts);
    };
    /**
     * @hidden
     *
     * Used to filter accounts based on homeAccountIdentifier
     * @param {Array<Account>}  Accounts - accounts saved in the cache
     * @ignore
     */
    UserAgentApplication.prototype.getUniqueAccounts = function (accounts) {
        if (!accounts || accounts.length <= 1) {
            return accounts;
        }
        var flags = [];
        var uniqueAccounts = [];
        for (var index = 0; index < accounts.length; ++index) {
            if (accounts[index].homeAccountIdentifier && flags.indexOf(accounts[index].homeAccountIdentifier) === -1) {
                flags.push(accounts[index].homeAccountIdentifier);
                uniqueAccounts.push(accounts[index]);
            }
        }
        return uniqueAccounts;
    };
    //#endregion
    //#region Scopes (Extract to Scopes.ts)
    // Note: "this" dependency in this section is minimal.
    // If pCacheStorage is separated from the class object, or passed as a fn param, scopesUtils.ts can be created
    /**
     * @hidden
     *
     * Used to validate the scopes input parameter requested  by the developer.
     * @param {Array<string>} scopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @param {boolean} scopesRequired - Boolean indicating whether the scopes array is required or not
     * @ignore
     */
    UserAgentApplication.prototype.validateInputScope = function (scopes, scopesRequired) {
        if (!scopes) {
            if (scopesRequired) {
                throw ClientConfigurationError_1.ClientConfigurationError.createScopesRequiredError(scopes);
            }
            else {
                return;
            }
        }
        // Check that scopes is an array object (also throws error if scopes == null)
        if (!Array.isArray(scopes)) {
            throw ClientConfigurationError_1.ClientConfigurationError.createScopesNonArrayError(scopes);
        }
        // Check that scopes is not an empty array
        if (scopes.length < 1) {
            throw ClientConfigurationError_1.ClientConfigurationError.createEmptyScopesArrayError(scopes.toString());
        }
        // Check that clientId is passed as single scope
        if (scopes.indexOf(this.clientId) > -1) {
            if (scopes.length > 1) {
                throw ClientConfigurationError_1.ClientConfigurationError.createClientIdSingleScopeError(scopes.toString());
            }
        }
    };
    /**
     * @hidden
     *
     * Extracts scope value from the state sent with the authentication request.
     * @param {string} state
     * @returns {string} scope.
     * @ignore
     */
    UserAgentApplication.prototype.getScopeFromState = function (state) {
        if (state) {
            var splitIndex = state.indexOf("|");
            if (splitIndex > -1 && splitIndex + 1 < state.length) {
                return state.substring(splitIndex + 1);
            }
        }
        return "";
    };
    /**
     * @ignore
     * Appends extraScopesToConsent if passed
     * @param {@link AuthenticationParameters}
     */
    UserAgentApplication.prototype.appendScopes = function (request) {
        var scopes;
        if (request && request.scopes) {
            if (request.extraScopesToConsent) {
                scopes = request.scopes.concat(request.extraScopesToConsent);
            }
            else {
                scopes = request.scopes;
            }
        }
        return scopes;
    };
    //#endregion
    //#region Angular
    /**
     * @hidden
     *
     * Broadcast messages - Used only for Angular?  *
     * @param eventName
     * @param data
     */
    UserAgentApplication.prototype.broadcast = function (eventName, data) {
        var evt = new CustomEvent(eventName, { detail: data });
        window.dispatchEvent(evt);
    };
    /**
     * @hidden
     *
     * Helper function to retrieve the cached token
     *
     * @param scopes
     * @param {@link Account} account
     * @param state
     * @return {@link AuthResponse} AuthResponse
     */
    UserAgentApplication.prototype.getCachedTokenInternal = function (scopes, account, state) {
        // Get the current session's account object
        var accountObject = account || this.getAccount();
        if (!accountObject) {
            return null;
        }
        // Construct AuthenticationRequest based on response type
        var newAuthority = this.authorityInstance ? this.authorityInstance : AuthorityFactory_1.AuthorityFactory.CreateInstance(this.authority, this.config.auth.validateAuthority);
        var responseType = this.getTokenType(accountObject, scopes, true);
        var serverAuthenticationRequest = new ServerRequestParameters_1.ServerRequestParameters(newAuthority, this.clientId, scopes, responseType, this.getRedirectUri(), state);
        // get cached token
        return this.getCachedToken(serverAuthenticationRequest, account);
    };
    /**
     * @hidden
     *
     * Get scopes for the Endpoint - Used in Angular to track protected and unprotected resources without interaction from the developer app
     *
     * @param endpoint
     */
    UserAgentApplication.prototype.getScopesForEndpoint = function (endpoint) {
        // if user specified list of unprotectedResources, no need to send token to these endpoints, return null.
        if (this.config.framework.unprotectedResources.length > 0) {
            for (var i = 0; i < this.config.framework.unprotectedResources.length; i++) {
                if (endpoint.indexOf(this.config.framework.unprotectedResources[i]) > -1) {
                    return null;
                }
            }
        }
        // process all protected resources and send the matched one
        if (this.config.framework.protectedResourceMap.size > 0) {
            for (var _i = 0, _a = Array.from(this.config.framework.protectedResourceMap.keys()); _i < _a.length; _i++) {
                var key = _a[_i];
                // configEndpoint is like /api/Todo requested endpoint can be /api/Todo/1
                if (endpoint.indexOf(key) > -1) {
                    return this.config.framework.protectedResourceMap.get(key);
                }
            }
        }
        // default resource will be clientid if nothing specified
        // App will use idtoken for calls to itself
        // check if it's staring from http or https, needs to match with app host
        if (endpoint.indexOf("http://") > -1 || endpoint.indexOf("https://") > -1) {
            if (this.getHostFromUri(endpoint) === this.getHostFromUri(this.getRedirectUri())) {
                return new Array(this.clientId);
            }
        }
        else {
            // in angular level, the url for $http interceptor call could be relative url,
            // if it's relative call, we'll treat it as app backend call.
            return new Array(this.clientId);
        }
        // if not the app's own backend or not a domain listed in the endpoints structure
        return null;
    };
    /**
     * Return boolean flag to developer to help inform if login is in progress
     * @returns {boolean} true/false
     */
    UserAgentApplication.prototype.getLoginInProgress = function () {
        var pendingCallback = this.cacheStorage.getItem(Constants_1.Constants.urlHash);
        if (pendingCallback) {
            return true;
        }
        return this.loginInProgress;
    };
    /**
     * @hidden
     * @ignore
     *
     * @param loginInProgress
     */
    UserAgentApplication.prototype.setloginInProgress = function (loginInProgress) {
        this.loginInProgress = loginInProgress;
    };
    /**
     * @hidden
     * @ignore
     *
     * returns the status of acquireTokenInProgress
     */
    UserAgentApplication.prototype.getAcquireTokenInProgress = function () {
        return this.acquireTokenInProgress;
    };
    /**
     * @hidden
     * @ignore
     *
     * @param acquireTokenInProgress
     */
    UserAgentApplication.prototype.setAcquireTokenInProgress = function (acquireTokenInProgress) {
        this.acquireTokenInProgress = acquireTokenInProgress;
    };
    /**
     * @hidden
     * @ignore
     *
     * returns the logger handle
     */
    UserAgentApplication.prototype.getLogger = function () {
        return this.config.system.logger;
    };
    //#endregion
    //#region Getters and Setters
    /**
     *
     * Use to get the redirect uri configured in MSAL or null.
     * Evaluates redirectUri if its a function, otherwise simply returns its value.
     * @returns {string} redirect URL
     *
     */
    UserAgentApplication.prototype.getRedirectUri = function () {
        if (typeof this.config.auth.redirectUri === "function") {
            return this.config.auth.redirectUri();
        }
        return this.config.auth.redirectUri;
    };
    /**
     * Use to get the post logout redirect uri configured in MSAL or null.
     * Evaluates postLogoutredirectUri if its a function, otherwise simply returns its value.
     *
     * @returns {string} post logout redirect URL
     */
    UserAgentApplication.prototype.getPostLogoutRedirectUri = function () {
        if (typeof this.config.auth.postLogoutRedirectUri === "function") {
            return this.config.auth.postLogoutRedirectUri();
        }
        return this.config.auth.postLogoutRedirectUri;
    };
    /**
     * Use to get the current {@link Configuration} object in MSAL
     *
     * @returns {@link Configuration}
     */
    UserAgentApplication.prototype.getCurrentConfiguration = function () {
        if (!this.config) {
            throw ClientConfigurationError_1.ClientConfigurationError.createNoSetConfigurationError();
        }
        return this.config;
    };
    //#endregion
    //#region String Util (Should be extracted to Utils.ts)
    /**
     * @hidden
     * @ignore
     *
     * Returns the anchor part(#) of the URL
     */
    UserAgentApplication.prototype.getHash = function (hash) {
        if (hash.indexOf("#/") > -1) {
            hash = hash.substring(hash.indexOf("#/") + 2);
        }
        else if (hash.indexOf("#") > -1) {
            hash = hash.substring(1);
        }
        return hash;
    };
    /**
     * @hidden
     * @ignore
     *
     * extract URI from the host
     *
     * @param {string} URI
     * @returns {string} host from the URI
     */
    UserAgentApplication.prototype.getHostFromUri = function (uri) {
        // remove http:// or https:// from uri
        var extractedUri = String(uri).replace(/^(https?:)\/\//, "");
        extractedUri = extractedUri.split("/")[0];
        return extractedUri;
    };
    /**
     * @hidden
     * @ignore
     *
     * Utils function to create the Authentication
     * @param {@link account} account object
     * @param scopes
     * @param silentCall
     *
     * @returns {string} token type: id_token or access_token
     *
     */
    UserAgentApplication.prototype.getTokenType = function (accountObject, scopes, silentCall) {
        // if account is passed and matches the account object/or set to getAccount() from cache
        // if client-id is passed as scope, get id_token else token/id_token_token (in case no session exists)
        var tokenType;
        // acquireTokenSilent
        if (silentCall) {
            if (Utils_1.Utils.compareAccounts(accountObject, this.getAccount())) {
                tokenType = (scopes.indexOf(this.config.auth.clientId) > -1) ? ResponseTypes.id_token : ResponseTypes.token;
            }
            else {
                tokenType = (scopes.indexOf(this.config.auth.clientId) > -1) ? ResponseTypes.id_token : ResponseTypes.id_token_token;
            }
            return tokenType;
        }
        // all other cases
        else {
            if (!Utils_1.Utils.compareAccounts(accountObject, this.getAccount())) {
                tokenType = ResponseTypes.id_token_token;
            }
            else {
                tokenType = (scopes.indexOf(this.clientId) > -1) ? ResponseTypes.id_token : ResponseTypes.token;
            }
            return tokenType;
        }
    };
    /**
     * @hidden
     * @ignore
     *
     * Sets the cachekeys for and stores the account information in cache
     * @param account
     * @param state
     * @hidden
     */
    UserAgentApplication.prototype.setAccountCache = function (account, state) {
        // Cache acquireTokenAccountKey
        var accountId = account ? this.getAccountId(account) : Constants_1.Constants.no_account;
        var acquireTokenAccountKey = Storage_1.Storage.generateAcquireTokenAccountKey(accountId, state);
        this.cacheStorage.setItem(acquireTokenAccountKey, JSON.stringify(account));
    };
    /**
     * @hidden
     * @ignore
     *
     * Sets the cacheKey for and stores the authority information in cache
     * @param state
     * @param authority
     * @hidden
     */
    UserAgentApplication.prototype.setAuthorityCache = function (state, authority) {
        // Cache authorityKey
        var authorityKey = Storage_1.Storage.generateAuthorityKey(state);
        this.cacheStorage.setItem(authorityKey, Utils_1.Utils.CanonicalizeUri(authority), this.inCookie);
    };
    /**
     * Updates account, authority, and nonce in cache
     * @param serverAuthenticationRequest
     * @param account
     * @hidden
     * @ignore
     */
    UserAgentApplication.prototype.updateCacheEntries = function (serverAuthenticationRequest, account, loginStartPage) {
        // Cache account and authority
        if (loginStartPage) {
            // Cache the state, nonce, and login request data
            this.cacheStorage.setItem(Constants_1.Constants.loginRequest, loginStartPage, this.inCookie);
            this.cacheStorage.setItem(Constants_1.Constants.loginError, "");
            this.cacheStorage.setItem(Constants_1.Constants.stateLogin, serverAuthenticationRequest.state, this.inCookie);
            this.cacheStorage.setItem(Constants_1.Constants.nonceIdToken, serverAuthenticationRequest.nonce, this.inCookie);
            this.cacheStorage.setItem(Constants_1.Constants.msalError, "");
            this.cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, "");
        }
        else {
            this.setAccountCache(account, serverAuthenticationRequest.state);
        }
        // Cache authorityKey
        this.setAuthorityCache(serverAuthenticationRequest.state, serverAuthenticationRequest.authority);
        // Cache nonce
        this.cacheStorage.setItem(Constants_1.Constants.nonceIdToken, serverAuthenticationRequest.nonce, this.inCookie);
    };
    /**
     * Returns the unique identifier for the logged in account
     * @param account
     * @hidden
     * @ignore
     */
    UserAgentApplication.prototype.getAccountId = function (account) {
        //return `${account.accountIdentifier}` + Constants.resourceDelimiter + `${account.homeAccountIdentifier}`;
        var accountId;
        if (!Utils_1.Utils.isEmpty(account.homeAccountIdentifier)) {
            accountId = account.homeAccountIdentifier;
        }
        else {
            accountId = Constants_1.Constants.no_account;
        }
        return accountId;
    };
    /**
     * @hidden
     * @ignore
     *
     * Construct 'tokenRequest' from the available data in adalIdToken
     * @param extraQueryParameters
     * @hidden
     */
    UserAgentApplication.prototype.buildIDTokenRequest = function (request) {
        var tokenRequest = {
            scopes: [this.clientId],
            authority: this.authority,
            account: this.getAccount(),
            extraQueryParameters: request.extraQueryParameters
        };
        return tokenRequest;
    };
    /**
     * @hidden
     * @ignore
     *
     * Utility to populate QueryParameters and ExtraQueryParameters to ServerRequestParamerers
     * @param request
     * @param serverAuthenticationRequest
     */
    UserAgentApplication.prototype.populateQueryParams = function (account, request, serverAuthenticationRequest, adalIdTokenObject) {
        var queryParameters = {};
        if (request) {
            // add the prompt parameter to serverRequestParameters if passed
            if (request.prompt) {
                this.validatePromptParameter(request.prompt);
                serverAuthenticationRequest.promptValue = request.prompt;
            }
            // Add claims challenge to serverRequestParameters if passed
            if (request.claimsRequest) {
                AuthenticationParameters_1.validateClaimsRequest(request);
                serverAuthenticationRequest.claimsValue = request.claimsRequest;
            }
            // if the developer provides one of these, give preference to developer choice
            if (Utils_1.Utils.isSSOParam(request)) {
                queryParameters = Utils_1.Utils.constructUnifiedCacheQueryParameter(request, null);
            }
        }
        if (adalIdTokenObject) {
            queryParameters = Utils_1.Utils.constructUnifiedCacheQueryParameter(null, adalIdTokenObject);
        }
        // adds sid/login_hint if not populated; populates domain_req, login_req and domain_hint
        this.logger.verbose("Calling addHint parameters");
        queryParameters = this.addHintParameters(account, queryParameters, serverAuthenticationRequest);
        // sanity check for developer passed extraQueryParameters
        var eQParams;
        if (request) {
            eQParams = this.sanitizeEQParams(request);
        }
        // Populate the extraQueryParameters to be sent to the server
        serverAuthenticationRequest.queryParameters = Utils_1.Utils.generateQueryParametersString(queryParameters);
        serverAuthenticationRequest.extraQueryParameters = Utils_1.Utils.generateQueryParametersString(eQParams);
        return serverAuthenticationRequest;
    };
    /**
     * @hidden
     * @ignore
     *
     * Utility to test if valid prompt value is passed in the request
     * @param request
     */
    UserAgentApplication.prototype.validatePromptParameter = function (prompt) {
        if (!([Constants_1.PromptState.LOGIN, Constants_1.PromptState.SELECT_ACCOUNT, Constants_1.PromptState.CONSENT, Constants_1.PromptState.NONE].indexOf(prompt) >= 0)) {
            throw ClientConfigurationError_1.ClientConfigurationError.createInvalidPromptError(prompt);
        }
    };
    /**
     * @hidden
     * @ignore
  
     * Removes unnecessary or duplicate query parameters from extraQueryParameters
     * @param request
     */
    UserAgentApplication.prototype.sanitizeEQParams = function (request) {
        var eQParams = request.extraQueryParameters;
        if (!eQParams) {
            return null;
        }
        if (request.claimsRequest) {
            this.logger.warning("Removed duplicate claims from extraQueryParameters. Please use either the claimsRequest field OR pass as extraQueryParameter - not both.");
            delete eQParams[Constants_1.Constants.claims];
        }
        delete eQParams[Constants_1.SSOTypes.SID];
        delete eQParams[Constants_1.SSOTypes.LOGIN_HINT];
        return eQParams;
    };
    tslib_1.__decorate([
        resolveTokenOnlyIfOutOfIframe
    ], UserAgentApplication.prototype, "acquireTokenSilent", null);
    return UserAgentApplication;
}());
exports.UserAgentApplication = UserAgentApplication;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
/**
 * accountIdentifier       combination of idToken.uid and idToken.utid
 * homeAccountIdentifier   combination of clientInfo.uid and clientInfo.utid
 * userName                idToken.preferred_username
 * name                    idToken.name
 * idToken                 idToken
 * sid                     idToken.sid - session identifier
 * environment             idtoken.issuer (the authority that issues the token)
 */
var Account = /** @class */ (function () {
    /**
     * Creates an Account Object
     * @praram accountIdentifier
     * @param homeAccountIdentifier
     * @param userName
     * @param name
     * @param idToken
     * @param sid
     * @param environment
     */
    function Account(accountIdentifier, homeAccountIdentifier, userName, name, idToken, sid, environment) {
        this.accountIdentifier = accountIdentifier;
        this.homeAccountIdentifier = homeAccountIdentifier;
        this.userName = userName;
        this.name = name;
        this.idToken = idToken;
        this.sid = sid;
        this.environment = environment;
    }
    /**
     * @hidden
     * @param idToken
     * @param clientInfo
     */
    Account.createAccount = function (idToken, clientInfo) {
        // create accountIdentifier
        var accountIdentifier = idToken.objectId || idToken.subject;
        // create homeAccountIdentifier
        var uid = clientInfo ? clientInfo.uid : "";
        var utid = clientInfo ? clientInfo.utid : "";
        var homeAccountIdentifier;
        if (!Utils_1.Utils.isEmpty(uid) && !Utils_1.Utils.isEmpty(utid)) {
            homeAccountIdentifier = Utils_1.Utils.base64EncodeStringUrlSafe(uid) + "." + Utils_1.Utils.base64EncodeStringUrlSafe(utid);
        }
        return new Account(accountIdentifier, homeAccountIdentifier, idToken.preferredName, idToken.name, idToken.decodedIdToken, idToken.sid, idToken.issuer);
    };
    return Account;
}());
exports.Account = Account;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var Authority_1 = __webpack_require__(6);
var XHRClient_1 = __webpack_require__(12);
/**
 * @hidden
 */
var AadAuthority = /** @class */ (function (_super) {
    tslib_1.__extends(AadAuthority, _super);
    function AadAuthority(authority, validateAuthority) {
        return _super.call(this, authority, validateAuthority) || this;
    }
    Object.defineProperty(AadAuthority.prototype, "AadInstanceDiscoveryEndpointUrl", {
        get: function () {
            return AadAuthority.AadInstanceDiscoveryEndpoint + "?api-version=1.0&authorization_endpoint=" + this.CanonicalAuthority + "oauth2/v2.0/authorize";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AadAuthority.prototype, "AuthorityType", {
        get: function () {
            return Authority_1.AuthorityType.Aad;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a promise which resolves to the OIDC endpoint
     * Only responds with the endpoint
     */
    AadAuthority.prototype.GetOpenIdConfigurationEndpointAsync = function () {
        var _this = this;
        var resultPromise = new Promise(function (resolve, reject) {
            return resolve(_this.DefaultOpenIdConfigurationEndpoint);
        });
        if (!this.IsValidationEnabled) {
            return resultPromise;
        }
        var host = this.CanonicalAuthorityUrlComponents.HostNameAndPort;
        if (this.IsInTrustedHostList(host)) {
            return resultPromise;
        }
        var client = new XHRClient_1.XhrClient();
        return client.sendRequestAsync(this.AadInstanceDiscoveryEndpointUrl, "GET", true)
            .then(function (response) {
            return response.tenant_discovery_endpoint;
        });
    };
    /**
     * Checks to see if the host is in a list of trusted hosts
     * @param {string} The host to look up
     */
    AadAuthority.prototype.IsInTrustedHostList = function (host) {
        return AadAuthority.TrustedHostList[host.toLowerCase()];
    };
    AadAuthority.AadInstanceDiscoveryEndpoint = "https://login.microsoftonline.com/common/discovery/instance";
    AadAuthority.TrustedHostList = {
        "login.windows.net": "login.windows.net",
        "login.chinacloudapi.cn": "login.chinacloudapi.cn",
        "login.cloudgovapi.us": "login.cloudgovapi.us",
        "login.microsoftonline.com": "login.microsoftonline.com",
        "login.microsoftonline.de": "login.microsoftonline.de",
        "login.microsoftonline.us": "login.microsoftonline.us"
    };
    return AadAuthority;
}(Authority_1.Authority));
exports.AadAuthority = AadAuthority;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * XHR client for JSON endpoints
 * https://www.npmjs.com/package/async-promise
 * @hidden
 */
var XhrClient = /** @class */ (function () {
    function XhrClient() {
    }
    XhrClient.prototype.sendRequestAsync = function (url, method, enableCaching) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, /*async: */ true);
            if (enableCaching) {
                // TODO: (shivb) ensure that this can be cached
                // xhr.setRequestHeader("Cache-Control", "Public");
            }
            xhr.onload = function (ev) {
                if (xhr.status < 200 || xhr.status >= 300) {
                    reject(_this.handleError(xhr.responseText));
                }
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                }
                catch (e) {
                    reject(_this.handleError(xhr.responseText));
                }
                resolve(jsonResponse);
            };
            xhr.onerror = function (ev) {
                reject(xhr.status);
            };
            if (method === "GET") {
                xhr.send();
            }
            else {
                throw "not implemented";
            }
        });
    };
    XhrClient.prototype.handleError = function (responseText) {
        var jsonResponse;
        try {
            jsonResponse = JSON.parse(responseText);
            if (jsonResponse.error) {
                return jsonResponse.error;
            }
            else {
                throw responseText;
            }
        }
        catch (e) {
            return responseText;
        }
    };
    return XhrClient;
}());
exports.XhrClient = XhrClient;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var Logger_1 = __webpack_require__(7);
var Utils_1 = __webpack_require__(0);
/**
 * Defaults for the Configuration Options
 */
var FRAME_TIMEOUT = 6000;
var OFFSET = 300;
var NAVIGATE_FRAME_WAIT = 500;
var DEFAULT_AUTH_OPTIONS = {
    clientId: "",
    authority: null,
    validateAuthority: true,
    redirectUri: function () { return Utils_1.Utils.getDefaultRedirectUri(); },
    postLogoutRedirectUri: function () { return Utils_1.Utils.getDefaultRedirectUri(); },
    navigateToLoginRequestUrl: true
};
var DEFAULT_CACHE_OPTIONS = {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
};
var DEFAULT_SYSTEM_OPTIONS = {
    logger: new Logger_1.Logger(null),
    loadFrameTimeout: FRAME_TIMEOUT,
    tokenRenewalOffsetSeconds: OFFSET,
    navigateFrameWait: NAVIGATE_FRAME_WAIT
};
var DEFAULT_FRAMEWORK_OPTIONS = {
    isAngular: false,
    unprotectedResources: new Array(),
    protectedResourceMap: new Map()
};
/**
 * Function to set the default options when not explicitly set
 *
 * @param TAuthOptions
 * @param TCacheOptions
 * @param TSystemOptions
 * @param TFrameworkOptions
 *
 * @returns TConfiguration object
 */
// destructure with default settings
function buildConfiguration(_a) {
    var auth = _a.auth, _b = _a.cache, cache = _b === void 0 ? {} : _b, _c = _a.system, system = _c === void 0 ? {} : _c, _d = _a.framework, framework = _d === void 0 ? {} : _d;
    var overlayedConfig = {
        auth: tslib_1.__assign({}, DEFAULT_AUTH_OPTIONS, auth),
        cache: tslib_1.__assign({}, DEFAULT_CACHE_OPTIONS, cache),
        system: tslib_1.__assign({}, DEFAULT_SYSTEM_OPTIONS, system),
        framework: tslib_1.__assign({}, DEFAULT_FRAMEWORK_OPTIONS, framework)
    };
    return overlayedConfig;
}
exports.buildConfiguration = buildConfiguration;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var ClientConfigurationError_1 = __webpack_require__(3);
function validateClaimsRequest(request) {
    if (!request.claimsRequest) {
        return;
    }
    var claims;
    try {
        claims = JSON.parse(request.claimsRequest);
    }
    catch (e) {
        throw ClientConfigurationError_1.ClientConfigurationError.createClaimsRequestParsingError(e);
    }
    // TODO: More validation will be added when the server team tells us how they have actually implemented claims
}
exports.validateClaimsRequest = validateClaimsRequest;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var ServerError_1 = __webpack_require__(8);
exports.InteractionRequiredAuthErrorMessage = {
    loginRequired: {
        code: "login_required"
    },
    interactionRequired: {
        code: "interaction_required"
    },
    consentRequired: {
        code: "consent_required"
    },
};
/**
 * Error thrown when the user is required to perform an interactive token request.
 */
var InteractionRequiredAuthError = /** @class */ (function (_super) {
    tslib_1.__extends(InteractionRequiredAuthError, _super);
    function InteractionRequiredAuthError(errorCode, errorMessage) {
        var _this = _super.call(this, errorCode, errorMessage) || this;
        _this.name = "InteractionRequiredAuthError";
        Object.setPrototypeOf(_this, InteractionRequiredAuthError.prototype);
        return _this;
    }
    InteractionRequiredAuthError.createLoginRequiredAuthError = function (errorDesc) {
        return new InteractionRequiredAuthError(exports.InteractionRequiredAuthErrorMessage.loginRequired.code, errorDesc);
    };
    InteractionRequiredAuthError.createInteractionRequiredAuthError = function (errorDesc) {
        return new InteractionRequiredAuthError(exports.InteractionRequiredAuthErrorMessage.interactionRequired.code, errorDesc);
    };
    InteractionRequiredAuthError.createConsentRequiredAuthError = function (errorDesc) {
        return new InteractionRequiredAuthError(exports.InteractionRequiredAuthErrorMessage.consentRequired.code, errorDesc);
    };
    return InteractionRequiredAuthError;
}(ServerError_1.ServerError));
exports.InteractionRequiredAuthError = InteractionRequiredAuthError;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
function buildResponseStateOnly(state) {
    return {
        uniqueId: "",
        tenantId: "",
        tokenType: "",
        idToken: null,
        accessToken: "",
        scopes: null,
        expiresOn: null,
        account: null,
        accountState: state
    };
}
exports.buildResponseStateOnly = buildResponseStateOnly;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UserAgentApplication_1 = __webpack_require__(9);
exports.UserAgentApplication = UserAgentApplication_1.UserAgentApplication;
var Logger_1 = __webpack_require__(7);
exports.Logger = Logger_1.Logger;
var Logger_2 = __webpack_require__(7);
exports.LogLevel = Logger_2.LogLevel;
var Account_1 = __webpack_require__(10);
exports.Account = Account_1.Account;
var Constants_1 = __webpack_require__(2);
exports.Constants = Constants_1.Constants;
var Authority_1 = __webpack_require__(6);
exports.Authority = Authority_1.Authority;
var UserAgentApplication_2 = __webpack_require__(9);
exports.CacheResult = UserAgentApplication_2.CacheResult;
var Configuration_1 = __webpack_require__(13);
exports.CacheLocation = Configuration_1.CacheLocation;
exports.Configuration = Configuration_1.Configuration;
var AuthenticationParameters_1 = __webpack_require__(14);
exports.AuthenticationParameters = AuthenticationParameters_1.AuthenticationParameters;
var AuthResponse_1 = __webpack_require__(16);
exports.AuthResponse = AuthResponse_1.AuthResponse;
// Errors
var AuthError_1 = __webpack_require__(5);
exports.AuthError = AuthError_1.AuthError;
var ClientAuthError_1 = __webpack_require__(4);
exports.ClientAuthError = ClientAuthError_1.ClientAuthError;
var ServerError_1 = __webpack_require__(8);
exports.ServerError = ServerError_1.ServerError;
var ClientConfigurationError_1 = __webpack_require__(3);
exports.ClientConfigurationError = ClientConfigurationError_1.ClientConfigurationError;
var InteractionRequiredAuthError_1 = __webpack_require__(15);
exports.InteractionRequiredAuthError = InteractionRequiredAuthError_1.InteractionRequiredAuthError;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
/**
 * @hidden
 */
var AccessTokenKey = /** @class */ (function () {
    function AccessTokenKey(authority, clientId, scopes, uid, utid) {
        this.authority = Utils_1.Utils.CanonicalizeUri(authority);
        this.clientId = clientId;
        this.scopes = scopes;
        this.homeAccountIdentifier = Utils_1.Utils.base64EncodeStringUrlSafe(uid) + "." + Utils_1.Utils.base64EncodeStringUrlSafe(utid);
    }
    return AccessTokenKey;
}());
exports.AccessTokenKey = AccessTokenKey;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var AccessTokenValue = /** @class */ (function () {
    function AccessTokenValue(accessToken, idToken, expiresIn, homeAccountIdentifier) {
        this.accessToken = accessToken;
        this.idToken = idToken;
        this.expiresIn = expiresIn;
        this.homeAccountIdentifier = homeAccountIdentifier;
    }
    return AccessTokenValue;
}());
exports.AccessTokenValue = AccessTokenValue;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
/**
 * Nonce: OIDC Nonce definition: https://openid.net/specs/openid-connect-core-1_0.html#IDToken
 * State: OAuth Spec: https://tools.ietf.org/html/rfc6749#section-10.12
 * @hidden
 */
var ServerRequestParameters = /** @class */ (function () {
    /**
     * Constructor
     * @param authority
     * @param clientId
     * @param scope
     * @param responseType
     * @param redirectUri
     * @param state
     */
    function ServerRequestParameters(authority, clientId, scope, responseType, redirectUri, state) {
        this.authorityInstance = authority;
        this.clientId = clientId;
        this.scopes = scope;
        this.nonce = Utils_1.Utils.createNewGuid();
        this.state = state && !Utils_1.Utils.isEmpty(state) ? Utils_1.Utils.createNewGuid() + "|" + state : Utils_1.Utils.createNewGuid();
        // TODO: Change this to user passed vs generated with the new PR
        this.correlationId = Utils_1.Utils.createNewGuid();
        // telemetry information
        this.xClientSku = "MSAL.JS";
        this.xClientVer = Utils_1.Utils.getLibraryVersion();
        this.responseType = responseType;
        this.redirectUri = redirectUri;
    }
    Object.defineProperty(ServerRequestParameters.prototype, "authority", {
        get: function () {
            return this.authorityInstance ? this.authorityInstance.CanonicalAuthority : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * generates the URL with QueryString Parameters
     * @param scopes
     */
    ServerRequestParameters.prototype.createNavigateUrl = function (scopes) {
        var str = this.createNavigationUrlString(scopes);
        var authEndpoint = this.authorityInstance.AuthorizationEndpoint;
        // if the endpoint already has queryparams, lets add to it, otherwise add the first one
        if (authEndpoint.indexOf("?") < 0) {
            authEndpoint += "?";
        }
        else {
            authEndpoint += "&";
        }
        var requestUrl = "" + authEndpoint + str.join("&");
        return requestUrl;
    };
    /**
     * Generate the array of all QueryStringParams to be sent to the server
     * @param scopes
     */
    ServerRequestParameters.prototype.createNavigationUrlString = function (scopes) {
        if (!scopes) {
            scopes = [this.clientId];
        }
        if (scopes.indexOf(this.clientId) === -1) {
            scopes.push(this.clientId);
        }
        var str = [];
        str.push("response_type=" + this.responseType);
        this.translateclientIdUsedInScope(scopes);
        str.push("scope=" + encodeURIComponent(this.parseScope(scopes)));
        str.push("client_id=" + encodeURIComponent(this.clientId));
        str.push("redirect_uri=" + encodeURIComponent(this.redirectUri));
        str.push("state=" + encodeURIComponent(this.state));
        str.push("nonce=" + encodeURIComponent(this.nonce));
        str.push("client_info=1");
        str.push("x-client-SKU=" + this.xClientSku);
        str.push("x-client-Ver=" + this.xClientVer);
        if (this.promptValue) {
            str.push("prompt=" + encodeURIComponent(this.promptValue));
        }
        if (this.claimsValue) {
            str.push("claims=" + encodeURIComponent(this.claimsValue));
        }
        if (this.queryParameters) {
            str.push(this.queryParameters);
        }
        if (this.extraQueryParameters) {
            str.push(this.extraQueryParameters);
        }
        str.push("client-request-id=" + encodeURIComponent(this.correlationId));
        return str;
    };
    /**
     * append the required scopes: https://openid.net/specs/openid-connect-basic-1_0.html#Scopes
     * @param scopes
     */
    ServerRequestParameters.prototype.translateclientIdUsedInScope = function (scopes) {
        var clientIdIndex = scopes.indexOf(this.clientId);
        if (clientIdIndex >= 0) {
            scopes.splice(clientIdIndex, 1);
            if (scopes.indexOf("openid") === -1) {
                scopes.push("openid");
            }
            if (scopes.indexOf("profile") === -1) {
                scopes.push("profile");
            }
        }
    };
    /**
     * Parse the scopes into a formatted scopeList
     * @param scopes
     */
    ServerRequestParameters.prototype.parseScope = function (scopes) {
        var scopeList = "";
        if (scopes) {
            for (var i = 0; i < scopes.length; ++i) {
                scopeList += (i !== scopes.length - 1) ? scopes[i] + " " : scopes[i];
            }
        }
        return scopeList;
    };
    return ServerRequestParameters;
}());
exports.ServerRequestParameters = ServerRequestParameters;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
var ClientAuthError_1 = __webpack_require__(4);
/**
 * @hidden
 */
var ClientInfo = /** @class */ (function () {
    function ClientInfo(rawClientInfo) {
        if (!rawClientInfo || Utils_1.Utils.isEmpty(rawClientInfo)) {
            this.uid = "";
            this.utid = "";
            return;
        }
        try {
            var decodedClientInfo = Utils_1.Utils.base64DecodeStringUrlSafe(rawClientInfo);
            var clientInfo = JSON.parse(decodedClientInfo);
            if (clientInfo) {
                if (clientInfo.hasOwnProperty("uid")) {
                    this.uid = clientInfo.uid;
                }
                if (clientInfo.hasOwnProperty("utid")) {
                    this.utid = clientInfo.utid;
                }
            }
        }
        catch (e) {
            throw ClientAuthError_1.ClientAuthError.createClientInfoDecodingError(e);
        }
    }
    Object.defineProperty(ClientInfo.prototype, "uid", {
        get: function () {
            return this._uid ? this._uid : "";
        },
        set: function (uid) {
            this._uid = uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientInfo.prototype, "utid", {
        get: function () {
            return this._utid ? this._utid : "";
        },
        set: function (utid) {
            this._utid = utid;
        },
        enumerable: true,
        configurable: true
    });
    return ClientInfo;
}());
exports.ClientInfo = ClientInfo;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
var ClientAuthError_1 = __webpack_require__(4);
/**
 * @hidden
 */
var IdToken = /** @class */ (function () {
    /* tslint:disable:no-string-literal */
    function IdToken(rawIdToken) {
        if (Utils_1.Utils.isEmpty(rawIdToken)) {
            throw ClientAuthError_1.ClientAuthError.createIdTokenNullOrEmptyError(rawIdToken);
        }
        try {
            this.rawIdToken = rawIdToken;
            this.decodedIdToken = Utils_1.Utils.extractIdToken(rawIdToken);
            if (this.decodedIdToken) {
                if (this.decodedIdToken.hasOwnProperty("iss")) {
                    this.issuer = this.decodedIdToken["iss"];
                }
                if (this.decodedIdToken.hasOwnProperty("oid")) {
                    this.objectId = this.decodedIdToken["oid"];
                }
                if (this.decodedIdToken.hasOwnProperty("sub")) {
                    this.subject = this.decodedIdToken["sub"];
                }
                if (this.decodedIdToken.hasOwnProperty("tid")) {
                    this.tenantId = this.decodedIdToken["tid"];
                }
                if (this.decodedIdToken.hasOwnProperty("ver")) {
                    this.version = this.decodedIdToken["ver"];
                }
                if (this.decodedIdToken.hasOwnProperty("preferred_username")) {
                    this.preferredName = this.decodedIdToken["preferred_username"];
                }
                if (this.decodedIdToken.hasOwnProperty("name")) {
                    this.name = this.decodedIdToken["name"];
                }
                if (this.decodedIdToken.hasOwnProperty("nonce")) {
                    this.nonce = this.decodedIdToken["nonce"];
                }
                if (this.decodedIdToken.hasOwnProperty("exp")) {
                    this.expiration = this.decodedIdToken["exp"];
                }
                if (this.decodedIdToken.hasOwnProperty("home_oid")) {
                    this.homeObjectId = this.decodedIdToken["home_oid"];
                }
                if (this.decodedIdToken.hasOwnProperty("sid")) {
                    this.sid = this.decodedIdToken["sid"];
                }
                /* tslint:enable:no-string-literal */
            }
        }
        catch (e) {
            // TODO: This error here won't really every be thrown, since extractIdToken() returns null if the decodeJwt() fails.
            // Need to add better error handling here to account for being unable to decode jwts.
            throw ClientAuthError_1.ClientAuthError.createIdTokenParsingError(e);
        }
    }
    return IdToken;
}());
exports.IdToken = IdToken;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = __webpack_require__(2);
var AccessTokenCacheItem_1 = __webpack_require__(25);
var Constants_2 = __webpack_require__(2);
var ClientConfigurationError_1 = __webpack_require__(3);
/**
 * @hidden
 */
var Storage = /** @class */ (function () {
    function Storage(cacheLocation) {
        if (Storage.instance) {
            return Storage.instance;
        }
        this.cacheLocation = cacheLocation;
        this.localStorageSupported = typeof window[this.cacheLocation] !== "undefined" && window[this.cacheLocation] != null;
        this.sessionStorageSupported = typeof window[cacheLocation] !== "undefined" && window[cacheLocation] != null;
        Storage.instance = this;
        if (!this.localStorageSupported && !this.sessionStorageSupported) {
            throw ClientConfigurationError_1.ClientConfigurationError.createNoStorageSupportedError();
        }
        return Storage.instance;
    }
    // add value to storage
    Storage.prototype.setItem = function (key, value, enableCookieStorage) {
        if (window[this.cacheLocation]) {
            window[this.cacheLocation].setItem(key, value);
        }
        if (enableCookieStorage) {
            this.setItemCookie(key, value);
        }
    };
    // get one item by key from storage
    Storage.prototype.getItem = function (key, enableCookieStorage) {
        if (enableCookieStorage && this.getItemCookie(key)) {
            return this.getItemCookie(key);
        }
        if (window[this.cacheLocation]) {
            return window[this.cacheLocation].getItem(key);
        }
        return null;
    };
    // remove value from storage
    Storage.prototype.removeItem = function (key) {
        if (window[this.cacheLocation]) {
            return window[this.cacheLocation].removeItem(key);
        }
    };
    // clear storage (remove all items from it)
    Storage.prototype.clear = function () {
        if (window[this.cacheLocation]) {
            return window[this.cacheLocation].clear();
        }
    };
    Storage.prototype.getAllAccessTokens = function (clientId, homeAccountIdentifier) {
        var results = [];
        var accessTokenCacheItem;
        var storage = window[this.cacheLocation];
        if (storage) {
            var key = void 0;
            for (key in storage) {
                if (storage.hasOwnProperty(key)) {
                    if (key.match(clientId) && key.match(homeAccountIdentifier)) {
                        var value = this.getItem(key);
                        if (value) {
                            accessTokenCacheItem = new AccessTokenCacheItem_1.AccessTokenCacheItem(JSON.parse(key), JSON.parse(value));
                            results.push(accessTokenCacheItem);
                        }
                    }
                }
            }
        }
        return results;
    };
    Storage.prototype.removeAcquireTokenEntries = function () {
        var storage = window[this.cacheLocation];
        if (storage) {
            var key = void 0;
            for (key in storage) {
                if (storage.hasOwnProperty(key)) {
                    if (key.indexOf(Constants_2.CacheKeys.AUTHORITY) !== -1 || key.indexOf(Constants_2.CacheKeys.ACQUIRE_TOKEN_ACCOUNT) !== 1) {
                        var splitKey = key.split(Constants_1.Constants.resourceDelimiter);
                        var state = void 0;
                        if (splitKey.length > 1) {
                            state = splitKey[1];
                        }
                        if (state && !this.tokenRenewalInProgress(state)) {
                            this.removeItem(key);
                            this.removeItem(Constants_1.Constants.renewStatus + state);
                            this.removeItem(Constants_1.Constants.stateLogin);
                            this.removeItem(Constants_1.Constants.stateAcquireToken);
                            this.setItemCookie(key, "", -1);
                        }
                    }
                }
            }
        }
        this.clearCookie();
    };
    Storage.prototype.tokenRenewalInProgress = function (stateValue) {
        var storage = window[this.cacheLocation];
        var renewStatus = storage[Constants_1.Constants.renewStatus + stateValue];
        return !(!renewStatus || renewStatus !== Constants_1.Constants.tokenRenewStatusInProgress);
    };
    Storage.prototype.resetCacheItems = function () {
        var storage = window[this.cacheLocation];
        if (storage) {
            var key = void 0;
            for (key in storage) {
                if (storage.hasOwnProperty(key)) {
                    if (key.indexOf(Constants_1.Constants.msal) !== -1) {
                        this.setItem(key, "");
                    }
                }
            }
            this.removeAcquireTokenEntries();
        }
    };
    Storage.prototype.setItemCookie = function (cName, cValue, expires) {
        var cookieStr = cName + "=" + cValue + ";";
        if (expires) {
            var expireTime = this.getCookieExpirationTime(expires);
            cookieStr += "expires=" + expireTime + ";";
        }
        document.cookie = cookieStr;
    };
    Storage.prototype.getItemCookie = function (cName) {
        var name = cName + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    Storage.prototype.getCookieExpirationTime = function (cookieLifeDays) {
        var today = new Date();
        var expr = new Date(today.getTime() + cookieLifeDays * 24 * 60 * 60 * 1000);
        return expr.toUTCString();
    };
    Storage.prototype.clearCookie = function () {
        this.setItemCookie(Constants_1.Constants.nonceIdToken, "", -1);
        this.setItemCookie(Constants_1.Constants.stateLogin, "", -1);
        this.setItemCookie(Constants_1.Constants.loginRequest, "", -1);
        this.setItemCookie(Constants_1.Constants.stateAcquireToken, "", -1);
    };
    /**
     * Create acquireTokenAccountKey to cache account object
     * @param accountId
     * @param state
     */
    Storage.generateAcquireTokenAccountKey = function (accountId, state) {
        return Constants_2.CacheKeys.ACQUIRE_TOKEN_ACCOUNT + Constants_1.Constants.resourceDelimiter +
            ("" + accountId) + Constants_1.Constants.resourceDelimiter + ("" + state);
    };
    /**
     * Create authorityKey to cache authority
     * @param state
     */
    Storage.generateAuthorityKey = function (state) {
        return Constants_2.CacheKeys.AUTHORITY + Constants_1.Constants.resourceDelimiter + ("" + state);
    };
    return Storage;
}());
exports.Storage = Storage;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var AccessTokenCacheItem = /** @class */ (function () {
    function AccessTokenCacheItem(key, value) {
        this.key = key;
        this.value = value;
    }
    return AccessTokenCacheItem;
}());
exports.AccessTokenCacheItem = AccessTokenCacheItem;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var Utils_1 = __webpack_require__(0);
var AadAuthority_1 = __webpack_require__(11);
var B2cAuthority_1 = __webpack_require__(27);
var Authority_1 = __webpack_require__(6);
var ClientConfigurationError_1 = __webpack_require__(3);
var AuthorityFactory = /** @class */ (function () {
    function AuthorityFactory() {
    }
    /**
    * Parse the url and determine the type of authority
    */
    AuthorityFactory.DetectAuthorityFromUrl = function (authorityUrl) {
        authorityUrl = Utils_1.Utils.CanonicalizeUri(authorityUrl);
        var components = Utils_1.Utils.GetUrlComponents(authorityUrl);
        var pathSegments = components.PathSegments;
        switch (pathSegments[0]) {
            case "tfp":
                return Authority_1.AuthorityType.B2C;
            case "adfs":
                return Authority_1.AuthorityType.Adfs;
            default:
                return Authority_1.AuthorityType.Aad;
        }
    };
    /**
    * Create an authority object of the correct type based on the url
    * Performs basic authority validation - checks to see if the authority is of a valid type (eg aad, b2c)
    */
    AuthorityFactory.CreateInstance = function (authorityUrl, validateAuthority) {
        if (Utils_1.Utils.isEmpty(authorityUrl)) {
            return null;
        }
        var type = AuthorityFactory.DetectAuthorityFromUrl(authorityUrl);
        // Depending on above detection, create the right type.
        switch (type) {
            case Authority_1.AuthorityType.B2C:
                return new B2cAuthority_1.B2cAuthority(authorityUrl, validateAuthority);
            case Authority_1.AuthorityType.Aad:
                return new AadAuthority_1.AadAuthority(authorityUrl, validateAuthority);
            default:
                throw ClientConfigurationError_1.ClientConfigurationErrorMessage.invalidAuthorityType;
        }
    };
    return AuthorityFactory;
}());
exports.AuthorityFactory = AuthorityFactory;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var AadAuthority_1 = __webpack_require__(11);
var Authority_1 = __webpack_require__(6);
var ClientConfigurationError_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(0);
/**
 * @hidden
 */
var B2cAuthority = /** @class */ (function (_super) {
    tslib_1.__extends(B2cAuthority, _super);
    function B2cAuthority(authority, validateAuthority) {
        var _this = _super.call(this, authority, validateAuthority) || this;
        var urlComponents = Utils_1.Utils.GetUrlComponents(authority);
        var pathSegments = urlComponents.PathSegments;
        if (pathSegments.length < 3) {
            throw ClientConfigurationError_1.ClientConfigurationErrorMessage.b2cAuthorityUriInvalidPath;
        }
        _this.CanonicalAuthority = "https://" + urlComponents.HostNameAndPort + "/" + pathSegments[0] + "/" + pathSegments[1] + "/" + pathSegments[2] + "/";
        return _this;
    }
    Object.defineProperty(B2cAuthority.prototype, "AuthorityType", {
        get: function () {
            return Authority_1.AuthorityType.B2C;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a promise with the TenantDiscoveryEndpoint
     */
    B2cAuthority.prototype.GetOpenIdConfigurationEndpointAsync = function () {
        var _this = this;
        var resultPromise = new Promise(function (resolve, reject) {
            return resolve(_this.DefaultOpenIdConfigurationEndpoint);
        });
        if (!this.IsValidationEnabled) {
            return resultPromise;
        }
        if (this.IsInTrustedHostList(this.CanonicalAuthorityUrlComponents.HostNameAndPort)) {
            return resultPromise;
        }
        return new Promise(function (resolve, reject) {
            return reject(ClientConfigurationError_1.ClientConfigurationErrorMessage.unsupportedAuthorityValidation);
        });
    };
    return B2cAuthority;
}(AadAuthority_1.AadAuthority));
exports.B2cAuthority = B2cAuthority;


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Nc2FsL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9Nc2FsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL01zYWwvLi9zcmMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9lcnJvci9DbGllbnRDb25maWd1cmF0aW9uRXJyb3IudHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9lcnJvci9DbGllbnRBdXRoRXJyb3IudHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9lcnJvci9BdXRoRXJyb3IudHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9BdXRob3JpdHkudHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9Mb2dnZXIudHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9lcnJvci9TZXJ2ZXJFcnJvci50cyIsIndlYnBhY2s6Ly9Nc2FsLy4vc3JjL1VzZXJBZ2VudEFwcGxpY2F0aW9uLnRzIiwid2VicGFjazovL01zYWwvLi9zcmMvQWNjb3VudC50cyIsIndlYnBhY2s6Ly9Nc2FsLy4vc3JjL0FhZEF1dGhvcml0eS50cyIsIndlYnBhY2s6Ly9Nc2FsLy4vc3JjL1hIUkNsaWVudC50cyIsIndlYnBhY2s6Ly9Nc2FsLy4vc3JjL0NvbmZpZ3VyYXRpb24udHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9BdXRoZW50aWNhdGlvblBhcmFtZXRlcnMudHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9lcnJvci9JbnRlcmFjdGlvblJlcXVpcmVkQXV0aEVycm9yLnRzIiwid2VicGFjazovL01zYWwvLi9zcmMvQXV0aFJlc3BvbnNlLnRzIiwid2VicGFjazovL01zYWwvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9BY2Nlc3NUb2tlbktleS50cyIsIndlYnBhY2s6Ly9Nc2FsLy4vc3JjL0FjY2Vzc1Rva2VuVmFsdWUudHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9TZXJ2ZXJSZXF1ZXN0UGFyYW1ldGVycy50cyIsIndlYnBhY2s6Ly9Nc2FsLy4vc3JjL0NsaWVudEluZm8udHMiLCJ3ZWJwYWNrOi8vTXNhbC8uL3NyYy9JZFRva2VuLnRzIiwid2VicGFjazovL01zYWwvLi9zcmMvU3RvcmFnZS50cyIsIndlYnBhY2s6Ly9Nc2FsLy4vc3JjL0FjY2Vzc1Rva2VuQ2FjaGVJdGVtLnRzIiwid2VicGFjazovL01zYWwvLi9zcmMvQXV0aG9yaXR5RmFjdG9yeS50cyIsIndlYnBhY2s6Ly9Nc2FsLy4vc3JjL0IyY0F1dGhvcml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7QUNsRkEsNERBQTREO0FBQzVELGtDQUFrQzs7O0FBSWxDLHlDQUE2RDtBQUk3RCwrQ0FBMEQ7QUFFMUQseUNBQXNDO0FBRXRDOztHQUVHO0FBQ0g7SUFBQTtJQXdzQkEsQ0FBQztJQXRzQkMsc0JBQXNCO0lBRXRCOzs7OztPQUtHO0lBQ0kscUJBQWUsR0FBdEIsVUFBdUIsRUFBVyxFQUFFLEVBQVc7UUFDOUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNULE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0gsSUFBSSxFQUFFLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLHFCQUFxQixFQUFFO1lBQ3hELElBQUksRUFBRSxDQUFDLHFCQUFxQixLQUFLLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtnQkFDekQsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGtCQUFZLEdBQW5CLFVBQW9CLEdBQVc7UUFDN0IsSUFBSSxHQUFHLEdBQVcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDSSx1QkFBaUIsR0FBeEI7UUFDRSxPQUFPLG1CQUFPLENBQUMsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxtQkFBYSxHQUFwQjtRQUNFLGlGQUFpRjtRQUNqRix5QkFBeUI7UUFDekIsK0JBQStCO1FBQy9CLDhEQUE4RDtRQUM5RCxrRUFBa0U7UUFDbEUscUVBQXFFO1FBQ3JFLG9FQUFvRTtRQUNwRSxpQ0FBaUM7UUFDakMscUVBQXFFO1FBQ3JFLGNBQWM7UUFDZCwySEFBMkg7UUFDM0gscUNBQXFDO1FBQ3JDLHFDQUFxQztRQUNyQyxxQ0FBcUM7UUFDckMscUNBQXFDO1FBQ3JDLG9DQUFvQztRQUNwQyxxQ0FBcUM7UUFDckMsK0NBQStDO1FBQy9DLG1GQUFtRjtRQUNuRiwwQkFBMEI7UUFFMUIsSUFBTSxTQUFTLEdBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVk7UUFDckQsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLGVBQWUsRUFBRTtZQUMxQyxJQUFNLE1BQU0sR0FBZSxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QyxTQUFTLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWxDLDhMQUE4TDtZQUM5TCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsK0NBQStDO1lBQ2xFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQywwRkFBMEY7WUFFN0csK0tBQStLO1lBQy9LLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQywrQ0FBK0M7WUFDbEUsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLCtDQUErQztZQUVsRSxPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7a0JBQ2hFLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7a0JBQzdELEdBQUcsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2tCQUNuRSxHQUFHLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztrQkFDbkUsR0FBRyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7a0JBQ25FLEdBQUcsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2tCQUNyRSxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2tCQUMvRCxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDckU7YUFDSTtZQUNILElBQU0sVUFBVSxHQUFXLHNDQUFzQyxDQUFDO1lBQ2xFLElBQU0sR0FBRyxHQUFXLGtCQUFrQixDQUFDO1lBQ3ZDLElBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQztZQUNsQixJQUFJLFlBQVksR0FBVyxFQUFFLENBQUM7WUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQ2xELGtDQUFrQztvQkFDbEMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUM3QjtnQkFDRCxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7b0JBQ3pCLFlBQVksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO3FCQUFNLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtvQkFDaEMsbUZBQW1GO29CQUNuRixDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsOENBQThDO29CQUN4RCxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMseUJBQXlCO29CQUNuQyxZQUFZLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4QjtxQkFBTTtvQkFDTCxZQUFZLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMvQjthQUNGO1lBQ0QsT0FBTyxZQUFZLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRUQsWUFBWTtJQUVaLGNBQWM7SUFFZDs7OztPQUlHO0lBQ0ksZUFBUyxHQUFoQixVQUFpQixPQUFlO1FBQzlCLDBKQUEwSjtRQUN6SixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUNuQjtRQUNILE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksU0FBRyxHQUFWO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELFlBQVk7SUFFWixvQkFBb0I7SUFFcEI7Ozs7T0FJRztJQUNJLGFBQU8sR0FBZCxVQUFlLEdBQVc7UUFDeEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLFdBQVcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxZQUFZO0lBRVosMERBQTBEO0lBRTFEOzs7O09BSUc7SUFDSSxlQUFTLEdBQWhCLFVBQWlCLFFBQWdCO1FBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBTSxpQkFBaUIsR0FBRyxzQ0FBc0MsQ0FBQztRQUNqRSxJQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQyw4RUFBOEU7WUFDOUUsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQU0sWUFBWSxHQUFHO1lBQ25CLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ25CLENBQUM7UUFDRixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG9CQUFjLEdBQXJCLFVBQXNCLGNBQXNCO1FBQzFDLCtDQUErQztRQUMvQyxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUk7WUFDRixJQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO1lBQzlDLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNsQixrR0FBa0c7Z0JBQ2xHLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCx3Q0FBd0M7WUFDeEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2xDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWix3RkFBd0Y7U0FDekY7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxZQUFZO0lBRVosMkJBQTJCO0lBRTNCOzs7O09BSUc7SUFDSSwrQkFBeUIsR0FBaEMsVUFBaUMsS0FBYTtRQUM1QyxrREFBa0Q7UUFDbEQsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO2FBQ0k7WUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLCtCQUF5QixHQUFoQyxVQUFpQyxhQUFxQjtRQUNwRCxrREFBa0Q7UUFDbEQsYUFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEUsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2IsT0FBTyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQjtTQUNuRzthQUNJO1lBQ0QsT0FBTyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3RTtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsMkNBQTJDO0lBQ3BDLFlBQU0sR0FBYixVQUFjLEtBQWE7UUFDekIsSUFBTSxNQUFNLEdBQVcsbUVBQW1FLENBQUM7UUFDM0YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsSUFBWSxDQUFDO1FBQ3JHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVWLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9CLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3QixJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFN0IsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7WUFDakIsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7WUFFakIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2YsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7YUFDbEI7aUJBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksR0FBRyxFQUFFLENBQUM7YUFDWDtZQUVELE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6RztRQUVELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZ0JBQVUsR0FBakIsVUFBa0IsS0FBYTtRQUM3QixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWpCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFO2dCQUNYLE9BQU8sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25DO2lCQUNJLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hDLE9BQU8sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNoRDtpQkFDSTtnQkFDSCxPQUFPLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDdEQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDaEQ7U0FDRjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsMkNBQTJDO0lBQ3BDLFlBQU0sR0FBYixVQUFjLGFBQXFCO1FBQ2pDLElBQUksS0FBSyxHQUFHLG1FQUFtRSxDQUFDO1FBQ2hGLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEIsTUFBTSxpQ0FBZSxDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsSUFBSSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsSUFBWSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLHVGQUF1RjtZQUN2RiwyQ0FBMkM7WUFDM0MsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRCxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELG1DQUFtQztZQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQ3RCLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDckIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNO2FBQ1A7WUFDRCxxQkFBcUI7aUJBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUMzQixFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQ3RCLE9BQU8sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNO2FBQ1A7WUFDRCxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzFDLCtCQUErQjtZQUMvQixFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDdEIsRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3JCLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLE9BQU8sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGlCQUFXLEdBQWxCLFVBQW1CLEtBQWE7UUFDOUIsSUFBSSxLQUFvQixDQUFDLENBQUMsbURBQW1EO1FBQzdFLElBQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFNLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQztRQUNuQyxJQUFNLE1BQU0sR0FBRyxVQUFDLENBQVMsSUFBSyx5QkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDO1FBQ3JFLElBQU0sR0FBRyxHQUFPLEVBQUUsQ0FBQztRQUNuQixLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixPQUFPLEtBQUssRUFBRTtZQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxZQUFZO0lBRVosdUNBQXVDO0lBRXZDOzs7OztPQUtHO0lBQ0gsa0ZBQWtGO0lBQzNFLDBCQUFvQixHQUEzQixVQUE0QixZQUEyQixFQUFFLE1BQXFCO1FBQzVFLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNwRCxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLG1CQUFhLEdBQXBCLFVBQXFCLFlBQTJCLEVBQUUsTUFBcUI7UUFDckUsWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFVLElBQWMsbUJBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUF6RCxDQUF5RCxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxpRkFBaUY7SUFDMUUsd0JBQWtCLEdBQXpCLFVBQTBCLE1BQXFCO1FBQzdDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFLLElBQUksWUFBSyxDQUFDLFdBQVcsRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsaUZBQWlGO0lBQzFFLG1CQUFhLEdBQXBCLFVBQXFCLE1BQXFCLEVBQUUsS0FBYTtRQUN2RCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBSyxJQUFJLFlBQUssS0FBSyxLQUFLLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELFlBQVk7SUFFWix1REFBdUQ7SUFFaEQsMkJBQXFCLEdBQTVCO1FBQ0ksT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksdUJBQWlCLEdBQXhCLFVBQXlCLEdBQVcsRUFBRSxRQUFnQjtRQUNsRCxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLElBQUksUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUsscUJBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLG9CQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRTtZQUMxSCxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsK0JBQStCLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSxxQ0FBK0IsR0FBdEMsVUFBdUMsU0FBZSxFQUFFLFNBQW1CO1FBQ3pFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxTQUFTLENBQUMsZUFBZSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakgsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHNCQUFnQixHQUF2QixVQUF3QixHQUFXO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixNQUFNLGNBQWMsQ0FBQztTQUN0QjtRQUVELHVEQUF1RDtRQUN2RCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsNERBQTRELENBQUMsQ0FBQztRQUVqRixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxvQkFBb0IsQ0FBQztTQUM1QjtRQUVELElBQUksYUFBYSxHQUFTO1lBQ3hCLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3ZCLENBQUM7UUFFRixJQUFJLFlBQVksR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6RCxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsSUFBSyxVQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtRQUM1RixhQUFhLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUMxQyxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLHFCQUFlLEdBQXRCLFVBQXVCLEdBQVc7UUFDaEMsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNwQyxHQUFHLElBQUksR0FBRyxDQUFDO1NBQ1o7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHlEQUF5RDtJQUNsRCxjQUFRLEdBQWYsVUFBZ0IsR0FBVyxFQUFFLE1BQWM7UUFDekMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG1DQUE2QixHQUFwQyxVQUFxQyxHQUFXLEVBQUUsSUFBWTtRQUM1RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUVELElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFDbkQsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLGNBQWM7UUFDZCxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQztRQUM3QyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0IsYUFBYTtRQUNiLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxZQUFZO0lBRVosb0RBQW9EO0lBRXBEOzs7Ozs7O09BT0c7SUFDSCx1R0FBdUc7SUFDaEcseUNBQW1DLEdBQTFDLFVBQTJDLE9BQWlDLEVBQUUsYUFBa0I7UUFFOUYsK0NBQStDO1FBQy9DLElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxPQUFPLENBQUM7UUFDWixJQUFJLGNBQWMsR0FBVyxFQUFFLENBQUM7UUFDaEMsOERBQThEO1FBQzlELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO2dCQUNuQixJQUFNLE9BQU8sR0FBWSxPQUFPLENBQUMsT0FBTyxDQUFDO2dCQUN6QyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7b0JBQ2YsT0FBTyxHQUFHLG9CQUFRLENBQUMsR0FBRyxDQUFDO29CQUN2QixPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztpQkFDdkI7cUJBQ0ksSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUN6QixPQUFPLEdBQUcsb0JBQVEsQ0FBQyxVQUFVLENBQUM7b0JBQzlCLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO2lCQUM1QjthQUNGO1lBQ0QsbUJBQW1CO2lCQUNkLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtnQkFDcEIsT0FBTyxHQUFHLG9CQUFRLENBQUMsR0FBRyxDQUFDO2dCQUN2QixPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzthQUN2QjtZQUNELHlCQUF5QjtpQkFDcEIsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUMxQixPQUFPLEdBQUcsb0JBQVEsQ0FBQyxVQUFVLENBQUM7Z0JBQzlCLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQzdCO1NBQ0Y7UUFDRCxtQ0FBbUM7YUFDOUIsSUFBSSxhQUFhLEVBQUU7WUFDdEIsSUFBSSxhQUFhLENBQUMsY0FBYyxDQUFDLHFCQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQy9DLE9BQU8sR0FBRyxvQkFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDNUIsT0FBTyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUM7YUFDN0I7aUJBQ0k7Z0JBQ0gsT0FBTyxHQUFHLG9CQUFRLENBQUMsYUFBYSxDQUFDO2dCQUNqQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ2hCO1NBQ0Y7UUFFRCxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFeEQsa0RBQWtEO1FBQ2xELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRTtZQUNyRSxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBUSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ3pIO1FBRUQsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUdEOzs7T0FHRztJQUNJLHFCQUFlLEdBQXRCLFVBQXVCLE9BQWUsRUFBRSxPQUFlLEVBQUUsUUFBaUI7UUFDeEUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLFFBQVEsR0FBRyxFQUFFLENBQUM7U0FDZjtRQUVELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixPQUFPLFFBQVEsQ0FBQztTQUNuQjtRQUVELFFBQVEsT0FBTyxFQUFFO1lBQ2YsS0FBSyxvQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixRQUFRLENBQUMsb0JBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUM7Z0JBQ2pDLE1BQU07YUFDUDtZQUNELEtBQUssb0JBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsUUFBUSxDQUFDLG9CQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDO2dCQUN4QyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxvQkFBUSxDQUFDLGFBQWEsQ0FBQztnQkFDeEQsTUFBTTthQUNQO1lBQ0QsS0FBSyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN4QixRQUFRLENBQUMsb0JBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUM7Z0JBQ3hDLE1BQU07YUFDUDtZQUNELEtBQUssb0JBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDM0IsUUFBUSxDQUFDLG9CQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsb0JBQVEsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hELE1BQU07YUFDUDtZQUNELEtBQUssb0JBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkIsUUFBUSxDQUFDLG9CQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsb0JBQVEsQ0FBQyxTQUFTLENBQUM7Z0JBQ3BELE1BQU07YUFDUDtZQUNELEtBQUssb0JBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkMsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLHlCQUF5QixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMseUJBQXlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRS9ELHVFQUF1RTtnQkFDdkUsUUFBUSxDQUFDLG9CQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNuQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBRXJDLElBQUksSUFBSSxLQUFLLHFCQUFTLENBQUMsYUFBYSxFQUFFO29CQUNsQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxvQkFBUSxDQUFDLFNBQVMsQ0FBQztpQkFDdkQ7cUJBQ0k7b0JBQ0QsUUFBUSxDQUFDLG9CQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsb0JBQVEsQ0FBQyxhQUFhLENBQUM7aUJBQzNEO2dCQUNELE1BQU07YUFDUDtZQUNELEtBQUssb0JBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkIsUUFBUSxDQUFDLG9CQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO2dCQUN2QyxNQUFNO2FBQ1A7WUFDRCxLQUFLLG9CQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3hCLFFBQVEsQ0FBQyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztnQkFDeEMsTUFBTTthQUNQO1NBQ0Y7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksbUNBQTZCLEdBQXBDLFVBQXFDLGVBQXVCO1FBQzFELElBQUksWUFBWSxHQUFXLElBQUksQ0FBQztRQUVoQyxJQUFJLGVBQWUsRUFBRTtZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQVc7Z0JBQy9DLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTtvQkFDeEIsWUFBWSxHQUFNLEdBQUcsU0FBSSxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUcsQ0FBQztpQkFDckU7cUJBQ0k7b0JBQ0gsWUFBWSxJQUFJLE1BQUksR0FBRyxTQUFJLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBRyxDQUFDO2lCQUN2RTtZQUNKLENBQUMsQ0FBQyxDQUFDO1NBQ0g7UUFFRCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0JBQVUsR0FBakIsVUFBa0IsT0FBaUM7UUFDL0MsT0FBTyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCxZQUFZO0lBRVosMEJBQTBCO0lBRW5CLHdCQUFrQixHQUF6QixVQUEwQixnQkFBOEIsRUFBRSxPQUFnQjtRQUN4RSxJQUFJLFFBQVEsd0JBQVEsZ0JBQWdCLENBQUUsQ0FBQztRQUN2QyxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQzdCLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDL0M7YUFBTTtZQUNMLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDOUM7UUFDRCxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQzlDLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFJSCxZQUFDO0FBQUQsQ0FBQztBQXhzQlksc0JBQUs7Ozs7Ozs7OztBQ2hCbEI7Ozs7Ozs7Ozs7Ozs7Z0ZBYWdGO0FBQ2hGLDZCQUE2Qjs7QUFFN0IsSUFBSSxhQUFhLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQztJQUM3QixhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7UUFDakMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7WUFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUVGLFNBQWdCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMxQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLFNBQVMsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBSkQsOEJBSUM7QUFFVSxnQkFBUSxHQUFHO0lBQ2xCLGdCQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxTQUFTLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pELENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoRjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELE9BQU8sZ0JBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFRCxTQUFnQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdkIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1gsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUMvRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxPQUFPLE1BQU0sQ0FBQyxxQkFBcUIsS0FBSyxVQUFVO1FBQy9ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQzNGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDO0FBUkQsd0JBUUM7QUFFRCxTQUFnQixVQUFVLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUNwRCxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdILElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sT0FBTyxDQUFDLFFBQVEsS0FBSyxVQUFVO1FBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7O1FBQzFILEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFBRSxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEosT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFMRCxnQ0FLQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsU0FBUztJQUN6QyxPQUFPLFVBQVUsTUFBTSxFQUFFLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekUsQ0FBQztBQUZELDBCQUVDO0FBRUQsU0FBZ0IsVUFBVSxDQUFDLFdBQVcsRUFBRSxhQUFhO0lBQ2pELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sT0FBTyxDQUFDLFFBQVEsS0FBSyxVQUFVO1FBQUUsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUNuSSxDQUFDO0FBRkQsZ0NBRUM7QUFFRCxTQUFnQixTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUztJQUN2RCxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1FBQ3JELFNBQVMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUFFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FBRSxDQUFDLENBQUM7UUFDM0YsU0FBUyxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUk7WUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQUUsQ0FBQyxDQUFDO1FBQzlGLFNBQVMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0ksSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUUsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBUEQsOEJBT0M7QUFFRCxTQUFnQixXQUFXLENBQUMsT0FBTyxFQUFFLElBQUk7SUFDckMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxjQUFhLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqSCxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxjQUFhLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pKLFNBQVMsSUFBSSxDQUFDLENBQUMsSUFBSSxPQUFPLFVBQVUsQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLFNBQVMsSUFBSSxDQUFDLEVBQUU7UUFDWixJQUFJLENBQUM7WUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDOUQsT0FBTyxDQUFDO1lBQUUsSUFBSTtnQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7b0JBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzdKLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDWCxLQUFLLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUM7d0JBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFBQyxNQUFNO29CQUM5QixLQUFLLENBQUM7d0JBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztvQkFDeEQsS0FBSyxDQUFDO3dCQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUFDLFNBQVM7b0JBQ2pELEtBQUssQ0FBQzt3QkFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUFDLFNBQVM7b0JBQ2pEO3dCQUNJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7NEJBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFBQyxTQUFTO3lCQUFFO3dCQUM1RyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsTUFBTTt5QkFBRTt3QkFDdEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsTUFBTTt5QkFBRTt3QkFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQUMsTUFBTTt5QkFBRTt3QkFDbkUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQUMsU0FBUztpQkFDOUI7Z0JBQ0QsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzlCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBRTtvQkFBUztnQkFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFFO1FBQzFELElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNyRixDQUFDO0FBQ0wsQ0FBQztBQTFCRCxrQ0EwQkM7QUFFRCxTQUFnQixZQUFZLENBQUMsQ0FBQyxFQUFFLE9BQU87SUFDbkMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBRkQsb0NBRUM7QUFFRCxTQUFnQixRQUFRLENBQUMsQ0FBQztJQUN0QixJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xFLElBQUksQ0FBQztRQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixPQUFPO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO2dCQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM1QyxDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFURCw0QkFTQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN2QixJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCxJQUFJLENBQUMsQ0FBQztRQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLElBQUk7UUFDQSxPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtZQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlFO0lBQ0QsT0FBTyxLQUFLLEVBQUU7UUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7S0FBRTtZQUMvQjtRQUNKLElBQUk7WUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7Z0JBQ087WUFBRSxJQUFJLENBQUM7Z0JBQUUsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQUU7S0FDcEM7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFmRCx3QkFlQztBQUVELFNBQWdCLFFBQVE7SUFDcEIsS0FBSyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7UUFDOUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBSkQsNEJBSUM7QUFFRCxTQUFnQixPQUFPLENBQUMsQ0FBQztJQUNyQixPQUFPLElBQUksWUFBWSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFGRCwwQkFFQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUztJQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWE7UUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFDdkYsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzlELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLGNBQWMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RILFNBQVMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUksU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJO1FBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUU7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FBRSxDQUFDLENBQUM7SUFDbEYsU0FBUyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FB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QWhELENBQWdELENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzdCLE9BQU8sYUFBYSxDQUFDO1NBQ3RCO1FBRUQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2xGLE9BQU8sYUFBYSxDQUFDO1NBQ3RCO1FBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBUyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3pDLGFBQU0sQ0FBQywwREFBK0IsQ0FBQyw4QkFBOEIsQ0FBQztRQUF0RSxDQUFzRSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxDQW5DaUMsMkJBQVksR0FtQzdDO0FBbkNZLG9DQUFZIiwiZmlsZSI6Im1zYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIk1zYWxcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiTXNhbFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJNc2FsXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTcpO1xuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IElVcmkgfSBmcm9tIFwiLi9JVXJpXCI7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSBcIi4vQWNjb3VudFwiO1xuaW1wb3J0IHtDb25zdGFudHMsIFNTT1R5cGVzLCBQcm9tcHRTdGF0ZX0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblBhcmFtZXRlcnMsIFFQRGljdCB9IGZyb20gXCIuL0F1dGhlbnRpY2F0aW9uUGFyYW1ldGVyc1wiO1xuaW1wb3J0IHsgQXV0aFJlc3BvbnNlIH0gZnJvbSBcIi4vQXV0aFJlc3BvbnNlXCI7XG5pbXBvcnQgeyBJZFRva2VuIH0gZnJvbSBcIi4vSWRUb2tlblwiO1xuaW1wb3J0IHsgQ2xpZW50QXV0aEVycm9yIH0gZnJvbSBcIi4vZXJyb3IvQ2xpZW50QXV0aEVycm9yXCI7XG5cbmltcG9ydCB7IExpYnJhcnkgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBVdGlscyB7XG5cbiAgLy8jcmVnaW9uIEdlbmVyYWwgVXRpbFxuXG4gIC8qKlxuICAgKiBVdGlscyBmdW5jdGlvbiB0byBjb21wYXJlIHR3byBBY2NvdW50IG9iamVjdHMgLSB1c2VkIHRvIGNoZWNrIGlmIHRoZSBzYW1lIHVzZXIgYWNjb3VudCBpcyBsb2dnZWQgaW5cbiAgICpcbiAgICogQHBhcmFtIGExOiBBY2NvdW50IG9iamVjdFxuICAgKiBAcGFyYW0gYTI6IEFjY291bnQgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgY29tcGFyZUFjY291bnRzKGExOiBBY2NvdW50LCBhMjogQWNjb3VudCk6IGJvb2xlYW4ge1xuICAgaWYgKCFhMSB8fCAhYTIpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgaWYgKGExLmhvbWVBY2NvdW50SWRlbnRpZmllciAmJiBhMi5ob21lQWNjb3VudElkZW50aWZpZXIpIHtcbiAgICAgIGlmIChhMS5ob21lQWNjb3VudElkZW50aWZpZXIgPT09IGEyLmhvbWVBY2NvdW50SWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlY2ltYWwgdG8gSGV4XG4gICAqXG4gICAqIEBwYXJhbSBudW1cbiAgICovXG4gIHN0YXRpYyBkZWNpbWFsVG9IZXgobnVtOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHZhciBoZXg6IHN0cmluZyA9IG51bS50b1N0cmluZygxNik7XG4gICAgd2hpbGUgKGhleC5sZW5ndGggPCAyKSB7XG4gICAgICBoZXggPSBcIjBcIiArIGhleDtcbiAgICB9XG4gICAgcmV0dXJuIGhleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNU0FMIEpTIExpYnJhcnkgVmVyc2lvblxuICAgKi9cbiAgc3RhdGljIGdldExpYnJhcnlWZXJzaW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIExpYnJhcnkudmVyc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHJhbmRvbSBHVUlEIC0gdXNlZCB0byBwb3B1bGF0ZSBzdGF0ZT9cbiAgICogQHJldHVybnMgc3RyaW5nIChHVUlEKVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZU5ld0d1aWQoKTogc3RyaW5nIHtcbiAgICAvLyBSRkM0MTIyOiBUaGUgdmVyc2lvbiA0IFVVSUQgaXMgbWVhbnQgZm9yIGdlbmVyYXRpbmcgVVVJRHMgZnJvbSB0cnVseS1yYW5kb20gb3JcbiAgICAvLyBwc2V1ZG8tcmFuZG9tIG51bWJlcnMuXG4gICAgLy8gVGhlIGFsZ29yaXRobSBpcyBhcyBmb2xsb3dzOlxuICAgIC8vICAgICBTZXQgdGhlIHR3byBtb3N0IHNpZ25pZmljYW50IGJpdHMgKGJpdHMgNiBhbmQgNykgb2YgdGhlXG4gICAgLy8gICAgICAgIGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWQgdG8gemVybyBhbmQgb25lLCByZXNwZWN0aXZlbHkuXG4gICAgLy8gICAgIFNldCB0aGUgZm91ciBtb3N0IHNpZ25pZmljYW50IGJpdHMgKGJpdHMgMTIgdGhyb3VnaCAxNSkgb2YgdGhlXG4gICAgLy8gICAgICAgIHRpbWVfaGlfYW5kX3ZlcnNpb24gZmllbGQgdG8gdGhlIDQtYml0IHZlcnNpb24gbnVtYmVyIGZyb21cbiAgICAvLyAgICAgICAgU2VjdGlvbiA0LjEuMy4gVmVyc2lvbjRcbiAgICAvLyAgICAgU2V0IGFsbCB0aGUgb3RoZXIgYml0cyB0byByYW5kb21seSAob3IgcHNldWRvLXJhbmRvbWx5KSBjaG9zZW5cbiAgICAvLyAgICAgdmFsdWVzLlxuICAgIC8vIFVVSUQgICAgICAgICAgICAgICAgICAgPSB0aW1lLWxvdyBcIi1cIiB0aW1lLW1pZCBcIi1cInRpbWUtaGlnaC1hbmQtdmVyc2lvbiBcIi1cImNsb2NrLXNlcS1yZXNlcnZlZCBhbmQgbG93KDJoZXhPY3RldClcIi1cIiBub2RlXG4gICAgLy8gdGltZS1sb3cgICAgICAgICAgICAgICA9IDRoZXhPY3RldFxuICAgIC8vIHRpbWUtbWlkICAgICAgICAgICAgICAgPSAyaGV4T2N0ZXRcbiAgICAvLyB0aW1lLWhpZ2gtYW5kLXZlcnNpb24gID0gMmhleE9jdGV0XG4gICAgLy8gY2xvY2stc2VxLWFuZC1yZXNlcnZlZCA9IGhleE9jdGV0OlxuICAgIC8vIGNsb2NrLXNlcS1sb3cgICAgICAgICAgPSBoZXhPY3RldFxuICAgIC8vIG5vZGUgICAgICAgICAgICAgICAgICAgPSA2aGV4T2N0ZXRcbiAgICAvLyBGb3JtYXQ6IHh4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eFxuICAgIC8vIHkgY291bGQgYmUgMTAwMCwgMTAwMSwgMTAxMCwgMTAxMSBzaW5jZSBtb3N0IHNpZ25pZmljYW50IHR3byBiaXRzIG5lZWRzIHRvIGJlIDEwXG4gICAgLy8geSB2YWx1ZXMgYXJlIDgsIDksIEEsIEJcblxuICAgIGNvbnN0IGNyeXB0b09iajogQ3J5cHRvID0gd2luZG93LmNyeXB0bzsgLy8gZm9yIElFIDExXG4gICAgaWYgKGNyeXB0b09iaiAmJiBjcnlwdG9PYmouZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICBjb25zdCBidWZmZXI6IFVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSgxNik7XG4gICAgICBjcnlwdG9PYmouZ2V0UmFuZG9tVmFsdWVzKGJ1ZmZlcik7XG5cbiAgICAgIC8vYnVmZmVyWzZdIGFuZCBidWZmZXJbN10gcmVwcmVzZW50cyB0aGUgdGltZV9oaV9hbmRfdmVyc2lvbiBmaWVsZC4gV2Ugd2lsbCBzZXQgdGhlIGZvdXIgbW9zdCBzaWduaWZpY2FudCBiaXRzICg0IHRocm91Z2ggNykgb2YgYnVmZmVyWzZdIHRvIHJlcHJlc2VudCBkZWNpbWFsIG51bWJlciA0IChVVUlEIHZlcnNpb24gbnVtYmVyKS5cbiAgICAgIGJ1ZmZlcls2XSB8PSAweDQwOyAvL2J1ZmZlcls2XSB8IDAxMDAwMDAwIHdpbGwgc2V0IHRoZSA2IGJpdCB0byAxLlxuICAgICAgYnVmZmVyWzZdICY9IDB4NGY7IC8vYnVmZmVyWzZdICYgMDEwMDExMTEgd2lsbCBzZXQgdGhlIDQsIDUsIGFuZCA3IGJpdCB0byAwIHN1Y2ggdGhhdCBiaXRzIDQtNyA9PSAwMTAwID0gXCI0XCIuXG5cbiAgICAgIC8vYnVmZmVyWzhdIHJlcHJlc2VudHMgdGhlIGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWQgZmllbGQuIFdlIHdpbGwgc2V0IHRoZSB0d28gbW9zdCBzaWduaWZpY2FudCBiaXRzICg2IGFuZCA3KSBvZiB0aGUgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZCB0byB6ZXJvIGFuZCBvbmUsIHJlc3BlY3RpdmVseS5cbiAgICAgIGJ1ZmZlcls4XSB8PSAweDgwOyAvL2J1ZmZlcls4XSB8IDEwMDAwMDAwIHdpbGwgc2V0IHRoZSA3IGJpdCB0byAxLlxuICAgICAgYnVmZmVyWzhdICY9IDB4YmY7IC8vYnVmZmVyWzhdICYgMTAxMTExMTEgd2lsbCBzZXQgdGhlIDYgYml0IHRvIDAuXG5cbiAgICAgIHJldHVybiBVdGlscy5kZWNpbWFsVG9IZXgoYnVmZmVyWzBdKSArIFV0aWxzLmRlY2ltYWxUb0hleChidWZmZXJbMV0pXG4gICAgICAgICsgVXRpbHMuZGVjaW1hbFRvSGV4KGJ1ZmZlclsyXSkgKyBVdGlscy5kZWNpbWFsVG9IZXgoYnVmZmVyWzNdKVxuICAgICAgICArIFwiLVwiICsgVXRpbHMuZGVjaW1hbFRvSGV4KGJ1ZmZlcls0XSkgKyBVdGlscy5kZWNpbWFsVG9IZXgoYnVmZmVyWzVdKVxuICAgICAgICArIFwiLVwiICsgVXRpbHMuZGVjaW1hbFRvSGV4KGJ1ZmZlcls2XSkgKyBVdGlscy5kZWNpbWFsVG9IZXgoYnVmZmVyWzddKVxuICAgICAgICArIFwiLVwiICsgVXRpbHMuZGVjaW1hbFRvSGV4KGJ1ZmZlcls4XSkgKyBVdGlscy5kZWNpbWFsVG9IZXgoYnVmZmVyWzldKVxuICAgICAgICArIFwiLVwiICsgVXRpbHMuZGVjaW1hbFRvSGV4KGJ1ZmZlclsxMF0pICsgVXRpbHMuZGVjaW1hbFRvSGV4KGJ1ZmZlclsxMV0pXG4gICAgICAgICsgVXRpbHMuZGVjaW1hbFRvSGV4KGJ1ZmZlclsxMl0pICsgVXRpbHMuZGVjaW1hbFRvSGV4KGJ1ZmZlclsxM10pXG4gICAgICAgICsgVXRpbHMuZGVjaW1hbFRvSGV4KGJ1ZmZlclsxNF0pICsgVXRpbHMuZGVjaW1hbFRvSGV4KGJ1ZmZlclsxNV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IGd1aWRIb2xkZXI6IHN0cmluZyA9IFwieHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4XCI7XG4gICAgICBjb25zdCBoZXg6IHN0cmluZyA9IFwiMDEyMzQ1Njc4OWFiY2RlZlwiO1xuICAgICAgbGV0IHI6IG51bWJlciA9IDA7XG4gICAgICBsZXQgZ3VpZFJlc3BvbnNlOiBzdHJpbmcgPSBcIlwiO1xuICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IDM2OyBpKyspIHtcbiAgICAgICAgaWYgKGd1aWRIb2xkZXJbaV0gIT09IFwiLVwiICYmIGd1aWRIb2xkZXJbaV0gIT09IFwiNFwiKSB7XG4gICAgICAgICAgLy8gZWFjaCB4IGFuZCB5IG5lZWRzIHRvIGJlIHJhbmRvbVxuICAgICAgICAgIHIgPSBNYXRoLnJhbmRvbSgpICAqIDE2IHwgMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3VpZEhvbGRlcltpXSA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICBndWlkUmVzcG9uc2UgKz0gaGV4W3JdO1xuICAgICAgICB9IGVsc2UgaWYgKGd1aWRIb2xkZXJbaV0gPT09IFwieVwiKSB7XG4gICAgICAgICAgLy8gY2xvY2stc2VxLWFuZC1yZXNlcnZlZCBmaXJzdCBoZXggaXMgZmlsdGVyZWQgYW5kIHJlbWFpbmluZyBoZXggdmFsdWVzIGFyZSByYW5kb21cbiAgICAgICAgICByICY9IDB4MzsgLy8gYml0IGFuZCB3aXRoIDAwMTEgdG8gc2V0IHBvcyAyIHRvIHplcm8gPzA/P1xuICAgICAgICAgIHIgfD0gMHg4OyAvLyBzZXQgcG9zIDMgdG8gMSBhcyAxPz8/XG4gICAgICAgICAgZ3VpZFJlc3BvbnNlICs9IGhleFtyXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBndWlkUmVzcG9uc2UgKz0gZ3VpZEhvbGRlcltpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGd1aWRSZXNwb25zZTtcbiAgICB9XG4gIH1cblxuICAvLyNlbmRyZWdpb25cblxuICAvLyNyZWdpb24gVGltZVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRpbWUgaW4gc2Vjb25kcyBmb3IgZXhwaXJhdGlvbiBiYXNlZCBvbiBzdHJpbmcgdmFsdWUgcGFzc2VkIGluLlxuICAgKlxuICAgKiBAcGFyYW0gZXhwaXJlc1xuICAgKi9cbiAgc3RhdGljIGV4cGlyZXNJbihleHBpcmVzOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIC8vIGlmIEFBRCBkaWQgbm90IHNlbmQgXCJleHBpcmVzX2luXCIgcHJvcGVydHksIHVzZSBkZWZhdWx0IGV4cGlyYXRpb24gb2YgMzU5OSBzZWNvbmRzLCBmb3Igc29tZSByZWFzb24gQUFEIHNlbmRzIDM1OTkgYXMgXCJleHBpcmVzX2luXCIgdmFsdWUgaW5zdGVhZCBvZiAzNjAwXG4gICAgIGlmICghZXhwaXJlcykge1xuICAgICAgICAgZXhwaXJlcyA9IFwiMzU5OVwiO1xuICAgICAgfVxuICAgIHJldHVybiB0aGlzLm5vdygpICsgcGFyc2VJbnQoZXhwaXJlcywgMTApO1xuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybiB0aGUgY3VycmVudCB0aW1lIGluIFVuaXggdGltZS4gRGF0ZS5nZXRUaW1lKCkgcmV0dXJucyBpbiBtaWxsaXNlY29uZHMuXG4gICAqL1xuICBzdGF0aWMgbm93KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjApO1xuICB9XG5cbiAgLy8jZW5kcmVnaW9uXG5cbiAgLy8jcmVnaW9uIFN0cmluZyBPcHNcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBzdHJpbmcgaXMgZW1wdHlcbiAgICpcbiAgICogQHBhcmFtIHN0clxuICAgKi9cbiAgc3RhdGljIGlzRW1wdHkoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHR5cGVvZiBzdHIgPT09IFwidW5kZWZpbmVkXCIgfHwgIXN0ciB8fCAwID09PSBzdHIubGVuZ3RoKTtcbiAgfVxuXG4gIC8vI2VuZHJlZ2lvblxuXG4gIC8vI3JlZ2lvbiBUb2tlbiBQcm9jZXNzaW5nIChFeHRyYWN0IHRvIFRva2VuUHJvY2Vzc2luZy50cylcblxuICAvKipcbiAgICogZGVjb2RlIGEgSldUXG4gICAqXG4gICAqIEBwYXJhbSBqd3RUb2tlblxuICAgKi9cbiAgc3RhdGljIGRlY29kZUp3dChqd3RUb2tlbjogc3RyaW5nKTogYW55IHtcbiAgICBpZiAodGhpcy5pc0VtcHR5KGp3dFRva2VuKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGlkVG9rZW5QYXJ0c1JlZ2V4ID0gL14oW15cXC5cXHNdKilcXC4oW15cXC5cXHNdKylcXC4oW15cXC5cXHNdKikkLztcbiAgICBjb25zdCBtYXRjaGVzID0gaWRUb2tlblBhcnRzUmVnZXguZXhlYyhqd3RUb2tlbik7XG4gICAgaWYgKCFtYXRjaGVzIHx8IG1hdGNoZXMubGVuZ3RoIDwgNCkge1xuICAgICAgLy90aGlzLl9yZXF1ZXN0Q29udGV4dC5sb2dnZXIud2FybihcIlRoZSByZXR1cm5lZCBpZF90b2tlbiBpcyBub3QgcGFyc2VhYmxlLlwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBjcmFja2VkVG9rZW4gPSB7XG4gICAgICBoZWFkZXI6IG1hdGNoZXNbMV0sXG4gICAgICBKV1NQYXlsb2FkOiBtYXRjaGVzWzJdLFxuICAgICAgSldTU2lnOiBtYXRjaGVzWzNdXG4gICAgfTtcbiAgICByZXR1cm4gY3JhY2tlZFRva2VuO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3QgSWRUb2tlbiBieSBkZWNvZGluZyB0aGUgUkFXSWRUb2tlblxuICAgKlxuICAgKiBAcGFyYW0gZW5jb2RlZElkVG9rZW5cbiAgICovXG4gIHN0YXRpYyBleHRyYWN0SWRUb2tlbihlbmNvZGVkSWRUb2tlbjogc3RyaW5nKTogYW55IHtcbiAgICAvLyBpZCB0b2tlbiB3aWxsIGJlIGRlY29kZWQgdG8gZ2V0IHRoZSB1c2VybmFtZVxuICAgIGNvbnN0IGRlY29kZWRUb2tlbiA9IHRoaXMuZGVjb2RlSnd0KGVuY29kZWRJZFRva2VuKTtcbiAgICBpZiAoIWRlY29kZWRUb2tlbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBiYXNlNjRJZFRva2VuID0gZGVjb2RlZFRva2VuLkpXU1BheWxvYWQ7XG4gICAgICBjb25zdCBiYXNlNjREZWNvZGVkID0gdGhpcy5iYXNlNjREZWNvZGVTdHJpbmdVcmxTYWZlKGJhc2U2NElkVG9rZW4pO1xuICAgICAgaWYgKCFiYXNlNjREZWNvZGVkKSB7XG4gICAgICAgIC8vdGhpcy5fcmVxdWVzdENvbnRleHQubG9nZ2VyLmluZm8oXCJUaGUgcmV0dXJuZWQgaWRfdG9rZW4gY291bGQgbm90IGJlIGJhc2U2NCB1cmwgc2FmZSBkZWNvZGVkLlwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICAvLyBFQ01BIHNjcmlwdCBoYXMgSlNPTiBidWlsdC1pbiBzdXBwb3J0XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShiYXNlNjREZWNvZGVkKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vdGhpcy5fcmVxdWVzdENvbnRleHQubG9nZ2VyLmVycm9yKFwiVGhlIHJldHVybmVkIGlkX3Rva2VuIGNvdWxkIG5vdCBiZSBkZWNvZGVkXCIgKyBlcnIpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8jZW5kcmVnaW9uXG5cbiAgLy8jcmVnaW9uIEVuY29kZSBhbmQgRGVjb2RlXG5cbiAgLyoqXG4gICAqIGVuY29kaW5nIHN0cmluZyB0byBiYXNlNjQgLSBwbGF0Zm9ybSBzcGVjaWZpYyBjaGVja1xuICAgKlxuICAgKiBAcGFyYW0gaW5wdXRcbiAgICovXG4gIHN0YXRpYyBiYXNlNjRFbmNvZGVTdHJpbmdVcmxTYWZlKGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIGh0bWw1IHNob3VsZCBzdXBwb3J0IGF0b2IgZnVuY3Rpb24gZm9yIGRlY29kaW5nXG4gICAgaWYgKHdpbmRvdy5idG9hKSB7XG4gICAgICByZXR1cm4gd2luZG93LmJ0b2EoaW5wdXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmVuY29kZShpbnB1dCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlY29kaW5nIGJhc2U2NCB0b2tlbiAtIHBsYXRmb3JtIHNwZWNpZmljIGNoZWNrXG4gICAqXG4gICAqIEBwYXJhbSBiYXNlNjRJZFRva2VuXG4gICAqL1xuICBzdGF0aWMgYmFzZTY0RGVjb2RlU3RyaW5nVXJsU2FmZShiYXNlNjRJZFRva2VuOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIGh0bWw1IHNob3VsZCBzdXBwb3J0IGF0b2IgZnVuY3Rpb24gZm9yIGRlY29kaW5nXG4gICAgYmFzZTY0SWRUb2tlbiA9IGJhc2U2NElkVG9rZW4ucmVwbGFjZSgvLS9nLCBcIitcIikucmVwbGFjZSgvXy9nLCBcIi9cIik7XG4gICAgaWYgKHdpbmRvdy5hdG9iKSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5hdG9iKGJhc2U2NElkVG9rZW4pKSk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQodGhpcy5kZWNvZGUoYmFzZTY0SWRUb2tlbikpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYmFzZTY0IGVuY29kZSBhIHN0cmluZ1xuICAgKlxuICAgKiBAcGFyYW0gaW5wdXRcbiAgICovXG4gIC8vIFRPRE86IFJlbmFtZSB0byBzcGVjaWZ5IHR5cGUgb2YgZW5jb2RpbmdcbiAgc3RhdGljIGVuY29kZShpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBrZXlTdHI6IHN0cmluZyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtcbiAgICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgICBsZXQgY2hyMTogbnVtYmVyLCBjaHIyOiBudW1iZXIsIGNocjM6IG51bWJlciwgZW5jMTogbnVtYmVyLCBlbmMyOiBudW1iZXIsIGVuYzM6IG51bWJlciwgZW5jNDogbnVtYmVyO1xuICAgIHZhciBpID0gMDtcblxuICAgIGlucHV0ID0gdGhpcy51dGY4RW5jb2RlKGlucHV0KTtcblxuICAgIHdoaWxlIChpIDwgaW5wdXQubGVuZ3RoKSB7XG4gICAgICBjaHIxID0gaW5wdXQuY2hhckNvZGVBdChpKyspO1xuICAgICAgY2hyMiA9IGlucHV0LmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgIGNocjMgPSBpbnB1dC5jaGFyQ29kZUF0KGkrKyk7XG5cbiAgICAgIGVuYzEgPSBjaHIxID4+IDI7XG4gICAgICBlbmMyID0gKChjaHIxICYgMykgPDwgNCkgfCAoY2hyMiA+PiA0KTtcbiAgICAgIGVuYzMgPSAoKGNocjIgJiAxNSkgPDwgMikgfCAoY2hyMyA+PiA2KTtcbiAgICAgIGVuYzQgPSBjaHIzICYgNjM7XG5cbiAgICAgIGlmIChpc05hTihjaHIyKSkge1xuICAgICAgICBlbmMzID0gZW5jNCA9IDY0O1xuICAgICAgfSBlbHNlIGlmIChpc05hTihjaHIzKSkge1xuICAgICAgICBlbmM0ID0gNjQ7XG4gICAgICB9XG5cbiAgICAgIG91dHB1dCA9IG91dHB1dCArIGtleVN0ci5jaGFyQXQoZW5jMSkgKyBrZXlTdHIuY2hhckF0KGVuYzIpICsga2V5U3RyLmNoYXJBdChlbmMzKSArIGtleVN0ci5jaGFyQXQoZW5jNCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dC5yZXBsYWNlKC9cXCsvZywgXCItXCIpLnJlcGxhY2UoL1xcLy9nLCBcIl9cIikucmVwbGFjZSgvPSskLywgXCJcIik7XG4gIH1cblxuICAvKipcbiAgICogdXRmOCBlbmNvZGUgYSBzdHJpbmdcbiAgICpcbiAgICogQHBhcmFtIGlucHV0XG4gICAqL1xuICBzdGF0aWMgdXRmOEVuY29kZShpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xcclxcbi9nLCBcIlxcblwiKTtcbiAgICB2YXIgdXRmdGV4dCA9IFwiXCI7XG5cbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IGlucHV0Lmxlbmd0aDsgbisrKSB7XG4gICAgICB2YXIgYyA9IGlucHV0LmNoYXJDb2RlQXQobik7XG5cbiAgICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAgIHV0ZnRleHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKChjID4gMTI3KSAmJiAoYyA8IDIwNDgpKSB7XG4gICAgICAgIHV0ZnRleHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyA+PiA2KSB8IDE5Mik7XG4gICAgICAgIHV0ZnRleHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDYzKSB8IDEyOCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdXRmdGV4dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjID4+IDEyKSB8IDIyNCk7XG4gICAgICAgIHV0ZnRleHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgPj4gNikgJiA2MykgfCAxMjgpO1xuICAgICAgICB1dGZ0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiA2MykgfCAxMjgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1dGZ0ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIGRlY29kZSBhIGJhc2U2NCB0b2tlbiBzdHJpbmdcbiAgICpcbiAgICogQHBhcmFtIGJhc2U2NElkVG9rZW5cbiAgICovXG4gIC8vIFRPRE86IFJlbmFtZSB0byBzcGVjaWZ5IHR5cGUgb2YgZW5jb2RpbmdcbiAgc3RhdGljIGRlY29kZShiYXNlNjRJZFRva2VuOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHZhciBjb2RlcyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtcbiAgICBiYXNlNjRJZFRva2VuID0gU3RyaW5nKGJhc2U2NElkVG9rZW4pLnJlcGxhY2UoLz0rJC8sIFwiXCIpO1xuICAgIHZhciBsZW5ndGggPSBiYXNlNjRJZFRva2VuLmxlbmd0aDtcbiAgICBpZiAobGVuZ3RoICUgNCA9PT0gMSkge1xuICAgICAgdGhyb3cgQ2xpZW50QXV0aEVycm9yLmNyZWF0ZVRva2VuRW5jb2RpbmdFcnJvcihiYXNlNjRJZFRva2VuKTtcbiAgICB9XG4gICAgbGV0IGgxOiBudW1iZXIsIGgyOiBudW1iZXIsIGgzOiBudW1iZXIsIGg0OiBudW1iZXIsIGJpdHM6IG51bWJlciwgYzE6IG51bWJlciwgYzI6IG51bWJlciwgYzM6IG51bWJlciwgZGVjb2RlZCA9IFwiXCI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gNCkge1xuICAgICAgLy9FdmVyeSA0IGJhc2U2NCBlbmNvZGVkIGNoYXJhY3RlciB3aWxsIGJlIGNvbnZlcnRlZCB0byAzIGJ5dGUgc3RyaW5nLCB3aGljaCBpcyAyNCBiaXRzXG4gICAgICAvLyB0aGVuIDYgYml0cyBwZXIgYmFzZTY0IGVuY29kZWQgY2hhcmFjdGVyXG4gICAgICBoMSA9IGNvZGVzLmluZGV4T2YoYmFzZTY0SWRUb2tlbi5jaGFyQXQoaSkpO1xuICAgICAgaDIgPSBjb2Rlcy5pbmRleE9mKGJhc2U2NElkVG9rZW4uY2hhckF0KGkgKyAxKSk7XG4gICAgICBoMyA9IGNvZGVzLmluZGV4T2YoYmFzZTY0SWRUb2tlbi5jaGFyQXQoaSArIDIpKTtcbiAgICAgIGg0ID0gY29kZXMuaW5kZXhPZihiYXNlNjRJZFRva2VuLmNoYXJBdChpICsgMykpO1xuICAgICAgLy8gRm9yIHBhZGRpbmcsIGlmIGxhc3QgdHdvIGFyZSBcIj1cIlxuICAgICAgaWYgKGkgKyAyID09PSBsZW5ndGggLSAxKSB7XG4gICAgICAgIGJpdHMgPSBoMSA8PCAxOCB8IGgyIDw8IDEyIHwgaDMgPDwgNjtcbiAgICAgICAgYzEgPSBiaXRzID4+IDE2ICYgMjU1O1xuICAgICAgICBjMiA9IGJpdHMgPj4gOCAmIDI1NTtcbiAgICAgICAgZGVjb2RlZCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMxLCBjMik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgLy8gaWYgbGFzdCBvbmUgaXMgXCI9XCJcbiAgICAgIGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGggLSAxKSB7XG4gICAgICAgIGJpdHMgPSBoMSA8PCAxOCB8IGgyIDw8IDEyO1xuICAgICAgICBjMSA9IGJpdHMgPj4gMTYgJiAyNTU7XG4gICAgICAgIGRlY29kZWQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgYml0cyA9IGgxIDw8IDE4IHwgaDIgPDwgMTIgfCBoMyA8PCA2IHwgaDQ7XG4gICAgICAvLyB0aGVuIGNvbnZlcnQgdG8gMyBieXRlIGNoYXJzXG4gICAgICBjMSA9IGJpdHMgPj4gMTYgJiAyNTU7XG4gICAgICBjMiA9IGJpdHMgPj4gOCAmIDI1NTtcbiAgICAgIGMzID0gYml0cyAmIDI1NTtcbiAgICAgIGRlY29kZWQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjMSwgYzIsIGMzKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlY29kZWQ7XG4gIH1cblxuICAvKipcbiAgICogZGVzZXJpYWxpemUgYSBzdHJpbmdcbiAgICpcbiAgICogQHBhcmFtIHF1ZXJ5XG4gICAqL1xuICBzdGF0aWMgZGVzZXJpYWxpemUocXVlcnk6IHN0cmluZyk6IGFueSB7XG4gICAgbGV0IG1hdGNoOiBBcnJheTxzdHJpbmc+OyAvLyBSZWdleCBmb3IgcmVwbGFjaW5nIGFkZGl0aW9uIHN5bWJvbCB3aXRoIGEgc3BhY2VcbiAgICBjb25zdCBwbCA9IC9cXCsvZztcbiAgICBjb25zdCBzZWFyY2ggPSAvKFteJj1dKyk9KFteJl0qKS9nO1xuICAgIGNvbnN0IGRlY29kZSA9IChzOiBzdHJpbmcpID0+IGRlY29kZVVSSUNvbXBvbmVudChzLnJlcGxhY2UocGwsIFwiIFwiKSk7XG4gICAgY29uc3Qgb2JqOiB7fSA9IHt9O1xuICAgIG1hdGNoID0gc2VhcmNoLmV4ZWMocXVlcnkpO1xuICAgIHdoaWxlIChtYXRjaCkge1xuICAgICAgb2JqW2RlY29kZShtYXRjaFsxXSldID0gZGVjb2RlKG1hdGNoWzJdKTtcbiAgICAgIG1hdGNoID0gc2VhcmNoLmV4ZWMocXVlcnkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgLy8jZW5kcmVnaW9uXG5cbiAgLy8jcmVnaW9uIFNjb3BlcyAoZXh0cmFjdCB0byBTY29wZXMudHMpXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZXJlIGFyZSBkdXAgc2NvcGVzIGluIGEgZ2l2ZW4gcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0gY2FjaGVkU2NvcGVzXG4gICAqIEBwYXJhbSBzY29wZXNcbiAgICovXG4gIC8vIFRPRE86IFJlbmFtZSB0aGlzLCBpbnRlcnNlY3Rpbmcgc2NvcGVzIGlzbid0IGEgZ3JlYXQgbmFtZSBmb3IgZHVwbGljYXRlIGNoZWNrZXJcbiAgc3RhdGljIGlzSW50ZXJzZWN0aW5nU2NvcGVzKGNhY2hlZFNjb3BlczogQXJyYXk8c3RyaW5nPiwgc2NvcGVzOiBBcnJheTxzdHJpbmc+KTogYm9vbGVhbiB7XG4gICAgY2FjaGVkU2NvcGVzID0gdGhpcy5jb252ZXJ0VG9Mb3dlckNhc2UoY2FjaGVkU2NvcGVzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3Blcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2FjaGVkU2NvcGVzLmluZGV4T2Yoc2NvcGVzW2ldLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGdpdmVuIHNjb3BlIGlzIHByZXNlbnQgaW4gdGhlIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIGNhY2hlZFNjb3Blc1xuICAgKiBAcGFyYW0gc2NvcGVzXG4gICAqL1xuICBzdGF0aWMgY29udGFpbnNTY29wZShjYWNoZWRTY29wZXM6IEFycmF5PHN0cmluZz4sIHNjb3BlczogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4ge1xuICAgIGNhY2hlZFNjb3BlcyA9IHRoaXMuY29udmVydFRvTG93ZXJDYXNlKGNhY2hlZFNjb3Blcyk7XG4gICAgcmV0dXJuIHNjb3Blcy5ldmVyeSgodmFsdWU6IGFueSk6IGJvb2xlYW4gPT4gY2FjaGVkU2NvcGVzLmluZGV4T2YodmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSA+PSAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0b0xvd2VyXG4gICAqXG4gICAqIEBwYXJhbSBzY29wZXNcbiAgICovXG4gIC8vIFRPRE86IFJlbmFtZSB0aGlzLCB0b28gZ2VuZXJpYyBuYW1lIGZvciBhIGZ1bmN0aW9uIHRoYXQgb25seSBkZWFscyB3aXRoIHNjb3Blc1xuICBzdGF0aWMgY29udmVydFRvTG93ZXJDYXNlKHNjb3BlczogQXJyYXk8c3RyaW5nPik6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiBzY29wZXMubWFwKHNjb3BlID0+IHNjb3BlLnRvTG93ZXJDYXNlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBvbmUgZWxlbWVudCBmcm9tIGEgc2NvcGUgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIHNjb3Blc1xuICAgKiBAcGFyYW0gc2NvcGVcbiAgICovXG4gIC8vIFRPRE86IFJlbmFtZSB0aGlzLCB0b28gZ2VuZXJpYyBuYW1lIGZvciBhIGZ1bmN0aW9uIHRoYXQgb25seSBkZWFscyB3aXRoIHNjb3Blc1xuICBzdGF0aWMgcmVtb3ZlRWxlbWVudChzY29wZXM6IEFycmF5PHN0cmluZz4sIHNjb3BlOiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAgICByZXR1cm4gc2NvcGVzLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPT0gc2NvcGUpO1xuICB9XG5cbiAgLy8jZW5kcmVnaW9uXG5cbiAgLy8jcmVnaW9uIFVSTCBQcm9jZXNzaW5nIChFeHRyYWN0IHRvIFVybFByb2Nlc3NpbmcudHM/KVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0UmVkaXJlY3RVcmkoKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0uc3BsaXQoXCIjXCIpWzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgdXJsIGxpa2UgaHR0cHM6Ly9hOmIvY29tbW9uL2Q/ZT1mI2csIGFuZCBhIHRlbmFudElkLCByZXR1cm5zIGh0dHBzOi8vYTpiL3RlbmFudElkL2RcbiAgICogQHBhcmFtIGhyZWYgVGhlIHVybFxuICAgKiBAcGFyYW0gdGVuYW50SWQgVGhlIHRlbmFudCBpZCB0byByZXBsYWNlXG4gICAqL1xuICBzdGF0aWMgcmVwbGFjZVRlbmFudFBhdGgodXJsOiBzdHJpbmcsIHRlbmFudElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgdXJsID0gdXJsLnRvTG93ZXJDYXNlKCk7XG4gICAgICB2YXIgdXJsT2JqZWN0ID0gdGhpcy5HZXRVcmxDb21wb25lbnRzKHVybCk7XG4gICAgICB2YXIgcGF0aEFycmF5ID0gdXJsT2JqZWN0LlBhdGhTZWdtZW50cztcbiAgICAgIGlmICh0ZW5hbnRJZCAmJiAocGF0aEFycmF5Lmxlbmd0aCAhPT0gMCAmJiAocGF0aEFycmF5WzBdID09PSBDb25zdGFudHMuY29tbW9uIHx8IHBhdGhBcnJheVswXSA9PT0gU1NPVHlwZXMuT1JHQU5JWkFUSU9OUykpKSB7XG4gICAgICAgIHBhdGhBcnJheVswXSA9IHRlbmFudElkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0QXV0aG9yaXR5VXJpRnJvbU9iamVjdCh1cmxPYmplY3QsIHBhdGhBcnJheSk7XG4gIH1cblxuICBzdGF0aWMgY29uc3RydWN0QXV0aG9yaXR5VXJpRnJvbU9iamVjdCh1cmxPYmplY3Q6IElVcmksIHBhdGhBcnJheTogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gdGhpcy5DYW5vbmljYWxpemVVcmkodXJsT2JqZWN0LlByb3RvY29sICsgXCIvL1wiICsgdXJsT2JqZWN0Lkhvc3ROYW1lQW5kUG9ydCArIFwiL1wiICsgcGF0aEFycmF5LmpvaW4oXCIvXCIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgb3V0IHRoZSBjb21wb25lbnRzIGZyb20gYSB1cmwgc3RyaW5nLlxuICAgKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCB0aGUgdmFyaW91cyBjb21wb25lbnRzLiBQbGVhc2UgY2FjaGUgdGhpcyB2YWx1ZSBpbnN0ZWQgb2YgY2FsbGluZyB0aGlzIG11bHRpcGxlIHRpbWVzIG9uIHRoZSBzYW1lIHVybC5cbiAgICovXG4gIHN0YXRpYyBHZXRVcmxDb21wb25lbnRzKHVybDogc3RyaW5nKTogSVVyaSB7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHRocm93IFwiVXJsIHJlcXVpcmVkXCI7XG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vY3VydGlzei8xMTEzOWIyY2ZjYWVmNGEyNjFlMFxuICAgIHZhciByZWdFeCA9IFJlZ0V4cChcIl4oKFteOi8/I10rKTopPygvLyhbXi8/I10qKSk/KFtePyNdKikoXFxcXD8oW14jXSopKT8oIyguKikpP1wiKTtcblxuICAgIHZhciBtYXRjaCA9IHVybC5tYXRjaChyZWdFeCk7XG5cbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmxlbmd0aCA8IDYpIHtcbiAgICAgIHRocm93IFwiVmFsaWQgdXJsIHJlcXVpcmVkXCI7XG4gICAgfVxuXG4gICAgbGV0IHVybENvbXBvbmVudHMgPSA8SVVyaT57XG4gICAgICBQcm90b2NvbDogbWF0Y2hbMV0sXG4gICAgICBIb3N0TmFtZUFuZFBvcnQ6IG1hdGNoWzRdLFxuICAgICAgQWJzb2x1dGVQYXRoOiBtYXRjaFs1XVxuICAgIH07XG5cbiAgICBsZXQgcGF0aFNlZ21lbnRzID0gdXJsQ29tcG9uZW50cy5BYnNvbHV0ZVBhdGguc3BsaXQoXCIvXCIpO1xuICAgIHBhdGhTZWdtZW50cyA9IHBhdGhTZWdtZW50cy5maWx0ZXIoKHZhbCkgPT4gdmFsICYmIHZhbC5sZW5ndGggPiAwKTsgLy8gcmVtb3ZlIGVtcHR5IGVsZW1lbnRzXG4gICAgdXJsQ29tcG9uZW50cy5QYXRoU2VnbWVudHMgPSBwYXRoU2VnbWVudHM7XG4gICAgcmV0dXJuIHVybENvbXBvbmVudHM7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSB1cmwgb3IgcGF0aCwgYXBwZW5kIGEgdHJhaWxpbmcgc2xhc2ggaWYgb25lIGRvZXNudCBleGlzdFxuICAgKlxuICAgKiBAcGFyYW0gdXJsXG4gICAqL1xuICBzdGF0aWMgQ2Fub25pY2FsaXplVXJpKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodXJsKSB7XG4gICAgICB1cmwgPSB1cmwudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBpZiAodXJsICYmICFVdGlscy5lbmRzV2l0aCh1cmwsIFwiL1wiKSkge1xuICAgICAgdXJsICs9IFwiL1wiO1xuICAgIH1cblxuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgdXJsIGVuZHMgd2l0aCB0aGUgc3VmZml4XG4gICAqIFJlcXVpcmVkIGJlY2F1c2Ugd2UgYXJlIGNvbXBpbGluZyBmb3IgZXM1IGluc3RlYWQgb2YgZXM2XG4gICAqIEBwYXJhbSB1cmxcbiAgICogQHBhcmFtIHN0clxuICAgKi9cbiAgLy8gVE9ETzogUmVuYW1lIHRoaXMsIG5vdCBjbGVhciB3aGF0IGl0IGlzIHN1cHBvc2VkIHRvIGRvXG4gIHN0YXRpYyBlbmRzV2l0aCh1cmw6IHN0cmluZywgc3VmZml4OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIXVybCB8fCAhc3VmZml4KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybC5pbmRleE9mKHN1ZmZpeCwgdXJsLmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGgpICE9PSAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVdGlscyBmdW5jdGlvbiB0byByZW1vdmUgdGhlIGxvZ2luX2hpbnQgYW5kIGRvbWFpbl9oaW50IGZyb20gdGhlIGkvcCBleHRyYVF1ZXJ5UGFyYW1ldGVyc1xuICAgKiBAcGFyYW0gdXJsXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqL1xuICBzdGF0aWMgdXJsUmVtb3ZlUXVlcnlTdHJpbmdQYXJhbWV0ZXIodXJsOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eSh1cmwpKSB7XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCIoXFxcXCZcIiArIG5hbWUgKyBcIj0pW15cXCZdK1wiKTtcbiAgICB1cmwgPSB1cmwucmVwbGFjZShyZWdleCwgXCJcIik7XG4gICAgLy8gbmFtZT12YWx1ZSZcbiAgICByZWdleCA9IG5ldyBSZWdFeHAoXCIoXCIgKyBuYW1lICsgXCI9KVteXFwmXSsmXCIpO1xuICAgIHVybCA9IHVybC5yZXBsYWNlKHJlZ2V4LCBcIlwiKTtcbiAgICAvLyBuYW1lPXZhbHVlXG4gICAgcmVnZXggPSBuZXcgUmVnRXhwKFwiKFwiICsgbmFtZSArIFwiPSlbXlxcJl0rXCIpO1xuICAgIHVybCA9IHVybC5yZXBsYWNlKHJlZ2V4LCBcIlwiKTtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgLy8jZW5kcmVnaW9uXG5cbiAgLy8jcmVnaW9uIEV4dHJhUXVlcnlQYXJhbWV0ZXJzIFByb2Nlc3NpbmcgKEV4dHJhY3Q/KVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGV4dHJhUXVlcnlQYXJhbWV0ZXJzIHRvIGJlIHNlbnQgdG8gdGhlIHNlcnZlciBmb3IgdGhlIEF1dGhlbnRpY2F0aW9uUGFyYW1ldGVycyBzZXQgYnkgdGhlIGRldmVsb3BlclxuICAgKiBpbiBhbnkgbG9naW4oKSBvciBhY3F1aXJlVG9rZW4oKSBjYWxsc1xuICAgKiBAcGFyYW0gaWRUb2tlbk9iamVjdFxuICAgKiBAcGFyYW0gZXh0cmFRdWVyeVBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHNpZFxuICAgKiBAcGFyYW0gbG9naW5IaW50XG4gICAqL1xuICAvL1RPRE86IGNoZWNrIGhvdyB0aGlzIGJlaGF2ZXMgd2hlbiBkb21haW5faGludCBvbmx5IGlzIHNlbnQgaW4gZXh0cmFwYXJhbWV0ZXJzIGFuZCBpZFRva2VuIGhhcyBubyB1cG4uXG4gIHN0YXRpYyBjb25zdHJ1Y3RVbmlmaWVkQ2FjaGVRdWVyeVBhcmFtZXRlcihyZXF1ZXN0OiBBdXRoZW50aWNhdGlvblBhcmFtZXRlcnMsIGlkVG9rZW5PYmplY3Q6IGFueSk6IFFQRGljdCB7XG5cbiAgICAvLyBwcmVmZXJlbmNlIG9yZGVyOiBhY2NvdW50ID4gc2lkID4gbG9naW5faGludFxuICAgIGxldCBzc29UeXBlO1xuICAgIGxldCBzc29EYXRhO1xuICAgIGxldCBzZXJ2ZXJSZXFQYXJhbTogUVBEaWN0ID0ge307XG4gICAgLy8gaWYgYWNjb3VudCBpbmZvIGlzIHBhc3NlZCwgYWNjb3VudC5zaWQgPiBhY2NvdW50LmxvZ2luX2hpbnRcbiAgICBpZiAocmVxdWVzdCkge1xuICAgICAgaWYgKHJlcXVlc3QuYWNjb3VudCkge1xuICAgICAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0gcmVxdWVzdC5hY2NvdW50O1xuICAgICAgICBpZiAoYWNjb3VudC5zaWQpIHtcbiAgICAgICAgICBzc29UeXBlID0gU1NPVHlwZXMuU0lEO1xuICAgICAgICAgIHNzb0RhdGEgPSBhY2NvdW50LnNpZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY2NvdW50LnVzZXJOYW1lKSB7XG4gICAgICAgICAgc3NvVHlwZSA9IFNTT1R5cGVzLkxPR0lOX0hJTlQ7XG4gICAgICAgICAgc3NvRGF0YSA9IGFjY291bnQudXNlck5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIHNpZCBmcm9tIHJlcXVlc3RcbiAgICAgIGVsc2UgaWYgKHJlcXVlc3Quc2lkKSB7XG4gICAgICAgIHNzb1R5cGUgPSBTU09UeXBlcy5TSUQ7XG4gICAgICAgIHNzb0RhdGEgPSByZXF1ZXN0LnNpZDtcbiAgICAgIH1cbiAgICAgIC8vIGxvZ2luSGludCBmcm9tIHJlcXVlc3RcbiAgICAgIGVsc2UgaWYgKHJlcXVlc3QubG9naW5IaW50KSB7XG4gICAgICAgIHNzb1R5cGUgPSBTU09UeXBlcy5MT0dJTl9ISU5UO1xuICAgICAgICBzc29EYXRhID0gcmVxdWVzdC5sb2dpbkhpbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGFkYWxJZFRva2VuIHJldHJpZXZlZCBmcm9tIGNhY2hlXG4gICAgZWxzZSBpZiAoaWRUb2tlbk9iamVjdCkge1xuICAgICAgaWYgKGlkVG9rZW5PYmplY3QuaGFzT3duUHJvcGVydHkoQ29uc3RhbnRzLnVwbikpIHtcbiAgICAgICAgc3NvVHlwZSA9IFNTT1R5cGVzLklEX1RPS0VOO1xuICAgICAgICBzc29EYXRhID0gaWRUb2tlbk9iamVjdC51cG47XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3NvVHlwZSA9IFNTT1R5cGVzLk9SR0FOSVpBVElPTlM7XG4gICAgICAgIHNzb0RhdGEgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNlcnZlclJlcVBhcmFtID0gdGhpcy5hZGRTU09QYXJhbWV0ZXIoc3NvVHlwZSwgc3NvRGF0YSk7XG5cbiAgICAvLyBhZGQgdGhlIEhvbWVBY2NvdW50SWRlbnRpZmllciBpbmZvLyBkb21haW5faGludFxuICAgIGlmIChyZXF1ZXN0ICYmIHJlcXVlc3QuYWNjb3VudCAmJiByZXF1ZXN0LmFjY291bnQuaG9tZUFjY291bnRJZGVudGlmaWVyKSB7XG4gICAgICAgIHNlcnZlclJlcVBhcmFtID0gdGhpcy5hZGRTU09QYXJhbWV0ZXIoU1NPVHlwZXMuSE9NRUFDQ09VTlRfSUQsIHJlcXVlc3QuYWNjb3VudC5ob21lQWNjb3VudElkZW50aWZpZXIsIHNlcnZlclJlcVBhcmFtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VydmVyUmVxUGFyYW07XG4gIH1cblxuXG4gIC8qKlxuICAgKiBBZGQgU0lEIHRvIGV4dHJhUXVlcnlQYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSBzaWRcbiAgICovXG4gIHN0YXRpYyBhZGRTU09QYXJhbWV0ZXIoc3NvVHlwZTogc3RyaW5nLCBzc29EYXRhOiBzdHJpbmcsIHNzb1BhcmFtPzogUVBEaWN0KTogUVBEaWN0IHtcbiAgICBpZiAoIXNzb1BhcmFtKSB7XG4gICAgICBzc29QYXJhbSA9IHt9O1xuICAgIH1cblxuICAgIGlmICghc3NvRGF0YSkge1xuICAgICAgICByZXR1cm4gc3NvUGFyYW07XG4gICAgfVxuXG4gICAgc3dpdGNoIChzc29UeXBlKSB7XG4gICAgICBjYXNlIFNTT1R5cGVzLlNJRDoge1xuICAgICAgICBzc29QYXJhbVtTU09UeXBlcy5TSURdID0gc3NvRGF0YTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFNTT1R5cGVzLklEX1RPS0VOOiB7XG4gICAgICAgIHNzb1BhcmFtW1NTT1R5cGVzLkxPR0lOX0hJTlRdID0gc3NvRGF0YTtcbiAgICAgICAgc3NvUGFyYW1bU1NPVHlwZXMuRE9NQUlOX0hJTlRdID0gU1NPVHlwZXMuT1JHQU5JWkFUSU9OUztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFNTT1R5cGVzLkxPR0lOX0hJTlQ6IHtcbiAgICAgICAgc3NvUGFyYW1bU1NPVHlwZXMuTE9HSU5fSElOVF0gPSBzc29EYXRhO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgU1NPVHlwZXMuT1JHQU5JWkFUSU9OUzoge1xuICAgICAgICBzc29QYXJhbVtTU09UeXBlcy5ET01BSU5fSElOVF0gPSBTU09UeXBlcy5PUkdBTklaQVRJT05TO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgU1NPVHlwZXMuQ09OU1VNRVJTOiB7XG4gICAgICAgIHNzb1BhcmFtW1NTT1R5cGVzLkRPTUFJTl9ISU5UXSA9IFNTT1R5cGVzLkNPTlNVTUVSUztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFNTT1R5cGVzLkhPTUVBQ0NPVU5UX0lEOiB7XG4gICAgICAgIGxldCBob21lQWNjb3VudElkID0gc3NvRGF0YS5zcGxpdChcIi5cIik7XG4gICAgICAgIGNvbnN0IHVpZCA9IFV0aWxzLmJhc2U2NERlY29kZVN0cmluZ1VybFNhZmUoaG9tZUFjY291bnRJZFswXSk7XG4gICAgICAgIGNvbnN0IHV0aWQgPSBVdGlscy5iYXNlNjREZWNvZGVTdHJpbmdVcmxTYWZlKGhvbWVBY2NvdW50SWRbMV0pO1xuXG4gICAgICAgIC8vIFRPRE86IGRvbWFpbl9yZXEgYW5kIGxvZ2luX3JlcSBhcmUgbm90IG5lZWRlZCBhY2NvcmRpbmcgdG8gZVNUUyB0ZWFtXG4gICAgICAgIHNzb1BhcmFtW1NTT1R5cGVzLkxPR0lOX1JFUV0gPSB1aWQ7XG4gICAgICAgIHNzb1BhcmFtW1NTT1R5cGVzLkRPTUFJTl9SRVFdID0gdXRpZDtcblxuICAgICAgICBpZiAodXRpZCA9PT0gQ29uc3RhbnRzLmNvbnN1bWVyc1V0aWQpIHtcbiAgICAgICAgICAgIHNzb1BhcmFtW1NTT1R5cGVzLkRPTUFJTl9ISU5UXSA9IFNTT1R5cGVzLkNPTlNVTUVSUztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNzb1BhcmFtW1NTT1R5cGVzLkRPTUFJTl9ISU5UXSA9IFNTT1R5cGVzLk9SR0FOSVpBVElPTlM7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFNTT1R5cGVzLkxPR0lOX1JFUToge1xuICAgICAgICBzc29QYXJhbVtTU09UeXBlcy5MT0dJTl9SRVFdID0gc3NvRGF0YTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFNTT1R5cGVzLkRPTUFJTl9SRVE6IHtcbiAgICAgICAgc3NvUGFyYW1bU1NPVHlwZXMuRE9NQUlOX1JFUV0gPSBzc29EYXRhO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3NvUGFyYW07XG4gIH1cblxuICAvKipcbiAgICogVXRpbGl0eSB0byBnZW5lcmF0ZSBhIFF1ZXJ5UGFyYW1ldGVyU3RyaW5nIGZyb20gYSBLZXktVmFsdWUgbWFwcGluZyBvZiBleHRyYVF1ZXJ5UGFyYW1ldGVycyBwYXNzZWRcbiAgICogQHBhcmFtIGV4dHJhUXVlcnlQYXJhbWV0ZXJzXG4gICAqL1xuICBzdGF0aWMgZ2VuZXJhdGVRdWVyeVBhcmFtZXRlcnNTdHJpbmcocXVlcnlQYXJhbWV0ZXJzOiBRUERpY3QpOiBzdHJpbmcge1xuICAgIGxldCBwYXJhbXNTdHJpbmc6IHN0cmluZyA9IG51bGw7XG5cbiAgICBpZiAocXVlcnlQYXJhbWV0ZXJzKSB7XG4gICAgICBPYmplY3Qua2V5cyhxdWVyeVBhcmFtZXRlcnMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChwYXJhbXNTdHJpbmcgPT0gbnVsbCkge1xuICAgICAgICAgIHBhcmFtc1N0cmluZyA9IGAke2tleX09JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnlQYXJhbWV0ZXJzW2tleV0pfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcGFyYW1zU3RyaW5nICs9IGAmJHtrZXl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5UGFyYW1ldGVyc1trZXldKX1gO1xuICAgICAgICB9XG4gICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXNTdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdG8gc2VlIGlmIHRoZXJlIGFyZSBTU08gcGFyYW1zIHNldCBpbiB0aGUgUmVxdWVzdFxuICAgKiBAcGFyYW0gcmVxdWVzdFxuICAgKi9cbiAgc3RhdGljIGlzU1NPUGFyYW0ocmVxdWVzdDogQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdCAmJiAocmVxdWVzdC5hY2NvdW50IHx8IHJlcXVlc3Quc2lkIHx8IHJlcXVlc3QubG9naW5IaW50KTtcbiAgfVxuXG4gIC8vI2VuZHJlZ2lvblxuXG4gIC8vI3JlZ2lvbiBSZXNwb25zZSBIZWxwZXJzXG5cbiAgc3RhdGljIHNldFJlc3BvbnNlSWRUb2tlbihvcmlnaW5hbFJlc3BvbnNlOiBBdXRoUmVzcG9uc2UsIGlkVG9rZW46IElkVG9rZW4pIDogQXV0aFJlc3BvbnNlIHtcbiAgICB2YXIgcmVzcG9uc2UgPSB7IC4uLm9yaWdpbmFsUmVzcG9uc2UgfTtcbiAgICByZXNwb25zZS5pZFRva2VuID0gaWRUb2tlbjtcbiAgICBpZiAocmVzcG9uc2UuaWRUb2tlbi5vYmplY3RJZCkge1xuICAgICAgcmVzcG9uc2UudW5pcXVlSWQgPSByZXNwb25zZS5pZFRva2VuLm9iamVjdElkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZS51bmlxdWVJZCA9IHJlc3BvbnNlLmlkVG9rZW4uc3ViamVjdDtcbiAgICB9XG4gICAgcmVzcG9uc2UudGVuYW50SWQgPSByZXNwb25zZS5pZFRva2VuLnRlbmFudElkO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIC8vI2VuZHJlZ2lvblxuXG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IENhY2hlTG9jYXRpb24gfSBmcm9tIFwiLi9Db25maWd1cmF0aW9uXCI7XHJcblxyXG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuLyoqXHJcbiAqIEBoaWRkZW5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25zdGFudHMge1xyXG4gIHN0YXRpYyBnZXQgZXJyb3JEZXNjcmlwdGlvbigpOiBzdHJpbmcgeyByZXR1cm4gXCJlcnJvcl9kZXNjcmlwdGlvblwiOyB9XHJcbiAgc3RhdGljIGdldCBlcnJvcigpOiBzdHJpbmcgeyByZXR1cm4gXCJlcnJvclwiOyB9XHJcblxyXG4gIHN0YXRpYyBnZXQgc2NvcGUoKTogc3RyaW5nIHsgcmV0dXJuIFwic2NvcGVcIjsgfVxyXG4gIHN0YXRpYyBnZXQgY2xpZW50SW5mbygpOiBzdHJpbmcgeyByZXR1cm4gXCJjbGllbnRfaW5mb1wiOyB9XHJcbiAgc3RhdGljIGdldCBjbGllbnRJZCgpOiBzdHJpbmcgeyByZXR1cm4gXCJjbGllbnRJZFwiOyB9XHJcblxyXG4gIHN0YXRpYyBnZXQgaWRUb2tlbigpOiBzdHJpbmcgeyByZXR1cm4gXCJpZF90b2tlblwiOyB9XHJcbiAgc3RhdGljIGdldCBhZGFsSWRUb2tlbigpOiBzdHJpbmcgeyByZXR1cm4gXCJhZGFsLmlkdG9rZW5cIjsgfVxyXG4gIHN0YXRpYyBnZXQgYWNjZXNzVG9rZW4oKTogc3RyaW5nIHsgcmV0dXJuIFwiYWNjZXNzX3Rva2VuXCI7IH1cclxuICBzdGF0aWMgZ2V0IGV4cGlyZXNJbigpOiBzdHJpbmcgeyByZXR1cm4gXCJleHBpcmVzX2luXCI7IH1cclxuICBzdGF0aWMgZ2V0IHNlc3Npb25TdGF0ZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJzZXNzaW9uX3N0YXRlXCI7IH1cclxuICBzdGF0aWMgZ2V0IGNsYWltcygpOiBzdHJpbmcgeyByZXR1cm4gXCJjbGFpbXNcIjsgfVxyXG5cclxuICBzdGF0aWMgZ2V0IG1zYWxDbGllbnRJbmZvKCk6IHN0cmluZyB7IHJldHVybiBcIm1zYWwuY2xpZW50LmluZm9cIjsgfVxyXG4gIHN0YXRpYyBnZXQgbXNhbEVycm9yKCk6IHN0cmluZyB7IHJldHVybiBcIm1zYWwuZXJyb3JcIjsgfVxyXG4gIHN0YXRpYyBnZXQgbXNhbEVycm9yRGVzY3JpcHRpb24oKTogc3RyaW5nIHsgcmV0dXJuIFwibXNhbC5lcnJvci5kZXNjcmlwdGlvblwiOyB9XHJcblxyXG4gIHN0YXRpYyBnZXQgbXNhbFNlc3Npb25TdGF0ZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJtc2FsLnNlc3Npb24uc3RhdGVcIjsgfVxyXG4gIHN0YXRpYyBnZXQgdG9rZW5LZXlzKCk6IHN0cmluZyB7IHJldHVybiBcIm1zYWwudG9rZW4ua2V5c1wiOyB9XHJcbiAgc3RhdGljIGdldCBhY2Nlc3NUb2tlbktleSgpOiBzdHJpbmcgeyByZXR1cm4gXCJtc2FsLmFjY2Vzcy50b2tlbi5rZXlcIjsgfVxyXG4gIHN0YXRpYyBnZXQgZXhwaXJhdGlvbktleSgpOiBzdHJpbmcgeyByZXR1cm4gXCJtc2FsLmV4cGlyYXRpb24ua2V5XCI7IH1cclxuICBzdGF0aWMgZ2V0IHN0YXRlTG9naW4oKTogc3RyaW5nIHsgcmV0dXJuIFwibXNhbC5zdGF0ZS5sb2dpblwiOyB9XHJcbiAgc3RhdGljIGdldCBzdGF0ZUFjcXVpcmVUb2tlbigpOiBzdHJpbmcgeyByZXR1cm4gXCJtc2FsLnN0YXRlLmFjcXVpcmVUb2tlblwiOyB9XHJcbiAgc3RhdGljIGdldCBzdGF0ZVJlbmV3KCk6IHN0cmluZyB7IHJldHVybiBcIm1zYWwuc3RhdGUucmVuZXdcIjsgfVxyXG4gIHN0YXRpYyBnZXQgbm9uY2VJZFRva2VuKCk6IHN0cmluZyB7IHJldHVybiBcIm1zYWwubm9uY2UuaWR0b2tlblwiOyB9XHJcbiAgc3RhdGljIGdldCB1c2VyTmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJtc2FsLnVzZXJuYW1lXCI7IH1cclxuICBzdGF0aWMgZ2V0IGlkVG9rZW5LZXkoKTogc3RyaW5nIHsgcmV0dXJuIFwibXNhbC5pZHRva2VuXCI7IH1cclxuICBzdGF0aWMgZ2V0IGxvZ2luUmVxdWVzdCgpOiBzdHJpbmcgeyByZXR1cm4gXCJtc2FsLmxvZ2luLnJlcXVlc3RcIjsgfVxyXG4gIHN0YXRpYyBnZXQgbG9naW5FcnJvcigpOiBzdHJpbmcgeyByZXR1cm4gXCJtc2FsLmxvZ2luLmVycm9yXCI7IH1cclxuICBzdGF0aWMgZ2V0IHJlbmV3U3RhdHVzKCk6IHN0cmluZyB7IHJldHVybiBcIm1zYWwudG9rZW4ucmVuZXcuc3RhdHVzXCI7IH1cclxuICBzdGF0aWMgZ2V0IHVybEhhc2goKTogc3RyaW5nIHsgcmV0dXJuIFwibXNhbC51cmxIYXNoXCI7IH1cclxuICBzdGF0aWMgZ2V0IGFuZ3VsYXJMb2dpblJlcXVlc3QoKTogc3RyaW5nIHsgcmV0dXJuIFwibXNhbC5hbmd1bGFyLmxvZ2luLnJlcXVlc3RcIjsgfVxyXG4gIHN0YXRpYyBnZXQgbXNhbCgpOiBzdHJpbmcgeyByZXR1cm4gXCJtc2FsXCI7IH1cclxuXHJcbiAgc3RhdGljIGdldCBub19hY2NvdW50KCk6IHN0cmluZyB7IHJldHVybiBcIk5PX0FDQ09VTlRcIjsgfVxyXG4gIHN0YXRpYyBnZXQgY29uc3VtZXJzVXRpZCgpOiBzdHJpbmcgeyByZXR1cm4gXCI5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWRcIjsgfVxyXG4gIHN0YXRpYyBnZXQgdXBuKCk6IHN0cmluZyB7IHJldHVybiBcInVwblwiOyB9XHJcblxyXG4gIHN0YXRpYyBnZXQgcHJvbXB0X3NlbGVjdF9hY2NvdW50KCk6IHN0cmluZyB7IHJldHVybiBcIiZwcm9tcHQ9c2VsZWN0X2FjY291bnRcIjsgfVxyXG4gIHN0YXRpYyBnZXQgcHJvbXB0X25vbmUoKTogc3RyaW5nIHsgcmV0dXJuIFwiJnByb21wdD1ub25lXCI7IH1cclxuICBzdGF0aWMgZ2V0IHByb21wdCgpOiBzdHJpbmcgeyByZXR1cm4gXCJwcm9tcHRcIjsgfVxyXG5cclxuICBzdGF0aWMgZ2V0IHJlc3BvbnNlX21vZGVfZnJhZ21lbnQoKTogc3RyaW5nIHsgcmV0dXJuIFwiJnJlc3BvbnNlX21vZGU9ZnJhZ21lbnRcIjsgfVxyXG4gIHN0YXRpYyBnZXQgcmVzb3VyY2VEZWxpbWl0ZXIoKTogc3RyaW5nIHsgcmV0dXJuIFwifFwiOyB9XHJcblxyXG4gIHN0YXRpYyBnZXQgdG9rZW5SZW5ld1N0YXR1c0NhbmNlbGxlZCgpOiBzdHJpbmcgeyByZXR1cm4gXCJDYW5jZWxlZFwiOyB9XHJcbiAgc3RhdGljIGdldCB0b2tlblJlbmV3U3RhdHVzQ29tcGxldGVkKCk6IHN0cmluZyB7IHJldHVybiBcIkNvbXBsZXRlZFwiOyB9XHJcbiAgc3RhdGljIGdldCB0b2tlblJlbmV3U3RhdHVzSW5Qcm9ncmVzcygpOiBzdHJpbmcgeyByZXR1cm4gXCJJbiBQcm9ncmVzc1wiOyB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIF9wb3BVcFdpZHRoOiBudW1iZXIgPSA0ODM7XHJcbiAgc3RhdGljIGdldCBwb3BVcFdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9wb3BVcFdpZHRoOyB9XHJcbiAgc3RhdGljIHNldCBwb3BVcFdpZHRoKHdpZHRoOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3BvcFVwV2lkdGggPSB3aWR0aDtcclxuICB9XHJcbiAgcHJpdmF0ZSBzdGF0aWMgX3BvcFVwSGVpZ2h0OiBudW1iZXIgPSA2MDA7XHJcbiAgc3RhdGljIGdldCBwb3BVcEhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcG9wVXBIZWlnaHQ7IH1cclxuICBzdGF0aWMgc2V0IHBvcFVwSGVpZ2h0KGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9wb3BVcEhlaWdodCA9IGhlaWdodDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXQgbG9naW4oKTogc3RyaW5nIHsgcmV0dXJuIFwiTE9HSU5cIjsgfVxyXG4gIHN0YXRpYyBnZXQgcmVuZXdUb2tlbigpOiBzdHJpbmcgeyByZXR1cm4gXCJSRU5FV19UT0tFTlwiOyB9XHJcbiAgc3RhdGljIGdldCB1bmtub3duKCk6IHN0cmluZyB7IHJldHVybiBcIlVOS05PV05cIjsgfVxyXG5cclxuICBzdGF0aWMgZ2V0IGhvbWVBY2NvdW50SWRlbnRpZmllcigpOiBzdHJpbmcgeyByZXR1cm4gXCJob21lQWNjb3VudElkZW50aWZpZXJcIjsgfVxyXG5cclxuICBzdGF0aWMgZ2V0IGNvbW1vbigpOiBzdHJpbmcgeyByZXR1cm4gXCJjb21tb25cIjsgfVxyXG4gIHN0YXRpYyBnZXQgb3BlbmlkU2NvcGUoKTogc3RyaW5nIHsgcmV0dXJuIFwib3BlbmlkXCI7IH1cclxuICBzdGF0aWMgZ2V0IHByb2ZpbGVTY29wZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJwcm9maWxlXCI7IH1cclxuXHJcbiAgc3RhdGljIGdldCBjYWNoZUxvY2F0aW9uTG9jYWwoKTogQ2FjaGVMb2NhdGlvbiB7IHJldHVybiBcImxvY2FsU3RvcmFnZVwiOyB9XHJcbiAgc3RhdGljIGdldCBjYWNoZUxvY2F0aW9uU2Vzc2lvbigpOiBDYWNoZUxvY2F0aW9uIHsgcmV0dXJuIFwic2Vzc2lvblN0b3JhZ2VcIjsgfVxyXG59XHJcblxyXG4vKipcclxuICogQGhpZGRlblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IENhY2hlS2V5cyA9IHtcclxuICAgIEFVVEhPUklUWTogXCJtc2FsLmF1dGhvcml0eVwiLFxyXG4gICAgQUNRVUlSRV9UT0tFTl9BQ0NPVU5UOiBcIm1zYWwuYWNxdWlyZVRva2VuQWNjb3VudFwiXHJcbn07XHJcblxyXG4vKipcclxuICogQGhpZGRlblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFNTT1R5cGVzID0ge1xyXG4gICAgQUNDT1VOVDogXCJhY2NvdW50XCIsXHJcbiAgICBTSUQ6IFwic2lkXCIsXHJcbiAgICBMT0dJTl9ISU5UOiBcImxvZ2luX2hpbnRcIixcclxuICAgIElEX1RPS0VOOiBcImlkX3Rva2VuXCIsXHJcbiAgICBET01BSU5fSElOVDogXCJkb21haW5faGludFwiLFxyXG4gICAgT1JHQU5JWkFUSU9OUzogXCJvcmdhbml6YXRpb25zXCIsXHJcbiAgICBDT05TVU1FUlM6IFwiY29uc3VtZXJzXCIsXHJcbiAgICBBQ0NPVU5UX0lEOiBcImFjY291bnRJZGVudGlmaWVyXCIsXHJcbiAgICBIT01FQUNDT1VOVF9JRDogXCJob21lQWNjb3VudElkZW50aWZpZXJcIixcclxuICAgIExPR0lOX1JFUTogXCJsb2dpbl9yZXFcIixcclxuICAgIERPTUFJTl9SRVE6IFwiZG9tYWluX3JlcVwiXHJcbn07XHJcblxyXG4vKipcclxuICogd2UgY29uc2lkZXJlZCBtYWtpbmcgdGhpcyBcImVudW1cIiBpbiB0aGUgcmVxdWVzdCBpbnN0ZWFkIG9mIHN0cmluZywgaG93ZXZlciBpdCBsb29rcyBsaWtlIHRoZSBhbGxvd2VkIGxpc3Qgb2ZcclxuICogcHJvbXB0IHZhbHVlcyBrZXB0IGNoYW5naW5nIG92ZXIgcGFzdCBjb3VwbGUgb2YgeWVhcnMuIFRoZXJlIGFyZSBzb21lIHVuZG9jdW1lbnRlZCBwcm9tcHQgdmFsdWVzIGZvciBzb21lXHJcbiAqIGludGVybmFsIHBhcnRuZXJzIHRvbywgaGVuY2UgdGhlIGNob2ljZSBvZiBnZW5lcmljIFwic3RyaW5nXCIgdHlwZSBpbnN0ZWFkIG9mIHRoZSBcImVudW1cIlxyXG4gKiBAaGlkZGVuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgUHJvbXB0U3RhdGUgPSB7XHJcblx0TE9HSU46IFwibG9naW5cIixcclxuXHRTRUxFQ1RfQUNDT1VOVDogXCJzZWxlY3RfYWNjb3VudFwiLFxyXG5cdENPTlNFTlQ6IFwiY29uc2VudFwiLFxyXG5cdE5PTkU6IFwibm9uZVwiLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IExpYnJhcnkgPSB7XHJcbiAgdmVyc2lvbjogXCIxLjAuMFwiXHJcbn07XHJcbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBDbGllbnRBdXRoRXJyb3IgfSBmcm9tIFwiLi9DbGllbnRBdXRoRXJyb3JcIjtcblxuZXhwb3J0IGNvbnN0IENsaWVudENvbmZpZ3VyYXRpb25FcnJvck1lc3NhZ2UgPSB7XG4gICAgY29uZmlndXJhdGlvbk5vdFNldDoge1xuICAgICAgICBjb2RlOiBcIm5vX2NvbmZpZ19zZXRcIixcbiAgICAgICAgZGVzYzogXCJDb25maWd1cmF0aW9uIGhhcyBub3QgYmVlbiBzZXQuIFBsZWFzZSBjYWxsIHRoZSBVc2VyQWdlbnRBcHBsaWNhdGlvbiBjb25zdHJ1Y3RvciB3aXRoIGEgdmFsaWQgQ29uZmlndXJhdGlvbiBvYmplY3QuXCJcbiAgICB9LFxuICAgIGludmFsaWRDYWNoZUxvY2F0aW9uOiB7XG4gICAgICAgIGNvZGU6IFwiaW52YWxpZF9jYWNoZV9sb2NhdGlvblwiLFxuICAgICAgICBkZXNjOiBcIlRoZSBjYWNoZSBsb2NhdGlvbiBwcm92aWRlZCBpcyBub3QgdmFsaWQuXCJcbiAgICB9LFxuICAgIG5vU3RvcmFnZVN1cHBvcnRlZDoge1xuICAgICAgICBjb2RlOiBcImJyb3dzZXJfc3RvcmFnZV9ub3Rfc3VwcG9ydGVkXCIsXG4gICAgICAgIGRlc2M6IFwibG9jYWxTdG9yYWdlIGFuZCBzZXNzaW9uU3RvcmFnZSBhcmUgbm90IHN1cHBvcnRlZC5cIlxuICAgIH0sXG4gICAgbm9SZWRpcmVjdENhbGxiYWNrc1NldDoge1xuICAgICAgICBjb2RlOiBcIm5vX3JlZGlyZWN0X2NhbGxiYWNrc1wiLFxuICAgICAgICBkZXNjOiBcIk5vIHJlZGlyZWN0IGNhbGxiYWNrcyBoYXZlIGJlZW4gc2V0LiBQbGVhc2UgY2FsbCBzZXRSZWRpcmVjdENhbGxiYWNrcygpIHdpdGggdGhlIGFwcHJvcHJpYXRlIGZ1bmN0aW9uIGFyZ3VtZW50cyBiZWZvcmUgY29udGludWluZy4gXCIgK1xuICAgICAgICAgICAgXCJNb3JlIGluZm9ybWF0aW9uIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vQXp1cmVBRC9taWNyb3NvZnQtYXV0aGVudGljYXRpb24tbGlicmFyeS1mb3ItanMvd2lraS8tYmFzaWNzLlwiXG4gICAgfSxcbiAgICBpbnZhbGlkQ2FsbGJhY2tPYmplY3Q6IHtcbiAgICAgICAgY29kZTogXCJpbnZhbGlkX2NhbGxiYWNrX29iamVjdFwiLFxuICAgICAgICBkZXNjOiBcIlRoZSBvYmplY3QgcGFzc2VkIGZvciB0aGUgY2FsbGJhY2sgd2FzIGludmFsaWQuIFwiICtcbiAgICAgICAgICBcIk1vcmUgaW5mb3JtYXRpb24gaXMgYXZhaWxhYmxlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9BenVyZUFEL21pY3Jvc29mdC1hdXRoZW50aWNhdGlvbi1saWJyYXJ5LWZvci1qcy93aWtpLy1iYXNpY3MuXCJcbiAgICB9LFxuICAgIHNjb3Blc1JlcXVpcmVkOiB7XG4gICAgICAgIGNvZGU6IFwic2NvcGVzX3JlcXVpcmVkXCIsXG4gICAgICAgIGRlc2M6IFwiU2NvcGVzIGFyZSByZXF1aXJlZCB0byBvYnRhaW4gYW4gYWNjZXNzIHRva2VuLlwiXG4gICAgfSxcbiAgICBlbXB0eVNjb3Blczoge1xuICAgICAgICBjb2RlOiBcImVtcHR5X2lucHV0X3Njb3Blc19lcnJvclwiLFxuICAgICAgICBkZXNjOiBcIlNjb3BlcyBjYW5ub3QgYmUgcGFzc2VkIGFzIGVtcHR5IGFycmF5LlwiXG4gICAgfSxcbiAgICBub25BcnJheVNjb3Blczoge1xuICAgICAgICBjb2RlOiBcIm5vbmFycmF5X2lucHV0X3Njb3Blc19lcnJvclwiLFxuICAgICAgICBkZXNjOiBcIlNjb3BlcyBjYW5ub3QgYmUgcGFzc2VkIGFzIG5vbi1hcnJheS5cIlxuICAgIH0sXG4gICAgY2xpZW50U2NvcGU6IHtcbiAgICAgICAgY29kZTogXCJjbGllbnRpZF9pbnB1dF9zY29wZXNfZXJyb3JcIixcbiAgICAgICAgZGVzYzogXCJDbGllbnQgSUQgY2FuIG9ubHkgYmUgcHJvdmlkZWQgYXMgYSBzaW5nbGUgc2NvcGUuXCJcbiAgICB9LFxuICAgIGludmFsaWRQcm9tcHQ6IHtcbiAgICAgICAgY29kZTogXCJpbnZhbGlkX3Byb21wdF92YWx1ZVwiLFxuICAgICAgICBkZXNjOiBcIlN1cHBvcnRlZCBwcm9tcHQgdmFsdWVzIGFyZSAnbG9naW4nLCAnc2VsZWN0X2FjY291bnQnLCAnY29uc2VudCcgYW5kICdub25lJ1wiLFxuICAgIH0sXG4gICAgaW52YWxpZEF1dGhvcml0eVR5cGU6IHtcbiAgICAgICAgY29kZTogXCJpbnZhbGlkX2F1dGhvcml0eV90eXBlXCIsXG4gICAgICAgIGRlc2M6IFwiVGhlIGdpdmVuIGF1dGhvcml0eSBpcyBub3QgYSB2YWxpZCB0eXBlIG9mIGF1dGhvcml0eSBzdXBwb3J0ZWQgYnkgTVNBTC4gUGxlYXNlIHNlZSBoZXJlIGZvciB2YWxpZCBhdXRob3JpdGllczogPGluc2VydCBVUkwgaGVyZT4uXCJcbiAgICB9LFxuICAgIGF1dGhvcml0eVVyaUluc2VjdXJlOiB7XG4gICAgICAgIGNvZGU6IFwiYXV0aG9yaXR5X3VyaV9pbnNlY3VyZVwiLFxuICAgICAgICBkZXNjOiBcIkF1dGhvcml0eSBVUklzIG11c3QgdXNlIGh0dHBzLlwiXG4gICAgfSxcbiAgICBhdXRob3JpdHlVcmlJbnZhbGlkUGF0aDoge1xuICAgICAgICBjb2RlOiBcImF1dGhvcml0eV91cmlfaW52YWxpZF9wYXRoXCIsXG4gICAgICAgIGRlc2M6IFwiR2l2ZW4gYXV0aG9yaXR5IFVSSSBpcyBpbnZhbGlkLlwiXG4gICAgfSxcbiAgICB1bnN1cHBvcnRlZEF1dGhvcml0eVZhbGlkYXRpb246IHtcbiAgICAgICAgY29kZTogXCJ1bnN1cHBvcnRlZF9hdXRob3JpdHlfdmFsaWRhdGlvblwiLFxuICAgICAgICBkZXNjOiBcIlRoZSBhdXRob3JpdHkgdmFsaWRhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIGZvciB0aGlzIGF1dGhvcml0eSB0eXBlLlwiXG4gICAgfSxcbiAgICBiMmNBdXRob3JpdHlVcmlJbnZhbGlkUGF0aDoge1xuICAgICAgICBjb2RlOiBcImIyY19hdXRob3JpdHlfdXJpX2ludmFsaWRfcGF0aFwiLFxuICAgICAgICBkZXNjOiBcIlRoZSBnaXZlbiBVUkkgZm9yIHRoZSBCMkMgYXV0aG9yaXR5IGlzIGludmFsaWQuXCJcbiAgICB9LFxuICAgIGNsYWltc1JlcXVlc3RQYXJzaW5nRXJyb3I6IHtcbiAgICAgICAgY29kZTogXCJjbGFpbXNfcmVxdWVzdF9wYXJzaW5nX2Vycm9yXCIsXG4gICAgICAgIGRlc2M6IFwiQ291bGQgbm90IHBhcnNlIHRoZSBnaXZlbiBjbGFpbXMgcmVxdWVzdCBvYmplY3QuXCJcbiAgICB9XG59O1xuXG4vKipcbiAqIEVycm9yIHRocm93biB3aGVuIHRoZXJlIGlzIGFuIGVycm9yIGluIGNvbmZpZ3VyYXRpb24gb2YgdGhlIC5qcyBsaWJyYXJ5LlxuICovXG5leHBvcnQgY2xhc3MgQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yIGV4dGVuZHMgQ2xpZW50QXV0aEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGVycm9yQ29kZTogc3RyaW5nLCBlcnJvck1lc3NhZ2U/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoZXJyb3JDb2RlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIkNsaWVudENvbmZpZ3VyYXRpb25FcnJvclwiO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZU5vU2V0Q29uZmlndXJhdGlvbkVycm9yKCk6IENsaWVudENvbmZpZ3VyYXRpb25FcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yKENsaWVudENvbmZpZ3VyYXRpb25FcnJvck1lc3NhZ2UuY29uZmlndXJhdGlvbk5vdFNldC5jb2RlLFxuICAgICAgICAgICAgYCR7Q2xpZW50Q29uZmlndXJhdGlvbkVycm9yTWVzc2FnZS5jb25maWd1cmF0aW9uTm90U2V0LmRlc2N9YCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUludmFsaWRDYWNoZUxvY2F0aW9uQ29uZmlnRXJyb3IoZ2l2ZW5DYWNoZUxvY2F0aW9uOiBzdHJpbmcpOiBDbGllbnRDb25maWd1cmF0aW9uRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IENsaWVudENvbmZpZ3VyYXRpb25FcnJvcihDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlLmludmFsaWRDYWNoZUxvY2F0aW9uLmNvZGUsXG4gICAgICAgICAgICBgJHtDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlLmludmFsaWRDYWNoZUxvY2F0aW9uLmRlc2N9IFByb3ZpZGVkIHZhbHVlOiAke2dpdmVuQ2FjaGVMb2NhdGlvbn0uIFBvc3NpYmxlIHZhbHVlcyBhcmU6ICR7Q29uc3RhbnRzLmNhY2hlTG9jYXRpb25Mb2NhbH0sICR7Q29uc3RhbnRzLmNhY2hlTG9jYXRpb25TZXNzaW9ufS5gKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlTm9TdG9yYWdlU3VwcG9ydGVkRXJyb3IoKSA6IENsaWVudENvbmZpZ3VyYXRpb25FcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yKENsaWVudENvbmZpZ3VyYXRpb25FcnJvck1lc3NhZ2Uubm9TdG9yYWdlU3VwcG9ydGVkLmNvZGUsXG4gICAgICAgICAgICBDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlLm5vU3RvcmFnZVN1cHBvcnRlZC5kZXNjKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlUmVkaXJlY3RDYWxsYmFja3NOb3RTZXRFcnJvcigpOiBDbGllbnRDb25maWd1cmF0aW9uRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IENsaWVudENvbmZpZ3VyYXRpb25FcnJvcihDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlLm5vUmVkaXJlY3RDYWxsYmFja3NTZXQuY29kZSwgQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yTWVzc2FnZS5ub1JlZGlyZWN0Q2FsbGJhY2tzU2V0LmRlc2MpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVJbnZhbGlkQ2FsbGJhY2tPYmplY3RFcnJvcihjYWxsYmFja09iamVjdDogb2JqZWN0KTogQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3IoQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yTWVzc2FnZS5pbnZhbGlkQ2FsbGJhY2tPYmplY3QuY29kZSxcbiAgICAgICAgICAgIGAke0NsaWVudENvbmZpZ3VyYXRpb25FcnJvck1lc3NhZ2UuaW52YWxpZENhbGxiYWNrT2JqZWN0LmRlc2N9IEdpdmVuIHZhbHVlIGZvciBjYWxsYmFjayBmdW5jdGlvbjogJHtjYWxsYmFja09iamVjdH1gKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlRW1wdHlTY29wZXNBcnJheUVycm9yKHNjb3Blc1ZhbHVlOiBzdHJpbmcpOiBDbGllbnRDb25maWd1cmF0aW9uRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IENsaWVudENvbmZpZ3VyYXRpb25FcnJvcihDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlLmVtcHR5U2NvcGVzLmNvZGUsXG4gICAgICAgICAgICBgJHtDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlLmVtcHR5U2NvcGVzLmRlc2N9IEdpdmVuIHZhbHVlOiAke3Njb3Blc1ZhbHVlfS5gKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlU2NvcGVzTm9uQXJyYXlFcnJvcihzY29wZXNWYWx1ZTogc3RyaW5nKTogQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3IoQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yTWVzc2FnZS5ub25BcnJheVNjb3Blcy5jb2RlLFxuICAgICAgICAgICAgYCR7Q2xpZW50Q29uZmlndXJhdGlvbkVycm9yTWVzc2FnZS5ub25BcnJheVNjb3Blcy5kZXNjfSBHaXZlbiB2YWx1ZTogJHtzY29wZXNWYWx1ZX0uYCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUNsaWVudElkU2luZ2xlU2NvcGVFcnJvcihzY29wZXNWYWx1ZTogc3RyaW5nKTogQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3IoQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yTWVzc2FnZS5jbGllbnRTY29wZS5jb2RlLFxuICAgICAgICAgICAgYCR7Q2xpZW50Q29uZmlndXJhdGlvbkVycm9yTWVzc2FnZS5jbGllbnRTY29wZS5kZXNjfSBHaXZlbiB2YWx1ZTogJHtzY29wZXNWYWx1ZX0uYCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZVNjb3Blc1JlcXVpcmVkRXJyb3Ioc2NvcGVzVmFsdWU6IGFueSk6IENsaWVudENvbmZpZ3VyYXRpb25FcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yKENsaWVudENvbmZpZ3VyYXRpb25FcnJvck1lc3NhZ2Uuc2NvcGVzUmVxdWlyZWQuY29kZSxcbiAgICAgICAgICAgIGAke0NsaWVudENvbmZpZ3VyYXRpb25FcnJvck1lc3NhZ2Uuc2NvcGVzUmVxdWlyZWQuZGVzY30gR2l2ZW4gdmFsdWU6ICR7c2NvcGVzVmFsdWV9YCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUludmFsaWRQcm9tcHRFcnJvcihwcm9tcHRWYWx1ZTogYW55KTogQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3IoQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yTWVzc2FnZS5pbnZhbGlkUHJvbXB0LmNvZGUsXG4gICAgICAgICAgICBgJHtDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlLmludmFsaWRQcm9tcHQuZGVzY30gR2l2ZW4gdmFsdWU6ICR7cHJvbXB0VmFsdWV9YCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUNsYWltc1JlcXVlc3RQYXJzaW5nRXJyb3IoY2xhaW1zUmVxdWVzdFBhcnNlRXJyb3I6IHN0cmluZyk6IENsaWVudENvbmZpZ3VyYXRpb25FcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yKENsaWVudENvbmZpZ3VyYXRpb25FcnJvck1lc3NhZ2UuY2xhaW1zUmVxdWVzdFBhcnNpbmdFcnJvci5jb2RlLFxuICAgICAgICAgICAgYCR7Q2xpZW50Q29uZmlndXJhdGlvbkVycm9yTWVzc2FnZS5jbGFpbXNSZXF1ZXN0UGFyc2luZ0Vycm9yLmRlc2N9IEdpdmVuIHZhbHVlOiAke2NsYWltc1JlcXVlc3RQYXJzZUVycm9yfWApO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBBdXRoRXJyb3IgfSBmcm9tIFwiLi9BdXRoRXJyb3JcIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4uL1V0aWxzXCI7XG5pbXBvcnQgeyBJZFRva2VuIH0gZnJvbSBcIi4uL0lkVG9rZW5cIjtcblxuZXhwb3J0IGNvbnN0IENsaWVudEF1dGhFcnJvck1lc3NhZ2UgPSB7XG4gICAgbXVsdGlwbGVNYXRjaGluZ1Rva2Vuczoge1xuICAgICAgICBjb2RlOiBcIm11bHRpcGxlX21hdGNoaW5nX3Rva2Vuc1wiLFxuICAgICAgICBkZXNjOiBcIlRoZSBjYWNoZSBjb250YWlucyBtdWx0aXBsZSB0b2tlbnMgc2F0aXNmeWluZyB0aGUgcmVxdWlyZW1lbnRzLiBcIiArXG4gICAgICAgICAgICBcIkNhbGwgQWNxdWlyZVRva2VuIGFnYWluIHByb3ZpZGluZyBtb3JlIHJlcXVpcmVtZW50cyBsaWtlIGF1dGhvcml0eS5cIlxuICAgIH0sXG4gICAgbXVsdGlwbGVDYWNoZUF1dGhvcml0aWVzOiB7XG4gICAgICAgIGNvZGU6IFwibXVsdGlwbGVfYXV0aG9yaXRpZXNcIixcbiAgICAgICAgZGVzYzogXCJNdWx0aXBsZSBhdXRob3JpdGllcyBmb3VuZCBpbiB0aGUgY2FjaGUuIFBhc3MgYXV0aG9yaXR5IGluIHRoZSBBUEkgb3ZlcmxvYWQuXCJcbiAgICB9LFxuICAgIGVuZHBvaW50UmVzb2x1dGlvbkVycm9yOiB7XG4gICAgICAgIGNvZGU6IFwiZW5kcG9pbnRzX3Jlc29sdXRpb25fZXJyb3JcIixcbiAgICAgICAgZGVzYzogXCJFcnJvcjogY291bGQgbm90IHJlc29sdmUgZW5kcG9pbnRzLiBQbGVhc2UgY2hlY2sgbmV0d29yayBhbmQgdHJ5IGFnYWluLlwiXG4gICAgfSxcbiAgICBwb3BVcFdpbmRvd0Vycm9yOiB7XG4gICAgICAgIGNvZGU6IFwicG9wdXBfd2luZG93X2Vycm9yXCIsXG4gICAgICAgIGRlc2M6IFwiRXJyb3Igb3BlbmluZyBwb3B1cCB3aW5kb3cuIFRoaXMgY2FuIGhhcHBlbiBpZiB5b3UgYXJlIHVzaW5nIElFIG9yIGlmIHBvcHVwcyBhcmUgYmxvY2tlZCBpbiB0aGUgYnJvd3Nlci5cIlxuICAgIH0sXG4gICAgdG9rZW5SZW5ld2FsRXJyb3I6IHtcbiAgICAgICAgY29kZTogXCJ0b2tlbl9yZW5ld2FsX2Vycm9yXCIsXG4gICAgICAgIGRlc2M6IFwiVG9rZW4gcmVuZXdhbCBvcGVyYXRpb24gZmFpbGVkIGR1ZSB0byB0aW1lb3V0LlwiXG4gICAgfSxcbiAgICBpbnZhbGlkSWRUb2tlbjoge1xuICAgICAgICBjb2RlOiBcImludmFsaWRfaWRfdG9rZW5cIixcbiAgICAgICAgZGVzYzogXCJJbnZhbGlkIElEIHRva2VuIGZvcm1hdC5cIlxuICAgIH0sXG4gICAgaW52YWxpZFN0YXRlRXJyb3I6IHtcbiAgICAgICAgY29kZTogXCJpbnZhbGlkX3N0YXRlX2Vycm9yXCIsXG4gICAgICAgIGRlc2M6IFwiSW52YWxpZCBzdGF0ZS5cIlxuICAgIH0sXG4gICAgbm9uY2VNaXNtYXRjaEVycm9yOiB7XG4gICAgICAgIGNvZGU6IFwibm9uY2VfbWlzbWF0Y2hfZXJyb3JcIixcbiAgICAgICAgZGVzYzogXCJOb25jZSBpcyBub3QgbWF0Y2hpbmcsIE5vbmNlIHJlY2VpdmVkOiBcIlxuICAgIH0sXG4gICAgbG9naW5Qcm9ncmVzc0Vycm9yOiB7XG4gICAgICAgIGNvZGU6IFwibG9naW5fcHJvZ3Jlc3NfZXJyb3JcIixcbiAgICAgICAgZGVzYzogXCJMb2dpbl9Jbl9Qcm9ncmVzczogRXJyb3IgZHVyaW5nIGxvZ2luIGNhbGwgLSBsb2dpbiBpcyBhbHJlYWR5IGluIHByb2dyZXNzLlwiXG4gICAgfSxcbiAgICBhY3F1aXJlVG9rZW5Qcm9ncmVzc0Vycm9yOiB7XG4gICAgICAgIGNvZGU6IFwiYWNxdWlyZXRva2VuX3Byb2dyZXNzX2Vycm9yXCIsXG4gICAgICAgIGRlc2M6IFwiQWNxdWlyZVRva2VuX0luX1Byb2dyZXNzOiBFcnJvciBkdXJpbmcgbG9naW4gY2FsbCAtIGxvZ2luIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3MuXCJcbiAgICB9LFxuICAgIHVzZXJDYW5jZWxsZWRFcnJvcjoge1xuICAgICAgICBjb2RlOiBcInVzZXJfY2FuY2VsbGVkXCIsXG4gICAgICAgIGRlc2M6IFwiVXNlciBjYW5jZWxsZWQgdGhlIGZsb3cuXCJcbiAgICB9LFxuICAgIGNhbGxiYWNrRXJyb3I6IHtcbiAgICAgICAgY29kZTogXCJjYWxsYmFja19lcnJvclwiLFxuICAgICAgICBkZXNjOiBcIkVycm9yIG9jY3VycmVkIGluIHRva2VuIHJlY2VpdmVkIGNhbGxiYWNrIGZ1bmN0aW9uLlwiXG4gICAgfSxcbiAgICB1c2VyTG9naW5SZXF1aXJlZEVycm9yOiB7XG4gICAgICAgIGNvZGU6IFwidXNlcl9sb2dpbl9lcnJvclwiLFxuICAgICAgICBkZXNjOiBcIlVzZXIgbG9naW4gaXMgcmVxdWlyZWQuXCJcbiAgICB9LFxuICAgIHVzZXJEb2VzTm90RXhpc3RFcnJvcjoge1xuICAgICAgICBjb2RlOiBcInVzZXJfbm9uX2V4aXN0ZW50XCIsXG4gICAgICAgIGRlc2M6IFwiVXNlciBvYmplY3QgZG9lcyBub3QgZXhpc3QuIFBsZWFzZSBjYWxsIGEgbG9naW4gQVBJLlwiXG4gICAgfSxcbiAgICBjbGllbnRJbmZvRGVjb2RpbmdFcnJvcjoge1xuICAgICAgICBjb2RlOiBcImNsaWVudF9pbmZvX2RlY29kaW5nX2Vycm9yXCIsXG4gICAgICAgIGRlc2M6IFwiVGhlIGNsaWVudCBpbmZvIGNvdWxkIG5vdCBiZSBwYXJzZWQvZGVjb2RlZCBjb3JyZWN0bHkuIFBsZWFzZSByZXZpZXcgdGhlIHRyYWNlIHRvIGRldGVybWluZSB0aGUgcm9vdCBjYXVzZS5cIlxuICAgIH0sXG4gICAgY2xpZW50SW5mb05vdFBvcHVsYXRlZEVycm9yOiB7XG4gICAgICAgIGNvZGU6IFwiY2xpZW50X2luZm9fbm90X3BvcHVsYXRlZF9lcnJvclwiLFxuICAgICAgICBkZXNjOiBcIlRoZSBzZXJ2aWNlIGRpZCBub3QgcG9wdWxhdGUgY2xpZW50X2luZm8gaW4gdGhlIHJlc3BvbnNlLCBQbGVhc2UgdmVyaWZ5IHdpdGggdGhlIHNlcnZpY2UgdGVhbVwiXG4gICAgfSxcbiAgICBudWxsT3JFbXB0eUlkVG9rZW46IHtcbiAgICAgICAgY29kZTogXCJudWxsX29yX2VtcHR5X2lkX3Rva2VuXCIsXG4gICAgICAgIGRlc2M6IFwiVGhlIGlkVG9rZW4gaXMgbnVsbCBvciBlbXB0eS4gUGxlYXNlIHJldmlldyB0aGUgdHJhY2UgdG8gZGV0ZXJtaW5lIHRoZSByb290IGNhdXNlLlwiXG4gICAgfSxcbiAgICBpZFRva2VuTm90UGFyc2VkOiB7XG4gICAgICAgIGNvZGU6IFwiaWRfdG9rZW5fcGFyc2luZ19lcnJvclwiLFxuICAgICAgICBkZXNjOiBcIklEIHRva2VuIGNhbm5vdCBiZSBwYXJzZWQuIFBsZWFzZSByZXZpZXcgc3RhY2sgdHJhY2UgdG8gZGV0ZXJtaW5lIHJvb3QgY2F1c2UuXCJcbiAgICB9LFxuICAgIHRva2VuRW5jb2RpbmdFcnJvcjoge1xuICAgICAgICBjb2RlOiBcInRva2VuX2VuY29kaW5nX2Vycm9yXCIsXG4gICAgICAgIGRlc2M6IFwiVGhlIHRva2VuIHRvIGJlIGRlY29kZWQgaXMgbm90IGVuY29kZWQgY29ycmVjdGx5LlwiXG4gICAgfVxufTtcblxuLyoqXG4gKiBFcnJvciB0aHJvd24gd2hlbiB0aGVyZSBpcyBhbiBlcnJvciBpbiB0aGUgY2xpZW50IGNvZGUgcnVubmluZyBvbiB0aGUgYnJvd3Nlci5cbiAqL1xuZXhwb3J0IGNsYXNzIENsaWVudEF1dGhFcnJvciBleHRlbmRzIEF1dGhFcnJvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihlcnJvckNvZGU6IHN0cmluZywgZXJyb3JNZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKGVycm9yQ29kZSwgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJDbGllbnRBdXRoRXJyb3JcIjtcblxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgQ2xpZW50QXV0aEVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUVuZHBvaW50UmVzb2x1dGlvbkVycm9yKGVyckRldGFpbD86IHN0cmluZyk6IENsaWVudEF1dGhFcnJvciB7XG4gICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBDbGllbnRBdXRoRXJyb3JNZXNzYWdlLmVuZHBvaW50UmVzb2x1dGlvbkVycm9yLmRlc2M7XG4gICAgICAgIGlmIChlcnJEZXRhaWwgJiYgIVV0aWxzLmlzRW1wdHkoZXJyRGV0YWlsKSkge1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IGAgRGV0YWlsczogJHtlcnJEZXRhaWx9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENsaWVudEF1dGhFcnJvcihDbGllbnRBdXRoRXJyb3JNZXNzYWdlLmVuZHBvaW50UmVzb2x1dGlvbkVycm9yLmNvZGUsIGVycm9yTWVzc2FnZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZU11bHRpcGxlTWF0Y2hpbmdUb2tlbnNJbkNhY2hlRXJyb3Ioc2NvcGU6IHN0cmluZyk6IENsaWVudEF1dGhFcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50QXV0aEVycm9yKENsaWVudEF1dGhFcnJvck1lc3NhZ2UubXVsdGlwbGVNYXRjaGluZ1Rva2Vucy5jb2RlLFxuICAgICAgICAgICAgYENhY2hlIGVycm9yIGZvciBzY29wZSAke3Njb3BlfTogJHtDbGllbnRBdXRoRXJyb3JNZXNzYWdlLm11bHRpcGxlTWF0Y2hpbmdUb2tlbnMuZGVzY30uYCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZU11bHRpcGxlQXV0aG9yaXRpZXNJbkNhY2hlRXJyb3Ioc2NvcGU6IHN0cmluZyk6IENsaWVudEF1dGhFcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50QXV0aEVycm9yKENsaWVudEF1dGhFcnJvck1lc3NhZ2UubXVsdGlwbGVDYWNoZUF1dGhvcml0aWVzLmNvZGUsXG4gICAgICAgICAgICBgQ2FjaGUgZXJyb3IgZm9yIHNjb3BlICR7c2NvcGV9OiAke0NsaWVudEF1dGhFcnJvck1lc3NhZ2UubXVsdGlwbGVDYWNoZUF1dGhvcml0aWVzLmRlc2N9LmApO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVQb3B1cFdpbmRvd0Vycm9yKGVyckRldGFpbD86IHN0cmluZyk6IENsaWVudEF1dGhFcnJvciB7XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBDbGllbnRBdXRoRXJyb3JNZXNzYWdlLnBvcFVwV2luZG93RXJyb3IuZGVzYztcbiAgICAgICAgaWYgKGVyckRldGFpbCAmJiAhVXRpbHMuaXNFbXB0eShlcnJEZXRhaWwpKSB7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gYCBEZXRhaWxzOiAke2VyckRldGFpbH1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50QXV0aEVycm9yKENsaWVudEF1dGhFcnJvck1lc3NhZ2UucG9wVXBXaW5kb3dFcnJvci5jb2RlLCBlcnJvck1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVUb2tlblJlbmV3YWxUaW1lb3V0RXJyb3IoKTogQ2xpZW50QXV0aEVycm9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGllbnRBdXRoRXJyb3IoQ2xpZW50QXV0aEVycm9yTWVzc2FnZS50b2tlblJlbmV3YWxFcnJvci5jb2RlLFxuICAgICAgICAgICAgQ2xpZW50QXV0aEVycm9yTWVzc2FnZS50b2tlblJlbmV3YWxFcnJvci5kZXNjKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlSW52YWxpZElkVG9rZW5FcnJvcihpZFRva2VuOiBJZFRva2VuKSA6IENsaWVudEF1dGhFcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50QXV0aEVycm9yKENsaWVudEF1dGhFcnJvck1lc3NhZ2UuaW52YWxpZElkVG9rZW4uY29kZSxcbiAgICAgICAgICAgIGAke0NsaWVudEF1dGhFcnJvck1lc3NhZ2UuaW52YWxpZElkVG9rZW4uZGVzY30gR2l2ZW4gdG9rZW46ICR7aWRUb2tlbn1gKTtcbiAgICB9XG5cbiAgICAvL1RPRE86IElzIHRoaXMgbm90IGEgc2VjdXJpdHkgZmxhdyB0byBzZW5kIHRoZSB1c2VyIHRoZSBzdGF0ZSBleHBlY3RlZD8/XG4gICAgc3RhdGljIGNyZWF0ZUludmFsaWRTdGF0ZUVycm9yKGludmFsaWRTdGF0ZTogc3RyaW5nLCBhY3R1YWxTdGF0ZTogc3RyaW5nKTogQ2xpZW50QXV0aEVycm9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGllbnRBdXRoRXJyb3IoQ2xpZW50QXV0aEVycm9yTWVzc2FnZS5pbnZhbGlkU3RhdGVFcnJvci5jb2RlLFxuICAgICAgICAgICAgYCR7Q2xpZW50QXV0aEVycm9yTWVzc2FnZS5pbnZhbGlkU3RhdGVFcnJvci5kZXNjfSAke2ludmFsaWRTdGF0ZX0sIHN0YXRlIGV4cGVjdGVkIDogJHthY3R1YWxTdGF0ZX0uYCk7XG4gICAgfVxuXG4gICAgLy9UT0RPOiBJcyB0aGlzIG5vdCBhIHNlY3VyaXR5IGZsYXcgdG8gc2VuZCB0aGUgdXNlciB0aGUgTm9uY2UgZXhwZWN0ZWQ/P1xuICAgIHN0YXRpYyBjcmVhdGVOb25jZU1pc21hdGNoRXJyb3IoaW52YWxpZE5vbmNlOiBzdHJpbmcsIGFjdHVhbE5vbmNlOiBzdHJpbmcpOiBDbGllbnRBdXRoRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IENsaWVudEF1dGhFcnJvcihDbGllbnRBdXRoRXJyb3JNZXNzYWdlLm5vbmNlTWlzbWF0Y2hFcnJvci5jb2RlLFxuICAgICAgICAgICAgYCR7Q2xpZW50QXV0aEVycm9yTWVzc2FnZS5ub25jZU1pc21hdGNoRXJyb3IuZGVzY30gJHtpbnZhbGlkTm9uY2V9LCBub25jZSBleHBlY3RlZCA6ICR7YWN0dWFsTm9uY2V9LmApO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVMb2dpbkluUHJvZ3Jlc3NFcnJvcigpOiBDbGllbnRBdXRoRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IENsaWVudEF1dGhFcnJvcihDbGllbnRBdXRoRXJyb3JNZXNzYWdlLmxvZ2luUHJvZ3Jlc3NFcnJvci5jb2RlLFxuICAgICAgICAgICAgQ2xpZW50QXV0aEVycm9yTWVzc2FnZS5sb2dpblByb2dyZXNzRXJyb3IuZGVzYyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUFjcXVpcmVUb2tlbkluUHJvZ3Jlc3NFcnJvcigpOiBDbGllbnRBdXRoRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IENsaWVudEF1dGhFcnJvcihDbGllbnRBdXRoRXJyb3JNZXNzYWdlLmFjcXVpcmVUb2tlblByb2dyZXNzRXJyb3IuY29kZSxcbiAgICAgICAgICAgIENsaWVudEF1dGhFcnJvck1lc3NhZ2UuYWNxdWlyZVRva2VuUHJvZ3Jlc3NFcnJvci5kZXNjKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlVXNlckNhbmNlbGxlZEVycm9yKCk6IENsaWVudEF1dGhFcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50QXV0aEVycm9yKENsaWVudEF1dGhFcnJvck1lc3NhZ2UudXNlckNhbmNlbGxlZEVycm9yLmNvZGUsXG4gICAgICAgICAgICBDbGllbnRBdXRoRXJyb3JNZXNzYWdlLnVzZXJDYW5jZWxsZWRFcnJvci5kZXNjKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlRXJyb3JJbkNhbGxiYWNrRnVuY3Rpb24oZXJyb3JEZXNjOiBzdHJpbmcpOiBDbGllbnRBdXRoRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IENsaWVudEF1dGhFcnJvcihDbGllbnRBdXRoRXJyb3JNZXNzYWdlLmNhbGxiYWNrRXJyb3IuY29kZSxcbiAgICAgICAgICAgIGAke0NsaWVudEF1dGhFcnJvck1lc3NhZ2UuY2FsbGJhY2tFcnJvci5kZXNjfSAke2Vycm9yRGVzY30uYCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZVVzZXJMb2dpblJlcXVpcmVkRXJyb3IoKSA6IENsaWVudEF1dGhFcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50QXV0aEVycm9yKENsaWVudEF1dGhFcnJvck1lc3NhZ2UudXNlckxvZ2luUmVxdWlyZWRFcnJvci5jb2RlLFxuICAgICAgICAgICAgQ2xpZW50QXV0aEVycm9yTWVzc2FnZS51c2VyTG9naW5SZXF1aXJlZEVycm9yLmRlc2MpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVVc2VyRG9lc05vdEV4aXN0RXJyb3IoKSA6IENsaWVudEF1dGhFcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50QXV0aEVycm9yKENsaWVudEF1dGhFcnJvck1lc3NhZ2UudXNlckRvZXNOb3RFeGlzdEVycm9yLmNvZGUsXG4gICAgICAgICAgICBDbGllbnRBdXRoRXJyb3JNZXNzYWdlLnVzZXJEb2VzTm90RXhpc3RFcnJvci5kZXNjKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlQ2xpZW50SW5mb0RlY29kaW5nRXJyb3IoY2F1Z2h0RXJyb3I6IHN0cmluZykgOiBDbGllbnRBdXRoRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IENsaWVudEF1dGhFcnJvcihDbGllbnRBdXRoRXJyb3JNZXNzYWdlLmNsaWVudEluZm9EZWNvZGluZ0Vycm9yLmNvZGUsXG4gICAgICAgICAgICBgJHtDbGllbnRBdXRoRXJyb3JNZXNzYWdlLmNsaWVudEluZm9EZWNvZGluZ0Vycm9yLmRlc2N9IEZhaWxlZCB3aXRoIGVycm9yOiAke2NhdWdodEVycm9yfWApO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVDbGllbnRJbmZvTm90UG9wdWxhdGVkRXJyb3IoY2F1Z2h0RXJyb3I6IHN0cmluZykgOiBDbGllbnRBdXRoRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IENsaWVudEF1dGhFcnJvcihDbGllbnRBdXRoRXJyb3JNZXNzYWdlLmNsaWVudEluZm9Ob3RQb3B1bGF0ZWRFcnJvci5jb2RlLFxuICAgICAgICAgICAgYCR7Q2xpZW50QXV0aEVycm9yTWVzc2FnZS5jbGllbnRJbmZvTm90UG9wdWxhdGVkRXJyb3IuZGVzY30gRmFpbGVkIHdpdGggZXJyb3I6ICR7Y2F1Z2h0RXJyb3J9YCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUlkVG9rZW5OdWxsT3JFbXB0eUVycm9yKGludmFsaWRSYXdUb2tlblN0cmluZzogc3RyaW5nKSA6IENsaWVudEF1dGhFcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50QXV0aEVycm9yKENsaWVudEF1dGhFcnJvck1lc3NhZ2UubnVsbE9yRW1wdHlJZFRva2VuLmNvZGUsXG4gICAgICAgICAgICBgJHtDbGllbnRBdXRoRXJyb3JNZXNzYWdlLm51bGxPckVtcHR5SWRUb2tlbi5kZXNjfSBSYXcgSUQgVG9rZW4gVmFsdWU6ICR7aW52YWxpZFJhd1Rva2VuU3RyaW5nfWApO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVJZFRva2VuUGFyc2luZ0Vycm9yKGNhdWdodFBhcnNpbmdFcnJvcjogc3RyaW5nKSA6IENsaWVudEF1dGhFcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xpZW50QXV0aEVycm9yKENsaWVudEF1dGhFcnJvck1lc3NhZ2UuaWRUb2tlbk5vdFBhcnNlZC5jb2RlLFxuICAgICAgICAgICAgYCR7Q2xpZW50QXV0aEVycm9yTWVzc2FnZS5pZFRva2VuTm90UGFyc2VkLmRlc2N9IEZhaWxlZCB3aXRoIGVycm9yOiAke2NhdWdodFBhcnNpbmdFcnJvcn1gKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlVG9rZW5FbmNvZGluZ0Vycm9yKGluY29ycmVjdGx5RW5jb2RlZFRva2VuOiBzdHJpbmcpIDogQ2xpZW50QXV0aEVycm9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGllbnRBdXRoRXJyb3IoQ2xpZW50QXV0aEVycm9yTWVzc2FnZS50b2tlbkVuY29kaW5nRXJyb3IuY29kZSxcbiAgICAgICAgICAgIGAke0NsaWVudEF1dGhFcnJvck1lc3NhZ2UudG9rZW5FbmNvZGluZ0Vycm9yLmRlc2N9IEF0dGVtcHRlZCB0byBkZWNvZGU6ICR7aW5jb3JyZWN0bHlFbmNvZGVkVG9rZW59YCk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmV4cG9ydCBjb25zdCBBdXRoRXJyb3JNZXNzYWdlID0ge1xuICAgIHVuZXhwZWN0ZWRFcnJvcjoge1xuICAgICAgICBjb2RlOiBcInVuZXhwZWN0ZWRfZXJyb3JcIixcbiAgICAgICAgZGVzYzogXCJVbmV4cGVjdGVkIGVycm9yIGluIGF1dGhlbnRpY2F0aW9uLlwiXG4gICAgfVxufTtcblxuLyoqXG4qIEdlbmVyYWwgZXJyb3IgY2xhc3MgdGhyb3duIGJ5IHRoZSBNU0FMLmpzIGxpYnJhcnkuXG4qL1xuZXhwb3J0IGNsYXNzIEF1dGhFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGVycm9yQ29kZTogc3RyaW5nO1xuICAgIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoZXJyb3JDb2RlOiBzdHJpbmcsIGVycm9yTWVzc2FnZT86IHN0cmluZykge1xuICAgICAgICBzdXBlcihlcnJvck1lc3NhZ2UpO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgQXV0aEVycm9yLnByb3RvdHlwZSk7XG5cbiAgICAgICAgdGhpcy5lcnJvckNvZGUgPSBlcnJvckNvZGU7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIkF1dGhFcnJvclwiO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVVbmV4cGVjdGVkRXJyb3IoZXJyRGVzYzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXV0aEVycm9yKEF1dGhFcnJvck1lc3NhZ2UudW5leHBlY3RlZEVycm9yLmNvZGUsIGAke0F1dGhFcnJvck1lc3NhZ2UudW5leHBlY3RlZEVycm9yLmRlc2N9OiAke2VyckRlc2N9YCk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IElVcmkgfSBmcm9tIFwiLi9JVXJpXCI7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XG5pbXBvcnQgeyBJVGVuYW50RGlzY292ZXJ5UmVzcG9uc2UgfSBmcm9tIFwiLi9JVGVuYW50RGlzY292ZXJ5UmVzcG9uc2VcIjtcbmltcG9ydCB7IENsaWVudENvbmZpZ3VyYXRpb25FcnJvck1lc3NhZ2UgfSBmcm9tIFwiLi9lcnJvci9DbGllbnRDb25maWd1cmF0aW9uRXJyb3JcIjtcbmltcG9ydCB7IFhockNsaWVudCB9IGZyb20gXCIuL1hIUkNsaWVudFwiO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGVudW0gQXV0aG9yaXR5VHlwZSB7XG4gIEFhZCxcbiAgQWRmcyxcbiAgQjJDXG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXV0aG9yaXR5IHtcbiAgY29uc3RydWN0b3IoYXV0aG9yaXR5OiBzdHJpbmcsIHZhbGlkYXRlQXV0aG9yaXR5OiBib29sZWFuKSB7XG4gICAgdGhpcy5Jc1ZhbGlkYXRpb25FbmFibGVkID0gdmFsaWRhdGVBdXRob3JpdHk7XG4gICAgdGhpcy5DYW5vbmljYWxBdXRob3JpdHkgPSBhdXRob3JpdHk7XG5cbiAgICB0aGlzLnZhbGlkYXRlQXNVcmkoKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXQgQXV0aG9yaXR5VHlwZSgpOiBBdXRob3JpdHlUeXBlO1xuXG4gIHB1YmxpYyBJc1ZhbGlkYXRpb25FbmFibGVkOiBib29sZWFuO1xuXG4gIHB1YmxpYyBnZXQgVGVuYW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuQ2Fub25pY2FsQXV0aG9yaXR5VXJsQ29tcG9uZW50cy5QYXRoU2VnbWVudHNbMF07XG4gIH1cblxuICBwcml2YXRlIHRlbmFudERpc2NvdmVyeVJlc3BvbnNlOiBJVGVuYW50RGlzY292ZXJ5UmVzcG9uc2U7XG5cbiAgcHVibGljIGdldCBBdXRob3JpemF0aW9uRW5kcG9pbnQoKTogc3RyaW5nIHtcbiAgICB0aGlzLnZhbGlkYXRlUmVzb2x2ZWQoKTtcbiAgICByZXR1cm4gdGhpcy50ZW5hbnREaXNjb3ZlcnlSZXNwb25zZS5BdXRob3JpemF0aW9uRW5kcG9pbnQucmVwbGFjZShcInt0ZW5hbnR9XCIsIHRoaXMuVGVuYW50KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRW5kU2Vzc2lvbkVuZHBvaW50KCk6IHN0cmluZyB7XG4gICAgdGhpcy52YWxpZGF0ZVJlc29sdmVkKCk7XG4gICAgcmV0dXJuIHRoaXMudGVuYW50RGlzY292ZXJ5UmVzcG9uc2UuRW5kU2Vzc2lvbkVuZHBvaW50LnJlcGxhY2UoXCJ7dGVuYW50fVwiLCB0aGlzLlRlbmFudCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFNlbGZTaWduZWRKd3RBdWRpZW5jZSgpOiBzdHJpbmcge1xuICAgIHRoaXMudmFsaWRhdGVSZXNvbHZlZCgpO1xuICAgIHJldHVybiB0aGlzLnRlbmFudERpc2NvdmVyeVJlc3BvbnNlLklzc3Vlci5yZXBsYWNlKFwie3RlbmFudH1cIiwgdGhpcy5UZW5hbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZVJlc29sdmVkKCkge1xuICAgIGlmICghdGhpcy50ZW5hbnREaXNjb3ZlcnlSZXNwb25zZSkge1xuICAgICAgdGhyb3cgXCJQbGVhc2UgY2FsbCBSZXNvbHZlRW5kcG9pbnRzQXN5bmMgZmlyc3RcIjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBVUkwgdGhhdCBpcyB0aGUgYXV0aG9yaXR5IHNldCBieSB0aGUgZGV2ZWxvcGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IENhbm9uaWNhbEF1dGhvcml0eSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNhbm9uaWNhbEF1dGhvcml0eTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgQ2Fub25pY2FsQXV0aG9yaXR5KHVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5jYW5vbmljYWxBdXRob3JpdHkgPSBVdGlscy5DYW5vbmljYWxpemVVcmkodXJsKTtcbiAgICB0aGlzLmNhbm9uaWNhbEF1dGhvcml0eVVybENvbXBvbmVudHMgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBjYW5vbmljYWxBdXRob3JpdHk6IHN0cmluZztcbiAgcHJpdmF0ZSBjYW5vbmljYWxBdXRob3JpdHlVcmxDb21wb25lbnRzOiBJVXJpO1xuXG4gIHB1YmxpYyBnZXQgQ2Fub25pY2FsQXV0aG9yaXR5VXJsQ29tcG9uZW50cygpOiBJVXJpIHtcbiAgICBpZiAoIXRoaXMuY2Fub25pY2FsQXV0aG9yaXR5VXJsQ29tcG9uZW50cykge1xuICAgICAgdGhpcy5jYW5vbmljYWxBdXRob3JpdHlVcmxDb21wb25lbnRzID0gVXRpbHMuR2V0VXJsQ29tcG9uZW50cyh0aGlzLkNhbm9uaWNhbEF1dGhvcml0eSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2Fub25pY2FsQXV0aG9yaXR5VXJsQ29tcG9uZW50cztcbiAgfVxuXG4gIC8qKlxuICAgKiAvLyBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1kaXNjb3ZlcnktMV8wLmh0bWwjUHJvdmlkZXJNZXRhZGF0YVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldCBEZWZhdWx0T3BlbklkQ29uZmlndXJhdGlvbkVuZHBvaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuQ2Fub25pY2FsQXV0aG9yaXR5fXYyLjAvLndlbGwta25vd24vb3BlbmlkLWNvbmZpZ3VyYXRpb25gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGEgc3RyaW5nLCB2YWxpZGF0ZSB0aGF0IGl0IGlzIG9mIHRoZSBmb3JtIGh0dHBzOi8vZG9tYWluL3BhdGhcbiAgICovXG4gIHByaXZhdGUgdmFsaWRhdGVBc1VyaSgpIHtcbiAgICBsZXQgY29tcG9uZW50cztcbiAgICB0cnkge1xuICAgICAgY29tcG9uZW50cyA9IHRoaXMuQ2Fub25pY2FsQXV0aG9yaXR5VXJsQ29tcG9uZW50cztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlLmludmFsaWRBdXRob3JpdHlUeXBlO1xuICAgIH1cblxuICAgIGlmICghY29tcG9uZW50cy5Qcm90b2NvbCB8fCBjb21wb25lbnRzLlByb3RvY29sLnRvTG93ZXJDYXNlKCkgIT09IFwiaHR0cHM6XCIpIHtcbiAgICAgIHRocm93IENsaWVudENvbmZpZ3VyYXRpb25FcnJvck1lc3NhZ2UuYXV0aG9yaXR5VXJpSW5zZWN1cmU7XG4gICAgfVxuXG4gICAgaWYgKCFjb21wb25lbnRzLlBhdGhTZWdtZW50cyB8fCBjb21wb25lbnRzLlBhdGhTZWdtZW50cy5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvdyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlLmF1dGhvcml0eVVyaUludmFsaWRQYXRoO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyB0aGUgT0lEQyBlbmRwb2ludCBhbmQgcmV0dXJucyB0aGUgcmVzcG9uc2VcbiAgICovXG4gIHByaXZhdGUgRGlzY292ZXJFbmRwb2ludHMob3BlbklkQ29uZmlndXJhdGlvbkVuZHBvaW50OiBzdHJpbmcpOiBQcm9taXNlPElUZW5hbnREaXNjb3ZlcnlSZXNwb25zZT4ge1xuICAgIGNvbnN0IGNsaWVudCA9IG5ldyBYaHJDbGllbnQoKTtcbiAgICByZXR1cm4gY2xpZW50LnNlbmRSZXF1ZXN0QXN5bmMob3BlbklkQ29uZmlndXJhdGlvbkVuZHBvaW50LCBcIkdFVFwiLCAvKmVuYWJsZUNhY2hpbmc6ICovIHRydWUpXG4gICAgICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gPElUZW5hbnREaXNjb3ZlcnlSZXNwb25zZT57XG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbkVuZHBvaW50OiByZXNwb25zZS5hdXRob3JpemF0aW9uX2VuZHBvaW50LFxuICAgICAgICAgICAgICAgIEVuZFNlc3Npb25FbmRwb2ludDogcmVzcG9uc2UuZW5kX3Nlc3Npb25fZW5kcG9pbnQsXG4gICAgICAgICAgICAgICAgSXNzdWVyOiByZXNwb25zZS5pc3N1ZXJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9taXNlLlxuICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBhdXRob3JpdHkgaXMgaW4gdGhlIGNhY2hlXG4gICAqIERpc2NvdmVyIGVuZHBvaW50cyB2aWEgb3BlbmlkLWNvbmZpZ3VyYXRpb25cbiAgICogSWYgc3VjY2Vzc2Z1bCwgY2FjaGVzIHRoZSBlbmRwb2ludCBmb3IgbGF0ZXIgdXNlIGluIE9JRENcbiAgICovXG4gIHB1YmxpYyByZXNvbHZlRW5kcG9pbnRzQXN5bmMoKTogUHJvbWlzZTxBdXRob3JpdHk+IHtcbiAgICBsZXQgb3BlbklkQ29uZmlndXJhdGlvbkVuZHBvaW50ID0gXCJcIjtcbiAgICByZXR1cm4gdGhpcy5HZXRPcGVuSWRDb25maWd1cmF0aW9uRW5kcG9pbnRBc3luYygpLnRoZW4ob3BlbklkQ29uZmlndXJhdGlvbkVuZHBvaW50UmVzcG9uc2UgPT4ge1xuICAgICAgb3BlbklkQ29uZmlndXJhdGlvbkVuZHBvaW50ID0gb3BlbklkQ29uZmlndXJhdGlvbkVuZHBvaW50UmVzcG9uc2U7XG4gICAgICByZXR1cm4gdGhpcy5EaXNjb3ZlckVuZHBvaW50cyhvcGVuSWRDb25maWd1cmF0aW9uRW5kcG9pbnQpO1xuICAgIH0pLnRoZW4oKHRlbmFudERpc2NvdmVyeVJlc3BvbnNlOiBJVGVuYW50RGlzY292ZXJ5UmVzcG9uc2UpID0+IHtcbiAgICAgIHRoaXMudGVuYW50RGlzY292ZXJ5UmVzcG9uc2UgPSB0ZW5hbnREaXNjb3ZlcnlSZXNwb25zZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHdpdGggdGhlIFRlbmFudERpc2NvdmVyeUVuZHBvaW50XG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgR2V0T3BlbklkQ29uZmlndXJhdGlvbkVuZHBvaW50QXN5bmMoKTogUHJvbWlzZTxzdHJpbmc+O1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyQ2FsbGJhY2sge1xuICAobGV2ZWw6IExvZ0xldmVsLCBtZXNzYWdlOiBzdHJpbmcsIGNvbnRhaW5zUGlpOiBib29sZWFuKTogdm9pZDtcbn1cblxuZXhwb3J0IGVudW0gTG9nTGV2ZWwge1xuICBFcnJvcixcbiAgV2FybmluZyxcbiAgSW5mbyxcbiAgVmVyYm9zZVxufVxuXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHsvLyBTaW5nbGV0b24gQ2xhc3NcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgLy8gVE9ETzogVGhpcyBkb2VzIG5vdCBzZWVtIHRvIGJlIGEgc2luZ2xldG9uISEgQ2hhbmdlIG9yIERlbGV0ZS5cbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IExvZ2dlcjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcHJpdmF0ZSBjb3JyZWxhdGlvbklkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHByaXZhdGUgbGV2ZWw6IExvZ0xldmVsID0gTG9nTGV2ZWwuSW5mbztcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcHJpdmF0ZSBwaWlMb2dnaW5nRW5hYmxlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcHJpdmF0ZSBsb2NhbENhbGxiYWNrOiBJTG9nZ2VyQ2FsbGJhY2s7XG5cbiAgY29uc3RydWN0b3IobG9jYWxDYWxsYmFjazogSUxvZ2dlckNhbGxiYWNrLFxuICAgICAgb3B0aW9uczpcbiAgICAgIHtcbiAgICAgICAgICBjb3JyZWxhdGlvbklkPzogc3RyaW5nLFxuICAgICAgICAgIGxldmVsPzogTG9nTGV2ZWwsXG4gICAgICAgICAgcGlpTG9nZ2luZ0VuYWJsZWQ/OiBib29sZWFuLFxuICAgICAgfSA9IHt9KSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgICAgY29ycmVsYXRpb25JZCA9IFwiXCIsXG4gICAgICAgICAgbGV2ZWwgPSBMb2dMZXZlbC5JbmZvLFxuICAgICAgICAgIHBpaUxvZ2dpbmdFbmFibGVkID0gZmFsc2VcbiAgICAgIH0gPSBvcHRpb25zO1xuXG4gICAgICB0aGlzLmxvY2FsQ2FsbGJhY2sgPSBsb2NhbENhbGxiYWNrO1xuICAgICAgdGhpcy5jb3JyZWxhdGlvbklkID0gY29ycmVsYXRpb25JZDtcbiAgICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgICAgIHRoaXMucGlpTG9nZ2luZ0VuYWJsZWQgPSBwaWlMb2dnaW5nRW5hYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBwcml2YXRlIGxvZ01lc3NhZ2UobG9nTGV2ZWw6IExvZ0xldmVsLCBsb2dNZXNzYWdlOiBzdHJpbmcsIGNvbnRhaW5zUGlpOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKChsb2dMZXZlbCA+IHRoaXMubGV2ZWwpIHx8ICghdGhpcy5waWlMb2dnaW5nRW5hYmxlZCAmJiBjb250YWluc1BpaSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b1VUQ1N0cmluZygpO1xuICAgIGxldCBsb2c6IHN0cmluZztcbiAgICBpZiAoIVV0aWxzLmlzRW1wdHkodGhpcy5jb3JyZWxhdGlvbklkKSkge1xuICAgICAgbG9nID0gdGltZXN0YW1wICsgXCI6XCIgKyB0aGlzLmNvcnJlbGF0aW9uSWQgKyBcIi1cIiArIFV0aWxzLmdldExpYnJhcnlWZXJzaW9uKCkgKyBcIi1cIiArIExvZ0xldmVsW2xvZ0xldmVsXSArIFwiIFwiICsgbG9nTWVzc2FnZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb2cgPSB0aW1lc3RhbXAgKyBcIjpcIiArIFV0aWxzLmdldExpYnJhcnlWZXJzaW9uKCkgKyBcIi1cIiArIExvZ0xldmVsW2xvZ0xldmVsXSArIFwiIFwiICsgbG9nTWVzc2FnZTtcbiAgICB9XG4gICAgdGhpcy5leGVjdXRlQ2FsbGJhY2sobG9nTGV2ZWwsIGxvZywgY29udGFpbnNQaWkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGV4ZWN1dGVDYWxsYmFjayhsZXZlbDogTG9nTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZywgY29udGFpbnNQaWk6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5sb2NhbENhbGxiYWNrKSB7XG4gICAgICB0aGlzLmxvY2FsQ2FsbGJhY2sobGV2ZWwsIG1lc3NhZ2UsIGNvbnRhaW5zUGlpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sb2dNZXNzYWdlKExvZ0xldmVsLkVycm9yLCBtZXNzYWdlLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZXJyb3JQaWkobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sb2dNZXNzYWdlKExvZ0xldmVsLkVycm9yLCBtZXNzYWdlLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB3YXJuaW5nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubG9nTWVzc2FnZShMb2dMZXZlbC5XYXJuaW5nLCBtZXNzYWdlLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgd2FybmluZ1BpaShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ01lc3NhZ2UoTG9nTGV2ZWwuV2FybmluZywgbWVzc2FnZSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgaW5mbyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ01lc3NhZ2UoTG9nTGV2ZWwuSW5mbywgbWVzc2FnZSwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGluZm9QaWkobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sb2dNZXNzYWdlKExvZ0xldmVsLkluZm8sIG1lc3NhZ2UsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZlcmJvc2UobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sb2dNZXNzYWdlKExvZ0xldmVsLlZlcmJvc2UsIG1lc3NhZ2UsIGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2ZXJib3NlUGlpKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubG9nTWVzc2FnZShMb2dMZXZlbC5WZXJib3NlLCBtZXNzYWdlLCB0cnVlKTtcbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEF1dGhFcnJvciB9IGZyb20gXCIuL0F1dGhFcnJvclwiO1xuXG5leHBvcnQgY29uc3QgU2VydmVyRXJyb3JNZXNzYWdlID0ge1xuICAgIHNlcnZlclVuYXZhaWxhYmxlOiB7XG4gICAgICAgIGNvZGU6IFwic2VydmVyX3VuYXZhaWxhYmxlXCIsXG4gICAgICAgIGRlc2M6IFwiU2VydmVyIGlzIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlLlwiXG4gICAgfSxcbiAgICB1bmtub3duU2VydmVyRXJyb3I6IHtcbiAgICAgICAgY29kZTogXCJ1bmtub3duX3NlcnZlcl9lcnJvclwiXG4gICAgfSxcbn07XG5cbi8qKlxuICogRXJyb3IgdGhyb3duIHdoZW4gdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgc2VydmVyIGNvZGUsIGZvciBleGFtcGxlLCB1bmF2YWlsYWJpbGl0eS5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlcnZlckVycm9yIGV4dGVuZHMgQXV0aEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKGVycm9yQ29kZTogc3RyaW5nLCBlcnJvck1lc3NhZ2U/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoZXJyb3JDb2RlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlNlcnZlckVycm9yXCI7XG5cbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIFNlcnZlckVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZVNlcnZlclVuYXZhaWxhYmxlRXJyb3IoKTogU2VydmVyRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IFNlcnZlckVycm9yKFNlcnZlckVycm9yTWVzc2FnZS5zZXJ2ZXJVbmF2YWlsYWJsZS5jb2RlLFxuICAgICAgICAgICAgU2VydmVyRXJyb3JNZXNzYWdlLnNlcnZlclVuYXZhaWxhYmxlLmRlc2MpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVVbmtub3duU2VydmVyRXJyb3IoZXJyb3JEZXNjOiBzdHJpbmcpOiBTZXJ2ZXJFcnJvciB7XG4gICAgICAgIHJldHVybiBuZXcgU2VydmVyRXJyb3IoU2VydmVyRXJyb3JNZXNzYWdlLnVua25vd25TZXJ2ZXJFcnJvci5jb2RlLFxuICAgICAgICAgICAgZXJyb3JEZXNjKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgQWNjZXNzVG9rZW5DYWNoZUl0ZW0gfSBmcm9tIFwiLi9BY2Nlc3NUb2tlbkNhY2hlSXRlbVwiO1xuaW1wb3J0IHsgQWNjZXNzVG9rZW5LZXkgfSBmcm9tIFwiLi9BY2Nlc3NUb2tlbktleVwiO1xuaW1wb3J0IHsgQWNjZXNzVG9rZW5WYWx1ZSB9IGZyb20gXCIuL0FjY2Vzc1Rva2VuVmFsdWVcIjtcbmltcG9ydCB7IFNlcnZlclJlcXVlc3RQYXJhbWV0ZXJzIH0gZnJvbSBcIi4vU2VydmVyUmVxdWVzdFBhcmFtZXRlcnNcIjtcbmltcG9ydCB7IEF1dGhvcml0eSB9IGZyb20gXCIuL0F1dGhvcml0eVwiO1xuaW1wb3J0IHsgQ2xpZW50SW5mbyB9IGZyb20gXCIuL0NsaWVudEluZm9cIjtcbmltcG9ydCB7IENvbnN0YW50cywgU1NPVHlwZXMsIFByb21wdFN0YXRlIH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBJZFRva2VuIH0gZnJvbSBcIi4vSWRUb2tlblwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4vTG9nZ2VyXCI7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSBcIi4vU3RvcmFnZVwiO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gXCIuL0FjY291bnRcIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcbmltcG9ydCB7IEF1dGhvcml0eUZhY3RvcnkgfSBmcm9tIFwiLi9BdXRob3JpdHlGYWN0b3J5XCI7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBidWlsZENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9Db25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblBhcmFtZXRlcnMsIFFQRGljdCwgdmFsaWRhdGVDbGFpbXNSZXF1ZXN0IH0gZnJvbSBcIi4vQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzXCI7XG5pbXBvcnQgeyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3IgfSBmcm9tIFwiLi9lcnJvci9DbGllbnRDb25maWd1cmF0aW9uRXJyb3JcIjtcbmltcG9ydCB7IEF1dGhFcnJvciB9IGZyb20gXCIuL2Vycm9yL0F1dGhFcnJvclwiO1xuaW1wb3J0IHsgQ2xpZW50QXV0aEVycm9yLCBDbGllbnRBdXRoRXJyb3JNZXNzYWdlIH0gZnJvbSBcIi4vZXJyb3IvQ2xpZW50QXV0aEVycm9yXCI7XG5pbXBvcnQgeyBTZXJ2ZXJFcnJvciB9IGZyb20gXCIuL2Vycm9yL1NlcnZlckVycm9yXCI7XG5pbXBvcnQgeyBJbnRlcmFjdGlvblJlcXVpcmVkQXV0aEVycm9yIH0gZnJvbSBcIi4vZXJyb3IvSW50ZXJhY3Rpb25SZXF1aXJlZEF1dGhFcnJvclwiO1xuaW1wb3J0IHsgQXV0aFJlc3BvbnNlLCBidWlsZFJlc3BvbnNlU3RhdGVPbmx5IH0gZnJvbSBcIi4vQXV0aFJlc3BvbnNlXCI7XG5cbi8vIGRlZmF1bHQgYXV0aG9yaXR5XG5jb25zdCBERUZBVUxUX0FVVEhPUklUWSA9IFwiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2NvbW1vblwiO1xuXG4vKipcbiAqIEludGVyZmFjZSB0byBoYW5kbGUgaUZyYW1lIGdlbmVyYXRpb24sIFBvcHVwIFdpbmRvdyBjcmVhdGlvbiBhbmQgcmVkaXJlY3QgaGFuZGxpbmdcbiAqL1xuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBtc2FsOiBPYmplY3Q7XG4gICAgICAgIEN1c3RvbUV2ZW50OiBDdXN0b21FdmVudDtcbiAgICAgICAgRXZlbnQ6IEV2ZW50O1xuICAgICAgICBhY3RpdmVSZW5ld2Fsczoge307XG4gICAgICAgIHJlbmV3U3RhdGVzOiBBcnJheTxzdHJpbmc+O1xuICAgICAgICBjYWxsYmFja01hcHBlZFRvUmVuZXdTdGF0ZXMgOiB7fTtcbiAgICAgICAgcHJvbWlzZU1hcHBlZFRvUmVuZXdTdGF0ZXM6IHt9O1xuICAgICAgICBvcGVuZWRXaW5kb3dzOiBBcnJheTxXaW5kb3c+O1xuICAgICAgICByZXF1ZXN0VHlwZTogc3RyaW5nO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKiByZXNwb25zZV90eXBlIGZyb20gT3BlbklEQ29ubmVjdFxuICogUmVmZXJlbmNlczogaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29hdXRoLXYyLW11bHRpcGxlLXJlc3BvbnNlLXR5cGVzLTFfMC5odG1sICYgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjIuMVxuICogU2luY2Ugd2Ugc3VwcG9ydCBvbmx5IGltcGxpY2l0IGZsb3cgaW4gdGhpcyBsaWJyYXJ5LCB3ZSByZXN0cmljdCB0aGUgcmVzcG9uc2VfdHlwZSBzdXBwb3J0IHRvIG9ubHkgJ3Rva2VuJyBhbmQgJ2lkX3Rva2VuJ1xuICpcbiAqL1xuY29uc3QgUmVzcG9uc2VUeXBlcyA9IHtcbiAgaWRfdG9rZW46IFwiaWRfdG9rZW5cIixcbiAgdG9rZW46IFwidG9rZW5cIixcbiAgaWRfdG9rZW5fdG9rZW46IFwiaWRfdG9rZW4gdG9rZW5cIlxufTtcblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2FjaGVSZXN1bHQge1xuICBlcnJvckRlc2M6IHN0cmluZztcbiAgdG9rZW46IHN0cmluZztcbiAgZXJyb3I6IHN0cmluZztcbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKiBEYXRhIHR5cGUgdG8gaG9sZCBpbmZvcm1hdGlvbiBhYm91dCBzdGF0ZSByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2ZXJcbiAqL1xuZXhwb3J0IHR5cGUgUmVzcG9uc2VTdGF0ZUluZm8gPSB7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHN0YXRlTWF0Y2g6IGJvb2xlYW47XG4gIHJlcXVlc3RUeXBlOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIEEgdHlwZSBhbGlhcyBmb3IgYW4gYXV0aFJlc3BvbnNlQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0gYXV0aEVyciBlcnJvciBjcmVhdGVkIGZvciBmYWlsdXJlIGNhc2VzXG4gKiBAcGFyYW0gcmVzcG9uc2UgcmVzcG9uc2UgY29udGFpbmluZyB0b2tlbiBzdHJpbmdzIGluIHN1Y2Nlc3MgY2FzZXMsIG9yIGp1c3Qgc3RhdGUgdmFsdWUgaW4gZXJyb3IgY2FzZXNcbiAqL1xuZXhwb3J0IHR5cGUgYXV0aFJlc3BvbnNlQ2FsbGJhY2sgPSAoYXV0aEVycjogQXV0aEVycm9yLCByZXNwb25zZT86IEF1dGhSZXNwb25zZSkgPT4gdm9pZDtcblxuLyoqXG4gKiBBIHR5cGUgYWxpYXMgZm9yIGFuIHRva2VuUmVjZWl2ZWRDYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSByZXNwb25zZSByZXNwb25zZSBjb250YWluaW5nIHRva2VuIHN0cmluZ3MgaW4gc3VjY2VzcyBjYXNlcywgb3IganVzdCBzdGF0ZSB2YWx1ZSBpbiBlcnJvciBjYXNlc1xuICovXG5leHBvcnQgdHlwZSB0b2tlblJlY2VpdmVkQ2FsbGJhY2sgPSAocmVzcG9uc2U6IEF1dGhSZXNwb25zZSkgPT4gdm9pZDtcblxuLyoqXG4gKiBBIHR5cGUgYWxpYXMgZm9yIGFuIGVycm9yUmVjZWl2ZWRDYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSBhdXRoRXJyIGVycm9yIGNyZWF0ZWQgZm9yIGZhaWx1cmUgY2FzZXNcbiAqL1xuZXhwb3J0IHR5cGUgZXJyb3JSZWNlaXZlZENhbGxiYWNrID0gKGF1dGhFcnI6IEF1dGhFcnJvciwgYWNjb3VudFN0YXRlOiBzdHJpbmcpID0+IHZvaWQ7XG5cbi8qKlxuICogQGhpZGRlblxuICogQSB3cmFwcGVyIHRvIGhhbmRsZSB0aGUgdG9rZW4gcmVzcG9uc2UvZXJyb3Igd2l0aGluIHRoZSBpRnJhbWUgYWx3YXlzXG4gKlxuICogQHBhcmFtIHRhcmdldFxuICogQHBhcmFtIHByb3BlcnR5S2V5XG4gKiBAcGFyYW0gZGVzY3JpcHRvclxuICovXG5jb25zdCByZXNvbHZlVG9rZW5Pbmx5SWZPdXRPZklmcmFtZSA9ICh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSA9PiB7XG4gIGNvbnN0IHRva2VuQWNxdWlzaXRpb25NZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc0luSWZyYW1lKClcbiAgICAgICAgICA/IG5ldyBQcm9taXNlKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9KVxuICAgICAgICAgIDogdG9rZW5BY3F1aXNpdGlvbk1ldGhvZC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfTtcbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59O1xuXG4vKipcbiAqIFVzZXJBZ2VudEFwcGxpY2F0aW9uIGNsYXNzIDoge0BsaW5rIFVzZXJBZ2VudEFwcGxpY2F0aW9ufVxuICogT2JqZWN0IEluc3RhbmNlIHRoYXQgdGhlIGRldmVsb3BlciBjYW4gdXNlIHRvIG1ha2UgbG9naW5YWCBPUiBhY3F1aXJlVG9rZW5YWCBmdW5jdGlvbnNcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXJBZ2VudEFwcGxpY2F0aW9uIHtcblxuICAvLyBpbnB1dCBDb25maWd1cmF0aW9uIGJ5IHRoZSBkZXZlbG9wZXIvdXNlclxuICBwcml2YXRlIGNvbmZpZzogQ29uZmlndXJhdGlvbjtcblxuICAvLyBjYWxsYmFja3MgZm9yIHRva2VuL2Vycm9yXG4gIHByaXZhdGUgYXV0aFJlc3BvbnNlQ2FsbGJhY2s6IGF1dGhSZXNwb25zZUNhbGxiYWNrID0gbnVsbDtcbiAgcHJpdmF0ZSB0b2tlblJlY2VpdmVkQ2FsbGJhY2s6IHRva2VuUmVjZWl2ZWRDYWxsYmFjayA9IG51bGw7XG4gIHByaXZhdGUgZXJyb3JSZWNlaXZlZENhbGxiYWNrOiBlcnJvclJlY2VpdmVkQ2FsbGJhY2sgPSBudWxsO1xuXG4gIC8vIEFkZGVkIGZvciByZWFkYWJpbGl0eSBhcyB0aGVzZSBwYXJhbXMgYXJlIHZlcnkgZnJlcXVlbnRseSB1c2VkXG4gIHByaXZhdGUgbG9nZ2VyOiBMb2dnZXI7XG4gIHByaXZhdGUgY2xpZW50SWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBpbkNvb2tpZTogYm9vbGVhbjtcblxuICAvLyBDYWNoZSBhbmQgQWNjb3VudCBpbmZvIHJlZmVycmVkIGFjcm9zcyB0b2tlbiBncmFudCBmbG93XG4gIHByb3RlY3RlZCBjYWNoZVN0b3JhZ2U6IFN0b3JhZ2U7XG4gIHByaXZhdGUgYWNjb3VudDogQWNjb3VudDtcblxuICAvLyBzdGF0ZSB2YXJpYWJsZXNcbiAgcHJpdmF0ZSBsb2dpbkluUHJvZ3Jlc3M6IGJvb2xlYW47XG4gIHByaXZhdGUgYWNxdWlyZVRva2VuSW5Qcm9ncmVzczogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzaWxlbnRBdXRoZW50aWNhdGlvblN0YXRlOiBzdHJpbmc7XG4gIHByaXZhdGUgc2lsZW50TG9naW46IGJvb2xlYW47XG4gIHByaXZhdGUgcmVkaXJlY3RDYWxsYmFja3NTZXQ6IGJvb2xlYW47XG5cbiAgLy8gQXV0aG9yaXR5IEZ1bmN0aW9uYWxpdHlcbiAgcHJvdGVjdGVkIGF1dGhvcml0eUluc3RhbmNlOiBBdXRob3JpdHk7XG5cbiAgLyoqXG4gICAqIHNldHRlciBmb3IgdGhlIGF1dGhvcml0eSBVUkxcbiAgICogQHBhcmFtIHtzdHJpbmd9IGF1dGhvcml0eVxuICAgKi9cbiAgLy8gSWYgdGhlIGRldmVsb3BlciBwYXNzZXMgYW4gYXV0aG9yaXR5LCBjcmVhdGUgYW4gaW5zdGFuY2VcbiAgcHVibGljIHNldCBhdXRob3JpdHkodmFsKSB7XG4gICAgdGhpcy5hdXRob3JpdHlJbnN0YW5jZSA9IEF1dGhvcml0eUZhY3RvcnkuQ3JlYXRlSW5zdGFuY2UodmFsLCB0aGlzLmNvbmZpZy5hdXRoLnZhbGlkYXRlQXV0aG9yaXR5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIHRoZSBhdXRob3JpdHksIHdoZXJlIGF1dGhvcml0eSBpcyBhIFVSTCBpbmRpY2F0aW5nIHRoZSBkaXJlY3RvcnkgdGhhdCBNU0FMIGNhbiB1c2UgdG8gb2J0YWluIHRva2Vuc1xuICAgKiAtIEluIEF6dXJlIEFELCB0aGlzIGF0dHJpYnV0ZSBpcyBhIFVSTCBpbmRpY2F0aW5nIHRoZSBBenVyZSBhY3RpdmUgZGlyZWN0b3J5IHRoYXQgTVNBTCB1c2VzIHRvIG9idGFpbiB0b2tlbnNcbiAgICogSXQgaXMgb2YgdGhlIGZvcm0gaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tLyZsdDtFbnRlcl90aGVfVGVuYW50X0luZm9fSGVyZSZndDtcbiAgICogSWYgeW91ciBhcHBsaWNhdGlvbiBzdXBwb3J0cyBBY2NvdW50cyBpbiBvbmUgb3JnYW5pemF0aW9uYWwgZGlyZWN0b3J5LCByZXBsYWNlIFwiRW50ZXJfdGhlX1RlbmFudF9JbmZvX0hlcmVcIiB2YWx1ZSB3aXRoIHRoZSBUZW5hbnQgSWQgb3IgVGVuYW50IG5hbWUgKGZvciBleGFtcGxlLCBjb250b3NvLm1pY3Jvc29mdC5jb20pXG4gICAqIElmIHlvdXIgYXBwbGljYXRpb24gc3VwcG9ydHMgQWNjb3VudHMgaW4gYW55IG9yZ2FuaXphdGlvbmFsIGRpcmVjdG9yeSwgcmVwbGFjZSBcIkVudGVyX3RoZV9UZW5hbnRfSW5mb19IZXJlXCIgdmFsdWUgd2l0aCBvcmdhbml6YXRpb25zXG4gICAqIElmIHlvdXIgYXBwbGljYXRpb24gc3VwcG9ydHMgQWNjb3VudHMgaW4gYW55IG9yZ2FuaXphdGlvbmFsIGRpcmVjdG9yeSBhbmQgcGVyc29uYWwgTWljcm9zb2Z0IGFjY291bnRzLCByZXBsYWNlIFwiRW50ZXJfdGhlX1RlbmFudF9JbmZvX0hlcmVcIiB2YWx1ZSB3aXRoIGNvbW1vbi5cbiAgICogVG8gcmVzdHJpY3Qgc3VwcG9ydCB0byBQZXJzb25hbCBNaWNyb3NvZnQgYWNjb3VudHMgb25seSwgcmVwbGFjZSBcIkVudGVyX3RoZV9UZW5hbnRfSW5mb19IZXJlXCIgdmFsdWUgd2l0aCBjb25zdW1lcnMuXG4gICAqIC0gSW4gQXp1cmUgQjJDLCBpdCBpcyBvZiB0aGUgZm9ybSBodHRwczovLyZsdDtpbnN0YW5jZSZndDsvdGZwLyZsdDt0ZW5hbnQmZ3Q7Lzxwb2xpY3lOYW1lPi9cbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gYXV0aG9yaXR5XG4gICAqL1xuICBwdWJsaWMgZ2V0IGF1dGhvcml0eSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmF1dGhvcml0eUluc3RhbmNlLkNhbm9uaWNhbEF1dGhvcml0eTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIHRoZSBhdXRob3JpdHkgaW5zdGFuY2VcbiAgICogQHJldHVybnMgYXV0aG9yaXR5IHtAbGluayBBdXRob3JpdHl9XG4gICAqL1xuICBwdWJsaWMgZ2V0QXV0aG9yaXR5SW5zdGFuY2UoKTogQXV0aG9yaXR5IHtcbiAgICByZXR1cm4gdGhpcy5hdXRob3JpdHlJbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIHtAbGluayBVc2VyQWdlbnRBcHBsaWNhdGlvbn0gb2JqZWN0XG4gICAqIFRoaXMgaXMgdG8gYmUgYWJsZSB0byBpbnN0YW50aWF0ZSB0aGUge0BsaW5rIFVzZXJBZ2VudEFwcGxpY2F0aW9ufSBvYmplY3RcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEltcG9ydGFudCBhdHRyaWJ1dGVzIHRvIGNvbmZpZ3VyZSBhcmU6XG4gICAqIC0gY2xpZW50SUQ6IHRoZSBhcHBsaWNhdGlvbiBJRCBvZiB5b3VyIGFwcGxpY2F0aW9uLiBZb3UgZ2V0IG9idGFpbiBvbmUgYnkgcmVnaXN0ZXJpbmcgeW91ciBhcHBsaWNhdGlvbiB3aXRoIG91ciBBcHBsaWNhdGlvbiByZWdpc3RyYXRpb24gcG9ydGFsIDogaHR0cHM6Ly9wb3J0YWwuYXp1cmUuY29tLyNibGFkZS9NaWNyb3NvZnRfQUFEX0lBTS9BY3RpdmVEaXJlY3RvcnlNZW51QmxhZGUvUmVnaXN0ZXJlZEFwcHNQcmV2aWV3XG4gICAqIC0gYXV0aG9yaXR5OiB0aGUgYXV0aG9yaXR5IFVSTCBmb3IgeW91ciBhcHBsaWNhdGlvblxuICAgKiBAcGFyYW0ge0BsaW5rIENvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciB0aGUgTVNBTCBVc2VyQWdlbnRBcHBsaWNhdGlvbiBpbnN0YW5jZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbikge1xuXG4gICAgLy8gU2V0IHRoZSBDb25maWd1cmF0aW9uXG4gICAgdGhpcy5jb25maWcgPSBidWlsZENvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbik7XG5cbiAgICAvLyBTZXQgdGhlIGNhbGxiYWNrIGJvb2xlYW5cbiAgICB0aGlzLnJlZGlyZWN0Q2FsbGJhY2tzU2V0ID0gZmFsc2U7XG5cbiAgICB0aGlzLmxvZ2dlciA9IHRoaXMuY29uZmlnLnN5c3RlbS5sb2dnZXI7XG4gICAgdGhpcy5jbGllbnRJZCA9IHRoaXMuY29uZmlnLmF1dGguY2xpZW50SWQ7XG4gICAgdGhpcy5pbkNvb2tpZSA9IHRoaXMuY29uZmlnLmNhY2hlLnN0b3JlQXV0aFN0YXRlSW5Db29raWU7XG5cbiAgICAvLyBpZiBubyBhdXRob3JpdHkgaXMgcGFzc2VkLCBzZXQgdGhlIGRlZmF1bHQ6IFwiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2NvbW1vblwiXG4gICAgdGhpcy5hdXRob3JpdHkgPSB0aGlzLmNvbmZpZy5hdXRoLmF1dGhvcml0eSB8fCBERUZBVUxUX0FVVEhPUklUWTtcblxuICAgIC8vIHRyYWNrIGxvZ2luIGFuZCBhY3F1aXJlVG9rZW4gaW4gcHJvZ3Jlc3NcbiAgICB0aGlzLmxvZ2luSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIHRoaXMuYWNxdWlyZVRva2VuSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG4gICAgLy8gY2FjaGUga2V5cyBtc2FsIC0gdHlwZXNjcmlwdCB0aHJvd3MgYW4gZXJyb3IgaWYgYW55IHZhbHVlIG90aGVyIHRoYW4gXCJsb2NhbFN0b3JhZ2VcIiBvciBcInNlc3Npb25TdG9yYWdlXCIgaXMgcGFzc2VkXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY2FjaGVTdG9yYWdlID0gbmV3IFN0b3JhZ2UodGhpcy5jb25maWcuY2FjaGUuY2FjaGVMb2NhdGlvbik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3IuY3JlYXRlSW52YWxpZENhY2hlTG9jYXRpb25Db25maWdFcnJvcih0aGlzLmNvbmZpZy5jYWNoZS5jYWNoZUxvY2F0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHdpbmRvdyBoYW5kbGluZyBjb2RlXG4gICAgd2luZG93Lm9wZW5lZFdpbmRvd3MgPSBbXTtcbiAgICB3aW5kb3cuYWN0aXZlUmVuZXdhbHMgPSB7fTtcbiAgICB3aW5kb3cucmVuZXdTdGF0ZXMgPSBbXTtcbiAgICB3aW5kb3cuY2FsbGJhY2tNYXBwZWRUb1JlbmV3U3RhdGVzID0geyB9O1xuICAgIHdpbmRvdy5wcm9taXNlTWFwcGVkVG9SZW5ld1N0YXRlcyA9IHsgfTtcbiAgICB3aW5kb3cubXNhbCA9IHRoaXM7XG5cbiAgICBjb25zdCB1cmxIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgY29uc3QgaXNDYWxsYmFjayA9IHRoaXMuaXNDYWxsYmFjayh1cmxIYXNoKTtcblxuICAgIC8vIE9uIHRoZSBzZXJ2ZXIgMzAyIC0gUmVkaXJlY3QsIGhhbmRsZSB0aGlzXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5mcmFtZXdvcmsuaXNBbmd1bGFyKSB7XG4gICAgICBpZiAoaXNDYWxsYmFjaykge1xuICAgICAgICB0aGlzLmhhbmRsZUF1dGhlbnRpY2F0aW9uUmVzcG9uc2UodXJsSGFzaCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8jcmVnaW9uIFJlZGlyZWN0IENhbGxiYWNrc1xuICAvKipcbiAgICogU2V0cyB0aGUgY2FsbGJhY2sgZnVuY3Rpb25zIGZvciB0aGUgcmVkaXJlY3QgZmxvdyB0byBzZW5kIGJhY2sgdGhlIHN1Y2Nlc3Mgb3IgZXJyb3Igb2JqZWN0LlxuICAgKiBAcGFyYW0ge2F1dGhSZXNwb25zZUNhbGxiYWNrfSBhdXRoQ2FsbGJhY2sgLSBDYWxsYmFjayB3aGljaCBjb250YWlucyBhbiBBdXRoRXJyb3Igb2JqZWN0LCBjb250YWluaW5nIGVycm9yIGRhdGEgZnJvbSBlaXRoZXIgdGhlIHNlcnZlclxuICAgKiBvciB0aGUgbGlicmFyeSwgZGVwZW5kaW5nIG9uIHRoZSBvcmlnaW4gb2YgdGhlIGVycm9yLCBvciB0aGUgQXV0aFJlc3BvbnNlIG9iamVjdCwgY29udGFpbmluZyBkYXRhIGZyb20gdGhlIHNlcnZlci5cbiAgICovXG4gIGhhbmRsZVJlZGlyZWN0Q2FsbGJhY2sodG9rZW5SZWNlaXZlZENhbGxiYWNrOiB0b2tlblJlY2VpdmVkQ2FsbGJhY2ssIGVycm9yUmVjZWl2ZWRDYWxsYmFjazogZXJyb3JSZWNlaXZlZENhbGxiYWNrKTogdm9pZDtcbiAgaGFuZGxlUmVkaXJlY3RDYWxsYmFjayhhdXRoQ2FsbGJhY2s6IGF1dGhSZXNwb25zZUNhbGxiYWNrKTogdm9pZDtcbiAgaGFuZGxlUmVkaXJlY3RDYWxsYmFjayhhdXRoT3JUb2tlbkNhbGxiYWNrOiBhdXRoUmVzcG9uc2VDYWxsYmFjayB8IHRva2VuUmVjZWl2ZWRDYWxsYmFjaywgZXJyb3JSZWNlaXZlZENhbGxiYWNrPzogZXJyb3JSZWNlaXZlZENhbGxiYWNrKTogdm9pZCB7XG4gICAgaWYgKCFhdXRoT3JUb2tlbkNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnJlZGlyZWN0Q2FsbGJhY2tzU2V0ID0gZmFsc2U7XG4gICAgICB0aHJvdyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3IuY3JlYXRlSW52YWxpZENhbGxiYWNrT2JqZWN0RXJyb3IoYXV0aE9yVG9rZW5DYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLy8gU2V0IGNhbGxiYWNrc1xuICAgIGlmIChlcnJvclJlY2VpdmVkQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMudG9rZW5SZWNlaXZlZENhbGxiYWNrID0gYXV0aE9yVG9rZW5DYWxsYmFjayBhcyB0b2tlblJlY2VpdmVkQ2FsbGJhY2s7XG4gICAgICB0aGlzLmVycm9yUmVjZWl2ZWRDYWxsYmFjayA9IGVycm9yUmVjZWl2ZWRDYWxsYmFjaztcbiAgICAgIHRoaXMubG9nZ2VyLndhcm5pbmcoXCJUaGlzIG92ZXJsb2FkIGZvciBjYWxsYmFjayBpcyBkZXByZWNhdGVkIC0gcGxlYXNlIGNoYW5nZSB0aGUgZm9ybWF0IG9mIHRoZSBjYWxsYmFja3MgdG8gYSBzaW5nbGUgY2FsbGJhY2sgYXMgc2hvd246IChlcnI6IEF1dGhFcnJvciwgcmVzcG9uc2U6IEF1dGhSZXNwb25zZSkuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF1dGhSZXNwb25zZUNhbGxiYWNrID0gYXV0aE9yVG9rZW5DYWxsYmFjayBhcyBhdXRoUmVzcG9uc2VDYWxsYmFjaztcbiAgICB9XG5cbiAgICB0aGlzLnJlZGlyZWN0Q2FsbGJhY2tzU2V0ID0gdHJ1ZTtcblxuICAgIC8vIE9uIHRoZSBzZXJ2ZXIgMzAyIC0gUmVkaXJlY3QsIGhhbmRsZSB0aGlzXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5mcmFtZXdvcmsuaXNBbmd1bGFyKSB7XG4gICAgICBjb25zdCBjYWNoZWRIYXNoID0gdGhpcy5jYWNoZVN0b3JhZ2UuZ2V0SXRlbShDb25zdGFudHMudXJsSGFzaCk7XG4gICAgICBpZiAoY2FjaGVkSGFzaCkge1xuICAgICAgICB0aGlzLnByb2Nlc3NDYWxsQmFjayhjYWNoZWRIYXNoLCBudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZGlyZWN0U3VjY2Vzc0hhbmRsZXIocmVzcG9uc2U6IEF1dGhSZXNwb25zZSkgOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lcnJvclJlY2VpdmVkQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMudG9rZW5SZWNlaXZlZENhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXV0aFJlc3BvbnNlQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuYXV0aFJlc3BvbnNlQ2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVkaXJlY3RFcnJvckhhbmRsZXIoYXV0aEVycjogQXV0aEVycm9yLCByZXNwb25zZTogQXV0aFJlc3BvbnNlKSA6IHZvaWQge1xuICAgIGlmICh0aGlzLmVycm9yUmVjZWl2ZWRDYWxsYmFjaykge1xuICAgICAgdGhpcy5lcnJvclJlY2VpdmVkQ2FsbGJhY2soYXV0aEVyciwgcmVzcG9uc2UuYWNjb3VudFN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdXRoUmVzcG9uc2VDYWxsYmFjayhhdXRoRXJyLCByZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLy8jZW5kcmVnaW9uXG5cbiAgLy8jcmVnaW9uIFJlZGlyZWN0IEZsb3dcblxuICAvKipcbiAgICogVXNlIHdoZW4gaW5pdGlhdGluZyB0aGUgbG9naW4gcHJvY2VzcyBieSByZWRpcmVjdGluZyB0aGUgdXNlcidzIGJyb3dzZXIgdG8gdGhlIGF1dGhvcml6YXRpb24gZW5kcG9pbnQuXG4gICAqIEBwYXJhbSB7QGxpbmsgQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzfVxuICAgKi9cbiAgbG9naW5SZWRpcmVjdChyZXF1ZXN0PzogQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzKTogdm9pZCB7XG5cbiAgICAvLyBUaHJvdyBlcnJvciBpZiBjYWxsYmFja3MgYXJlIG5vdCBzZXQgYmVmb3JlIHJlZGlyZWN0XG4gICAgaWYgKCF0aGlzLnJlZGlyZWN0Q2FsbGJhY2tzU2V0KSB7XG4gICAgICB0aHJvdyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3IuY3JlYXRlUmVkaXJlY3RDYWxsYmFja3NOb3RTZXRFcnJvcigpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZXMgbmF2aWdhdGUgdXJsOyBzYXZlcyB2YWx1ZSBpbiBjYWNoZTsgcmVkaXJlY3QgdXNlciB0byBBQURcbiAgICBpZiAodGhpcy5sb2dpbkluUHJvZ3Jlc3MpIHtcbiAgICAgIGxldCByZXFTdGF0ZTtcbiAgICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgIHJlcVN0YXRlID0gcmVxdWVzdC5zdGF0ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVkaXJlY3RFcnJvckhhbmRsZXIoQ2xpZW50QXV0aEVycm9yLmNyZWF0ZUxvZ2luSW5Qcm9ncmVzc0Vycm9yKCksIGJ1aWxkUmVzcG9uc2VTdGF0ZU9ubHkocmVxU3RhdGUpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiBleHRyYVNjb3Blc1RvQ29uc2VudCBpcyBwYXNzZWQsIGFwcGVuZCB0aGVtIHRvIHRoZSBsb2dpbiByZXF1ZXN0XG4gICAgbGV0IHNjb3BlczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuYXBwZW5kU2NvcGVzKHJlcXVlc3QpO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIGZpbHRlciBzY29wZXMgKHRoZSB2YWxpZGF0ZSBmdW5jdGlvbiB3aWxsIHRocm93IGlmIHZhbGlkYXRpb24gZmFpbHMpXG4gICAgdGhpcy52YWxpZGF0ZUlucHV0U2NvcGUoc2NvcGVzLCBmYWxzZSk7XG5cbiAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0gdGhpcy5nZXRBY2NvdW50KCk7XG5cbiAgICAvLyBkZWZlciBxdWVyeVBhcmFtZXRlcnMgZ2VuZXJhdGlvbiB0byBIZWxwZXIgaWYgZGV2ZWxvcGVyIHBhc3NlcyBhY2NvdW50L3NpZC9sb2dpbl9oaW50XG4gICAgaWYgKFV0aWxzLmlzU1NPUGFyYW0ocmVxdWVzdCkpIHtcbiAgICAgIC8vIGlmIGFjY291bnQgaXMgbm90IHByb3ZpZGVkLCB3ZSBwYXNzIG51bGxcbiAgICAgIHRoaXMubG9naW5SZWRpcmVjdEhlbHBlcihhY2NvdW50LCByZXF1ZXN0LCBzY29wZXMpO1xuICAgIH1cbiAgICAvLyBlbHNlIGhhbmRsZSB0aGUgbGlicmFyeSBkYXRhXG4gICAgZWxzZSB7XG4gICAgICAvLyBleHRyYWN0IEFEQUwgaWRfdG9rZW4gaWYgZXhpc3RzXG4gICAgICBsZXQgYWRhbElkVG9rZW4gPSB0aGlzLmV4dHJhY3RBREFMSWRUb2tlbigpO1xuXG4gICAgICAvLyBzaWxlbnQgbG9naW4gaWYgQURBTCBpZF90b2tlbiBpcyByZXRyaWV2ZWQgc3VjY2Vzc2Z1bGx5IC0gU1NPXG4gICAgICBpZiAoYWRhbElkVG9rZW4gJiYgIXNjb3Blcykge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFwiQURBTCdzIGlkVG9rZW4gZXhpc3RzLiBFeHRyYWN0aW5nIGxvZ2luIGluZm9ybWF0aW9uIGZyb20gQURBTCdzIGlkVG9rZW4gXCIpO1xuICAgICAgICBsZXQgdG9rZW5SZXF1ZXN0OiBBdXRoZW50aWNhdGlvblBhcmFtZXRlcnMgPSB0aGlzLmJ1aWxkSURUb2tlblJlcXVlc3QocmVxdWVzdCk7XG5cbiAgICAgICAgdGhpcy5zaWxlbnRMb2dpbiA9IHRydWU7XG4gICAgICAgIHRoaXMuYWNxdWlyZVRva2VuU2lsZW50KHRva2VuUmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgdGhpcy5zaWxlbnRMb2dpbiA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJVbmlmaWVkIGNhY2hlIGNhbGwgaXMgc3VjY2Vzc2Z1bFwiKTtcblxuICAgICAgICAgIGlmICh0aGlzLnJlZGlyZWN0Q2FsbGJhY2tzU2V0KSB7XG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0U3VjY2Vzc0hhbmRsZXIocmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuc2lsZW50TG9naW4gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIkVycm9yIG9jY3VycmVkIGR1cmluZyB1bmlmaWVkIGNhY2hlIEFUU1wiKTtcblxuICAgICAgICAgIC8vIGNhbGwgdGhlIGxvZ2luUmVkaXJlY3RIZWxwZXIgbGF0ZXIgd2l0aCBubyB1c2VyIGFjY291bnQgY29udGV4dFxuICAgICAgICAgIHRoaXMubG9naW5SZWRpcmVjdEhlbHBlcihudWxsLCByZXF1ZXN0LCBzY29wZXMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIGVsc2UgcHJvY2VlZCB0byBsb2dpblxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGNhbGwgdGhlIGxvZ2luUmVkaXJlY3RIZWxwZXIgbGF0ZXIgd2l0aCBubyB1c2VyIGFjY291bnQgY29udGV4dFxuICAgICAgICB0aGlzLmxvZ2luUmVkaXJlY3RIZWxwZXIobnVsbCwgcmVxdWVzdCwgc2NvcGVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIEhlbHBlciBmdW5jdGlvbiB0byBsb2dpblJlZGlyZWN0XG4gICAqXG4gICAqIEBwYXJhbSBhY2NvdW50XG4gICAqIEBwYXJhbSBBdXRoZW50aWNhdGlvblBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHNjb3Blc1xuICAgKi9cbiAgcHJpdmF0ZSBsb2dpblJlZGlyZWN0SGVscGVyKGFjY291bnQ6IEFjY291bnQsIHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uUGFyYW1ldGVycywgc2NvcGVzPzogQXJyYXk8c3RyaW5nPikge1xuICAgIC8vIFRyYWNrIGxvZ2luIGluIHByb2dyZXNzXG4gICAgdGhpcy5sb2dpbkluUHJvZ3Jlc3MgPSB0cnVlO1xuXG4gICAgdGhpcy5hdXRob3JpdHlJbnN0YW5jZS5yZXNvbHZlRW5kcG9pbnRzQXN5bmMoKS50aGVuKCgpID0+IHtcblxuICAgICAgLy8gY3JlYXRlIHRoZSBSZXF1ZXN0IHRvIGJlIHNlbnQgdG8gdGhlIFNlcnZlclxuICAgICAgbGV0IHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdCA9IG5ldyBTZXJ2ZXJSZXF1ZXN0UGFyYW1ldGVycyhcbiAgICAgICAgdGhpcy5hdXRob3JpdHlJbnN0YW5jZSxcbiAgICAgICAgdGhpcy5jbGllbnRJZCwgc2NvcGVzLFxuICAgICAgICBSZXNwb25zZVR5cGVzLmlkX3Rva2VuLFxuICAgICAgICB0aGlzLmdldFJlZGlyZWN0VXJpKCksXG4gICAgICAgIHJlcXVlc3Quc3RhdGVcbiAgICAgICk7XG5cbiAgICAgIC8vIHBvcHVsYXRlIFF1ZXJ5UGFyYW1ldGVycyAoc2lkL2xvZ2luX2hpbnQvZG9tYWluX2hpbnQpIGFuZCBhbnkgb3RoZXIgZXh0cmFRdWVyeVBhcmFtZXRlcnMgc2V0IGJ5IHRoZSBkZXZlbG9wZXJcbiAgICAgIHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdCA9IHRoaXMucG9wdWxhdGVRdWVyeVBhcmFtcyhhY2NvdW50LCByZXF1ZXN0LCBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QpO1xuXG4gICAgICAvLyBpZiB0aGUgdXNlciBzZXRzIHRoZSBsb2dpbiBzdGFydCBwYWdlIC0gYW5ndWxhciBvbmx5Pz9cbiAgICAgIGxldCBsb2dpblN0YXJ0UGFnZSA9IHRoaXMuY2FjaGVTdG9yYWdlLmdldEl0ZW0oQ29uc3RhbnRzLmFuZ3VsYXJMb2dpblJlcXVlc3QpO1xuICAgICAgaWYgKCFsb2dpblN0YXJ0UGFnZSB8fCBsb2dpblN0YXJ0UGFnZSA9PT0gXCJcIikge1xuICAgICAgICBsb2dpblN0YXJ0UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMuYW5ndWxhckxvZ2luUmVxdWVzdCwgXCJcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudXBkYXRlQ2FjaGVFbnRyaWVzKHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdCwgYWNjb3VudCwgbG9naW5TdGFydFBhZ2UpO1xuXG4gICAgICAvLyBidWlsZCBVUkwgdG8gbmF2aWdhdGUgdG8gcHJvY2VlZCB3aXRoIHRoZSBsb2dpblxuICAgICAgbGV0IHVybE5hdmlnYXRlID0gc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LmNyZWF0ZU5hdmlnYXRlVXJsKHNjb3BlcykgKyBDb25zdGFudHMucmVzcG9uc2VfbW9kZV9mcmFnbWVudDtcblxuICAgICAgLy8gUmVkaXJlY3QgdXNlciB0byBsb2dpbiBVUkxcbiAgICAgIHRoaXMucHJvbXB0VXNlcih1cmxOYXZpZ2F0ZSk7XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIud2FybmluZyhcImNvdWxkIG5vdCByZXNvbHZlIGVuZHBvaW50c1wiKTtcbiAgICAgIGxldCByZXFTdGF0ZTtcbiAgICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgIHJlcVN0YXRlID0gcmVxdWVzdC5zdGF0ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVkaXJlY3RFcnJvckhhbmRsZXIoQ2xpZW50QXV0aEVycm9yLmNyZWF0ZUVuZHBvaW50UmVzb2x1dGlvbkVycm9yKGVyci50b1N0cmluZyksIGJ1aWxkUmVzcG9uc2VTdGF0ZU9ubHkocmVxU3RhdGUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHdoZW4geW91IHdhbnQgdG8gb2J0YWluIGFuIGFjY2Vzc190b2tlbiBmb3IgeW91ciBBUEkgYnkgcmVkaXJlY3RpbmcgdGhlIHVzZXIgdG8gdGhlIGF1dGhvcml6YXRpb24gZW5kcG9pbnQuXG4gICAqIEBwYXJhbSB7QGxpbmsgQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzfVxuICAgKlxuICAgKiBUbyByZW5ldyBpZFRva2VuLCBwbGVhc2UgcGFzcyBjbGllbnRJZCBhcyB0aGUgb25seSBzY29wZSBpbiB0aGUgQXV0aGVudGljYXRpb24gUGFyYW1ldGVyc1xuICAgKi9cbiAgYWNxdWlyZVRva2VuUmVkaXJlY3QocmVxdWVzdDogQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzKTogdm9pZCB7XG4gICAgLy8gVGhyb3cgZXJyb3IgaWYgY2FsbGJhY2tzIGFyZSBub3Qgc2V0IGJlZm9yZSByZWRpcmVjdFxuICAgIGlmICghdGhpcy5yZWRpcmVjdENhbGxiYWNrc1NldCkge1xuICAgICAgdGhyb3cgQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yLmNyZWF0ZVJlZGlyZWN0Q2FsbGJhY2tzTm90U2V0RXJyb3IoKTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgZmlsdGVyIHNjb3BlcyAodGhlIHZhbGlkYXRlIGZ1bmN0aW9uIHdpbGwgdGhyb3cgaWYgdmFsaWRhdGlvbiBmYWlscylcbiAgICB0aGlzLnZhbGlkYXRlSW5wdXRTY29wZShyZXF1ZXN0LnNjb3BlcywgdHJ1ZSk7XG5cbiAgICAvLyBHZXQgdGhlIGFjY291bnQgb2JqZWN0IGlmIGEgc2Vzc2lvbiBleGlzdHNcbiAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0gcmVxdWVzdC5hY2NvdW50IHx8IHRoaXMuZ2V0QWNjb3VudCgpO1xuXG4gICAgLy8gSWYgYWxyZWFkeSBpbiBwcm9ncmVzcywgZG8gbm90IHByb2NlZWRcbiAgICBpZiAodGhpcy5hY3F1aXJlVG9rZW5JblByb2dyZXNzKSB7XG4gICAgICBsZXQgcmVxU3RhdGU7XG4gICAgICBpZiAocmVxdWVzdCkge1xuICAgICAgICByZXFTdGF0ZSA9IHJlcXVlc3Quc3RhdGU7XG4gICAgICB9XG4gICAgICB0aGlzLnJlZGlyZWN0RXJyb3JIYW5kbGVyKENsaWVudEF1dGhFcnJvci5jcmVhdGVBY3F1aXJlVG9rZW5JblByb2dyZXNzRXJyb3IoKSwgYnVpbGRSZXNwb25zZVN0YXRlT25seSh0aGlzLmdldEFjY291bnRTdGF0ZShyZXFTdGF0ZSkpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiBubyBzZXNzaW9uIGV4aXN0cywgcHJvbXB0IHRoZSB1c2VyIHRvIGxvZ2luLlxuICAgIGlmICghYWNjb3VudCAmJiAhKHJlcXVlc3Quc2lkICB8fCByZXF1ZXN0LmxvZ2luSGludCkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJVc2VyIGxvZ2luIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgdGhyb3cgQ2xpZW50QXV0aEVycm9yLmNyZWF0ZVVzZXJMb2dpblJlcXVpcmVkRXJyb3IoKTtcbiAgICB9XG5cbiAgICBsZXQgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0OiBTZXJ2ZXJSZXF1ZXN0UGFyYW1ldGVycztcbiAgICBjb25zdCBhY3F1aXJlVG9rZW5BdXRob3JpdHkgPSByZXF1ZXN0LmF1dGhvcml0eSA/IEF1dGhvcml0eUZhY3RvcnkuQ3JlYXRlSW5zdGFuY2UocmVxdWVzdC5hdXRob3JpdHksIHRoaXMuY29uZmlnLmF1dGgudmFsaWRhdGVBdXRob3JpdHkpIDogdGhpcy5hdXRob3JpdHlJbnN0YW5jZTtcblxuICAgIC8vIFRyYWNrIHRoZSBhY3F1aXJlVG9rZW4gcHJvZ3Jlc3NcbiAgICB0aGlzLmFjcXVpcmVUb2tlbkluUHJvZ3Jlc3MgPSB0cnVlO1xuXG4gICAgYWNxdWlyZVRva2VuQXV0aG9yaXR5LnJlc29sdmVFbmRwb2ludHNBc3luYygpLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gT24gRnVsZmlsbG1lbnRcbiAgICAgIGNvbnN0IHJlc3BvbnNlVHlwZSA9IHRoaXMuZ2V0VG9rZW5UeXBlKGFjY291bnQsIHJlcXVlc3Quc2NvcGVzLCBmYWxzZSk7XG4gICAgICBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QgPSBuZXcgU2VydmVyUmVxdWVzdFBhcmFtZXRlcnMoXG4gICAgICAgIGFjcXVpcmVUb2tlbkF1dGhvcml0eSxcbiAgICAgICAgdGhpcy5jbGllbnRJZCxcbiAgICAgICAgcmVxdWVzdC5zY29wZXMsXG4gICAgICAgIHJlc3BvbnNlVHlwZSxcbiAgICAgICAgdGhpcy5nZXRSZWRpcmVjdFVyaSgpLFxuICAgICAgICByZXF1ZXN0LnN0YXRlXG4gICAgICApO1xuXG4gICAgICB0aGlzLnVwZGF0ZUNhY2hlRW50cmllcyhzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QsIGFjY291bnQpO1xuXG4gICAgICAvLyBwb3B1bGF0ZSBRdWVyeVBhcmFtZXRlcnMgKHNpZC9sb2dpbl9oaW50L2RvbWFpbl9oaW50KSBhbmQgYW55IG90aGVyIGV4dHJhUXVlcnlQYXJhbWV0ZXJzIHNldCBieSB0aGUgZGV2ZWxvcGVyXG4gICAgICBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QgPSB0aGlzLnBvcHVsYXRlUXVlcnlQYXJhbXMoYWNjb3VudCwgcmVxdWVzdCwgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0KTtcblxuICAgICAgLy8gQ29uc3RydWN0IHVybE5hdmlnYXRlXG4gICAgICBsZXQgdXJsTmF2aWdhdGUgPSBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QuY3JlYXRlTmF2aWdhdGVVcmwocmVxdWVzdC5zY29wZXMpICsgQ29uc3RhbnRzLnJlc3BvbnNlX21vZGVfZnJhZ21lbnQ7XG5cbiAgICAgIC8vIHNldCBzdGF0ZSBpbiBjYWNoZSBhbmQgcmVkaXJlY3QgdG8gdXJsTmF2aWdhdGVcbiAgICAgIGlmICh1cmxOYXZpZ2F0ZSkge1xuICAgICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKENvbnN0YW50cy5zdGF0ZUFjcXVpcmVUb2tlbiwgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LnN0YXRlLCB0aGlzLmluQ29va2llKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UodXJsTmF2aWdhdGUpO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm5pbmcoXCJjb3VsZCBub3QgcmVzb2x2ZSBlbmRwb2ludHNcIik7XG5cbiAgICAgIGxldCByZXFTdGF0ZTtcbiAgICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgIHJlcVN0YXRlID0gcmVxdWVzdC5zdGF0ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVkaXJlY3RFcnJvckhhbmRsZXIoQ2xpZW50QXV0aEVycm9yLmNyZWF0ZUVuZHBvaW50UmVzb2x1dGlvbkVycm9yKGVyci50b1N0cmluZyksIGJ1aWxkUmVzcG9uc2VTdGF0ZU9ubHkocmVxU3RhdGUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIENoZWNrcyBpZiB0aGUgcmVkaXJlY3QgcmVzcG9uc2UgaXMgcmVjZWl2ZWQgZnJvbSB0aGUgU1RTLiBJbiBjYXNlIG9mIHJlZGlyZWN0LCB0aGUgdXJsIGZyYWdtZW50IGhhcyBlaXRoZXIgaWRfdG9rZW4sIGFjY2Vzc190b2tlbiBvciBlcnJvci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggLSBIYXNoIHBhc3NlZCBmcm9tIHJlZGlyZWN0IHBhZ2UuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIHRydWUgaWYgcmVzcG9uc2UgY29udGFpbnMgaWRfdG9rZW4sIGFjY2Vzc190b2tlbiBvciBlcnJvciwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgLy8gVE9ETyAtIHJlbmFtZSB0aGlzLCB0aGUgbmFtZSBpcyBjb25mdXNpbmdcbiAgaXNDYWxsYmFjayhoYXNoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBoYXNoID0gdGhpcy5nZXRIYXNoKGhhc2gpO1xuICAgIGNvbnN0IHBhcmFtZXRlcnMgPSBVdGlscy5kZXNlcmlhbGl6ZShoYXNoKTtcbiAgICByZXR1cm4gKFxuICAgICAgcGFyYW1ldGVycy5oYXNPd25Qcm9wZXJ0eShDb25zdGFudHMuZXJyb3JEZXNjcmlwdGlvbikgfHxcbiAgICAgIHBhcmFtZXRlcnMuaGFzT3duUHJvcGVydHkoQ29uc3RhbnRzLmVycm9yKSB8fFxuICAgICAgcGFyYW1ldGVycy5oYXNPd25Qcm9wZXJ0eShDb25zdGFudHMuYWNjZXNzVG9rZW4pIHx8XG4gICAgICBwYXJhbWV0ZXJzLmhhc093blByb3BlcnR5KENvbnN0YW50cy5pZFRva2VuKVxuICAgICk7XG4gIH1cblxuICAvLyNlbmRyZWdpb25cblxuICAvLyNyZWdpb24gUG9wdXAgRmxvd1xuXG4gIC8qKlxuICAgKiBVc2Ugd2hlbiBpbml0aWF0aW5nIHRoZSBsb2dpbiBwcm9jZXNzIHZpYSBvcGVuaW5nIGEgcG9wdXAgd2luZG93IGluIHRoZSB1c2VyJ3MgYnJvd3NlclxuICAgKlxuICAgKiBAcGFyYW0ge0BsaW5rIEF1dGhlbnRpY2F0aW9uUGFyYW1ldGVyc31cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2UuPEF1dGhSZXNwb25zZT59IC0gQSBQcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdoZW4gdGhpcyBmdW5jdGlvbiBoYXMgY29tcGxldGVkLCBvciByZWplY3RlZCBpZiBhbiBlcnJvciB3YXMgcmFpc2VkLiBSZXR1cm5zIHRoZSB7QGxpbmsgQXV0aFJlc3BvbnNlfSBvYmplY3RcbiAgICovXG4gIGxvZ2luUG9wdXAocmVxdWVzdD86IEF1dGhlbnRpY2F0aW9uUGFyYW1ldGVycyk6IFByb21pc2U8QXV0aFJlc3BvbnNlPiB7XG4gICAgLy8gQ3JlYXRlcyBuYXZpZ2F0ZSB1cmw7IHNhdmVzIHZhbHVlIGluIGNhY2hlOyByZWRpcmVjdCB1c2VyIHRvIEFBRFxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxBdXRoUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIEZhaWwgaWYgbG9naW4gaXMgYWxyZWFkeSBpbiBwcm9ncmVzc1xuICAgICAgaWYgKHRoaXMubG9naW5JblByb2dyZXNzKSB7XG4gICAgICAgIHJldHVybiByZWplY3QoQ2xpZW50QXV0aEVycm9yLmNyZWF0ZUxvZ2luSW5Qcm9ncmVzc0Vycm9yKCkpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBleHRyYVNjb3Blc1RvQ29uc2VudCBpcyBwYXNzZWQsIGFwcGVuZCB0aGVtIHRvIHRoZSBsb2dpbiByZXF1ZXN0XG4gICAgICBsZXQgc2NvcGVzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5hcHBlbmRTY29wZXMocmVxdWVzdCk7XG5cbiAgICAgIC8vIFZhbGlkYXRlIGFuZCBmaWx0ZXIgc2NvcGVzICh0aGUgdmFsaWRhdGUgZnVuY3Rpb24gd2lsbCB0aHJvdyBpZiB2YWxpZGF0aW9uIGZhaWxzKVxuICAgICAgdGhpcy52YWxpZGF0ZUlucHV0U2NvcGUoc2NvcGVzLCBmYWxzZSk7XG5cbiAgICAgIGxldCBhY2NvdW50ID0gdGhpcy5nZXRBY2NvdW50KCk7XG5cbiAgICAgLy8gYWRkIHRoZSBwcm9tcHQgcGFyYW1ldGVyIHRvIHRoZSAnZXh0cmFRdWVyeVBhcmFtZXRlcnMnIGlmIHBhc3NlZFxuICAgICAgaWYgKFV0aWxzLmlzU1NPUGFyYW0ocmVxdWVzdCkpIHtcbiAgICAgICAgIC8vIGlmIGFjY291bnQgaXMgbm90IHByb3ZpZGVkLCB3ZSBwYXNzIG51bGxcbiAgICAgICAgIHRoaXMubG9naW5Qb3B1cEhlbHBlcihhY2NvdW50LCByZXF1ZXN0LCByZXNvbHZlLCByZWplY3QsIHNjb3Blcyk7XG4gICAgICB9XG4gICAgICAvLyBlbHNlIGhhbmRsZSB0aGUgbGlicmFyeSBkYXRhXG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gRXh0cmFjdCBBREFMIGlkX3Rva2VuIGlmIGl0IGV4aXN0c1xuICAgICAgICBsZXQgYWRhbElkVG9rZW4gPSB0aGlzLmV4dHJhY3RBREFMSWRUb2tlbigpO1xuXG4gICAgICAgIC8vIHNpbGVudCBsb2dpbiBpZiBBREFMIGlkX3Rva2VuIGlzIHJldHJpZXZlZCBzdWNjZXNzZnVsbHkgLSBTU09cbiAgICAgICAgaWYgKGFkYWxJZFRva2VuICYmICFzY29wZXMpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFwiQURBTCdzIGlkVG9rZW4gZXhpc3RzLiBFeHRyYWN0aW5nIGxvZ2luIGluZm9ybWF0aW9uIGZyb20gQURBTCdzIGlkVG9rZW4gXCIpO1xuICAgICAgICAgIGxldCB0b2tlblJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uUGFyYW1ldGVycyA9IHRoaXMuYnVpbGRJRFRva2VuUmVxdWVzdChyZXF1ZXN0KTtcblxuICAgICAgICAgIHRoaXMuc2lsZW50TG9naW4gPSB0cnVlO1xuICAgICAgICAgIHRoaXMuYWNxdWlyZVRva2VuU2lsZW50KHRva2VuUmVxdWVzdClcbiAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaWxlbnRMb2dpbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIlVuaWZpZWQgY2FjaGUgY2FsbCBpcyBzdWNjZXNzZnVsXCIpO1xuXG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2lsZW50TG9naW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwiRXJyb3Igb2NjdXJyZWQgZHVyaW5nIHVuaWZpZWQgY2FjaGUgQVRTXCIpO1xuICAgICAgICAgICAgdGhpcy5sb2dpblBvcHVwSGVscGVyKG51bGwsIHJlcXVlc3QsIHJlc29sdmUsIHJlamVjdCwgc2NvcGVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlbHNlIHByb2NlZWQgd2l0aCBsb2dpblxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2luUG9wdXBIZWxwZXIobnVsbCwgcmVxdWVzdCwgcmVzb2x2ZSwgcmVqZWN0LCBzY29wZXMgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogSGVscGVyIGZ1bmN0aW9uIHRvIGxvZ2luUG9wdXBcbiAgICpcbiAgICogQHBhcmFtIGFjY291bnRcbiAgICogQHBhcmFtIHJlcXVlc3RcbiAgICogQHBhcmFtIHJlc29sdmVcbiAgICogQHBhcmFtIHJlamVjdFxuICAgKiBAcGFyYW0gc2NvcGVzXG4gICAqL1xuICBwcml2YXRlIGxvZ2luUG9wdXBIZWxwZXIoYWNjb3VudDogQWNjb3VudCwgcmVxdWVzdDogQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzLCByZXNvbHZlOiBhbnksIHJlamVjdDogYW55LCBzY29wZXM/OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgaWYgKCFzY29wZXMpIHtcbiAgICAgIHNjb3BlcyA9IFt0aGlzLmNsaWVudElkXTtcbiAgICB9XG4gICAgY29uc3Qgc2NvcGUgPSBzY29wZXMuam9pbihcIiBcIikudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIEdlbmVyYXRlIGEgcG9wdXAgd2luZG93XG4gICAgY29uc3QgcG9wVXBXaW5kb3cgPSB0aGlzLm9wZW5XaW5kb3coXCJhYm91dDpibGFua1wiLCBcIl9ibGFua1wiLCAxLCB0aGlzLCByZXNvbHZlLCByZWplY3QpO1xuICAgIGlmICghcG9wVXBXaW5kb3cpIHtcbiAgICAgIC8vIFdlIHBhc3MgcmVqZWN0IGluIG9wZW5XaW5kb3csIHdlIHJlamVjdCB0aGVyZSBkdXJpbmcgYW4gZXJyb3JcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUcmFjayBsb2dpbiBwcm9ncmVzc1xuICAgIHRoaXMubG9naW5JblByb2dyZXNzID0gdHJ1ZTtcblxuICAgIC8vIFJlc29sdmUgZW5kcG9pbnRcbiAgICB0aGlzLmF1dGhvcml0eUluc3RhbmNlLnJlc29sdmVFbmRwb2ludHNBc3luYygpLnRoZW4oKCkgPT4ge1xuICAgICAgbGV0IHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdCA9IG5ldyBTZXJ2ZXJSZXF1ZXN0UGFyYW1ldGVycyh0aGlzLmF1dGhvcml0eUluc3RhbmNlLCB0aGlzLmNsaWVudElkLCBzY29wZXMsIFJlc3BvbnNlVHlwZXMuaWRfdG9rZW4sIHRoaXMuZ2V0UmVkaXJlY3RVcmkoKSwgcmVxdWVzdC5zdGF0ZSk7XG5cbiAgICAgIC8vIHBvcHVsYXRlIFF1ZXJ5UGFyYW1ldGVycyAoc2lkL2xvZ2luX2hpbnQvZG9tYWluX2hpbnQpIGFuZCBhbnkgb3RoZXIgZXh0cmFRdWVyeVBhcmFtZXRlcnMgc2V0IGJ5IHRoZSBkZXZlbG9wZXI7XG4gICAgICBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QgPSB0aGlzLnBvcHVsYXRlUXVlcnlQYXJhbXMoYWNjb3VudCwgcmVxdWVzdCwgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0KTtcblxuICAgICAgdGhpcy51cGRhdGVDYWNoZUVudHJpZXMoc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LCBhY2NvdW50LCB3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAgIC8vIENhY2hlIHRoZSBzdGF0ZSwgbm9uY2UsIGFuZCBsb2dpbiByZXF1ZXN0IGRhdGFcbiAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLmxvZ2luUmVxdWVzdCwgd2luZG93LmxvY2F0aW9uLmhyZWYsIHRoaXMuaW5Db29raWUpO1xuICAgICAgdGhpcy5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMubG9naW5FcnJvciwgXCJcIik7XG5cbiAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLm5vbmNlSWRUb2tlbiwgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0Lm5vbmNlLCB0aGlzLmluQ29va2llKTtcblxuICAgICAgdGhpcy5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMubXNhbEVycm9yLCBcIlwiKTtcbiAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLm1zYWxFcnJvckRlc2NyaXB0aW9uLCBcIlwiKTtcblxuICAgICAgLy8gY2FjaGUgYXV0aG9yaXR5S2V5XG4gICAgICB0aGlzLnNldEF1dGhvcml0eUNhY2hlKHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5zdGF0ZSwgdGhpcy5hdXRob3JpdHkpO1xuXG4gICAgICAvLyBCdWlsZCB0aGUgVVJMIHRvIG5hdmlnYXRlIHRvIGluIHRoZSBwb3B1cCB3aW5kb3dcbiAgICAgIGxldCB1cmxOYXZpZ2F0ZSA9IHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5jcmVhdGVOYXZpZ2F0ZVVybChzY29wZXMpICArIENvbnN0YW50cy5yZXNwb25zZV9tb2RlX2ZyYWdtZW50O1xuXG4gICAgICB3aW5kb3cucmVuZXdTdGF0ZXMucHVzaChzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3Quc3RhdGUpO1xuICAgICAgd2luZG93LnJlcXVlc3RUeXBlID0gQ29uc3RhbnRzLmxvZ2luO1xuXG4gICAgICAvLyBSZWdpc3RlciBjYWxsYmFjayB0byBjYXB0dXJlIHJlc3VsdHMgZnJvbSBzZXJ2ZXJcbiAgICAgIHRoaXMucmVnaXN0ZXJDYWxsYmFjayhzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3Quc3RhdGUsIHNjb3BlLCByZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAvLyBOYXZpZ2F0ZSB1cmwgaW4gcG9wdXBXaW5kb3dcbiAgICAgIGlmIChwb3BVcFdpbmRvdykge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvUGlpKFwiTmF2aWdhdGVkIFBvcHVwIHdpbmRvdyB0bzpcIiArIHVybE5hdmlnYXRlKTtcbiAgICAgICAgcG9wVXBXaW5kb3cubG9jYXRpb24uaHJlZiA9IHVybE5hdmlnYXRlO1xuICAgICAgfVxuICAgIH0sICgpID0+IHtcbiAgICAgIC8vIEVuZHBvaW50IHJlc29sdXRpb24gZmFpbHVyZSBlcnJvclxuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhDbGllbnRBdXRoRXJyb3JNZXNzYWdlLmVuZHBvaW50UmVzb2x1dGlvbkVycm9yLmNvZGUgKyBcIjpcIiArIENsaWVudEF1dGhFcnJvck1lc3NhZ2UuZW5kcG9pbnRSZXNvbHV0aW9uRXJyb3IuZGVzYyk7XG4gICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKENvbnN0YW50cy5tc2FsRXJyb3IsIENsaWVudEF1dGhFcnJvck1lc3NhZ2UuZW5kcG9pbnRSZXNvbHV0aW9uRXJyb3IuY29kZSk7XG4gICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKENvbnN0YW50cy5tc2FsRXJyb3JEZXNjcmlwdGlvbiwgQ2xpZW50QXV0aEVycm9yTWVzc2FnZS5lbmRwb2ludFJlc29sdXRpb25FcnJvci5kZXNjKTtcblxuICAgICAgLy8gV2hhdCBpcyB0aGlzPyBJcyB0aGlzIHRoZSByZWplY3QgdGhhdCBpcyBwYXNzZWQgaW4/PyAtLSBSRURPIHRoaXMgaW4gdGhlIHN1YnNlcXVlbnQgcmVmYWN0b3IsIHBhc3NpbmcgcmVqZWN0IGlzIGNvbmZ1c2luZ1xuICAgICAgaWYgKHJlamVjdCkge1xuICAgICAgICByZWplY3QoQ2xpZW50QXV0aEVycm9yLmNyZWF0ZUVuZHBvaW50UmVzb2x1dGlvbkVycm9yKCkpO1xuICAgICAgfVxuXG4gICAgICAvLyBDbG9zZSB0aGUgcG9wdXAgd2luZG93XG4gICAgICBpZiAocG9wVXBXaW5kb3cpIHtcbiAgICAgICAgcG9wVXBXaW5kb3cuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuaW5nKFwiY291bGQgbm90IHJlc29sdmUgZW5kcG9pbnRzXCIpO1xuICAgICAgcmVqZWN0KENsaWVudEF1dGhFcnJvci5jcmVhdGVFbmRwb2ludFJlc29sdXRpb25FcnJvcihlcnIudG9TdHJpbmcpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2Ugd2hlbiB5b3Ugd2FudCB0byBvYnRhaW4gYW4gYWNjZXNzX3Rva2VuIGZvciB5b3VyIEFQSSB2aWEgb3BlbmluZyBhIHBvcHVwIHdpbmRvdyBpbiB0aGUgdXNlcidzIGJyb3dzZXJcbiAgICogQHBhcmFtIHtAbGluayBBdXRoZW50aWNhdGlvblBhcmFtZXRlcnN9XG4gICAqXG4gICAqIFRvIHJlbmV3IGlkVG9rZW4sIHBsZWFzZSBwYXNzIGNsaWVudElkIGFzIHRoZSBvbmx5IHNjb3BlIGluIHRoZSBBdXRoZW50aWNhdGlvbiBQYXJhbWV0ZXJzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlLjxBdXRoUmVzcG9uc2U+fSAtIEEgUHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aGVuIHRoaXMgZnVuY3Rpb24gaGFzIGNvbXBsZXRlZCwgb3IgcmVqZWN0ZWQgaWYgYW4gZXJyb3Igd2FzIHJhaXNlZC4gUmV0dXJucyB0aGUge0BsaW5rIEF1dGhSZXNwb25zZX0gb2JqZWN0XG4gICAqL1xuICBhY3F1aXJlVG9rZW5Qb3B1cChyZXF1ZXN0OiBBdXRoZW50aWNhdGlvblBhcmFtZXRlcnMpOiBQcm9taXNlPEF1dGhSZXNwb25zZT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxBdXRoUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIFZhbGlkYXRlIGFuZCBmaWx0ZXIgc2NvcGVzICh0aGUgdmFsaWRhdGUgZnVuY3Rpb24gd2lsbCB0aHJvdyBpZiB2YWxpZGF0aW9uIGZhaWxzKVxuICAgICAgdGhpcy52YWxpZGF0ZUlucHV0U2NvcGUocmVxdWVzdC5zY29wZXMsIHRydWUpO1xuXG4gICAgICBjb25zdCBzY29wZSA9IHJlcXVlc3Quc2NvcGVzLmpvaW4oXCIgXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIC8vIEdldCB0aGUgYWNjb3VudCBvYmplY3QgaWYgYSBzZXNzaW9uIGV4aXN0c1xuICAgICAgY29uc3QgYWNjb3VudDogQWNjb3VudCA9IHJlcXVlc3QuYWNjb3VudCB8fCB0aGlzLmdldEFjY291bnQoKTtcblxuICAgICAgLy8gSWYgYWxyZWFkeSBpbiBwcm9ncmVzcywgdGhyb3cgYW4gZXJyb3IgYW5kIHJlamVjdCB0aGUgcmVxdWVzdFxuICAgICAgaWYgKHRoaXMuYWNxdWlyZVRva2VuSW5Qcm9ncmVzcykge1xuICAgICAgICByZXR1cm4gcmVqZWN0KENsaWVudEF1dGhFcnJvci5jcmVhdGVBY3F1aXJlVG9rZW5JblByb2dyZXNzRXJyb3IoKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIG5vIHNlc3Npb24gZXhpc3RzLCBwcm9tcHQgdGhlIHVzZXIgdG8gbG9naW4uXG4gICAgICBpZiAoIWFjY291bnQgJiYgISEocmVxdWVzdC5zaWQgIHx8IHJlcXVlc3QubG9naW5IaW50KSkge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVXNlciBsb2dpbiBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgcmV0dXJuIHJlamVjdChDbGllbnRBdXRoRXJyb3IuY3JlYXRlVXNlckxvZ2luUmVxdWlyZWRFcnJvcigpKTtcbiAgICAgIH1cblxuICAgICAgLy8gdHJhY2sgdGhlIGFjcXVpcmVUb2tlbiBwcm9ncmVzc1xuICAgICAgdGhpcy5hY3F1aXJlVG9rZW5JblByb2dyZXNzID0gdHJ1ZTtcblxuICAgICAgbGV0IHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdDogU2VydmVyUmVxdWVzdFBhcmFtZXRlcnM7XG4gICAgICBjb25zdCBhY3F1aXJlVG9rZW5BdXRob3JpdHkgPSByZXF1ZXN0LmF1dGhvcml0eSA/IEF1dGhvcml0eUZhY3RvcnkuQ3JlYXRlSW5zdGFuY2UocmVxdWVzdC5hdXRob3JpdHksIHRoaXMuY29uZmlnLmF1dGgudmFsaWRhdGVBdXRob3JpdHkpIDogdGhpcy5hdXRob3JpdHlJbnN0YW5jZTtcblxuICAgICAgLy8gT3BlbiB0aGUgcG9wdXAgd2luZG93XG4gICAgICBjb25zdCBwb3BVcFdpbmRvdyA9IHRoaXMub3BlbldpbmRvdyhcImFib3V0OmJsYW5rXCIsIFwiX2JsYW5rXCIsIDEsIHRoaXMsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICBpZiAoIXBvcFVwV2luZG93KSB7XG4gICAgICAgIC8vIFdlIHBhc3MgcmVqZWN0IHRvIG9wZW5XaW5kb3csIHNvIHdlIGFyZSByZWplY3RpbmcgdGhlcmUuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYWNxdWlyZVRva2VuQXV0aG9yaXR5LnJlc29sdmVFbmRwb2ludHNBc3luYygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBPbiBmdWxsZmlsbG1lbnRcbiAgICAgICAgY29uc3QgcmVzcG9uc2VUeXBlID0gdGhpcy5nZXRUb2tlblR5cGUoYWNjb3VudCwgcmVxdWVzdC5zY29wZXMsIGZhbHNlKTtcbiAgICAgICAgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0ID0gbmV3IFNlcnZlclJlcXVlc3RQYXJhbWV0ZXJzKFxuICAgICAgICAgIGFjcXVpcmVUb2tlbkF1dGhvcml0eSxcbiAgICAgICAgICB0aGlzLmNsaWVudElkLFxuICAgICAgICAgIHJlcXVlc3Quc2NvcGVzLFxuICAgICAgICAgIHJlc3BvbnNlVHlwZSxcbiAgICAgICAgICB0aGlzLmdldFJlZGlyZWN0VXJpKCksXG4gICAgICAgICAgcmVxdWVzdC5zdGF0ZVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHBvcHVsYXRlIFF1ZXJ5UGFyYW1ldGVycyAoc2lkL2xvZ2luX2hpbnQvZG9tYWluX2hpbnQpIGFuZCBhbnkgb3RoZXIgZXh0cmFRdWVyeVBhcmFtZXRlcnMgc2V0IGJ5IHRoZSBkZXZlbG9wZXJcbiAgICAgICAgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0ID0gdGhpcy5wb3B1bGF0ZVF1ZXJ5UGFyYW1zKGFjY291bnQsIHJlcXVlc3QsIHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDYWNoZUVudHJpZXMoc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LCBhY2NvdW50KTtcblxuICAgICAgICAvLyBDb25zdHJ1Y3QgdGhlIHVybE5hdmlnYXRlXG4gICAgICAgIGxldCB1cmxOYXZpZ2F0ZSA9IHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5jcmVhdGVOYXZpZ2F0ZVVybChyZXF1ZXN0LnNjb3BlcykgKyBDb25zdGFudHMucmVzcG9uc2VfbW9kZV9mcmFnbWVudDtcblxuICAgICAgICB3aW5kb3cucmVuZXdTdGF0ZXMucHVzaChzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3Quc3RhdGUpO1xuICAgICAgICB3aW5kb3cucmVxdWVzdFR5cGUgPSBDb25zdGFudHMucmVuZXdUb2tlbjtcbiAgICAgICAgdGhpcy5yZWdpc3RlckNhbGxiYWNrKHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5zdGF0ZSwgc2NvcGUsIHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgICAgLy8gb3BlbiBwb3B1cCB3aW5kb3cgdG8gdXJsTmF2aWdhdGVcbiAgICAgICAgaWYgKHBvcFVwV2luZG93KSB7XG4gICAgICAgICAgcG9wVXBXaW5kb3cubG9jYXRpb24uaHJlZiA9IHVybE5hdmlnYXRlO1xuICAgICAgICB9XG5cbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgLy8gT24gcmVqZWN0aW9uXG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oQ2xpZW50QXV0aEVycm9yTWVzc2FnZS5lbmRwb2ludFJlc29sdXRpb25FcnJvci5jb2RlICsgXCI6XCIgKyBDbGllbnRBdXRoRXJyb3JNZXNzYWdlLmVuZHBvaW50UmVzb2x1dGlvbkVycm9yLmRlc2MpO1xuICAgICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKENvbnN0YW50cy5tc2FsRXJyb3IsIENsaWVudEF1dGhFcnJvck1lc3NhZ2UuZW5kcG9pbnRSZXNvbHV0aW9uRXJyb3IuY29kZSk7XG4gICAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLm1zYWxFcnJvckRlc2NyaXB0aW9uLCBDbGllbnRBdXRoRXJyb3JNZXNzYWdlLmVuZHBvaW50UmVzb2x1dGlvbkVycm9yLmRlc2MpO1xuXG4gICAgICAgIGlmIChyZWplY3QpIHtcbiAgICAgICAgICByZWplY3QoQ2xpZW50QXV0aEVycm9yLmNyZWF0ZUVuZHBvaW50UmVzb2x1dGlvbkVycm9yKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3BVcFdpbmRvdykge1xuICAgICAgICAgICAgcG9wVXBXaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuaW5nKFwiY291bGQgbm90IHJlc29sdmUgZW5kcG9pbnRzXCIpO1xuICAgICAgICByZWplY3QoQ2xpZW50QXV0aEVycm9yLmNyZWF0ZUVuZHBvaW50UmVzb2x1dGlvbkVycm9yKGVyci50b1N0cmluZygpKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqXG4gICAqIFVzZWQgdG8gc2VuZCB0aGUgdXNlciB0byB0aGUgcmVkaXJlY3RfdXJpIGFmdGVyIGF1dGhlbnRpY2F0aW9uIGlzIGNvbXBsZXRlLiBUaGUgdXNlcidzIGJlYXJlciB0b2tlbiBpcyBhdHRhY2hlZCB0byB0aGUgVVJJIGZyYWdtZW50IGFzIGFuIGlkX3Rva2VuL2FjY2Vzc190b2tlbiBmaWVsZC5cbiAgICogVGhpcyBmdW5jdGlvbiBhbHNvIGNsb3NlcyB0aGUgcG9wdXAgd2luZG93IGFmdGVyIHJlZGlyZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gdXJsTmF2aWdhdGVcbiAgICogQHBhcmFtIHRpdGxlXG4gICAqIEBwYXJhbSBpbnRlcnZhbFxuICAgKiBAcGFyYW0gaW5zdGFuY2VcbiAgICogQHBhcmFtIHJlc29sdmVcbiAgICogQHBhcmFtIHJlamVjdFxuICAgKiBAaWdub3JlXG4gICAqL1xuICBwcml2YXRlIG9wZW5XaW5kb3codXJsTmF2aWdhdGU6IHN0cmluZywgdGl0bGU6IHN0cmluZywgaW50ZXJ2YWw6IG51bWJlciwgaW5zdGFuY2U6IHRoaXMsIHJlc29sdmU/OiBGdW5jdGlvbiwgcmVqZWN0PzogRnVuY3Rpb24pOiBXaW5kb3cge1xuICAgIC8vIEdlbmVyYXRlIGEgcG9wdXAgd2luZG93XG4gICAgdmFyIHBvcHVwV2luZG93OiBXaW5kb3c7XG4gICAgdHJ5IHtcbiAgICAgIHBvcHVwV2luZG93ID0gdGhpcy5vcGVuUG9wdXAodXJsTmF2aWdhdGUsIHRpdGxlLCBDb25zdGFudHMucG9wVXBXaWR0aCwgQ29uc3RhbnRzLnBvcFVwSGVpZ2h0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpbnN0YW5jZS5sb2dpbkluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgIGluc3RhbmNlLmFjcXVpcmVUb2tlbkluUHJvZ3Jlc3MgPSBmYWxzZTtcblxuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhDbGllbnRBdXRoRXJyb3JNZXNzYWdlLnBvcFVwV2luZG93RXJyb3IuY29kZSArIFwiOlwiICsgQ2xpZW50QXV0aEVycm9yTWVzc2FnZS5wb3BVcFdpbmRvd0Vycm9yLmRlc2MpO1xuICAgICAgdGhpcy5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMubXNhbEVycm9yLCBDbGllbnRBdXRoRXJyb3JNZXNzYWdlLnBvcFVwV2luZG93RXJyb3IuY29kZSk7XG4gICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKENvbnN0YW50cy5tc2FsRXJyb3JEZXNjcmlwdGlvbiwgQ2xpZW50QXV0aEVycm9yTWVzc2FnZS5wb3BVcFdpbmRvd0Vycm9yLmRlc2MpO1xuICAgICAgaWYgKHJlamVjdCkge1xuICAgICAgICByZWplY3QoQ2xpZW50QXV0aEVycm9yLmNyZWF0ZVBvcHVwV2luZG93RXJyb3IoKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBQdXNoIHBvcHVwIHdpbmRvdyBoYW5kbGUgb250byBzdGFjayBmb3IgdHJhY2tpbmdcbiAgICB3aW5kb3cub3BlbmVkV2luZG93cy5wdXNoKHBvcHVwV2luZG93KTtcblxuICAgIGNvbnN0IHBvbGxUaW1lciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAvLyBJZiBwb3B1cCBjbG9zZWQgb3IgbG9naW4gaW4gcHJvZ3Jlc3MsIGNhbmNlbCBsb2dpblxuICAgICAgaWYgKHBvcHVwV2luZG93ICYmIHBvcHVwV2luZG93LmNsb3NlZCAmJiBpbnN0YW5jZS5sb2dpbkluUHJvZ3Jlc3MpIHtcbiAgICAgICAgaWYgKHJlamVjdCkge1xuICAgICAgICAgIHJlamVjdChDbGllbnRBdXRoRXJyb3IuY3JlYXRlVXNlckNhbmNlbGxlZEVycm9yKCkpO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHBvbGxUaW1lcik7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5mcmFtZXdvcmsuaXNBbmd1bGFyKSB7XG4gICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChcIm1zYWw6cG9wVXBDbG9zZWRcIiwgQ2xpZW50QXV0aEVycm9yTWVzc2FnZS51c2VyQ2FuY2VsbGVkRXJyb3IuY29kZSArIENvbnN0YW50cy5yZXNvdXJjZURlbGltaXRlciArIENsaWVudEF1dGhFcnJvck1lc3NhZ2UudXNlckNhbmNlbGxlZEVycm9yLmRlc2MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlLmxvZ2luSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICBpbnN0YW5jZS5hY3F1aXJlVG9rZW5JblByb2dyZXNzID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBvcFVwV2luZG93TG9jYXRpb24gPSBwb3B1cFdpbmRvdy5sb2NhdGlvbjtcblxuICAgICAgICAvLyBJZiB0aGUgcG9wdXAgaGFzaCBjaGFuZ2VzLCBjbG9zZSB0aGUgcG9wdXAgd2luZG93XG4gICAgICAgIGlmIChwb3BVcFdpbmRvd0xvY2F0aW9uLmhyZWYuaW5kZXhPZih0aGlzLmdldFJlZGlyZWN0VXJpKCkpICE9PSAtMSkge1xuICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHBvbGxUaW1lcik7XG4gICAgICAgICAgaW5zdGFuY2UubG9naW5JblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgICAgaW5zdGFuY2UuYWNxdWlyZVRva2VuSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJDbG9zaW5nIHBvcHVwIHdpbmRvd1wiKTtcbiAgICAgICAgICAvLyBUT0RPOiBDaGVjayBob3cgdGhpcyBjYW4gYmUgZXh0cmFjdGVkIGZvciBhbnkgZnJhbWV3b3JrIHNwZWNpZmljIGNvZGU/XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmZyYW1ld29yay5pc0FuZ3VsYXIpIHtcbiAgICAgICAgICAgICAgdGhpcy5icm9hZGNhc3QoXCJtc2FsOnBvcFVwSGFzaENoYW5nZWRcIiwgcG9wVXBXaW5kb3dMb2NhdGlvbi5oYXNoKTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aW5kb3cub3BlbmVkV2luZG93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW5lZFdpbmRvd3NbaV0uY2xvc2UoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBDcm9zcyBEb21haW4gdXJsIGNoZWNrIGVycm9yLlxuICAgICAgICAvLyBXaWxsIGJlIHRocm93biB1bnRpbCBBQUQgcmVkaXJlY3RzIHRoZSB1c2VyIGJhY2sgdG8gdGhlIGFwcFwicyByb290IHBhZ2Ugd2l0aCB0aGUgdG9rZW4uXG4gICAgICAgIC8vIE5vIG5lZWQgdG8gbG9nIG9yIHRocm93IHRoaXMgZXJyb3IgYXMgaXQgd2lsbCBjcmVhdGUgdW5uZWNlc3NhcnkgdHJhZmZpYy5cbiAgICAgIH1cbiAgICB9LFxuICAgIGludGVydmFsKTtcblxuICAgIHJldHVybiBwb3B1cFdpbmRvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqXG4gICAqIENvbmZpZ3VyZXMgcG9wdXAgd2luZG93IGZvciBsb2dpbi5cbiAgICpcbiAgICogQHBhcmFtIHVybE5hdmlnYXRlXG4gICAqIEBwYXJhbSB0aXRsZVxuICAgKiBAcGFyYW0gcG9wVXBXaWR0aFxuICAgKiBAcGFyYW0gcG9wVXBIZWlnaHRcbiAgICogQGlnbm9yZVxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBwcml2YXRlIG9wZW5Qb3B1cCh1cmxOYXZpZ2F0ZTogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBwb3BVcFdpZHRoOiBudW1iZXIsIHBvcFVwSGVpZ2h0OiBudW1iZXIpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBhZGRpbmcgd2luTGVmdCBhbmQgd2luVG9wIHRvIGFjY291bnQgZm9yIGR1YWwgbW9uaXRvclxuICAgICAgICogdXNpbmcgc2NyZWVuTGVmdCBhbmQgc2NyZWVuVG9wIGZvciBJRTggYW5kIGVhcmxpZXJcbiAgICAgICAqL1xuICAgICAgY29uc3Qgd2luTGVmdCA9IHdpbmRvdy5zY3JlZW5MZWZ0ID8gd2luZG93LnNjcmVlbkxlZnQgOiB3aW5kb3cuc2NyZWVuWDtcbiAgICAgIGNvbnN0IHdpblRvcCA9IHdpbmRvdy5zY3JlZW5Ub3AgPyB3aW5kb3cuc2NyZWVuVG9wIDogd2luZG93LnNjcmVlblk7XG4gICAgICAvKipcbiAgICAgICAqIHdpbmRvdy5pbm5lcldpZHRoIGRpc3BsYXlzIGJyb3dzZXIgd2luZG93XCJzIGhlaWdodCBhbmQgd2lkdGggZXhjbHVkaW5nIHRvb2xiYXJzXG4gICAgICAgKiB1c2luZyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggZm9yIElFOCBhbmQgZWFybGllclxuICAgICAgICovXG4gICAgICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG4gICAgICBjb25zdCBsZWZ0ID0gKCh3aWR0aCAvIDIpIC0gKHBvcFVwV2lkdGggLyAyKSkgKyB3aW5MZWZ0O1xuICAgICAgY29uc3QgdG9wID0gKChoZWlnaHQgLyAyKSAtIChwb3BVcEhlaWdodCAvIDIpKSArIHdpblRvcDtcblxuICAgICAgLy8gb3BlbiB0aGUgd2luZG93XG4gICAgICBjb25zdCBwb3B1cFdpbmRvdyA9IHdpbmRvdy5vcGVuKHVybE5hdmlnYXRlLCB0aXRsZSwgXCJ3aWR0aD1cIiArIHBvcFVwV2lkdGggKyBcIiwgaGVpZ2h0PVwiICsgcG9wVXBIZWlnaHQgKyBcIiwgdG9wPVwiICsgdG9wICsgXCIsIGxlZnQ9XCIgKyBsZWZ0KTtcbiAgICAgIGlmICghcG9wdXBXaW5kb3cpIHtcbiAgICAgICAgdGhyb3cgQ2xpZW50QXV0aEVycm9yLmNyZWF0ZVBvcHVwV2luZG93RXJyb3IoKTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3B1cFdpbmRvdy5mb2N1cykge1xuICAgICAgICBwb3B1cFdpbmRvdy5mb2N1cygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcG9wdXBXaW5kb3c7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJlcnJvciBvcGVuaW5nIHBvcHVwIFwiICsgZS5tZXNzYWdlKTtcbiAgICAgIHRoaXMubG9naW5JblByb2dyZXNzID0gZmFsc2U7XG4gICAgICB0aGlzLmFjcXVpcmVUb2tlbkluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgIHRocm93IENsaWVudEF1dGhFcnJvci5jcmVhdGVQb3B1cFdpbmRvd0Vycm9yKGUudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgLy8jZW5kcmVnaW9uXG5cbiAgLy8jcmVnaW9uIFNpbGVudCBGbG93XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIG9idGFpbiBhIHRva2VuIGJlZm9yZSBldmVyeSBjYWxsIHRvIHRoZSBBUEkgLyByZXNvdXJjZSBwcm92aWRlclxuICAgKlxuICAgKiBNU0FMIHJldHVybidzIGEgY2FjaGVkIHRva2VuIHdoZW4gYXZhaWxhYmxlXG4gICAqIE9yIGl0IHNlbmQncyBhIHJlcXVlc3QgdG8gdGhlIFNUUyB0byBvYnRhaW4gYSBuZXcgdG9rZW4gdXNpbmcgYSBoaWRkZW4gaWZyYW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge0BsaW5rIEF1dGhlbnRpY2F0aW9uUGFyYW1ldGVyc31cbiAgICpcbiAgICogVG8gcmVuZXcgaWRUb2tlbiwgcGxlYXNlIHBhc3MgY2xpZW50SWQgYXMgdGhlIG9ubHkgc2NvcGUgaW4gdGhlIEF1dGhlbnRpY2F0aW9uIFBhcmFtZXRlcnNcbiAgICogQHJldHVybnMge1Byb21pc2UuPEF1dGhSZXNwb25zZT59IC0gQSBQcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdoZW4gdGhpcyBmdW5jdGlvbiBoYXMgY29tcGxldGVkLCBvciByZWplY3RlZCBpZiBhbiBlcnJvciB3YXMgcmFpc2VkLiBSZXR1cm5zIHRoZSB7QGxpbmsgQXV0aFJlc3BvbnNlfSBvYmplY3RcbiAgICpcbiAgICovXG4gIEByZXNvbHZlVG9rZW5Pbmx5SWZPdXRPZklmcmFtZVxuICBhY3F1aXJlVG9rZW5TaWxlbnQocmVxdWVzdDogQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzKTogUHJvbWlzZTxBdXRoUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8QXV0aFJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIC8vIFZhbGlkYXRlIGFuZCBmaWx0ZXIgc2NvcGVzICh0aGUgdmFsaWRhdGUgZnVuY3Rpb24gd2lsbCB0aHJvdyBpZiB2YWxpZGF0aW9uIGZhaWxzKVxuICAgICAgdGhpcy52YWxpZGF0ZUlucHV0U2NvcGUocmVxdWVzdC5zY29wZXMsIHRydWUpO1xuXG4gICAgICBjb25zdCBzY29wZSA9IHJlcXVlc3Quc2NvcGVzLmpvaW4oXCIgXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIC8vIGlmIHRoZSBkZXZlbG9wZXIgcGFzc2VzIGFuIGFjY291bnQgZ2l2ZSBoaW0gdGhlIHByaW9yaXR5XG4gICAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0gcmVxdWVzdC5hY2NvdW50IHx8IHRoaXMuZ2V0QWNjb3VudCgpO1xuXG4gICAgICAvLyBleHRyYWN0IGlmIHRoZXJlIGlzIGFuIGFkYWxJZFRva2VuIHN0YXNoZWQgaW4gdGhlIGNhY2hlXG4gICAgICBjb25zdCBhZGFsSWRUb2tlbiA9IHRoaXMuY2FjaGVTdG9yYWdlLmdldEl0ZW0oQ29uc3RhbnRzLmFkYWxJZFRva2VuKTtcblxuICAgICAgLy9pZiB0aGVyZSBpcyBubyBhY2NvdW50IGxvZ2dlZCBpbiBhbmQgbm8gbG9naW5faGludC9zaWQgaXMgcGFzc2VkIGluIHRoZSByZXF1ZXN0XG4gICAgICBpZiAoIWFjY291bnQgJiYgISEocmVxdWVzdC5zaWQgIHx8IHJlcXVlc3QubG9naW5IaW50KSAmJiBVdGlscy5pc0VtcHR5KGFkYWxJZFRva2VuKSApIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIlVzZXIgbG9naW4gaXMgcmVxdWlyZWRcIik7XG4gICAgICAgIHJldHVybiByZWplY3QoQ2xpZW50QXV0aEVycm9yLmNyZWF0ZVVzZXJMb2dpblJlcXVpcmVkRXJyb3IoKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlVHlwZSA9IHRoaXMuZ2V0VG9rZW5UeXBlKGFjY291bnQsIHJlcXVlc3Quc2NvcGVzLCB0cnVlKTtcblxuICAgICAgbGV0IHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdCA9IG5ldyBTZXJ2ZXJSZXF1ZXN0UGFyYW1ldGVycyhcbiAgICAgICAgQXV0aG9yaXR5RmFjdG9yeS5DcmVhdGVJbnN0YW5jZShyZXF1ZXN0LmF1dGhvcml0eSwgdGhpcy5jb25maWcuYXV0aC52YWxpZGF0ZUF1dGhvcml0eSksXG4gICAgICAgIHRoaXMuY2xpZW50SWQsXG4gICAgICAgIHJlcXVlc3Quc2NvcGVzLFxuICAgICAgICByZXNwb25zZVR5cGUsXG4gICAgICAgIHRoaXMuZ2V0UmVkaXJlY3RVcmkoKSxcbiAgICAgICAgcmVxdWVzdC5zdGF0ZVxuICAgICAgKTtcblxuICAgICAgLy8gcG9wdWxhdGUgUXVlcnlQYXJhbWV0ZXJzIChzaWQvbG9naW5faGludC9kb21haW5faGludCkgYW5kIGFueSBvdGhlciBleHRyYVF1ZXJ5UGFyYW1ldGVycyBzZXQgYnkgdGhlIGRldmVsb3BlclxuICAgICAgaWYgKFV0aWxzLmlzU1NPUGFyYW0ocmVxdWVzdCkgfHwgYWNjb3VudCkge1xuICAgICAgICBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QgPSB0aGlzLnBvcHVsYXRlUXVlcnlQYXJhbXMoYWNjb3VudCwgcmVxdWVzdCwgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0KTtcbiAgICAgIH1cbiAgICAgIC8vaWYgdXNlciBkaWRuJ3QgcGFzcyBsb2dpbl9oaW50L3NpZCBhbmQgYWRhbCdzIGlkdG9rZW4gaXMgcHJlc2VudCwgZXh0cmFjdCB0aGUgbG9naW5faGludCBmcm9tIHRoZSBhZGFsSWRUb2tlblxuICAgICAgZWxzZSBpZiAoIWFjY291bnQgJiYgIVV0aWxzLmlzRW1wdHkoYWRhbElkVG9rZW4pKSB7XG4gICAgICAgIC8vIGlmIGFkYWxJZFRva2VuIGV4aXN0cywgZXh0cmFjdCB0aGUgU1NPIGluZm8gZnJvbSB0aGUgc2FtZVxuICAgICAgICBjb25zdCBhZGFsSWRUb2tlbk9iamVjdCA9IFV0aWxzLmV4dHJhY3RJZFRva2VuKGFkYWxJZFRva2VuKTtcbiAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShcIkFEQUwncyBpZFRva2VuIGV4aXN0cy4gRXh0cmFjdGluZyBsb2dpbiBpbmZvcm1hdGlvbiBmcm9tIEFEQUwncyBpZFRva2VuIFwiKTtcbiAgICAgICAgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0ID0gdGhpcy5wb3B1bGF0ZVF1ZXJ5UGFyYW1zKGFjY291bnQsIG51bGwsIHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdCwgYWRhbElkVG9rZW5PYmplY3QpO1xuICAgICAgfVxuICAgICAgbGV0IHVzZXJDb250YWluZWRDbGFpbXMgPSByZXF1ZXN0LmNsYWltc1JlcXVlc3QgfHwgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LmNsYWltc1ZhbHVlO1xuXG4gICAgICBsZXQgYXV0aEVycjogQXV0aEVycm9yO1xuICAgICAgbGV0IGNhY2hlUmVzdWx0UmVzcG9uc2U7XG5cbiAgICAgIGlmICghdXNlckNvbnRhaW5lZENsYWltcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNhY2hlUmVzdWx0UmVzcG9uc2UgPSB0aGlzLmdldENhY2hlZFRva2VuKHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdCwgYWNjb3VudCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBhdXRoRXJyID0gZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZXNvbHZlL3JlamVjdCBiYXNlZCBvbiBjYWNoZVJlc3VsdFxuICAgICAgaWYgKGNhY2hlUmVzdWx0UmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIlRva2VuIGlzIGFscmVhZHkgaW4gY2FjaGUgZm9yIHNjb3BlOlwiICsgc2NvcGUpO1xuICAgICAgICByZXNvbHZlKGNhY2hlUmVzdWx0UmVzcG9uc2UpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGF1dGhFcnIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mb1BpaShhdXRoRXJyLmVycm9yQ29kZSArIFwiOlwiICsgYXV0aEVyci5lcnJvck1lc3NhZ2UpO1xuICAgICAgICByZWplY3QoYXV0aEVycik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgLy8gZWxzZSBwcm9jZWVkIHdpdGggbG9naW5cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAodXNlckNvbnRhaW5lZENsYWltcykge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoXCJTa2lwcGVkIGNhY2hlIGxvb2t1cCBzaW5jZSBjbGFpbXMgd2VyZSBnaXZlbi5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShcIlRva2VuIGlzIG5vdCBpbiBjYWNoZSBmb3Igc2NvcGU6XCIgKyBzY29wZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2FjaGUgcmVzdWx0IGNhbiByZXR1cm4gbnVsbCBpZiBjYWNoZSBpcyBlbXB0eS4gSW4gdGhhdCBjYXNlLCBzZXQgYXV0aG9yaXR5IHRvIGRlZmF1bHQgdmFsdWUgaWYgbm8gYXV0aG9yaXR5IGlzIHBhc3NlZCB0byB0aGUgYXBpLlxuICAgICAgICBpZiAoIXNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5hdXRob3JpdHlJbnN0YW5jZSkge1xuICAgICAgICAgICAgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LmF1dGhvcml0eUluc3RhbmNlID0gcmVxdWVzdC5hdXRob3JpdHkgPyBBdXRob3JpdHlGYWN0b3J5LkNyZWF0ZUluc3RhbmNlKHJlcXVlc3QuYXV0aG9yaXR5LCB0aGlzLmNvbmZpZy5hdXRoLnZhbGlkYXRlQXV0aG9yaXR5KSA6IHRoaXMuYXV0aG9yaXR5SW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FjaGUgbWlzc1xuICAgICAgICByZXR1cm4gc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LmF1dGhvcml0eUluc3RhbmNlLnJlc29sdmVFbmRwb2ludHNBc3luYygpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAvLyByZWZyZXNoIGF0dGVtcHQgd2l0aCBpZnJhbWVcbiAgICAgICAgICAvLyBBbHJlYWR5IHJlbmV3aW5nIGZvciB0aGlzIHNjb3BlLCBjYWxsYmFjayB3aGVuIHdlIGdldCB0aGUgdG9rZW4uXG4gICAgICAgICAgaWYgKHdpbmRvdy5hY3RpdmVSZW5ld2Fsc1tzY29wZV0pIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoXCJSZW5ldyB0b2tlbiBmb3Igc2NvcGU6IFwiICsgc2NvcGUgKyBcIiBpcyBpbiBwcm9ncmVzcy4gUmVnaXN0ZXJpbmcgY2FsbGJhY2tcIik7XG4gICAgICAgICAgICAvLyBBY3RpdmUgcmVuZXdhbHMgY29udGFpbnMgdGhlIHN0YXRlIGZvciBlYWNoIHJlbmV3YWwuXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ2FsbGJhY2sod2luZG93LmFjdGl2ZVJlbmV3YWxzW3Njb3BlXSwgc2NvcGUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc2NvcGVzICYmIHJlcXVlc3Quc2NvcGVzLmluZGV4T2YodGhpcy5jbGllbnRJZCkgPiAtMSAmJiByZXF1ZXN0LnNjb3Blcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgLy8gQXBwIHVzZXMgaWRUb2tlbiB0byBzZW5kIHRvIGFwaSBlbmRwb2ludHNcbiAgICAgICAgICAgICAgLy8gRGVmYXVsdCBzY29wZSBpcyB0cmFja2VkIGFzIGNsaWVudElkIHRvIHN0b3JlIHRoaXMgdG9rZW5cbiAgICAgICAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShcInJlbmV3aW5nIGlkVG9rZW5cIik7XG4gICAgICAgICAgICAgIHRoaXMucmVuZXdJZFRva2VuKHJlcXVlc3Quc2NvcGVzLCByZXNvbHZlLCByZWplY3QsIGFjY291bnQsIHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyByZW5ldyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShcInJlbmV3aW5nIGFjY2Vzc3Rva2VuXCIpO1xuICAgICAgICAgICAgICB0aGlzLnJlbmV3VG9rZW4ocmVxdWVzdC5zY29wZXMsIHJlc29sdmUsIHJlamVjdCwgYWNjb3VudCwgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuaW5nKFwiY291bGQgbm90IHJlc29sdmUgZW5kcG9pbnRzXCIpO1xuICAgICAgICAgIHJlamVjdChDbGllbnRBdXRoRXJyb3IuY3JlYXRlRW5kcG9pbnRSZXNvbHV0aW9uRXJyb3IoZXJyLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKiBSZXR1cm5zIHdoZXRoZXIgY3VycmVudCB3aW5kb3cgaXMgaW4gaWZyYW0gZm9yIHRva2VuIHJlbmV3YWxcbiAgICogQGlnbm9yZVxuICAgKi9cbiAgcHVibGljIGlzSW5JZnJhbWUoKSB7XG4gICAgICByZXR1cm4gd2luZG93LnBhcmVudCAhPT0gd2luZG93O1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogUmV0dXJucyB3aGV0aGVyIHBhcmVudCB3aW5kb3cgZXhpc3RzIGFuZCBoYXMgbXNhbFxuICAgKi9cbiAgcHJpdmF0ZSBwYXJlbnRJc01zYWwoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5wYXJlbnQgIT09IHdpbmRvdyAmJiB3aW5kb3cucGFyZW50Lm1zYWw7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcHJpdmF0ZSBpc0ludGVyYWN0aW9uUmVxdWlyZWQoZXJyb3JTdHJpbmc6IHN0cmluZykgOiBib29sZWFuIHtcbiAgICBpZiAoZXJyb3JTdHJpbmcuaW5kZXhPZihcImludGVyYWN0aW9uX3JlcXVpcmVkXCIpICE9PSAtMSB8fFxuICAgIGVycm9yU3RyaW5nLmluZGV4T2YoXCJjb25zZW50X3JlcXVpcmVkXCIpICE9PSAtMSB8fFxuICAgIGVycm9yU3RyaW5nLmluZGV4T2YoXCJsb2dpbl9yZXF1aXJlZFwiKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKiBDYWxsaW5nIF9sb2FkRnJhbWUgYnV0IHdpdGggYSB0aW1lb3V0IHRvIHNpZ25hbCBmYWlsdXJlIGluIGxvYWRmcmFtZVN0YXR1cy4gQ2FsbGJhY2tzIGFyZSBsZWZ0LlxuICAgKiByZWdpc3RlcmVkIHdoZW4gbmV0d29yayBlcnJvcnMgb2NjdXIgYW5kIHN1YnNlcXVlbnQgdG9rZW4gcmVxdWVzdHMgZm9yIHNhbWUgcmVzb3VyY2UgYXJlIHJlZ2lzdGVyZWQgdG8gdGhlIHBlbmRpbmcgcmVxdWVzdC5cbiAgICogQGlnbm9yZVxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkSWZyYW1lVGltZW91dCh1cmxOYXZpZ2F0ZTogc3RyaW5nLCBmcmFtZU5hbWU6IHN0cmluZywgc2NvcGU6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vc2V0IGlmcmFtZSBzZXNzaW9uIHRvIHBlbmRpbmdcbiAgICBjb25zdCBleHBlY3RlZFN0YXRlID0gd2luZG93LmFjdGl2ZVJlbmV3YWxzW3Njb3BlXTtcbiAgICB0aGlzLmxvZ2dlci52ZXJib3NlKFwiU2V0IGxvYWRpbmcgc3RhdGUgdG8gcGVuZGluZyBmb3I6IFwiICsgc2NvcGUgKyBcIjpcIiArIGV4cGVjdGVkU3RhdGUpO1xuICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLnJlbmV3U3RhdHVzICsgZXhwZWN0ZWRTdGF0ZSwgQ29uc3RhbnRzLnRva2VuUmVuZXdTdGF0dXNJblByb2dyZXNzKTtcbiAgICB0aGlzLmxvYWRGcmFtZSh1cmxOYXZpZ2F0ZSwgZnJhbWVOYW1lKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmNhY2hlU3RvcmFnZS5nZXRJdGVtKENvbnN0YW50cy5yZW5ld1N0YXR1cyArIGV4cGVjdGVkU3RhdGUpID09PSBDb25zdGFudHMudG9rZW5SZW5ld1N0YXR1c0luUHJvZ3Jlc3MpIHtcbiAgICAgICAgLy8gZmFpbCB0aGUgaWZyYW1lIHNlc3Npb24gaWYgaXRcInMgaW4gcGVuZGluZyBzdGF0ZVxuICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKFwiTG9hZGluZyBmcmFtZSBoYXMgdGltZWQgb3V0IGFmdGVyOiBcIiArICh0aGlzLmNvbmZpZy5zeXN0ZW0ubG9hZEZyYW1lVGltZW91dCAvIDEwMDApICsgXCIgc2Vjb25kcyBmb3Igc2NvcGUgXCIgKyBzY29wZSArIFwiOlwiICsgZXhwZWN0ZWRTdGF0ZSk7XG4gICAgICAgIC8vIEVycm9yIGFmdGVyIHRpbWVvdXRcbiAgICAgICAgaWYgKGV4cGVjdGVkU3RhdGUgJiYgd2luZG93LmNhbGxiYWNrTWFwcGVkVG9SZW5ld1N0YXRlc1tleHBlY3RlZFN0YXRlXSkge1xuICAgICAgICAgIHdpbmRvdy5jYWxsYmFja01hcHBlZFRvUmVuZXdTdGF0ZXNbZXhwZWN0ZWRTdGF0ZV0obnVsbCwgQ2xpZW50QXV0aEVycm9yLmNyZWF0ZVRva2VuUmVuZXdhbFRpbWVvdXRFcnJvcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLnJlbmV3U3RhdHVzICsgZXhwZWN0ZWRTdGF0ZSwgQ29uc3RhbnRzLnRva2VuUmVuZXdTdGF0dXNDYW5jZWxsZWQpO1xuICAgICAgfVxuICAgIH0sIHRoaXMuY29uZmlnLnN5c3RlbS5sb2FkRnJhbWVUaW1lb3V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIExvYWRzIGlmcmFtZSB3aXRoIGF1dGhvcml6YXRpb24gZW5kcG9pbnQgVVJMXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIHByaXZhdGUgbG9hZEZyYW1lKHVybE5hdmlnYXRlOiBzdHJpbmcsIGZyYW1lTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gVGhpcyB0cmljayBvdmVyY29tZXMgaWZyYW1lIG5hdmlnYXRpb24gaW4gSUVcbiAgICAvLyBJRSBkb2VzIG5vdCBsb2FkIHRoZSBwYWdlIGNvbnNpc3RlbnRseSBpbiBpZnJhbWVcbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiTG9hZEZyYW1lOiBcIiArIGZyYW1lTmFtZSk7XG4gICAgY29uc3QgZnJhbWVDaGVjayA9IGZyYW1lTmFtZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgZnJhbWVIYW5kbGUgPSB0aGlzLmFkZEhpZGRlbklGcmFtZShmcmFtZUNoZWNrKTtcbiAgICAgIGlmIChmcmFtZUhhbmRsZS5zcmMgPT09IFwiXCIgfHwgZnJhbWVIYW5kbGUuc3JjID09PSBcImFib3V0OmJsYW5rXCIpIHtcbiAgICAgICAgZnJhbWVIYW5kbGUuc3JjID0gdXJsTmF2aWdhdGU7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm9QaWkoXCJGcmFtZSBOYW1lIDogXCIgKyBmcmFtZU5hbWUgKyBcIiBOYXZpZ2F0ZWQgdG86IFwiICsgdXJsTmF2aWdhdGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdGhpcy5jb25maWcuc3lzdGVtLm5hdmlnYXRlRnJhbWVXYWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIEFkZHMgdGhlIGhpZGRlbiBpZnJhbWUgZm9yIHNpbGVudCB0b2tlbiByZW5ld2FsLlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBwcml2YXRlIGFkZEhpZGRlbklGcmFtZShpZnJhbWVJZDogc3RyaW5nKTogSFRNTElGcmFtZUVsZW1lbnQge1xuICAgIGlmICh0eXBlb2YgaWZyYW1lSWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8oXCJBZGQgbXNhbCBmcmFtZSB0byBkb2N1bWVudDpcIiArIGlmcmFtZUlkKTtcbiAgICBsZXQgYWRhbEZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWZyYW1lSWQpIGFzIEhUTUxJRnJhbWVFbGVtZW50O1xuICAgIGlmICghYWRhbEZyYW1lKSB7XG4gICAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAmJlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiZcbiAgICAgICAgKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFIDUuMFwiKSA9PT0gLTEpKSB7XG4gICAgICAgIGNvbnN0IGlmciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgICAgIGlmci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpZnJhbWVJZCk7XG4gICAgICAgIGlmci5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgaWZyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICBpZnIuc3R5bGUud2lkdGggPSBpZnIuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XG4gICAgICAgIGlmci5zdHlsZS5ib3JkZXIgPSBcIjBcIjtcbiAgICAgICAgYWRhbEZyYW1lID0gKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXS5hcHBlbmRDaGlsZChpZnIpIGFzIEhUTUxJRnJhbWVFbGVtZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuYm9keSAmJiBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCkge1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIFwiPGlmcmFtZSBuYW1lPSdcIiArIGlmcmFtZUlkICsgXCInIGlkPSdcIiArIGlmcmFtZUlkICsgXCInIHN0eWxlPSdkaXNwbGF5Om5vbmUnPjwvaWZyYW1lPlwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpbmRvdy5mcmFtZXMgJiYgd2luZG93LmZyYW1lc1tpZnJhbWVJZF0pIHtcbiAgICAgICAgYWRhbEZyYW1lID0gd2luZG93LmZyYW1lc1tpZnJhbWVJZF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkYWxGcmFtZTtcbiAgfVxuXG4gIC8vI2VuZHJlZ2lvblxuXG4gIC8vI3JlZ2lvbiBHZW5lcmFsIEhlbHBlcnNcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKlxuICAgKiBBZGRzIGxvZ2luX2hpbnQgdG8gYXV0aG9yaXphdGlvbiBVUkwgd2hpY2ggaXMgdXNlZCB0byBwcmUtZmlsbCB0aGUgdXNlcm5hbWUgZmllbGQgb2Ygc2lnbiBpbiBwYWdlIGZvciB0aGUgdXNlciBpZiBrbm93biBhaGVhZCBvZiB0aW1lXG4gICAqIGRvbWFpbl9oaW50IGNhbiBiZSBvbmUgb2YgdXNlcnMvb3JnYW5pemF0aW9ucyB3aGljaCB3aGVuIGFkZGVkIHNraXBzIHRoZSBlbWFpbCBiYXNlZCBkaXNjb3ZlcnkgcHJvY2VzcyBvZiB0aGUgdXNlclxuICAgKiBkb21haW5fcmVxIHV0aWQgcmVjZWl2ZWQgYXMgcGFydCBvZiB0aGUgY2xpZW50SW5mb1xuICAgKiBsb2dpbl9yZXEgdWlkIHJlY2VpdmVkIGFzIHBhcnQgb2YgY2xpZW50SW5mb1xuICAgKiBBbHNvIGRvZXMgYSBzYW5pdHkgY2hlY2sgZm9yIGV4dHJhUXVlcnlQYXJhbWV0ZXJzIHBhc3NlZCBieSB0aGUgdXNlciB0byBlbnN1cmUgbm8gcmVwZWF0IHF1ZXJ5UGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge0BsaW5rIEFjY291bnR9IGFjY291bnQgLSBBY2NvdW50IGZvciB3aGljaCB0aGUgdG9rZW4gaXMgcmVxdWVzdGVkXG4gICAqIEBwYXJhbSBxdWVyeXBhcmFtc1xuICAgKiBAcGFyYW0ge0BsaW5rIFNlcnZlclJlcXVlc3RQYXJhbWV0ZXJzfVxuICAgKiBAaWdub3JlXG4gICAqL1xuICBwcml2YXRlIGFkZEhpbnRQYXJhbWV0ZXJzKGFjY291bnRPYmo6IEFjY291bnQsIHFQYXJhbXM6IFFQRGljdCwgc2VydmVyUmVxUGFyYW1zOiBTZXJ2ZXJSZXF1ZXN0UGFyYW1ldGVycyk6IFFQRGljdCB7XG5cbiAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0gYWNjb3VudE9iaiB8fCB0aGlzLmdldEFjY291bnQoKTtcblxuICAgIC8vIFRoaXMgaXMgYSBmaW5hbCBjaGVjayBmb3IgYWxsIHF1ZXJ5UGFyYW1zIGFkZGVkIHNvIGZhcjsgcHJlZmVyZW5jZSBvcmRlcjogc2lkID4gbG9naW5faGludFxuICAgIC8vIHNpZCBjYW5ub3QgYmUgcGFzc2VkIGFsb25nIHdpdGggbG9naW5faGludCwgaGVuY2Ugd2UgY2hlY2sgYm90aCBhcmUgbm90IHBvcHVsYXRlZCB5ZXQgaW4gcXVlcnlQYXJhbWV0ZXJzIHNvIGZhclxuICAgIGlmIChhY2NvdW50KSB7XG4gICAgICAvLyBzaWRcbiAgICAgIGlmIChhY2NvdW50LnNpZCAmJiBzZXJ2ZXJSZXFQYXJhbXMucHJvbXB0VmFsdWUgPT09IFByb21wdFN0YXRlLk5PTkUpIHtcbiAgICAgICAgaWYgKCFxUGFyYW1zW1NTT1R5cGVzLlNJRF0gICYmICFxUGFyYW1zW1NTT1R5cGVzLkxPR0lOX0hJTlRdKSB7XG4gICAgICAgICAgcVBhcmFtcyA9IFV0aWxzLmFkZFNTT1BhcmFtZXRlcihTU09UeXBlcy5TSUQsIGFjY291bnQuc2lkLCBxUGFyYW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gbG9naW5faGludFxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGxvZ2luX2hpbnQgaXMgYWNjb3VudC51c2VyTmFtZVxuICAgICAgICBpZiAoIXFQYXJhbXNbU1NPVHlwZXMuTE9HSU5fSElOVF0gICYmIGFjY291bnQudXNlck5hbWUgJiYgIVV0aWxzLmlzRW1wdHkoYWNjb3VudC51c2VyTmFtZSkpIHtcbiAgICAgICAgICBxUGFyYW1zID0gVXRpbHMuYWRkU1NPUGFyYW1ldGVyKFNTT1R5cGVzLkxPR0lOX0hJTlQsIGFjY291bnQudXNlck5hbWUsIHFQYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghcVBhcmFtc1tTU09UeXBlcy5ET01BSU5fUkVRXSAmJiAhcVBhcmFtc1tTU09UeXBlcy5MT0dJTl9SRVFdICkge1xuICAgICAgICBxUGFyYW1zID0gVXRpbHMuYWRkU1NPUGFyYW1ldGVyKFNTT1R5cGVzLkhPTUVBQ0NPVU5UX0lELCBhY2NvdW50LmhvbWVBY2NvdW50SWRlbnRpZmllciwgcVBhcmFtcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHFQYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKiBVc2VkIHRvIHJlZGlyZWN0IHRoZSBicm93c2VyIHRvIHRoZSBTVFMgYXV0aG9yaXphdGlvbiBlbmRwb2ludFxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsTmF2aWdhdGUgLSBVUkwgb2YgdGhlIGF1dGhvcml6YXRpb24gZW5kcG9pbnRcbiAgICovXG4gIHByaXZhdGUgcHJvbXB0VXNlcih1cmxOYXZpZ2F0ZTogc3RyaW5nKSB7XG4gICAgLy8gTmF2aWdhdGUgaWYgdmFsaWQgVVJMXG4gICAgaWYgKHVybE5hdmlnYXRlICYmICFVdGlscy5pc0VtcHR5KHVybE5hdmlnYXRlKSkge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mb1BpaShcIk5hdmlnYXRlIHRvOlwiICsgdXJsTmF2aWdhdGUpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UodXJsTmF2aWdhdGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJOYXZpZ2F0ZSB1cmwgaXMgZW1wdHlcIik7XG4gICAgICB0aHJvdyBBdXRoRXJyb3IuY3JlYXRlVW5leHBlY3RlZEVycm9yKFwiTmF2aWdhdGUgdXJsIGlzIGVtcHR5XCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIFVzZWQgdG8gYWRkIHRoZSBkZXZlbG9wZXIgcmVxdWVzdGVkIGNhbGxiYWNrIHRvIHRoZSBhcnJheSBvZiBjYWxsYmFja3MgZm9yIHRoZSBzcGVjaWZpZWQgc2NvcGVzLiBUaGUgdXBkYXRlZCBhcnJheSBpcyBzdG9yZWQgb24gdGhlIHdpbmRvdyBvYmplY3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV4cGVjdGVkU3RhdGUgLSBVbmlxdWUgc3RhdGUgaWRlbnRpZmllciAoZ3VpZCkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzY29wZSAtIERldmVsb3BlciByZXF1ZXN0ZWQgcGVybWlzc2lvbnMuIE5vdCBhbGwgc2NvcGVzIGFyZSBndWFyYW50ZWVkIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBhY2Nlc3MgdG9rZW4gcmV0dXJuZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgLSBUaGUgcmVzb2x2ZSBmdW5jdGlvbiBvZiB0aGUgcHJvbWlzZSBvYmplY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCAtIFRoZSByZWplY3QgZnVuY3Rpb24gb2YgdGhlIHByb21pc2Ugb2JqZWN0LlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBwcml2YXRlIHJlZ2lzdGVyQ2FsbGJhY2soZXhwZWN0ZWRTdGF0ZTogc3RyaW5nLCBzY29wZTogc3RyaW5nLCByZXNvbHZlOiBGdW5jdGlvbiwgcmVqZWN0OiBGdW5jdGlvbik6IHZvaWQge1xuICAgIC8vIHRyYWNrIGFjdGl2ZSByZW5ld2Fsc1xuICAgIHdpbmRvdy5hY3RpdmVSZW5ld2Fsc1tzY29wZV0gPSBleHBlY3RlZFN0YXRlO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBjYWxsYmFja3MgbWFwcGVkIGFycmF5XG4gICAgaWYgKCF3aW5kb3cucHJvbWlzZU1hcHBlZFRvUmVuZXdTdGF0ZXNbZXhwZWN0ZWRTdGF0ZV0pIHtcbiAgICAgICAgd2luZG93LnByb21pc2VNYXBwZWRUb1JlbmV3U3RhdGVzW2V4cGVjdGVkU3RhdGVdID0gW107XG4gICAgfVxuICAgIC8vIGluZGV4aW5nIG9uIHRoZSBjdXJyZW50IHN0YXRlLCBwdXNoIHRoZSBjYWxsYmFjayBwYXJhbXMgdG8gY2FsbGJhY2tzIG1hcHBlZFxuICAgIHdpbmRvdy5wcm9taXNlTWFwcGVkVG9SZW5ld1N0YXRlc1tleHBlY3RlZFN0YXRlXS5wdXNoKHsgcmVzb2x2ZTogcmVzb2x2ZSwgcmVqZWN0OiByZWplY3QgfSk7XG5cbiAgICAvLyBTdG9yZSB0aGUgc2VydmVyIGVzcG9uc2UgaW4gdGhlIGN1cnJlbnQgd2luZG93Pz9cbiAgICBpZiAoIXdpbmRvdy5jYWxsYmFja01hcHBlZFRvUmVuZXdTdGF0ZXNbZXhwZWN0ZWRTdGF0ZV0pIHtcbiAgICAgIHdpbmRvdy5jYWxsYmFja01hcHBlZFRvUmVuZXdTdGF0ZXNbZXhwZWN0ZWRTdGF0ZV0gPVxuICAgICAgKHJlc3BvbnNlOiBBdXRoUmVzcG9uc2UsIGVycm9yOiBBdXRoRXJyb3IpID0+IHtcbiAgICAgICAgLy8gcmVzZXQgYWN0aXZlIHJlbmV3YWxzXG4gICAgICAgIHdpbmRvdy5hY3RpdmVSZW5ld2Fsc1tzY29wZV0gPSBudWxsO1xuXG4gICAgICAgIC8vIGZvciBhbGwgcHJvbWlzZU1hcHBlZHRvUmVuZXdTdGF0ZXMgZm9yIGEgZ2l2ZW4gJ3N0YXRlJyAtIGNhbGwgdGhlIHJlamVjdC9yZXNvbHZlIHdpdGggZXJyb3IvdG9rZW4gcmVzcGVjdGl2ZWx5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2luZG93LnByb21pc2VNYXBwZWRUb1JlbmV3U3RhdGVzW2V4cGVjdGVkU3RhdGVdLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5wcm9taXNlTWFwcGVkVG9SZW5ld1N0YXRlc1tleHBlY3RlZFN0YXRlXVtpXS5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5wcm9taXNlTWFwcGVkVG9SZW5ld1N0YXRlc1tleHBlY3RlZFN0YXRlXVtpXS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IEF1dGhFcnJvci5jcmVhdGVVbmV4cGVjdGVkRXJyb3IoXCJFcnJvciBhbmQgcmVzcG9uc2UgYXJlIGJvdGggbnVsbFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuaW5nKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc2V0XG4gICAgICAgIHdpbmRvdy5wcm9taXNlTWFwcGVkVG9SZW5ld1N0YXRlc1tleHBlY3RlZFN0YXRlXSA9IG51bGw7XG4gICAgICAgIHdpbmRvdy5jYWxsYmFja01hcHBlZFRvUmVuZXdTdGF0ZXNbZXhwZWN0ZWRTdGF0ZV0gPSBudWxsO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvLyNlbmRyZWdpb25cblxuICAvLyNyZWdpb24gTG9nb3V0XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gbG9nIG91dCB0aGUgY3VycmVudCB1c2VyLCBhbmQgcmVkaXJlY3QgdGhlIHVzZXIgdG8gdGhlIHBvc3RMb2dvdXRSZWRpcmVjdFVyaS5cbiAgICogRGVmYXVsdHMgYmVoYXZpb3VyIGlzIHRvIHJlZGlyZWN0IHRoZSB1c2VyIHRvIGB3aW5kb3cubG9jYXRpb24uaHJlZmAuXG4gICAqL1xuICBsb2dvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckNhY2hlKCk7XG4gICAgdGhpcy5hY2NvdW50ID0gbnVsbDtcbiAgICBsZXQgbG9nb3V0ID0gXCJcIjtcbiAgICBpZiAodGhpcy5nZXRQb3N0TG9nb3V0UmVkaXJlY3RVcmkoKSkge1xuICAgICAgbG9nb3V0ID0gXCJwb3N0X2xvZ291dF9yZWRpcmVjdF91cmk9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5nZXRQb3N0TG9nb3V0UmVkaXJlY3RVcmkoKSk7XG4gICAgfVxuICAgIGNvbnN0IHVybE5hdmlnYXRlID0gdGhpcy5hdXRob3JpdHkgKyBcIm9hdXRoMi92Mi4wL2xvZ291dD9cIiArIGxvZ291dDtcbiAgICB0aGlzLnByb21wdFVzZXIodXJsTmF2aWdhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogQ2xlYXIgYWxsIGFjY2VzcyB0b2tlbnMgaW4gdGhlIGNhY2hlLlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBwcm90ZWN0ZWQgY2xlYXJDYWNoZSgpOiB2b2lkIHtcbiAgICB3aW5kb3cucmVuZXdTdGF0ZXMgPSBbXTtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkl0ZW1zID0gdGhpcy5jYWNoZVN0b3JhZ2UuZ2V0QWxsQWNjZXNzVG9rZW5zKENvbnN0YW50cy5jbGllbnRJZCwgQ29uc3RhbnRzLmhvbWVBY2NvdW50SWRlbnRpZmllcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2Nlc3NUb2tlbkl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmNhY2hlU3RvcmFnZS5yZW1vdmVJdGVtKEpTT04uc3RyaW5naWZ5KGFjY2Vzc1Rva2VuSXRlbXNbaV0ua2V5KSk7XG4gICAgfVxuICAgIHRoaXMuY2FjaGVTdG9yYWdlLnJlc2V0Q2FjaGVJdGVtcygpO1xuICAgIHRoaXMuY2FjaGVTdG9yYWdlLmNsZWFyQ29va2llKCk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKiBDbGVhciBhIGdpdmVuIGFjY2VzcyB0b2tlbiBmcm9tIHRoZSBjYWNoZS5cbiAgICpcbiAgICogQHBhcmFtIGFjY2Vzc1Rva2VuXG4gICAqL1xuICBwcm90ZWN0ZWQgY2xlYXJDYWNoZUZvclNjb3BlKGFjY2Vzc1Rva2VuOiBzdHJpbmcpIHtcbiAgICBjb25zdCBhY2Nlc3NUb2tlbkl0ZW1zID0gdGhpcy5jYWNoZVN0b3JhZ2UuZ2V0QWxsQWNjZXNzVG9rZW5zKENvbnN0YW50cy5jbGllbnRJZCwgQ29uc3RhbnRzLmhvbWVBY2NvdW50SWRlbnRpZmllcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2Nlc3NUb2tlbkl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0b2tlbiA9IGFjY2Vzc1Rva2VuSXRlbXNbaV07XG4gICAgICAgIGlmICh0b2tlbi52YWx1ZS5hY2Nlc3NUb2tlbiA9PT0gYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnJlbW92ZUl0ZW0oSlNPTi5zdHJpbmdpZnkodG9rZW4ua2V5KSk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyNlbmRyZWdpb25cblxuICAvLyNyZWdpb24gUmVzcG9uc2VcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKiBVc2VkIHRvIGNhbGwgdGhlIGNvbnN0cnVjdG9yIGNhbGxiYWNrIHdpdGggdGhlIHRva2VuL2Vycm9yXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbaGFzaD13aW5kb3cubG9jYXRpb24uaGFzaF0gLSBIYXNoIGZyYWdtZW50IG9mIFVybC5cbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc0NhbGxCYWNrKGhhc2g6IHN0cmluZywgc3RhdGVJbmZvOiBSZXNwb25zZVN0YXRlSW5mbywgcGFyZW50Q2FsbGJhY2s/OiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLmluZm8oXCJQcm9jZXNzaW5nIHRoZSBjYWxsYmFjayBmcm9tIHJlZGlyZWN0IHJlc3BvbnNlXCIpO1xuICAgIC8vIGdldCB0aGUgc3RhdGUgaW5mbyBmcm9tIHRoZSBoYXNoXG4gICAgaWYgKCFzdGF0ZUluZm8pIHtcbiAgICAgIHN0YXRlSW5mbyA9IHRoaXMuZ2V0UmVzcG9uc2VTdGF0ZShoYXNoKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzcG9uc2UgOiBBdXRoUmVzcG9uc2U7XG4gICAgbGV0IGF1dGhFcnIgOiBBdXRoRXJyb3I7XG4gICAgLy8gU2F2ZSB0aGUgdG9rZW4gaW5mbyBmcm9tIHRoZSBoYXNoXG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gdGhpcy5zYXZlVG9rZW5Gcm9tSGFzaChoYXNoLCBzdGF0ZUluZm8pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgYXV0aEVyciA9IGVycjtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgaGFzaCBmcm9tIHRoZSBjYWNoZVxuICAgIHRoaXMuY2FjaGVTdG9yYWdlLnJlbW92ZUl0ZW0oQ29uc3RhbnRzLnVybEhhc2gpO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIENsZWFyIHRoZSBjb29raWUgaW4gdGhlIGhhc2hcbiAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLmNsZWFyQ29va2llKCk7XG4gICAgICBjb25zdCBhY2NvdW50U3RhdGU6IHN0cmluZyA9IHRoaXMuZ2V0QWNjb3VudFN0YXRlKHN0YXRlSW5mby5zdGF0ZSk7XG4gICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKChzdGF0ZUluZm8ucmVxdWVzdFR5cGUgPT09IENvbnN0YW50cy5yZW5ld1Rva2VuKSB8fCByZXNwb25zZS5hY2Nlc3NUb2tlbikge1xuICAgICAgICAgIGlmICh3aW5kb3cucGFyZW50ICE9PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoXCJXaW5kb3cgaXMgaW4gaWZyYW1lLCBhY3F1aXJpbmcgdG9rZW4gc2lsZW50bHlcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoXCJhY3F1aXJpbmcgdG9rZW4gaW50ZXJhY3RpdmUgaW4gcHJvZ3Jlc3NcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3BvbnNlLnRva2VuVHlwZSA9IENvbnN0YW50cy5hY2Nlc3NUb2tlbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGF0ZUluZm8ucmVxdWVzdFR5cGUgPT09IENvbnN0YW50cy5sb2dpbikge1xuICAgICAgICAgIHJlc3BvbnNlLnRva2VuVHlwZSA9IENvbnN0YW50cy5pZFRva2VuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcGFyZW50Q2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLnJlZGlyZWN0U3VjY2Vzc0hhbmRsZXIocmVzcG9uc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghcGFyZW50Q2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5yZWRpcmVjdEVycm9ySGFuZGxlcihhdXRoRXJyLCBidWlsZFJlc3BvbnNlU3RhdGVPbmx5KGFjY291bnRTdGF0ZSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHBhcmVudENhbGxiYWNrKHJlc3BvbnNlLCBhdXRoRXJyKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwiRXJyb3Igb2NjdXJyZWQgaW4gdG9rZW4gcmVjZWl2ZWQgY2FsbGJhY2sgZnVuY3Rpb246IFwiICsgZXJyKTtcbiAgICAgIHRocm93IENsaWVudEF1dGhFcnJvci5jcmVhdGVFcnJvckluQ2FsbGJhY2tGdW5jdGlvbihlcnIudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogVGhpcyBtZXRob2QgbXVzdCBiZSBjYWxsZWQgZm9yIHByb2Nlc3NpbmcgdGhlIHJlc3BvbnNlIHJlY2VpdmVkIGZyb20gdGhlIFNUUy4gSXQgZXh0cmFjdHMgdGhlIGhhc2gsIHByb2Nlc3NlcyB0aGUgdG9rZW4gb3IgZXJyb3IgaW5mb3JtYXRpb24gYW5kIHNhdmVzIGl0IGluIHRoZSBjYWNoZS4gSXQgdGhlblxuICAgKiBjYWxscyB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFja3MgaW4gY2FzZSBvZiByZWRpcmVjdCBvciByZXNvbHZlcyB0aGUgcHJvbWlzZXMgd2l0aCB0aGUgcmVzdWx0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2hhc2g9d2luZG93LmxvY2F0aW9uLmhhc2hdIC0gSGFzaCBmcmFnbWVudCBvZiBVcmwuXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUF1dGhlbnRpY2F0aW9uUmVzcG9uc2UoaGFzaDogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gcmV0cmlldmUgdGhlIGhhc2hcbiAgICBpZiAoaGFzaCA9PSBudWxsKSB7XG4gICAgICBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgfVxuXG4gICAgbGV0IHNlbGYgPSBudWxsO1xuICAgIGxldCBpc1BvcHVwOiBib29sZWFuID0gZmFsc2U7XG4gICAgbGV0IGlzV2luZG93T3BlbmVyTXNhbCA9IGZhbHNlO1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIGN1cnJlbnQgd2luZG93IG9wZW5lZCB0aGUgaUZyYW1lL3BvcHVwXG4gICAgdHJ5IHtcbiAgICAgIGlzV2luZG93T3BlbmVyTXNhbCA9IHdpbmRvdy5vcGVuZXIgJiYgd2luZG93Lm9wZW5lci5tc2FsICYmIHdpbmRvdy5vcGVuZXIubXNhbCAhPT0gd2luZG93Lm1zYWw7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBlcnIgPSBTZWN1cml0eUVycm9yOiBCbG9ja2VkIGEgZnJhbWUgd2l0aCBvcmlnaW4gXCJbdXJsXVwiIGZyb20gYWNjZXNzaW5nIGEgY3Jvc3Mtb3JpZ2luIGZyYW1lLlxuICAgICAgaXNXaW5kb3dPcGVuZXJNc2FsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBzZWxmIHRvIHRoZSB3aW5kb3cgdGhhdCBjcmVhdGVkIHRoZSBwb3B1cC9pZnJhbWVcbiAgICBpZiAoaXNXaW5kb3dPcGVuZXJNc2FsKSB7XG4gICAgICBzZWxmID0gd2luZG93Lm9wZW5lci5tc2FsO1xuICAgICAgaXNQb3B1cCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cucGFyZW50ICYmIHdpbmRvdy5wYXJlbnQubXNhbCkge1xuICAgICAgc2VsZiA9IHdpbmRvdy5wYXJlbnQubXNhbDtcbiAgICB9XG5cbiAgICAvLyBpZiAod2luZG93LnBhcmVudCAhPT0gd2luZG93KSwgYnkgdXNpbmcgc2VsZiwgd2luZG93LnBhcmVudCBiZWNvbWVzIGVxdWFsIHRvIHdpbmRvdyBpbiBnZXRSZXNwb25zZVN0YXRlIG1ldGhvZCBzcGVjaWZpY2FsbHlcbiAgICBjb25zdCBzdGF0ZUluZm8gPSBzZWxmLmdldFJlc3BvbnNlU3RhdGUoaGFzaCk7XG5cbiAgICBsZXQgdG9rZW5SZXNwb25zZUNhbGxiYWNrOiAocmVzcG9uc2U6IEF1dGhSZXNwb25zZSwgZXJyb3I6IEF1dGhFcnJvcikgPT4gdm9pZCA9IG51bGw7XG5cbiAgICBzZWxmLmxvZ2dlci5pbmZvKFwiUmV0dXJuZWQgZnJvbSByZWRpcmVjdCB1cmxcIik7XG4gICAgLy8gSWYgcGFyZW50IHdpbmRvdyBpcyB0aGUgbXNhbCBpbnN0YW5jZSB3aGljaCBvcGVuZWQgdGhlIGN1cnJlbnQgd2luZG93IChpZnJhbWUpXG4gICAgaWYgKHRoaXMucGFyZW50SXNNc2FsKCkpIHtcbiAgICAgICAgdG9rZW5SZXNwb25zZUNhbGxiYWNrID0gd2luZG93LnBhcmVudC5jYWxsYmFja01hcHBlZFRvUmVuZXdTdGF0ZXNbc3RhdGVJbmZvLnN0YXRlXTtcbiAgICB9XG4gICAgLy8gQ3VycmVudCB3aW5kb3cgaXMgd2luZG93IG9wZW5lciAocG9wdXApXG4gICAgZWxzZSBpZiAoaXNXaW5kb3dPcGVuZXJNc2FsKSB7XG4gICAgICAgIHRva2VuUmVzcG9uc2VDYWxsYmFjayA9IHdpbmRvdy5vcGVuZXIuY2FsbGJhY2tNYXBwZWRUb1JlbmV3U3RhdGVzW3N0YXRlSW5mby5zdGF0ZV07XG4gICAgfVxuICAgIC8vIFJlZGlyZWN0IGNhc2VzXG4gICAgZWxzZSB7XG4gICAgICB0b2tlblJlc3BvbnNlQ2FsbGJhY2sgPSBudWxsO1xuICAgICAgLy8gaWYgc2V0IHRvIG5hdmlnYXRlIHRvIGxvZ2luUmVxdWVzdCBwYWdlIHBvc3QgbG9naW5cbiAgICAgIGlmIChzZWxmLmNvbmZpZy5hdXRoLm5hdmlnYXRlVG9Mb2dpblJlcXVlc3RVcmwpIHtcbiAgICAgICAgc2VsZi5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMudXJsSGFzaCwgaGFzaCk7XG4gICAgICAgIGlmICh3aW5kb3cucGFyZW50ID09PSB3aW5kb3cgJiYgIWlzUG9wdXApIHtcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHNlbGYuY2FjaGVTdG9yYWdlLmdldEl0ZW0oQ29uc3RhbnRzLmxvZ2luUmVxdWVzdCwgc2VsZi5pbkNvb2tpZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gXCJcIjtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5yZWRpcmVjdENhbGxiYWNrc1NldCkge1xuICAgICAgICAvLyBXZSByZWFjaGVkIHRoaXMgcG9pbnQgdG9vIGVhcmx5LCByZXR1cm4gYW5kIGNvbWUgYmFjayBsYXRlclxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2VsZi5wcm9jZXNzQ2FsbEJhY2soaGFzaCwgc3RhdGVJbmZvLCB0b2tlblJlc3BvbnNlQ2FsbGJhY2spO1xuXG4gICAgLy8gSWYgY3VycmVudCB3aW5kb3cgaXMgb3BlbmVyLCBjbG9zZSBhbGwgd2luZG93c1xuICAgIGlmIChpc1dpbmRvd09wZW5lck1zYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2luZG93Lm9wZW5lci5vcGVuZWRXaW5kb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdpbmRvdy5vcGVuZXIub3BlbmVkV2luZG93c1tpXS5jbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIFJldHVybnMgZGVzZXJpYWxpemVkIHBvcnRpb24gb2YgVVJMIGhhc2hcbiAgICogQHBhcmFtIGhhc2hcbiAgICovXG4gIHByaXZhdGUgZGVzZXJpYWxpemVIYXNoKGhhc2g6IHN0cmluZykge1xuICAgIGhhc2ggPSB0aGlzLmdldEhhc2goaGFzaCk7XG4gICAgcmV0dXJuIFV0aWxzLmRlc2VyaWFsaXplKGhhc2gpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogQ3JlYXRlcyBhIHN0YXRlSW5mbyBvYmplY3QgZnJvbSB0aGUgVVJMIGZyYWdtZW50IGFuZCByZXR1cm5zIGl0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaGFzaCAgLSAgSGFzaCBwYXNzZWQgZnJvbSByZWRpcmVjdCBwYWdlXG4gICAqIEByZXR1cm5zIHtUb2tlblJlc3BvbnNlfSBhbiBvYmplY3QgY3JlYXRlZCBmcm9tIHRoZSByZWRpcmVjdCByZXNwb25zZSBmcm9tIEFBRCBjb21wcmlzaW5nIG9mIHRoZSBrZXlzIC0gcGFyYW1ldGVycywgcmVxdWVzdFR5cGUsIHN0YXRlTWF0Y2gsIHN0YXRlUmVzcG9uc2UgYW5kIHZhbGlkLlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UmVzcG9uc2VTdGF0ZShoYXNoOiBzdHJpbmcpOiBSZXNwb25zZVN0YXRlSW5mbyB7XG4gICAgY29uc3QgcGFyYW1ldGVycyA9IHRoaXMuZGVzZXJpYWxpemVIYXNoKGhhc2gpO1xuICAgIGxldCBzdGF0ZVJlc3BvbnNlOiBSZXNwb25zZVN0YXRlSW5mbztcbiAgICBpZiAoIXBhcmFtZXRlcnMpIHtcbiAgICAgIHRocm93IEF1dGhFcnJvci5jcmVhdGVVbmV4cGVjdGVkRXJyb3IoXCJIYXNoIHdhcyBub3QgcGFyc2VkIGNvcnJlY3RseS5cIik7XG4gICAgfVxuICAgIGlmIChwYXJhbWV0ZXJzLmhhc093blByb3BlcnR5KFwic3RhdGVcIikpIHtcbiAgICAgIHN0YXRlUmVzcG9uc2UgPSB7XG4gICAgICAgIHJlcXVlc3RUeXBlOiBDb25zdGFudHMudW5rbm93bixcbiAgICAgICAgc3RhdGU6IHBhcmFtZXRlcnMuc3RhdGUsXG4gICAgICAgIHN0YXRlTWF0Y2g6IGZhbHNlXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBBdXRoRXJyb3IuY3JlYXRlVW5leHBlY3RlZEVycm9yKFwiSGFzaCBkb2VzIG5vdCBjb250YWluIHN0YXRlLlwiKTtcbiAgICB9XG4gICAgLy8gYXN5bmMgY2FsbHMgY2FuIGZpcmUgaWZyYW1lIGFuZCBsb2dpbiByZXF1ZXN0IGF0IHRoZSBzYW1lIHRpbWUgaWYgZGV2ZWxvcGVyIGRvZXMgbm90IHVzZSB0aGUgQVBJIGFzIGV4cGVjdGVkXG4gICAgLy8gaW5jb21pbmcgY2FsbGJhY2sgbmVlZHMgdG8gYmUgbG9va2VkIHVwIHRvIGZpbmQgdGhlIHJlcXVlc3QgdHlwZVxuXG4gICAgLy8gbG9naW5SZWRpcmVjdFxuICAgIGlmIChzdGF0ZVJlc3BvbnNlLnN0YXRlID09PSB0aGlzLmNhY2hlU3RvcmFnZS5nZXRJdGVtKENvbnN0YW50cy5zdGF0ZUxvZ2luLCB0aGlzLmluQ29va2llKSB8fCBzdGF0ZVJlc3BvbnNlLnN0YXRlID09PSB0aGlzLnNpbGVudEF1dGhlbnRpY2F0aW9uU3RhdGUpIHsgLy8gbG9naW5SZWRpcmVjdFxuICAgICAgc3RhdGVSZXNwb25zZS5yZXF1ZXN0VHlwZSA9IENvbnN0YW50cy5sb2dpbjtcbiAgICAgIHN0YXRlUmVzcG9uc2Uuc3RhdGVNYXRjaCA9IHRydWU7XG4gICAgICByZXR1cm4gc3RhdGVSZXNwb25zZTtcbiAgICB9XG4gICAgLy8gYWNxdWlyZVRva2VuUmVkaXJlY3RcbiAgICBlbHNlIGlmIChzdGF0ZVJlc3BvbnNlLnN0YXRlID09PSB0aGlzLmNhY2hlU3RvcmFnZS5nZXRJdGVtKENvbnN0YW50cy5zdGF0ZUFjcXVpcmVUb2tlbiwgdGhpcy5pbkNvb2tpZSkpIHsgLy9hY3F1aXJlVG9rZW5SZWRpcmVjdFxuICAgICAgc3RhdGVSZXNwb25zZS5yZXF1ZXN0VHlwZSA9IENvbnN0YW50cy5yZW5ld1Rva2VuO1xuICAgICAgc3RhdGVSZXNwb25zZS5zdGF0ZU1hdGNoID0gdHJ1ZTtcbiAgICAgIHJldHVybiBzdGF0ZVJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIGV4dGVybmFsIGFwaSByZXF1ZXN0cyBtYXkgaGF2ZSBtYW55IHJlbmV3dG9rZW4gcmVxdWVzdHMgZm9yIGRpZmZlcmVudCByZXNvdXJjZVxuICAgIGlmICghc3RhdGVSZXNwb25zZS5zdGF0ZU1hdGNoKSB7XG4gICAgICBzdGF0ZVJlc3BvbnNlLnJlcXVlc3RUeXBlID0gd2luZG93LnJlcXVlc3RUeXBlO1xuICAgICAgY29uc3Qgc3RhdGVzSW5QYXJlbnRDb250ZXh0ID0gd2luZG93LnJlbmV3U3RhdGVzO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZXNJblBhcmVudENvbnRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHN0YXRlc0luUGFyZW50Q29udGV4dFtpXSA9PT0gc3RhdGVSZXNwb25zZS5zdGF0ZSkge1xuICAgICAgICAgIHN0YXRlUmVzcG9uc2Uuc3RhdGVNYXRjaCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGVSZXNwb25zZTtcbiAgfVxuXG4gIC8vI2VuZHJlZ2lvblxuXG4gIC8vI3JlZ2lvbiBUb2tlbiBQcm9jZXNzaW5nIChFeHRyYWN0IHRvIFRva2VuUHJvY2Vzc2luZy50cylcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKiBVc2VkIHRvIGdldCB0b2tlbiBmb3IgdGhlIHNwZWNpZmllZCBzZXQgb2Ygc2NvcGVzIGZyb20gdGhlIGNhY2hlXG4gICAqIEBwYXJhbSB7QGxpbmsgU2VydmVyUmVxdWVzdFBhcmFtZXRlcnN9IC0gUmVxdWVzdCBzZW50IHRvIHRoZSBTVFMgdG8gb2J0YWluIGFuIGlkX3Rva2VuL2FjY2Vzc190b2tlblxuICAgKiBAcGFyYW0ge0FjY291bnR9IGFjY291bnQgLSBBY2NvdW50IGZvciB3aGljaCB0aGUgc2NvcGVzIHdlcmUgcmVxdWVzdGVkXG4gICAqL1xuICBwcml2YXRlIGdldENhY2hlZFRva2VuKHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdDogU2VydmVyUmVxdWVzdFBhcmFtZXRlcnMsIGFjY291bnQ6IEFjY291bnQpOiBBdXRoUmVzcG9uc2Uge1xuICAgIGxldCBhY2Nlc3NUb2tlbkNhY2hlSXRlbTogQWNjZXNzVG9rZW5DYWNoZUl0ZW0gPSBudWxsO1xuICAgIGNvbnN0IHNjb3BlcyA9IHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5zY29wZXM7XG5cbiAgICAvLyBmaWx0ZXIgYnkgY2xpZW50SWQgYW5kIGFjY291bnRcbiAgICBjb25zdCB0b2tlbkNhY2hlSXRlbXMgPSB0aGlzLmNhY2hlU3RvcmFnZS5nZXRBbGxBY2Nlc3NUb2tlbnModGhpcy5jbGllbnRJZCwgYWNjb3VudCA/IGFjY291bnQuaG9tZUFjY291bnRJZGVudGlmaWVyIDogbnVsbCk7XG5cbiAgICAvLyBObyBtYXRjaCBmb3VuZCBhZnRlciBpbml0aWFsIGZpbHRlcmluZ1xuICAgIGlmICh0b2tlbkNhY2hlSXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBmaWx0ZXJlZEl0ZW1zOiBBcnJheTxBY2Nlc3NUb2tlbkNhY2hlSXRlbT4gPSBbXTtcblxuICAgIC8vIGlmIG5vIGF1dGhvcml0eSBwYXNzZWRcbiAgICBpZiAoIXNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5hdXRob3JpdHkpIHtcbiAgICAgIC8vIGZpbHRlciBieSBzY29wZVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbkNhY2hlSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2FjaGVJdGVtID0gdG9rZW5DYWNoZUl0ZW1zW2ldO1xuICAgICAgICBjb25zdCBjYWNoZWRTY29wZXMgPSBjYWNoZUl0ZW0ua2V5LnNjb3Blcy5zcGxpdChcIiBcIik7XG4gICAgICAgIGlmIChVdGlscy5jb250YWluc1Njb3BlKGNhY2hlZFNjb3Blcywgc2NvcGVzKSkge1xuICAgICAgICAgIGZpbHRlcmVkSXRlbXMucHVzaChjYWNoZUl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIG9ubHkgb25lIGNhY2hlZCB0b2tlbiBmb3VuZFxuICAgICAgaWYgKGZpbHRlcmVkSXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGFjY2Vzc1Rva2VuQ2FjaGVJdGVtID0gZmlsdGVyZWRJdGVtc1swXTtcbiAgICAgICAgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LmF1dGhvcml0eUluc3RhbmNlID0gQXV0aG9yaXR5RmFjdG9yeS5DcmVhdGVJbnN0YW5jZShhY2Nlc3NUb2tlbkNhY2hlSXRlbS5rZXkuYXV0aG9yaXR5LCB0aGlzLmNvbmZpZy5hdXRoLnZhbGlkYXRlQXV0aG9yaXR5KTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIG1vcmUgdGhhbiBvbmUgY2FjaGVkIHRva2VuIGlzIGZvdW5kXG4gICAgICBlbHNlIGlmIChmaWx0ZXJlZEl0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhyb3cgQ2xpZW50QXV0aEVycm9yLmNyZWF0ZU11bHRpcGxlTWF0Y2hpbmdUb2tlbnNJbkNhY2hlRXJyb3Ioc2NvcGVzLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgICAgLy8gaWYgbm8gbWF0Y2ggZm91bmQsIGNoZWNrIGlmIHRoZXJlIHdhcyBhIHNpbmdsZSBhdXRob3JpdHkgdXNlZFxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGF1dGhvcml0eUxpc3QgPSB0aGlzLmdldFVuaXF1ZUF1dGhvcml0eSh0b2tlbkNhY2hlSXRlbXMsIFwiYXV0aG9yaXR5XCIpO1xuICAgICAgICBpZiAoYXV0aG9yaXR5TGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhyb3cgQ2xpZW50QXV0aEVycm9yLmNyZWF0ZU11bHRpcGxlQXV0aG9yaXRpZXNJbkNhY2hlRXJyb3Ioc2NvcGVzLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LmF1dGhvcml0eUluc3RhbmNlID0gQXV0aG9yaXR5RmFjdG9yeS5DcmVhdGVJbnN0YW5jZShhdXRob3JpdHlMaXN0WzBdLCB0aGlzLmNvbmZpZy5hdXRoLnZhbGlkYXRlQXV0aG9yaXR5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgYW4gYXV0aG9yaXR5IGlzIHBhc3NlZCBpbiB0aGUgQVBJXG4gICAgZWxzZSB7XG4gICAgICAvLyBmaWx0ZXIgYnkgYXV0aG9yaXR5IGFuZCBzY29wZVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbkNhY2hlSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2FjaGVJdGVtID0gdG9rZW5DYWNoZUl0ZW1zW2ldO1xuICAgICAgICBjb25zdCBjYWNoZWRTY29wZXMgPSBjYWNoZUl0ZW0ua2V5LnNjb3Blcy5zcGxpdChcIiBcIik7XG4gICAgICAgIGlmIChVdGlscy5jb250YWluc1Njb3BlKGNhY2hlZFNjb3Blcywgc2NvcGVzKSAmJiBVdGlscy5DYW5vbmljYWxpemVVcmkoY2FjaGVJdGVtLmtleS5hdXRob3JpdHkpID09PSBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QuYXV0aG9yaXR5KSB7XG4gICAgICAgICAgZmlsdGVyZWRJdGVtcy5wdXNoKGNhY2hlSXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIG5vIG1hdGNoXG4gICAgICBpZiAoZmlsdGVyZWRJdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICAvLyBpZiBvbmx5IG9uZSBjYWNoZWRUb2tlbiBGb3VuZFxuICAgICAgZWxzZSBpZiAoZmlsdGVyZWRJdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYWNjZXNzVG9rZW5DYWNoZUl0ZW0gPSBmaWx0ZXJlZEl0ZW1zWzBdO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGlmIG1vcmUgdGhhbiBjYWNoZWQgdG9rZW4gaXMgZm91bmRcbiAgICAgICAgdGhyb3cgQ2xpZW50QXV0aEVycm9yLmNyZWF0ZU11bHRpcGxlTWF0Y2hpbmdUb2tlbnNJbkNhY2hlRXJyb3Ioc2NvcGVzLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhY2Nlc3NUb2tlbkNhY2hlSXRlbSAhPSBudWxsKSB7XG4gICAgICBsZXQgZXhwaXJlZCA9IE51bWJlcihhY2Nlc3NUb2tlbkNhY2hlSXRlbS52YWx1ZS5leHBpcmVzSW4pO1xuICAgICAgLy8gSWYgZXhwaXJhdGlvbiBpcyB3aXRoaW4gb2Zmc2V0LCBpdCB3aWxsIGZvcmNlIHJlbmV3XG4gICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmNvbmZpZy5zeXN0ZW0udG9rZW5SZW5ld2FsT2Zmc2V0U2Vjb25kcyB8fCAzMDA7XG4gICAgICBpZiAoZXhwaXJlZCAmJiAoZXhwaXJlZCA+IFV0aWxzLm5vdygpICsgb2Zmc2V0KSkge1xuICAgICAgICBsZXQgaWRUb2tlbiA9IG5ldyBJZFRva2VuKGFjY2Vzc1Rva2VuQ2FjaGVJdGVtLnZhbHVlLmlkVG9rZW4pO1xuICAgICAgICBpZiAoIWFjY291bnQpIHtcbiAgICAgICAgICBhY2NvdW50ID0gdGhpcy5nZXRBY2NvdW50KCk7XG4gICAgICAgICAgaWYgKCFhY2NvdW50KSB7XG4gICAgICAgICAgICB0aHJvdyBBdXRoRXJyb3IuY3JlYXRlVW5leHBlY3RlZEVycm9yKFwiQWNjb3VudCBzaG91bGQgbm90IGJlIG51bGwgaGVyZS5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFTdGF0ZSA9IHRoaXMuZ2V0QWNjb3VudFN0YXRlKHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5zdGF0ZSk7XG4gICAgICAgIGxldCByZXNwb25zZSA6IEF1dGhSZXNwb25zZSA9IHtcbiAgICAgICAgICB1bmlxdWVJZDogXCJcIixcbiAgICAgICAgICB0ZW5hbnRJZDogXCJcIixcbiAgICAgICAgICB0b2tlblR5cGU6IChhY2Nlc3NUb2tlbkNhY2hlSXRlbS52YWx1ZS5pZFRva2VuID09PSBhY2Nlc3NUb2tlbkNhY2hlSXRlbS52YWx1ZS5hY2Nlc3NUb2tlbikgPyBDb25zdGFudHMuaWRUb2tlbiA6IENvbnN0YW50cy5hY2Nlc3NUb2tlbixcbiAgICAgICAgICBpZFRva2VuOiBpZFRva2VuLFxuICAgICAgICAgIGFjY2Vzc1Rva2VuOiBhY2Nlc3NUb2tlbkNhY2hlSXRlbS52YWx1ZS5hY2Nlc3NUb2tlbixcbiAgICAgICAgICBzY29wZXM6IGFjY2Vzc1Rva2VuQ2FjaGVJdGVtLmtleS5zY29wZXMuc3BsaXQoXCIgXCIpLFxuICAgICAgICAgIGV4cGlyZXNPbjogbmV3IERhdGUoZXhwaXJlZCAqIDEwMDApLFxuICAgICAgICAgIGFjY291bnQ6IGFjY291bnQsXG4gICAgICAgICAgYWNjb3VudFN0YXRlOiBhU3RhdGUsXG4gICAgICAgIH07XG4gICAgICAgIFV0aWxzLnNldFJlc3BvbnNlSWRUb2tlbihyZXNwb25zZSwgaWRUb2tlbik7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnJlbW92ZUl0ZW0oSlNPTi5zdHJpbmdpZnkoZmlsdGVyZWRJdGVtc1swXS5rZXkpKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIFVzZWQgdG8gZ2V0IGEgdW5pcXVlIGxpc3Qgb2YgYXV0aG9yaXR1ZXMgZnJvbSB0aGUgY2FjaGVcbiAgICogQHBhcmFtIHtBcnJheTxBY2Nlc3NUb2tlbkNhY2hlSXRlbT59ICBhY2Nlc3NUb2tlbkNhY2hlSXRlbXMgLSBhY2Nlc3NUb2tlbkNhY2hlSXRlbXMgc2F2ZWQgaW4gdGhlIGNhY2hlXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIHByaXZhdGUgZ2V0VW5pcXVlQXV0aG9yaXR5KGFjY2Vzc1Rva2VuQ2FjaGVJdGVtczogQXJyYXk8QWNjZXNzVG9rZW5DYWNoZUl0ZW0+LCBwcm9wZXJ0eTogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3QgYXV0aG9yaXR5TGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGNvbnN0IGZsYWdzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgYWNjZXNzVG9rZW5DYWNoZUl0ZW1zLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBpZiAoZWxlbWVudC5rZXkuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIChmbGFncy5pbmRleE9mKGVsZW1lbnQua2V5W3Byb3BlcnR5XSkgPT09IC0xKSkge1xuICAgICAgICBmbGFncy5wdXNoKGVsZW1lbnQua2V5W3Byb3BlcnR5XSk7XG4gICAgICAgIGF1dGhvcml0eUxpc3QucHVzaChlbGVtZW50LmtleVtwcm9wZXJ0eV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBhdXRob3JpdHlMaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogQ2hlY2sgaWYgQURBTCBpZF90b2tlbiBleGlzdHMgYW5kIHJldHVybiBpZiBleGlzdHMuXG4gICAqXG4gICAqL1xuICBwcml2YXRlIGV4dHJhY3RBREFMSWRUb2tlbigpOiBhbnkge1xuICAgIGNvbnN0IGFkYWxJZFRva2VuID0gdGhpcy5jYWNoZVN0b3JhZ2UuZ2V0SXRlbShDb25zdGFudHMuYWRhbElkVG9rZW4pO1xuICAgIGlmICghVXRpbHMuaXNFbXB0eShhZGFsSWRUb2tlbikpIHtcbiAgICAgICAgcmV0dXJuIFV0aWxzLmV4dHJhY3RJZFRva2VuKGFkYWxJZFRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKiBBY3F1aXJlcyBhY2Nlc3MgdG9rZW4gdXNpbmcgYSBoaWRkZW4gaWZyYW1lLlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBwcml2YXRlIHJlbmV3VG9rZW4oc2NvcGVzOiBBcnJheTxzdHJpbmc+LCByZXNvbHZlOiBGdW5jdGlvbiwgcmVqZWN0OiBGdW5jdGlvbiwgYWNjb3VudDogQWNjb3VudCwgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0OiBTZXJ2ZXJSZXF1ZXN0UGFyYW1ldGVycyk6IHZvaWQge1xuICAgIGNvbnN0IHNjb3BlID0gc2NvcGVzLmpvaW4oXCIgXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5sb2dnZXIudmVyYm9zZShcInJlbmV3VG9rZW4gaXMgY2FsbGVkIGZvciBzY29wZTpcIiArIHNjb3BlKTtcbiAgICBjb25zdCBmcmFtZUhhbmRsZSA9IHRoaXMuYWRkSGlkZGVuSUZyYW1lKFwibXNhbFJlbmV3RnJhbWVcIiArIHNjb3BlKTtcblxuICAgIHRoaXMudXBkYXRlQ2FjaGVFbnRyaWVzKHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdCwgYWNjb3VudCk7XG4gICAgdGhpcy5sb2dnZXIudmVyYm9zZShcIlJlbmV3IHRva2VuIEV4cGVjdGVkIHN0YXRlOiBcIiArIHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5zdGF0ZSk7XG5cbiAgICAvLyBCdWlsZCB1cmxOYXZpZ2F0ZSB3aXRoIFwicHJvbXB0PW5vbmVcIiBhbmQgbmF2aWdhdGUgdG8gVVJMIGluIGhpZGRlbiBpRnJhbWVcbiAgICBsZXQgdXJsTmF2aWdhdGUgPSBVdGlscy51cmxSZW1vdmVRdWVyeVN0cmluZ1BhcmFtZXRlcihzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QuY3JlYXRlTmF2aWdhdGVVcmwoc2NvcGVzKSwgQ29uc3RhbnRzLnByb21wdCkgKyBDb25zdGFudHMucHJvbXB0X25vbmU7XG5cbiAgICB3aW5kb3cucmVuZXdTdGF0ZXMucHVzaChzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3Quc3RhdGUpO1xuICAgIHdpbmRvdy5yZXF1ZXN0VHlwZSA9IENvbnN0YW50cy5yZW5ld1Rva2VuO1xuICAgIHRoaXMucmVnaXN0ZXJDYWxsYmFjayhzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3Quc3RhdGUsIHNjb3BlLCByZXNvbHZlLCByZWplY3QpO1xuICAgIHRoaXMubG9nZ2VyLmluZm9QaWkoXCJOYXZpZ2F0ZSB0bzpcIiArIHVybE5hdmlnYXRlKTtcbiAgICBmcmFtZUhhbmRsZS5zcmMgPSBcImFib3V0OmJsYW5rXCI7XG4gICAgdGhpcy5sb2FkSWZyYW1lVGltZW91dCh1cmxOYXZpZ2F0ZSwgXCJtc2FsUmVuZXdGcmFtZVwiICsgc2NvcGUsIHNjb3BlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIFJlbmV3cyBpZHRva2VuIGZvciBhcHBcInMgb3duIGJhY2tlbmQgd2hlbiBjbGllbnRJZCBpcyBwYXNzZWQgYXMgYSBzaW5nbGUgc2NvcGUgaW4gdGhlIHNjb3BlcyBhcnJheS5cbiAgICogQGlnbm9yZVxuICAgKi9cbiAgcHJpdmF0ZSByZW5ld0lkVG9rZW4oc2NvcGVzOiBBcnJheTxzdHJpbmc+LCByZXNvbHZlOiBGdW5jdGlvbiwgcmVqZWN0OiBGdW5jdGlvbiwgYWNjb3VudDogQWNjb3VudCwgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0OiBTZXJ2ZXJSZXF1ZXN0UGFyYW1ldGVycyk6IHZvaWQge1xuXG4gICAgdGhpcy5sb2dnZXIuaW5mbyhcInJlbmV3aWRUb2tlbiBpcyBjYWxsZWRcIik7XG4gICAgY29uc3QgZnJhbWVIYW5kbGUgPSB0aGlzLmFkZEhpZGRlbklGcmFtZShcIm1zYWxJZFRva2VuRnJhbWVcIik7XG5cbiAgICB0aGlzLnVwZGF0ZUNhY2hlRW50cmllcyhzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QsIGFjY291bnQpO1xuXG4gICAgdGhpcy5sb2dnZXIudmVyYm9zZShcIlJlbmV3IElkdG9rZW4gRXhwZWN0ZWQgc3RhdGU6IFwiICsgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LnN0YXRlKTtcblxuICAgIC8vIEJ1aWxkIHVybE5hdmlnYXRlIHdpdGggXCJwcm9tcHQ9bm9uZVwiIGFuZCBuYXZpZ2F0ZSB0byBVUkwgaW4gaGlkZGVuIGlGcmFtZVxuICAgIGxldCB1cmxOYXZpZ2F0ZSA9IFV0aWxzLnVybFJlbW92ZVF1ZXJ5U3RyaW5nUGFyYW1ldGVyKHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5jcmVhdGVOYXZpZ2F0ZVVybChzY29wZXMpLCBDb25zdGFudHMucHJvbXB0KSArIENvbnN0YW50cy5wcm9tcHRfbm9uZTtcblxuICAgIGlmICh0aGlzLnNpbGVudExvZ2luKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0VHlwZSA9IENvbnN0YW50cy5sb2dpbjtcbiAgICAgICAgdGhpcy5zaWxlbnRBdXRoZW50aWNhdGlvblN0YXRlID0gc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LnN0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0VHlwZSA9IENvbnN0YW50cy5yZW5ld1Rva2VuO1xuICAgICAgICB3aW5kb3cucmVuZXdTdGF0ZXMucHVzaChzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3Quc3RhdGUpO1xuICAgIH1cblxuICAgIC8vIG5vdGU6IHNjb3BlIGhlcmUgaXMgY2xpZW50SWRcbiAgICB0aGlzLnJlZ2lzdGVyQ2FsbGJhY2soc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LnN0YXRlLCB0aGlzLmNsaWVudElkLCByZXNvbHZlLCByZWplY3QpO1xuICAgIHRoaXMubG9nZ2VyLmluZm9QaWkoXCJOYXZpZ2F0ZSB0bzpcIiArIHVybE5hdmlnYXRlKTtcbiAgICBmcmFtZUhhbmRsZS5zcmMgPSBcImFib3V0OmJsYW5rXCI7XG4gICAgdGhpcy5sb2FkSWZyYW1lVGltZW91dCh1cmxOYXZpZ2F0ZSwgXCJtc2FsSWRUb2tlbkZyYW1lXCIsIHRoaXMuY2xpZW50SWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgbXVzdCBiZSBjYWxsZWQgZm9yIHByb2Nlc3NpbmcgdGhlIHJlc3BvbnNlIHJlY2VpdmVkIGZyb20gQUFELiBJdCBleHRyYWN0cyB0aGUgaGFzaCwgcHJvY2Vzc2VzIHRoZSB0b2tlbiBvciBlcnJvciwgc2F2ZXMgaXQgaW4gdGhlIGNhY2hlIGFuZCBjYWxscyB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFja3Mgd2l0aCB0aGUgcmVzdWx0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXV0aG9yaXR5IGF1dGhvcml0eSByZWNlaXZlZCBpbiB0aGUgcmVkaXJlY3QgcmVzcG9uc2UgZnJvbSBBQUQuXG4gICAqIEBwYXJhbSB7VG9rZW5SZXNwb25zZX0gcmVxdWVzdEluZm8gYW4gb2JqZWN0IGNyZWF0ZWQgZnJvbSB0aGUgcmVkaXJlY3QgcmVzcG9uc2UgZnJvbSBBQUQgY29tcHJpc2luZyBvZiB0aGUga2V5cyAtIHBhcmFtZXRlcnMsIHJlcXVlc3RUeXBlLCBzdGF0ZU1hdGNoLCBzdGF0ZVJlc3BvbnNlIGFuZCB2YWxpZC5cbiAgICogQHBhcmFtIHtBY2NvdW50fSBhY2NvdW50IGFjY291bnQgb2JqZWN0IGZvciB3aGljaCBzY29wZXMgYXJlIGNvbnNlbnRlZCBmb3IuIFRoZSBkZWZhdWx0IGFjY291bnQgaXMgdGhlIGxvZ2dlZCBpbiBhY2NvdW50LlxuICAgKiBAcGFyYW0ge0NsaWVudEluZm99IGNsaWVudEluZm8gY2xpZW50SW5mbyByZWNlaXZlZCBhcyBwYXJ0IG9mIHRoZSByZXNwb25zZSBjb21wcmlzaW5nIG9mIGZpZWxkcyB1aWQgYW5kIHV0aWQuXG4gICAqIEBwYXJhbSB7SWRUb2tlbn0gaWRUb2tlbiBpZFRva2VuIHJlY2VpdmVkIGFzIHBhcnQgb2YgdGhlIHJlc3BvbnNlLlxuICAgKiBAaWdub3JlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xuICBwcml2YXRlIHNhdmVBY2Nlc3NUb2tlbihyZXNwb25zZTogQXV0aFJlc3BvbnNlLCBhdXRob3JpdHk6IHN0cmluZywgcGFyYW1ldGVyczogYW55LCBjbGllbnRJbmZvOiBzdHJpbmcpOiBBdXRoUmVzcG9uc2Uge1xuICAgIGxldCBzY29wZTogc3RyaW5nO1xuICAgIGxldCBhY2Nlc3NUb2tlblJlc3BvbnNlID0geyAuLi5yZXNwb25zZSB9O1xuICAgIGNvbnN0IGNsaWVudE9iajogQ2xpZW50SW5mbyA9IG5ldyBDbGllbnRJbmZvKGNsaWVudEluZm8pO1xuXG4gICAgLy8gaWYgdGhlIHJlc3BvbnNlIGNvbnRhaW5zIFwic2NvcGVcIlxuICAgIGlmIChwYXJhbWV0ZXJzLmhhc093blByb3BlcnR5KFwic2NvcGVcIikpIHtcbiAgICAgIC8vIHJlYWQgdGhlIHNjb3Blc1xuICAgICAgc2NvcGUgPSBwYXJhbWV0ZXJzW1wic2NvcGVcIl07XG4gICAgICBjb25zdCBjb25zZW50ZWRTY29wZXMgPSBzY29wZS5zcGxpdChcIiBcIik7XG5cbiAgICAgIC8vIHJldHJpZXZlIGFsbCBhY2Nlc3MgdG9rZW5zIGZyb20gdGhlIGNhY2hlLCByZW1vdmUgdGhlIGR1cCBzY29yZXNcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuQ2FjaGVJdGVtcyA9IHRoaXMuY2FjaGVTdG9yYWdlLmdldEFsbEFjY2Vzc1Rva2Vucyh0aGlzLmNsaWVudElkLCBhdXRob3JpdHkpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjY2Vzc1Rva2VuQ2FjaGVJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbkNhY2hlSXRlbSA9IGFjY2Vzc1Rva2VuQ2FjaGVJdGVtc1tpXTtcblxuICAgICAgICBpZiAoYWNjZXNzVG9rZW5DYWNoZUl0ZW0ua2V5LmhvbWVBY2NvdW50SWRlbnRpZmllciA9PT0gcmVzcG9uc2UuYWNjb3VudC5ob21lQWNjb3VudElkZW50aWZpZXIpIHtcbiAgICAgICAgICBjb25zdCBjYWNoZWRTY29wZXMgPSBhY2Nlc3NUb2tlbkNhY2hlSXRlbS5rZXkuc2NvcGVzLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICBpZiAoVXRpbHMuaXNJbnRlcnNlY3RpbmdTY29wZXMoY2FjaGVkU2NvcGVzLCBjb25zZW50ZWRTY29wZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlU3RvcmFnZS5yZW1vdmVJdGVtKEpTT04uc3RyaW5naWZ5KGFjY2Vzc1Rva2VuQ2FjaGVJdGVtLmtleSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBHZW5lcmF0ZSBhbmQgY2FjaGUgYWNjZXNzVG9rZW5LZXkgYW5kIGFjY2Vzc1Rva2VuVmFsdWVcbiAgICAgIGNvbnN0IGV4cGlyZXNJbiA9IFV0aWxzLmV4cGlyZXNJbihwYXJhbWV0ZXJzW0NvbnN0YW50cy5leHBpcmVzSW5dKS50b1N0cmluZygpO1xuICAgICAgY29uc3QgYWNjZXNzVG9rZW5LZXkgPSBuZXcgQWNjZXNzVG9rZW5LZXkoYXV0aG9yaXR5LCB0aGlzLmNsaWVudElkLCBzY29wZSwgY2xpZW50T2JqLnVpZCwgY2xpZW50T2JqLnV0aWQpO1xuICAgICAgY29uc3QgYWNjZXNzVG9rZW5WYWx1ZSA9IG5ldyBBY2Nlc3NUb2tlblZhbHVlKHBhcmFtZXRlcnNbQ29uc3RhbnRzLmFjY2Vzc1Rva2VuXSwgcmVzcG9uc2UuaWRUb2tlbi5yYXdJZFRva2VuLCBleHBpcmVzSW4sIGNsaWVudEluZm8pO1xuXG4gICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKEpTT04uc3RyaW5naWZ5KGFjY2Vzc1Rva2VuS2V5KSwgSlNPTi5zdHJpbmdpZnkoYWNjZXNzVG9rZW5WYWx1ZSkpO1xuXG4gICAgICBhY2Nlc3NUb2tlblJlc3BvbnNlLmFjY2Vzc1Rva2VuICA9IHBhcmFtZXRlcnNbQ29uc3RhbnRzLmFjY2Vzc1Rva2VuXTtcbiAgICAgIGFjY2Vzc1Rva2VuUmVzcG9uc2Uuc2NvcGVzID0gY29uc2VudGVkU2NvcGVzO1xuICAgICAgbGV0IGV4cCA9IE51bWJlcihleHBpcmVzSW4pO1xuICAgICAgaWYgKGV4cCkge1xuICAgICAgICBhY2Nlc3NUb2tlblJlc3BvbnNlLmV4cGlyZXNPbiA9IG5ldyBEYXRlKChVdGlscy5ub3coKSArIGV4cCkgKiAxMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwiQ291bGQgbm90IHBhcnNlIGV4cGlyZXNJbiBwYXJhbWV0ZXIuIEdpdmVuIHZhbHVlOiBcIiArIGV4cGlyZXNJbik7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGlmIHRoZSByZXNwb25zZSBkb2VzIG5vdCBjb250YWluIFwic2NvcGVcIiAtIHNjb3BlIGlzIHVzdWFsbHkgY2xpZW50X2lkIGFuZCB0aGUgdG9rZW4gd2lsbCBiZSBpZF90b2tlblxuICAgIGVsc2Uge1xuICAgICAgc2NvcGUgPSB0aGlzLmNsaWVudElkO1xuXG4gICAgICAvLyBHZW5lcmF0ZSBhbmQgY2FjaGUgYWNjZXNzVG9rZW5LZXkgYW5kIGFjY2Vzc1Rva2VuVmFsdWVcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuS2V5ID0gbmV3IEFjY2Vzc1Rva2VuS2V5KGF1dGhvcml0eSwgdGhpcy5jbGllbnRJZCwgc2NvcGUsIGNsaWVudE9iai51aWQsIGNsaWVudE9iai51dGlkKTtcblxuICAgICAgY29uc3QgYWNjZXNzVG9rZW5WYWx1ZSA9IG5ldyBBY2Nlc3NUb2tlblZhbHVlKHBhcmFtZXRlcnNbQ29uc3RhbnRzLmlkVG9rZW5dLCBwYXJhbWV0ZXJzW0NvbnN0YW50cy5pZFRva2VuXSwgcmVzcG9uc2UuaWRUb2tlbi5leHBpcmF0aW9uLCBjbGllbnRJbmZvKTtcbiAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oSlNPTi5zdHJpbmdpZnkoYWNjZXNzVG9rZW5LZXkpLCBKU09OLnN0cmluZ2lmeShhY2Nlc3NUb2tlblZhbHVlKSk7XG4gICAgICBhY2Nlc3NUb2tlblJlc3BvbnNlLnNjb3BlcyA9IFtzY29wZV07XG4gICAgICBhY2Nlc3NUb2tlblJlc3BvbnNlLmFjY2Vzc1Rva2VuID0gcGFyYW1ldGVyc1tDb25zdGFudHMuaWRUb2tlbl07XG4gICAgICBsZXQgZXhwID0gTnVtYmVyKHJlc3BvbnNlLmlkVG9rZW4uZXhwaXJhdGlvbik7XG4gICAgICBpZiAoZXhwKSB7XG4gICAgICAgIGFjY2Vzc1Rva2VuUmVzcG9uc2UuZXhwaXJlc09uID0gbmV3IERhdGUoZXhwICogMTAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIkNvdWxkIG5vdCBwYXJzZSBleHBpcmVzSW4gcGFyYW1ldGVyXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWNjZXNzVG9rZW5SZXNwb25zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIFNhdmVzIHRva2VuIG9yIGVycm9yIHJlY2VpdmVkIGluIHRoZSByZXNwb25zZSBmcm9tIEFBRCBpbiB0aGUgY2FjaGUuIEluIGNhc2Ugb2YgaWRfdG9rZW4sIGl0IGFsc28gY3JlYXRlcyB0aGUgYWNjb3VudCBvYmplY3QuXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIHByb3RlY3RlZCBzYXZlVG9rZW5Gcm9tSGFzaChoYXNoOiBzdHJpbmcsIHN0YXRlSW5mbzogUmVzcG9uc2VTdGF0ZUluZm8pOiBBdXRoUmVzcG9uc2Uge1xuICAgIHRoaXMubG9nZ2VyLmluZm8oXCJTdGF0ZSBzdGF0dXM6XCIgKyBzdGF0ZUluZm8uc3RhdGVNYXRjaCArIFwiOyBSZXF1ZXN0IHR5cGU6XCIgKyBzdGF0ZUluZm8ucmVxdWVzdFR5cGUpO1xuICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLm1zYWxFcnJvciwgXCJcIik7XG4gICAgdGhpcy5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMubXNhbEVycm9yRGVzY3JpcHRpb24sIFwiXCIpO1xuXG4gICAgbGV0IHJlc3BvbnNlIDogQXV0aFJlc3BvbnNlID0ge1xuICAgICAgdW5pcXVlSWQ6IFwiXCIsXG4gICAgICB0ZW5hbnRJZDogXCJcIixcbiAgICAgIHRva2VuVHlwZTogXCJcIixcbiAgICAgIGlkVG9rZW46IG51bGwsXG4gICAgICBhY2Nlc3NUb2tlbjogbnVsbCxcbiAgICAgIHNjb3BlczogW10sXG4gICAgICBleHBpcmVzT246IG51bGwsXG4gICAgICBhY2NvdW50OiBudWxsLFxuICAgICAgYWNjb3VudFN0YXRlOiBcIlwiLFxuICAgIH07XG5cbiAgICBsZXQgZXJyb3I6IEF1dGhFcnJvcjtcbiAgICBjb25zdCBoYXNoUGFyYW1zID0gdGhpcy5kZXNlcmlhbGl6ZUhhc2goaGFzaCk7XG4gICAgbGV0IGF1dGhvcml0eUtleTogc3RyaW5nID0gXCJcIjtcbiAgICBsZXQgYWNxdWlyZVRva2VuQWNjb3VudEtleTogc3RyaW5nID0gXCJcIjtcblxuICAgIC8vIElmIHNlcnZlciByZXR1cm5zIGFuIGVycm9yXG4gICAgaWYgKGhhc2hQYXJhbXMuaGFzT3duUHJvcGVydHkoQ29uc3RhbnRzLmVycm9yRGVzY3JpcHRpb24pIHx8IGhhc2hQYXJhbXMuaGFzT3duUHJvcGVydHkoQ29uc3RhbnRzLmVycm9yKSkge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mb1BpaShcIkVycm9yIDpcIiArIGhhc2hQYXJhbXNbQ29uc3RhbnRzLmVycm9yXSArIFwiOyBFcnJvciBkZXNjcmlwdGlvbjpcIiArIGhhc2hQYXJhbXNbQ29uc3RhbnRzLmVycm9yRGVzY3JpcHRpb25dKTtcbiAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLm1zYWxFcnJvciwgaGFzaFBhcmFtc1tDb25zdGFudHMuZXJyb3JdKTtcbiAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLm1zYWxFcnJvckRlc2NyaXB0aW9uLCBoYXNoUGFyYW1zW0NvbnN0YW50cy5lcnJvckRlc2NyaXB0aW9uXSk7XG5cbiAgICAgIC8vIGxvZ2luXG4gICAgICBpZiAoc3RhdGVJbmZvLnJlcXVlc3RUeXBlID09PSBDb25zdGFudHMubG9naW4pIHtcbiAgICAgICAgdGhpcy5sb2dpbkluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMubG9naW5FcnJvciwgaGFzaFBhcmFtc1tDb25zdGFudHMuZXJyb3JEZXNjcmlwdGlvbl0gKyBcIjpcIiArIGhhc2hQYXJhbXNbQ29uc3RhbnRzLmVycm9yXSk7XG4gICAgICAgIGF1dGhvcml0eUtleSA9IFN0b3JhZ2UuZ2VuZXJhdGVBdXRob3JpdHlLZXkoc3RhdGVJbmZvLnN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWNxdWlyZVRva2VuXG4gICAgICBpZiAoc3RhdGVJbmZvLnJlcXVlc3RUeXBlID09PSBDb25zdGFudHMucmVuZXdUb2tlbikge1xuICAgICAgICB0aGlzLmFjcXVpcmVUb2tlbkluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgYXV0aG9yaXR5S2V5ID0gU3RvcmFnZS5nZW5lcmF0ZUF1dGhvcml0eUtleShzdGF0ZUluZm8uc3RhdGUpO1xuXG4gICAgICAgIGNvbnN0IGFjY291bnQ6IEFjY291bnQgPSB0aGlzLmdldEFjY291bnQoKTtcbiAgICAgICAgbGV0IGFjY291bnRJZDtcblxuICAgICAgICBpZiAoYWNjb3VudCAmJiAhVXRpbHMuaXNFbXB0eShhY2NvdW50LmhvbWVBY2NvdW50SWRlbnRpZmllcikpIHtcbiAgICAgICAgICAgIGFjY291bnRJZCA9IGFjY291bnQuaG9tZUFjY291bnRJZGVudGlmaWVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWNjb3VudElkID0gQ29uc3RhbnRzLm5vX2FjY291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICBhY3F1aXJlVG9rZW5BY2NvdW50S2V5ID0gU3RvcmFnZS5nZW5lcmF0ZUFjcXVpcmVUb2tlbkFjY291bnRLZXkoYWNjb3VudElkLCBzdGF0ZUluZm8uc3RhdGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0ludGVyYWN0aW9uUmVxdWlyZWQoaGFzaFBhcmFtc1tDb25zdGFudHMuZXJyb3JEZXNjcmlwdGlvbl0pKSB7XG4gICAgICAgIGVycm9yID0gbmV3IEludGVyYWN0aW9uUmVxdWlyZWRBdXRoRXJyb3IoaGFzaFBhcmFtc1tDb25zdGFudHMuZXJyb3JdLCBoYXNoUGFyYW1zW0NvbnN0YW50cy5lcnJvckRlc2NyaXB0aW9uXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvciA9IG5ldyBTZXJ2ZXJFcnJvcihoYXNoUGFyYW1zW0NvbnN0YW50cy5lcnJvcl0sIGhhc2hQYXJhbXNbQ29uc3RhbnRzLmVycm9yRGVzY3JpcHRpb25dKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gSWYgdGhlIHNlcnZlciByZXR1cm5zIFwiU3VjY2Vzc1wiXG4gICAgZWxzZSB7XG4gICAgICAvLyBWZXJpZnkgdGhlIHN0YXRlIGZyb20gcmVkaXJlY3QgYW5kIHJlY29yZCB0b2tlbnMgdG8gc3RvcmFnZSBpZiBleGlzdHNcbiAgICAgIGlmIChzdGF0ZUluZm8uc3RhdGVNYXRjaCkge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFwiU3RhdGUgaXMgcmlnaHRcIik7XG4gICAgICAgIGlmIChoYXNoUGFyYW1zLmhhc093blByb3BlcnR5KENvbnN0YW50cy5zZXNzaW9uU3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKENvbnN0YW50cy5tc2FsU2Vzc2lvblN0YXRlLCBoYXNoUGFyYW1zW0NvbnN0YW50cy5zZXNzaW9uU3RhdGVdKTtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZS5hY2NvdW50U3RhdGUgPSB0aGlzLmdldEFjY291bnRTdGF0ZShzdGF0ZUluZm8uc3RhdGUpO1xuXG4gICAgICAgIGxldCBjbGllbnRJbmZvOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgIC8vIFByb2Nlc3MgYWNjZXNzX3Rva2VuXG4gICAgICAgIGlmIChoYXNoUGFyYW1zLmhhc093blByb3BlcnR5KENvbnN0YW50cy5hY2Nlc3NUb2tlbikpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFwiRnJhZ21lbnQgaGFzIGFjY2VzcyB0b2tlblwiKTtcbiAgICAgICAgICB0aGlzLmFjcXVpcmVUb2tlbkluUHJvZ3Jlc3MgPSBmYWxzZTtcblxuICAgICAgICAgIC8vIHJldHJpZXZlIHRoZSBpZF90b2tlbiBmcm9tIHJlc3BvbnNlIGlmIHByZXNlbnQgOlxuICAgICAgICAgIGlmIChoYXNoUGFyYW1zLmhhc093blByb3BlcnR5KENvbnN0YW50cy5pZFRva2VuKSkge1xuICAgICAgICAgICAgcmVzcG9uc2UuaWRUb2tlbiA9IG5ldyBJZFRva2VuKGhhc2hQYXJhbXNbQ29uc3RhbnRzLmlkVG9rZW5dKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBVdGlscy5zZXRSZXNwb25zZUlkVG9rZW4ocmVzcG9uc2UsIG5ldyBJZFRva2VuKHRoaXMuY2FjaGVTdG9yYWdlLmdldEl0ZW0oQ29uc3RhbnRzLmlkVG9rZW5LZXkpKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcmV0cmlldmUgdGhlIGF1dGhvcml0eSBmcm9tIGNhY2hlIGFuZCByZXBsYWNlIHdpdGggdGVuYW50SURcbiAgICAgICAgICBjb25zdCBhdXRob3JpdHlLZXkgPSBTdG9yYWdlLmdlbmVyYXRlQXV0aG9yaXR5S2V5KHN0YXRlSW5mby5zdGF0ZSk7XG4gICAgICAgICAgbGV0IGF1dGhvcml0eTogc3RyaW5nID0gdGhpcy5jYWNoZVN0b3JhZ2UuZ2V0SXRlbShhdXRob3JpdHlLZXksIHRoaXMuaW5Db29raWUpO1xuXG4gICAgICAgICAgaWYgKCFVdGlscy5pc0VtcHR5KGF1dGhvcml0eSkpIHtcbiAgICAgICAgICAgIGF1dGhvcml0eSA9IFV0aWxzLnJlcGxhY2VUZW5hbnRQYXRoKGF1dGhvcml0eSwgcmVzcG9uc2UudGVuYW50SWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJldHJpZXZlIGNsaWVudF9pbmZvIC0gaWYgaXQgaXMgbm90IGZvdW5kLCBnZW5lcmF0ZSB0aGUgdWlkIGFuZCB1dGlkIGZyb20gaWRUb2tlblxuICAgICAgICAgIGlmIChoYXNoUGFyYW1zLmhhc093blByb3BlcnR5KENvbnN0YW50cy5jbGllbnRJbmZvKSkge1xuICAgICAgICAgICAgY2xpZW50SW5mbyA9IGhhc2hQYXJhbXNbQ29uc3RhbnRzLmNsaWVudEluZm9dO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuaW5nKFwiQ2xpZW50SW5mbyBub3QgcmVjZWl2ZWQgaW4gdGhlIHJlc3BvbnNlIGZyb20gQUFEXCIpO1xuICAgICAgICAgICAgdGhyb3cgQ2xpZW50QXV0aEVycm9yLmNyZWF0ZUNsaWVudEluZm9Ob3RQb3B1bGF0ZWRFcnJvcihcIkNsaWVudEluZm8gbm90IHJlY2VpdmVkIGluIHRoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXJcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzcG9uc2UuYWNjb3VudCA9IEFjY291bnQuY3JlYXRlQWNjb3VudChyZXNwb25zZS5pZFRva2VuLCBuZXcgQ2xpZW50SW5mbyhjbGllbnRJbmZvKSk7XG5cbiAgICAgICAgICBsZXQgYWNjb3VudEtleTogc3RyaW5nO1xuICAgICAgICAgIGlmIChyZXNwb25zZS5hY2NvdW50ICYmICFVdGlscy5pc0VtcHR5KHJlc3BvbnNlLmFjY291bnQuaG9tZUFjY291bnRJZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgYWNjb3VudEtleSA9IHJlc3BvbnNlLmFjY291bnQuaG9tZUFjY291bnRJZGVudGlmaWVyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFjY291bnRLZXkgPSBDb25zdGFudHMubm9fYWNjb3VudDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhY3F1aXJlVG9rZW5BY2NvdW50S2V5ID0gU3RvcmFnZS5nZW5lcmF0ZUFjcXVpcmVUb2tlbkFjY291bnRLZXkoYWNjb3VudEtleSwgc3RhdGVJbmZvLnN0YXRlKTtcbiAgICAgICAgICBjb25zdCBhY3F1aXJlVG9rZW5BY2NvdW50S2V5X25vYWNjb3VudCA9IFN0b3JhZ2UuZ2VuZXJhdGVBY3F1aXJlVG9rZW5BY2NvdW50S2V5KENvbnN0YW50cy5ub19hY2NvdW50LCBzdGF0ZUluZm8uc3RhdGUpO1xuXG4gICAgICAgICAgbGV0IGNhY2hlZEFjY291bnQ6IHN0cmluZyA9IHRoaXMuY2FjaGVTdG9yYWdlLmdldEl0ZW0oYWNxdWlyZVRva2VuQWNjb3VudEtleSk7XG4gICAgICAgICAgbGV0IGFjcXVpcmVUb2tlbkFjY291bnQ6IEFjY291bnQ7XG5cbiAgICAgICAgICAvLyBDaGVjayB3aXRoIHRoZSBhY2NvdW50IGluIHRoZSBDYWNoZVxuICAgICAgICAgIGlmICghVXRpbHMuaXNFbXB0eShjYWNoZWRBY2NvdW50KSkge1xuICAgICAgICAgICAgYWNxdWlyZVRva2VuQWNjb3VudCA9IEpTT04ucGFyc2UoY2FjaGVkQWNjb3VudCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuYWNjb3VudCAmJiBhY3F1aXJlVG9rZW5BY2NvdW50ICYmIFV0aWxzLmNvbXBhcmVBY2NvdW50cyhyZXNwb25zZS5hY2NvdW50LCBhY3F1aXJlVG9rZW5BY2NvdW50KSkge1xuICAgICAgICAgICAgICByZXNwb25zZSA9IHRoaXMuc2F2ZUFjY2Vzc1Rva2VuKHJlc3BvbnNlLCBhdXRob3JpdHksIGhhc2hQYXJhbXMsIGNsaWVudEluZm8pO1xuICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVGhlIHVzZXIgb2JqZWN0IHJlY2VpdmVkIGluIHRoZSByZXNwb25zZSBpcyB0aGUgc2FtZSBhcyB0aGUgb25lIHBhc3NlZCBpbiB0aGUgYWNxdWlyZVRva2VuIHJlcXVlc3RcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybmluZyhcbiAgICAgICAgICAgICAgICBcIlRoZSBhY2NvdW50IG9iamVjdCBjcmVhdGVkIGZyb20gdGhlIHJlc3BvbnNlIGlzIG5vdCB0aGUgc2FtZSBhcyB0aGUgb25lIHBhc3NlZCBpbiB0aGUgYWNxdWlyZVRva2VuIHJlcXVlc3RcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKCFVdGlscy5pc0VtcHR5KHRoaXMuY2FjaGVTdG9yYWdlLmdldEl0ZW0oYWNxdWlyZVRva2VuQWNjb3VudEtleV9ub2FjY291bnQpKSkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnNhdmVBY2Nlc3NUb2tlbihyZXNwb25zZSwgYXV0aG9yaXR5LCBoYXNoUGFyYW1zLCBjbGllbnRJbmZvKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcm9jZXNzIGlkX3Rva2VuXG4gICAgICAgIGlmIChoYXNoUGFyYW1zLmhhc093blByb3BlcnR5KENvbnN0YW50cy5pZFRva2VuKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIkZyYWdtZW50IGhhcyBpZCB0b2tlblwiKTtcblxuICAgICAgICAgICAgLy8gbG9naW4gbm8gbG9uZ2VyIGluIHByb2dyZXNzXG4gICAgICAgICAgICB0aGlzLmxvZ2luSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBVdGlscy5zZXRSZXNwb25zZUlkVG9rZW4ocmVzcG9uc2UsIG5ldyBJZFRva2VuKGhhc2hQYXJhbXNbQ29uc3RhbnRzLmlkVG9rZW5dKSk7XG4gICAgICAgICAgICBpZiAoaGFzaFBhcmFtcy5oYXNPd25Qcm9wZXJ0eShDb25zdGFudHMuY2xpZW50SW5mbykpIHtcbiAgICAgICAgICAgICAgY2xpZW50SW5mbyA9IGhhc2hQYXJhbXNbQ29uc3RhbnRzLmNsaWVudEluZm9dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybmluZyhcIkNsaWVudEluZm8gbm90IHJlY2VpdmVkIGluIHRoZSByZXNwb25zZSBmcm9tIEFBRFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXV0aG9yaXR5S2V5ID0gU3RvcmFnZS5nZW5lcmF0ZUF1dGhvcml0eUtleShzdGF0ZUluZm8uc3RhdGUpO1xuICAgICAgICAgICAgbGV0IGF1dGhvcml0eTogc3RyaW5nID0gdGhpcy5jYWNoZVN0b3JhZ2UuZ2V0SXRlbShhdXRob3JpdHlLZXksIHRoaXMuaW5Db29raWUpO1xuXG4gICAgICAgICAgICBpZiAoIVV0aWxzLmlzRW1wdHkoYXV0aG9yaXR5KSkge1xuICAgICAgICAgICAgICBhdXRob3JpdHkgPSBVdGlscy5yZXBsYWNlVGVuYW50UGF0aChhdXRob3JpdHksIHJlc3BvbnNlLmlkVG9rZW4udGVuYW50SWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFjY291bnQgPSBBY2NvdW50LmNyZWF0ZUFjY291bnQocmVzcG9uc2UuaWRUb2tlbiwgbmV3IENsaWVudEluZm8oY2xpZW50SW5mbykpO1xuICAgICAgICAgICAgcmVzcG9uc2UuYWNjb3VudCA9IHRoaXMuYWNjb3VudDtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmlkVG9rZW4gJiYgcmVzcG9uc2UuaWRUb2tlbi5ub25jZSkge1xuICAgICAgICAgICAgICAvLyBjaGVjayBub25jZSBpbnRlZ3JpdHkgaWYgaWRUb2tlbiBoYXMgbm9uY2UgLSB0aHJvdyBhbiBlcnJvciBpZiBub3QgbWF0Y2hlZFxuICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuaWRUb2tlbi5ub25jZSAhPT0gdGhpcy5jYWNoZVN0b3JhZ2UuZ2V0SXRlbShDb25zdGFudHMubm9uY2VJZFRva2VuLCB0aGlzLmluQ29va2llKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWNjb3VudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMubG9naW5FcnJvciwgXCJOb25jZSBNaXNtYXRjaC4gRXhwZWN0ZWQgTm9uY2U6IFwiICsgdGhpcy5jYWNoZVN0b3JhZ2UuZ2V0SXRlbShDb25zdGFudHMubm9uY2VJZFRva2VuLCB0aGlzLmluQ29va2llKSArIFwiLFwiICsgXCJBY3R1YWwgTm9uY2U6IFwiICsgcmVzcG9uc2UuaWRUb2tlbi5ub25jZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJOb25jZSBNaXNtYXRjaC5FeHBlY3RlZCBOb25jZTogXCIgKyB0aGlzLmNhY2hlU3RvcmFnZS5nZXRJdGVtKENvbnN0YW50cy5ub25jZUlkVG9rZW4sIHRoaXMuaW5Db29raWUpICsgXCIsXCIgKyBcIkFjdHVhbCBOb25jZTogXCIgKyByZXNwb25zZS5pZFRva2VuLm5vbmNlKTtcbiAgICAgICAgICAgICAgICBlcnJvciA9IENsaWVudEF1dGhFcnJvci5jcmVhdGVOb25jZU1pc21hdGNoRXJyb3IodGhpcy5jYWNoZVN0b3JhZ2UuZ2V0SXRlbShDb25zdGFudHMubm9uY2VJZFRva2VuLCB0aGlzLmluQ29va2llKSwgcmVzcG9uc2UuaWRUb2tlbi5ub25jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gU2F2ZSB0aGUgdG9rZW5cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMuaWRUb2tlbktleSwgaGFzaFBhcmFtc1tDb25zdGFudHMuaWRUb2tlbl0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLm1zYWxDbGllbnRJbmZvLCBjbGllbnRJbmZvKTtcblxuICAgICAgICAgICAgICAgIC8vIFNhdmUgaWRUb2tlbiBhcyBhY2Nlc3MgdG9rZW4gZm9yIGFwcCBpdHNlbGZcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVBY2Nlc3NUb2tlbihyZXNwb25zZSwgYXV0aG9yaXR5LCBoYXNoUGFyYW1zLCBjbGllbnRJbmZvKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXV0aG9yaXR5S2V5ID0gc3RhdGVJbmZvLnN0YXRlO1xuICAgICAgICAgICAgICBhY3F1aXJlVG9rZW5BY2NvdW50S2V5ID0gc3RhdGVJbmZvLnN0YXRlO1xuXG4gICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwiSW52YWxpZCBpZF90b2tlbiByZWNlaXZlZCBpbiB0aGUgcmVzcG9uc2VcIik7XG4gICAgICAgICAgICAgIGVycm9yID0gQ2xpZW50QXV0aEVycm9yLmNyZWF0ZUludmFsaWRJZFRva2VuRXJyb3IocmVzcG9uc2UuaWRUb2tlbik7XG4gICAgICAgICAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLm1zYWxFcnJvciwgZXJyb3IuZXJyb3JDb2RlKTtcbiAgICAgICAgICAgICAgdGhpcy5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMubXNhbEVycm9yRGVzY3JpcHRpb24sIGVycm9yLmVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFN0YXRlIG1pc21hdGNoIC0gdW5leHBlY3RlZC9pbnZhbGlkIHN0YXRlXG4gICAgICBlbHNlIHtcbiAgICAgICAgYXV0aG9yaXR5S2V5ID0gc3RhdGVJbmZvLnN0YXRlO1xuICAgICAgICBhY3F1aXJlVG9rZW5BY2NvdW50S2V5ID0gc3RhdGVJbmZvLnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkU3RhdGUgPSB0aGlzLmNhY2hlU3RvcmFnZS5nZXRJdGVtKENvbnN0YW50cy5zdGF0ZUxvZ2luLCB0aGlzLmluQ29va2llKTtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJTdGF0ZSBNaXNtYXRjaC5FeHBlY3RlZCBTdGF0ZTogXCIgKyBleHBlY3RlZFN0YXRlICsgXCIsXCIgKyBcIkFjdHVhbCBTdGF0ZTogXCIgKyBzdGF0ZUluZm8uc3RhdGUpO1xuICAgICAgICBlcnJvciA9IENsaWVudEF1dGhFcnJvci5jcmVhdGVJbnZhbGlkU3RhdGVFcnJvcihzdGF0ZUluZm8uc3RhdGUsIGV4cGVjdGVkU3RhdGUpO1xuICAgICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKENvbnN0YW50cy5tc2FsRXJyb3IsIGVycm9yLmVycm9yQ29kZSk7XG4gICAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLm1zYWxFcnJvckRlc2NyaXB0aW9uLCBlcnJvci5lcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLnJlbmV3U3RhdHVzICsgc3RhdGVJbmZvLnN0YXRlLCBDb25zdGFudHMudG9rZW5SZW5ld1N0YXR1c0NvbXBsZXRlZCk7XG4gICAgdGhpcy5jYWNoZVN0b3JhZ2UucmVtb3ZlQWNxdWlyZVRva2VuRW50cmllcygpO1xuICAgIC8vIHRoaXMgaXMgcmVxdWlyZWQgaWYgbmF2aWdhdGVUb0xvZ2luUmVxdWVzdFVybD1mYWxzZVxuICAgIGlmICh0aGlzLmluQ29va2llKSB7XG4gICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtQ29va2llKGF1dGhvcml0eUtleSwgXCJcIiwgLTEpO1xuICAgICAgdGhpcy5jYWNoZVN0b3JhZ2UuY2xlYXJDb29raWUoKTtcbiAgICB9XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgIHRocm93IEF1dGhFcnJvci5jcmVhdGVVbmV4cGVjdGVkRXJyb3IoXCJSZXNwb25zZSBpcyBudWxsXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbiAgLyogdHNsaW50OmVuYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xuXG4gIC8vI2VuZHJlZ2lvblxuXG4gIC8vI3JlZ2lvbiBBY2NvdW50XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNpZ25lZCBpbiBhY2NvdW50IChyZWNlaXZlZCBmcm9tIGFuIGFjY291bnQgb2JqZWN0IGNyZWF0ZWQgYXQgdGhlIHRpbWUgb2YgbG9naW4pIG9yIG51bGwgd2hlbiBubyBzdGF0ZSBpcyBmb3VuZFxuICAgKiBAcmV0dXJucyB7QGxpbmsgQWNjb3VudH0gYWNjb3VudCBvYmplY3Qgc3RvcmVkIGluIE1TQUxcbiAgICovXG4gIGdldEFjY291bnQoKTogQWNjb3VudCB7XG4gICAgLy8gaWYgYSBzZXNzaW9uIGFscmVhZHkgZXhpc3RzLCBnZXQgdGhlIGFjY291bnQgZnJvbSB0aGUgc2Vzc2lvblxuICAgIGlmICh0aGlzLmFjY291bnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmFjY291bnQ7XG4gICAgfVxuXG4gICAgLy8gZnJhbWUgaXMgdXNlZCB0byBnZXQgaWRUb2tlbiBhbmQgcG9wdWxhdGUgdGhlIGFjY291bnQgZm9yIHRoZSBnaXZlbiBzZXNzaW9uXG4gICAgY29uc3QgcmF3SWRUb2tlbiA9IHRoaXMuY2FjaGVTdG9yYWdlLmdldEl0ZW0oQ29uc3RhbnRzLmlkVG9rZW5LZXkpO1xuICAgIGNvbnN0IHJhd0NsaWVudEluZm8gPSB0aGlzLmNhY2hlU3RvcmFnZS5nZXRJdGVtKENvbnN0YW50cy5tc2FsQ2xpZW50SW5mbyk7XG5cbiAgICBpZiAoIVV0aWxzLmlzRW1wdHkocmF3SWRUb2tlbikgJiYgIVV0aWxzLmlzRW1wdHkocmF3Q2xpZW50SW5mbykpIHtcbiAgICAgIGNvbnN0IGlkVG9rZW4gPSBuZXcgSWRUb2tlbihyYXdJZFRva2VuKTtcbiAgICAgIGNvbnN0IGNsaWVudEluZm8gPSBuZXcgQ2xpZW50SW5mbyhyYXdDbGllbnRJbmZvKTtcbiAgICAgIHRoaXMuYWNjb3VudCA9IEFjY291bnQuY3JlYXRlQWNjb3VudChpZFRva2VuLCBjbGllbnRJbmZvKTtcbiAgICAgIHJldHVybiB0aGlzLmFjY291bnQ7XG4gICAgfVxuICAgIC8vIGlmIGxvZ2luIG5vdCB5ZXQgZG9uZSwgcmV0dXJuIG51bGxcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqXG4gICAqIEV4dHJhY3RzIHN0YXRlIHZhbHVlIGZyb20gdGhlIGFjY291bnRTdGF0ZSBzZW50IHdpdGggdGhlIGF1dGhlbnRpY2F0aW9uIHJlcXVlc3QuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHNjb3BlLlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBnZXRBY2NvdW50U3RhdGUgKHN0YXRlOiBzdHJpbmcpIHtcbiAgICBpZiAoc3RhdGUpIHtcbiAgICAgIGNvbnN0IHNwbGl0SW5kZXggPSBzdGF0ZS5pbmRleE9mKFwifFwiKTtcbiAgICAgIGlmIChzcGxpdEluZGV4ID4gLTEgJiYgc3BsaXRJbmRleCArIDEgPCBzdGF0ZS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnN1YnN0cmluZyhzcGxpdEluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGZpbHRlciBhbGwgY2FjaGVkIGl0ZW1zIGFuZCByZXR1cm4gYSBsaXN0IG9mIHVuaXF1ZSBhY2NvdW50cyBiYXNlZCBvbiBob21lQWNjb3VudElkZW50aWZpZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7QGxpbmsgQXJyYXk8QWNjb3VudD59IEFjY291bnRzIC0gYWNjb3VudHMgc2F2ZWQgaW4gdGhlIGNhY2hlLlxuICAgKi9cbiAgZ2V0QWxsQWNjb3VudHMoKTogQXJyYXk8QWNjb3VudD4ge1xuICAgIGNvbnN0IGFjY291bnRzOiBBcnJheTxBY2NvdW50PiA9IFtdO1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuQ2FjaGVJdGVtcyA9IHRoaXMuY2FjaGVTdG9yYWdlLmdldEFsbEFjY2Vzc1Rva2VucyhDb25zdGFudHMuY2xpZW50SWQsIENvbnN0YW50cy5ob21lQWNjb3VudElkZW50aWZpZXIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2Nlc3NUb2tlbkNhY2hlSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGlkVG9rZW4gPSBuZXcgSWRUb2tlbihhY2Nlc3NUb2tlbkNhY2hlSXRlbXNbaV0udmFsdWUuaWRUb2tlbik7XG4gICAgICBjb25zdCBjbGllbnRJbmZvID0gbmV3IENsaWVudEluZm8oYWNjZXNzVG9rZW5DYWNoZUl0ZW1zW2ldLnZhbHVlLmhvbWVBY2NvdW50SWRlbnRpZmllcik7XG4gICAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0gQWNjb3VudC5jcmVhdGVBY2NvdW50KGlkVG9rZW4sIGNsaWVudEluZm8pO1xuICAgICAgYWNjb3VudHMucHVzaChhY2NvdW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRVbmlxdWVBY2NvdW50cyhhY2NvdW50cyk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKlxuICAgKiBVc2VkIHRvIGZpbHRlciBhY2NvdW50cyBiYXNlZCBvbiBob21lQWNjb3VudElkZW50aWZpZXJcbiAgICogQHBhcmFtIHtBcnJheTxBY2NvdW50Pn0gIEFjY291bnRzIC0gYWNjb3VudHMgc2F2ZWQgaW4gdGhlIGNhY2hlXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIHByaXZhdGUgZ2V0VW5pcXVlQWNjb3VudHMoYWNjb3VudHM6IEFycmF5PEFjY291bnQ+KTogQXJyYXk8QWNjb3VudD4ge1xuICAgIGlmICghYWNjb3VudHMgfHwgYWNjb3VudHMubGVuZ3RoIDw9IDEpIHtcbiAgICAgIHJldHVybiBhY2NvdW50cztcbiAgICB9XG5cbiAgICBjb25zdCBmbGFnczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGNvbnN0IHVuaXF1ZUFjY291bnRzOiBBcnJheTxBY2NvdW50PiA9IFtdO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhY2NvdW50cy5sZW5ndGg7ICsraW5kZXgpIHtcbiAgICAgIGlmIChhY2NvdW50c1tpbmRleF0uaG9tZUFjY291bnRJZGVudGlmaWVyICYmIGZsYWdzLmluZGV4T2YoYWNjb3VudHNbaW5kZXhdLmhvbWVBY2NvdW50SWRlbnRpZmllcikgPT09IC0xKSB7XG4gICAgICAgIGZsYWdzLnB1c2goYWNjb3VudHNbaW5kZXhdLmhvbWVBY2NvdW50SWRlbnRpZmllcik7XG4gICAgICAgIHVuaXF1ZUFjY291bnRzLnB1c2goYWNjb3VudHNbaW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdW5pcXVlQWNjb3VudHM7XG4gIH1cblxuICAvLyNlbmRyZWdpb25cblxuICAvLyNyZWdpb24gU2NvcGVzIChFeHRyYWN0IHRvIFNjb3Blcy50cylcblxuICAvLyBOb3RlOiBcInRoaXNcIiBkZXBlbmRlbmN5IGluIHRoaXMgc2VjdGlvbiBpcyBtaW5pbWFsLlxuICAvLyBJZiBwQ2FjaGVTdG9yYWdlIGlzIHNlcGFyYXRlZCBmcm9tIHRoZSBjbGFzcyBvYmplY3QsIG9yIHBhc3NlZCBhcyBhIGZuIHBhcmFtLCBzY29wZXNVdGlscy50cyBjYW4gYmUgY3JlYXRlZFxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqXG4gICAqIFVzZWQgdG8gdmFsaWRhdGUgdGhlIHNjb3BlcyBpbnB1dCBwYXJhbWV0ZXIgcmVxdWVzdGVkICBieSB0aGUgZGV2ZWxvcGVyLlxuICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHNjb3BlcyAtIERldmVsb3BlciByZXF1ZXN0ZWQgcGVybWlzc2lvbnMuIE5vdCBhbGwgc2NvcGVzIGFyZSBndWFyYW50ZWVkIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBhY2Nlc3MgdG9rZW4gcmV0dXJuZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2NvcGVzUmVxdWlyZWQgLSBCb29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgc2NvcGVzIGFycmF5IGlzIHJlcXVpcmVkIG9yIG5vdFxuICAgKiBAaWdub3JlXG4gICAqL1xuICBwcml2YXRlIHZhbGlkYXRlSW5wdXRTY29wZShzY29wZXM6IEFycmF5PHN0cmluZz4sIHNjb3Blc1JlcXVpcmVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCFzY29wZXMpIHtcbiAgICAgIGlmIChzY29wZXNSZXF1aXJlZCkge1xuICAgICAgICB0aHJvdyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3IuY3JlYXRlU2NvcGVzUmVxdWlyZWRFcnJvcihzY29wZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIHRoYXQgc2NvcGVzIGlzIGFuIGFycmF5IG9iamVjdCAoYWxzbyB0aHJvd3MgZXJyb3IgaWYgc2NvcGVzID09IG51bGwpXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNjb3BlcykpIHtcbiAgICAgIHRocm93IENsaWVudENvbmZpZ3VyYXRpb25FcnJvci5jcmVhdGVTY29wZXNOb25BcnJheUVycm9yKHNjb3Blcyk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGhhdCBzY29wZXMgaXMgbm90IGFuIGVtcHR5IGFycmF5XG4gICAgaWYgKHNjb3Blcy5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvdyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3IuY3JlYXRlRW1wdHlTY29wZXNBcnJheUVycm9yKHNjb3Blcy50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB0aGF0IGNsaWVudElkIGlzIHBhc3NlZCBhcyBzaW5nbGUgc2NvcGVcbiAgICBpZiAoc2NvcGVzLmluZGV4T2YodGhpcy5jbGllbnRJZCkgPiAtMSkge1xuICAgICAgaWYgKHNjb3Blcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRocm93IENsaWVudENvbmZpZ3VyYXRpb25FcnJvci5jcmVhdGVDbGllbnRJZFNpbmdsZVNjb3BlRXJyb3Ioc2NvcGVzLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqXG4gICAqIEV4dHJhY3RzIHNjb3BlIHZhbHVlIGZyb20gdGhlIHN0YXRlIHNlbnQgd2l0aCB0aGUgYXV0aGVudGljYXRpb24gcmVxdWVzdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHNjb3BlLlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBwcml2YXRlIGdldFNjb3BlRnJvbVN0YXRlKHN0YXRlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChzdGF0ZSkge1xuICAgICAgY29uc3Qgc3BsaXRJbmRleCA9IHN0YXRlLmluZGV4T2YoXCJ8XCIpO1xuICAgICAgaWYgKHNwbGl0SW5kZXggPiAtMSAmJiBzcGxpdEluZGV4ICsgMSA8IHN0YXRlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gc3RhdGUuc3Vic3RyaW5nKHNwbGl0SW5kZXggKyAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICAvKipcbiAgICogQGlnbm9yZVxuICAgKiBBcHBlbmRzIGV4dHJhU2NvcGVzVG9Db25zZW50IGlmIHBhc3NlZFxuICAgKiBAcGFyYW0ge0BsaW5rIEF1dGhlbnRpY2F0aW9uUGFyYW1ldGVyc31cbiAgICovXG4gIHByaXZhdGUgYXBwZW5kU2NvcGVzKHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uUGFyYW1ldGVycyk6IEFycmF5PHN0cmluZz4ge1xuXG4gICAgbGV0IHNjb3BlczogQXJyYXk8c3RyaW5nPjtcblxuICAgIGlmIChyZXF1ZXN0ICYmIHJlcXVlc3Quc2NvcGVzKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LmV4dHJhU2NvcGVzVG9Db25zZW50KSB7XG4gICAgICAgICAgICBzY29wZXMgPSBbLi4ucmVxdWVzdC5zY29wZXMsIC4uLnJlcXVlc3QuZXh0cmFTY29wZXNUb0NvbnNlbnRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICBzY29wZXMgPSByZXF1ZXN0LnNjb3BlcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzY29wZXM7XG4gIH1cblxuICAvLyNlbmRyZWdpb25cblxuICAvLyNyZWdpb24gQW5ndWxhclxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqXG4gICAqIEJyb2FkY2FzdCBtZXNzYWdlcyAtIFVzZWQgb25seSBmb3IgQW5ndWxhcj8gICpcbiAgICogQHBhcmFtIGV2ZW50TmFtZVxuICAgKiBAcGFyYW0gZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBicm9hZGNhc3QoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IHN0cmluZykge1xuICAgIGNvbnN0IGV2dCA9IG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHsgZGV0YWlsOiBkYXRhIH0pO1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gcmV0cmlldmUgdGhlIGNhY2hlZCB0b2tlblxuICAgKlxuICAgKiBAcGFyYW0gc2NvcGVzXG4gICAqIEBwYXJhbSB7QGxpbmsgQWNjb3VudH0gYWNjb3VudFxuICAgKiBAcGFyYW0gc3RhdGVcbiAgICogQHJldHVybiB7QGxpbmsgQXV0aFJlc3BvbnNlfSBBdXRoUmVzcG9uc2VcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDYWNoZWRUb2tlbkludGVybmFsKHNjb3BlcyA6IEFycmF5PHN0cmluZz4gLCBhY2NvdW50OiBBY2NvdW50LCBzdGF0ZTogc3RyaW5nKTogQXV0aFJlc3BvbnNlIHtcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgc2Vzc2lvbidzIGFjY291bnQgb2JqZWN0XG4gICAgY29uc3QgYWNjb3VudE9iamVjdDogQWNjb3VudCA9IGFjY291bnQgfHwgdGhpcy5nZXRBY2NvdW50KCk7XG4gICAgaWYgKCFhY2NvdW50T2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIENvbnN0cnVjdCBBdXRoZW50aWNhdGlvblJlcXVlc3QgYmFzZWQgb24gcmVzcG9uc2UgdHlwZVxuICAgIGNvbnN0IG5ld0F1dGhvcml0eSA9IHRoaXMuYXV0aG9yaXR5SW5zdGFuY2UgPyB0aGlzLmF1dGhvcml0eUluc3RhbmNlIDogQXV0aG9yaXR5RmFjdG9yeS5DcmVhdGVJbnN0YW5jZSh0aGlzLmF1dGhvcml0eSwgdGhpcy5jb25maWcuYXV0aC52YWxpZGF0ZUF1dGhvcml0eSk7XG4gICAgY29uc3QgcmVzcG9uc2VUeXBlID0gdGhpcy5nZXRUb2tlblR5cGUoYWNjb3VudE9iamVjdCwgc2NvcGVzLCB0cnVlKTtcbiAgICBjb25zdCBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QgPSBuZXcgU2VydmVyUmVxdWVzdFBhcmFtZXRlcnMoXG4gICAgICBuZXdBdXRob3JpdHksXG4gICAgICB0aGlzLmNsaWVudElkLFxuICAgICAgc2NvcGVzLFxuICAgICAgcmVzcG9uc2VUeXBlLFxuICAgICAgdGhpcy5nZXRSZWRpcmVjdFVyaSgpLFxuICAgICAgc3RhdGVcbiAgICApO1xuXG4gICAgLy8gZ2V0IGNhY2hlZCB0b2tlblxuICAgIHJldHVybiB0aGlzLmdldENhY2hlZFRva2VuKHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdCwgYWNjb3VudCk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKlxuICAgKiBHZXQgc2NvcGVzIGZvciB0aGUgRW5kcG9pbnQgLSBVc2VkIGluIEFuZ3VsYXIgdG8gdHJhY2sgcHJvdGVjdGVkIGFuZCB1bnByb3RlY3RlZCByZXNvdXJjZXMgd2l0aG91dCBpbnRlcmFjdGlvbiBmcm9tIHRoZSBkZXZlbG9wZXIgYXBwXG4gICAqXG4gICAqIEBwYXJhbSBlbmRwb2ludFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFNjb3Blc0ZvckVuZHBvaW50KGVuZHBvaW50OiBzdHJpbmcpIDogQXJyYXk8c3RyaW5nPiB7XG4gICAgLy8gaWYgdXNlciBzcGVjaWZpZWQgbGlzdCBvZiB1bnByb3RlY3RlZFJlc291cmNlcywgbm8gbmVlZCB0byBzZW5kIHRva2VuIHRvIHRoZXNlIGVuZHBvaW50cywgcmV0dXJuIG51bGwuXG4gICAgaWYgKHRoaXMuY29uZmlnLmZyYW1ld29yay51bnByb3RlY3RlZFJlc291cmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb25maWcuZnJhbWV3b3JrLnVucHJvdGVjdGVkUmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZW5kcG9pbnQuaW5kZXhPZih0aGlzLmNvbmZpZy5mcmFtZXdvcmsudW5wcm90ZWN0ZWRSZXNvdXJjZXNbaV0pID4gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHByb2Nlc3MgYWxsIHByb3RlY3RlZCByZXNvdXJjZXMgYW5kIHNlbmQgdGhlIG1hdGNoZWQgb25lXG4gICAgaWYgKHRoaXMuY29uZmlnLmZyYW1ld29yay5wcm90ZWN0ZWRSZXNvdXJjZU1hcC5zaXplID4gMCkge1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLmNvbmZpZy5mcmFtZXdvcmsucHJvdGVjdGVkUmVzb3VyY2VNYXAua2V5cygpKSkge1xuICAgICAgICAgICAgLy8gY29uZmlnRW5kcG9pbnQgaXMgbGlrZSAvYXBpL1RvZG8gcmVxdWVzdGVkIGVuZHBvaW50IGNhbiBiZSAvYXBpL1RvZG8vMVxuICAgICAgICAgICAgaWYgKGVuZHBvaW50LmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmZyYW1ld29yay5wcm90ZWN0ZWRSZXNvdXJjZU1hcC5nZXQoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmF1bHQgcmVzb3VyY2Ugd2lsbCBiZSBjbGllbnRpZCBpZiBub3RoaW5nIHNwZWNpZmllZFxuICAgIC8vIEFwcCB3aWxsIHVzZSBpZHRva2VuIGZvciBjYWxscyB0byBpdHNlbGZcbiAgICAvLyBjaGVjayBpZiBpdCdzIHN0YXJpbmcgZnJvbSBodHRwIG9yIGh0dHBzLCBuZWVkcyB0byBtYXRjaCB3aXRoIGFwcCBob3N0XG4gICAgaWYgKGVuZHBvaW50LmluZGV4T2YoXCJodHRwOi8vXCIpID4gLTEgfHwgZW5kcG9pbnQuaW5kZXhPZihcImh0dHBzOi8vXCIpID4gLTEpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0SG9zdEZyb21VcmkoZW5kcG9pbnQpID09PSB0aGlzLmdldEhvc3RGcm9tVXJpKHRoaXMuZ2V0UmVkaXJlY3RVcmkoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXk8c3RyaW5nPih0aGlzLmNsaWVudElkKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgLy8gaW4gYW5ndWxhciBsZXZlbCwgdGhlIHVybCBmb3IgJGh0dHAgaW50ZXJjZXB0b3IgY2FsbCBjb3VsZCBiZSByZWxhdGl2ZSB1cmwsXG4gICAgLy8gaWYgaXQncyByZWxhdGl2ZSBjYWxsLCB3ZSdsbCB0cmVhdCBpdCBhcyBhcHAgYmFja2VuZCBjYWxsLlxuICAgICAgICByZXR1cm4gbmV3IEFycmF5PHN0cmluZz4odGhpcy5jbGllbnRJZCk7XG4gICAgfVxuXG4gICAgLy8gaWYgbm90IHRoZSBhcHAncyBvd24gYmFja2VuZCBvciBub3QgYSBkb21haW4gbGlzdGVkIGluIHRoZSBlbmRwb2ludHMgc3RydWN0dXJlXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGJvb2xlYW4gZmxhZyB0byBkZXZlbG9wZXIgdG8gaGVscCBpbmZvcm0gaWYgbG9naW4gaXMgaW4gcHJvZ3Jlc3NcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUvZmFsc2VcbiAgICovXG4gIHB1YmxpYyBnZXRMb2dpbkluUHJvZ3Jlc3MoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcGVuZGluZ0NhbGxiYWNrID0gdGhpcy5jYWNoZVN0b3JhZ2UuZ2V0SXRlbShDb25zdGFudHMudXJsSGFzaCk7XG4gICAgaWYgKHBlbmRpbmdDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubG9naW5JblByb2dyZXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogQGlnbm9yZVxuICAgKlxuICAgKiBAcGFyYW0gbG9naW5JblByb2dyZXNzXG4gICAqL1xuICBwcm90ZWN0ZWQgc2V0bG9naW5JblByb2dyZXNzKGxvZ2luSW5Qcm9ncmVzcyA6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmxvZ2luSW5Qcm9ncmVzcyA9IGxvZ2luSW5Qcm9ncmVzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIEBpZ25vcmVcbiAgICpcbiAgICogcmV0dXJucyB0aGUgc3RhdHVzIG9mIGFjcXVpcmVUb2tlbkluUHJvZ3Jlc3NcbiAgICovXG4gIHByb3RlY3RlZCBnZXRBY3F1aXJlVG9rZW5JblByb2dyZXNzKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuYWNxdWlyZVRva2VuSW5Qcm9ncmVzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIEBpZ25vcmVcbiAgICpcbiAgICogQHBhcmFtIGFjcXVpcmVUb2tlbkluUHJvZ3Jlc3NcbiAgICovXG4gIHByb3RlY3RlZCBzZXRBY3F1aXJlVG9rZW5JblByb2dyZXNzKGFjcXVpcmVUb2tlbkluUHJvZ3Jlc3MgOiBib29sZWFuKSB7XG4gICAgICB0aGlzLmFjcXVpcmVUb2tlbkluUHJvZ3Jlc3MgPSBhY3F1aXJlVG9rZW5JblByb2dyZXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogQGlnbm9yZVxuICAgKlxuICAgKiByZXR1cm5zIHRoZSBsb2dnZXIgaGFuZGxlXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0TG9nZ2VyKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnN5c3RlbS5sb2dnZXI7XG4gIH1cblxuICAvLyNlbmRyZWdpb25cblxuICAvLyNyZWdpb24gR2V0dGVycyBhbmQgU2V0dGVyc1xuXG4gIC8qKlxuICAgKlxuICAgKiBVc2UgdG8gZ2V0IHRoZSByZWRpcmVjdCB1cmkgY29uZmlndXJlZCBpbiBNU0FMIG9yIG51bGwuXG4gICAqIEV2YWx1YXRlcyByZWRpcmVjdFVyaSBpZiBpdHMgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlIHNpbXBseSByZXR1cm5zIGl0cyB2YWx1ZS5cbiAgICogQHJldHVybnMge3N0cmluZ30gcmVkaXJlY3QgVVJMXG4gICAqXG4gICAqL1xuICBwdWJsaWMgZ2V0UmVkaXJlY3RVcmkoKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLmF1dGgucmVkaXJlY3RVcmkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmF1dGgucmVkaXJlY3RVcmkoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmF1dGgucmVkaXJlY3RVcmk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGdldCB0aGUgcG9zdCBsb2dvdXQgcmVkaXJlY3QgdXJpIGNvbmZpZ3VyZWQgaW4gTVNBTCBvciBudWxsLlxuICAgKiBFdmFsdWF0ZXMgcG9zdExvZ291dHJlZGlyZWN0VXJpIGlmIGl0cyBhIGZ1bmN0aW9uLCBvdGhlcndpc2Ugc2ltcGx5IHJldHVybnMgaXRzIHZhbHVlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBwb3N0IGxvZ291dCByZWRpcmVjdCBVUkxcbiAgICovXG4gIHB1YmxpYyBnZXRQb3N0TG9nb3V0UmVkaXJlY3RVcmkoKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLmF1dGgucG9zdExvZ291dFJlZGlyZWN0VXJpID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5hdXRoLnBvc3RMb2dvdXRSZWRpcmVjdFVyaSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcuYXV0aC5wb3N0TG9nb3V0UmVkaXJlY3RVcmk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGdldCB0aGUgY3VycmVudCB7QGxpbmsgQ29uZmlndXJhdGlvbn0gb2JqZWN0IGluIE1TQUxcbiAgICpcbiAgICogQHJldHVybnMge0BsaW5rIENvbmZpZ3VyYXRpb259XG4gICAqL1xuICBwdWJsaWMgZ2V0Q3VycmVudENvbmZpZ3VyYXRpb24oKTogQ29uZmlndXJhdGlvbiB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZykge1xuICAgICAgdGhyb3cgQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yLmNyZWF0ZU5vU2V0Q29uZmlndXJhdGlvbkVycm9yKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgfVxuXG4gIC8vI2VuZHJlZ2lvblxuXG4gIC8vI3JlZ2lvbiBTdHJpbmcgVXRpbCAoU2hvdWxkIGJlIGV4dHJhY3RlZCB0byBVdGlscy50cylcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKiBAaWdub3JlXG4gICAqXG4gICAqIFJldHVybnMgdGhlIGFuY2hvciBwYXJ0KCMpIG9mIHRoZSBVUkxcbiAgICovXG4gIHByaXZhdGUgZ2V0SGFzaChoYXNoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChoYXNoLmluZGV4T2YoXCIjL1wiKSA+IC0xKSB7XG4gICAgICBoYXNoID0gaGFzaC5zdWJzdHJpbmcoaGFzaC5pbmRleE9mKFwiIy9cIikgKyAyKTtcbiAgICB9IGVsc2UgaWYgKGhhc2guaW5kZXhPZihcIiNcIikgPiAtMSkge1xuICAgICAgaGFzaCA9IGhhc2guc3Vic3RyaW5nKDEpO1xuICAgIH1cblxuICAgIHJldHVybiBoYXNoO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogQGlnbm9yZVxuICAgKlxuICAgKiBleHRyYWN0IFVSSSBmcm9tIHRoZSBob3N0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBVUklcbiAgICogQHJldHVybnMge3N0cmluZ30gaG9zdCBmcm9tIHRoZSBVUklcbiAgICovXG4gIHByaXZhdGUgZ2V0SG9zdEZyb21VcmkodXJpOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIHJlbW92ZSBodHRwOi8vIG9yIGh0dHBzOi8vIGZyb20gdXJpXG4gICAgbGV0IGV4dHJhY3RlZFVyaSA9IFN0cmluZyh1cmkpLnJlcGxhY2UoL14oaHR0cHM/OilcXC9cXC8vLCBcIlwiKTtcbiAgICBleHRyYWN0ZWRVcmkgPSBleHRyYWN0ZWRVcmkuc3BsaXQoXCIvXCIpWzBdO1xuICAgIHJldHVybiBleHRyYWN0ZWRVcmk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKiBAaWdub3JlXG4gICAqXG4gICAqIFV0aWxzIGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGUgQXV0aGVudGljYXRpb25cbiAgICogQHBhcmFtIHtAbGluayBhY2NvdW50fSBhY2NvdW50IG9iamVjdFxuICAgKiBAcGFyYW0gc2NvcGVzXG4gICAqIEBwYXJhbSBzaWxlbnRDYWxsXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHRva2VuIHR5cGU6IGlkX3Rva2VuIG9yIGFjY2Vzc190b2tlblxuICAgKlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRUb2tlblR5cGUoYWNjb3VudE9iamVjdDogQWNjb3VudCwgc2NvcGVzOiBzdHJpbmdbXSwgc2lsZW50Q2FsbDogYm9vbGVhbik6IHN0cmluZyB7XG5cbiAgICAvLyBpZiBhY2NvdW50IGlzIHBhc3NlZCBhbmQgbWF0Y2hlcyB0aGUgYWNjb3VudCBvYmplY3Qvb3Igc2V0IHRvIGdldEFjY291bnQoKSBmcm9tIGNhY2hlXG4gICAgLy8gaWYgY2xpZW50LWlkIGlzIHBhc3NlZCBhcyBzY29wZSwgZ2V0IGlkX3Rva2VuIGVsc2UgdG9rZW4vaWRfdG9rZW5fdG9rZW4gKGluIGNhc2Ugbm8gc2Vzc2lvbiBleGlzdHMpXG4gICAgbGV0IHRva2VuVHlwZTogc3RyaW5nO1xuXG4gICAgLy8gYWNxdWlyZVRva2VuU2lsZW50XG4gICAgaWYgKHNpbGVudENhbGwpIHtcbiAgICAgIGlmIChVdGlscy5jb21wYXJlQWNjb3VudHMoYWNjb3VudE9iamVjdCwgdGhpcy5nZXRBY2NvdW50KCkpKSB7XG4gICAgICAgIHRva2VuVHlwZSA9IChzY29wZXMuaW5kZXhPZih0aGlzLmNvbmZpZy5hdXRoLmNsaWVudElkKSA+IC0xKSA/IFJlc3BvbnNlVHlwZXMuaWRfdG9rZW4gOiBSZXNwb25zZVR5cGVzLnRva2VuO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRva2VuVHlwZSAgPSAoc2NvcGVzLmluZGV4T2YodGhpcy5jb25maWcuYXV0aC5jbGllbnRJZCkgPiAtMSkgPyBSZXNwb25zZVR5cGVzLmlkX3Rva2VuIDogUmVzcG9uc2VUeXBlcy5pZF90b2tlbl90b2tlbjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRva2VuVHlwZTtcbiAgICB9XG4gICAgLy8gYWxsIG90aGVyIGNhc2VzXG4gICAgZWxzZSB7XG4gICAgICBpZiAoIVV0aWxzLmNvbXBhcmVBY2NvdW50cyhhY2NvdW50T2JqZWN0LCB0aGlzLmdldEFjY291bnQoKSkpIHtcbiAgICAgICAgICAgdG9rZW5UeXBlID0gUmVzcG9uc2VUeXBlcy5pZF90b2tlbl90b2tlbjtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0b2tlblR5cGUgPSAoc2NvcGVzLmluZGV4T2YodGhpcy5jbGllbnRJZCkgPiAtMSkgPyBSZXNwb25zZVR5cGVzLmlkX3Rva2VuIDogUmVzcG9uc2VUeXBlcy50b2tlbjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRva2VuVHlwZTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIEBpZ25vcmVcbiAgICpcbiAgICogU2V0cyB0aGUgY2FjaGVrZXlzIGZvciBhbmQgc3RvcmVzIHRoZSBhY2NvdW50IGluZm9ybWF0aW9uIGluIGNhY2hlXG4gICAqIEBwYXJhbSBhY2NvdW50XG4gICAqIEBwYXJhbSBzdGF0ZVxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBwcml2YXRlIHNldEFjY291bnRDYWNoZShhY2NvdW50OiBBY2NvdW50LCBzdGF0ZTogc3RyaW5nKSB7XG5cbiAgICAvLyBDYWNoZSBhY3F1aXJlVG9rZW5BY2NvdW50S2V5XG4gICAgbGV0IGFjY291bnRJZCA9IGFjY291bnQgPyB0aGlzLmdldEFjY291bnRJZChhY2NvdW50KSA6IENvbnN0YW50cy5ub19hY2NvdW50O1xuXG4gICAgY29uc3QgYWNxdWlyZVRva2VuQWNjb3VudEtleSA9IFN0b3JhZ2UuZ2VuZXJhdGVBY3F1aXJlVG9rZW5BY2NvdW50S2V5KGFjY291bnRJZCwgc3RhdGUpO1xuICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oYWNxdWlyZVRva2VuQWNjb3VudEtleSwgSlNPTi5zdHJpbmdpZnkoYWNjb3VudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogQGlnbm9yZVxuICAgKlxuICAgKiBTZXRzIHRoZSBjYWNoZUtleSBmb3IgYW5kIHN0b3JlcyB0aGUgYXV0aG9yaXR5IGluZm9ybWF0aW9uIGluIGNhY2hlXG4gICAqIEBwYXJhbSBzdGF0ZVxuICAgKiBAcGFyYW0gYXV0aG9yaXR5XG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHByaXZhdGUgc2V0QXV0aG9yaXR5Q2FjaGUoc3RhdGU6IHN0cmluZywgYXV0aG9yaXR5OiBzdHJpbmcpIHtcbiAgICAvLyBDYWNoZSBhdXRob3JpdHlLZXlcbiAgICBjb25zdCBhdXRob3JpdHlLZXkgPSBTdG9yYWdlLmdlbmVyYXRlQXV0aG9yaXR5S2V5KHN0YXRlKTtcbiAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKGF1dGhvcml0eUtleSwgVXRpbHMuQ2Fub25pY2FsaXplVXJpKGF1dGhvcml0eSksIHRoaXMuaW5Db29raWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYWNjb3VudCwgYXV0aG9yaXR5LCBhbmQgbm9uY2UgaW4gY2FjaGVcbiAgICogQHBhcmFtIHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdFxuICAgKiBAcGFyYW0gYWNjb3VudFxuICAgKiBAaGlkZGVuXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlQ2FjaGVFbnRyaWVzKHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdDogU2VydmVyUmVxdWVzdFBhcmFtZXRlcnMsIGFjY291bnQ6IEFjY291bnQsIGxvZ2luU3RhcnRQYWdlPzogYW55KSB7XG4gICAgLy8gQ2FjaGUgYWNjb3VudCBhbmQgYXV0aG9yaXR5XG4gICAgaWYgKGxvZ2luU3RhcnRQYWdlKSB7XG4gICAgICAvLyBDYWNoZSB0aGUgc3RhdGUsIG5vbmNlLCBhbmQgbG9naW4gcmVxdWVzdCBkYXRhXG4gICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKENvbnN0YW50cy5sb2dpblJlcXVlc3QsIGxvZ2luU3RhcnRQYWdlLCB0aGlzLmluQ29va2llKTtcbiAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLmxvZ2luRXJyb3IsIFwiXCIpO1xuXG4gICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKENvbnN0YW50cy5zdGF0ZUxvZ2luLCBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3Quc3RhdGUsIHRoaXMuaW5Db29raWUpO1xuICAgICAgdGhpcy5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMubm9uY2VJZFRva2VuLCBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3Qubm9uY2UsIHRoaXMuaW5Db29raWUpO1xuXG4gICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXRJdGVtKENvbnN0YW50cy5tc2FsRXJyb3IsIFwiXCIpO1xuICAgICAgdGhpcy5jYWNoZVN0b3JhZ2Uuc2V0SXRlbShDb25zdGFudHMubXNhbEVycm9yRGVzY3JpcHRpb24sIFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEFjY291bnRDYWNoZShhY2NvdW50LCBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3Quc3RhdGUpO1xuICAgIH1cbiAgICAvLyBDYWNoZSBhdXRob3JpdHlLZXlcbiAgICB0aGlzLnNldEF1dGhvcml0eUNhY2hlKHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5zdGF0ZSwgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LmF1dGhvcml0eSk7XG5cbiAgICAvLyBDYWNoZSBub25jZVxuICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldEl0ZW0oQ29uc3RhbnRzLm5vbmNlSWRUb2tlbiwgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0Lm5vbmNlLCB0aGlzLmluQ29va2llKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGxvZ2dlZCBpbiBhY2NvdW50XG4gICAqIEBwYXJhbSBhY2NvdW50XG4gICAqIEBoaWRkZW5cbiAgICogQGlnbm9yZVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRBY2NvdW50SWQoYWNjb3VudDogQWNjb3VudCk6IGFueSB7XG4gICAgLy9yZXR1cm4gYCR7YWNjb3VudC5hY2NvdW50SWRlbnRpZmllcn1gICsgQ29uc3RhbnRzLnJlc291cmNlRGVsaW1pdGVyICsgYCR7YWNjb3VudC5ob21lQWNjb3VudElkZW50aWZpZXJ9YDtcbiAgICBsZXQgYWNjb3VudElkOiBzdHJpbmc7XG4gICAgaWYgKCFVdGlscy5pc0VtcHR5KGFjY291bnQuaG9tZUFjY291bnRJZGVudGlmaWVyKSkge1xuICAgICAgICAgYWNjb3VudElkID0gYWNjb3VudC5ob21lQWNjb3VudElkZW50aWZpZXI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhY2NvdW50SWQgPSBDb25zdGFudHMubm9fYWNjb3VudDtcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjb3VudElkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogQGlnbm9yZVxuICAgKlxuICAgKiBDb25zdHJ1Y3QgJ3Rva2VuUmVxdWVzdCcgZnJvbSB0aGUgYXZhaWxhYmxlIGRhdGEgaW4gYWRhbElkVG9rZW5cbiAgICogQHBhcmFtIGV4dHJhUXVlcnlQYXJhbWV0ZXJzXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHByaXZhdGUgYnVpbGRJRFRva2VuUmVxdWVzdChyZXF1ZXN0OiBBdXRoZW50aWNhdGlvblBhcmFtZXRlcnMpOiBBdXRoZW50aWNhdGlvblBhcmFtZXRlcnMge1xuXG4gICAgbGV0IHRva2VuUmVxdWVzdDogQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzID0ge1xuICAgICAgc2NvcGVzOiBbdGhpcy5jbGllbnRJZF0sXG4gICAgICBhdXRob3JpdHk6IHRoaXMuYXV0aG9yaXR5LFxuICAgICAgYWNjb3VudDogdGhpcy5nZXRBY2NvdW50KCksXG4gICAgICBleHRyYVF1ZXJ5UGFyYW1ldGVyczogcmVxdWVzdC5leHRyYVF1ZXJ5UGFyYW1ldGVyc1xuICAgIH07XG5cbiAgICByZXR1cm4gdG9rZW5SZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICogQGlnbm9yZVxuICAgKlxuICAgKiBVdGlsaXR5IHRvIHBvcHVsYXRlIFF1ZXJ5UGFyYW1ldGVycyBhbmQgRXh0cmFRdWVyeVBhcmFtZXRlcnMgdG8gU2VydmVyUmVxdWVzdFBhcmFtZXJlcnNcbiAgICogQHBhcmFtIHJlcXVlc3RcbiAgICogQHBhcmFtIHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdFxuICAgKi9cbiAgcHJpdmF0ZSBwb3B1bGF0ZVF1ZXJ5UGFyYW1zKGFjY291bnQ6IEFjY291bnQsIHJlcXVlc3Q6IEF1dGhlbnRpY2F0aW9uUGFyYW1ldGVycywgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0OiBTZXJ2ZXJSZXF1ZXN0UGFyYW1ldGVycywgYWRhbElkVG9rZW5PYmplY3Q/OiBhbnkpOiBTZXJ2ZXJSZXF1ZXN0UGFyYW1ldGVycyB7XG5cbiAgICBsZXQgcXVlcnlQYXJhbWV0ZXJzOiBRUERpY3QgPSB7fTtcblxuICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAvLyBhZGQgdGhlIHByb21wdCBwYXJhbWV0ZXIgdG8gc2VydmVyUmVxdWVzdFBhcmFtZXRlcnMgaWYgcGFzc2VkXG4gICAgICBpZiAocmVxdWVzdC5wcm9tcHQpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVByb21wdFBhcmFtZXRlcihyZXF1ZXN0LnByb21wdCk7XG4gICAgICAgIHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdC5wcm9tcHRWYWx1ZSA9IHJlcXVlc3QucHJvbXB0O1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgY2xhaW1zIGNoYWxsZW5nZSB0byBzZXJ2ZXJSZXF1ZXN0UGFyYW1ldGVycyBpZiBwYXNzZWRcbiAgICAgIGlmIChyZXF1ZXN0LmNsYWltc1JlcXVlc3QpIHtcbiAgICAgICAgdmFsaWRhdGVDbGFpbXNSZXF1ZXN0KHJlcXVlc3QpO1xuICAgICAgICBzZXJ2ZXJBdXRoZW50aWNhdGlvblJlcXVlc3QuY2xhaW1zVmFsdWUgPSByZXF1ZXN0LmNsYWltc1JlcXVlc3Q7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoZSBkZXZlbG9wZXIgcHJvdmlkZXMgb25lIG9mIHRoZXNlLCBnaXZlIHByZWZlcmVuY2UgdG8gZGV2ZWxvcGVyIGNob2ljZVxuICAgICAgaWYgKFV0aWxzLmlzU1NPUGFyYW0ocmVxdWVzdCkpIHtcbiAgICAgICAgcXVlcnlQYXJhbWV0ZXJzID0gVXRpbHMuY29uc3RydWN0VW5pZmllZENhY2hlUXVlcnlQYXJhbWV0ZXIocmVxdWVzdCwgbnVsbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFkYWxJZFRva2VuT2JqZWN0KSB7XG4gICAgICBxdWVyeVBhcmFtZXRlcnMgPSBVdGlscy5jb25zdHJ1Y3RVbmlmaWVkQ2FjaGVRdWVyeVBhcmFtZXRlcihudWxsLCBhZGFsSWRUb2tlbk9iamVjdCk7XG4gICAgfVxuXG4gICAgLy8gYWRkcyBzaWQvbG9naW5faGludCBpZiBub3QgcG9wdWxhdGVkOyBwb3B1bGF0ZXMgZG9tYWluX3JlcSwgbG9naW5fcmVxIGFuZCBkb21haW5faGludFxuICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoXCJDYWxsaW5nIGFkZEhpbnQgcGFyYW1ldGVyc1wiKTtcbiAgICBxdWVyeVBhcmFtZXRlcnMgPSB0aGlzLmFkZEhpbnRQYXJhbWV0ZXJzKGFjY291bnQsIHF1ZXJ5UGFyYW1ldGVycywgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0KTtcblxuICAgIC8vIHNhbml0eSBjaGVjayBmb3IgZGV2ZWxvcGVyIHBhc3NlZCBleHRyYVF1ZXJ5UGFyYW1ldGVyc1xuICAgIGxldCBlUVBhcmFtczogUVBEaWN0O1xuICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICBlUVBhcmFtcyA9IHRoaXMuc2FuaXRpemVFUVBhcmFtcyhyZXF1ZXN0KTtcbiAgICB9XG5cbiAgICAvLyBQb3B1bGF0ZSB0aGUgZXh0cmFRdWVyeVBhcmFtZXRlcnMgdG8gYmUgc2VudCB0byB0aGUgc2VydmVyXG4gICAgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LnF1ZXJ5UGFyYW1ldGVycyA9IFV0aWxzLmdlbmVyYXRlUXVlcnlQYXJhbWV0ZXJzU3RyaW5nKHF1ZXJ5UGFyYW1ldGVycyk7XG4gICAgc2VydmVyQXV0aGVudGljYXRpb25SZXF1ZXN0LmV4dHJhUXVlcnlQYXJhbWV0ZXJzID0gVXRpbHMuZ2VuZXJhdGVRdWVyeVBhcmFtZXRlcnNTdHJpbmcoZVFQYXJhbXMpO1xuXG4gICAgcmV0dXJuIHNlcnZlckF1dGhlbnRpY2F0aW9uUmVxdWVzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqIEBpZ25vcmVcbiAgICpcbiAgICogVXRpbGl0eSB0byB0ZXN0IGlmIHZhbGlkIHByb21wdCB2YWx1ZSBpcyBwYXNzZWQgaW4gdGhlIHJlcXVlc3RcbiAgICogQHBhcmFtIHJlcXVlc3RcbiAgICovXG4gIHByaXZhdGUgdmFsaWRhdGVQcm9tcHRQYXJhbWV0ZXIgKHByb21wdDogc3RyaW5nKSB7XG4gICAgaWYgKCEoW1Byb21wdFN0YXRlLkxPR0lOLCBQcm9tcHRTdGF0ZS5TRUxFQ1RfQUNDT1VOVCwgUHJvbXB0U3RhdGUuQ09OU0VOVCwgUHJvbXB0U3RhdGUuTk9ORV0uaW5kZXhPZihwcm9tcHQpID49IDApKSB7XG4gICAgICAgIHRocm93IENsaWVudENvbmZpZ3VyYXRpb25FcnJvci5jcmVhdGVJbnZhbGlkUHJvbXB0RXJyb3IocHJvbXB0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKiBAaWdub3JlXG5cbiAgICogUmVtb3ZlcyB1bm5lY2Vzc2FyeSBvciBkdXBsaWNhdGUgcXVlcnkgcGFyYW1ldGVycyBmcm9tIGV4dHJhUXVlcnlQYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSByZXF1ZXN0XG4gICAqL1xuICBwcml2YXRlIHNhbml0aXplRVFQYXJhbXMocmVxdWVzdDogQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzKSA6IFFQRGljdCB7XG4gICAgbGV0IGVRUGFyYW1zIDogUVBEaWN0ID0gcmVxdWVzdC5leHRyYVF1ZXJ5UGFyYW1ldGVycztcbiAgICBpZiAoIWVRUGFyYW1zKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHJlcXVlc3QuY2xhaW1zUmVxdWVzdCkge1xuICAgICAgdGhpcy5sb2dnZXIud2FybmluZyhcIlJlbW92ZWQgZHVwbGljYXRlIGNsYWltcyBmcm9tIGV4dHJhUXVlcnlQYXJhbWV0ZXJzLiBQbGVhc2UgdXNlIGVpdGhlciB0aGUgY2xhaW1zUmVxdWVzdCBmaWVsZCBPUiBwYXNzIGFzIGV4dHJhUXVlcnlQYXJhbWV0ZXIgLSBub3QgYm90aC5cIik7XG4gICAgICBkZWxldGUgZVFQYXJhbXNbQ29uc3RhbnRzLmNsYWltc107XG4gICAgfVxuICAgIGRlbGV0ZSBlUVBhcmFtc1tTU09UeXBlcy5TSURdO1xuICAgIGRlbGV0ZSBlUVBhcmFtc1tTU09UeXBlcy5MT0dJTl9ISU5UXTtcbiAgICByZXR1cm4gZVFQYXJhbXM7XG4gIH1cblxuIC8vI2VuZHJlZ2lvblxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IENsaWVudEluZm8gfSBmcm9tIFwiLi9DbGllbnRJbmZvXCI7XG5pbXBvcnQgeyBJZFRva2VuIH0gZnJvbSBcIi4vSWRUb2tlblwiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG4vKipcbiAqIGFjY291bnRJZGVudGlmaWVyICAgICAgIGNvbWJpbmF0aW9uIG9mIGlkVG9rZW4udWlkIGFuZCBpZFRva2VuLnV0aWRcbiAqIGhvbWVBY2NvdW50SWRlbnRpZmllciAgIGNvbWJpbmF0aW9uIG9mIGNsaWVudEluZm8udWlkIGFuZCBjbGllbnRJbmZvLnV0aWRcbiAqIHVzZXJOYW1lICAgICAgICAgICAgICAgIGlkVG9rZW4ucHJlZmVycmVkX3VzZXJuYW1lXG4gKiBuYW1lICAgICAgICAgICAgICAgICAgICBpZFRva2VuLm5hbWVcbiAqIGlkVG9rZW4gICAgICAgICAgICAgICAgIGlkVG9rZW5cbiAqIHNpZCAgICAgICAgICAgICAgICAgICAgIGlkVG9rZW4uc2lkIC0gc2Vzc2lvbiBpZGVudGlmaWVyXG4gKiBlbnZpcm9ubWVudCAgICAgICAgICAgICBpZHRva2VuLmlzc3VlciAodGhlIGF1dGhvcml0eSB0aGF0IGlzc3VlcyB0aGUgdG9rZW4pXG4gKi9cbmV4cG9ydCBjbGFzcyBBY2NvdW50IHtcblxuICAgIGFjY291bnRJZGVudGlmaWVyOiBzdHJpbmc7XG4gICAgaG9tZUFjY291bnRJZGVudGlmaWVyOiBzdHJpbmc7XG4gICAgdXNlck5hbWU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaWRUb2tlbjogT2JqZWN0O1xuICAgIHNpZDogc3RyaW5nO1xuICAgIGVudmlyb25tZW50OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIEFjY291bnQgT2JqZWN0XG4gICAgICogQHByYXJhbSBhY2NvdW50SWRlbnRpZmllclxuICAgICAqIEBwYXJhbSBob21lQWNjb3VudElkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0gdXNlck5hbWVcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBpZFRva2VuXG4gICAgICogQHBhcmFtIHNpZFxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGFjY291bnRJZGVudGlmaWVyOiBzdHJpbmcsIGhvbWVBY2NvdW50SWRlbnRpZmllcjogc3RyaW5nLCB1c2VyTmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGlkVG9rZW46IE9iamVjdCwgc2lkOiBzdHJpbmcsICBlbnZpcm9ubWVudDogc3RyaW5nKSB7XG4gICAgICB0aGlzLmFjY291bnRJZGVudGlmaWVyID0gYWNjb3VudElkZW50aWZpZXI7XG4gICAgICB0aGlzLmhvbWVBY2NvdW50SWRlbnRpZmllciA9IGhvbWVBY2NvdW50SWRlbnRpZmllcjtcbiAgICAgIHRoaXMudXNlck5hbWUgPSB1c2VyTmFtZTtcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICB0aGlzLmlkVG9rZW4gPSBpZFRva2VuO1xuICAgICAgdGhpcy5zaWQgPSBzaWQ7XG4gICAgICB0aGlzLmVudmlyb25tZW50ID0gZW52aXJvbm1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIEBwYXJhbSBpZFRva2VuXG4gICAgICogQHBhcmFtIGNsaWVudEluZm9cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlQWNjb3VudChpZFRva2VuOiBJZFRva2VuLCBjbGllbnRJbmZvOiBDbGllbnRJbmZvKTogQWNjb3VudCB7XG5cbiAgICAgICAgLy8gY3JlYXRlIGFjY291bnRJZGVudGlmaWVyXG4gICAgICAgIGNvbnN0IGFjY291bnRJZGVudGlmaWVyOiBzdHJpbmcgPSBpZFRva2VuLm9iamVjdElkIHx8ICBpZFRva2VuLnN1YmplY3Q7XG5cbiAgICAgICAgLy8gY3JlYXRlIGhvbWVBY2NvdW50SWRlbnRpZmllclxuICAgICAgICBjb25zdCB1aWQ6IHN0cmluZyA9IGNsaWVudEluZm8gPyBjbGllbnRJbmZvLnVpZCA6IFwiXCI7XG4gICAgICAgIGNvbnN0IHV0aWQ6IHN0cmluZyA9IGNsaWVudEluZm8gPyBjbGllbnRJbmZvLnV0aWQgOiBcIlwiO1xuXG4gICAgICAgIGxldCBob21lQWNjb3VudElkZW50aWZpZXI6IHN0cmluZztcbiAgICAgICAgaWYgKCFVdGlscy5pc0VtcHR5KHVpZCkgJiYgIVV0aWxzLmlzRW1wdHkodXRpZCkpIHtcbiAgICAgICAgICAgIGhvbWVBY2NvdW50SWRlbnRpZmllciA9IFV0aWxzLmJhc2U2NEVuY29kZVN0cmluZ1VybFNhZmUodWlkKSArIFwiLlwiICsgVXRpbHMuYmFzZTY0RW5jb2RlU3RyaW5nVXJsU2FmZSh1dGlkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEFjY291bnQoYWNjb3VudElkZW50aWZpZXIsIGhvbWVBY2NvdW50SWRlbnRpZmllciwgaWRUb2tlbi5wcmVmZXJyZWROYW1lLCBpZFRva2VuLm5hbWUsIGlkVG9rZW4uZGVjb2RlZElkVG9rZW4sIGlkVG9rZW4uc2lkLCBpZFRva2VuLmlzc3Vlcik7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IEF1dGhvcml0eSwgQXV0aG9yaXR5VHlwZSB9IGZyb20gXCIuL0F1dGhvcml0eVwiO1xuaW1wb3J0IHsgWGhyQ2xpZW50IH0gZnJvbSBcIi4vWEhSQ2xpZW50XCI7XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgQWFkQXV0aG9yaXR5IGV4dGVuZHMgQXV0aG9yaXR5IHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQWFkSW5zdGFuY2VEaXNjb3ZlcnlFbmRwb2ludDogc3RyaW5nID0gXCJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vY29tbW9uL2Rpc2NvdmVyeS9pbnN0YW5jZVwiO1xuXG4gIHByaXZhdGUgZ2V0IEFhZEluc3RhbmNlRGlzY292ZXJ5RW5kcG9pbnRVcmwoKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBgJHtBYWRBdXRob3JpdHkuQWFkSW5zdGFuY2VEaXNjb3ZlcnlFbmRwb2ludH0/YXBpLXZlcnNpb249MS4wJmF1dGhvcml6YXRpb25fZW5kcG9pbnQ9JHt0aGlzLkNhbm9uaWNhbEF1dGhvcml0eX1vYXV0aDIvdjIuMC9hdXRob3JpemVgO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGF1dGhvcml0eTogc3RyaW5nLCB2YWxpZGF0ZUF1dGhvcml0eTogYm9vbGVhbikge1xuICAgIHN1cGVyKGF1dGhvcml0eSwgdmFsaWRhdGVBdXRob3JpdHkpO1xuICB9XG5cbiAgcHVibGljIGdldCBBdXRob3JpdHlUeXBlKCk6IEF1dGhvcml0eVR5cGUge1xuICAgIHJldHVybiBBdXRob3JpdHlUeXBlLkFhZDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRydXN0ZWRIb3N0TGlzdDogYW55ID0ge1xuICAgIFwibG9naW4ud2luZG93cy5uZXRcIjogXCJsb2dpbi53aW5kb3dzLm5ldFwiLFxuICAgIFwibG9naW4uY2hpbmFjbG91ZGFwaS5jblwiOiBcImxvZ2luLmNoaW5hY2xvdWRhcGkuY25cIixcbiAgICBcImxvZ2luLmNsb3VkZ292YXBpLnVzXCI6IFwibG9naW4uY2xvdWRnb3ZhcGkudXNcIixcbiAgICBcImxvZ2luLm1pY3Jvc29mdG9ubGluZS5jb21cIjogXCJsb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tXCIsXG4gICAgXCJsb2dpbi5taWNyb3NvZnRvbmxpbmUuZGVcIjogXCJsb2dpbi5taWNyb3NvZnRvbmxpbmUuZGVcIixcbiAgICBcImxvZ2luLm1pY3Jvc29mdG9ubGluZS51c1wiOiBcImxvZ2luLm1pY3Jvc29mdG9ubGluZS51c1wiXG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHRvIHRoZSBPSURDIGVuZHBvaW50XG4gICAqIE9ubHkgcmVzcG9uZHMgd2l0aCB0aGUgZW5kcG9pbnRcbiAgICovXG4gIHB1YmxpYyBHZXRPcGVuSWRDb25maWd1cmF0aW9uRW5kcG9pbnRBc3luYygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgY29uc3QgcmVzdWx0UHJvbWlzZTogUHJvbWlzZTxzdHJpbmc+ID0gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgcmVzb2x2ZSh0aGlzLkRlZmF1bHRPcGVuSWRDb25maWd1cmF0aW9uRW5kcG9pbnQpKTtcblxuICAgIGlmICghdGhpcy5Jc1ZhbGlkYXRpb25FbmFibGVkKSB7XG4gICAgICByZXR1cm4gcmVzdWx0UHJvbWlzZTtcbiAgICB9XG5cbiAgICBsZXQgaG9zdDogc3RyaW5nID0gdGhpcy5DYW5vbmljYWxBdXRob3JpdHlVcmxDb21wb25lbnRzLkhvc3ROYW1lQW5kUG9ydDtcbiAgICBpZiAodGhpcy5Jc0luVHJ1c3RlZEhvc3RMaXN0KGhvc3QpKSB7XG4gICAgICByZXR1cm4gcmVzdWx0UHJvbWlzZTtcbiAgICB9XG5cbiAgICBsZXQgY2xpZW50OiBYaHJDbGllbnQgPSBuZXcgWGhyQ2xpZW50KCk7XG5cbiAgICByZXR1cm4gY2xpZW50LnNlbmRSZXF1ZXN0QXN5bmModGhpcy5BYWRJbnN0YW5jZURpc2NvdmVyeUVuZHBvaW50VXJsLCBcIkdFVFwiLCB0cnVlKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS50ZW5hbnRfZGlzY292ZXJ5X2VuZHBvaW50O1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgaG9zdCBpcyBpbiBhIGxpc3Qgb2YgdHJ1c3RlZCBob3N0c1xuICAgKiBAcGFyYW0ge3N0cmluZ30gVGhlIGhvc3QgdG8gbG9vayB1cFxuICAgKi9cbiAgcHVibGljIElzSW5UcnVzdGVkSG9zdExpc3QoaG9zdDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEFhZEF1dGhvcml0eS5UcnVzdGVkSG9zdExpc3RbaG9zdC50b0xvd2VyQ2FzZSgpXTtcbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8qKlxuICogWEhSIGNsaWVudCBmb3IgSlNPTiBlbmRwb2ludHNcbiAqIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2FzeW5jLXByb21pc2VcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIFhockNsaWVudCB7XG4gIHB1YmxpYyBzZW5kUmVxdWVzdEFzeW5jKHVybDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgZW5hYmxlQ2FjaGluZz86IGJvb2xlYW4pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCAvKmFzeW5jOiAqLyB0cnVlKTtcbiAgICAgIGlmIChlbmFibGVDYWNoaW5nKSB7XG4gICAgICAgIC8vIFRPRE86IChzaGl2YikgZW5zdXJlIHRoYXQgdGhpcyBjYW4gYmUgY2FjaGVkXG4gICAgICAgIC8vIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ2FjaGUtQ29udHJvbFwiLCBcIlB1YmxpY1wiKTtcbiAgICAgIH1cblxuICAgICAgeGhyLm9ubG9hZCA9IChldikgPT4ge1xuICAgICAgICAgIGlmICh4aHIuc3RhdHVzIDwgMjAwIHx8IHhoci5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgICAgICAgIHJlamVjdCh0aGlzLmhhbmRsZUVycm9yKHhoci5yZXNwb25zZVRleHQpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB2YXIganNvblJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHJlamVjdCh0aGlzLmhhbmRsZUVycm9yKHhoci5yZXNwb25zZVRleHQpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKGpzb25SZXNwb25zZSk7XG4gICAgICB9O1xuXG4gICAgICB4aHIub25lcnJvciA9IChldikgPT4ge1xuICAgICAgICByZWplY3QoeGhyLnN0YXR1cyk7XG4gICAgICB9O1xuXG4gICAgICBpZiAobWV0aG9kID09PSBcIkdFVFwiKSB7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVFcnJvcihyZXNwb25zZVRleHQ6IHN0cmluZyk6IGFueSB7XG4gICAgdmFyIGpzb25SZXNwb25zZTtcbiAgICB0cnkge1xuICAgICAganNvblJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpO1xuICAgICAgaWYgKGpzb25SZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgIHJldHVybiBqc29uUmVzcG9uc2UuZXJyb3I7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IHJlc3BvbnNlVGV4dDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VUZXh0O1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCIuL0xvZ2dlclwiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuXG4vLyBtYWtlIENhY2hlU3RvcmFnZSBhIGZpeGVkIHR5cGUgdG8gbGltaXQgaXQgdG8gc3BlY2lmaWMgaW5wdXRzXG5leHBvcnQgdHlwZSBDYWNoZUxvY2F0aW9uID0gXCJsb2NhbFN0b3JhZ2VcIiB8IFwic2Vzc2lvblN0b3JhZ2VcIjtcblxuLyoqXG4gKiBEZWZhdWx0cyBmb3IgdGhlIENvbmZpZ3VyYXRpb24gT3B0aW9uc1xuICovXG5jb25zdCBGUkFNRV9USU1FT1VUID0gNjAwMDtcbmNvbnN0IE9GRlNFVCA9IDMwMDtcbmNvbnN0IE5BVklHQVRFX0ZSQU1FX1dBSVQgPSA1MDA7XG5cblxuLyoqXG4gKiAgQXV0aGVudGljYXRpb24gT3B0aW9uc1xuICpcbiAqICBjbGllbnRJZCAgICAgICAgICAgICAgICAgICAgLSBDbGllbnQgSUQgYXNzaWduZWQgdG8geW91ciBhcHAgYnkgQXp1cmUgQWN0aXZlIERpcmVjdG9yeVxuICogIGF1dGhvcml0eSAgICAgICAgICAgICAgICAgICAtIERldmVsb3BlciBjYW4gY2hvb3NlIHRvIHNlbmQgYW4gYXV0aG9yaXR5LCBkZWZhdWx0cyB0byBcIiBcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFRPRE86IEZvbGxvdyB1cCB3aXRoIHRoZSBhdXRob3JpdHkgZGlzY3Vzc2lvbiB3aXRoIHRoZSBQTXMgLSBVbnRpbCB0aGVuIHRoaXMgY29tbWVudCBpcyBhIHBsYWNlaG9sZGVyKVxuICogIHZhbGlkYXRlQXV0aG9yaXR5ICAgICAgICAgICAtIFVzZWQgdG8gdHVybiBhdXRob3JpdHkgdmFsaWRhdGlvbiBvbi9vZmYuIFdoZW4gc2V0IHRvIHRydWUgKGRlZmF1bHQpLCBNU0FMIHdpbGwgY29tcGFyZSB0aGUgYXBwbGljYXRpb24ncyBhdXRob3JpdHlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnYWluc3Qgd2VsbC1rbm93biBVUkxzIHRlbXBsYXRlcyByZXByZXNlbnRpbmcgd2VsbC1mb3JtZWQgYXV0aG9yaXRpZXMuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJdCBpcyB1c2VmdWwgd2hlbiB0aGUgYXV0aG9yaXR5IGlzIG9idGFpbmVkIGF0IHJ1biB0aW1lIHRvIHByZXZlbnQgTVNBTCBmcm9tIGRpc3BsYXlpbmcgYXV0aGVudGljYXRpb24gcHJvbXB0cyBmcm9tIG1hbGljaW91cyBwYWdlcy5cbiAqICByZWRpcmVjdFVyaSAgICAgICAgICAgICAgICAgLSBUaGUgcmVkaXJlY3QgVVJJIG9mIHRoZSBhcHBsaWNhdGlvbiwgdGhpcyBzaG91bGQgYmUgc2FtZSBhcyB0aGUgdmFsdWUgaW4gdGhlIGFwcGxpY2F0aW9uIHJlZ2lzdHJhdGlvbiBwb3J0YWwuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWZhdWx0cyB0byBgd2luZG93LmxvY2F0aW9uLmhyZWZgLlxuICogIHBvc3RMb2dvdXRSZWRpcmVjdFVyaSAgICAgICAtIFVzZWQgdG8gcmVkaXJlY3QgdGhlIHVzZXIgdG8gdGhpcyBsb2NhdGlvbiBhZnRlciBsb2dvdXQuIERlZmF1bHRzIHRvIGB3aW5kb3cubG9jYXRpb24uaHJlZmAuXG4gKiAgc3RhdGUgICAgICAgICAgICAgICAgICAgICAgIC0gVXNlIHRvIHNlbmQgdGhlIHN0YXRlIHBhcmFtZXRlciB3aXRoIGF1dGhlbnRpY2F0aW9uIHJlcXVlc3RcbiAqICBuYXZpZ2F0ZVRvTG9naW5SZXF1ZXN0VXJsICAgLSBVc2VkIHRvIHR1cm4gb2ZmIGRlZmF1bHQgbmF2aWdhdGlvbiB0byBzdGFydCBwYWdlIGFmdGVyIGxvZ2luLiBEZWZhdWx0IGlzIHRydWUuIFRoaXMgaXMgdXNlZCBvbmx5IGZvciByZWRpcmVjdCBmbG93cy5cbiAqXG4gKi9cbmV4cG9ydCB0eXBlIEF1dGhPcHRpb25zID0ge1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBhdXRob3JpdHk/OiBzdHJpbmc7XG4gIHZhbGlkYXRlQXV0aG9yaXR5PzogYm9vbGVhbjtcbiAgcmVkaXJlY3RVcmk/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKTtcbiAgcG9zdExvZ291dFJlZGlyZWN0VXJpPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XG4gIG5hdmlnYXRlVG9Mb2dpblJlcXVlc3RVcmw/OiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBDYWNoZSBPcHRpb25zXG4gKlxuICogY2FjaGVMb2NhdGlvbiAgICAgICAgICAgIC0gVXNlZCB0byBzcGVjaWZ5IHRoZSBjYWNoZUxvY2F0aW9uIHVzZXIgd2FudHMgdG8gc2V0OiBWYWxpZCB2YWx1ZXMgYXJlIFwibG9jYWxTdG9yYWdlXCIgYW5kIFwic2Vzc2lvblN0b3JhZ2VcIlxuICogc3RvcmVBdXRoU3RhdGVJbkNvb2tpZSAgIC0gSWYgc2V0LCB0aGUgbGlicmFyeSB3aWxsIHN0b3JlIHRoZSBhdXRoIHJlcXVlc3Qgc3RhdGUgcmVxdWlyZWQgZm9yIHZhbGlkYXRpb24gb2YgdGhlIGF1dGggZmxvd3MgaW4gdGhlIGJyb3dzZXIgY29va2llcy5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnkgZGVmYXVsdCB0aGlzIGZsYWcgaXMgc2V0IHRvIGZhbHNlLlxuICovXG5leHBvcnQgdHlwZSBDYWNoZU9wdGlvbnMgPSB7XG4gIGNhY2hlTG9jYXRpb24/OiBDYWNoZUxvY2F0aW9uO1xuICBzdG9yZUF1dGhTdGF0ZUluQ29va2llPzogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogTGlicmFyeSBTcGVjaWZpYyBPcHRpb25zXG4gKlxuICogbG9nZ2VyICAgICAgICAgICAgICAgICAgICAgICAtIFVzZWQgdG8gaW5pdGlhbGl6ZSB0aGUgTG9nZ2VyIG9iamVjdDsgVE9ETzogRXhwYW5kIG9uIGxvZ2dlciBkZXRhaWxzIG9yIGxpbmsgdG8gdGhlIGRvY3VtZW50YXRpb24gb24gbG9nZ2VyXG4gKiBsb2FkRnJhbWVUaW1lb3V0ICAgICAgICAgICAgIC0gbWF4aW11bSB0aW1lIHRoZSBsaWJyYXJ5IHNob3VsZCB3YWl0IGZvciBhIGZyYW1lIHRvIGxvYWRcbiAqIHRva2VuUmVuZXdhbE9mZnNldFNlY29uZHMgICAgLSBzZXRzIHRoZSB3aW5kb3cgb2Ygb2Zmc2V0IG5lZWRlZCB0byByZW5ldyB0aGUgdG9rZW4gYmVmb3JlIGV4cGlyeVxuICpcbiAqL1xuZXhwb3J0IHR5cGUgU3lzdGVtT3B0aW9ucyA9IHtcbiAgbG9nZ2VyPzogTG9nZ2VyO1xuICBsb2FkRnJhbWVUaW1lb3V0PzogbnVtYmVyO1xuICB0b2tlblJlbmV3YWxPZmZzZXRTZWNvbmRzPzogbnVtYmVyO1xuICBuYXZpZ2F0ZUZyYW1lV2FpdD86IG51bWJlcjtcbn07XG5cbi8qKlxuICogQXBwL0ZyYW1ld29yayBzcGVjaWZpYyBlbnZpcm9ubWVudCBTdXBwb3J0XG4gKlxuICogaXNBbmd1bGFyICAgICAgICAgICAgICAgIC0gZmxhZyBzZXQgdG8gZGV0ZXJtaW5lIGlmIGl0IGlzIEFuZ3VsYXIgRnJhbWV3b3JrLiBVc2VkIHRvIGJyb2FkY2FzdCB0b2tlbnMuIFRPRE86IGRldGFuZ2xlIHRoaXMgZGVwZW5kZW5jeSBmcm9tIGNvcmUuXG4gKiB1bnByb3RlY3RlZFJlc291cmNlcyAgICAgLSBBcnJheSBvZiBVUkkncyB3aGljaCBhcmUgdW5wcm90ZWN0ZWQgcmVzb3VyY2VzLiBNU0FMIHdpbGwgbm90IGF0dGFjaCBhIHRva2VuIHRvIG91dGdvaW5nIHJlcXVlc3RzIHRoYXQgaGF2ZSB0aGVzZSBVUkkuIERlZmF1bHRzIHRvICdudWxsJy5cbiAqIHByb3RlY3RlZFJlc291cmNlTWFwICAgICAtIFRoaXMgaXMgbWFwcGluZyBvZiByZXNvdXJjZXMgdG8gc2NvcGVzIHVzZWQgYnkgTVNBTCBmb3IgYXV0b21hdGljYWxseSBhdHRhY2hpbmcgYWNjZXNzIHRva2VucyBpbiB3ZWIgQVBJIGNhbGxzLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBIHNpbmdsZSBhY2Nlc3MgdG9rZW4gaXMgb2J0YWluZWQgZm9yIHRoZSByZXNvdXJjZS4gU28geW91IGNhbiBtYXAgYSBzcGVjaWZpYyByZXNvdXJjZSBwYXRoIGFzIGZvbGxvd3M6XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS92MS4wL21lXCIsIFtcInVzZXIucmVhZFwiXX0sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHRoZSBhcHAgVVJMIG9mIHRoZSByZXNvdXJjZSBhczoge1wiaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL1wiLCBbXCJ1c2VyLnJlYWRcIiwgXCJtYWlsLnNlbmRcIl19LlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIGlzIHJlcXVpcmVkIGZvciBDT1JTIGNhbGxzLlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgRnJhbWV3b3JrT3B0aW9ucyA9IHtcbiAgaXNBbmd1bGFyPzogYm9vbGVhbjtcbiAgdW5wcm90ZWN0ZWRSZXNvdXJjZXM/OiBBcnJheTxzdHJpbmc+O1xuICBwcm90ZWN0ZWRSZXNvdXJjZU1hcD86IE1hcDxzdHJpbmcsIEFycmF5PHN0cmluZz4+O1xufTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIE9iamVjdFxuICovXG5leHBvcnQgdHlwZSBDb25maWd1cmF0aW9uID0ge1xuICBhdXRoOiBBdXRoT3B0aW9ucyxcbiAgY2FjaGU/OiBDYWNoZU9wdGlvbnMsXG4gIHN5c3RlbT86IFN5c3RlbU9wdGlvbnMsXG4gIGZyYW1ld29yaz86IEZyYW1ld29ya09wdGlvbnNcbn07XG5cbmNvbnN0IERFRkFVTFRfQVVUSF9PUFRJT05TOiBBdXRoT3B0aW9ucyA9IHtcbiAgY2xpZW50SWQ6IFwiXCIsXG4gIGF1dGhvcml0eTogbnVsbCxcbiAgdmFsaWRhdGVBdXRob3JpdHk6IHRydWUsXG4gIHJlZGlyZWN0VXJpOiAoKSA9PiBVdGlscy5nZXREZWZhdWx0UmVkaXJlY3RVcmkoKSxcbiAgcG9zdExvZ291dFJlZGlyZWN0VXJpOiAoKSA9PiBVdGlscy5nZXREZWZhdWx0UmVkaXJlY3RVcmkoKSxcbiAgbmF2aWdhdGVUb0xvZ2luUmVxdWVzdFVybDogdHJ1ZVxufTtcblxuY29uc3QgREVGQVVMVF9DQUNIRV9PUFRJT05TOiBDYWNoZU9wdGlvbnMgPSB7XG4gIGNhY2hlTG9jYXRpb246IFwic2Vzc2lvblN0b3JhZ2VcIixcbiAgc3RvcmVBdXRoU3RhdGVJbkNvb2tpZTogZmFsc2Vcbn07XG5cbmNvbnN0IERFRkFVTFRfU1lTVEVNX09QVElPTlM6IFN5c3RlbU9wdGlvbnMgPSB7XG4gIGxvZ2dlcjogbmV3IExvZ2dlcihudWxsKSxcbiAgbG9hZEZyYW1lVGltZW91dDogRlJBTUVfVElNRU9VVCxcbiAgdG9rZW5SZW5ld2FsT2Zmc2V0U2Vjb25kczogT0ZGU0VULFxuICBuYXZpZ2F0ZUZyYW1lV2FpdDogTkFWSUdBVEVfRlJBTUVfV0FJVFxufTtcblxuY29uc3QgREVGQVVMVF9GUkFNRVdPUktfT1BUSU9OUzogRnJhbWV3b3JrT3B0aW9ucyA9IHtcbiAgaXNBbmd1bGFyOiBmYWxzZSxcbiAgdW5wcm90ZWN0ZWRSZXNvdXJjZXM6IG5ldyBBcnJheTxzdHJpbmc+KCksXG4gIHByb3RlY3RlZFJlc291cmNlTWFwOiBuZXcgTWFwPHN0cmluZywgQXJyYXk8c3RyaW5nPj4oKVxufTtcblxuLyoqXG4gKiBGdW5jdGlvbiB0byBzZXQgdGhlIGRlZmF1bHQgb3B0aW9ucyB3aGVuIG5vdCBleHBsaWNpdGx5IHNldFxuICpcbiAqIEBwYXJhbSBUQXV0aE9wdGlvbnNcbiAqIEBwYXJhbSBUQ2FjaGVPcHRpb25zXG4gKiBAcGFyYW0gVFN5c3RlbU9wdGlvbnNcbiAqIEBwYXJhbSBURnJhbWV3b3JrT3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRDb25maWd1cmF0aW9uIG9iamVjdFxuICovXG5cbi8vIGRlc3RydWN0dXJlIHdpdGggZGVmYXVsdCBzZXR0aW5nc1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQ29uZmlndXJhdGlvbih7IGF1dGgsIGNhY2hlID0ge30sIHN5c3RlbSA9IHt9LCBmcmFtZXdvcmsgPSB7fX06IENvbmZpZ3VyYXRpb24pOiBDb25maWd1cmF0aW9uIHtcbiAgY29uc3Qgb3ZlcmxheWVkQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xuICAgIGF1dGg6IHsgLi4uREVGQVVMVF9BVVRIX09QVElPTlMsIC4uLmF1dGggfSxcbiAgICBjYWNoZTogeyAuLi5ERUZBVUxUX0NBQ0hFX09QVElPTlMsIC4uLmNhY2hlIH0sXG4gICAgc3lzdGVtOiB7IC4uLkRFRkFVTFRfU1lTVEVNX09QVElPTlMsIC4uLnN5c3RlbSB9LFxuICAgIGZyYW1ld29yazogeyAuLi5ERUZBVUxUX0ZSQU1FV09SS19PUFRJT05TLCAuLi5mcmFtZXdvcmsgfVxuICB9O1xuICByZXR1cm4gb3ZlcmxheWVkQ29uZmlnO1xufVxuXG4iLCIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gXCIuL0FjY291bnRcIjtcbmltcG9ydCB7IENsaWVudENvbmZpZ3VyYXRpb25FcnJvciB9IGZyb20gXCIuL2Vycm9yL0NsaWVudENvbmZpZ3VyYXRpb25FcnJvclwiO1xuXG4vKipcbiAqIEtleS1WYWx1ZSB0eXBlIHRvIHN1cHBvcnQgcXVlcnlQYXJhbXMgYW5kIGV4dHJhUXVlcnlQYXJhbXNcbiAqL1xuZXhwb3J0IHR5cGUgUVBEaWN0ID0ge1trZXk6IHN0cmluZ106IHN0cmluZ307XG5cbi8qKlxuICogQGxpbmsgQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzfUF1dGhlbnRpY2F0aW9uUGFyYW1ldGVyc1xuICovXG5leHBvcnQgdHlwZSBBdXRoZW50aWNhdGlvblBhcmFtZXRlcnMgPSB7XG4gICAgc2NvcGVzPzogQXJyYXk8c3RyaW5nPjtcbiAgICBleHRyYVNjb3Blc1RvQ29uc2VudD86IEFycmF5PHN0cmluZz47XG4gICAgcHJvbXB0Pzogc3RyaW5nO1xuICAgIGV4dHJhUXVlcnlQYXJhbWV0ZXJzPzogUVBEaWN0O1xuICAgIGNsYWltc1JlcXVlc3Q/OiBzdHJpbmc7XG4gICAgYXV0aG9yaXR5Pzogc3RyaW5nO1xuICAgIHN0YXRlPzogc3RyaW5nO1xuICAgIGNvcnJlbGF0aW9uSWQ/OiBzdHJpbmc7XG4gICAgYWNjb3VudD86IEFjY291bnQ7XG4gICAgc2lkPzogc3RyaW5nO1xuICAgIGxvZ2luSGludD86IHN0cmluZztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUNsYWltc1JlcXVlc3QocmVxdWVzdDogQXV0aGVudGljYXRpb25QYXJhbWV0ZXJzKSB7XG4gICAgaWYgKCFyZXF1ZXN0LmNsYWltc1JlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgY2xhaW1zO1xuICAgIHRyeSB7XG4gICAgICAgIGNsYWltcyA9IEpTT04ucGFyc2UocmVxdWVzdC5jbGFpbXNSZXF1ZXN0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IENsaWVudENvbmZpZ3VyYXRpb25FcnJvci5jcmVhdGVDbGFpbXNSZXF1ZXN0UGFyc2luZ0Vycm9yKGUpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IE1vcmUgdmFsaWRhdGlvbiB3aWxsIGJlIGFkZGVkIHdoZW4gdGhlIHNlcnZlciB0ZWFtIHRlbGxzIHVzIGhvdyB0aGV5IGhhdmUgYWN0dWFsbHkgaW1wbGVtZW50ZWQgY2xhaW1zXG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tIFwiLi9TZXJ2ZXJFcnJvclwiO1xuXG5leHBvcnQgY29uc3QgSW50ZXJhY3Rpb25SZXF1aXJlZEF1dGhFcnJvck1lc3NhZ2UgPSB7XG4gICAgbG9naW5SZXF1aXJlZDoge1xuICAgICAgICBjb2RlOiBcImxvZ2luX3JlcXVpcmVkXCJcbiAgICB9LFxuICAgIGludGVyYWN0aW9uUmVxdWlyZWQ6IHtcbiAgICAgICAgY29kZTogXCJpbnRlcmFjdGlvbl9yZXF1aXJlZFwiXG4gICAgfSxcbiAgICBjb25zZW50UmVxdWlyZWQ6IHtcbiAgICAgICAgY29kZTogXCJjb25zZW50X3JlcXVpcmVkXCJcbiAgICB9LFxufTtcblxuLyoqXG4gKiBFcnJvciB0aHJvd24gd2hlbiB0aGUgdXNlciBpcyByZXF1aXJlZCB0byBwZXJmb3JtIGFuIGludGVyYWN0aXZlIHRva2VuIHJlcXVlc3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnRlcmFjdGlvblJlcXVpcmVkQXV0aEVycm9yIGV4dGVuZHMgU2VydmVyRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IoZXJyb3JDb2RlOiBzdHJpbmcsIGVycm9yTWVzc2FnZT86IHN0cmluZykge1xuICAgICAgICBzdXBlcihlcnJvckNvZGUsIGVycm9yTWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiSW50ZXJhY3Rpb25SZXF1aXJlZEF1dGhFcnJvclwiO1xuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBJbnRlcmFjdGlvblJlcXVpcmVkQXV0aEVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUxvZ2luUmVxdWlyZWRBdXRoRXJyb3IoZXJyb3JEZXNjOiBzdHJpbmcpOiBJbnRlcmFjdGlvblJlcXVpcmVkQXV0aEVycm9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcmFjdGlvblJlcXVpcmVkQXV0aEVycm9yKEludGVyYWN0aW9uUmVxdWlyZWRBdXRoRXJyb3JNZXNzYWdlLmxvZ2luUmVxdWlyZWQuY29kZSwgZXJyb3JEZXNjKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlSW50ZXJhY3Rpb25SZXF1aXJlZEF1dGhFcnJvcihlcnJvckRlc2M6IHN0cmluZyk6IEludGVyYWN0aW9uUmVxdWlyZWRBdXRoRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IEludGVyYWN0aW9uUmVxdWlyZWRBdXRoRXJyb3IoSW50ZXJhY3Rpb25SZXF1aXJlZEF1dGhFcnJvck1lc3NhZ2UuaW50ZXJhY3Rpb25SZXF1aXJlZC5jb2RlLCBlcnJvckRlc2MpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVDb25zZW50UmVxdWlyZWRBdXRoRXJyb3IoZXJyb3JEZXNjOiBzdHJpbmcpOiBJbnRlcmFjdGlvblJlcXVpcmVkQXV0aEVycm9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcmFjdGlvblJlcXVpcmVkQXV0aEVycm9yKEludGVyYWN0aW9uUmVxdWlyZWRBdXRoRXJyb3JNZXNzYWdlLmNvbnNlbnRSZXF1aXJlZC5jb2RlLCBlcnJvckRlc2MpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSBcIi4vQWNjb3VudFwiO1xuaW1wb3J0IHsgSWRUb2tlbiB9IGZyb20gXCIuL0lkVG9rZW5cIjtcblxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmV4cG9ydCB0eXBlIEF1dGhSZXNwb25zZSA9IHtcbiAgICB1bmlxdWVJZDogc3RyaW5nO1xuICAgIHRlbmFudElkOiBzdHJpbmc7XG4gICAgdG9rZW5UeXBlOiBzdHJpbmc7XG4gICAgaWRUb2tlbjogSWRUb2tlbjtcbiAgICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xuICAgIHNjb3BlczogQXJyYXk8c3RyaW5nPjtcbiAgICBleHBpcmVzT246IERhdGU7XG4gICAgYWNjb3VudDogQWNjb3VudDtcbiAgICBhY2NvdW50U3RhdGU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFJlc3BvbnNlU3RhdGVPbmx5KHN0YXRlOiBzdHJpbmcpIDogQXV0aFJlc3BvbnNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB1bmlxdWVJZDogXCJcIixcbiAgICAgICAgdGVuYW50SWQ6IFwiXCIsXG4gICAgICAgIHRva2VuVHlwZTogXCJcIixcbiAgICAgICAgaWRUb2tlbjogbnVsbCxcbiAgICAgICAgYWNjZXNzVG9rZW46IFwiXCIsXG4gICAgICAgIHNjb3BlczogbnVsbCxcbiAgICAgICAgZXhwaXJlc09uOiBudWxsLFxuICAgICAgICBhY2NvdW50OiBudWxsLFxuICAgICAgICBhY2NvdW50U3RhdGU6IHN0YXRlXG4gICAgfTtcbn1cbiIsImV4cG9ydCB7IFVzZXJBZ2VudEFwcGxpY2F0aW9uIH0gZnJvbSBcIi4vVXNlckFnZW50QXBwbGljYXRpb25cIjtcbmV4cG9ydCB7IExvZ2dlciB9IGZyb20gXCIuL0xvZ2dlclwiO1xuZXhwb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9Mb2dnZXJcIjtcbmV4cG9ydCB7IEFjY291bnQgfSBmcm9tIFwiLi9BY2NvdW50XCI7XG5leHBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmV4cG9ydCB7IEF1dGhvcml0eSB9IGZyb20gXCIuL0F1dGhvcml0eVwiO1xuZXhwb3J0IHsgQ2FjaGVSZXN1bHQgfSBmcm9tIFwiLi9Vc2VyQWdlbnRBcHBsaWNhdGlvblwiO1xuZXhwb3J0IHsgQ2FjaGVMb2NhdGlvbiwgQ29uZmlndXJhdGlvbiB9IGZyb20gXCIuL0NvbmZpZ3VyYXRpb25cIjtcbmV4cG9ydCB7IEF1dGhlbnRpY2F0aW9uUGFyYW1ldGVycyB9IGZyb20gXCIuL0F1dGhlbnRpY2F0aW9uUGFyYW1ldGVyc1wiO1xuZXhwb3J0IHsgQXV0aFJlc3BvbnNlIH0gZnJvbSBcIi4vQXV0aFJlc3BvbnNlXCI7XG5cbi8vIEVycm9yc1xuZXhwb3J0IHsgQXV0aEVycm9yIH0gZnJvbSBcIi4vZXJyb3IvQXV0aEVycm9yXCI7XG5leHBvcnQgeyBDbGllbnRBdXRoRXJyb3IgfSBmcm9tIFwiLi9lcnJvci9DbGllbnRBdXRoRXJyb3JcIjtcbmV4cG9ydCB7IFNlcnZlckVycm9yIH0gZnJvbSBcIi4vZXJyb3IvU2VydmVyRXJyb3JcIjtcbmV4cG9ydCB7IENsaWVudENvbmZpZ3VyYXRpb25FcnJvciB9IGZyb20gXCIuL2Vycm9yL0NsaWVudENvbmZpZ3VyYXRpb25FcnJvclwiO1xuZXhwb3J0IHsgSW50ZXJhY3Rpb25SZXF1aXJlZEF1dGhFcnJvciB9IGZyb20gXCIuL2Vycm9yL0ludGVyYWN0aW9uUmVxdWlyZWRBdXRoRXJyb3JcIjtcbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgQWNjZXNzVG9rZW5LZXkge1xuXG4gIGF1dGhvcml0eTogc3RyaW5nO1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBzY29wZXM6IHN0cmluZztcbiAgaG9tZUFjY291bnRJZGVudGlmaWVyOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoYXV0aG9yaXR5OiBzdHJpbmcsIGNsaWVudElkOiBzdHJpbmcsIHNjb3Blczogc3RyaW5nLCB1aWQ6IHN0cmluZywgdXRpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5hdXRob3JpdHkgPSBVdGlscy5DYW5vbmljYWxpemVVcmkoYXV0aG9yaXR5KTtcbiAgICB0aGlzLmNsaWVudElkID0gY2xpZW50SWQ7XG4gICAgdGhpcy5zY29wZXMgPSBzY29wZXM7XG4gICAgdGhpcy5ob21lQWNjb3VudElkZW50aWZpZXIgPSBVdGlscy5iYXNlNjRFbmNvZGVTdHJpbmdVcmxTYWZlKHVpZCkgKyBcIi5cIiArIFV0aWxzLmJhc2U2NEVuY29kZVN0cmluZ1VybFNhZmUodXRpZCk7XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIEFjY2Vzc1Rva2VuVmFsdWUge1xuXG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XG4gIGlkVG9rZW46IHN0cmluZztcbiAgZXhwaXJlc0luOiBzdHJpbmc7XG4gIGhvbWVBY2NvdW50SWRlbnRpZmllcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGFjY2Vzc1Rva2VuOiBzdHJpbmcsIGlkVG9rZW46IHN0cmluZywgZXhwaXJlc0luOiBzdHJpbmcsIGhvbWVBY2NvdW50SWRlbnRpZmllcjogc3RyaW5nKSB7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2VuO1xuICAgIHRoaXMuaWRUb2tlbiA9IGlkVG9rZW47XG4gICAgdGhpcy5leHBpcmVzSW4gPSBleHBpcmVzSW47XG4gICAgdGhpcy5ob21lQWNjb3VudElkZW50aWZpZXIgPSBob21lQWNjb3VudElkZW50aWZpZXI7XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBBdXRob3JpdHkgfSBmcm9tIFwiLi9BdXRob3JpdHlcIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuLyoqXG4gKiBOb25jZTogT0lEQyBOb25jZSBkZWZpbml0aW9uOiBodHRwczovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNJRFRva2VuXG4gKiBTdGF0ZTogT0F1dGggU3BlYzogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi0xMC4xMlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgU2VydmVyUmVxdWVzdFBhcmFtZXRlcnMge1xuXG4gIGF1dGhvcml0eUluc3RhbmNlOiBBdXRob3JpdHk7XG4gIGNsaWVudElkOiBzdHJpbmc7XG4gIHNjb3BlczogQXJyYXk8c3RyaW5nPjtcblxuICBub25jZTogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xuXG4gIC8vIHRlbGVtZXRyeSBpbmZvcm1hdGlvblxuICB4Q2xpZW50VmVyOiBzdHJpbmc7XG4gIHhDbGllbnRTa3U6IHN0cmluZztcbiAgY29ycmVsYXRpb25JZDogc3RyaW5nO1xuXG4gIHJlc3BvbnNlVHlwZTogc3RyaW5nO1xuICByZWRpcmVjdFVyaTogc3RyaW5nO1xuXG4gIHByb21wdFZhbHVlOiBzdHJpbmc7XG4gIGNsYWltc1ZhbHVlOiBzdHJpbmc7XG5cbiAgcXVlcnlQYXJhbWV0ZXJzOiBzdHJpbmc7XG4gIGV4dHJhUXVlcnlQYXJhbWV0ZXJzOiBzdHJpbmc7XG5cbiAgcHVibGljIGdldCBhdXRob3JpdHkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hdXRob3JpdHlJbnN0YW5jZSA/IHRoaXMuYXV0aG9yaXR5SW5zdGFuY2UuQ2Fub25pY2FsQXV0aG9yaXR5IDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gYXV0aG9yaXR5XG4gICAqIEBwYXJhbSBjbGllbnRJZFxuICAgKiBAcGFyYW0gc2NvcGVcbiAgICogQHBhcmFtIHJlc3BvbnNlVHlwZVxuICAgKiBAcGFyYW0gcmVkaXJlY3RVcmlcbiAgICogQHBhcmFtIHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoYXV0aG9yaXR5OiBBdXRob3JpdHksIGNsaWVudElkOiBzdHJpbmcsIHNjb3BlOiBBcnJheTxzdHJpbmc+LCByZXNwb25zZVR5cGU6IHN0cmluZywgcmVkaXJlY3RVcmk6IHN0cmluZywgc3RhdGU6IHN0cmluZyApIHtcbiAgICB0aGlzLmF1dGhvcml0eUluc3RhbmNlID0gYXV0aG9yaXR5O1xuICAgIHRoaXMuY2xpZW50SWQgPSBjbGllbnRJZDtcbiAgICB0aGlzLnNjb3BlcyA9IHNjb3BlO1xuXG4gICAgdGhpcy5ub25jZSA9IFV0aWxzLmNyZWF0ZU5ld0d1aWQoKTtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGUgJiYgIVV0aWxzLmlzRW1wdHkoc3RhdGUpID8gIFV0aWxzLmNyZWF0ZU5ld0d1aWQoKSArIFwifFwiICsgc3RhdGUgICA6IFV0aWxzLmNyZWF0ZU5ld0d1aWQoKTtcblxuICAgIC8vIFRPRE86IENoYW5nZSB0aGlzIHRvIHVzZXIgcGFzc2VkIHZzIGdlbmVyYXRlZCB3aXRoIHRoZSBuZXcgUFJcbiAgICB0aGlzLmNvcnJlbGF0aW9uSWQgPSBVdGlscy5jcmVhdGVOZXdHdWlkKCk7XG5cbiAgICAvLyB0ZWxlbWV0cnkgaW5mb3JtYXRpb25cbiAgICB0aGlzLnhDbGllbnRTa3UgPSBcIk1TQUwuSlNcIjtcbiAgICB0aGlzLnhDbGllbnRWZXIgPSBVdGlscy5nZXRMaWJyYXJ5VmVyc2lvbigpO1xuXG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGU7XG4gICAgdGhpcy5yZWRpcmVjdFVyaSA9IHJlZGlyZWN0VXJpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdlbmVyYXRlcyB0aGUgVVJMIHdpdGggUXVlcnlTdHJpbmcgUGFyYW1ldGVyc1xuICAgKiBAcGFyYW0gc2NvcGVzXG4gICAqL1xuICBjcmVhdGVOYXZpZ2F0ZVVybChzY29wZXM6IEFycmF5PHN0cmluZz4pOiBzdHJpbmcge1xuICAgIGNvbnN0IHN0ciA9IHRoaXMuY3JlYXRlTmF2aWdhdGlvblVybFN0cmluZyhzY29wZXMpO1xuICAgIGxldCBhdXRoRW5kcG9pbnQ6IHN0cmluZyA9IHRoaXMuYXV0aG9yaXR5SW5zdGFuY2UuQXV0aG9yaXphdGlvbkVuZHBvaW50O1xuICAgIC8vIGlmIHRoZSBlbmRwb2ludCBhbHJlYWR5IGhhcyBxdWVyeXBhcmFtcywgbGV0cyBhZGQgdG8gaXQsIG90aGVyd2lzZSBhZGQgdGhlIGZpcnN0IG9uZVxuICAgIGlmIChhdXRoRW5kcG9pbnQuaW5kZXhPZihcIj9cIikgPCAwKSB7XG4gICAgICBhdXRoRW5kcG9pbnQgKz0gXCI/XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF1dGhFbmRwb2ludCArPSBcIiZcIjtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0VXJsOiBzdHJpbmcgPSBgJHthdXRoRW5kcG9pbnR9JHtzdHIuam9pbihcIiZcIil9YDtcbiAgICByZXR1cm4gcmVxdWVzdFVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSB0aGUgYXJyYXkgb2YgYWxsIFF1ZXJ5U3RyaW5nUGFyYW1zIHRvIGJlIHNlbnQgdG8gdGhlIHNlcnZlclxuICAgKiBAcGFyYW0gc2NvcGVzXG4gICAqL1xuICBjcmVhdGVOYXZpZ2F0aW9uVXJsU3RyaW5nKHNjb3BlczogQXJyYXk8c3RyaW5nPik6IEFycmF5PHN0cmluZz4ge1xuICAgIGlmICghc2NvcGVzKSB7XG4gICAgICBzY29wZXMgPSBbdGhpcy5jbGllbnRJZF07XG4gICAgfVxuXG4gICAgaWYgKHNjb3Blcy5pbmRleE9mKHRoaXMuY2xpZW50SWQpID09PSAtMSkge1xuICAgICAgc2NvcGVzLnB1c2godGhpcy5jbGllbnRJZCk7XG4gICAgfVxuICAgIGNvbnN0IHN0cjogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIHN0ci5wdXNoKFwicmVzcG9uc2VfdHlwZT1cIiArIHRoaXMucmVzcG9uc2VUeXBlKTtcblxuICAgIHRoaXMudHJhbnNsYXRlY2xpZW50SWRVc2VkSW5TY29wZShzY29wZXMpO1xuICAgIHN0ci5wdXNoKFwic2NvcGU9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5wYXJzZVNjb3BlKHNjb3BlcykpKTtcbiAgICBzdHIucHVzaChcImNsaWVudF9pZD1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNsaWVudElkKSk7XG4gICAgc3RyLnB1c2goXCJyZWRpcmVjdF91cmk9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5yZWRpcmVjdFVyaSkpO1xuXG4gICAgc3RyLnB1c2goXCJzdGF0ZT1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnN0YXRlKSk7XG4gICAgc3RyLnB1c2goXCJub25jZT1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLm5vbmNlKSk7XG5cbiAgICBzdHIucHVzaChcImNsaWVudF9pbmZvPTFcIik7XG4gICAgc3RyLnB1c2goYHgtY2xpZW50LVNLVT0ke3RoaXMueENsaWVudFNrdX1gKTtcbiAgICBzdHIucHVzaChgeC1jbGllbnQtVmVyPSR7dGhpcy54Q2xpZW50VmVyfWApO1xuICAgIGlmICh0aGlzLnByb21wdFZhbHVlKSB7XG4gICAgICBzdHIucHVzaChcInByb21wdD1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnByb21wdFZhbHVlKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2xhaW1zVmFsdWUpIHtcbiAgICAgIHN0ci5wdXNoKFwiY2xhaW1zPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY2xhaW1zVmFsdWUpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5xdWVyeVBhcmFtZXRlcnMpIHtcbiAgICAgIHN0ci5wdXNoKHRoaXMucXVlcnlQYXJhbWV0ZXJzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5leHRyYVF1ZXJ5UGFyYW1ldGVycykge1xuICAgICAgc3RyLnB1c2godGhpcy5leHRyYVF1ZXJ5UGFyYW1ldGVycyk7XG4gICAgfVxuXG4gICAgc3RyLnB1c2goXCJjbGllbnQtcmVxdWVzdC1pZD1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvcnJlbGF0aW9uSWQpKTtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgLyoqXG4gICAqIGFwcGVuZCB0aGUgcmVxdWlyZWQgc2NvcGVzOiBodHRwczovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtYmFzaWMtMV8wLmh0bWwjU2NvcGVzXG4gICAqIEBwYXJhbSBzY29wZXNcbiAgICovXG4gIHRyYW5zbGF0ZWNsaWVudElkVXNlZEluU2NvcGUoc2NvcGVzOiBBcnJheTxzdHJpbmc+KTogdm9pZCB7XG4gICAgY29uc3QgY2xpZW50SWRJbmRleDogbnVtYmVyID0gc2NvcGVzLmluZGV4T2YodGhpcy5jbGllbnRJZCk7XG4gICAgaWYgKGNsaWVudElkSW5kZXggPj0gMCkge1xuICAgICAgc2NvcGVzLnNwbGljZShjbGllbnRJZEluZGV4LCAxKTtcbiAgICAgIGlmIChzY29wZXMuaW5kZXhPZihcIm9wZW5pZFwiKSA9PT0gLTEpIHtcbiAgICAgICAgc2NvcGVzLnB1c2goXCJvcGVuaWRcIik7XG4gICAgICB9XG4gICAgICBpZiAoc2NvcGVzLmluZGV4T2YoXCJwcm9maWxlXCIpID09PSAtMSkge1xuICAgICAgICBzY29wZXMucHVzaChcInByb2ZpbGVcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSBzY29wZXMgaW50byBhIGZvcm1hdHRlZCBzY29wZUxpc3RcbiAgICogQHBhcmFtIHNjb3Blc1xuICAgKi9cbiAgcGFyc2VTY29wZShzY29wZXM6IEFycmF5PHN0cmluZz4pOiBzdHJpbmcge1xuICAgIGxldCBzY29wZUxpc3Q6IHN0cmluZyA9IFwiXCI7XG4gICAgaWYgKHNjb3Blcykge1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgc2NvcGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHNjb3BlTGlzdCArPSAoaSAhPT0gc2NvcGVzLmxlbmd0aCAtIDEpID8gc2NvcGVzW2ldICsgXCIgXCIgOiBzY29wZXNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjb3BlTGlzdDtcbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcbmltcG9ydCB7IENsaWVudEF1dGhFcnJvciB9IGZyb20gXCIuL2Vycm9yL0NsaWVudEF1dGhFcnJvclwiO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIENsaWVudEluZm8ge1xuXG4gIHByaXZhdGUgX3VpZDogc3RyaW5nO1xuICBnZXQgdWlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3VpZCA/IHRoaXMuX3VpZCA6IFwiXCI7XG4gIH1cblxuICBzZXQgdWlkKHVpZDogc3RyaW5nKSB7XG4gICAgdGhpcy5fdWlkID0gdWlkO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXRpZDogc3RyaW5nO1xuICBnZXQgdXRpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl91dGlkID8gdGhpcy5fdXRpZCA6IFwiXCI7XG4gIH1cblxuICBzZXQgdXRpZCh1dGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91dGlkID0gdXRpZDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHJhd0NsaWVudEluZm86IHN0cmluZykge1xuICAgIGlmICghcmF3Q2xpZW50SW5mbyB8fCBVdGlscy5pc0VtcHR5KHJhd0NsaWVudEluZm8pKSB7XG4gICAgICB0aGlzLnVpZCA9IFwiXCI7XG4gICAgICB0aGlzLnV0aWQgPSBcIlwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkZWNvZGVkQ2xpZW50SW5mbzogc3RyaW5nID0gVXRpbHMuYmFzZTY0RGVjb2RlU3RyaW5nVXJsU2FmZShyYXdDbGllbnRJbmZvKTtcbiAgICAgIGNvbnN0IGNsaWVudEluZm86IENsaWVudEluZm8gPSA8Q2xpZW50SW5mbz5KU09OLnBhcnNlKGRlY29kZWRDbGllbnRJbmZvKTtcbiAgICAgIGlmIChjbGllbnRJbmZvKSB7XG4gICAgICAgIGlmIChjbGllbnRJbmZvLmhhc093blByb3BlcnR5KFwidWlkXCIpKSB7XG4gICAgICAgICAgdGhpcy51aWQgPSBjbGllbnRJbmZvLnVpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjbGllbnRJbmZvLmhhc093blByb3BlcnR5KFwidXRpZFwiKSkge1xuICAgICAgICAgIHRoaXMudXRpZCA9IGNsaWVudEluZm8udXRpZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IENsaWVudEF1dGhFcnJvci5jcmVhdGVDbGllbnRJbmZvRGVjb2RpbmdFcnJvcihlKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XG5pbXBvcnQgeyBDbGllbnRBdXRoRXJyb3IgfSBmcm9tIFwiLi9lcnJvci9DbGllbnRBdXRoRXJyb3JcIjtcblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBJZFRva2VuIHtcblxuICBpc3N1ZXI6IHN0cmluZztcbiAgb2JqZWN0SWQ6IHN0cmluZztcbiAgc3ViamVjdDogc3RyaW5nO1xuICB0ZW5hbnRJZDogc3RyaW5nO1xuICB2ZXJzaW9uOiBzdHJpbmc7XG4gIHByZWZlcnJlZE5hbWU6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBob21lT2JqZWN0SWQ6IHN0cmluZztcbiAgbm9uY2U6IHN0cmluZztcbiAgZXhwaXJhdGlvbjogc3RyaW5nO1xuICByYXdJZFRva2VuOiBzdHJpbmc7XG4gIGRlY29kZWRJZFRva2VuOiBPYmplY3Q7XG4gIHNpZDogc3RyaW5nO1xuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xuICBjb25zdHJ1Y3RvcihyYXdJZFRva2VuOiBzdHJpbmcpIHtcbiAgICBpZiAoVXRpbHMuaXNFbXB0eShyYXdJZFRva2VuKSkge1xuICAgICAgdGhyb3cgQ2xpZW50QXV0aEVycm9yLmNyZWF0ZUlkVG9rZW5OdWxsT3JFbXB0eUVycm9yKHJhd0lkVG9rZW4pO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgdGhpcy5yYXdJZFRva2VuID0gcmF3SWRUb2tlbjtcbiAgICAgIHRoaXMuZGVjb2RlZElkVG9rZW4gPSBVdGlscy5leHRyYWN0SWRUb2tlbihyYXdJZFRva2VuKTtcbiAgICAgIGlmICh0aGlzLmRlY29kZWRJZFRva2VuKSB7XG4gICAgICAgIGlmICh0aGlzLmRlY29kZWRJZFRva2VuLmhhc093blByb3BlcnR5KFwiaXNzXCIpKSB7XG4gICAgICAgICAgdGhpcy5pc3N1ZXIgPSB0aGlzLmRlY29kZWRJZFRva2VuW1wiaXNzXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGVjb2RlZElkVG9rZW4uaGFzT3duUHJvcGVydHkoXCJvaWRcIikpIHtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0SWQgPSB0aGlzLmRlY29kZWRJZFRva2VuW1wib2lkXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGVjb2RlZElkVG9rZW4uaGFzT3duUHJvcGVydHkoXCJzdWJcIikpIHtcbiAgICAgICAgICB0aGlzLnN1YmplY3QgPSB0aGlzLmRlY29kZWRJZFRva2VuW1wic3ViXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGVjb2RlZElkVG9rZW4uaGFzT3duUHJvcGVydHkoXCJ0aWRcIikpIHtcbiAgICAgICAgICB0aGlzLnRlbmFudElkID0gdGhpcy5kZWNvZGVkSWRUb2tlbltcInRpZFwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRlY29kZWRJZFRva2VuLmhhc093blByb3BlcnR5KFwidmVyXCIpKSB7XG4gICAgICAgICAgdGhpcy52ZXJzaW9uID0gdGhpcy5kZWNvZGVkSWRUb2tlbltcInZlclwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRlY29kZWRJZFRva2VuLmhhc093blByb3BlcnR5KFwicHJlZmVycmVkX3VzZXJuYW1lXCIpKSB7XG4gICAgICAgICAgdGhpcy5wcmVmZXJyZWROYW1lID0gdGhpcy5kZWNvZGVkSWRUb2tlbltcInByZWZlcnJlZF91c2VybmFtZVwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRlY29kZWRJZFRva2VuLmhhc093blByb3BlcnR5KFwibmFtZVwiKSkge1xuICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuZGVjb2RlZElkVG9rZW5bXCJuYW1lXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGVjb2RlZElkVG9rZW4uaGFzT3duUHJvcGVydHkoXCJub25jZVwiKSkge1xuICAgICAgICAgIHRoaXMubm9uY2UgPSB0aGlzLmRlY29kZWRJZFRva2VuW1wibm9uY2VcIl07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kZWNvZGVkSWRUb2tlbi5oYXNPd25Qcm9wZXJ0eShcImV4cFwiKSkge1xuICAgICAgICAgIHRoaXMuZXhwaXJhdGlvbiA9IHRoaXMuZGVjb2RlZElkVG9rZW5bXCJleHBcIl07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kZWNvZGVkSWRUb2tlbi5oYXNPd25Qcm9wZXJ0eShcImhvbWVfb2lkXCIpKSB7XG4gICAgICAgICAgICB0aGlzLmhvbWVPYmplY3RJZCA9IHRoaXMuZGVjb2RlZElkVG9rZW5bXCJob21lX29pZFwiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRlY29kZWRJZFRva2VuLmhhc093blByb3BlcnR5KFwic2lkXCIpKSB7XG4gICAgICAgICAgICB0aGlzLnNpZCA9IHRoaXMuZGVjb2RlZElkVG9rZW5bXCJzaWRcIl07XG4gICAgICAgIH1cbiAgICAgIC8qIHRzbGludDplbmFibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBUT0RPOiBUaGlzIGVycm9yIGhlcmUgd29uJ3QgcmVhbGx5IGV2ZXJ5IGJlIHRocm93biwgc2luY2UgZXh0cmFjdElkVG9rZW4oKSByZXR1cm5zIG51bGwgaWYgdGhlIGRlY29kZUp3dCgpIGZhaWxzLlxuICAgICAgLy8gTmVlZCB0byBhZGQgYmV0dGVyIGVycm9yIGhhbmRsaW5nIGhlcmUgdG8gYWNjb3VudCBmb3IgYmVpbmcgdW5hYmxlIHRvIGRlY29kZSBqd3RzLlxuICAgICAgdGhyb3cgQ2xpZW50QXV0aEVycm9yLmNyZWF0ZUlkVG9rZW5QYXJzaW5nRXJyb3IoZSk7XG4gICAgfVxuICB9XG5cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IEFjY2Vzc1Rva2VuQ2FjaGVJdGVtIH0gZnJvbSBcIi4vQWNjZXNzVG9rZW5DYWNoZUl0ZW1cIjtcbmltcG9ydCB7IENhY2hlTG9jYXRpb24gfSBmcm9tIFwiLi9Db25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBDYWNoZUtleXMgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7IENsaWVudENvbmZpZ3VyYXRpb25FcnJvciB9IGZyb20gXCIuL2Vycm9yL0NsaWVudENvbmZpZ3VyYXRpb25FcnJvclwiO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0b3JhZ2Ugey8vIFNpbmdsZXRvblxuXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBTdG9yYWdlO1xuICBwcml2YXRlIGxvY2FsU3RvcmFnZVN1cHBvcnRlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBzZXNzaW9uU3RvcmFnZVN1cHBvcnRlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBjYWNoZUxvY2F0aW9uOiBDYWNoZUxvY2F0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGNhY2hlTG9jYXRpb246IENhY2hlTG9jYXRpb24pIHtcbiAgICBpZiAoU3RvcmFnZS5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIFN0b3JhZ2UuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgdGhpcy5jYWNoZUxvY2F0aW9uID0gY2FjaGVMb2NhdGlvbjtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZVN1cHBvcnRlZCA9IHR5cGVvZiB3aW5kb3dbdGhpcy5jYWNoZUxvY2F0aW9uXSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3dbdGhpcy5jYWNoZUxvY2F0aW9uXSAhPSBudWxsO1xuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VTdXBwb3J0ZWQgPSB0eXBlb2Ygd2luZG93W2NhY2hlTG9jYXRpb25dICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvd1tjYWNoZUxvY2F0aW9uXSAhPSBudWxsO1xuICAgIFN0b3JhZ2UuaW5zdGFuY2UgPSB0aGlzO1xuICAgIGlmICghdGhpcy5sb2NhbFN0b3JhZ2VTdXBwb3J0ZWQgJiYgIXRoaXMuc2Vzc2lvblN0b3JhZ2VTdXBwb3J0ZWQpIHtcbiAgICAgIHRocm93IENsaWVudENvbmZpZ3VyYXRpb25FcnJvci5jcmVhdGVOb1N0b3JhZ2VTdXBwb3J0ZWRFcnJvcigpO1xuICAgIH1cblxuICAgIHJldHVybiBTdG9yYWdlLmluc3RhbmNlO1xuICB9XG5cbiAgICAvLyBhZGQgdmFsdWUgdG8gc3RvcmFnZVxuICAgIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGVuYWJsZUNvb2tpZVN0b3JhZ2U/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICh3aW5kb3dbdGhpcy5jYWNoZUxvY2F0aW9uXSkge1xuICAgICAgICAgICAgd2luZG93W3RoaXMuY2FjaGVMb2NhdGlvbl0uc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5hYmxlQ29va2llU3RvcmFnZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJdGVtQ29va2llKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0IG9uZSBpdGVtIGJ5IGtleSBmcm9tIHN0b3JhZ2VcbiAgICBnZXRJdGVtKGtleTogc3RyaW5nLCBlbmFibGVDb29raWVTdG9yYWdlPzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIGlmIChlbmFibGVDb29raWVTdG9yYWdlICYmIHRoaXMuZ2V0SXRlbUNvb2tpZShrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtQ29va2llKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvd1t0aGlzLmNhY2hlTG9jYXRpb25dKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93W3RoaXMuY2FjaGVMb2NhdGlvbl0uZ2V0SXRlbShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSB2YWx1ZSBmcm9tIHN0b3JhZ2VcbiAgICByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh3aW5kb3dbdGhpcy5jYWNoZUxvY2F0aW9uXSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1t0aGlzLmNhY2hlTG9jYXRpb25dLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNsZWFyIHN0b3JhZ2UgKHJlbW92ZSBhbGwgaXRlbXMgZnJvbSBpdClcbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHdpbmRvd1t0aGlzLmNhY2hlTG9jYXRpb25dKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93W3RoaXMuY2FjaGVMb2NhdGlvbl0uY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFsbEFjY2Vzc1Rva2VucyhjbGllbnRJZDogc3RyaW5nLCBob21lQWNjb3VudElkZW50aWZpZXI6IHN0cmluZyk6IEFycmF5PEFjY2Vzc1Rva2VuQ2FjaGVJdGVtPiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IEFycmF5PEFjY2Vzc1Rva2VuQ2FjaGVJdGVtPiA9IFtdO1xuICAgICAgICBsZXQgYWNjZXNzVG9rZW5DYWNoZUl0ZW06IEFjY2Vzc1Rva2VuQ2FjaGVJdGVtO1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gd2luZG93W3RoaXMuY2FjaGVMb2NhdGlvbl07XG4gICAgICAgIGlmIChzdG9yYWdlKSB7XG4gICAgICAgICAgICBsZXQga2V5OiBzdHJpbmc7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBzdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5Lm1hdGNoKGNsaWVudElkKSAmJiBrZXkubWF0Y2goaG9tZUFjY291bnRJZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuQ2FjaGVJdGVtID0gbmV3IEFjY2Vzc1Rva2VuQ2FjaGVJdGVtKEpTT04ucGFyc2Uoa2V5KSwgSlNPTi5wYXJzZSh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY2Nlc3NUb2tlbkNhY2hlSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICByZW1vdmVBY3F1aXJlVG9rZW5FbnRyaWVzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gd2luZG93W3RoaXMuY2FjaGVMb2NhdGlvbl07XG4gICAgICAgIGlmIChzdG9yYWdlKSB7XG4gICAgICAgICAgICBsZXQga2V5OiBzdHJpbmc7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBzdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LmluZGV4T2YoQ2FjaGVLZXlzLkFVVEhPUklUWSkgIT09IC0xIHx8IGtleS5pbmRleE9mKENhY2hlS2V5cy5BQ1FVSVJFX1RPS0VOX0FDQ09VTlQpICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGxpdEtleSA9IGtleS5zcGxpdChDb25zdGFudHMucmVzb3VyY2VEZWxpbWl0ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwbGl0S2V5Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHNwbGl0S2V5WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlICYmICF0aGlzLnRva2VuUmVuZXdhbEluUHJvZ3Jlc3Moc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKENvbnN0YW50cy5yZW5ld1N0YXR1cyArIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW0oQ29uc3RhbnRzLnN0YXRlTG9naW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbShDb25zdGFudHMuc3RhdGVBY3F1aXJlVG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SXRlbUNvb2tpZShrZXksIFwiXCIsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xlYXJDb29raWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRva2VuUmVuZXdhbEluUHJvZ3Jlc3Moc3RhdGVWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB3aW5kb3dbdGhpcy5jYWNoZUxvY2F0aW9uXTtcbiAgICAgICAgY29uc3QgcmVuZXdTdGF0dXMgPSBzdG9yYWdlW0NvbnN0YW50cy5yZW5ld1N0YXR1cyArIHN0YXRlVmFsdWVdO1xuICAgICAgICByZXR1cm4gISghcmVuZXdTdGF0dXMgfHwgcmVuZXdTdGF0dXMgIT09IENvbnN0YW50cy50b2tlblJlbmV3U3RhdHVzSW5Qcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgcmVzZXRDYWNoZUl0ZW1zKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gd2luZG93W3RoaXMuY2FjaGVMb2NhdGlvbl07XG4gICAgICAgIGlmIChzdG9yYWdlKSB7XG4gICAgICAgICAgICBsZXQga2V5OiBzdHJpbmc7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBzdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5LmluZGV4T2YoQ29uc3RhbnRzLm1zYWwpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRJdGVtKGtleSwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFjcXVpcmVUb2tlbkVudHJpZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEl0ZW1Db29raWUoY05hbWU6IHN0cmluZywgY1ZhbHVlOiBzdHJpbmcsIGV4cGlyZXM/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNvb2tpZVN0ciA9IGNOYW1lICsgXCI9XCIgKyBjVmFsdWUgKyBcIjtcIjtcbiAgICAgICAgaWYgKGV4cGlyZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGlyZVRpbWUgPSB0aGlzLmdldENvb2tpZUV4cGlyYXRpb25UaW1lKGV4cGlyZXMpO1xuICAgICAgICAgICAgY29va2llU3RyICs9IFwiZXhwaXJlcz1cIiArIGV4cGlyZVRpbWUgKyBcIjtcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZVN0cjtcbiAgICB9XG5cbiAgICBnZXRJdGVtQ29va2llKGNOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBuYW1lID0gY05hbWUgKyBcIj1cIjtcbiAgICAgICAgY29uc3QgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYyA9IGNhW2ldO1xuICAgICAgICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09PSBcIiBcIikge1xuICAgICAgICAgICAgICAgIGMgPSBjLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjLmluZGV4T2YobmFtZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICBnZXRDb29raWVFeHBpcmF0aW9uVGltZShjb29raWVMaWZlRGF5czogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBleHByID0gbmV3IERhdGUodG9kYXkuZ2V0VGltZSgpICsgY29va2llTGlmZURheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKTtcbiAgICAgICAgcmV0dXJuIGV4cHIudG9VVENTdHJpbmcoKTtcbiAgICB9XG5cbiAgICBjbGVhckNvb2tpZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRJdGVtQ29va2llKENvbnN0YW50cy5ub25jZUlkVG9rZW4sIFwiXCIsIC0xKTtcbiAgICAgICAgdGhpcy5zZXRJdGVtQ29va2llKENvbnN0YW50cy5zdGF0ZUxvZ2luLCBcIlwiLCAtMSk7XG4gICAgICAgIHRoaXMuc2V0SXRlbUNvb2tpZShDb25zdGFudHMubG9naW5SZXF1ZXN0LCBcIlwiLCAtMSk7XG4gICAgICAgIHRoaXMuc2V0SXRlbUNvb2tpZShDb25zdGFudHMuc3RhdGVBY3F1aXJlVG9rZW4sIFwiXCIsIC0xKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYWNxdWlyZVRva2VuQWNjb3VudEtleSB0byBjYWNoZSBhY2NvdW50IG9iamVjdFxuICAgICAqIEBwYXJhbSBhY2NvdW50SWRcbiAgICAgKiBAcGFyYW0gc3RhdGVcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2VuZXJhdGVBY3F1aXJlVG9rZW5BY2NvdW50S2V5KGFjY291bnRJZDogYW55LCBzdGF0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIENhY2hlS2V5cy5BQ1FVSVJFX1RPS0VOX0FDQ09VTlQgKyBDb25zdGFudHMucmVzb3VyY2VEZWxpbWl0ZXIgK1xuICAgICAgICAgICAgYCR7YWNjb3VudElkfWAgKyBDb25zdGFudHMucmVzb3VyY2VEZWxpbWl0ZXIgICsgYCR7c3RhdGV9YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYXV0aG9yaXR5S2V5IHRvIGNhY2hlIGF1dGhvcml0eVxuICAgICAqIEBwYXJhbSBzdGF0ZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZW5lcmF0ZUF1dGhvcml0eUtleShzdGF0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIENhY2hlS2V5cy5BVVRIT1JJVFkgKyBDb25zdGFudHMucmVzb3VyY2VEZWxpbWl0ZXIgKyBgJHtzdGF0ZX1gO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXG5pbXBvcnQgeyBBY2Nlc3NUb2tlbktleSB9IGZyb20gXCIuL0FjY2Vzc1Rva2VuS2V5XCI7XG5pbXBvcnQgeyBBY2Nlc3NUb2tlblZhbHVlIH0gZnJvbSBcIi4vQWNjZXNzVG9rZW5WYWx1ZVwiO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIEFjY2Vzc1Rva2VuQ2FjaGVJdGVtIHtcblxuICBrZXk6IEFjY2Vzc1Rva2VuS2V5O1xuICB2YWx1ZTogQWNjZXNzVG9rZW5WYWx1ZTtcblxuICBjb25zdHJ1Y3RvcihrZXk6IEFjY2Vzc1Rva2VuS2V5LCB2YWx1ZTogQWNjZXNzVG9rZW5WYWx1ZSkge1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG5cbi8qKlxuICogQGhpZGRlblxuICovXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XG5pbXBvcnQgeyBBYWRBdXRob3JpdHkgfSBmcm9tIFwiLi9BYWRBdXRob3JpdHlcIjtcbmltcG9ydCB7IEIyY0F1dGhvcml0eSB9IGZyb20gXCIuL0IyY0F1dGhvcml0eVwiO1xuaW1wb3J0IHsgQXV0aG9yaXR5LCBBdXRob3JpdHlUeXBlIH0gZnJvbSBcIi4vQXV0aG9yaXR5XCI7XG5pbXBvcnQgeyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlIH0gZnJvbSBcIi4vZXJyb3IvQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yXCI7XG5cbmV4cG9ydCBjbGFzcyBBdXRob3JpdHlGYWN0b3J5IHtcbiAgICAvKipcbiAgICAqIFBhcnNlIHRoZSB1cmwgYW5kIGRldGVybWluZSB0aGUgdHlwZSBvZiBhdXRob3JpdHlcbiAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIERldGVjdEF1dGhvcml0eUZyb21VcmwoYXV0aG9yaXR5VXJsOiBzdHJpbmcpOiBBdXRob3JpdHlUeXBlIHtcbiAgICAgICAgYXV0aG9yaXR5VXJsID0gVXRpbHMuQ2Fub25pY2FsaXplVXJpKGF1dGhvcml0eVVybCk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBVdGlscy5HZXRVcmxDb21wb25lbnRzKGF1dGhvcml0eVVybCk7XG4gICAgICAgIGNvbnN0IHBhdGhTZWdtZW50cyA9IGNvbXBvbmVudHMuUGF0aFNlZ21lbnRzO1xuICAgICAgICBzd2l0Y2ggKHBhdGhTZWdtZW50c1swXSkge1xuICAgICAgICAgICAgY2FzZSBcInRmcFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBBdXRob3JpdHlUeXBlLkIyQztcbiAgICAgICAgICAgIGNhc2UgXCJhZGZzXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEF1dGhvcml0eVR5cGUuQWRmcztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEF1dGhvcml0eVR5cGUuQWFkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBDcmVhdGUgYW4gYXV0aG9yaXR5IG9iamVjdCBvZiB0aGUgY29ycmVjdCB0eXBlIGJhc2VkIG9uIHRoZSB1cmxcbiAgICAqIFBlcmZvcm1zIGJhc2ljIGF1dGhvcml0eSB2YWxpZGF0aW9uIC0gY2hlY2tzIHRvIHNlZSBpZiB0aGUgYXV0aG9yaXR5IGlzIG9mIGEgdmFsaWQgdHlwZSAoZWcgYWFkLCBiMmMpXG4gICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIENyZWF0ZUluc3RhbmNlKGF1dGhvcml0eVVybDogc3RyaW5nLCB2YWxpZGF0ZUF1dGhvcml0eTogYm9vbGVhbik6IEF1dGhvcml0eSB7XG4gICAgICAgIGlmIChVdGlscy5pc0VtcHR5KGF1dGhvcml0eVVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHR5cGUgPSBBdXRob3JpdHlGYWN0b3J5LkRldGVjdEF1dGhvcml0eUZyb21VcmwoYXV0aG9yaXR5VXJsKTtcbiAgICAgICAgLy8gRGVwZW5kaW5nIG9uIGFib3ZlIGRldGVjdGlvbiwgY3JlYXRlIHRoZSByaWdodCB0eXBlLlxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQXV0aG9yaXR5VHlwZS5CMkM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCMmNBdXRob3JpdHkoYXV0aG9yaXR5VXJsLCB2YWxpZGF0ZUF1dGhvcml0eSk7XG4gICAgICAgICAgICBjYXNlIEF1dGhvcml0eVR5cGUuQWFkOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQWFkQXV0aG9yaXR5KGF1dGhvcml0eVVybCwgdmFsaWRhdGVBdXRob3JpdHkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlLmludmFsaWRBdXRob3JpdHlUeXBlO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblxuaW1wb3J0IHsgQWFkQXV0aG9yaXR5IH0gZnJvbSBcIi4vQWFkQXV0aG9yaXR5XCI7XG5pbXBvcnQgeyBBdXRob3JpdHksIEF1dGhvcml0eVR5cGUgfSBmcm9tIFwiLi9BdXRob3JpdHlcIjtcbmltcG9ydCB7IENsaWVudENvbmZpZ3VyYXRpb25FcnJvck1lc3NhZ2UgfSBmcm9tIFwiLi9lcnJvci9DbGllbnRDb25maWd1cmF0aW9uRXJyb3JcIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vVXRpbHNcIjtcblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBCMmNBdXRob3JpdHkgZXh0ZW5kcyBBYWRBdXRob3JpdHkge1xuICBwdWJsaWMgY29uc3RydWN0b3IoYXV0aG9yaXR5OiBzdHJpbmcsIHZhbGlkYXRlQXV0aG9yaXR5OiBib29sZWFuKSB7XG4gICAgc3VwZXIoYXV0aG9yaXR5LCB2YWxpZGF0ZUF1dGhvcml0eSk7XG4gICAgY29uc3QgdXJsQ29tcG9uZW50cyA9IFV0aWxzLkdldFVybENvbXBvbmVudHMoYXV0aG9yaXR5KTtcblxuICAgIGNvbnN0IHBhdGhTZWdtZW50cyA9IHVybENvbXBvbmVudHMuUGF0aFNlZ21lbnRzO1xuICAgIGlmIChwYXRoU2VnbWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgICB0aHJvdyBDbGllbnRDb25maWd1cmF0aW9uRXJyb3JNZXNzYWdlLmIyY0F1dGhvcml0eVVyaUludmFsaWRQYXRoO1xuICAgIH1cblxuICAgIHRoaXMuQ2Fub25pY2FsQXV0aG9yaXR5ID0gYGh0dHBzOi8vJHt1cmxDb21wb25lbnRzLkhvc3ROYW1lQW5kUG9ydH0vJHtwYXRoU2VnbWVudHNbMF19LyR7cGF0aFNlZ21lbnRzWzFdfS8ke3BhdGhTZWdtZW50c1syXX0vYDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgQXV0aG9yaXR5VHlwZSgpOiBBdXRob3JpdHlUeXBlIHtcbiAgICByZXR1cm4gQXV0aG9yaXR5VHlwZS5CMkM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHByb21pc2Ugd2l0aCB0aGUgVGVuYW50RGlzY292ZXJ5RW5kcG9pbnRcbiAgICovXG4gIHB1YmxpYyBHZXRPcGVuSWRDb25maWd1cmF0aW9uRW5kcG9pbnRBc3luYygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHJlc3VsdFByb21pc2UgPSBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICByZXNvbHZlKHRoaXMuRGVmYXVsdE9wZW5JZENvbmZpZ3VyYXRpb25FbmRwb2ludCkpO1xuXG4gICAgaWYgKCF0aGlzLklzVmFsaWRhdGlvbkVuYWJsZWQpIHtcbiAgICAgIHJldHVybiByZXN1bHRQcm9taXNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLklzSW5UcnVzdGVkSG9zdExpc3QodGhpcy5DYW5vbmljYWxBdXRob3JpdHlVcmxDb21wb25lbnRzLkhvc3ROYW1lQW5kUG9ydCkpIHtcbiAgICAgIHJldHVybiByZXN1bHRQcm9taXNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICByZWplY3QoQ2xpZW50Q29uZmlndXJhdGlvbkVycm9yTWVzc2FnZS51bnN1cHBvcnRlZEF1dGhvcml0eVZhbGlkYXRpb24pKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==