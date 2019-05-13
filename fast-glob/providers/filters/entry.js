"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils = require("../../utils/index");
class EntryFilter {
    constructor(settings, micromatchOptions) {
        this.settings = settings;
        this.micromatchOptions = micromatchOptions;
        this.index = new Map();
    }
    /**
     * Returns filter for directories.
     */
    getFilter(positive, negative) {
        const positiveRe = utils.pattern.convertPatternsToRe(positive, this.micromatchOptions);
        const negativeRe = utils.pattern.convertPatternsToRe(negative, this.micromatchOptions);
        return (entry) => this.filter(entry, positiveRe, negativeRe);
    }
    /**
     * Returns true if entry must be added to result.
     */
    filter(entry, positiveRe, negativeRe) {
        // Exclude duplicate results
        if (this.settings.unique) {
            if (this.isDuplicateEntry(entry)) {
                return false;
            }
            this.createIndexRecord(entry);
        }
        // Filter files and directories by options
        if (this.onlyFileFilter(entry) || this.onlyDirectoryFilter(entry)) {
            return false;
        }
        if (this.isSkippedByAbsoluteNegativePatterns(entry, negativeRe)) {
            return false;
        }
        return this.isMatchToPatterns(entry.path, positiveRe) && !this.isMatchToPatterns(entry.path, negativeRe);
    }
    /**
     * Return true if the entry already has in the cross reader index.
     */
    isDuplicateEntry(entry) {
        return this.index.has(entry.path);
    }
    /**
     * Create record in the cross reader index.
     */
    createIndexRecord(entry) {
        this.index.set(entry.path, undefined);
    }
    /**
     * Returns true for non-files if the «onlyFiles» option is enabled.
     */
    onlyFileFilter(entry) {
        return this.settings.onlyFiles && !entry.isFile();
    }
    /**
     * Returns true for non-directories if the «onlyDirectories» option is enabled.
     */
    onlyDirectoryFilter(entry) {
        return this.settings.onlyDirectories && !entry.isDirectory();
    }
    /**
     * Return true when `absolute` option is enabled and matched to the negative patterns.
     */
    isSkippedByAbsoluteNegativePatterns(entry, negativeRe) {
        if (!this.settings.absolute) {
            return false;
        }
        const fullpath = utils.path.makeAbsolute(this.settings.cwd, entry.path);
        return this.isMatchToPatterns(fullpath, negativeRe);
    }
    /**
     * Return true when entry match to provided patterns.
     *
     * First, just trying to apply patterns to the path.
     * Second, trying to apply patterns to the path with final slash (need to micromatch to support «directory/**» patterns).
     */
    isMatchToPatterns(filepath, patternsRe) {
        return utils.pattern.matchAny(filepath, patternsRe) || utils.pattern.matchAny(filepath + path.sep, patternsRe);
    }
}
exports.default = EntryFilter;
