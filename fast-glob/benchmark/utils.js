"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stdev = require("compute-stdev");
function convertHrtimeToMilliseconds(hrtime) {
    const nanoseconds = (hrtime[0] * 1e9) + hrtime[1];
    return nanoseconds / 1e6;
}
exports.convertHrtimeToMilliseconds = convertHrtimeToMilliseconds;
function convertBytesToMegaBytes(bytes) {
    return bytes / 1e6;
}
exports.convertBytesToMegaBytes = convertBytesToMegaBytes;
function timeStart() {
    return process.hrtime();
}
exports.timeStart = timeStart;
function timeEnd(start) {
    const hrtime = process.hrtime(start);
    return convertHrtimeToMilliseconds(hrtime);
}
exports.timeEnd = timeEnd;
function getMemory() {
    return process.memoryUsage().heapUsed / 1024 / 1024;
}
exports.getMemory = getMemory;
function getMeasures(matches, time, memory) {
    return JSON.stringify({ matches, time, memory });
}
exports.getMeasures = getMeasures;
function getAverageValue(raw) {
    return raw.reduce((a, b) => a + b, 0) / raw.length;
}
exports.getAverageValue = getAverageValue;
function getStdev(raw) {
    return stdev(raw);
}
exports.getStdev = getStdev;
function getEnvAsInteger(name) {
    const env = process.env[name];
    return env ? parseInt(env, 10) : undefined;
}
exports.getEnvAsInteger = getEnvAsInteger;
