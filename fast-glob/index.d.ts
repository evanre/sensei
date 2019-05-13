/// <reference types="node" />
import * as taskManager from './managers/tasks';
import Settings, { Options, TransformFunction } from './settings';
import { EntryItem, Pattern } from './types/index';
declare type Task = taskManager.Task;
/**
 * Synchronous API.
 */
declare function sync(source: Pattern | Pattern[], options?: Options): EntryItem[];
/**
 * Asynchronous API.
 */
declare function async(source: Pattern | Pattern[], options?: Options): Promise<EntryItem[]>;
/**
 * Stream API.
 */
declare function stream(source: Pattern | Pattern[], options?: Options): NodeJS.ReadableStream;
/**
 * Return a set of tasks based on provided patterns.
 */
declare function generateTasks(source: Pattern | Pattern[], options?: Options): Task[];
export default async;
export { async, sync, stream, generateTasks, Options, Settings, TransformFunction, Task, EntryItem };
