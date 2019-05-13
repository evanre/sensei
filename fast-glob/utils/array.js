"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Flatten nested arrays (max depth is 2) into a non-nested array of non-array items.
 */
function flatten(items) {
    return items.reduce((collection, item) => [].concat(collection, item), []);
}
exports.flatten = flatten;
