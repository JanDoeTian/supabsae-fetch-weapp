"use strict";

// ref: https://github.com/tc39/proposal-global
import { fetch as fallbackFetch } from './fallback-fetch';

var getGlobal = function() {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
}

var globalObject = getGlobal();

const fetchImpl = globalObject.fetch || fallbackFetch;

export const fetch = fetchImpl;

// ✅ FIX: avoid calling bind on undefined
export default typeof globalObject.fetch === 'function'
  ? globalObject.fetch.bind(globalObject)
  : fallbackFetch;

export const Headers = globalObject.Headers || fallbackFetch.Headers;
export const Request = globalObject.Request || fallbackFetch.Request;
export const Response = globalObject.Response || fallbackFetch.Response;