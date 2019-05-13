"use strict";
// tslint:disable max-classes-per-file
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const stream_1 = require("../readers/stream");
const settings_1 = require("../settings");
const tests = require("../tests/index");
const async_1 = require("./async");
class TestReaderStream extends stream_1.default {
    dynamic() {
        return this.fake({ path: 'dynamic' });
    }
    static() {
        return this.fake({ path: 'static' });
    }
    fake(value, error) {
        return new tests.FakeStream(value, error ? error : null, { encoding: 'utf-8', objectMode: true });
    }
}
class TestProviderAsync extends async_1.default {
    constructor(settings = new settings_1.default()) {
        super(settings);
        this.settings = settings;
        this._reader = new TestReaderStream(this.settings);
    }
}
class TestProviderAsyncWithEnoent extends TestProviderAsync {
    api() {
        return this._reader.fake('dynamic', new tests.EnoentErrnoException());
    }
}
class TestProviderAsyncWithErrno extends TestProviderAsync {
    api() {
        return this._reader.fake('dynamic', new Error('Boom'));
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
describe('Providers → ProviderAsync', () => {
    describe('Constructor', () => {
        it('should create instance of class', () => {
            const provider = new TestProviderAsync();
            assert.ok(provider instanceof async_1.default);
        });
    });
    describe('.read', () => {
        it('should returns entries for dynamic task', async () => {
            const task = getTask();
            const provider = new TestProviderAsync();
            const expected = ['dynamic'];
            const actual = await provider.read(task);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns entries for static task', async () => {
            const task = getTask(/* dynamic */ false);
            const provider = new TestProviderAsync();
            const expected = ['static'];
            const actual = await provider.read(task);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns entries (stats)', async () => {
            const task = getTask();
            const settings = new settings_1.default({ stats: true });
            const provider = new TestProviderAsync(settings);
            const expected = [{ path: 'dynamic' }];
            const actual = await provider.read(task);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns transformed entries', async () => {
            const task = getTask();
            const settings = new settings_1.default({ transform: () => 'cake' });
            const provider = new TestProviderAsync(settings);
            const expected = ['cake'];
            const actual = await provider.read(task);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns empty array if provided cwd does not exists', async () => {
            const task = getTask();
            const provider = new TestProviderAsyncWithEnoent();
            const expected = [];
            const actual = await provider.read(task);
            assert.deepStrictEqual(actual, expected);
        });
        it('should throw error', async () => {
            const task = getTask();
            const provider = new TestProviderAsyncWithErrno();
            try {
                await provider.read(task);
                throw new Error('Wow');
            }
            catch (err) {
                assert.strictEqual(err.message, 'Boom');
            }
        });
    });
});
