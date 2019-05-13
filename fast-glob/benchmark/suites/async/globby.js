"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const glob = require("globby");
const utils = require("../../utils");
const options = {
    cwd: path.join(process.cwd(), process.env.BENCHMARK_CWD),
    unique: false
};
const timeStart = utils.timeStart();
glob(['**/*', '!**/*.txt'], options)
    .then((matches) => {
    const memory = utils.getMemory();
    const time = utils.timeEnd(timeStart);
    const measures = utils.getMeasures(matches.length, time, memory);
    console.info(measures);
})
    .catch(() => process.exit(0));