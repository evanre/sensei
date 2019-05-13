/// <reference types="node" />
import { Task } from '../managers/tasks';
import ReaderStream from '../readers/stream';
import { EntryItem, ReaderOptions } from '../types/index';
import Provider from './provider';
export default class ProviderAsync extends Provider<Promise<EntryItem[]>> {
    protected _reader: ReaderStream;
    /**
     * Use async API to read entries for Task.
     */
    read(task: Task): Promise<EntryItem[]>;
    /**
     * Returns founded paths.
     */
    api(root: string, task: Task, options: ReaderOptions): NodeJS.ReadableStream;
}
