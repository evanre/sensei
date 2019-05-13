"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const micromatch = require("micromatch");
const glob = require("tiny-glob");
const utils = require("../../utils");
const options = {
    cwd: path.join(process.cwd(), process.env.BENCHMARK_CWD),
    flush: true
};
const patterns = ['**/*.md', '!**/*.txt'];
const timeStart = utils.timeStart();
glob('**/*', options)
    .then((matches) => {
    const memory = utils.getMemory();
    // The tiny-glob package does not support negative patterns
    const entries = micromatch(matches, patterns);
    const time = utils.timeEnd(timeStart);
    const measures = utils.getMeasures(entries.length, time, memory);
    console.info(measures);
})
    .catch(() => {
    process.exit(0);
});
