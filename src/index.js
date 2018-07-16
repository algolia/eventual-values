import isObject from 'lodash.isobject';
const symbol = Symbol('pending');

export default function eventual() {
  return symbol;
}

export function isPending(value) {
  return value === symbol;
}

export function isError(value) {
  return value instanceof Error ||
    isObject(value) && value.message && value.stack;
}

export function isReady(value) {
  return !isPending(value) && !isError(value) && value !== undefined;
}

export function reject(error) {
  if (error instanceof Error) {
    return error;
  }

  return new Error(error);
}

export function resolve(value) {
  return value;
}

export function getOrElse(value, defaultValue) {
  if (isReady(value)) {
    return value;
  }

  return defaultValue;
}

export const get = getOrElse;

export function status(value) {
  if (isPending(value)) {
    return 'pending';
  } else if (isError(value)) {
    return 'error';
  } else if (isReady) {
    return 'ready';
  }

  return undefined;
}

eventual.resolve = resolve;
eventual.reject = reject;
eventual.isPending = isPending;
eventual.isReady = isReady;
eventual.isError = isError;
eventual.getOrElse = eventual.get = getOrElse;
eventual.status = status;
