/// <reference types="node" />
import * as fs from 'fs';
import FileSystem from './fs';
import { Entry, EntryFilterFunction, Pattern } from '../types/index';
export default class FileSystemStream extends FileSystem<NodeJS.ReadableStream> {
    /**
     * Use stream API to read entries for Task.
     */
    read(patterns: string[], filter: EntryFilterFunction): NodeJS.ReadableStream;
    /**
     * Return entry for the provided path.
     */
    getEntry(filepath: string, pattern: Pattern): Promise<Entry | null>;
    /**
     * Return fs.Stats for the provided path.
     */
    getStat(filepath: string): Promise<fs.Stats>;
}
