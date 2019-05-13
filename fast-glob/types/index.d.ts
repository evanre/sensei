/// <reference types="node" />
import * as fs from 'fs';
import * as readdir from '@mrmlnc/readdir-enhanced';
import * as micromatch from 'micromatch';
export interface Entry extends fs.Stats {
    path: string;
    depth: number;
}
export declare type EntryItem = string | Entry;
export declare type Pattern = string;
export declare type PatternRe = RegExp;
export declare type PatternsGroup = Record<string, Pattern[]>;
export declare type ReaderOptions = readdir.Options;
export declare type EntryFilterFunction = readdir.FilterFunction;
export declare type MicromatchOptions = micromatch.Options;
