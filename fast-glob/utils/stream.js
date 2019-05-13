"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge2 = require("merge2");
/**
 * Merge multiple streams and propagate their errors into one stream in parallel.
 */
function merge(streams) {
    const mergedStream = merge2(streams);
    streams.forEach((stream) => {
        stream.on('error', (err) => mergedStream.emit('error', err));
    });
    return mergedStream;
}
exports.merge = merge;
