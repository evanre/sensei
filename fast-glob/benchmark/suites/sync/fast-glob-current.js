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
try {
    const matches = glob.sync(['**/*', '!**/*.txt'], settings);
    const memory = utils.getMemory();
    const time = utils.timeEnd(timeStart);
    const measures = utils.getMeasures(matches.length, time, memory);
    console.info(measures);
}
catch (_a) {
    process.exit(0);
}
