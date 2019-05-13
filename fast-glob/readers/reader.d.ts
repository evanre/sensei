import Settings from '../settings';
import { ReaderOptions } from '../types/index';
export default abstract class Reader<T> {
    protected readonly _settings: Settings;
    constructor(_settings: Settings);
    abstract dynamic(root: string, options: ReaderOptions): T;
    abstract static(filepath: string[], options: ReaderOptions): T;
}
