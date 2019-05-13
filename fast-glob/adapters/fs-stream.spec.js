"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const settings_1 = require("../settings");
const fs_stream_1 = require("./fs-stream");
class FileSystemStreamFake extends fs_stream_1.default {
    constructor() {
        super(new settings_1.default());
    }
    getStat() {
        return getStats(1);
    }
}
class FileSystemStreamThrowStatError extends FileSystemStreamFake {
    constructor() {
        super(...arguments);
        this.call = 0;
    }
    getStat() {
        if (this.call === 0) {
            this.call++;
            return Promise.reject(new Error('something'));
        }
        return getStats(1);
    }
}
function getStats(uid) {
    return Promise.resolve({ uid });
}
function getAdapter() {
    return new FileSystemStreamFake();
}
function getEntries(_adapter, positive, isFollowedEntry) {
    const adapter = new _adapter();
    const entries = [];
    return new Promise((resolve, reject) => {
        const stream = adapter.read(positive, () => isFollowedEntry);
        stream.on('data', (entry) => entries.push(entry.path));
        stream.on('error', reject);
        stream.on('end', () => resolve(entries));
    });
}
describe('Adapters → FileSystemStream', () => {
    describe('Constructor', () => {
        it('should create instance of class', () => {
            const adapter = getAdapter();
            assert.ok(adapter instanceof fs_stream_1.default);
        });
    });
    describe('.read', () => {
        it('should return empty array', async () => {
            const expected = [];
            const actual = await getEntries(FileSystemStreamFake, ['pattern1', 'pattern2'], /* isFollowedEntry */ false);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return entries', async () => {
            const expected = ['pattern1', 'pattern2'];
            const actual = await getEntries(FileSystemStreamFake, ['pattern1', 'pattern2'], /* isFollowedEntry */ true);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return entries without null items', async () => {
            const expected = ['pattern2'];
            const actual = await getEntries(FileSystemStreamThrowStatError, ['pattern1', 'pattern2'], /* isFollowedEntry */ true);
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.getEntry', () => {
        it('should return created entry', async () => {
            const adapter = getAdapter();
            const expected = {
                path: 'pattern',
                depth: 1,
                uid: 1
            };
            const actual = await adapter.getEntry('filepath', 'pattern');
            assert.deepStrictEqual(actual, expected);
        });
        it('should return null when lstat throw error', async () => {
            const adapter = new FileSystemStreamThrowStatError();
            const expected = null;
            const actual = await adapter.getEntry('filepath', 'pattern');
            assert.strictEqual(actual, expected);
        });
    });
});
