"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils/index");
/**
 * Generate tasks based on parent directory of each pattern.
 */
function generate(patterns, settings) {
    const positivePatterns = getPositivePatterns(patterns);
    const negativePatterns = getNegativePatternsAsPositive(patterns, settings.ignore);
    /**
     * When the `case` option is disabled, all patterns must be marked as dynamic, because we cannot check filepath
     * directly (without read directory).
     */
    const staticPatterns = !settings.case ? [] : positivePatterns.filter(utils.pattern.isStaticPattern);
    const dynamicPatterns = !settings.case ? positivePatterns : positivePatterns.filter(utils.pattern.isDynamicPattern);
    const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, /* dynamic */ false);
    const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, /* dynamic */ true);
    return staticTasks.concat(dynamicTasks);
}
exports.generate = generate;
/**
 * Convert patterns to tasks based on parent directory of each pattern.
 */
function convertPatternsToTasks(positive, negative, dynamic) {
    const positivePatternsGroup = groupPatternsByBaseDirectory(positive);
    // When we have a global group – there is no reason to divide the patterns into independent tasks.
    // In this case, the global task covers the rest.
    if ('.' in positivePatternsGroup) {
        const task = convertPatternGroupToTask('.', positive, negative, dynamic);
        return [task];
    }
    return convertPatternGroupsToTasks(positivePatternsGroup, negative, dynamic);
}
exports.convertPatternsToTasks = convertPatternsToTasks;
/**
 * Return only positive patterns.
 */
function getPositivePatterns(patterns) {
    return utils.pattern.getPositivePatterns(patterns);
}
exports.getPositivePatterns = getPositivePatterns;
/**
 * Return only negative patterns.
 */
function getNegativePatternsAsPositive(patterns, ignore) {
    const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore);
    const positive = negative.map(utils.pattern.convertToPositivePattern);
    return positive;
}
exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
/**
 * Group patterns by base directory of each pattern.
 */
function groupPatternsByBaseDirectory(patterns) {
    return patterns.reduce((collection, pattern) => {
        const base = utils.pattern.getBaseDirectory(pattern);
        if (base in collection) {
            collection[base].push(pattern);
        }
        else {
            collection[base] = [pattern];
        }
        return collection;
    }, {});
}
exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
/**
 * Convert group of patterns to tasks.
 */
function convertPatternGroupsToTasks(positive, negative, dynamic) {
    return Object.keys(positive).map((base) => {
        return convertPatternGroupToTask(base, positive[base], negative, dynamic);
    });
}
exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
/**
 * Create a task for positive and negative patterns.
 */
function convertPatternGroupToTask(base, positive, negative, dynamic) {
    return {
        base,
        dynamic,
        positive,
        negative,
        patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
    };
}
exports.convertPatternGroupToTask = convertPatternGroupToTask;
