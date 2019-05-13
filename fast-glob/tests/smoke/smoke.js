"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const Table = require("easy-table");
const glob = require("glob");
const fg = require("../../index");
/**
 * Runs the passed test suite.
 */
function suite(name, tests) {
    const testCases = getTestCases(tests);
    describe(name, () => {
        for (const test of testCases) {
            const title = getTestCaseTitle(test);
            const definition = getTestCaseMochaDefinition(test);
            definition(title, () => testCaseRunner(test));
        }
    });
}
exports.suite = suite;
/**
 * Return flatten list of test cases.
 */
function getTestCases(tests) {
    return [].concat(...tests);
}
/**
 * Return title for one of test cases.
 */
function getTestCaseTitle(test) {
    let title = `pattern: '${test.pattern}'`;
    if (test.ignore) {
        title += `, ignore: '${test.ignore}'`;
    }
    if (test.broken) {
        title += ` (broken - ${test.issue})`;
    }
    if (test.correct) {
        title += ' (correct)';
    }
    return title;
}
/**
 * Return test case definition for run.
 */
function getTestCaseMochaDefinition(test) {
    return test.debug ? it.only : it;
}
/**
 * Runs one of the passed test cases.
 */
function testCaseRunner(test) {
    const expected = getNodeGlobEntries(test.pattern, test.ignore, test.cwd, test.globOptions);
    const actual = getFastGlobEntries(test.pattern, test.ignore, test.cwd, test.fgOptions);
    if (test.debug) {
        const report = generateDebugReport(expected, actual);
        console.log(report);
    }
    if (test.broken && !test.issue) {
        assert.fail("This test is marked as «broken», but it doesn't have a issue key.");
    }
    if (test.correct && !test.reason) {
        assert.fail("This test is marked as «correct», but it doesn't have a reason.");
    }
    const assertAction = (test.broken || test.correct) ? assert.notDeepStrictEqual : assert.deepStrictEqual;
    assertAction(actual, expected);
}
/**
 * Generate debug information for the current run.
 */
function generateDebugReport(expected, actual) {
    const table = new Table();
    const items = actual.length > expected.length ? actual : expected;
    if (items.length === 0) {
        return null;
    }
    for (const item of items) {
        table.cell('FIXTURES', item);
        table.cell('NODE_GLOB', getTestMarker(expected, item));
        table.cell('FAST_GLOB', getTestMarker(actual, item));
        table.newRow();
    }
    return table.toString();
}
/**
 * Return marker for test.
 */
function getTestMarker(items, item) {
    return items.indexOf(item) !== -1 ? '+' : '-';
}
/**
 * Return entries from the `node-glob` package with sorting.
 */
function getNodeGlobEntries(pattern, ignore, cwd, opts) {
    const options = Object.assign({ cwd: cwd || process.cwd(), ignore: ignore ? [ignore] : [] }, opts);
    return glob.sync(pattern, options).sort();
}
/**
 * Return entries from the `fast-glob` package with sorting.
 */
function getFastGlobEntries(pattern, ignore, cwd, opts) {
    const options = Object.assign({ cwd: cwd || process.cwd(), ignore: ignore ? [ignore] : [], onlyFiles: false }, opts);
    return fg.sync(pattern, options).sort();
}
