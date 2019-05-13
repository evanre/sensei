"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readdir = require("@mrmlnc/readdir-enhanced");
const fs_stream_1 = require("../adapters/fs-stream");
const reader_1 = require("./reader");
class ReaderStream extends reader_1.default {
    constructor() {
        super(...arguments);
        this._fsAdapter = new fs_stream_1.default(this._settings);
    }
    dynamic(root, options) {
        return readdir.readdirStreamStat(root, options);
    }
    static(filepaths, options) {
        return this._fsAdapter.read(filepaths, options.filter);
    }
}
exports.default = ReaderStream;
