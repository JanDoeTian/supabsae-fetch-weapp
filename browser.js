"use strict";

import * as fallbackFetch from './fallback-fetch';

const getGlobal = function () {
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('unable to locate global object');
};

const globalObject = getGlobal();

const fetchImpl = globalObject.fetch || fallbackFetch.fetch;

export const fetch = fetchImpl;

export default typeof globalObject.fetch === 'function'
  ? globalObject.fetch.bind(globalObject)
  : fallbackFetch.fetch;

export const Headers = globalObject.Headers || fallbackFetch.Headers;
export const Request = globalObject.Request || fallbackFetch.Request;
export const Response = globalObject.Response || fallbackFetch.Response;