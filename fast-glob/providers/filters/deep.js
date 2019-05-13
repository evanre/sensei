"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../../utils/index");
class DeepFilter {
    constructor(settings, micromatchOptions) {
        this.settings = settings;
        this.micromatchOptions = micromatchOptions;
    }
    /**
     * Returns filter for directories.
     */
    getFilter(positive, negative) {
        const maxPatternDepth = this.getMaxPatternDepth(positive);
        const negativeRe = this.getNegativePatternsRe(negative);
        return (entry) => this.filter(entry, negativeRe, maxPatternDepth);
    }
    /**
     * Returns max depth of the provided patterns.
     */
    getMaxPatternDepth(patterns) {
        const globstar = patterns.some(utils.pattern.hasGlobStar);
        return globstar ? Infinity : utils.pattern.getMaxNaivePatternsDepth(patterns);
    }
    /**
     * Returns RegExp's for patterns that can affect the depth of reading.
     */
    getNegativePatternsRe(patterns) {
        const affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern);
        return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this.micromatchOptions);
    }
    /**
     * Returns «true» for directory that should be read.
     */
    filter(entry, negativeRe, maxPatternDepth) {
        if (this.isSkippedByDeepOption(entry.depth)) {
            return false;
        }
        if (this.isSkippedByMaxPatternDepth(entry.depth, maxPatternDepth)) {
            return false;
        }
        if (this.isSkippedSymlinkedDirectory(entry)) {
            return false;
        }
        if (this.isSkippedDotDirectory(entry)) {
            return false;
        }
        return this.isSkippedByNegativePatterns(entry, negativeRe);
    }
    /**
     * Returns «true» when the «deep» option is disabled or number and depth of the entry is greater that the option value.
     */
    isSkippedByDeepOption(entryDepth) {
        return !this.settings.deep || (typeof this.settings.deep === 'number' && entryDepth >= this.settings.deep);
    }
    /**
     * Returns «true» when depth parameter is not an Infinity and entry depth greater that the parameter value.
     */
    isSkippedByMaxPatternDepth(entryDepth, maxPatternDepth) {
        return maxPatternDepth !== Infinity && entryDepth >= maxPatternDepth;
    }
    /**
     * Returns «true» for symlinked directory if the «followSymlinkedDirectories» option is disabled.
     */
    isSkippedSymlinkedDirectory(entry) {
        return !this.settings.followSymlinkedDirectories && entry.isSymbolicLink();
    }
    /**
     * Returns «true» for a directory whose name starts with a period if «dot» option is disabled.
     */
    isSkippedDotDirectory(entry) {
        return !this.settings.dot && utils.path.isDotDirectory(entry.path);
    }
    /**
     * Returns «true» for a directory whose path math to any negative pattern.
     */
    isSkippedByNegativePatterns(entry, negativeRe) {
        return !utils.pattern.matchAny(entry.path, negativeRe);
    }
}
exports.default = DeepFilter;
