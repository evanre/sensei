"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readdir = require("@mrmlnc/readdir-enhanced");
const fs_sync_1 = require("../adapters/fs-sync");
const reader_1 = require("./reader");
class ReaderSync extends reader_1.default {
    constructor() {
        super(...arguments);
        this._fsAdapter = new fs_sync_1.default(this._settings);
    }
    dynamic(root, options) {
        return readdir.readdirSyncStat(root, options);
    }
    static(filepaths, options) {
        return this._fsAdapter.read(filepaths, options.filter);
    }
}
exports.default = ReaderSync;
