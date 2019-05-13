import { SuitePackResult } from './runner';
export default class Reporter {
    private readonly results;
    constructor(results: SuitePackResult);
    toString(): string;
    private readonly header;
    private readonly meta;
    private readonly measures;
    private measure;
    private units;
}
