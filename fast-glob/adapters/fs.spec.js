"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const path = require("path");
const settings_1 = require("../settings");
const tests = require("../tests/index");
const fs_1 = require("./fs");
class FileSystemFake extends fs_1.default {
    read(_filepaths) {
        return [];
    }
}
function getAdapter() {
    return new FileSystemFake(new settings_1.default());
}
describe('Adapters → FileSystem', () => {
    describe('Constructor', () => {
        it('should create instance of class', () => {
            const adapter = getAdapter();
            assert.ok(adapter instanceof fs_1.default);
        });
    });
    describe('.read', () => {
        it('should return empty array', () => {
            const adapter = getAdapter();
            const expected = [];
            const actual = adapter.read([]);
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.getFullEntryPath', () => {
        it('should return path to entry', () => {
            const adapter = getAdapter();
            const expected = path.join(process.cwd(), 'config.json');
            const actual = adapter.getFullEntryPath('config.json');
            assert.strictEqual(actual, expected);
        });
    });
    describe('.makeEntry', () => {
        it('should return created entry', () => {
            const adapter = getAdapter();
            const filepath = path.join('base', 'file.json');
            const actual = adapter.makeEntry(tests.getFileEntry(), filepath);
            assert.strictEqual(actual.path, filepath);
            assert.strictEqual(actual.depth, 2);
        });
        it('issue-144: should return entry with methods from fs.Stats', () => {
            const adapter = getAdapter();
            const actual = adapter.makeEntry(tests.getFileEntry(), 'file.json');
            assert.ok(actual.isFile());
        });
    });
});
