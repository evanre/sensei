"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taskManager = require("./managers/tasks");
const async_1 = require("./providers/async");
const stream_1 = require("./providers/stream");
const sync_1 = require("./providers/sync");
const settings_1 = require("./settings");
exports.Settings = settings_1.default;
const utils = require("./utils/index");
/**
 * Synchronous API.
 */
function sync(source, options) {
    assertPatternsInput(source);
    const works = getWorks(source, sync_1.default, options);
    return utils.array.flatten(works);
}
exports.sync = sync;
/**
 * Asynchronous API.
 */
function async(source, options) {
    try {
        assertPatternsInput(source);
    }
    catch (error) {
        return Promise.reject(error);
    }
    const works = getWorks(source, async_1.default, options);
    return Promise.all(works).then(utils.array.flatten);
}
exports.async = async;
/**
 * Stream API.
 */
function stream(source, options) {
    assertPatternsInput(source);
    const works = getWorks(source, stream_1.default, options);
    return utils.stream.merge(works);
}
exports.stream = stream;
/**
 * Return a set of tasks based on provided patterns.
 */
function generateTasks(source, options) {
    assertPatternsInput(source);
    const patterns = [].concat(source);
    const settings = new settings_1.default(options);
    return taskManager.generate(patterns, settings);
}
exports.generateTasks = generateTasks;
/**
 * Returns a set of works based on provided tasks and class of the provider.
 */
function getWorks(source, _Provider, options) {
    const patterns = [].concat(source);
    const settings = new settings_1.default(options);
    const tasks = taskManager.generate(patterns, settings);
    const provider = new _Provider(settings);
    return tasks.map(provider.read, provider);
}
function assertPatternsInput(source) {
    if ([].concat(source).every(isString)) {
        return;
    }
    throw new TypeError('Patterns must be a string or an array of strings');
}
function isString(source) {
    /* tslint:disable-next-line strict-type-predicates */
    return typeof source === 'string';
}
exports.default = async;
