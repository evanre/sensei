"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const stream = require("stream");
class FakeStream extends stream.Readable {
    constructor(value, error, opts) {
        super(opts);
        this.value = value;
        this.error = error;
    }
    _read() {
        if (this.error === null) {
            this.emit('data', this.value);
        }
        else {
            this.emit('error', this.error);
        }
        this.push(null);
    }
}
exports.FakeStream = FakeStream;
class EnoentErrnoException extends Error {
    constructor() {
        super();
        this.code = 'ENOENT';
    }
}
exports.EnoentErrnoException = EnoentErrnoException;
class FakeEntry extends fs.Stats {
    constructor(_options = {}) {
        super();
        this._options = _options;
        this.path = this._options.path || path.join('fixtures', 'entry');
        this.depth = this.path.split(path.sep).length - 2;
    }
    isFile() {
        return this._options.isFile || false;
    }
    isDirectory() {
        return this._options.isDirectory || false;
    }
    isSymbolicLink() {
        return this._options.isSymbolicLink || false;
    }
}
function getEntry(options = {}) {
    return new FakeEntry(options);
}
exports.getEntry = getEntry;
function getFileEntry(options = {}) {
    return new FakeEntry(Object.assign({ isFile: true, path: path.join('fixtures', 'file.txt') }, options));
}
exports.getFileEntry = getFileEntry;
function getDirectoryEntry(options = {}) {
    return new FakeEntry(Object.assign({ isDirectory: true, path: path.join('fixtures', 'directory') }, options));
}
exports.getDirectoryEntry = getDirectoryEntry;
