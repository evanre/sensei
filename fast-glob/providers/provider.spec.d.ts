import { Task } from '../managers/tasks';
import { Options } from '../settings';
import Provider from './provider';
export declare class TestProvider extends Provider<Array<{}>> {
    read(_task: Task): Array<{}>;
}
export declare function getProvider(options?: Options): TestProvider;
