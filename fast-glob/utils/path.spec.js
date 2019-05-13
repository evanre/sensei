"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const path = require("path");
const util = require("./path");
describe('Utils → Path', () => {
    describe('.isDotDirectory', () => {
        it('should return true for dot directory', () => {
            const filepath = path.join('fixtures', '.directory');
            const actual = util.isDotDirectory(filepath);
            assert.ok(actual);
        });
        it('should return false for non-dot directory', () => {
            const filepath = path.join('fixtures', '.directory', 'directory');
            const actual = util.isDotDirectory(filepath);
            assert.ok(!actual);
        });
    });
    describe('.normalize', () => {
        it('should return path with converted slashes', () => {
            const expected = 'directory/nested/file.md';
            const actual = util.unixify('directory\\nested/file.md');
            assert.strictEqual(actual, expected);
        });
    });
    describe('.makeAbsolute', () => {
        it('should return absolute filepath', () => {
            const expected = path.join(process.cwd(), 'file.md');
            const actual = util.makeAbsolute(process.cwd(), 'file.md');
            assert.strictEqual(actual, expected);
        });
    });
});
