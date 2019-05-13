/// <reference types="node" />
import { Task } from '../managers/tasks';
import Settings from '../settings';
import { Entry, EntryItem, MicromatchOptions, ReaderOptions } from '../types/index';
import DeepFilter from './filters/deep';
import EntryFilter from './filters/entry';
export default abstract class Provider<T> {
    readonly settings: Settings;
    readonly entryFilter: EntryFilter;
    readonly deepFilter: DeepFilter;
    private readonly micromatchOptions;
    constructor(settings: Settings);
    /**
     * The main logic of reading the directories that must be implemented by each providers.
     */
    abstract read(_task: Task): T;
    /**
     * Returns root path to scanner.
     */
    getRootDirectory(task: Task): string;
    /**
     * Returns options for reader.
     */
    getReaderOptions(task: Task): ReaderOptions;
    /**
     * Returns options for micromatch.
     */
    getMicromatchOptions(): MicromatchOptions;
    /**
     * Returns transformed entry.
     */
    transform(entry: Entry): EntryItem;
    /**
     * Returns true if error has ENOENT code.
     */
    isEnoentCodeError(err: NodeJS.ErrnoException): boolean;
}
