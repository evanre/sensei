import execa = require('execa');
export interface RunnerOptions {
    /**
     * The directory from which you want to take suites.
     */
    type: 'sync' | 'async';
    /**
     * The number of nested directories.
     */
    depth: number;
    /**
     * The number of runs for each suite.
     */
    launches: number;
    /**
     * The maximum allowable deviation in percent.
     */
    maxStdev: number;
    /**
     * The number of retries before giving the result, if the current deviation is greater than specified in `maxStdev`.
     */
    retries: number;
}
export interface SuiteMeasures {
    matches: number;
    time: number;
    memory: number;
}
export interface Measure {
    units: string;
    raw: number[];
    average: number;
    stdev: number;
}
export interface SuitePackMeasures extends Record<string, Measure> {
    time: Measure;
    memory: Measure;
}
export interface SuitePackResult {
    name: string;
    errors: number;
    entries: number;
    retries: number;
    measures: SuitePackMeasures;
}
export default class Runner {
    private readonly basedir;
    private readonly options;
    constructor(basedir: string, options: RunnerOptions);
    /**
     * Runs child process.
     */
    execNodeProcess(args: string[], options: Partial<execa.SyncOptions>): string;
    /**
     * Runs a single suite in the child process and returns the measurements of his work.
     */
    suite(suitePath: string): SuiteMeasures;
    /**
     * Runs a pack of suites.
     */
    suitePack(suitePath: string, retries: number): SuitePackResult;
    report(result: SuitePackResult): void;
    packs(): void;
    getSuites(suitesPath: string): string[];
    private getMeasures;
    private getSuitePackMeasures;
}
