"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream = require("stream");
const fs_stream_1 = require("../adapters/fs-stream");
const stream_1 = require("../readers/stream");
const provider_1 = require("./provider");
class TransformStream extends stream.Transform {
    constructor(provider) {
        super({ objectMode: true });
        this.provider = provider;
    }
    _transform(entry, _encoding, callback) {
        callback(null, this.provider.transform(entry));
    }
}
class ProviderStream extends provider_1.default {
    constructor() {
        super(...arguments);
        this._reader = new stream_1.default(this.settings);
    }
    /**
     * Returns FileSystem adapter.
     */
    get fsAdapter() {
        return new fs_stream_1.default(this.settings);
    }
    /**
     * Use stream API to read entries for Task.
     */
    read(task) {
        const root = this.getRootDirectory(task);
        const options = this.getReaderOptions(task);
        const transform = new TransformStream(this);
        const readable = this.api(root, task, options);
        return readable
            .on('error', (err) => this.isEnoentCodeError(err) ? null : transform.emit('error', err))
            .pipe(transform);
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
exports.default = ProviderStream;
