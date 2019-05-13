/// <reference types="node" />
import * as stream from 'stream';
import { Entry, EntryItem } from '../types/index';
export declare class FakeStream extends stream.Readable {
    private readonly value;
    private readonly error;
    constructor(value: EntryItem, error: Error | null, opts?: stream.ReadableOptions);
    _read(): void;
}
export declare class EnoentErrnoException extends Error {
    readonly code: string;
    constructor();
}
interface FakeFsStatOptions {
    isFile: boolean;
    isDirectory: boolean;
    isSymbolicLink: boolean;
    path: string;
}
export declare function getEntry(options?: Partial<FakeFsStatOptions>): Entry;
export declare function getFileEntry(options?: Partial<FakeFsStatOptions>): Entry;
export declare function getDirectoryEntry(options?: Partial<FakeFsStatOptions>): Entry;
export {};
