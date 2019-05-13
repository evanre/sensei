"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minimist = require("minimist");
const rimraf = require("rimraf");
const fixtures = require("./fixtures");
const logger = require("./logger");
const runner_1 = require("./runner");
const utils = require("./utils");
const defaultArgv = {
    basedir: '.benchmark',
    type: 'async',
    depth: utils.getEnvAsInteger('BENCHMARK_DEPTH') || 1,
    launches: utils.getEnvAsInteger('BENCHMARK_LAUNCHES') || 10,
    maxStdev: utils.getEnvAsInteger('BENCHMARK_MAX_STDEV') || 3,
    retries: utils.getEnvAsInteger('BENCHMARK_RETRIES') || 5
};
const argv = minimist(process.argv.slice(2), {
    default: defaultArgv
});
const runner = new runner_1.default(argv.basedir, argv);
logger.head('Remove olded fixtures');
rimraf.sync(argv.basedir);
logger.newline();
logger.head('Create fixtures');
fixtures.makeFixtures(argv.basedir, argv.depth);
logger.newline();
logger.head(`Benchmark for ${argv.depth} depth and ${argv.launches} launches (${argv.type})`);
logger.newline();
runner.packs();
logger.head('Remove fixtures');
rimraf.sync(argv.basedir);
