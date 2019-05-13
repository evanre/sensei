"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream = require("stream");
const fsStat = require("@nodelib/fs.stat");
const fs_1 = require("./fs");
class FileSystemStream extends fs_1.default {
    /**
     * Use stream API to read entries for Task.
     */
    read(patterns, filter) {
        const filepaths = patterns.map(this.getFullEntryPath, this);
        const transform = new stream.Transform({ objectMode: true });
        transform._transform = (index, _enc, done) => {
            return this.getEntry(filepaths[index], patterns[index]).then((entry) => {
                if (entry !== null && filter(entry)) {
                    transform.push(entry);
                }
                if (index === filepaths.length - 1) {
                    transform.end();
                }
                done();
            });
        };
        for (let i = 0; i < filepaths.length; i++) {
            transform.write(i);
        }
        return transform;
    }
    /**
     * Return entry for the provided path.
     */
    getEntry(filepath, pattern) {
        return this.getStat(filepath)
            .then((stat) => this.makeEntry(stat, pattern))
            .catch(() => null);
    }
    /**
     * Return fs.Stats for the provided path.
     */
    getStat(filepath) {
        return new Promise((resolve, reject) => {
            fsStat.stat(filepath, { throwErrorOnBrokenSymbolicLink: false }, (error, stats) => {
                error ? reject(error) : resolve(stats);
            });
        });
    }
}
exports.default = FileSystemStream;
