"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("../readers/stream");
const provider_1 = require("./provider");
class ProviderAsync extends provider_1.default {
    constructor() {
        super(...arguments);
        this._reader = new stream_1.default(this.settings);
    }
    /**
     * Use async API to read entries for Task.
     */
    read(task) {
        const root = this.getRootDirectory(task);
        const options = this.getReaderOptions(task);
        const entries = [];
        return new Promise((resolve, reject) => {
            const stream = this.api(root, task, options);
            stream.on('error', (err) => {
                this.isEnoentCodeError(err) ? resolve([]) : reject(err);
                stream.pause();
            });
            stream.on('data', (entry) => entries.push(this.transform(entry)));
            stream.on('end', () => resolve(entries));
        });
    }
    /**
     * Returns founded paths.
     */
    api(root, task, options) {
        if (task.dynamic) {
            return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
    }
}
exports.default = ProviderAsync;
