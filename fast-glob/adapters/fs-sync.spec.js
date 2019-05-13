"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const settings_1 = require("../settings");
const fs_sync_1 = require("./fs-sync");
class FileSystemSyncFake extends fs_sync_1.default {
    constructor() {
        super(new settings_1.default());
    }
    getStat() {
        return getStats(1);
    }
}
class FileSystemSyncThrowStatError extends FileSystemSyncFake {
    constructor() {
        super(...arguments);
        this.call = 0;
    }
    /**
     * First call throw error.
     */
    getStat() {
        if (this.call === 0) {
            this.call++;
            throw new Error('Something');
        }
        return getStats(1);
    }
}
function getStats(uid) {
    return { uid };
}
function getAdapter() {
    return new FileSystemSyncFake();
}
function getEntries(_adapter, positive, isFollowedEntry) {
    const adapter = new _adapter();
    return adapter.read(positive, () => isFollowedEntry).map(({ path }) => path);
}
describe('Adapters → FileSystemSync', () => {
    describe('Constructor', () => {
        it('should create instance of class', () => {
            const adapter = getAdapter();
            assert.ok(adapter instanceof fs_sync_1.default);
        });
    });
    describe('.read', () => {
        it('should return empty array', () => {
            const expected = [];
            const actual = getEntries(FileSystemSyncFake, ['pattern1', 'pattern2'], /* isFollowedEntry */ false);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return entries', () => {
            const expected = ['pattern1', 'pattern2'];
            const actual = getEntries(FileSystemSyncFake, ['pattern1', 'pattern2'], /* isFollowedEntry */ true);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return entries without null items', () => {
            const expected = ['pattern2'];
            const actual = getEntries(FileSystemSyncThrowStatError, ['pattern1', 'pattern2'], /* isFollowedEntry */ true);
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.getEntry', () => {
        it('should return created entry', () => {
            const adapter = getAdapter();
            const expected = {
                path: 'pattern',
                depth: 1,
                uid: 1
            };
            const actual = adapter.getEntry('filepath', 'pattern');
            assert.deepStrictEqual(actual, expected);
        });
        it('should return null when lstat throw error', () => {
            const adapter = new FileSystemSyncThrowStatError();
            const expected = null;
            const actual = adapter.getEntry('filepath', 'pattern');
            assert.strictEqual(actual, expected);
        });
    });
});
