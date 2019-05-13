"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const glob = require("glob-stream");
const utils = require("../../utils");
const options = {
    cwd: path.join(process.cwd(), process.env.BENCHMARK_CWD),
    nosort: true,
    nounique: true,
    nodir: true
};
const timeStart = utils.timeStart();
const entries = [];
const stream = glob(['**/*', '!**/*.txt'], options);
stream.on('data', (data) => entries.push(data.path));
stream.on('error', () => process.exit(0));
stream.once('end', () => {
    const memory = utils.getMemory();
    const time = utils.timeEnd(timeStart);
    const measures = utils.getMeasures(entries.length, time, memory);
    console.info(measures);
});
