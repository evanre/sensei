"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fsStat = require("@nodelib/fs.stat");
const fs_1 = require("./fs");
class FileSystemSync extends fs_1.default {
    /**
     * Use sync API to read entries for Task.
     */
    read(patterns, filter) {
        const entries = [];
        patterns.forEach((pattern) => {
            const filepath = this.getFullEntryPath(pattern);
            const entry = this.getEntry(filepath, pattern);
            if (entry === null || !filter(entry)) {
                return;
            }
            entries.push(entry);
        });
        return entries;
    }
    /**
     * Return entry for the provided path.
     */
    getEntry(filepath, pattern) {
        try {
            const stat = this.getStat(filepath);
            return this.makeEntry(stat, pattern);
        }
        catch (err) {
            return null;
        }
    }
    /**
     * Return fs.Stats for the provided path.
     */
    getStat(filepath) {
        return fsStat.statSync(filepath, { throwErrorOnBrokenSymbolicLink: false });
    }
}
exports.default = FileSystemSync;
