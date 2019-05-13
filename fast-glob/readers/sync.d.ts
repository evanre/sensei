import { Entry, ReaderOptions } from '../types/index';
import Reader from './reader';
export default class ReaderSync extends Reader<Entry[]> {
    private readonly _fsAdapter;
    dynamic(root: string, options: ReaderOptions): Entry[];
    static(filepaths: string[], options: ReaderOptions): Entry[];
}
