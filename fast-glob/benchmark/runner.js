"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const execa = require("execa");
const reporter_1 = require("./reporter");
const utils = require("./utils");
class Runner {
    constructor(basedir, options) {
        this.basedir = basedir;
        this.options = options;
    }
    /**
     * Runs child process.
     */
    execNodeProcess(args, options) {
        return execa.sync('node', args, options).stdout;
    }
    /**
     * Runs a single suite in the child process and returns the measurements of his work.
     */
    suite(suitePath) {
        const env = {
            NODE_ENV: 'production',
            BENCHMARK_CWD: this.basedir
        };
        const stdout = this.execNodeProcess([suitePath], { env, extendEnv: true });
        try {
            return JSON.parse(stdout);
        }
        catch (_a) {
            throw new TypeError('Ops! Broken suite run.');
        }
    }
    /**
     * Runs a pack of suites.
     */
    suitePack(suitePath, retries) {
        const results = {
            name: path.basename(suitePath),
            errors: 0,
            entries: 0,
            retries: retries + 1,
            measures: this.getSuitePackMeasures()
        };
        for (let i = 0; i < this.options.launches; i++) {
            try {
                const { matches, time, memory } = this.suite(suitePath);
                results.entries = matches;
                results.measures.time.raw.push(time);
                results.measures.memory.raw.push(memory);
            }
            catch (_a) {
                results.errors++;
                results.measures.time.raw.push(0);
                results.measures.memory.raw.push(0);
            }
        }
        results.measures = {
            time: this.getMeasures(results.measures.time.raw, 'ms'),
            memory: this.getMeasures(results.measures.memory.raw, 'MB')
        };
        return results;
    }
    report(result) {
        const reporter = new reporter_1.default(result);
        const report = reporter.toString();
        console.log(report);
    }
    packs() {
        const suitesPath = path.join(__dirname, 'suites', this.options.type);
        const suites = this.getSuites(suitesPath);
        for (const filepath of suites) {
            const suitePath = path.join(suitesPath, filepath);
            let result = this.suitePack(suitePath, 0);
            while (result.measures.time.stdev > this.options.maxStdev && result.retries < this.options.retries) {
                result = this.suitePack(suitePath, result.retries);
            }
            this.report(result);
        }
    }
    getSuites(suitesPath) {
        return fs.readdirSync(suitesPath).filter((suite) => suite.endsWith('.js'));
    }
    getMeasures(raw, units) {
        return {
            units,
            raw,
            average: utils.getAverageValue(raw),
            stdev: utils.getStdev(raw)
        };
    }
    getSuitePackMeasures() {
        return {
            time: this.getMeasures([], 'ms'),
            memory: this.getMeasures([], 'MB')
        };
    }
}
exports.default = Runner;
