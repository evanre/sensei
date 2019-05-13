/// <reference types="node" />
import * as fs from 'fs';
import FileSystem from './fs';
import { Entry, EntryFilterFunction, Pattern } from '../types/index';
export default class FileSystemSync extends FileSystem<Entry[]> {
    /**
     * Use sync API to read entries for Task.
     */
    read(patterns: string[], filter: EntryFilterFunction): Entry[];
    /**
     * Return entry for the provided path.
     */
    getEntry(filepath: string, pattern: Pattern): Entry | null;
    /**
     * Return fs.Stats for the provided path.
     */
    getStat(filepath: string): fs.Stats;
}
