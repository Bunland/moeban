import { dlopen, suffix, FFIType } from "bun:ffi";

const { platform, arch } = process;

let filename: string;

if (platform === "linux" && arch === "x64") {
    filename = `../libs/lib.${suffix}`;
} else {
    filename = `../libs/lib.${suffix}`;
}

const { pathname } = new URL(filename, import.meta.url);

const { symbols } = dlopen(pathname, {
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
        args: [FFIType.ptr, FFIType.ptr],
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
