"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class FileSystem {
    constructor(settings) {
        this.settings = settings;
    }
    /**
     * Return full path to entry.
     */
    getFullEntryPath(filepath) {
        return path.resolve(this.settings.cwd, filepath);
    }
    /**
     * Return an implementation of the Entry interface.
     */
    makeEntry(stat, pattern) {
        stat.path = pattern;
        stat.depth = pattern.split(path.sep).length;
        return stat;
    }
}
exports.default = FileSystem;
