"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
/**
 * Returns «true» if the last partial of the path starting with a period.
 */
function isDotDirectory(filepath) {
    return path.basename(filepath).startsWith('.');
}
exports.isDotDirectory = isDotDirectory;
/**
 * Convert a windows-like path to a unix-style path.
 */
function unixify(filepath) {
    return filepath.replace(/\\/g, '/');
}
exports.unixify = unixify;
/**
 * Returns absolute path for provided filepath relative to cwd.
 */
function makeAbsolute(cwd, filepath) {
    return path.resolve(cwd, filepath);
}
exports.makeAbsolute = makeAbsolute;
