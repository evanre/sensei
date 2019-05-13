"use strict";
// tslint:disable max-classes-per-file
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const sync_1 = require("../readers/sync");
const settings_1 = require("../settings");
const tests = require("../tests/index");
const sync_2 = require("./sync");
class TestReaderSync extends sync_1.default {
    dynamic() {
        return [{ path: 'dynamic' }];
    }
    static() {
        return [{ path: 'static' }];
    }
}
class TestProviderSync extends sync_2.default {
    constructor(settings = new settings_1.default()) {
        super(settings);
        this.settings = settings;
        this._reader = new TestReaderSync(this.settings);
    }
}
class TestProviderSyncWithEnoent extends TestProviderSync {
    api() {
        throw new tests.EnoentErrnoException();
    }
}
class TestProviderSyncWithErrno extends TestProviderSync {
    api() {
        throw new Error('Boom');
    }
}
function getTask(dynamic = true) {
    return {
        dynamic,
        base: 'fixtures',
        patterns: ['**/*'],
        positive: ['**/*'],
        negative: []
    };
}
describe('Providers → ProviderSync', () => {
    describe('Constructor', () => {
        it('should create instance of class', () => {
            const provider = new TestProviderSync();
            assert.ok(provider instanceof sync_2.default);
        });
    });
    describe('.read', () => {
        it('should returns entries for dynamic task', () => {
            const task = getTask();
            const provider = new TestProviderSync();
            const expected = ['dynamic'];
            const actual = provider.read(task);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns entries for static task', () => {
            const task = getTask(/* dynamic */ false);
            const provider = new TestProviderSync();
            const expected = ['static'];
            const actual = provider.read(task);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns entries (stats)', () => {
            const task = getTask();
            const settings = new settings_1.default({ stats: true });
            const provider = new TestProviderSync(settings);
            const expected = [{ path: 'dynamic' }];
            const actual = provider.read(task);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns transformed entries', () => {
            const transform = () => 'cake';
            const task = getTask();
            const settings = new settings_1.default({ transform });
            const provider = new TestProviderSync(settings);
            const expected = ['cake'];
            const actual = provider.read(task);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns empty array if provided cwd does not exists', () => {
            const task = getTask();
            const settings = new settings_1.default();
            const provider = new TestProviderSyncWithEnoent(settings);
            const expected = [];
            const actual = provider.read(task);
            assert.deepStrictEqual(actual, expected);
        });
        it('should throw error', () => {
            const task = getTask();
            const settings = new settings_1.default();
            const provider = new TestProviderSyncWithErrno(settings);
            assert.throws(() => provider.read(task), /Boom/);
        });
    });
});
