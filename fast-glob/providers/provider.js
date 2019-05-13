"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils = require("../utils/index");
const deep_1 = require("./filters/deep");
const entry_1 = require("./filters/entry");
class Provider {
    constructor(settings) {
        this.settings = settings;
        this.micromatchOptions = this.getMicromatchOptions();
        this.entryFilter = new entry_1.default(settings, this.micromatchOptions);
        this.deepFilter = new deep_1.default(settings, this.micromatchOptions);
    }
    /**
     * Returns root path to scanner.
     */
    getRootDirectory(task) {
        return path.resolve(this.settings.cwd, task.base);
    }
    /**
     * Returns options for reader.
     */
    getReaderOptions(task) {
        return {
            basePath: task.base === '.' ? '' : task.base,
            filter: this.entryFilter.getFilter(task.positive, task.negative),
            deep: this.deepFilter.getFilter(task.positive, task.negative)
        };
    }
    /**
     * Returns options for micromatch.
     */
    getMicromatchOptions() {
        return {
            dot: this.settings.dot,
            nobrace: !this.settings.brace,
            noglobstar: !this.settings.globstar,
            noext: !this.settings.extglob,
            nocase: !this.settings.case,
            matchBase: this.settings.matchBase
        };
    }
    /**
     * Returns transformed entry.
     */
    transform(entry) {
        if (this.settings.absolute) {
            entry.path = utils.path.makeAbsolute(this.settings.cwd, entry.path);
        }
        if (this.settings.markDirectories && entry.isDirectory()) {
            entry.path += path.sep;
        }
        entry.path = utils.path.unixify(entry.path);
        const item = this.settings.stats ? entry : entry.path;
        if (this.settings.transform === null) {
            return item;
        }
        return this.settings.transform(item);
    }
    /**
     * Returns true if error has ENOENT code.
     */
    isEnoentCodeError(err) {
        return err.code === 'ENOENT';
    }
}
exports.default = Provider;
