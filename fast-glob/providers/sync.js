"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sync_1 = require("../readers/sync");
const provider_1 = require("./provider");
class ProviderSync extends provider_1.default {
    constructor() {
        super(...arguments);
        this._reader = new sync_1.default(this.settings);
    }
    /**
     * Use sync API to read entries for Task.
     */
    read(task) {
        const root = this.getRootDirectory(task);
        const options = this.getReaderOptions(task);
        try {
            const entries = this.api(root, task, options);
            return entries.map(this.transform, this);
        }
        catch (err) {
            if (this.isEnoentCodeError(err)) {
                return [];
            }
            throw err;
        }
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
exports.default = ProviderSync;
