"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const settings_1 = require("./settings");
describe('Settings', () => {
    it('should return instance with default values', () => {
        const settings = new settings_1.default();
        assert.strictEqual(settings.cwd, process.cwd());
        assert.ok(settings.deep);
        assert.deepStrictEqual(settings.ignore, []);
        assert.ok(!settings.dot);
        assert.ok(!settings.stats);
        assert.ok(settings.onlyFiles);
        assert.ok(!settings.onlyDirectories);
        assert.ok(settings.followSymlinkedDirectories);
        assert.ok(settings.unique);
        assert.ok(!settings.markDirectories);
        assert.ok(!settings.absolute);
        assert.ok(settings.brace);
        assert.ok(settings.globstar);
        assert.ok(settings.extglob);
        assert.ok(settings.case);
        assert.ok(!settings.matchBase);
        assert.strictEqual(settings.transform, null);
    });
    it('should return instance with custom values', () => {
        const settings = new settings_1.default({
            onlyFiles: false
        });
        assert.ok(!settings.onlyFiles);
    });
    it('should set the "onlyFiles" option when the "onlyDirectories" is enabled', () => {
        const settings = new settings_1.default({
            onlyDirectories: true
        });
        assert.ok(!settings.onlyFiles);
        assert.ok(settings.onlyDirectories);
    });
});
