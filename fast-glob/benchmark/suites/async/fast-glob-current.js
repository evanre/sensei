"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const glob = require("../../../index");
const settings_1 = require("../../../settings");
const utils = require("../../utils");
const settings = new settings_1.default({
    cwd: path.join(process.cwd(), process.env.BENCHMARK_CWD),
    unique: false
});
const timeStart = utils.timeStart();
glob.async(['**/*', '!**/*.txt'], settings)
    .then((matches) => {
    const memory = utils.getMemory();
    const time = utils.timeEnd(timeStart);
    const measures = utils.getMeasures(matches.length, time, memory);
    console.info(measures);
})
    .catch(() => {
    process.exit(0);
});
