/// <reference types="node" />
import { ReaderOptions } from '../types/index';
import Reader from './reader';
export default class ReaderStream extends Reader<NodeJS.ReadableStream> {
    private readonly _fsAdapter;
    dynamic(root: string, options: ReaderOptions): NodeJS.ReadableStream;
    static(filepaths: string[], options: ReaderOptions): NodeJS.ReadableStream;
}
