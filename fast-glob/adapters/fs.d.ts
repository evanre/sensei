/// <reference types="node" />
import * as fs from 'fs';
import Settings from '../settings';
import { Entry, EntryFilterFunction, Pattern } from '../types/index';
export default abstract class FileSystem<T> {
    private readonly settings;
    constructor(settings: Settings);
    /**
     * The main logic of reading the entries that must be implemented by each adapter.
     */
    abstract read(filepaths: string[], filter: EntryFilterFunction): T;
    /**
     * Return full path to entry.
     */
    getFullEntryPath(filepath: string): string;
    /**
     * Return an implementation of the Entry interface.
     */
    makeEntry(stat: fs.Stats, pattern: Pattern): Entry;
}
