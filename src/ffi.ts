import { dlopen, suffix, FFIType } from "bun:ffi";

const filename: string = `lib.${suffix}`;
const location: URL = new URL(filename, import.meta.url);

const { symbols } = dlopen(location.pathname, {
  freeString: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  createDb: {
    args: [FFIType.ptr],
    returns: FFIType.bool,
  },
  write: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.bool,
  },
  find: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  findOne: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
  removeOne: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr,
  },
});

export { symbols };
