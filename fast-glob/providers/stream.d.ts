/// <reference types="node" />
import FileSystemStream from '../adapters/fs-stream';
import { Task } from '../managers/tasks';
import ReaderStream from '../readers/stream';
import { ReaderOptions } from '../types/index';
import Provider from './provider';
export default class ProviderStream extends Provider<NodeJS.ReadableStream> {
    protected _reader: ReaderStream;
    /**
     * Returns FileSystem adapter.
     */
    readonly fsAdapter: FileSystemStream;
    /**
     * Use stream API to read entries for Task.
     */
    read(task: Task): NodeJS.ReadableStream;
    /**
     * Returns founded paths.
     */
    api(root: string, task: Task, options: ReaderOptions): NodeJS.ReadableStream;
}
