"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const globParent = require("glob-parent");
const isGlob = require("is-glob");
const micromatch = require("micromatch");
const GLOBSTAR = '**';
/**
 * Return true for static pattern.
 */
function isStaticPattern(pattern) {
    return !isDynamicPattern(pattern);
}
exports.isStaticPattern = isStaticPattern;
/**
 * Return true for pattern that looks like glob.
 */
function isDynamicPattern(pattern) {
    return isGlob(pattern, { strict: false });
}
exports.isDynamicPattern = isDynamicPattern;
/**
 * Returns negative pattern as positive pattern.
 */
function convertToPositivePattern(pattern) {
    return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
}
exports.convertToPositivePattern = convertToPositivePattern;
/**
 * Returns positive pattern as negative pattern.
 */
function convertToNegativePattern(pattern) {
    return '!' + pattern;
}
exports.convertToNegativePattern = convertToNegativePattern;
/**
 * Return true if provided pattern is negative pattern.
 */
function isNegativePattern(pattern) {
    return pattern.startsWith('!') && pattern[1] !== '(';
}
exports.isNegativePattern = isNegativePattern;
/**
 * Return true if provided pattern is positive pattern.
 */
function isPositivePattern(pattern) {
    return !isNegativePattern(pattern);
}
exports.isPositivePattern = isPositivePattern;
/**
 * Extracts negative patterns from array of patterns.
 */
function getNegativePatterns(patterns) {
    return patterns.filter(isNegativePattern);
}
exports.getNegativePatterns = getNegativePatterns;
/**
 * Extracts positive patterns from array of patterns.
 */
function getPositivePatterns(patterns) {
    return patterns.filter(isPositivePattern);
}
exports.getPositivePatterns = getPositivePatterns;
/**
 * Extract base directory from provided pattern.
 */
function getBaseDirectory(pattern) {
    return globParent(pattern);
}
exports.getBaseDirectory = getBaseDirectory;
/**
 * Return true if provided pattern has globstar.
 */
function hasGlobStar(pattern) {
    return pattern.indexOf(GLOBSTAR) !== -1;
}
exports.hasGlobStar = hasGlobStar;
/**
 * Return true if provided pattern ends with slash and globstar.
 */
function endsWithSlashGlobStar(pattern) {
    return pattern.endsWith('/' + GLOBSTAR);
}
exports.endsWithSlashGlobStar = endsWithSlashGlobStar;
/**
 * Returns «true» when pattern ends with a slash and globstar or the last partial of the pattern is static pattern.
 */
function isAffectDepthOfReadingPattern(pattern) {
    const basename = path.basename(pattern);
    return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
}
exports.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
/**
 * Return naive depth of provided pattern without depth of the base directory.
 */
function getNaiveDepth(pattern) {
    const base = getBaseDirectory(pattern);
    const patternDepth = pattern.split('/').length;
    const patternBaseDepth = base.split('/').length;
    /**
     * This is a hack for pattern that has no base directory.
     *
     * This is related to the `*\something\*` pattern.
     */
    if (base === '.') {
        return patternDepth - patternBaseDepth;
    }
    return patternDepth - patternBaseDepth - 1;
}
exports.getNaiveDepth = getNaiveDepth;
/**
 * Return max naive depth of provided patterns without depth of the base directory.
 */
function getMaxNaivePatternsDepth(patterns) {
    return patterns.reduce((max, pattern) => {
        const depth = getNaiveDepth(pattern);
        return depth > max ? depth : max;
    }, 0);
}
exports.getMaxNaivePatternsDepth = getMaxNaivePatternsDepth;
/**
 * Make RegExp for provided pattern.
 */
function makeRe(pattern, options) {
    return micromatch.makeRe(pattern, options);
}
exports.makeRe = makeRe;
/**
 * Convert patterns to regexps.
 */
function convertPatternsToRe(patterns, options) {
    return patterns.map((pattern) => makeRe(pattern, options));
}
exports.convertPatternsToRe = convertPatternsToRe;
/**
 * Returns true if the entry match any of the given RegExp's.
 */
function matchAny(entry, patternsRe) {
    const filepath = entry.replace(/^\.(\\\\|\/)/g, '');
    return patternsRe.some((patternRe) => patternRe.test(filepath));
}
exports.matchAny = matchAny;
