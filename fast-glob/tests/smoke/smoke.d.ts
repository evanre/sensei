import glob = require('glob');
import { Options } from '../../settings';
import { Pattern } from '../../types/index';
export interface SmokeTest {
    pattern: Pattern;
    ignore?: Pattern;
    cwd?: string;
    globOptions?: glob.IOptions;
    fgOptions?: Options<string>;
    /**
     * Allow to run only one test case with debug information.
     */
    debug?: boolean;
    /**
     * Mark test case as broken. This is requires a issue to repair.
     */
    broken?: boolean;
    issue?: number | number[];
    /**
     * Mark test case as correct. This is requires a reason why is true.
     */
    correct?: boolean;
    reason?: string;
}
/**
 * Runs the passed test suite.
 */
export declare function suite(name: string, tests: Array<SmokeTest | SmokeTest[]>): void;
