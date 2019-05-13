"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const runner_1 = require("./runner");
class RunnerFakeProcess extends runner_1.default {
    execNodeProcess() {
        return '{"matches":1,"time":1,"memory":1}';
    }
}
class RunnerFakeProcessError extends runner_1.default {
    execNodeProcess() {
        return 'error';
    }
}
class RunnerFakeReport extends RunnerFakeProcess {
    constructor() {
        super(...arguments);
        this.results = [];
    }
    report(results) {
        this.results.push(results);
    }
    getSuites() {
        return ['suite.js'];
    }
}
describe('Benchmark → Runner', () => {
    const runnerOptions = {
        type: 'async',
        depth: 1,
        launches: 3,
        maxStdev: 3,
        retries: 5
    };
    describe('.suite', () => {
        it('should returns measures', () => {
            const runner = new RunnerFakeProcess('basedir', {});
            const expected = {
                matches: 1,
                time: 1,
                memory: 1
            };
            const actual = runner.suite('suitePath');
            assert.deepStrictEqual(actual, expected);
        });
        it('should throw error', () => {
            const runner = new RunnerFakeProcessError('basedir', {});
            assert.throws(() => runner.suite('suitePath'), /Ops! Broken suite run\./);
        });
    });
    describe('.suitePack', () => {
        it('should returns pack measures', () => {
            const runner = new RunnerFakeProcess('basedir', runnerOptions);
            const expected = {
                name: 'suitePath',
                errors: 0,
                retries: 1,
                entries: 1,
                measures: {
                    time: { raw: [1, 1, 1], average: 1, stdev: 0, units: 'ms' },
                    memory: { raw: [1, 1, 1], average: 1, stdev: 0, units: 'MB' }
                }
            };
            const actual = runner.suitePack('suitePath', 0);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns pack measures with errors', () => {
            const runner = new RunnerFakeProcessError('basedir', runnerOptions);
            const expected = {
                name: 'suitePath',
                errors: 3,
                retries: 1,
                entries: 0,
                measures: {
                    time: { raw: [0, 0, 0], average: 0, stdev: 0, units: 'ms' },
                    memory: { raw: [0, 0, 0], average: 0, stdev: 0, units: 'MB' }
                }
            };
            const actual = runner.suitePack('suitePath', 0);
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.packs', () => {
        it('should run pack of suites', () => {
            const runner = new RunnerFakeReport('basedir', runnerOptions);
            const expected = [{
                    name: 'suite.js',
                    errors: 0,
                    entries: 1,
                    retries: 1,
                    measures: {
                        time: { raw: [1, 1, 1], average: 1, stdev: 0, units: 'ms' },
                        memory: { raw: [1, 1, 1], average: 1, stdev: 0, units: 'MB' }
                    }
                }];
            runner.packs();
            assert.deepStrictEqual(runner.results, expected);
        });
    });
});
