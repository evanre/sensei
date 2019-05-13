import { Task } from '../managers/tasks';
import ReaderSync from '../readers/sync';
import { Entry, EntryItem, ReaderOptions } from '../types/index';
import Provider from './provider';
export default class ProviderSync extends Provider<EntryItem[]> {
    protected _reader: ReaderSync;
    /**
     * Use sync API to read entries for Task.
     */
    read(task: Task): EntryItem[];
    /**
     * Returns founded paths.
     */
    api(root: string, task: Task, options: ReaderOptions): Entry[];
}
